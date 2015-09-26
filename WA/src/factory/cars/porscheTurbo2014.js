var Car = require("../../model/car");


// Car's mass
var M = 1669.83; // [kg]


// rpm of engine
var n = []; // javascript empty array
var n = [
    1000.0,
    1500.0,
    2000.0,
    2500.0,
    3000.0,
    3500.0,
    4000.0,
    4500.0,
    5000.0,
    5500.0,
    6000.0,
    6500.0,
    7000.0
];

// Torque of engine in [Nm]
var Torque = []; // javascript empty array
var Torque = [
    305.0,
    485.0,
    660.0,
    660.0,
    660.0,
    660.0,
    660.0,
    660.0,
    660.0,
    630.0,
    610.0,
    560.0,
    500.0
];

// Gears' ratio
var gears = []; // javascript empty array
var gears = [
    3.909E+00,
    2.286E+00,
    1.577E+00,
    1.182E+00,
    9.4E-01,
    7.86E-01,
    6.22E-01,
    3.545E+00 // Reverse
];

// Final drive ratio
var final_drive_ratio = 3.44;

// Efficiency of the transmission
var eta_transmission = 0.94;//0.98

// Tyre width
var width = 305; // [mm]

// Tyre sidewall height
var sidewall = 30; // [% width]

// Rim radii
var rim_diameter = 20; // [inches]

// Tyre's maximum friction coefficient (assuming a small slip ratio) 
var mu_max = 1.0;

// Tyre's rolling resistance coefficient
var mu_rr = 0.0062;//0.0062

// Frontal surface
var S = 2.07; // [m]

// Drag coefficient
var Cx = 0.31;

// Height of centre of gravity
var height_cg = 0.7; // [m]

// Distance of centre of gravity to rear axle
var distance_cg_rear_axle = 1.029; // [m]

// Wheel base
var wheel_base = 2.45; // [m]

module.exports.getCar = function () {
    var PorscheTurbo2014 = new Car(
        M,
        n,
        Torque,
        gears,
        final_drive_ratio,
        eta_transmission,
        width,
        sidewall,
        rim_diameter,
        mu_max,
        mu_rr,
        S,
        Cx,
        height_cg,
        distance_cg_rear_axle,
        wheel_base);

    return PorscheTurbo2014;
};