(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body);
    function addBtn(title, func){
        return $("<button>",{text: title}).click(func);
    }
    $("<h1>",{text:"N進数"}).appendTo(h);
    $("<div>",{text:"10進数からN進数への変換、またはその逆ができます。\n小数、負の数は使えません。"}).appendTo(h);
    h.append("<br>");
    var viewN = $("<div>").appendTo(h);
    var input_base = yaju1919.addInputText(h,{
        title: "使用する記号",
        id: "input_base",
        save: "input_base",
        change: function(v){
            var str = v.split('').filter(function(v,i,a){
                return a.indexOf(v) === i;
            }).join('');
            viewN.text(str.length + "進数");
            return str;
        }
    });
    h.append("<br>");
    function addBtn_shortcut(title, str){
        return addBtn(title, function(){
            $("#input_base").val(str);
        });
    }
    addBtn_shortcut("2進数", "01");
    addBtn_shortcut("4進数", "0123");
    addBtn_shortcut("8進数", "01234567");
    addBtn_shortcut("16進数", "0123456789ABCDEF");
    addBtn_shortcut("36進数", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    h.append("<br>");
    h.append("<br>");
    h.append("<br>");
    var input_num = yaju1919.addInputNumber(h,{
        title: "10進数入力欄",
        save: "input_num",
        min: 0,
        int: true
    });
    addBtn("N進数に変換",function(){
        view_result.text(new BaseN(input_base()).encode(input_num)).css({
            backgroundColor: "yellow"
        });
    });
    addBtn("コピー",function(){
        yaju1919.copy(view_result.text());
    });
    var view_result = $("<div>").appendTo(h);
    h.append("<br>");
    h.append("<br>");
    h.append("<br>");
    var input_n = yaju1919.addInputText(h,{
        title: "N進数入力欄",
        change: function(v){
            var base = input_base();
            return v.split('').filter(function(v){
                return base.indexOf(v) !== -1;
            }).join('');
        }
    });
    addBtn("10進数に変換",function(){
        view_result2.text(new BaseN(input_base()).decode(input_n)).css({
            backgroundColor: "lime"
        });
    });
    addBtn("コピー",function(){
        yaju1919.copy(view_result2.text());
    });
    var view_result2 = $("<div>").appendTo(h);
    function BaseN(base){ // N進数を作成するクラス
        var len = base.length, reg = /^0+(?=.+$)/;
        this.encode = function(num){ // 10進数をN進数に変換
            if(isNaN(num)) return NaN;
            var str = "", v = num;
            while(v !== 0){
                v = Math.floor(v);
                str = base[v % len] + str;
                v /= len;
            }
            return str.replace(reg,"");
        };
        this.decode = function(str){ // N進数を10進数に変換
            return String(str).replace(reg,"").split("").reverse().map(function(v,i){
                return base.indexOf(v) * Math.pow(len, i);
            }).reduce(function(total, v){
                return total + v;
            });
        };
    }
})();
