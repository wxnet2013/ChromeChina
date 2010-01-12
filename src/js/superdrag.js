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

dragDrop(function(e) {
    if (isDragImg) return;
    var data = e.dataTransfer.getData('URL');
    if (data) {
        selectText = data;
        onLinkDrag(data);
        return;
    }
    data = e.dataTransfer.getData('Text');
    if (data) {
        selectText = data;
        onTextDrag(e);
        return;
    }
});

dragOver(function(e) {
    //改变鼠标光标
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