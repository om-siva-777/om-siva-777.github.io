<?php
    $currentDir = str_replace(basename(dirname(__FILE__)),"",dirname(__FILE__));
    $uploadDirectory = "/img/review/";

    $filecount = 0;
    $files = glob($currentDir . $uploadDirectory . "*");
    if ($files){
     $filecount = count($files);
     echo "$filecount in $currentDir$uploadDirectory";
    }
    if ($filecount==0){
        $value=1;
    } else{
        $value=($filecount/2)+1;
    }

    $errors = []; // Store all foreseen and unforseen errors here

    $fileExtensions = ['jpeg','jpg','png']; // Get all the file extensions

    $fileName = $_FILES['imagefile']['name'];
    $fileSize = $_FILES['imagefile']['size'];
    $fileTmpName  = $_FILES['imagefile']['tmp_name'];
    $fileType = $_FILES['imagefile']['type'];
    $fileExtension = strtolower(end(explode('.',$fileName)));

    // $name = strip_tags(htmlspecialchars($_POST['name']));
    // $message = strip_tags(htmlspecialchars($_POST['message']));

    $uploadPath = $currentDir . $uploadDirectory . $value . "." . $fileExtension; 

    if(isset($_POST['name']) && isset($_POST['message'])) {
        $data = $_POST['name'] . "\n" . $_POST['message'] . "\r\n";
        $ret = file_put_contents($currentDir . $uploadDirectory. $value.'.txt', $data, FILE_APPEND | LOCK_EX);
        if($ret === false) {
            die('There was an error writing this file '.$currentDir . $uploadDirectory. $value.'.txt');
        }
        else {
            echo "$ret bytes written to file";
            }
    }
    else {
       die('no post data to process');
    }

    
    if (! in_array($fileExtension,$fileExtensions)) {
        $errors[] = "\nThis file extension is not allowed. Please upload a JPEG or PNG file";
    }

    if ($fileSize > 2000000) {
        $errors[] = "\nThis file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
    }

    if (empty($errors)) {
        $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

        if ($didUpload) {
            echo "\nThe file " . $value. "." . $fileExtension . " has been uploaded";
            return true;
        } else {
            echo "\nAn error occurred somewhere. Try again or contact the admin";
            return false;
        }
    } else {
        foreach ($errors as $error) {
            echo $error . "These are the errors" . "\n";
            return false;
        }
    }
return true;         
?>