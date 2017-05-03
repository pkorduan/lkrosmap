LkRosMap.views.router = {};
// load view
LkRosMap.loadHeadFile('../js/views/router/search.js', 'js');

LkRosMap.controller.router = {
  views: LkRosMap.views.router,

  loadModels: function() {
    LkRosMap.loadHeadFile('../js/models/RoutingResult.js', 'js');
  },
  
  loadLayer: function() {
    this.layer = new ol.layer.Vector({
      opacity: 1,
      source: new ol.source.Vector({
        projection: LkRosMap.viewProjection,
        features: []
      }),
      zIndex: 90
    });
    this.layer.setMap(LkRosMap.map);
  },

  setEventHandlers: function() {
    $('#LkRosMap\\.routeSearchButton').on(
      'click',
      function() {
        $('#LkRosMap\\.searchBox').hide();
        $('#LkRosMap\\.routingBox').toggle();
        $('#LkRosMap\\.fromField').focus();
        $('#LkRosMap\\.routeFromLos').show();
      }
    );

    $('#LkRosMap\\.fromField').on(
      'mousedown',
      function() {
        $('#LkRosMap\\.routeToLos').hide();
        $('#LkRosMap\\.routeFromLos').show();
      }
    );

    $('#LkRosMap\\.fromField').on(
      'change',
      this,
      function(evt) {
        $('#LkRosMap\\.routeFromLos').hide();
        $('#LkRosMap\\.toFieldResultBox').hide();
        $('#LkRosMap\\.fromFieldResultBox').show();
        LkRosMap.controller.geocoder.searchForAddress(evt, 'fromField');
      }
    );

    $('#LkRosMap\\.routeFromLos').on(
      'click',
      this,
      function(evt) {
        $('#LkRosMap\\.routeFromLos').hide();
        $('#LkRosMap\\.toFieldResultBox').hide();
        $('#LkRosMap\\.fromFieldResultBox').show();
        LkRosMap.controller.geocoder.searchForAddress(evt, 'fromField');
      }
    );

    $('#LkRosMap\\.toField').on(
      'mousedown',
      function() {
        $('#LkRosMap\\.routeFromLos').hide();
        $('#LkRosMap\\.routeToLos').show();
      }
    );

    $('#LkRosMap\\.toField').on(
      'change',
      this,
      function(evt) {
        $('#LkRosMap\\.routeToLos').hide();
        $('#LkRosMap\\.fromFieldResultBox').hide();
        $('#LkRosMap\\.toFieldResultBox').show();
        LkRosMap.controller.geocoder.searchForAddress(evt, 'toField');
      }
    );

    $('#LkRosMap\\.routeToLos').on(
      'click',
      this,
      function(evt) {
        $('#LkRosMap\\.routeToLos').hide();
        $('#LkRosMap\\.fromFieldResultBox').hide();
        $('#LkRosMap\\.toFieldResultBox').show();
        LkRosMap.controller.geocoder.searchForAddress(evt, 'toField');
      }
    );

    $('#LkRosMap\\.infowindowRoutingFrom').on(
      'click',
      function(evt) {
        var currFeature,
            routeField = $('#LkRosMap\\.fromField');

            debug_e = LkRosMap.infoWindow;
        if (typeof LkRosMap.infoWindow.target == 'undefined') {
          currFeature = LkRosMap.infoWindow.feature;
        }
        else {
          currFeature = LkRosMap.infoWindow.target.feature;
        }

        routeField.attr('coordinates', currFeature.latlng().join(', '));
        routeField.val(currFeature.addressText());
        $('#LkRosMap\\.searchBox').hide();
        $('#LkRosMap\\.routingBox').show();
        $('#LkRosMap\\.routeFromLos').hide();
        if (typeof $('LkRosMap\\.toField').attr('coordinates') == typeof undefined) {
          $('#LkRosMap\\.toField').focus();
        }

        LkRosMap.controller.router.loadRoute({ data: LkRosMap.controller.router });
      }
    );

    $('#LkRosMap\\.infowindowRoutingTo').on(
      'click',
      function(evt) {
        var currFeature = LkRosMap.infoWindow.target.feature || LkRosMap.infoWindow.feature,
            routeField = $('#LkRosMap\\.ToField');

        routeField.attr('coordinates', currFeature.latlng().join(', '));
        routeField.val(currFeature.addressText());
        $('#LkRosMap\\.searchBox').hide();
        $('#LkRosMap\\.routingBox').show();
        $('#LkRosMap\\.routeToLos').hide();
        if (typeof $('LkRosMap\\.fromField').attr('coordinates') == typeof undefined) {
          $('#LkRosMap\\.fromField').focus();
        }
        LkRosMap.controller.router.loadRoute({ data: LkRosMap.controller.router });
      }
    );

    $('#LkRosMap\\.removeRoute').on(
      'click',
      function(evt) {
        LkRosMap.controller.router.removeRoute();
      }
    )
  },

  init: function() {
    this.errMsgElement = $('#LkRosMap\\.errorMessage');

    this.loadModels();
    this.loadLayer();

    LkRosMap.map.addControl(new LkRosMap.models.RoutingControl());

    this.setEventHandlers();
  },

  loadRoute : function(e) {
    //console.log('loadRoute');
    var scope = e.data,
        url  = LkRosMap.config.osm2poProxyUrl,
        from = $('#LkRosMap\\.fromField').attr('coordinates'),
        to = $('#LkRosMap\\.toField').attr('coordinates'),
        queryString = 'Route von: ' + from + ' nach: ' + to,
        hint = '';


    //console.log('routerUrl: ' + url);
    //console.log('queryString: ' + queryString);

    if (typeof from == typeof undefined || from == false ||
        typeof to == typeof undefined || to == false) 
      return false;

    $.ajax({
      url: url,

      // The name of the callback parameter, as specified by the YQL service
      //jsonp: "callback",

      // Tell jQuery we're expecting JSONP
      //dataType: "json",

      // Tell YQL what we want and that we want JSON
      data: {
        cmd: 'fr',
        format: 'geojson',
        source: from,
        target: to
      },

      beforeSend: LkRosMap.controller.mapper.searchAnimation.show,

      // Work with the response
      success: function(response) {
        if (response.indexOf('Error') != -1 || response.indexOf('Fehler') != -1) {
          if (from == '')
            hint = 'Keine Angaben für den Startpunkt: ' + from;
          if (to == '')
            hint = 'Keine Angaben für den Zielpunkt: ' + to;
          if (from == to)
            hint = 'Start: ' + from + ' und Zielpunkt: ' + to + ' sind identisch';
          scope.showErrorMsg(scope, hint || 'Kein Ergebnis für ' + queryString + '<br>' + response);
        }
        else {
          scope.errMsgElement.innerHTML = '';
          scope.showRoute(response, scope);
        }
      },

      error: function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
          scope.showErrorMsg(scope, thrownError);
        }
      },

      complete: LkRosMap.controller.mapper.searchAnimation.hide

    });
  },

  removeRoute: function(scope) {
    var source = LkRosMap.controller.router.layer.getSource(),
        features = source.getFeatures();

    $('#LkRosMap\\.fromFieldResultBox').hide();
    $('#LkRosMap\\.fromField').attr('coordinates', '');
    $('#LkRosMap\\.fromField').val('');

    $('#LkRosMap\\.toFieldResultBox').hide();
    $('#LkRosMap\\.toField').attr('coordinates', '');
    $('#LkRosMap\\.toField').val('');

    $('#LkRosMap\\.routingInfo').hide();

    if (features != null && features.length > 0) {
      for (x in features) {
        source.removeFeature(features[x]);
      }
    }
  },

  showAddressSearchResults: function(event, results) {
    $('#LkRosMap\\.searchFieldResultBox').html(
      this.searchResultsFormatter(
        event,
        results
      )
    ).show();
    $('#LkRosMap\\.searchField').focus();
  },

  showErrorMsg: function(event, msg) {
    console.log('error in: %o', event);
    console.log('errmsg: ' + msg);
  },

  showRoute: function(result, scope) {
    var route = new LkRosMap.route(result),
        source = LkRosMap.controller.router.layer.getSource(),
        features = source.getFeatures();

    if (features != null && features.length > 0) {
      for (x in features) {
        source.removeFeature(features[x]);
      }
    }

    source.addFeature(
      route.line
    );
    source.addFeature(
      route.sourcePoint
    );
    source.addFeature(
      route.targetPoint
    );

    LkRosMap.map.getView().fit(
      route.line.getGeometry().getExtent(),
      LkRosMap.map.getSize()
    );

    $('#LkRosMap\\.routingInfo').html(
      'Auto: ' + scope.distanceFormatter(route.distance) + ', ' + scope.durationFormatter(route.duration)
    ).show();

/*    $('#LkRosMap\\.routingDuration').html(
      ', ' + scope.durationFormatter(route.duration)
    ).show();
    $('#LkRosMap\\.routingDistance').html(
      'Auto: ' + scope.distanceFormatter(route.distance)
    ).show();
*/
  },

  displayNameFormatter: function(item) {
    return item.placeName + ' (' + item.primaryType + ')';
  },

  distanceFormatter: function(duration) {
    return (Math.round(duration * 10) / 10) + " km"
  },

  durationFormatter: function(duration) {
    var hours = Math.floor(duration),
      minutes = Math.round((duration - hours) * 60),
      textParts = [];
    if (hours > 0)
      textParts.push(hours + ' Std.');
    if (minutes > 0)
      textParts.push(minutes + ' Min.');
    return textParts.join(' ');
  },

  getSearchResultCallback: function(event, item, fieldName) {
    //console.log('getSearchResultCallback in router for field: ' + fieldName);
    var lower = item.geobounds_lower.split(','),
        upper = item.geobounds_upper.split(','),
        lat = (parseFloat(lower[0]) + parseFloat(upper[0])) / 2,
    lon = (parseFloat(lower[1]) + parseFloat(upper[1])) / 2;
    return "LkRosMap.controller.router.setSearchResult('" + item.display_name + "', " + lat + ", " + lon + ", '" + fieldName +"')";
  },

  getNoResultCallback: function() {
    return "$('#LkRosMap\\\\.searchFieldResultBox').hide();";
  },

  setSearchResult: function(display_name, lat, lon, fieldName) {
    //console.log('setSearchResult for fieldName: ' + fieldName + ' with display_name: ' + display_name + ' and latlng ' + lat + ', ' + lon);
    var searchField = $('#LkRosMap\\.' + fieldName);

    searchField.val(display_name);
    searchField.focus();
    searchField.attr('coordinates', lat + ', ' + lon);
    $('#LkRosMap\\.' + fieldName + 'ResultBox').hide();

    this.loadRoute({ data: this });
  },

  removeSearchResultFeatures : function() {
    var source = this.layer.getSource(),
        features = source.getFeatures();

    if (features != null && features.length > 0) {
      for (x in features) {
        source.removeFeature( features[x] );
      }
    }
  },
  
  toggleSearchFieldClear: function(evt) {
    if (evt.target.value.length > 0) {
      $('#LkRosMap\\.searchFieldClear').show();
    }
    else {
      $('#LkRosMap\\.searchFieldClear').hide();
    }
  }

}