var dom = (function (win, doc) { //privat

    function create(tn, d) {
        d = d || doc;
        return d.createElement(tn);
    }

    function text(str, d) {
        d = d || doc;
        return d.createTextNode(str);
    }

    function attr(o, prop, val) {
        o.setAttribute(prop, val);
        return o;
    }

    function append(o, childobj) {
        o.appendChild(childobj);
        return o;
    }

    return { //public
        exist: function (id) {
            if (doc.getElementById(id) === null) { 
                // alert('ERR: get_object(' + id + '???)');
                return false;
            }
            return true;
        },
        get_object: function (id) {
            if (!dom.exist(id)) {
                return null;
            }
            return doc.getElementById(id);
        },
        get_string: function (id) {
            if (!dom.exist(id)) {
                return '';
            }
            return doc.getElementById(id).value;
        },
        set_string: function (id, str) {
            if (!dom.exist(id)) {
                return;
            }
            doc.getElementById(id).value = str;
        },
        select_string: function (id) {
            if (!dom.exist(id)) {
                return;
            }
            doc.getElementById(id).select();
        },
        delete_string: function (id) {
            if (!dom.exist(id)) {
                return;
            }
            doc.getElementById(id).value = '';
        },


        //dom.insert_last_modified();
        insert_last_modified: function () {
            var p, span, a, url, t = new Date(doc.lastModified),
                m = t.getMinutes(),
                str = 'Stand: ' + t.getDate() + '.' + (t.getMonth() + 1) + '.' + t.getFullYear() + ' (Uhrzeit ' + t.getHours() + ':';
            if (m.length < 2) {
                m = '0' + m;
            }
            str += m + ')';
            if (('' + win.location).indexOf('http') === -1) {
                url = "http://validator.w3.org/#validate_by_upload";
            } else {
                url = "http://validator.w3.org/check?uri=referer";
            }
            p = create('p'); // erzeuge ein leeres p-Tag-Objekt
            p = attr(p, 'align', 'center'); // füge dem p-Tag property=value hinzu
            p = append(p, create('br')); // füge im p-Tag das erzeugte br-Objekt hinten hinzu
            a = create('a'); // erzeuge ein leeres a-Tag-Objekt
            a = attr(a, 'target', '_blank'); // füge dem a-Tag property=value hinzu
            a = attr(a, 'title', 'W3C-online-Validator'); //füge dem a-Tag property=value hinzu
            a = attr(a, 'href', url); // füge dem a-Tag property=value hinzu
            a = append(a, text(str)); // füge im a-Tag erzeugten Text als innerHTML hinten hinzu
            span = create('span'); // erzeuge ein leeres span-Tag-Objekt
            span = append(span, a); // füge im span-Tag das a-Tag hinten hinzu
            p = append(p, span); // füge im p-Tag das span-Tag hinten hinzu
            append(doc.body, p); // füge document.body das p-Tag hinten hinzu

/* 
// erzeuge ein leeres p-Tag-Objekt
p = doc.createElement('p');

//füge dem p-Tag property=value hinzu
p.setAttribute('align', 'center');

//füge an dem p-Tag das erzeugte br-Objekt hinten hinzu
p.appendChild(doc.createElement('br'));

// erzeuge ein leeres a-Tag-Objekt
a = doc.createElement('a');

//füge dem a-Tag property=value hinzu
a.setAttribute('target', '_blank');

//füge dem a-Tag property=value hinzu
a.setAttribute('title', 'W3C-online-Validator');

//füge dem a-Tag property=value hinzu
a.setAttribute('href', url);

//füge dem a-Tag erzeugten Text als innerHTML hinten hinzu
a.appendChild(doc.createTextNode(str));

// erzeuge ein leeres pre-Tag-Objekt
pre = doc.createElement('pre');

//füge dem pre-Tag das a-Tag hinten hinzu
pre.appendChild(a);

//füge dem p-Tag das pre-Tag hinten hinzu
p.appendChild(pre);

//füge document.body das p-Tag hinten hinzu
doc.body.appendChild(p);
*/

        },

        ende: 'ende'
    };
}(this, document));
