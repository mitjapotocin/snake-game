parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aRYt":[function(require,module,exports) {
function t(t,e,n,r,o,i,c){try{var a=t[i](c),u=a.value}catch(s){return void n(s)}a.done?e(u):Promise.resolve(u).then(r,o)}function e(e){return function(){var n=this,r=arguments;return new Promise(function(o,i){var c=e.apply(n,r);function a(e){t(c,o,i,a,u,"next",e)}function u(e){t(c,o,i,a,u,"throw",e)}a(void 0)})}}function n(t){return i(t)||o(t)||u(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function i(t){if(Array.isArray(t))return s(t)}function c(t,e){return p(t)||l(t,e)||u(t,e)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(u){o=!0,i=u}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}function p(t){if(Array.isArray(t))return t}function f(t,e){Object.entries(e).forEach(function(e){var n=c(e,2),r=n[0],o=n[1];t.setAttribute(r,o)})}var d,y,v="http://www.w3.org/2000/svg",h=document.querySelector(".game-container"),m=22,b=20,S=30,w=document.createElementNS(v,"svg"),g=document.querySelector(".score-counter"),A=0,x=1,L=[E(),E(1,0)],k=E(3,3,!0),N=document.querySelector("#nickname");function j(){O(),I(),y=setInterval(function(){q()},110)}function E(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=document.createElementNS(v,"rect");return r.setAttributeNS(null,"x",t*m),r.setAttributeNS(null,"y",e*m),r.setAttributeNS(null,"height",m),r.setAttributeNS(null,"width",m),r.setAttributeNS(null,"opacity",1),r.setAttributeNS(null,"fill",n?"#000000d9":"hotpink"),n?(r.setAttributeNS(null,"rx","".concat(m/2)),r.setAttributeNS(null,"ry","".concat(m/2)),r.classList.add("geico")):(r.setAttributeNS(null,"rx","2"),r.setAttributeNS(null,"ry","2")),r.position={x:t,y:e},r}function O(){f(w,{viewBox:"0 0 ".concat(b*m," ").concat(S*m),width:b*m,height:S*m}),h.append(w)}function M(){return 1===x?1:3===x?-1:0}function T(){return 2===x?1:4===x?-1:0}function q(){var t=(L=[L[L.length-1]].concat(n(L.slice(0,L.length-1))))[0],e=L[1]||L[0];if(t.position.x=e.position.x+M(),t.position.y=e.position.y+T(),t.position.x===k.position.x&&t.position.y===k.position.y){var r=E(k.position.x,k.position.y);w.append(r),L.unshift(r),A+=10,g.classList.add("active"),setTimeout(function(){g.classList.remove("active")},300),g.innerHTML="<span>Score: ".concat(A,"</span>"),k.position={x:Math.floor(Math.random(1)*b),y:Math.floor(Math.random(1)*S)},k.setAttributeNS(null,"x",k.position.x*m),k.setAttributeNS(null,"y",k.position.y*m)}t.position.x<0||t.position.x>b-1||t.position.y<0||t.position.y>S-1||R()?(clearInterval(y),D()):(t.setAttributeNS(null,"x",t.position.x*m),t.setAttributeNS(null,"y",t.position.y*m))}function R(){var t=L[0],e=!1;return L.slice(4).forEach(function(n){n.position.x===t.position.x&&n.position.y===t.position.y&&(e=!0)}),e}function I(){L.forEach(function(t){w.append(t)}),w.append(k)}N.addEventListener("submit",function(t){t.preventDefault(),""!==(d=document.querySelector('input[type="text"]').value)&&(document.querySelector(".welcome").classList.add("hide"),j())},{passive:!1}),document.addEventListener("keydown",function(t){var e={ArrowRight:1,ArrowLeft:3,ArrowDown:2,ArrowUp:4," ":"stop"};void 0!==e[t.key]&&(t.preventDefault(),(1===x&&"ArrowLeft"!==t.key||2===x&&"ArrowUp"!==t.key||3===x&&"ArrowRidht"!==t.key||4===x&&"ArrowDown"!==t.key)&&(x=e[t.key])),"Enter"===t.key&&H.classList.contains("active")&&U()},{passive:!1});var H=document.querySelector(".game-over");function D(){H.classList.add("active"),H.querySelector(".score").innerHTML="<span>".concat(d,"</span>, you scored <span>").concat(A,"</span> points"),P()}function P(){return C.apply(this,arguments)}function C(){return(C=e(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(void 0===B[d]||B[d]<A)){t.next=4;break}return t.next=3,Q($,{name:d,score:A});case 3:F().then(function(){K()});case 4:case"end":return t.stop()}},t)}))).apply(this,arguments)}function U(){H.classList.remove("active"),A=0,g.innerHTML="<span>Score: ".concat(A,"</span>"),L=[E(),E(1,0)],k=E(3,3,!0),h.querySelector("svg").innerHTML="",x=1,I(),y=setInterval(function(){q()},110)}document.querySelector(".play-again").addEventListener("click",U);var B,J,$="https://sloenduro-results.herokuapp.com/api/snake-results",z=document.querySelector(".leaderboard");function F(){return G.apply(this,arguments)}function G(){return(G=e(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch($).then(function(t){return t.json()}).then(function(t){gameResults=t,B=gameResults.reduce(function(t,e){return(void 0===t[e.name]||t[e.name]<e.score)&&(t[e.name]=e.score),t},{}),resultsList=n(Object.entries(B)).map(function(t){var e={};return e[t[0]]=t[1],e}).sort(function(t,e){return Object.values(e)[0]-Object.values(t)[0]})});case 2:case"end":return t.stop()}},t)}))).apply(this,arguments)}function K(){z.innerHTML="",resultsList.forEach(function(t){var e=document.createElement("li");e.innerHTML="".concat(Object.keys(t)[0],": ").concat(Object.values(t)[0]),Object.keys(t)[0]===d&&e.classList.add("current"),z.appendChild(e)})}function Q(){return V.apply(this,arguments)}function V(){return(V=e(regeneratorRuntime.mark(function t(){var e,n,r=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.length>0&&void 0!==r[0]?r[0]:"",n=r.length>1&&void 0!==r[1]?r[1]:{},t.next=4,fetch(e,{method:"POST",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(n)});case 4:t.sent;case 5:case"end":return t.stop()}},t)}))).apply(this,arguments)}F().then(function(){K()});
},{}]},{},["aRYt"], null)
//# sourceMappingURL=/main.334a1f48.js.map