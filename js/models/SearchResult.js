LkRosMap.models.searchResult = function(name, lat, lon) {
  var feature = new ol.Feature({
        type: 'Addresse',
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

  feature.dataFormatter = function() {
    var lines = [];

    lines.push(this.addressText('name'));
    lines.push('<b>WGS 84:</b><br>' + this.latlng());
    lines.push('<b>UTM 33:</b><br>' + this.xy());

    return lines.join('<br>');
  }

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html(this.get('type'));
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').show();
  };

  feature.unselect = function() {
    LkRosMap.infoWindow.getElement().hide();
    LkRosMap.selectedFeature = false;
  };

  feature.select = function() {
    this.prepareInfoWindow();

    LkRosMap.selectedFeature = this;
    LkRosMap.infoWindow.getElement().show();
    LkRosMap.infoWindow.setPosition(
      this.getGeometry().getCoordinates()
    );
  };
  return feature;
};
