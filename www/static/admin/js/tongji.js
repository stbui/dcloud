(function(window, old) {
  var self = {},
    lastEvent,
    lastScript,
    previousNotification,
    shouldCatch = true,
    ignoreOnError = 0,

    eventsRemaining = 10,
    maxPayloadDepth = 5;

  self.noConflict = function() {
    window.Bugsnag = old;
    if (typeof old === "undefined") {
      delete window.Bugsnag;
    }
    return self;
  };

  self.refresh = function() {
    eventsRemaining = 10;
  };

  self.notifyException = function(exception, name, metaData, severity) {
    if (!exception) {
      return;
    }
    if (name && typeof name !== "string") {
      metaData = name;
      name = undefined;
    }
    if (!metaData) {
      metaData = {};
    }
    addScriptToMetaData(metaData);

    sendToBugsnag({
      name: name || exception.name,
      message: exception.message || exception.description,
      stacktrace: stacktraceFromException(exception) || generateStacktrace(),
      file: exception.fileName || exception.sourceURL,
      lineNumber: exception.lineNumber || exception.line,
      columnNumber: exception.columnNumber ? exception.columnNumber + 1 : undefined,
      severity: severity || "warning"
    }, metaData);
  };

  self.notify = function(name, message, metaData, severity) {
    sendToBugsnag({
      name: name,
      message: message,
      stacktrace: generateStacktrace(),
      file: window.location.toString(),
      lineNumber: 1,
      severity: severity || "warning"
    }, metaData);
  };

  function wrap(_super, options) {
    try {
      if (typeof _super !== "function") {
        return _super;
      }
      if (!_super.bugsnag) {
        var currentScript = getCurrentScript();
        _super.bugsnag = function(event) {
          if (options && options.eventHandler) {
            lastEvent = event;
          }
          lastScript = currentScript;

          if (shouldCatch) {
            try {
              return _super.apply(this, arguments);
            } catch (e) {
              if (getSetting("autoNotify", true)) {
                self.notifyException(e, null, null, "error");
                ignoreNextOnError();
              }
              throw e;
            } finally {
              lastScript = null;
            }
          } else {
            var ret = _super.apply(this, arguments);
            lastScript = null;
            return ret;
          }
        };
        _super.bugsnag.bugsnag = _super.bugsnag;
      }
      return _super.bugsnag;

    } catch (e) {
      return _super;
    }
  }

  var synchronousScriptsRunning = document.readyState !== "complete";

  function loadCompleted() {
    synchronousScriptsRunning = false;
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", loadCompleted, true);
    window.addEventListener("load", loadCompleted, true);
  } else {
    window.attachEvent("onload", loadCompleted);
  }

  function getCurrentScript() {
    var script = document.currentScript || lastScript;

    if (!script && synchronousScriptsRunning) {
      var scripts = document.scripts || document.getElementsByTagName("script");
      script = scripts[scripts.length - 1];
    }

    return script;
  }

  function addScriptToMetaData(metaData) {
    var script = getCurrentScript();

    if (script) {
      metaData.script = {
        src: script.src,
        content: getSetting("inlineScript", true) ? script.innerHTML : ""
      };
    }
  }


  var API_KEY_REGEX = /^[0-9a-f]{32}$/i;
  var FUNCTION_REGEX = /function\s*([\w\-$]+)?\s*\(/i;

  var DEFAULT_BASE_ENDPOINT = "http://tongji.431103.com:8360/";
  var DEFAULT_NOTIFIER_ENDPOINT = DEFAULT_BASE_ENDPOINT + "js";
  var NOTIFIER_VERSION = "2.5.0";

  var scripts = document.getElementsByTagName("script");
  var thisScript = scripts[scripts.length - 1];

  function log(msg) {
    var disableLog = getSetting("disableLog");

    var console = window.console;
    if (console !== undefined && console.log !== undefined && !disableLog) {
      console.log("[apm] " + msg);
    }
  }

  function serialize(obj, prefix, depth) {
    var maxDepth = getSetting("maxDepth", maxPayloadDepth);

    if (depth >= maxDepth) {
      return encodeURIComponent(prefix) + "=[RECURSIVE]";
    }
    depth = depth + 1 || 1;

    try {
      if (window.Node && obj instanceof window.Node) {
        return encodeURIComponent(prefix) + "=" + encodeURIComponent(targetToString(obj));
      }

      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p) && p != null && obj[p] != null) {
          var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
          str.push(typeof v === "object" ? serialize(v, k, depth) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    } catch (e) {
      return encodeURIComponent(prefix) + "=" + encodeURIComponent("" + e);
    }
  }

  function merge(target, source, depth) {
    if (source == null) {
      return target;
    } else if (depth >= getSetting("maxDepth", maxPayloadDepth)) {
      return "[RECURSIVE]";
    }

    target = target || {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        try {
          if (source[key].constructor === Object) {
            target[key] = merge(target[key], source[key], depth + 1 || 1);
          } else {
            target[key] = source[key];
          }
        } catch (e) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  function request(url, params) {
    url += "?" + serialize(params) + "&ct=img&cb=" + new Date().getTime();
    if (typeof BUGSNAG_TESTING !== "undefined" && self.testRequest) {
      self.testRequest(url, params);
    } else {
      var notifyHandler = getSetting("notifyHandler");
      if (notifyHandler === "xhr") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
      } else {
        var img = new Image();
        img.src = url;
      }
    }
  }

  function getData(node) {
    var dataAttrs = {};
    var dataRegex = /^data\-([\w\-]+)$/;

    if (node) {
      var attrs = node.attributes;
      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (dataRegex.test(attr.nodeName)) {
          var key = attr.nodeName.match(dataRegex)[1];
          dataAttrs[key] = attr.value || attr.nodeValue;
        }
      }
    }

    return dataAttrs;
  }

  var data;

  function getSetting(name, fallback) {
    data = data || getData(thisScript);
    var setting = self[name] !== undefined ? self[name] : data[name.toLowerCase()];
    if (setting === "false") {
      setting = false;
    }
    return setting !== undefined ? setting : fallback;
  }

  function validateApiKey(apiKey) {
    if (!apiKey || !apiKey.match(API_KEY_REGEX)) {
      log("Invalid API key '" + apiKey + "'");
      return false;
    }

    return true;
  }

  function sendToBugsnag(details, metaData) {
    var apiKey = getSetting("apiKey");
    if (!validateApiKey(apiKey) || !eventsRemaining) {
      return;
    }
    eventsRemaining -= 1;

    var releaseStage = getSetting("releaseStage", "production");
    var notifyReleaseStages = getSetting("notifyReleaseStages");
    if (notifyReleaseStages) {
      var shouldNotify = false;
      for (var i = 0; i < notifyReleaseStages.length; i++) {
        if (releaseStage === notifyReleaseStages[i]) {
          shouldNotify = true;
          break;
        }
      }

      if (!shouldNotify) {
        return;
      }
    }

    var deduplicate = [details.name, details.message, details.stacktrace].join("|");
    if (deduplicate === previousNotification) {
      return;
    } else {
      previousNotification = deduplicate;
    }

    if (lastEvent) {
      metaData = metaData || {};
      metaData["Last Event"] = eventToMetaData(lastEvent);
    }

    var payload = {
      notifierVersion: NOTIFIER_VERSION,

      apiKey: apiKey,
      projectRoot: getSetting("projectRoot") || window.location.protocol + "//" + window.location.host,
      context: getSetting("context") || window.location.pathname,
      userId: getSetting("userId"), // Deprecated, remove in v3
      user: getSetting("user"),
      metaData: merge(merge({}, getSetting("metaData")), metaData),
      releaseStage: releaseStage,
      appVersion: getSetting("appVersion"),

      url: window.location.href,
      userAgent: navigator.userAgent,
      language: navigator.language || navigator.userLanguage,

      severity: details.severity,

      name: details.name,
      message: details.message,
      stacktrace: details.stacktrace,
      file: details.file,
      lineNumber: details.lineNumber,
      columnNumber: details.columnNumber,
      payloadVersion: "2"
    };

    var beforeNotify = self.beforeNotify;
    if (typeof(beforeNotify) === "function") {
      var retVal = beforeNotify(payload, payload.metaData);
      if (retVal === false) {
        return;
      }
    }

    if (payload.lineNumber === 0 && (/Script error\.?/).test(payload.message)) {
      return log("Ignoring cross-domain script error. See https://bugsnag.com/docs/notifiers/js/cors");
    }

    request(getSetting("endpoint") || DEFAULT_NOTIFIER_ENDPOINT, payload);
  }

  function generateStacktrace() {
    var generated, stacktrace;
    var MAX_FAKE_STACK_SIZE = 10;
    var ANONYMOUS_FUNCTION_PLACEHOLDER = "[anonymous]";

    try {
      throw new Error("");
    } catch (exception) {
      generated = "<generated>\n";
      stacktrace = stacktraceFromException(exception);
    }

    if (!stacktrace) {
      generated = "<generated-ie>\n";
      var functionStack = [];
      try {
        var curr = arguments.callee.caller.caller;
        while (curr && functionStack.length < MAX_FAKE_STACK_SIZE) {
          var fn = FUNCTION_REGEX.test(curr.toString()) ? RegExp.$1 || ANONYMOUS_FUNCTION_PLACEHOLDER : ANONYMOUS_FUNCTION_PLACEHOLDER;
          functionStack.push(fn);
          curr = curr.caller;
        }
      } catch (e) {
        log(e);
      }
      stacktrace = functionStack.join("\n");
    }

    return generated + stacktrace;
  }

  function stacktraceFromException(exception) {
    return exception.stack || exception.backtrace || exception.stacktrace;
  }

  function eventToMetaData(event) {
    var tab = {
      millisecondsAgo: new Date() - event.timeStamp,
      type: event.type,
      which: event.which,
      target: targetToString(event.target)
    };

    return tab;
  }

  function targetToString(target) {
    if (target) {
      var attrs = target.attributes;

      if (attrs) {
        var ret = "<" + target.nodeName.toLowerCase();
        for (var i = 0; i < attrs.length; i++) {
          if (attrs[i].value && attrs[i].value.toString() !== "null") {
            ret += " " + attrs[i].name + "=\"" + attrs[i].value + "\"";
          }
        }
        return ret + ">";
      } else {
        // e.g. #document
        return target.nodeName;
      }
    }
  }

  function ignoreNextOnError() {
    ignoreOnError += 1;
    window.setTimeout(function() {
      ignoreOnError -= 1;
    });
  }

  if (!window.atob) {
    shouldCatch = false;

  } else if (window.ErrorEvent) {
    try {
      if (new window.ErrorEvent("test").colno === 0) {
        shouldCatch = false;
      }
    } catch (e) { /* No action needed */ }
  }


  function polyFill(obj, name, makeReplacement) {
    var original = obj[name];
    var replacement = makeReplacement(original);
    obj[name] = replacement;

    if (typeof BUGSNAG_TESTING !== "undefined" && window.undo) {
      window.undo.push(function() {
        obj[name] = original;
      });
    }
  }

  function perf() {
    if (window.performance === 'undefined') {
      return false;
    }

    var time = window.performance.timing;

    var payload = {
      apiKey: getSetting("apiKey"),
      name: 'pef',
      type: 'pef',
      url: window.location.href,
      connect: time.connectEnd - time.connectStart,
      pageloadtime: time.loadEventStart - time.navigationStart,
      ttfb: time.responseStart - time.navigationStart,
      request: time.responseStart - time.requestStart,
      response: time.responseEnd - time.responseStart,
      dom: time.domContentLoadedEventStart - time.domLoading,
      domReady: '',
      load: time.loadEventStart - time.domLoading,
      tcp: time.connectEnd - time.connectStart,
      dns: time.domainLookupEnd - time.domainLookupStart,
      black_waiting_time: time.responseStart - time.navigationStart,
      fist_page_time: time.responseStart - time.navigationStart,
      operation_time: 0,
      total_time: time.loadEventEnd - time.navigationStart,
      last_unload: time.unloadEventEnd - time.unloadEventStart,
      redirect: time.redirectEnd - time.redirectStart
    }
    console.log(time.loadEventEnd, time.navigationStart)

    // function getCSS() {
    //   var getEntries = window.getEntries();

    //   var res = [];
    //   for (var i = 0; i < getEntries.length; i++) {
    //     if (getEntries[i].initiatorType === 'link') {
    //       value.push(getEntries[i].name);
    //     } else if(getEntries[i].initiatorType === 'script') {
    //       // value.push(getEntries[i].name);
    //     } else if(getEntries[i].initiatorType === 'css') {

    //   }

    //   return res;
    // }

    request(getSetting("endpoint") || DEFAULT_NOTIFIER_ENDPOINT, payload);

  }

  function xxs() {
    var open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send;

    var http = {
      apiKey: getSetting("apiKey"),
      name: 'ajax',
      domain: window.location.host,
      type: 'xhr',
    };

    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      http.method = method;
      http.url = url;
      request(getSetting("endpoint") || DEFAULT_NOTIFIER_ENDPOINT, http);

      return open.apply(this, arguments);
    }

    window.XMLHttpRequest.prototype.send = function(data) {
      // http.data = data;
      // request(getSetting("endpoint") || DEFAULT_NOTIFIER_ENDPOINT, http);

      return send.apply(this, arguments);
    }
  }

  if (getSetting("autoNotify", true)) {
    xxs();
    perf();
  }

  if (getSetting("autoNotify", true)) {
    polyFill(window, "onerror", function(_super) {
      if (typeof BUGSNAG_TESTING !== "undefined") {
        self._onerror = _super;
      }

      return function bugsnag(message, url, lineNo, charNo, exception) {
        var shouldNotify = getSetting("autoNotify", true);
        var metaData = {};

        if (!charNo && window.event) {
          charNo = window.event.errorCharacter;
        }

        addScriptToMetaData(metaData);
        lastScript = null;

        if (shouldNotify && !ignoreOnError) {

          sendToBugsnag({
            name: exception && exception.name || "window.onerror",
            message: message,
            file: url,
            lineNumber: lineNo,
            columnNumber: charNo,
            stacktrace: (exception && stacktraceFromException(exception)) || generateStacktrace(),
            severity: "error"
          }, metaData);
        }

        if (typeof BUGSNAG_TESTING !== "undefined") {
          _super = self._onerror;
        }

        if (_super) {
          _super(message, url, lineNo, charNo, exception);
        }
      };
    });

    var hijackTimeFunc = function(_super) {
      return function(f, t) {
        if (typeof f === "function") {
          f = wrap(f);
          var args = Array.prototype.slice.call(arguments, 2);
          return _super(function() {
            f.apply(this, args);
          }, t);
        } else {
          return _super(f, t);
        }
      };
    };

    polyFill(window, "setTimeout", hijackTimeFunc);
    polyFill(window, "setInterval", hijackTimeFunc);

    if (window.requestAnimationFrame) {
      polyFill(window, "requestAnimationFrame", function(_super) {
        return function(callback) {
          return _super(wrap(callback));
        };
      });
    }

    if (window.setImmediate) {
      polyFill(window, "setImmediate", function(_super) {
        return function() {
          var args = Array.prototype.slice.call(arguments);
          args[0] = wrap(args[0]);
          return _super.apply(this, args);
        };
      });
    }

    "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g, function(global) {
      var prototype = window[global] && window[global].prototype;
      if (prototype && prototype.hasOwnProperty && prototype.hasOwnProperty("addEventListener")) {
        polyFill(prototype, "addEventListener", function(_super) {
          return function(e, f, capture, secure) {
            try {
              if (f && f.handleEvent) {
                f.handleEvent = wrap(f.handleEvent, {
                  eventHandler: true
                });
              }
            } catch (err) {
              log(err);
            }
            return _super.call(this, e, wrap(f, {
              eventHandler: true
            }), capture, secure);
          };
        });

        polyFill(prototype, "removeEventListener", function(_super) {
          return function(e, f, capture, secure) {
            _super.call(this, e, f, capture, secure);
            return _super.call(this, e, wrap(f), capture, secure);
          };
        });
      }
    });
  }

  window.Bugsnag = self;
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return self;
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = self;
  }

})(window, window.Bugsnag);