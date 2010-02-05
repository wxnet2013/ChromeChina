/**
*@fileoverview 保存选中的内容
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









