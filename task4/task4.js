//观察者构造函数
function Observer(data){
	this.data = data;
	for (let val in data){
		Object.defineProperty(this.data,val,{
		enumberable: true,
		configurable: true,
		get:function(){
			console.log("你访问了" + val);
			return val;
		},
		set:function(newval){
			console.log("你设置了" + val + ",新的值为" + newval);
			if(newval === val) return;
			val = newval;
			}
		});
	}
	
}

	
let user = new Observer({
    name: "lixiaoyan",
    age: "23",
    city: "Xian"
});
