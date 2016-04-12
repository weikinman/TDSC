;(function(){
    var core = require("./core.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var RectAngel = function(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.ext(RectAngel.prototype,{
        toString : function(){
            return '{"x":"'+this.x+'","y":"'+this.y+'","w":"'+this.w+'","h":"'+this.h+'"}';
        },
        clone:function(){
          return new RectAngel(this.x,this.y,this.w,this.h);  
        },
        getRight: function(){
            return this.x+this.w;
        },
        getBottom:function(){
            return this.y+this.h;
        },
        contain:function(x,y){
            if(this.x>x || this.x+this.w<x)return false;
            if(this.y>x || this.y+this.h<y)return false;
            return true;
        }
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = RectAngel;
    }else{
        defne(function(){
            return RectAngel;
        });
    }
    
})();