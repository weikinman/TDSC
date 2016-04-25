;(function(root,un){
    /**
     * 获取对象里的属性名
     * @param   {object} attrs 对象
     * @returns {Array}  该对象的属性名
     */
    function getObjectName(attrs){
        var res = [];
        for(var i in attrs){
            if(attrs.hasOwnProperty(i)){
                res.push(i);
            }
        }
        return res;
    }
    /**
     * 补间动画
     * @param {object} target   [[Description]]
     * @param {object} attrs    [[Description]]
     * @param {number} duration [[Description]]
     * @param {object} [opts={] [[Description]]
     */
    var Animation = function (target,attrs,duration,opts){
        opts = opts || {};
        this.taret = target;
        this.attrs = attrs//要改变的属性
        this.duration = duration;
        this._attrs = {};
        this._attrs_inverse = {};
        this._attrs_name = {};
        
        this._startTime = null;
        
        this.easing = opts.easing || TDSC.Tween.Linear;
        
        this.Loops = opts.Loops || -1; //循环次数，-1为无限
        
        this.isInverse = opts.isInverse || false;//是否回放
        
        this.delay = opts.delay || 0;
        
        this._loop = 0;
        
        this.__tween = null;
        this.__next = null;
        
        this._OnEnd = opts._OnEnd;
        this._OnUpdate = opts._OnUpdate;
    }
    
    Animation.prototype = {
        constructor:Animation,
        /**
         * [[Description]]
         */
        _calc:function(un){
            var attrNames = this._attrs_name = getObjectName(this.attrs);
            for(var i = 0,len=attrNames.length; i < len ; i++){
                var attr = attrNames[i];
                var tAttr = this.taret[attr];//如果目标没有这个要改变的属性就跳过
                if(tAttr==un)continue;
                
                tAttr = tAttr *1;//初始属性
                var endAttr = this.attrs[attr]*1;
                
                //如果是在对应属性上再做变化
                if(typeof endAttr === "string" && endAttr.indexOf("-")>-1){
                    endAttr = tAttr-endAttr.substring(1,endAttr.length);
                }else if(typeof endAttr === "string" && endAttr.indexOf("+")>-1){
                    endAttr = tAttr+endAttr.substring(1,endAttr.length);
                }else{
                    endAttr = parseFloat(endAttr);
                }
                var ingAttr = endAttr - tAttr;
                this._attrs[attr] = {"startAttr":tAttr,"ingAttr":ingAttr,"endAttr":endAttr};
                var ingAttr_inverse = tAttr - endAttr;
                this._attrs_inverse[attr] = {"startAttr":endAttr,"ingAttr":ingAttr_inverse,"endAttr":tAttr};
                console.log(this._attrs);
                console.log(this._attrs_inverse);
            }
        },
        stop:function(){
            AnimationManager.remove(this);
            return this;
        },
        
        start:function(){
            this._calc();
            
            this._startTime = new Date();
            if(this.__tween){
                return false;//如果当前补间已在执行
            }
            this.__tween = this;
            AnimationManager.add(this);
            return this;
        },
        /**
         * 对应帧上，对象改变
         * @param {object}    t    this.target
         * @param {number}    time 当前帧
         * @param {undefined} un   [[Description]]
         */
        goto:function(t,time,un){
            var attrNames = this._attrs_name;
            var ratio = this.easing(time,0,1,this.duration);
            //开始改变target的属性
            
            if(time>=this.duration)ratio=1; //防止超过原先的值;
            
            for(var i=0,len=attrNames.length;i<len;i++){
                var attr = attrNames[i];
                if(t[attr]){
                    t[attr] = this._attrs[attr].startAttr + this._attrs[attr].ingAttr*ratio;
                }
            }
            
            return ratio;
        },
        /**
         * [[Description]]
         * @param {dateTime} now 主动画当前时间
         * @param {number}   d   [[Description]]
         */
        update:function(now,d){
            var c = now - this._startTime;
            var t = this.taret;
            var ratio = this.goto(t,c);
            
            if(c>=this.duration){//补间动画结束
                if(this.Loops===-1 || 
                   this.Loops>0 && this._loop++ < this.Loops){
                    //console.log(this.isInverse)
                    this._startTime = new Date();//重置开始时间
                    if(this.isInverse){//回放
                        console.log(1111)
                        var temp = this._attrs;
                        this._attrs = this._attrs_inverse;
                        this._attrs_inverse = temp;
                    }
                    return;
                }
                
                this.destroy();
                AnimationManager.remove(this);
                
                return;
            }
            
            if(this._OnUpdate)this._OnUpdate();
        },
        
        destroy:function(){
            this.attrs = null;
            this.__next=null;
            this._attrs = null;
            this._attrs_inverse = null;
            this._attrs_name = null;
            this._startTime = null;
        }
    }
    
    
    
    if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
        module.exports = Animation;
    }else if(typeof define !== "undefined"){
        define(function(){
            return Animation;
        })
    }else{
        window.Animation = Animation;
    }
})(window,undefined);