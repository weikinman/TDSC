;(function(){
    var core = require("./core.js");
    var DisplayManager = require("./DisplayManager.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var DisplayContainer = function(data){
        data = data || {};
        DisplayManager.call(this,data);
        this.parent = null;
        this.children = [];
        
    }
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.inherite(DisplayContainer,DisplayManager);
    core.ext(DisplayContainer.prototype,{
        
        add:function(){
            for(var i=0,len = arguments.length; i<len ; i++){
                var child = arguments[i];
                if(child.parent)continue;
                this.children.push(child);
                child.parent = this;
                //if(this.parent){
               
                    child._transfromX = this.x;
                    child._transfromY = this.y;
               // }
            }
            return this;
        },
        remove:function(){
            for(var i=0,len = arguments.length; i<len ; i++){
                var child = arguments[i];
                var index = this.children.indexOf(child);
                if(index<0)continue;
                this.children.splice(index,1);
                child.parent = null;
            }
            return this;
        },
        find:function(filter,isloop){
            if(this.children.length===0)return [];
            var res = [];
            if(isloop){
                !function(parent){
                    for(var i=0,len=parent.children.length;i<len;i++){
                        var c = parent.children[i];
                        if(filter(c)){
                            res.push(c)
                        }
                        if(c.children && c.children.length>0){
                            arguments.callee(c);
                        }
                    }
                }(this);
            }else{
                return this.children.filter(filter,this);
            }
        },
        clear:function(){
            for(var i=0,len=this.children.length;i<len;i++){
                this.children[i].parent = null;
            }
            this.children = [];
        }
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = DisplayContainer;
    }else{
        defne(function(){
            return DisplayContainer;
        });
    }
    
})();