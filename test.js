var TDSC = {};
TDSC.core = require("./src/core.js");

//test core
function ClassA(){}
function ClassB(){}
ClassA.prototype.show = function(){console.log("ClassA");}
TDSC.core.inherite(ClassB,ClassA);
console.log(new ClassA());
var obj1 = {dsf:32432,ff:4444}, obj2={ff:3232,ji:{jdi:5344,mk:2332,uu:{fc:23,qq:"wefe"}}}
TDSC.core.ext(obj1,obj2);
console.log(obj1);