<?php 

function read_json_files($file_name){
    $path = "../data/$file_name.json";
    $json_data = file_get_contents($path);
    $array = json_decode($json_data, true);
    return $array;
}

function write_json_files($file_name, $data){
    $path = "../data/$file_name.json";
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    return file_put_contents($path, $json_data);
}
