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
<body class="h-full">

<div class="min-h-full">

</div>

<script src="<?=ASSETS_PATH?>/js/login.js" type="module"></script>
</body>
</html>