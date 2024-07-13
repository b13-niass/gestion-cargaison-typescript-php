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

export class FormHandler {
    private formElement: HTMLFormElement;

    constructor(formSelector: string) {
        this.formElement = document.querySelector(formSelector) as HTMLFormElement;
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }

    getFormData(): Record<string, any> {
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
        let isValid = true;
        let listeToCheck: NodeListOf<HTMLInputElement>;
        const inputDate = document.querySelector(".date-depart-add") as HTMLInputElement;
        const inputDateArrive = document.querySelector(".date-arrive-add") as HTMLInputElement;
        const inputs = this.formElement.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>;
        return Validation.checkRequireGlobal2(inputs) && Validation.validerDateAddCargo(inputDate) && Validation.validerDateAddCargo(inputDateArrive);
    }
    handleSubmit(callback: (data: Record<string, any>) => void): void {
        this.formElement.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            let infoSupp = {...JSON.parse(localStorage.getItem("infoSupp")!) as Record<string, any>}

            if (this.validateForm()) {
                if (localStorage.getItem("infoSupp") && Object.keys(infoSupp).length == 4){
                    localStorage.removeItem("infoSupp");
                    document.getElementById("mapContainer")?.classList.remove("error");

                    const dataFirst = this.getFormData();
                    const data = {...dataFirst, ...infoSupp};
                    callback(data);

                }else {
                    console.log("Error")
                    document.getElementById("mapContainer")?.classList.add("error");
                }

            }else {
                console.log("Error")
            }
        });
    }
}
