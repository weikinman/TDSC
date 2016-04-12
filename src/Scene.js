;(function(){
    var core = require("./core.js");
    var DisplayContainer = require("./DisplayContainer.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var Scene = function(data){
        data = data || {};
        DisplayContainer.call(this,data);
    }
    
    core.inherite(Scene,DisplayContainer);
    
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.ext(Scene.prototype,{
        toString : function(){
            return '{"x":"'+this.x+'","y":"'+this.y+'","w":"'+this.w+'","h":"'+this.h+'"}';
        }
        
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = Scene;
    }else{
        defne(function(){
            return Scene;
        });
    }
    
})();