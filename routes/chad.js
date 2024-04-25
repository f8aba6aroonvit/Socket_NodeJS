import chadModel from '../models/chad.js'
import express from 'express';
import itemModel from '../models/item.js'
export const chadRoute = express.Router();

// route.get('/', (req, res) => {
//   res.send("What's up doc ?!");
// });
chadRoute.get('/', async (req, res) => {
  try {
    let chads = await chadModel.find({})
    console.log(chads)
    let items = await itemModel.find({})
    console.log("chads", chads)
    console.log("items", items)

    let chadogs =await chadModel.aggregate([

      {
        $addFields:{
          string_id : { $toString: "$_id" }
        }

      },
      {
        $lookup:
        {
          from:"stats",
          localField: "string_id",
          foreignField: "stat_id",
          as: "detail"

        }
      },

      {
        $lookup:{
          from:"items",
          localField:"string_id",
          foreignField:"user_id",
          as :"data"
          
        }



      },
      { $unwind: "$detail" },
      

      {

        $project:{
          _id : 0,
          username : 1,
          class:"$detail.class",
          atk:"$detail.atk",
          def:"$detail.def",
          agi:"$detail.agi",
          luc:"$detail.luc",
          names:"$data.names"
          
          
         
        }
      },
      // {
      //   $lookup:
      //   {
      //     from:"items",
      //     localField: "string_id",
      //     foreignField: "stat_id",
      //     as: "detail"

      //   }
      // }
      //{ $unwind: "$data.names" }
    ])

    console.log("แอกกี",chadogs);



    return res.send({
      names: chadogs,
      // chad_data: chads,
      // username: chads.username,
      // message: chads.message
    }
    )


  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message
    })
  }
})

chadRoute.get('/:username', async (req, res) => {
  try {
    let username = req.params.username

    console.log("พี่โต นะ", username)
    let chads = await chadModel.find({ username: username })


    return res.send({
      data: chads,

      godLogDog: `${username}`
    })
  } catch (err) {
    return res.status(err.status || 500).send({
      message: "หนังหมาว่ะ",
      godLogDog: err.message
    })
  }


}
)


chadRoute.post('/', (req, res) => {

})