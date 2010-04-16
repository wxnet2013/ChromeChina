/**
* @fileOverview 视频独立播放模块 
* @author 王祥
* @version 0.0.1
*/

var par = window.name;

//是否是播放器页面
var isMovieMode = (par != "" && par.indexOf("chromemovie") != -1),
//按钮状态
    isButtonShow = false;

if (isMovieMode) {
    //创建空白区域
    var a = setInterval(function () {
        if (document.body) {
            var div = document.createElement("div");
            div.style.cssText += ";position:fixed;left:0;top:0;z-index:9999;width:100%;height:100%;background:#fff url(" + chrome.extension.getURL("images/loading.gif") + ") no-repeat center center;";
            document.body.insertBefore(div, document.body.firstChild);
            clearInterval(a);
        }
    }, 0);
    //隐藏页面的滚动条
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.overflowX = "hidden";
}

//缩放视频大小
function movieResize(ele) {
    ele.style.zIndex = "999999";
    ele.style.width = window.innerWidth + "px";
    ele.style.height = window.innerHeight + "px";
    var pos = getPosition(ele);
    window.scrollTo(pos.left, pos.top);
}

function load() {
    if (isMovieMode) {
        var i = queryString("i", par);
        //显示视频
        getMovie(function (all) {
            var ele = all[i];
            ele.style.zIndex = "999999";
            ele.style.position = "fixed";
            ele.style.left = "0px";
            ele.style.top = "0px";

            //覆盖一些页面广告
            var temp = document.createElement("div");
            temp.innerHTML = "<div style='position:fixed;left:0;top:0'><iframe style='z-index:99999;width:2000px;height:2000px;background:#fff;'></iframe><div style='background:#fff;position:absolute;left:0;top:0;width:1000px;height:1000px;z-index:10000'></div><div>";
            temp.firstChild.getElementsByTagName("div")[0].appendChild(ele);
            document.body.appendChild(temp.firstChild);

            window.scrollTo(0, 0);

            window.addEventListener("resize", function () {
                movieResize(ele);
            }, false);
        });
    } else {
        getMovie(function (ele) {
            for (var i = 0; i < ele.length; i++) {
                (function () {
                    ele[i].onmouseover = bind(makebutton, ele[i], i);
                    ele[i].onmouseout = mouseout;
                })();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", load, false);

/**
获取页面上的视频
*/
function getMovie(fn) {
    var embed = document.getElementsByTagName("embed"), object = null;
    var len = embed.length;
    var all = [], i = 0;
    if (embed.length > 0) {
        for (i = 0; i < len; i++) {
            //embed可能是嵌入在object中的
            var ele = embed[i].parentNode.nodeName == "OBJECT" ? embed[i].parentNode : embed[i];
            all.push(ele);
        }
        fn(all);
        /**
        //复制视频节点并附加到文档末尾
        var e = embed[0].cloneNode(true);
        var temp = embed[0];
        temp.parentNode.removeChild(temp);
        document.body.appendChild(e);
        e.onmouseover = makebutton;
        */
    }

    //土豆网
    if (embed.length == 0) {
        obj = document.getElementsByTagName("object");

        if (obj.length != 0) {
            //obj[0].onmouseover = makebutton;
            fn(obj);

            /**
            var params = obj[j].getElementsByTagName("param");
            for (var i = 0, len = params.length; i < len; i++) {
            if (params[i].name == "flashvars") {
            //移除原始视频播放器
            obj[j].parentNode.removeChild(obj[j]);
            //重新建立视频播放器
            var em = '<embed id="embed_flash_player" allowscriptaccess="always" src="http://js.tudouui.com/bin/player_online/TudouVideoPlayer_Homer_134.swf" flashvars="' + params[i].value + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="405">'
            var div = document.createElement("div");
            div.innerHTML = em;
            document.body.appendChild(div.firstChild);
            document.getElementById("embed_flash_player").onmouseover = makebutton;
            }
            }
            */
        }
    }
}

function makebutton(index) {
    var btn = document.getElementById("btnchromecnmovie");
    if (btn) {
        btn.style.display = "";
    } else {
        var div = document.createElement("div");
        //chrome下div是无法覆盖住flash的，用iframe做按钮的容器
        div.innerHTML = "<div id='btnchromecnmovie'><iframe style='border: solid 1px #aca899;padding:4px 0px 0px 18px;z-index:9999;width:96px;height:22px;'><\/iframe><div style='cursor:pointer;padding:4px 0px 0px 18px;width:96px;height:22px;background:#F4F4F4 url(" + chrome.extension.getURL("images/ico_video3.gif") + ") no-repeat left center;position:absolute;left:1px;top:1px;z-index:10000;'>打开视频播放器</div></div>";
        btn = div.firstChild;
        document.body.appendChild(btn);
    }

    btn.style.position = "absolute";
    var pos = getPosition(this);
    btn.style.left = (pos.left + this.offsetWidth - 114) + "px";
    btn.style.top = (pos.top - 30) + "px";


    var width = this.offsetWidth, height = this.offsetHeight;
    btn.getElementsByTagName("div")[0].onclick = function () {
        showMovie(width, height, index);
    };

    div = null;
}

function mouseout() {
    var btn = document.getElementById("btnchromecnmovie");
    var timer = setTimeout(function () {
        btn.style.display = "none";
    }, 300);

    btn.onmouseover = function () {
        clearTimeout(timer);
    };
    btn.onmouseout = mouseout;
}

//打开视频窗口
function showMovie(w, h, index) {
    var screenW = screen.width, screenH = screen.height;
    postMessage_({
        "left": (screenW - w) / 2,
        "top": (screenH - h) / 2,
        "width": w,
        "height": h,
        "i": index,
        "video": location.href
    });
};

/**
util
*/
function getPosition(el) {
    var box = el.getBoundingClientRect(),
            doc = el.ownerDocument,
            body = doc.body,
            html = doc.documentElement,
            clientTop = html.clientTop || body.clientTop || 0,
            clientLeft = html.clientLeft || body.clientLeft || 0,
            top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop,
            left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;

    return { 'top': top, 'left': left };
}

function bind(fn, selfObj, var_args) {
    var context = selfObj || window;
    if (arguments.length > 2) {
        var boundArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
            var newArgs = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(newArgs, boundArgs);
            return fn.apply(context, newArgs);
        };
    } else {
        return function () {
            return fn.apply(context, arguments);
        };
    }
}

function queryString(sKey, url) {
    if (new RegExp("[\?&]" + sKey + "=([^&]+)").test(url)) {
        return RegExp.$1;
    } else {
        return "";
    }
}

