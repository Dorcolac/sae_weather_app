/**
* @license
* Fuse - Lightweight fuzzy-search
*
* Copyright (c) 2012 Kirollos Risk <kirollos@gmail.com>.
* All Rights Reserved. Apache Software License 2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
!function(t){function e(t,n){this.list=t,this.options=n=n||{};var i,o,s,r;for(i=0,r=["sort","includeScore","shouldSort"],o=r.length;o>i;i++)s=r[i],this.options[s]=s in n?n[s]:e.defaultOptions[s];for(i=0,r=["searchFn","sortFn","keys","getFn"],o=r.length;o>i;i++)s=r[i],this.options[s]=n[s]||e.defaultOptions[s]}var n=function(t,e){if(e=e||{},this.options=e,this.options.location=e.location||n.defaultOptions.location,this.options.distance="distance"in e?e.distance:n.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:n.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||n.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen>this.options.maxPatternLength)throw new Error("Pattern length is too long");this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet()};n.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},n.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},n.prototype._bitapScore=function(t,e){var n=t/this.patternLen,i=Math.abs(this.options.location-e);return this.options.distance?n+i/this.options.distance:i?1:n},n.prototype.search=function(t){if(t=this.options.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0};var e,n,i,o,s,r,a,h,p,c=t.length,l=this.options.location,f=this.options.threshold,u=t.indexOf(this.pattern,l),d=this.patternLen+c,g=1,m=[];for(-1!=u&&(f=Math.min(this._bitapScore(0,u),f),u=t.lastIndexOf(this.pattern,l+this.patternLen),-1!=u&&(f=Math.min(this._bitapScore(0,u),f))),u=-1,e=0;e<this.patternLen;e++){for(i=0,o=d;o>i;)this._bitapScore(e,l+o)<=f?i=o:d=o,o=Math.floor((d-i)/2+i);for(d=o,s=Math.max(1,l-o+1),r=Math.min(l+o,c)+this.patternLen,a=Array(r+2),a[r+1]=(1<<e)-1,n=r;n>=s;n--)if(p=this.patternAlphabet[t.charAt(n-1)],a[n]=0===e?(a[n+1]<<1|1)&p:(a[n+1]<<1|1)&p|((h[n+1]|h[n])<<1|1)|h[n+1],a[n]&this.matchmask&&(g=this._bitapScore(e,n-1),f>=g)){if(f=g,u=n-1,m.push(u),!(u>l))break;s=Math.max(1,2*l-u)}if(this._bitapScore(e+1,l)>f)break;h=a}return{isMatch:u>=0,score:g}};var i=function(t,e,n){var s,r,a;if(e){a=e.indexOf("."),-1!==a?(s=e.slice(0,a),r=e.slice(a+1)):s=e;var h=t[s];if(h)if(r||"string"!=typeof h&&"number"!=typeof h)if(o.isArray(h))for(var p=0,c=h.length;c>p;p++)i(h[p],r,n);else r&&i(h,r,n);else n.push(h)}else n.push(t);return n},o={deepValue:function(t,e){return i(t,e,[])},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)}};e.defaultOptions={id:null,caseSensitive:!1,includeScore:!1,shouldSort:!0,searchFn:n,sortFn:function(t,e){return t.score-e.score},getFn:o.deepValue,keys:[]},e.prototype.search=function(t){var e,n,i,s,r=new this.options.searchFn(t,this.options),a=this.list,h=a.length,p=this.options,c=this.options.keys,l=c.length,f=[],u={},d=[],g=function(t,e,n){if(void 0!==t&&null!==t)if("string"==typeof t)i=r.search(t),i.isMatch&&(s=u[n],s?s.score=Math.min(s.score,i.score):(u[n]={item:e,score:i.score},f.push(u[n])));else if(o.isArray(t))for(var a=0;a<t.length;a++)g(t[a],e,n)};if("string"==typeof a[0])for(var m=0;h>m;m++)g(a[m],m,m);else for(var m=0;h>m;m++)for(n=a[m],e=0;l>e;e++)g(p.getFn(n,c[e]),n,m);p.shouldSort&&f.sort(p.sortFn);for(var y=p.includeScore?function(t){return f[t]}:function(t){return f[t].item},v=p.id?function(t){f[t].item=p.getFn(f[t].item,p.id)[0]}:function(){},m=0,b=f.length;b>m;m++)v(m),d.push(y(m));return d},"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):t.Fuse=e}(this);


// TODO
// Cache on AJAX requests

(function(exports){

    /*==========================================*/
    /* Polyfills */
    /*==========================================*/

    // Document.querySelectorAll method
    // http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
    // Needed for: IE7-
    if (!document.querySelectorAll) {
        document.querySelectorAll = function(selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    // Document.querySelector method
    // Needed for: IE7-
    if (!document.querySelector) {
        document.querySelector = function(selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }

    // ES5 15.2.3.14 Object.keys ( O )
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = function (o) {
            if (o !== Object(o)) { throw TypeError('Object.keys called on non-object'); }
                var ret = [], p;
                for (p in o) {
                    if (Object.prototype.hasOwnProperty.call(o, p)) {
                        ret.push(p);
                    }
                }
            return ret;
        };
    }

    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); };
    }

    /*==========================================*/
    /* Selectors */
    /*==========================================*/

    exports.ge = function(element, parent){
        var parent = (typeof parent !== "undefined") ? parent : document;

        if(parent.querySelector){
            return parent.querySelector(element);
        }
    }

    exports.geAll = function(element, parent){
        var parent = (typeof parent !== "undefined") ? parent : document;

        if(parent.querySelectorAll){
            return parent.querySelectorAll(element);
        }
    }

    /*==========================================*/
    /* Events */
    /*==========================================*/

    exports.bindEvent = function(element, event, handler){
        if(document.addEventListener){
            return element.addEventListener(event, handler, false);
        } else if(document.attachEvent){
            return element.attachEvent("on"+event, handler);
        }
    }

    exports.removeEvent = function(element, event, handler){
        if(document.removeEventListener){
            return element.removeEventListener(event, handler, false);
        } else if(document.detachEvent){
            return element.detachEvent("on"+event, handler);
        }
    }

    exports.DOMReady = function (callback) {

        /*@cc_on
            @if (@_win32 || @_win64)
            document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
            document.getElementById('ieScriptLoad').onreadystatechange = function() {
                if (this.readyState == 'complete') {
                    callback();
                    return;
                }
            };
        @end @*/

        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
            return;
        }

        if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    callback();
                    clearInterval(DOMLoadTimer);
                    return;
                }
            }, 10);
        }

        window.onload = callback;

    }

    /*==========================================*/
    /* Timers and Intervals */
    /*==========================================*/

    exports.delay = function(callback, time){
        setTimeout(callback, time);
    }

    /*==========================================*/
    /* Date */
    /*==========================================*/

    exports.UNIXTimestamp = function(){
        return Math.round(Date.now() / 1000);
    }

    /*==========================================*/
    /* AJAX Module */
    /*==========================================*/

    var ajax = (function(){

        var xhr,
        data,
        response;

        var _initXHR = function(){
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        }

        var _checkOptions = function(options){
            var successOnly = false,
            successCallback;

            if(typeof options !== 'object'){
                successOnly = true;
                successCallback = options;
            }

            return {
                singleCallback: successOnly,
                successCallback: successCallback
            }
        }

        var _encodeComponents = function(data){

            if(typeof data !== 'object'){
                new TypeError('blah blah');
            }

            var i = 0, query = '';

            var parameters = Object.keys(data);

            for(; i < parameters.length; i++){
                query += parameters[i] + '=' + encodeURIComponent(data[parameters[i]]);
                if(i !== parameters.length - 1){
                    query += '&';
                }
            }

            return query;
        }

        var get = function (url, options) {

            var checkOptions = _checkOptions(options);

            xhr = _initXHR();

            xhr.open("GET", url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        data = xhr.responseText;
                        response = xhr;

                        if(options.json && xhr.getResponseHeader("content-type").indexOf('json') > -1){
                            response.isJSON = true;
                        }

                        checkOptions.singleCallback === false ? options.success(data, response) : checkOptions.successCallback(data, response);
                    }
                    else if(checkOptions.singleCallback === false) {
                        options.error(xhr.status, response);
                    }
                }
            }

            xhr.send();

        }

        var post = function(url, options){

            var encodedData = _encodeComponents(options.data);

            xhr = _initXHR();

            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        data = xhr.responseText;
                        response = xhr;

                        options.success(data, response);
                    } else {
                        options.error(xhr.status, response);
                    }
                }
            }

            xhr.send(encodedData);

        }

        var json = function(url, callback){

            get(url, {
                json: true,
                success: function(data, response){
                    if(response.isJSON){
                        callback(data, response);
                    } else {
                        return false;
                    }
                },
                error: function(data, response){
                    callback(data, response);
                }
            });

        }

        var ajax = function(options){

            options = options || {};

            var type    = options.type,
            url     = options.url,
            data    = options.data;
            success = options.success,
            error   = options.error || function(){};

            var query = _encodeComponents(data);

            if(type === 'GET'){

                get(url + '?' + query, {
                    success: success,
                    error: error
                });
            }
        }

        return {
            get: get,
            // post: post,
            json: json,
            ajax: ajax
        }

    })();

    exports.get = ajax.get;
    exports.json = ajax.json;
    exports.ajax = ajax.ajax;

    /*==========================================*/
    /* Storage Module */
    /*==========================================*/

    var Storage = (function(){

        var is_supported = function(){
            if(typeof(Storage) !== void(0)){
                return true;
            }
            return false;
        }

        var get = function(item){
            if(is_supported()){
                return localStorage.getItem(item);
            }
        }

        var set = function(item, value){
            if(is_supported()){
                localStorage.setItem(item, value);
            }
        }

        var remove = function(item){
            if(is_supported()){
                localStorage.removeItem(item);
            }
        }

        return {
            get    : get,
            set    : set,
            remove : remove
        }

    })();

    exports.storage = Storage;

})(this.$ = {});
