const Event = require("../models/Event");

//@desc Get event
//@route route GET /api/event
//@access public

const getEvent = async (req, res) => {
    try {
        const getCreateEvent = await Event.find()
        res.json(getCreateEvent);
    } catch (error) {
        res.status(500).json({message: err.message});
    }
        res.status(200).json({message: "Get Event"});
};


//@desc Get event
//@route route POST /api/event
//@access admin

const createEvent = async (req, res) => {

    let title = req.body.title
    let date = req.body.date
    let time = req.body.time
    let description = req.body.description
    const event = new Event({title, date, time, description});

    try {
        const newCreateEvent = await event.save();
        res.status(201).json({message: "Succesfully Added New Event", newCreateEvent });
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error})
    }

};

 //@desc get all Id
  //@route route PUT /api/reqId/:id
  //@access public 
  const upadateEvent = (req, res) => {
    res.status(200).json({message: `Update event for ${req.params.id}`});
    };
  

module.exports = {
    createEvent,
    getEvent,
    upadateEvent,
};