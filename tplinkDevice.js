/**
 * The module exports are used by the [thing-it-node].
 * the first couple before state are mandatory for the device.
 *
 * State will be shown in many default screens and can very easily
 * be accessed in the HTML UI and other places.
 *
 * Services will be exposed in UIs as invocable by the user
 * and they will be exposed for orchestration.
 *
 * Configuration will be displayed when adding a device
 * on www.thing-it.com and in allows the device to access
 * the users' values during device creation on www.thing-it.com
 *
 */

module.exports = {
    metadata: {
        family: "tplink",
        plugin: "tplinkDevice",
        label: "TP Link Device",
        tangible: true, 
        discoverable: true, 
        state: [],
        actorTypes: [],
        sensorTypes: [],
        services: [],
        configuration: []
    },

    /**
     * Invoked during start up to create the instance of
     * device for this specific device.
     *
     */
    create: function (device) {
        return new TpLinkDevice();
    },

    /**
     * Discovery is an advanced function we don't need at the moment
     *
     */
    discovery: function (options) {
        var discovery = new TpLinkDeviceDiscovery();
        discovery.options = options;
        return discovery;
    }
};


var q = require('q');

/**
 * Discovery is an advanced function we don't need at the moment
 *
 */
function TpLinkDeviceDiscovery() {
    /**
     *
     */
    TpLinkDevicegDiscovery.prototype.start = function () {
    };

    /**
     *
     */
    TpLinkDeviceDiscovery.prototype.stop = function () {
    };
}

/**
 *
 */
function TpLinkDevice() {


    /**
     * - Makes initial call to device
     * - Sets up update every n minutes
     * - Simulation mode isn't implemented for this device
     */
    TpLinkDevice.prototype.start = function () {
        var deferred = q.defer();

        this.logInfo("Starting up TP Link device.");

        deferred.resolve();
        return deferred.promise;
    };

   

   

}