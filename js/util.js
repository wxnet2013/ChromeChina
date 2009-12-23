﻿//util==================================================================================
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
function getSelectText(e) {
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