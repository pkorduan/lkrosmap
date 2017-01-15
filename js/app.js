LkRosMap.loadHeadFile = function(filename, filetype) {
  if (filetype=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

LkRosMap.loadHeadFile(LkRosMap.path3rdParty + "jQuery-1.12.0/jquery-1.12.0.min.js", "js");
LkRosMap.loadHeadFile(LkRosMap.path3rdParty + "font-awesome-4.6.3/css/font-awesome.min.css", "css");
LkRosMap.loadHeadFile(LkRosMap.path3rdParty + "OpenLayers/v3.8.2/build/ol-debug.js", "js");
LkRosMap.loadHeadFile("https://openlayers.org/en/v3.20.1/css/ol.css", "css");
LkRosMap.loadHeadFile(LkRosMap.path3rdParty + "proj4js/proj4.js", "js");
LkRosMap.loadHeadFile("../css/app.css", "css");
LkRosMap.loadHeadFile('../js/controller/helper.js', 'js');
LkRosMap.loadHeadFile('../js/controller/mapper.js', 'js');

LkRosMap.init = function() {
  // central setting for the projection of the map view
  LkRosMap.viewProjection = LkRosMap.config.viewProjection;
  // fuer einige Berechnungen muss nach LonLat transformiert werden
  LkRosMap.baseProjection = LkRosMap.config.baseProjection;
  
  LkRosMap.controller.helper.init();
  LkRosMap.map = LkRosMap.controller.mapper.init();
};