const { user_game_biodata } = require('../models');

// Add Biodata
const addBiodata = (req, res) => {

    const add = user_game_biodata.create({
        id_user: req.body.id_user,
        username: req.body.username,
        city: req.body.city
    })
    .then(() => {
        return res.status(200).json({
            message: "Menambah Biodata Berhasil",
            data: {
                id_user: add.id_user,
                username: add.username,
                city: add.city
            }
        });
    })
    .catch(err => {
        return res.status(404).json({
            message: "Gagal menambah biodata"
        });
    });
}

module.exports = {
    addBiodata
}