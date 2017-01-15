LkRosMap.views.geocoder = {};
LkRosMap.loadHeadFile('../js/views/geocoder/addressSearch.js', 'js');

LkRosMap.controller.geocoder = {
  views: LkRosMap.views.geocoder,

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
    var controller = LkRosMap.controller.geocoder;

    this.loadViews();

		ol.inherits(this.addressSearchControl, ol.control.Control);
		LkRosMap.map.addControl(new this.addressSearchControl());

    this.setEventHandlers();
  },

  searchForAddress: function(event) {
    console.log('suche Starten');
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
	}
}