var num = document.getElementById("num");
var main = document.getElementById("main");
var left_in = document.getElementById("left_in");
var left_out = document.getElementById("left_out");
var right_in = document.getElementById("right_in");
var right_out = document.getElementById("right_out");
var search = document.getElementById("search");
var compare = document.getElementById("compare");

//左侧输入
left_in.addEventListener("click",function(){
    if(num.value === ""){
        alert("请输入内容");
    }else{
        var trans = num.value.match(/\w+/g);
        for(var i = 0; i < trans.length; i++){
            var li = document.createElement("li");
            main.insertBefore(li,main.firstChild);
            li.innerText = trans[i];
        }
    }
});
//右侧输入
right_in.addEventListener("click",function(){
    if(num.value === ""){
        alert("请输入内容");
    }else{
        var trans = num.value.match(/\w+/g);
        for(var i = 0; i < trans.length; i++) {
            var li = document.createElement("li");
            main.insertBefore(li, main.firstChild);
            li.innerText = trans[i];
        }
    }
});
//左侧输出
left_out.addEventListener("click",function(){
    alert("你从左侧删除了" + main.firstChild.innerText);
    main.removeChild(main.firstChild);
});
//右侧输出
right_out.addEventListener("click",function(){
    alert("你从右侧删除了" + main.lastChild.innerText);
    main.removeChild(main.lastChild);
});
//点击删除
main.addEventListener("click",function(){
    if(event.target.nodeName.toLowerCase() === "li"){
        main.removeChild(event.target);
    }
});

// Textarea中使用Tab
var str = "    ";
if(num.addEventListener ) {
    num.addEventListener('keydown',this.keyHandler,false);
} else if(num.attachEvent ) {
    num.attachEvent('onkeydown',this.keyHandler);  // IE
}

function keyHandler(e) {
    var TABKEY = 9;
    if(e.keyCode === TABKEY) {
        insertText(num,str);
        if(e.preventDefault) {
            e.preventDefault();
        }
    }
}
function insertText(obj,str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}

//查询内容匹配
function matchElements() {

    if(compare.value === ""){
        alert("请输入查询内容！")
    }else {
        var len = main.children.length;
        var arr = new Array();
        for (var i = 0; i < len; i++) {
            arr[i] = main.children[i].innerText.indexOf(compare.value);
            console.log(arr[i]);
            if(arr[i] > -1) {
                main.children[i].style.color = "black";
            }else if(arr[i] === -1) {
                main.children[i].style.color = "white";
            }
        }
    }
}
search.addEventListener("click", matchElements);