LkRosMap.models.Gemarkung = function(store) {
  var params = {
    gid: store.ogc_fid,
    type: 'MultiPolygonFeature',
    schluesselgesamt: store.schluesselgesamt,
    kreis: store.kreis,
    kreisname: store.kreisname,
    amt: store.amt,
    amtsname: store.amtsname,
    gemeinde: store.gemeinde,
    gemeindename: store.gemeindename,
    gemarkung: store.gemarkung,
    gemarkungsname: store.gemarkungsname,
    anz_flur: store.anz_flur,
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
          color: 'rgb(90, 90, 170)',
          width: 1
        })
      }),
      icon: 'Gemarkung'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('gemarkungsname') + ' (' + this.get('gemarkung')+ ')');
    lines.push('<b>Schlüssel gesamt:</b>&nbsp;' + this.get('schluesselgesamt'));
    lines.push('<b>im Kreis:</b>&nbsp;' + this.get('kreisname') + ' (' + this.get('kreis') + ')');
    lines.push('<b>im Amt:</b>&nbsp;' + this.get('amtsname') + ' (' + this.get('amt') + ')');
    lines.push('<b>in Gemeinde:</b>&nbsp;' + this.get('gemeindename') + ' (' + this.get('gemeinde') + ')');
    lines.push('<b>Anzahl Fluren:</b>&nbsp;' + this.get('anz_flur'));
    lines.push('<b>Fläche:</b>&nbsp;' + this.get('flaeche') / 10000 + ' ha');
    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Gemarkung');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  feature.titleFormatter = function() {
    return this.get('gemarkungsname');
  };

  feature.addressText = function() {
    return ('Gemarkung ' + this.get('gemarkungsname')).trim();
  };

  return feature;
}