/*
@author:jiangong.yu
@date:17-4-5       
@use: onfoucs='jselect()' / onclick='jselect(1)'
@format:1:yyyy-MM
2:yyyy MM
3:yyyy/MM
*/
;!function (w) {
    dt = document;
    ce = "createElement",
    gi = "getElementById",
    gt = "getElementsByTagName",
   ac = 'appendChild';

    rc = 'removeChild';

    !function () {
        if (!dt[gi]('jstyle')) {


            var jcss = dt[ce]('link');
            jcss.rel = "stylesheet";
            jcss.id = "jstyle";
            jcss.href = (function () {
                var ja = dt.scripts;
                var jc = ja[ja.length - 1].src;
                var jpath;
                return jpath ? jpath : jc.substring(0, jc.lastIndexOf("/") + 1)
            })() + "jg_month.css";

            dt[gt]('head')[0][ac](jcss);
        }
    }();

    w.position = function (o, e) {
        var t = o.offsetTop;
        var l = o.offsetLeft;
        var w = o.clientWidth;
        var h = o.clientHeight;
        while (o = o.offsetParent) {
            t += o.offsetTop;
            l += o.offsetLeft;
        }
        return {
            'top': t,
            'left': l,
            'width': w,
            'height': h,
            'x': e.clientX - l,
            'y': e.clientY - t
        }

    },
    w.jmonth = function () {

     !!dt[gi]('jmonth')?  dt.body[rc](dt[gi]('jmonth')):1;
        var te = w.event;

        var para = position(te.target || te.srcElement, te);
        var jbox = dt[ce]('div');

        jbox.setAttribute('class', 'jbox');
        jbox.setAttribute('id', 'jmonth');
        jbox.style.left = para['left'] + 'px';
        jbox.style.top = (para['top'] + para['height'] + 4) + 'px';
        // jbox.style.width = para['width'] + 'px';
        jbox.innerHTML = "<input class='jbut jreduce'id='jreduce' type=button value='-' /><input class='jbut jyear' id='jyear' value='" +

            (function () {
                return (new Date()).getFullYear()
            })() + "' /><input class='jbut jadd' id='jadd' type=button value='+' />" +
        (function () {
            var ret = "";
            var mts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (ms in mts) {
                ret += "<input class='jms' name='jms' ind='" + (ms * 1 + 1) + "' value='" + mts[ms] + "' type=button />";
            }
            return ret + "<a class='jlnk' href='javascript:;'>Close</a><a class='jlnk' href='javascript:;'>Clear</a>"
        })();


        dt.body[ac](jbox);

        jbox.addEventListener("click", function (event) {
            var target = event.target || event.srcElement;

            if (target == dt[gi]('jreduce')) {
                var yyyy = dt[gi]('jyear').value;
                yyyy > 1 ? dt[gi]('jyear').value = yyyy * 1 - 1 : 1;
            }
            if (target == dt[gi]('jadd')) {
                var yyyy = dt[gi]('jyear').value;
                yyyy < 9999 ? dt[gi]('jyear').value = yyyy * 1 + 1 : 1;
            }
            if (target.className.indexOf('jms') > -1) {
                te.target.value = dt[gi]('jyear').value + '' + ('0' + target.getAttribute('ind')).substr(-2, 2);
                setTimeout(function () { dt.body[rc](jbox); }, 100);
            }
            if (target.className.indexOf('jlnk') > -1) {
                target.innerHTML === 'Close' ? setTimeout(function () { dt.body[rc](jbox); }, 100) : 1;
                target.innerHTML === 'Clear' ? setTimeout(function () { te.target.value = ''; dt.body[rc](jbox); }, 100) : 1;
            }

        })

    }

} (window)




      