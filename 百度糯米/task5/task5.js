//观察者构造函数
function Observer(data){
	this.data = data;
	this.walk(data);	
	this.eventsBus = new Event();
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
	let _this = this;
	Object.defineProperty(this.data,key,{
		enumberable: true,
		configurable: true,
		get:function(){
			console.log("你访问了" + key);
			return val;
		},
		set:function(newval){
			console.log("你设置了" + key + ",新的值为" + newval);
			
			_this.eventsBus.emit(key, val, newval);
			
			val = newval;
			//newval 是对象
			if (typeof newval === "object"){
				new Observer(val);
			}
			
			}
		})
}

Observer.prototype.$watch = function(attr, callback){
  this.eventsBus.on(attr, callback);
}

//实现一个事件
function Event(){
  this.events = {};
}

Event.prototype.on = function(attr, callback){
  if(this.events[attr]){
    this.events[attr].push(callback);
  }else{
    this.events[attr] = [callback];
  }
}

Event.prototype.off = function(attr){
  for(let key in this.events){
    if(this.events.hasOwnProperty(key) && key === attr){
      delete this.events[key];
    }
  }
}

Event.prototype.emit = function(attr, ...arg){
  this.events[attr] && this.events[attr].forEach(function(item){
    item(...arg);
  })
}

// test
let Obj = new Observer({
	name:"lixiaoyan",
	age:"23",
	city:"xian"
});


Obj.$watch('age', function(age) {
        console.log(`我的年纪变了，现在已经是${age}岁了`);
});
