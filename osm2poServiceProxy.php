<?php
function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

$service_url = 'http://gdi-service.de/Osm2poService';

$content = get_data($service_url . '?' . $_SERVER['QUERY_STRING']);
if ($content === false) {
  echo "#Fehler: 404
Der Service " . $service_url . " ist derzeit nicht erreichbar";
}
else {
  echo $content;
}
?>