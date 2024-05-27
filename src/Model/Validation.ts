export class Validation {
  static isDateInFuture(dateString: string): boolean {
    const inputDate = new Date(dateString);

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    return inputDate > currentDate;
  }

  static showSuccees = (fils: HTMLElement) => {
    const parent = fils.parentNode as HTMLElement;
    parent.className = "content";
  };

  static showSuccees2 = (fils: HTMLElement) => {
    const parent = fils.parentNode as HTMLElement;
    // parent.classList.add("content");
    parent.classList.remove("error");
  };

  static getInputName = (input: HTMLInputElement) =>
    input.id.charAt(0).toUpperCase() + input.id.slice(1);

  static showError = (fils: HTMLElement, msg:string) => {
    const parent = fils.parentNode as HTMLElement;
    parent.className = "content error";
    const span = parent.querySelector("span") as HTMLSpanElement;
      span.innerText = msg;
  };

  static showError2 = (fils: HTMLElement, msg:string) => {
    const parent = fils.parentNode as HTMLElement;
    parent.classList.add("error");
    const span = parent.querySelector("span") as HTMLSpanElement;
    span.innerText = msg;
  };

  static checkRequireGlobal = (inputArray: NodeListOf<HTMLInputElement>) => {
    let valid = true;
    inputArray.forEach((input) => {
      const parent = input.parentNode as HTMLElement;
      if (input.value.trim() === "") {
        valid = false;
        parent.className = "content error";
        Validation.showError(input, `${Validation.getInputName(input)} est requis`);
      } else {
        Validation.showSuccees(input);
      }
    });
    return valid;
  };

  static checkRequireGlobal2 = (inputArray: NodeListOf<HTMLInputElement>) => {
    let valid = true;
    inputArray.forEach((input) => {
      const parent = input.parentNode as HTMLElement;
      if (input.value.trim() === "") {
        valid = false;
        parent.classList.add("error");
        Validation.showError2(input, `${Validation.getInputName(input)} est requis`);
      } else {
        Validation.showSuccees2(input);
      }
    });
    return valid;
  };

  static validerDateAddCargo = (input: HTMLInputElement) => {
    let valid = true;
    const parent = input.parentNode as HTMLElement;
     if (!Validation.isDateInFuture(input.value)) {
        valid = false;
        parent.classList.add("error");
        Validation.showError2(input, `${Validation.getInputName(input)} doit être dans le futur`);
      } else {
       Validation.showSuccees2(input);
     }
    return valid;
  };

  static validerProduitMax = (input: HTMLInputElement) => {
    let valid = true;
      const parent = input.parentNode as HTMLElement;
      if (input.value.trim() === "" || parseInt(input.value.trim()) < 0 || parseInt(input.value.trim()) >  10 ) {
        valid = false;
        parent.classList.add("error");
        Validation.showError2(input, `${Validation.getInputName(input)} n'est pas valide`);
      } else {
        Validation.showSuccees2(input);
      }
    return valid;
  };

  static validerEntier = (input: HTMLInputElement) => {
    let valid = true;
    const parent = input.parentNode as HTMLElement;
    if (parseInt(input.value.trim()) < 0) {
      valid = false;
      parent.classList.add("error");
      Validation.showError2(input, `${Validation.getInputName(input)} doit être positif`);
    } else {
      Validation.showSuccees2(input);
    }
    return valid;
  };

}