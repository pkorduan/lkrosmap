LkRosMap.views.helper.configuration = {
  html: " \
    <div id=\"LkRosMap.configuration\" class=\"lkrosmap-info-overlay\"> \
      <a id=\"LkRosMap.configurationBoxClose\" class=\"lkrosmap-info-overlay-close\"></a> \
      <h1>Kartenkonfiguration</h1> \
      <h2>Globale Einstellungen</h2> \
      Externe Javascript-Bibliotheken: " + LkRosMap.path3rdParty + "<br> \
      <h2>Einstellungen dieser Karte</h2> \
      Name der Karte: " + LkRosMap.config.name + "<br> \
      baseProjection: " + LkRosMap.config.baseProjection + "<br> \
      viewProjection: " + LkRosMap.config.viewProjection + "<br> \
      layerExtent: " + LkRosMap.config.layerExtent + "<br> \
      mapSize: " +  LkRosMap.config.mapWidth + 'x' + LkRosMap.config.mapHeight + "<br> \
    </div> \
  "
}
