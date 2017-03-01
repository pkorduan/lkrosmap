LkRosMap.models.Feature = function(params) {
  var feature = new ol.Feature(params),
      style = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: '../img/' + feature.get('icon') + '.png',
          scale: 0.25
        }))
      });

  feature.setStyle(style);

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