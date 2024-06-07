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


/** Déclaration des Variables **/

$data = findAllData();

/** Déclaration des Fonctions **/

function findCargaison($numero) {
    $file_data = findAllData();
    foreach ($file_data["cargaison"]["maritime"]["values"] as $key => $cargo) {
        if ($cargo["numero"] == $numero){
            return $cargo;
        }
    }
    foreach ($file_data["cargaison"]["aerienne"]["values"] as $key => $cargo) {
        if ($cargo["numero"] == $numero){
            return $cargo;
        }
    }
    foreach ($file_data["cargaison"]["routiere"]["values"] as $key => $cargo) {
        if ($cargo["numero"] == $numero){
            return $cargo;
        }
    }
    return [];
}

function findFrais($type, $typep){
    $cargaisons = findAllData()["cargaison"];
    if ($type == "maritime"){
        if ($typep == "alimentaire")
            return $cargaisons["maritime"]["fraisTransport"][0];
        else if ($typep == "chimique")
            return $cargaisons["maritime"]["fraisTransport"][1];
        else
            return $cargaisons["maritime"]["fraisTransport"][2];
    }else if ($type == "routiere"){
        if ($typep == "alimentaire")
            return $cargaisons["routiere"]["fraisTransport"][0];
        else
            return $cargaisons["routiere"]["fraisTransport"][1];
    }else{
        if ($typep == "alimentaire")
            return $cargaisons["aerienne"]["fraisTransport"][0];
        else
            return $cargaisons["aerienne"]["fraisTransport"][1];
    }
}

function calculerMontantUnique($produit){
    $cargo = findCargaison($produit["cargaison"]);
    $frais = findFrais($cargo["typec"],$produit["typep"]);
    return ceil((($produit["poids"] / $frais["poids"]) * ($cargo["distance"]/ $frais["param"]) * $frais["tarif"])+ $frais["autreFrais"]);
}

function calculerMontantTotal($produits){
    $somme = 0;
    foreach ($produits as $produit){
        $somme += calculerMontantUnique($produit);
    }
    return $somme;
}

function generatePDF($sender, $recipient, $products, $cargaison, $uniqueCode, $emails) {
    $pdf = new TCPDF();

    // Set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Votre Nom');
    $pdf->SetTitle('Informations sur le reçu');
    $pdf->SetSubject('Détails du Colis');

    // Add a page
    $pdf->AddPage();

    // Title
    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->Cell(0, 15, 'Informations du Colis', 0, 1, 'C');
    $pdf->Ln(10);

    // Sender and recipient information
    $pdf->SetFont('helvetica', '', 12);

    // Sender (left side)
    $pdf->SetX(15);
    $pdf->MultiCell(90, 10, 'Expéditeur:' . "\n" . $sender, 0, 'L');

    // Recipient (right side)
    $pdf->SetXY(105, 45); // Adjust position for right side
    $pdf->MultiCell(90, 10, 'Destinataire:' . "\n" . $recipient, 0, 'R');
    $pdf->Ln(20);

    $pdf->Ln(10);
    $pdf->SetFont('helvetica', '', 12);
    $pdf->Cell(0, 10, 'Cargaison: ' . $cargaison["lieuDepart"]."-". $cargaison["lieuArrive"], 0, 1, 'C');

    // Table of products
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
        $pdf->Cell(40, 10, calculerMontantUnique($product), 1);
        $pdf->Ln();
    }

    // Total amount
    $pdf->Ln(10);
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->Cell(0, 10, 'Montant total: ' . calculerMontantTotal($products) . ' Fcfa', 0, 1, 'R');

    // Shipment information and unique code at the bottom
    $pdf->Ln(10);
    $pdf->SetFont('helvetica', 'I', 12);
    $pdf->Cell(0, 10, 'Code unique du Colis: ' . $uniqueCode, 0, 1, 'C');

    // Generate the PDF
    $pdfString = $pdf->Output('information_coli.pdf', 'S');

    // Send the PDF via email
    foreach ($emails as $email) {
        sendSingleEmail($pdfString, $email);
    }
}

function sendSMSWithTwilio($message, $receiver){
    $sid = "AC72176a0f4ef9ef1f7c5123604cec1c5d";
    $token = "cef68799eb282b06811c85e4f019ab65";
    $client = new Client($sid, $token);

    foreach ($receiver as $key => $value){
        $client->messages->create(
            "+221".$value,
            [
                'from' => '+13346860878',
                'body' => $message
            ]
        );
    }

}

