import mongoose from 'mongoose'

const items = new mongoose.Schema({
    user_id :{type:String},
    name: {type:String},  
})

const chadModel = mongoose.model('items',items)
  
export default chadModel;