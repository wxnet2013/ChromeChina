/**
*@fileoverview
*@author 王祥 Email:wxnet2008@gmail.com
*/
var oSaveButton;
/**
*@type {Function}
*发送消息的函数
*/
var sendMessage;
/**
*发送页面相关的属性信息,title、href
*/
chrome.extension.connect().postMessage({
    title: document.title,
    url: location.href
});


/**
*快捷菜单
*/
function onContextMenu(e) {
    selectText = getSelectText(e);
    if (selectText) {
        
        toolbar = view.toolbar();

        showMenu(toolbar, e, function() {
            removeClass(toolbar, "view-hidden");
        });

        var li = toolbar.getElementsByTagName("li")[1];
        if (reUrl.test(selectText)) {

            toolbar.getElementsByTagName("li")[0].className = toolbar.getElementsByTagName("li")[0].className.replace(/splitline/, "");

            li.style.cssText = "display:block;white-space: nowrap;overflow: hidden;";
            li.innerHTML = "转到" + selectText;

            li.onclick = function() {
                if (selectText.indexOf("http") != 0) {
                    postMessage_({ "newtab": "http://" + selectText });
                } else
                    postMessage_({ "newtab": selectText });
            };
        } else {
            li.style.display = "none";
            toolbar.getElementsByTagName("li")[0].className += " splitline";
        }
        /**
        *在查看源文件页面(view-source:http)不去阻止默认的快捷菜单
        */
        if (!document.querySelector("div:first-child.webkit-line-gutter-backdrop"))
            e.preventDefault();
    }
}
addEvent(document, "contextmenu", onContextMenu);

addEvent(document, "click", function() {
    var menu = $(menuid);
    if (!!menu && menu.className.indexOf("view-hidden") == -1) {
        addClass(menu, "view-hidden");
    }
});
