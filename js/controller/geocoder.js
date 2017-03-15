LkRosMap.views.geocoder = {};
LkRosMap.loadHeadFile('../js/views/geocoder/search.js', 'js');

LkRosMap.controller.geocoder = {
  views: LkRosMap.views.geocoder,

  loadModels: function() {
    LkRosMap.loadHeadFile('../js/models/SearchResult.js', 'js');
  },
  
  loadLayer: function() {
    this.layer = new ol.layer.Vector({
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
    $("#LkRosMap\\.searchLos").on(
      'click',
      this,
      function(evt) {
        if ($('#LkRosMap\\.addressSearchButton').hasClass('lkrosmap-search-type-selected')) {
          LkRosMap.controller.geocoder.searchForAddress(evt);
        }
        else {
          LkRosMap.controller.geocoder.searchForFeatures(evt);
        }
      }
    );

    $('#LkRosMap\\.searchButton').on(
      'click',
      function() {
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
        
        feature.unselect();
        LkRosMap.controller.geocoder.removeSearchResultFeatures();
      }
    );

    $('.lkrosmap-search-type-button').on(
      'click',
      function(evt) {
        $('#LkRosMap\\.addressSearchButton').toggleClass('lkrosmap-search-type-selected');
        $('#LkRosMap\\.themeSearchButton').toggleClass('lkrosmap-search-type-selected');
      }
    );
  },

  init: function() {
    this.errMsgElement = $('#LkRosMap\\.errorMessage');

    this.loadModels();
    this.loadLayer();

    LkRosMap.map.addControl(new LkRosMap.models.SearchControl());

    this.setEventHandlers();
  },

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

  searchForFeatures: function(event) {
    console.log('searchforFeatures');
  },

  searchForAddress: function(event) {
    console.log('searchforAdress');
    var scope = LkRosMap.controller.geocoder,
        queryStr = $('#LkRosMap\\.searchField').val(),
        url  = 'http://www.gaia-mv.de/geoportalsearch/_ajax/searchPlaces/';

    $.ajax(url, {
      type: 'GET',

      contentType: 'application/json',

      data: {
        'q': queryStr
      },

      dataType: 'jsonp',

      beforeSend: LkRosMap.controller.mapper.searchAnimation.show,

      success: function(response) {
        if (response.success) {
          scope.showAddressSearchResults(event, response.places);
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
    console.log('err');
  },

  searchResultsFormatter: function(event, results) {
    var html = '',
        controller = LkRosMap.controller.geocoder;

    if ( typeof results != "undefined" && results != null && results.length > 0) {
      html = results.map(function(item) {
        item.display_name = controller.displayNameFormatter(item);
        return "<a href=\"#\" onclick=\"" + event.data.getSearchResultCallback(event, item) + "\">" + item.display_name + "</a><br>";
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
    var searchResultFeature = new LkRosMap.models.searchResult(display_name, lat, lon),
        source = this.layer.getSource(),
        searchField = $('#LkRosMap\\.searchField');

    searchField.val(display_name);
    searchField.focus();
    searchField.attr('coordinates', lat + ', ' + lon);
    $('#LkRosMap\\.searchFieldResultBox').hide();

    this.removeSearchResultFeatures();

    source.addFeature( searchResultFeature );

    LkRosMap.map.getView().fit(
      ol.extent.buffer(
        searchResultFeature.getGeometry().getExtent(),
        300
      ),
      LkRosMap.map.getSize()
    );
    $('#LkRosMap\\.searchBox').hide();
    searchResultFeature.select();
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