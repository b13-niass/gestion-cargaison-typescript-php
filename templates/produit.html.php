<div class="mx-2 w-[100%] justify-center flex gap-y-6 lg:flex-wrap md:flex-wrap sm:flex-wrap sm2:flex-wrap gap-x-5 py-5 px-5">
    <!--<button id="openModalBtn" class="px-4 py-2 bg-blue-500 text-white rounded">Open Modal</button>-->
    <div class="flex flex-wrap w-[100%] max-w-6xl bg-white py-5 px-5">
        <h2 class="text-2xl w-[100%] text-center">Rechercher un coli par son code</h2>
        <div class="content w-[100%]">
                <input type="text" id="libellep" class="form-control1 rounded-2xl mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>
    </div>

    <div class="w-[100%] max-w-6xl bg-white rounded-lg shadow-md">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full">
            <div class="mb-4">
                <h1 class="text-lg flex font-bold text-gray-800">
                    <span class="w-4/6" >Coli - Destinataire: <i class="text-gray-400" id="sender-name"></i> & Expéditeur: <i id="receiver-name" class="text-gray-400"></i></span> <span > La Cargaion <i id="coli-cargaison" class="text-gray-400"></i></span>
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

<dialog id="my_modal_1" class="modal">
    <div class="modal-box">
        <p class="py-4">Voulez-vous supprimer ce produit</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn hover:border-2 hover:border-gray-200  btn-error btn-delete-modal">Supprimer</button>
                <button class="btn hover:border-2 hover:border-gray-200 btn-close-modal">Annuler</button>
            </form>
        </div>
    </div>
</dialog>