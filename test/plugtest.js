var q = require('q');
var assert = require("assert");


describe('[thing-it] Plugtest', function () {
    var testDriver;
    var initialState;
    var lastState;

    before(function () {
        testDriver = require("thing-it-test").createTestDriver({logLevel: "debug"});
        testDriver.registerDevicePlugin('tplink', __dirname + "/../tplinkDevice");
        console.log("start");
        testDriver.registerUnitPlugin(__dirname + "/../default-units/plug");
        
        testDriver.start({
            configuration: require("../examples/configurationPlug.js"),
            heartbeat: 10
        });
    });

    describe('Start Configuration', function () {
        this.timeout(10000);

        it('should complete without error', function (done) {
            setTimeout(function () {
                done();
            }.bind(this), 5000);
                testDriver.start({
            configuration: require("../examples/configurationPlug.js"),
            heartbeat: 10
        });
    });
        

    });

    describe('Plug', function () {
        describe('#turnOn', function () {
            this.timeout(5000);

            it('should have turn on',
                function (done) {
                    setTimeout(function () {
                        var curState;
                        
                        testDriver.plug.plug.powerOn();
                        testDriver.plug.plug.getPowerState().then((st) => {
                            curstate = st;
                            console.log("st: " + st);
                        });;
                        
                        try {
                            assert.notEqual(curstate, undefined, 'currentState undefined');
                            assert.notEqual(curstate, false, 'did not power on');
                            done();
                        } catch (err) {
                            console.log('ERROR DEBUG plugtest: Error during power on');
                            done(err);
                        }
                    }, 4000);
                });
        });

    })


    after(function () {
        //testDriver.stop();
    });
});






//-------------------------
// Tests without using MochaJs



/**
 * This test file allows to run the basic initiation of the
 * HellowWorld class. It does not, however, simulate full
 * interaction with the node.
 */

// var Plug = require('../plug');

// var plug = Plug.create({});

// plug.isSimulated = function () {
//     return false;
// };
// plug.configuration = {
//     ip: "192.168.0.57",
//     updateFrequencySeconds: 10,
// };
// plug.publishEvent = function(event, data){
//     console.log("Event", event);
// };

// plug.publishStateChange = function(){
//     console.log("State Change", this.getState());
// };

// plug.logInfo = function(){
//     if (arguments.length == 1 ) {
//         console.log(arguments[0]);
//     }
//     else{
//         console.log(arguments);
//     }
// }
// plug.logDebug = function(){
//     plug.logInfo(arguments);
// }
// plug.logError = function(){
//     plug.logInfo(arguments);
// }

// console.log("About to start");
// plug.start();
