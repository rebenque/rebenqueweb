var Utils = require("../utils/utils"),
    Constants = require("../utils/constants");

function engine(n_array,Torque_array) {
    /* Construction */
    this.n_array = n_array;
    this.Torque_array = Torque_array;
    /* State */
    this.n;
    this.Pow;
    this.Torque;
    /* Interface */
    this.setToIdle = function() {
        //n_array.sort(function(a, b){return a-b});
        //Torque_array.sort(function(a, b){return a-b});
        this.n = this.n_array[0];
        this.Torque = this.Torque_array[0];
    };
    this.accelerate = function(target_n) {
        // Find interval
        var i = 0;
        while (this.n_array[i] <= target_n) {i++;}
        // Linear interpolation
        var y = Utils.interpolate(target_n,
            this.n_array[i-1],
            this.Torque_array[i-1],
            this.n_array[i],
            this.Torque_array[i]);
        // Output
        this.n = target_n;
        this.Torque = y;
    };
    this.calculatePower = function() {
        this.Pow = this.Torque * this.n * Constants.G_rpm2rad_s;
    };
}

module.exports = engine;