<?php
$filenameArray = array();
$currentDir = str_replace(basename(dirname(__FILE__)),"",dirname(__FILE__));
$fh = fopen($currentDir.$_POST['fileName'],'r');
while ($line = fgets($fh)) {
    array_push($filenameArray, "$line");
}
echo json_encode($filenameArray);
fclose($fh);     
?> 