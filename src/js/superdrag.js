/**
*@fileoverview 超级拖拽
*@author 王祥 Email:wxnet2008@gmail.com
*/

var isDragImg = false;
//获取拖拽的方向
var dir;
dragEnd(function(e) {
    //设置拖拽的方向
    dir = mouseDirection(e);
    log(dir);
});

dragEnd(function(e) {
    if (isImg(e)) {
        isDragImg = true;
        onImageDrag(e.target.src);
        return;
    }
    isDragImg = false;
});

dragEnd(function(e) {
    if (isDragImg) return;
    //拖拽文字
    /**
    * 不使用e.dataTransfer.getData('TEXT')获取选择文本，
    * 可以拖拽链接上选中的文本
    */
    info.selectText = getSelectText(e);
    if (info.selectText) {
        onTextDrag(e);
        return;
    }

    //拖拽链接
    data = getlinkhref(e.target);
    //4.0.302.3 dev e.dataTransfer.getData('url') 失效
    //data = e.dataTransfer.getData('url');
    if (data) {
        info.selectText = data;
        onLinkDrag(data);
        return;
    }
});

function getlinkhref(el) {
    while (!!el && el.tagName != 'A') el = el.parentNode;
    if (!!el && !el.href.match(/^javascript/i)) return el.href;
    else return null;
}

dragOver(function(e) {
    //改变鼠标光标 4.0.302.3 dev 失效
    e.preventDefault();
});


/**
*拖拽文本
*/
function onTextDrag(e) {
    var opt = info.drag;
    switch (dir) {
        case "left":
            //alert(actions["newtab"]);
            search(dragEngine, opt["textleft"]);
            break;
        case "right":

            search(dragEngine, opt["textright"]);
            break;
        case "up":
            search(dragEngine, opt["textup"]);
            break;
        case "down":
            search(dragEngine, opt["textdown"]);
            break;
    }
}

/**
*拖拽链接
*/
function onLinkDrag(src) {

    var opt = info.drag;
    switch (dir) {
        case "left":
            //alert(actions["newtab"]);
            show(opt["linkleft"], src);
            break;
        case "right":

            show(opt["linkright"], src);
            break;
        case "up":
            show(opt["linkup"], src);
            break;
        case "down":
            show(opt["linkdown"], src);
            break;
    }

    //show(dragLinkDisplayMode, src);
}

/**
*拖拽图像
*/
function onImageDrag(src) {

    var opt = info.drag;
    switch (dir) {
        case "left":
            //alert(actions["newtab"]);
            show(opt["imageleft"], src);
            break;
        case "right":

            show(opt["imageright"], src);
            break;
        case "up":
            show(opt["imageup"], src);
            break;
        case "down":
            show(opt["imagedown"], src);
            break;
    }

    //show(dragImageDisplayMode, src);
}

/**
*拖拽的是图片
*/
function isImg(e) {
    return e.target.tagName == "IMG";
}

function show(mode, src) {
    actions[mode](src);
}




