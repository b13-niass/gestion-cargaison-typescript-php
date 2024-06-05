<?php
$routes = [
    'cargo' => ['cargaison'],
    'prod' => ['produit'],
    'detcargo' => ['detailcargaison'],
    'login' => ['login'],
    'api-gc' => ['api-gc'],
    'api2' => ['api2'],
];

$page = pageNameGenerate($_REQUEST, $routes);

if ($page == "api-gc"){
    require_once WEBROOT."/controller/gescargaison.controller.php";
}else if($page == "api2"){
    require_once WEBROOT."/controller/api2.controller.php";
}else if ($page == '404'){
    require_once WEBROOT."/templates/404.html.php";
} elseif ($page == 'login'){
    require_once WEBROOT."/templates/login.html.php";
}else{
    require_once WEBROOT."/controller/cargaison.controller.php";
    require_once WEBROOT."/templates/partials/header.html.php";

    require_once WEBROOT."/templates/$page.html.php";

    require_once WEBROOT."/templates/partials/footer.html.php";
}