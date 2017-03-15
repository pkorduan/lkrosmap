LkRosMap.models.SearchControl = function(params) {
  var button = $('<button/>').attr({
        id: 'LkRosMap.searchButton',
        title: 'Ein- und Ausblenden der Suchmaske'
      }),
      element = $('<div>').attr({
        class : 'lkrosmap-search-control ol-unselectable ol-control bar'
      });

  button.html('<i class="fa fa-search"></i>');

  element.append(button);
  element.append(LkRosMap.controller.geocoder.views.search.html);

  return new ol.control.Control({
    element: element.get(0)}
  );
};