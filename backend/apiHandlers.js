const opencage = require("opencage-api-client");

require("dotenv").config();
const {OPENCAGE_API_KEY} = process.env;

const changeAddress = (address) => {
  const requestObj = {
    key: '5ed289fbdbb74132aac58eee3596d6aa',
    q: address,
  };

  return opencage
    .geocode(requestObj)
    .then((res) => {
      let place = res.results[0];
      return place.geometry;
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = { changeAddress }
