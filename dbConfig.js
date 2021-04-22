const mongoose = require("mongoose")
// TODO: move to .env/sec
// TODO: use async await instead of then/catch

function initializeDBConnection(){
    mongoose.connect("mongodb+srv://xdev:Xdev@1234@maddy.55igy.mongodb.net/startup-tube",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:true,
        useCreateIndex:true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }