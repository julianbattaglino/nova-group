<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer/PHPMailer.php';
require 'PHPMailer/PHPMailer/SMTP.php';
require_once 'ReCaptcha/autoload.php';

//Declarando los fields para incluirlos en el Body
    $nombre = $_POST['nombre'];
	$email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $mensaje = $_POST['mensaje'];
	$body = "
            <head>  
              <style> 
                body { 
                    height: 100%; width: 100%; max-width: 100%;
                    font-family: 'Work Sans', sans-serif; 
                    font-weight: 400;
                    background-color: #FAFAFA;
                    overflow: hidden;
                }   
                p { font-size: 14px; font-family: 'Work Sans', sans-serif; font-weight: 400; color: #333333; }
            
                .gold { color: #C2A975; font-family: 'Work Sans', sans-serif; font-weight: 400; }
                .bold { font-weight: bold; }
                .title { font-size: 36px; }
              </style>
            </head>
            
            <body>
                <div>
                <div>
                    <h1 class='gold title'><b>Formulario de Contacto</b></h1>
                
            
                    <p>Nombre: <span class='bold'> $nombre</span></p>
                    <p>Email: <span class='bold'> $email</span></p>
                    <p>Telfono: <span class='bold'> $telefono</span></p>
                    <p>Mensaje: <span class='bold'> $mensaje</span></p>
                    
                </div>
                </div>  
                <footer>
                    <h4 class=bold></h4>
                    <span class=grey>Este formulario a sido completado Desde el sitio web https://novagroup.com.ar/</span><br/><br/>
                    <img src='' style='width: 75px' />
                </footer>

            </body>
            ";  
                


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                        //Enable verbose debug output
    $mail->isSMTP();                                                //Send using SMTP
    $mail->Host       = 'mail.urbanresidencesrecoleta.com.ar';      //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                       //Enable SMTP authentication
    $mail->Username   = 'no-reply@urbanresidencesrecoleta.com.ar';  //SMTP username
    $mail->Password   = 'WkaVIMFK0Ddd';                             //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;                //Enable implicit TLS encryption
    $mail->Port       = 465;                                        //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Configuración del remitente
    $mail->setFrom('no-reply@urbanresidencesrecoleta.com.ar', 'No-Reply');

    //Recipients
    $mail->addReplyTo($email);
    $mail->addAddress('julianbattaglino@gmail.com', 'Julian Battaglino - Gmail');     //Add a recipient
    $mail->addAddress('info@netcorealestate.com', 'Sole Orona');                      //Add a recipient
    $mail->addAddress('camilalongosiage@gmail.com', 'Camila Longo Siage');            //Add a recipient
    $mail->addAddress('no-reply@urbanresidencesrecoleta.com.ar', 'No-Reply');         //Add a recipient
 
    //$mail->addAddress('ellen@example.com');                    //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('addCCc@example.com');
    //$mail->addBCC('bcc@example.com');


    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Nova Group Formulario web completado';
    $mail->Body    = $body;
    $mail->AltBody = $mensaje;

    $mail->send();
    
    /// Alerta Javascript luego del envio exitoso, y redirección al index.html
     echo "
    <script> alert('Gracias por contactarte con nosotros. responderemos lo antes posible.');
    window.location.href = '/';
    </script>";

} catch (Exception $e) {
    echo "
    <script> alert('Hubo un error, no se pudo enviar el mensaje, intentalo nuevamente.');
    window.location.href = '/';
    </script>";
}