<html lang="de">
  <head>
    <meta charset="utf-8">
    <script type="text/javascript">
      LkRosMap = {
        config:  {
          name: 'Naturdenkmale',
          hideHeader: true,
          viewProjection: 'EPSG:25833',
          baseProjection: 'EPSG:4326',
          backgroundlayers: [{
            name: 'Orka M-V',
            url: ''
          }, {
            name: 'Luftbilder',
            url: ''
          }],
          mapWidth: '700px',
          mapHeight: '600px',
          layers: [{
            index: 0,
            name: 'Naturdenkmale',
            url: '../../wfs2json/json/lkrosmap_Naturdenkmale.json',
            indexUrl: '../../json2index/index/lkrosmap_Naturdenkmale.json',
            model: 'Naturdenkmal',
            attribution: 'Naturdenkmale des Landkreises Rostock<br>'
          }],
          center: [12.21, 53.91],
          layerExtent: [267289, 5933512, 360042, 6023242]
        }
      };
    </script>
    <script type="text/javascript" src="../js/app.js"></script>
    <?php include_once('header_links.php'); ?>
    </head>
  <body onload="LkRosMap.init();">
    <div id="LkRosMap.container">
      <div id="LkRosMap.searchOverlay" class="lkrosmap-search-overlay">
        <div id="LkRosMap.searchAnimation" class="lkrosmap-search-animation">
          <span style="font-size: 35px">Lade Naturdenkmale</span> <i class="fa fa-3x fa-spinner fa-spin"></i>
        </div>
      </div>
    </div>
  </body>
</html>
