</main>
</div>

<!-- Modal -->
<div id="modal" class=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-7xl w-full">
        <!-- Modal header -->
        <div class="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
            <h3 class="text-lg">Liste Cargaison</h3>
            <button id="closeModalBtn" class="text-white">✖</button>
        </div>

        <!-- Modal body -->
        <div id="modalCargaisonPossible" class="p-4 flex flex-wrap gap-5">
            <!-- Cargaison Card -->

        </div>

        <!-- Modal footer -->
        <div class="flex flex-wrap justify-between bg-gray-100 px-4 py-2 flex justify-end">
            <span class="font-bold text-emerald-700" id="showFraisaPayer">Frais Total à Payer: <i id="showMontantAPayer"></i></span>
            <!--            <button id="closeModalFooterBtn" class="px-4 py-2 bg-blue-900 font-bold text-white rounded">Ajouter à la cargaison</button>-->
            <button id="btnAddToCargaison" class="px-4 py-2 bg-blue-900 font-bold text-white rounded">Ajouter à la cargaison</button>
        </div>
    </div>
</div>

<!--<script src="--><?php //=ASSETS_PATH?><!--/js/index.js" type="module"></script>-->
<script src="<?=ASSETS_PATH?>/js/<?php echo $page; ?>.js" type="module"></script>
</body>
</html>