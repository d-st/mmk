var templates = (function (win, doc) {
    // private
	var template = [],
	_get_name = function(s) {
		do {
			name = prompt(s)
		} while (name == "");
		return name;
	};
	
    return { //public
		new: function() {
			template = [];
		},
		append: function(tmpl) {
			name = _get_name("Bitte einen Namen für diese Schablone eingeben");
			template.push([escape(tmpl), name]);
		},
		load: function(txta) {
			name = _get_name("Bitte einen Namen für diese Sammlung eingeben");
			s = "var data_ = (function () {\n\nreturn [\n'void(0)', '"+name+"'";
			for(var i=0; i<template.length; i+=1) {
				s += ',\n\n"'+template[i][0]+'",\n"'+template[i][1]+'"';
			}
			s += "\n\n];\n})();\n"
			return s;
		},
        ende: 'ende'
    };
})(window, document);
