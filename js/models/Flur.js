LkRosMap.models.Flur = function(store) {
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
    gemarkungsteilflur: store.gemarkungsteilflur,
    anz_fs: store.anz_fs,
    label: store.label,
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
          color: 'rgb(40, 40, 40)',
          width: 1
        })
      }),
      icon: 'Flur'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('label'));
    lines.push('<b>Schlüssel gesamt:</b>&nbsp;' + this.get('schluesselgesamt'));
    lines.push('<b>im Kreis:</b>&nbsp;' + this.get('kreisname') + ' (' + this.get('kreis') + ')');
    lines.push('<b>im Amt:</b>&nbsp;' + this.get('amtsname') + ' (' + this.get('amt') + ')');
    lines.push('<b>in Gemeinde:</b>&nbsp;' + this.get('gemeindename') + ' (' + this.get('gemeinde') + ')');
    lines.push('<b>in Gemarkung:</b>&nbsp;' + this.get('gemarkungsname') + ' (' + this.get('gemarkung') + ')');
    lines.push('<b>Anzahl Flurstücke:</b>&nbsp;' + this.get('anz_fs'));
    lines.push('<b>Fläche:</b>&nbsp;' + this.get('flaeche') / 10000 + ' ha');
    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Flur');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}