/*
 * Static functions. Utilities 
 * Created by JdB
 * Arranged by Igbopie on 7/19/15
 */

function interpolate(x,xa,ya,xb,yb) {
    // Linear interpolation
    var slope = ( yb - ya ) / ( xb - xa );
    var y = ya + slope * ( x - xa );
    return y;
}

//module.exports = {};
module.exports.interpolate = interpolate;