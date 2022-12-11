const router = require('express').Router();
const userController = require('../controller/userController');

router.post("/", userController.addUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.delete('/:id', userController.deleteUserById);
router.delete('/', userController.deleteallUsers);
router.put('/:id', userController.updateUser);
module.exports = router;