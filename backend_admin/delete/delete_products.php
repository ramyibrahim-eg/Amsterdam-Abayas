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

    $idProducts = $_POST["idProducts"];

    $selectQuery = "SELECT img_product_add FROM product_add WHERE id = $idProducts";
    $result = $conn->query($selectQuery);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $oldImagePath = "../" . $row["img_product_add"];

        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
    }

    $deleteQuery = "DELETE FROM product_add WHERE id = $idProducts";
    if ($conn->query($deleteQuery) === TRUE) {
        echo "successfully";
    } else {
        echo "فشل في حذف الصورة: " . $conn->error . $idProducts;
    }
    $conn->close();
} else {
    echo "Invalid request method.";
}
