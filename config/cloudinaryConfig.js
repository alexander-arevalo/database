const dotenv = require('dotenv')

dotenv.config()

const cloudConfig ={}

cloudConfig.cloudAPI_SECRET = process.env.cloudAPI_SECRET;
cloudConfig.cloudAPI_KEY = process.env.cloudAPI_KEY;
cloudConfig.cloudAPI_NAME= process.env.cloudAPI_NAME;

module.exports =cloudConfig;