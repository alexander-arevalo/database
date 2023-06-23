//@desc get all upload
//@route route GET /api/upload
//@access public 
const getAllUploads = (req, res) => {
  res.status(200).json({message: "Get all upload"});
  };

//@desc create upload
//@route route POST /api/upload
//@access public 
const createUpload = (req, res) => {
  res.status(201).json({message: "Create upload"});
  };

//@desc Get upload
//@route route GET /api/upload/:id
//@access public 
const getById = (req, res) => {
  res.status(200).json({message: `Get upload for ${req.params.id}`});
  };

//@desc get all upload
//@route route PUT /api/upload/:id
//@access public 
const updateUpload = (req, res) => {
  res.status(200).json({message: `Update upload for ${req.params.id}`});
  };

//@desc get all upload
//@route route DELETE /api/upload/:id
//@access public 
const deleteUpload = (req, res) => {
  res.status(200).json({message: `Delete upload for ${req.params.id}`});
  };




module.exports = {
  getAllUploads, 
  createUpload, 
  getById, 
  deleteUpload, 
};
