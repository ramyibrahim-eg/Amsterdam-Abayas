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

    $description_products_info_en = mysqli_real_escape_string($conn, $_POST["description_products_info_en"]);
    $description_products_info_ar = mysqli_real_escape_string($conn, $_POST["description_products_info_ar"]);


    $update_values = array();
    $messag = "";


    $sql_select = "SELECT * FROM products_info WHERE id = 1";
    $resultAbout = mysqli_query($conn, $sql_select);

    if ($resultAbout->num_rows > 0) {
        $rowAbout = mysqli_fetch_assoc($resultAbout);

        if ($rowAbout["description_products_info_en"] != $description_products_info_en) {
            $update_values[] = "description_products_info_en = '$description_products_info_en'";
        }
        if ($rowAbout["description_products_info_ar"] != $description_products_info_ar) {
            $update_values[] = "description_products_info_ar = '$description_products_info_ar'";
        }
    }

    if (!empty($update_values)) {
        $update_values_str = implode(", ", $update_values);
        $sql_update = "UPDATE products_info SET $update_values_str WHERE id = 1";
        $result_update = mysqli_query($conn, $sql_update);

        if ($result_update) {
            if (isset($_FILES["img_products_info_1"])) {
                if (isset($_FILES["img_products_info_1"])) {
                    $selectQuery = "SELECT img_products_info FROM products_info WHERE id = 1";
                    $result = $conn->query($selectQuery);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $oldImagePath = "../" . $row["img_products_info"];

                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    $targetDirectory = "../upload/img_products_info/";
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($_FILES["img_products_info_1"]["name"], PATHINFO_EXTENSION));
                    $uniqid = uniqid();
                    $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                    $sliderFileLink = "upload/img_products_info/" . $uniqid . "." . $imageFileType;

                    if (move_uploaded_file($_FILES["img_products_info_1"]["tmp_name"], $targetFile)) {

                        $sql_update_img_products_info_1 = "UPDATE products_info SET img_products_info = '$sliderFileLink' WHERE id = 1";
                        $result_update_img_products_info_1 = mysqli_query($conn, $sql_update_img_products_info_1);

                        if ($result_update_img_products_info_1) {
                            $messag = "successfully";
                        } else {
                            echo "error" . $conn->error;
                        }
                    } else {
                        echo "error" . $conn->error;
                    }
                }
            } else {
                $messag =  "successfully";
            }
        } else {
            echo "error: " . mysqli_error($conn);
        }
    } else {
        if (isset($_FILES["img_products_info_1"])) {
            if (isset($_FILES["img_products_info_1"])) {
                $selectQuery = "SELECT img_products_info FROM products_info WHERE id = 1";
                $result = $conn->query($selectQuery);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $oldImagePath = "../" . $row["img_products_info"];

                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $targetDirectory = "../upload/img_products_info/";
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($_FILES["img_products_info_1"]["name"], PATHINFO_EXTENSION));
                $uniqid = uniqid();
                $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                $sliderFileLink = "upload/img_products_info/" . $uniqid . "." . $imageFileType;

                if (move_uploaded_file($_FILES["img_products_info_1"]["tmp_name"], $targetFile)) {

                    $sql_update_img_products_info_1 = "UPDATE products_info SET img_products_info = '$sliderFileLink' WHERE id = 1";
                    $result_update_img_products_info_1 = mysqli_query($conn, $sql_update_img_products_info_1);

                    if ($result_update_img_products_info_1) {
                        $messag = "successfully";
                    } else {
                        echo "error" . $conn->error;
                    }
                } else {
                    echo "error" . $conn->error;
                }
            }
        } else {
            $messag =  "no_changes";
        }
    }

    echo $messag;

    $conn->close();
} else {
    echo "Invalid request method.";
}
