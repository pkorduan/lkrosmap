LkRosMap.controls.configControl = function(opt_options) {
  var options = opt_options || {};

  var button = $('<button/>').attr({ id: 'LkRosMap.configButton' });

  button.html('<i class=\"fa fa-wrench\"></i>');

  var this_ = this;

  button.click(LkRosMap.controller.helper.showConfig);

  var element = $('<div></div>').attr({
    class: 'lkrosmap-config-control ol-unselectable ol-control',
    title: 'Anzeige aktueller Karteneinstellungen'
  });
  element.append(button);
  
  return new ol.control.Control({
    element: element.get(0),
    target: options.target
  });
}