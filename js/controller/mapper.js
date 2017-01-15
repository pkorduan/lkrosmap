LkRosMap.views.mapper = {};
LkRosMap.loadHeadFile('../js/views/mapper/map.js', 'js');
LkRosMap.loadHeadFile('../js/views/mapper/map_header.js', 'js');

LkRosMap.controller.mapper = {
  views: LkRosMap.views.mapper,

  loadViews: function() {
    var views = LkRosMap.views.mapper;

    $('#LkRosMap\\.container').append(
      views.mapHeader.html +
      views.map.html
    );
  },

  showMap: function () {
    return this.views.map.html;
  },
  
  setEventHandlers: function() {
  }


}