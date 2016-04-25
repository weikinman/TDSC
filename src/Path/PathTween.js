;(function(root,un){
    
    var PathTween = function(target,path,duration,opts){
        opts = opts || {};
        
        this._pps = [];
        this._pps_inverse = [];
        
        this.target = target;
        this.path = path;
        this.duration = duration;
        
        this.isInverse = opts.isInverse || false;
        this._loop = 0;
        this.Loop = opts.Loop;
        this.delay = opts.delay || 0;
    }
    
    PathTween.prototype = {
        constructor:PathTween,
        _calc:function(){
            
        },
        start:function(){
            
        },
        goto:function(){
            
        },
        update:function(now,d){
            
        }
    }
    
    if(typeof module !== "undefined" && module.exports != un){
        module.exports = PathTween;
    }else if(typeof define !== "undefined"){
        define(function(){
            return PathTween
        });
    }else{
        window.PathTween = PathTween;
    }
})(window,undefined);