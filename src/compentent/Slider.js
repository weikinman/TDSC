(function(root,un){
    
    var Slider = function(min,max,value){
        this.min = min;
        this.max = max;
        this.value = value;
        this.x = 0;
        this.y = 0;
        
        this.onchange = null;
        
        this.width = 16;
        this.height= 100;
        this.offsetW = 4;
        this.boxW = 4;
        this.boxColor = "#ccc";
        
        this.handlerH = 6;
        this.positionY = 0;
        this.handlerFillColor = "#fff";
        this.handlerStrokeColor = "#aaa";
        
        this.updatePosition();
    }
    Slider.prototype.draw =function(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        
        ctx.fillStyle = this.boxColor;
        ctx.beginPath();
        ctx.fillRect((this.width-this.boxW)/2,0,this.boxW,this.height)
        ctx.closePath();
        
        ctx.fillStyle = this.handlerFillColor;
        ctx.strokeStyle = this.handlerStrokeColor;
        ctx.beginPath();
        ctx.rect(0,this.positionY,this.width,this.handlerH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
    
    Slider.prototype.updateValue = function () {
      var old_value = this.value,
          handleRange = this.height - this.handlerH,
          valueRange = this.max - this.min;

      this.value = (handleRange - this.positionY) / handleRange * valueRange + this.min;
      if (typeof this.onchange === 'function' && this.value !== old_value) {
          console.log(this.value)
        this.onchange();
      }
    };

    Slider.prototype.updatePosition = function () {
      var handleRange = this.height - this.handlerH,
          valueRange = this.max - this.min;

      this.positionY = handleRange - ((this.value - this.min) / valueRange) * handleRange;
    };

    Slider.prototype.checkCollistion =function(x,y){
        var rect = {x:this.x,y:this.x+this.positionY,w:this.width,h:this.handlerH};
        if(rect.x>x || rect.x+rect.w<x || rect.y>y || rect.y+rect.h<y){
            return false;
        }
        return true;
    }
    
    Slider.prototype.drag = function(element){
        var mouse = Utils.captureMouse(element);
        var self = this;
        element.addEventListener("mousedown",mousedown,false);
        
        
        function mousedown(){
            if(self.checkCollistion(mouse.x,mouse.y)){
                element.addEventListener("mousemove",mousemove,false);
                element.addEventListener("mouseup",mouseup,false);
            }
            
        }
        function mousemove(){
            var pos_y = mouse.y - self.y;
            self.positionY = Math.min(self.height - self.handlerH, Math.max(pos_y, 0));
            self.updateValue();
        }
        function mouseup(){
            element.removeEventListener("mousemove",mousemove,false);
            element.removeEventListener("mouseup",mouseup,false);
        }
    }
    
    window.Slider = Slider;
})(window);