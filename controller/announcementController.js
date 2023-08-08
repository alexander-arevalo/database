const Announcement = require("../models/AnnouncementModel");

const getAllAnnouncement = async (req, res) => {
  await Announcement.find()
    .then((resp) => {
      if (!resp) {
        res.json({ message: "No announcements found" + resp });
      }
      res.json({ resp });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const addAnnouncement = async (req, res) => {
  const { description } = req.body;

  const newAnnouncement = new Announcement({
    announcementDescription: description,
  });
  await newAnnouncement
    .save()
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const editAnnouncement = async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  console.log("editing");
  const findAnnouncement = await Announcement.findById(id);
  if (findAnnouncement) {
    findAnnouncement.announcementDescription = description;
    findAnnouncement
      .save()
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res
      .status(404)
      .send({ message: `Announcement with id ${id} is not found on database` });
  }
};

const deleteAnnouncement = async (req, res) => {
  const id = req.params.id;
  await Announcement.findByIdAndRemove(id)
    .then((resp) => {
      if (!resp) {
        res
          .status(404)
          .send({ message: `Announcement with id ${id} is not found!` });
      } else {
        res.send({ message: `User with id ${id} os successfully deleted!` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const findById = async (req, res) => {
  const id = req.params.id;
  await Announcement.findById(id)
    .then((resp) => {
      if (!resp) {
        res
          .status(404)
          .send({ message: `Announcement with id ${id} is not found!` });
      } else {
        res.send(resp);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  deleteAnnouncement,
  addAnnouncement,
  editAnnouncement,
  getAllAnnouncement,
  findById,
};
