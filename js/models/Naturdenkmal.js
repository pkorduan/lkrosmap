LkRosMap.models.Naturdenkmal = function(store) {
  var params = {
    gid: store.gid,
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
  
  return feature;
}