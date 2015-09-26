var Constants = require("../utils/constants");

function gearBox(gears,final_drive_ratio,eta_transmission) {
    /* Construction */
    this.gear_ratios = gears;
    this.final_drive_ratio = final_drive_ratio;
    this.eta_transmission = eta_transmission;
    /* State */
    this.gear;
    this.n_axle;
    this.Torque_axle;
    this.axlePower;
    this.transmission_ratio;
    /* Interface */
    this.calculateTransmissionRatio = function() {
        this.transmission_ratio = this.gear_ratios[this.gear] *
                                  this.final_drive_ratio;
    };
    this.chooseGear = function(gear_choice) {
        // Including reverse gear
        /**********
         TODO: Exception handling + input checking
         ************/
        var number_of_gears = this.gear_ratios.length;
        console.log("number_of_gears is ",number_of_gears);
        if (gear_choice > number_of_gears - 1) {
            gear_choice = this.gear_ratios[0]; // 1st gear. Check this please
        }
        this.gear = gear_choice - 1;
        this.calculateTransmissionRatio();
    };
    this.calculateAxleOutput = function(n_in,Torque_in) {
        this.n_axle = n_in / this.transmission_ratio;
        this.Torque_axle = Torque_in * this.transmission_ratio;
        this.Torque_axle *= this.eta_transmission;
    };
    this.calculateAxlePower = function() {
        this.axlePower = this.Torque_axle * this.n_axle * Constants.G_rpm2rad_s;
    };
}

module.exports = gearBox;