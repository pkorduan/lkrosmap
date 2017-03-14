LkRosMap.models.Amtsverwaltung = function(store) {
  var params = {
    gid: store.ogc_fid,
    type: 'MultiPolygonFeature',
    regionalschluessel: store.regionalschluessel,
    kreisname: store.kreisname,
    kreis: store.kreis,
    amt: store.amt,
    amtsname: store.amtsname,
    anz_gemeinden: store.anz_gemeinden,  
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
          color: 'rgb(0, 0, 255)',
          width: 1
        })
      }),
      icon: 'Amtsverwaltung'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('amtsname') + ' (' + this.get('amt') + ')');
    lines.push('<b>Regionalschlüssel:</b>&nbsp;' + this.get('regionalschluessel'));
    lines.push('<b>im Kreis:</b>&nbsp;' + this.get('kreisname') + ' (' + this.get('kreis') + ')');
    lines.push('<b>Anzahl Gemeinden:</b>&nbsp;' + this.get('anz_gemeinden'));
    lines.push('<b>Fläche:</b>&nbsp;' + this.get('flaeche') / 10000 + ' ha');
    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Amtsverwaltung');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}