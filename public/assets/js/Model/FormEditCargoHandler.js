import { Validation } from "./Validation.js";
export class FormEditCargoHandler {
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
        const inputs = this.formElement.querySelectorAll('input, textarea, select');
        return Validation.checkRequireGlobal2(inputs);
    }
    handleSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const data = this.getFormData();
                callback(data);
            }
            else {
                console.log("Error");
            }
        });
    }
}
