const newUserSub = require('../Models/newUserSub')

// Create
const addnewUserSub = async(req, res) => {
    try {
        const sub = await newUserSub.create(req.body);
        res.status(200).send(sub);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


const getSingleUserSub = async(req, res) => {
        try {
            let sub = await newUserSub.findOne({
                where: {
                    sub: req.params.id
                }
            })
            res.status(200).send(sub);

        } catch (err) {
            res.status(500).send({ message: 'Eroare' });
        }
    }
    //Get
module.exports = {
    addnewUserSub,
    getSingleUserSub
};