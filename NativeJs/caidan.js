/**
 *
 * @author  56477
 * @create 2018-06-06 16:00
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
jQuery.fn.shortcuts = function(keys) {
    var self = this;
    this.pressed = new Array();

    jQuery(this).keydown(function(event) {
        // Don't fire in text-accepting inputs that we didn't directly bind to
        if (this !== event.target && (/textarea|select/i.test( event.target.nodeName ) || event.target.type === "text")) {
            return;
        }
        self.pressed.push(event.keyCode);
        for(combo in keys) {
            if (self.compare(keys[combo].keys, self.pressed)) {
                keys[combo].func(event);
            };
        };
    });

    jQuery(this).keyup(function(event) {
        self.pressed.splice(jQuery.inArray(event.keyCode, self.pressed), 1);
    });

    this.compare = function(a, b) {
        if (a.length != b.length) return false; a.sort(); b.sort();
        for (var i=0; i < a.length; i++) { if (a[i] != b[i]) return false; };
        return true;
    }

    return this;
};
$(document).shortcuts({
    "Q": {
        keys: [81],
        desc: "Log Q to the console",
        func: function() { console.log("You pressed Q") }
    },
    "CTRL F": {
        keys: [17, 70],
        desc: "Log this key combination to the console",
        func: function() {
            console.log("You pressed ALT and I");
            window.find('abc',false,true);
            if (window.getSelection) {
                //现代浏览器
                userSelection = window.getSelection();
            } else if (document.selection) {
                //IE浏览器 考虑到Opera，应该放在后面
                userSelection = document.selection.createRange();
            }
            if(userSelection=='abc'){
                console.log('牛逼');
            }
            findInPage('abc');
            function findInPage(str)
            {
                var txt, i, found,n = 0;
                if (str == "")
                {
                    return false;
                }
                txt = document.body.createTextRange();
                for (i = 0; i <= n && (found = txt.findText(str)) != false; i++)
                {
                    txt.moveStart("character", 1);
                    txt.moveEnd("textedit");
                }
                if (found)
                {
                    txt.moveStart("character", -1);
                    txt.findText(str);
                    txt.select();
                    txt.scrollIntoView();
                    n++;
                }
                else
                {
                    if (n > 0)
                    {
                        n = 0;
                        findInPage(str);
                    }
                    else
                    {
                        alert(str + "... 您要找的文字不存在。\n \n请试着输入页面中的关键字再次查找！");
                    }
                }
                return false;
            }
        }
    }
});
