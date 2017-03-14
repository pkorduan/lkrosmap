LkRosMap.models.Gemeindeteil = function(store) {
  var params = {
    gid: store.ogc_fid,
    type: 'MultiPolygonFeature',
    kreis: store.kreis,
    kreisname: store.kreisname,
    amt: store.amt,
    amtsname: store.amtsname,
    gemeinde: store.gemeinde,
    gemeindename: store.gemeindename,
    gemeindeteil: store.gemeindeteil,
    anz_gemarkg: store.anz_gemarkg,  
    flaeche: store.flaeche,
    aktualitaet: store.aktualiaet,
    geometry: new ol.geom.Polygon(store.geometry.coordinates),
    classItem: 'type',
    classes: [{
      name: '',
      expression: function(value) {
        return true
      },
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgb(170, 90, 255)',
          width: 1
        })
      }),
      icon: 'Gemeindeteil'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('gemeindeteil'));
    lines.push('<b>im Kreis:</b>&nbsp;' + this.get('kreisname') + ' (' + this.get('kreis') + ')');
    lines.push('<b>im Amt:</b>&nbsp;' + this.get('amtsname') + ' (' + this.get('amt') + ')');
    lines.push('<b>in Gemeinde:</b>&nbsp;' + this.get('gemeindename') + ' (' + this.get('gemeinde') + ')');
    lines.push('<b>Fläche [km2]:</b>&nbsp;' + this.get('flaeche'));
    lines.push('<b>Aktualität:</b>&nbsp;' + this.get('aktualitaet'));
    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Gemeindeteil');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}