﻿/**
*@fileoverview 右键菜单
*@author 王祥 Email:wxnet2008@gmail.com
*/
var toolbar;

function search(opt, action) {
    var engine = info.engines_[opt];
    var src = engine.url.replace(/\{s\}/, encodeByType(engine.charset, info.selectText));
    actions[action](src);
    info.selectText = "";
}

var view = {
    toolbar: function (showtype) {
        if (!!$("view-cmenu")) return $("view-cmenu");
        var div = document.createElement("ul");
        div.id = "view-cmenu";
        div.className = "view-hidden";
	
	/*
        var li = document.createElement("li");
        li.id = "copy";
        li.innerHTML = "<a href=\"javascript:document.execCommand('copy',false,null);\">复制(<span class=\"underline\">C</span>)<span class=\"hotkey\">Ctrl+C</span></a>";
        div.appendChild(li); 
       
        li = document.createElement("li");
        li.id = "goto";
        li.style.display = "none";
        div.appendChild(li);
	
        li = document.createElement("li");
        li.className = "line";
        div.appendChild(li);
       */

        var self = this;
        each(info.engines_, function (i, obj) {
            var button;
            if (this.isused) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(this.name));
                div.appendChild(li);
                self.registerSearchButtonEvent(li, i);
            }
        });

        document.body.appendChild(div);
        return div;
    },
    registerSearchButtonEvent: function (ele, name) {
        addEvent(ele, "mouseup", function (e) {
            if (e.button == 0) {
                e.stopPropagation();
                search(name, info["menu"].searchResultDisplayMode);
            }
        });
    }
};

/**
*快捷菜单
*/
function onContextMenu(e) {
    if (doNotShowMenu(e)) return;
    info.selectText = getSelectText(e);
    if (info.selectText && !!e.ctrlKey) {
        toolbar = view.toolbar();
        showMenu(toolbar, e, function () {
            removeClass(toolbar, "view-hidden");
        });
/*
var reUrl = /(.*?)\.(com|cn|tel|mobi|net|org|asia|me|com|cn|net|cn|org|cn|gov|cn|hk|tv|biz|cc|name|info|公司|网络|中国)(\/(.*?))?/i;
        var li = document.getElementById("goto");
        if (reUrl.test(info.selectText)) {
            li.style.cssText = "display:block;white-space: nowrap;overflow: hidden;";
            li.innerHTML = "转到 " + info.selectText;
            li.style.display = "";

            li.onclick = function () {
                if (info.selectText.indexOf("http") != 0) {
                    postMessage_({ "newtab": { url: "http://" + info.selectText} });
                } else
                    postMessage_({ "newtab": { url: info.selectText} });
            };
        } else {
            li.style.display = "none";
        }
*/
        trackEvent("右键菜单", "使用右键菜单");
        /**
        *在查看源文件页面(view-source:http)不去阻止默认的快捷菜单
        */
        e.preventDefault();
    }
}



    addEvent(document, "contextmenu", onContextMenu);

    addEvent(document, "click", function (e) {
        var menu = $("view-cmenu");
        if (!!menu && menu.className.indexOf("view-hidden") == -1) {
            addClass(menu, "view-hidden");
        }
    });


/**
*禁用自定义快捷菜单的一些情况
*/
function doNotShowMenu(e) {
    if (e.target.tagName.toLowerCase() == "textarea" ||
        (e.target.tagName.toLowerCase() == "input" && target.type == "text") ||
        !!document.querySelector("div:first-child.webkit-line-gutter-backdrop")) {
        return true;
    }
}



















