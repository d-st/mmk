var visuell = (function (win, doc) { //privat
    var hwin = null;
    return { //public
        show_all: function (tagname) {
            tagname = tagname || 'div';
            var i, arr = doc.getElementsByTagName(tagname);
            for (i = 0; i < arr.length; i += 1) {
                arr[i].style.display = "block";
            }
        },

        hide_all: function (tagname) {
            tagname = tagname || 'div';
            var i, arr = doc.getElementsByTagName(tagname);
            for (i = 0; i < arr.length; i += 1) {
                arr[i].style.display = "none";
            }
        },

        show_id: function (id) {
            doc.getElementById(id).style.display = "block";
        },
        hide_id: function (id) {
            doc.getElementById(id).style.display = "none";
        },
        show: function (id) {
            doc.getElementById(id).style.display = "block";
        },
        hide: function (id) {
            doc.getElementById(id).style.display = "none";
        },

        init_all: function (tagname, display) {
            tagname = tagname || 'div';
            display = display || 'none';
            var i, arr = doc.getElementsByTagName(tagname);
            for (i = 0; i < arr.length; i += 1) {
                arr[i].id = tagname + i; // div-Tags erhalten id='div0', 'div1', 'div2', ...
                arr[i].style.display = display;
            }
        },

        popup: function (str, o) {
            o = o || {
                top: 0,
                left: 150,
                width: 800,
                height: 500
            };
            // popup_params = "directories=yes,location=yes,menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes,status=yes,",
            flags = "resizable=yes, top=" + o.top + ",left=" + o.left + ",width=" + o.width + ",height=" + o.height;
            if ((hwin) && (!hwin.closed)) {
                hwin.close();
            }
            hwin = null;
            hwin = window.open("", "popup", flags);
            hwin.document.write(str);
            if (hwin.opener) {
                hwin.opener = self;
            }
            if (hwin.focus) {
                hwin.focus();
            }
            hwin.document.close();
        },

        ende: 'ende'
    };
}(window, document));
