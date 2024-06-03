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

    $query = "SELECT * FROM slider_header ORDER BY id DESC";

    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $readData = array();

        while ($row = $result->fetch_assoc()) {
            $readData[] = array(
                'id' => $row['id'],
                'img_slider_header' => $row['img_slider_header'],
                'title_slider_header_en' => $row['title_slider_header_en'],
                'title_slider_header_ar' => $row['title_slider_header_ar'],
                'description_slider_header_en' => $row['description_slider_header_en'],
                'description_slider_header_ar' => $row['description_slider_header_ar'],
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
