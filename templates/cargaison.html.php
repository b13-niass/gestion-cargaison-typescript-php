<div class="mx-2 w-[100%] flex gap-y-6 lg:flex-wrap md:flex-wrap sm:flex-wrap sm2:flex-wrap py-6 sm:px-6 lg:px-8 gap-x-5">

    <div class="flex-auto lg:w-[100%] md:w-[35%] sm:w-[100%] border-amber-950 bg-white p-8 rounded-lg shadow-lg">
        <form class="w-[100%] gap-x-6 gap-y-3 flex flex-row flex-wrap items-center justify-evenly" id="AddCargaisonForm">
            <div class="content w-[30%]">
                <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
                <select id="typec" name="typec" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionner un type</option>
                    <option value="routiere">Routiere</option>
                    <option value="maritime">Maritime</option>
                    <option value="aerienne">Aerienne</option>
                </select>
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="destination" class="block text-sm font-medium text-gray-700">Destination</label>
                <input type="text" id="destination" name="destination" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="dateDepart" class="block text-sm font-medium text-gray-700">Date Départ</label>
                <input type="text" id="dateDepart" name="dateDepart" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="dateArrive" class="block text-sm font-medium text-gray-700">Date Arrivé</label>
                <input type="text" disabled id="dateArrive" name="dateArrive" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="distance" class="block text-sm font-medium text-gray-700">Distance</label>
                <input type="text" id="distance" name="distance" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="distance" class="block text-sm font-medium text-gray-700">Distance</label>
                <input type="text" id="distance" name="distance" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <!-- Image -->
            <div class="content w-[30%]">
                <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                <input type="text" id="image" class="form-control image-cargaison-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="content w-[30%]">
                <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                <input type="text" id="image" class="form-control image-cargaison-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>

            <div class="h-[50px] mb-2 w-[30%]">
                <img src="https://placehold.co/50" id="image-cargaison" alt="" srcset="">
            </div>
            <!-- Button -->
            <div class="text-center flex pt-5 justify-start w-full">
                <button class="w-1/3 px-4 py-2 bg-gray-800 text-white font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Enregistrer</button>
            </div>
        </form>
    </div>

    <div class="w-full bg-white rounded-lg shadow-md">
            <!-- Header -->
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-2xl font-semibold text-gray-700">Les Produits de la cargaison</h2>
                <div class="my-7 ring ring-2 ring-gray-200 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="numero" class="block text-gray-700">Code</label>
                        <input type="text" id="numero" name="numero" placeholder="Code" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="lieuDepart" class="block text-gray-700">Lieu de départ</label>
                        <input type="text" id="lieuDepart" name="lieuDepart" placeholder="Lieu de départ" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="lieuArrive" class="block text-gray-700">Lieu d'arrivée</label>
                        <input type="text" id="lieuArrive" name="lieuArrive" placeholder="Lieu d'arrivée" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="dateDepart" class="block text-gray-700">Date de départ</label>
                        <input type="date" id="dateDepart" name="dateDepart" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="dateArrive" class="block text-gray-700">Date d'arrivée</label>
                        <input type="date" id="dateArrive" name="dateArrive" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="typec" class="block text-gray-700">Type</label>
                        <select id="typec" name="typec" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Sélectionner un type</option>
                            <option value="maritime">Maritime</option>
                            <option value="aerienne">Aerienne</option>
                            <option value="routiere">Routiere</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border-collapse border border-gray-400">
                    <thead class="bg-gray-100 border-b">
                    <tr>
                        <th class="border border-gray-400 w-24 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Image</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Type</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Volumes Max</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Date Départ-Arrivé</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Lieu Départ-Arrivé</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Distance</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Durée</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">État Avancement</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">État Global</th>
                        <th class="border border-gray-400 px-4 py-2 text-left text-gray-600 text-[0.8rem]">Actions</th>
                    </tr>
                    </thead>
                    <tbody id="listeCargaisonContent">
                    </tbody>
                </table>
            </div>

            <!-- Footer (Pagination) -->
            <div id="paginationBar" class="p-4 border-t border-gray-200 flex justify-between items-center">

            </div>

        </div>

</div>