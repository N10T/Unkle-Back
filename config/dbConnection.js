const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Yay connected to the DB ! ${x.connection.name}`);
  })
  .catch((error) => {
    console.error(`Error connecting to the DB ${error}`);
  });
