<style>
    input[type="text"]:focus{
       outline: none;
    }

</style>

<div role="tablist" class="tabs tabs-bordered px-6 py-4">

    <input type="radio" name="my_tabs_2" style="width: 200px!important;" role="tab" class="tab" aria-label="Détail Cargaison" checked />
    <div role="tabpanel" class="tab-content w-full max-w-6xl  bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
            <!-- Image Section -->
            <div class="md:w-1/3 p-4">
                <img src="https://via.placeholder.com/400" alt="Product Image" class="rounded-lg w-full object-cover">
            </div>

            <!-- Details Section -->
            <div class="relative md:w-2/3 p-4">
                <button id="changerEtatEnArchiver" class="hidden absolute p-2 right-2 top-2 h-[57px] text-white btn bg-gray-800 rounded-box">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 35px;height: 40px;" viewBox="0 0 512 512">
                        <path fill="#FFFFFF" d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"/>
                    </svg>
                </button>
                <span id="info-cargo-archiver" class="hidden absolute badge p-2 right-2 top-2 badge-info">La cargaison est archivée</span>
                <h3 id="headInfoCargo" class="text-xl font-semibold text-gray-800 mb-2"></h3>
                <p id="descInfoCargo" class="text-gray-600 mb-4"></p>

                <!-- Badges Section -->
                <div class="flex flex-wrap mb-4">
                    <span id="volumeInfoCargo" class="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2">Volume: </span>
