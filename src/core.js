;(function(root){
    "use strict"
    var Core = new function(){
        /**
         * 原型继承方法，只继承原型链里的
         * @param {[[Type]]} child  [[Description]]
         * @param {[[Type]]} parent [[Description]]
         */
        this.inherite = function(child,parent){
            var func = function(){};
            func.prototype = parent.prototype;
            child.prototype = new func();
            child.prototype.contructor = child;
            child.prototype._super = parent;
        }
        this._index = 0;
        this.ext = function(obj,attrs,deep){
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
        this.version = "0.0.1";
        this.module = new function(){
            this.modules = {};
            /**
             * [[Description]]
             * @param {[[Type]]} name    [[Description]]
             * @param {[[Type]]} factory [[Description]]
             * test install("graph",Graph);
                    function Graph(name,value){
                        this.name = name;
                        this.value = value;
                    }
             */
            this.install = function(name,factory){
                this.modules[name] = factory;
            }
            this.getModules = function(){
                return this.modules;
            }
        }
    }
    
    
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Core;
    }else if(typeof define !== "undefined"){
        define(function(){return Core});
    }
})(window || this)