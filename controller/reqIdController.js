const ReqId = require("../models/ReqId");
//@desc get all Id
//@route route GET /api/reqId
//@access public
const getAll = async (req, res) => {
  try {
    await ReqId.find().then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

//@desc create Id
//@route route POST /api/reqId
//@access public

const requestStudentId = async (req, res) => {
  let {
    firstName,
    lastName,
    relationship,
    address,
    studentPicture,
    phoneNumber,
  } = req.body;
  const reqid = new ReqId({
    firstName,
    lastName,
    relationship,
    phoneNumber,
    address,
    studentPicture,
  });
  console.log("request ID" + reqid);
  await reqid
    .save()
    .then((resp) => {
      res.status(201).json({ message: "Succesfully Requested", resp });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong " + err.message });
    });
};
const approveIdRequest = async (req, res) => {
  const id = req.params.id;

  const requestId = await ReqId.findById(id);
  if (!requestId.isApproved || (requestId.isApproved == null && requestId)) {
    requestId.isApproved = true;
    await requestId.save().then((resp) => {
      res.json(resp);
    });
  } else {
    res.status(400).json({ message: "Request already approved" });
  }
};
const declinedRequest = async (req, res) => {
  const id = req.params.id;

  const requestId = await ReqId.findById(id);
  if (requestId.isApproved == null && requestId) {
    requestId.isApproved = false;
    await requestId
      .save()
      .then((ress) => {
        res.json(ress);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
 
    res.status(400).json({ message: "Decided already" });
  }
};

//@desc Get Id
//@route route GET /api/reqId/:id
//@access public
const getId = async (req, res) => {
  const id = req.params.id;

  await ReqId.findById(id)
    .then((resp) => {
      if (!resp) {
        res.status(404).send({ message: `Request with id ${id} is not found` });
      }
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

//@desc get all Id
//@route route DELETE /api/reqId/:id
//@access public
const deleteId = async (req, res) => {
  const id = req.params.id;
  await ReqId.findByIdAndRemove(id)
    .then((resp) => {
      res.json(
        { message: `Request with id ${id} is successfully deleted` },
        resp
      );
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getAll,
  requestStudentId,
  getId,
  deleteId,
  approveIdRequest,
  declinedRequest,
};
