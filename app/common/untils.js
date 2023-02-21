const moment = require("moment");

function momentTime(time) {
  return moment(time).format("YYYY-MM-DD,hh:mm:ss");
}

module.exports = {
  momentTime,
};
