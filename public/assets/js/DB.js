export const DB = {
    cargaison: {
        maritime: {
            produitsAccepter: [
                "chimique",
                "materiel",
                "alimentaire"
            ],
            fraisTransport: [
                { typep: 1, tarif: 90, poids: 1, param: 1, autreFrais: 5000 },
                { typep: 2, tarif: 500, poids: 1, param: 1, autreFrais: 10000 },
                { typep: 3, tarif: 400, poids: 1, param: 1, autreFrais: 0 },
            ],
            values: [
                {
                    numero: 1,
                    poidsMax: 100,
                    nbrProduitMax: 10,
                    montantTotal: 100000,
                    departX: 0,
                    departY: 0,
                    arriveX: 0,
                    arriveY: 0,
                    typec: "maritime",
                    image: "https://placehold.co/500",
                    distance: 1000,
                    etatAvancement: "EN ATTENTE",
                    etatGlobal: "OUVERT"
                }
            ]
        },
        aerienne: {
            produitsAccepter: [
                "materiel",
                "alimentaire"
            ],
            fraisTransport: [
                { typep: 1, tarif: 300, poids: 1, param: 1, autreFrais: 5000 },
                { typep: 3, tarif: 1000, poids: 1, param: 1, autreFrais: 0 },
            ],
            values: [
                {
                    numero: 1,
                    poidsMax: 100,
                    nbrProduitMax: 10,
                    montantTotal: 100000,
                    departX: 0,
                    departY: 0,
                    arriveX: 0,
                    arriveY: 0,
                    typec: "aerienne",
                    image: "https://placehold.co/500",
                    distance: 1000,
                    etatAvancement: "EN ATTENTE",
                    etatGlobal: "OUVERT"
                }
            ]
        },
        routiere: {
            produitsAccepter: [
                "materiel",
                "alimentaire"
            ],
            fraisTransport: [
                { typep: 1, tarif: 100, poids: 1, param: 1, autreFrais: 5000 },
                { typep: 3, tarif: 200, poids: 1, param: 1, autreFrais: 0 },
            ],
            values: [
                {
                    numero: 1,
                    poidsMax: 100,
                    nbrProduitMax: 10,
                    montantTotal: 100000,
                    departX: 0,
                    departY: 0,
                    arriveX: 0,
                    arriveY: 0,
                    typec: "routiere",
                    image: "https://placehold.co/500",
                    distance: 1000,
                    etatAvancement: "EN ATTENTE",
                    etatGlobal: "OUVERT"
                }
            ]
        }
    }
};
