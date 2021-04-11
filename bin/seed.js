require("dotenv").config();
const mongoose = require("mongoose");
const Option = require("../models/Option");

const options = [
  { name: "tout risque", description: "lorem" },
  { name: "vol uniquement", description: "" },
  { name: "incendie uniquement", description: "" },
  { name: "cambriolage", description: "" },
  { name: "évènement météorologique", description: "" },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(`Yay connected to the DB ! ${x.connection.name}`);
    try {
      const res = await Option.create(options);
      console.log(res);
      console.log(`${res.length} options created !`);
      await mongoose.connection.close();
      console.log(`connection closed`);
    } catch (error) {
      console.error(error);
      console.error(`options not created !`);

    }
  })
  .catch((error) => {
    console.error(`Error connecting to the DB ${error}`);
  });
