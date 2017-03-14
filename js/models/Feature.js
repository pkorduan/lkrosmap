LkRosMap.models.Feature = function(params) {
  var feature = new ol.Feature(params);

  // set default classes if not exists
  if (typeof(feature.get('classes')) == 'undefined') {
    feature.set('classes', [{
      name: 'alle',
      expression: function() {
        return true;
      }
    }])
  }

  // set the class by classItem and expressions
  $.each(feature.get('classes'), function(i, c) {
    if (c.expression(feature.get(feature.get('classItem')))) {
      feature.set('class', c);
    }
  });
  // alle andere setze auf die erste Klasse in Classes
  if (typeof(feature.get('classes')) == 'undefined') {
    feature.set('class', feature.classes[0]);
  }

  // set style
  if (feature.get('typ') == 'PointFeature') {
    feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: '../img/' + feature.get('class').icon + '.png',
          scale: 0.25
        }))
      })
    );
  }

  if (feature.get('typ') == 'MultiPolygonFeature') {
    feature.setStyle(
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: feature.get('outlinecolor'),
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, ' + feature.get('opacity') + ')'
        })
      })
    )
  }

  // functions that all features models shall have
/*  feature.d = function(t) {
    return t;
  }*/

  feature.select = function() {
    this.prepareInfoWindow();

    LkRosMap.selectedFeature = this;
    LkRosMap.infoWindow.getElement().show();
    LkRosMap.infoWindow.setPosition(
      this.getGeometry().getCoordinates()
    );
  };

  feature.unselect = function() {
    LkRosMap.infoWindow.getElement().hide();
    LkRosMap.selectedFeature = false;
  };

  return feature;
};