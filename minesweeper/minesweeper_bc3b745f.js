!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);const r=console.log.bind(console),o=t=>{const e=document.querySelector(t);if(null!=e)return e;r(`元素没找到，选择器 ${t} 没有找到或者 js 没有放在 body 里`);return e},s=t=>{const e=document.querySelectorAll(t);if(0!=e.length)return e;r(`元素没找到，选择器 ${t} 没有找到或者 js 没有放在 body 里`)},l=(t,e,n)=>{t.addEventListener(e,n)},c=()=>{return Math.random()>.8?1:0},i=t=>{const e=[];for(let n=0;n<t;n++){const t=[0,9][c()];e.push(t)}return e},a=(t,e,n)=>{const r=t.length;e>=0&&e<r&&(n>=0&&n<r)&&9!=t[e][n]&&(t[e][n]+=1)},u=(t,e,n)=>{t.length;9==t[e][n]&&(a(t,e-1,n-1),a(t,e,n-1),a(t,e+1,n-1),a(t,e-1,n),a(t,e+1,n),a(t,e-1,n+1),a(t,e,n+1),a(t,e+1,n+1))},d=t=>{return(t=>{const e=(t=>{const e=[];for(let n=0;n<t.length;n++){const r=t[n].slice(0);e.push(r)}return e})(t);for(let t=0;t<e.length;t++){const n=e[t].slice(0);for(let r=0;r<n.length;r++)u(e,t,r)}return e})((t=>{const e=[];for(let n=0;n<t;n++){const n=i(t);e.push(n)}return e})(t))},f=(t,e)=>{const n=t.slice(0);let r="";for(let t=0;t<n.length;t++){let o=n[t];r+=`\n            <div class="cell"\n                data-number="${o}"\n                data-x="${e}"\n                data-y="${t}">\n                ${o}\n            </div>\n        `}return r},b=t=>{const e=(t=>{const e=t.slice(0);let n="";for(let t=0;t<e.length;t++){const r=e[t];n+=`\n            <div class="row clearfix">\n                ${f(r,t)}\n            </div>\n        `}return n})(t);((t,e)=>{t.insertAdjacentHTML("beforeend",e)})(o("#id-div-mine"),e)},m=t=>{t.classList.add("opened")},g=()=>{0==(()=>{const t=[],e=s(".cell");for(let n=0;n<e.length;n++){const r=e[n],o="9"==r.dataset.number,s=r.classList.contains("opened");o||s||t.push(r)}return t})().length&&swal({title:"好样的！",text:"扫雷成功！",icon:"success",buttons:{cancel:"看看是咋赢的",restart:"再玩一把~"},closeOnEsc:!0}).then(t=>{"restart"==t&&x()})},p=(t,e)=>{const n=Number(t.dataset.number),r=Number(t.dataset.x),o=Number(t.dataset.y);9==n?((t=>{m(t),t.classList.add("boom-clicked");const e=s(".cell");for(let t=0;t<e.length;t++){let n=e[t];const r=9==Number(n.dataset.number),o=n.classList.contains("boom-clicked");r&&!o&&(m(n),n.classList.add("boom"))}})(t),swal({title:"哎呀",text:"踩雷啦",icon:"error",buttons:{cancel:"让我看看错哪了",restart:"再接再厉"},closeOnEsc:!0}).then(t=>{"restart"==t&&x()})):0==n?(m(t),v(t,e,r,o),g()):(m(t),g())},v=(t,e,n,r)=>{h(t,e,n-1,r-1),h(t,e,n,r-1),h(t,e,n+1,r-1),h(t,e,n-1,r),h(t,e,n+1,r),h(t,e,n-1,r+1),h(t,e,n,r+1),h(t,e,n+1,r+1)},h=(t,e,n,r)=>{const s=e.length;if(n<s&&n>=0&&r<s&&r>=0){const t=o(`[data-x="${n}"][data-y="${r}"]`);if(!t.classList.contains("opened")){if("9"==t.dataset.number)return;"0"==t.dataset.number?(m(t),v(t,e,n,r)):m(t)}}},y=t=>{const e=d(t);b(e),(t=>{const e=o("#id-div-mine");l(e,"click",function(e){const n=e.target;n.classList.contains("cell")&&p(n,t)})})(e)},x=()=>{o("#id-div-mine").innerHTML=null;let t=Number($());L(t),y(t)},L=t=>{o(".mine-box").style.width=`${33*t}px`},$=()=>{return window.localStorage.getItem("level")},j=t=>{window.localStorage.setItem("level",`${t}`)};(()=>{j(9),(()=>{let t=o(".game-level");l(t,"click",function(t){const e=t.target;if(e.classList.contains("button-select")){let t=Number(e.dataset.level);j(t),x()}})})();let t=$(),e=Number(t);L(e),y(e),(()=>{const t=o("#id-game-restart");l(t,"click",function(){x()})})(),(()=>{const t=o("#id-div-mine");l(t,"contextmenu",function(t){t.preventDefault();const e=t.target;e.classList.contains("cell")&&e.classList.toggle("flag")})})()})()}]);