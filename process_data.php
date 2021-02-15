<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);



$name    = '';
$company = '';
$email   = '';
$phone   = '';
$message = '';

$name_error    = '';
$company_error = '';
$email_error   = '';
$phone_error   = '';
$message_error = '';
$captcha_error = '';


if (empty($_POST["name"])) {
    $name_error = 'Name is required';
} else {
    $name = $_POST["name"];
}




if (empty($_POST["company"])) {
    $company_error = 'Company is required';
} else {
    $company = $_POST["company"];
}




if (empty($_POST["email"])) {
    $email_error = 'Email is required';
} else {
    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $email_error = 'Invalid Email';
    } else {
        $email = $_POST["email"];
    }
}


if (empty($_POST["phone"])) {
    $phone_error = 'Phone is required';
} else {
    $phone = $_POST["phone"];
}

if (empty($_POST["message"])) {
    $message_error = 'Message is required';
} else {
    $message = $_POST["message"];
}


if (empty($_POST['g-recaptcha-response'])) {
    $captcha_error = 'Captcha is required';
} else {
    $secret_key = '6LfgRawZAAAAAGOVqjWMumrBG7OdOq0DCt1OPC1A';
    
    $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret_key . '&response=' . $_POST['g-recaptcha-response']);
    
    $response_data = json_decode($response);
    
    if (!$response_data->success) {
        $captcha_error = 'Captcha verification failed';
    }
}




if (($name_error == '' && $company_error == '' && $email_error == '' && $phone_error == '' && $captcha_error == ''&& $message_error == '')) {
    $data = array('success' => true);
    echo json_encode($data);
        
            //Server settings
// Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'opaquevfx.client@gmail.com';                     // SMTP username
            $mail->Password   = 'amitumi123#';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
            //Recipients
            $mail->setFrom('opaquevfx.client@gmail.com', 'OpaqueVFX Client');
            $mail->addAddress('opaquevfx@gmail.com', 'Opaque Vfx');     // Add a recipient
        
        
        
        
            $jmsg = "<b>Name:</b>$name <br>
            <b>Company:</b>$company <br>
            <b>Email:</b>$email <br>
            <b>Phone:</b>$phone <br>
            <b>Message:</b>$message <br>   
            ";
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'OpaqueVFX Client Contact';
            $mail->Body    = $jmsg;
            $mail->AltBody = $jmsg;
        
            $mail->send();
        

}

else {
    $data = array(
        'name_error' => $name_error,
        'company_error' => $company_error,
        'email_error' => $email_error,
        'phone_error' => $phone_error,
        'message_error' => $message_error,
        'captcha_error' => $captcha_error
    );
    echo json_encode($data);
}




?>