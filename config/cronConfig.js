const Contrat = require("../models/Contrat")

cron.schedule('* * * *', () => {
    console.log('running a task every day');
    Contrat.find({})
  });