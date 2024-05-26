<?php 
require_once "../config/SimpleXLSX.php";
use Shuchkin\SimpleXLSX;

function read_data_files($file_name,$keys = null){
    $chemin = "../data/$file_name.csv";
    $csvData = file_get_contents($chemin);
    $lines = explode(PHP_EOL, $csvData);
    $array = array();
    foreach ($lines as $line) {
        if(!empty($line)){
            $values = str_getcsv($line);
            $array[] = $keys == null ? $values : array_combine($keys, $values);
        }
    }
    return $array;
}

function read_data_files_app($chemin,$keys = null){
    // $csvData = file_get_contents($chemin);
    // $lines = explode(PHP_EOL, $csvData);
    $array = array();
    // foreach ($lines as $key => $line) {
    //     if($key == 0){
    //         continue;
    //     }
    //     if(strlen($line) > 8){
    //         // var_dump($line);
    //         $values = str_getcsv($line, ';');
    //         dd($values);
    //         $array[] = $keys == null ? $values : array_combine($keys, $values);
    //     }
    // }
   

    if ( $xlsx = SimpleXLSX::parse($chemin) ) {
        $result = $xlsx->rows();
        array_shift($result);
        foreach ($result as $row) {
            $array[] = $keys == null ? $row : array_combine($keys, $row);
        }
        
    } else {
        echo SimpleXLSX::parseError();
    }
    // dd($array);
    return $array;
}


function write_data_files($file_name, $data){
    $chemin = "../data/$file_name.csv";

    $csvData = '';
    // dd($data);
    foreach ($data as $row) {
        // dd($row);
        $csvData .= implode(',', $row) . "\n";
    }
    $success = file_put_contents($chemin, $csvData);
    if ($success !== false) {
        return true;
    } else {
        return false;
    }
}
