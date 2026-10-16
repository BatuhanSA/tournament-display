/* EduLinq Web Base v0.0.1. https://github.com/edulinq/web-base */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/vendor/prismjs/prism.cjs
var require_prism = __commonJS({
  "src/vendor/prismjs/prism.cjs"(exports, module) {
    var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = (function(e) {
      var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, t = 0, r = {}, a = { manual: e.Prism && e.Prism.manual, disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler, util: { encode: function e2(n2) {
        return n2 instanceof i ? new i(n2.type, e2(n2.content), n2.alias) : Array.isArray(n2) ? n2.map(e2) : n2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function(e2) {
        return Object.prototype.toString.call(e2).slice(8, -1);
      }, objId: function(e2) {
        return e2.__id || Object.defineProperty(e2, "__id", { value: ++t }), e2.__id;
      }, clone: function e2(n2, t2) {
        var r2, i2;
        switch (t2 = t2 || {}, a.util.type(n2)) {
          case "Object":
            if (i2 = a.util.objId(n2), t2[i2]) return t2[i2];
            for (var l2 in r2 = {}, t2[i2] = r2, n2) n2.hasOwnProperty(l2) && (r2[l2] = e2(n2[l2], t2));
            return r2;
          case "Array":
            return i2 = a.util.objId(n2), t2[i2] ? t2[i2] : (r2 = [], t2[i2] = r2, n2.forEach((function(n3, a2) {
              r2[a2] = e2(n3, t2);
            })), r2);
          default:
            return n2;
        }
      }, getLanguage: function(e2) {
        for (; e2; ) {
          var t2 = n.exec(e2.className);
          if (t2) return t2[1].toLowerCase();
          e2 = e2.parentElement;
        }
        return "none";
      }, setLanguage: function(e2, t2) {
        e2.className = e2.className.replace(RegExp(n, "gi"), ""), e2.classList.add("language-" + t2);
      }, currentScript: function() {
        if ("undefined" == typeof document) return null;
        if (document.currentScript && "SCRIPT" === document.currentScript.tagName) return document.currentScript;
        try {
          throw new Error();
        } catch (r2) {
          var e2 = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r2.stack) || [])[1];
          if (e2) {
            var n2 = document.getElementsByTagName("script");
            for (var t2 in n2) if (n2[t2].src == e2) return n2[t2];
          }
          return null;
        }
      }, isActive: function(e2, n2, t2) {
        for (var r2 = "no-" + n2; e2; ) {
          var a2 = e2.classList;
          if (a2.contains(n2)) return true;
          if (a2.contains(r2)) return false;
          e2 = e2.parentElement;
        }
        return !!t2;
      } }, languages: { plain: r, plaintext: r, text: r, txt: r, extend: function(e2, n2) {
        var t2 = a.util.clone(a.languages[e2]);
        for (var r2 in n2) t2[r2] = n2[r2];
        return t2;
      }, insertBefore: function(e2, n2, t2, r2) {
        var i2 = (r2 = r2 || a.languages)[e2], l2 = {};
        for (var o2 in i2) if (i2.hasOwnProperty(o2)) {
          if (o2 == n2) for (var s2 in t2) t2.hasOwnProperty(s2) && (l2[s2] = t2[s2]);
          t2.hasOwnProperty(o2) || (l2[o2] = i2[o2]);
        }
        var u2 = r2[e2];
        return r2[e2] = l2, a.languages.DFS(a.languages, (function(n3, t3) {
          t3 === u2 && n3 != e2 && (this[n3] = l2);
        })), l2;
      }, DFS: function e2(n2, t2, r2, i2) {
        i2 = i2 || {};
        var l2 = a.util.objId;
        for (var o2 in n2) if (n2.hasOwnProperty(o2)) {
          t2.call(n2, o2, n2[o2], r2 || o2);
          var s2 = n2[o2], u2 = a.util.type(s2);
          "Object" !== u2 || i2[l2(s2)] ? "Array" !== u2 || i2[l2(s2)] || (i2[l2(s2)] = true, e2(s2, t2, o2, i2)) : (i2[l2(s2)] = true, e2(s2, t2, null, i2));
        }
      } }, plugins: {}, highlightAll: function(e2, n2) {
        a.highlightAllUnder(document, e2, n2);
      }, highlightAllUnder: function(e2, n2, t2) {
        var r2 = { callback: t2, container: e2, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
        a.hooks.run("before-highlightall", r2), r2.elements = Array.prototype.slice.apply(r2.container.querySelectorAll(r2.selector)), a.hooks.run("before-all-elements-highlight", r2);
        for (var i2, l2 = 0; i2 = r2.elements[l2++]; ) a.highlightElement(i2, true === n2, r2.callback);
      }, highlightElement: function(n2, t2, r2) {
        var i2 = a.util.getLanguage(n2), l2 = a.languages[i2];
        a.util.setLanguage(n2, i2);
        var o2 = n2.parentElement;
        o2 && "pre" === o2.nodeName.toLowerCase() && a.util.setLanguage(o2, i2);
        var s2 = { element: n2, language: i2, grammar: l2, code: n2.textContent };
        function u2(e2) {
          s2.highlightedCode = e2, a.hooks.run("before-insert", s2), s2.element.innerHTML = s2.highlightedCode, a.hooks.run("after-highlight", s2), a.hooks.run("complete", s2), r2 && r2.call(s2.element);
        }
        if (a.hooks.run("before-sanity-check", s2), (o2 = s2.element.parentElement) && "pre" === o2.nodeName.toLowerCase() && !o2.hasAttribute("tabindex") && o2.setAttribute("tabindex", "0"), !s2.code) return a.hooks.run("complete", s2), void (r2 && r2.call(s2.element));
        if (a.hooks.run("before-highlight", s2), s2.grammar) if (t2 && e.Worker) {
          var c2 = new Worker(a.filename);
          c2.onmessage = function(e2) {
            u2(e2.data);
          }, c2.postMessage(JSON.stringify({ language: s2.language, code: s2.code, immediateClose: true }));
        } else u2(a.highlight(s2.code, s2.grammar, s2.language));
        else u2(a.util.encode(s2.code));
      }, highlight: function(e2, n2, t2) {
        var r2 = { code: e2, grammar: n2, language: t2 };
        if (a.hooks.run("before-tokenize", r2), !r2.grammar) throw new Error('The language "' + r2.language + '" has no grammar.');
        return r2.tokens = a.tokenize(r2.code, r2.grammar), a.hooks.run("after-tokenize", r2), i.stringify(a.util.encode(r2.tokens), r2.language);
      }, tokenize: function(e2, n2) {
        var t2 = n2.rest;
        if (t2) {
          for (var r2 in t2) n2[r2] = t2[r2];
          delete n2.rest;
        }
        var a2 = new s();
        return u(a2, a2.head, e2), o(e2, a2, n2, a2.head, 0), (function(e3) {
          for (var n3 = [], t3 = e3.head.next; t3 !== e3.tail; ) n3.push(t3.value), t3 = t3.next;
          return n3;
        })(a2);
      }, hooks: { all: {}, add: function(e2, n2) {
        var t2 = a.hooks.all;
        t2[e2] = t2[e2] || [], t2[e2].push(n2);
      }, run: function(e2, n2) {
        var t2 = a.hooks.all[e2];
        if (t2 && t2.length) for (var r2, i2 = 0; r2 = t2[i2++]; ) r2(n2);
      } }, Token: i };
      function i(e2, n2, t2, r2) {
        this.type = e2, this.content = n2, this.alias = t2, this.length = 0 | (r2 || "").length;
      }
      function l(e2, n2, t2, r2) {
        e2.lastIndex = n2;
        var a2 = e2.exec(t2);
        if (a2 && r2 && a2[1]) {
          var i2 = a2[1].length;
          a2.index += i2, a2[0] = a2[0].slice(i2);
        }
        return a2;
      }
      function o(e2, n2, t2, r2, s2, g2) {
        for (var f2 in t2) if (t2.hasOwnProperty(f2) && t2[f2]) {
          var h2 = t2[f2];
          h2 = Array.isArray(h2) ? h2 : [h2];
          for (var d = 0; d < h2.length; ++d) {
            if (g2 && g2.cause == f2 + "," + d) return;
            var v = h2[d], p = v.inside, m = !!v.lookbehind, y = !!v.greedy, k = v.alias;
            if (y && !v.pattern.global) {
              var x = v.pattern.toString().match(/[imsuy]*$/)[0];
              v.pattern = RegExp(v.pattern.source, x + "g");
            }
            for (var b = v.pattern || v, w = r2.next, A = s2; w !== n2.tail && !(g2 && A >= g2.reach); A += w.value.length, w = w.next) {
              var P = w.value;
              if (n2.length > e2.length) return;
              if (!(P instanceof i)) {
                var E, S = 1;
                if (y) {
                  if (!(E = l(b, A, e2, m)) || E.index >= e2.length) break;
                  var L = E.index, O = E.index + E[0].length, C = A;
                  for (C += w.value.length; L >= C; ) C += (w = w.next).value.length;
                  if (A = C -= w.value.length, w.value instanceof i) continue;
                  for (var j = w; j !== n2.tail && (C < O || "string" == typeof j.value); j = j.next) S++, C += j.value.length;
                  S--, P = e2.slice(A, C), E.index -= A;
                } else if (!(E = l(b, 0, P, m))) continue;
                L = E.index;
                var N = E[0], _ = P.slice(0, L), M = P.slice(L + N.length), W = A + P.length;
                g2 && W > g2.reach && (g2.reach = W);
                var I = w.prev;
                if (_ && (I = u(n2, I, _), A += _.length), c(n2, I, S), w = u(n2, I, new i(f2, p ? a.tokenize(N, p) : N, k, N)), M && u(n2, w, M), S > 1) {
                  var T = { cause: f2 + "," + d, reach: W };
                  o(e2, n2, t2, w.prev, A, T), g2 && T.reach > g2.reach && (g2.reach = T.reach);
                }
              }
            }
          }
        }
      }
      function s() {
        var e2 = { value: null, prev: null, next: null }, n2 = { value: null, prev: e2, next: null };
        e2.next = n2, this.head = e2, this.tail = n2, this.length = 0;
      }
      function u(e2, n2, t2) {
        var r2 = n2.next, a2 = { value: t2, prev: n2, next: r2 };
        return n2.next = a2, r2.prev = a2, e2.length++, a2;
      }
      function c(e2, n2, t2) {
        for (var r2 = n2.next, a2 = 0; a2 < t2 && r2 !== e2.tail; a2++) r2 = r2.next;
        n2.next = r2, r2.prev = n2, e2.length -= a2;
      }
      if (e.Prism = a, i.stringify = function e2(n2, t2) {
        if ("string" == typeof n2) return n2;
        if (Array.isArray(n2)) {
          var r2 = "";
          return n2.forEach((function(n3) {
            r2 += e2(n3, t2);
          })), r2;
        }
        var i2 = { type: n2.type, content: e2(n2.content, t2), tag: "span", classes: ["token", n2.type], attributes: {}, language: t2 }, l2 = n2.alias;
        l2 && (Array.isArray(l2) ? Array.prototype.push.apply(i2.classes, l2) : i2.classes.push(l2)), a.hooks.run("wrap", i2);
        var o2 = "";
        for (var s2 in i2.attributes) o2 += " " + s2 + '="' + (i2.attributes[s2] || "").replace(/"/g, "&quot;") + '"';
        return "<" + i2.tag + ' class="' + i2.classes.join(" ") + '"' + o2 + ">" + i2.content + "</" + i2.tag + ">";
      }, !e.document) return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener("message", (function(n2) {
        var t2 = JSON.parse(n2.data), r2 = t2.language, i2 = t2.code, l2 = t2.immediateClose;
        e.postMessage(a.highlight(i2, a.languages[r2], r2)), l2 && e.close();
      }), false), a) : a;
      var g = a.util.currentScript();
      function f() {
        a.manual || a.highlightAll();
      }
      if (g && (a.filename = g.src, g.hasAttribute("data-manual") && (a.manual = true)), !a.manual) {
        var h = document.readyState;
        "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
      }
      return a;
    })(_self);
    "undefined" != typeof module && module.exports && (module.exports = Prism2), "undefined" != typeof global && (global.Prism = Prism2);
    Prism2.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: true }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: true }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: true, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: true, greedy: true, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: true }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: true }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: true, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, { pattern: /^(\s*)["']|["']$/, lookbehind: true }] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, Prism2.languages.markup.tag.inside["attr-value"].inside.entity = Prism2.languages.markup.entity, Prism2.languages.markup.doctype.inside["internal-subset"].inside = Prism2.languages.markup, Prism2.hooks.add("wrap", (function(a) {
      "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
    })), Object.defineProperty(Prism2.languages.markup.tag, "addInlined", { value: function(a, e) {
      var s = {};
      s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: true, inside: Prism2.languages[e] }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism2.languages[e] };
      var n = {};
      n[a] = { pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, (function() {
        return a;
      })), "i"), lookbehind: true, greedy: true, inside: t }, Prism2.languages.insertBefore("markup", "cdata", n);
    } }), Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", { value: function(a, e) {
      Prism2.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"), lookbehind: true, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: true, alias: [e, "language-" + e], inside: Prism2.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } });
    } }), Prism2.languages.html = Prism2.languages.markup, Prism2.languages.mathml = Prism2.languages.markup, Prism2.languages.svg = Prism2.languages.markup, Prism2.languages.xml = Prism2.languages.extend("markup", {}), Prism2.languages.ssml = Prism2.languages.xml, Prism2.languages.atom = Prism2.languages.xml, Prism2.languages.rss = Prism2.languages.xml;
    !(function(s) {
      var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: true, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: true } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: true, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), lookbehind: true }, string: { pattern: e, greedy: true }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: true }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: true }, punctuation: /[(){};:,]/ }, s.languages.css.atrule.inside.rest = s.languages.css;
      var t = s.languages.markup;
      t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
    })(Prism2);
    Prism2.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true, greedy: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ };
    Prism2.languages.javascript = Prism2.languages.extend("clike", { "class-name": [Prism2.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: true }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: true }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: true }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism2.languages.insertBefore("javascript", "keyword", { regex: { pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"), lookbehind: true, greedy: true, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: true, alias: "language-regex", inside: Prism2.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: true, inside: Prism2.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: true, inside: Prism2.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: true, inside: Prism2.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: true, inside: Prism2.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism2.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: true, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: true, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: true, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism2.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: true, greedy: true, alias: "property" } }), Prism2.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: true, alias: "property" } }), Prism2.languages.markup && (Prism2.languages.markup.tag.addInlined("script", "javascript"), Prism2.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism2.languages.js = Prism2.languages.javascript;
    Prism2.languages.json = { property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: true, greedy: true }, string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: true, greedy: true }, comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: true }, number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, punctuation: /[{}[\],]/, operator: /:/, boolean: /\b(?:false|true)\b/, null: { pattern: /\bnull\b/, alias: "keyword" } }, Prism2.languages.webmanifest = Prism2.languages.json;
  }
});

