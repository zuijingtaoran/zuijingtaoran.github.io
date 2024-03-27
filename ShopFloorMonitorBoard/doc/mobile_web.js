(w=>{
    class MobileWeb {
        constructor() {
           
        }
        isMobile() {
            //
            return /(nokia|iphone|ipad|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i.test(w.navigator.userAgent);
        }
        getCss(o, key) {
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
        }
        drag(ele) {
          
            let element = ele;
                 element.style.top = this.getCss(element, "top");
            element.style.left = this.getCss(element, "left");
            var hammer = new Hammer(element);//hammer实例
            var x = 0;
            var y = 0;
            hammer.on('panstart', function (event) {
                x = parseInt(element.style.left);
                y = parseInt(element.style.top);
            });
            hammer.on('panmove', function (event) {
                element.style.top = y + event.deltaY + "px";
                element.style.left = x + event.deltaX + "px";
            });
            hammer.on('panend', function (event) {

            });
            
        }
        addZoomIcon() {
            let [zoombox, zoomout, zoomin] = [w.document.createElement("div"), w.document.createElement("span"), w.document.createElement("span")];
            const webpx = w.PX * 2.5;
            zoombox.setAttribute('class', 'zoombox');
            zoomout.setAttribute('id', 'zoomout');
            zoomin.setAttribute('id', 'zoomin');
            [zoomout.innerText, zoomin.innerText] = ["+", "-"];
            zoombox.appendChild(zoomout);
            zoombox.appendChild(zoomin);
            w.document.body.appendChild(zoombox);
            $('.zoombox span').bind('click', function (e) {
                if ($(this).attr('id').includes('out')) {
                    w.div.css('width', (w.div.css('width') + webpx) + 'px');
                    w.div.css('height', (w.div.css('height') + webpx / w.ratio) + 'px');
                } else {
                    w.div.css('width', (w.div.css('width') - webpx) + 'px');
                    w.div.css('height', (w.div.css('height') - webpx / w.ratio) + 'px');
                }
                w.div.css('width') > 1000 ? $('.status_icon_small').removeClass('status_icon_small') :
                    $('.status_icon').addClass('status_icon_small');
                e.stopPropagation();
                return false;
            });
           
           
            return this;
        }
        
    }
    var mw = new MobileWeb();
    mw.addZoomIcon().isMobile() && mw.drag(w.document.getElementById("box"));

    
   

})(window);