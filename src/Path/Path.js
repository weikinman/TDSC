;(function(root,un){
    
    var Path = function(d){
        this.d = d;
        this.qns = [];
        this.re = ["m","l","z"];
        
        this.changeQns();
    }
    Path.prototype.changeQns = function(){
        var reg = new RegExp('['+this.re.join("")+']+[^'+this.re.join("")+']+',"img");
        var temp = this.d.toLowerCase().replace(/^\s|\s$/img,"").match(reg);
       // console.log(temp);
        var self = this;
        temp.forEach(function(obj,i){
           // console.log(obj);
            var seq = obj.replace(/^\s|\s$/mg,"");
            var first = seq.substring(0,1);
            if(self.re.indexOf(first)>-1){
                var last = seq.substr(1);
                self.qns.push([first,last.split(/\n|,|\s/gm)]); 
            }
        });
        console.log(this.qns)
    }
    
    Path.prototype.setQns = function(d){
        this.d = d;
        this.changeQns();
    }
    
    if(typeof module !== "undefined" && module.exports != un){
        module.exports = Path;
    }else if(typeof define !== "undefined"){
        define(function(){
            return Path
        });
    }else{
        window.Path = Path;
    }
})(window,undefined);