// src/js/core/index.ts
var core_exports = {};
__export(core_exports, {
  events: () => events_exports,
  log: () => log_exports,
  routing: () => routing_exports
});

// src/js/core/events.ts
var events_exports = {};
__export(events_exports, {
  EventInfo: () => EventInfo,
  dispatch: () => dispatch,
  getEventPromise: () => getEventPromise,
  getListenerCounts: () => getListenerCounts,
  removeAllListeners: () => removeAllListeners,
  removeListeners: () => removeListeners
});

// src/js/util/objects.ts
var objects_exports = {};
__export(objects_exports, {
  deepEqual: () => deepEqual,
  isArray: () => isArray,
  isFunction: () => isFunction,
  isObject: () => isObject,
  isPrimitive: () => isPrimitive
});
function isPrimitive(value) {
  return value == null || typeof value !== "object" && !isFunction(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (isFunction(a) || isFunction(b)) {
    return false;
  }
  let aIsPrimitive = isPrimitive(a);
  let bIsPrimitive = isPrimitive(b);
  if (aIsPrimitive !== bIsPrimitive) {
    return false;
  }
  if (aIsPrimitive && bIsPrimitive) {
    return a === b;
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key of Object.keys(a)) {
    if (!(key in b)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

// src/js/core/events.ts
var eventListeners = /* @__PURE__ */ new Map();
var eventElement = document.createElement("div");
var DEFAULT_TIMEOUT_MS = 3e3;
var EventInfo = class _EventInfo {
  constructor(name, details = {}, source = void 0) {
    __publicField(this, "name");
    __publicField(this, "details");
    // The event that this infor was created from (if it was created from an event).
    __publicField(this, "source");
    if (details == null) {
      details = {};
    }
    this.name = name;
    this.details = details;
    this.source = source;
  }
  // Check if this event matches the given query.
  // Note that this is not an equality check.
  // A query matches if its name matches,
  // and any details present in the query match the target.
  // A target event can have more details (not present in the query) and still match.
  match(query) {
    if (this.name !== query.name) {
      return false;
    }
    for (const [key, value] of Object.entries(query.details)) {
      if (!Object.hasOwn(this.details, key)) {
        return false;
      }
      if (!deepEqual(this.details[key], value)) {
        return false;
      }
    }
    return true;
  }
  static fromEvent(event) {
    let details = {};
    if (event.constructor.name === "CustomEvent") {
      details = event.detail;
    }
    return new _EventInfo(event.type, details, event);
  }
};
var EventListener = class {
  constructor(query, timeout) {
    __publicField(this, "id");
    __publicField(this, "query");
    __publicField(this, "promise");
    // The resolve callback for the promise.
    // When `undefined`, it has not yet been set.
    // When `null`, the promise has already been resolved.
    __publicField(this, "resolve");
    // The timeout ID (from setTimeout()), if a timeout was set.
    __publicField(this, "timeoutID");
    // Make a closure to ensure the event callback has access to this object.
    __publicField(this, "eventClosure");
    this.id = /* @__PURE__ */ Symbol("EventListener");
    this.query = query;
    this.resolve = void 0;
    this.timeoutID = void 0;
    const self2 = this;
    this.eventClosure = function(event) {
      self2.matchAndResolve(event);
    };
    eventListeners.set(this.id, this);
    this.promise = new Promise(function(resolve, reject) {
      self2.resolve = resolve;
      if (timeout != null) {
        self2.timeoutID = setTimeout(function() {
          self2.remove();
          reject(new Error("Event Timeout: '".concat(self2.query.name, "' timed out after ").concat(timeout, "ms.")));
        }, timeout);
      }
      eventElement.addEventListener(self2.query.name, self2.eventClosure);
    });
  }
  // Stop listening and remove this listener from the collection of listeners.
  // Promises will not be settled.
  remove() {
    eventElement.removeEventListener(this.query.name, this.eventClosure);
    eventListeners.delete(this.id);
    this.clearTimeout();
    this.resolve = null;
  }
  clearTimeout() {
    if (this.timeoutID === void 0) {
      return;
    }
    clearTimeout(this.timeoutID);
    this.timeoutID = void 0;
  }
  // If the given event matches this listener, then resolve the promise.
  matchAndResolve(event) {
    if (this.resolve == null) {
      return;
    }
    let targetEventInfo = EventInfo.fromEvent(event);
    if (!targetEventInfo.match(this.query)) {
      return;
    }
    let resolve = this.resolve;
    this.remove();
    resolve(event);
  }
};
function dispatch(eventInfo) {
  eventElement.dispatchEvent(new CustomEvent(eventInfo.name, { detail: eventInfo.details }));
}
function getEventPromise(query, timeout = DEFAULT_TIMEOUT_MS) {
  let listener = new EventListener(query, timeout);
  return listener.promise;
}
function removeAllListeners() {
  for (const listener of eventListeners.values()) {
    listener.remove();
  }
}
function removeListeners(query) {
  for (const listener of eventListeners.values()) {
    if (listener.query.match(query)) {
      listener.remove();
    }
  }
}
function getListenerCounts() {
  let counts = {};
  for (const listener of eventListeners.values()) {
    let key = listener.query.name;
    if (!(key in counts)) {
      counts[key] = 0;
    }
    counts[key]++;
  }
  return counts;
}

// src/js/core/log.ts
var log_exports = {};
__export(log_exports, {
  LEVEL_DEBUG: () => LEVEL_DEBUG,
  LEVEL_ERROR: () => LEVEL_ERROR,
  LEVEL_FATAL: () => LEVEL_FATAL,
  LEVEL_INFO: () => LEVEL_INFO,
  LEVEL_OFF: () => LEVEL_OFF,
  LEVEL_TRACE: () => LEVEL_TRACE,
  LEVEL_WARN: () => LEVEL_WARN,
  clearRecords: () => clearRecords,
  debug: () => debug,
  error: () => error,
  fatal: () => fatal,
  getLevel: () => getLevel,
  getRecords: () => getRecords,
  getStorageLevel: () => getStorageLevel,
  info: () => info,
  log: () => log,
  setLevel: () => setLevel,
  setStorageLevel: () => setStorageLevel,
  trace: () => trace,
  warn: () => warn
});

// src/js/model/timestamp.ts
var timestamp_exports = {};
__export(timestamp_exports, {
  DEFAUT_LOCALE: () => DEFAUT_LOCALE,
  MSECS_PER_DAYS: () => MSECS_PER_DAYS,
  MSECS_PER_HOURS: () => MSECS_PER_HOURS,
  MSECS_PER_MINS: () => MSECS_PER_MINS,
  MSECS_PER_SECS: () => MSECS_PER_SECS,
  datestampToString: () => datestampToString,
  embededTimestampsToString: () => embededTimestampsToString,
  fromJSDate: () => fromJSDate,
  now: () => now,
  parse: () => parse,
  timestampToString: () => timestampToString
});

// src/js/testing/runtime.ts
var runtime_exports = {};
__export(runtime_exports, {
  isTestingMode: () => isTestingMode,
  setTestingMode: () => setTestingMode
});
var _testingMode = false;
function isTestingMode() {
  return _testingMode;
}
function setTestingMode(value) {
  _testingMode = value;
}

// src/js/model/timestamp.ts
var MSECS_PER_SECS = 1e3;
var MSECS_PER_MINS = MSECS_PER_SECS * 60;
var MSECS_PER_HOURS = MSECS_PER_MINS * 60;
var MSECS_PER_DAYS = MSECS_PER_HOURS * 24;
var DEFAUT_LOCALE = "sv";
var TESTING_TIME_ZONE = "Atlantic/South_Georgia";
var TESTING_TIME_ZONE_OFFSET_MINS = 120;
function now() {
  return fromJSDate(/* @__PURE__ */ new Date());
}
function fromJSDate(date) {
  return date.valueOf();
}
function parse(text, forceLocalTZ = false, allowEmpty = true, raiseOnError = true) {
  text = text.trim();
  if (allowEmpty && text.length == 0) {
    return void 0;
  }
  let value = new Date(text);
  if (Number.isNaN(value.valueOf())) {
    if (raiseOnError) {
      throw new Error("Cannot parse timestamp: '".concat(text, "'."));
    }
    return void 0;
  }
  if (forceLocalTZ) {
    let offsetMins = value.getTimezoneOffset();
    if (runtime_exports.isTestingMode()) {
      offsetMins = TESTING_TIME_ZONE_OFFSET_MINS;
    }
    let newMS = value.valueOf() + offsetMins * 60 * 1e3;
    value = new Date(newMS);
  }
  return fromJSDate(value);
}
function timestampToString(timestamp, pretty2 = false, locale = DEFAUT_LOCALE, timezone = void 0) {
  const datetime = new Date(parseInt(timestamp.toString()));
  if (timezone == null && runtime_exports.isTestingMode()) {
    timezone = TESTING_TIME_ZONE;
  }
  if (pretty2) {
    return datetime.toLocaleString(locale, { timeZone: timezone });
  }
  return datetime.toISOString();
}
function datestampToString(timestamp, pretty2 = false, locale = DEFAUT_LOCALE, timezone = void 0) {
  const datetime = new Date(parseInt(timestamp.toString()));
  if (timezone == null && runtime_exports.isTestingMode()) {
    timezone = TESTING_TIME_ZONE;
  }
  if (pretty2) {
    return datetime.toLocaleDateString(locale, { timeZone: timezone });
  }
  return datetime.toLocaleDateString(DEFAUT_LOCALE, { timeZone: timezone });
}
function embededTimestampsToString(text, pretty2 = false, locale = DEFAUT_LOCALE, timezone = void 0) {
  if (text == null) {
    return "";
  }
  text = text.toString();
  return text.replace(/<timestamp:\s*(-?\d+)\s*>/g, function(match, timestamp) {
    return timestampToString(parseInt(timestamp), pretty2, locale, timezone);
  });
}

// src/js/core/log.ts
var LEVEL_TRACE = -20;
var LEVEL_DEBUG = -10;
var LEVEL_INFO = 0;
var LEVEL_WARN = 10;
var LEVEL_ERROR = 20;
var LEVEL_FATAL = 30;
var LEVEL_OFF = 100;
var LEVEL_TO_STRING = {
  [LEVEL_TRACE]: "trace",
  [LEVEL_DEBUG]: "debug",
  [LEVEL_INFO]: "info",
  [LEVEL_WARN]: "warn",
  [LEVEL_ERROR]: "error",
  [LEVEL_FATAL]: "fatal",
  [LEVEL_OFF]: "off"
};
var consoleLogLevel = LEVEL_INFO;
var storageLogLevel = LEVEL_OFF;
var records = [];
var LogRecord = class {
  constructor(timestamp, level, rawLevel, message, error2, notify, data) {
    __publicField(this, "timestamp");
    __publicField(this, "level");
    __publicField(this, "rawLevel");
    __publicField(this, "message");
    __publicField(this, "error");
    __publicField(this, "notify");
    __publicField(this, "data");
    this.timestamp = timestamp;
    this.level = level;
    this.rawLevel = rawLevel;
    this.message = message;
    this.error = error2;
    this.notify = notify;
    if (data == null) {
      data = {};
    }
    this.data = data;
  }
};
function getLevel() {
  return consoleLogLevel;
}
function setLevel(level) {
  let oldLevel = consoleLogLevel;
  consoleLogLevel = level;
  return oldLevel;
}
function getStorageLevel() {
  return storageLogLevel;
}
function setStorageLevel(level) {
  let oldLevel = storageLogLevel;
  storageLogLevel = level;
  return oldLevel;
}
function log(level, message, data = {}, error2 = void 0, notify = false) {
  if (level < Math.min(consoleLogLevel, storageLogLevel)) {
    return;
  }
  let record = new LogRecord(
    now(),
    LEVEL_TO_STRING[level],
    level,
    message,
    error2,
    notify,
    data
  );
  logToConsole(record);
  logToStorage(record);
}
function logToConsole(record) {
  if (record.rawLevel < consoleLogLevel) {
    return;
  }
  if (record.rawLevel <= LEVEL_DEBUG) {
    console.debug(record);
  } else if (record.rawLevel <= LEVEL_INFO) {
    console.info(record);
  } else if (record.rawLevel <= LEVEL_WARN) {
    console.warn(record);
  } else {
    console.error(record);
  }
  if (record.error != null) {
    console.log(record.error);
  }
  if (record.notify) {
    alert(record.message);
  }
}
function logToStorage(record) {
  if (record.rawLevel < storageLogLevel) {
    return;
  }
  records.push(record);
}
function trace(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_TRACE, message, data, error2, notify);
}
function debug(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_DEBUG, message, data, error2, notify);
}
function info(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_INFO, message, data, error2, notify);
}
function warn(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_WARN, message, data, error2, notify);
}
function error(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_ERROR, message, data, error2, notify);
}
function fatal(message, data = {}, error2 = void 0, notify = false) {
  log(LEVEL_FATAL, message, data, error2, notify);
}
function getRecords() {
  return records.slice();
}
function clearRecords() {
  records = [];
}

