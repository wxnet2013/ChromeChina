/**
* @fileOverview 类式继承辅助方法
* @author wx
* @version 1.0.0
*/
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\bbase\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var base = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof base[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this.base;
            
            // Add a new .base() method that is the same method
            // but on the super-class
            this.base = base[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this.base = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();/**
* @fileOverview 扩展字符串对象
* @author lxl
* @version 1.0.0
*/
//string.js
if (!String.prototype.trim)
    String.prototype.trim = function(sStr) {
        /// <summary>
        /// 去掉字符串头尾中参数所给的字符串
        /// </summary>
        /// <param name="sStr">
        /// 可选参数，要去掉的字符串，不传递此参数则去空格符
        /// </param>
        var re;
        if (!sStr) re = /^\s+|\s+$/g;
        else re = RegExp("^(?:" + sStr + ")+|(?:" + sStr + ")+$", "g");
        return this.replace(re, "");
    };

if (!String.prototype.leftTrim)
    String.prototype.leftTrim = function(sStr) {
        /// <summary>
        /// 去掉字符串头中参数所给的字符串
        /// </summary>
        /// <param name="sStr">
        /// 可选参数，要去掉的字符串，不传递此参数则去空格符
        /// </param>
        var re;
        if (!sStr) re = /^\s+/;
        else re = new RegExp("^(?:" + sStr + ")+");
        return this.replace(re, "");
    };

if (!String.prototype.rightTrim)
    String.prototype.rightTrim = function(sStr) {
        /// <summary>
        /// 去掉字符串尾中参数所给的字符串
        /// </summary>
        /// <param name="sStr">
        /// 可选参数，要去掉的字符串，不传递此参数则去空格符
        /// </param>
        var re;
        if (!sStr) re = /\s+$/;
        else re = new RegExp("(?:" + sStr + ")+$");
        return this.replace(re, "");
    };

if (!String.prototype.startsWith)
    String.prototype.startsWith = function(sStr, bIgnoreCase) {
        /// <summary>
        /// 判断字符串是否以参数给出的字符串开始，返回布尔值
        /// </summary>
        /// <param name="sStr">
        /// 是否出现的字符串 
        /// </param>
        /// <param name="bIgnoreCase">
        /// 可选参数，是否忽略大小写，true为忽略，不传递此参数则默认为false  
        /// </param>
        var ignore = bIgnoreCase || false;
        if (ignore) {
            var oRegex = new RegExp('^' + sStr, 'i');
            return oRegex.test(this);
        }
        else
            return (this.substring(0, sStr.length) == sStr);

    };

if (!String.prototype.endsWith)
    String.prototype.endsWith = function(sStr, bIgnoreCase) {
        /// <summary>
        /// 判断字符串是否以参数给出的字符串结尾，返回布尔值
        /// </summary>
        /// <param name="sStr">
        /// 是否出现的字符串 
        /// </param>
        /// <param name="bIgnoreCase">
        /// 可选参数，是否忽略大小写，true为忽略，不传递此参数则默认为false 
        /// </param>
        var L1 = this.length;
        var L2 = sStr.length;
        var ignore = bIgnoreCase || false;

        if (L2 > L1)
            return false;

        if (ignore) {
            var oRegex = new RegExp(sStr + '$', 'i');
            return oRegex.test(this);
        }
        else
            return (L2 == 0 || this.substring(L1 - L2) == sStr);
    };

//format格式化字符串中某些字符
if (!String.prototype.format)
    String.prototype.format = function(aStr) {
        /// <summary>
        /// 模拟dot net里的format方法 将字符串中"{i}"替换为所给参数字符串
        /// </summary>
        /// <param name="aStr">
        /// 字符串数组["str1","str2"]或字符串参数列表"str1","str2"
        /// </param>
        aStr = arguments[0] && arguments[0].constructor === Array ? arguments[0] : Array.prototype.slice.call(arguments);
        if (aStr.length == 0) return this;
        for (var s = this, i = 0, j = aStr.length; i < j; i++){
            s = s.replace(new RegExp("\\{" + i + "\\}", "g"), aStr[i]);
        }
        return s;
    };
/**
* @fileOverview 扩展数组对象
* @author lxl
* @version 1.0.0
*/
//array.js
Array.prototype.inArray = function(value) {
    /// <summary>
    /// 匹配已知数组是否有参数所给的元素
    /// </summary>
    /// <param name="value">
    /// 要寻找的元素
    /// </param>
    for (var i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};
/**
*@fileOverview 核心代码库的一些工具方法
*@version 1.0.0
*@author wx
*/
//util.js
(function() {
    //core.js发布版本号
    var version = "0.3.4";
    var ua = navigator.userAgent.toLowerCase();
    //each by:john
    function each(object, callback, args) {
        /// <summary>
        /// 遍历对象
        /// </summary>
        /// <param name="object">
        /// 数组或伪数组等
        /// </param>
        /// <param name="callback">
        //  每次遍历执行的回调
        /// </param>
        /// <param name="args">
        /// 传递附加参数
        /// </param>
        var name, i = 0, length = object.length;
        //如果有附加参数
        if (args) {
            //如果不存在length属性(不是数组 伪数组 字符串)
            if (length == undefined) {
                //遍历对象的属性方法
                for (name in object)
                //不能执行就跳出
                    if (callback.apply(object[name], args) === false) break;
                //存在length属性        
            } else
            //数组内依次执行回调 不嫩执行就跳出
                for (; i < length; )
                if (callback.apply(object[i++], args) === false) break;

            //没有参数
        } else {

            if (length == undefined) {

                for (name in object)
                    if (callback.call(object[name], name, object[name]) === false) break;

            } else

                for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) { }

        }

        return object;
    }

    function nameSpace(a, b) {
        /// <summary>
        /// 将函数注册到命名空间
        /// util.nameSpace("ajax.get",fn);
        /// </summary>
        /// <param name="a">
        /// 命名空间
        /// </param>
        /// <param name="b">
        /// 函数
        /// </param>
        var c = a.split(/\./);
        var d = window;
        for (var e = 0; e < c.length - 1; e++) {
            //判断是否存在此命名方法属性
            if (!d[c[e]]) {
                //不存在就注册
                d[c[e]] = {};
            }
            //进入下一层
            d = d[c[e]];
        }
        //为命名赋函数 冲突时会用新方法覆盖旧方法
        d[c[c.length - 1]] = b;
    }

    //交替对象属性的两个值
    function toggle(obj, attr, v1, v2) {
        /// <summary>
        /// 实例类:交替对象属性的两个值
        /// </summary>
        /// <param name="obj">
        /// 某个对象
        /// </param>
        /// <param name="attr">
        //  对象属性
        /// </param>
        /// <param name="v1">
        /// 属性的一个值
        /// </param>
        /// <param name="v2">
        /// 属性的一个值
        /// </param>
        return function() {
            obj[attr] = (obj[attr] != v2) ? v2 : v1;
        };
    }

    function setCookie(name, value, expires, path, domain, secure) {
        /// <summary>
        /// 设置Cookie值
        /// </summary>
        /// <param name="name">
        /// Cookie名
        /// </param>
        /// <param name="value">
        /// Cookie值
        /// </param>
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + "=" + escape(value) +
		((expires) ? ";expires=" + expires_date.toGMTString() : "") + //expires.toGMTString()
		((path) ? ";path=" + path : "") +
		((domain) ? ";domain=" + domain : "") +
		((secure) ? ";secure" : "");
    }

    function getCookie(name) {
        /// <summary>
        /// 获取指定的Cookie值
        /// </summary>
        /// <param name="name">
        /// Cookie名
        /// </param>
        var start = document.cookie.indexOf(name + "=");
        var len = start + name.length + 1;
        if ((!start) && (name != document.cookie.substring(0, name.length))) {
            return null;
        }
        if (start == -1) return null;
        var end = document.cookie.indexOf(";", len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));
    }

    function deleteCookie(name, path, domain) {
        /// <summary>
        /// 删除指定的Cookie
        /// </summary>
        /// <param name="name">
        /// Cookie名
        /// </param>
        if (getCookie(name)) document.cookie = name + "=" +
			((path) ? ";path=" + path : "") +
			((domain) ? ";domain=" + domain : "") +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }

    //开启ie6缓存背景图片
    if (/msie/.test(ua)) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        }
        catch (e) {
        }
    }

    //public
    each("each,nameSpace,toggle,setCookie,getCookie,deleteCookie".split(","), function() {
        nameSpace("tx.util." + this, eval("(" + this + ")"));
    });

    //快捷访问方式
    each("each".split(","), function() {
        nameSpace("tx." + this, eval("(" + this + ")"));
    });

    tx.toString = function() {
        return "[object tx(version " + version + ")]";
    };
})();








