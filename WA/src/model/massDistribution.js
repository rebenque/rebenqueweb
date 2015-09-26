var Constants = require("../utils/constants");

function massDistribution(h_cg, dr_cg, wb) {
    /* Construction */
    this.height_cg = h_cg;
    this.distance_cg_rear_axle = dr_cg;
    this.wheel_base = wb;
    this.height_cg_adim = this.height_cg / this.wheel_base;
    this.distance_cg_adim = this.distance_cg_rear_axle / this.wheel_base;
    /* State */
    this.normal_reaction_rear;
    this.normal_reaction_front;
    this.friction_force_rear;
    /* Interface */
    this.calculateNormalRear = function(u_point,M,D) {
        var sum1 = ( M*u_point + D ) * this.height_cg_adim;
        var sum2 = ( M*Constants.G_g ) * ( 1.0 - this.distance_cg_adim );
        this.normal_reaction_rear = sum1 + sum2;
    };
    this.calculateNormalFront = function(u_point,M,D) {
        var sum1 = - ( M*u_point + D ) * this.height_cg_adim;
        var sum2 = ( M*Constants.G_g ) * this.distance_cg_adim;
        this.normal_reaction_front = sum1 + sum2;
    };
    this.calculateFrictionForceRear = function(M,mu,mu_rr) {
        var aux = ( 1.0 / mu ) - this.height_cg_adim;
        var prod = M * Constants.G_g;
        prod *= 1.0 / aux;
        prod *= 1.0 - this.distance_cg_adim - (this.height_cg_adim * mu_rr);
        this.friction_force_rear = prod;
    };

}

module.exports = massDistribution;