// src/js/core/routing.ts
var routing_exports = {};
__export(routing_exports, {
  EVENT_ROUTING_END: () => EVENT_ROUTING_END,
  EVENT_ROUTING_START: () => EVENT_ROUTING_START,
  RegexRoute: () => RegexRoute,
  Route: () => Route,
  RoutingRequest: () => RoutingRequest,
  StringRoute: () => StringRoute,
  addRoute: () => addRoute,
  clearRoutes: () => clearRoutes,
  init: () => init,
  route: () => route,
  setNotFound: () => setNotFound,
  stop: () => stop
});
var EVENT_ROUTING_START = "routing-start";
var EVENT_ROUTING_END = "routing-end";
var currentRequest = void 0;
var notFoundHandler = defaultNotFound;
var routes = [];
var RoutingRequest = class _RoutingRequest {
  constructor(path, params = {}) {
    // The path component of the hash (without parameters).
    // The path should never start with a hash or slash.
    __publicField(this, "path");
    // The URL params for this request.
    __publicField(this, "params");
    this.path = path;
    this.params = params;
  }
  // Parse a request out of a path.
  static parse(rawPath) {
    rawPath = basicPathClean(rawPath);
    let url = URL.parse(rawPath, "http://localhost");
    if (url == null) {
      throw new Error("Unable to parse URL: '".concat(rawPath, "'."));
    }
    let path = url.pathname.replace(/^\//, "");
    let rawParams = url.searchParams;
    rawParams.sort();
    let params = {};
    for (const [key, value] of rawParams.entries()) {
      params[key] = value;
    }
    return new _RoutingRequest(path, params);
  }
  // Create the canonical string representation of this routing request.
  // The output will always start with a hash.
  toString() {
    let url = URL.parse(this.path, "http://localhost");
    if (url == null) {
      throw new Error("Unable to parse URL: '".concat(this.path, "'."));
    }
    for (const [key, value] of Object.entries(this.params)) {
      url.searchParams.append(key, value);
    }
    url.searchParams.sort();
    let path = url.pathname.replace(/^\//, "");
    path += url.search;
    return "#" + path;
  }
};
var Route = class {
  constructor(handler) {
    __publicField(this, "handler");
    this.handler = handler;
  }
};
var StringRoute = class extends Route {
  constructor(path, handler) {
    super(handler);
    __publicField(this, "path");
    this.path = path;
  }
  match(request) {
    return request.path === this.path;
  }
};
var RegexRoute = class extends Route {
  constructor(pattern, handler) {
    super(handler);
    __publicField(this, "pattern");
    this.pattern = pattern;
  }
  match(request) {
    return request.path.match(this.pattern) != null;
  }
};
function init() {
  currentRequest = void 0;
  window.addEventListener("hashchange", routeFromEvent);
}
function stop() {
  window.removeEventListener("hashchange", routeFromEvent);
  currentRequest = void 0;
}
function routeFromEvent() {
  route();
}
function route(request = void 0) {
  if (request == null) {
    request = getLocationHash();
  }
  if (typeof request == "string") {
    request = RoutingRequest.parse(request);
  }
  if (currentRequest != null && deepEqual(currentRequest, request)) {
    return;
  }
  currentRequest = request;
  window.location.hash = request.toString();
  let handler = void 0;
  for (const route2 of routes) {
    if (route2.match(request)) {
      handler = route2.handler;
      break;
    }
  }
  if (handler == null) {
    warn("Could not find matching route. Falling back to the default route.", request);
    handler = notFoundHandler;
  }
  dispatch(new EventInfo(EVENT_ROUTING_START, {
    "path": request.path,
    "params": request.params
  }));
  handler(request);
  dispatch(new EventInfo(EVENT_ROUTING_END, {
    "path": request.path,
    "params": request.params
  }));
}
function addRoute(route2) {
  routes.push(route2);
}
function clearRoutes() {
  routes = [];
}
function defaultNotFound(request) {
}
function setNotFound(handler) {
  let oldHandler = notFoundHandler;
  notFoundHandler = handler;
  return oldHandler;
}
function getLocationHash() {
  let hash = window.location.hash.trim();
  if (hash.length === 0) {
    return "#";
  }
  return hash;
}
function basicPathClean(path) {
  path = path.trim();
  path = path.replace(/^[\s\/#]+/, "");
  path = path.replace(/[\/\s]+$/, "");
  return path;
}

// src/js/model/index.ts
var model_exports = {};
__export(model_exports, {
  field: () => field_exports,
  timestamp: () => timestamp_exports
});

// src/js/model/field.ts
var field_exports = {};
__export(field_exports, {
  CheckboxField: () => CheckboxField,
  ChoiceField: () => ChoiceField,
  ChoiceFieldOptions: () => ChoiceFieldOptions,
  DateField: () => DateField,
  DateFieldOptions: () => DateFieldOptions,
  EmailField: () => EmailField,
  Field: () => Field,
  FieldOptions: () => FieldOptions,
  FieldSet: () => FieldSet,
  FileField: () => FileField,
  FileFieldOptions: () => FileFieldOptions,
  IntegerField: () => IntegerField,
  LocalDatetimeField: () => LocalDatetimeField,
  NumericField: () => NumericField,
  NumericFieldOptions: () => NumericFieldOptions,
  PhoneNumberField: () => PhoneNumberField,
  RadioField: () => RadioField,
  SecretField: () => SecretField,
  SimpleInputField: () => SimpleInputField,
  SliderField: () => SliderField,
  TextAreaField: () => TextAreaField,
  TextField: () => TextField,
  TimeField: () => TimeField,
  TimeFieldOptions: () => TimeFieldOptions
});
var FieldOptions = class {
  constructor() {
    // An optional name that will be attached to the field instance container and input (if it exists).
    // This is traditionally the name/key that is sent on form submit.
    __publicField(this, "name");
    // An optional label for the input.
    __publicField(this, "label");
    // Put the label before the inner input elements.
    __publicField(this, "labelBefore", true);
    // Put the error before the inner input elements.
    __publicField(this, "errorBefore", false);
    // Validate this field when it loses focus.
    __publicField(this, "validateOnFocusOut", true);
    // An optional default value for the field.
    __publicField(this, "defaultValue");
    // If this field must be non-empty during validation.
    __publicField(this, "required", false);
    // Placeholder text to display (if possible).
    __publicField(this, "placeholder");
    // An optional function to call instead of standard validation on a field's value.
    __publicField(this, "inputValidationFunc");
    // An optional function to call instead of standard value extraction (getting a value from HTML elements).
    __publicField(this, "inputExtractionFunc");
    // An optional function to clean a value extracted from a field.
    __publicField(this, "inputCleaningFunc");
  }
};
var _Field = class _Field {
  constructor(options = new FieldOptions()) {
    // A unique (within this system) ID for this instance.
    __publicField(this, "id");
    // The options for this field.
    __publicField(this, "options");
    // The element reference for the container that houses any input elements and labels.
    __publicField(this, "element");
    this.id = "edq-field-".concat(_Field.counter++);
    this.options = Object.assign(new FieldOptions(), options);
    this.element = this.createContainerElement();
  }
  // Create the HTML element for the container of this field.
  createContainerElement() {
    let children = this.createInnerElements();
    if (this.options.label != null) {
      let labelElement = document.createElement("label");
      labelElement.htmlFor = this.id;
      labelElement.innerText = this.options.label;
      if (this.options.required) {
        labelElement.innerHTML += ' <span class="required-color">*</span>';
      }
      if (this.options.labelBefore) {
        children.unshift(labelElement);
      } else {
        children.push(labelElement);
      }
    }
    let errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.classList.add("hidden");
    if (this.options.errorBefore) {
      children.unshift(errorElement);
    } else {
      children.push(errorElement);
    }
    let element = document.createElement("div");
    element.classList.add("edq-field");
    element.classList.add("edq-field-".concat(this.constructor.name.toLowerCase().replace(/field$/, "")));
    if (this.options.name != null) {
      element.setAttribute("name", this.options.name);
    }
    if (this.options.validateOnFocusOut) {
      let field = this;
      element.addEventListener("focusout", function(event) {
        field.validateInput();
      });
    }
    element.replaceChildren(...children);
    return element;
  }
  getValue() {
    let value = void 0;
    if (this.options.inputExtractionFunc != null) {
      value = this.options.inputExtractionFunc(this);
    } else {
      value = this.getInnerValue();
    }
    if (this.options.inputCleaningFunc != null) {
      value = this.options.inputCleaningFunc(value);
    }
    return value;
  }
  // Validate the current input for this field and return any validation error message.
  validateInput(ignoreExternalFunc = false, onlyMessage = false) {
    let message = void 0;
    if (!ignoreExternalFunc && this.options.inputValidationFunc != null) {
      message = this.options.inputValidationFunc(this, onlyMessage);
    } else {
      message = this.validateInnerInput(onlyMessage);
    }
    if (onlyMessage) {
      return message;
    }
    let errorElement = this.element.querySelector(".error-message");
    if (message == null) {
      errorElement.innerText = "";
      errorElement.classList.add("hidden");
    } else {
      errorElement.innerText = message;
      errorElement.classList.remove("hidden");
    }
    return message;
  }
};
// The total number of Fields created.
// Used to create unique IDs for each field instance.
__publicField(_Field, "counter", 0);
var Field = _Field;
var FieldSet = class {
  constructor(fields, {
    includeSubmitButton = true,
    submitButtonText = "Submit",
    submitButtonDisableWhenInvalid = true,
    submitCallback = void 0
  }) {
    // The field instances contained in this object.
    __publicField(this, "fields");
    // The HTML element for this collection.
    __publicField(this, "element");
    this.fields = fields;
    this.element = document.createElement("fieldset");
    this.element.classList.add("edq-fieldset");
    let seenNames = /* @__PURE__ */ new Set();
    let children = [];
    if (includeSubmitButton) {
      let button = document.createElement("button");
      button.classList.add("submit");
      button.innerText = submitButtonText;
      if (submitCallback != null) {
        let self2 = this;
        button.addEventListener("click", function(event) {
          let values = self2.getValues();
          submitCallback(values, self2);
        });
      }
      if (submitButtonDisableWhenInvalid) {
        button.disabled = this.validateInputs(true).length != 0;
        let self2 = this;
        this.element.addEventListener("change", function(event) {
          let messages = self2.validateInputs(true);
          if (messages.length == 0) {
            button.disabled = false;
          } else {
            button.disabled = true;
          }
        });
      }
      children.push(button);
    }
    for (const field of fields) {
      if (field.options.name == null) {
        console.error(field);
        throw new Error("Fields being passed to a FieldSet must have a name.");
      }
      if (seenNames.has(field.options.name)) {
        console.error(field);
        throw new Error("Fields being passed to a FieldSet must have a unique name, name '".concat(field.options.name, "' already seen."));
      }
      seenNames.add(field.options.name);
      children.push(field.element);
    }
    this.element.replaceChildren(...children);
  }
  // Validate all inputs and get a list of any errors.
  // If the list is empty, then there are no errors.
  validateInputs(onlyMessage = false) {
    let messages = [];
    for (const field of this.fields) {
      let message = field.validateInput(false, onlyMessage);
      if (message != null) {
        messages.push(message);
      }
    }
    return messages;
  }
  // Get a mapping of each field's name to their value.
  getValues() {
    let result = {};
    for (const field of this.fields) {
      result[field.options.name] = field.getValue();
    }
    return result;
  }
};
var SimpleInputField = class extends Field {
  // Get the tag used for input on this element.
  // This will usually be 'input', but gives an opportunity for children to override.
  // Despite the ability to change tag types, this class will still assume that a `HTMLInputElement` is produced.
  // It is up to any overriding children to make the proper adjustments.
  getInputTag() {
    return "input";
  }
  createInnerElements() {
    let element = document.createElement(this.getInputTag());
    element.id = this.id;
    if (this.options.name != null) {
      element.setAttribute("name", this.options.name);
    }
    if (this.options.required) {
      element.required = true;
    }
    if (this.options.placeholder != null) {
      element.placeholder = this.options.placeholder;
    }
    if (this.options.defaultValue != null) {
      element.value = this.options.defaultValue;
    }
    element.addEventListener("blur", function(event) {
      element.classList.add("touched");
    });
    this.finalizeInput(element);
    return [element];
  }
  getElement() {
    return this.element.querySelector(this.getInputTag());
  }
  getInnerValue() {
    return this.getElement().value;
  }
  validateInnerInput(onlyMessage) {
    let inputElement = this.getElement();
    if (!inputElement.validity.valid) {
      return inputElement.validationMessage;
    }
    if (!inputElement.checkValidity()) {
      return inputElement.validationMessage;
    }
    return void 0;
  }
};
var TextFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    __publicField(this, "minLength");
    __publicField(this, "maxLength");
  }
};
var TextField = class extends SimpleInputField {
  constructor(options = new TextFieldOptions()) {
    options = Object.assign(new TextFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    element.type = "text";
    let options = this.options;
    if (options.minLength != null) {
      element.minLength = options.minLength;
    }
    if (options.maxLength != null) {
      element.maxLength = options.maxLength;
    }
  }
};
var EmailField = class extends TextField {
  finalizeInput(element) {
    super.finalizeInput(element);
    element.type = "email";
  }
  // Emails cannot be empty strings.
  getInnerValue() {
    let value = super.getInnerValue();
    if (value == null) {
      return void 0;
    }
    if (value.length == 0) {
      return void 0;
    }
    return value;
  }
};
var PhoneNumberField = class extends TextField {
  finalizeInput(element) {
    super.finalizeInput(element);
    element.type = "tel";
  }
  // Phone numbers cannot be empty strings.
  getInnerValue() {
    let value = super.getInnerValue();
    if (value == null) {
      return void 0;
    }
    if (value.length == 0) {
      return void 0;
    }
    return value;
  }
};
var SecretFieldOptions = class extends TextFieldOptions {
  constructor() {
    super(...arguments);
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/password#allowing_autocomplete
    __publicField(this, "autocomplete", "off");
  }
};
var SecretField = class extends TextField {
  constructor(options = new SecretFieldOptions()) {
    options = Object.assign(new SecretFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    super.finalizeInput(element);
    element.type = "password";
    let options = this.options;
    if (options.autocomplete != null) {
      element.autocomplete = options.autocomplete;
    }
  }
  createInnerElements() {
    let element = super.createInnerElements()[0];
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("input", function(event) {
      if (checkbox.checked) {
        element.type = "text";
      } else {
        element.type = "password";
      }
    });
    let label = document.createElement("label");
    label.innerText = "Show";
    let container = document.createElement("div");
    container.replaceChildren(element, label, checkbox);
    return [container];
  }
};
var TextAreaFieldOptions = class extends TextFieldOptions {
  constructor() {
    super(...arguments);
    __publicField(this, "rows");
    __publicField(this, "cols");
  }
};
var TextAreaField = class extends TextField {
  constructor(options = new TextAreaFieldOptions()) {
    options = Object.assign(new TextAreaFieldOptions(), options);
    super(options);
  }
  getInputTag() {
    return "textarea";
  }
  finalizeInput(rawElement) {
    let element = rawElement;
    let options = this.options;
    if (options.rows != null) {
      element.rows = options.rows;
    }
    if (options.cols != null) {
      element.cols = options.cols;
    }
  }
};
var NumericFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "step");
  }
};
var NumericField = class extends SimpleInputField {
  constructor(options = new NumericFieldOptions()) {
    super(options);
  }
  finalizeInput(element) {
    let options = this.options;
    element.type = "number";
    if (options.min != null) {
      element.min = options.min.toString();
    }
    if (options.max != null) {
      element.max = options.max.toString();
    }
    if (options.step != null) {
      element.step = options.step.toString();
    }
  }
  getInnerValue() {
    let rawValue = super.getInnerValue();
    let value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return void 0;
    }
    if (Number.isInteger(value)) {
      return parseInt(value.toString());
    }
    return value;
  }
};
var IntegerField = class extends NumericField {
  finalizeInput(element) {
    super.finalizeInput(element);
    element.pattern = "d*";
  }
};
var SliderField = class extends NumericField {
  createInnerElements() {
    let element = super.createInnerElements()[0];
    let label = document.createElement("span");
    label.innerText = element.value;
    element.addEventListener("input", function(event) {
      label.innerText = element.value;
    });
    let container = document.createElement("div");
    container.replaceChildren(element, label);
    return [container];
  }
  finalizeInput(element) {
    super.finalizeInput(element);
    element.type = "range";
  }
};
var DateFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    __publicField(this, "min");
    __publicField(this, "max");
    // Offset the timezone of the given value (which is always UTC in these specific cases) to the user's local timezone.
    __publicField(this, "localTimezone", true);
  }
};
var DateField = class extends SimpleInputField {
  constructor(options = new DateFieldOptions()) {
    options = Object.assign(new DateFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    let options = this.options;
    element.type = "date";
    if (options.min != null) {
      element.min = datestampToString(options.min);
    }
    if (options.max != null) {
      element.max = datestampToString(options.max);
    }
  }
  getInnerValue() {
    let options = this.options;
    return parse(super.getInnerValue(), options.localTimezone);
  }
};
var LocalDatetimeField = class extends SimpleInputField {
  constructor(options = new DateFieldOptions()) {
    options = Object.assign(new DateFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    let options = this.options;
    element.type = "datetime-local";
    if (options.min != null) {
      element.min = datestampToString(options.min);
    }
    if (options.max != null) {
      element.max = datestampToString(options.max);
    }
  }
  getInnerValue() {
    return parse(super.getInnerValue());
  }
};
var TimeFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    __publicField(this, "min");
    __publicField(this, "max");
  }
};
var TimeField = class extends SimpleInputField {
  constructor(options = new TimeFieldOptions()) {
    options = Object.assign(new TimeFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    let options = this.options;
    element.type = "time";
    if (options.min != null) {
      element.min = options.min;
    }
    if (options.max != null) {
      element.max = options.max;
    }
  }
  getInnerValue() {
    let value = super.getInnerValue();
    if (value == null) {
      return void 0;
    }
    if (value.length == 0) {
      return void 0;
    }
    if (value.length == 5) {
      value += ":00";
    }
    return value;
  }
};
var ChoiceFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    // Mapping of label to value.
    __publicField(this, "choices", {});
    __publicField(this, "choiceLabelBefore", false);
  }
};
var ChoiceField = class extends Field {
  constructor(options = new ChoiceFieldOptions()) {
    options = Object.assign(new ChoiceFieldOptions(), options);
    super(options);
    let foundDefault = false;
    for (const [labelText, value] of Object.entries(options.choices)) {
      if (this.options.defaultValue != null && this.options.defaultValue === value) {
        foundDefault = true;
      }
    }
    if (this.options.defaultValue != null && !foundDefault) {
      console.error(this);
      throw new Error("Choice field has a default value that was not seen in the choices: '".concat(this.options.defaultValue, "'."));
    }
  }
  createInnerElements() {
    let options = this.options;
    let element = document.createElement("div");
    element.id = this.id;
    for (const [labelText, value] of Object.entries(options.choices)) {
      let label = document.createElement("label");
      label.innerText = labelText;
      let choice = document.createElement("input");
      choice.type = this.getInputType();
      choice.value = value;
      choice.dataset.label = labelText;
      if (this.options.name != null) {
        choice.setAttribute("name", this.options.name);
      }
      if (this.options.defaultValue != null && this.options.defaultValue === value) {
        choice.checked = true;
      }
      let pair = document.createElement("div");
      if (options.choiceLabelBefore) {
        pair.appendChild(label);
        pair.appendChild(choice);
      } else {
        pair.appendChild(choice);
        pair.appendChild(label);
      }
      element.appendChild(pair);
    }
    element.addEventListener("focusout", function(event) {
      element.classList.add("touched");
    });
    return [element];
  }
  // Get all the checked choices.
  getChecked() {
    let options = this.options;
    let checked = {};
    for (const choice of this.element.querySelectorAll('input[type="'.concat(this.getInputType(), '"]'))) {
      if (choice.checked) {
        let label = choice.dataset.label;
        checked[label] = options.choices[label];
      }
    }
    return checked;
  }
  validateInnerInput(onlyMessage) {
    let hasSelection = false;
    for (const choice of this.element.querySelectorAll('input[type="'.concat(this.getInputType(), '"]'))) {
      if (choice.checked) {
        hasSelection = true;
      }
    }
    if (this.options.required && !hasSelection) {
      return "Please make a selection.";
    }
    return void 0;
  }
};
var RadioField = class extends ChoiceField {
  constructor(options = new ChoiceFieldOptions()) {
    options = Object.assign(new ChoiceFieldOptions(), options);
    super(options);
  }
  getInputType() {
    return "radio";
  }
  getInnerValue() {
    for (const [key, value] of Object.entries(this.getChecked())) {
      return value;
    }
    return void 0;
  }
};
var CheckboxField = class extends ChoiceField {
  constructor(options = new ChoiceFieldOptions()) {
    options = Object.assign(new ChoiceFieldOptions(), options);
    super(options);
  }
  getInputType() {
    return "checkbox";
  }
  getInnerValue() {
    return this.getChecked();
  }
};
var FileFieldOptions = class extends FieldOptions {
  constructor() {
    super(...arguments);
    // The allowed file types/mimes for this field.
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#accept
    __publicField(this, "allowedTypes");
    __publicField(this, "multiple", false);
  }
};
var FileField = class extends SimpleInputField {
  constructor(options = new FileFieldOptions()) {
    options = Object.assign(new FileFieldOptions(), options);
    super(options);
  }
  finalizeInput(element) {
    let options = this.options;
    element.type = "file";
    if (options.allowedTypes != null) {
      let values = options.allowedTypes;
      if (typeof values === "string") {
        values = [values];
      }
      element.accept = values.join(",");
    }
    if (options.multiple != null) {
      element.multiple = options.multiple;
    }
  }
  getInnerValue() {
    return this.getElement().files;
  }
};

