export class InputListElement {
    listeContainer;
    constructor(listeContainer, child) {
        this.listeContainer = listeContainer;
        this.attach(child);
    }
    attach(child) {
        this.listeContainer.appendChild(child);
    }
}
export class InputElement {
    templateElement;
    hostElement;
    constructor(templateId, hostId = 'app') {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        this.attach();
    }
    attach() {
        const shadowRoot = this.templateElement.content.cloneNode(true);
        this.hostElement.appendChild(shadowRoot);
    }
}
