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

    $title_about_1_en = mysqli_real_escape_string($conn, $_POST["title_about_1_en"]);
    $title_about_1_ar = mysqli_real_escape_string($conn, $_POST["title_about_1_ar"]);
    $title_about_2_en = mysqli_real_escape_string($conn, $_POST["title_about_2_en"]);
    $title_about_2_ar = mysqli_real_escape_string($conn, $_POST["title_about_2_ar"]);


    $update_values = array();
    $messag = "";


    $sql_select = "SELECT * FROM about_us WHERE id = 1";
    $resultAbout = mysqli_query($conn, $sql_select);

    if ($resultAbout->num_rows > 0) {
        $rowAbout = mysqli_fetch_assoc($resultAbout);

        if ($rowAbout["title_about_1_en"] != $title_about_1_en) {
            $update_values[] = "title_about_1_en = '$title_about_1_en'";
        }
        if ($rowAbout["title_about_1_ar"] != $title_about_1_ar) {
            $update_values[] = "title_about_1_ar = '$title_about_1_ar'";
        }
        if ($rowAbout["title_about_2_en"] != $title_about_2_en) {
            $update_values[] = "title_about_2_en = '$title_about_2_en'";
        }
        if ($rowAbout["title_about_2_ar"] != $title_about_2_ar) {
            $update_values[] = "title_about_2_ar = '$title_about_2_ar'";
        }
    }

    if (!empty($update_values)) {
        $update_values_str = implode(", ", $update_values);
        $sql_update = "UPDATE about_us SET $update_values_str WHERE id = 1";
        $result_update = mysqli_query($conn, $sql_update);

        if ($result_update) {
            if (isset($_FILES["img_about_1"]) || isset($_FILES["img_about_2"])) {
                if (isset($_FILES["img_about_1"])) {
                    $selectQuery = "SELECT img_about_1 FROM about_us WHERE id = 1";
                    $result = $conn->query($selectQuery);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $oldImagePath = "../" . $row["img_about_1"];

                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    $targetDirectory = "../upload/img_about_us/";
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($_FILES["img_about_1"]["name"], PATHINFO_EXTENSION));
                    $uniqid = uniqid();
                    $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                    $sliderFileLink = "upload/img_about_us/" . $uniqid . "." . $imageFileType;

                    if (move_uploaded_file($_FILES["img_about_1"]["tmp_name"], $targetFile)) {

                        $sql_update_img_about_1 = "UPDATE about_us SET img_about_1 = '$sliderFileLink' WHERE id = 1";
                        $result_update_img_about_1 = mysqli_query($conn, $sql_update_img_about_1);

                        if ($result_update_img_about_1) {
                            $messag = "successfully";
                        } else {
                            echo "error" . $conn->error;
                        }
                    } else {
                        echo "error" . $conn->error;
                    }
                }
                if (isset($_FILES["img_about_2"])) {
                    $selectQuery = "SELECT img_about_2 FROM about_us WHERE id = 1";
                    $result = $conn->query($selectQuery);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $oldImagePath = "../" . $row["img_about_2"];

                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    $targetDirectory = "../upload/img_about_us/";
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($_FILES["img_about_2"]["name"], PATHINFO_EXTENSION));
                    $uniqid = uniqid();
                    $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                    $sliderFileLink = "upload/img_about_us/" . $uniqid . "." . $imageFileType;

                    if (move_uploaded_file($_FILES["img_about_2"]["tmp_name"], $targetFile)) {

                        $sql_update_img_about_2 = "UPDATE about_us SET img_about_2 = '$sliderFileLink' WHERE id = 1";
                        $result_update_img_about_2 = mysqli_query($conn, $sql_update_img_about_2);

                        if ($result_update_img_about_2) {
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

        if (isset($_FILES["img_about_1"]) || isset($_FILES["img_about_2"])) {
            if (isset($_FILES["img_about_1"])) {
                $selectQuery = "SELECT img_about_1 FROM about_us WHERE id = 1";
                $result = $conn->query($selectQuery);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $oldImagePath = "../" . $row["img_about_1"];

                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $targetDirectory = "../upload/img_about_us/";
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($_FILES["img_about_1"]["name"], PATHINFO_EXTENSION));
                $uniqid = uniqid();
                $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                $sliderFileLink = "upload/img_about_us/" . $uniqid . "." . $imageFileType;

                if (move_uploaded_file($_FILES["img_about_1"]["tmp_name"], $targetFile)) {

                    $sql_update_img_about_1 = "UPDATE about_us SET img_about_1 = '$sliderFileLink' WHERE id = 1";
                    $result_update_img_about_1 = mysqli_query($conn, $sql_update_img_about_1);

                    if ($result_update_img_about_1) {
                        $messag = "successfully";
                    } else {
                        echo "error" . $conn->error;
                    }
                } else {
                    echo "error" . $conn->error;
                }
            }
            if (isset($_FILES["img_about_2"])) {
                $selectQuery = "SELECT img_about_2 FROM about_us WHERE id = 1";
                $result = $conn->query($selectQuery);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $oldImagePath = "../" . $row["img_about_2"];

                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $targetDirectory = "../upload/img_about_us/";
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($_FILES["img_about_2"]["name"], PATHINFO_EXTENSION));
                $uniqid = uniqid();
                $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                $sliderFileLink = "upload/img_about_us/" . $uniqid . "." . $imageFileType;

                if (move_uploaded_file($_FILES["img_about_2"]["tmp_name"], $targetFile)) {

                    $sql_update_img_about_2 = "UPDATE about_us SET img_about_2 = '$sliderFileLink' WHERE id = 1";
                    $result_update_img_about_2 = mysqli_query($conn, $sql_update_img_about_2);

                    if ($result_update_img_about_2) {
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
