/* Global variables (some of them to be passed on from web input) */
/* Values hardcoded here serve for testing purposes */

/*
 * Construction variables (Porsche 911 Turbo 2014)
 *   (to be passed on from web input)
 */

// Creating empty object as a container for all constants
var constants = {};

/***********************
 Global variables
 ************************/

/*
 * Physics
 */

constants.G_rho = 1.225; // [kg/m^3]
constants.G_g = 9.80665; // [m/s^2]
constants.G_t = 0.0; // [s]

/*
 * Utils
 */

constants.G_mm2m = 1e-3;
constants.G_in2m = 25.4e-3;
constants.G_rpm2rad_s = 2.0 * Math.PI / 60.0;
constants.G_rad_s2rpm = 1.0 / constants.G_rpm2rad_s;
constants.G_m_s2km_h = 3.6;
constants.G_km_h2m_s = 1.0 / constants.G_m_s2km_h;



// @jabonpie IS THIS SPECIFIC TO A CAR??
// Tyre's slip ratio when mu max occurs
constants.SR_mu_max = 0.15;

/*******************************************
 Control law
 *********************************************/

/*
 * Numerics
 */

constants.delta_t = 0.02; // [s]


module.exports = constants;

