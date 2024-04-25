import mongoose from 'mongoose'

const chads = new mongoose.Schema({
    username :{type:String},
    message: {type:String},  
})

const chadModel = mongoose.model('chads',chads)
  
export default chadModel;
// exports = {chadModel:mongoose.model('chads',chads)}