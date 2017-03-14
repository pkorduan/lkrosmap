LkRosMap.models.legendControl = function(params) {
  var buttonElement = $('<button/>').attr({
        id: 'LkRosMap.legendButton',
        title: 'Ein- und Ausblenden der Legende'
      }),
      checkLayers = (typeof(params.checkLayers) == 'undefined' ? [] : params.checkLayers),
      switchElement = $('<div>').attr({ id: 'LkRosMap.legend' }),
      layersElement;

  buttonElement.html('Legende');

  layersElement = $('<div>').attr({ id: 'LkRosMap.checklegend' });
  layersElement.append(
    $.map(checkLayers, function(layer, index) {
      var html = layer.get('name');
          html += '<div id="LkRosMap.checkLayerClasses' + index + '">';
          html += $.map(layer.getSource().getFeatures()[0].get('classes'), function(c, i) {
            return '<img src="../img/' + c.icon + '.png" width="15" style="margin-left: 20px"> ' + c.name;
          }).join('<br>');
          html += '</div>';
      return html;
    }).join('<br>')
  );

  switchElement.append(layersElement);
  
  controlElement = $('<div>').attr({ class: 'lkrosmap-legend-control ol-unselectable ol-control'})
  controlElement.append(buttonElement);
  controlElement.append(switchElement);

  return new ol.control.Control({ element: controlElement.get(0)});
};