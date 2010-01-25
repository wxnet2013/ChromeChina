/**
*超级拖拽
*/
var isDragImg = false;
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
    selectText = getSelectText(e);
    if (selectText) {
        onTextDrag(e);
        return;
    }
    
    //拖拽链接
    data = getlinkhref(e.target);
    //4.0.302.3 dev e.dataTransfer.getData('url') 失效
    //data = e.dataTransfer.getData('url');
    if (data) {
        selectText = data;
        onLinkDrag(data);
        return;
    }
});

function getlinkhref(el) {
    while (!!el && el.tagName != 'A') el = el.parentNode;
    if (!!el && !el.href.match(/^javascript/i)) return el.href;
    else return null;
}



/**
4.0.302.3 dev 失效
*/
//dragDrop(function(e) {
//    if (isDragImg) return;

//    //不使用e.dataTransfer.getData('TEXT')获取选择文本，
//    // 可以拖拽链接上选中的文本

//    selectText = getSelectText(e);
//    if (selectText) {
//        onTextDrag(e);
//        return;
//    }

//    alert(selectText);

//    data = e.dataTransfer.getData('URL');
//    if (data) {
//        selectText = data;
//        onLinkDrag(data);
//        return;
//    }
//});


dragOver(function(e) {
    //改变鼠标光标 4.0.302.3 dev 失效
    e.preventDefault();
});


/**
*拖拽文本
*/
function onTextDrag(e) {
    search(dragEngine);
}

/**
*拖拽链接
*/
function onLinkDrag(src) {
    show(dragLinkDisplayMode, src);
}

/**
*拖拽图像
*/
function onImageDrag(src) {
    show(dragImageDisplayMode, src);
}

/**
*拖拽的是图片
*/
function isImg(e) {
    return e.target.tagName == "IMG";
}

function show(mode, src) {
    displayMode[mode](src);
}