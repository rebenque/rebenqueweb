var CAR_MODELS = {
        PORSCHE_TURBO_2014: "PORSCHE_TURBO_2014"
    },
    PorscheTurbo2014 = require("./cars/porscheTurbo2014");


module.exports.CAR_MODELS = CAR_MODELS;
module.exports.getCar = function (model) {
    switch (model) {
        case CAR_MODELS.PORSCHE_TURBO_2014:
            return PorscheTurbo2014.getCar();
        default:
            return undefined;
    }
};