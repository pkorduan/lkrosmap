LkRosMap.view.configuration = {};
LkRosMap.loadHeadFile('../js/view/configuration/list.js', 'js');

LkRosMap.controller.configuration = {
  views: LkRosMap.view.configuration,

  showConfiguration: function () {
    return this.views.list.html;
  }
}