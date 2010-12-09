var debug = (function (win, doc) { //privat
    var out = {
        statuszeile: true,
        alertbox: false,
        anz_char: 200
    };
    return { //public
        mit_alert: function (on) {
            out.alertbox = on;
            var s = "out={statuszeile:" + out.statuszeile + ", alertbox:" + out.alertbox + ", anz_char=" + out.anz_char + '}';
            if (out.statuszeile) {
                win.status = s;
            }
            if (out.alertbox) {
                alert(s);
            }
        },

        show: function (id) {
            var str = '',
                s = '',
                ele;
            if (!out.statuszeile) {
                return;
            }
            ele = doc.getElementById(id) || doc.activeElement;
            if ( !! ele.tagName) {
                s += ele.tagName;
            }
            if ( !! ele.id) {
                s += " id=" + ele.id;
            }
            if ( !! ele.href) {
                s += " href=" + ele.href;
            }
            if ( !! ele.innerHTML) {
                str = ele.innerHTML;
                s += "\n(" + ele.innerHTML.length + " Zeichen)\n" + str.substr(0, out.anz_char);
            }
            if ( !! ele.value) {
                str = ele.value;
                s += "\n(" + ele.value.length + " Zeichen)\n" + str.substr(0, out.anz_char);
            }
            win.status = s;
            if (out.alertbox && !confirm(str)) {
                out.alertbox = !out.alertbox;
            }
        },

        ende: 'ende'
    };
})(this, document);
