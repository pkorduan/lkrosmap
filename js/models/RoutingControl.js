LkRosMap.models.RoutingControl = function(params) {
  var button = $('<button/>').attr({
        id: 'LkRosMap.routeSearchButton',
        title: 'Ein- und Ausblenden der Routingmaske'
      }),
      element = $('<div>').attr({
        class : 'lkrosmap-routing-control ol-unselectable ol-control bar'
      });

  button.html('<i class="fa fa-car"></i>');

  element.append(button);
  element.append(LkRosMap.controller.router.views.search.html);

  return new ol.control.Control({
    element: element.get(0)}
  );
};