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
LkRosMap.loadHeadFile("../css/app.css", "css");
LkRosMap.loadHeadFile('../conf/maps/' + LkRosMap.name + '.js', 'js');
LkRosMap.loadHeadFile('../js/controller/configuration.js', 'js');
LkRosMap.loadHeadFile('../js/controller/mapper.js', 'js');
