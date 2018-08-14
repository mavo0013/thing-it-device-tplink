module.exports = {
    "label": "Default",
    "id": "default",
    "autoDiscoveryDeviceTypes": [],
    "devices": [
        {
            "plugin": "tplink/tplinkDevice",
            "actors": [
                {
                "id": "plug",
                "label": "TP Link Plug",
                "type": "plug",
                "logLevel": "debug",
                "configuration": {
                    "ip": "192.168.0.57",
                    "updateFrequencySeconds" :  "10"
                }
            }
],
            "sensors": [],
            "services": [],
            "class": "Device",
            "id": "plug",
            "label": "TP Link Plug",
            "configuration": {}
        }],
    "services": [],
    "eventProcessors": [],
    "groups": [],
    "jobs": [],
    "data": []
};