function sendSms($apiKey, $from, $to, $message) {
        $url = "https://w1qx2q.api.infobip.com/sms/2/text/advanced";

        $postData = [
            "messages" => [
                [
                    "from" => $from,
                    "destinations" => [
                        ["to" => $to]
                    ],
                    "text" => $message
                ]
            ]
        ];

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: App ' . $apiKey,
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode != 200) {
            // Handle error
            return "HTTP Error: " . $httpCode . " Response: " . $response;
        }

        curl_close($ch);

        return json_decode($response, true);
    }

function sendSingleEmail($pdf,$email){
    $result = sendMailToApprenant($pdf, $email, 'codev13.sendmail@gmail.com');
    return $result;
}

function sendMailToApprenant($pdf, $email_to, $email_from){

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
    $mail->setFrom($email_from, 'GP du Monde');
    $mail->addAddress($email_to, 'Me');
    $mail->Subject = 'Information du Coli';
    $mail->addStringAttachment($pdf, "information_coli.pdf");

    // // Set HTML
    $mail->isHTML(TRUE);
    $mail->Body = "Veuillez trouver ci-joint le PDF avec les informations du colis.";

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

/** Création des Controles **/

if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $coli = json_decode(file_get_contents("php://input"), true);
    if ($coli["formulaires"] == "ajout_produits"){
        $message = "Votre coli a été ajouté et Le code du coli est : ".$coli['code'];
        $apiKey = 'a014fefbed4d32e2e92913edb18951df-14f03bc0-5c29-46bc-9131-839f9a021861';
        $from = 'GpDuMonde';
        $expediteur = "+221".$coli['expediteur']['telephone'];
        $destinataire = "+221".$coli['destinataire']['telephone'];
//        sendSMSWithTwilio($message,$numbers);

        sendSms($apiKey, $from, $expediteur, $message);
        sendSms($apiKey, $from, $destinataire, $message);

        $cargaison = findCargaison($coli["produits"][0]["cargaison"]);

        $emails = ["email" => $coli['expediteur']['email'],"email" => $coli['destinataire']['email'] ];
        $sender = $coli['expediteur']['prenom']."\n".$coli['expediteur']['nom']."\n".$coli['expediteur']['email']."\n".$coli['expediteur']['pays'];
        $recipient =  $coli['destinataire']['prenom']."\n".$coli['destinataire']['nom']."\n".$coli['destinataire']['email']."\n".$coli['destinataire']['pays'];

        generatePDF($sender, $recipient, $coli["produits"], $cargaison, $coli["code"], $emails);
        echo json_encode(["result" => "success"]);

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
    }else if ($coli["formulaires"] == "arrive_produit"){
        $apiKey = 'a014fefbed4d32e2e92913edb18951df-14f03bc0-5c29-46bc-9131-839f9a021861';
        $from = 'GpDuMonde';
        $to = '+221767819339';
        $message = 'Votre Coli est arriver';
        $expediteur = "+221".$coli['expediteur']['telephone'];
        $destinataire = "+221".$coli['destinataire']['telephone'];

        $response = sendSms($apiKey, $from, $expediteur, $message);
        $response = sendSms($apiKey, $from, $destinataire, $message);

        if ($response){
            echo json_encode(["result" => "success"]);
        }else{
            echo json_encode(["result" => "error"]);
        }

    }else if ($coli["formulaires"] == "archiver_produit"){

        $apiKey = 'a014fefbed4d32e2e92913edb18951df-14f03bc0-5c29-46bc-9131-839f9a021861';
        $from = 'GpDuMonde';
        $to = '+221767819339'; // Numéro de téléphone du destinataire
        $message = 'Votre Coli a été archiver';
        $expediteur = "+221".$coli['expediteur']['telephone'];
        $destinataire = "+221".$coli['destinataire']['telephone'];

        $response = sendSms($apiKey, $from, $expediteur, $message);
        $response = sendSms($apiKey, $from, $destinataire, $message);

        if ($response){
            echo json_encode(["result" => "success"]);
        }else{
            echo json_encode(["result" => "error"]);
        }

    }else if ($coli["formulaires"] == "perdu_produit"){
        $apiKey = 'a014fefbed4d32e2e92913edb18951df-14f03bc0-5c29-46bc-9131-839f9a021861';
        $from = 'GpDuMonde';
        $to = '+221767819339'; // Numéro de téléphone du destinataire
        $message = 'Votre Coli a est perdu';
        $expediteur = "+221".$coli['expediteur']['telephone'];
        $destinataire = "+221".$coli['destinataire']['telephone'];

        $response = sendSms($apiKey, $from, $expediteur, $message);
        $response = sendSms($apiKey, $from, $destinataire, $message);

        if ($response){
            echo json_encode(["result" => "success"]);
        }else{
            echo json_encode(["result" => "error"]);
        }
    }
}