// src/js/render/index.ts
var render_exports = {};
__export(render_exports, {
  cards: () => cards_exports,
  code: () => code_exports
});

// src/js/render/cards.ts
var cards_exports = {};
__export(cards_exports, {
  CARD_TYPE_LARGE: () => CARD_TYPE_LARGE,
  CARD_TYPE_LINK: () => CARD_TYPE_LINK,
  CARD_TYPE_SMALL: () => CARD_TYPE_SMALL,
  Card: () => Card,
  CardArea: () => CardArea,
  LargeCard: () => LargeCard,
  LinkCard: () => LinkCard,
  SmallCard: () => SmallCard
});
var CARD_TYPE_LINK = "link";
var CARD_TYPE_SMALL = "small";
var CARD_TYPE_LARGE = "large";
var Card = class {
  constructor(type, name = "unknown") {
    __publicField(this, "type");
    __publicField(this, "name");
    this.type = type;
    this.name = name;
  }
  getElement() {
    let element = document.createElement("div");
    element.classList.add("card");
    element.classList.add("drop-shadow");
    element.dataset["type"] = this.type;
    element.dataset["name"] = this.name;
    element.replaceChildren(...this.getInnerElements());
    return element;
  }
};
var LinkCard = class extends Card {
  constructor(text, link, name = CARD_TYPE_LINK) {
    super(CARD_TYPE_LINK, name);
    __publicField(this, "text");
    __publicField(this, "link");
    this.text = text;
    this.link = link;
  }
  getInnerElements() {
    let textElement = document.createElement("span");
    textElement.textContent = this.text;
    let linkElement = document.createElement("a");
    linkElement.href = this.link;
    linkElement.replaceChildren(textElement);
    return [linkElement];
  }
};
var SmallCard = class extends Card {
  constructor(text, name = CARD_TYPE_SMALL) {
    super(CARD_TYPE_SMALL, name);
    __publicField(this, "text");
    this.text = text;
  }
  getInnerElements() {
    let textElement = document.createElement("span");
    textElement.textContent = this.text;
    return [textElement];
  }
};
var LargeCard = class extends Card {
  constructor(header, paragraphs, name = CARD_TYPE_LARGE, headerTag = "h3") {
    super(CARD_TYPE_LARGE, name);
    __publicField(this, "header");
    __publicField(this, "headerTag");
    __publicField(this, "paragraphs");
    if (typeof paragraphs === "string") {
      paragraphs = [paragraphs];
    }
    this.header = header;
    this.headerTag = headerTag;
    this.paragraphs = paragraphs;
  }
  getInnerElements() {
    let elements = [];
    if (this.header != null) {
      let headerElement = document.createElement(this.headerTag);
      headerElement.textContent = this.header;
      elements.push(headerElement);
    }
    for (const paragraph of this.paragraphs) {
      let textElement = document.createElement("p");
      textElement.textContent = paragraph;
      elements.push(textElement);
    }
    return elements;
  }
};
var CardArea = class {
  constructor(cards) {
    __publicField(this, "cards");
    this.cards = cards;
  }
  getElement() {
    let cardElements = [];
    for (const card of this.cards) {
      cardElements.push(card.getElement());
    }
    let element = document.createElement("div");
    element.classList.add("card-area");
    element.replaceChildren(...cardElements);
    return element;
  }
};

