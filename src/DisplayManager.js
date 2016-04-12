;(function(){
    var core = require("./core.js");
    var RectAngel = require("./RectAngel.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var DisplayManager = function(data){
        data = data || {};
        this.__seq = data.index || core._index;
        this._roIndex = "ro_"+this.__seq;
        
        this.name = data.name || this._roIndex;
        
        this._visible = data.visible || true;
        this._opacity = data.opacity || 1;
        this.blendMode = data.blendMode||'source-over';
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.w = data.w || 0;
        this.h = data.h || 0;
        
        this.originX = data.originX || 0;
        this.originY = data.originY || 0;
        this.skewX = data.skewX;
        this.skewY = data.skewY;
        this.scaleX = data.scaleX;
        this.scaleY = data.scaleY;
        this.rotateX = data.rotateX;
        this.rotateY = data.rotateY;
        
        this.bounds = data.bounds || new RectAngel(0,0,this._w,this._h);
        
        this._transfromX = data.transformX || 0;
        this._transfromY = data.transformY || 0;
        
        this._z = data.z || 0;
        this.body = null;
    }
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.ext(DisplayManager.prototype,{
        toString : function(){
            return '{"name":"'+this.name+'","roIndex":"'+this._roIndex+'"}';
        },
        updateTransform:function(){
            var x = this.x;
            var y = this.y;
            this.originX=this._transfromX;
            this.originY=this._transfromY;
           // console.log(this)
            return this;
        },
        moveBy:function(x,y){
            var a = x || 0;
            var b = y || 0;
            this.x += a;
            this.y += b;
            return this;
        },
        moveTo:function(x,y){
            var a = x || 0;
            var b = y || 0;
            this.x = a;
            this.y = b;
            return this;
        },
        originTo:function(x,y){
            var a = x || 0;
            var b = y || 0;
            this.originX += a;
            this.originY += b;
            return this;
        },
        originBy:function(x,y){
            var a = x || 0;
            var b = y || 0;
            this.originX = a;
            this.originY = b;
            return this;
        },
        opacityBy:function(o){
            var a = o || 0;
            this.opacity+=a;
            if(this.opacity>1){
                this.opacity=1;
            }
            if(this.opacity<0){
                this.opacity=0;
            }
        },
        opacityTo:function(o){
            var a = o || 0;
            this._opacity=a;
            if(this.opacity>1){
                this.opacity=1;
            }
            if(this.opacity<0){
                this.opacity=0;
            }
        },
        skewBy:function(x,y){
            this.skewX +=x;
            this.skewY +=y;
            return this;
        },
        skewTo:function(x,y){
            this.skewX =x;
            this.skewY =y
            return this;
        },
        rotateBy:function(x,y){
            this.rotateX +=x;
            this.rotateY +=y;
            return this;
        },
        rotateTo:function(x,y){
            this.rotateX =x;
            this.rotateY =y;
            return this;
        },
        scaleBy:function(x,y){
            this.scaleX +=x;
            this.scaleY+=y;
            return this;
        },
        scaleTo:function(x,y){
            this.scaleX =x;
            this.scaleY =y;
            return this;
        }
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = DisplayManager;
    }else{
        defne(function(){
            return DisplayManager;
        });
    }
    
})();