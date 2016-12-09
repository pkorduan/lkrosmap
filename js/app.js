LkRosMap.init = function() {
  // central setting for the projection of the map view
  LkRosMap.viewProjection = LkRosMap.config.viewProjection;
  // fuer einige Berechnungen muss nach LonLat transformiert werden
  LkRosMap.baseProjection = LkRosMap.config.baseProjection;

  $('#LkRosMap\\.container').html(
    LkRosMap.controller.configuration.showConfiguration() +
    LkRosMap.controller.mapper.showMap()
  );
};