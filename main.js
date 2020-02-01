(function () {
    'use strict';
    var h = $("<div>").appendTo(document.body).css({
        "text-align": "center",
        padding: "1em"
    });
    function addBtn(title, func){
        return $("<button>",{text: title}).click(func).appendTo(h);
    }
    $("<h1>",{text:"N進数"}).appendTo(h);
    $("<div>",{text:"10進数からN進数への変換、またはその逆ができます。\n小数、負の数は使えません。"}).appendTo(h);
    h.append("<br>");
    var viewN = $("<div>").appendTo(h);
    var input_base = yaju1919.addInputText(h,{
        title: "使用する文字",
        placeholder: "重複しないように0から順に入力してください。",
        id: "input_base",
        save: "input_base",
        change: function(v){
            var str = v.split('').filter(function(v,i,a){
                return a.indexOf(v) === i;
            }).join('');
            viewN.text(str.length + "進数");
            $("#input_n").val('');
            return str;
        }
    });
    h.append("<br>");
    function addBtn_shortcut(title, str){
        return addBtn(title, function(){
            $("#input_base").val(str).trigger("change").click();
        });
    }
    addBtn_shortcut("2進数", "01");
    addBtn_shortcut("4進数", "0123");
    addBtn_shortcut("8進数", "01234567");
    addBtn_shortcut("16進数", "0123456789ABCDEF");
    addBtn_shortcut("36進数", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    addBtn_shortcut("ひらがな", "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん");
    addBtn_shortcut("アルファベット", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    h.append("<br>");
    h.append("<br>");
    h.append("<br>");
    function InformError(elm){
        elm.empty();
        if(input_base().length < 2) {
            elm.text("「使用する文字」に最低でも2文字以上入力してください。("+yaju1919.getTime()+")");
            return true;
        }
        return false;
    }
    var input_num = yaju1919.addInputNumber(h,{
        title: "10進数入力欄",
        save: "input_num",
        min: 0,
        int: true
    });
    addBtn("N進数に変換",function(){
        if(InformError(view_result)) return;
        var result = yaju1919.baseN(input_base()).encode(input_num());
        yaju1919.addInputText(view_result,{
            title: "output",
            value: result,
            readonly: true,
            textarea: true
        });
    });
    var view_result = $("<div>").appendTo(h);
    h.append("<br>");
    h.append("<br>");
    h.append("<br>");
    var input_n = yaju1919.addInputText(h,{
        title: "N進数入力欄",
        id: "input_n",
        change: function(v){
            var base = input_base();
            return v.split('').filter(function(v){
                return base.indexOf(v) !== -1;
            }).join('');
        }
    });
    addBtn("10進数に変換",function(){
        if(InformError(view_result2)) return;
        var result = yaju1919.baseN(input_base()).decode(input_n())
        yaju1919.addInputText(view_result2,{
            title: "output",
            value: result,
            readonly: true,
            textarea: true
        });
    });
    var view_result2 = $("<div>").appendTo(h);
})();
