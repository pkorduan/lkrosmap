LkRosMap.models.Naturdenkmal = function(store) {
  var params = {
    gid: store.gid,
    type: 'PointFeature',
    typ: store.typ,
    aktenzeichen: store.aktenzeichen,
    kommentar: store.kommentar,
    standort: store.standort,
    unterschutzstellung: store.unterschutzstellung,
    rechtsquelle: store.rechtsquelle,
    bild: store.bild,
    geometry: new ol.geom.Point([Number(store.x), Number(store.y)]),
    icon: (store.typ == 'B' ? 'nd_baum' : 'nd_stein')
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var imgSrc = 'https://geoportal.lkros.de/site/img/naturdenkmale/' + this.get('aktenzeichen') + '.jpg',
        lines = [];

    lines.push('<b>Typ:</b>&nbsp;' + this.get('typ'));
    lines.push('<b>Standort:</b>&nbsp;' + this.get('standort'));
    lines.push('<b>Akz:</b>&nbsp;' + this.get('aktenzeichen') + ' <b>id:</b> ' + this.get('gid'));
    if (this.get('unterschutzstellung'))
      lines.push('<b>Unterschutzstellung:</b>&nbsp;' + this.get('unterschutzstellung'));
    if (this.get('rechtsquelle'))
      lines.push('<b>Rechtsquelle:</b>&nbsp;' + this.get('rechtsquelle'));
    lines.push('<a href="' + imgSrc + '" target="_blank"><img class="lkrosmap-infowindow-image" src="' + imgSrc + '" onerror="this.style=\'display: none;\'"></a>');

    return lines.join('<br>');
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindow').attr('class','lkrosmap-infowindow');
    $('#LkRosMap\\.infoWindowTitle').html('Naturdenkmal');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}