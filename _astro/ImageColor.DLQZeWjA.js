import{j as M}from"./jsx-runtime.D_zvdyIk.js";import{r as P}from"./index.BVOCwoKb.js";var L=function(c,f){return c<f?-1:c>f?1:0},S=function(c){return c.reduce(function(f,h){return f+h},0)},D=function(){function c(h){this.colors=h}var f=c.prototype;return f.palette=function(){return this.colors},f.map=function(h){return h},c}(),U=function(){function c(e,t,o){return(e<<10)+(t<<5)+o}function f(e){var t=[],o=!1;function r(){t.sort(e),o=!0}return{push:function(a){t.push(a),o=!1},peek:function(a){return o||r(),a===void 0&&(a=t.length-1),t[a]},pop:function(){return o||r(),t.pop()},size:function(){return t.length},map:function(a){return t.map(a)},debug:function(){return o||r(),t}}}function h(e,t,o,r,a,n,s){var u=this;u.r1=e,u.r2=t,u.g1=o,u.g2=r,u.b1=a,u.b2=n,u.histo=s}function w(){this.vboxes=new f(function(e,t){return L(e.vbox.count()*e.vbox.volume(),t.vbox.count()*t.vbox.volume())})}function b(e,t){if(t.count()){var o=t.r2-t.r1+1,r=t.g2-t.g1+1,a=Math.max.apply(null,[o,r,t.b2-t.b1+1]);if(t.count()==1)return[t.copy()];var n,s,u,g,m=0,p=[],C=[];if(a==o)for(n=t.r1;n<=t.r2;n++){for(g=0,s=t.g1;s<=t.g2;s++)for(u=t.b1;u<=t.b2;u++)g+=e[c(n,s,u)]||0;p[n]=m+=g}else if(a==r)for(n=t.g1;n<=t.g2;n++){for(g=0,s=t.r1;s<=t.r2;s++)for(u=t.b1;u<=t.b2;u++)g+=e[c(s,n,u)]||0;p[n]=m+=g}else for(n=t.b1;n<=t.b2;n++){for(g=0,s=t.r1;s<=t.r2;s++)for(u=t.g1;u<=t.g2;u++)g+=e[c(s,u,n)]||0;p[n]=m+=g}return p.forEach(function(j,l){C[l]=m-j}),function(j){var l,v,d,y,x,E=j+"1",I=j+"2",_=0;for(n=t[E];n<=t[I];n++)if(p[n]>m/2){for(d=t.copy(),y=t.copy(),x=(l=n-t[E])<=(v=t[I]-n)?Math.min(t[I]-1,~~(n+v/2)):Math.max(t[E],~~(n-1-l/2));!p[x];)x++;for(_=C[x];!_&&p[x-1];)_=C[--x];return d[I]=x,y[E]=d[I]+1,[d,y]}}(a==o?"r":a==r?"g":"b")}}return h.prototype={volume:function(e){var t=this;return t._volume&&!e||(t._volume=(t.r2-t.r1+1)*(t.g2-t.g1+1)*(t.b2-t.b1+1)),t._volume},count:function(e){var t=this,o=t.histo;if(!t._count_set||e){var r,a,n,s=0;for(r=t.r1;r<=t.r2;r++)for(a=t.g1;a<=t.g2;a++)for(n=t.b1;n<=t.b2;n++)s+=o[c(r,a,n)]||0;t._count=s,t._count_set=!0}return t._count},copy:function(){var e=this;return new h(e.r1,e.r2,e.g1,e.g2,e.b1,e.b2,e.histo)},avg:function(e){var t=this,o=t.histo;if(!t._avg||e){var r,a,n,s,u=0,g=0,m=0,p=0;if(t.r1===t.r2&&t.g1===t.g2&&t.b1===t.b2)t._avg=[t.r1<<3,t.g1<<3,t.b1<<3];else{for(a=t.r1;a<=t.r2;a++)for(n=t.g1;n<=t.g2;n++)for(s=t.b1;s<=t.b2;s++)u+=r=o[c(a,n,s)]||0,g+=r*(a+.5)*8,m+=r*(n+.5)*8,p+=r*(s+.5)*8;t._avg=u?[~~(g/u),~~(m/u),~~(p/u)]:[~~(8*(t.r1+t.r2+1)/2),~~(8*(t.g1+t.g2+1)/2),~~(8*(t.b1+t.b2+1)/2)]}}return t._avg},contains:function(e){var t=this,o=e[0]>>3;return gval=e[1]>>3,bval=e[2]>>3,o>=t.r1&&o<=t.r2&&gval>=t.g1&&gval<=t.g2&&bval>=t.b1&&bval<=t.b2}},w.prototype={push:function(e){this.vboxes.push({vbox:e,color:e.avg()})},palette:function(){return this.vboxes.map(function(e){return e.color})},size:function(){return this.vboxes.size()},map:function(e){for(var t=this.vboxes,o=0;o<t.size();o++)if(t.peek(o).vbox.contains(e))return t.peek(o).color;return this.nearest(e)},nearest:function(e){for(var t,o,r,a=this.vboxes,n=0;n<a.size();n++)((o=Math.sqrt(Math.pow(e[0]-a.peek(n).color[0],2)+Math.pow(e[1]-a.peek(n).color[1],2)+Math.pow(e[2]-a.peek(n).color[2],2)))<t||t===void 0)&&(t=o,r=a.peek(n).color);return r},forcebw:function(){var e=this.vboxes;e.sort(function(a,n){return L(S(a.color),S(n.color))});var t=e[0].color;t[0]<5&&t[1]<5&&t[2]<5&&(e[0].color=[0,0,0]);var o=e.length-1,r=e[o].color;r[0]>251&&r[1]>251&&r[2]>251&&(e[o].color=[255,255,255])}},{quantize:function(e,t){if(!Number.isInteger(t)||t<1||t>256)throw new Error("Invalid maximum color count. It must be an integer between 1 and 256.");if(!e.length||t<2||t>256||!e.length||t<2||t>256)return!1;for(var o=[],r=new Set,a=0;a<e.length;a++){var n=e[a],s=n.join(",");r.has(s)||(r.add(s),o.push(n))}if(o.length<=t)return new D(o);var u=function(l){var v,d=new Array(32768);return l.forEach(function(y){v=c(y[0]>>3,y[1]>>3,y[2]>>3),d[v]=(d[v]||0)+1}),d}(e);u.forEach(function(){});var g=function(l,v){var d,y,x,E=1e6,I=0,_=1e6,N=0,T=1e6,k=0;return l.forEach(function(q){(d=q[0]>>3)<E?E=d:d>I&&(I=d),(y=q[1]>>3)<_?_=y:y>N&&(N=y),(x=q[2]>>3)<T?T=x:x>k&&(k=x)}),new h(E,I,_,N,T,k,v)}(e,u),m=new f(function(l,v){return L(l.count(),v.count())});function p(l,v){for(var d,y=l.size(),x=0;x<1e3;){if(y>=v||x++>1e3)return;if((d=l.pop()).count()){var E=b(u,d),I=E[0],_=E[1];if(!I)return;l.push(I),_&&(l.push(_),y++)}else l.push(d),x++}}m.push(g),p(m,.75*t);for(var C=new f(function(l,v){return L(l.count()*l.volume(),v.count()*v.volume())});m.size();)C.push(m.pop());p(C,t);for(var j=new w;C.size();)j.push(C.pop());return j}}}().quantize,$=function(c){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=c.naturalWidth,this.height=this.canvas.height=c.naturalHeight,this.context.drawImage(c,0,0,this.width,this.height)};$.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var z=function(){};z.prototype.getColor=function(c,f){return f===void 0&&(f=10),this.getPalette(c,5,f)[0]},z.prototype.getPalette=function(c,f,h){var w=function(o){var r=o.colorCount,a=o.quality;if(r!==void 0&&Number.isInteger(r)){if(r===1)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");r=Math.max(r,2),r=Math.min(r,20)}else r=10;return(a===void 0||!Number.isInteger(a)||a<1)&&(a=10),{colorCount:r,quality:a}}({colorCount:f,quality:h}),b=new $(c),e=function(o,r,a){for(var n,s,u,g,m,p=o,C=[],j=0;j<r;j+=a)s=p[0+(n=4*j)],u=p[n+1],g=p[n+2],((m=p[n+3])===void 0||m>=125)&&(s>250&&u>250&&g>250||C.push([s,u,g]));return C}(b.getImageData().data,b.width*b.height,w.quality),t=U(e,w.colorCount);return t?t.palette():null},z.prototype.getColorFromUrl=function(c,f,h){var w=this,b=document.createElement("img");b.addEventListener("load",function(){var e=w.getPalette(b,5,h);f(e[0],c)}),b.src=c},z.prototype.getImageData=function(c,f){var h=new XMLHttpRequest;h.open("GET",c,!0),h.responseType="arraybuffer",h.onload=function(){if(this.status==200){var w=new Uint8Array(this.response);i=w.length;for(var b=new Array(i),e=0;e<w.length;e++)b[e]=String.fromCharCode(w[e]);var t=b.join(""),o=window.btoa(t);f("data:image/png;base64,"+o)}},h.send()},z.prototype.getColorAsync=function(c,f,h){var w=this;this.getImageData(c,function(b){var e=document.createElement("img");e.addEventListener("load",function(){var t=w.getPalette(e,5,h);f(t[0],this)}),e.src=b})};function R(){const[c,f]=P.useState(""),[h,w]=P.useState([]),b=t=>{const o=t.currentTarget;if(!(o instanceof HTMLInputElement))return;const r=o.files?.[0];r&&f(URL.createObjectURL(r))},e=t=>{const o=t.currentTarget;if(!(o instanceof HTMLImageElement))return;const a=new z().getPalette(o).map(n=>{let s=[],u=[],g=[];n.forEach(j=>{console.log(j);let l=parseInt(j,10);if(l!==l||l>255||l<0)return;u.push(l);let v=l.toString(16);v.length==1&&(v="0"+v);let d=Math.round(l/255*100)/100;g.push(v),s.push(d)});const m=`#${g.join("")} (${u.join(",")})`,p=`#${g.join("")}`,C=`UIColor(red:${s[0]}, green:${s[1]}, blue:${s[2]}, alpha:1.0) // ${m}`;return{desc:m,bgColor:p,output:C}});w(a)};return M.jsxs("section",{className:"image-to-color",children:[M.jsx("label",{htmlFor:"html-color-code",children:"Color Codes from Image"}),M.jsx("div",{className:"input-group",children:M.jsx("input",{type:"file",onInput:b})}),c&&M.jsx("div",{className:"image-preview",children:M.jsx("img",{src:c,onLoad:e,style:{width:100,objectFit:"contain"}})}),h.length>0&&M.jsx("div",{className:"output-container",children:h.map(({desc:t,bgColor:o,output:r})=>M.jsxs("div",{className:"color-container",children:[M.jsx("span",{className:"color-sample",style:{backgroundColor:o}}),M.jsx("span",{children:t}),M.jsx("div",{children:r})]}))})]})}export{R as default};
