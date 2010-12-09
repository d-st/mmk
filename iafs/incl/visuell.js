var visuell = (function (win, doc) { 
    //privat
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
        init_all: function (tagname, display) {
            tagname = tagname || 'div';
            display = display || 'none';
            var i, arr = doc.getElementsByTagName(tagname);
            for (i = 0; i < arr.length; i += 1) {
                arr[i].id = tagname + i; // div-Tags erhalten id='div0', 'div1', 'div2', ...
                arr[i].style.display = display;
            }
        },

        ende: 'ende' // dummy end-tag without tailing comma
    };
}(this, document));
