LkRosMap.models.searchResult = function(name, lat, lon) {
  var feature = new ol.Feature({
        type: 'SearchResult',
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat], LkRosMap.viewProjection)),
        name: name,
        selected: false
      }),
      style = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: '../img/SearchPoint.png'
        }))
      });

  feature.setStyle(style);

  feature.data = function() {
    var html  = this.get('name') /*+ '<br>';
        html += '' + this.latlng().join(', ')*/;
    return html;
  };

  feature.address = function() {
    return this.get('name');
  };

  feature.addressText = function() {
    return this.get('name');
  };

  feature.xy = function() {
    var xy = this.getGeometry().getCoordinates();
    return xy[0] + ', ' + xy[1];
  };

  feature.latlng = function() {
    var lnglat = ol.proj.transform(this.getGeometry().getCoordinates(), LkRosMap.viewProjection, LkRosMap.baseProjection);
    return [lnglat[1], lnglat[0]];
  };

  feature.preparePopup = function() {
    LkRosMap.popup.feature = this;
    $('#LkRosMap\\.popup').attr('class','pm-popup pm-suchergebnis');
    $('#LkRosMap\\.popup-title').html('Suchergebnis');
    $('#LkRosMap\\.popup-data').html(this.data());
    $('#LkRosMap\\.popup').attr('lat', lat);
    $('#LkRosMap\\.popup').attr('lon', lon);
    $('#LkRosMap\\.popup').attr('name', name);
    $('.pm-popup-function-clear').attr('controller','geocoder');
    $('.pm-popup-function-clear').show();
    $('.pm-popup-function-more').hide();
  };

  feature.unselect = function() {
    if (this.get('selected')) {
      //console.log('Unselect feature: ' + this.get('name'));
      // close Popup
      LkRosMap.popup.setPosition(undefined);

      // set this feature to unselected
      this.set('selected', false);
    }
  };

  feature.select = function() {
    if (!this.get('selected')) {
      //console.log('Select feature: ' + this.get('name'));

      // show popup
      //console.log('show popup');
      this.preparePopup();
      LkRosMap.popup.setPosition(
        this.getGeometry().getCoordinates()
      );

      // set this feature to selected
      this.set('selected', true);
      //console.log('set this feature: ' + this.get('name') + ' as selected Feature.');
      LkRosMap.mapper.selectedFeature = this;
    }
  };
  return feature;
};
