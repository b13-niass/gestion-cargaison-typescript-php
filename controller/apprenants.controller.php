<?php
    require_once "../model/$controller.model.php";
    require_once "../config/SimpleXLSXGen.php";
    // addApprenantToBase('barhamadieng62@gmail.com');
// dd(sendMailToApprenant('../template/email-inlined.html.php', 'codev13.sendmail@gmail.com', 'barhamadieng66@gmail.com'));

if($uri_ == "app"){

    unset($_SESSION['filtre_apprenant']);
    unset($_SESSION['search_matricule']);
    $_SESSION['filtre_apprenant'] = null;
    $_SESSION['search_matricule'] = null;
    
    $promotion_active = $_SESSION['promotion_active'];
    $list_new_apprenant = findAllNewApprenant($promotion_active);
   
    $referentiels_promo = findAllReferentiel($promotion_active);


    if(!isset($_SESSION['per_page_app'])){
        $_SESSION['per_page_app'] = 10;
    }

    if(isset($_POST['per_page_app'])){
        $_SESSION['per_page_app'] = $_POST['per_page_app'];
    }

    $per_page = (integer) $_SESSION['per_page_app'];
    

    $apprenants = findAllApprenant($_SESSION['promotion_active']);

    // dd($list_new_apprenant);
    if(isset($_GET['page'])){
        $tab_uri = explode('/',$_GET['page']);
        if(isset($tab_uri[3])){
            $id_ref = $tab_uri[3];
            $apprenants =  findApprenantByRef([$id_ref], $_SESSION['promotion_active']);
        }
    }


    if(isset($_POST['filtre_ref'])){
        // dd();
        $apprenants =  findApprenantByRef($_POST['referentiels'], $_SESSION['promotion_active']);

    }

    $nbrPage = getNbrPage( $apprenants, $per_page);
    if($nbrPage == 0){
        $nbrPage = 1;
    }
    $current_page = getCurrentPage($nbrPage);

    $per_page_new = 10;
    $nbrPage_new = getNbrPage( $list_new_apprenant, $per_page);
    if($nbrPage_new == 0){
        $nbrPage_new = 1;
    }
    $current_page_new = 1;
    if(isset($_POST['first-paginate'])){
        $current_page_new = (int) $_POST['first-paginate'];
    }
    
    if(isset($_POST['previous-paginate'])){
        $current_page_new = (int) $_POST['previous-paginate'];
    }
    if(isset($_POST['next-paginate'])){
        $current_page_new = (int) $_POST['next-paginate'];
    } 
    if(isset($_POST['last-paginate'])){

        $current_page_new = (int) $_POST['last-paginate'];

    }

    if(!isset($_SESSION['filtre_apprenant']) && !isset($_POST['filtre_apprenant'])){
        unset($_SESSION['filtre_apprenant']);
    }

    if(!isset($_SESSION['filtre_apprenant']) && isset($_POST['filtre_apprenant']) && empty($_POST['filtre_apprenant'])){
        unset($_SESSION['filtre_apprenant']);
    }
    
    if(!isset($_SESSION['filtre_apprenant']) && isset($_POST['filtre_apprenant']) && !empty($_POST['filtre_apprenant'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_POST['filtre_apprenant']);
        $_SESSION['filtre_apprenant'] = $_POST['filtre_apprenant'];
    }
    
    if(isset($_SESSION['filtre_apprenant']) && isset($_POST['filtre_apprenant']) && !empty($_POST['filtre_apprenant'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_POST['filtre_apprenant']);
        $_SESSION['filtre_apprenant'] = $_POST['filtre_apprenant'];
    }
    
    if(isset($_SESSION['filtre_apprenant']) && !isset($_POST['filtre_apprenant'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_POST['filtre_apprenant']);
    }
    

    if(!isset($_SESSION['search_matricule']) && !isset($_POST['search_matricule'])){
        unset($_SESSION['search_matricule']);
    }

    if(!isset($_SESSION['search_matricule']) && isset($_POST['search_matricule']) && empty($_POST['search_matricule'])){
        unset($_SESSION['search_matricule']);
    }

    if(!isset($_SESSION['search_matricule']) && isset($_POST['search_matricule']) && !empty($_POST['search_matricule'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_POST['search_matricule']);
        $_SESSION['search_matricule'] = $_POST['search_matricule'];
    }

    if(isset($_SESSION['search_matricule']) && isset($_POST['search_matricule']) && !empty($_POST['search_matricule'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_POST['search_matricule']);
        $_SESSION['search_matricule'] = $_POST['search_matricule'];
    }

    if(isset($_SESSION['search_matricule']) && !isset($_POST['search_matricule'])){
        $apprenants = findAllApprenantFiltre($apprenants, $_SESSION['search_matricule']);
    }

    if(isset($_POST['exemple-file'])){
        $file_name = 'fichier_exemple_'.$promotion_active;

        $header = [['Nom','Prenom','Email','Date de Naissance','Genre', 'Telephone', 'Referentiel']];
        $xlsx = Shuchkin\SimpleXLSXGen::fromArray( $header );
        // $xlsx->saveAs("$file_name.xlsx"); 
        $xlsx->downloadAs("$file_name.xlsx");
    }

    if(isset($_POST['resend-mail'])){
        $email = $_POST['email'];
        $resultSingleMail = sendSingleEmail($email);
        if($resultSingleMail){
            // dd("envoyé");
            echo "<script>alert('Envoyé');</script>";
        }else{
            // dd("error envoi");
            echo "<script>alert('Erreur Envoi');</script>";
        }
    }

    $list_new_apprenant  = listPaginate($per_page_new, $list_new_apprenant , $current_page_new);

    if(count($apprenants) == 0){
        $apprenantsPaginate = [];
    }else{
        $apprenantsPaginate = listPaginate($per_page, $apprenants,$current_page);
    }

    if (isset($_POST['details_promo']) && isset($_POST['idPromotion'])){
        if(!empty($_POST['idPromotion'])){
            $_SESSION['idPromotion'] = (integer) $_POST['idPromotion'];
        }
    }

}
?>