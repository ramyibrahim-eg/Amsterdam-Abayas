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

    $title_slider_header_en = mysqli_real_escape_string($conn, $_POST["title_slider_header_en"]);
    $title_slider_header_ar = mysqli_real_escape_string($conn, $_POST["title_slider_header_ar"]);
    $description_slider_header_en = mysqli_real_escape_string($conn, $_POST["description_slider_header_en"]);
    $description_slider_header_ar = mysqli_real_escape_string($conn, $_POST["description_slider_header_ar"]);


    if (isset($_FILES["img_slider_header"])) {

        $targetDirectory = "../upload/img_slider_header/";
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($_FILES["img_slider_header"]["name"], PATHINFO_EXTENSION));
        $uniqid = uniqid();
        $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
        $sliderFileLink = "upload/img_slider_header/" . $uniqid . "." . $imageFileType;

        if ($uploadOk == 0) {
            echo "error" . $conn->error;
        } else {
            if (move_uploaded_file($_FILES["img_slider_header"]["tmp_name"], $targetFile)) {
                $sql = "INSERT INTO slider_header (img_slider_header, title_slider_header_en, title_slider_header_ar, description_slider_header_en, description_slider_header_ar)
                VALUES ('$sliderFileLink', '$title_slider_header_en', '$title_slider_header_ar', '$description_slider_header_en', '$description_slider_header_ar')";

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
