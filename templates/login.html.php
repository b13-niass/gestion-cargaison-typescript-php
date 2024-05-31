<?php
//    dd($_SERVER);
//    if (file_exists("./assets/css/styles.css")){
//    dd(1);
//    }else{
//        dd(2);
//    }
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="<?=ASSETS_PATH?>/css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .custom-file-input {
            display: none;
        }
        .custom-file-label {
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: background-color 0.3s, box-shadow 0.3s;
        }

    </style>
    <!--    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>-->
</head>
<body class="flex items-center justify-center h-screen bg-gray-100">

<div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
    <h1 class="text-[1.2rem] font-bold mb-6 text-center">Connexion à GP-MONDE</h1>
    <div class="flex-shrink-0 bg-gray-800 w-20 mx-auto">
        <a href="#" class="hover:cursor-pointer" data-page="cargaisons"> <img src="/<?=ASSETS_PATH?>/img/GPduMonde1.png" class="w-[90px]" alt="" srcset=""> </a>
    </div>
    <form action="#" method="POST">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required class="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full">
        </div>
        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" name="password" required class="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full">
        </div>
        <button type="submit" class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">Vous n'avez pas de compte? <a href="#" class="text-blue-500 hover:text-blue-600">Inscrivez-vous</a></p>
</div>

<script src="<?=ASSETS_PATH?>/js/login.js" type="module"></script>
</body>
</html>