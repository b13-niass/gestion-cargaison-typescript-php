<?php
//dd($_SERVER);
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="/<?=ASSETS_PATH?>/css/styles.css">
<!--    <script src="https://cdn.tailwindcss.com"></script>-->
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
    <style>
        .step-line {
            height: 2px;
            width: 100%;
            background-color: #d1d5db; /* Tailwind's gray-300 */
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
        }
        .active-line {
            background-color: #3b82f6; /* Tailwind's blue-500 */
        }
    </style>
</head>
<body class="h-full">

<div class="min-h-full">
    <nav class="bg-gray-800">
        <div class="mx-auto flex justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <a href="#" class="hover:cursor-pointer" data-page="cargaisons"> <img src="/<?=ASSETS_PATH?>/img/GPduMonde1.png" class="w-[90px]" alt="" srcset=""> </a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <a href="/cargo" data-page="cargaisons" class="hover:cursor-pointer <?= $page == 'cargaison' ? 'bg-gray-900 text-white' :'text-gray-300 hover:bg-gray-700 hover:text-white' ?>  rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Cargaison</a>
                            <a href="/prod" data-page="produits" class="hover:cursor-pointer <?= $page == 'produit' ? 'bg-gray-900 text-white' :'text-gray-300 hover:bg-gray-700 hover:text-white' ?>  rounded-md px-3 py-2 text-sm font-medium">Rechercher un coli</a>
                        </div>
                    </div>
                </div>

                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <!-- Menu open: "hidden", Menu closed: "block" -->
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <!-- Menu open: "block", Menu closed: "hidden" -->
                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="mt-2 btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0" class="mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-800 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile (Admin)
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="md:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="./index.html" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Cargaison</a>
                <a href="./produits.html" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Produits</a>
            </div>
        </div>
    </nav>

    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 id="head-text" class="text-3xl font-bold tracking-tight text-gray-900">Cargaison</h1>
        </div>
    </header>
    <main id="main-content">

