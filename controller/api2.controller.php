<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use Twilio\Rest\Client;

require_once  WEBROOT."/config/phpmailer/Exception.php";
require_once  WEBROOT."/config/phpmailer/PHPMailer.php";
require_once  WEBROOT."/config/phpmailer/SMTP.php";

require_once  WEBROOT."/config/Twilio/autoload.php";
require_once  WEBROOT."/config/Twilio/Rest/Client.php";

require_once WEBROOT."/model/api2.model.php";
require_once WEBROOT."/config/TCPDF/tcpdf.php";

function generatePDF($sender, $recipient, $products, $totalAmount) {
    $pdf = new Tcpdf();

    // Définir les informations du document
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Votre Nom');
    $pdf->SetTitle('Informations sur le reçu');
    $pdf->SetSubject('Détails du Colis');

    // Ajouter une page
    $pdf->AddPage();

    // Titre
    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->Cell(0, 15, 'Informations du Colis', 0, 1, 'C');
    $pdf->Ln(10);

    // Informations sur l'expéditeur et le destinataire
    $pdf->SetFont('helvetica', '', 12);
    $pdf->Cell(0, 10, 'Expéditeur:', 0, 1);
    $pdf->MultiCell(0, 10, $sender, 0, 1);
    $pdf->Ln(5);

    $pdf->Cell(0, 10, 'Destinataire:', 0, 1);
    $pdf->MultiCell(0, 10, $recipient, 0, 1);
    $pdf->Ln(10);

    // Table des produits
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->Cell(60, 10, 'Produit', 1);
    $pdf->Cell(40, 10, 'Poids (kg)', 1);
    $pdf->Cell(40, 10, 'Type Produit', 1);
    $pdf->Cell(40, 10, 'Prix (Fcfa)', 1);
    $pdf->Ln();

    $pdf->SetFont('helvetica', '', 12);
    foreach ($products as $product) {
        $pdf->Cell(60, 10, $product['libelle'], 1);
        $pdf->Cell(40, 10, $product['poids'], 1);
        $pdf->Cell(40, 10, $product['typep'], 1);
        $pdf->Cell(40, 10, 0, 1);
        $pdf->Ln();
    }

    // Montant total
    $pdf->Ln(10);
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->Cell(0, 10, 'Montant total: ' . $totalAmount . ' EUR', 0, 1, 'R');

    // Générer le PDF
//    $pdf->Output('colis.pdf', 'I');
    $pdfString = $pdf->Output('generated.pdf', 'S');

    // Send the PDF to the browser
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="generated.pdf"');
    echo $pdfString;
}

function sendSMSWithTwilio( $message, $sender="",$receiver=""){
    $sid = "AC72176a0f4ef9ef1f7c5123604cec1c5d";
    $token = "cef68799eb282b06811c85e4f019ab65";
    $client = new Client($sid, $token);

// Use the Client to make requests to the Twilio REST API
    $client->messages->create(
    // The number you'd like to send the message to
        '+221767819339',
        [
            'from' => '+13346860878',
            'body' => "Le code du coli est : ".$message
        ]
    );
}

function sendSingleEmail($email, $code){
    $result = sendMailToApprenant($code, 'codev13.sendmail@gmail.com', $email);
    return $result;
}

function sendMailToApprenant($code, $email_from, $email_to){

    $mail = new PHPMailer();
    // configure an SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = "codev13.sendmail@gmail.com";
    $mail->Password = 'btqm wvnj ztxx xbru';               // sets the prefix to the servier
    $mail->SMTPSecure = "tls";
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->SMTPDebug = 0;
    $mail->setFrom($email_from, 'Orange Digital Center');
    $mail->addAddress($email_to, 'Me');
    $mail->Subject = 'Connecter-vous pour marquer votre présence';
    // // Set HTML
    $mail->isHTML(TRUE);
    $mail->Body = $code;
    try{
        if(!$mail->send()){
            return false;
        } else {
            return true;
        }
    }catch(Exception $e){
        return $e;
    }

}

function login($email, $password)
{
    $file_data = findAllData();
    foreach ($file_data["gestionaire"] as $gestionaire){
        if ($gestionaire["email"] == $email){
            if (password_verify($password, $gestionaire["password"])){
                return ["email" => $gestionaire["email"], "nom" => $gestionaire["nom"]];
            }
        }
    }
    return false;
}

if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $coli = json_decode(file_get_contents("php://input"), true);
//  echo json_encode($coli['destinataire']['prenom']);
    if ($coli["formulaires"] == "ajout_produits"){
        sendSMSWithTwilio($coli['code'],"","");
        sendSingleEmail($coli['expediteur']['email'],$coli['code']);
        sendSingleEmail($coli['destinataire']['email'],$coli['code']);
        $sender = $coli['expediteur']['prenom']."\n".$coli['expediteur']['nom']."\n".$coli['expediteur']['email']."\n".$coli['expediteur']['pays'];
        $recipient =  $coli['destinataire']['prenom']."\n".$coli['destinataire']['nom']."\n".$coli['destinataire']['email']."\n".$coli['destinataire']['pays'];
        generatePDF($sender, $recipient, $coli["produits"], 0);
    }else if ($coli["formulaires"] == "login"){
//        echo password_hash("passer", PASSWORD_BCRYPT);
        $email = $coli["email"];
        $password = $coli["password"];
        $result = login($email, $password);
        if ($result){
            echo json_encode($result);
        }else{
            echo json_encode(false);
        }
    }
}