LkRosMap.models.legendControl = function(params) {
  var buttonElement = $('<button/>').attr({
        id: 'LkRosMap.legendButton',
        title: 'Ein- und ausblenden der Legende'
      }),
      checkLayers = (typeof(params.checkLayers) == 'undefined' ? [] : params.checkLayers),
      switchElement = $('<div><h2>Legende</h2></div>').attr({ id: 'LkRosMap.legend' }),
      layersElement;

  buttonElement.html('<i class="fa fa-bars"></i>');

  layersElement = $('<div>').attr({ id: 'LkRosMap.checklegend' });
  layersElement.append(
    $.map(checkLayers, function(layer, index) {
      var html = '<div id="LkRosMap.checkLayerClasses' + index + '">';
          html += layer.get('name') + '<br>';
          html += $.map(layer.getSource().getFeatures()[0].get('classes'), function(c, i) {
            return '<img src="../img/' + c.icon + '.png" style="margin-left: 20px"> ' + c.name;
          }).join('<br>');
          html += '</div>';
      return html;
    }).join('')
  );

  switchElement.append(layersElement);
  
  controlElement = $('<div>').attr({ class: 'lkrosmap-legend-control ol-unselectable ol-control'})
  controlElement.append(switchElement);
  controlElement.append(buttonElement);

  return new ol.control.Control({ element: controlElement.get(0)});
};