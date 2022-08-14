const { user_game, user_game_biodata } = require("../models");

// Add Biodata
const addBiodata = (req, res) => {
  const add = user_game_biodata
    .create({
      id_user: req.body.id_user,
      username: req.body.username,
      city: req.body.city,
    })
    .then(() => {
      return res.status(200).json({
        message: "Menambah Biodata Berhasil",
        data: {
          id_user: add.id_user,
          username: add.username,
          city: add.city,
        },
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "Gagal menambah biodata",
      });
    });
};

const getBiodata = async (req, res) => {
  const idUser = req.params.id_user;

  const userData = await user_game.findByPk(idUser);
  if (!userData) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }

  const email = await user_game.findAll({
    where: {
        id: idUser
    }
  });

  const userBiodata = await user_game_biodata.findAll({
    where: {
      id_user: idUser,
    },
  });

  if (!userBiodata) {
    return res.status(200).json({
      data: [],
    });
  }

  return res.status(200).json({
    data: {
        userBiodata,
        email
    }
  });
};

module.exports = {
  addBiodata, getBiodata
};
