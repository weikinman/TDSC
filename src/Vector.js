(function(){
    var Vector = function(x,y){
        this.x = x;
        this.y = y;
    }
    
    Vector.prototype = {
        constructor:Vector,
        dotProduct:function(x,y){
            return this.x*x+this.y*y;
        },
        clone:function(){
            return new Vector(this.x,this.y);
        },
        dotSum:function(x,y){
            return {x:this.x+x,y:this.y+y};
        }
        
    }

    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Vector;
    }else if(typeof define !== "undefined"){
        define(function(){return Vector});
    }else{
        window.Vector = Vector;
    }
})();