LkRosMap.views.helper = {};
LkRosMap.loadHeadFile('../js/views/helper/sperrDiv.js', 'js');
LkRosMap.loadHeadFile('../js/views/helper/functions.js', 'js');
LkRosMap.loadHeadFile('../js/views/helper/configuration.js', 'js');

LkRosMap.controller.helper = {
  views: LkRosMap.views.helper,
  
  setEventHandlers: function() {
    $('#LkRosMap\\.configurationBoxClose').click(function() {
      $('#LkRosMap\\.configuration').hide();
      $('#LkRosMap\\.configuration').animate({'top': '-1000px'}, 500, function() {
        $('#LkRosMap\\.sperrDiv').fadeOut('fast');
      });
    });
    
    $('#LkRosMap\\.showConfig').on(
      'click',
      this,
      this.showConfig
    );
  },

  showConfig: function() {
    $('#LkRosMap\\.configuration').show();
    $('#LkRosMap\\.sperrDiv').fadeIn(200,function() {
      $('#LkRosMap\\.configuration').animate({'top': '40px'}, 200);
    });

    console.log('showConfig');
  }
}