LkRosMap.views.helper = {};
LkRosMap.loadHeadFile('../js/views/helper/sperrDiv.js', 'js');
LkRosMap.loadHeadFile('../js/views/helper/configuration.js', 'js');

LkRosMap.controller.helper = {
	views: LkRosMap.views.helper,

	loadViews: function() {
		var views = LkRosMap.views.helper;

		$('#LkRosMap\\.container').append(
			views.sperrDiv.html +
			views.configuration.html
		);
	},

	setEventHandlers: function() {
		$('#LkRosMap\\.configurationBoxClose').click(function() {
			$('#LkRosMap\\.configuration').hide();
			$('#LkRosMap\\.configuration').animate({'top': '-1000px'}, 500, function() {
				$('#LkRosMap\\.sperrDiv').fadeOut('fast');
			});
		});

	},

	showConfig: function() {
		$('#LkRosMap\\.configuration').show();
		$('#LkRosMap\\.sperrDiv').fadeIn(200,function() {
			$('#LkRosMap\\.configuration').animate({'top': '40px'}, 200);
		});
	},

	/*
	* Läd die views und handler des Helper Controllers
	*/
	init: function() {
		this.loadViews();
		ol.inherits(this.configControl, ol.control.Control);
		LkRosMap.map.addControl(new this.configControl());
		this.setEventHandlers();
	},

	configControl: function(opt_options) {
		var options = opt_options || {};

		var button = $('<button/>').attr({ id: 'LkRosMap.configButton' });

		button.html('<i class=\"fa fa-cog\"></i>');

		var this_ = this;

		button.click(LkRosMap.controller.helper.showConfig);

		var element = $('<div></div>').attr({ class: 'lkrosmap-config-control ol-unselectable ol-control'});
		element.append(button);
		
		ol.control.Control.call(this, {
			element: element.get(0),
			target: options.target
		});
	}
}