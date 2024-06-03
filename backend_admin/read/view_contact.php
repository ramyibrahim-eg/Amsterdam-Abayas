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

    $query = "SELECT * FROM contact WHERE id = 1";

    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $readData = array();

        while ($row = $result->fetch_assoc()) {
            $readData[] = array(
                'google_map' => $row['google_map'],
                'tiktok' => $row['tiktok'],
                'instagram' => $row['instagram'],
                'phone_1' => $row['phone_1'],
                'phone_2' => $row['phone_2'],
            );
        }

        echo json_encode($readData);
    } else {
        echo json_encode([]);
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
