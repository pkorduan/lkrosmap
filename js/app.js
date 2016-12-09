function loadjscssfile(filename, filetype){
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

loadjscssfile("../conf/app.js", "js");
loadjscssfile("../css/app.css", "css");
loadjscssfile("../3rdparty/font-awesome-4.7.0/css/font-awesome/css/font-awesome.min.css", "css");

// central setting for the projection of the map view
LkRosMap.viewProjection = LkRosMap.config.viewProjection,
// fuer einige Berechnungen muss nach LonLat transformiert werden
LkRosMap.baseProjection = LkRosMap.config.baseProjection;

// load the data and the map after loading the map div
$('#LkRosMap').ready(function() {
/*
  loadJSON(LkRosMap.config.storeUrl, function(response) {
    LkRosMap.store = JSON.parse(response);
  });
*/
  console.log('LkRosMap loaded');
  $('#LkRosMap\\.container').html('Layer: ' + LkRosMap.layers.join());
}