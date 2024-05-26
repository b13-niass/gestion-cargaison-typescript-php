<?php

    // require_once dirname(__DIR__)."/orm/file.csv.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    require_once "../model/referentiels.model.php";
    require_once "../phpmailer/Exception.php";
    require_once "../phpmailer/PHPMailer.php";
    require_once "../phpmailer/SMTP.php";

    require_once "../model/utilisateurs.model.php";

    function checkDuplicates($apprenants, $apprenants_new) {
        $duplicates = array();
        foreach ($apprenants as $app) {
            foreach ($apprenants_new as $app_n) {
                if ($app['nom'] == $app_n['nom'] && $app['prenom'] == $app_n['prenom'] && $app['email'] == $app_n['email']) {
                    $duplicates[] = $app;
                }
            }
        }
        return $duplicates;
    }

    function findAllApprenant($promotion){
        $app_array_keys = [
            'image',
            'nom',
            'prenom',
            'email',
            'genre',
            'telephone',
            'promo',
            'referentiel',
        ];

        $apprenants = read_data_files('apprenants',  $app_array_keys);

        $apprenants = array_filter($apprenants, function($app) use($promotion){
            return (int) $app['promo'] == (int)$promotion;
        });

        $apprenants = array_values($apprenants);

        return $apprenants;
    }

    function findAllNewApprenant($promotion){
        $app_array_keys = [
            'image',
            'nom',
            'prenom',
            'email',
            'datenaiss',
            'genre',
            'tel',
            'referentiel',
            'promo',
            'login'
        ];

        $apprenants = read_data_files('new_apprenants',  $app_array_keys);

        $apprenants = array_filter($apprenants, function($app) use($promotion){
            return (int) $app['promo'] == (int)$promotion;
        });

        $apprenants = array_values($apprenants);

        return $apprenants;
    }

    function findAllNewApprenantWithoutProm(){
        $app_array_keys = [
            'image',
            'nom',
            'prenom',
            'email',
            'datenaiss',
            'genre',
            'tel',
            'referentiel',
            'promo',
            'login'
        ];

        $apprenants = read_data_files('new_apprenants',  $app_array_keys);

        return $apprenants;
    }


    function addApprenantToBase($email){
        // $apprenants_new = findAllNewApprenant($promotion);
        $origine = $all_apprenants_new = findAllNewApprenantWithoutProm();
        $taille_init_all = count($all_apprenants_new);
        $apprenants = findAllApprenantWithoutPro();



        $all_apprenants_new = array_filter($all_apprenants_new, function($app)use($email){
            return $app['email'] != $email;
        });
        $all_apprenants_new = array_values($all_apprenants_new);
        if($taille_init_all > count($all_apprenants_new) ){
            $apprenant = array_filter($origine, function($app)use($email){
                return $app['email'] == $email;
            });
            $apprenant = array_values( $apprenant)[0];

            $apprenant = [
                'image' => $apprenant['image'],
                'nom' => $apprenant['nom'],
                'prenom' => $apprenant['prenom'],
                'email' => $apprenant['email'],
                'genre' => $apprenant['genre'],
                'tel' => $apprenant['tel'],
                'promo' => $apprenant['promo'],
                'referentiel' => $apprenant['referentiel'],
            ];
            array_push( $apprenants, $apprenant);
            // dd($apprenants);
            write_data_files("new_apprenants", $all_apprenants_new);
            write_data_files("apprenants", $apprenants);

        }
    }
    

    function findAllApprenantWithoutPro(){
        $app_array_keys = [
            'image',
            'nom',
            'prenom',
            'email',
            'genre',
            'telephone',
            'promo',
            'referentiel',
        ];

        $apprenants = read_data_files('apprenants',  $app_array_keys);

        $apprenants = array_values($apprenants);

        return $apprenants;
    }

    function findApprenantByRef($referentiels, $promotion){
        $apprenants = findAllApprenant($promotion);
        
        $apprenants = array_filter($apprenants, function($app) use($referentiels){
            foreach($referentiels as $ref){
                if((int)$ref == (int)$app['referentiel']){
                    return true;
                }
            }
        });
        $apprenants = array_values($apprenants);
        return $apprenants;
    }
    

    function findAllApprenantFiltre($apprenants, $search = null){
        $apprenantsFilter = [];
       
        if($search != null){
                $apprenantsFilter = array_filter($apprenants, function($value) use($search){
                    return $value['nom'] === $search || $value['prenom'] === $search 
                    || $value['email'] === $search || $value['telephone'] === $search; 
                });
                
                $apprenantsFilter = array_values($apprenantsFilter);
    
        }

        $apprenantsFilter = array_values($apprenantsFilter);
        return $apprenantsFilter;
        
    }

    function addApprenantByFile($files){
        $apprenants_all = findAllApprenantWithoutPro();
        $errors_doublon_new_app = [];
        $errors_doublon_all_app = [];
        $errors_send_mail = [];
        $new_without_doublon = [];
        $champ_requis = [];
        $apprenants_to_user = [];
        $users = findAllUserFile();

         $new_app_array_keys = [
            'nom',
            'prenom',
            'email',
            'datenaiss',
            'genre',
            'tel',
            'referentiel'
        ];
        $apprenants_new = read_data_files_app($files['file']['tmp_name'],  $new_app_array_keys);
        
        $apprenants_new = array_map(function($app){
            $img = ['image' => '/projet/public/icons/man.png'];
            $app = array_merge($img, $app);
            $app = array_merge($app, ['promo' => $_SESSION['promotion_active']]);
            $app = array_merge($app, ['login' => 0]);
            return $app;
         }, $apprenants_new);
        
        $apprenants_new = array_values($apprenants_new);
        // dd($apprenants_new);
        // recherche champs requis
        foreach($apprenants_new as $app_new){
            if(empty($app_new['nom']) || empty($app_new['prenom']) ||
             empty($app_new['email']) || empty($app_new['tel']) || empty($app_new['referentiel'])){
                $champ_requis[] = $app_new;
            }else{
                // dd($app_new);
                $new_without_doublon[] = $app_new;
            }
        }
        // dd($new_without_doublon);
        // les nouvelles données sans champs  manquant
        $apprenants_new = $new_without_doublon;
        $new_without_doublon = [];

        // recherche doublon dans le même tableau
        foreach($apprenants_new as $key => $app_new){
            $cpt = 0;
            foreach($apprenants_new as $key_in => $app_new_in){
                if($app_new['nom'] == $app_new_in['nom'] && $app_new['prenom']== $app_new_in['prenom'] 
                && $app_new['email']== $app_new_in['email'] && $key!= $key_in){
                    if(!in_array($app_new, $errors_doublon_new_app))
                    $errors_doublon_new_app[] = $app_new;

                    $cpt = 1;
                    break;
                }
            }
           
            if($cpt == 0){
                $new_without_doublon[] = $app_new;
            }
        }
        // les nouvelles données sans doublon
        $apprenants_new = $new_without_doublon;
        $new_without_doublon = [];

        // recherche doublon dans le tableau global
        foreach($apprenants_new as $key => $app_new){
        $cpt = 0;
        foreach($apprenants_all as $key_all => $app_all){
            if($app_new['nom'] == $app_all['nom'] && $app_new['prenom']== $app_all['prenom'] 
            && $app_new['email']== $app_all['email'] && $key!= $key_all){
                if(!in_array($app_new, $errors_doublon_all_app))
                $errors_doublon_all_app [] = $app_new;
                $cpt = 1;
                break;
            }
        }
        if($cpt == 0){
            $new_without_doublon[] = $app_new;
        }
        }

        $apprenants_new = $new_without_doublon;
      
        foreach($apprenants_new as $key => $app_new){
            $result = sendMailToApprenant('../template/email-inlined.html.php', 'codev13.sendmail@gmail.com', $app_new['email']);
            if(!$result){
               $errors_send_mail[] = $app_new;
            }
        }

        $result = write_data_files('new_apprenants',$apprenants_new);
        
        foreach($apprenants_new as $app){
            $password = password_hash('passer@1', PASSWORD_DEFAULT);

            $apprenants_to_user[]= ['email' =>  $app['email'], 'nom' => $app['nom'], 'prenom' => $app['prenom'],
           'password' => $password , 'role' => 2, 'promo' => 6, 'image' => 'photo2.png'];
        }

        $users = array_merge($users, $apprenants_to_user);
        
        addUsers($users);
        return [
            'err_doublon_new' => $errors_doublon_new_app,
            'err_doublon_all' => $errors_doublon_all_app,
            'err_requis' => $champ_requis,
            'err_send_mail' => $errors_send_mail,
            'importer' => $apprenants_new
        ];

    }
    function sendSingleEmail($email){
        $result = sendMailToApprenant('../template/email-inlined.html.php', 'codev13.sendmail@gmail.com', $email);
        return $result;
    }

    function sendMailToApprenant($html_template_link, $email_from, $email_to){

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
        $mail->Body = file_get_contents($html_template_link);
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

?>
