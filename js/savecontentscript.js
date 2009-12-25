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
*鼠标弹起时执行
*/
//function onMouseUp(e) {
//    selectText = getSelectText(e);
//    var mode = !!selectText && e.button == 0
//    var isPressctrlKey = e.ctrlKey;

//    if (popupmode == "ctrlselect") {
//        mode = !!selectText && e.button == 0 && isPressctrlKey;
//    }

//    if (mode) {
//        console.log(isPressctrlKey);
//        var scroll = getScroll();
//        toolbar = view.toolbar();
//        setPos(toolbar, e.clientX + scroll.left, e.clientY + scroll.top);
//        removeClass(toolbar, "view-hidden");
//        console.log("显示");
//        sendMessage = function() {
//            chrome.extension.connect().postMessage({ "text": selectText });
//        };
//    } else {
//    var menu = $(menuid);
//        if (!!menu && menu.className.indexOf("view-hidden") == -1)
//            addClass(menu, "view-hidden");
//    }
//}

//addEvent(document, "mouseup", onMouseUp);

/**
*快捷菜单
*/
function onContextMenu(e) {
    selectText = getSelectText(e);
    if (selectText) {
        var scroll = getScroll();
        toolbar = view.toolbar();
        setPos(toolbar, e.clientX + scroll.left, e.clientY + scroll.top);
        removeClass(toolbar, "view-hidden");
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

//toolbar = view.toolbar();
//oSaveButton = createImageButton("images/save.jpg", "save", "保存");
//toolbar.appendChild(oSaveButton);
//addEvent(oSaveButton, "mouseup", function(e) {
//    sendMessage();
//    e.stopPropagation();
//});