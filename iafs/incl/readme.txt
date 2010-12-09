incl/readme.txt



*visuell-Bibliothek

visuell.init_all(tagname,display) setzt alle [i].id = tagname+i; und [i].style.display=display;

visuell.show_all(tagname)         setzt alle .style.display='block' für .getElementsByTagName(tagname);

visuell.hide_all(tagname)         setzt alle .style.display='none'  für .getElementsByTagName(tagname);

visuell.show_id(id)               setzt .style.display='block' für das Element .getElementById(id);

visuell.hide_id(id)               setzt .style.display='none'  für das Element .getElementById(id);



*dom-Bibliothek

dom.get_object(id)      gibt ein Element-Objekt zurück mit .getElementById(id);

dom.get_string(id)      gibt string aus Formelement zurück mit .getElementById(id).value;

dom.set_string(id, str) schreibt str in Formelement mit .getElementById(id).value = str;

dom.select_string(id)   markiert den Text in Formelement mit .getElementById(id).select(); 

dom.delete_string(id)   löscht String mit .getElementById(id).value = '';

dom.exist(id)           liefert true oder false




*debug-Bibliothek

debug.mit_alert(on)  on=true/false schaltet alert-Anzeige an/aus. Die Statuszeile-Ausgabe ist default auf an

debug.show(id)       zeigt bei einem Aufruf die Werte des id-Elementes an.
                     Ein Formelement mit onfocus='debug.show()' zeigt bei Aktivität seine Werte an





*local-Bibliothek

Nach HTML5 soll das localStorage-Objekt unterstützt werden. 
localStorage erlaubt 5-10 MB Daten über eine Browsersitzung hinaus clientseitig zu speicher. 

Beim IE 6 und IE 7 ist diese localStorage-Norm nicht implementiert. 
Deshalb wurde diese Hilfsbibliothek geschrieben, 
die dies auch für den IE-Browser ermöglicht. 

Beim Firefox-Browser funktioniert das localStorage-Objekt, 
falls die Seite online ist, d.h. eine http://... und kein file://...-Request erfolgt. 
Dieser localStorage-Offline-Bug 507361 ist Mozilla seit etwa 2009 bekannt. 
Eine eingeschränkte, clientseitigen Seitenentwicklung mit dem localStorage-Objekt 
vom Firefox-Browser ist möglich, solange auf ein Reload der Seite verzichtet wird.
 
local.init()  Aufruf:  window.onload=function(){ local.init(); };
              local.init() prüft, ob localStorage existiert oder ob für IE 
              ein nachgebasteltes ie_obj verwendet werden muß.

local.set_item(key, value)  entspricht dem Aufruf von localStorage.setItem(key,value) 

local.get_item(key)         entspricht dem Aufruf von localStorage.getItem(key) und gibt String zurück

local.delete_item(key)      entspricht dem Aufruf von localStorage.set_item(key,null)

local.delete_all()          entspricht dem Aufruf von localStorage.clear()

Die Funktionen local.get_array(pre) und local.set_array(pre, arr)
ermöglichen die Verwendung von localStorage ähnlich zu Arrays von Strings.
In gewisse Weise entspricht der String pre einem Array-Namen.
Die localStorage-Key's sind dann 'pre0', 'pre1', 'pre2', ... 

local.get_array(pre)        gibt einen Array von value-Strings zurück, verwendet wird 
                            wird localStorage.get_item(pre+i) mit i=0,1,2,... 
local.set_array(pre, arr)   Ein gegebener Array arr von Strings wird local gespeichert
                            mit i = 0,1,2,.. arr.length; local.set_item(pre+i, a[i]);
local.delete_array(pre)     löscht einen lokal gespeicheren Array mit Keys = pre0, pre1, ...

Die Funktionen local.save_form_items() und local.load_form_items() dienen dazu, 
möglichst einfach alle Formulardaten einer Seite lokal zu speichern und 
die gespeicherten Daten (z.B. bei einer neuen Browser-Sitzung) 
in die Formularfelder zurück schreiben zu können. 
Insbesondere geht es um alle value-Strings von textarea-Tags, 
alle value-Strings der input-Tags mit type='text' und 
der gesetzten checked-Flags von input-Tags mit type='radio' und type='checkbox'.
 
local.save_form_items()     Alle Formularwerte der Seite werden mit
                            pre = '_textarea_', '_text_', '_radio_', '_checkbox_' 
                            in den lokalen Arrays (pre0, pre1, ...) gespeichert

local.load_form_items()     Die lokal gespeicherten Formulardaten 
                            (value-String, radio, checkbox) werden
                            in die Formularelemente zurück geschrieben

