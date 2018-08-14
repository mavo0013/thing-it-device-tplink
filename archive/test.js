const { Client } = require('tplink-smarthome-api');
 
const client = new Client();

const plug = client.getDevice({host: '192.168.0.57'}).then((device)=>{
  
  device.setPowerState(false);
  device.getSysInfo().then(console.log);
});
 
