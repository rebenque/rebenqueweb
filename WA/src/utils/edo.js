var Constants = require('./constants');
var _ = require('lodash');

function from_rpm2thrust(car_object, rpm_0) {
    car_object.engine.accelerate(rpm_0);
    car_object.gear_box.calculateTransmissionRatio();
    car_object.gear_box.calculateAxleOutput(car_object.engine.n,
                                            car_object.engine.Torque);
    car_object.calculateThrust();
}

function calculate_step(car_object) {
    car_object.calculateVelocity();
    car_object.external_shape.calculateDrag(Constants.G_rho,car_object.velocity);
    car_object.calculateAcceleration();
}

// Here states can be a return object
// callback is a function that will be call once the process is done
function EDO(params, car_object, states, callback) {
    if (!states) {
        states = [];
    }

    if (!params) {
        params = {};
    }

    // Default value of params
    _.defaults(params, {
        targetSpeed: 100, // [km/h]
        changeGear: 6900 // [rpm] control law
    });

	/*
     * Set initial state (engine to idle, etc.)
     *   and calculate velocity
     */
    car_object.wheel.calculateWheelRadius();
    car_object.calculateRollingResistance();
    car_object.engine.setToIdle();
    var gear = 1;
    car_object.gear_box.chooseGear(gear);
    from_rpm2thrust(car_object,car_object.engine.n);
    // Initial condition
    car_object.setSlipRatio(0.0); // Assumption for initial condition
    calculate_step(car_object);
    car_object.calculateMaxFrictionForce();

    car_object.setSlipRatio(); // Set SR[i=0]
    if (car_object.wheel.isSlipping) {
        calculate_step(car_object);
        car_object.calculateMaxFrictionForce();    	
    }
    var t = [];
    var u = [];
    var u_point = [];
    var SR_array = [];
    t[0] = Constants.G_t;
    u[0] = car_object.velocity;
    u_point[0] = car_object.acceleration;
    SR_array[0] = car_object.wheel.isSlipping;    
	/*
     * Solve EDO
     */
    var targetSpeed = params.targetSpeed * Constants.G_km_h2m_s;
    for (var i = 0 ; u[i] <= targetSpeed ; i++) {
    	if (i != 0) {
    		car_object.calculateEngineVelocity(u[i]);
    	}
    	console.log("rpm are ",car_object.engine.n);
        console.log("gear is ",car_object.gear_box.gear + 1);
        console.log("wheel is slipping?",car_object.wheel.isSlipping);
        console.log("thrust is",car_object.thrust);
        console.log("max friction is",car_object.max_friction_force);
        console.log("max seed friction is",car_object.max_friction_force_estimate);
        console.log("acceleration is",car_object.acceleration);

        // Calculate state i+1
        t[i+1] = t[i] + Constants.delta_t;
        u[i+1] = u[i] + (u_point[i] * Constants.delta_t);

        // A better idea will be to create car states separate from the model. A car state will be immutable,
        // therefore, to get a different state, you will create a new state
        states.push(_.cloneDeep(car_object));

        car_object.calculateEngineVelocity(u[i+1]);
        from_rpm2thrust(car_object,car_object.engine.n);
        calculate_step(car_object);
        car_object.calculateMaxFrictionForce();
        // Set SR[i+1]
        car_object.setSlipRatio();
        SR_array[i+1] = car_object.wheel.isSlipping;
        console.log("[i+1]: thrust is ",car_object.thrust);
        console.log("[i+1]: max friction is ",car_object.max_friction_force);
        console.log("[i+1]: rpm are ",car_object.engine.n);
        console.log("[i+1]: wheel is slipping?",car_object.wheel.isSlipping);
        if (car_object.engine.n >= params.changeGear) {
            gear++;
            car_object.gear_box.chooseGear(gear);
            car_object.calculateEngineVelocity(u[i+1]);
            from_rpm2thrust(car_object,car_object.engine.n);
            calculate_step(car_object);
            car_object.calculateMaxFrictionForce();
            car_object.setSlipRatio();
            SR_array[i+1] = car_object.wheel.isSlipping;
        }
        
        // set i+1 = i for the next iteration
        u_point[i+1] = car_object.acceleration;
    }

	/*
     * Write results
     */    
    var v_km_h = targetSpeed * Constants.G_m_s2km_h;
    var result = t.pop();
    var msg = "The car takes " + result + " seconds to reach " + v_km_h + " km/h";
    console.log(msg);
    //console.log("module object is ",module);

    // Sanity check
    if (callback && _.isFunction(callback)) {

        // Normally the first parameter is used for errors
        callback(
            undefined,
            {
                result: result,
                speed: u.pop() * Constants.G_m_s2km_h,
                states: states
            }
        );
    }
}

module.exports = EDO;