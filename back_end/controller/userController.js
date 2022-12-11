const User = require('../Models/user')



// Create
const addUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Get all
const getAllUsers = async(req, res) => {
    try {
        let users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Get single

const getSingleUser = async(req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send(user);

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}

//Update
const updateUser = async(req, res) => {
    try {
        let user = await User.update(req.body, { where: { id: req.params.id } });
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}


//Delete by ID
const deleteUserById = async(req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).send({ message: `User with id: ${req.params.id} has been deleted` });

    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}

//Delete  All
const deleteallUsers = async(req, res) => {
    try {
        await User.destroy({ where: {}, truncate: true });
        res.status(200).send({ message: "Table Cleared" });
    } catch (err) {
        res.status(500).send({ message: 'Eroare' });
    }
}
module.exports = {

    addUser,
    getAllUsers,
    getSingleUser,
    deleteUserById,
    deleteallUsers,
    updateUser
};