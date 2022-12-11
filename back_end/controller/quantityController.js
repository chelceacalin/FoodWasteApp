const Quantity = require('../Models/quantity')



// Create
const addQuantity = async(req, res) => {
    try {
        const quantity = await Quantity.create(req.body);
        res.status(200).send(quantity);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Get all
const getAllQuantities = async(req, res) => {
    try {
        let quantity = await Quantity.findAll();
        res.status(200).json(quantity);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Get single

const getSingleQuantity = async(req, res) => {
    try {
        let quantity = await Quantity.findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send(quantity);

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}

//Update
const updateQuantity = async(req, res) => {
    try {
        let quantity = await Quantity.update(req.body, { where: { id: req.params.id } });
        res.status(200).send(quantity);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Delete by ID
const deleteQuantityById = async(req, res) => {
    try {
        await Quantity.destroy({ where: { id: req.params.id } });
        res.status(200).send({ message: `Quantity with id: ${req.params.id} has been deleted` });

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}

//Delete  All
const deleteallQuantities = async(req, res) => {
    try {
        await Quantity.destroy({ where: {}, truncate: true });
        res.status(200).send({ message: "Table Cleared" });
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}
module.exports = {

    addQuantity,
    getAllQuantities,
    getSingleQuantity,
    deleteQuantityById,
    deleteallQuantities,
    updateQuantity
};