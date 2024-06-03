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

    $title_rate_us_en = mysqli_real_escape_string($conn, $_POST["title_rate_us_en"]);
    $title_rate_us_ar = mysqli_real_escape_string($conn, $_POST["title_rate_us_ar"]);

    $respect_en = mysqli_real_escape_string($conn, $_POST["respect_en"]);
    $respect_ar = mysqli_real_escape_string($conn, $_POST["respect_ar"]);

    $cultural_appreciation_en = mysqli_real_escape_string($conn, $_POST["cultural_appreciation_en"]);
    $cultural_appreciation_ar = mysqli_real_escape_string($conn, $_POST["cultural_appreciation_ar"]);

    $integrity_en = mysqli_real_escape_string($conn, $_POST["integrity_en"]);
    $integrity_ar = mysqli_real_escape_string($conn, $_POST["integrity_ar"]);

    $customer_satisfaction_en = mysqli_real_escape_string($conn, $_POST["customer_satisfaction_en"]);
    $customer_satisfaction_ar = mysqli_real_escape_string($conn, $_POST["customer_satisfaction_ar"]);


    $update_values = array();
    $messag = "";


    $sql_select = "SELECT * FROM rate_us WHERE id = 1";
    $resultAbout = mysqli_query($conn, $sql_select);

    if ($resultAbout->num_rows > 0) {
        $rowAbout = mysqli_fetch_assoc($resultAbout);

        if ($rowAbout["title_rate_us_en"] != $title_rate_us_en) {
            $update_values[] = "title_rate_us_en = '$title_rate_us_en'";
        }
        if ($rowAbout["title_rate_us_ar"] != $title_rate_us_ar) {
            $update_values[] = "title_rate_us_ar = '$title_rate_us_ar'";
        }
        if ($rowAbout["respect_en"] != $respect_en) {
            $update_values[] = "respect_en = '$respect_en'";
        }
        if ($rowAbout["respect_ar"] != $respect_ar) {
            $update_values[] = "respect_ar = '$respect_ar'";
        }
        if ($rowAbout["cultural_appreciation_en"] != $cultural_appreciation_en) {
            $update_values[] = "cultural_appreciation_en = '$cultural_appreciation_en'";
        }
        if ($rowAbout["cultural_appreciation_ar"] != $cultural_appreciation_ar) {
            $update_values[] = "cultural_appreciation_ar = '$cultural_appreciation_ar'";
        }
        if ($rowAbout["integrity_en"] != $integrity_en) {
            $update_values[] = "integrity_en = '$integrity_en'";
        }
        if ($rowAbout["integrity_ar"] != $integrity_ar) {
            $update_values[] = "integrity_ar = '$integrity_ar'";
        }
        if ($rowAbout["customer_satisfaction_en"] != $customer_satisfaction_en) {
            $update_values[] = "customer_satisfaction_en = '$customer_satisfaction_en'";
        }
        if ($rowAbout["customer_satisfaction_ar"] != $customer_satisfaction_ar) {
            $update_values[] = "customer_satisfaction_ar = '$customer_satisfaction_ar'";
        }
    }

    if (!empty($update_values)) {
        $update_values_str = implode(", ", $update_values);
        $sql_update = "UPDATE rate_us SET $update_values_str WHERE id = 1";
        $result_update = mysqli_query($conn, $sql_update);

        if ($result_update) {
            $messag =  "successfully";
        } else {
            echo "error: " . mysqli_error($conn);
        }
    } else {
        $messag =  "no_changes";
    }

    echo $messag;

    $conn->close();
} else {
    echo "Invalid request method.";
}
