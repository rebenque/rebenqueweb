var Constants = require("../utils/constants");

function wheel(width,sidewall,rim_diameter,mu_max,mu_rr) {
    /* Construction */
    this.width = width;
    this.sidewall = sidewall;
    this.rim_diameter = rim_diameter;
    this.mu_max = mu_max;
    this.mu_rr = mu_rr;
    /* State */
    this.radius;
    this.slip_ratio;
    this.isSlipping;
    /* Interface */
    this.calculateWheelRadius = function() {
        // SI units
        var width = this.width * Constants.G_mm2m;
        var sidewall = this.sidewall * width / 100.0;
        var rim_diameter = this.rim_diameter * Constants.G_in2m;
        // Wheel radius
        this.radius = sidewall + (rim_diameter / 2);
    };
}

module.exports = wheel;