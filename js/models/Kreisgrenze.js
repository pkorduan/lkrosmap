LkRosMap.models.Kreisgrenze = function(store) {
  var params = {
    gid: store.ogc_fid,
    type: 'MultiPolygonFeature',
    kreisname: store.kreisname,
    regionalschluessel: store.regionalschluessel,
    verwaltungsebene: store.verwaltungsebene,
    nuts_level: store.nuts_level,
    nuts_code: store.nuts_code,
    flaeche: store.flaeche,
    aktualitaet: store.aktualitaet,
    geometry: new ol.geom.Polygon(store.geometry.coordinates),
    classItem: 'type',
    classes: [{
      name: '',
      expression: function(value) {
        return true
      },
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgb(255, 145, 83)',
          width: 1
        })
      }),
      icon: 'Kreisgrenze'
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Name:</b>&nbsp;' + this.get('kreisname'));
    lines.push('<b>Regionalschlüssel:</b>&nbsp;' + this.get('regionalschluessel'));
    lines.push('<b>Verwaltungsebene:</b>&nbsp;' + this.get('verwaltungsebene'));
    lines.push('<b>nuts level:</b>&nbsp;' + this.get('nuts_level') + ' <b>nuts code:</b>&nbsp;' + this.get('nuts_code'));
    lines.push('<b>Fläche:</b>&nbsp;' + this.get('flaeche') + ' km&sup2;');
    lines.push('<b>Aktualität:</b>&nbsp;' + this.get('aktualitaet'));

    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Kreisgrenze');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  feature.titleFormatter = function() {
    return this.get('kreisname');
  };
  return feature;
}