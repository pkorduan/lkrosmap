LkRosMap.models.Gemeinde = function(store) {
  var params = {
    gid: store.ogc_fid,
    type: 'MultiPolygonFeature',
    regionalschluessel: store.regionalschluessel,
    kreisname: store.kreisname,
    kreis: store.kreis,
    amtsname: store.amtsname,
    amt: store.amt,
    gemeinde: store.gemeinde,
    gemeindename: store.gemeindename,
    anz_gemarkg: store.anz_gemarkg,  
    flaeche: store.flaeche,
    geometry: new ol.geom.Polygon(store.geometry.coordinates),
    classItem: 'type',
    classes: [{
      name: '',
      expression: function(value) {
        return true
      },
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgb(255, 0, 0)',
          width: 1
        })
      }),
      icon: 'Gemeinde'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('gemeindename') + ' (' + this.get('gemeinde') + ')');
    lines.push('<b>Regionalschlüssel:</b>&nbsp;' + this.get('regionalschluessel'));
    lines.push('<b>im Kreis:</b>&nbsp;' + this.get('kreisname') + ' (' + this.get('kreis') + ')');
    lines.push('<b>im Amt:</b>&nbsp;' + this.get('amtsname') + ' (' + this.get('amt') + ')');
    lines.push('<b>Anzahl Gemarkungen:</b>&nbsp;' + this.get('anz_gemarkg'));
    lines.push('<b>Fläche [km2]:</b>&nbsp;' + this.get('flaeche'));
    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Landkreis');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}