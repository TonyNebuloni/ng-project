export interface Product {
    id: number,
    name: string,
    isFavorite: boolean,
    createdDate: Date,
    taille: number,
    imageUrl: string,
    prix: number,
    maison: string
}

//carte pokemon id, name, iamge.large, hp, attacks[], type[], rarity, cardmarket.prices.averageSellPrice