// src/js/render/code.ts
var code_exports = {};
__export(code_exports, {
  block: () => block
});
var import_prism = __toESM(require_prism(), 1);
var DEFAULT_LANGUAGE = "plaintext";
function init2() {
  import_prism.default.manual = true;
}
function block(container, text, language = DEFAULT_LANGUAGE) {
  if (!import_prism.default.languages.hasOwnProperty(language)) {
    console.warn("Unknown code language '".concat(language, "'. Falling back to plan text for highlighting."));
    language = DEFAULT_LANGUAGE;
  }
  let codeElement = document.createElement("code");
  codeElement.classList.add("language-".concat(language));
  codeElement.innerHTML = new Option(text).innerHTML;
  let preElement = document.createElement("pre");
  preElement.classList.add("language-".concat(language));
  preElement.appendChild(codeElement);
  container.replaceChildren(preElement);
  import_prism.default.highlightAllUnder(container);
}
init2();

// src/js/util/index.ts
var util_exports = {};
__export(util_exports, {
  brightness: () => brightness_exports,
  json: () => json_exports,
  objects: () => objects_exports,
  strings: () => strings_exports,
  table: () => table_exports
});

// src/js/util/brightness.ts
var brightness_exports = {};
__export(brightness_exports, {
  initBrightmode: () => initBrightmode,
  setBrightmode: () => setBrightmode
});
var _isLightmode = void 0;
function initBrightmode() {
  setBrightmode(isSystemLightmode());
  let toggle = document.querySelector(".brightmode-toggle");
  if (toggle) {
    toggle.addEventListener("click", function(event) {
      let lightSelection = document.querySelector(".brightmode-toggle .lightmode");
      if (lightSelection == null) {
        throw new Error("Brightmode toggle has no light element.");
      }
      setBrightmode(!lightSelection.classList.contains("active"));
    });
  }
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(event) {
      setBrightmode(!event.matches);
    });
  }
}
function setBrightmode(isLight) {
  _isLightmode = isLight;
  document.querySelectorAll(".brightmode-toggle .selector").forEach(function(element) {
    if (isLight && element.classList.contains("lightmode") || !isLight && element.classList.contains("darkmode")) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
  let html = document.querySelector("html");
  if (isLight) {
    html.classList.remove("darkmode");
    html.classList.add("lightmode");
  } else {
    html.classList.remove("lightmode");
    html.classList.add("darkmode");
  }
  html.classList.remove("no-brightness-selection");
}
function isSystemLightmode() {
  if (!window.matchMedia) {
    return true;
  }
  return !window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// src/js/util/json.ts
var json_exports = {};
__export(json_exports, {
  DEFAULT_INDENT: () => DEFAULT_INDENT,
  defaultReplacer: () => defaultReplacer,
  pretty: () => pretty,
  stringify: () => stringify
});
var DEFAULT_INDENT = 4;
function stringify(value, replacer = defaultReplacer) {
  if (typeof value === "string") {
    value = JSON.parse(value);
  }
  return JSON.stringify(value, replacer);
}
function pretty(value, indent = DEFAULT_INDENT, replacer = defaultReplacer) {
  if (typeof value === "string") {
    value = JSON.parse(value);
  }
  return JSON.stringify(value, replacer, indent);
}
function defaultReplacer(key, value) {
  if (value == null) {
    return null;
  }
  return value;
}

// src/js/util/strings.ts
var strings_exports = {};
__export(strings_exports, {
  caseInsensitiveStringCompare: () => caseInsensitiveStringCompare,
  cleanText: () => cleanText,
  stringCompare: () => stringCompare,
  titleCase: () => titleCase
});
var WORD_BREAK_RE = /[\-_]+/;
function stringCompare(a, b) {
  return a.localeCompare(b);
}
function caseInsensitiveStringCompare(a, b) {
  return a.localeCompare(b, void 0, { sensitivity: "base" });
}
function cleanText(text) {
  if (text == null) {
    return "";
  }
  text = text.toString();
  text = text.replace(WORD_BREAK_RE, " ");
  text = text.replace(/\s+/, " ");
  text = text.trim();
  return text;
}
function titleCase(text, clean = true) {
  if (text.length == 0) {
    return "";
  }
  if (clean) {
    text = cleanText(text);
  }
  return text.toLowerCase().split(/\s+/).map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(" ");
}

// src/js/util/table.ts
var table_exports = {};
__export(table_exports, {
  defaultTableTextCompare: () => defaultTableTextCompare,
  enableSorting: () => enableSorting,
  enableSortingAll: () => enableSortingAll
});
function enableSortingAll() {
  document.querySelectorAll("table.sortable-table").forEach(function(table) {
    enableSorting(table);
  });
}
function enableSorting(table, sortFunc = defaultTableTextCompare) {
  table.querySelectorAll("th").forEach(function(header2) {
    header2.addEventListener("click", function(event) {
      sortTable(header2, table, void 0, sortFunc);
    });
  });
  let header = table.querySelector("th.sortable-table-initial-col-asc");
  if (header) {
    sortTable(header, table, true, sortFunc);
  }
  header = table.querySelector("th.sortable-table-initial-col-desc");
  if (header) {
    sortTable(header, table, false, sortFunc);
  }
}
function sortTable(header, table, forceSortAscending = void 0, sortFunc = defaultTableTextCompare) {
  let rows = [...table.tBodies[0].rows];
  let sortIndex = [...header.parentElement.children].indexOf(header);
  let sortAscending = !(header.dataset.ascending === "true");
  if (forceSortAscending !== void 0) {
    sortAscending = forceSortAscending;
  }
  for (const otherHeader of header.parentElement.children) {
    delete otherHeader.dataset.ascending;
  }
  header.dataset.ascending = sortAscending.toString();
  rows.sort(function(a, b) {
    let compareValue = sortFunc(a.cells[sortIndex].textContent, b.cells[sortIndex].textContent);
    return sortAscending ? compareValue : -compareValue;
  });
  table.tBodies[0].replaceChildren(...rows);
}
function defaultTableTextCompare(a, b) {
  a = a.trim();
  b = b.trim();
  const numberAValue = parseFloat(a);
  const numberBValue = parseFloat(b);
  let compareValue = 0;
  if (!Number.isNaN(numberAValue) && !Number.isNaN(numberBValue)) {
    return numberAValue - numberBValue;
  }
  return stringCompare(a, b);
}

// src/js/index.ts
var VERSION = "0.0.1";
export {
  VERSION,
  core_exports as core,
  model_exports as model,
  render_exports as render,
  util_exports as util
};
//# sourceMappingURL=edq.mjs.map
