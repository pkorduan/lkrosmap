LkRosMap.views.helper = {};
//LkRosMap.loadHeadFile('../js/views/helper/sperrDiv.js', 'js');
//LkRosMap.loadHeadFile('../js/views/helper/configuration.js', 'js');

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
    this.configControl = new LkRosMap.controls.configControl();
    ol.inherits(this.configControl, ol.control.Control);
    LkRosMap.map.addControl(this.configControl);
    this.setEventHandlers();
  }
}