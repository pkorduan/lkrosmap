LkRosMap.view.mapper = {};
LkRosMap.loadHeadFile('../js/view/mapper/map.js', 'js');

LkRosMap.controller.mapper = {
  views: LkRosMap.view.mapper,

  showMap: function () {
    return this.views.map.html;
  }
}