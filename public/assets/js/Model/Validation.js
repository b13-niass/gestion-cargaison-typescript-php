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
                Validation.showSuccees2(input);
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
            Validation.showError2(input, `${Validation.getInputName(input)} n'est pas valide`);
        }
        else {
            Validation.showSuccees2(input);
        }
        return valid;
    };
    static validerEntier = (input) => {
        let valid = true;
        const parent = input.parentNode;
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
}
