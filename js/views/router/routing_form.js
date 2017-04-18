LkRosMap.views.geocoder.search = {
  html: " \
    <div id=\"LkRosMap.searchBox\">\
      <input id=\"LkRosMap.searchField\" type=\"text\" name=\"address\" size=\"50\" value=\"\" placeholder=\"Suchbegriff eingeben\">\
      <i id=\"LkRosMap.searchFieldClear\" class=\"fa fa-times-circle\"></i>\
      <button id=\"LkRosMap.addressSearchButton\" class=\"lkrosmap-search-type-button lkrosmap-search-type-selected\" title=\"nach Adressen, Gemarkungen und Flurstücken suchen\"><i class=\"fa fa-home\"></i></button>\
      <button id=\"LkRosMap.themeSearchButton\" class=\"lkrosmap-search-type-button\" title=\"nach Objekten in der Karte suchen\"><i class=\"fa fa-map-marker\"></i></button>\
      <input type=\"button\" id=\"LkRosMap.searchLos\" value=\"Los\"/>\
      <div\
        id=\"LkRosMap.searchFieldResultBox\"\
        class=\"lkrosmap-search-result-box\"\
        style=\"display:none;\">\
      </div>\
    </div>\
  "
}