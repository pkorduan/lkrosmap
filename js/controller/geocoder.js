LkRosMap.views.geocoder = {};
//LkRosMap.loadHeadFile('../js/views/geocoder/search.js', 'js');

LkRosMap.controller.geocoder = {
  views: LkRosMap.views.geocoder,

  loadModels: function() {
   // LkRosMap.loadHeadFile('../js/models/SearchResult.js', 'js');
  },
  
  loadLayer: function() {
    this.layer = new ol.layer.Vector({
      name: 'Adresse',
      opacity: 1,
      source: new ol.source.Vector({
        projection: LkRosMap.viewProjection,
        features: []
      }),
      zIndex: 100
    });
    this.layer.setMap(LkRosMap.map);
  },

  setEventHandlers: function() {
    $("#LkRosMap\\.searchField").on(
      'change',
      this,
      function(evt) {
        if ($('#LkRosMap\\.addressSearchButton').hasClass('lkrosmap-search-type-selected')) {
          LkRosMap.controller.geocoder.searchForAddress(evt, 'searchField');
        }
        else {
          LkRosMap.controller.mapper.searchForFeatures(evt);
        }
      }
    );

    $("#LkRosMap\\.searchLos").on(
      'click',
      this,
      function(evt) {
        if ($('#LkRosMap\\.addressSearchButton').hasClass('lkrosmap-search-type-selected')) {
          LkRosMap.controller.geocoder.searchForAddress(evt, 'searchField');
        }
        else {
          LkRosMap.controller.mapper.searchForFeatures(evt);
        }
      }
    );

    $('#LkRosMap\\.searchButton').on(
      'click',
      function() {
        $('#LkRosMap\\.routingBox').hide();
        $('#LkRosMap\\.searchBox').toggle();
        $('#LkRosMap\\.searchField').focus();
      }
    )
    
    $('#LkRosMap\\.searchField').on(
      'keyup',
      this,
      this.toggleSearchFieldClear
    );

    $("#LkRosMap\\.searchFieldClear").on(
      'click',
      this,
      function() {
        $('#LkRosMap\\.searchField').val('');
        $('#LkRosMap\\.searchField').focus();
        $('#LkRosMap\\.searchFieldResultBox').hide();
      }
    );

    $("#LkRosMap\\.infoWindowRemoveFeatureButton").on(
      'click',
      function(evt) {
        var feature = LkRosMap.selectedFeature;
        
        $(LkRosMap.infoWindow.getElement()).hide();
        LkRosMap.controller.geocoder.removeSearchResultFeatures();
      }
    );

    $('#LkRosMap\\.addressSearchButton').on(
      'click',
      function(evt) {
        $('.lkrosmap-search-type-button').removeClass('lkrosmap-search-type-selected');
        $(this).addClass('lkrosmap-search-type-selected');
      //  $('#LkRosMap\\.routeSearchFields').hide();
        $('#LkRosMap\\.searchField').show();
        $('#LkRosMap\\.searchField').attr('placeholder', 'Addresse, Gemarkung oder Flurstück eingeben').focus();
      }
    );

    $('#LkRosMap\\.featureSearchButton').on(
      'click',
      function(evt) {
        $('.lkrosmap-search-type-button').removeClass('lkrosmap-search-type-selected');
        $(this).addClass('lkrosmap-search-type-selected');
  //      $('#LkRosMap\\.routeSearchFields').hide();
        $('#LkRosMap\\.searchField').show();
        $('#LkRosMap\\.searchField').attr('placeholder', 'Suchbegriff für Themensuche eingeben').focus();
      }
    );

    $('#LkRosMap\\.routeSearchButton').on(
      'click',
      function(evt) {
        $('.lkrosmap-search-type-button').removeClass('lkrosmap-search-type-selected');
        $(this).addClass('lkrosmap-search-type-selected');
        $('#LkRosMap\\.searchField').hide();
        $('#LkRosMap\\.routeSearchFields').show();
      }
    );

  },

  init: function() {
    this.errMsgElement = $('#LkRosMap\\.errorMessage');

    this.loadModels();
    this.loadLayer();

    LkRosMap.map.addControl(new LkRosMap.controls.SearchControl());

    this.setEventHandlers();
    $('#LkRosMap\\.searchField').focus();
  },
/*
  lookupNominatim: function(e){
    var scope = LkRosMap.controller.geocoder,
        queryStr = e.target.value,
        url  = 'http://nominatim.openstreetmap.org/search';

    $.ajax({
      url: url,

      data: {
        viewboxlbrt    : '10.57,53.10,12.40,53.82',
        bounded        : 1,
        q              : queryStr,
        format         : 'json',
        addressdetails : 1,
      },

      beforeSend: LkRosMap.controller.mapper.searchAnimation.show,

      // Work with the response
      success: function(response) {
        if (response.indexOf('Error') != -1 || response.indexOf('Fehler') != -1) {
          scope.showErrorMsg(scope, response);
        }
        else {
          scope.errMsgElement.innerHTML = '';
          scope.showAddressSearchResults(e, response);
        }
      },

      error: function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
          scope.showErrorMsg(scope, thrownError);
        }
      },
      
      complete:  LkRosMap.controller.mapper.searchAnimation.hide
    });
  },
*/
  searchForAddress: function(event, fieldName) {
    //console.log('searchForAdress from fieldname: ' + fieldName);
    var scope = LkRosMap.controller.geocoder,
        queryStr = $('#LkRosMap\\.' + fieldName).val(),
        url  = 'https://www.gaia-mv.de/geoportalsearch/_ajax/searchPlaces/';

    $.ajax(url, {
      type: 'GET',

      contentType: 'application/json',

      data: {
//        'area': '002b664da72f6147121ee91bef537e30',
        'sort': '__title',
        'q': queryStr
      },

      dataType: 'jsonp',

      beforeSend: LkRosMap.controller.mapper.searchAnimation.show,

      success: function(response) {
        if (response.success) {
          scope.showAddressSearchResults(event, response.places, fieldName);
        }
        else {
          scope.showErrorMsg(scope, 'Die Anfrage ist falsch. Es fehlt der Anfrageparameter <i>q</i>!');
        }
      },

      error: function (xhr, ajaxOptions, thrownError){
        if(xhr.status==404) {
          scope.showErrorMsg(scope, thrownError);
        }
      },
  
      complete:  LkRosMap.controller.mapper.searchAnimation.hide
    });
  },

  showAddressSearchResults: function(event, results, fieldName) {
    //console.log('showAddressSearchResult for field: ' + fieldName);
    $('#LkRosMap\\.' + fieldName + 'ResultBox').html(
      this.searchResultsFormatter(
        event,
        results,
        fieldName
      )
    ).show();
    $('#LkRosMap\\.' + fieldName).focus();
  },

  showErrorMsg: function(event, msg) {
    console.log('error in: %o', event);
    console.log('errmsg: ' + msg);
  },

  searchResultsFormatter: function(event, results, fieldName) {
/*
    console.log('searchResultFormatter for fieldName: ' + fieldName);
    console.log('searchResultFormatter for resilts %o', results);
    console.log('searchResultFormatter for data %o', event.data);
*/
    var html = '',
        controller = LkRosMap.controller.geocoder;

    if ( typeof results != "undefined" && results != null && results.length > 0) {
      html = results.map(function(item) {
        item.display_name = event.data.displayNameFormatter(item);
        return "<a href=\"#\" onclick=\"" + event.data.getSearchResultCallback(event, item, fieldName) + "\">" + item.display_name + "</a><br>";
      });
    }
    else {
      html = "<a href=\"#\" onclick=\"" + event.data.getNoResultCallback() + "\">keine Treffer gefunden!</a>";
    }
    return html;
  },

  displayNameFormatter: function(item) {
    return item.placeName + ' (' + item.primaryType + ')';
  },

  getSearchResultCallback: function(event, item) {
    //console.log('getSearchResultCallback in geocoder');
    var lower = item.geobounds_lower.split(','),
        upper = item.geobounds_upper.split(','),
        lat = (parseFloat(lower[0]) + parseFloat(upper[0])) / 2,
    lon = (parseFloat(lower[1]) + parseFloat(upper[1])) / 2;
    return "LkRosMap.controller.geocoder.addSearchResultFeature('" + item.display_name + "', " + lat + ", " + lon + ")";
  },

  getNoResultCallback: function() {
    return "$('#LkRosMap\\\\.searchFieldResultBox').hide();";
  },

  addSearchResultFeature: function(display_name, lat, lon) {
    console.log('addSearchResultFeatures display_name: ' + display_name);
    var searchResultFeature = new LkRosMap.models.searchResult(display_name, lat, lon),
        source = this.layer.getSource(),
        searchField = $('#LkRosMap\\.searchField');

    searchField.val(display_name);
    searchField.focus();
    searchField.attr('coordinates', lat + ', ' + lon);
    $('#LkRosMap\\.searchFieldResultBox').hide();

    this.removeSearchResultFeatures();

    source.addFeature( searchResultFeature );

    searchResultFeature.select();

    LkRosMap.map.getView().fit(
      ol.extent.buffer(
        searchResultFeature.getGeometry().getExtent(),
        300
      ),
      LkRosMap.map.getSize()
    );
    $('#LkRosMap\\.searchBox').hide();
  },

  removeSearchResultFeatures : function() {
    //console.log('removeSearchResultFeatures');
    var source = this.layer.getSource(),
        features = source.getFeatures();

    if (features != null && features.length > 0) {
      for (x in features) {
        //console.log('remove feature %o', features[x]);
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