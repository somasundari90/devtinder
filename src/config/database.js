const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://somaanand295:ChiruNandu1810@namastenode.sbttr.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
