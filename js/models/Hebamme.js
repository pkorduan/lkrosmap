LkRosMap.models.Hebamme = function(store) {
  var params = {
    gid: store.id,
    type: 'PointFeature',
    name: store.name,
    strasse_name: store.strasse_name,
    hausnummer: store.hausnummer,
    hausnummer_zusatz: store.hausnummer_zusatz,
    postleitzahl: store.postleitzahl,
    ort: store.ort,
    telefon: store.telefon,
    email: store.email,
    geometry: new ol.geom.Point([Number(store.x), Number(store.y)]),
    classItem: 'typ',
    classes: [{
      name: 'Hebammen',
      expression: function(value) {
        return true;
      },
      icon: 'fh_hebamme',
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

    lines.push('<b>Name:</b>&nbsp;' + this.get('name'));
    lines.push(this.addressText());
    lines.push('<b>Tel:</b>&nbsp;' + this.get('telefon'));
    if (this.get('email')) {
      lines.push('<b>E-Mail:</b>' + this.get('email'));
    }

    return lines.join('<br>');
  };

  feature.titleFormatter = function() {
    return this.get('name') + ' Gemeinde ' + this.get('ort');
  };

  feature.addressText = function() {
    return (this.get('strasse_name') + ' ' + this.get('hausnummer') + ' ' + this.get('hausnummer_zusatz') + '<br>' + this.get('postleitzahl') + ' ' + this.get('ort')).trim();
  };

  feature.prepareInfoWindow = function() {
    $('#LkRosMap\\.infoWindowTitle').html('Hebamme');
    $('#LkRosMap\\.infoWindowData').html(this.dataFormatter());
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
  };

  return feature;
}