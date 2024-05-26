export class InputListElement {
    listeContainer: HTMLDivElement;
    constructor(listeContainer: HTMLDivElement, child: HTMLTableRowElement) {
        this.listeContainer = listeContainer;
        this.attach(child);
    }
    private attach(child: HTMLTableRowElement) {
        this.listeContainer.appendChild(child);
    }
}

export class InputElement {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    constructor(templateId: string, hostId='app') {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId)! as HTMLDivElement;
        this.attach();
    }
    private attach() {
        const shadowRoot = this.templateElement.content.cloneNode(true);
        this.hostElement.appendChild(shadowRoot);
    }
}