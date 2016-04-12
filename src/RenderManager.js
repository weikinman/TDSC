;(function(){
    var core = require("./core.js");
    var Graphse = require("./Graph.js");
    /**
     * 
     * @param {object} [data={] [[Description]]
     */
    var RenderManager = function(data){
        data = data || {};
        
        this.createCanvas = function(id,w,h,parent){
            var canvas = document.createElement("canvas");
            canvas.id = id;
            canvas.width = w;
            canvas.height = h;
            canvas.innerHTML = "not support canvas";
            if(parent){
                parent.append(canvas);
            }else{
                document.body.appendChild(canvas);
            }
            return canvas;
        }
        
        var container = data.container || document.body;
        var cvs = this.createCanvas(data.canvasid,data.w,data.h,data.container);
        var ctx = cvs.getContext("2d");
        var g = new Graphse(ctx);
        this.getCanvas = function(){
            return cvs;
        }
        var renderStyle = data.renderStyle || {};
        this.isSort = false;
        var self = this;
        function render(cx,cs,rs,issort){
            if(!cs){
                return false;
            }
            ctx.clearRect(0,0,cvs.width,cvs.height);
            //ctx.save();
            if(cs.children.length>0){
                for(var i=0,len=cs.children.length;i<len;i++){
                    //console.log(cs.children[i])
                    if(cs.children[i].onRender){
                        ctx.save();
                        ctx.translate(cs.children[i]._transfromX,cs.children[i]._transfromY);
                        //console.log(cs.children[i])
                        
                        cs.children[i].onRender(cx);
                    }else if(cs.children[i].children.length>0){
                        renderChild(cs.children[i].children,cx);
                    }
                    ctx.restore();
                }
            }
        }
        
        function renderChild(child,cx){
            for(var i=0,len=child.length;i<len;i++){
                    //console.log(cs.children[i])
                    if(child[i].onRender){
                        //console.log(child[i]._transfromX,child[i]._transfromY);
                        ctx.save();
                        ctx.translate(child[i]._transfromX,child[i]._transfromY);
                        child[i].onRender(cx);
                        ctx.restore();
                    }
                    if(child[i].children.length>0){
                        renderChild(child[i].children,cx)
                    }
                }
        }
        
        this.render = function(scene){
            var cx = ctx,cs=scene,rs=renderStyle,issort=this.isSort;
            render(cx,cs,rs,issort);
        }
    }
    /**
     * 扩展
     * @param {object} [data={] [[Description]]
     */
    core.ext(RenderManager.prototype,{
        toString : function(){
            return '{"x":"'+this.x+'","y":"'+this.y+'","w":"'+this.w+'","h":"'+this.h+'"}';
        }
        
    });
    
    
    if(typeof module !== "undefine" && module.exports){
        module.exports = RenderManager;
    }else{
        defne(function(){
            return RenderManager;
        });
    }
    
})();