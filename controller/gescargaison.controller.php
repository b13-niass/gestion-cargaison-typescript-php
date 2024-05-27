<?php

require_once WEBROOT."/model/gescargaison.model.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $db = json_decode(file_get_contents("php://input"), true);
    if(updateData($db)){
        echo json_encode($db);
    }
}elseif ($_SERVER["REQUEST_METHOD"] == "GET"){
    echo json_encode(findAllData());
}