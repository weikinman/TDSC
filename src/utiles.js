(function(root){
    var slice = [].slice;
    
    var Utils = {};
    Utils.Device = new function(){
        var userAgent = this.userAgent = self.navigator.userAgent.toLowerCase();

        var isWindows = userAgent.indexOf('windows')>0?true:false;
        var isLinux = userAgent.indexOf('linux')>0?true:false;
        var isMacOS = userAgent.indexOf('mac os')>0?true:false;
        var isAndroid = userAgent.indexOf('android')>0?true:false;
        var isIphone = userAgent.indexOf('iphone')>0?true:false;
        var isIpad = userAgent.indexOf('ipad')>0?true:false;
        var isWphone = userAgent.indexOf('windows phone')>0?true:false;

        //移动端信息
        /**
         * 是否为iphone
         * @type {boolean}
         */
        this.iphone = isIphone;
        /**
         * 是否为ipad
         * @type {boolean}
         */
        this.ipad = isIpad;
        /**
         * 是否为ios
         * @type {boolean}
         */
        this.ios = isIphone || isIpad;
        /**
         * 是否为android
         * @type {boolean}
         */
        this.android = isAndroid;
        /**
         * 是否为wp
         * @type {boolean}
         */
        this.wp = isWphone;
        /**
         * 是否移动系统
         * @type {boolean}
         */
        this.mobile = this.ios || isAndroid || isWphone;

        //pc端信息
        /**
         * 是否为windows
         * @type {boolean}
         */
        this.windows = isWindows;
        /**
         * 是否为linux
         * @type {boolean}
         */
        this.linux = isLinux;
        /**
         * 是否为mac os
         * @type {boolean}
         */
        this.mac = isMacOS;

        //浏览器信息
        var type = {
          Firefox:userAgent.indexOf('firefox')+1,
          Opera:userAgent.indexOf('opera')+1,
          Chrome:userAgent.indexOf('chrome')+1,
          Safari:userAgent.indexOf('safari')>-1 && userAgent.indexOf('chrome')<0
        };
        /**
         * 如果当前浏览器为IE，那么值为true。
         * @type boolean
         */
        this.ie = /msie|trident.*rv:/.test(userAgent.toLowerCase());
        /**
         * 如果当前浏览器为FireFox，那么值为true。
         * @type boolean
         */
        this.ff = type.Firefox?true:false;
        /**
         * 如果当前浏览器为Opera，那么值为true。
         * @type boolean
         */
        this.opera = type.Opera?true:false;
        /**
         * 如果当前浏览器为Chrome，那么值为true。
         * @type boolean
         */
        this.chrome = type.Chrome?true:false;
        /**
         * 如果当前浏览器为Safari，那么值为true。
         * @type boolean
         */
        this.safari = type.Safari?true:false;
    };
    
    Utils.captureMouse = function(element){
        var mouse = {x:0,y:0,event:null};
        domBody = document.body || document.documentElement;
        scrollLeft = domBody.scrollLeft;
        scrollTop = domBody.scrollTop;
        offsetLeft = element.offsetLeft;
        offsetTop = element.offsetTop;
        
        element.addEventListener("mousemove",function(e){
            var x,y;
            e = e || window.event;
            if(e.pageX){
                x=e.pageX;
                y=e.pageY;
            }else{
                x = e.clientX + scrollLeft;
                y = e.clientY + scrollTop;
            }
            
            mouse.x = x - offsetLeft;
            mouse.y = y - offsetTop;
            mouse.event = e;
        },false);
        return mouse;
    }
    
    Utils.captureTouch = function(ele){
        var touch = {x:0,y:0,touchType:null};
        
        
        function touchStart(){}
        function touchMove(){}
        function touchEnd(){}
        function touchCancel(){}
    }
    
    Utils.Event = new function(){
        this.addEvent = function(ele,type,func){
            if(ele.addEventListener){
                ele.addEventListener(type,func,false);
            }else{
                document.attachEvent("on"+type,func);
            }
        }
        this.removeEvent = function(ele,type,func){
            if(ele.removeEventListener){
                ele.removeEventListener(type,func,false);
            }else{
                document.dispatchEvent("on"+type,func);
            }
        }
    }
    
    Utils.parseColor = function (color, toNumber) {
      if (toNumber === true) {
        if (typeof color === 'number') {
          return (color | 0); //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
          color = color.slice(1);
        }
        return window.parseInt(color, 16);
      } else {
          console.log((color | 0).toString(16))
        if (typeof color === 'number') {
            console.log((color | 0))
          color = '#' + ('00000' + (color >> 0).toString(16)).substr(-6); //pad
        }
        return color;
      }
    };
    
    Utils.colorToRGB = function (color, alpha) {
      //number in octal format or string prefixed with #
      if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
      }
      alpha = (alpha === undefined) ? 1 : alpha;
      //parse hex values
      var r = color >> 16 & 0xff,
          g = color >> 8 & 0xff,
          b = color & 0xff,
          a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
      //only use 'rgba' if needed
      if (a === 1) {
        return "rgb("+ r +","+ g +","+ b +")";
      } else {
        return "rgba("+ r +","+ g +","+ b +","+ a +")";
      }
    };
    
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Utils;
    }else if(typeof define !== "undefined"){
        define(function(){return Utils});
    }else{
        root.Utils = Utils;
    }
})(window || this);