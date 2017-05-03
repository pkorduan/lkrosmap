LkRosMap.views.router.search = {
  html: " \
    <div id=\"LkRosMap.routingBox\">\
      <div id=\"LkRosMap.routeSearchFields\">\
        <input id=\"LkRosMap.fromField\" class=\"lkrosmap-route-search-field\" type=\"text\" name=\"from\" size=\"25\" value=\"\" placeholder=\"Startadresse eingeben\">\
        <i id=\"LkRosMap.routeFromLos\" class=\"fa fa-search lkrosmap-search-button\"></i>\
        <div\
          id=\"LkRosMap.fromFieldResultBox\"\
          class=\"lkrosmap-search-result-box\"\
        ></div>\
        <input id=\"LkRosMap.toField\" class=\"lkrosmap-route-search-field\" type=\"text\" name=\"to\" size=\"25\" value=\"\" placeholder=\"Zieladresse eingeben\">\
        <i id=\"LkRosMap.routeToLos\" class=\"fa fa-search lkrosmap-search-button\"></i>\
        <div\
          id=\"LkRosMap.toFieldResultBox\"\
          class=\"lkrosmap-search-result-box\"\
        ></div>\
        <input id=\"LkRosMap.removeRoute\" type=\"button\" value=\"Route löschen\"><span id=\"LkRosMap.routingInfo\"></span>\
      </div>\
    </div>\
  "
}