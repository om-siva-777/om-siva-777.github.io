<?php
$filenameArray = array();
$currentDir = str_replace(basename(dirname(__FILE__)),"",dirname(__FILE__));
$uploadDirectory = "/img/review/";
$handle = opendir($currentDir.$uploadDirectory);
    while($file = readdir($handle)){
        if($file !== '.' && $file !== '..'){
            array_push($filenameArray, "$uploadDirectory$file");
        }
    }

echo json_encode($filenameArray);
?> 