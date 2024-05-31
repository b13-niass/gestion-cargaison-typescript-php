<div class="mx-2 w-[100%] justify-center flex gap-y-6 lg:flex-wrap md:flex-wrap sm:flex-wrap sm2:flex-wrap gap-x-5 py-5 px-5">
    <!--<button id="openModalBtn" class="px-4 py-2 bg-blue-500 text-white rounded">Open Modal</button>-->
    <div class="flex flex-wrap w-[100%] max-w-6xl bg-white py-5 px-5">
        <h2 class="text-2xl w-[100%] text-center">Rechercher un coli</h2>
        <div class="content w-[100%]">
                <input type="text" id="libellep" class="form-control1 rounded-2xl mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>
    </div>

    <div class="w-[100%] max-w-6xl bg-white rounded-lg shadow-md">
        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="w-24 px-4 py-2 text-left text-gray-600 font-semibold">Image</th>
                    <th class="px-4 py-2 text-left text-gray-600 font-semibold">Libellé</th>
                    <th class="px-4 py-2 text-left text-gray-600 font-semibold">Poids</th>
                    <th class="px-4 py-2 text-left text-gray-600 font-semibold">Types</th>
                    <th class="px-4 py-2 text-left text-gray-600 font-semibold">Action</th>
                </tr>
                </thead>
                <tbody id="listeProduitContent">
                </tbody>
            </table>
        </div>

        <!-- Footer (Pagination) -->
        <div id="footerPaginationProduit" class="p-4 border-t border-gray-200 flex justify-between items-center">

        </div>
    </div>

</div>