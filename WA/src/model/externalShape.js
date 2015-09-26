function externalShape(S,Cx) {
    /* Construction */
    this.frontal_surface = S;
    this.drag_coefficient = Cx;
    /* State */
    this.drag;
    /* Interface */
    this.calculateDrag = function(rho_local,u) {
        // Rho is global variable...
        var dynamic_pressure = 0.5 * rho_local * Math.pow(u,2.0);
        this.drag = dynamic_pressure *
        this.frontal_surface *
        this.drag_coefficient;
    };
}


module.exports = externalShape;