<?php 

function pageNameGenerate(array $request,array $pages){
    $uri = "login";
    $result = "";

    if (isset($request['page']) && !empty($request['page'])){
        if($request['page'] != "/"){
            $resource = explode('/', $request['page']);
            $uri = $resource[1];
            }
    }
    if(array_key_exists($uri, $pages)){
        $result= $pages[$uri][0];
    }else{
        $result = "404";
    }
    return $result;
}

function vdp($data){
    echo "<pre>";
    var_dump($data);
    echo "</pre>";
}

function dd($data){
    echo "<pre >";
    var_dump($data);
    echo "</pre>";
    die();
}