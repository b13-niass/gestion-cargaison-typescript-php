<!--<script src="https://openlayers.org/en/v6.13.0/build/ol.js"></script>-->
<!--<link rel="stylesheet" href="https://openlayers.org/en/v6.13.0/css/ol.css">-->

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

<div class="mx-2 w-[100%] flex gap-y-6 lg:flex-wrap md:flex-wrap sm:flex-wrap sm2:flex-wrap py-6 sm:px-6 lg:px-8 gap-x-5">

    <div class="flex-auto lg:w-[100%] md:w-[35%] sm:w-[100%] border-amber-950 bg-white p-8 rounded-lg shadow-lg">
        <form method="POST" id="formAddCargo" class="w-[100%] gap-x-6 gap-y-3 flex flex-row flex-wrap items-center justify-between" id="AddCargaisonForm">
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

            <div id="mapContainer" class="content w-[30%]">
                <div class="border border-gray-300 p-2 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 cursor-pointer hover:bg-blue-50">
                    <div class="shrink-0">
                        <svg class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C11.1716 11.5 10.5 10.8284 10.5 10C10.5 9.17157 11.1716 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5Z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div>
                        <div class="text-[1rem] font-medium text-black">Ouvrir la carte</div>
                        <p class="text-[12px] text-gray-500">Cliquez ici pour sélectionner des points sur la carte</p>
                    </div>
                </div>
                <span class="map-error-message error-message">Le trajet est requis</span>
            </div>

            <div class="relative content w-[30%]">
                <label for="dateDepart" class="block text-sm font-medium text-gray-700">Date Départ</label>
                <input type="date" id="dateDepart" name="dateDepart" class="date-depart-add text-gray-900 form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>
            </div>
            <div class="content w-[30%]">
                <label for="volume" class="block text-sm font-medium text-gray-700">Type de volume</label>
                <select id="volume" name="volume" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionner Type de volume</option>
                    <option value="poids">Poids</option>
                    <option value="nbrProduit">Nbr de Produit</option>
                </select>
                <span class="error-message">error</span>
            </div>
            <div id="volumeContent" class="content w-[30%]">

            </div>
            <div class="invisible content w-[30%]">

            </div>

            <div id="result-table" class="invisible w-[100%]">
                <h1>Info Supplémentaire</h1>
                <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                    <tr>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Lieu Départ</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Lieu Arrivé</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date Arrivée</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="distance" class="px-6 py-4 border-b border-gray-200">sss</td>
                        <td id="lieuDepart" class="px-6 py-4 border-b border-gray-200">sss</td>
                        <td id="lieuArrive" class="px-6 py-4 border-b border-gray-200">sss</td>
                        <td id="duree" class="px-6 py-4 border-b border-gray-200">sss</td>
                        <td id="dateArrive" class="px-6 py-4 border-b border-gray-200">date</td>
                    </tr>
                    </tbody>
                </table>
            </div>

<!--            <div class="h-[50px] mb-2 w-[30%]">-->
<!--                <img src="https://placehold.co/50" id="image-cargaison" alt="" srcset="">-->
<!--            </div>-->
            <!-- Button -->
            <div class="text-center flex pt-5 justify-start w-full">
                <button id="btnEnregistrer" class="w-1/3 px-4 py-2 bg-gray-800 text-white font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Enregistrer</button>
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

<dialog id="my-map-dialog" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div id="show-my-map" class=" modal-middle w-[98%] h-[500px]">

        </div>
        <div class="modal-action">
                <button id="clear-map" class="btn btn-error">Effacer</button>
                <button class="btn-close-map btn btn-neutral">Valider</button>
        </div>
    </div>
</dialog>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<script>
    var map = L.map('show-my-map').setView([14.743531, -17.511781], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var markers = [];
    var polyline = null;

    function getDistance(latlng1, latlng2) {
        return latlng1.distanceTo(latlng2);
    }

    function fetchCityName(latlng) {
        return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
            .then(response => response.json())
            .then(data => data.address.city || data.address.town || data.address.village || 'Unknown location');
    }

    map.on('click', async function(e) {
        if (markers.length < 2) {
            var marker = L.marker(e.latlng).addTo(map);
            markers.push(marker);

            if (markers.length === 2) {
                var latlng1 = markers[0].getLatLng();
                var latlng2 = markers[1].getLatLng();

                polyline = L.polyline([latlng1, latlng2], { color: 'blue' }).addTo(map);

                var distance = getDistance(latlng1, latlng2);
                var duration = distance / 5000 * 60; // Estimation de la durée, 5 km/h

                var cityName1 = await fetchCityName(latlng1);
                var cityName2 = await fetchCityName(latlng2);
                var infoSupp = {
                    distance: distance??0,
                    duration: duration??0,
                    cityName1: cityName1??"",
                    cityName2: cityName2??"",
                }
                if (localStorage.key("infoSupp")){
                    localStorage.removeItem("infoSupp");
                }
                localStorage.setItem("infoSupp", JSON.stringify(infoSupp));

                alert(`Distance: ${distance.toFixed(2)} meters\nDuration: ${duration.toFixed(2)} minutes\nStart: ${cityName1}\nEnd: ${cityName2}`);
            }
        }
    });

    document.getElementById('clear-map').addEventListener('click', function() {
        markers.forEach(function(marker) {
            map.removeLayer(marker);
        });
        markers = [];

        if (polyline) {
            map.removeLayer(polyline);
            polyline = null;
        }
        if (localStorage.key("infoSupp")){
            localStorage.removeItem("infoSupp");
        }
    });
</script>