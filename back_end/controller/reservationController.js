const Reservation = require('../Models/reservation')



// Create
const addReservation = async(req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(200).send(reservation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Get all
const getAllReservations = async(req, res) => {
    try {
        let reservation = await Reservation.findAll();
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Get single

const getSingleReservation = async(req, res) => {
    try {
        let reservation = await Reservation.findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send(reservation);

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Get single

const getReservationsByID = async(req, res) => {
    try {
        let reservation = await Reservation.findAll({
            where: {
                cineRezerva: req.params.id
            }
        })
        res.status(200).send(reservation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


//Update
const updateReservation = async(req, res) => {
    try {
        let reservation = await Reservation.update(req.body, { where: { id: req.params.id } });
        res.status(200).send(reservation);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Delete by ID
const deleteReservationById = async(req, res) => {
    try {
        await Reservation.destroy({ where: { id: req.params.id } });
        res.status(200).send({ message: `Reservation with id: ${req.params.id} has been deleted` });

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}

//Delete  All
const deleteallReservations = async(req, res) => {
    try {
        await Reservation.destroy({ where: {}, truncate: true });
        res.status(200).send({ message: "Table Cleared" });
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}
module.exports = {

    addReservation,
    getAllReservations,
    getSingleReservation,
    deleteReservationById,
    deleteallReservations,
    updateReservation,
    getReservationsByID
};