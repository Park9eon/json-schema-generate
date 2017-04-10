
"use strict";
/**
 * javascript json object
 * @param obj : object
 * @return
 */
function jsg(obj) {
	var schema = {};
	var type = jQuery.type(obj);
	if (type === "null" || type === "undefined") {
		schema.type = "null"
	} else {
		schema.type = type;
	}
	if (type === "object") {
		schema.properties = {};
		for (var key in obj) {
			schema.properties[key] = jsg(obj[key])
		}
	} else if (type === "array") {
		schema.items = {};
		var _schema = {type:null};
		var _isError = false;
		for (var key in obj) {
			var __schema = jsg(obj[key]);
			if (_schema.type !== null && __schema.type !== _schema.type) {
				_isError = true;
			} else {
				_schema = $.extend({}, _schema, __schema);
			}
		}
		if (_isError) {
			schema.items = "list generation error!!";
		} else {
			schema.items = _schema;
		}
	}
	return schema;
}