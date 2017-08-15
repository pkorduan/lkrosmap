html = (typeof LkRosMap.config.hideHeader != "undefined" && LkRosMap.config.hideHeader) ?
  "" :
  "\
    <div id=\"LkRosMap.mapHeader\"> \
      <h1>Kartenthema: " + LkRosMap.config.name + "</h1> \
    </div> \
";

LkRosMap.views.mapper.mapHeader = {
  html: html
}
