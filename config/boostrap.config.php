<?php

define("ASSETS_PATH",basename(dirname(__DIR__))."/public/assets");
define("WEBROOT", $_SERVER['DOCUMENT_ROOT']."/gescargaison");
define("ENVIRONNEMENT", "DEV");
define("FILES", WEBROOT."/data");
define("UPLOAD_DIR", WEBROOT.'/public/assets/img/');

if(ENVIRONNEMENT == "DEV"){
    require_once WEBROOT."/config/helpers.config.php";
    require_once WEBROOT."/orm/file.json.php";
}else{
    include_once WEBROOT."/config/helpers.config.php";
    include_once WEBROOT."/orm/file.json.php";
}
