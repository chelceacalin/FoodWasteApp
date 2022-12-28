const router = require('express').Router();
const newUserSubController = require('../controller/newUserSubController');

router.post("/", newUserSubController.addnewUserSub);
router.get("/:id", newUserSubController.getSingleUserSub);

module.exports = router;