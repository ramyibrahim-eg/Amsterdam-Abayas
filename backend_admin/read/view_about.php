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

    $query = "SELECT * FROM about_us WHERE id = 1";

    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $readData = array();

        while ($row = $result->fetch_assoc()) {
            $readData[] = array(
                'title_about_1_en' => $row['title_about_1_en'],
                'title_about_1_ar' => $row['title_about_1_ar'],
                'title_about_2_en' => $row['title_about_2_en'],
                'title_about_2_ar' => $row['title_about_2_ar'],
                'img_about_1' => $row['img_about_1'],
                'img_about_2' => $row['img_about_2'],
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
