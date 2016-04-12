(function(root){
    "use stric"
    
    var Event = new function(){
        this.addEvent = function(ele,type,cbk,bubl){
            if(document.addEventListener){
                ele.addEventListener(type,cbk,bubl||false);
            }
        }
        this.removeEvent = function(ele,type,cbk,bubl){
            if(document.removeEventListener){
                ele.removeEventListener(type,cbk,bubl||false);
            }
        }
    }
    
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Event;
    }else if(typeof define !== "undefined"){
        define(function(){return Event});
    }
})(window || this);