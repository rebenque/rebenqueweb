var CarFactory = require("./factory/carFactory");
var EDO = require("./utils/edo");



//TODO: Extrapolation from 0 km/h to u1
//TODO: Control law (gear change) -> ok
//TODO: EDO -> ok
//TODO: adim
//TODO: GUI


function placeHolder(params, states, callback) {

	var PorscheTurbo2014 = CarFactory.getCar(CarFactory.CAR_MODELS.PORSCHE_TURBO_2014);
	EDO(params, PorscheTurbo2014, states, callback);

}

module.exports = {};
module.exports.exec = placeHolder;
