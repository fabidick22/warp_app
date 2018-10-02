var Injector = require('../../lib/warp-drive/Injector');
var Motor = require('../../lib/warp-drive/Motor');

var list_inyect = process.argv[2].split(",").map(function(item) {
    return parseInt(item, 10);
});
var speed = process.argv[3];
let inyectores = [];

for (let i=0; i<list_inyect.length; i++){
    inyectores.push(new Injector(list_inyect[i]));
}

let motor = new Motor(inyectores, speed);
motor.resumen_estado_nave();