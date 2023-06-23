const ReqId = require("../models/ReqId");
//@desc get all Id
//@route route GET /api/reqId
//@access public 
const getAll = async (req, res) => {
  try {
    const getRequestId = await ReqId.find();
    res.json(getRequestId);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
    res.status(200).json({message: "Get all Id"});
    };
  
  //@desc create Id
  //@route route POST /api/reqId
  //@access public 
  const createId = async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let relationship = req.body.relationship
    let phoneNumber = req.body.phoneNumber
    let address= req.body.address
    const reqid = new ReqId({firstName, lastName, relationship, phoneNumber, address});
    
    try {
      const newRequestId = await reqid.save();
      res.status(201).json({message: "Succesfully Requested", newRequestId});
    } catch (error) {
      res.status(500).json({message: "something went wrong", error})
    }
   
    };
  
  //@desc Get Id
  //@route route GET /api/reqId/:id
  //@access public 
  const getId = (req, res) => {
    res.status(200).json({message: `Get Id for ${req.params.id}`});
    };
  
  //@desc get all Id
  //@route route PUT /api/reqId/:id
  //@access public 
  const updateId = (req, res) => {
    res.status(200).json({message: `Update Id for ${req.params.id}`});
    };
  
  //@desc get all Id
  //@route route DELETE /api/reqId/:id
  //@access public 
  const deleteId = (req, res) => {
    res.status(200).json({message: `Delete Id for ${req.params.id}`});
    };
  
  
  
  
  module.exports = {
    getAll, 
    createId, 
    getId, 
    updateId, 
    deleteId,
  };
  