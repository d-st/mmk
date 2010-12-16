var dom = (function (win, doc) { //privat
    /* http://msdn.microsoft.com/en-us/scriptjunkie/ff696765.aspx  */


/*  ???
doc.dir = 'ltr';
if (('' + win.location).indexOf('http') !== -1) {doc.domain = 'localhost';} 


    ===
    // Evalulates a script in a global context
    global_eval= function( data ) {
    if ( data && /\S/.test(data) ) {

    // Inspired by code by Andrea Giammarchi
    // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html

    var head = document.getElementsByTagName("head")[0] || document.documentElement,
    script = document.createElement("script");
    script.type = "text/javascript";

    if ( jQuery.support.scriptEval ) {
    script.appendChild( document.createTextNode(data));
    } else {//IE  rmsie = /(msie) ([\w.]+)/    rmsie.exec(navigator.userAgent) 
    script.text = data;
    }

    // Use insertBefore instead of appendChild to circumvent an IE6 bug.
    // This arises when a base node is used (#2709).
    head.insertBefore( script, head.firstChild );
    head.removeChild( script );
    }
    },

    */
    var root_node = document.body,
        get_childs = function walk(node, fn) {
            fn(node);
            node = node.firstChild;
            while (node) {
                walk(node, fn);
                node = node.nextSibling;
            }
        },

        getElementsByAttribute = function (att, val) {
            var r = [];
            get_childs(root_node, function (node) {
                var akt = node.nodeType === 1 && node.getAttribute(att);
                if (typeof akt === 'string' && (akt === val || typeof val !== 'string')) {
                    r.push(node);
                }
            });
            return r;
        },


        create = function (tagName, d) {
            d = d || doc;
            return d.createElement(tagName);
        },
        text = function (str, d) {
            d = d || doc;
            return d.createTextNode(str);
        },
        attr = function (o, prop, val) {
            o.setAttribute(prop, val);
            return o;
        },
        append = function (o, childobj) {
            o.appendChild(childobj);
            return o;
        };
    remove_childs = function (o) {
        while (o.firstChild) {
            o.removeChild(o.firstChild);
        }
        return o;
    };
/* noch nicht getestet
    remove = function (o) {var p=null; if ( o !== null ) { p=o.parentNode; p.removeChild(o); } return p;}
    */

    return { //public
        exist: function (id) {
            if (doc.getElementById(id) === null) {
                alert('ERR: get_object(' + id + '???)');
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
            if (!dom.exist(id) || str === null) {
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

        set_focus: function (id) {
            if (!dom.exist(id)) {
                return;
            }
            doc.getElementById(id).focus();
        },

        insert_options: function (id, arr, fn) {
            var i, ii, opt;
            arr = arr || [];
            ii = arr.length - 1;
            remove_childs(doc.getElementById(id), 'option');
            for (i = 0; i < ii; i += 2) {
                opt = document.createElement("option"); //t.value='"'+arr[i]+'"'; t.innerHTML = arr[i]+" "+arr[i + 1];
                opt = attr(opt, 'value', arr[i]); // füge dem option-Tag value=arr[i] hinzu
                opt = append(opt, text(arr[i + 1])); // füge dem option-Tag erzeugten text(arr[i + 1]) als innerHTML hinzu
                append(doc.getElementById(id), opt); // füge select-id-Tag das option-Tag hinzu
            }
        },

        //unter window.onload=function(){dom.insert_last_modified();}
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
        },
        ende: 'ende'
    };
}(window, document));


/* ============================================
insert_last_modified mit orginal-dom-funktionen: 
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
