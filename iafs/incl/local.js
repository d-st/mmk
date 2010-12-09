//FireFox localStorage doesn't work offline (file://...documents, Bug 507361)
var local = (function (win, doc) { //privat
    var is_std = false,
        is_ie = false,
        ie_id, ie_obj, ie_storage = 'userStorage',
        key_pre_str = ('' + win.location).replace(/\W/g, '').replace(/\d/g, '').toLowerCase(),
        IE = {
            detectIE: function () { //IE 5.5 bis 7
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var ieVers = parseInt(RegExp.$1, 10);
                    if (ieVers >= 5.5 && ieVers <= 8) {
                        return true;
                    }
                }
                return false;
            },
            initIE: function () {
                var time = new Date().getTime(),
                    newdiv = doc.createElement('div'),
                    meta = doc.createElement('meta');
                meta.name = "save";
                meta.content = "userdata";
                doc.getElementsByTagName('head').item(0).appendChild(meta);
                ie_id = 'ie-db-' + time;
                newdiv.setAttribute('id', ie_id);
                doc.body.appendChild(newdiv);
                ie_obj = doc.getElementById(ie_id);
                ie_obj.style.behavior = "url('#default#userData')";
                ie_obj.style.display = 'none';
            },
            clearIE: function () {
                var newdiv = doc.createElement('div'),
                    ie_obj = doc.getElementById(ie_id),
                    doc = ie_obj.xmlDocument,
                    attributes = doc.firstChild.attributes,
                    attr, len = attributes.length - 1;
                while (0 <= len) {
                    attr = attributes[len];
                    ie_obj.removeAttribute(attr.nodeName);
                    len -= 1;
                }
                ie_obj.save(ie_storage);
            }
        };

    return { //public
        init: function () {
            if (typeof(win['localStorage']) === 'object') {
                is_std = true;
            } else if (IE.detectIE()) {
                is_ie = true;
                IE.initIE();
            }
        },
        set_item: function (key, value) {
            value = value || (new Date()).getTime();
            if (is_std) {
                localStorage.setItem(key, value);
            } else if (is_ie) {
                ie_obj.setAttribute(key, value);
                ie_obj.save(ie_storage);
            }
        },
        get_item: function (key) {
            var r;
            if (is_std) {
                r = localStorage.getItem(key);
            } else if (is_ie) {
                ie_obj.load(ie_storage);
                r = ie_obj.getAttribute(key);
            }
            return r;
        },
        delete_item: function (key) {
            if (is_std) {
                local.set_item(key, null);
            } else if (is_ie) {
                ie_obj.removeAttribute(key);
                ie_obj.save(ie_storage);
            }
        },
        delete_all: function () {
            if (is_std) {
                localStorage.clear();
            } else if (is_ie) {
                IE.clearIE();
            }
        },


        get_array: function (pre) {
            var i = 0,
                v = true,
                r = [];
            while ( !! v) {
                v = local.get_item(pre + i);
                if ( !! v) {
                    r[i] = v;
                }
                i += 1;
            }
            return r;
        },
        set_array: function (pre, arr) {
            var i, ii, a = arr;
            if (!a) {
                alert('ERR:set_array(???)');
                return;
            }
            for (i = 0, ii = a.length; i < ii; i += 1) {
                local.set_item(pre + i, a[i]);
            }
        },
        delete_array: function (pre) {
            var i = 0,
                v = true;
            while ( !! v) {
                v = local.get_item(pre + i);
                if (v) {
                    local.delete_item(pre + i);
                }
                i += 1;
            }
        },

        save_form_items: function () {
            var i, ii, j, jj, els, el, tn, h, typ, k = {
                textarea: 0,
                text: 0,
                radio: 0,
                checkbox: 0
            };
            for (j = 0, jj = doc.forms.length; j < jj; j += 1) {
                els = doc.forms[j].elements;
                for (i = 0, ii = els.length; i < ii; i += 1) {
                    el = els[i];
                    tn = el.nodeName.toLowerCase();
                    if (tn === 'textarea') {
                        local.set_item('_textarea_' + k.textarea, el.value);
                        k.textarea += 1;
                    } else if (tn === 'input') {
                        typ = el.type.toLowerCase();
                        switch (typ) {
                        case 'text':
                            local.set_item('_text_' + k.text, el.value || '');
                            k.text += 1;
                            break;
                        case 'radio':
                            local.set_item('_radio_' + k.radio, (el.checked) ? '1' : '0');
                            k.radio += 1;
                            break;
                        case 'checkbox':
                            local.set_item('_checkbox_' + k.checkbox, (el.checked) ? '1' : '0');
                            k.checkbox += 1;
                            break;
                        default:
                            /*alert(tn+'\n'+typ);*/
                            break;
                        }
                    }
                }
            }
        },
        load_form_items: function () {
            var i, ii, j, jj, els, el, tn, h, typ, k = {
                textarea: 0,
                text: 0,
                radio: 0,
                checkbox: 0
            };
            for (j = 0, jj = doc.forms.length; j < jj; j += 1) {
                els = doc.forms[j].elements;
                for (i = 0, ii = els.length; i < ii; i += 1) {
                    el = els[i];
                    tn = el.nodeName.toLowerCase();
                    if (tn === 'textarea') {
                        el.value = local.get_item('_textarea_' + k.textarea);
                        k.textarea += 1;
                    } else if (tn === 'input') {
                        typ = el.type.toLowerCase();
                        switch (typ) {
                        case 'text':
                            h = local.get_item('_text_' + k.text);
                            el.value = h;
                            k.text += 1;
                            break;
                        case 'radio':
                            h = local.get_item('_radio_' + k.radio);
                            if (h === '1') {
                                el.checked = true
                            } else {
                                el.checked = false
                            };
                            k.radio += 1;
                            break;
                        case 'checkbox':
                            h = local.get_item('_checkbox_' + k.checkbox);
                            if (h === '1') {
                                el.checked = true
                            } else {
                                el.checked = false
                            };
                            k.checkbox += 1;
                            break;
                        default:
                            /*alert(tn+'\n'+typ);*/
                            break;
                        }
                    }
                }
            }
        },

        ende: 'ende'
    };
})(this, document);
