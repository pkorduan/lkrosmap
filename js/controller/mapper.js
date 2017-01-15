LkRosMap.views.mapper = {};
LkRosMap.loadHeadFile('../js/views/mapper/map.js', 'js');
LkRosMap.loadHeadFile('../js/views/mapper/mapHeader.js', 'js');

LkRosMap.controller.mapper = {
  views: LkRosMap.views.mapper,

  loadViews: function() {
    var views = LkRosMap.views.mapper;

    $('#LkRosMap\\.container').append(
      views.mapHeader.html +
      views.map.html
    );
  },

  showMap: function () {
    return this.views.map.html;
  },
  
  setEventHandlers: function() {
  },

  init: function() {
    var controller = LkRosMap.controller.mapper;

    this.loadViews();

    this.setEventHandlers();

    proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    proj4.defs("EPSG:25832","+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  
    // create the ORKA-Map Layer
    LkRosMap.tileLayer = new ol.layer.Tile({
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

          //console.log(url);
          return url;
        }
      }),
      // user data
      layerExtent: LkRosMap.config.layerExtent
    });


    function constrainMapToExtend(map, extent){
      var mapView = map.getView(),
        viewExtent = mapView.calculateExtent(map.getSize()),
        halfWidth = ol.extent.getWidth(viewExtent) / 2.0,
        halfHeight= ol.extent.getHeight(viewExtent) / 2.0,
        newCenterConstraint = [extent[0] + halfWidth, extent[1] + halfHeight, extent[2] - halfWidth, extent[3] - halfHeight];
        
        console.log('mapView %o', mapView);
        console.log('mapView.center %o', mapView.getCenter());
        console.log('viewExtent %o', viewExtent);
        console.log('layerExtent %o', extent);
        console.log('constrainCenter %o', mapView.constrainCenter(mapView.getCenter()));
        console.log('halfidth: ' + halfWidth);
        console.log('halfHeight: ' + halfHeight);
        console.log('newCenterConstraint: %o', newCenterConstraint);

        
  //    mapView.constraints_.center = ol.View.createCenterConstraint_({extent:newCenterConstraint});
      mapView.setCenter(mapView.constrainCenter(mapView.getCenter()));
    };
    console.log('config center: %o', ol.proj.transform(LkRosMap.config.center, LkRosMap.baseProjection, LkRosMap.viewProjection));

    var map = new ol.Map({
      target: 'LkRosMap.map',
      controls: ol.control.defaults({
          attribution: true,
          attributionOptions: {
            label: "©"
          }
        }).extend([
        new ol.control.ScaleLine(),
        new LkRosMap.controller.helper.configControl(),
        this.mousePositionControl()
      ]),
      layers: [LkRosMap.tileLayer],
      view: new ol.View({
        maxResolution: 152.8740565703524,
        minResolution: 0.14929107086948457,
        center: ol.proj.transform(LkRosMap.config.center, LkRosMap.baseProjection, LkRosMap.viewProjection),
        zoom: 0
      })
    });
  
    // die map view im LkRosMap Namespace bereitstellen
    LkRosMap.view = map.getView();

  
    // den Center Constraint an die Zoom-Stufe anpassen ...
    // ... initial ...
    constrainMapToExtend(map, LkRosMap.tileLayer.get('layerExtent'));
    // ... für jeden Zoom-Vorgang
    LkRosMap.view.on('change:resolution', function(event){
      constrainMapToExtend(map, LkRosMap.tileLayer.get('layerExtent'));
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

    return map;
  },
  
  mousePositionControl: function() {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(0),
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'lkrosmap-mouse-position-control',
      target: 'LkRosMap.coordinates',
      undefinedHTML: '&nbsp;'
    });
    return mousePositionControl;
  }
}