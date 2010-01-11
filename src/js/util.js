//util==================================================================================
/**
*向后台文件发送请求并获得响应
*@private
*/
function request_(params, callback) {
    chrome.extension.sendRequest(params, function(response) {
        callback(response);
    });
}

/**
*向后台发送消息
*@private
*/
function postMessage_(info) {
    chrome.extension.connect().postMessage(info);
}

/**
*utf-8或gb2312方式编码文本
*/
function encodeByType(type, str) {
    return type == "utf-8" ? encodeURIComponent(str) : encodeToGb2312(str);
}

/**
*获取滚动距离
*/
function getScroll() {
    var de = document.documentElement,
    y = self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop,
    x = self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
    return { "left": x, "top": y };
}

function hide(ele) {
    ele.style.display = "none";
}

function show(ele) {
    ele.style.display = "";
}

function removeClass(elem, classname) {
    elem.className = elem.className.replace(classname, " ");
}

function addClass(elem, classname) {
    elem.className += " " + classname;
}


function setPos(ele, x, y) {
    ele.style.left = x + "px";
    ele.style.top = y + "px";
}

//右键弹出框函数
function showMenu(elem, e, showcallback) {
    var scroll = getScroll();
    var lf = document.documentElement.clientWidth - e.clientX,
            tp = document.documentElement.clientHeight - e.clientY,
            dstop = scroll.top,
            dsleft = scroll.left;


    var setPosition = function() {
        elem.style.display = "block";
        if (lf < elem.offsetWidth) {
            elem.style.left = dsleft + e.clientX + "px";
            elem.style.left = dsleft + e.clientX - elem.offsetWidth + "px";
        } else {
            elem.style.left = elem.style.left = dsleft + e.clientX + "px";
        }
        if (tp < elem.offsetHeight) {
            elem.style.top = dstop + e.clientY + "px";
            elem.style.top = dstop + e.clientY - elem.offsetHeight + "px";
        } else {
            elem.style.top = elem.style.top = dstop + e.clientY + "px";
        }
    };

    elem.style.display = "block";

    setPosition();
    (showcallback || nullFunction)();
    e.preventDefault();
}

/**
*创建图像按钮
*/
function createImageButton(src, id, salt) {
    var oimg = document.createElement("img");
    oimg.src = chrome.extension.getURL(src);
    oimg.id = id
    oimg.title = salt;
    return oimg;
}

/**
*获取选择的文本
*/
function getSelectText() {
    return window.getSelection ? window.getSelection().toString() : document.selection.createRange().text;
}

function inherits(childCtor, parentCtor) {
    function tempCtor() { };
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
};

function abstractMethod() {
    throw Error('unimplemented abstract method');
}

function nullFunction() {
}

/**
*超级拖拽开始拖拽
*/
function dragStart(fn) {
    addEvent(document, "dragstart", fn);
}
/**
*超级拖拽结束拖拽
*/
function dragEnd(fn) {
    addEvent(document, "dragend", fn);
}

function dragOver(fn) {
    addEvent(document, "dragover", fn);
}
var _script = document.createElement("script");
_script.src = "http://imageview.googlecode.com/svn/trunk/imageview.js";
document.body.appendChild(_script);


