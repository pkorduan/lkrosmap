LkRosMap.views.mapper = {};

LkRosMap.controller.mapper = {
  views: LkRosMap.views.mapper,

  loadViews: function() {
    var mapper = LkRosMap.views.mapper;
    $('#LkRosMap\\.container').html(mapper.mapHeader.html);
    $('#LkRosMap\\.container').append(mapper.map.html);
    $('#LkRosMap\\.container').append(mapper.popup.html);
  },

  createTileLayers : function() {
    LkRosMap.tileLayers = [];

    // create the ORKA-Map Layer
    LkRosMap.tileLayers.push(
      new ol.layer.Tile({
        name: 'ORKA farbig',
        source: new ol.source.TileImage({
          attributions: [
            new ol.Attribution({
              html: 'Kartenbild &copy; Hansestadt Rostock (CC BY 4.0) | Kartendaten &copy; OpenStreetMap (ODbL) und LkKfS-MV'
            })
          ],
          projection: LkRosMap.viewProjection,
          tileGrid: new ol.tilegrid.TileGrid({
          origin: [-464849.38, 5057815.86858],
          resolutions: [4891.96981025128, 3459.1450261886484, 2445.9849051256397,
                        1729.5725130942737,1222.9924525628198, 864.7862565471368,
                        611.4962262814098, 432.3931282735683, 305.7481131407049,
                        216.19656413678416, 152.8740565703524, 108.09828206839207,
                        76.43702828517618, 54.049141034196026, 38.21851414258809,
                        27.024570517098006, 19.109257071294042, 13.512285258549001,
                        9.55462853564702, 6.7561426292745, 4.77731426782351,
                        3.3780713146372494, 2.3886571339117544, 1.6890356573186245,
                        1.1943285669558772, 0.8445178286593122, 0.5971642834779384,
                        0.422258914329656, 0.29858214173896913, 0.21112945716482798,
                        0.14929107086948457, 0.10556472858241398, 0.07464553543474227,
                        0.05278236429120697, 0.03732276771737113]
          }),
          tileUrlFunction: function(tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if (x < 0 || y < 0) {
              return '';
            }

            var url = 'http://www.orka-mv.de/geodienste/orkamv/tms/1.0.0/orkamv/epsg_25833/'
                      + z + '/' + x + '/' + y + '.png';

            return url;
          }
        }),
        // user data
        layerExtent: LkRosMap.config.layerExtent
      })
    );

    // create the ORKA-Map Layer
    LkRosMap.tileLayers.push(
      new ol.layer.Tile({
        name: 'ORKA grau',
        visible: false,
        source: new ol.source.TileImage({
          attributions: [
            new ol.Attribution({
              html: 'Kartenbild &copy; Hansestadt Rostock (CC BY 4.0) | Kartendaten &copy; OpenStreetMap (ODbL) und LkKfS-MV'
            })
          ],
          projection: LkRosMap.viewProjection,
          tileGrid: new ol.tilegrid.TileGrid({
          origin: [-464849.38, 5057815.86858],
          resolutions: [4891.96981025128, 3459.1450261886484, 2445.9849051256397,
                        1729.5725130942737,1222.9924525628198, 864.7862565471368,
                        611.4962262814098, 432.3931282735683, 305.7481131407049,
                        216.19656413678416, 152.8740565703524, 108.09828206839207,
                        76.43702828517618, 54.049141034196026, 38.21851414258809,
                        27.024570517098006, 19.109257071294042, 13.512285258549001,
                        9.55462853564702, 6.7561426292745, 4.77731426782351,
                        3.3780713146372494, 2.3886571339117544, 1.6890356573186245,
                        1.1943285669558772, 0.8445178286593122, 0.5971642834779384,
                        0.422258914329656, 0.29858214173896913, 0.21112945716482798,
                        0.14929107086948457, 0.10556472858241398, 0.07464553543474227,
                        0.05278236429120697, 0.03732276771737113]
          }),
          tileUrlFunction: function(tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if (x < 0 || y < 0) {
              return '';
            }

            var url = 'https://www.orka-mv.de/geodienste/orkamv/tms/1.0.0/orkamv-graustufen/epsg_25833/'
                      + z + '/' + x + '/' + y + '.png';

            return url;
          }
        }),
        // user data
        layerExtent: LkRosMap.config.layerExtent
      })
    );
  },

  loadFeatures: function(store, layer, model) {
    var source = layer.getSource(),
        i;

    for (i = 0; i < store.length; i++) {
      switch (model) {
        case 'Naturdenkmal': {
          feature = new LkRosMap.models.Naturdenkmal(store[i]);
        } break;

        case 'Kreisgrenze': {
          feature = new LkRosMap.models.Kreisgrenze(store[i]);
        } break;

        case 'Amtsverwaltung': {
          feature = new LkRosMap.models.Amtsverwaltung(store[i]);
        } break;

        case 'Gemeinde': {
          feature = new LkRosMap.models.Gemeinde(store[i]);
        } break;

        case 'Gemeindeteil': {
          feature = new LkRosMap.models.Gemeindeteil(store[i]);
        } break;

        case 'Gemarkung': {
          feature = new LkRosMap.models.Gemarkung(store[i]);
        } break;

        case 'Flur': {
          feature = new LkRosMap.models.Flur(store[i]);
        } break;

        default: {
          store[i].icon = 'Default';
          feature = new LkRosMap.models.Feature(store[i]);
        }
      }
      source.addFeature(feature);
    }
    return layer;
  }, 

  createVectorLayers: function() {
    LkRosMap.vectorLayers = [];

    $.each(LkRosMap.config.layers, function(index, layer_config) {
      LkRosMap.controller.mapper.loadJSON(layer_config.url, function(response) {
        var store = JSON.parse(response),
            layer = new ol.layer.Vector({
              name: layer_config.name,
              opacity: 1,
              source: new ol.source.Vector({
                attributions: [
                  new ol.Attribution({
                    html: layer_config.attribution
                  })
                ],
                projection: LkRosMap.viewProjection,
                features: []
              })
            });

        layer = LkRosMap.controller.mapper.loadFeatures(store, layer, layer_config.model);
        LkRosMap.vectorLayers.push(layer);
      });
      // loadIndex:
      LkRosMap.controller.mapper.loadJSON(layer_config.indexUrl, function(response) {
        var searchIndex = JSON.parse(response);

          $.each(searchIndex, function(word, identifiers) {
            if (LkRosMap.searchIndex[word] === undefined) {
              LkRosMap.searchIndex[word] = [];
            }
            LkRosMap.searchIndex[word].push({ index: layer_config.index, feature_ids: identifiers});
          });
      });
    });
  },

  showMap: function () {
    return this.views.map.html;
  },
  
  setEventHandlers: function() {
    LkRosMap.map.on(
      'click',
      function(evt) {
        var selectedFeatures = {};

        LkRosMap.map.forEachFeatureAtPixel(
          evt.pixel,
          function(feature, layer) {
            if (selectedFeatures[layer.get('name')] === undefined) {
              selectedFeatures[layer.get('name')] = {
                layer: layer,
                features: []
              };
            }
            selectedFeatures[layer.get('name')].features.push(feature);
          }
        );
        if (Object.keys(selectedFeatures).length > 0) {
          LkRosMap.controller.mapper.showInfoWindow(selectedFeatures, evt);
        }
        else {
          $(LkRosMap.infoWindow.getElement()).hide();
        }
      }
    );

    $('#LkRosMap\\.infoWindowCloser').on(
      'click',
      function(evt) {
        $(LkRosMap.infoWindow.getElement()).hide();
        $('#LkRosMap\\.infoWindowCloser').blur();
        return false;
      }
    );

    $('#LkRosMap\\.layerSwitcherButton').on(
      'click',
      function(evt) {
        $('#LkRosMap\\.layerSwitch').toggle();
        $('#LkRosMap\\.layerSwitcherButton').blur();
      }
   );

   $.each($('#LkRosMap\\.radioLayerSwitch').children().filter(':input'), function(i, checkbox) {
     $(checkbox).on(
       'click',
       function(evt) {
         LkRosMap.controller.mapper.toggleRadioLayer(evt);
       }
     );
   });

    $.each($('#LkRosMap\\.checkLayerSwitch').children().filter(':input'), function(i, checkbox) {
      $(checkbox).on(
        'click',
        function(evt) {
          LkRosMap.controller.mapper.toggleCheckLayer(evt);
        }
      );
    });

    $('#LkRosMap\\.legendButton').on(
      'click',
      function(evt) {
        $('#LkRosMap\\.legend').toggle();
        $('#LkRosMap\\.legendButton').blur();
      }
    );

  },

  init: function() {
    var controller = LkRosMap.controller.mapper;

    this.loadViews();

    proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    proj4.defs("EPSG:25832","+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

    this.createTileLayers();
    this.createVectorLayers();

    function constrainMapToExtend(map, extent) {
      var mapView = map.getView(),
        viewExtent = mapView.calculateExtent(map.getSize()),
        halfWidth = ol.extent.getWidth(viewExtent) / 2.0,
        halfHeight= ol.extent.getHeight(viewExtent) / 2.0,
        newCenterConstraint = [extent[0] + halfWidth, extent[1] + halfHeight, extent[2] - halfWidth, extent[3] - halfHeight];
        
  //    mapView.constraints_.center = ol.View.createCenterConstraint_({extent:newCenterConstraint});
      mapView.setCenter(mapView.constrainCenter(mapView.getCenter()));
    };

    var map = new ol.Map({
      target: 'LkRosMap.map',
      controls: ol.control.defaults({
          attribution: true,
          attributionOptions: {
            label: "©"
          }
        }).extend([
          new ol.control.ScaleLine({
            className: 'ol-scale-line lkrosmap-mapper-scale-line',
            title: 'Maßstabsbalken'
          }),
          this.mousePositionControl(),
//          this.featureInfoControl(),
          new LkRosMap.models.layerSwitchControl({
            radioLayers: LkRosMap.tileLayers,
            checkLayers: LkRosMap.vectorLayers
          }),
          new LkRosMap.models.legendControl({
            checkLayers: LkRosMap.vectorLayers
          })
        ]),
      layers: LkRosMap.tileLayers.concat(LkRosMap.vectorLayers),
      view: new ol.View({
        maxResolution: 152.8740565703524,
        minResolution: 0.14929107086948457,
        center: ol.proj.transform(LkRosMap.config.center, LkRosMap.baseProjection, LkRosMap.viewProjection),
        zoom: 0
      }),
      logo: false
    });

    // die map view im LkRosMap Namespace bereitstellen
    LkRosMap.view = map.getView();
  
    // den Center Constraint an die Zoom-Stufe anpassen ...
    // ... initial ...
    constrainMapToExtend(map, LkRosMap.tileLayers[0].get('layerExtent'));
    // ... für jeden Zoom-Vorgang
    LkRosMap.view.on('change:resolution', function(event){
      constrainMapToExtend(map, LkRosMap.tileLayers[0].get('layerExtent'));
    });

    LkRosMap.maxExtent = LkRosMap.view.calculateExtent(map.getSize());

    // close the popup on map zoom and pan actions
    function closePopup(){
      if (LkRosMap.popup.feature)
        LkRosMap.popup.feature.unselect();
    };
//    LkRosMap.view.on('change:resolution', closePopup);
    //LkRosMap.view.on('change:center', closePopup);
  
    function lookupPhoton(queryStr, successFn, errorFn, scope){
      successFn = successFn || function() {};
      errorFn   = errorFn   || function() {};
      scope     = scope     || this;
    
      var jqxhr = $.ajax( "http://photon.komoot.de/api",{
        data: {
          q              : queryStr,
          lat            : 53.326342,
          lon            : 11.5,
          limit          : 5,
          lang           : 'de',
        }
      })
      .done(function(response) {
        successFn.apply(scope,["success", response]);
      })
      .fail(function() {
        errorFn.apply(scope, ["error"] );
      });
    };

    LkRosMap.map = map;
    this.initInfoWindow();
    this.setEventHandlers();
  },
  
  mousePositionControl: function() {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(0),
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'lkrosmap-mouse-position-control',
      undefinedHTML: ''
    });
    return mousePositionControl;
  },

  featureInfoControl: function(opt_options) {
    var button = $('<button/>').attr({ id: 'LkRosMap.featureInfoButton' }),
        element = $('<div></div>').attr({
          class: 'lkrosmap-feature-info-control ol-unselectable ol-control',
          title: 'Anzeige von Informationen'
        });
    
    button.html('<i class=\"fa fa-info\"></i>');
    button.click(function() {
      $('#LkRosMap\\.searchBox').hide();
    });

    element.append(button);
    control = new ol.control.Control({
      element: element.get(0)}
    )

    return control
  },

  showErrorMsg: function(e, msg) {
    if (msg == 'Not Found') {
      msg = 'Der Service zum Suchen von Adressen ist nicht erreichbar. Bitte prüfen Sie ob Sie eine Netzverbindung haben.';
    }
    e.errMsgElement.innerHTML = msg;
    $('#LkRosMap\\.Overlay').fadeIn(200,function(){
      $('#LkRosMap\\.MessageBox').animate({'top':'20px'},200);
    });
  },

  loadJSON: function (source, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', source, false); // true would load asynchronous
    //xobj.open('GET', '/wfs2json/json/data.json', false); // true would load asynchronous
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  },

  searchAnimation: {
    show: function() {
      $('#LkRosMap\\.searchOverlay').show();
    },
    hide: function() {
      $('#LkRosMap\\.searchOverlay').hide();
    }
  },

  initInfoWindow: function() {
    var infoWindow = new ol.Overlay({
          element: $('#LkRosMap\\.infoWindow')[0],
          offset: [0,-18],
          stopEvent: true,
          autoPan: true,
          autoPanAnimation: {
            duration: 300
          },
          autoPanMargin: 30,
        });
  
    LkRosMap.map.addOverlay(infoWindow);
    LkRosMap.infoWindow = infoWindow;
  },

  toggleCheckLayer: function(evt) {
    var index = evt.target.value

    if (LkRosMap.vectorLayers[index].getVisible()) {
      // hide layer
      LkRosMap.vectorLayers[index].setVisible(false);
      $('#LkRosMap\\.checkLayerClasses' + index).hide();
    } else {
      // show layer
      LkRosMap.vectorLayers[index].setVisible(true);
      $('#LkRosMap\\.checkLayerClasses' + index).show()
    }
  },

  toggleRadioLayer: function(evt) {
    var index = evt.target.value

    $.each(LkRosMap.tileLayers, function (i, layer) {
      layer.setVisible(false);
    });
    LkRosMap.tileLayers[index].setVisible(true);
  },

  showInfoWindow: function(selectedFeatures, evt) {
    var keys = Object.keys(selectedFeatures),
        firstLayer = selectedFeatures[keys[0]];

    $('#LkRosMap\\.infoWindowData').html(
      $.map(selectedFeatures, function(layer) {
        return '<h2>' + layer.layer.get('name') + '</h2>' +
        $.map(layer.features, function(feature) {
          return feature.dataFormatter();
        }).join('<hr>');
      }).join('<br>')
    );

    LkRosMap.infoWindow.target = { feature: firstLayer.features[0], layer: firstLayer };

    $(LkRosMap.infoWindow.getElement()).show();
    $('#LkRosMap\\.infoWindowRemoveFeature').hide();
    LkRosMap.infoWindow.setPosition(evt.coordinate);
  },

  searchForFeatures: function(event) {
    var word = $('#LkRosMap\\.searchField').val(),
        layers = LkRosMap.searchIndex[word],
        html = '';

    html = $.map(
      layers,
      function(layer) {
        var source = LkRosMap.vectorLayers[layer.index].getSource(),
            html = $.map(
              layer.feature_ids,
              function(feature_id) {
                var html = '\
                  <a href="#" class="search-feature-link" onclick="LkRosMap.controller.mapper.selectFeature(' + layer.index + ', ' + feature_id + ')">' +
                    LkRosMap.config.layers[layer.index].model + ' ' + feature_id + ': ' + source.getFeatureById(feature_id).titleFormatter() +
                  '</a>\
                ';
                return html;
              }
            ).join('<br>');
        return html;
      }
    ).join('<br>');
    $('#LkRosMap\\.searchFieldResultBox').html(html).show();
  },
  
  selectFeature: function(layer_id, feature_id) {
    var source = LkRosMap.vectorLayers[layer_id].getSource(),
        feature = source.getFeatureById(feature_id);

        console.log('f: %o', feature);
    LkRosMap.map.getView().fit(
      ol.extent.buffer(
        feature.getGeometry().getExtent(),
        1000
      ),
      LkRosMap.map.getSize()
    );
    $('#LkRosMap\\.searchFieldResultBox').hide();
    feature.select();
  }
}