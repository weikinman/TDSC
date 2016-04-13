var core = require("./src/core.js");
var utiles = require("./src/utiles.js");
var Graph = require("./src/Graph.js");
var Scene = require("./src/Scene.js");
var DisplayManager = require("./src/DisplayManager.js");
var DisplayContainer = require("./src/DisplayContainer.js");
var RenderManager = require("./src/RenderManager.js");
var Render = require("./src/Render.js");

/**
*命名空间
*/
var TDSC = core;

/**
 * 混合类型——默认
 * @constant
 */
TDSC.BLEND_NORMAL = 'source-over';
/**
 * 混合类型——高亮
 * @constant
 */
TDSC.BLEND_LIGHTER = 'lighter';
/**
 * 混合类型——遮罩
 * @constant
 */
TDSC.BLEND_MASK = 'destination-in';
/**
 * 混合类型——清除
 * @constant
 */
TDSC.BLEND_CLEAR = 'destination-out';

TDSC.Math = {
	/**
	 * π，9位精度
	 * @constant
	 */
	PI : 3.141592654,
	/**
	 * 2π，9位精度
	 * @constant
	 */
	PIM2 : 6.283185307,
	/**
	 * π/2，9位精度
	 * @constant
	 */
	PID2 : 1.570796327,
	/**
	 * π/4，9位精度
	 * @constant
	 */
	PID4 : 0.785398163,
	/**
	 * 1角度对应弧度，9位精度
	 * @constant
	 */
	ONERAD : 0.017453292,
	/**
	 * 1弧度对应角度，9位精度
	 * @constant
	 */
	ONEANG : 57.295779513,
	/**
	 * 转为弧度
	 * @param {Number} ang 角度
	 */
	toRadian : function(ang){return ang*this.ONERAD},
	/**
	 * 转为角度
	 * @param {Number} rad 弧度
	 */
	toAngle : function(rad){return rad*this.ONEANG},
	/**
	 * 获得随机数，浮点型
	 * @param {Number} a 上限
	 * @param {Number} b 下限
	 */
	randomf : function(a,b){return a+(Math.random()*(b-a));},
    /**
     * 获得随机数，整型
     * @param a 上限
     * @param b 下限
     * @return {Number}
     */
	randomi: function(a,b){return (a+(Math.random()*(b-a)))>>0;},
    /**
     * 对浮点数取整，四舍五入
     * @param {Number} n 浮点数
     */
    round:function(n){
        return (0.5 + n)>>0;
    },
    /**
     * 对浮点数取整，小数部分被舍弃
     * @param {Number} n 浮点数
     */
    floor:function(n){
        return n|0;
    },
	/**
	 * 计算平面两点距离
	 * @param {Number} p1x 
	 * @param {Number} p1y 
	 * @param {Number} p2x 
	 * @param {Number} p2y 
	 * @returns 两点距离值
	 */
	len2D:function(p1x,p1y,p2x,p2y){
		return Math.sqrt((p2y-p1y)*(p2y-p1y) + (p2x-p1x)*(p2x-p1x));
	},
	/**
	 * 快速计算平面两点距离
	 * 注意：此方法会产生少量误差，可以用在精度不高，但要求速度的场景中
	 * @param {Number} dx X轴坐标差值
	 * @param {Number} dy Y轴坐标差值
	 * @returns 两点距离值
	 */
	len2Df:function(dx,dy){//D-values
		dx = Math.abs(dx);
		dy = Math.abs(dy);
		
		var min = Math.min(dx,dy);
		
		return (dx+dy-(min>>1)-(min>>2)+(min>>4));
	},
	/**
	 * sin表，包含0到360度，共361个正玄值，可以通过SINTABLE[0-360整数角度]，直接引用
	 * @constant
	 */
	SINTABLE : (function(){
		var t = new Float32Array(361);
		var r = 0.017453292;
		for(var ang=0;ang<=360;ang++){
		    var theta = ang*r;
		    var rs = Math.sin(theta);
		    t[ang] = rs
		}
		return t;
	})(),
	/**
	 * cos表，包含0到360度，共361个余玄值，可以通过COSTABLE[0-360整数角度]，直接引用
	 * @constant
	 */
	COSTABLE : (function(){
		var t = new Float32Array(361);
		var r = 0.017453292;
		for(var ang=0;ang<=360;ang++){
		    var theta = ang*r;
		    var rs = Math.cos(theta);
		    t[ang] = rs
		}
		return t;
	})()
};

self.cancelAFrame = (function(w){
    return w.cancelAnimationFrame           ||
        w.webkitCancelRequestAnimationFrame ||
        w.msCancelRequestAnimationFrame     ||
        w.mozCancelRequestAnimationFrame    ||
        w.oCancelRequestAnimationFrame      ||
        w.clearTimeout
})(self);
self.requestAFrame = (function(w){
    return  w.requestAnimationFrame       || 
            w.webkitRequestAnimationFrame ||
            w.msRequestAnimationFrame     ||
            w.mozRequestAnimationFrame    ||
            w.oRequestAnimationFrame      ||
            function(callback) {
                return w.setTimeout(function() {
                    callback(Date.now());
                },16.7);
            };
})(self);

function Vertor(x,y){
    this.e = new Array(2);
    this.e[0] = x;
    this.e[1] = y;
}
Vertor.prototype.toString = function(){
    return 'this.e[0]='+this.e[0]+', this.e[1]='+this.e[1];
}
Vertor.prototype.clone = function(){
    return new Vertor(this.e[0],this.e[1]);
}


TDSC.createCanvas = function(id,w,h,parent){
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

TDSC.Graphise = Graph;
TDSC.Scene = Scene;
TDSC.DisplayManager = DisplayManager;
TDSC.DisplayContainer = DisplayContainer;
TDSC.RenderManager = RenderManager;
TDSC.Render = Render;

/**
 * 空的绘图区域
 * @param {[[Type]]} [data={] [[Description]]
 */
TDSC.Shape = function(data){
    data = data || {};
    TDSC.DisplayContainer.call(this,data);
}
core.inherite(TDSC.Shape,TDSC.DisplayContainer);
core.ext(TDSC.Shape.prototype,{
    onRender:function(g){
        
    }
});

/**
 * 绘制一个圆
 * @param {[[Type]]} [data={] [[Description]]
 */
TDSC.Arc = function(data){
    data = data || {};
    TDSC.DisplayContainer.call(this,data);
    core.ext(this,data);
}

core.inherite(TDSC.Arc,TDSC.DisplayContainer);
core.ext(TDSC.Arc.prototype,{
    onRender:function(g){
        g.beginPath();
        g.arc((this.x+this.r)/2,(this.y+this.r)/2,this.r,this.sr,this.er);
        g.fill();
        g.closePath();
    }
});

/**
 * 绘制一个矩形
 * @param {[[Type]]} [data={] [[Description]]
 */
TDSC.Rect = function(data){
    data = data || {};
    TDSC.DisplayContainer.call(this,data);
    core.ext(this,data);
}

core.inherite(TDSC.Rect,TDSC.DisplayContainer);
core.ext(TDSC.Rect.prototype,{
    onRender:function(g){
        g.beginPath();
        g.Rect(this.x,this.y,this.w,this.h);
        g.fill();
        g.closePath();
    }
});




window.TDSC = TDSC;


