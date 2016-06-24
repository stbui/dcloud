'use strict';

export default class extends think.controller.base {

  async indexAction() {
    const _session = await this.session('userInfo');

    return this.success(_session);
  }

  modifyAction() {

    if(this.isPost()) {
      const _post = this.post();

      this.model('appusers').where(_post).update(_post);
    }

    return this.success(null,'操作成功');
  }

  async registerAction() {

    const _post = this.post();
    const appusers = await this.model('appusers').thenAdd(_post, _post);
    if(appusers.type != "exist") {
      return this.success(appusers,'操作成功');
    }

    return this.error(5000,'操作失败');
  }

}