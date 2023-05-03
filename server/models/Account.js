const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type : String,
        require: true
    }
    email: {
    type : String,
    require: true,
    unique : true
    }
    password: {
        type : String,
        require : true
    }
})

const AccountSchema = mongoose.model("Account", AccountSchema)

module.exports = AccountSchema