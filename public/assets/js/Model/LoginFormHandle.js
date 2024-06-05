import { Validation } from "./Validation.js";
export class LoginFormHandle {
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
        const inputs = this.formElement.querySelectorAll('input');
        return Validation.checkRequireLogin(inputs);
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