<?php

function findAllData(){
    return read_json_files('gescargaison');
}

function updateData($data){
   return write_json_files('gescargaison', $data);
}