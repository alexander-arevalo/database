const Gallery = require("../models/GalleryModel");

const getAllGallery = async (req, res) => {
  await Gallery.find()
    .then((resp) => {
      if (!resp) {
        res.json({ message: "No Gallery Found" });
      } else {
        res.json({ resp });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getGalleryById = async (req, res) => {
  const id = req.params.id;
  await Gallery.findById(id)
    .then((resp) => {
      if (!resp) {
        res.json({ message: `Gallery with id ${id} is not found` });
      }
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const addGallery = async (req, res) => {
  const { title, description, galleryPicture } = req.body;
  const newGallery = new Gallery({ title, description, galleryPicture });
  newGallery
    .save()
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const editGallery = async (req, res) => {
  const id = req.params.id;
  const { title, description, galleryPicture } = req.body;
  const newGallery = await Gallery.findById();

  newGallery.title = title;
  newGallery.description = description;
  newGallery.galleryPicture = galleryPicture;

  newGallery
    .save()
    .then((resp) => {
      res.json(
        { message: `Gallery with id ${id} is successfully updated` },
        { resp }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteGallery = async (req, res) => {
  const id = req.params.id;

  const foundGallery = await Gallery.findByIdAndRemove(id)
    .then((resp) => {
      res.json({ message: `Gallery with id ${id} is successfully deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  deleteGallery,
  addGallery,
  getAllGallery,
  getGalleryById,
  editGallery,
};
