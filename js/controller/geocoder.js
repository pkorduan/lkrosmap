LkRosMap.views.geocoder = {};
LkRosMap.loadHeadFile('../js/views/geocoder/addressSearch.js', 'js');

LkRosMap.controller.geocoder = {
  views: LkRosMap.views.geocoder,

  loadModels: function() {
    LkRosMap.loadHeadFile('../js/models/SearchResult.js', 'js');
  },

  loadViews: function() {
    var views = LkRosMap.views.geocoder;

    $(views.addressSearch.html).insertBefore("#LkRosMap\\.map");
  },
  
  setEventHandlers: function() {
    $("#LkRosMap\\.addressSearchField").on(
      'change',
      this,
      this.searchForAddress
    );
  },

  init: function() {
    this.errMsgElement = $('#LkRosMap\\.errorMessage');

    this.loadModels();
    this.loadViews();

    ol.inherits(this.addressSearchControl, ol.control.Control);
    LkRosMap.map.addControl(new this.addressSearchControl());

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

  searchForAddress: function(event) {
    console.log('Browser supports CORS: ' + $.support.cors);

    var scope = LkRosMap.controller.geocoder,
        queryStr = event.target.value,
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
        console.log(JSON.stringify(response));
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

  addressSearchControl: function(opt_options) {
    var options = opt_options || {};

    var button = $('<button/>').attr({ id: 'LkRosMap.addressSearchButton' });

    button.html('<i class=\"fa fa-search\"></i>');

    var this_ = this;

    button.click(function() {
      $('#LkRosMap\\.addressSearchBox').show();
    });

    var element = $('<div></div>').attr({ class: 'lkrosmap-address-search-control ol-unselectable ol-control'});
    element.append(button);

    ol.control.Control.call(this, {
      element: element.get(0),
      target: options.target
    });
  },

  showAddressSearchResults: function(event, results) {
    console.log('event: %o', event);
    $('#' + event.target.id.replace('.', '\\.') + 'ResultBox').html(
      this.searchResultsFormatter(
        event,
        results
      )
    );
    $('#' + event.target.id.replace('.', '\\.') + 'ResultBox').show();
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
    debug_i = item;
    var lower = item.geobounds_lower.split(','),
        upper = item.geobounds_upper.split(','),
        lat = (parseFloat(lower[0]) + parseFloat(upper[0])) / 2,
    lon = (parseFloat(lower[1]) + parseFloat(upper[1])) / 2;
    return "LkRosMap.controller.geocoder.addSearchResultFeature('" + item.display_name + "', " + lat + ", " + lon + ")";
  },

  getNoResultCallback: function() {
    return "$('#LkRosMap\\\\.addressSearchFieldResultBox').hide();";
  },

  addSearchResultFeature: function(display_name, lat, lon) {
        alert('Show Place: ' + display_name + ' at Position (' + lat + ' ' + lon + ')');
/*    var searchResultFeature = new LkRosMap.models.searchResult(display_name, lat, lon),
        source = this.layer.getSource(),
        target = $('#PflegeMap\\.' + search_field);


    target.val(display_name);
    target[0].setAttribute('coordinates', lat + ', ' + lon);
    $('#PflegeMap\\.' + search_field + 'ResultBox').hide();


    this.removeSearchResultFeatures(this);

    source.addFeature( searchResultFeature );

    PflegeMap.map.getView().fit(
      ol.extent.buffer(
        searchResultFeature.getGeometry().getExtent(),
        300
      ),
      PflegeMap.map.getSize()
    );*/
  }

}