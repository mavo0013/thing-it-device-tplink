module.exports = {
    metadata: {
        plugin: "plug",
        label: "TP Link Plug",
        role: "actor",
        family: "plug",
        deviceTypes: ["tplink/tplinkDevice"],
        services: [{
            id: "powerOn",
            label: "Power On"
        },
        {
            id: "powerOff",
            label: "Power Off"
        },
        {
            id: "powerToggle",
            label: "Power Toggle"
        }],
        state: [
            {
                id: "powerState",
                label: "Power State",
                type: {
                    id: "integer"
                }
            }],
        configuration: [
            {
                id: "ip",
                label: "IP address",
                type: {
                    id: "string"
                }
            }, {
                id: "updateFrequencySeconds",
                label: "Update Frequency Seconds",
                type: {
                    id: "integer"
                },
                defaultValue: "60"
            }
        ]
    },
    create: function () {
        "use strict";
        return new Plug();
    }
};

var q = require('q');
const { Client } = require('tplink-smarthome-api');
const client = new Client();

/**
 *
 */
function Plug() {
    "use strict";
     /**
     * - Makes initial call to plug
     * - Sets up update every n minutes
     * - Simulation mode isn't implemented for this device
     */
    Plug.prototype.start = function () {
        var deferred = q.defer();

        //this.logLevel = 'debug';
        this.isSubscribed = false;

        // Initialize state values
        this.state = {
            powerState: 0,
        };

        this.configError = false;

        if ((typeof this.configuration.ip === undefined ) || !this.configuration.ip || this.configuration.ip.length < 4) {
            this.logError("No IP or wrong IP format!");
            this.configError = true;
        }
        if ((typeof this.configuration.updateFrequencySeconds === undefined ) || !this.configuration.updateFrequencySeconds || (0 == this.configuration.updateFrequencySeconds)) {
            this.configuration.updateFrequencySeconds = 10;
        }

        this.logDebug("Configuration", this.configuration);

        if (this.isSimulated()) {
            // ignore, all we need is an internet connection.
        }

        this.logInfo("Starting up TP Link plug.");

        this.getPowerState();
        this.updateInterval = setInterval(function () {
            this.getPowerState()
        }.bind(this), this.configuration.updateFrequencySeconds * 1000); 
        deferred.resolve();
        return deferred.promise;
    };

    /**
     *
     */
    Plug.prototype.stop = function () {
        this.logDebug('Stopping.');
        var deferred = q.defer();

        clearInterval(this.updateInterval);

        return deferred.promise;
    };

    /**
     * - Connects to OpenWeatherMap
     * - Sets the status
     */
    Plug.prototype.getPowerState = function () {
        var deferred = q.defer();

        if (this.configError) {
            this.logError("Configuration error - cannot retrieve weather info.");
        } else {
            this.logInfo("Requesting powerstate");

            //this.logDebug("Polling powerstate.", this.configuration);

            var ip = this.configuration.ip;
            this.logDebug("Request IP", ip);

            
            
            const plug = client.getDevice({host: ip}).then((device)=>{
                //device.getSysInfo().then(console.log);
                var result = device.getPowerState().then((erg) => {
                    console.log("result:" + erg);
                    this.state = {
                        powerState: erg
                    }
                    this.publishStateChange(); 
                });
                
                
                deferred.resolve();
            });
        }
            
        return deferred.promise;
    };


    /**
     *
     */
    Plug.prototype.powerOn = function () {
            
        var ip = this.configuration.ip;

        const plug = client.getDevice({host: ip}).then((device)=>{
            //device.getSysInfo().then(console.log);
            var result = device.setPowerState(true).then(console.log);
            // this.state = {
            //     powerState: result
            // }
        });
    }

    Plug.prototype.powerOff = function () {
            
        var ip = this.configuration.ip;

        const plug = client.getDevice({host: ip}).then((device)=>{
            //device.getSysInfo().then(console.log);
            var result = device.setPowerState(false).then(console.log);
            // this.state = {
            //     powerState: result
            // }
        });
    }

    Plug.prototype.powerToggle = function () {
            
        var ip = this.configuration.ip;
        
        const plug = client.getDevice({host: ip}).then((device)=>{
            //device.getSysInfo().then(console.log);
            var result = device.togglePowerState().then(console.log);
            // this.state = {
            //     powerState: result
            // }
        });
        //TODO
    }


    

    /**
     *
     */
    Plug.prototype.setState = function (state) {
        this.state = state;

        this.publishStateChange();
    };

    /**
     *
     */
    Plug.prototype.getState = function () {
        return this.state;
    };

}
