export class Client {
    nom;
    prenom;
    telephone;
    email;
    ville;
    pays;
    code;
    constructor(init) {
        Object.assign(this, init);
    }
    setNom(nom) {
        this.nom = nom;
    }
    getNom() {
        return this.nom;
    }
    setPrenom(prenom) {
        this.prenom = prenom;
    }
    getPrenom() {
        return this.prenom;
    }
    setTelephone(tel) {
        this.telephone = tel;
    }
    getTelephone() {
        return this.telephone;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setVille(ville) {
        this.ville = ville;
    }
    getVille() {
        return this.ville;
    }
    setPays(pays) {
        this.pays = pays;
    }
    getPays() {
        return this.pays;
    }
    setCode(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
}