<!--                    <span id="montantInfoCargo" class="inline-block bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full mr-2 mb-2">Montant Total :</span>-->
                </div>

                <!-- Dates Section -->
                <div class="flex mb-4">
                    <div class="mr-4">
                        <p class="text-gray-600">Date Départ:</p>
                        <p id="dateDepartInfoCargo" class="text-gray-800 font-semibold"></p>
                    </div>
                    <div>
                        <p class="text-gray-600">Date Arrivée:</p>
                        <p id="dateArriveInfoCargo" class="text-gray-800 font-semibold"></p>
                    </div>
                </div>

                <div class="pb-2">
                    <h1>Cliquer pour changer l'état global</h1>
                    <button id="changerEtatOuvert" class="w-[30%] bg-green-400 text-black font-semibold py-2 rounded-lg hover:bg-green-500 transition duration-300 opacity-50 cursor-not-allowed">Ouvrir</button>
                    <button id="changerEtatFermer" class="w-[30%] bg-red-400 text-black font-semibold py-2 rounded-lg hover:bg-red-500 transition duration-300 opacity-50 cursor-not-allowed">Fermer</button>
                </div>
                <div class="pt-2">
                    <h1>Cliquer pour changer l'état d'avancement</h1>
                    <button id="changerEtatEnAttente" class="w-[24%] bg-white text-gray-900 border-2 border-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 opacity-50 cursor-not-allowed">En ATTENTE</button>
                    <button id="changerEtatEnCours"  class="w-[24%] bg-white text-gray-900 border-2 border-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 opacity-50 cursor-not-allowed ">EN COURS</button>
                    <button id="changerEtatPerdue"  class="w-[24%] bg-white text-gray-900 border-2 border-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 opacity-50 cursor-not-allowed">PERDUE</button>
                    <button id="changerEtatTerminer"  class="w-[24%] bg-white text-gray-900 border-2 border-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 opacity-50 cursor-not-allowed">TERMINER</button>
                </div>
            </div>
        </div>
    </div >

    <input type="radio" name="my_tabs_2" style="width: 200px!important;" role="tab" class="tab" aria-label="Ajouter Coli" />
    <div role="tabpanel" class="tab-content">
        <form id="formColis" class="w-[100%] p-6 flex flex-col gap-y-5">
            <div class="collapse collapse-plus bg-white shadow-lg">
                <input type="radio" name="my-accordion-3"/>
                <div class="collapse-title text-xl font-medium p-3 text-black">
                   Information de l'expéditeur
                </div>
                <div class="collapse-content flex flex-row gap-x-3 items-center flex-wrap bg-white shadow-lg rounded-lg p-3 w-full">
                    <div class="content mb-4 flex-1">
                        <label for="telExpediteur" class="block text-gray-700 mb-2">Numéro de Téléphone:</label>
                        <input type="text" id="telExpediteur" name="telExpediteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="prenomExpediteur" class="block text-gray-700 mb-2">Prenom:</label>
                        <input type="text" id="prenomExpediteur" name="prenomExpediteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="nomExpediteur" class="block text-gray-700 mb-2">Nom:</label>
                        <input type="text" id="nomExpediteur" name="nomExpediteur" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="villeExpediteur" class="block text-gray-700 mb-2">Ville:</label>
                        <input type="text" id="villeExpediteur" name="villeExpediteur" class="w-full bg-white text-gray-800  px-3 py-2 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="paysExpediteur" class="block text-gray-700 mb-2">Pays:</label>
                        <input type="text" id="paysExpediteur" name="paysExpediteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="emailExpediteur" class="block text-gray-700 mb-2">Adresse E-mail:</label>
                        <input type="text" id="emailExpediteur" name="emailExpediteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                </div>
            </div>
            <div class="collapse collapse-plus bg-white shadow-lg">
                <input type="radio" name="my-accordion-3" />
                <div class="collapse-title text-xl font-medium p-3 text-black">
                    Information du récepteur
                </div>
                <div class="collapse-content flex flex-row gap-x-3 items-center flex-wrap bg-white shadow-lg rounded-lg p-3 w-full">
                    <div class="content mb-4 flex-1">
                        <label for="telRecepteur" class="block text-gray-700 mb-2">Numéro de Téléphone:</label>
                        <input type="text" id="telRecepteur" name="telRecepteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="prenomRecepteur" class="block text-gray-700 mb-2">Prenom:</label>
                        <input type="text" id="prenomRecepteur" name="prenomRecepteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="nomRecepteur" class="block text-gray-700 mb-2">Nom:</label>
                        <input type="text" id="nomRecepteur" name="nomRecepteur" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="villeRecepteur" class="block text-gray-700 mb-2">Ville:</label>
                        <input type="text" id="villeRecepteur" name="villeRecepteur" class="w-full bg-white text-gray-800  px-3 py-2 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>
                    <div class="content mb-4 flex-1">
                        <label for="paysRecepteur" class="block text-gray-700 mb-2">Pays:</label>
                        <input type="text" id="paysRecepteur" name="paysRecepteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>

                    <div class="content mb-4 flex-1">
                        <label for="emailRecepteur" class="block text-gray-700 mb-2">Adresse E-mail:</label>
                        <input type="text" id="emailRecepteur" name="emailRecepteur" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                        <span class="error-message text-[0.8rem]">error</span>
                    </div>

                </div>
            </div>

            <div class="collapse collapse-plus bg-white shadow-lg">
                <input type="radio" name="my-accordion-3"  checked="checked"/>
                <div class="collapse-title text-xl font-medium text-black">
                    Ajouter Produits
                </div>
                <div class="collapse-content w-[100%] flex flex-col gap-y-2">
                    <div class="flex flex-row gap-x-3 justify-between items-center flex-wrap bg-gray-800 shadow-lg rounded-lg p-2 w-full">
                        <button id="addligneproduit" type="button" class="text-2xl text-gray-800 hover:bg-gray-200 btn btn-circle bg-white">+</button>
                    </div>

                    <div id="content-lignproduit" class="flex flex-row gap-x-3 gap-y-2 items-center flex-wrap bg-white shadow-lg rounded-lg p-1 w-full">
                        <div class="relative w-full p-3 bg-gray-100 rounded-lg flex gap-x-3 flex-wrap flex-row items-center">
                            <h4 class="text-xl font-bold mb-4 w-[100%]">Produit 2</h4>
                            <button type="button" data-ligneproduitbutton="2" id="ligneproduit" class="absolute text-2xl right-0 top-0 text-white hover:bg-gray-700 btn btn-circle bg-gray-800">X</button>
                            <div class="content mb-4 flex-1">
                                <label for="libelle" class="block text-gray-700 mb-2">libelle:</label>
                                <input type="text" id="libelle" name="produit[1][libelle]" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div class="content mb-4 flex-1">
                                <label for="poids" class="block text-gray-700 mb-2">Poids:</label>
                                <input type="text" id="poids" name="produit[1][poids]" class="w-full poidsToMontant bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div data-ligneproduit="1" class="content mb-4 flex-1">
                                <label for="typep" class="block text-gray-700">Type De produit</label>
                                <select id="typep" name="produit[1][typep]" class="typeProduitContent typeToMontant filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Sélectionner un type</option>
                                    <option value="chimique">Chimique</option>
                                    <option value="alimentaire">Alimentaire</option>
                                    <option value="fragile">Fragile</option>
                                    <option value="incassable">Incassable</option>
                                </select>
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div id="contentToxique2" class="content mb-4 flex-1">
                                <!--                <label for="toxicite" class="block text-gray-700 mb-2">Toxicite:</label>-->
                                <!--                <input type="text" id="toxicite" name="produit[1][toxicite]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">-->
                                <!--                <span class="error-message text-[0.8rem]">error</span>-->
                            </div>
                        </div>

                        <div class="w-full p-3 bg-gray-100 rounded-lg flex gap-x-3 flex-wrap flex-row items-center">
                            <h4 class="text-xl font-bold mb-4 w-[100%]">Produit 1</h4>
                            <div class="content mb-4 flex-1">
                                <label for="libelle" class="block text-gray-700 mb-2">libelle:</label>
                                <input type="text" id="libelle" name="produit[0][libelle]" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div class="content mb-4 flex-1">
                                <label for="poids" class="block text-gray-700 mb-2">Poids:</label>
                                <input type="text" id="poids" name="produit[0][poids]" class="w-full poidsToMontant bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div data-ligneproduit="0" class="content mb-4 flex-1">
                                <label for="typep" class="block text-gray-700">Type De produit</label>
                                <select id="typep" name="produit[0][typep]" class="typeProduitContent typeToMontant filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Sélectionner un type</option>
                                    <option value="chimique">Chimique</option>
                                    <option value="alimentaire">Alimentaire</option>
                                    <option value="fragile">Fragile</option>
                                    <option value="incassable">Incassable</option>
                                </select>
                                <span class="error-message text-[0.8rem]">error</span>
                            </div>
                            <div id="contentToxique1" class="content mb-4 flex-1">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-between">
                <button type="submit" class="btn px-2 bg-gray-900 rounded-lg w-1/4 text-white hover:bg-gray-700">Enregistrer le coli</button>
                <div>Montant Coli: <span id="montantColi"></span></div>
            </div>
            <div id="alertSuccess" role="alert" class="hidden alert alert-success w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Coli Ajouter à la cargaison!</span>
            </div>

            <div id="alertDanger" role="alert" class="hidden alert alert-error w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>volume restant non suffisant.</span>
            </div>
        </form>
    </div>
</div>