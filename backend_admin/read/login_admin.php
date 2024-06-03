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

    $password_admin = $_POST["password_admin"];

    $sql = "SELECT * FROM login_admin WHERE id_admin = 1 AND password_admin = '$password_admin'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "successfully";
    } else {
        echo "incorrect";
    }
    $conn->close();
} else {
    echo "Invalid request method.";
}
