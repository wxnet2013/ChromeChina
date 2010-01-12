/**
*超级拖拽
*/
dragDrop(function(e) {
    var data = e.dataTransfer.getData('URL');

    if (!data) {
        data = e.dataTransfer.getData('Text');

    }

    selectText = data;

    if (isImg(e)) {
        onImageDrag(e.target.src);
    }

    if (isLink(e)) {
        onLinkDrag(parent(e.target).href || parent(e.target, 2).href);
    }

    if (isText(e))
        onTextDrag(e);
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
*拖拽的是链接
*/
function isLink(e) {
    return e.target.nodeType == 3 && ((parent(e.target).tagName == "A" && parent(e.target).href) || (parent(e.target, 2).tagName == "A" && parent(e.target, 2).href)) && getSelectText() == "";
}

function isImg(e) {
    return e.target.tagName == "IMG";
}

function isText(e) {
    return !isLink(e) && !isImg(e) && selectText != "";
}

function show(mode, src) {
    displayMode[mode](src);
}