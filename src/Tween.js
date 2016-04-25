;(function(root,un){
  
    var ext = function(obj,attrs,deep){
            if(obj == undefined || attrs == undefined){ throw new Error("args not null")}
            var i,self = this;
            if(deep){
                for( i in attrs){
                    var item = attrs[i]
                    if(typeof item === "object"){
                        obj[i] = self.ext([],item,deep);
                    }else if(attrs.hasOwnProperty(i)){
                        obj[i] = item;
                    }
                }
            }else{
                for( i in attrs){
                    if(attrs.hasOwnProperty(i)){
                        obj[i] = attrs[i];
                    }
                }
            }
        }
        
    function getObjectName(attrs){
        var res = [];
       // console.log(attrs);
        for(var i in attrs){
            if(attrs.hasOwnProperty(i)){
                res.push(i);
            }
        }
        return res;
    }
    /**
     * [[Description]]
     */
    var Tween = function(target,attrs,duration,opts){
        //保存属性的 变化，过渡的值
        this._attr = {};
        this._attr_inverse = {};//倒放
        this._attr_name;
        this.target = target;
        this.attrs = attrs;
        this.duration = duration;
        opts = opts || {};
        /** t:第几帧* b:初始值* c:变化量(end - ini)* d:总帧数*/
        this.easing = opts.easing || function(t,b,c,d){ return c*t/d + b; };
        
        this.__ratio = null;
    }
    Tween.prototype.destroy  = function(){
        this._attr = null;
        this.__ratio = null;
        this.attrs = null;
        this.easing = null;
        this.target = null;
        this.onUpdate = null;
        this.onEnd = null;
    }
    
    Tween.prototype._calc = function(un){
        var attrs = this._attr_name = getObjectName(this.attrs);
        //console.log(attrs);
        
        for(var i=0,len= attrs.length; i < len; i++){
            var attr = attrs[i];
            //获取target的属性是否有该需要变化的属性值
            var tAttr = this.target[attr];
            if(tAttr===un){continue;}
            
            //获取初始属性和结束属性
            var initVal,endVal,ingVal_inverse,ingVal;
            initVal = parseFloat(tAttr);
            
            endVal = this.attrs[attr];
            
            //判断该变化的正负值
            if(typeof initVal === "string" || typeof endVal === "string"){
                if(endVal.indexOf("-")>-1){
                    endVal = initVal - endVal.substring(1,endVal.length);
                }else if(endVal.indexOf("+")>-1){
                    endVal = initVal + endVal.substring(1,endVal.length);
                }else{
                    endVal = parseFloat(endVal);
                }
            }
            
            ingVal = endVal-initVal;
            this._attr[attr] = {'initVal':initVal,'ingVal':ingVal,'endVal':endVal};
            ingVal_inverse = initVal-endVal;
            this._attr_inverse[attr] = {'initVal':endVal,'ingVal_inverse':ingVal_inverse,'endVal':initVal};
            
        }
    }
    
    Tween.prototype.start = function(){
       
        this._calc();
         console.log(this._attr);
        this._startTime = Date.now();

        if(this.target.__tween instanceof Tween){
            this.target.__tween.stop();
        }

        this.target.__tween = this;

        TweenManager.add(this);
        return this;
    }
    
    Tween.prototype.goTo=function(target,time,un){
        var ratio,attNames=this._attr_name,attr=this._attr,t=target;
        //预计算
        if(this.cacheable){
            var phase = 'p_'+(time/10>>0)*10;
            ratio = this.__ratio[phase];
            if(phase==='p_0')ratio=0;
            if(ratio===un)ratio = 1;
            //更新参数
            for(var i=attNames.length;i--;){
                var k = attNames[i];
                if(!attr[k])continue;
                var v = attr[k].dVal[phase];
                if(v===un)v = attr[k].endVal;
                t[k] = v;
            }
        }else{
            ratio = this.easing(time,0,1,this.duration);
            console.log(attr)
            console.log(time);
            if(time>this.duration)ratio=1;
            //更新参数
            for(var i=attNames.length;i--;){
                var k = attNames[i];
                if(attr[k])
                    console.log(attr[k])
                t[k] = attr[k].initVal + attr[k].ingVal*ratio;
            }
        }
        return ratio;
    }
    
    
    Tween.prototype.update = function(now,d){
        var c = now - this._startTime;
        if(this.__delay > 0){
            this.__delay -= d;
            if(this.__delay <=0)this.__startTime = Date.now();
            return;
        }
        var t=this.target;
        
        var ratio = this.goTo(t,c);
        //console.log(ratio);
        //判断结束
        if(c>=this.duration){
            if(this.onEnd)this.onEnd(t);
            //是否循环
			if(this.iteration===-1 ||
                (this.iteration>0 && this.__loops++ < this.iteration)){
                //重新计算
                this.__startTime = Date.now();
                if(this.alternate){
                  
                    //替换属性
                    var tmp = this._attr;
                    this._attr = this._attr_inverse;
                    this._attr_inverse = tmp;
                    //替换缓存
                    tmp = this._ratio;
                    this._ratio = this._ratio_inverse;
                    this._ratio_inverse = tmp;
                }
                return;
            }
            //销毁
            this.destroy();
            TweenManager.remove(this);

            if(this.__next){
                this.__next.start();
            }

            return;
        }
        //调用更新[target,ratio]
        if(this.onUpdate)this.onUpdate(t,ratio);
    }
    
    if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
        module.exports = Tween;
    }else if(typeof define !== "undefined"){
        define(function(){
            return Tween;
        })
    }else{
        window.Tween = Tween;
    }
})(window,undefined);