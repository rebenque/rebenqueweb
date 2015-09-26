var Engine = require("./engine"),
    GearBox = require("./gearBox"),
    Wheel = require("./wheel"),
    ExternalShape = require("./externalShape"),
    MassDistribution = require("./massDistribution"),
    Constants = require("../utils/constants");

function car(M,
             rpm,tor,
             gear_ratios,final_group_ratio,eta_trans,
             width,sidewall,rim_diameter,mu_max,mu_rr,
             front_surf,drag_coeff,
             h_cg, dr_cg, wb) {
    /* Construction */
    this.mass = M;
    this.engine = new Engine(rpm,tor);
    this.gear_box = new GearBox(gear_ratios,final_group_ratio,eta_trans);
    this.wheel = new Wheel(width,sidewall,rim_diameter,mu_max,mu_rr);
    this.external_shape = new ExternalShape(front_surf,drag_coeff);
    this.mass_distribution = new MassDistribution(h_cg, dr_cg, wb);
    /* State */
    this.max_friction_force_estimate;
    this.max_friction_force;
    this.rolling_resistance;
    this.thrust;
    this.velocity;
    this.acceleration;

    /* Interface */
    this.calculateThrust = function() {
        this.thrust = this.gear_box.Torque_axle / this.wheel.radius;
    };

    this.calculateRollingResistance = function () {
        this.rolling_resistance = this.wheel.mu_rr * this.mass * Constants.G_g;
    };

    this.calculateMaxFrictionForce = function() {
        this.mass_distribution.calculateFrictionForceRear(this.mass,
            this.wheel.mu_max,
            this.wheel.mu_rr);
        this.max_friction_force_estimate = this.mass_distribution.friction_force_rear;
        this.mass_distribution.calculateNormalRear(this.acceleration,
        										   this.mass,
        										   this.external_shape.drag);
        this.max_friction_force = this.mass_distribution.normal_reaction_rear *
        						  this.wheel.mu_max;
    };

    this.calculateVelocity = function() {
        var v = this.gear_box.n_axle * Constants.G_rpm2rad_s;
        v *= this.wheel.radius / (1.0 + this.wheel.slip_ratio);
        this.velocity = v;
    };

    this.calculateEngineVelocity = function(V) {
        if (V === undefined) {
            V = this.velocity;
        }
        var rpm_engine = V * (1.0 + this.wheel.slip_ratio) / this.wheel.radius;
        rpm_engine *= this.gear_box.transmission_ratio;
        rpm_engine *= Constants.G_rad_s2rpm;
        this.engine.n = rpm_engine;
    };

    this.calculateAcceleration = function() {
        var mu;
        var num_dcg = 1.0;
        var den_hcg = 1.0;
        if (this.wheel.isSlipping) {
            mu = this.wheel.mu_max;
            num_dcg -= this.mass_distribution.distance_cg_adim;
            den_hcg -= mu * this.mass_distribution.height_cg_adim;
        }
        else {
            mu = this.thrust / ( this.mass * Constants.G_g);
        }
        var result = mu * Constants.G_g * num_dcg / den_hcg;
        result -= this.external_shape.drag / this.mass;
        result -= this.rolling_resistance / (this.mass * den_hcg);
        this.acceleration = result;
    };

    this.setSlipRatio = function(SR) {
        if (SR === undefined) {
            if (this.thrust > this.max_friction_force ) {
                this.wheel.slip_ratio = Constants.SR_mu_max;
                this.wheel.isSlipping = true;
            }
            else {
                this.wheel.slip_ratio = 0.0;
                this.wheel.isSlipping = false;
            }
        }
        else {
            this.wheel.slip_ratio = SR;
            this.wheel.isSlipping = true;
            if ( SR == 0.0) {
                this.wheel.isSlipping = false;
            }
        }
    };
}

module.exports = car;