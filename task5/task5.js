//观察者构造函数
function Observer(data){
	this.data = data;
	this.walk(data);	
}

Observer.prototype.walk = function(obj){
	let val;
	for (let key in obj){
		if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val);
            }
            this.convert(key, val);
		}
	}
}

Observer.prototype.convert = function(key,val){
	Object.defineProperty(this.data,key,{
		enumberable: true,
		configurable: true,
		get:function(){
			console.log("你访问了" + key);
			return val;
		},
		set:function(newval){
			console.log("你设置了" + key + ",新的值为" + newval);
			if(newval === val) return;
			val = newval;
			}
		})
}

let data = {
	user:{
		name:"lixiaoyan",
		age:"23"
	},
	address:{
		city:"xian"
	}
}

let Obj = new Observer(data);
