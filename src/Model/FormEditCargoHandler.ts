import {Validation} from "./Validation.js";

interface Validator{
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    email?: boolean;
    url?: boolean;
}

export class FormEditCargoHandler {
    private formElement: HTMLFormElement;

    constructor(formSelector: string) {
        this.formElement = document.querySelector(formSelector) as HTMLFormElement;
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }
    // : Record<string, any>
    getFormData(){
        const formData = new FormData(this.formElement);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }

    resetForm(): void {
        this.formElement.reset();
    }

    validateForm(): boolean {
        const inputs = this.formElement.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>;
        return Validation.checkRequireGlobal2(inputs);
    }
    handleSubmit(callback: (data: Record<string, any>) => void): void {
        this.formElement.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const data = this.getFormData();
                callback(data);
            }else {
                console.log("Error");
            }
        });
    }
}
