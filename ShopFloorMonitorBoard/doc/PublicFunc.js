 function PublicFunc(){
     this.desc = "zoom page funcs";
     this.cls = 'table';
     this.id = 'jsonToTable';
};
PublicFunc.prototype = {
    constructor: PublicFunc
    , setCookie: function (cname, cvalue, exdays) {
        
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        
    }
    ,
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    ,getQuery: function () {
        var reg = new RegExp("(^|&)" + (arguments[0]||"") + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return 'SMT';
    }
    , asynAjax: function () {
       
        /*
      .[0] area list
      .[1] callback func
        .[2] endover func
        .[3] area box name
        */

        var that = arguments,
            args = [];
        var pub = that[1];
        if (Object.prototype.toString.call(that[0]).slice(8, -1) === "Array") {
            args = that[0]
        } else {
            return;
        }
        if (args.length > 0) {
            var currentVal = args.shift();         

            $.getJSON('maps/' + that[3] + '/' + currentVal + '.json?_=' + Math.random(), 
                function (data) {                    
                    pub(currentVal, data);
                    return that.callee(args, pub, that[2], that[3]);
                })

        } else {
            that[2]();
            //可处理其它事宜。
        }
    }
    , getTable: function () {
        var objs = arguments[0];
        if (typeof arguments[1] === "object") {
            for (var cons in arguments[1]) {
                this[cons] = arguments[1][cons];
            }
        }
        
       
        if (typeof objs === "object") {
            var length = objs.length,
           
                that = this;

            //*****************************************
            var tabs = "<table id='" + that.id + "' class='" + that.cls + "'>";
         
                tabs += "<tr>";
                for (var items in objs[0]) {

                    tabs += "<th>" + items + "</th>";
                }
                tabs += "</tr>";
           
          
            for (var i = 0; i < len; i++) {
                tabs += "<tr >";
                for (var lists in objs[i]) {
                  
                    tabs += "<td >" + objs[i][lists] + "</td>";
                }
                tabs += "</tr>";
            }
            tabs += "</table>";
            return tabs;
        } else {

            return 'format error';
        }

    }

}

/////////////////////////////////////////////


Node.prototype.attr = function () {
    if (!arguments[1]) {
        //get
        return "" + this.getAttribute(arguments[0]);
    } else {
        //set
        return this.setAttribute(arguments[0], arguments[1]), this;
    }
}
Node.prototype.css = function () {



    if (!arguments[1]) {

        return this[
            {
                'width': 'offsetWidth'
                , 'height': 'offsetHeight'
            }[arguments[0]]
        ];

    } else {
        //set
        return this.style[arguments[0]] = arguments[1], this;
    }
};
Node.prototype.addChild = function () {
   
    var cld = document.createElement(arguments[2]||"div");
    var style = arguments[0] || {};
    var attr = arguments[1] || {};
    for (arg in style) {
        cld.css(arg, style[arg])
    };
    for (arg in attr) {
        cld.attr(arg, attr[arg])
    };
    cld.innerHTML = (arguments[3] || "");
    this.appendChild(cld);
    cld = null;
    return this;
}

/////////////////////////////////////////////////////////////


addEvent = (function (window, undefined) {
    var _eventCompat = function (event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        //alert(event.delta);
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
                event.returnValue = false;
            };
        }
        /*
           ......其他一些兼容性处理 */
        return event;
    };
    if (window.addEventListener) {
        return function (el, type, fn, capture) {
            if (type === "mousewheel" && document.mozFullScreen !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function (event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function (el, type, fn, capture) {
            el.attachEvent("on" + type, function (event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));
            });
        }
    }
    return function () { };
})(window);

