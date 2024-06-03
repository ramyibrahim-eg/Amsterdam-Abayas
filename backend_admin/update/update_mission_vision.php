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

    $description_mission_en = mysqli_real_escape_string($conn, $_POST["description_mission_en"]);
    $description_mission_ar = mysqli_real_escape_string($conn, $_POST["description_mission_ar"]);
    $description_vision_en = mysqli_real_escape_string($conn, $_POST["description_vision_en"]);
    $description_vision_ar = mysqli_real_escape_string($conn, $_POST["description_vision_ar"]);


    $update_values = array();
    $messag = "";


    $sql_select = "SELECT * FROM mission_vision WHERE id = 1";
    $resultAbout = mysqli_query($conn, $sql_select);

    if ($resultAbout->num_rows > 0) {
        $rowAbout = mysqli_fetch_assoc($resultAbout);

        if ($rowAbout["description_mission_en"] != $description_mission_en) {
            $update_values[] = "description_mission_en = '$description_mission_en'";
        }
        if ($rowAbout["description_mission_ar"] != $description_mission_ar) {
            $update_values[] = "description_mission_ar = '$description_mission_ar'";
        }
        if ($rowAbout["description_vision_en"] != $description_vision_en) {
            $update_values[] = "description_vision_en = '$description_vision_en'";
        }
        if ($rowAbout["description_vision_ar"] != $description_vision_ar) {
            $update_values[] = "description_vision_ar = '$description_vision_ar'";
        }
    }

    if (!empty($update_values)) {
        $update_values_str = implode(", ", $update_values);
        $sql_update = "UPDATE mission_vision SET $update_values_str WHERE id = 1";
        $result_update = mysqli_query($conn, $sql_update);

        if ($result_update) {
            if (isset($_FILES["img_mission"]) || isset($_FILES["img_vision"])) {
                if (isset($_FILES["img_mission"])) {
                    $selectQuery = "SELECT img_mission FROM mission_vision WHERE id = 1";
                    $result = $conn->query($selectQuery);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $oldImagePath = "../" . $row["img_mission"];

                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    $targetDirectory = "../upload/img_mission_vision/";
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($_FILES["img_mission"]["name"], PATHINFO_EXTENSION));
                    $uniqid = uniqid();
                    $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                    $sliderFileLink = "upload/img_mission_vision/" . $uniqid . "." . $imageFileType;

                    if (move_uploaded_file($_FILES["img_mission"]["tmp_name"], $targetFile)) {

                        $sql_update_img_mission = "UPDATE mission_vision SET img_mission = '$sliderFileLink' WHERE id = 1";
                        $result_update_img_mission = mysqli_query($conn, $sql_update_img_mission);

                        if ($result_update_img_mission) {
                            $messag = "successfully";
                        } else {
                            echo "error" . $conn->error;
                        }
                    } else {
                        echo "error" . $conn->error;
                    }
                }
                if (isset($_FILES["img_vision"])) {
                    $selectQuery = "SELECT img_vision FROM mission_vision WHERE id = 1";
                    $result = $conn->query($selectQuery);

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $oldImagePath = "../" . $row["img_vision"];

                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    $targetDirectory = "../upload/img_mission_vision/";
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($_FILES["img_vision"]["name"], PATHINFO_EXTENSION));
                    $uniqid = uniqid();
                    $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                    $sliderFileLink = "upload/img_mission_vision/" . $uniqid . "." . $imageFileType;

                    if (move_uploaded_file($_FILES["img_vision"]["tmp_name"], $targetFile)) {

                        $sql_update_img_vision = "UPDATE mission_vision SET img_vision = '$sliderFileLink' WHERE id = 1";
                        $result_update_img_vision = mysqli_query($conn, $sql_update_img_vision);

                        if ($result_update_img_vision) {
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
        if (isset($_FILES["img_mission"]) || isset($_FILES["img_vision"])) {
            if (isset($_FILES["img_mission"])) {
                $selectQuery = "SELECT img_mission FROM mission_vision WHERE id = 1";
                $result = $conn->query($selectQuery);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $oldImagePath = "../" . $row["img_mission"];

                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $targetDirectory = "../upload/img_mission_vision/";
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($_FILES["img_mission"]["name"], PATHINFO_EXTENSION));
                $uniqid = uniqid();
                $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                $sliderFileLink = "upload/img_mission_vision/" . $uniqid . "." . $imageFileType;

                if (move_uploaded_file($_FILES["img_mission"]["tmp_name"], $targetFile)) {

                    $sql_update_img_mission = "UPDATE mission_vision SET img_mission = '$sliderFileLink' WHERE id = 1";
                    $result_update_img_mission = mysqli_query($conn, $sql_update_img_mission);

                    if ($result_update_img_mission) {
                        $messag = "successfully";
                    } else {
                        echo "error" . $conn->error;
                    }
                } else {
                    echo "error" . $conn->error;
                }
            }
            if (isset($_FILES["img_vision"])) {
                $selectQuery = "SELECT img_vision FROM mission_vision WHERE id = 1";
                $result = $conn->query($selectQuery);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $oldImagePath = "../" . $row["img_vision"];

                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $targetDirectory = "../upload/img_mission_vision/";
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($_FILES["img_vision"]["name"], PATHINFO_EXTENSION));
                $uniqid = uniqid();
                $targetFile = $targetDirectory . $uniqid . "." . $imageFileType;
                $sliderFileLink = "upload/img_mission_vision/" . $uniqid . "." . $imageFileType;

                if (move_uploaded_file($_FILES["img_vision"]["tmp_name"], $targetFile)) {

                    $sql_update_img_vision = "UPDATE mission_vision SET img_vision = '$sliderFileLink' WHERE id = 1";
                    $result_update_img_vision = mysqli_query($conn, $sql_update_img_vision);

                    if ($result_update_img_vision) {
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