/**
* @fileOverview 有关css脚本话的一些方法
* @author wx
* @version 1.0.0
*/
//style.js
(function() {
    /**
    * Convert a CSS property to camel case (font-size to fontSize)
    * @param {String} str The property that requires conversion to camel case
    * @return {String} The camel cased property string
    */
    var toCamelCase = (function() {
        var cache = {};
        return function(str) {
            if (!cache[str]) {
                return cache[str] = str.replace(/-([a-z])/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            } else {
                return cache[str];
            }
        }
    })();

    //将样式字符串转换为oStyle对象
    function toStyleObj(str) {
        //        var aTemp = ['{"'];
        //        aTemp.push(str.replace(/\:/gi, function() { return '":"'; }).replace(/\;$/, function() { return ""; }).replace(/\;/gi, function() { return '","' }));
        //        aTemp.push('"}');
        //        return aTemp.join("");
        //修正"background : url(http://192.168.1.41:8099/img/template1/ImgConbj_1.png) no-repeat"替换掉url中的":"问题 Edit: Kim Wang Date: 2009-6-18
        var aTemp = ['{"'];
        aTemp.push(str.replace(/[^\d]\:[^\/\/]/g, function(str) {
            return str.replace(/\:/, "\":\"");
        }).replace(/\;$/, function() { return ""; }).replace(/\;/gi, function() { return '","' }));
        aTemp.push('"}');
        return aTemp.join("");
    }

    function setStyle(elements, prop, val) {
        /// <summary>
        /// 设置元素的样式
        /// </summary>
        /// <param name="elements">
        /// 元素数组
        /// </param>
        /// <param name="prop">
        //  css属性
        /// </param>
        /// <param name="val">
        /// css设置值
        /// </param>
        var el = null;
        for (var i = 0, len = elements.length; i < len; i++) {

            el = (typeof elements[i] == "string") ? document.getElementById(elements[i]) : elements[i];

            if (prop == "opacity") {
                el.style.filter = "alpha(opacity=" + val * 100 + ")";
                el.style.opacity = val;
                continue;
            }

            if (prop == "float") {
                el.style.styleFloat = val; //IE
                el.style.cssFloat = val; //firefox and others explorer
                continue;
            }

            el.style[toCamelCase(prop)] = val;
        }
    }

    function setCSS(el, styles) {
        /// <summary>
        /// 设置元素的样式
        /// </summary>
        /// <param name="el">
        /// 元素数组或单个元素
        /// </param>
        /// <param name="styles">
        /// css样式json对象或者css代码
        /// </param>
        if (typeof styles == "string") styles = eval("(" + toStyleObj(styles) + ")");
        for (var prop in styles) {
            if (!styles.hasOwnProperty(prop)) continue;
            setStyle(el, prop.trim(), styles[prop].trim());
        }
    }

    function addClass(elem, classname) {
        /// <summary>
        /// 给指定的元素添加样式
        /// </summary>
        /// <param name="elem">
        /// dom元素
        /// </param>
        /// <param name="classname">
        //  css的类
        /// </param>
        if (typeof elem == "string") elem = document.getElementById(elem);
        elem.className += " " + classname;
    }

    function removeClass(elem, classname) {
        /// <summary>
        /// 移除指定的元素的样式
        /// </summary>
        /// <param name="elem">
        /// dom元素
        /// </param>
        /// <param name="classname">
        ///  css的类
        /// </param>
        if (typeof elem == "string") elem = document.getElementById(elem);
        elem.className = elem.className.replace(classname, " ");
    }


    tx.util.each("setCSS,setStyle,addClass,removeClass".split(","), function() {
        tx.util.nameSpace("tx.style." + this, eval("(" + this + ")"));
    });

    tx.util.each("setCSS,addClass,removeClass".split(","), function() {
        tx.util.nameSpace("tx." + this, eval("(" + this + ")"));
    });
})();/**
* @fileOverview 操作dom的方法
* @author lxl
* @version 1.0.0
*/
//dom.js
(function() {

    function $() {
        /// <summary>
        /// 根据id获取文档元素,传递多个参数返回文档元素数组
        /// </summary>
        /// <param name="id">
        /// 一个或多个文档元素id
        /// </param>
        var elements = [];
        for (var i = 0; i < arguments.length; i++) {
                var element = arguments[i];
                if (typeof element == 'string')
                    element = document.getElementById(element);
            //使单个参数时不用从数组中取    
                if (arguments.length == 1)
                    return element;
                elements.push(element);
        }
        return elements;
    }


    function tag(sTagName, oElem) {
        /// <summary>
        /// 根据标签查找文档元素
        /// </summary>
        /// <param name="sTagName">
        /// 要查找的标签的名称
        /// </param>
        /// <param name="oElem">
        ///  可选参数，父级节点
        /// </param>
        return (oElem || document).getElementsByTagName(sTagName);
    }

    function byClass(sSearchClass, oNode, sTag) {
        /// <summary>
        /// 根据class获取文档元素
        /// </summary>
        /// <param name="searchClass">
        /// 样式类别的名称
        /// </param>
        /// <param name="node">
        /// 可选参数，父级节点
        /// </param>
        /// <param name="tag">
        /// 可选参数，要查找的标签的名称
        /// </param>
        var classElements = [];
        if (oNode == null)
            oNode = document;
        if (sTag == null)
            //取所有
            sTag = '*';
        var els = oNode.getElementsByTagName(tag);
        var pattern = new RegExp("(^|\\s)" + sSearchClass + "(\\s|$)");
        for (i = 0, j = 0; i < els.length; i++) {
            //判断className的值字符串是否匹配
            if (pattern.test(els[i].className)) {
                classElements[j] = els[i];
                j++;
            }
        }
        return classElements;
    }


    function prev(oElement) {
        ///<summary>
        ///返回文档元素的上一个文档元素
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        do {
            oElement = oElement.previousSibling;
        //判断不是元素节点再向前
        } while (oElement && oElement.nodeType != 1);
        return oElement;
    }


    function next(oElement) {
        ///<summary>
        ///返回文档元素的下一个文档元素
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        do {
            oElement = oElement.nextSibling;
        } while (oElement && oElement.nodeType != 1);
        return oElement;
    }


    function first(oElement) {
        ///<summary>
        ///返回文档元素的第一个子文档元素
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        var oElement = oElement.firstChild;
        return (oElement && oElement.nodeType != 1) ? next(oElement) : oElement;
    }


    function last(oElement) {
        ///<summary>
        ///返回文档元素的最后一个子文档元素
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        var oElement = oElement.lastChild;
        return (oElement && oElement.nodeType != 1) ? prev(oElement) : oElement;
    }


    function getParent(oElement, iNum) {
        ///<summary>
        ///返回文档元素的nNum层父文档元素
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        ///<param name="nNum">
        ///返回父文档元素层数
        ///</param>
        var iNum = iNum || 1;
        for (var i = 0; i < iNum; i++)
            if (oElement != null) oElement = oElement.parentNode;
        return oElement;
    }


//    function before(oParent, oCurrent, oElem) {
//        ///<summary>
//        ///在已知节点前插入一个节点或多个节点
//        ///</summary>
//        ///<param name="oParent">
//        ///已知节点元素的父节点
//        ///</param>
//        ///<param name="oCurrent">
//        ///已知节点元素
//        ///</param>
//        ///<param name="elem">
//        ///要插入节点元素或要插入的多个节点元素组成的数组
//        ///</param>
//        // Check to see if no parent node was provided
//        if (oElem == null) {
//            oElem = oCurrent;
//            oCurrent = oParent;
//            oParent = oCurrent.parentNode;
//        }

//        var elems = checkElem(oElem);

//        for (var i = elems.length - 1; i >= 0; i--) {
//            oParent.insertBefore(elems[i], oCurrent);
//        }
//    }

    function before(oCurrent, oElem) {
        ///<summary>
        ///在已知文档元素前插入一个或多个文档元素
        ///</summary>
        ///<param name="oCurrent">
        ///已知文档元素
        ///</param>
        ///<param name="elem">
        ///要插入文档元素或要插入的多个文档元素组成的数组
        ///</param>
        // Check to see if no parent node was provided
        var oParent = oCurrent.parentNode;
        var elems = checkElem(oElem);

        for (var i = elems.length - 1; i >= 0; i--) {
            oParent.insertBefore(elems[i], oCurrent);
        }
    }// Des: 原函数逻辑太复杂而且参数不能和after统一 Author: lxl;  Date:2009-9-10


    function after(oCurrent, oElement) {
        ///<summary>
        ///在已知文档元素后插入一个或多个文档元素
        ///</summary>
        ///<param name="oCurrent">
        ///已知文档元素
        ///</param>
        ///<param name="oElement">
        ///要插入文档元素或要插入的多个文档元素组成的数组
        ///</param>
        var elems = checkElem(oElement);

        for (var i = elems.length - 1; i >= 0; i--) {
            if (oCurrent.nextSibling)
                oCurrent.parentNode.insertBefore(elems[i], oCurrent.nextSibling);
            else
                oCurrent.parentNode.appendChild(elems[i]);
        }
    }


    function create(sTagName) {
        ///<summary>
        ///建立一个文档元素但不添加
        ///</summary>
        ///<param name="sTagName">
        ///建立新文档元素的标签名
        ///</param>
        return document.createElementNS ?
        document.createElementNS('', sTagName) :
        document.createElement(sTagName);
    }


    function append(oParent, oElement) {
        ///<summary>
        ///为文档元素附加新的子文档元素
        ///</summary>
        ///<param name="oParent">
        ///已知文档元素
        ///</param>
        ///<param name="oElement">
        ///要附加的文档元素或要附加的多个文档元素组成的数组
        ///</param>
        var elems = checkElem(oElement);
        for (var i = 0; i < elems.length; i++) {
            oParent.appendChild(elems[i]);
        }
    }


    function remove(oElem) {
        ///<summary>
        ///移除文档元素
        ///</summary>
        ///<param name="elem">
        ///要移除的文档元素
        ///</param>
        if (oElem) oElem.parentNode.removeChild(oElem);
    }


    function empty(oElem) {
        ///<summary>
        ///删除已知文档元素所有子文档元素
        ///</summary>
        ///<param name="elem">
        ///已知文档元素
        ///</param>
        while (oElem.firstChild)
            remove(oElem.firstChild);
    }


    function getAttr(oElement, sName) {
        ///<summary>
        ///获取文档元素属性值
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        ///<param name="sName">
        ///要获取的属性名称
        ///</param>
        return attr(oElement, sName);
    }


    function setAttr(oElement, sName, sValue) {
        ///<summary>
        ///设置文档元素属性值并返回新属性值
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        ///<param name="sName">
        ///要设置的属性名称
        ///</param>
        ///<param name="sValue">
        ///新属性值
        ///</param>
        return attr(oElement, sName, sValue);
    }

    function attr(oElement, sName, sValue) {
        ///<summary>
        ///设置文档元素属性值并返回新属性值
        ///</summary>
        ///<param name="oElement">
        ///已知文档元素
        ///</param>
        ///<param name="sName">
        ///要设置的属性名称
        ///</param>
        ///<param name="sValue">
        ///新属性值
        ///</param>
        //确保提供的name是正确的字符串
        if (!sName || sName.constructor != String) return "";
        //检查name是否是可用getter和setter 是否是js中保留字
        //如果没有该匿名对象属性 {}.for  
        sName = { "for": "htmlFor", "class": "className"}[sName] || sName;
        //如果用户传入value参数
        if (sValue != null) {
            //首先使用快捷方式setter
            oElement[sName] = sValue;
            //setAttribute存在就使用
            if (oElement.setAttribute)
                oElement.setAttribute(sName, sValue);
        }
        //getter || getAttribute
        return oElement[sName] || oElement.getAttribute(sName) || "";
    }
    
    //添加节点可以是HTML字符串 字符串数组 DOM节点 DOM节点数组
    //将HTML字符串转化成DOM节点
    function checkElem(a) {
        var r = [];
        //如果参数不是数组 则强行转换数组 该数组一个元素
        if (a.constructor != Array) a = [a];
        for (var i = 0; i < a.length; i++) {
            //如果数组元素是字符串
            if (a[i].constructor == String) {
                //用一个临时元素来存放HTML
                var div = document.createElement("div");
                //注入HTML 转换成DOM节点div.childNodes[i] 
                div.innerHTML = a[i];
                //div.childNodes.length是动态的
                for (var j = 0; j < div.childNodes.length; j++)
                    r[r.length] = div.childNodes[j];
            //如果数组元素不是字符串        
            }else if (a[i].length) {
                //假定是DOM节点数组
                for (var j = 0; j < a[i].length; j++)
                    r[r.length] = a[i][j];
            }else {//否则假定是DOM节点
                r[r.length] = a[i];
            }
        }
        return r;
    }

    tx.util.each("$,byClass,tag,prev,next,first,last,getParent,before,after,create,append,remove,empty,getAttr,setAttr,attr".split(","), function() {
        tx.util.nameSpace("tx.dom." + this, eval("(" + this + ")"));
    });
    tx.util.each("$,byClass,tag".split(","), function() {
        tx.util.nameSpace("tx." + this, eval("(" + this + ")"));
    });
})();/**
*@fileOverview 事件处理相关的方法，包括添加移除事件,dom就绪等
*@version 1.0.0
*@author wx
*/
//events.js
(function() {
    // written by Dean Edwards, 2005
    // with input from Tino Zijdel, Matthias Miller, Diego Perini

    // http://dean.edwards.name/weblog/2005/10/add-event/

    function addEvent(element, type, handler) {
        /// <summary>
        /// 为元素注册事件
        /// </summary>
        /// <param name="element">
        /// 元素
        /// </param>
        /// <param name="type">
        //  事件类型
        /// </param>
        /// <param name="handler">
        /// 处理事件回调
        /// </param>
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else {
            // 为每一个事件处理函数赋予一个独立的ID
            if (!handler.$$guid) handler.$$guid = addEvent.guid++;
            // 为元素建立一个事件类型的散列表
            if (!element.events) element.events = {};
            // 为每对元素/事件建立一个事件处理函数的哈希表
            var handlers = element.events[type];
            if (!handlers) {
                handlers = element.events[type] = {};
                // 储存已有的事件处理函数(如果已存在一个)
                if (element["on" + type]) {
                    handlers[0] = element["on" + type];
                }
            }
            // 在哈希表中储存该事件处理函数
            handlers[handler.$$guid] = handler;
            // 赋予一个全局事件处理函数来处理所有工作
            element["on" + type] = handleEvent;
        }
    };
    // 创建独立ID的计数器
    addEvent.guid = 1;

    function removeEvent(element, type, handler) {
        /// <summary>
        /// 移除元素已经注册的事件
        /// </summary>
        /// <param name="element">
        /// 元素
        /// </param>
        /// <param name="type">
        //  事件类型
        /// </param>
        /// <param name="handler">
        /// 处理事件回调
        /// </param>
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else {
            // 从哈希表中删除事件处理函数
            if (element.events && element.events[type]) {
                delete element.events[type][handler.$$guid];
            }
        }
    };

    function handleEvent(event) {
        var returnValue = true;
        // 获取事件对象 (IE 使用全局的事件对象)
        event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
        // 获取事件处理函数哈希表的引用
        var handlers = this.events[event.type];
        // 依次执行每个事件处理函数
        for (var i in handlers) {
            this.$$handleEvent = handlers[i];
            if (this.$$handleEvent(event) === false) {
                returnValue = false;
            }
        }
        return returnValue;
    };
    // 增加一些IE事件对象缺乏的方法
    function fixEvent(event) {
        // 增加W3C标准事件方法
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        return event;
    };
    fixEvent.preventDefault = function() {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
    };

    /*
    domReady方法
    */
    var isReady = false, readyList = [];

    function domReady(fn) {
        /// <summary>
        /// dom加载完成后立即执行
        /// </summary>
        /// <param name="fn">
        /// 执行的回调函数
        /// </param>
        // 绑定监听函数
        bindReady();

        // 如果DOM已经加载 
        if (isReady)
        // 立即执行函数
            fn.call(document);

        // 否则 保留函数
        else
        // 把函数加入等待队列
            readyList.push(fn);

    }


    function ready() {

        // 判断DOM是否加载
        if (!isReady) {
            // DOM 已经加载
            isReady = true;

            // 如果readyList中有等待执行函数
            if (readyList) {
                // 执行所有等待的函数
                tx.each(readyList, function() {
                    this.call(document);
                });

                // 清空等待函数队列
                readyList = null;
            }

        }
    }


    var readyBound = false;

    function bindReady() {
        if (readyBound) return;
        readyBound = true;

        // 如果是Mozilla, Opera a浏览器提供这种方法
        if (document.addEventListener) {
            // 应用事件回调函数
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                ready();
            }, false);

            // 如果是 IE 浏览器
        } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", function() {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    ready();
                }
            });

            // 如果 IE 没有内框架 iframe
            // 继续检查是否已经加载完成
            //!window.frameElement改为window == window.top,window.frameElement跨域请求ie报错。
            if (document.documentElement.doScroll && window == window.top) (function() {
                if (isReady) return;

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    document.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }

                // 执行所有等待的函数
                ready();
            })();
        }

        // 一个window.onload的回调函数已经可以执行
        addEvent(window, "load", ready);
    }






    tx.util.each("addEvent,removeEvent,domReady".split(","), function() {
        tx.util.nameSpace("tx.event." + this, eval("(" + this + ")"));
    });

    //注册快捷访问方式
    tx.util.each("addEvent,removeEvent,domReady".split(","), function() {
        tx.util.nameSpace("tx." + this, eval("(" + this + ")"));
    });
})();
/**
* @fileOverview ajax轻量级框架
* @author wx
* @version 1.0.0
*/
//ajax.js
(function() {
    var isIE6 = !(navigator.userAgent.toLowerCase().indexOf("opera") > -1) && ((document.all) ? true : false) && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);

    /**
    * 公用ajax库
    * @module _private
    * @title  fast ajax
    */
    //private
    var _ajax = {
        _objPool: [], //对象池
        async: true, //是否为异步
        /**
        * 构造XmlHttpRequest对象池，
        * 解决同一页面不能发起多次ajax请求问题,池中有XMLHttpRequest对象就用 没有新建一个
        * @method _getInstance
        * @private 
        */
        _getInstance: function() {
            for (var i = 0; i < this._objPool.length; i++) {
                if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
                    return this._objPool[i];
                }
            }
            // IE5中不支持push方法
            this._objPool[this._objPool.length] = this._CreateXHR();
            return this._objPool[this._objPool.length - 1];
        },

        /**
        * 创建XmlHttpRequest对象
        * @method  _CreateXHR
        * @private 
        */
        _CreateXHR: function() {
            if (window.XMLHttpRequest) {
                var objXMLHttp = new XMLHttpRequest();
            }
            else {
                var MSXML = ['Msxml2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
                for (var i = 0; i < MSXML.length; i++) {
                    try {
                        var objXMLHttp = new ActiveXObject(MSXML[i]);
                        break;
                    }
                    catch (e) {
                    }
                }
            }
            //mozilla某些版本没有readyState属性,给其添加事件监视器
            if (objXMLHttp.readyState == null) {
                objXMLHttp.readyState = 0;
                //addEventListener第三个参数true为capture false为bubbling
                objXMLHttp.addEventListener("load", function() {
                    objXMLHttp.readyState = 4;
                    if (typeof objXMLHttp.onreadystatechange == "function") {
                        objXMLHttp.onreadystatechange();
                    }
                }, false);
            }
            return objXMLHttp;
        },

        /**
        * 转换传入数据格式。将json,object对象数据格式转换成键值对格式。
        * @method _param
        * @param  {String}/{Json}/{Object}  data  发送到服务器上的数据,
        *                                         必须将方法设为POST.  
        * @private 
        */
        _param: function(data) {
            if (data == "null")
                return null;
            var s = [];
            if (data.constructor == Object) {
                for (var key in data) {
                    s.push(encodeURIComponent(key.toString()) + "=" + encodeURIComponent(data[key]));
                }
            }
            else {
                var arr = data.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var temp = arr[i].split("=");
                    s.push(encodeURIComponent(temp[0]) + "=" + encodeURIComponent(temp[1]));
                }
            }
            return s.join("&").replace(/%20/g, "+");
        },

        /**
        * 处理一个ajax请求。
        *
        * @method _send
        * @static
        * @param  {String}  method  请求方法[POST]、[GET]
        * @param  {String}  url  请求路径
        * @param  {String}/{Json}/{Object}  data  发送到服务器上的数据,
        *                                         必须将方法设为POST.
        * @param  {function}     callback 请求成功后的处理函数，
        *                                 函数接收XmlHttpRequest对象
        * @return {none}      没有返回值
        */
        _send: function(method, url, data, callback) {
            var objXMLHttp = this._getInstance();
            callback = callback || function() { };
            with (objXMLHttp) {
                try {
                    // 加随机数防止缓存
                    if (url.indexOf("?") > 0) {
                        url += "&randnum=" + Math.random();
                    }
                    else {
                        url += "?randnum=" + Math.random();
                    }
                    open(method, url, true);

                    // 设定请求编码方式
                    setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

                    send(this._param(data));
                    onreadystatechange = function() {
                        if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
                            if (typeof callback == "function") {
                                callback(objXMLHttp);
                            }
                        }
                    }
                }
                catch (e) {
                    alert(e);
                }
            }
        },
        /**
        * post请求
        * @method  post 
        * @private
        */
        post: function(url, data, callback) {
            /// <summary>
            /// post发送数据
            /// </summary>
            /// <param name="url">
            /// 要请求的url
            /// </param>
            /// <param name="data">
            //  需要发送的数据json或key=value
            /// </param>
            /// <param name="callback">
            /// 回调函数
            /// </param>

            _ajax._send("POST", url, data, callback);

        },

        /**
        * get请求
        * @method  get 
        * @private 
        */
        get: function(url, callback) {
            /// <summary>
            /// get方法获取数据
            /// </summary>
            /// <param name="url">
            /// 请求路径
            /// </param>
            /// <param name="callback">
            /// 回调函数
            /// </param>

            //跨域请求
            if (!url.indexOf("http") || !url.indexOf("//")) {
                var _head = document.getElementsByTagName("head")[0];
                var _script = document.createElement("script");
                _script.src = url;
                _script.onload = _script.onreadystatechange = function() {
                    if ((!_script.readyState ||
							_script.readyState == "loaded" || _script.readyState == "complete")) {
                        (callback || function() { })();
                       (!isIE6) && _head.removeChild(_script);
                    }
                };
                _head.appendChild(_script);
            } else {
                _ajax._send("GET", url, "null", callback);
            }
        }
    };

    /*
    *使用nameSpace公开post和get方法
    */
    tx.util.nameSpace("tx.ajax.post", _ajax.post);
    tx.util.nameSpace("tx.ajax.get", _ajax.get);
})();




