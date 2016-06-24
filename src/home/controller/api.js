'use strict';

import Base from './base.js';
import child_process from 'child_process';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    const userInfo = await this.session('userInfo');

    let json = {
      userId: userInfo.UserId,
      ApiKey: userInfo.ApiKey,
      version:'1.0.0'
    };

    return this.success(json);
  }


  async getallappAction() {
    const program = await this.model('program').select();

    return this.success(program);
  }


  createuserAction() {
    return this.success();
  }

  sethostsAction() {
    return this.success();
  }

  async gethostAction() {
    const server = await this.model('server').select();

    return this.success(server);
  }

  gethostpacAction() {

    return this.success();
  }

  getapikeyAction() {

    return this.success({apiKey:think.uuid()});
  }


  serverAction() {
    const spawn = child_process.spawn;

    //const cli = spawn(cmd[0], cmd.slice(1) || [], {
    //  env: process.env,
    //  cwd: data.path
    //});
    //let cli = spawn('free', ['-m']);

    //spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
    //  stdio: 'inherit',
    //  cwd: srcPath
    //});

    let cli = spawn('service.cmd',['tomcat','stop']);

    cli.stdout.setEncoding('UTF-8');
    cli.stdout.on('data', (data) => {
      return this.success(data);
    });

    cli.stderr.setEncoding('UTF-8');
    cli.stderr.on('data', (data) => {
      return this.error(6001,data);
    });

    cli.on('close', () => {

    });

  }

  syncallremoteusersAction() {
    return this.action('signin','syncallremoteusers');
  }

  pathlistAction() {
    return this.action('desktop','pathlist');
  }


}