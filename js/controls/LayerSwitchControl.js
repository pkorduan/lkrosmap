LkRosMap.controls.layerSwitchControl = function(params) {
  var buttonElement = $('<button/>').attr({
        id: 'LkRosMap.layerSwitcherButton',
        title: 'Ein- und Ausschalten von Datenebenen'
      }),
      radioLayers = (typeof(params.radioLayers) == 'undefined' ? [] : params.radioLayers),
      checkLayers = (typeof(params.checkLayers) == 'undefined' ? [] : params.checkLayers),
      switchElement = $('<div>').attr({ id: 'LkRosMap.layerSwitch' }),
      layersElement;

  buttonElement.html('<i class=\"fa fa-server fa-rotate-180\"></i>');

  layersElement = $('<div>').attr({ id: 'LkRosMap.radioLayerSwitch' });
  layersElement.append('<h2>Hintergrund</h2>');

  layersElement.append(
    $.map(radioLayers, function(layer, index) {
      var html = '<input type="radio" name="radioLayerSwitch" value="' + index + '"' + (index == 0 ? ' checked' : '') + '> ' + layer.get('name');
      return html;
    }).join('<br>')
  );

  switchElement.append(layersElement); 

  layersElement = $('<div>').attr({ id: 'LkRosMap.checkLayerSwitch' });
  layersElement.append('<h2>Angebote</h2>');
  layersElement.append(
    $.map(checkLayers, function(layer, index) {
      var html = '<input id="LkRosMap.checkLayerSwitch_' + index + '" type="checkbox" name="checkLayerSwitch_' + index + '" value="' + index + '" class="lkrosmap-check-layer-switch" checked> ' + layer.get('name');

/*      html += '<div id="LkRosMap.checkLayerClasses' + index + '">';
      html += $.map(layer.getSource().getFeatures()[0].get('classes'), function(c, i) {
        return '<img src="../img/' + c.icon + '.png" width="15" style="margin-left: 20px"> ' + c.name;
      }).join('<br>');
      html += '</div>';
*/
      return html;
    }).join('<br>')
  );

  switchElement.append(layersElement);
  
  controlElement = $('<div>').attr({ class: 'lkrosmap-layerswitcher-control ol-unselectable ol-control'})
  controlElement.append(buttonElement);
  controlElement.append(switchElement);

  return new ol.control.Control({ element: controlElement.get(0)});
};