<?php

require_once WEBROOT."/model/cargaison.model.php";

function findAllCargaison(){
    return array_merge(findAllData()["cargaison"]["maritime"]["values"], findAllData()["cargaison"]["aerienne"]["values"], findAllData()["cargaison"]["routiere"]["values"]) ;
}

function formatDate($date) {
    $dateTime = new DateTime($date);
    return $dateTime->format('d/m/Y');
}