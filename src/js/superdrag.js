/**
*超级拖拽
*/
dragEnd(function(e) {
    selectText = getSelectText(e);

    if (isImg(e)) {
        onImageDrag(e.target.src);
    }

    if (isLink(e)) {
        onLinkDrag(parent(e.target).href);
    }

    if (isText(e))
        onTextDrag(e);
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
    show(dragLinkDisplayMode,src);
}

/**
*拖拽图像
*/
function onImageDrag(src) {
    show(dragImageDisplayMode,src);
}

/**
*拖拽的是链接
*/
function isLink(e) {
    return e.target.nodeType == 3 && parent(e.target).tagName == "A" && parent(e.target).href;
}

function isImg(e) {
    return e.target.tagName == "IMG";
}

function isText(e) {
    return !isLink(e) && !isImg(e) && selectText != "";
}

function show(mode,src) {
    displayMode[mode](src);
}