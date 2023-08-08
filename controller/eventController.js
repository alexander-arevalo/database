const Event = require("../models/Event");

//@desc Get event
//@route route GET /api/event
//@access public

const getEvent = async (req, res) => {
  try {
    const getCreateEvent = await Event.find();
    res.json(getCreateEvent);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

//@desc Get event
//@route route POST /api/event
//@access admin
const deleteEvent = async (req, res) => {
  const id = req.params.id;

  await Event.findByIdAndRemove(id)
    .then((resp) => {
      res.json({ message: `Event with id ${id} is successfully deleted` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const createEvent = async (req, res) => {
  let title = req.body.title;
  let date = req.body.date;
  let time = req.body.time;
  let description = req.body.description;
  const event = new Event({ title, date, time, description });

  try {
    const newCreateEvent = await event.save();
    res
      .status(201)
      .json({ message: "Succesfully Added New Event", newCreateEvent });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//@desc get all Id
//@route route PUT /api/reqId/:id
//@access public
const upadateEvent = async (req, res) => {
  const { title, date, time, description } = req.body;
  const id = req.params.id;
  await Event.findById(id)
    .then((res) => {
      if (!res) {
        res.status(404).json({ message: `Event with id ${id} is not found` });
      }
      res.title = title;
      res.date = date;
      res.time = time;
      res.description = description;
      res
        .save()
        .then((res) => {
          res.json(res);
        })
        .catch((err) =>
          res.status(500).json({ message: "Something went wrong" + err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong" + err })
    );
};
const findById = async (req, res) => {
  const id = req.params.id;
  await Event.findById(id)
    .then((resp) => {
      if (res) {
        res.json(resp);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong ${err}` });
    });
};

module.exports = {
  createEvent,
  getEvent,
  upadateEvent,
  deleteEvent,
  findById,
};
