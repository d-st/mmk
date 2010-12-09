var unicode = (function (win, doc) { 

  //private
  var target;

  //private
  function build_unicode_string(start_char_idx, end_char_idx) {
    var str = "";
    for(i=start_char_idx; i<=end_char_idx; i+=1) {
      h = "0000" + i.toString(16);
      tit = "dez: &amp;#"    + i + 
            "; hex: &amp;#x" + i.toString(16) + 
            "; unicode: \\u" + h.substr(h.length-4, 4) + 
            "; ";
      c = String.fromCharCode(i); if (i === 0) { c = " "; }
      str += '<a class="unicode" onclick="unicode.append(this)" title="' + tit + '">' + c + '</a>';
    }
    return str;
  };
 
  return { //public
    select: function (element) {
      target = element;
      return true;
    },
    append: function (element) {
      if(target == null) return false;
      if(carret = target.selectionStart) {
        target.value = target.value.substring(0, carret) + element.innerText + target.value.substring(carret);
        target.focus();
        target.setSelectionRange(carret+1,carret+1);
      }
      else {
        target.value += element.innerText;
        target.focus();
      }
      return true;
    },
    show: function (arr, id_out) {
      var str = "";
      id_out = id_out || "CHARACTER_PAD";
      //Schleife über alle Array-Paare, str +=build_unicode_string(...)
      if(arr.length%2 == 1) {
        alert('Warning: array passed to unicode.show() by caller does not consist of pairs (array has odd lenght)');
      }
      for(var i=0; i+1 < arr.length; i += 2) {
        str += build_unicode_string(arr[i],arr[i+1]);
      }
      // Ausgabe von str in id_out
      e = dom.get_object(id_out);
      if (e != null) e.innerHTML = str;
    },
    ende: 'ende'
  };
})(this, document);
