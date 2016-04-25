;(function(root,un){
    /**
     * [[Description]]
     */
    var AnimationManager = new function (){
        var anis = [];
        var length = 0;
        this.add = function(ani){
            if(this.find(ani)>-1){return false;}
            anis.push(ani);
            length++;
        }
        this.getLength = function(){
            return length;
        }
        this.remove = function(ani){
            var index = this.find(ani);
            if(index>-1){
                anis.splice(index,1);
                length--;
            }
        }
        this.update = function(now,d){
            var len = anis.length;
            if(len>0){
                for(var i=len-1; i>=0; i--){
                    anis[i].update(now,d);
                }
            }
        }
        this.find =function(ani){
            var index = anis.indexOf(ani);
            return index;
        }
        this.stop = function(){
            anis = [];
            length=0;
        }
    }
    
    
    
    if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
        module.exports = AnimationManager;
    }else if(typeof define !== "undefined"){
        define(function(){
            return AnimationManager;
        })
    }else{
        window.AnimationManager = AnimationManager;
    }
})(window,undefined);