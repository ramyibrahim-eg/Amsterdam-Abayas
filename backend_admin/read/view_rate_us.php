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

    $query = "SELECT * FROM rate_us WHERE id = 1";

    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $readData = array();

        while ($row = $result->fetch_assoc()) {
            $readData[] = array(
                'title_rate_us_en' => $row['title_rate_us_en'],
                'title_rate_us_ar' => $row['title_rate_us_ar'],
                'respect_en' => $row['respect_en'],
                'respect_ar' => $row['respect_ar'],
                'cultural_appreciation_en' => $row['cultural_appreciation_en'],
                'cultural_appreciation_ar' => $row['cultural_appreciation_ar'],
                'integrity_en' => $row['integrity_en'],
                'integrity_ar' => $row['integrity_ar'],
                'customer_satisfaction_en' => $row['customer_satisfaction_en'],
                'customer_satisfaction_ar' => $row['customer_satisfaction_ar'],
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
