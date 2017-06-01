LkRosMap.models.Feature = function(params) {
  var feature = new ol.Feature(params);

  feature.setId(feature.get('gid'));
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

  // alle anderen setze auf die erste Klasse in Classes
  if (typeof(feature.get('class')) == 'undefined') {
    feature.set('class', feature.classes[0]);
  }

  // set style
  if (feature.get('type') == 'PointFeature') {
    feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
/*          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',*/
          opacity: 0.75,
          src: '../img/' + feature.get('class').icon + '.png',
          scale: (feature.get('class').scale ? feature.get('class').scale : 0.7)
        })
      })
    );
  }

  if (feature.get('type') == 'MultiPolygonFeature') {
    feature.setStyle(feature.get('class').style);
  }

  // functions that all features models shall have
/*  feature.d = function(t) {
    return t;
  }*/

  feature.latlng = function() {
    var center = [];
    if (feature.get('type') == 'PointFeature') {
      center = this.getGeometry().getCoordinates();
    }
    else {
      center = ol.extent.getCenter(this.getGeometry().getExtent());
    }
    
    center = ol.proj.transform(center, LkRosMap.viewProjection, LkRosMap.baseProjection);
    return [center[1], center[0]];
  };

  feature.select = function() {
    if (this.get('type') == 'MultiPolygonFeature') {
      this.setStyle(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          }),
          zIndex: 999
        })
      );
    }
    else {
      this.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 0.75,
            src: '../img/' + this.get('class').icon + '.png',
            scale: 1.5
          }),
          zIndex: 999
        })
      );
    }

    this.prepareInfoWindow();

    LkRosMap.selectedFeature = this;

    $(LkRosMap.infoWindow.getElement()).show();
    LkRosMap.infoWindow.setPosition(
      (this.get('type') == 'PointFeature' ? this.getGeometry().getCoordinates() : ol.extent.getCenter(this.getGeometry().getExtent()))
    );
  };

  feature.unselect = function() {
    $(LkRosMap.infoWindow.getElement()).hide();
    LkRosMap.selectedFeature = false;

    // set style
    if (this.get('type') == 'PointFeature') {
      this.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
  /*          anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',*/
            opacity: 0.75,
            src: '../img/' + this.get('class').icon + '.png',
            scale: 0.7
          })
        })
      );
    }

    if (this.get('type') == 'MultiPolygonFeature') {
      this.setStyle(this.get('class').style);
    }

  };

  return feature;
};