import { Validation } from "./Validation.js";
export class FormHandler {
    formElement;
    constructor(formSelector) {
        this.formElement = document.querySelector(formSelector);
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }
    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    resetForm() {
        this.formElement.reset();
    }
    validateForm() {
        let isValid = true;
        let listeToCheck;
        const inputDate = document.querySelector(".date-depart-add");
        const inputDateArrive = document.querySelector(".date-arrive-add");
        const inputs = this.formElement.querySelectorAll('input, textarea, select');
        return Validation.checkRequireGlobal2(inputs) && Validation.validerDateAddCargo(inputDate) && Validation.validerDateAddCargo(inputDateArrive);
    }
    handleSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            let infoSupp = { ...JSON.parse(localStorage.getItem("infoSupp")) };
            if (this.validateForm()) {
                if (localStorage.getItem("infoSupp") && Object.keys(infoSupp).length == 4) {
                    localStorage.removeItem("infoSupp");
                    document.getElementById("mapContainer")?.classList.remove("error");
                    const dataFirst = this.getFormData();
                    const data = { ...dataFirst, ...infoSupp };
                    callback(data);
                }
                else {
                    console.log("Error");
                    document.getElementById("mapContainer")?.classList.add("error");
                }
            }
            else {
                console.log("Error");
            }
        });
    }
}
