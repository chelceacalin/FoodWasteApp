const router = require('express').Router();
const reservationController = require('../controller/reservationController');

router.post("/", reservationController.addReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getSingleReservation);
router.delete('/:id', reservationController.deleteReservationById);
router.delete('/', reservationController.deleteallReservations);
router.put('/:id', reservationController.updateReservation);
module.exports = router;