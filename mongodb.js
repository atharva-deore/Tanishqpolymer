const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/LoginInfo2');
  console.log("we are connected Baby !");
}

const loginschema = new mongoose.Schema({
  email:String,
    password:String
})

const user = mongoose.model("user",loginschema)

module.exports=user;