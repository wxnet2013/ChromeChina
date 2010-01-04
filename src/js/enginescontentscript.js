/**
*@fileoverview
*@author 王祥 Email:wxnet2008@gmail.com
*/
var domReady = tx.event.domReady,
    addEvent = tx.event.addEvent,
    removeEvent = tx.event.removeEvent,
    tag = tx.dom.tag,
    remove = tx.dom.remove,
    $ = tx.dom.$,
    parent = tx.dom.getParent,
    each = tx.util.each;


var toolbar;
/**
*获取所有的搜索引擎
*/
var engines_;

//选择的文本
var selectText = "";
var menuid = "view-cmenu";

/**
*配置显示搜索的方式
*/
var searchResultDisplayMode;
var dragEngine;
var dragImageDisplayMode;
var dragLinkDisplayMode

/**
*显示模式
*/
var displayMode = {
    newtab: function(src) {
        postMessage_({ "newtab": src });
    },
    pop: function(src) {
        var ifr = null;
        //显示搜索
        createSearchResultPopup();
        ifr = getSearchifr();
        ifr.style.visibility = "hidden";
        ifr.src = src;
    },
    newwindow: function(src) {
        var screenW = screen.width, screenH = screen.height;
        postMessage_({
            "left": (screenW - screenW * (3 / 4)) / 2,
            "top": (screenH - screenH * (3 / 4)) / 2,
            "width": screenW * (3 / 4),
            "height": screenH * (3 / 4),
            "newwindow": src
        });
    },
    imageview: function(src) {
        //alert("imageview");
        var viewer
        viewer = new imageViewer(new makedom(src));
        viewer.initUI();

        viewer.initEvent();
        viewer.openViewer();
        //postMessage_({ "newtab":  });
    }
};

function search(opt) {
    displayMode[searchResultDisplayMode](engines_[opt].url.replace(/\{s\}/, encodeByType(engines_[opt].charset, selectText)));
}


request_({ option: "getinfo" }, function(opt) {
    engines_ = JSON.parse(opt.engines);
    searchResultDisplayMode = opt.searchshow;
    dragEngine = opt.dragengine;
    dragImageDisplayMode = opt.dragImageDisplayMode;
    dragLinkDisplayMode = opt.dragLinkDisplayMode;
});

var reUrl = /(.*?)\.(com|cn|tel|mobi|net|org|asia|me|com|cn|net|cn|org|cn|gov|cn|hk|tv|biz|cc|name|info|公司|网络|中国)(\/(.*?))?/i;
var view = {
    toolbar: function(showtype) {
        var contentClass = "view-cmenu view-hidden";
        var itemclass = "view-cmenu-item";

        if (!!$(menuid)) return $(menuid);
        var div = document.createElement("ul");
        div.id = menuid;
        div.className = contentClass;

        var li = document.createElement("li");
        li.id = "copy";
        li.className = itemclass + " splitline";
        li.innerHTML = "<a href=\"javascript:document.execCommand('copy',false,null);\">复制(C)<span style='float:right'>Ctrl+C</span></a> ";
        div.appendChild(li);

        /**
        *显示“转到url”的容器
        */
        li = document.createElement("li");
        li.id = "goto";
        li.className = itemclass + " splitline";
        div.appendChild(li);

        each(engines_, function(i, obj) {
            var button;
            if (this.isused) {
                var li = document.createElement("li");
                li.className = itemclass;
                li.appendChild(document.createTextNode(this.name));
                div.appendChild(li);
                registerSearchButtonEvent(li, i);
            }
        });
        document.body.appendChild(div);
        return div;
    }
};

/**
*注册事件
*/
function registerSearchButtonEvent(ele, name) {
    addEvent(ele, "mouseup", function(e) {
        if (e.button == 0) {
            e.stopPropagation();
            //searchResultDisplay[searchResultDisplayMode](name);
            search(name);
        }
    });
}


/**
*生成搜索按钮的dom结构
*/
function createSearchResultPopup() {
    if ($("popwin")) { show($("popwin")); return $("popwin"); }
    var div = document.createElement("div");
    div.id = "popwin"
    div.style.cssText = "z-index:999;position:fixed;top:" + document.documentElement.scrollTop + "px;left:" + getScroll().left + "px;width:100%;height:600px;border:solid 1px #666666;background:#fff url(" + chrome.extension.getURL("images/loading.gif") + ")  center center no-repeat;";

    var oifr = document.createElement("iframe");
    oifr.style.cssText = "z-index:1000;width:100%;height:100%;visibility:hidden;background:#fff;";
    oifr.onload = function() {
        this.style.visibility = "visible";
    };
    div.appendChild(oifr);
    document.body.appendChild(div);
}

/**
*创建弹出窗口
*/
function getSearchifr() {
    var oifr = null;
    var popwin = $("popwin");
    if (popwin) {
        oifr = tag("iframe", popwin)[0];
        return oifr;
    }
}

//按ESC键关闭搜索显示框
addEvent(document, "keydown", function(e) {
    switch (e.keyCode) {
        case 27:
            hide($("popwin"));
            break;
    }
});
















