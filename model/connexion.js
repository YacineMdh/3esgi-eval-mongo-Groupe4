const mongoose = require ("mongoose")

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/réseau")
        console.log("successfuly connect")
    }
   catch(err){
    console.log(err)
   }
}

module.exports = connect;