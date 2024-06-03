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

    $google_map = mysqli_real_escape_string($conn, $_POST["google_map"]);
    $tiktok = mysqli_real_escape_string($conn, $_POST["tiktok"]);
    $instagram = mysqli_real_escape_string($conn, $_POST["instagram"]);
    $phone_1 = mysqli_real_escape_string($conn, $_POST["phone_1"]);
    $phone_2 = mysqli_real_escape_string($conn, $_POST["phone_2"]);

    

    $sql = "UPDATE contact SET google_map = '$google_map', tiktok = '$tiktok',
    instagram = '$instagram', phone_1 = '$phone_1', phone_2 = '$phone_2' WHERE id = 1";

    if ($conn->query($sql) === TRUE) {
        echo "successfully";
    } else {
        echo "error" . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
