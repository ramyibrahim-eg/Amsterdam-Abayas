<?php

$logFile = 'error.log';
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', $logFile);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "amsterdam";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}
