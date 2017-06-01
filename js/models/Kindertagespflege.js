LkRosMap.models.Kindertagespflege = function(store) {
  var params = {
    gid: store.id,
    type: 'PointFeature',
    kreis_name: store.kreis_name,
    gemeindeverband_name: store.gemeindeverband_name,
    gemeinde_name: store.gemeinde_name,
    gemeindeteil_name: store.gemeindeteil_name,
    strasse_name: store.strasse_name,
    hausnummer: store.hausnummer,
    hausnummer_zusatz: store.hausnummer_zusatz,
    postleitzahl: store.postleitzahl,
    kontaktperson: store.kontaktperson,
    telefon: store.telefon,
    geometry: new ol.geom.Point([Number(store.x), Number(store.y)]),
    classItem: 'typ',
    classes: [{
      name: 'Kindertagespflege',
      expression: function(value) {
        return true;
      },
      icon: 'fh_tagesmutti',
      scale: 0.5
    }]
  },

  feature = new LkRosMap.models.Feature(params);

  // functions that only this model shall have.
  feature.c = function(t) {
    return t;
  };

  feature.dataFormatter = function() {
    var lines = [];

    lines.push('<b>Amt:</b>&nbsp;' + this.get('gemeindeverband_name'));
    lines.push('<b>Gemeinde:</b>&nbsp;' + this.get('gemeinde_name') + (this.get('gemeindeteil_name') != '' ? ' / ' + this.get('gemeindeteil_name') : ''));
    lines.push('<b>Kontakt:</b><br>' + this.get('kontaktperson'));
    lines.push(this.addressText());

    lines.push('<b>Tel:</b>&nbsp;' + this.get('telefon'));
    if (this.get('email')) {
      lines.push('<b>E-Mail:</b>' + this.get('email'));
    }

    return lines.join('<br>');
  };

  feature.titleFormatter = function() {
    return this.get('kontaktperson') + ' Gemeinde ' + this.get('gemeinde_name');
  };

  feature.addressText = function() {
    return (this.get('strasse_name') + ' ' + this.get('hausnummer') + ' ' + this.get('hausnummer_zusatz') + '<br>' + this.get('postleitzahl') + ' ' + this.get('gemeinde_name')).trim();
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindowTitle').html('Kindertagespflege');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}