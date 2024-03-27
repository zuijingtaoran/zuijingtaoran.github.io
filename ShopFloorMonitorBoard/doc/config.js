; !function (window, undefined) {
    window.MapConfig = function() {
       
        this.ratio= 34.6,//PC尺寸换为像素为13*16，对应尺寸为450*530，所以比例为450/13=34.6
            this.width= 1366,//px，以下尺寸单位通为px
            this. height= 540,
            this.color=['#bfdaf6','#faadad','#bfcae3','#7592b9','#cfd4d2','a4edba'],
            this.areaSize = {
          door: [{ top: 0, left: 572, width: 648 - 572, height: 40,color:'#333'}]
           , Rel: [{ top: 10, left:30, width: 136, height: 50}]
            ,test: [{ top: 10, left: 168, width: 560 - 168, height: 50 }
                , { top: 80, left: 23, width: 78, height: 50 }
                , { top:119, left: 387, width:172, height: 50 }
                , { top: 10, left: 960, width: 1557-960, height: 50 }
                , { top: 80, left:640, width: 1557-640, height: 50 }
                , { top: 180, left: 872, width: 220, height: 50 }
            ]

            }
        this.equipmentSize = {
            RelTester: { size: [39, 49], image: 'e1.png', color: 'whitesmoke' }
            , FlEXLINK: { size: [45, 56], image: 'mustang.png', color: 'whitesmoke' }
            , PC: { size: [30, 44], image: 'MPT3K.png', color: 'whitesmoke' }
        }
    }

    MapConfig.prototype = {
        getQuery: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

    }

  
}(window)
String.prototype.HEXtoRGB = function () {
    var col = this.slice(1).split('');
    if (/^[0-9A-Fa-f]{6}$/.test(col.join('')) || /^[0-9A-Fa-f]{3}$/.test(col.join(''))) {
        (col.length === 3) && !function () {
            for (i = -3; i < 0; i++) {
                col.splice(i, 0, '' + col.slice(i)[0])
            }
        }();
        return "rgb(" + parseInt(col.slice(0, 2).join(''), 16) + "," + parseInt(col.slice(2, 4).join(''), 16) + "," + parseInt(col.slice(4, 6).join(''), 16) + ")";
    } else { return "rgb(0,0,0)" };
};
String.prototype.RGBtoHEX = function () {
    var col = this.toUpperCase().replace(/ /g,'');
    col = col.replace(/^RGB\((\d{1,3}?)\,(\d{1,3}?)\,(\d{1,3}?)\)$/, function (core, $1, $2, $3) {
        var a = +$1, b = +$2, c = +$3, cache = "";
        (a < 256 && b < 256 && c < 256) ? cache = '#' + ('0' + a.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2) + ('0' + c.toString(16)).slice(-2) : cache = "#000";
        return cache;
    })
    return col;
}