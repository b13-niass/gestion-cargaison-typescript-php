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
<?php     if ($page != 'cargaison' && $page != 'produit'){ ?>
<!--        <script src="--><?php //=ASSETS_PATH?><!--/js/index.js"></script>-->
    <header id="header-bar" class="bg-white shadow">
        <div class="px-4 py-6 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-5 gap-6">
                <div class="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-lg shadow flex items-center h-[50px]">
                    <div class="text-gray-800 text-3xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            <path fill-rule="evenodd" d="M4 12a8 8 0 0116 0H4z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p id="volumeRestant" class="text-gray-900"></p>
                    </div>
                </div>
                <div class="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-lg shadow flex items-center h-[50px]">
                    <div class="text-gray-800 text-3xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-11a1 1 0 10-2 0 1 1 0 002 0zm-4 0a1 1 0 10-2 0 1 1 0 002 0zm1 4a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p id="montantTotal" class="text-gray-900"></p>
                    </div>
                </div>
                <div class="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-lg shadow flex items-center h-[50px]">
                    <div class="text-gray-800 text-3xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 3a3 3 0 013-3h4a3 3 0 013 3v2h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5V3z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M4 8h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm2 6a1 1 0 102 0 1 1 0 00-2 0zm6 0a1 1 0 102 0 1 1 0 00-2 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p id="etatVolume" class="text-gray-900"></p>
                    </div>
                </div>
                <div class="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-lg shadow flex items-center h-[50px]">
                    <div class="text-gray-800 text-3xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-11a1 1 0 10-2 0 1 1 0 002 0zm-4 0a1 1 0 10-2 0 1 1 0 002 0zm1 4a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p id="etatGlobal" class="text-gray-900"></p>
                    </div>
                </div>
                <div class="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-lg shadow flex items-center h-[50px]">
                    <div class="text-gray-800 text-3xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 3.172a4 4 0 015.656 0L10 4.343l1.172-1.171a4 4 0 115.656 5.656L10 16.343 3.172 9.515a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p id="etatAvancement" class="text-gray-900"></p>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <?php
        }
    ?>
    <main id="main-content">

