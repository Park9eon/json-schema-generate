(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);