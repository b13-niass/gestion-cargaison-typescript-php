<style>
    input[type="text"]:focus{
       outline: none;
    }

</style>
<form id="formColis" class="w-[100%] p-6 flex flex-col gap-y-5">

<!--<input type="hidden" id="numeroCargaison" name="numeroCargaison">-->

<div class="flex flex-row gap-x-3 items-center flex-wrap bg-white shadow-lg rounded-lg p-8 w-full">
    <h4 class="text-xl font-bold mb-4 w-[100%]">Informations Expéditeur</h4>
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

<div class="flex flex-row gap-x-3 items-center flex-wrap bg-white shadow-lg rounded-lg p-8 w-full">
        <h4 class="text-xl font-bold mb-4 w-[100%]">Informations Du Récepteur</h4>
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

<div class="w-[100%] flex flex-col gap-y-2">
    <div class="flex flex-row gap-x-3 justify-between items-center flex-wrap bg-white shadow-lg rounded-lg p-2 w-full">
        <h4 class="text-xl text-gray-800">Les produits du coli</h4>
        <button class="text-2xl text-white hover:bg-gray-600 btn btn-circle bg-gray-800">+</button>
    </div>

    <div class="flex flex-row gap-x-3 gap-y-2 items-center flex-wrap bg-white shadow-lg rounded-lg p-1 w-full">
        <div class="w-full p-3 bg-gray-100 rounded-lg flex gap-x-3 flex-wrap flex-row items-center">
            <h4 class="text-xl font-bold mb-4 w-[100%]">Produit 2</h4>
            <div class="content mb-4 flex-1">
                <label for="libelle" class="block text-gray-700 mb-2">libelle:</label>
                <input type="text" id="libelle" name="produit[1][libelle]" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div class="content mb-4 flex-1">
                <label for="poids" class="block text-gray-700 mb-2">Poids:</label>
                <input type="text" id="poids" name="produit[1][poids]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div data-ligneproduit="1" class="content mb-4 flex-1">
                <label for="typep" class="block text-gray-700">Type De produit</label>
                <select id="typep" name="produit[1][typep]" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                <input type="text" id="poids" name="produit[0][poids]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div data-ligneproduit="0" class="content mb-4 flex-1">
                <label for="typep" class="block text-gray-700">Type De produit</label>
                <select id="typep" name="produit[0][typep]" class="filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
<button type="submit" class="btn px-2 bg-gray-900 rounded-lg w-1/4 text-white hover:bg-gray-700">Enregistrer le coli</button>
<div id="alertSuccess" role="alert" class="hidden alert alert-success w-1/3">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Coli Ajouter à la cargaison!</span>
</div>

<div id="alertDanger" role="alert" class="hidden alert alert-error w-1/3">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Le Produit ne peux pas être ajouter.</span>
</div>
</form>