;(function(root,un){
    /**
     * [[Description]]
     */
    var TweenManager = new function(target,attrs,duration,opts){
            var ins = [];
        this.getTweens = function(){
            return ins;
        }
        /**
         * 增加一个补间实例到管理器中,重复增加无效
         * @param soya2d.Tween t 补间实例
         * @return this
         */
        this.add = function(t){
            var i = ins.indexOf(t);
            if(i>-1)return this;

            ins.push(t);
            return this;
        };
        /**
         * 从管理器中删除一个补间实例
         * @param soya2d.Tween t 补间实例
         * @return this
         */
        this.remove = function(t) {
            var i = ins.indexOf(t);
            if(i>-1)ins.splice(i, 1);
            return this;
        };

        /**
         * 停止所有补间实例
         */
        this.stop = function(){
            ins = [];
        }
        /**
         * 更新管理器中的所有补间实例，当实例运行时间结束后，管理器会自动释放实例
         */
        this.update = function(now,d){
            for(var i=ins.length;i--;){
               ins[i].update && ins[i].update(now,d);
            }
        };
        
    }
    
    
    
    if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
        module.exports = TweenManager;
    }else if(typeof define !== "undefined"){
        define(function(){
            return TweenManager;
        })
    }else{
        window.TweenManager = TweenManager;
    }
})(window,undefined);