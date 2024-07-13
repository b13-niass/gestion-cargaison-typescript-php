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
    <script src="<?=ASSETS_PATH?>/js/ctrlRedirectLogin.js"></script>

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
<body class="flex h-screen bg-gray-100">
<div class="w-[100%] content-start flex gap-y-6 lg:flex-wrap md:flex-wrap sm:flex-wrap sm2:flex-wrap gap-x-5 py-2 px-2">
    <!--<button id="openModalBtn" class="px-4 py-2 bg-blue-500 text-white rounded">Open Modal</button>-->
    <div class="flex flex-wrap w-[100%] rounded-lg content-start max-w-6xl bg-gray-800 py-5 px-5">
        <h2 class="text-2xl w-[100%] text-white text-center">RECHERCHER MON COLI</h2>
        <div class="content w-[100%]">
            <input type="text" id="libellep" placeholder="Saisissez votre code ici" class="form-control1 rounded-2xl mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="error-message">error</span>
        </div>
    </div>

    <div class="w-[100%] bg-gray-800 max-w-6xl rounded-lg shadow-md">
        <div class="shadow-lg text-white rounded-lg p-8 w-full">
            <div class="mb-4">
                <h1 class="text-lg flex font-bold text-white">
                    <span class="w-4/6">Coli - Destinataire: <i class="text-gray-400" id="sender-name"></i> & Expéditeur: <i id="receiver-name" class="text-gray-400"></i></span> <span > La Cargaion <i id="coli-cargaison" class="text-gray-400"></i></span>
                </h1>
            </div>
            <div id="product-list">

            </div>
        </div>

        <!-- Footer (Pagination) -->
        <div id="footerPaginationProduit" class="p-4 border-t border-gray-200 flex justify-between items-center">

        </div>
    </div>

</div>

<div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
    <h1 class="text-[1.2rem] font-bold mb-6 text-center">Connexion à GP-MONDE</h1>
    <div class="flex-shrink-0 bg-gray-800 w-20 mx-auto">
        <a href="#" class="hover:cursor-pointer" data-page="cargaisons"> <img src="/<?=ASSETS_PATH?>/img/GPduMonde1.png" class="w-[90px]" alt="" srcset=""> </a>
    </div>
    <form id="formLoginGestionnaire">
        <div class="content mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full">
            <span class="error-message">error</span>
        </div>
        <div class="content mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full">
            <span class="error-message">error</span>
        </div>
        <button type="submit" class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-800">Se connecter</button>
    </form>
</div>

<div id="notification" class="hidden fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between">
    <span>Erreur: Le mot de passe ou le login est incorrect!</span>
    <button id="close-btn" class="ml-4 text-white hover:text-gray-200">&times;</button>
</div>
<script src="<?=ASSETS_PATH?>/js/login.js" type="module"></script>


</body>
</html>