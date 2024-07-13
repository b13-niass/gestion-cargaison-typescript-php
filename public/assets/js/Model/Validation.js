export class Validation {
    static isDateInFuture(dateString) {
        const inputDate = new Date(dateString);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return inputDate > currentDate;
    }
    static showSuccees = (fils) => {
        const parent = fils.parentNode;
        parent.className = "content";
    };
    static showSuccees2 = (fils) => {
        const parent = fils.parentNode;
        // parent.classList.add("content");
        parent.classList.remove("error");
    };
    static getInputName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);
    static showError = (fils, msg) => {
        const parent = fils.parentNode;
        parent.className = "content error";
        const span = parent.querySelector("span");
        span.innerText = msg;
    };
    static showError2 = (fils, msg) => {
        const parent = fils.parentNode;
        parent.classList.add("error");
        const span = parent.querySelector("span");
        span.innerText = msg;
    };
    static checkRequireGlobal = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.value.trim() === "") {
                valid = false;
                parent.className = "content error";
                Validation.showError(input, `${Validation.getInputName(input)} est requis`);
            }
            else {
                Validation.showSuccees(input);
            }
        });
        return valid;
    };
    static checkRequireGlobal2 = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.value.trim() === "") {
                valid = false;
                parent.classList.add("error");
                Validation.showError2(input, `${Validation.getInputName(input)} est requis`);
            }
            else {
                if (input.name == "poidsMax") {
                    console.log(input.name);
                    valid = Validation.validerEntier(input);
                }
                else if (input.name == "nbrProduitMax") {
                    console.log(input.name);
                    valid = Validation.validerProduitMax(input);
                }
                else {
                    Validation.showSuccees2(input);
                }
            }
        });
        return valid;
    };
    static checkRequireGlobal3 = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.value.trim() === "") {
                valid = false;
                parent.classList.add("error");
                Validation.showError2(input, `${Validation.getInputName(input)} est requis`);
            }
            else {
                Validation.showSuccees2(input);
            }
        });
        valid = Validation.checkRequireGlobal3Supp1(inputArray);
        return valid;
    };
    static checkRequireLogin = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.value.trim() === "") {
                valid = false;
                parent.classList.add("error");
                Validation.showError2(input, `${Validation.getInputName(input)} est requis`);
            }
            else {
                Validation.showSuccees2(input);
            }
        });
        valid = Validation.checkRequireLoginSupp(inputArray);
        return valid;
    };
    static checkRequireLoginSupp = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.name == 'email') {
                valid = Validation.email(input);
            }
        });
        return valid;
    };
    static validerDateAddCargo = (input) => {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.isDateInFuture(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} doit être dans le futur`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    };
    static validerProduitMax = (input) => {
        let valid = true;
        const parent = input.parentNode;
        if (input.value.trim() === "" || parseInt(input.value.trim()) < 0 || parseInt(input.value.trim()) > 10) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} de 1 à 10`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    };
    static validerEntier = (input) => {
        let valid = true;
        const parent = input.parentNode;
        console.log(parseInt(input.value.trim()) < 0);
        if (parseInt(input.value.trim()) < 0) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} doit être positif`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    };
    static checkRequireGlobal3Supp1 = (inputArray) => {
        let valid = true;
        inputArray.forEach((input) => {
            const parent = input.parentNode;
            if (input.name == 'telExpediteur' || input.name == 'telRecepteur') {
                valid = Validation.telephone(input);
            }
            else if (input.name == 'prenomExpediteur' || input.name == 'prenomRecepteur'
                || input.name == 'nomExpediteur' || input.name == 'nomRecepteur' || input.id == 'libelle'
                || input.name == 'villeExpediteur' || input.name == 'paysExpediteur' ||
                input.name == 'villeRecepteur' || input.name == 'paysRecepteur') {
                valid = Validation.chaine(input);
            }
            else if (input.id == 'poids') {
                valid = Validation.entier(input);
            }
            else if (input.id == 'toxicite') {
                valid = Validation.toxicite(input);
            }
            else if (input.name == 'emailRecepteur' || input.name == 'emailExpediteur') {
                valid = Validation.email(input);
            }
        });
        return valid;
    };
    static telephoneRegex(input) {
        const regex = /^(77|76|78|70)\d{7}$/;
        return regex.test(input);
    }
    static telephone(input) {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.telephoneRegex(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} pas correct`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    }
    static chaineRegex(input) {
        const regex = /^[a-zA-Z0-9 ]+$/;
        return regex.test(input);
    }
    static chaine(input) {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.chaineRegex(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} pas correct`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    }
    static entierRegex(input) {
        const regex = /^[0-9]+$/;
        return regex.test(input);
    }
    static entier(input) {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.entierRegex(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} pas correct`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    }
    static toxiciteRegex(input) {
        const regex = /^(10|[0-9])$/;
        return regex.test(input);
    }
    static toxicite(input) {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.toxiciteRegex(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} pas correct`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    }
    static emailRegex(input) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(input);
    }
    static email(input) {
        let valid = true;
        const parent = input.parentNode;
        if (!Validation.emailRegex(input.value)) {
            valid = false;
            parent.classList.add("error");
            Validation.showError2(input, `${Validation.getInputName(input)} pas correct`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    }
}