/**
* @fileoverview 统一管理公共代码模块
* @version 1.0.0
* @author wx
*/
(function() {
    window['tx'] = window['tx'] || {};
    window['tx']['loader'] = window['tx']['loader'] || {};

    tx.loader.ServiceBase = 'http://img.txooo.com/js';
    tx.loader.TxoooApisBase = 'http://img.txooo.com/js';

    //util ================================================================================
    function setLoad(obj, fn) {
        return obj.load = fn
    }

    var F = {};
    //判断浏览器类型
    function E(a) {
        //缓存
        if (a in F)
            return F[a];
        return F[a] = navigator.userAgent.toLowerCase().indexOf(a) != -1
    }


    //继承
    function inherit(a, b) {
        var c = function() {
        };
        c.prototype = b.prototype;
        a.K = b.prototype;
        a.prototype = new c
    }

    function H(a, b) {
        var c = a.w || [];
        c = c.concat(Array.prototype.slice.call(arguments, 2));
        if (typeof a.r != "undefined")
            b = a.r;
        if (typeof a.q != "undefined")
            a = a.q;
        var d = function() {
            var g = c.concat(Array.prototype.slice.call(arguments));
            return a.apply(b, g)
        };
        d.w = c;
        d.r = b;
        d.q = a;
        return d
    }

    //error类
    function error(msg) {
        var temp = new Error(msg);
        temp.toString = function() {
            return this.message
        };
        return temp
    }

    //注册命名空间
    function nameSpace(a, b) {
        for (var c = a.split(/\./), d = window, g = 0; g < c.length - 1; g++) {
            d[c[g]] || (d[c[g]] = {});
            d = d[c[g]]
        }
        d[c[c.length - 1]] = b
    }

    function K(a, b, c) {
        a[b] = c
    }
    
    //tx.loader.? ================================================================================

    //tx.loader.callbacks
    if (!L)
        var L = nameSpace;
    if (!aa)
        var aa = K;

    tx.loader.callbacks = {};
    L("tx.loader.callbacks", tx.loader.callbacks);

    var Moudles = {}, N = {};

    tx.loader.eval = {};
    L("tx.loader.eval", tx.loader.eval);


    /*
    * 设置装载需要装载的模块
    */
    setLoad(tx, function(a, b, c) {
        var d = Moudles[":" + a];
        if (d) {
            if (c && !c.language && c.locale)
                c.language = c.locale;
            if (c && typeof c.callback == "string") {
                var g = c.callback;
                if (g.match(/^[[\]A-Za-z0-9._]+$/)) {
                    g = window.eval(g);
                    c.callback = g
                }
            }
            var l = c && c.callback != f;
            if (l && !d.p(b))
                throw error("Module: '" + a + "' must be loaded before DOM onLoad!");
            else
                if (l)
                d.k(b, c) ? window.setTimeout(c.callback, 0) : d.load(b, c);
            else
                d.k(b, c) || d.load(b, c)
        }
        else
            throw error("模块: \"" + a + "\" 未找到!");
    });
    L("tx.load", tx.load);

    /**
    * 设置回调函数,并且开始加载模块代码
    *
    *
    * @param {Function} fn 回调函数
    */
    tx.setOnLoadCallback = function(fn) {
        var moudle = tx.loader["mname"];
            var a = moudle;
            Moudles[":" + a]["load"].setOnLoad(fn);
        //delete tx.loader["mname"];
    };
    L("tx.setOnLoadCallback", tx.setOnLoadCallback);

    tx.loader.writeLoadTag = function(a, b, c) {
        if (c) {
            var d;
            if (a == "script") {
                d = document.createElement("script");
                d.type = "text/javascript";
                d.src = b
            }
            else
                if (a == "css") {
                d = document.createElement("link");
                d.type = "text/css";
                d.href = b;
                d.rel = "stylesheet"
            }
            var g = document.getElementsByTagName("head")[0];
            g || (g = document.body.parentNode.appendChild(document.createElement("head")));
            g.appendChild(d)
        }
        else
            if (a == "script")
            document.write('<script src="' + b + '" type="text/javascript"><\/script>');
        else
            a == "css" && document.write('<link href="' + b + '" type="text/css" rel="stylesheet"></link>')
    };
    L("tx.loader.writeLoadTag", tx.loader.writeLoadTag);


    tx.loader.rfm = function(a) {
        N = a
    };
    L("tx.loader.rfm", tx.loader.rfm);


    tx.loader.rpl = function(a) {
        for (var b in a)
            if (typeof b == "string" && b && b.charAt(0) == ":" && !Moudles[b])
            Moudles[b] = new rpl(b.substring(1), a[b])
    };
    L("tx.loader.rpl", tx.loader.rpl);


    tx.loader.rm = function(a) {
        if ((a = a.specs) && a.length)
            for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (typeof c == "string")

                Moudles[":" + c] = new U(c);
            else {
                var d = new V(c.name, c.baseSpec, c.customSpecs);
                Moudles[":" + d.name] = d
            }
        }
    };
    L("tx.loader.rm", tx.loader.rm);


    tx.loader.loaded = function(a) {
        Moudles[":" + a.module].i(a)
    };
    L("tx.loader.loaded", tx.loader.loaded);

    //Classes U W V rpl loadScript =========================================================

    //class U
    function U(a) {
        this.a = a;
        this.n = {};
        this.b = {};
        this.j = true;
        this.c = -1
    }

    U.prototype.f = function(a, b) {
        var c = "";
        if (b != undefined) {
            if (b.language != undefined)
                c += "&hl=" + encodeURIComponent(b.language);
            if (b.nocss != undefined)
                c += "&output=" + encodeURIComponent("nocss=" + b.nocss);
            if (b.nooldnames != undefined)
                c += "&nooldnames=" + encodeURIComponent(b.nooldnames);
            if (b.packages != undefined)
                c += "&packages=" + encodeURIComponent(b.packages);
            if (b.callback != f)
                c += "&async=2";
            if (b.other_params != undefined)
                c += "&" + b.other_params
        }
        if (!this.j) {
            if (k[this.a] && k[this.a].JSHash)
                c += "&sig=" + encodeURIComponent(k[this.a].JSHash);
            var d = [];
            for (var g in this.n)
                g.charAt(0) == ":" && d.push(g.substring(1));
            for (g in this.b)
                g.charAt(0) == ":" && d.push(g.substring(1));
            c += "&have=" + encodeURIComponent(d.join(","))
        }
        return tx.loader.ServiceBase +
    "/?file=" +
    this.a +
    "&v=" +
    a +
    tx.loader.AdditionalParams +
    c
    };
    U.prototype.u = function(a) {
        var b = f;
        if (a)
            b = a.packages;
        var c = f;
        if (b)
            if (typeof b == "string")
            c = [a.packages];
        else
            if (b.length) {
            c = [];
            for (var d = 0; d < b.length; d++)
                typeof b[d] == "string" && c.push(b[d].replace(/^\s*|\s*$/, "").toLowerCase())
        }
        c || (c = ["default"]);
        var g = [];
        for (d = 0; d < c.length; d++)
            this.n[":" + c[d]] || g.push(c[d]);
        return g
    };
    //U.prototype.load
    setLoad(U.prototype, function(a, b) {
        var c = this.u(b), d = b && b.callback != f;
        if (d)
            var g = new W(b.callback);
        for (var l = [], u = c.length - 1; u >= 0; u--) {
            var y = c[u];
            d && g.z(y);
            if (this.b[":" + y]) {
                c.splice(u, 1);
                d && this.b[":" + y].push(g)
            }
            else
                l.push(y)
        }
        if (c.length) {
            if (b && b.packages)
                b.packages = c.sort().join(",");
            if (!b && N[":" + this.a] != f && N[":" + this.a].versions[":" + a] != f && !tx.loader.AdditionalParams && this.j) {
                var z = N[":" + this.a];
                k[this.a] = k[this.a] ||
            {};
                for (var Q in z.properties)
                    if (Q && Q.charAt(0) == ":")
                    k[this.a][Q.substring(1)] = z.properties[Q];

                tx.loader.writeLoadTag("script", tx.loader.ServiceBase +
            z.path +
            z.js, d);

                z.css && tx.loader.writeLoadTag("css", tx.loader.ServiceBase + z.path + z.css, d)
            }
            else
                if (!b || !b.autoloaded)
                tx.loader.writeLoadTag("script", this.f(a, b), d);
            if (this.j) {
                this.j = false;
                this.c = (new Date).getTime();
                if (this.c % 100 != 1)
                    this.c = -1
            }
            for (u = 0; u < l.length; u++) {
                y = l[u];
                this.b[":" + y] = [];
                d && this.b[":" + y].push(g)
            }
        }
    });
    U.prototype.i = function(a) {
        if (this.c != -1) {
            this.c = -1
        }
        for (var b = 0; b < a.components.length; b++) {
            this.n[":" + a.components[b]] = true;
            var c = this.b[":" + a.components[b]];
            if (c) {
                for (var d = 0; d < c.length; d++)
                    c[d].C(a.components[b]);
                delete this.b[":" + a.components[b]]
            }
        }
    };
    U.prototype.k = function(a, b) {
        return this.u(b).length == 0
    };
    U.prototype.p = function() {
        return true
    };


    //class W
    function W(a) {
        this.B = a;
        this.l = {};
        this.o = 0
    }

    W.prototype.z = function(a) {
        this.o++;
        this.l[":" + a] = true
    };
    W.prototype.C = function(a) {
        if (this.l[":" + a]) {
            this.l[":" + a] = false;
            this.o--;
            this.o == 0 && window.setTimeout(this.B, 0)
        }
    };


    //class V
    function V(a, b, c) {
        this.name = a;
        this.A = b;
        this.m = c;
        this.t = this.g = false;
        this.h = [];
        tx.loader.callbacks[this.name] = H(this.i, this)
    }

    inherit(V, U);

    V.prototype.load = function(a, b) {
        var c = b && b.callback != f;
        if (c) {
            this.h.push(b.callback);
            b.callback = "tx.loader.callbacks." + this.name
        }
        else
            this.g = true;
        if (!b || !b.autoloaded) {
            var src = this.f(a, b);
            tx.loader["mname"] = this.name;
            Moudles[":" + this.name]["load"] = new loadScript(src);
        }
    };
    V.prototype.k = function(a, b) {
        return b && b.callback != f ? this.t : this.g
    };
    V.prototype.i = function() {
        this.t = true;
        for (var a = 0; a < this.h.length; a++)
            window.setTimeout(this.h[a], 0);
        this.h = []
    };

    //    var Y = function(a, b) {
    //        return a.string ? encodeURIComponent(a.string) + "=" + encodeURIComponent(b) : a.regex ? b.replace(/(^.*$)/, a.regex) : ""
    //    };

    V.prototype.f = function(a, b) {
        return this.F(this.v(a), a, b)
    };
    V.prototype.F = function(a, b, c) {
        var d = "";
        //        if (a.key)
        //            d += "&" + Y(a.key, tx.loader.ApiKey);
        //        if (a.version)
        //            d += "&" + Y(a.version, b);
        var g = tx.loader.Secure && a.ssl ? a.ssl : a.uri;
        //        if (c != f)
        //            for (var l in c)
        //            if (a.params[l])
        //            d += "&" + Y(a.params[l], c[l]);
        //        else
        //            if (l == "other_params")
        //            d += "&" + c[l];
        //        else
        //            if (l == "base_domain")
        //            g = "http://" + c[l] + a.uri.substring(a.uri.indexOf("/", 7));
        //        tx[this.name] = {};
        //        if (g.indexOf("?") == -1 && d)
        //            d = "?" + d.substring(1);
        return g + d
    };
    V.prototype.p = function(a) {
        return this.v(a).deferred
    };
    V.prototype.v = function(a) {
        if (this.m)
            for (var b = 0; b < this.m.length; ++b) {
            var c = this.m[b];
            if ((new RegExp(c.pattern)).test(a))
                return c
        }
        return this.A
    };


    //class rpl 处理rpl
    function rpl(a, b) {
        this.a = a;
        this.e = b;
        this.g = false
    }

    inherit(rpl, U);

    rpl.prototype.load = function(a, b) {
        this.g = true;
        var src = this.f(a, b);
        tx.loader["mname"] = this.a;
        Moudles[":" + this.a]["load"] = new loadScript(src);
    };

    rpl.prototype.k = function() {
        return this.g
    };
    rpl.prototype.i = function() {
    };
    //组织第三方代码的url
    rpl.prototype.f = function(a, b) {
        if (!this.e.versions[":" + a]) {
            if (this.e.aliases) {
                var c = this.e.aliases[":" + a];
                if (c)
                    a = c
            }
            if (!this.e.versions[":" + a])
                throw error("Module: '" + this.a + "' with version '" + a + "' not found!");
        }
        var d = tx.loader.TxoooApisBase + "/libs/" + this.a + "/" + a + "/" + this.e.versions[":" + a][b && b.uncompressed ? "uncompressed" : "compressed"];

        return d
    };
    rpl.prototype.p = function() {
        return false
    };

    //class loadScript
    function loadScript(path) {
        this.src = path;
    }

    loadScript.prototype.setOnLoad = function(fn) {
        var _script = document.createElement("script");
        _script.src = this.src;

        var _head = document.getElementsByTagName("head")[0];
        _head || (_head = document.body.parentNode.appendChild(document.createElement("head")));
        _head.appendChild(_script);

        //脚本下载完成后执行函数
        _script.onload = _script.onreadystatechange = function() {
            if ((!_script.readyState ||
        _script.readyState == "loaded" ||
        _script.readyState == "complete")) {

                fn.call(window);
            }
        };
    };

    /**
    * 直接加在无需执行回调的代码模块,如日历模块calendar、广告样式模块adstyle
    * Usage:
    * tx.moudle("calendar", "1");
    * 
    * @param {String} sName 模块的名称
    * @param {String} sVer 模块的版本
    * @parem {Function} fn 需要执行的回调函数 
    */
    tx.module = function(sName, sVer,fn) {
        tx.load(sName, sVer);
        tx.setOnLoadCallback(fn || function() { });
    };

    //文件加载时,初始化模块===========================================================================
    tx.loader.rm({
        "specs": [{
            "name": "imagecut",
            "baseSpec": {
                "uri": "http://img.txooo.com/pichelper/imagecut.js",
                "ssl": null,
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": true,
                "params": {
                    "callback": {
                        "string": "callback"
                    },
                    "language": {
                        "string": "hl"
                    },
                    "country": {
                        "string": "gl"
                    }
                }
            }
}]
        });


        //rfm
        tx.loader.rfm({});

        //rpl
        tx.loader.rpl({
            ":popup": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "popup.js",
                        "compressed": "popup.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            },
            ":cssselect": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "cssselect.js",
                        "compressed": "cssselect.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            },
            ":colorpicker": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "colorpicker.js",
                        "compressed": "colorpicker.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            },
            ":calendar": {
                "versions": {
                    ":0.1.0": {
                        "uncompressed": "calendar.js",
                        "compressed": "calendar.js"
                    }
                },
                "aliases": {
                    ":1": "0.1.0"
                }
            },
            ":adstyle": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "adstyle.js",
                        "compressed": "adstyle.js"
                    },
                    ":2.0.0": {
                        "uncompressed": "adstyle.js",
                        "compressed": "adstyle.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0",
                    ":2":"2.0.0"
                }
            },
            ":linkage": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "linkage.js",
                        "compressed": "linkage.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            },
            ":animation": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "fx.js",
                        "compressed": "fx.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            },
            ":validate": {
                "versions": {
                    ":1.0.0": {
                        "uncompressed": "validate.js",
                        "compressed": "validate.js"
                    }
                },
                "aliases": {
                    ":1": "1.0.0"
                }
            }
        });
    })();


