<?php

$logFile = 'error.log';
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', $logFile);


include("../validation_ramy_1991.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");



if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["validation"] == $validation) {
    include "../connect.php";

    $idSliderHeader = $_POST["idSliderHeader"];

    $selectQuery = "SELECT img_slider_header FROM slider_header WHERE id = $idSliderHeader";
    $result = $conn->query($selectQuery);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $oldImagePath = "../" . $row["img_slider_header"];

        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
    }


    $deleteQuery = "DELETE FROM slider_header WHERE id = $idSliderHeader";
    if ($conn->query($deleteQuery) === TRUE) {
        echo "successfully";
    } else {
        echo "فشل في حذف الصورة: " . $conn->error . $idSliderHeader;
    }
    $conn->close();
} else {
    echo "Invalid request method.";
}
