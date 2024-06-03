<?php

$logFile = 'error.log';
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', $logFile);


include("../validation_ramy_1991.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


if (
    $_SERVER["REQUEST_METHOD"] == "POST" &&
    $_POST["validation"] == $validation
) {
    include "../connect.php";

    if (isset($_FILES["img_products"])) {

        $targetDirectory = "../upload/img_products/";
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($_FILES["img_products"]["name"], PATHINFO_EXTENSION));
        $uniqid = uniqid();
        $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
        $sliderFileLink = "upload/img_products/" . $uniqid . "." . $imageFileType;

        if ($uploadOk == 0) {
            echo "error" . $conn->error;
        } else {
            if (move_uploaded_file($_FILES["img_products"]["tmp_name"], $targetFile)) {
                $sql = "INSERT INTO product_add (img_product_add) VALUES ('$sliderFileLink')";

                if ($conn->query($sql) === TRUE) {
                    echo "successfully";
                } else {
                    echo "error" . $conn->error;
                }
            } else {
                echo "error" . $conn->error;
            }
        }
    } else {
        echo "Error sending image";
    }
    $conn->close();
} else {
    echo "Invalid request method.";
}
