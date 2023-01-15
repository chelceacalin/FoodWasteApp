class Product {
    constructor(id, idUser, address, photoURL, description, forTrade, expDate, status, category) {
        this.id = id;
        this.idUser = idUser;
        this.address = address;
        this.photoURL = photoURL;
        this.description = description;
        this.forTrade = forTrade;
        this.expDate = expDate;
        this.status = status;
        this.category = category;
    }
}

const ProductStatus = {
    RESERVED: 0,
    AVAILABLE: 1,
    SOLD: 2
}

export { Product, ProductStatus }