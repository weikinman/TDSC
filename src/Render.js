;(function(){
    var core = require("./core.js");
    var DisplayContainer = require("./DisplayContainer.js");
    var RenderManager = require("./RenderManager.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var Render = function(data){
        data = data || {};
        DisplayContainer.call(this,data);
        var self = this;
        this.renderer = new RenderManager({
            canvasid:data.id,
            w:data.w,
            h:data.h,
            issort:data.issort,
            container:data.container
        });
        var count = 0;
        //console.log(this.renderer)
        this.start = function(scene){
            run(function(){
                //console.log(123)
                self.renderer.render(scene);
            });
        }
        
        var rafTag = null;
        function run(fun){
            
            rafTag=requestAFrame(function(t){
                //console.log(t)
                fun();
                run(fun);
            })
        }
        
    }
    
    //core.inherite(Render,DisplayContainer);
    
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.ext(Render.prototype,{
        toString : function(){
            return '{"x":"'+this.x+'","y":"'+this.y+'","w":"'+this.w+'","h":"'+this.h+'"}';
        }
        
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = Render;
    }else{
        defne(function(){
            return Render;
        });
    }
    
})();