import { Validation } from "./Validation.js";
export class ProduitFormHandler {
    formElement;
    constructor(formSelector) {
        this.formElement = document.querySelector(formSelector);
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }
    // : Record<string, any>
    getFormData() {
        const formData = new FormData(this.formElement);
        // console.log(formData);
        const data = {};
        formData.forEach((value, key) => {
            const match = key.match(/produit\[(\d+)\]\[(\w+)\]/);
            if (!match)
                data[key] = value;
        });
        const products = [];
        formData.forEach((value, key) => {
            const match = key.match(/produit\[(\d+)\]\[(\w+)\]/);
            if (match) {
                const index = parseInt(match[1], 10);
                const field = match[2];
                if (!products[index]) {
                    products[index] = {};
                }
                products[index][field] = value;
            }
        });
        data["produit"] = [];
        products.forEach((value, key) => {
            data["produit"][key] = value;
        });
        return data;
    }
    resetForm() {
        this.formElement.reset();
    }
    validateForm() {
        const inputs = this.formElement.querySelectorAll('input, textarea, select');
        return Validation.checkRequireGlobal3(inputs);
    }
    handleSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const dataFirst = this.getFormData();
                // const data = {dataFirst};
                // const data = {d:1};
                // this.getFormData();
                callback(dataFirst);
            }
            else {
                console.log("Error");
            }
        });
    }
}
