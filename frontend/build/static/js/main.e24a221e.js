/*! For license information please see main.e24a221e.js.LICENSE.txt */
(()=>{var e={155:(e,t,n)=>{"use strict";function r(){return[]}function o(e){return null==e?r:function(){return this.querySelectorAll(e)}}n.d(t,{A:()=>o})},535:(e,t,n)=>{"use strict";n.r(t),n.d(t,{geoAlbers:()=>wr,geoAlbersUsa:()=>Sr,geoArea:()=>oe,geoAzimuthalEqualArea:()=>Cr,geoAzimuthalEqualAreaRaw:()=>Er,geoAzimuthalEquidistant:()=>Pr,geoAzimuthalEquidistantRaw:()=>Ar,geoBounds:()=>Ie,geoCentroid:()=>Xe,geoCircle:()=>lt,geoClipAntimeridian:()=>bt,geoClipCircle:()=>wt,geoClipExtent:()=>Nt,geoClipRectangle:()=>Pt,geoConicConformal:()=>Lr,geoConicConformalRaw:()=>Tr,geoConicEqualArea:()=>br,geoConicEqualAreaRaw:()=>yr,geoConicEquidistant:()=>_r,geoConicEquidistantRaw:()=>Dr,geoContains:()=>Kt,geoDistance:()=>Dt,geoEqualEarth:()=>Vr,geoEqualEarthRaw:()=>qr,geoEquirectangular:()=>Mr,geoEquirectangularRaw:()=>Fr,geoGnomonic:()=>Yr,geoGnomonicRaw:()=>Kr,geoGraticule:()=>Jt,geoGraticule10:()=>Xt,geoIdentity:()=>Gr,geoInterpolate:()=>Zt,geoLength:()=>Lt,geoMercator:()=>zr,geoMercatorRaw:()=>Nr,geoNaturalEarth1:()=>Jr,geoNaturalEarth1Raw:()=>Qr,geoOrthographic:()=>Zr,geoOrthographicRaw:()=>Xr,geoPath:()=>nr,geoProjection:()=>gr,geoProjectionMutator:()=>xr,geoRotation:()=>it,geoStereographic:()=>eo,geoStereographicRaw:()=>$r,geoStream:()=>L,geoTransform:()=>rr,geoTransverseMercator:()=>no,geoTransverseMercatorRaw:()=>to});class r{constructor(){this._partials=new Float64Array(32),this._n=0}add(e){const t=this._partials;let n=0;for(let r=0;r<this._n&&r<32;r++){const o=t[r],i=e+o,a=Math.abs(e)<Math.abs(o)?e-(i-o):o-(i-e);a&&(t[n++]=a),e=i}return t[n]=e,this._n=n+1,this}valueOf(){const e=this._partials;let t,n,r,o=this._n,i=0;if(o>0){for(i=e[--o];o>0&&(t=i,n=e[--o],i=t+n,r=n-(i-t),!r););o>0&&(r<0&&e[o-1]<0||r>0&&e[o-1]>0)&&(n=2*r,t=i+n,n==t-i&&(i=t))}return i}}var o=1e-6,i=1e-12,a=Math.PI,s=a/2,l=a/4,c=2*a,u=180/a,d=a/180,f=Math.abs,p=Math.atan,h=Math.atan2,m=Math.cos,g=Math.ceil,x=Math.exp,v=(Math.floor,Math.hypot),y=Math.log,b=Math.pow,w=Math.sin,S=Math.sign||function(e){return e>0?1:e<0?-1:0},k=Math.sqrt,j=Math.tan;function E(e){return e>1?0:e<-1?a:Math.acos(e)}function C(e){return e>1?s:e<-1?-s:Math.asin(e)}function A(e){return(e=w(e/2))*e}function P(){}function N(e,t){e&&R.hasOwnProperty(e.type)&&R[e.type](e,t)}var z={Feature:function(e,t){N(e.geometry,t)},FeatureCollection:function(e,t){for(var n=e.features,r=-1,o=n.length;++r<o;)N(n[r].geometry,t)}},R={Sphere:function(e,t){t.sphere()},Point:function(e,t){e=e.coordinates,t.point(e[0],e[1],e[2])},MultiPoint:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)e=n[r],t.point(e[0],e[1],e[2])},LineString:function(e,t){O(e.coordinates,t,0)},MultiLineString:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)O(n[r],t,0)},Polygon:function(e,t){T(e.coordinates,t)},MultiPolygon:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)T(n[r],t)},GeometryCollection:function(e,t){for(var n=e.geometries,r=-1,o=n.length;++r<o;)N(n[r],t)}};function O(e,t,n){var r,o=-1,i=e.length-n;for(t.lineStart();++o<i;)r=e[o],t.point(r[0],r[1],r[2]);t.lineEnd()}function T(e,t){var n=-1,r=e.length;for(t.polygonStart();++n<r;)O(e[n],t,1);t.polygonEnd()}function L(e,t){e&&z.hasOwnProperty(e.type)?z[e.type](e,t):N(e,t)}var F,M,D,_,I,U,B,W,H,q,V,K,Y,G,Q,J,X=new r,Z=new r,$={point:P,lineStart:P,lineEnd:P,polygonStart:function(){X=new r,$.lineStart=ee,$.lineEnd=te},polygonEnd:function(){var e=+X;Z.add(e<0?c+e:e),this.lineStart=this.lineEnd=this.point=P},sphere:function(){Z.add(c)}};function ee(){$.point=ne}function te(){re(F,M)}function ne(e,t){$.point=re,F=e,M=t,D=e*=d,_=m(t=(t*=d)/2+l),I=w(t)}function re(e,t){var n=(e*=d)-D,r=n>=0?1:-1,o=r*n,i=m(t=(t*=d)/2+l),a=w(t),s=I*a,c=_*i+s*m(o),u=s*r*w(o);X.add(h(u,c)),D=e,_=i,I=a}function oe(e){return Z=new r,L(e,$),2*Z}function ie(e){return[h(e[1],e[0]),C(e[2])]}function ae(e){var t=e[0],n=e[1],r=m(n);return[r*m(t),r*w(t),w(n)]}function se(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function le(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function ce(e,t){e[0]+=t[0],e[1]+=t[1],e[2]+=t[2]}function ue(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function de(e){var t=k(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]/=t,e[1]/=t,e[2]/=t}var fe,pe,he,me,ge,xe,ve,ye,be,we,Se,ke,je,Ee,Ce,Ae,Pe={point:Ne,lineStart:Re,lineEnd:Oe,polygonStart:function(){Pe.point=Te,Pe.lineStart=Le,Pe.lineEnd=Fe,G=new r,$.polygonStart()},polygonEnd:function(){$.polygonEnd(),Pe.point=Ne,Pe.lineStart=Re,Pe.lineEnd=Oe,X<0?(U=-(W=180),B=-(H=90)):G>o?H=90:G<-o&&(B=-90),J[0]=U,J[1]=W},sphere:function(){U=-(W=180),B=-(H=90)}};function Ne(e,t){Q.push(J=[U=e,W=e]),t<B&&(B=t),t>H&&(H=t)}function ze(e,t){var n=ae([e*d,t*d]);if(Y){var r=le(Y,n),o=le([r[1],-r[0],0],r);de(o),o=ie(o);var i,a=e-q,s=a>0?1:-1,l=o[0]*u*s,c=f(a)>180;c^(s*q<l&&l<s*e)?(i=o[1]*u)>H&&(H=i):c^(s*q<(l=(l+360)%360-180)&&l<s*e)?(i=-o[1]*u)<B&&(B=i):(t<B&&(B=t),t>H&&(H=t)),c?e<q?Me(U,e)>Me(U,W)&&(W=e):Me(e,W)>Me(U,W)&&(U=e):W>=U?(e<U&&(U=e),e>W&&(W=e)):e>q?Me(U,e)>Me(U,W)&&(W=e):Me(e,W)>Me(U,W)&&(U=e)}else Q.push(J=[U=e,W=e]);t<B&&(B=t),t>H&&(H=t),Y=n,q=e}function Re(){Pe.point=ze}function Oe(){J[0]=U,J[1]=W,Pe.point=Ne,Y=null}function Te(e,t){if(Y){var n=e-q;G.add(f(n)>180?n+(n>0?360:-360):n)}else V=e,K=t;$.point(e,t),ze(e,t)}function Le(){$.lineStart()}function Fe(){Te(V,K),$.lineEnd(),f(G)>o&&(U=-(W=180)),J[0]=U,J[1]=W,Y=null}function Me(e,t){return(t-=e)<0?t+360:t}function De(e,t){return e[0]-t[0]}function _e(e,t){return e[0]<=e[1]?e[0]<=t&&t<=e[1]:t<e[0]||e[1]<t}function Ie(e){var t,n,r,o,i,a,s;if(H=W=-(U=B=1/0),Q=[],L(e,Pe),n=Q.length){for(Q.sort(De),t=1,i=[r=Q[0]];t<n;++t)_e(r,(o=Q[t])[0])||_e(r,o[1])?(Me(r[0],o[1])>Me(r[0],r[1])&&(r[1]=o[1]),Me(o[0],r[1])>Me(r[0],r[1])&&(r[0]=o[0])):i.push(r=o);for(a=-1/0,t=0,r=i[n=i.length-1];t<=n;r=o,++t)o=i[t],(s=Me(r[1],o[0]))>a&&(a=s,U=o[0],W=r[1])}return Q=J=null,U===1/0||B===1/0?[[NaN,NaN],[NaN,NaN]]:[[U,B],[W,H]]}var Ue={sphere:P,point:Be,lineStart:He,lineEnd:Ke,polygonStart:function(){Ue.lineStart=Ye,Ue.lineEnd=Ge},polygonEnd:function(){Ue.lineStart=He,Ue.lineEnd=Ke}};function Be(e,t){e*=d;var n=m(t*=d);We(n*m(e),n*w(e),w(t))}function We(e,t,n){++fe,he+=(e-he)/fe,me+=(t-me)/fe,ge+=(n-ge)/fe}function He(){Ue.point=qe}function qe(e,t){e*=d;var n=m(t*=d);Ee=n*m(e),Ce=n*w(e),Ae=w(t),Ue.point=Ve,We(Ee,Ce,Ae)}function Ve(e,t){e*=d;var n=m(t*=d),r=n*m(e),o=n*w(e),i=w(t),a=h(k((a=Ce*i-Ae*o)*a+(a=Ae*r-Ee*i)*a+(a=Ee*o-Ce*r)*a),Ee*r+Ce*o+Ae*i);pe+=a,xe+=a*(Ee+(Ee=r)),ve+=a*(Ce+(Ce=o)),ye+=a*(Ae+(Ae=i)),We(Ee,Ce,Ae)}function Ke(){Ue.point=Be}function Ye(){Ue.point=Qe}function Ge(){Je(ke,je),Ue.point=Be}function Qe(e,t){ke=e,je=t,e*=d,t*=d,Ue.point=Je;var n=m(t);Ee=n*m(e),Ce=n*w(e),Ae=w(t),We(Ee,Ce,Ae)}function Je(e,t){e*=d;var n=m(t*=d),r=n*m(e),o=n*w(e),i=w(t),a=Ce*i-Ae*o,s=Ae*r-Ee*i,l=Ee*o-Ce*r,c=v(a,s,l),u=C(c),f=c&&-u/c;be.add(f*a),we.add(f*s),Se.add(f*l),pe+=u,xe+=u*(Ee+(Ee=r)),ve+=u*(Ce+(Ce=o)),ye+=u*(Ae+(Ae=i)),We(Ee,Ce,Ae)}function Xe(e){fe=pe=he=me=ge=xe=ve=ye=0,be=new r,we=new r,Se=new r,L(e,Ue);var t=+be,n=+we,a=+Se,s=v(t,n,a);return s<i&&(t=xe,n=ve,a=ye,pe<o&&(t=he,n=me,a=ge),(s=v(t,n,a))<i)?[NaN,NaN]:[h(n,t)*u,C(a/s)*u]}function Ze(e){return function(){return e}}function $e(e,t){function n(n,r){return n=e(n,r),t(n[0],n[1])}return e.invert&&t.invert&&(n.invert=function(n,r){return(n=t.invert(n,r))&&e.invert(n[0],n[1])}),n}function et(e,t){return[f(e)>a?e+Math.round(-e/c)*c:e,t]}function tt(e,t,n){return(e%=c)?t||n?$e(rt(e),ot(t,n)):rt(e):t||n?ot(t,n):et}function nt(e){return function(t,n){return[(t+=e)>a?t-c:t<-a?t+c:t,n]}}function rt(e){var t=nt(e);return t.invert=nt(-e),t}function ot(e,t){var n=m(e),r=w(e),o=m(t),i=w(t);function a(e,t){var a=m(t),s=m(e)*a,l=w(e)*a,c=w(t),u=c*n+s*r;return[h(l*o-u*i,s*n-c*r),C(u*o+l*i)]}return a.invert=function(e,t){var a=m(t),s=m(e)*a,l=w(e)*a,c=w(t),u=c*o-l*i;return[h(l*o+c*i,s*n+u*r),C(u*n-s*r)]},a}function it(e){function t(t){return(t=e(t[0]*d,t[1]*d))[0]*=u,t[1]*=u,t}return e=tt(e[0]*d,e[1]*d,e.length>2?e[2]*d:0),t.invert=function(t){return(t=e.invert(t[0]*d,t[1]*d))[0]*=u,t[1]*=u,t},t}function at(e,t,n,r,o,i){if(n){var a=m(t),s=w(t),l=r*n;null==o?(o=t+r*c,i=t-l/2):(o=st(a,o),i=st(a,i),(r>0?o<i:o>i)&&(o+=r*c));for(var u,d=o;r>0?d>i:d<i;d-=l)u=ie([a,-s*m(d),-s*w(d)]),e.point(u[0],u[1])}}function st(e,t){(t=ae(t))[0]-=e,de(t);var n=E(-t[1]);return((-t[2]<0?-n:n)+c-o)%c}function lt(){var e,t,n=Ze([0,0]),r=Ze(90),o=Ze(6),i={point:function(n,r){e.push(n=t(n,r)),n[0]*=u,n[1]*=u}};function a(){var a=n.apply(this,arguments),s=r.apply(this,arguments)*d,l=o.apply(this,arguments)*d;return e=[],t=tt(-a[0]*d,-a[1]*d,0).invert,at(i,s,l,1),a={type:"Polygon",coordinates:[e]},e=t=null,a}return a.center=function(e){return arguments.length?(n="function"===typeof e?e:Ze([+e[0],+e[1]]),a):n},a.radius=function(e){return arguments.length?(r="function"===typeof e?e:Ze(+e),a):r},a.precision=function(e){return arguments.length?(o="function"===typeof e?e:Ze(+e),a):o},a}function ct(){var e,t=[];return{point:function(t,n,r){e.push([t,n,r])},lineStart:function(){t.push(e=[])},lineEnd:P,rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))},result:function(){var n=t;return t=[],e=null,n}}}function ut(e,t){return f(e[0]-t[0])<o&&f(e[1]-t[1])<o}function dt(e,t,n,r){this.x=e,this.z=t,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function ft(e,t,n,r,i){var a,s,l=[],c=[];if(e.forEach((function(e){if(!((t=e.length-1)<=0)){var t,n,r=e[0],s=e[t];if(ut(r,s)){if(!r[2]&&!s[2]){for(i.lineStart(),a=0;a<t;++a)i.point((r=e[a])[0],r[1]);return void i.lineEnd()}s[0]+=2*o}l.push(n=new dt(r,e,null,!0)),c.push(n.o=new dt(r,null,n,!1)),l.push(n=new dt(s,e,null,!1)),c.push(n.o=new dt(s,null,n,!0))}})),l.length){for(c.sort(t),pt(l),pt(c),a=0,s=c.length;a<s;++a)c[a].e=n=!n;for(var u,d,f=l[0];;){for(var p=f,h=!0;p.v;)if((p=p.n)===f)return;u=p.z,i.lineStart();do{if(p.v=p.o.v=!0,p.e){if(h)for(a=0,s=u.length;a<s;++a)i.point((d=u[a])[0],d[1]);else r(p.x,p.n.x,1,i);p=p.n}else{if(h)for(u=p.p.z,a=u.length-1;a>=0;--a)i.point((d=u[a])[0],d[1]);else r(p.x,p.p.x,-1,i);p=p.p}u=(p=p.o).z,h=!h}while(!p.v);i.lineEnd()}}}function pt(e){if(t=e.length){for(var t,n,r=0,o=e[0];++r<t;)o.n=n=e[r],n.p=o,o=n;o.n=n=e[0],n.p=o}}function ht(e){return f(e[0])<=a?e[0]:S(e[0])*((f(e[0])+a)%c-a)}function mt(e,t){var n=ht(t),u=t[1],d=w(u),f=[w(n),-m(n),0],p=0,g=0,x=new r;1===d?u=s+o:-1===d&&(u=-s-o);for(var v=0,y=e.length;v<y;++v)if(S=(b=e[v]).length)for(var b,S,k=b[S-1],j=ht(k),E=k[1]/2+l,A=w(E),P=m(E),N=0;N<S;++N,j=R,A=T,P=L,k=z){var z=b[N],R=ht(z),O=z[1]/2+l,T=w(O),L=m(O),F=R-j,M=F>=0?1:-1,D=M*F,_=D>a,I=A*T;if(x.add(h(I*M*w(D),P*L+I*m(D))),p+=_?F+M*c:F,_^j>=n^R>=n){var U=le(ae(k),ae(z));de(U);var B=le(f,U);de(B);var W=(_^F>=0?-1:1)*C(B[2]);(u>W||u===W&&(U[0]||U[1]))&&(g+=_^F>=0?1:-1)}}return(p<-o||p<o&&x<-i)^1&g}function gt(e){return Array.from(function*(e){for(const t of e)yield*t}(e))}function xt(e,t,n,r){return function(o){var i,a,s,l=t(o),c=ct(),u=t(c),d=!1,f={point:p,lineStart:m,lineEnd:g,polygonStart:function(){f.point=x,f.lineStart=v,f.lineEnd=y,a=[],i=[]},polygonEnd:function(){f.point=p,f.lineStart=m,f.lineEnd=g,a=gt(a);var e=mt(i,r);a.length?(d||(o.polygonStart(),d=!0),ft(a,yt,e,n,o)):e&&(d||(o.polygonStart(),d=!0),o.lineStart(),n(null,null,1,o),o.lineEnd()),d&&(o.polygonEnd(),d=!1),a=i=null},sphere:function(){o.polygonStart(),o.lineStart(),n(null,null,1,o),o.lineEnd(),o.polygonEnd()}};function p(t,n){e(t,n)&&o.point(t,n)}function h(e,t){l.point(e,t)}function m(){f.point=h,l.lineStart()}function g(){f.point=p,l.lineEnd()}function x(e,t){s.push([e,t]),u.point(e,t)}function v(){u.lineStart(),s=[]}function y(){x(s[0][0],s[0][1]),u.lineEnd();var e,t,n,r,l=u.clean(),f=c.result(),p=f.length;if(s.pop(),i.push(s),s=null,p)if(1&l){if((t=(n=f[0]).length-1)>0){for(d||(o.polygonStart(),d=!0),o.lineStart(),e=0;e<t;++e)o.point((r=n[e])[0],r[1]);o.lineEnd()}}else p>1&&2&l&&f.push(f.pop().concat(f.shift())),a.push(f.filter(vt))}return f}}function vt(e){return e.length>1}function yt(e,t){return((e=e.x)[0]<0?e[1]-s-o:s-e[1])-((t=t.x)[0]<0?t[1]-s-o:s-t[1])}et.invert=et;const bt=xt((function(){return!0}),(function(e){var t,n=NaN,r=NaN,i=NaN;return{lineStart:function(){e.lineStart(),t=1},point:function(l,c){var u=l>0?a:-a,d=f(l-n);f(d-a)<o?(e.point(n,r=(r+c)/2>0?s:-s),e.point(i,r),e.lineEnd(),e.lineStart(),e.point(u,r),e.point(l,r),t=0):i!==u&&d>=a&&(f(n-i)<o&&(n-=i*o),f(l-u)<o&&(l-=u*o),r=function(e,t,n,r){var i,a,s=w(e-n);return f(s)>o?p((w(t)*(a=m(r))*w(n)-w(r)*(i=m(t))*w(e))/(i*a*s)):(t+r)/2}(n,r,l,c),e.point(i,r),e.lineEnd(),e.lineStart(),e.point(u,r),t=0),e.point(n=l,r=c),i=u},lineEnd:function(){e.lineEnd(),n=r=NaN},clean:function(){return 2-t}}}),(function(e,t,n,r){var i;if(null==e)i=n*s,r.point(-a,i),r.point(0,i),r.point(a,i),r.point(a,0),r.point(a,-i),r.point(0,-i),r.point(-a,-i),r.point(-a,0),r.point(-a,i);else if(f(e[0]-t[0])>o){var l=e[0]<t[0]?a:-a;i=n*l/2,r.point(-l,i),r.point(0,i),r.point(l,i)}else r.point(t[0],t[1])}),[-a,-s]);function wt(e){var t=m(e),n=6*d,r=t>0,i=f(t)>o;function s(e,n){return m(e)*m(n)>t}function l(e,n,r){var i=[1,0,0],s=le(ae(e),ae(n)),l=se(s,s),c=s[0],u=l-c*c;if(!u)return!r&&e;var d=t*l/u,p=-t*c/u,h=le(i,s),m=ue(i,d);ce(m,ue(s,p));var g=h,x=se(m,g),v=se(g,g),y=x*x-v*(se(m,m)-1);if(!(y<0)){var b=k(y),w=ue(g,(-x-b)/v);if(ce(w,m),w=ie(w),!r)return w;var S,j=e[0],E=n[0],C=e[1],A=n[1];E<j&&(S=j,j=E,E=S);var P=E-j,N=f(P-a)<o;if(!N&&A<C&&(S=C,C=A,A=S),N||P<o?N?C+A>0^w[1]<(f(w[0]-j)<o?C:A):C<=w[1]&&w[1]<=A:P>a^(j<=w[0]&&w[0]<=E)){var z=ue(g,(-x+b)/v);return ce(z,m),[w,ie(z)]}}}function c(t,n){var o=r?e:a-e,i=0;return t<-o?i|=1:t>o&&(i|=2),n<-o?i|=4:n>o&&(i|=8),i}return xt(s,(function(e){var t,n,o,u,d;return{lineStart:function(){u=o=!1,d=1},point:function(f,p){var h,m=[f,p],g=s(f,p),x=r?g?0:c(f,p):g?c(f+(f<0?a:-a),p):0;if(!t&&(u=o=g)&&e.lineStart(),g!==o&&(!(h=l(t,m))||ut(t,h)||ut(m,h))&&(m[2]=1),g!==o)d=0,g?(e.lineStart(),h=l(m,t),e.point(h[0],h[1])):(h=l(t,m),e.point(h[0],h[1],2),e.lineEnd()),t=h;else if(i&&t&&r^g){var v;x&n||!(v=l(m,t,!0))||(d=0,r?(e.lineStart(),e.point(v[0][0],v[0][1]),e.point(v[1][0],v[1][1]),e.lineEnd()):(e.point(v[1][0],v[1][1]),e.lineEnd(),e.lineStart(),e.point(v[0][0],v[0][1],3)))}!g||t&&ut(t,m)||e.point(m[0],m[1]),t=m,o=g,n=x},lineEnd:function(){o&&e.lineEnd(),t=null},clean:function(){return d|(u&&o)<<1}}}),(function(t,r,o,i){at(i,e,n,o,t,r)}),r?[0,-e]:[-a,e-a])}var St,kt,jt,Et,Ct=1e9,At=-Ct;function Pt(e,t,n,r){function i(o,i){return e<=o&&o<=n&&t<=i&&i<=r}function a(o,i,a,l){var u=0,d=0;if(null==o||(u=s(o,a))!==(d=s(i,a))||c(o,i)<0^a>0)do{l.point(0===u||3===u?e:n,u>1?r:t)}while((u=(u+a+4)%4)!==d);else l.point(i[0],i[1])}function s(r,i){return f(r[0]-e)<o?i>0?0:3:f(r[0]-n)<o?i>0?2:1:f(r[1]-t)<o?i>0?1:0:i>0?3:2}function l(e,t){return c(e.x,t.x)}function c(e,t){var n=s(e,1),r=s(t,1);return n!==r?n-r:0===n?t[1]-e[1]:1===n?e[0]-t[0]:2===n?e[1]-t[1]:t[0]-e[0]}return function(o){var s,c,u,d,f,p,h,m,g,x,v,y=o,b=ct(),w={point:S,lineStart:function(){w.point=k,c&&c.push(u=[]);x=!0,g=!1,h=m=NaN},lineEnd:function(){s&&(k(d,f),p&&g&&b.rejoin(),s.push(b.result()));w.point=S,g&&y.lineEnd()},polygonStart:function(){y=b,s=[],c=[],v=!0},polygonEnd:function(){var t=function(){for(var t=0,n=0,o=c.length;n<o;++n)for(var i,a,s=c[n],l=1,u=s.length,d=s[0],f=d[0],p=d[1];l<u;++l)i=f,a=p,f=(d=s[l])[0],p=d[1],a<=r?p>r&&(f-i)*(r-a)>(p-a)*(e-i)&&++t:p<=r&&(f-i)*(r-a)<(p-a)*(e-i)&&--t;return t}(),n=v&&t,i=(s=gt(s)).length;(n||i)&&(o.polygonStart(),n&&(o.lineStart(),a(null,null,1,o),o.lineEnd()),i&&ft(s,l,t,a,o),o.polygonEnd());y=o,s=c=u=null}};function S(e,t){i(e,t)&&y.point(e,t)}function k(o,a){var s=i(o,a);if(c&&u.push([o,a]),x)d=o,f=a,p=s,x=!1,s&&(y.lineStart(),y.point(o,a));else if(s&&g)y.point(o,a);else{var l=[h=Math.max(At,Math.min(Ct,h)),m=Math.max(At,Math.min(Ct,m))],b=[o=Math.max(At,Math.min(Ct,o)),a=Math.max(At,Math.min(Ct,a))];!function(e,t,n,r,o,i){var a,s=e[0],l=e[1],c=0,u=1,d=t[0]-s,f=t[1]-l;if(a=n-s,d||!(a>0)){if(a/=d,d<0){if(a<c)return;a<u&&(u=a)}else if(d>0){if(a>u)return;a>c&&(c=a)}if(a=o-s,d||!(a<0)){if(a/=d,d<0){if(a>u)return;a>c&&(c=a)}else if(d>0){if(a<c)return;a<u&&(u=a)}if(a=r-l,f||!(a>0)){if(a/=f,f<0){if(a<c)return;a<u&&(u=a)}else if(f>0){if(a>u)return;a>c&&(c=a)}if(a=i-l,f||!(a<0)){if(a/=f,f<0){if(a>u)return;a>c&&(c=a)}else if(f>0){if(a<c)return;a<u&&(u=a)}return c>0&&(e[0]=s+c*d,e[1]=l+c*f),u<1&&(t[0]=s+u*d,t[1]=l+u*f),!0}}}}}(l,b,e,t,n,r)?s&&(y.lineStart(),y.point(o,a),v=!1):(g||(y.lineStart(),y.point(l[0],l[1])),y.point(b[0],b[1]),s||y.lineEnd(),v=!1)}h=o,m=a,g=s}return w}}function Nt(){var e,t,n,r=0,o=0,i=960,a=500;return n={stream:function(n){return e&&t===n?e:e=Pt(r,o,i,a)(t=n)},extent:function(s){return arguments.length?(r=+s[0][0],o=+s[0][1],i=+s[1][0],a=+s[1][1],e=t=null,n):[[r,o],[i,a]]}}}var zt={sphere:P,point:P,lineStart:function(){zt.point=Ot,zt.lineEnd=Rt},lineEnd:P,polygonStart:P,polygonEnd:P};function Rt(){zt.point=zt.lineEnd=P}function Ot(e,t){kt=e*=d,jt=w(t*=d),Et=m(t),zt.point=Tt}function Tt(e,t){e*=d;var n=w(t*=d),r=m(t),o=f(e-kt),i=m(o),a=r*w(o),s=Et*n-jt*r*i,l=jt*n+Et*r*i;St.add(h(k(a*a+s*s),l)),kt=e,jt=n,Et=r}function Lt(e){return St=new r,L(e,zt),+St}var Ft=[null,null],Mt={type:"LineString",coordinates:Ft};function Dt(e,t){return Ft[0]=e,Ft[1]=t,Lt(Mt)}var _t={Feature:function(e,t){return Ut(e.geometry,t)},FeatureCollection:function(e,t){for(var n=e.features,r=-1,o=n.length;++r<o;)if(Ut(n[r].geometry,t))return!0;return!1}},It={Sphere:function(){return!0},Point:function(e,t){return Bt(e.coordinates,t)},MultiPoint:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)if(Bt(n[r],t))return!0;return!1},LineString:function(e,t){return Wt(e.coordinates,t)},MultiLineString:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)if(Wt(n[r],t))return!0;return!1},Polygon:function(e,t){return Ht(e.coordinates,t)},MultiPolygon:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)if(Ht(n[r],t))return!0;return!1},GeometryCollection:function(e,t){for(var n=e.geometries,r=-1,o=n.length;++r<o;)if(Ut(n[r],t))return!0;return!1}};function Ut(e,t){return!(!e||!It.hasOwnProperty(e.type))&&It[e.type](e,t)}function Bt(e,t){return 0===Dt(e,t)}function Wt(e,t){for(var n,r,o,a=0,s=e.length;a<s;a++){if(0===(r=Dt(e[a],t)))return!0;if(a>0&&(o=Dt(e[a],e[a-1]))>0&&n<=o&&r<=o&&(n+r-o)*(1-Math.pow((n-r)/o,2))<i*o)return!0;n=r}return!1}function Ht(e,t){return!!mt(e.map(qt),Vt(t))}function qt(e){return(e=e.map(Vt)).pop(),e}function Vt(e){return[e[0]*d,e[1]*d]}function Kt(e,t){return(e&&_t.hasOwnProperty(e.type)?_t[e.type]:Ut)(e,t)}function Yt(e,t,n){e=+e,t=+t,n=(o=arguments.length)<2?(t=e,e=0,1):o<3?1:+n;for(var r=-1,o=0|Math.max(0,Math.ceil((t-e)/n)),i=new Array(o);++r<o;)i[r]=e+r*n;return i}function Gt(e,t,n){var r=Yt(e,t-o,n).concat(t);return function(e){return r.map((function(t){return[e,t]}))}}function Qt(e,t,n){var r=Yt(e,t-o,n).concat(t);return function(e){return r.map((function(t){return[t,e]}))}}function Jt(){var e,t,n,r,i,a,s,l,c,u,d,p,h=10,m=h,x=90,v=360,y=2.5;function b(){return{type:"MultiLineString",coordinates:w()}}function w(){return Yt(g(r/x)*x,n,x).map(d).concat(Yt(g(l/v)*v,s,v).map(p)).concat(Yt(g(t/h)*h,e,h).filter((function(e){return f(e%x)>o})).map(c)).concat(Yt(g(a/m)*m,i,m).filter((function(e){return f(e%v)>o})).map(u))}return b.lines=function(){return w().map((function(e){return{type:"LineString",coordinates:e}}))},b.outline=function(){return{type:"Polygon",coordinates:[d(r).concat(p(s).slice(1),d(n).reverse().slice(1),p(l).reverse().slice(1))]}},b.extent=function(e){return arguments.length?b.extentMajor(e).extentMinor(e):b.extentMinor()},b.extentMajor=function(e){return arguments.length?(r=+e[0][0],n=+e[1][0],l=+e[0][1],s=+e[1][1],r>n&&(e=r,r=n,n=e),l>s&&(e=l,l=s,s=e),b.precision(y)):[[r,l],[n,s]]},b.extentMinor=function(n){return arguments.length?(t=+n[0][0],e=+n[1][0],a=+n[0][1],i=+n[1][1],t>e&&(n=t,t=e,e=n),a>i&&(n=a,a=i,i=n),b.precision(y)):[[t,a],[e,i]]},b.step=function(e){return arguments.length?b.stepMajor(e).stepMinor(e):b.stepMinor()},b.stepMajor=function(e){return arguments.length?(x=+e[0],v=+e[1],b):[x,v]},b.stepMinor=function(e){return arguments.length?(h=+e[0],m=+e[1],b):[h,m]},b.precision=function(o){return arguments.length?(y=+o,c=Gt(a,i,90),u=Qt(t,e,y),d=Gt(l,s,90),p=Qt(r,n,y),b):y},b.extentMajor([[-180,-90+o],[180,90-o]]).extentMinor([[-180,-80-o],[180,80+o]])}function Xt(){return Jt()()}function Zt(e,t){var n=e[0]*d,r=e[1]*d,o=t[0]*d,i=t[1]*d,a=m(r),s=w(r),l=m(i),c=w(i),f=a*m(n),p=a*w(n),g=l*m(o),x=l*w(o),v=2*C(k(A(i-r)+a*l*A(o-n))),y=w(v),b=v?function(e){var t=w(e*=v)/y,n=w(v-e)/y,r=n*f+t*g,o=n*p+t*x,i=n*s+t*c;return[h(o,r)*u,h(i,k(r*r+o*o))*u]}:function(){return[n*u,r*u]};return b.distance=v,b}const $t=e=>e;var en,tn,nn,rn,on=new r,an=new r,sn={point:P,lineStart:P,lineEnd:P,polygonStart:function(){sn.lineStart=ln,sn.lineEnd=dn},polygonEnd:function(){sn.lineStart=sn.lineEnd=sn.point=P,on.add(f(an)),an=new r},result:function(){var e=on/2;return on=new r,e}};function ln(){sn.point=cn}function cn(e,t){sn.point=un,en=nn=e,tn=rn=t}function un(e,t){an.add(rn*e-nn*t),nn=e,rn=t}function dn(){un(en,tn)}const fn=sn;var pn=1/0,hn=pn,mn=-pn,gn=mn,xn={point:function(e,t){e<pn&&(pn=e);e>mn&&(mn=e);t<hn&&(hn=t);t>gn&&(gn=t)},lineStart:P,lineEnd:P,polygonStart:P,polygonEnd:P,result:function(){var e=[[pn,hn],[mn,gn]];return mn=gn=-(hn=pn=1/0),e}};const vn=xn;var yn,bn,wn,Sn,kn=0,jn=0,En=0,Cn=0,An=0,Pn=0,Nn=0,zn=0,Rn=0,On={point:Tn,lineStart:Ln,lineEnd:Dn,polygonStart:function(){On.lineStart=_n,On.lineEnd=In},polygonEnd:function(){On.point=Tn,On.lineStart=Ln,On.lineEnd=Dn},result:function(){var e=Rn?[Nn/Rn,zn/Rn]:Pn?[Cn/Pn,An/Pn]:En?[kn/En,jn/En]:[NaN,NaN];return kn=jn=En=Cn=An=Pn=Nn=zn=Rn=0,e}};function Tn(e,t){kn+=e,jn+=t,++En}function Ln(){On.point=Fn}function Fn(e,t){On.point=Mn,Tn(wn=e,Sn=t)}function Mn(e,t){var n=e-wn,r=t-Sn,o=k(n*n+r*r);Cn+=o*(wn+e)/2,An+=o*(Sn+t)/2,Pn+=o,Tn(wn=e,Sn=t)}function Dn(){On.point=Tn}function _n(){On.point=Un}function In(){Bn(yn,bn)}function Un(e,t){On.point=Bn,Tn(yn=wn=e,bn=Sn=t)}function Bn(e,t){var n=e-wn,r=t-Sn,o=k(n*n+r*r);Cn+=o*(wn+e)/2,An+=o*(Sn+t)/2,Pn+=o,Nn+=(o=Sn*e-wn*t)*(wn+e),zn+=o*(Sn+t),Rn+=3*o,Tn(wn=e,Sn=t)}const Wn=On;function Hn(e){this._context=e}Hn.prototype={_radius:4.5,pointRadius:function(e){return this._radius=e,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(e,t){switch(this._point){case 0:this._context.moveTo(e,t),this._point=1;break;case 1:this._context.lineTo(e,t);break;default:this._context.moveTo(e+this._radius,t),this._context.arc(e,t,this._radius,0,c)}},result:P};var qn,Vn,Kn,Yn,Gn,Qn=new r,Jn={point:P,lineStart:function(){Jn.point=Xn},lineEnd:function(){qn&&Zn(Vn,Kn),Jn.point=P},polygonStart:function(){qn=!0},polygonEnd:function(){qn=null},result:function(){var e=+Qn;return Qn=new r,e}};function Xn(e,t){Jn.point=Zn,Vn=Yn=e,Kn=Gn=t}function Zn(e,t){Yn-=e,Gn-=t,Qn.add(k(Yn*Yn+Gn*Gn)),Yn=e,Gn=t}const $n=Jn;function er(){this._string=[]}function tr(e){return"m0,"+e+"a"+e+","+e+" 0 1,1 0,"+-2*e+"a"+e+","+e+" 0 1,1 0,"+2*e+"z"}function nr(e,t){var n,r,o=4.5;function i(e){return e&&("function"===typeof o&&r.pointRadius(+o.apply(this,arguments)),L(e,n(r))),r.result()}return i.area=function(e){return L(e,n(fn)),fn.result()},i.measure=function(e){return L(e,n($n)),$n.result()},i.bounds=function(e){return L(e,n(vn)),vn.result()},i.centroid=function(e){return L(e,n(Wn)),Wn.result()},i.projection=function(t){return arguments.length?(n=null==t?(e=null,$t):(e=t).stream,i):e},i.context=function(e){return arguments.length?(r=null==e?(t=null,new er):new Hn(t=e),"function"!==typeof o&&r.pointRadius(o),i):t},i.pointRadius=function(e){return arguments.length?(o="function"===typeof e?e:(r.pointRadius(+e),+e),i):o},i.projection(e).context(t)}function rr(e){return{stream:or(e)}}function or(e){return function(t){var n=new ir;for(var r in e)n[r]=e[r];return n.stream=t,n}}function ir(){}function ar(e,t,n){var r=e.clipExtent&&e.clipExtent();return e.scale(150).translate([0,0]),null!=r&&e.clipExtent(null),L(n,e.stream(vn)),t(vn.result()),null!=r&&e.clipExtent(r),e}function sr(e,t,n){return ar(e,(function(n){var r=t[1][0]-t[0][0],o=t[1][1]-t[0][1],i=Math.min(r/(n[1][0]-n[0][0]),o/(n[1][1]-n[0][1])),a=+t[0][0]+(r-i*(n[1][0]+n[0][0]))/2,s=+t[0][1]+(o-i*(n[1][1]+n[0][1]))/2;e.scale(150*i).translate([a,s])}),n)}function lr(e,t,n){return sr(e,[[0,0],t],n)}function cr(e,t,n){return ar(e,(function(n){var r=+t,o=r/(n[1][0]-n[0][0]),i=(r-o*(n[1][0]+n[0][0]))/2,a=-o*n[0][1];e.scale(150*o).translate([i,a])}),n)}function ur(e,t,n){return ar(e,(function(n){var r=+t,o=r/(n[1][1]-n[0][1]),i=-o*n[0][0],a=(r-o*(n[1][1]+n[0][1]))/2;e.scale(150*o).translate([i,a])}),n)}er.prototype={_radius:4.5,_circle:tr(4.5),pointRadius:function(e){return(e=+e)!==this._radius&&(this._radius=e,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(e,t){switch(this._point){case 0:this._string.push("M",e,",",t),this._point=1;break;case 1:this._string.push("L",e,",",t);break;default:null==this._circle&&(this._circle=tr(this._radius)),this._string.push("M",e,",",t,this._circle)}},result:function(){if(this._string.length){var e=this._string.join("");return this._string=[],e}return null}},ir.prototype={constructor:ir,point:function(e,t){this.stream.point(e,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var dr=16,fr=m(30*d);function pr(e,t){return+t?function(e,t){function n(r,i,a,s,l,c,u,d,p,m,g,x,v,y){var b=u-r,w=d-i,S=b*b+w*w;if(S>4*t&&v--){var j=s+m,E=l+g,A=c+x,P=k(j*j+E*E+A*A),N=C(A/=P),z=f(f(A)-1)<o||f(a-p)<o?(a+p)/2:h(E,j),R=e(z,N),O=R[0],T=R[1],L=O-r,F=T-i,M=w*L-b*F;(M*M/S>t||f((b*L+w*F)/S-.5)>.3||s*m+l*g+c*x<fr)&&(n(r,i,a,s,l,c,O,T,z,j/=P,E/=P,A,v,y),y.point(O,T),n(O,T,z,j,E,A,u,d,p,m,g,x,v,y))}}return function(t){var r,o,i,a,s,l,c,u,d,f,p,h,m={point:g,lineStart:x,lineEnd:y,polygonStart:function(){t.polygonStart(),m.lineStart=b},polygonEnd:function(){t.polygonEnd(),m.lineStart=x}};function g(n,r){n=e(n,r),t.point(n[0],n[1])}function x(){u=NaN,m.point=v,t.lineStart()}function v(r,o){var i=ae([r,o]),a=e(r,o);n(u,d,c,f,p,h,u=a[0],d=a[1],c=r,f=i[0],p=i[1],h=i[2],dr,t),t.point(u,d)}function y(){m.point=g,t.lineEnd()}function b(){x(),m.point=w,m.lineEnd=S}function w(e,t){v(r=e,t),o=u,i=d,a=f,s=p,l=h,m.point=v}function S(){n(u,d,c,f,p,h,o,i,r,a,s,l,dr,t),m.lineEnd=y,y()}return m}}(e,t):function(e){return or({point:function(t,n){t=e(t,n),this.stream.point(t[0],t[1])}})}(e)}var hr=or({point:function(e,t){this.stream.point(e*d,t*d)}});function mr(e,t,n,r,o,i){if(!i)return function(e,t,n,r,o){function i(i,a){return[t+e*(i*=r),n-e*(a*=o)]}return i.invert=function(i,a){return[(i-t)/e*r,(n-a)/e*o]},i}(e,t,n,r,o);var a=m(i),s=w(i),l=a*e,c=s*e,u=a/e,d=s/e,f=(s*n-a*t)/e,p=(s*t+a*n)/e;function h(e,i){return[l*(e*=r)-c*(i*=o)+t,n-c*e-l*i]}return h.invert=function(e,t){return[r*(u*e-d*t+f),o*(p-d*e-u*t)]},h}function gr(e){return xr((function(){return e}))()}function xr(e){var t,n,r,o,i,a,s,l,c,f,p=150,h=480,m=250,g=0,x=0,v=0,y=0,b=0,w=0,S=1,j=1,E=null,C=bt,A=null,P=$t,N=.5;function z(e){return l(e[0]*d,e[1]*d)}function R(e){return(e=l.invert(e[0],e[1]))&&[e[0]*u,e[1]*u]}function O(){var e=mr(p,0,0,S,j,w).apply(null,t(g,x)),r=mr(p,h-e[0],m-e[1],S,j,w);return n=tt(v,y,b),s=$e(t,r),l=$e(n,s),a=pr(s,N),T()}function T(){return c=f=null,z}return z.stream=function(e){return c&&f===e?c:c=hr(function(e){return or({point:function(t,n){var r=e(t,n);return this.stream.point(r[0],r[1])}})}(n)(C(a(P(f=e)))))},z.preclip=function(e){return arguments.length?(C=e,E=void 0,T()):C},z.postclip=function(e){return arguments.length?(P=e,A=r=o=i=null,T()):P},z.clipAngle=function(e){return arguments.length?(C=+e?wt(E=e*d):(E=null,bt),T()):E*u},z.clipExtent=function(e){return arguments.length?(P=null==e?(A=r=o=i=null,$t):Pt(A=+e[0][0],r=+e[0][1],o=+e[1][0],i=+e[1][1]),T()):null==A?null:[[A,r],[o,i]]},z.scale=function(e){return arguments.length?(p=+e,O()):p},z.translate=function(e){return arguments.length?(h=+e[0],m=+e[1],O()):[h,m]},z.center=function(e){return arguments.length?(g=e[0]%360*d,x=e[1]%360*d,O()):[g*u,x*u]},z.rotate=function(e){return arguments.length?(v=e[0]%360*d,y=e[1]%360*d,b=e.length>2?e[2]%360*d:0,O()):[v*u,y*u,b*u]},z.angle=function(e){return arguments.length?(w=e%360*d,O()):w*u},z.reflectX=function(e){return arguments.length?(S=e?-1:1,O()):S<0},z.reflectY=function(e){return arguments.length?(j=e?-1:1,O()):j<0},z.precision=function(e){return arguments.length?(a=pr(s,N=e*e),T()):k(N)},z.fitExtent=function(e,t){return sr(z,e,t)},z.fitSize=function(e,t){return lr(z,e,t)},z.fitWidth=function(e,t){return cr(z,e,t)},z.fitHeight=function(e,t){return ur(z,e,t)},function(){return t=e.apply(this,arguments),z.invert=t.invert&&R,O()}}function vr(e){var t=0,n=a/3,r=xr(e),o=r(t,n);return o.parallels=function(e){return arguments.length?r(t=e[0]*d,n=e[1]*d):[t*u,n*u]},o}function yr(e,t){var n=w(e),r=(n+w(t))/2;if(f(r)<o)return function(e){var t=m(e);function n(e,n){return[e*t,w(n)/t]}return n.invert=function(e,n){return[e/t,C(n*t)]},n}(e);var i=1+n*(2*r-n),s=k(i)/r;function l(e,t){var n=k(i-2*r*w(t))/r;return[n*w(e*=r),s-n*m(e)]}return l.invert=function(e,t){var n=s-t,o=h(e,f(n))*S(n);return n*r<0&&(o-=a*S(e)*S(n)),[o/r,C((i-(e*e+n*n)*r*r)/(2*r))]},l}function br(){return vr(yr).scale(155.424).center([0,33.6442])}function wr(){return br().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function Sr(){var e,t,n,r,i,a,s=wr(),l=br().rotate([154,0]).center([-2,58.5]).parallels([55,65]),c=br().rotate([157,0]).center([-3,19.9]).parallels([8,18]),u={point:function(e,t){a=[e,t]}};function d(e){var t=e[0],o=e[1];return a=null,n.point(t,o),a||(r.point(t,o),a)||(i.point(t,o),a)}function f(){return e=t=null,d}return d.invert=function(e){var t=s.scale(),n=s.translate(),r=(e[0]-n[0])/t,o=(e[1]-n[1])/t;return(o>=.12&&o<.234&&r>=-.425&&r<-.214?l:o>=.166&&o<.234&&r>=-.214&&r<-.115?c:s).invert(e)},d.stream=function(n){return e&&t===n?e:e=function(e){var t=e.length;return{point:function(n,r){for(var o=-1;++o<t;)e[o].point(n,r)},sphere:function(){for(var n=-1;++n<t;)e[n].sphere()},lineStart:function(){for(var n=-1;++n<t;)e[n].lineStart()},lineEnd:function(){for(var n=-1;++n<t;)e[n].lineEnd()},polygonStart:function(){for(var n=-1;++n<t;)e[n].polygonStart()},polygonEnd:function(){for(var n=-1;++n<t;)e[n].polygonEnd()}}}([s.stream(t=n),l.stream(n),c.stream(n)])},d.precision=function(e){return arguments.length?(s.precision(e),l.precision(e),c.precision(e),f()):s.precision()},d.scale=function(e){return arguments.length?(s.scale(e),l.scale(.35*e),c.scale(e),d.translate(s.translate())):s.scale()},d.translate=function(e){if(!arguments.length)return s.translate();var t=s.scale(),a=+e[0],d=+e[1];return n=s.translate(e).clipExtent([[a-.455*t,d-.238*t],[a+.455*t,d+.238*t]]).stream(u),r=l.translate([a-.307*t,d+.201*t]).clipExtent([[a-.425*t+o,d+.12*t+o],[a-.214*t-o,d+.234*t-o]]).stream(u),i=c.translate([a-.205*t,d+.212*t]).clipExtent([[a-.214*t+o,d+.166*t+o],[a-.115*t-o,d+.234*t-o]]).stream(u),f()},d.fitExtent=function(e,t){return sr(d,e,t)},d.fitSize=function(e,t){return lr(d,e,t)},d.fitWidth=function(e,t){return cr(d,e,t)},d.fitHeight=function(e,t){return ur(d,e,t)},d.scale(1070)}function kr(e){return function(t,n){var r=m(t),o=m(n),i=e(r*o);return i===1/0?[2,0]:[i*o*w(t),i*w(n)]}}function jr(e){return function(t,n){var r=k(t*t+n*n),o=e(r),i=w(o),a=m(o);return[h(t*i,r*a),C(r&&n*i/r)]}}var Er=kr((function(e){return k(2/(1+e))}));function Cr(){return gr(Er).scale(124.75).clipAngle(179.999)}Er.invert=jr((function(e){return 2*C(e/2)}));var Ar=kr((function(e){return(e=E(e))&&e/w(e)}));function Pr(){return gr(Ar).scale(79.4188).clipAngle(179.999)}function Nr(e,t){return[e,y(j((s+t)/2))]}function zr(){return Rr(Nr).scale(961/c)}function Rr(e){var t,n,r,o=gr(e),i=o.center,s=o.scale,l=o.translate,c=o.clipExtent,u=null;function d(){var i=a*s(),l=o(it(o.rotate()).invert([0,0]));return c(null==u?[[l[0]-i,l[1]-i],[l[0]+i,l[1]+i]]:e===Nr?[[Math.max(l[0]-i,u),t],[Math.min(l[0]+i,n),r]]:[[u,Math.max(l[1]-i,t)],[n,Math.min(l[1]+i,r)]])}return o.scale=function(e){return arguments.length?(s(e),d()):s()},o.translate=function(e){return arguments.length?(l(e),d()):l()},o.center=function(e){return arguments.length?(i(e),d()):i()},o.clipExtent=function(e){return arguments.length?(null==e?u=t=n=r=null:(u=+e[0][0],t=+e[0][1],n=+e[1][0],r=+e[1][1]),d()):null==u?null:[[u,t],[n,r]]},d()}function Or(e){return j((s+e)/2)}function Tr(e,t){var n=m(e),r=e===t?w(e):y(n/m(t))/y(Or(t)/Or(e)),i=n*b(Or(e),r)/r;if(!r)return Nr;function l(e,t){i>0?t<-s+o&&(t=-s+o):t>s-o&&(t=s-o);var n=i/b(Or(t),r);return[n*w(r*e),i-n*m(r*e)]}return l.invert=function(e,t){var n=i-t,o=S(r)*k(e*e+n*n),l=h(e,f(n))*S(n);return n*r<0&&(l-=a*S(e)*S(n)),[l/r,2*p(b(i/o,1/r))-s]},l}function Lr(){return vr(Tr).scale(109.5).parallels([30,30])}function Fr(e,t){return[e,t]}function Mr(){return gr(Fr).scale(152.63)}function Dr(e,t){var n=m(e),r=e===t?w(e):(n-m(t))/(t-e),i=n/r+e;if(f(r)<o)return Fr;function s(e,t){var n=i-t,o=r*e;return[n*w(o),i-n*m(o)]}return s.invert=function(e,t){var n=i-t,o=h(e,f(n))*S(n);return n*r<0&&(o-=a*S(e)*S(n)),[o/r,i-S(r)*k(e*e+n*n)]},s}function _r(){return vr(Dr).scale(131.154).center([0,13.9389])}Ar.invert=jr((function(e){return e})),Nr.invert=function(e,t){return[e,2*p(x(t))-s]},Fr.invert=Fr;var Ir=1.340264,Ur=-.081106,Br=893e-6,Wr=.003796,Hr=k(3)/2;function qr(e,t){var n=C(Hr*w(t)),r=n*n,o=r*r*r;return[e*m(n)/(Hr*(Ir+3*Ur*r+o*(7*Br+9*Wr*r))),n*(Ir+Ur*r+o*(Br+Wr*r))]}function Vr(){return gr(qr).scale(177.158)}function Kr(e,t){var n=m(t),r=m(e)*n;return[n*w(e)/r,w(t)/r]}function Yr(){return gr(Kr).scale(144.049).clipAngle(60)}function Gr(){var e,t,n,r,o,i,a,s=1,l=0,c=0,f=1,p=1,h=0,g=null,x=1,v=1,y=or({point:function(e,t){var n=k([e,t]);this.stream.point(n[0],n[1])}}),b=$t;function S(){return x=s*f,v=s*p,i=a=null,k}function k(n){var r=n[0]*x,o=n[1]*v;if(h){var i=o*e-r*t;r=r*e+o*t,o=i}return[r+l,o+c]}return k.invert=function(n){var r=n[0]-l,o=n[1]-c;if(h){var i=o*e+r*t;r=r*e-o*t,o=i}return[r/x,o/v]},k.stream=function(e){return i&&a===e?i:i=y(b(a=e))},k.postclip=function(e){return arguments.length?(b=e,g=n=r=o=null,S()):b},k.clipExtent=function(e){return arguments.length?(b=null==e?(g=n=r=o=null,$t):Pt(g=+e[0][0],n=+e[0][1],r=+e[1][0],o=+e[1][1]),S()):null==g?null:[[g,n],[r,o]]},k.scale=function(e){return arguments.length?(s=+e,S()):s},k.translate=function(e){return arguments.length?(l=+e[0],c=+e[1],S()):[l,c]},k.angle=function(n){return arguments.length?(t=w(h=n%360*d),e=m(h),S()):h*u},k.reflectX=function(e){return arguments.length?(f=e?-1:1,S()):f<0},k.reflectY=function(e){return arguments.length?(p=e?-1:1,S()):p<0},k.fitExtent=function(e,t){return sr(k,e,t)},k.fitSize=function(e,t){return lr(k,e,t)},k.fitWidth=function(e,t){return cr(k,e,t)},k.fitHeight=function(e,t){return ur(k,e,t)},k}function Qr(e,t){var n=t*t,r=n*n;return[e*(.8707-.131979*n+r*(r*(.003971*n-.001529*r)-.013791)),t*(1.007226+n*(.015085+r*(.028874*n-.044475-.005916*r)))]}function Jr(){return gr(Qr).scale(175.295)}function Xr(e,t){return[m(t)*w(e),w(t)]}function Zr(){return gr(Xr).scale(249.5).clipAngle(90+o)}function $r(e,t){var n=m(t),r=1+m(e)*n;return[n*w(e)/r,w(t)/r]}function eo(){return gr($r).scale(250).clipAngle(142)}function to(e,t){return[y(j((s+t)/2)),-e]}function no(){var e=Rr(to),t=e.center,n=e.rotate;return e.center=function(e){return arguments.length?t([-e[1],e[0]]):[(e=t())[1],-e[0]]},e.rotate=function(e){return arguments.length?n([e[0],e[1],e.length>2?e[2]+90:90]):[(e=n())[0],e[1],e[2]-90]},n([0,0,90]).scale(159.155)}qr.invert=function(e,t){for(var n,r=t,o=r*r,a=o*o*o,s=0;s<12&&(a=(o=(r-=n=(r*(Ir+Ur*o+a*(Br+Wr*o))-t)/(Ir+3*Ur*o+a*(7*Br+9*Wr*o)))*r)*o*o,!(f(n)<i));++s);return[Hr*e*(Ir+3*Ur*o+a*(7*Br+9*Wr*o))/m(r),C(w(r)/Hr)]},Kr.invert=jr(p),Qr.invert=function(e,t){var n,r=t,i=25;do{var a=r*r,s=a*a;r-=n=(r*(1.007226+a*(.015085+s*(.028874*a-.044475-.005916*s)))-t)/(1.007226+a*(.045255+s*(.259866*a-.311325-.005916*11*s)))}while(f(n)>o&&--i>0);return[e/(.8707+(a=r*r)*(a*(a*a*a*(.003971-.001529*a)-.013791)-.131979)),r]},Xr.invert=jr(C),$r.invert=jr((function(e){return 2*p(e)})),to.invert=function(e,t){return[-t,2*p(x(e))-s]}},579:(e,t,n)=>{"use strict";e.exports=n(1153)},1153:(e,t,n)=>{"use strict";var r=n(5043),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,i={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,r)&&!l.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:o,type:e,key:c,ref:u,props:i,_owner:s.current}}t.Fragment=i,t.jsx=c,t.jsxs=c},1359:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(6084),o=n(2859);function i(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===o.g&&t.documentElement.namespaceURI===o.g?t.createElement(e):t.createElementNS(n,e)}}function a(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function s(e){var t=(0,r.A)(e);return(t.local?a:i)(t)}},1382:(e,t,n)=>{"use strict";function r(e){return"object"===typeof e&&"length"in e?e:Array.from(e)}n.d(t,{A:()=>r})},1443:(e,t,n)=>{"use strict";n.d(t,{A:()=>s,j:()=>l});var r=n(8683);function o(e){return function(){this.style.removeProperty(e)}}function i(e,t,n){return function(){this.style.setProperty(e,t,n)}}function a(e,t,n){return function(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function s(e,t,n){return arguments.length>1?this.each((null==t?o:"function"===typeof t?a:i)(e,t,null==n?"":n)):l(this.node(),e)}function l(e,t){return e.style.getPropertyValue(t)||(0,r.A)(e).getComputedStyle(e,null).getPropertyValue(t)}},1497:(e,t,n)=>{"use strict";var r=n(3218);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},2730:(e,t,n)=>{"use strict";var r=n(5043),o=n(8853);function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,s={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)a.add(t[e])}var u=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),d=Object.prototype.hasOwnProperty,f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},h={};function m(e,t,n,r,o,i,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var g={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){g[e]=new m(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];g[t]=new m(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){g[e]=new m(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){g[e]=new m(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){g[e]=new m(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){g[e]=new m(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){g[e]=new m(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){g[e]=new m(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){g[e]=new m(e,5,!1,e.toLowerCase(),null,!1,!1)}));var x=/[\-:]([a-z])/g;function v(e){return e[1].toUpperCase()}function y(e,t,n,r){var o=g.hasOwnProperty(t)?g[t]:null;(null!==o?0!==o.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,o,r)&&(n=null),r||null===o?function(e){return!!d.call(h,e)||!d.call(p,e)&&(f.test(e)?h[e]=!0:(p[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=null===n?3!==o.type&&"":n:(t=o.attributeName,r=o.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(o=o.type)||4===o&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(x,v);g[t]=new m(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(x,v);g[t]=new m(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(x,v);g[t]=new m(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!1,!1)})),g.xlinkHref=new m("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!0,!0)}));var b=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),S=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),A=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),z=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),O=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var T=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var L=Symbol.iterator;function F(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=L&&e[L]||e["@@iterator"])?e:null}var M,D=Object.assign;function _(e){if(void 0===M)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);M=t&&t[1]||""}return"\n"+M+e}var I=!1;function U(e,t){if(!e||I)return"";I=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var o=c.stack.split("\n"),i=r.stack.split("\n"),a=o.length-1,s=i.length-1;1<=a&&0<=s&&o[a]!==i[s];)s--;for(;1<=a&&0<=s;a--,s--)if(o[a]!==i[s]){if(1!==a||1!==s)do{if(a--,0>--s||o[a]!==i[s]){var l="\n"+o[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=a&&0<=s);break}}}finally{I=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?_(e):""}function B(e){switch(e.tag){case 5:return _(e.type);case 16:return _("Lazy");case 13:return _("Suspense");case 19:return _("SuspenseList");case 0:case 2:case 15:return e=U(e.type,!1);case 11:return e=U(e.type.render,!1);case 1:return e=U(e.type,!0);default:return""}}function W(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case k:return"Fragment";case S:return"Portal";case E:return"Profiler";case j:return"StrictMode";case N:return"Suspense";case z:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case A:return(e.displayName||"Context")+".Consumer";case C:return(e._context.displayName||"Context")+".Provider";case P:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case R:return null!==(t=e.displayName||null)?t:W(e.type)||"Memo";case O:t=e._payload,e=e._init;try{return W(e(t))}catch(n){}}return null}function H(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return W(t);case 8:return t===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function q(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function V(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function K(e){e._valueTracker||(e._valueTracker=function(e){var t=V(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function Y(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=V(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function G(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Q(e,t){var n=t.checked;return D({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function J(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=q(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function X(e,t){null!=(t=t.checked)&&y(e,"checked",t,!1)}function Z(e,t){X(e,t);var n=q(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,q(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function $(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&G(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+q(n),t=null,o=0;o<e.length;o++){if(e[o].value===n)return e[o].selected=!0,void(r&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(i(91));return D({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function oe(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(i(92));if(te(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:q(n)}}function ie(e,t){var n=q(t.value),r=q(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ae(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function se(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?se(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,ue,de=(ue=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return ue(e,t)}))}:ue);function fe(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var pe={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},he=["Webkit","ms","Moz","O"];function me(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||pe.hasOwnProperty(e)&&pe[e]?(""+t).trim():t+"px"}function ge(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),o=me(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}Object.keys(pe).forEach((function(e){he.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),pe[t]=pe[e]}))}));var xe=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ve(e,t){if(t){if(xe[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(i(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(i(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(i(62))}}function ye(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var be=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Se=null,ke=null,je=null;function Ee(e){if(e=bo(e)){if("function"!==typeof Se)throw Error(i(280));var t=e.stateNode;t&&(t=So(t),Se(e.stateNode,e.type,t))}}function Ce(e){ke?je?je.push(e):je=[e]:ke=e}function Ae(){if(ke){var e=ke,t=je;if(je=ke=null,Ee(e),t)for(e=0;e<t.length;e++)Ee(t[e])}}function Pe(e,t){return e(t)}function Ne(){}var ze=!1;function Re(e,t,n){if(ze)return e(t,n);ze=!0;try{return Pe(e,t,n)}finally{ze=!1,(null!==ke||null!==je)&&(Ne(),Ae())}}function Oe(e,t){var n=e.stateNode;if(null===n)return null;var r=So(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(i(231,t,typeof n));return n}var Te=!1;if(u)try{var Le={};Object.defineProperty(Le,"passive",{get:function(){Te=!0}}),window.addEventListener("test",Le,Le),window.removeEventListener("test",Le,Le)}catch(ue){Te=!1}function Fe(e,t,n,r,o,i,a,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var Me=!1,De=null,_e=!1,Ie=null,Ue={onError:function(e){Me=!0,De=e}};function Be(e,t,n,r,o,i,a,s,l){Me=!1,De=null,Fe.apply(Ue,arguments)}function We(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function He(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function qe(e){if(We(e)!==e)throw Error(i(188))}function Ve(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=We(e)))throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(null===o)break;var a=o.alternate;if(null===a){if(null!==(r=o.return)){n=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===n)return qe(o),e;if(a===r)return qe(o),t;a=a.sibling}throw Error(i(188))}if(n.return!==r.return)n=o,r=a;else{for(var s=!1,l=o.child;l;){if(l===n){s=!0,n=o,r=a;break}if(l===r){s=!0,r=o,n=a;break}l=l.sibling}if(!s){for(l=a.child;l;){if(l===n){s=!0,n=a,r=o;break}if(l===r){s=!0,r=a,n=o;break}l=l.sibling}if(!s)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(3!==n.tag)throw Error(i(188));return n.stateNode.current===n?e:t}(e))?Ke(e):null}function Ke(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=Ke(e);if(null!==t)return t;e=e.sibling}return null}var Ye=o.unstable_scheduleCallback,Ge=o.unstable_cancelCallback,Qe=o.unstable_shouldYield,Je=o.unstable_requestPaint,Xe=o.unstable_now,Ze=o.unstable_getCurrentPriorityLevel,$e=o.unstable_ImmediatePriority,et=o.unstable_UserBlockingPriority,tt=o.unstable_NormalPriority,nt=o.unstable_LowPriority,rt=o.unstable_IdlePriority,ot=null,it=null;var at=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(st(e)/lt|0)|0},st=Math.log,lt=Math.LN2;var ct=64,ut=4194304;function dt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ft(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,a=268435455&n;if(0!==a){var s=a&~o;0!==s?r=dt(s):0!==(i&=a)&&(r=dt(i))}else 0!==(a=n&~o)?r=dt(a):0!==i&&(r=dt(i));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&o)&&((o=r&-r)>=(i=t&-t)||16===o&&0!==(4194240&i)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)o=1<<(n=31-at(t)),r|=e[n],t&=~o;return r}function pt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ht(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function mt(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function xt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-at(t)]=n}function vt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-at(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var yt=0;function bt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,St,kt,jt,Et,Ct=!1,At=[],Pt=null,Nt=null,zt=null,Rt=new Map,Ot=new Map,Tt=[],Lt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ft(e,t){switch(e){case"focusin":case"focusout":Pt=null;break;case"dragenter":case"dragleave":Nt=null;break;case"mouseover":case"mouseout":zt=null;break;case"pointerover":case"pointerout":Rt.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ot.delete(t.pointerId)}}function Mt(e,t,n,r,o,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},null!==t&&(null!==(t=bo(t))&&St(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function Dt(e){var t=yo(e.target);if(null!==t){var n=We(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=He(n)))return e.blockedOn=t,void Et(e.priority,(function(){kt(n)}))}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function _t(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Qt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=bo(n))&&St(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);be=r,n.target.dispatchEvent(r),be=null,t.shift()}return!0}function It(e,t,n){_t(e)&&n.delete(t)}function Ut(){Ct=!1,null!==Pt&&_t(Pt)&&(Pt=null),null!==Nt&&_t(Nt)&&(Nt=null),null!==zt&&_t(zt)&&(zt=null),Rt.forEach(It),Ot.forEach(It)}function Bt(e,t){e.blockedOn===t&&(e.blockedOn=null,Ct||(Ct=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Ut)))}function Wt(e){function t(t){return Bt(t,e)}if(0<At.length){Bt(At[0],e);for(var n=1;n<At.length;n++){var r=At[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==Pt&&Bt(Pt,e),null!==Nt&&Bt(Nt,e),null!==zt&&Bt(zt,e),Rt.forEach(t),Ot.forEach(t),n=0;n<Tt.length;n++)(r=Tt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Tt.length&&null===(n=Tt[0]).blockedOn;)Dt(n),null===n.blockedOn&&Tt.shift()}var Ht=b.ReactCurrentBatchConfig,qt=!0;function Vt(e,t,n,r){var o=yt,i=Ht.transition;Ht.transition=null;try{yt=1,Yt(e,t,n,r)}finally{yt=o,Ht.transition=i}}function Kt(e,t,n,r){var o=yt,i=Ht.transition;Ht.transition=null;try{yt=4,Yt(e,t,n,r)}finally{yt=o,Ht.transition=i}}function Yt(e,t,n,r){if(qt){var o=Qt(e,t,n,r);if(null===o)qr(e,t,r,Gt,n),Ft(e,r);else if(function(e,t,n,r,o){switch(t){case"focusin":return Pt=Mt(Pt,e,t,n,r,o),!0;case"dragenter":return Nt=Mt(Nt,e,t,n,r,o),!0;case"mouseover":return zt=Mt(zt,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Rt.set(i,Mt(Rt.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Ot.set(i,Mt(Ot.get(i)||null,e,t,n,r,o)),!0}return!1}(o,e,t,n,r))r.stopPropagation();else if(Ft(e,r),4&t&&-1<Lt.indexOf(e)){for(;null!==o;){var i=bo(o);if(null!==i&&wt(i),null===(i=Qt(e,t,n,r))&&qr(e,t,r,Gt,n),i===o)break;o=i}null!==o&&r.stopPropagation()}else qr(e,t,r,null,n)}}var Gt=null;function Qt(e,t,n,r){if(Gt=null,null!==(e=yo(e=we(r))))if(null===(t=We(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=He(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Gt=e,null}function Jt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ze()){case $e:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Xt=null,Zt=null,$t=null;function en(){if($t)return $t;var e,t,n=Zt,r=n.length,o="value"in Xt?Xt.value:Xt.textContent,i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);return $t=o.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function on(e){function t(t,n,r,o,i){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var an,sn,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},un=on(cn),dn=D({},cn,{view:0,detail:0}),fn=on(dn),pn=D({},dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:En,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(an=e.screenX-ln.screenX,sn=e.screenY-ln.screenY):sn=an=0,ln=e),an)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),hn=on(pn),mn=on(D({},pn,{dataTransfer:0})),gn=on(D({},dn,{relatedTarget:0})),xn=on(D({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),vn=D({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yn=on(vn),bn=on(D({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=kn[e])&&!!t[e]}function En(){return jn}var Cn=D({},dn,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?Sn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:En,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),An=on(Cn),Pn=on(D({},pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Nn=on(D({},dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:En})),zn=on(D({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=D({},pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),On=on(Rn),Tn=[9,13,27,32],Ln=u&&"CompositionEvent"in window,Fn=null;u&&"documentMode"in document&&(Fn=document.documentMode);var Mn=u&&"TextEvent"in window&&!Fn,Dn=u&&(!Ln||Fn&&8<Fn&&11>=Fn),_n=String.fromCharCode(32),In=!1;function Un(e,t){switch(e){case"keyup":return-1!==Tn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Wn=!1;var Hn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Hn[e.type]:"textarea"===t}function Vn(e,t,n,r){Ce(r),0<(t=Kr(t,"onChange")).length&&(n=new un("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Kn=null,Yn=null;function Gn(e){_r(e,0)}function Qn(e){if(Y(wo(e)))return e}function Jn(e,t){if("change"===e)return t}var Xn=!1;if(u){var Zn;if(u){var $n="oninput"in document;if(!$n){var er=document.createElement("div");er.setAttribute("oninput","return;"),$n="function"===typeof er.oninput}Zn=$n}else Zn=!1;Xn=Zn&&(!document.documentMode||9<document.documentMode)}function tr(){Kn&&(Kn.detachEvent("onpropertychange",nr),Yn=Kn=null)}function nr(e){if("value"===e.propertyName&&Qn(Yn)){var t=[];Vn(t,Yn,e,we(e)),Re(Gn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Yn=n,(Kn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function or(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Qn(Yn)}function ir(e,t){if("click"===e)return Qn(t)}function ar(e,t){if("input"===e||"change"===e)return Qn(t)}var sr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(sr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!d.call(t,o)||!sr(e[o],t[o]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ur(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function dr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?dr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function fr(){for(var e=window,t=G();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=G((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function hr(e){var t=fr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&dr(n.ownerDocument.documentElement,n)){if(null!==r&&pr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=void 0===r.end?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=ur(n,i);var a=ur(n,r);o&&a&&(1!==e.rangeCount||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&((t=t.createRange()).setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var mr=u&&"documentMode"in document&&11>=document.documentMode,gr=null,xr=null,vr=null,yr=!1;function br(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;yr||null==gr||gr!==G(r)||("selectionStart"in(r=gr)&&pr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},vr&&lr(vr,r)||(vr=r,0<(r=Kr(xr,"onSelect")).length&&(t=new un("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=gr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Sr={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},kr={},jr={};function Er(e){if(kr[e])return kr[e];if(!Sr[e])return e;var t,n=Sr[e];for(t in n)if(n.hasOwnProperty(t)&&t in jr)return kr[e]=n[t];return e}u&&(jr=document.createElement("div").style,"AnimationEvent"in window||(delete Sr.animationend.animation,delete Sr.animationiteration.animation,delete Sr.animationstart.animation),"TransitionEvent"in window||delete Sr.transitionend.transition);var Cr=Er("animationend"),Ar=Er("animationiteration"),Pr=Er("animationstart"),Nr=Er("transitionend"),zr=new Map,Rr="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Or(e,t){zr.set(e,t),l(t,[e])}for(var Tr=0;Tr<Rr.length;Tr++){var Lr=Rr[Tr];Or(Lr.toLowerCase(),"on"+(Lr[0].toUpperCase()+Lr.slice(1)))}Or(Cr,"onAnimationEnd"),Or(Ar,"onAnimationIteration"),Or(Pr,"onAnimationStart"),Or("dblclick","onDoubleClick"),Or("focusin","onFocus"),Or("focusout","onBlur"),Or(Nr,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fr));function Dr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,o,a,s,l,c){if(Be.apply(this,arguments),Me){if(!Me)throw Error(i(198));var u=De;Me=!1,De=null,_e||(_e=!0,Ie=u)}}(r,t,void 0,e),e.currentTarget=null}function _r(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==i&&o.isPropagationStopped())break e;Dr(o,s,c),i=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,c=s.currentTarget,s=s.listener,l!==i&&o.isPropagationStopped())break e;Dr(o,s,c),i=l}}}if(_e)throw e=Ie,_e=!1,Ie=null,e}function Ir(e,t){var n=t[go];void 0===n&&(n=t[go]=new Set);var r=e+"__bubble";n.has(r)||(Hr(t,e,2,!1),n.add(r))}function Ur(e,t,n){var r=0;t&&(r|=4),Hr(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function Wr(e){if(!e[Br]){e[Br]=!0,a.forEach((function(t){"selectionchange"!==t&&(Mr.has(t)||Ur(t,!1,e),Ur(t,!0,e))}));var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Br]||(t[Br]=!0,Ur("selectionchange",!1,t))}}function Hr(e,t,n,r){switch(Jt(t)){case 1:var o=Vt;break;case 4:o=Kt;break;default:o=Yt}n=o.bind(null,t,n,e),o=void 0,!Te||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),r?void 0!==o?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):void 0!==o?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function qr(e,t,n,r,o){var i=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===o||8===s.nodeType&&s.parentNode===o)break;if(4===a)for(a=r.return;null!==a;){var l=a.tag;if((3===l||4===l)&&((l=a.stateNode.containerInfo)===o||8===l.nodeType&&l.parentNode===o))return;a=a.return}for(;null!==s;){if(null===(a=yo(s)))return;if(5===(l=a.tag)||6===l){r=i=a;continue e}s=s.parentNode}}r=r.return}Re((function(){var r=i,o=we(n),a=[];e:{var s=zr.get(e);if(void 0!==s){var l=un,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=An;break;case"focusin":c="focus",l=gn;break;case"focusout":c="blur",l=gn;break;case"beforeblur":case"afterblur":l=gn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=hn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=mn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=Nn;break;case Cr:case Ar:case Pr:l=xn;break;case Nr:l=zn;break;case"scroll":l=fn;break;case"wheel":l=On;break;case"copy":case"cut":case"paste":l=yn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=Pn}var u=0!==(4&t),d=!u&&"scroll"===e,f=u?null!==s?s+"Capture":null:s;u=[];for(var p,h=r;null!==h;){var m=(p=h).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==f&&(null!=(m=Oe(h,f))&&u.push(Vr(h,m,p)))),d)break;h=h.return}0<u.length&&(s=new l(s,c,null,n,o),a.push({event:s,listeners:u}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===be||!(c=n.relatedTarget||n.fromElement)||!yo(c)&&!c[mo])&&(l||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?yo(c):null)&&(c!==(d=We(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(u=hn,m="onMouseLeave",f="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(u=Pn,m="onPointerLeave",f="onPointerEnter",h="pointer"),d=null==l?s:wo(l),p=null==c?s:wo(c),(s=new u(m,h+"leave",l,n,o)).target=d,s.relatedTarget=p,m=null,yo(o)===r&&((u=new u(f,h+"enter",c,n,o)).target=p,u.relatedTarget=d,m=u),d=m,l&&c)e:{for(f=c,h=0,p=u=l;p;p=Yr(p))h++;for(p=0,m=f;m;m=Yr(m))p++;for(;0<h-p;)u=Yr(u),h--;for(;0<p-h;)f=Yr(f),p--;for(;h--;){if(u===f||null!==f&&u===f.alternate)break e;u=Yr(u),f=Yr(f)}u=null}else u=null;null!==l&&Gr(a,s,l,u,!1),null!==c&&null!==d&&Gr(a,d,c,u,!0)}if("select"===(l=(s=r?wo(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var g=Jn;else if(qn(s))if(Xn)g=ar;else{g=or;var x=rr}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(g=ir);switch(g&&(g=g(e,r))?Vn(a,g,n,o):(x&&x(e,s,r),"focusout"===e&&(x=s._wrapperState)&&x.controlled&&"number"===s.type&&ee(s,"number",s.value)),x=r?wo(r):window,e){case"focusin":(qn(x)||"true"===x.contentEditable)&&(gr=x,xr=r,vr=null);break;case"focusout":vr=xr=gr=null;break;case"mousedown":yr=!0;break;case"contextmenu":case"mouseup":case"dragend":yr=!1,br(a,n,o);break;case"selectionchange":if(mr)break;case"keydown":case"keyup":br(a,n,o)}var v;if(Ln)e:{switch(e){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Wn?Un(e,n)&&(y="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(y="onCompositionStart");y&&(Dn&&"ko"!==n.locale&&(Wn||"onCompositionStart"!==y?"onCompositionEnd"===y&&Wn&&(v=en()):(Zt="value"in(Xt=o)?Xt.value:Xt.textContent,Wn=!0)),0<(x=Kr(r,y)).length&&(y=new bn(y,e,null,n,o),a.push({event:y,listeners:x}),v?y.data=v:null!==(v=Bn(n))&&(y.data=v))),(v=Mn?function(e,t){switch(e){case"compositionend":return Bn(t);case"keypress":return 32!==t.which?null:(In=!0,_n);case"textInput":return(e=t.data)===_n&&In?null:e;default:return null}}(e,n):function(e,t){if(Wn)return"compositionend"===e||!Ln&&Un(e,t)?(e=en(),$t=Zt=Xt=null,Wn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Dn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Kr(r,"onBeforeInput")).length&&(o=new bn("onBeforeInput","beforeinput",null,n,o),a.push({event:o,listeners:r}),o.data=v))}_r(a,t)}))}function Vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Kr(e,t){for(var n=t+"Capture",r=[];null!==e;){var o=e,i=o.stateNode;5===o.tag&&null!==i&&(o=i,null!=(i=Oe(e,n))&&r.unshift(Vr(e,i,o)),null!=(i=Oe(e,t))&&r.push(Vr(e,i,o))),e=e.return}return r}function Yr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Gr(e,t,n,r,o){for(var i=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,o?null!=(l=Oe(n,i))&&a.unshift(Vr(n,l,s)):o||null!=(l=Oe(n,i))&&a.push(Vr(n,l,s))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}var Qr=/\r\n?/g,Jr=/\u0000|\uFFFD/g;function Xr(e){return("string"===typeof e?e:""+e).replace(Qr,"\n").replace(Jr,"")}function Zr(e,t,n){if(t=Xr(t),Xr(e)!==t&&n)throw Error(i(425))}function $r(){}var eo=null,to=null;function no(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ro="function"===typeof setTimeout?setTimeout:void 0,oo="function"===typeof clearTimeout?clearTimeout:void 0,io="function"===typeof Promise?Promise:void 0,ao="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof io?function(e){return io.resolve(null).then(e).catch(so)}:ro;function so(e){setTimeout((function(){throw e}))}function lo(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&8===o.nodeType)if("/$"===(n=o.data)){if(0===r)return e.removeChild(o),void Wt(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=o}while(n);Wt(t)}function co(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function uo(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var fo=Math.random().toString(36).slice(2),po="__reactFiber$"+fo,ho="__reactProps$"+fo,mo="__reactContainer$"+fo,go="__reactEvents$"+fo,xo="__reactListeners$"+fo,vo="__reactHandles$"+fo;function yo(e){var t=e[po];if(t)return t;for(var n=e.parentNode;n;){if(t=n[mo]||n[po]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=uo(e);null!==e;){if(n=e[po])return n;e=uo(e)}return t}n=(e=n).parentNode}return null}function bo(e){return!(e=e[po]||e[mo])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function wo(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(i(33))}function So(e){return e[ho]||null}var ko=[],jo=-1;function Eo(e){return{current:e}}function Co(e){0>jo||(e.current=ko[jo],ko[jo]=null,jo--)}function Ao(e,t){jo++,ko[jo]=e.current,e.current=t}var Po={},No=Eo(Po),zo=Eo(!1),Ro=Po;function Oo(e,t){var n=e.type.contextTypes;if(!n)return Po;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o,i={};for(o in n)i[o]=t[o];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function To(e){return null!==(e=e.childContextTypes)&&void 0!==e}function Lo(){Co(zo),Co(No)}function Fo(e,t,n){if(No.current!==Po)throw Error(i(168));Ao(No,t),Ao(zo,n)}function Mo(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var o in r=r.getChildContext())if(!(o in t))throw Error(i(108,H(e)||"Unknown",o));return D({},n,r)}function Do(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Po,Ro=No.current,Ao(No,e),Ao(zo,zo.current),!0}function _o(e,t,n){var r=e.stateNode;if(!r)throw Error(i(169));n?(e=Mo(e,t,Ro),r.__reactInternalMemoizedMergedChildContext=e,Co(zo),Co(No),Ao(No,e)):Co(zo),Ao(zo,n)}var Io=null,Uo=!1,Bo=!1;function Wo(e){null===Io?Io=[e]:Io.push(e)}function Ho(){if(!Bo&&null!==Io){Bo=!0;var e=0,t=yt;try{var n=Io;for(yt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Io=null,Uo=!1}catch(o){throw null!==Io&&(Io=Io.slice(e+1)),Ye($e,Ho),o}finally{yt=t,Bo=!1}}return null}var qo=[],Vo=0,Ko=null,Yo=0,Go=[],Qo=0,Jo=null,Xo=1,Zo="";function $o(e,t){qo[Vo++]=Yo,qo[Vo++]=Ko,Ko=e,Yo=t}function ei(e,t,n){Go[Qo++]=Xo,Go[Qo++]=Zo,Go[Qo++]=Jo,Jo=e;var r=Xo;e=Zo;var o=32-at(r)-1;r&=~(1<<o),n+=1;var i=32-at(t)+o;if(30<i){var a=o-o%5;i=(r&(1<<a)-1).toString(32),r>>=a,o-=a,Xo=1<<32-at(t)+o|n<<o|r,Zo=i+e}else Xo=1<<i|n<<o|r,Zo=e}function ti(e){null!==e.return&&($o(e,1),ei(e,1,0))}function ni(e){for(;e===Ko;)Ko=qo[--Vo],qo[Vo]=null,Yo=qo[--Vo],qo[Vo]=null;for(;e===Jo;)Jo=Go[--Qo],Go[Qo]=null,Zo=Go[--Qo],Go[Qo]=null,Xo=Go[--Qo],Go[Qo]=null}var ri=null,oi=null,ii=!1,ai=null;function si(e,t){var n=Rc(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function li(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,ri=e,oi=co(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,ri=e,oi=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Jo?{id:Xo,overflow:Zo}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Rc(18,null,null,0)).stateNode=t,n.return=e,e.child=n,ri=e,oi=null,!0);default:return!1}}function ci(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function ui(e){if(ii){var t=oi;if(t){var n=t;if(!li(e,t)){if(ci(e))throw Error(i(418));t=co(n.nextSibling);var r=ri;t&&li(e,t)?si(r,n):(e.flags=-4097&e.flags|2,ii=!1,ri=e)}}else{if(ci(e))throw Error(i(418));e.flags=-4097&e.flags|2,ii=!1,ri=e}}}function di(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;ri=e}function fi(e){if(e!==ri)return!1;if(!ii)return di(e),ii=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!no(e.type,e.memoizedProps)),t&&(t=oi)){if(ci(e))throw pi(),Error(i(418));for(;t;)si(e,t),t=co(t.nextSibling)}if(di(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){oi=co(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}oi=null}}else oi=ri?co(e.stateNode.nextSibling):null;return!0}function pi(){for(var e=oi;e;)e=co(e.nextSibling)}function hi(){oi=ri=null,ii=!1}function mi(e){null===ai?ai=[e]:ai.push(e)}var gi=b.ReactCurrentBatchConfig;function xi(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(i(309));var r=n.stateNode}if(!r)throw Error(i(147,e));var o=r,a=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===a?t.ref:(t=function(e){var t=o.refs;null===e?delete t[a]:t[a]=e},t._stringRef=a,t)}if("string"!==typeof e)throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function vi(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function yi(e){return(0,e._init)(e._payload)}function bi(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function o(e,t){return(e=Tc(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Dc(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function c(e,t,n,r){var i=n.type;return i===k?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===O&&yi(i)===t.type)?((r=o(t,n.props)).ref=xi(e,t,n),r.return=e,r):((r=Lc(n.type,n.key,n.props,null,e.mode,r)).ref=xi(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=_c(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function d(e,t,n,r,i){return null===t||7!==t.tag?((t=Fc(n,e.mode,r,i)).return=e,t):((t=o(t,n)).return=e,t)}function f(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=Dc(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=Lc(t.type,t.key,t.props,null,e.mode,n)).ref=xi(e,null,t),n.return=e,n;case S:return(t=_c(t,e.mode,n)).return=e,t;case O:return f(e,(0,t._init)(t._payload),n)}if(te(t)||F(t))return(t=Fc(t,e.mode,n,null)).return=e,t;vi(e,t)}return null}function p(e,t,n,r){var o=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==o?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===o?c(e,t,n,r):null;case S:return n.key===o?u(e,t,n,r):null;case O:return p(e,t,(o=n._init)(n._payload),r)}if(te(n)||F(n))return null!==o?null:d(e,t,n,r,null);vi(e,n)}return null}function h(e,t,n,r,o){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,o);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,o);case S:return u(t,e=e.get(null===r.key?n:r.key)||null,r,o);case O:return h(e,t,n,(0,r._init)(r._payload),o)}if(te(r)||F(r))return d(t,e=e.get(n)||null,r,o,null);vi(t,r)}return null}function m(o,i,s,l){for(var c=null,u=null,d=i,m=i=0,g=null;null!==d&&m<s.length;m++){d.index>m?(g=d,d=null):g=d.sibling;var x=p(o,d,s[m],l);if(null===x){null===d&&(d=g);break}e&&d&&null===x.alternate&&t(o,d),i=a(x,i,m),null===u?c=x:u.sibling=x,u=x,d=g}if(m===s.length)return n(o,d),ii&&$o(o,m),c;if(null===d){for(;m<s.length;m++)null!==(d=f(o,s[m],l))&&(i=a(d,i,m),null===u?c=d:u.sibling=d,u=d);return ii&&$o(o,m),c}for(d=r(o,d);m<s.length;m++)null!==(g=h(d,o,m,s[m],l))&&(e&&null!==g.alternate&&d.delete(null===g.key?m:g.key),i=a(g,i,m),null===u?c=g:u.sibling=g,u=g);return e&&d.forEach((function(e){return t(o,e)})),ii&&$o(o,m),c}function g(o,s,l,c){var u=F(l);if("function"!==typeof u)throw Error(i(150));if(null==(l=u.call(l)))throw Error(i(151));for(var d=u=null,m=s,g=s=0,x=null,v=l.next();null!==m&&!v.done;g++,v=l.next()){m.index>g?(x=m,m=null):x=m.sibling;var y=p(o,m,v.value,c);if(null===y){null===m&&(m=x);break}e&&m&&null===y.alternate&&t(o,m),s=a(y,s,g),null===d?u=y:d.sibling=y,d=y,m=x}if(v.done)return n(o,m),ii&&$o(o,g),u;if(null===m){for(;!v.done;g++,v=l.next())null!==(v=f(o,v.value,c))&&(s=a(v,s,g),null===d?u=v:d.sibling=v,d=v);return ii&&$o(o,g),u}for(m=r(o,m);!v.done;g++,v=l.next())null!==(v=h(m,o,g,v.value,c))&&(e&&null!==v.alternate&&m.delete(null===v.key?g:v.key),s=a(v,s,g),null===d?u=v:d.sibling=v,d=v);return e&&m.forEach((function(e){return t(o,e)})),ii&&$o(o,g),u}return function e(r,i,a,l){if("object"===typeof a&&null!==a&&a.type===k&&null===a.key&&(a=a.props.children),"object"===typeof a&&null!==a){switch(a.$$typeof){case w:e:{for(var c=a.key,u=i;null!==u;){if(u.key===c){if((c=a.type)===k){if(7===u.tag){n(r,u.sibling),(i=o(u,a.props.children)).return=r,r=i;break e}}else if(u.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===O&&yi(c)===u.type){n(r,u.sibling),(i=o(u,a.props)).ref=xi(r,u,a),i.return=r,r=i;break e}n(r,u);break}t(r,u),u=u.sibling}a.type===k?((i=Fc(a.props.children,r.mode,l,a.key)).return=r,r=i):((l=Lc(a.type,a.key,a.props,null,r.mode,l)).ref=xi(r,i,a),l.return=r,r=l)}return s(r);case S:e:{for(u=a.key;null!==i;){if(i.key===u){if(4===i.tag&&i.stateNode.containerInfo===a.containerInfo&&i.stateNode.implementation===a.implementation){n(r,i.sibling),(i=o(i,a.children||[])).return=r,r=i;break e}n(r,i);break}t(r,i),i=i.sibling}(i=_c(a,r.mode,l)).return=r,r=i}return s(r);case O:return e(r,i,(u=a._init)(a._payload),l)}if(te(a))return m(r,i,a,l);if(F(a))return g(r,i,a,l);vi(r,a)}return"string"===typeof a&&""!==a||"number"===typeof a?(a=""+a,null!==i&&6===i.tag?(n(r,i.sibling),(i=o(i,a)).return=r,r=i):(n(r,i),(i=Dc(a,r.mode,l)).return=r,r=i),s(r)):n(r,i)}}var wi=bi(!0),Si=bi(!1),ki=Eo(null),ji=null,Ei=null,Ci=null;function Ai(){Ci=Ei=ji=null}function Pi(e){var t=ki.current;Co(ki),e._currentValue=t}function Ni(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function zi(e,t){ji=e,Ci=Ei=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(ys=!0),e.firstContext=null)}function Ri(e){var t=e._currentValue;if(Ci!==e)if(e={context:e,memoizedValue:t,next:null},null===Ei){if(null===ji)throw Error(i(308));Ei=e,ji.dependencies={lanes:0,firstContext:e}}else Ei=Ei.next=e;return t}var Oi=null;function Ti(e){null===Oi?Oi=[e]:Oi.push(e)}function Li(e,t,n,r){var o=t.interleaved;return null===o?(n.next=n,Ti(t)):(n.next=o.next,o.next=n),t.interleaved=n,Fi(e,r)}function Fi(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Mi=!1;function Di(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _i(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ii(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ui(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Pl)){var o=r.pending;return null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Fi(e,n)}return null===(o=r.interleaved)?(t.next=t,Ti(r)):(t.next=o.next,o.next=t),r.interleaved=t,Fi(e,n)}function Bi(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,vt(e,n)}}function Wi(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var o=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===i?o=i=a:i=i.next=a,n=n.next}while(null!==n);null===i?o=i=t:i=i.next=t}else o=i=t;return n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Hi(e,t,n,r){var o=e.updateQueue;Mi=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var l=s,c=l.next;l.next=null,null===a?i=c:a.next=c,a=l;var u=e.alternate;null!==u&&((s=(u=u.updateQueue).lastBaseUpdate)!==a&&(null===s?u.firstBaseUpdate=c:s.next=c,u.lastBaseUpdate=l))}if(null!==i){var d=o.baseState;for(a=0,u=c=l=null,s=i;;){var f=s.lane,p=s.eventTime;if((r&f)===f){null!==u&&(u=u.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var h=e,m=s;switch(f=t,p=n,m.tag){case 1:if("function"===typeof(h=m.payload)){d=h.call(p,d,f);break e}d=h;break e;case 3:h.flags=-65537&h.flags|128;case 0:if(null===(f="function"===typeof(h=m.payload)?h.call(p,d,f):h)||void 0===f)break e;d=D({},d,f);break e;case 2:Mi=!0}}null!==s.callback&&0!==s.lane&&(e.flags|=64,null===(f=o.effects)?o.effects=[s]:f.push(s))}else p={eventTime:p,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===u?(c=u=p,l=d):u=u.next=p,a|=f;if(null===(s=s.next)){if(null===(s=o.shared.pending))break;s=(f=s).next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}if(null===u&&(l=d),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=u,null!==(t=o.shared.interleaved)){o=t;do{a|=o.lane,o=o.next}while(o!==t)}else null===i&&(o.shared.lanes=0);Ml|=a,e.lanes=a,e.memoizedState=d}}function qi(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(null!==o){if(r.callback=null,r=n,"function"!==typeof o)throw Error(i(191,o));o.call(r)}}}var Vi={},Ki=Eo(Vi),Yi=Eo(Vi),Gi=Eo(Vi);function Qi(e){if(e===Vi)throw Error(i(174));return e}function Ji(e,t){switch(Ao(Gi,t),Ao(Yi,e),Ao(Ki,Vi),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Co(Ki),Ao(Ki,t)}function Xi(){Co(Ki),Co(Yi),Co(Gi)}function Zi(e){Qi(Gi.current);var t=Qi(Ki.current),n=le(t,e.type);t!==n&&(Ao(Yi,e),Ao(Ki,n))}function $i(e){Yi.current===e&&(Co(Ki),Co(Yi))}var ea=Eo(0);function ta(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var na=[];function ra(){for(var e=0;e<na.length;e++)na[e]._workInProgressVersionPrimary=null;na.length=0}var oa=b.ReactCurrentDispatcher,ia=b.ReactCurrentBatchConfig,aa=0,sa=null,la=null,ca=null,ua=!1,da=!1,fa=0,pa=0;function ha(){throw Error(i(321))}function ma(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!sr(e[n],t[n]))return!1;return!0}function ga(e,t,n,r,o,a){if(aa=a,sa=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,oa.current=null===e||null===e.memoizedState?$a:es,e=n(r,o),da){a=0;do{if(da=!1,fa=0,25<=a)throw Error(i(301));a+=1,ca=la=null,t.updateQueue=null,oa.current=ts,e=n(r,o)}while(da)}if(oa.current=Za,t=null!==la&&null!==la.next,aa=0,ca=la=sa=null,ua=!1,t)throw Error(i(300));return e}function xa(){var e=0!==fa;return fa=0,e}function va(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ca?sa.memoizedState=ca=e:ca=ca.next=e,ca}function ya(){if(null===la){var e=sa.alternate;e=null!==e?e.memoizedState:null}else e=la.next;var t=null===ca?sa.memoizedState:ca.next;if(null!==t)ca=t,la=e;else{if(null===e)throw Error(i(310));e={memoizedState:(la=e).memoizedState,baseState:la.baseState,baseQueue:la.baseQueue,queue:la.queue,next:null},null===ca?sa.memoizedState=ca=e:ca=ca.next=e}return ca}function ba(e,t){return"function"===typeof t?t(e):t}function wa(e){var t=ya(),n=t.queue;if(null===n)throw Error(i(311));n.lastRenderedReducer=e;var r=la,o=r.baseQueue,a=n.pending;if(null!==a){if(null!==o){var s=o.next;o.next=a.next,a.next=s}r.baseQueue=o=a,n.pending=null}if(null!==o){a=o.next,r=r.baseState;var l=s=null,c=null,u=a;do{var d=u.lane;if((aa&d)===d)null!==c&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};null===c?(l=c=f,s=r):c=c.next=f,sa.lanes|=d,Ml|=d}u=u.next}while(null!==u&&u!==a);null===c?s=r:c.next=l,sr(r,t.memoizedState)||(ys=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){o=e;do{a=o.lane,sa.lanes|=a,Ml|=a,o=o.next}while(o!==e)}else null===o&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Sa(e){var t=ya(),n=t.queue;if(null===n)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,a=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{a=e(a,s.action),s=s.next}while(s!==o);sr(a,t.memoizedState)||(ys=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function ka(){}function ja(e,t){var n=sa,r=ya(),o=t(),a=!sr(r.memoizedState,o);if(a&&(r.memoizedState=o,ys=!0),r=r.queue,Ma(Aa.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||null!==ca&&1&ca.memoizedState.tag){if(n.flags|=2048,Ra(9,Ca.bind(null,n,r,o,t),void 0,null),null===Nl)throw Error(i(349));0!==(30&aa)||Ea(n,t,o)}return o}function Ea(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Ca(e,t,n,r){t.value=n,t.getSnapshot=r,Pa(t)&&Na(e)}function Aa(e,t,n){return n((function(){Pa(t)&&Na(e)}))}function Pa(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!sr(e,n)}catch(r){return!0}}function Na(e){var t=Fi(e,1);null!==t&&nc(t,e,1,-1)}function za(e){var t=va();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:e},t.queue=e,e=e.dispatch=Ga.bind(null,sa,e),[t.memoizedState,e]}function Ra(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Oa(){return ya().memoizedState}function Ta(e,t,n,r){var o=va();sa.flags|=e,o.memoizedState=Ra(1|t,n,void 0,void 0===r?null:r)}function La(e,t,n,r){var o=ya();r=void 0===r?null:r;var i=void 0;if(null!==la){var a=la.memoizedState;if(i=a.destroy,null!==r&&ma(r,a.deps))return void(o.memoizedState=Ra(t,n,i,r))}sa.flags|=e,o.memoizedState=Ra(1|t,n,i,r)}function Fa(e,t){return Ta(8390656,8,e,t)}function Ma(e,t){return La(2048,8,e,t)}function Da(e,t){return La(4,2,e,t)}function _a(e,t){return La(4,4,e,t)}function Ia(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Ua(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,La(4,4,Ia.bind(null,t,e),n)}function Ba(){}function Wa(e,t){var n=ya();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ma(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ha(e,t){var n=ya();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ma(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function qa(e,t,n){return 0===(21&aa)?(e.baseState&&(e.baseState=!1,ys=!0),e.memoizedState=n):(sr(n,t)||(n=mt(),sa.lanes|=n,Ml|=n,e.baseState=!0),t)}function Va(e,t){var n=yt;yt=0!==n&&4>n?n:4,e(!0);var r=ia.transition;ia.transition={};try{e(!1),t()}finally{yt=n,ia.transition=r}}function Ka(){return ya().memoizedState}function Ya(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Qa(e))Ja(t,n);else if(null!==(n=Li(e,t,n,r))){nc(n,e,r,ec()),Xa(n,t,r)}}function Ga(e,t,n){var r=tc(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qa(e))Ja(t,o);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var a=t.lastRenderedState,s=i(a,n);if(o.hasEagerState=!0,o.eagerState=s,sr(s,a)){var l=t.interleaved;return null===l?(o.next=o,Ti(t)):(o.next=l.next,l.next=o),void(t.interleaved=o)}}catch(c){}null!==(n=Li(e,t,o,r))&&(nc(n,e,r,o=ec()),Xa(n,t,r))}}function Qa(e){var t=e.alternate;return e===sa||null!==t&&t===sa}function Ja(e,t){da=ua=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xa(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,vt(e,n)}}var Za={readContext:Ri,useCallback:ha,useContext:ha,useEffect:ha,useImperativeHandle:ha,useInsertionEffect:ha,useLayoutEffect:ha,useMemo:ha,useReducer:ha,useRef:ha,useState:ha,useDebugValue:ha,useDeferredValue:ha,useTransition:ha,useMutableSource:ha,useSyncExternalStore:ha,useId:ha,unstable_isNewReconciler:!1},$a={readContext:Ri,useCallback:function(e,t){return va().memoizedState=[e,void 0===t?null:t],e},useContext:Ri,useEffect:Fa,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Ta(4194308,4,Ia.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ta(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ta(4,2,e,t)},useMemo:function(e,t){var n=va();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=va();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ya.bind(null,sa,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},va().memoizedState=e},useState:za,useDebugValue:Ba,useDeferredValue:function(e){return va().memoizedState=e},useTransition:function(){var e=za(!1),t=e[0];return e=Va.bind(null,e[1]),va().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=sa,o=va();if(ii){if(void 0===n)throw Error(i(407));n=n()}else{if(n=t(),null===Nl)throw Error(i(349));0!==(30&aa)||Ea(r,t,n)}o.memoizedState=n;var a={value:n,getSnapshot:t};return o.queue=a,Fa(Aa.bind(null,r,a,e),[e]),r.flags|=2048,Ra(9,Ca.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=va(),t=Nl.identifierPrefix;if(ii){var n=Zo;t=":"+t+"R"+(n=(Xo&~(1<<32-at(Xo)-1)).toString(32)+n),0<(n=fa++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=pa++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},es={readContext:Ri,useCallback:Wa,useContext:Ri,useEffect:Ma,useImperativeHandle:Ua,useInsertionEffect:Da,useLayoutEffect:_a,useMemo:Ha,useReducer:wa,useRef:Oa,useState:function(){return wa(ba)},useDebugValue:Ba,useDeferredValue:function(e){return qa(ya(),la.memoizedState,e)},useTransition:function(){return[wa(ba)[0],ya().memoizedState]},useMutableSource:ka,useSyncExternalStore:ja,useId:Ka,unstable_isNewReconciler:!1},ts={readContext:Ri,useCallback:Wa,useContext:Ri,useEffect:Ma,useImperativeHandle:Ua,useInsertionEffect:Da,useLayoutEffect:_a,useMemo:Ha,useReducer:Sa,useRef:Oa,useState:function(){return Sa(ba)},useDebugValue:Ba,useDeferredValue:function(e){var t=ya();return null===la?t.memoizedState=e:qa(t,la.memoizedState,e)},useTransition:function(){return[Sa(ba)[0],ya().memoizedState]},useMutableSource:ka,useSyncExternalStore:ja,useId:Ka,unstable_isNewReconciler:!1};function ns(e,t){if(e&&e.defaultProps){for(var n in t=D({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function rs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:D({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var os={isMounted:function(e){return!!(e=e._reactInternals)&&We(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),o=tc(e),i=Ii(r,o);i.payload=t,void 0!==n&&null!==n&&(i.callback=n),null!==(t=Ui(e,i,o))&&(nc(t,e,o,r),Bi(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),o=tc(e),i=Ii(r,o);i.tag=1,i.payload=t,void 0!==n&&null!==n&&(i.callback=n),null!==(t=Ui(e,i,o))&&(nc(t,e,o,r),Bi(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),o=Ii(n,r);o.tag=2,void 0!==t&&null!==t&&(o.callback=t),null!==(t=Ui(e,o,r))&&(nc(t,e,r,n),Bi(t,e,r))}};function is(e,t,n,r,o,i,a){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,a):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(o,i))}function as(e,t,n){var r=!1,o=Po,i=t.contextType;return"object"===typeof i&&null!==i?i=Ri(i):(o=To(t)?Ro:No.current,i=(r=null!==(r=t.contextTypes)&&void 0!==r)?Oo(e,o):Po),t=new t(n,i),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=os,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function ss(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&os.enqueueReplaceState(t,t.state,null)}function ls(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Di(e);var i=t.contextType;"object"===typeof i&&null!==i?o.context=Ri(i):(i=To(t)?Ro:No.current,o.context=Oo(e,i)),o.state=e.memoizedState,"function"===typeof(i=t.getDerivedStateFromProps)&&(rs(e,t,i,n),o.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof o.getSnapshotBeforeUpdate||"function"!==typeof o.UNSAFE_componentWillMount&&"function"!==typeof o.componentWillMount||(t=o.state,"function"===typeof o.componentWillMount&&o.componentWillMount(),"function"===typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount(),t!==o.state&&os.enqueueReplaceState(o,o.state,null),Hi(e,n,o,r),o.state=e.memoizedState),"function"===typeof o.componentDidMount&&(e.flags|=4194308)}function cs(e,t){try{var n="",r=t;do{n+=B(r),r=r.return}while(r);var o=n}catch(i){o="\nError generating stack: "+i.message+"\n"+i.stack}return{value:e,source:t,stack:o,digest:null}}function us(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function ds(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}var fs="function"===typeof WeakMap?WeakMap:Map;function ps(e,t,n){(n=Ii(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ql||(ql=!0,Vl=r),ds(0,t)},n}function hs(e,t,n){(n=Ii(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ds(0,t)}}var i=e.stateNode;return null!==i&&"function"===typeof i.componentDidCatch&&(n.callback=function(){ds(0,t),"function"!==typeof r&&(null===Kl?Kl=new Set([this]):Kl.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function ms(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new fs;var o=new Set;r.set(t,o)}else void 0===(o=r.get(t))&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Ec.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function xs(e,t,n,r,o){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=Ii(-1,1)).tag=2,Ui(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var vs=b.ReactCurrentOwner,ys=!1;function bs(e,t,n,r){t.child=null===e?Si(t,null,n,r):wi(t,e.child,n,r)}function ws(e,t,n,r,o){n=n.render;var i=t.ref;return zi(t,o),r=ga(e,t,n,r,i,o),n=xa(),null===e||ys?(ii&&n&&ti(t),t.flags|=1,bs(e,t,r,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,qs(e,t,o))}function Ss(e,t,n,r,o){if(null===e){var i=n.type;return"function"!==typeof i||Oc(i)||void 0!==i.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Lc(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,ks(e,t,i,r,o))}if(i=e.child,0===(e.lanes&o)){var a=i.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(a,r)&&e.ref===t.ref)return qs(e,t,o)}return t.flags|=1,(e=Tc(i,r)).ref=t.ref,e.return=t,t.child=e}function ks(e,t,n,r,o){if(null!==e){var i=e.memoizedProps;if(lr(i,r)&&e.ref===t.ref){if(ys=!1,t.pendingProps=r=i,0===(e.lanes&o))return t.lanes=e.lanes,qs(e,t,o);0!==(131072&e.flags)&&(ys=!0)}}return Cs(e,t,n,r,o)}function js(e,t,n){var r=t.pendingProps,o=r.children,i=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ao(Tl,Ol),Ol|=n;else{if(0===(1073741824&n))return e=null!==i?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ao(Tl,Ol),Ol|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==i?i.baseLanes:n,Ao(Tl,Ol),Ol|=r}else null!==i?(r=i.baseLanes|n,t.memoizedState=null):r=n,Ao(Tl,Ol),Ol|=r;return bs(e,t,o,n),t.child}function Es(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Cs(e,t,n,r,o){var i=To(n)?Ro:No.current;return i=Oo(t,i),zi(t,o),n=ga(e,t,n,r,i,o),r=xa(),null===e||ys?(ii&&r&&ti(t),t.flags|=1,bs(e,t,n,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,qs(e,t,o))}function As(e,t,n,r,o){if(To(n)){var i=!0;Do(t)}else i=!1;if(zi(t,o),null===t.stateNode)Hs(e,t),as(t,n,r),ls(t,n,r,o),r=!0;else if(null===e){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,c=n.contextType;"object"===typeof c&&null!==c?c=Ri(c):c=Oo(t,c=To(n)?Ro:No.current);var u=n.getDerivedStateFromProps,d="function"===typeof u||"function"===typeof a.getSnapshotBeforeUpdate;d||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==r||l!==c)&&ss(t,a,r,c),Mi=!1;var f=t.memoizedState;a.state=f,Hi(t,r,a,o),l=t.memoizedState,s!==r||f!==l||zo.current||Mi?("function"===typeof u&&(rs(t,n,u,r),l=t.memoizedState),(s=Mi||is(t,n,s,r,f,l,c))?(d||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4194308)):("function"===typeof a.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=s):("function"===typeof a.componentDidMount&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,_i(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ns(t.type,s),a.props=c,d=t.pendingProps,f=a.context,"object"===typeof(l=n.contextType)&&null!==l?l=Ri(l):l=Oo(t,l=To(n)?Ro:No.current);var p=n.getDerivedStateFromProps;(u="function"===typeof p||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==d||f!==l)&&ss(t,a,r,l),Mi=!1,f=t.memoizedState,a.state=f,Hi(t,r,a,o);var h=t.memoizedState;s!==d||f!==h||zo.current||Mi?("function"===typeof p&&(rs(t,n,p,r),h=t.memoizedState),(c=Mi||is(t,n,c,r,f,h,l)||!1)?(u||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(r,h,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,h,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),a.props=r,a.state=h,a.context=l,r=c):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Ps(e,t,n,r,i,o)}function Ps(e,t,n,r,o,i){Es(e,t);var a=0!==(128&t.flags);if(!r&&!a)return o&&_o(t,n,!1),qs(e,t,i);r=t.stateNode,vs.current=t;var s=a&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&a?(t.child=wi(t,e.child,null,i),t.child=wi(t,null,s,i)):bs(e,t,s,i),t.memoizedState=r.state,o&&_o(t,n,!0),t.child}function Ns(e){var t=e.stateNode;t.pendingContext?Fo(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Fo(0,t.context,!1),Ji(e,t.containerInfo)}function zs(e,t,n,r,o){return hi(),mi(o),t.flags|=256,bs(e,t,n,r),t.child}var Rs,Os,Ts,Ls,Fs={dehydrated:null,treeContext:null,retryLane:0};function Ms(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ds(e,t,n){var r,o=t.pendingProps,a=ea.current,s=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&a)),r?(s=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(a|=1),Ao(ea,1&a),null===e)return ui(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=o.children,e=o.fallback,s?(o=t.mode,s=t.child,l={mode:"hidden",children:l},0===(1&o)&&null!==s?(s.childLanes=0,s.pendingProps=l):s=Mc(l,o,0,null),e=Fc(e,o,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ms(n),t.memoizedState=Fs,e):_s(t,l));if(null!==(a=e.memoizedState)&&null!==(r=a.dehydrated))return function(e,t,n,r,o,a,s){if(n)return 256&t.flags?(t.flags&=-257,Is(e,t,s,r=us(Error(i(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(a=r.fallback,o=t.mode,r=Mc({mode:"visible",children:r.children},o,0,null),(a=Fc(a,o,s,null)).flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,0!==(1&t.mode)&&wi(t,e.child,null,s),t.child.memoizedState=Ms(s),t.memoizedState=Fs,a);if(0===(1&t.mode))return Is(e,t,s,null);if("$!"===o.data){if(r=o.nextSibling&&o.nextSibling.dataset)var l=r.dgst;return r=l,Is(e,t,s,r=us(a=Error(i(419)),r,void 0))}if(l=0!==(s&e.childLanes),ys||l){if(null!==(r=Nl)){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}0!==(o=0!==(o&(r.suspendedLanes|s))?0:o)&&o!==a.retryLane&&(a.retryLane=o,Fi(e,o),nc(r,e,o,-1))}return mc(),Is(e,t,s,r=us(Error(i(421))))}return"$?"===o.data?(t.flags|=128,t.child=e.child,t=Ac.bind(null,e),o._reactRetry=t,null):(e=a.treeContext,oi=co(o.nextSibling),ri=t,ii=!0,ai=null,null!==e&&(Go[Qo++]=Xo,Go[Qo++]=Zo,Go[Qo++]=Jo,Xo=e.id,Zo=e.overflow,Jo=t),t=_s(t,r.children),t.flags|=4096,t)}(e,t,l,o,r,a,n);if(s){s=o.fallback,l=t.mode,r=(a=e.child).sibling;var c={mode:"hidden",children:o.children};return 0===(1&l)&&t.child!==a?((o=t.child).childLanes=0,o.pendingProps=c,t.deletions=null):(o=Tc(a,c)).subtreeFlags=14680064&a.subtreeFlags,null!==r?s=Tc(r,s):(s=Fc(s,l,n,null)).flags|=2,s.return=t,o.return=t,o.sibling=s,t.child=o,o=s,s=t.child,l=null===(l=e.child.memoizedState)?Ms(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Fs,o}return e=(s=e.child).sibling,o=Tc(s,{mode:"visible",children:o.children}),0===(1&t.mode)&&(o.lanes=n),o.return=t,o.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=o,t.memoizedState=null,o}function _s(e,t){return(t=Mc({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function Is(e,t,n,r){return null!==r&&mi(r),wi(t,e.child,null,n),(e=_s(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Us(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Ni(e.return,t,n)}function Bs(e,t,n,r,o){var i=e.memoizedState;null===i?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Ws(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(bs(e,t,r.children,n),0!==(2&(r=ea.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Us(e,n,t);else if(19===e.tag)Us(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ao(ea,r),0===(1&t.mode))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;null!==n;)null!==(e=n.alternate)&&null===ta(e)&&(o=n),n=n.sibling;null===(n=o)?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Bs(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===ta(e)){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Bs(t,!0,n,null,i);break;case"together":Bs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Hs(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function qs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ml|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(i(153));if(null!==t.child){for(n=Tc(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Tc(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Vs(e,t){if(!ii)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ks(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=14680064&o.subtreeFlags,r|=14680064&o.flags,o.return=e,o=o.sibling;else for(o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ys(e,t,n){var r=t.pendingProps;switch(ni(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ks(t),null;case 1:case 17:return To(t.type)&&Lo(),Ks(t),null;case 3:return r=t.stateNode,Xi(),Co(zo),Co(No),ra(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(fi(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==ai&&(ac(ai),ai=null))),Os(e,t),Ks(t),null;case 5:$i(t);var o=Qi(Gi.current);if(n=t.type,null!==e&&null!=t.stateNode)Ts(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(i(166));return Ks(t),null}if(e=Qi(Ki.current),fi(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[po]=t,r[ho]=a,e=0!==(1&t.mode),n){case"dialog":Ir("cancel",r),Ir("close",r);break;case"iframe":case"object":case"embed":Ir("load",r);break;case"video":case"audio":for(o=0;o<Fr.length;o++)Ir(Fr[o],r);break;case"source":Ir("error",r);break;case"img":case"image":case"link":Ir("error",r),Ir("load",r);break;case"details":Ir("toggle",r);break;case"input":J(r,a),Ir("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},Ir("invalid",r);break;case"textarea":oe(r,a),Ir("invalid",r)}for(var l in ve(n,a),o=null,a)if(a.hasOwnProperty(l)){var c=a[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==a.suppressHydrationWarning&&Zr(r.textContent,c,e),o=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==a.suppressHydrationWarning&&Zr(r.textContent,c,e),o=["children",""+c]):s.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&Ir("scroll",r)}switch(n){case"input":K(r),$(r,a,!0);break;case"textarea":K(r),ae(r);break;case"select":case"option":break;default:"function"===typeof a.onClick&&(r.onclick=$r)}r=o,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===o.nodeType?o:o.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=se(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[po]=t,e[ho]=r,Rs(e,t,!1,!1),t.stateNode=e;e:{switch(l=ye(n,r),n){case"dialog":Ir("cancel",e),Ir("close",e),o=r;break;case"iframe":case"object":case"embed":Ir("load",e),o=r;break;case"video":case"audio":for(o=0;o<Fr.length;o++)Ir(Fr[o],e);o=r;break;case"source":Ir("error",e),o=r;break;case"img":case"image":case"link":Ir("error",e),Ir("load",e),o=r;break;case"details":Ir("toggle",e),o=r;break;case"input":J(e,r),o=Q(e,r),Ir("invalid",e);break;case"option":default:o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=D({},r,{value:void 0}),Ir("invalid",e);break;case"textarea":oe(e,r),o=re(e,r),Ir("invalid",e)}for(a in ve(n,o),c=o)if(c.hasOwnProperty(a)){var u=c[a];"style"===a?ge(e,u):"dangerouslySetInnerHTML"===a?null!=(u=u?u.__html:void 0)&&de(e,u):"children"===a?"string"===typeof u?("textarea"!==n||""!==u)&&fe(e,u):"number"===typeof u&&fe(e,""+u):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(s.hasOwnProperty(a)?null!=u&&"onScroll"===a&&Ir("scroll",e):null!=u&&y(e,a,u,l))}switch(n){case"input":K(e),$(e,r,!1);break;case"textarea":K(e),ae(e);break;case"option":null!=r.value&&e.setAttribute("value",""+q(r.value));break;case"select":e.multiple=!!r.multiple,null!=(a=r.value)?ne(e,!!r.multiple,a,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof o.onClick&&(e.onclick=$r)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return Ks(t),null;case 6:if(e&&null!=t.stateNode)Ls(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(i(166));if(n=Qi(Gi.current),Qi(Ki.current),fi(t)){if(r=t.stateNode,n=t.memoizedProps,r[po]=t,(a=r.nodeValue!==n)&&null!==(e=ri))switch(e.tag){case 3:Zr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Zr(r.nodeValue,n,0!==(1&e.mode))}a&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[po]=t,t.stateNode=r}return Ks(t),null;case 13:if(Co(ea),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(ii&&null!==oi&&0!==(1&t.mode)&&0===(128&t.flags))pi(),hi(),t.flags|=98560,a=!1;else if(a=fi(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(i(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(i(317));a[po]=t}else hi(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;Ks(t),a=!1}else null!==ai&&(ac(ai),ai=null),a=!0;if(!a)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&ea.current)?0===Ll&&(Ll=3):mc())),null!==t.updateQueue&&(t.flags|=4),Ks(t),null);case 4:return Xi(),Os(e,t),null===e&&Wr(t.stateNode.containerInfo),Ks(t),null;case 10:return Pi(t.type._context),Ks(t),null;case 19:if(Co(ea),null===(a=t.memoizedState))return Ks(t),null;if(r=0!==(128&t.flags),null===(l=a.rendering))if(r)Vs(a,!1);else{if(0!==Ll||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=ta(e))){for(t.flags|=128,Vs(a,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(a=n).flags&=14680066,null===(l=a.alternate)?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ao(ea,1&ea.current|2),t.child}e=e.sibling}null!==a.tail&&Xe()>Wl&&(t.flags|=128,r=!0,Vs(a,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=ta(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Vs(a,!0),null===a.tail&&"hidden"===a.tailMode&&!l.alternate&&!ii)return Ks(t),null}else 2*Xe()-a.renderingStartTime>Wl&&1073741824!==n&&(t.flags|=128,r=!0,Vs(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=a.last)?n.sibling=l:t.child=l,a.last=l)}return null!==a.tail?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Xe(),t.sibling=null,n=ea.current,Ao(ea,r?1&n|2:1&n),t):(Ks(t),null);case 22:case 23:return dc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&Ol)&&(Ks(t),6&t.subtreeFlags&&(t.flags|=8192)):Ks(t),null;case 24:case 25:return null}throw Error(i(156,t.tag))}function Gs(e,t){switch(ni(t),t.tag){case 1:return To(t.type)&&Lo(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Xi(),Co(zo),Co(No),ra(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return $i(t),null;case 13:if(Co(ea),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(i(340));hi()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Co(ea),null;case 4:return Xi(),null;case 10:return Pi(t.type._context),null;case 22:case 23:return dc(),null;default:return null}}Rs=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Os=function(){},Ts=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Qi(Ki.current);var i,a=null;switch(n){case"input":o=Q(e,o),r=Q(e,r),a=[];break;case"select":o=D({},o,{value:void 0}),r=D({},r,{value:void 0}),a=[];break;case"textarea":o=re(e,o),r=re(e,r),a=[];break;default:"function"!==typeof o.onClick&&"function"===typeof r.onClick&&(e.onclick=$r)}for(u in ve(n,r),n=null,o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&null!=o[u])if("style"===u){var l=o[u];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else"dangerouslySetInnerHTML"!==u&&"children"!==u&&"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&"autoFocus"!==u&&(s.hasOwnProperty(u)?a||(a=[]):(a=a||[]).push(u,null));for(u in r){var c=r[u];if(l=null!=o?o[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(null!=c||null!=l))if("style"===u)if(l){for(i in l)!l.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&l[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(a||(a=[]),a.push(u,n)),n=c;else"dangerouslySetInnerHTML"===u?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(a=a||[]).push(u,c)):"children"===u?"string"!==typeof c&&"number"!==typeof c||(a=a||[]).push(u,""+c):"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&(s.hasOwnProperty(u)?(null!=c&&"onScroll"===u&&Ir("scroll",e),a||l===c||(a=[])):(a=a||[]).push(u,c))}n&&(a=a||[]).push("style",n);var u=a;(t.updateQueue=u)&&(t.flags|=4)}},Ls=function(e,t,n,r){n!==r&&(t.flags|=4)};var Qs=!1,Js=!1,Xs="function"===typeof WeakSet?WeakSet:Set,Zs=null;function $s(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){jc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){jc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,void 0!==i&&el(t,n,i)}o=o.next}while(o!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ol(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function il(e){var t=e.alternate;null!==t&&(e.alternate=null,il(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[po],delete t[ho],delete t[go],delete t[xo],delete t[vo])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function al(e){return 5===e.tag||3===e.tag||4===e.tag}function sl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||al(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=$r));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var ul=null,dl=!1;function fl(e,t,n){for(n=n.child;null!==n;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(it&&"function"===typeof it.onCommitFiberUnmount)try{it.onCommitFiberUnmount(ot,n)}catch(s){}switch(n.tag){case 5:Js||$s(n,t);case 6:var r=ul,o=dl;ul=null,fl(e,t,n),dl=o,null!==(ul=r)&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):ul.removeChild(n.stateNode));break;case 18:null!==ul&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?lo(e.parentNode,n):1===e.nodeType&&lo(e,n),Wt(e)):lo(ul,n.stateNode));break;case 4:r=ul,o=dl,ul=n.stateNode.containerInfo,dl=!0,fl(e,t,n),ul=r,dl=o;break;case 0:case 11:case 14:case 15:if(!Js&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){o=r=r.next;do{var i=o,a=i.destroy;i=i.tag,void 0!==a&&(0!==(2&i)||0!==(4&i))&&el(n,t,a),o=o.next}while(o!==r)}fl(e,t,n);break;case 1:if(!Js&&($s(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){jc(n,t,s)}fl(e,t,n);break;case 21:fl(e,t,n);break;case 22:1&n.mode?(Js=(r=Js)||null!==n.memoizedState,fl(e,t,n),Js=r):fl(e,t,n);break;default:fl(e,t,n)}}function hl(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Xs),t.forEach((function(t){var r=Pc.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function ml(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var o=n[r];try{var a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 5:ul=l.stateNode,dl=!1;break e;case 3:case 4:ul=l.stateNode.containerInfo,dl=!0;break e}l=l.return}if(null===ul)throw Error(i(160));pl(a,s,o),ul=null,dl=!1;var c=o.alternate;null!==c&&(c.return=null),o.return=null}catch(u){jc(o,t,u)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)gl(t,e),t=t.sibling}function gl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ml(t,e),xl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(g){jc(e,e.return,g)}try{nl(5,e,e.return)}catch(g){jc(e,e.return,g)}}break;case 1:ml(t,e),xl(e),512&r&&null!==n&&$s(n,n.return);break;case 5:if(ml(t,e),xl(e),512&r&&null!==n&&$s(n,n.return),32&e.flags){var o=e.stateNode;try{fe(o,"")}catch(g){jc(e,e.return,g)}}if(4&r&&null!=(o=e.stateNode)){var a=e.memoizedProps,s=null!==n?n.memoizedProps:a,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===a.type&&null!=a.name&&X(o,a),ye(l,s);var u=ye(l,a);for(s=0;s<c.length;s+=2){var d=c[s],f=c[s+1];"style"===d?ge(o,f):"dangerouslySetInnerHTML"===d?de(o,f):"children"===d?fe(o,f):y(o,d,f,u)}switch(l){case"input":Z(o,a);break;case"textarea":ie(o,a);break;case"select":var p=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var h=a.value;null!=h?ne(o,!!a.multiple,h,!1):p!==!!a.multiple&&(null!=a.defaultValue?ne(o,!!a.multiple,a.defaultValue,!0):ne(o,!!a.multiple,a.multiple?[]:"",!1))}o[ho]=a}catch(g){jc(e,e.return,g)}}break;case 6:if(ml(t,e),xl(e),4&r){if(null===e.stateNode)throw Error(i(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(g){jc(e,e.return,g)}}break;case 3:if(ml(t,e),xl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Wt(t.containerInfo)}catch(g){jc(e,e.return,g)}break;case 4:default:ml(t,e),xl(e);break;case 13:ml(t,e),xl(e),8192&(o=e.child).flags&&(a=null!==o.memoizedState,o.stateNode.isHidden=a,!a||null!==o.alternate&&null!==o.alternate.memoizedState||(Bl=Xe())),4&r&&hl(e);break;case 22:if(d=null!==n&&null!==n.memoizedState,1&e.mode?(Js=(u=Js)||d,ml(t,e),Js=u):ml(t,e),xl(e),8192&r){if(u=null!==e.memoizedState,(e.stateNode.isHidden=u)&&!d&&0!==(1&e.mode))for(Zs=e,d=e.child;null!==d;){for(f=Zs=d;null!==Zs;){switch(h=(p=Zs).child,p.tag){case 0:case 11:case 14:case 15:nl(4,p,p.return);break;case 1:$s(p,p.return);var m=p.stateNode;if("function"===typeof m.componentWillUnmount){r=p,n=p.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(g){jc(r,n,g)}}break;case 5:$s(p,p.return);break;case 22:if(null!==p.memoizedState){wl(f);continue}}null!==h?(h.return=p,Zs=h):wl(f)}d=d.sibling}e:for(d=null,f=e;;){if(5===f.tag){if(null===d){d=f;try{o=f.stateNode,u?"function"===typeof(a=o.style).setProperty?a.setProperty("display","none","important"):a.display="none":(l=f.stateNode,s=void 0!==(c=f.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=me("display",s))}catch(g){jc(e,e.return,g)}}}else if(6===f.tag){if(null===d)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(g){jc(e,e.return,g)}}else if((22!==f.tag&&23!==f.tag||null===f.memoizedState||f===e)&&null!==f.child){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;null===f.sibling;){if(null===f.return||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ml(t,e),xl(e),4&r&&hl(e);case 21:}}function xl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(al(n)){var r=n;break e}n=n.return}throw Error(i(160))}switch(r.tag){case 5:var o=r.stateNode;32&r.flags&&(fe(o,""),r.flags&=-33),cl(e,sl(e),o);break;case 3:case 4:var a=r.stateNode.containerInfo;ll(e,sl(e),a);break;default:throw Error(i(161))}}catch(s){jc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function vl(e,t,n){Zs=e,yl(e,t,n)}function yl(e,t,n){for(var r=0!==(1&e.mode);null!==Zs;){var o=Zs,i=o.child;if(22===o.tag&&r){var a=null!==o.memoizedState||Qs;if(!a){var s=o.alternate,l=null!==s&&null!==s.memoizedState||Js;s=Qs;var c=Js;if(Qs=a,(Js=l)&&!c)for(Zs=o;null!==Zs;)l=(a=Zs).child,22===a.tag&&null!==a.memoizedState?Sl(o):null!==l?(l.return=a,Zs=l):Sl(o);for(;null!==i;)Zs=i,yl(i,t,n),i=i.sibling;Zs=o,Qs=s,Js=c}bl(e)}else 0!==(8772&o.subtreeFlags)&&null!==i?(i.return=o,Zs=i):bl(e)}}function bl(e){for(;null!==Zs;){var t=Zs;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Js||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Js)if(null===n)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:ns(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;null!==a&&qi(t,a,r);break;case 3:var s=t.updateQueue;if(null!==s){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}qi(t,s,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var u=t.alternate;if(null!==u){var d=u.memoizedState;if(null!==d){var f=d.dehydrated;null!==f&&Wt(f)}}}break;default:throw Error(i(163))}Js||512&t.flags&&ol(t)}catch(p){jc(t,t.return,p)}}if(t===e){Zs=null;break}if(null!==(n=t.sibling)){n.return=t.return,Zs=n;break}Zs=t.return}}function wl(e){for(;null!==Zs;){var t=Zs;if(t===e){Zs=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Zs=n;break}Zs=t.return}}function Sl(e){for(;null!==Zs;){var t=Zs;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){jc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var o=t.return;try{r.componentDidMount()}catch(l){jc(t,o,l)}}var i=t.return;try{ol(t)}catch(l){jc(t,i,l)}break;case 5:var a=t.return;try{ol(t)}catch(l){jc(t,a,l)}}}catch(l){jc(t,t.return,l)}if(t===e){Zs=null;break}var s=t.sibling;if(null!==s){s.return=t.return,Zs=s;break}Zs=t.return}}var kl,jl=Math.ceil,El=b.ReactCurrentDispatcher,Cl=b.ReactCurrentOwner,Al=b.ReactCurrentBatchConfig,Pl=0,Nl=null,zl=null,Rl=0,Ol=0,Tl=Eo(0),Ll=0,Fl=null,Ml=0,Dl=0,_l=0,Il=null,Ul=null,Bl=0,Wl=1/0,Hl=null,ql=!1,Vl=null,Kl=null,Yl=!1,Gl=null,Ql=0,Jl=0,Xl=null,Zl=-1,$l=0;function ec(){return 0!==(6&Pl)?Xe():-1!==Zl?Zl:Zl=Xe()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Pl)&&0!==Rl?Rl&-Rl:null!==gi.transition?(0===$l&&($l=mt()),$l):0!==(e=yt)?e:e=void 0===(e=window.event)?16:Jt(e.type)}function nc(e,t,n,r){if(50<Jl)throw Jl=0,Xl=null,Error(i(185));xt(e,n,r),0!==(2&Pl)&&e===Nl||(e===Nl&&(0===(2&Pl)&&(Dl|=n),4===Ll&&sc(e,Rl)),rc(e,r),1===n&&0===Pl&&0===(1&t.mode)&&(Wl=Xe()+500,Uo&&Ho()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-at(i),s=1<<a,l=o[a];-1===l?0!==(s&n)&&0===(s&r)||(o[a]=pt(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}}(e,t);var r=ft(e,e===Nl?Rl:0);if(0===r)null!==n&&Ge(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ge(n),1===t)0===e.tag?function(e){Uo=!0,Wo(e)}(lc.bind(null,e)):Wo(lc.bind(null,e)),ao((function(){0===(6&Pl)&&Ho()})),n=null;else{switch(bt(r)){case 1:n=$e;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=Nc(n,oc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function oc(e,t){if(Zl=-1,$l=0,0!==(6&Pl))throw Error(i(327));var n=e.callbackNode;if(Sc()&&e.callbackNode!==n)return null;var r=ft(e,e===Nl?Rl:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=gc(e,r);else{t=r;var o=Pl;Pl|=2;var a=hc();for(Nl===e&&Rl===t||(Hl=null,Wl=Xe()+500,fc(e,t));;)try{vc();break}catch(l){pc(e,l)}Ai(),El.current=a,Pl=o,null!==zl?t=0:(Nl=null,Rl=0,t=Ll)}if(0!==t){if(2===t&&(0!==(o=ht(e))&&(r=o,t=ic(e,o))),1===t)throw n=Fl,fc(e,0),sc(e,r),rc(e,Xe()),n;if(6===t)sc(e,r);else{if(o=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!sr(i(),o))return!1}catch(s){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(o)&&(2===(t=gc(e,r))&&(0!==(a=ht(e))&&(r=a,t=ic(e,a))),1===t))throw n=Fl,fc(e,0),sc(e,r),rc(e,Xe()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(i(345));case 2:case 5:wc(e,Ul,Hl);break;case 3:if(sc(e,r),(130023424&r)===r&&10<(t=Bl+500-Xe())){if(0!==ft(e,0))break;if(((o=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ro(wc.bind(null,e,Ul,Hl),t);break}wc(e,Ul,Hl);break;case 4:if(sc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,o=-1;0<r;){var s=31-at(r);a=1<<s,(s=t[s])>o&&(o=s),r&=~a}if(r=o,10<(r=(120>(r=Xe()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*jl(r/1960))-r)){e.timeoutHandle=ro(wc.bind(null,e,Ul,Hl),r);break}wc(e,Ul,Hl);break;default:throw Error(i(329))}}}return rc(e,Xe()),e.callbackNode===n?oc.bind(null,e):null}function ic(e,t){var n=Il;return e.current.memoizedState.isDehydrated&&(fc(e,t).flags|=256),2!==(e=gc(e,t))&&(t=Ul,Ul=n,null!==t&&ac(t)),e}function ac(e){null===Ul?Ul=e:Ul.push.apply(Ul,e)}function sc(e,t){for(t&=~_l,t&=~Dl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-at(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Pl))throw Error(i(327));Sc();var t=ft(e,0);if(0===(1&t))return rc(e,Xe()),null;var n=gc(e,t);if(0!==e.tag&&2===n){var r=ht(e);0!==r&&(t=r,n=ic(e,r))}if(1===n)throw n=Fl,fc(e,0),sc(e,t),rc(e,Xe()),n;if(6===n)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,Ul,Hl),rc(e,Xe()),null}function cc(e,t){var n=Pl;Pl|=1;try{return e(t)}finally{0===(Pl=n)&&(Wl=Xe()+500,Uo&&Ho())}}function uc(e){null!==Gl&&0===Gl.tag&&0===(6&Pl)&&Sc();var t=Pl;Pl|=1;var n=Al.transition,r=yt;try{if(Al.transition=null,yt=1,e)return e()}finally{yt=r,Al.transition=n,0===(6&(Pl=t))&&Ho()}}function dc(){Ol=Tl.current,Co(Tl)}function fc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,oo(n)),null!==zl)for(n=zl.return;null!==n;){var r=n;switch(ni(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&Lo();break;case 3:Xi(),Co(zo),Co(No),ra();break;case 5:$i(r);break;case 4:Xi();break;case 13:case 19:Co(ea);break;case 10:Pi(r.type._context);break;case 22:case 23:dc()}n=n.return}if(Nl=e,zl=e=Tc(e.current,null),Rl=Ol=t,Ll=0,Fl=null,_l=Dl=Ml=0,Ul=Il=null,null!==Oi){for(t=0;t<Oi.length;t++)if(null!==(r=(n=Oi[t]).interleaved)){n.interleaved=null;var o=r.next,i=n.pending;if(null!==i){var a=i.next;i.next=o,r.next=a}n.pending=r}Oi=null}return e}function pc(e,t){for(;;){var n=zl;try{if(Ai(),oa.current=Za,ua){for(var r=sa.memoizedState;null!==r;){var o=r.queue;null!==o&&(o.pending=null),r=r.next}ua=!1}if(aa=0,ca=la=sa=null,da=!1,fa=0,Cl.current=null,null===n||null===n.return){Ll=1,Fl=t,zl=null;break}e:{var a=e,s=n.return,l=n,c=t;if(t=Rl,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var u=c,d=l,f=d.tag;if(0===(1&d.mode)&&(0===f||11===f||15===f)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var h=gs(s);if(null!==h){h.flags&=-257,xs(h,s,l,0,t),1&h.mode&&ms(a,u,t),c=u;var m=(t=h).updateQueue;if(null===m){var g=new Set;g.add(c),t.updateQueue=g}else m.add(c);break e}if(0===(1&t)){ms(a,u,t),mc();break e}c=Error(i(426))}else if(ii&&1&l.mode){var x=gs(s);if(null!==x){0===(65536&x.flags)&&(x.flags|=256),xs(x,s,l,0,t),mi(cs(c,l));break e}}a=c=cs(c,l),4!==Ll&&(Ll=2),null===Il?Il=[a]:Il.push(a),a=s;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t,Wi(a,ps(0,c,t));break e;case 1:l=c;var v=a.type,y=a.stateNode;if(0===(128&a.flags)&&("function"===typeof v.getDerivedStateFromError||null!==y&&"function"===typeof y.componentDidCatch&&(null===Kl||!Kl.has(y)))){a.flags|=65536,t&=-t,a.lanes|=t,Wi(a,hs(a,l,t));break e}}a=a.return}while(null!==a)}bc(n)}catch(b){t=b,zl===n&&null!==n&&(zl=n=n.return);continue}break}}function hc(){var e=El.current;return El.current=Za,null===e?Za:e}function mc(){0!==Ll&&3!==Ll&&2!==Ll||(Ll=4),null===Nl||0===(268435455&Ml)&&0===(268435455&Dl)||sc(Nl,Rl)}function gc(e,t){var n=Pl;Pl|=2;var r=hc();for(Nl===e&&Rl===t||(Hl=null,fc(e,t));;)try{xc();break}catch(o){pc(e,o)}if(Ai(),Pl=n,El.current=r,null!==zl)throw Error(i(261));return Nl=null,Rl=0,Ll}function xc(){for(;null!==zl;)yc(zl)}function vc(){for(;null!==zl&&!Qe();)yc(zl)}function yc(e){var t=kl(e.alternate,e,Ol);e.memoizedProps=e.pendingProps,null===t?bc(e):zl=t,Cl.current=null}function bc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Ys(n,t,Ol)))return void(zl=n)}else{if(null!==(n=Gs(n,t)))return n.flags&=32767,void(zl=n);if(null===e)return Ll=6,void(zl=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(zl=t);zl=t=e}while(null!==t);0===Ll&&(Ll=5)}function wc(e,t,n){var r=yt,o=Al.transition;try{Al.transition=null,yt=1,function(e,t,n,r){do{Sc()}while(null!==Gl);if(0!==(6&Pl))throw Error(i(327));n=e.finishedWork;var o=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-at(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}(e,a),e===Nl&&(zl=Nl=null,Rl=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Yl||(Yl=!0,Nc(tt,(function(){return Sc(),null}))),a=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||a){a=Al.transition,Al.transition=null;var s=yt;yt=1;var l=Pl;Pl|=4,Cl.current=null,function(e,t){if(eo=qt,pr(e=fr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch(w){n=null;break e}var s=0,l=-1,c=-1,u=0,d=0,f=e,p=null;t:for(;;){for(var h;f!==n||0!==o&&3!==f.nodeType||(l=s+o),f!==a||0!==r&&3!==f.nodeType||(c=s+r),3===f.nodeType&&(s+=f.nodeValue.length),null!==(h=f.firstChild);)p=f,f=h;for(;;){if(f===e)break t;if(p===n&&++u===o&&(l=s),p===a&&++d===r&&(c=s),null!==(h=f.nextSibling))break;p=(f=p).parentNode}f=h}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(to={focusedElem:e,selectionRange:n},qt=!1,Zs=t;null!==Zs;)if(e=(t=Zs).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Zs=e;else for(;null!==Zs;){t=Zs;try{var m=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==m){var g=m.memoizedProps,x=m.memoizedState,v=t.stateNode,y=v.getSnapshotBeforeUpdate(t.elementType===t.type?g:ns(t.type,g),x);v.__reactInternalSnapshotBeforeUpdate=y}break;case 3:var b=t.stateNode.containerInfo;1===b.nodeType?b.textContent="":9===b.nodeType&&b.documentElement&&b.removeChild(b.documentElement);break;default:throw Error(i(163))}}catch(w){jc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Zs=e;break}Zs=t.return}m=tl,tl=!1}(e,n),gl(n,e),hr(to),qt=!!eo,to=eo=null,e.current=n,vl(n,e,o),Je(),Pl=l,yt=s,Al.transition=a}else e.current=n;if(Yl&&(Yl=!1,Gl=e,Ql=o),a=e.pendingLanes,0===a&&(Kl=null),function(e){if(it&&"function"===typeof it.onCommitFiberRoot)try{it.onCommitFiberRoot(ot,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Xe()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(ql)throw ql=!1,e=Vl,Vl=null,e;0!==(1&Ql)&&0!==e.tag&&Sc(),a=e.pendingLanes,0!==(1&a)?e===Xl?Jl++:(Jl=0,Xl=e):Jl=0,Ho()}(e,t,n,r)}finally{Al.transition=o,yt=r}return null}function Sc(){if(null!==Gl){var e=bt(Ql),t=Al.transition,n=yt;try{if(Al.transition=null,yt=16>e?16:e,null===Gl)var r=!1;else{if(e=Gl,Gl=null,Ql=0,0!==(6&Pl))throw Error(i(331));var o=Pl;for(Pl|=4,Zs=e.current;null!==Zs;){var a=Zs,s=a.child;if(0!==(16&Zs.flags)){var l=a.deletions;if(null!==l){for(var c=0;c<l.length;c++){var u=l[c];for(Zs=u;null!==Zs;){var d=Zs;switch(d.tag){case 0:case 11:case 15:nl(8,d,a)}var f=d.child;if(null!==f)f.return=d,Zs=f;else for(;null!==Zs;){var p=(d=Zs).sibling,h=d.return;if(il(d),d===u){Zs=null;break}if(null!==p){p.return=h,Zs=p;break}Zs=h}}}var m=a.alternate;if(null!==m){var g=m.child;if(null!==g){m.child=null;do{var x=g.sibling;g.sibling=null,g=x}while(null!==g)}}Zs=a}}if(0!==(2064&a.subtreeFlags)&&null!==s)s.return=a,Zs=s;else e:for(;null!==Zs;){if(0!==(2048&(a=Zs).flags))switch(a.tag){case 0:case 11:case 15:nl(9,a,a.return)}var v=a.sibling;if(null!==v){v.return=a.return,Zs=v;break e}Zs=a.return}}var y=e.current;for(Zs=y;null!==Zs;){var b=(s=Zs).child;if(0!==(2064&s.subtreeFlags)&&null!==b)b.return=s,Zs=b;else e:for(s=y;null!==Zs;){if(0!==(2048&(l=Zs).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(S){jc(l,l.return,S)}if(l===s){Zs=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Zs=w;break e}Zs=l.return}}if(Pl=o,Ho(),it&&"function"===typeof it.onPostCommitFiberRoot)try{it.onPostCommitFiberRoot(ot,e)}catch(S){}r=!0}return r}finally{yt=n,Al.transition=t}}return!1}function kc(e,t,n){e=Ui(e,t=ps(0,t=cs(n,t),1),1),t=ec(),null!==e&&(xt(e,1,t),rc(e,t))}function jc(e,t,n){if(3===e.tag)kc(e,e,n);else for(;null!==t;){if(3===t.tag){kc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Kl||!Kl.has(r))){t=Ui(t,e=hs(t,e=cs(n,e),1),1),e=ec(),null!==t&&(xt(t,1,e),rc(t,e));break}}t=t.return}}function Ec(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,Nl===e&&(Rl&n)===n&&(4===Ll||3===Ll&&(130023424&Rl)===Rl&&500>Xe()-Bl?fc(e,0):_l|=n),rc(e,t)}function Cc(e,t){0===t&&(0===(1&e.mode)?t=1:(t=ut,0===(130023424&(ut<<=1))&&(ut=4194304)));var n=ec();null!==(e=Fi(e,t))&&(xt(e,t,n),rc(e,n))}function Ac(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Cc(e,n)}function Pc(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;null!==o&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(i(314))}null!==r&&r.delete(t),Cc(e,n)}function Nc(e,t){return Ye(e,t)}function zc(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rc(e,t,n,r){return new zc(e,t,n,r)}function Oc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Tc(e,t){var n=e.alternate;return null===n?((n=Rc(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Lc(e,t,n,r,o,a){var s=2;if(r=e,"function"===typeof e)Oc(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case k:return Fc(n.children,o,a,t);case j:s=8,o|=8;break;case E:return(e=Rc(12,n,t,2|o)).elementType=E,e.lanes=a,e;case N:return(e=Rc(13,n,t,o)).elementType=N,e.lanes=a,e;case z:return(e=Rc(19,n,t,o)).elementType=z,e.lanes=a,e;case T:return Mc(n,o,a,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case C:s=10;break e;case A:s=9;break e;case P:s=11;break e;case R:s=14;break e;case O:s=16,r=null;break e}throw Error(i(130,null==e?e:typeof e,""))}return(t=Rc(s,n,t,o)).elementType=e,t.type=r,t.lanes=a,t}function Fc(e,t,n,r){return(e=Rc(7,e,r,t)).lanes=n,e}function Mc(e,t,n,r){return(e=Rc(22,e,r,t)).elementType=T,e.lanes=n,e.stateNode={isHidden:!1},e}function Dc(e,t,n){return(e=Rc(6,e,null,t)).lanes=n,e}function _c(e,t,n){return(t=Rc(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ic(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gt(0),this.expirationTimes=gt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Uc(e,t,n,r,o,i,a,s,l){return e=new Ic(e,t,n,s,l),1===t?(t=1,!0===i&&(t|=8)):t=0,i=Rc(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Di(i),e}function Bc(e){if(!e)return Po;e:{if(We(e=e._reactInternals)!==e||1!==e.tag)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(To(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(i(171))}if(1===e.tag){var n=e.type;if(To(n))return Mo(e,n,t)}return t}function Wc(e,t,n,r,o,i,a,s,l){return(e=Uc(n,r,!0,e,0,i,0,s,l)).context=Bc(null),n=e.current,(i=Ii(r=ec(),o=tc(n))).callback=void 0!==t&&null!==t?t:null,Ui(n,i,o),e.current.lanes=o,xt(e,o,r),rc(e,r),e}function Hc(e,t,n,r){var o=t.current,i=ec(),a=tc(o);return n=Bc(n),null===t.context?t.context=n:t.pendingContext=n,(t=Ii(i,a)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=Ui(o,t,a))&&(nc(e,o,a,i),Bi(e,o,a)),a}function qc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Vc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Kc(e,t){Vc(e,t),(e=e.alternate)&&Vc(e,t)}kl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||zo.current)ys=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return ys=!1,function(e,t,n){switch(t.tag){case 3:Ns(t),hi();break;case 5:Zi(t);break;case 1:To(t.type)&&Do(t);break;case 4:Ji(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ao(ki,r._currentValue),r._currentValue=o;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Ao(ea,1&ea.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Ds(e,t,n):(Ao(ea,1&ea.current),null!==(e=qs(e,t,n))?e.sibling:null);Ao(ea,1&ea.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Ws(e,t,n);t.flags|=128}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ao(ea,ea.current),r)break;return null;case 22:case 23:return t.lanes=0,js(e,t,n)}return qs(e,t,n)}(e,t,n);ys=0!==(131072&e.flags)}else ys=!1,ii&&0!==(1048576&t.flags)&&ei(t,Yo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Hs(e,t),e=t.pendingProps;var o=Oo(t,No.current);zi(t,n),o=ga(null,t,r,e,o,n);var a=xa();return t.flags|=1,"object"===typeof o&&null!==o&&"function"===typeof o.render&&void 0===o.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,To(r)?(a=!0,Do(t)):a=!1,t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,Di(t),o.updater=os,t.stateNode=o,o._reactInternals=t,ls(t,r,e,n),t=Ps(null,t,r,!0,a,n)):(t.tag=0,ii&&a&&ti(t),bs(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Hs(e,t),e=t.pendingProps,r=(o=r._init)(r._payload),t.type=r,o=t.tag=function(e){if("function"===typeof e)return Oc(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===P)return 11;if(e===R)return 14}return 2}(r),e=ns(r,e),o){case 0:t=Cs(null,t,r,e,n);break e;case 1:t=As(null,t,r,e,n);break e;case 11:t=ws(null,t,r,e,n);break e;case 14:t=Ss(null,t,r,ns(r.type,e),n);break e}throw Error(i(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,Cs(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 1:return r=t.type,o=t.pendingProps,As(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 3:e:{if(Ns(t),null===e)throw Error(i(387));r=t.pendingProps,o=(a=t.memoizedState).element,_i(e,t),Hi(t,r,null,n);var s=t.memoizedState;if(r=s.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=zs(e,t,r,n,o=cs(Error(i(423)),t));break e}if(r!==o){t=zs(e,t,r,n,o=cs(Error(i(424)),t));break e}for(oi=co(t.stateNode.containerInfo.firstChild),ri=t,ii=!0,ai=null,n=Si(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(hi(),r===o){t=qs(e,t,n);break e}bs(e,t,r,n)}t=t.child}return t;case 5:return Zi(t),null===e&&ui(t),r=t.type,o=t.pendingProps,a=null!==e?e.memoizedProps:null,s=o.children,no(r,o)?s=null:null!==a&&no(r,a)&&(t.flags|=32),Es(e,t),bs(e,t,s,n),t.child;case 6:return null===e&&ui(t),null;case 13:return Ds(e,t,n);case 4:return Ji(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=wi(t,null,r,n):bs(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,ws(e,t,r,o=t.elementType===r?o:ns(r,o),n);case 7:return bs(e,t,t.pendingProps,n),t.child;case 8:case 12:return bs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,a=t.memoizedProps,s=o.value,Ao(ki,r._currentValue),r._currentValue=s,null!==a)if(sr(a.value,s)){if(a.children===o.children&&!zo.current){t=qs(e,t,n);break e}}else for(null!==(a=t.child)&&(a.return=t);null!==a;){var l=a.dependencies;if(null!==l){s=a.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===a.tag){(c=Ii(-1,n&-n)).tag=2;var u=a.updateQueue;if(null!==u){var d=(u=u.shared).pending;null===d?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}a.lanes|=n,null!==(c=a.alternate)&&(c.lanes|=n),Ni(a.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===a.tag)s=a.type===t.type?null:a.child;else if(18===a.tag){if(null===(s=a.return))throw Error(i(341));s.lanes|=n,null!==(l=s.alternate)&&(l.lanes|=n),Ni(s,n,t),s=a.sibling}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===t){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}bs(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,zi(t,n),r=r(o=Ri(o)),t.flags|=1,bs(e,t,r,n),t.child;case 14:return o=ns(r=t.type,t.pendingProps),Ss(e,t,r,o=ns(r.type,o),n);case 15:return ks(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:ns(r,o),Hs(e,t),t.tag=1,To(r)?(e=!0,Do(t)):e=!1,zi(t,n),as(t,r,o),ls(t,r,o,n),Ps(null,t,r,!0,e,n);case 19:return Ws(e,t,n);case 22:return js(e,t,n)}throw Error(i(156,t.tag))};var Yc="function"===typeof reportError?reportError:function(e){console.error(e)};function Gc(e){this._internalRoot=e}function Qc(e){this._internalRoot=e}function Jc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Xc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Zc(){}function $c(e,t,n,r,o){var i=n._reactRootContainer;if(i){var a=i;if("function"===typeof o){var s=o;o=function(){var e=qc(a);s.call(e)}}Hc(t,a,e,o)}else a=function(e,t,n,r,o){if(o){if("function"===typeof r){var i=r;r=function(){var e=qc(a);i.call(e)}}var a=Wc(t,r,e,0,null,!1,0,"",Zc);return e._reactRootContainer=a,e[mo]=a.current,Wr(8===e.nodeType?e.parentNode:e),uc(),a}for(;o=e.lastChild;)e.removeChild(o);if("function"===typeof r){var s=r;r=function(){var e=qc(l);s.call(e)}}var l=Uc(e,0,!1,null,0,!1,0,"",Zc);return e._reactRootContainer=l,e[mo]=l.current,Wr(8===e.nodeType?e.parentNode:e),uc((function(){Hc(t,l,n,r)})),l}(n,t,e,o,r);return qc(a)}Qc.prototype.render=Gc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(i(409));Hc(e,t,null,null)},Qc.prototype.unmount=Gc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;uc((function(){Hc(null,e,null,null)})),t[mo]=null}},Qc.prototype.unstable_scheduleHydration=function(e){if(e){var t=jt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Tt.length&&0!==t&&t<Tt[n].priority;n++);Tt.splice(n,0,e),0===n&&Dt(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=dt(t.pendingLanes);0!==n&&(vt(t,1|n),rc(t,Xe()),0===(6&Pl)&&(Wl=Xe()+500,Ho()))}break;case 13:uc((function(){var t=Fi(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}})),Kc(e,1)}},St=function(e){if(13===e.tag){var t=Fi(e,134217728);if(null!==t)nc(t,e,134217728,ec());Kc(e,134217728)}},kt=function(e){if(13===e.tag){var t=tc(e),n=Fi(e,t);if(null!==n)nc(n,e,t,ec());Kc(e,t)}},jt=function(){return yt},Et=function(e,t){var n=yt;try{return yt=e,t()}finally{yt=n}},Se=function(e,t,n){switch(t){case"input":if(Z(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=So(r);if(!o)throw Error(i(90));Y(r),Z(r,o)}}}break;case"textarea":ie(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Pe=cc,Ne=uc;var eu={usingClientEntryPoint:!1,Events:[bo,wo,So,Ce,Ae,cc]},tu={findFiberByHostInstance:yo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nu={bundleType:tu.bundleType,version:tu.version,rendererPackageName:tu.rendererPackageName,rendererConfig:tu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ve(e))?null:e.stateNode},findFiberByHostInstance:tu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ru=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ru.isDisabled&&ru.supportsFiber)try{ot=ru.inject(nu),it=ru}catch(ue){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=eu,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Jc(t))throw Error(i(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:S,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Jc(e))throw Error(i(299));var n=!1,r="",o=Yc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(o=t.onRecoverableError)),t=Uc(e,1,!1,null,0,n,0,r,o),e[mo]=t.current,Wr(8===e.nodeType?e.parentNode:e),new Gc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(i(188));throw e=Object.keys(e).join(","),Error(i(268,e))}return e=null===(e=Ve(t))?null:e.stateNode},t.flushSync=function(e){return uc(e)},t.hydrate=function(e,t,n){if(!Xc(t))throw Error(i(200));return $c(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Jc(e))throw Error(i(405));var r=null!=n&&n.hydratedSources||null,o=!1,a="",s=Yc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(o=!0),void 0!==n.identifierPrefix&&(a=n.identifierPrefix),void 0!==n.onRecoverableError&&(s=n.onRecoverableError)),t=Wc(t,null,e,1,null!=n?n:null,o,0,a,s),e[mo]=t.current,Wr(e),r)for(e=0;e<r.length;e++)o=(o=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Qc(t)},t.render=function(e,t,n){if(!Xc(t))throw Error(i(200));return $c(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Xc(e))throw Error(i(40));return!!e._reactRootContainer&&(uc((function(){$c(null,null,e,!1,(function(){e._reactRootContainer=null,e[mo]=null}))})),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Xc(n))throw Error(i(200));if(null==e||void 0===e._reactInternals)throw Error(i(38));return $c(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},2859:(e,t,n)=>{"use strict";n.d(t,{A:()=>o,g:()=>r});var r="http://www.w3.org/1999/xhtml";const o={svg:"http://www.w3.org/2000/svg",xhtml:r,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"}},2973:(e,t,n)=>{"use strict";function r(e){return function(){return this.matches(e)}}function o(e){return function(t){return t.matches(e)}}n.d(t,{A:()=>r,j:()=>o})},3036:(e,t,n)=>{"use strict";n.d(t,{LN:()=>ne,Ay:()=>oe,zr:()=>te});var r=n(3614);var o=n(1382),i=n(155);var a=n(2973),s=Array.prototype.find;function l(){return this.firstElementChild}var c=Array.prototype.filter;function u(){return this.children}function d(e){return new Array(e.length)}function f(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function p(e,t,n,r,o,i){for(var a,s=0,l=t.length,c=i.length;s<c;++s)(a=t[s])?(a.__data__=i[s],r[s]=a):n[s]=new f(e,i[s]);for(;s<l;++s)(a=t[s])&&(o[s]=a)}function h(e,t,n,r,o,i,a){var s,l,c,u=new Map,d=t.length,p=i.length,h=new Array(d);for(s=0;s<d;++s)(l=t[s])&&(h[s]=c=a.call(l,l.__data__,s,t)+"",u.has(c)?o[s]=l:u.set(c,l));for(s=0;s<p;++s)c=a.call(e,i[s],s,i)+"",(l=u.get(c))?(r[s]=l,l.__data__=i[s],u.delete(c)):n[s]=new f(e,i[s]);for(s=0;s<d;++s)(l=t[s])&&u.get(h[s])===l&&(o[s]=l)}function m(e){return e.__data__}function g(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}f.prototype={constructor:f,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};var x=n(6084);function v(e){return function(){this.removeAttribute(e)}}function y(e){return function(){this.removeAttributeNS(e.space,e.local)}}function b(e,t){return function(){this.setAttribute(e,t)}}function w(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function S(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function k(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}var j=n(1443);function E(e){return function(){delete this[e]}}function C(e,t){return function(){this[e]=t}}function A(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function P(e){return e.trim().split(/^|\s+/)}function N(e){return e.classList||new z(e)}function z(e){this._node=e,this._names=P(e.getAttribute("class")||"")}function R(e,t){for(var n=N(e),r=-1,o=t.length;++r<o;)n.add(t[r])}function O(e,t){for(var n=N(e),r=-1,o=t.length;++r<o;)n.remove(t[r])}function T(e){return function(){R(this,e)}}function L(e){return function(){O(this,e)}}function F(e,t){return function(){(t.apply(this,arguments)?R:O)(this,e)}}function M(){this.textContent=""}function D(e){return function(){this.textContent=e}}function _(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?"":t}}function I(){this.innerHTML=""}function U(e){return function(){this.innerHTML=e}}function B(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?"":t}}function W(){this.nextSibling&&this.parentNode.appendChild(this)}function H(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}z.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};var q=n(1359);function V(){return null}function K(){var e=this.parentNode;e&&e.removeChild(this)}function Y(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function G(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Q(e){return function(){var t=this.__on;if(t){for(var n,r=0,o=-1,i=t.length;r<i;++r)n=t[r],e.type&&n.type!==e.type||n.name!==e.name?t[++o]=n:this.removeEventListener(n.type,n.listener,n.options);++o?t.length=o:delete this.__on}}}function J(e,t,n){return function(){var r,o=this.__on,i=function(e){return function(t){e.call(this,t,this.__data__)}}(t);if(o)for(var a=0,s=o.length;a<s;++a)if((r=o[a]).type===e.type&&r.name===e.name)return this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=i,r.options=n),void(r.value=t);this.addEventListener(e.type,i,n),r={type:e.type,name:e.name,value:t,listener:i,options:n},o?o.push(r):this.__on=[r]}}var X=n(8683);function Z(e,t,n){var r=(0,X.A)(e),o=r.CustomEvent;"function"===typeof o?o=new o(t,n):(o=r.document.createEvent("Event"),n?(o.initEvent(t,n.bubbles,n.cancelable),o.detail=n.detail):o.initEvent(t,!1,!1)),e.dispatchEvent(o)}function $(e,t){return function(){return Z(this,e,t)}}function ee(e,t){return function(){return Z(this,e,t.apply(this,arguments))}}var te=[null];function ne(e,t){this._groups=e,this._parents=t}function re(){return new ne([[document.documentElement]],te)}ne.prototype=re.prototype={constructor:ne,select:function(e){"function"!==typeof e&&(e=(0,r.A)(e));for(var t=this._groups,n=t.length,o=new Array(n),i=0;i<n;++i)for(var a,s,l=t[i],c=l.length,u=o[i]=new Array(c),d=0;d<c;++d)(a=l[d])&&(s=e.call(a,a.__data__,d,l))&&("__data__"in a&&(s.__data__=a.__data__),u[d]=s);return new ne(o,this._parents)},selectAll:function(e){e="function"===typeof e?function(e){return function(){var t=e.apply(this,arguments);return null==t?[]:(0,o.A)(t)}}(e):(0,i.A)(e);for(var t=this._groups,n=t.length,r=[],a=[],s=0;s<n;++s)for(var l,c=t[s],u=c.length,d=0;d<u;++d)(l=c[d])&&(r.push(e.call(l,l.__data__,d,c)),a.push(l));return new ne(r,a)},selectChild:function(e){return this.select(null==e?l:function(e){return function(){return s.call(this.children,e)}}("function"===typeof e?e:(0,a.j)(e)))},selectChildren:function(e){return this.selectAll(null==e?u:function(e){return function(){return c.call(this.children,e)}}("function"===typeof e?e:(0,a.j)(e)))},filter:function(e){"function"!==typeof e&&(e=(0,a.A)(e));for(var t=this._groups,n=t.length,r=new Array(n),o=0;o<n;++o)for(var i,s=t[o],l=s.length,c=r[o]=[],u=0;u<l;++u)(i=s[u])&&e.call(i,i.__data__,u,s)&&c.push(i);return new ne(r,this._parents)},data:function(e,t){if(!arguments.length)return Array.from(this,m);var n,r=t?h:p,i=this._parents,a=this._groups;"function"!==typeof e&&(n=e,e=function(){return n});for(var s=a.length,l=new Array(s),c=new Array(s),u=new Array(s),d=0;d<s;++d){var f=i[d],g=a[d],x=g.length,v=(0,o.A)(e.call(f,f&&f.__data__,d,i)),y=v.length,b=c[d]=new Array(y),w=l[d]=new Array(y);r(f,g,b,w,u[d]=new Array(x),v,t);for(var S,k,j=0,E=0;j<y;++j)if(S=b[j]){for(j>=E&&(E=j+1);!(k=w[E])&&++E<y;);S._next=k||null}}return(l=new ne(l,i))._enter=c,l._exit=u,l},enter:function(){return new ne(this._enter||this._groups.map(d),this._parents)},exit:function(){return new ne(this._exit||this._groups.map(d),this._parents)},join:function(e,t,n){var r=this.enter(),o=this,i=this.exit();return r="function"===typeof e?e(r):r.append(e+""),null!=t&&(o=t(o)),null==n?i.remove():n(i),r&&o?r.merge(o).order():o},merge:function(e){if(!(e instanceof ne))throw new Error("invalid merge");for(var t=this._groups,n=e._groups,r=t.length,o=n.length,i=Math.min(r,o),a=new Array(r),s=0;s<i;++s)for(var l,c=t[s],u=n[s],d=c.length,f=a[s]=new Array(d),p=0;p<d;++p)(l=c[p]||u[p])&&(f[p]=l);for(;s<r;++s)a[s]=t[s];return new ne(a,this._parents)},selection:function(){return this},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r,o=e[t],i=o.length-1,a=o[i];--i>=0;)(r=o[i])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=g);for(var n=this._groups,r=n.length,o=new Array(r),i=0;i<r;++i){for(var a,s=n[i],l=s.length,c=o[i]=new Array(l),u=0;u<l;++u)(a=s[u])&&(c[u]=a);c.sort(t)}return new ne(o,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],o=0,i=r.length;o<i;++o){var a=r[o];if(a)return a}return null},size:function(){let e=0;for(const t of this)++e;return e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var o,i=t[n],a=0,s=i.length;a<s;++a)(o=i[a])&&e.call(o,o.__data__,a,i);return this},attr:function(e,t){var n=(0,x.A)(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==t?n.local?y:v:"function"===typeof t?n.local?k:S:n.local?w:b)(n,t))},style:j.A,property:function(e,t){return arguments.length>1?this.each((null==t?E:"function"===typeof t?A:C)(e,t)):this.node()[e]},classed:function(e,t){var n=P(e+"");if(arguments.length<2){for(var r=N(this.node()),o=-1,i=n.length;++o<i;)if(!r.contains(n[o]))return!1;return!0}return this.each(("function"===typeof t?F:t?T:L)(n,t))},text:function(e){return arguments.length?this.each(null==e?M:("function"===typeof e?_:D)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?I:("function"===typeof e?B:U)(e)):this.node().innerHTML},raise:function(){return this.each(W)},lower:function(){return this.each(H)},append:function(e){var t="function"===typeof e?e:(0,q.A)(e);return this.select((function(){return this.appendChild(t.apply(this,arguments))}))},insert:function(e,t){var n="function"===typeof e?e:(0,q.A)(e),o=null==t?V:"function"===typeof t?t:(0,r.A)(t);return this.select((function(){return this.insertBefore(n.apply(this,arguments),o.apply(this,arguments)||null)}))},remove:function(){return this.each(K)},clone:function(e){return this.select(e?G:Y)},datum:function(e){return arguments.length?this.property("__data__",e):this.node().__data__},on:function(e,t,n){var r,o,i=function(e){return e.trim().split(/^|\s+/).map((function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}}))}(e+""),a=i.length;if(!(arguments.length<2)){for(s=t?J:Q,r=0;r<a;++r)this.each(s(i[r],t,n));return this}var s=this.node().__on;if(s)for(var l,c=0,u=s.length;c<u;++c)for(r=0,l=s[c];r<a;++r)if((o=i[r]).type===l.type&&o.name===l.name)return l.value},dispatch:function(e,t){return this.each(("function"===typeof t?ee:$)(e,t))},[Symbol.iterator]:function*(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r,o=e[t],i=0,a=o.length;i<a;++i)(r=o[i])&&(yield r)}};const oe=re},3218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3460:(e,t,n)=>{"use strict";function r(e){let t;for(;t=e.sourceEvent;)e=t;return e}n.d(t,{A:()=>r})},3614:(e,t,n)=>{"use strict";function r(){}function o(e){return null==e?r:function(){return this.querySelector(e)}}n.d(t,{A:()=>o})},3719:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(3036);function o(e){return"string"===typeof e?new r.LN([[document.querySelector(e)]],[document.documentElement]):new r.LN([[e]],r.zr)}},4202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function x(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}function v(){}function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=x.prototype;var b=y.prototype=new v;b.constructor=y,m(b,x.prototype),b.isPureReactComponent=!0;var w=Array.isArray,S=Object.prototype.hasOwnProperty,k={current:null},j={key:!0,ref:!0,__self:!0,__source:!0};function E(e,t,r){var o,i={},a=null,s=null;if(null!=t)for(o in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(a=""+t.key),t)S.call(t,o)&&!j.hasOwnProperty(o)&&(i[o]=t[o]);var l=arguments.length-2;if(1===l)i.children=r;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(o in l=e.defaultProps)void 0===i[o]&&(i[o]=l[o]);return{$$typeof:n,type:e,key:a,ref:s,props:i,_owner:k.current}}function C(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var A=/\/+/g;function P(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function N(e,t,o,i,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return a=a(l=e),e=""===i?"."+P(l,0):i,w(a)?(o="",null!=e&&(o=e.replace(A,"$&/")+"/"),N(a,t,o,"",(function(e){return e}))):null!=a&&(C(a)&&(a=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,o+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(A,"$&/")+"/")+e)),t.push(a)),1;if(l=0,i=""===i?".":i+":",w(e))for(var c=0;c<e.length;c++){var u=i+P(s=e[c],c);l+=N(s,t,o,u,a)}else if(u=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"===typeof u)for(e=u.call(e),c=0;!(s=e.next()).done;)l+=N(s=s.value,t,o,u=i+P(s,c++),a);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function z(e,t,n){if(null==e)return e;var r=[],o=0;return N(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function R(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var O={current:null},T={transition:null},L={ReactCurrentDispatcher:O,ReactCurrentBatchConfig:T,ReactCurrentOwner:k};function F(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:z,forEach:function(e,t,n){z(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return z(e,(function(){t++})),t},toArray:function(e){return z(e,(function(e){return e}))||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=x,t.Fragment=o,t.Profiler=a,t.PureComponent=y,t.StrictMode=i,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,t.act=F,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),i=e.key,a=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,s=k.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)S.call(t,c)&&!j.hasOwnProperty(c)&&(o[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];o.children=l}return{$$typeof:n,type:e.type,key:i,ref:a,props:o,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=E,t.createFactory=function(e){var t=E.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:R}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=T.transition;T.transition={};try{e()}finally{T.transition=t}},t.unstable_act=F,t.useCallback=function(e,t){return O.current.useCallback(e,t)},t.useContext=function(e){return O.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return O.current.useDeferredValue(e)},t.useEffect=function(e,t){return O.current.useEffect(e,t)},t.useId=function(){return O.current.useId()},t.useImperativeHandle=function(e,t,n){return O.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return O.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return O.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return O.current.useMemo(e,t)},t.useReducer=function(e,t,n){return O.current.useReducer(e,t,n)},t.useRef=function(e){return O.current.useRef(e)},t.useState=function(e){return O.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return O.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return O.current.useTransition()},t.version="18.3.1"},4391:(e,t,n)=>{"use strict";var r=n(7950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},5043:(e,t,n)=>{"use strict";e.exports=n(4202)},5173:(e,t,n)=>{e.exports=n(1497)()},6084:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(2859);function o(e){var t=e+="",n=t.indexOf(":");return n>=0&&"xmlns"!==(t=e.slice(0,n))&&(e=e.slice(n+1)),r.A.hasOwnProperty(t)?{space:r.A[t],local:e}:e}},7234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<i(o,t)))break e;e[r]=t,e[n]=o,n=r}}function r(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,a=o>>>1;r<a;){var s=2*(r+1)-1,l=e[s],c=s+1,u=e[c];if(0>i(l,n))c<o&&0>i(u,l)?(e[r]=u,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<o&&0>i(u,n)))break e;e[r]=u,e[c]=n,r=c}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,f=null,p=3,h=!1,m=!1,g=!1,x="function"===typeof setTimeout?setTimeout:null,v="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function b(e){for(var t=r(u);null!==t;){if(null===t.callback)o(u);else{if(!(t.startTime<=e))break;o(u),t.sortIndex=t.expirationTime,n(c,t)}t=r(u)}}function w(e){if(g=!1,b(e),!m)if(null!==r(c))m=!0,T(S);else{var t=r(u);null!==t&&L(w,t.startTime-e)}}function S(e,n){m=!1,g&&(g=!1,v(C),C=-1),h=!0;var i=p;try{for(b(n),f=r(c);null!==f&&(!(f.expirationTime>n)||e&&!N());){var a=f.callback;if("function"===typeof a){f.callback=null,p=f.priorityLevel;var s=a(f.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?f.callback=s:f===r(c)&&o(c),b(n)}else o(c);f=r(c)}if(null!==f)var l=!0;else{var d=r(u);null!==d&&L(w,d.startTime-n),l=!1}return l}finally{f=null,p=i,h=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,j=!1,E=null,C=-1,A=5,P=-1;function N(){return!(t.unstable_now()-P<A)}function z(){if(null!==E){var e=t.unstable_now();P=e;var n=!0;try{n=E(!0,e)}finally{n?k():(j=!1,E=null)}}else j=!1}if("function"===typeof y)k=function(){y(z)};else if("undefined"!==typeof MessageChannel){var R=new MessageChannel,O=R.port2;R.port1.onmessage=z,k=function(){O.postMessage(null)}}else k=function(){x(z,0)};function T(e){E=e,j||(j=!0,k())}function L(e,n){C=x((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||h||(m=!0,T(S))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,o,i){var a=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?a+i:a:i=a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:d++,callback:o,priorityLevel:e,startTime:i,expirationTime:s=i+s,sortIndex:-1},i>a?(e.sortIndex=i,n(u,e),null===r(c)&&e===r(u)&&(g?(v(C),C=-1):g=!0,L(w,i-a))):(e.sortIndex=s,n(c,e),m||h||(m=!0,T(S))),e},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}},7244:(e,t,n)=>{"use strict";n.r(t),n.d(t,{zoom:()=>Et,zoomIdentity:()=>mt,zoomTransform:()=>gt});var r={value:()=>{}};function o(){for(var e,t=0,n=arguments.length,r={};t<n;++t){if(!(e=arguments[t]+"")||e in r||/[\s.]/.test(e))throw new Error("illegal type: "+e);r[e]=[]}return new i(r)}function i(e){this._=e}function a(e,t){for(var n,r=0,o=e.length;r<o;++r)if((n=e[r]).name===t)return n.value}function s(e,t,n){for(var o=0,i=e.length;o<i;++o)if(e[o].name===t){e[o]=r,e=e.slice(0,o).concat(e.slice(o+1));break}return null!=n&&e.push({name:t,value:n}),e}i.prototype=o.prototype={constructor:i,on:function(e,t){var n,r,o=this._,i=(r=o,(e+"").trim().split(/^|\s+/).map((function(e){var t="",n=e.indexOf(".");if(n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),e&&!r.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:t}}))),l=-1,c=i.length;if(!(arguments.length<2)){if(null!=t&&"function"!==typeof t)throw new Error("invalid callback: "+t);for(;++l<c;)if(n=(e=i[l]).type)o[n]=s(o[n],e.name,t);else if(null==t)for(n in o)o[n]=s(o[n],e.name,null);return this}for(;++l<c;)if((n=(e=i[l]).type)&&(n=a(o[n],e.name)))return n},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new i(e)},call:function(e,t){if((n=arguments.length-2)>0)for(var n,r,o=new Array(n),i=0;i<n;++i)o[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=0,n=(r=this._[e]).length;i<n;++i)r[i].value.apply(t,o)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],o=0,i=r.length;o<i;++o)r[o].value.apply(t,n)}};const l=o;var c=n(3719);function u(e){e.preventDefault(),e.stopImmediatePropagation()}function d(e){return((e=Math.exp(e))+1/e)/2}const f=function e(t,n,r){function o(e,o){var i,a,s=e[0],l=e[1],c=e[2],u=o[0],f=o[1],p=o[2],h=u-s,m=f-l,g=h*h+m*m;if(g<1e-12)a=Math.log(p/c)/t,i=function(e){return[s+e*h,l+e*m,c*Math.exp(t*e*a)]};else{var x=Math.sqrt(g),v=(p*p-c*c+r*g)/(2*c*n*x),y=(p*p-c*c-r*g)/(2*p*n*x),b=Math.log(Math.sqrt(v*v+1)-v),w=Math.log(Math.sqrt(y*y+1)-y);a=(w-b)/t,i=function(e){var r,o=e*a,i=d(b),u=c/(n*x)*(i*(r=t*o+b,((r=Math.exp(2*r))-1)/(r+1))-function(e){return((e=Math.exp(e))-1/e)/2}(b));return[s+u*h,l+u*m,c*i/d(t*o+b)]}}return i.duration=1e3*a*t/Math.SQRT2,i}return o.rho=function(t){var n=Math.max(.001,+t),r=n*n;return e(n,r,r*r)},o}(Math.SQRT2,2,4);var p,h,m=n(8994),g=n(3036),x=0,v=0,y=0,b=0,w=0,S=0,k="object"===typeof performance&&performance.now?performance:Date,j="object"===typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function E(){return w||(j(C),w=k.now()+S)}function C(){w=0}function A(){this._call=this._time=this._next=null}function P(e,t,n){var r=new A;return r.restart(e,t,n),r}function N(){w=(b=k.now())+S,x=v=0;try{!function(){E(),++x;for(var e,t=p;t;)(e=w-t._time)>=0&&t._call.call(null,e),t=t._next;--x}()}finally{x=0,function(){var e,t,n=p,r=1/0;for(;n;)n._call?(r>n._time&&(r=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:p=t);h=e,R(r)}(),w=0}}function z(){var e=k.now(),t=e-b;t>1e3&&(S-=t,b=e)}function R(e){x||(v&&(v=clearTimeout(v)),e-w>24?(e<1/0&&(v=setTimeout(N,e-k.now()-S)),y&&(y=clearInterval(y))):(y||(b=k.now(),y=setInterval(z,1e3)),x=1,j(N)))}function O(e,t,n){var r=new A;return t=null==t?0:+t,r.restart((n=>{r.stop(),e(n+t)}),t,n),r}A.prototype=P.prototype={constructor:A,restart:function(e,t,n){if("function"!==typeof e)throw new TypeError("callback is not a function");n=(null==n?E():+n)+(null==t?0:+t),this._next||h===this||(h?h._next=this:p=this,h=this),this._call=e,this._time=n,R()},stop:function(){this._call&&(this._call=null,this._time=1/0,R())}};var T=l("start","end","cancel","interrupt"),L=[],F=2,M=5,D=6;function _(e,t,n,r,o,i){var a=e.__transition;if(a){if(n in a)return}else e.__transition={};!function(e,t,n){var r,o=e.__transition;function i(e){n.state=1,n.timer.restart(a,n.delay,n.time),n.delay<=e&&a(e-n.delay)}function a(i){var c,u,d,f;if(1!==n.state)return l();for(c in o)if((f=o[c]).name===n.name){if(3===f.state)return O(a);4===f.state?(f.state=D,f.timer.stop(),f.on.call("interrupt",e,e.__data__,f.index,f.group),delete o[c]):+c<t&&(f.state=D,f.timer.stop(),f.on.call("cancel",e,e.__data__,f.index,f.group),delete o[c])}if(O((function(){3===n.state&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(i))})),n.state=F,n.on.call("start",e,e.__data__,n.index,n.group),n.state===F){for(n.state=3,r=new Array(d=n.tween.length),c=0,u=-1;c<d;++c)(f=n.tween[c].value.call(e,e.__data__,n.index,n.group))&&(r[++u]=f);r.length=u+1}}function s(t){for(var o=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(l),n.state=M,1),i=-1,a=r.length;++i<a;)r[i].call(e,o);n.state===M&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){for(var r in n.state=D,n.timer.stop(),delete o[t],o)return;delete e.__transition}o[t]=n,n.timer=P(i,0,n.time)}(e,n,{name:t,index:r,group:o,on:T,tween:L,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:0})}function I(e,t){var n=B(e,t);if(n.state>0)throw new Error("too late; already scheduled");return n}function U(e,t){var n=B(e,t);if(n.state>3)throw new Error("too late; already running");return n}function B(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function W(e,t){var n,r,o,i=e.__transition,a=!0;if(i){for(o in t=null==t?null:t+"",i)(n=i[o]).name===t?(r=n.state>F&&n.state<M,n.state=D,n.timer.stop(),n.on.call(r?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]):a=!1;a&&delete e.__transition}}function H(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var q,V=180/Math.PI,K={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Y(e,t,n,r,o,i){var a,s,l;return(a=Math.sqrt(e*e+t*t))&&(e/=a,t/=a),(l=e*n+t*r)&&(n-=e*l,r-=t*l),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,l/=s),e*r<t*n&&(e=-e,t=-t,l=-l,a=-a),{translateX:o,translateY:i,rotate:Math.atan2(t,e)*V,skewX:Math.atan(l)*V,scaleX:a,scaleY:s}}function G(e,t,n,r){function o(e){return e.length?e.pop()+" ":""}return function(i,a){var s=[],l=[];return i=e(i),a=e(a),function(e,r,o,i,a,s){if(e!==o||r!==i){var l=a.push("translate(",null,t,null,n);s.push({i:l-4,x:H(e,o)},{i:l-2,x:H(r,i)})}else(o||i)&&a.push("translate("+o+t+i+n)}(i.translateX,i.translateY,a.translateX,a.translateY,s,l),function(e,t,n,i){e!==t?(e-t>180?t+=360:t-e>180&&(e+=360),i.push({i:n.push(o(n)+"rotate(",null,r)-2,x:H(e,t)})):t&&n.push(o(n)+"rotate("+t+r)}(i.rotate,a.rotate,s,l),function(e,t,n,i){e!==t?i.push({i:n.push(o(n)+"skewX(",null,r)-2,x:H(e,t)}):t&&n.push(o(n)+"skewX("+t+r)}(i.skewX,a.skewX,s,l),function(e,t,n,r,i,a){if(e!==n||t!==r){var s=i.push(o(i)+"scale(",null,",",null,")");a.push({i:s-4,x:H(e,n)},{i:s-2,x:H(t,r)})}else 1===n&&1===r||i.push(o(i)+"scale("+n+","+r+")")}(i.scaleX,i.scaleY,a.scaleX,a.scaleY,s,l),i=a=null,function(e){for(var t,n=-1,r=l.length;++n<r;)s[(t=l[n]).i]=t.x(e);return s.join("")}}}var Q=G((function(e){const t=new("function"===typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?K:Y(t.a,t.b,t.c,t.d,t.e,t.f)}),"px, ","px)","deg)"),J=G((function(e){return null==e?K:(q||(q=document.createElementNS("http://www.w3.org/2000/svg","g")),q.setAttribute("transform",e),(e=q.transform.baseVal.consolidate())?Y((e=e.matrix).a,e.b,e.c,e.d,e.e,e.f):K)}),", ",")",")"),X=n(6084);function Z(e,t){var n,r;return function(){var o=U(this,e),i=o.tween;if(i!==n)for(var a=0,s=(r=n=i).length;a<s;++a)if(r[a].name===t){(r=r.slice()).splice(a,1);break}o.tween=r}}function $(e,t,n){var r,o;if("function"!==typeof n)throw new Error;return function(){var i=U(this,e),a=i.tween;if(a!==r){o=(r=a).slice();for(var s={name:t,value:n},l=0,c=o.length;l<c;++l)if(o[l].name===t){o[l]=s;break}l===c&&o.push(s)}i.tween=o}}function ee(e,t,n){var r=e._id;return e.each((function(){var e=U(this,r);(e.value||(e.value={}))[t]=n.apply(this,arguments)})),function(e){return B(e,r).value[t]}}function te(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function ne(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function re(){}var oe=.7,ie=1/oe,ae="\\s*([+-]?\\d+)\\s*",se="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",le="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ce=/^#([0-9a-f]{3,8})$/,ue=new RegExp("^rgb\\("+[ae,ae,ae]+"\\)$"),de=new RegExp("^rgb\\("+[le,le,le]+"\\)$"),fe=new RegExp("^rgba\\("+[ae,ae,ae,se]+"\\)$"),pe=new RegExp("^rgba\\("+[le,le,le,se]+"\\)$"),he=new RegExp("^hsl\\("+[se,le,le]+"\\)$"),me=new RegExp("^hsla\\("+[se,le,le,se]+"\\)$"),ge={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function xe(){return this.rgb().formatHex()}function ve(){return this.rgb().formatRgb()}function ye(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=ce.exec(e))?(n=t[1].length,t=parseInt(t[1],16),6===n?be(t):3===n?new ke(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===n?we(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===n?we(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=ue.exec(e))?new ke(t[1],t[2],t[3],1):(t=de.exec(e))?new ke(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=fe.exec(e))?we(t[1],t[2],t[3],t[4]):(t=pe.exec(e))?we(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=he.exec(e))?Ae(t[1],t[2]/100,t[3]/100,1):(t=me.exec(e))?Ae(t[1],t[2]/100,t[3]/100,t[4]):ge.hasOwnProperty(e)?be(ge[e]):"transparent"===e?new ke(NaN,NaN,NaN,0):null}function be(e){return new ke(e>>16&255,e>>8&255,255&e,1)}function we(e,t,n,r){return r<=0&&(e=t=n=NaN),new ke(e,t,n,r)}function Se(e,t,n,r){return 1===arguments.length?function(e){return e instanceof re||(e=ye(e)),e?new ke((e=e.rgb()).r,e.g,e.b,e.opacity):new ke}(e):new ke(e,t,n,null==r?1:r)}function ke(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}function je(){return"#"+Ce(this.r)+Ce(this.g)+Ce(this.b)}function Ee(){var e=this.opacity;return(1===(e=isNaN(e)?1:Math.max(0,Math.min(1,e)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===e?")":", "+e+")")}function Ce(e){return((e=Math.max(0,Math.min(255,Math.round(e)||0)))<16?"0":"")+e.toString(16)}function Ae(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Ne(e,t,n,r)}function Pe(e){if(e instanceof Ne)return new Ne(e.h,e.s,e.l,e.opacity);if(e instanceof re||(e=ye(e)),!e)return new Ne;if(e instanceof Ne)return e;var t=(e=e.rgb()).r/255,n=e.g/255,r=e.b/255,o=Math.min(t,n,r),i=Math.max(t,n,r),a=NaN,s=i-o,l=(i+o)/2;return s?(a=t===i?(n-r)/s+6*(n<r):n===i?(r-t)/s+2:(t-n)/s+4,s/=l<.5?i+o:2-i-o,a*=60):s=l>0&&l<1?0:a,new Ne(a,s,l,e.opacity)}function Ne(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}function ze(e,t,n){return 255*(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)}function Re(e,t,n,r,o){var i=e*e,a=i*e;return((1-3*e+3*i-a)*t+(4-6*i+3*a)*n+(1+3*e+3*i-3*a)*r+a*o)/6}te(re,ye,{copy:function(e){return Object.assign(new this.constructor,this,e)},displayable:function(){return this.rgb().displayable()},hex:xe,formatHex:xe,formatHsl:function(){return Pe(this).formatHsl()},formatRgb:ve,toString:ve}),te(ke,Se,ne(re,{brighter:function(e){return e=null==e?ie:Math.pow(ie,e),new ke(this.r*e,this.g*e,this.b*e,this.opacity)},darker:function(e){return e=null==e?oe:Math.pow(oe,e),new ke(this.r*e,this.g*e,this.b*e,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:je,formatHex:je,formatRgb:Ee,toString:Ee})),te(Ne,(function(e,t,n,r){return 1===arguments.length?Pe(e):new Ne(e,t,n,null==r?1:r)}),ne(re,{brighter:function(e){return e=null==e?ie:Math.pow(ie,e),new Ne(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?oe:Math.pow(oe,e),new Ne(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,o=2*n-r;return new ke(ze(e>=240?e-240:e+120,o,r),ze(e,o,r),ze(e<120?e+240:e-120,o,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var e=this.opacity;return(1===(e=isNaN(e)?1:Math.max(0,Math.min(1,e)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===e?")":", "+e+")")}}));const Oe=e=>()=>e;function Te(e,t){return function(n){return e+n*t}}function Le(e){return 1===(e=+e)?Fe:function(t,n){return n-t?function(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}(t,n,e):Oe(isNaN(t)?n:t)}}function Fe(e,t){var n=t-e;return n?Te(e,n):Oe(isNaN(e)?t:e)}const Me=function e(t){var n=Le(t);function r(e,t){var r=n((e=Se(e)).r,(t=Se(t)).r),o=n(e.g,t.g),i=n(e.b,t.b),a=Fe(e.opacity,t.opacity);return function(t){return e.r=r(t),e.g=o(t),e.b=i(t),e.opacity=a(t),e+""}}return r.gamma=e,r}(1);function De(e){return function(t){var n,r,o=t.length,i=new Array(o),a=new Array(o),s=new Array(o);for(n=0;n<o;++n)r=Se(t[n]),i[n]=r.r||0,a[n]=r.g||0,s[n]=r.b||0;return i=e(i),a=e(a),s=e(s),r.opacity=1,function(e){return r.r=i(e),r.g=a(e),r.b=s(e),r+""}}}De((function(e){var t=e.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,t-1):Math.floor(n*t),o=e[r],i=e[r+1],a=r>0?e[r-1]:2*o-i,s=r<t-1?e[r+2]:2*i-o;return Re((n-r/t)*t,a,o,i,s)}})),De((function(e){var t=e.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*t),o=e[(r+t-1)%t],i=e[r%t],a=e[(r+1)%t],s=e[(r+2)%t];return Re((n-r/t)*t,o,i,a,s)}}));var _e=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ie=new RegExp(_e.source,"g");function Ue(e,t){var n,r,o,i=_e.lastIndex=Ie.lastIndex=0,a=-1,s=[],l=[];for(e+="",t+="";(n=_e.exec(e))&&(r=Ie.exec(t));)(o=r.index)>i&&(o=t.slice(i,o),s[a]?s[a]+=o:s[++a]=o),(n=n[0])===(r=r[0])?s[a]?s[a]+=r:s[++a]=r:(s[++a]=null,l.push({i:a,x:H(n,r)})),i=Ie.lastIndex;return i<t.length&&(o=t.slice(i),s[a]?s[a]+=o:s[++a]=o),s.length<2?l[0]?function(e){return function(t){return e(t)+""}}(l[0].x):function(e){return function(){return e}}(t):(t=l.length,function(e){for(var n,r=0;r<t;++r)s[(n=l[r]).i]=n.x(e);return s.join("")})}function Be(e,t){var n;return("number"===typeof t?H:t instanceof ye?Me:(n=ye(t))?(t=n,Me):Ue)(e,t)}function We(e){return function(){this.removeAttribute(e)}}function He(e){return function(){this.removeAttributeNS(e.space,e.local)}}function qe(e,t,n){var r,o,i=n+"";return function(){var a=this.getAttribute(e);return a===i?null:a===r?o:o=t(r=a,n)}}function Ve(e,t,n){var r,o,i=n+"";return function(){var a=this.getAttributeNS(e.space,e.local);return a===i?null:a===r?o:o=t(r=a,n)}}function Ke(e,t,n){var r,o,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttribute(e))===(s=l+"")?null:a===r&&s===o?i:(o=s,i=t(r=a,l));this.removeAttribute(e)}}function Ye(e,t,n){var r,o,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttributeNS(e.space,e.local))===(s=l+"")?null:a===r&&s===o?i:(o=s,i=t(r=a,l));this.removeAttributeNS(e.space,e.local)}}function Ge(e,t){var n,r;function o(){var o=t.apply(this,arguments);return o!==r&&(n=(r=o)&&function(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}(e,o)),n}return o._value=t,o}function Qe(e,t){var n,r;function o(){var o=t.apply(this,arguments);return o!==r&&(n=(r=o)&&function(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}(e,o)),n}return o._value=t,o}function Je(e,t){return function(){I(this,e).delay=+t.apply(this,arguments)}}function Xe(e,t){return t=+t,function(){I(this,e).delay=t}}function Ze(e,t){return function(){U(this,e).duration=+t.apply(this,arguments)}}function $e(e,t){return t=+t,function(){U(this,e).duration=t}}var et=n(2973);var tt=n(3614);var nt=n(155);var rt=g.Ay.prototype.constructor;var ot=n(1443);function it(e){return function(){this.style.removeProperty(e)}}var at=0;function st(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function lt(){return++at}var ct=g.Ay.prototype;st.prototype=function(e){return(0,g.Ay)().transition(e)}.prototype={constructor:st,select:function(e){var t=this._name,n=this._id;"function"!==typeof e&&(e=(0,tt.A)(e));for(var r=this._groups,o=r.length,i=new Array(o),a=0;a<o;++a)for(var s,l,c=r[a],u=c.length,d=i[a]=new Array(u),f=0;f<u;++f)(s=c[f])&&(l=e.call(s,s.__data__,f,c))&&("__data__"in s&&(l.__data__=s.__data__),d[f]=l,_(d[f],t,n,f,d,B(s,n)));return new st(i,this._parents,t,n)},selectAll:function(e){var t=this._name,n=this._id;"function"!==typeof e&&(e=(0,nt.A)(e));for(var r=this._groups,o=r.length,i=[],a=[],s=0;s<o;++s)for(var l,c=r[s],u=c.length,d=0;d<u;++d)if(l=c[d]){for(var f,p=e.call(l,l.__data__,d,c),h=B(l,n),m=0,g=p.length;m<g;++m)(f=p[m])&&_(f,t,n,m,p,h);i.push(p),a.push(l)}return new st(i,a,t,n)},filter:function(e){"function"!==typeof e&&(e=(0,et.A)(e));for(var t=this._groups,n=t.length,r=new Array(n),o=0;o<n;++o)for(var i,a=t[o],s=a.length,l=r[o]=[],c=0;c<s;++c)(i=a[c])&&e.call(i,i.__data__,c,a)&&l.push(i);return new st(r,this._parents,this._name,this._id)},merge:function(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,r=t.length,o=n.length,i=Math.min(r,o),a=new Array(r),s=0;s<i;++s)for(var l,c=t[s],u=n[s],d=c.length,f=a[s]=new Array(d),p=0;p<d;++p)(l=c[p]||u[p])&&(f[p]=l);for(;s<r;++s)a[s]=t[s];return new st(a,this._parents,this._name,this._id)},selection:function(){return new rt(this._groups,this._parents)},transition:function(){for(var e=this._name,t=this._id,n=lt(),r=this._groups,o=r.length,i=0;i<o;++i)for(var a,s=r[i],l=s.length,c=0;c<l;++c)if(a=s[c]){var u=B(a,t);_(a,e,n,c,s,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new st(r,this._parents,e,n)},call:ct.call,nodes:ct.nodes,node:ct.node,size:ct.size,empty:ct.empty,each:ct.each,on:function(e,t){var n=this._id;return arguments.length<2?B(this.node(),n).on.on(e):this.each(function(e,t,n){var r,o,i=function(e){return(e+"").trim().split(/^|\s+/).every((function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||"start"===e}))}(t)?I:U;return function(){var a=i(this,e),s=a.on;s!==r&&(o=(r=s).copy()).on(t,n),a.on=o}}(n,e,t))},attr:function(e,t){var n=(0,X.A)(e),r="transform"===n?J:Be;return this.attrTween(e,"function"===typeof t?(n.local?Ye:Ke)(n,r,ee(this,"attr."+e,t)):null==t?(n.local?He:We)(n):(n.local?Ve:qe)(n,r,t))},attrTween:function(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(null==t)return this.tween(n,null);if("function"!==typeof t)throw new Error;var r=(0,X.A)(e);return this.tween(n,(r.local?Ge:Qe)(r,t))},style:function(e,t,n){var r="transform"===(e+="")?Q:Be;return null==t?this.styleTween(e,function(e,t){var n,r,o;return function(){var i=(0,ot.j)(this,e),a=(this.style.removeProperty(e),(0,ot.j)(this,e));return i===a?null:i===n&&a===r?o:o=t(n=i,r=a)}}(e,r)).on("end.style."+e,it(e)):"function"===typeof t?this.styleTween(e,function(e,t,n){var r,o,i;return function(){var a=(0,ot.j)(this,e),s=n(this),l=s+"";return null==s&&(this.style.removeProperty(e),l=s=(0,ot.j)(this,e)),a===l?null:a===r&&l===o?i:(o=l,i=t(r=a,s))}}(e,r,ee(this,"style."+e,t))).each(function(e,t){var n,r,o,i,a="style."+t,s="end."+a;return function(){var l=U(this,e),c=l.on,u=null==l.value[a]?i||(i=it(t)):void 0;c===n&&o===u||(r=(n=c).copy()).on(s,o=u),l.on=r}}(this._id,e)):this.styleTween(e,function(e,t,n){var r,o,i=n+"";return function(){var a=(0,ot.j)(this,e);return a===i?null:a===r?o:o=t(r=a,n)}}(e,r,t),n).on("end.style."+e,null)},styleTween:function(e,t,n){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==t)return this.tween(r,null);if("function"!==typeof t)throw new Error;return this.tween(r,function(e,t,n){var r,o;function i(){var i=t.apply(this,arguments);return i!==o&&(r=(o=i)&&function(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}(e,i,n)),r}return i._value=t,i}(e,t,null==n?"":n))},text:function(e){return this.tween("text","function"===typeof e?function(e){return function(){var t=e(this);this.textContent=null==t?"":t}}(ee(this,"text",e)):function(e){return function(){this.textContent=e}}(null==e?"":e+""))},textTween:function(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(null==e)return this.tween(t,null);if("function"!==typeof e)throw new Error;return this.tween(t,function(e){var t,n;function r(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&function(e){return function(t){this.textContent=e.call(this,t)}}(r)),t}return r._value=e,r}(e))},remove:function(){return this.on("end.remove",function(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}(this._id))},tween:function(e,t){var n=this._id;if(e+="",arguments.length<2){for(var r,o=B(this.node(),n).tween,i=0,a=o.length;i<a;++i)if((r=o[i]).name===e)return r.value;return null}return this.each((null==t?Z:$)(n,e,t))},delay:function(e){var t=this._id;return arguments.length?this.each(("function"===typeof e?Je:Xe)(t,e)):B(this.node(),t).delay},duration:function(e){var t=this._id;return arguments.length?this.each(("function"===typeof e?Ze:$e)(t,e)):B(this.node(),t).duration},ease:function(e){var t=this._id;return arguments.length?this.each(function(e,t){if("function"!==typeof t)throw new Error;return function(){U(this,e).ease=t}}(t,e)):B(this.node(),t).ease},easeVarying:function(e){if("function"!==typeof e)throw new Error;return this.each(function(e,t){return function(){var n=t.apply(this,arguments);if("function"!==typeof n)throw new Error;U(this,e).ease=n}}(this._id,e))},end:function(){var e,t,n=this,r=n._id,o=n.size();return new Promise((function(i,a){var s={value:a},l={value:function(){0===--o&&i()}};n.each((function(){var n=U(this,r),o=n.on;o!==e&&((t=(e=o).copy())._.cancel.push(s),t._.interrupt.push(s),t._.end.push(l)),n.on=t})),0===o&&i()}))},[Symbol.iterator]:ct[Symbol.iterator]};var ut={time:null,delay:0,duration:250,ease:function(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}};function dt(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}g.Ay.prototype.interrupt=function(e){return this.each((function(){W(this,e)}))},g.Ay.prototype.transition=function(e){var t,n;e instanceof st?(t=e._id,e=e._name):(t=lt(),(n=ut).time=E(),e=null==e?null:e+"");for(var r=this._groups,o=r.length,i=0;i<o;++i)for(var a,s=r[i],l=s.length,c=0;c<l;++c)(a=s[c])&&_(a,e,t,c,s,n||dt(a,t));return new st(r,this._parents,e,t)};const ft=e=>()=>e;function pt(e,t){let{sourceEvent:n,target:r,transform:o,dispatch:i}=t;Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},transform:{value:o,enumerable:!0,configurable:!0},_:{value:i}})}function ht(e,t,n){this.k=e,this.x=t,this.y=n}ht.prototype={constructor:ht,scale:function(e){return 1===e?this:new ht(this.k*e,this.x,this.y)},translate:function(e,t){return 0===e&0===t?this:new ht(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var mt=new ht(1,0,0);function gt(e){for(;!e.__zoom;)if(!(e=e.parentNode))return mt;return e.__zoom}function xt(e){e.stopImmediatePropagation()}function vt(e){e.preventDefault(),e.stopImmediatePropagation()}function yt(e){return(!e.ctrlKey||"wheel"===e.type)&&!e.button}function bt(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e).hasAttribute("viewBox")?[[(e=e.viewBox.baseVal).x,e.y],[e.x+e.width,e.y+e.height]]:[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]:[[0,0],[e.clientWidth,e.clientHeight]]}function wt(){return this.__zoom||mt}function St(e){return-e.deltaY*(1===e.deltaMode?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function kt(){return navigator.maxTouchPoints||"ontouchstart"in this}function jt(e,t,n){var r=e.invertX(t[0][0])-n[0][0],o=e.invertX(t[1][0])-n[1][0],i=e.invertY(t[0][1])-n[0][1],a=e.invertY(t[1][1])-n[1][1];return e.translate(o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o),a>i?(i+a)/2:Math.min(0,i)||Math.max(0,a))}function Et(){var e,t,n,r=yt,o=bt,i=jt,a=St,s=kt,d=[0,1/0],p=[[-1/0,-1/0],[1/0,1/0]],h=250,g=f,x=l("start","zoom","end"),v=0,y=10;function b(e){e.property("__zoom",wt).on("wheel.zoom",A).on("mousedown.zoom",P).on("dblclick.zoom",N).filter(s).on("touchstart.zoom",z).on("touchmove.zoom",R).on("touchend.zoom touchcancel.zoom",O).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function w(e,t){return(t=Math.max(d[0],Math.min(d[1],t)))===e.k?e:new ht(t,e.x,e.y)}function S(e,t,n){var r=t[0]-n[0]*e.k,o=t[1]-n[1]*e.k;return r===e.x&&o===e.y?e:new ht(e.k,r,o)}function k(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function j(e,t,n,r){e.on("start.zoom",(function(){E(this,arguments).event(r).start()})).on("interrupt.zoom end.zoom",(function(){E(this,arguments).event(r).end()})).tween("zoom",(function(){var e=this,i=arguments,a=E(e,i).event(r),s=o.apply(e,i),l=null==n?k(s):"function"===typeof n?n.apply(e,i):n,c=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),u=e.__zoom,d="function"===typeof t?t.apply(e,i):t,f=g(u.invert(l).concat(c/u.k),d.invert(l).concat(c/d.k));return function(e){if(1===e)e=d;else{var t=f(e),n=c/t[2];e=new ht(n,l[0]-t[0]*n,l[1]-t[1]*n)}a.zoom(null,e)}}))}function E(e,t,n){return!n&&e.__zooming||new C(e,t)}function C(e,t){this.that=e,this.args=t,this.active=0,this.sourceEvent=null,this.extent=o.apply(e,t),this.taps=0}function A(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];if(r.apply(this,arguments)){var s=E(this,n).event(e),l=this.__zoom,c=Math.max(d[0],Math.min(d[1],l.k*Math.pow(2,a.apply(this,arguments)))),u=(0,m.A)(e);if(s.wheel)s.mouse[0][0]===u[0]&&s.mouse[0][1]===u[1]||(s.mouse[1]=l.invert(s.mouse[0]=u)),clearTimeout(s.wheel);else{if(l.k===c)return;s.mouse=[u,l.invert(u)],W(this),s.start()}vt(e),s.wheel=setTimeout((function(){s.wheel=null,s.end()}),150),s.zoom("mouse",i(S(w(l,c),s.mouse[0],s.mouse[1]),s.extent,p))}}function P(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];if(!n&&r.apply(this,arguments)){var s=E(this,o,!0).event(e),l=(0,c.A)(e.view).on("mousemove.zoom",(function(e){if(vt(e),!s.moved){var t=e.clientX-h,n=e.clientY-g;s.moved=t*t+n*n>v}s.event(e).zoom("mouse",i(S(s.that.__zoom,s.mouse[0]=(0,m.A)(e,f),s.mouse[1]),s.extent,p))}),!0).on("mouseup.zoom",(function(e){l.on("mousemove.zoom mouseup.zoom",null),function(e,t){var n=e.document.documentElement,r=(0,c.A)(e).on("dragstart.drag",null);t&&(r.on("click.drag",u,!0),setTimeout((function(){r.on("click.drag",null)}),0)),"onselectstart"in n?r.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}(e.view,s.moved),vt(e),s.event(e).end()}),!0),d=(0,m.A)(e,f),f=e.currentTarget,h=e.clientX,g=e.clientY;!function(e){var t=e.document.documentElement,n=(0,c.A)(e).on("dragstart.drag",u,!0);"onselectstart"in t?n.on("selectstart.drag",u,!0):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}(e.view),xt(e),s.mouse=[d,this.__zoom.invert(d)],W(this),s.start()}}function N(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];if(r.apply(this,arguments)){var s=this.__zoom,l=(0,m.A)(e.changedTouches?e.changedTouches[0]:e,this),u=s.invert(l),d=s.k*(e.shiftKey?.5:2),f=i(S(w(s,d),l,u),o.apply(this,n),p);vt(e),h>0?(0,c.A)(this).transition().duration(h).call(j,f,l,e):(0,c.A)(this).call(b.transform,f,l,e)}}function z(n){for(var o=arguments.length,i=new Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];if(r.apply(this,arguments)){var s,l,c,u,d=n.touches,f=d.length,p=E(this,i,n.changedTouches.length===f).event(n);for(xt(n),l=0;l<f;++l)c=d[l],u=[u=(0,m.A)(c,this),this.__zoom.invert(u),c.identifier],p.touch0?p.touch1||p.touch0[2]===u[2]||(p.touch1=u,p.taps=0):(p.touch0=u,s=!0,p.taps=1+!!e);e&&(e=clearTimeout(e)),s&&(p.taps<2&&(t=u[0],e=setTimeout((function(){e=null}),500)),W(this),p.start())}}function R(e){if(this.__zooming){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o,a,s,l,c=E(this,n).event(e),u=e.changedTouches,d=u.length;for(vt(e),o=0;o<d;++o)a=u[o],s=(0,m.A)(a,this),c.touch0&&c.touch0[2]===a.identifier?c.touch0[0]=s:c.touch1&&c.touch1[2]===a.identifier&&(c.touch1[0]=s);if(a=c.that.__zoom,c.touch1){var f=c.touch0[0],h=c.touch0[1],g=c.touch1[0],x=c.touch1[1],v=(v=g[0]-f[0])*v+(v=g[1]-f[1])*v,y=(y=x[0]-h[0])*y+(y=x[1]-h[1])*y;a=w(a,Math.sqrt(v/y)),s=[(f[0]+g[0])/2,(f[1]+g[1])/2],l=[(h[0]+x[0])/2,(h[1]+x[1])/2]}else{if(!c.touch0)return;s=c.touch0[0],l=c.touch0[1]}c.zoom("touch",i(S(a,s,l),c.extent,p))}}function O(e){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];if(this.__zooming){var a,s,l=E(this,o).event(e),u=e.changedTouches,d=u.length;for(xt(e),n&&clearTimeout(n),n=setTimeout((function(){n=null}),500),a=0;a<d;++a)s=u[a],l.touch0&&l.touch0[2]===s.identifier?delete l.touch0:l.touch1&&l.touch1[2]===s.identifier&&delete l.touch1;if(l.touch1&&!l.touch0&&(l.touch0=l.touch1,delete l.touch1),l.touch0)l.touch0[1]=this.__zoom.invert(l.touch0[0]);else if(l.end(),2===l.taps&&(s=(0,m.A)(s,this),Math.hypot(t[0]-s[0],t[1]-s[1])<y)){var f=(0,c.A)(this).on("dblclick.zoom");f&&f.apply(this,arguments)}}}return b.transform=function(e,t,n,r){var o=e.selection?e.selection():e;o.property("__zoom",wt),e!==o?j(e,t,n,r):o.interrupt().each((function(){E(this,arguments).event(r).start().zoom(null,"function"===typeof t?t.apply(this,arguments):t).end()}))},b.scaleBy=function(e,t,n,r){b.scaleTo(e,(function(){return this.__zoom.k*("function"===typeof t?t.apply(this,arguments):t)}),n,r)},b.scaleTo=function(e,t,n,r){b.transform(e,(function(){var e=o.apply(this,arguments),r=this.__zoom,a=null==n?k(e):"function"===typeof n?n.apply(this,arguments):n,s=r.invert(a),l="function"===typeof t?t.apply(this,arguments):t;return i(S(w(r,l),a,s),e,p)}),n,r)},b.translateBy=function(e,t,n,r){b.transform(e,(function(){return i(this.__zoom.translate("function"===typeof t?t.apply(this,arguments):t,"function"===typeof n?n.apply(this,arguments):n),o.apply(this,arguments),p)}),null,r)},b.translateTo=function(e,t,n,r,a){b.transform(e,(function(){var e=o.apply(this,arguments),a=this.__zoom,s=null==r?k(e):"function"===typeof r?r.apply(this,arguments):r;return i(mt.translate(s[0],s[1]).scale(a.k).translate("function"===typeof t?-t.apply(this,arguments):-t,"function"===typeof n?-n.apply(this,arguments):-n),e,p)}),r,a)},C.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return 1===++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(e,t){return this.mouse&&"mouse"!==e&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&"touch"!==e&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&"touch"!==e&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit("zoom"),this},end:function(){return 0===--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(e){var t=(0,c.A)(this.that).datum();x.call(e,this.that,new pt(e,{sourceEvent:this.sourceEvent,target:b,type:e,transform:this.that.__zoom,dispatch:x}),t)}},b.wheelDelta=function(e){return arguments.length?(a="function"===typeof e?e:ft(+e),b):a},b.filter=function(e){return arguments.length?(r="function"===typeof e?e:ft(!!e),b):r},b.touchable=function(e){return arguments.length?(s="function"===typeof e?e:ft(!!e),b):s},b.extent=function(e){return arguments.length?(o="function"===typeof e?e:ft([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),b):o},b.scaleExtent=function(e){return arguments.length?(d[0]=+e[0],d[1]=+e[1],b):[d[0],d[1]]},b.translateExtent=function(e){return arguments.length?(p[0][0]=+e[0][0],p[1][0]=+e[1][0],p[0][1]=+e[0][1],p[1][1]=+e[1][1],b):[[p[0][0],p[0][1]],[p[1][0],p[1][1]]]},b.constrain=function(e){return arguments.length?(i=e,b):i},b.duration=function(e){return arguments.length?(h=+e,b):h},b.interpolate=function(e){return arguments.length?(g=e,b):g},b.on=function(){var e=x.on.apply(x,arguments);return e===x?b:e},b.clickDistance=function(e){return arguments.length?(v=(e=+e)*e,b):Math.sqrt(v)},b.tapDistance=function(e){return arguments.length?(y=+e,b):y},b}gt.prototype=ht.prototype},7324:e=>{e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<i.length;l++){var c=i[l];if(!s(c))return!1;var u=e[c],d=t[c];if(!1===(o=n?n.call(r,u,d,c):void 0)||void 0===o&&u!==d)return!1}return!0}},7681:function(e,t,n){!function(e,t,n,r,o,i,a){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var c=s(t),u=s(n),d=l(r);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},g.apply(this,arguments)}function x(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b=["width","height","projection","projectionConfig"],w=d.geoPath,S=x(d,["geoPath"]),k=t.createContext(),j=function(e){var n=e.width,r=e.height,o=e.projection,i=e.projectionConfig,a=x(e,b),s=v(i.center||[],2),l=s[0],u=s[1],d=v(i.rotate||[],3),f=d[0],p=d[1],h=d[2],m=v(i.parallels||[],2),y=m[0],j=m[1],E=i.scale||null,C=t.useMemo((function(){return function(e){var t=e.projectionConfig,n=void 0===t?{}:t,r=e.projection,o=void 0===r?"geoEqualEarth":r,i=e.width,a=void 0===i?800:i,s=e.height,l=void 0===s?600:s;if("function"==typeof o)return o;var c=S[o]().translate([a/2,l/2]);return[c.center?"center":null,c.rotate?"rotate":null,c.scale?"scale":null,c.parallels?"parallels":null].forEach((function(e){e&&(c=c[e](n[e]||c[e]()))})),c}({projectionConfig:{center:l||0===l||u||0===u?[l,u]:null,rotate:f||0===f||p||0===p?[f,p,h]:null,parallels:y||0===y||j||0===j?[y,j]:null,scale:E},projection:o,width:n,height:r})}),[n,r,o,l,u,f,p,h,y,j,E]),A=t.useCallback(C,[C]),P=t.useMemo((function(){return{width:n,height:r,projection:A,path:w().projection(A)}}),[n,r,A]);return c.default.createElement(k.Provider,g({value:P},a))};j.propTypes={width:u.default.number,height:u.default.number,projection:u.default.oneOfType([u.default.string,u.default.func]),projectionConfig:u.default.object};var E=["width","height","projection","projectionConfig","className"],C=t.forwardRef((function(e,t){var n=e.width,r=void 0===n?800:n,o=e.height,i=void 0===o?600:o,a=e.projection,s=void 0===a?"geoEqualEarth":a,l=e.projectionConfig,u=void 0===l?{}:l,d=e.className,f=void 0===d?"":d,p=x(e,E);return c.default.createElement(j,{width:r,height:i,projection:s,projectionConfig:u},c.default.createElement("svg",g({ref:t,viewBox:"0 0 ".concat(r," ").concat(i),className:"rsm-svg ".concat(f)},p)))}));function A(e,t,n){var r=(e*n.k-e)/2,o=(t*n.k-t)/2;return[e/2-(r+n.x)/n.k,t/2-(o+n.y)/n.k]}function P(e,t){if("Topology"!==e.type)return t?t(e.features||e):e.features||e;var n=o.feature(e,e.objects[Object.keys(e.objects)[0]]).features;return t?t(n):n}function N(e){return"Topology"===e.type?{outline:o.mesh(e,e.objects[Object.keys(e.objects)[0]],(function(e,t){return e===t})),borders:o.mesh(e,e.objects[Object.keys(e.objects)[0]],(function(e,t){return e!==t}))}:null}function z(e,t){return e?e.map((function(e,n){return p(p({},e),{},{rsmKey:"geo-".concat(n),svgPath:t(e)})})):[]}function R(e){var n=e.geography,r=e.parseGeographies,o=t.useContext(k).path,i=v(t.useState({}),2),a=i[0],s=i[1];t.useEffect((function(){var e;"undefined"!==("undefined"==typeof window?"undefined":h(window))&&n&&("string"==typeof n?(e=n,fetch(e).then((function(e){if(!e.ok)throw Error(e.statusText);return e.json()})).catch((function(e){console.log("There was a problem when fetching the data: ",e)}))).then((function(e){e&&s({geographies:P(e,r),mesh:N(e)})})):s({geographies:P(n,r),mesh:N(n)}))}),[n,r]);var l=t.useMemo((function(){var e=a.mesh||{},t=function(e,t,n){return e&&t?{outline:p(p({},e),{},{rsmKey:"outline",svgPath:n(e)}),borders:p(p({},t),{},{rsmKey:"borders",svgPath:n(t)})}:{}}(e.outline,e.borders,o);return{geographies:z(a.geographies,o),outline:t.outline,borders:t.borders}}),[a,o]);return{geographies:l.geographies,outline:l.outline,borders:l.borders}}C.displayName="ComposableMap",C.propTypes={width:u.default.number,height:u.default.number,projection:u.default.oneOfType([u.default.string,u.default.func]),projectionConfig:u.default.object,className:u.default.string};var O=["geography","children","parseGeographies","className"],T=t.forwardRef((function(e,n){var r=e.geography,o=e.children,i=e.parseGeographies,a=e.className,s=void 0===a?"":a,l=x(e,O),u=t.useContext(k),d=u.path,f=u.projection,p=R({geography:r,parseGeographies:i}),h=p.geographies,m=p.outline,v=p.borders;return c.default.createElement("g",g({ref:n,className:"rsm-geographies ".concat(s)},l),h&&h.length>0&&o({geographies:h,outline:m,borders:v,path:d,projection:f}))}));T.displayName="Geographies",T.propTypes={geography:u.default.oneOfType([u.default.string,u.default.object,u.default.array]),children:u.default.func,parseGeographies:u.default.func,className:u.default.string};var L=["geography","onMouseEnter","onMouseLeave","onMouseDown","onMouseUp","onFocus","onBlur","style","className"],F=t.forwardRef((function(e,n){var r=e.geography,o=e.onMouseEnter,i=e.onMouseLeave,a=e.onMouseDown,s=e.onMouseUp,l=e.onFocus,u=e.onBlur,d=e.style,f=void 0===d?{}:d,p=e.className,h=void 0===p?"":p,m=x(e,L),y=v(t.useState(!1),2),b=y[0],w=y[1],S=v(t.useState(!1),2),k=S[0],j=S[1];return c.default.createElement("path",g({ref:n,tabIndex:"0",className:"rsm-geography ".concat(h),d:r.svgPath,onMouseEnter:function(e){j(!0),o&&o(e)},onMouseLeave:function(e){j(!1),b&&w(!1),i&&i(e)},onFocus:function(e){j(!0),l&&l(e)},onBlur:function(e){j(!1),b&&w(!1),u&&u(e)},onMouseDown:function(e){w(!0),a&&a(e)},onMouseUp:function(e){w(!1),s&&s(e)},style:f[b||k?b?"pressed":"hover":"default"]},m))}));F.displayName="Geography",F.propTypes={geography:u.default.object,onMouseEnter:u.default.func,onMouseLeave:u.default.func,onMouseDown:u.default.func,onMouseUp:u.default.func,onFocus:u.default.func,onBlur:u.default.func,style:u.default.object,className:u.default.string};var M=t.memo(F),D=["fill","stroke","step","className"],_=t.forwardRef((function(e,n){var o=e.fill,i=void 0===o?"transparent":o,a=e.stroke,s=void 0===a?"currentcolor":a,l=e.step,u=void 0===l?[10,10]:l,d=e.className,f=void 0===d?"":d,p=x(e,D),h=t.useContext(k).path;return c.default.createElement("path",g({ref:n,d:h(r.geoGraticule().step(u)()),fill:i,stroke:s,className:"rsm-graticule ".concat(f)},p))}));_.displayName="Graticule",_.propTypes={fill:u.default.string,stroke:u.default.string,step:u.default.array,className:u.default.string};var I=t.memo(_),U=["value"],B=t.createContext(),W={x:0,y:0,k:1,transformString:"translate(0 0) scale(1)"},H=function(e){var t=e.value,n=void 0===t?W:t,r=x(e,U);return c.default.createElement(B.Provider,g({value:n},r))};function q(e){var n=e.center,r=e.filterZoomEvent,o=e.onMoveStart,s=e.onMoveEnd,l=e.onMove,c=e.translateExtent,u=void 0===c?[[-1/0,-1/0],[1/0,1/0]]:c,d=e.scaleExtent,f=void 0===d?[1,8]:d,p=e.zoom,h=void 0===p?1:p,m=t.useContext(k),g=m.width,x=m.height,y=m.projection,b=v(n,2),w=b[0],S=b[1],j=v(t.useState({x:0,y:0,k:1}),2),E=j[0],C=j[1],P=t.useRef({x:0,y:0,k:1}),N=t.useRef(),z=t.useRef(),R=t.useRef(!1),O=v(u,2),T=O[0],L=O[1],F=v(T,2),M=F[0],D=F[1],_=v(L,2),I=_[0],U=_[1],B=v(f,2),W=B[0],H=B[1];return t.useEffect((function(){var e=a.select(N.current),t=i.zoom().filter((function(e){return r?r(e):!!e&&!e.ctrlKey&&!e.button})).scaleExtent([W,H]).translateExtent([[M,D],[I,U]]).on("start",(function(e){o&&!R.current&&o({coordinates:y.invert(A(g,x,e.transform)),zoom:e.transform.k},e)})).on("zoom",(function(e){if(!R.current){var t=e.transform,n=e.sourceEvent;C({x:t.x,y:t.y,k:t.k,dragging:n}),l&&l({x:t.x,y:t.y,zoom:t.k,dragging:n},e)}})).on("end",(function(e){if(R.current)R.current=!1;else{var t=v(y.invert(A(g,x,e.transform)),2),n=t[0],r=t[1];P.current={x:n,y:r,k:e.transform.k},s&&s({coordinates:[n,r],zoom:e.transform.k},e)}}));z.current=t,e.call(t)}),[g,x,M,D,I,U,W,H,y,o,l,s,r]),t.useEffect((function(){if(w!==P.current.x||S!==P.current.y||h!==P.current.k){var e=y([w,S]),t=e[0]*h,n=e[1]*h,r=a.select(N.current);R.current=!0,r.call(z.current.transform,i.zoomIdentity.translate(g/2-t,x/2-n).scale(h)),C({x:g/2-t,y:x/2-n,k:h}),P.current={x:w,y:S,k:h}}}),[w,S,h,g,x,y]),{mapRef:N,position:E,transformString:"translate(".concat(E.x," ").concat(E.y,") scale(").concat(E.k,")")}}H.propTypes={x:u.default.number,y:u.default.number,k:u.default.number,transformString:u.default.string};var V=["center","zoom","minZoom","maxZoom","translateExtent","filterZoomEvent","onMoveStart","onMove","onMoveEnd","className"],K=t.forwardRef((function(e,n){var r=e.center,o=void 0===r?[0,0]:r,i=e.zoom,a=void 0===i?1:i,s=e.minZoom,l=void 0===s?1:s,u=e.maxZoom,d=void 0===u?8:u,f=e.translateExtent,p=e.filterZoomEvent,h=e.onMoveStart,m=e.onMove,v=e.onMoveEnd,y=e.className,b=x(e,V),w=t.useContext(k),S=w.width,j=w.height,E=q({center:o,filterZoomEvent:p,onMoveStart:h,onMove:m,onMoveEnd:v,scaleExtent:[l,d],translateExtent:f,zoom:a}),C=E.mapRef,A=E.transformString,P=E.position;return c.default.createElement(H,{value:{x:P.x,y:P.y,k:P.k,transformString:A}},c.default.createElement("g",{ref:C},c.default.createElement("rect",{width:S,height:j,fill:"transparent"}),c.default.createElement("g",g({ref:n,transform:A,className:"rsm-zoomable-group ".concat(y)},b))))}));K.displayName="ZoomableGroup",K.propTypes={center:u.default.array,zoom:u.default.number,minZoom:u.default.number,maxZoom:u.default.number,translateExtent:u.default.arrayOf(u.default.array),onMoveStart:u.default.func,onMove:u.default.func,onMoveEnd:u.default.func,className:u.default.string};var Y=["id","fill","stroke","strokeWidth","className"],G=t.forwardRef((function(e,n){var r=e.id,o=void 0===r?"rsm-sphere":r,i=e.fill,a=void 0===i?"transparent":i,s=e.stroke,l=void 0===s?"currentcolor":s,u=e.strokeWidth,d=void 0===u?.5:u,f=e.className,p=void 0===f?"":f,h=x(e,Y),m=t.useContext(k).path,v=t.useMemo((function(){return m({type:"Sphere"})}),[m]);return c.default.createElement(t.Fragment,null,c.default.createElement("defs",null,c.default.createElement("clipPath",{id:o},c.default.createElement("path",{d:v}))),c.default.createElement("path",g({ref:n,d:v,fill:a,stroke:l,strokeWidth:d,style:{pointerEvents:"none"},className:"rsm-sphere ".concat(p)},h)))}));G.displayName="Sphere",G.propTypes={id:u.default.string,fill:u.default.string,stroke:u.default.string,strokeWidth:u.default.number,className:u.default.string};var Q=t.memo(G),J=["coordinates","children","onMouseEnter","onMouseLeave","onMouseDown","onMouseUp","onFocus","onBlur","style","className"],X=t.forwardRef((function(e,n){var r=e.coordinates,o=e.children,i=e.onMouseEnter,a=e.onMouseLeave,s=e.onMouseDown,l=e.onMouseUp,u=e.onFocus,d=e.onBlur,f=e.style,p=void 0===f?{}:f,h=e.className,m=void 0===h?"":h,y=x(e,J),b=t.useContext(k).projection,w=v(t.useState(!1),2),S=w[0],j=w[1],E=v(t.useState(!1),2),C=E[0],A=E[1],P=v(b(r),2),N=P[0],z=P[1];return c.default.createElement("g",g({ref:n,transform:"translate(".concat(N,", ").concat(z,")"),className:"rsm-marker ".concat(m),onMouseEnter:function(e){A(!0),i&&i(e)},onMouseLeave:function(e){A(!1),S&&j(!1),a&&a(e)},onFocus:function(e){A(!0),u&&u(e)},onBlur:function(e){A(!1),S&&j(!1),d&&d(e)},onMouseDown:function(e){j(!0),s&&s(e)},onMouseUp:function(e){j(!1),l&&l(e)},style:p[S||C?S?"pressed":"hover":"default"]},y),o)}));X.displayName="Marker",X.propTypes={coordinates:u.default.array,children:u.default.oneOfType([u.default.node,u.default.arrayOf(u.default.node)]),onMouseEnter:u.default.func,onMouseLeave:u.default.func,onMouseDown:u.default.func,onMouseUp:u.default.func,onFocus:u.default.func,onBlur:u.default.func,style:u.default.object,className:u.default.string};var Z=["from","to","coordinates","stroke","strokeWidth","fill","className"],$=t.forwardRef((function(e,n){var r=e.from,o=void 0===r?[0,0]:r,i=e.to,a=void 0===i?[0,0]:i,s=e.coordinates,l=e.stroke,u=void 0===l?"currentcolor":l,d=e.strokeWidth,f=void 0===d?3:d,p=e.fill,h=void 0===p?"transparent":p,m=e.className,v=void 0===m?"":m,y=x(e,Z),b=t.useContext(k).path,w={type:"LineString",coordinates:s||[o,a]};return c.default.createElement("path",g({ref:n,d:b(w),className:"rsm-line ".concat(v),stroke:u,strokeWidth:f,fill:h},y))}));$.displayName="Line",$.propTypes={from:u.default.array,to:u.default.array,coordinates:u.default.array,stroke:u.default.string,strokeWidth:u.default.number,fill:u.default.string,className:u.default.string};var ee=["subject","children","connectorProps","dx","dy","curve","className"],te=t.forwardRef((function(e,n){var r=e.subject,o=e.children,i=e.connectorProps,a=e.dx,s=void 0===a?30:a,l=e.dy,u=void 0===l?30:l,d=e.curve,f=void 0===d?0:d,p=e.className,h=void 0===p?"":p,m=x(e,ee),y=v((0,t.useContext(k).projection)(r),2),b=y[0],w=y[1],S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:30,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=Array.isArray(n)?n:[n,n],o=e/2*r[0],i=t/2*r[1];return"M".concat(0,",",0," Q",-e/2-o,",").concat(-t/2+i," ").concat(-e,",").concat(-t)}(s,u,f);return c.default.createElement("g",g({ref:n,transform:"translate(".concat(b+s,", ").concat(w+u,")"),className:"rsm-annotation ".concat(h)},m),c.default.createElement("path",g({d:S,fill:"transparent",stroke:"#000"},i)),o)}));te.displayName="Annotation",te.propTypes={subject:u.default.array,children:u.default.oneOfType([u.default.node,u.default.arrayOf(u.default.node)]),dx:u.default.number,dy:u.default.number,curve:u.default.number,connectorProps:u.default.object,className:u.default.string},e.Annotation=te,e.ComposableMap=C,e.Geographies=T,e.Geography=M,e.Graticule=I,e.Line=$,e.MapContext=k,e.MapProvider=j,e.Marker=X,e.Sphere=Q,e.ZoomPanContext=B,e.ZoomPanProvider=H,e.ZoomableGroup=K,e.useGeographies=R,e.useMapContext=function(){return t.useContext(k)},e.useZoomPan=q,e.useZoomPanContext=function(){return t.useContext(B)},Object.defineProperty(e,"__esModule",{value:!0})}(t,n(5043),n(5173),n(535),n(9541),n(7244),n(7831))},7831:(e,t,n)=>{"use strict";n.r(t),n.d(t,{create:()=>i,creator:()=>r.A,local:()=>s,matcher:()=>c.A,namespace:()=>u.A,namespaces:()=>d.A,pointer:()=>f.A,pointers:()=>h,select:()=>o.A,selectAll:()=>x,selection:()=>g.Ay,selector:()=>v.A,selectorAll:()=>y.A,style:()=>b.j,window:()=>w.A});var r=n(1359),o=n(3719);function i(e){return(0,o.A)((0,r.A)(e).call(document.documentElement))}var a=0;function s(){return new l}function l(){this._="@"+(++a).toString(36)}l.prototype=s.prototype={constructor:l,get:function(e){for(var t=this._;!(t in e);)if(!(e=e.parentNode))return;return e[t]},set:function(e,t){return e[this._]=t},remove:function(e){return this._ in e&&delete e[this._]},toString:function(){return this._}};var c=n(2973),u=n(6084),d=n(2859),f=n(8994),p=n(3460);function h(e,t){return e.target&&(e=(0,p.A)(e),void 0===t&&(t=e.currentTarget),e=e.touches||[e]),Array.from(e,(e=>(0,f.A)(e,t)))}var m=n(1382),g=n(3036);function x(e){return"string"===typeof e?new g.LN([document.querySelectorAll(e)],[document.documentElement]):new g.LN([null==e?[]:(0,m.A)(e)],g.zr)}var v=n(3614),y=n(155),b=n(1443),w=n(8683)},7950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(2730)},8139:(e,t)=>{var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];n&&(e=a(e,i(n)))}return e}function i(e){if("string"===typeof e||"number"===typeof e)return e;if("object"!==typeof e)return"";if(Array.isArray(e))return o.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var n in e)r.call(e,n)&&e[n]&&(t=a(t,n));return t}function a(e,t){return t?e?e+" "+t:e+t:e}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},8683:(e,t,n)=>{"use strict";function r(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}n.d(t,{A:()=>r})},8853:(e,t,n)=>{"use strict";e.exports=n(7234)},8994:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(3460);function o(e,t){if(e=(0,r.A)(e),void 0===t&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var o=n.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,[(o=o.matrixTransform(t.getScreenCTM().inverse())).x,o.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}},9541:(e,t,n)=>{"use strict";function r(e){return e}function o(e){if(null==e)return r;var t,n,o=e.scale[0],i=e.scale[1],a=e.translate[0],s=e.translate[1];return function(e,r){r||(t=n=0);var l=2,c=e.length,u=new Array(c);for(u[0]=(t+=e[0])*o+a,u[1]=(n+=e[1])*i+s;l<c;)u[l]=e[l],++l;return u}}function i(e){var t,n=o(e.transform),r=1/0,i=r,a=-r,s=-r;function l(e){(e=n(e))[0]<r&&(r=e[0]),e[0]>a&&(a=e[0]),e[1]<i&&(i=e[1]),e[1]>s&&(s=e[1])}function c(e){switch(e.type){case"GeometryCollection":e.geometries.forEach(c);break;case"Point":l(e.coordinates);break;case"MultiPoint":e.coordinates.forEach(l)}}for(t in e.arcs.forEach((function(e){for(var t,o=-1,l=e.length;++o<l;)(t=n(e[o],o))[0]<r&&(r=t[0]),t[0]>a&&(a=t[0]),t[1]<i&&(i=t[1]),t[1]>s&&(s=t[1])})),e.objects)c(e.objects[t]);return[r,i,a,s]}function a(e,t){return"string"===typeof t&&(t=e.objects[t]),"GeometryCollection"===t.type?{type:"FeatureCollection",features:t.geometries.map((function(t){return s(e,t)}))}:s(e,t)}function s(e,t){var n=t.id,r=t.bbox,o=null==t.properties?{}:t.properties,i=l(e,t);return null==n&&null==r?{type:"Feature",properties:o,geometry:i}:null==r?{type:"Feature",id:n,properties:o,geometry:i}:{type:"Feature",id:n,bbox:r,properties:o,geometry:i}}function l(e,t){var n=o(e.transform),r=e.arcs;function i(e,t){t.length&&t.pop();for(var o=r[e<0?~e:e],i=0,a=o.length;i<a;++i)t.push(n(o[i],i));e<0&&function(e,t){for(var n,r=e.length,o=r-t;o<--r;)n=e[o],e[o++]=e[r],e[r]=n}(t,a)}function a(e){return n(e)}function s(e){for(var t=[],n=0,r=e.length;n<r;++n)i(e[n],t);return t.length<2&&t.push(t[0]),t}function l(e){for(var t=s(e);t.length<4;)t.push(t[0]);return t}function c(e){return e.map(l)}return function e(t){var n,r=t.type;switch(r){case"GeometryCollection":return{type:r,geometries:t.geometries.map(e)};case"Point":n=a(t.coordinates);break;case"MultiPoint":n=t.coordinates.map(a);break;case"LineString":n=s(t.arcs);break;case"MultiLineString":n=t.arcs.map(s);break;case"Polygon":n=c(t.arcs);break;case"MultiPolygon":n=t.arcs.map(c);break;default:return null}return{type:r,coordinates:n}}(t)}function c(e,t){var n={},r={},o={},i=[],a=-1;function s(e,t){for(var r in e){var o=e[r];delete t[o.start],delete o.start,delete o.end,o.forEach((function(e){n[e<0?~e:e]=1})),i.push(o)}}return t.forEach((function(n,r){var o,i=e.arcs[n<0?~n:n];i.length<3&&!i[1][0]&&!i[1][1]&&(o=t[++a],t[a]=n,t[r]=o)})),t.forEach((function(t){var n,i,a=function(t){var n,r=e.arcs[t<0?~t:t],o=r[0];e.transform?(n=[0,0],r.forEach((function(e){n[0]+=e[0],n[1]+=e[1]}))):n=r[r.length-1];return t<0?[n,o]:[o,n]}(t),s=a[0],l=a[1];if(n=o[s])if(delete o[n.end],n.push(t),n.end=l,i=r[l]){delete r[i.start];var c=i===n?n:n.concat(i);r[c.start=n.start]=o[c.end=i.end]=c}else r[n.start]=o[n.end]=n;else if(n=r[l])if(delete r[n.start],n.unshift(t),n.start=s,i=o[s]){delete o[i.end];var u=i===n?n:i.concat(n);r[u.start=i.start]=o[u.end=n.end]=u}else r[n.start]=o[n.end]=n;else r[(n=[t]).start=s]=o[n.end=l]=n})),s(o,r),s(r,o),t.forEach((function(e){n[e<0?~e:e]||i.push([e])})),i}function u(e){return l(e,d.apply(this,arguments))}function d(e,t,n){var r,o,i;if(arguments.length>1)r=function(e,t,n){var r,o=[],i=[];function a(e){var t=e<0?~e:e;(i[t]||(i[t]=[])).push({i:e,g:r})}function s(e){e.forEach(a)}function l(e){e.forEach(s)}function c(e){e.forEach(l)}function u(e){switch(r=e,e.type){case"GeometryCollection":e.geometries.forEach(u);break;case"LineString":s(e.arcs);break;case"MultiLineString":case"Polygon":l(e.arcs);break;case"MultiPolygon":c(e.arcs)}}return u(t),i.forEach(null==n?function(e){o.push(e[0].i)}:function(e){n(e[0].g,e[e.length-1].g)&&o.push(e[0].i)}),o}(0,t,n);else for(o=0,r=new Array(i=e.arcs.length);o<i;++o)r[o]=o;return{type:"MultiLineString",arcs:c(e,r)}}function f(e){return l(e,p.apply(this,arguments))}function p(e,t){var n={},r=[],o=[];function i(e){e.forEach((function(t){t.forEach((function(t){(n[t=t<0?~t:t]||(n[t]=[])).push(e)}))})),r.push(e)}function a(t){return function(e){for(var t,n=-1,r=e.length,o=e[r-1],i=0;++n<r;)t=o,o=e[n],i+=t[0]*o[1]-t[1]*o[0];return Math.abs(i)}(l(e,{type:"Polygon",arcs:[t]}).coordinates[0])}return t.forEach((function e(t){switch(t.type){case"GeometryCollection":t.geometries.forEach(e);break;case"Polygon":i(t.arcs);break;case"MultiPolygon":t.arcs.forEach(i)}})),r.forEach((function(e){if(!e._){var t=[],r=[e];for(e._=1,o.push(t);e=r.pop();)t.push(e),e.forEach((function(e){e.forEach((function(e){n[e<0?~e:e].forEach((function(e){e._||(e._=1,r.push(e))}))}))}))}})),r.forEach((function(e){delete e._})),{type:"MultiPolygon",arcs:o.map((function(t){var r,o=[];if(t.forEach((function(e){e.forEach((function(e){e.forEach((function(e){n[e<0?~e:e].length<2&&o.push(e)}))}))})),(r=(o=c(e,o)).length)>1)for(var i,s,l=1,u=a(o[0]);l<r;++l)(i=a(o[l]))>u&&(s=o[0],o[0]=o[l],o[l]=s,u=i);return o})).filter((function(e){return e.length>0}))}}function h(e,t){for(var n=0,r=e.length;n<r;){var o=n+r>>>1;e[o]<t?n=o+1:r=o}return n}function m(e){var t={},n=e.map((function(){return[]}));function r(e,n){e.forEach((function(e){e<0&&(e=~e);var r=t[e];r?r.push(n):t[e]=[n]}))}function o(e,t){e.forEach((function(e){r(e,t)}))}var i={LineString:r,MultiLineString:o,Polygon:o,MultiPolygon:function(e,t){e.forEach((function(e){o(e,t)}))}};for(var a in e.forEach((function e(t,n){"GeometryCollection"===t.type?t.geometries.forEach((function(t){e(t,n)})):t.type in i&&i[t.type](t.arcs,n)})),t)for(var s=t[a],l=s.length,c=0;c<l;++c)for(var u=c+1;u<l;++u){var d,f=s[c],p=s[u];(d=n[f])[a=h(d,p)]!==p&&d.splice(a,0,p),(d=n[p])[a=h(d,f)]!==f&&d.splice(a,0,f)}return n}function g(e){if(null==e)return r;var t,n,o=e.scale[0],i=e.scale[1],a=e.translate[0],s=e.translate[1];return function(e,r){r||(t=n=0);var l=2,c=e.length,u=new Array(c),d=Math.round((e[0]-a)/o),f=Math.round((e[1]-s)/i);for(u[0]=d-t,t=d,u[1]=f-n,n=f;l<c;)u[l]=e[l],++l;return u}}function x(e,t){if(e.transform)throw new Error("already quantized");if(t&&t.scale)l=e.bbox;else{if(!((n=Math.floor(t))>=2))throw new Error("n must be \u22652");var n,r=(l=e.bbox||i(e))[0],o=l[1],a=l[2],s=l[3];t={scale:[a-r?(a-r)/(n-1):1,s-o?(s-o)/(n-1):1],translate:[r,o]}}var l,c,u=g(t),d=e.objects,f={};function p(e){return u(e)}function h(e){var t;switch(e.type){case"GeometryCollection":t={type:"GeometryCollection",geometries:e.geometries.map(h)};break;case"Point":t={type:"Point",coordinates:p(e.coordinates)};break;case"MultiPoint":t={type:"MultiPoint",coordinates:e.coordinates.map(p)};break;default:return e}return null!=e.id&&(t.id=e.id),null!=e.bbox&&(t.bbox=e.bbox),null!=e.properties&&(t.properties=e.properties),t}for(c in d)f[c]=h(d[c]);return{type:"Topology",bbox:l,transform:t,objects:f,arcs:e.arcs.map((function(e){var t,n=0,r=1,o=e.length,i=new Array(o);for(i[0]=u(e[0],0);++n<o;)((t=u(e[n],n))[0]||t[1])&&(i[r++]=t);return 1===r&&(i[r++]=[0,0]),i.length=r,i}))}}n.r(t),n.d(t,{bbox:()=>i,feature:()=>a,merge:()=>f,mergeArcs:()=>p,mesh:()=>u,meshArcs:()=>d,neighbors:()=>m,quantize:()=>x,transform:()=>o,untransform:()=>g})}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var i=Object.create(null);n.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>r[e]));return a.default=()=>r,n.d(i,a),i}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>"static/js/"+e+".d855a71b.chunk.js",n.miniCssF=e=>{},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="frontend:";n.l=(r,o,i,a)=>{if(e[r])e[r].push(o);else{var s,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+i){s=d;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=r),e[r]=[o];var f=(t,n)=>{s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={792:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise(((n,r)=>o=e[t]=[n,r]));r.push(o[2]=i);var a=n.p+n.u(t),s=new Error;n.l(a,(r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var o,i,a=r[0],s=r[1],l=r[2],c=0;if(a.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)l(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunkfrontend=self.webpackChunkfrontend||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e={};n.r(e),n.d(e,{hasBrowserEnv:()=>mn,hasStandardBrowserEnv:()=>xn,hasStandardBrowserWebWorkerEnv:()=>vn,navigator:()=>gn,origin:()=>yn});var t,r=n(5043),o=n.t(r,2),i=n(4391),a=n(7950),s=n.t(a,2);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(t||(t={}));const c="popstate";function u(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function d(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function f(e,t){return{usr:e.state,key:e.key,idx:t}}function p(e,t,n,r){return void 0===n&&(n=null),l({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?m(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function h(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function m(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function g(e,n,r,o){void 0===o&&(o={});let{window:i=document.defaultView,v5Compat:a=!1}=o,s=i.history,d=t.Pop,m=null,g=x();function x(){return(s.state||{idx:null}).idx}function v(){d=t.Pop;let e=x(),n=null==e?null:e-g;g=e,m&&m({action:d,location:b.location,delta:n})}function y(e){let t="null"!==i.location.origin?i.location.origin:i.location.href,n="string"===typeof e?e:h(e);return n=n.replace(/ $/,"%20"),u(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==g&&(g=0,s.replaceState(l({},s.state,{idx:g}),""));let b={get action(){return d},get location(){return e(i,s)},listen(e){if(m)throw new Error("A history only accepts one active listener");return i.addEventListener(c,v),m=e,()=>{i.removeEventListener(c,v),m=null}},createHref:e=>n(i,e),createURL:y,encodeLocation(e){let t=y(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,n){d=t.Push;let o=p(b.location,e,n);r&&r(o,e),g=x()+1;let l=f(o,g),c=b.createHref(o);try{s.pushState(l,"",c)}catch(u){if(u instanceof DOMException&&"DataCloneError"===u.name)throw u;i.location.assign(c)}a&&m&&m({action:d,location:b.location,delta:1})},replace:function(e,n){d=t.Replace;let o=p(b.location,e,n);r&&r(o,e),g=x();let i=f(o,g),l=b.createHref(o);s.replaceState(i,"",l),a&&m&&m({action:d,location:b.location,delta:0})},go:e=>s.go(e)};return b}var x;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(x||(x={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function v(e,t,n){return void 0===n&&(n="/"),y(e,t,n,!1)}function y(e,t,n,r){let o=T(("string"===typeof t?m(t):t).pathname||"/",n);if(null==o)return null;let i=b(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(i);let a=null;for(let s=0;null==a&&s<i.length;++s){let e=O(o);a=z(i[s],e,r)}return a}function b(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let o=(e,o,i)=>{let a={relativePath:void 0===i?e.path||"":i,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e};a.relativePath.startsWith("/")&&(u(a.relativePath.startsWith(r),'Absolute route path "'+a.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),a.relativePath=a.relativePath.slice(r.length));let s=_([r,a.relativePath]),l=n.concat(a);e.children&&e.children.length>0&&(u(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+s+'".'),b(e.children,t,l,s)),(null!=e.path||e.index)&&t.push({path:s,score:N(s,e.index),routesMeta:l})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of w(e.path))o(e,t,r);else o(e,t)})),t}function w(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(0===r.length)return o?[i,""]:[i];let a=w(r.join("/")),s=[];return s.push(...a.map((e=>""===e?i:[i,e].join("/")))),o&&s.push(...a),s.map((t=>e.startsWith("/")&&""===t?"/":t))}const S=/^:[\w-]+$/,k=3,j=2,E=1,C=10,A=-2,P=e=>"*"===e;function N(e,t){let n=e.split("/"),r=n.length;return n.some(P)&&(r+=A),t&&(r+=j),n.filter((e=>!P(e))).reduce(((e,t)=>e+(S.test(t)?k:""===t?E:C)),r)}function z(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,o={},i="/",a=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===i?t:t.slice(i.length)||"/",u=R({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),d=e.route;if(!u&&l&&n&&!r[r.length-1].route.index&&(u=R({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!u)return null;Object.assign(o,u.params),a.push({params:o,pathname:_([i,u.pathname]),pathnameBase:I(_([i,u.pathnameBase])),route:d}),"/"!==u.pathnameBase&&(i=_([i,u.pathnameBase]))}return a}function R(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);d("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(r.push({paramName:"*"}),o+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":""!==e&&"/"!==e&&(o+="(?:(?=\\/|$))");let i=new RegExp(o,t?void 0:"i");return[i,r]}(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),s=o.slice(1),l=r.reduce(((e,t,n)=>{let{paramName:r,isOptional:o}=t;if("*"===r){let e=s[n]||"";a=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=o&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{});return{params:l,pathname:i,pathnameBase:a,pattern:e}}function O(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return d(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function T(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function L(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function F(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}function M(e,t){let n=F(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function D(e,t,n,r){let o;void 0===r&&(r=!1),"string"===typeof e?o=m(e):(o=l({},e),u(!o.pathname||!o.pathname.includes("?"),L("?","pathname","search",o)),u(!o.pathname||!o.pathname.includes("#"),L("#","pathname","hash",o)),u(!o.search||!o.search.includes("#"),L("#","search","hash",o)));let i,a=""===e||""===o.pathname,s=a?"/":o.pathname;if(null==s)i=n;else{let e=t.length-1;if(!r&&s.startsWith("..")){let t=s.split("/");for(;".."===t[0];)t.shift(),e-=1;o.pathname=t.join("/")}i=e>=0?t[e]:"/"}let c=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:o=""}="string"===typeof e?m(e):e,i=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:i,search:U(r),hash:B(o)}}(o,i),d=s&&"/"!==s&&s.endsWith("/"),f=(a||"."===s)&&n.endsWith("/");return c.pathname.endsWith("/")||!d&&!f||(c.pathname+="/"),c}const _=e=>e.join("/").replace(/\/\/+/g,"/"),I=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),U=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",B=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function W(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const H=["post","put","patch","delete"],q=(new Set(H),["get",...H]);new Set(q),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function V(){return V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},V.apply(this,arguments)}const K=r.createContext(null);const Y=r.createContext(null);const G=r.createContext(null);const Q=r.createContext(null);const J=r.createContext({outlet:null,matches:[],isDataRoute:!1});const X=r.createContext(null);function Z(){return null!=r.useContext(Q)}function $(){return Z()||u(!1),r.useContext(Q).location}function ee(e){r.useContext(G).static||r.useLayoutEffect(e)}function te(){let{isDataRoute:e}=r.useContext(J);return e?function(){let{router:e}=fe(ue.UseNavigateStable),t=he(de.UseNavigateStable),n=r.useRef(!1);return ee((()=>{n.current=!0})),r.useCallback((function(r,o){void 0===o&&(o={}),n.current&&("number"===typeof r?e.navigate(r):e.navigate(r,V({fromRouteId:t},o)))}),[e,t])}():function(){Z()||u(!1);let e=r.useContext(K),{basename:t,future:n,navigator:o}=r.useContext(G),{matches:i}=r.useContext(J),{pathname:a}=$(),s=JSON.stringify(M(i,n.v7_relativeSplatPath)),l=r.useRef(!1);return ee((()=>{l.current=!0})),r.useCallback((function(n,r){if(void 0===r&&(r={}),!l.current)return;if("number"===typeof n)return void o.go(n);let i=D(n,JSON.parse(s),a,"path"===r.relative);null==e&&"/"!==t&&(i.pathname="/"===i.pathname?t:_([t,i.pathname])),(r.replace?o.replace:o.push)(i,r.state,r)}),[t,o,s,a,e])}()}function ne(){let{matches:e}=r.useContext(J),t=e[e.length-1];return t?t.params:{}}function re(e,t){let{relative:n}=void 0===t?{}:t,{future:o}=r.useContext(G),{matches:i}=r.useContext(J),{pathname:a}=$(),s=JSON.stringify(M(i,o.v7_relativeSplatPath));return r.useMemo((()=>D(e,JSON.parse(s),a,"path"===n)),[e,s,a,n])}function oe(e,n,o,i){Z()||u(!1);let{navigator:a,static:s}=r.useContext(G),{matches:l}=r.useContext(J),c=l[l.length-1],d=c?c.params:{},f=(c&&c.pathname,c?c.pathnameBase:"/");c&&c.route;let p,h=$();if(n){var g;let e="string"===typeof n?m(n):n;"/"===f||(null==(g=e.pathname)?void 0:g.startsWith(f))||u(!1),p=e}else p=h;let x=p.pathname||"/",y=x;if("/"!==f){let e=f.replace(/^\//,"").split("/");y="/"+x.replace(/^\//,"").split("/").slice(e.length).join("/")}let b=!s&&o&&o.matches&&o.matches.length>0?o.matches:v(e,{pathname:y});let w=ce(b&&b.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:_([f,a.encodeLocation?a.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?f:_([f,a.encodeLocation?a.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),l,o,i);return n&&w?r.createElement(Q.Provider,{value:{location:V({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:t.Pop}},w):w}function ie(){let e=function(){var e;let t=r.useContext(X),n=pe(de.UseRouteError),o=he(de.UseRouteError);if(void 0!==t)return t;return null==(e=n.errors)?void 0:e[o]}(),t=W(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:o};return r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:i},n):null,null)}const ae=r.createElement(ie,null);class se extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?r.createElement(J.Provider,{value:this.props.routeContext},r.createElement(X.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function le(e){let{routeContext:t,match:n,children:o}=e,i=r.useContext(K);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(J.Provider,{value:t},o)}function ce(e,t,n,o){var i;if(void 0===t&&(t=[]),void 0===n&&(n=null),void 0===o&&(o=null),null==e){var a;if(!n)return null;if(n.errors)e=n.matches;else{if(!(null!=(a=o)&&a.v7_partialHydration&&0===t.length&&!n.initialized&&n.matches.length>0))return null;e=n.matches}}let s=e,l=null==(i=n)?void 0:i.errors;if(null!=l){let e=s.findIndex((e=>e.route.id&&void 0!==(null==l?void 0:l[e.route.id])));e>=0||u(!1),s=s.slice(0,Math.min(s.length,e+1))}let c=!1,d=-1;if(n&&o&&o.v7_partialHydration)for(let r=0;r<s.length;r++){let e=s[r];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(d=r),e.route.id){let{loaderData:t,errors:r}=n,o=e.route.loader&&void 0===t[e.route.id]&&(!r||void 0===r[e.route.id]);if(e.route.lazy||o){c=!0,s=d>=0?s.slice(0,d+1):[s[0]];break}}}return s.reduceRight(((e,o,i)=>{let a,u=!1,f=null,p=null;var h;n&&(a=l&&o.route.id?l[o.route.id]:void 0,f=o.route.errorElement||ae,c&&(d<0&&0===i?(h="route-fallback",!1||me[h]||(me[h]=!0),u=!0,p=null):d===i&&(u=!0,p=o.route.hydrateFallbackElement||null)));let m=t.concat(s.slice(0,i+1)),g=()=>{let t;return t=a?f:u?p:o.route.Component?r.createElement(o.route.Component,null):o.route.element?o.route.element:e,r.createElement(le,{match:o,routeContext:{outlet:e,matches:m,isDataRoute:null!=n},children:t})};return n&&(o.route.ErrorBoundary||o.route.errorElement||0===i)?r.createElement(se,{location:n.location,revalidation:n.revalidation,component:f,error:a,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):g()}),null)}var ue=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ue||{}),de=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(de||{});function fe(e){let t=r.useContext(K);return t||u(!1),t}function pe(e){let t=r.useContext(Y);return t||u(!1),t}function he(e){let t=function(){let e=r.useContext(J);return e||u(!1),e}(),n=t.matches[t.matches.length-1];return n.route.id||u(!1),n.route.id}const me={};function ge(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}o.startTransition;function xe(e){u(!1)}function ve(e){let{basename:n="/",children:o=null,location:i,navigationType:a=t.Pop,navigator:s,static:l=!1,future:c}=e;Z()&&u(!1);let d=n.replace(/^\/*/,"/"),f=r.useMemo((()=>({basename:d,navigator:s,static:l,future:V({v7_relativeSplatPath:!1},c)})),[d,c,s,l]);"string"===typeof i&&(i=m(i));let{pathname:p="/",search:h="",hash:g="",state:x=null,key:v="default"}=i,y=r.useMemo((()=>{let e=T(p,d);return null==e?null:{location:{pathname:e,search:h,hash:g,state:x,key:v},navigationType:a}}),[d,p,h,g,x,v,a]);return null==y?null:r.createElement(G.Provider,{value:f},r.createElement(Q.Provider,{children:o,value:y}))}function ye(e){let{children:t,location:n}=e;return oe(be(t),n)}new Promise((()=>{}));r.Component;function be(e,t){void 0===t&&(t=[]);let n=[];return r.Children.forEach(e,((e,o)=>{if(!r.isValidElement(e))return;let i=[...t,o];if(e.type===r.Fragment)return void n.push.apply(n,be(e.props.children,i));e.type!==xe&&u(!1),e.props.index&&e.props.children&&u(!1);let a={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=be(e.props.children,i)),n.push(a)})),n}function we(){return we=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},we.apply(this,arguments)}function Se(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const ke=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],je=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];try{window.__reactRouterVersion="6"}catch(rS){}const Ee=r.createContext({isTransitioning:!1});new Map;const Ce=o.startTransition;s.flushSync,o.useId;function Ae(e){let{basename:t,children:n,future:o,window:i}=e,a=r.useRef();var s;null==a.current&&(a.current=(void 0===(s={window:i,v5Compat:!0})&&(s={}),g((function(e,t){let{pathname:n,search:r,hash:o}=e.location;return p("",{pathname:n,search:r,hash:o},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"===typeof t?t:h(t)}),null,s)));let l=a.current,[c,u]=r.useState({action:l.action,location:l.location}),{v7_startTransition:d}=o||{},f=r.useCallback((e=>{d&&Ce?Ce((()=>u(e))):u(e)}),[u,d]);return r.useLayoutEffect((()=>l.listen(f)),[l,f]),r.useEffect((()=>ge(o)),[o]),r.createElement(ve,{basename:t,children:n,location:c.location,navigationType:c.action,navigator:l,future:o})}const Pe="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,Ne=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ze=r.forwardRef((function(e,t){let n,{onClick:o,relative:i,reloadDocument:a,replace:s,state:l,target:c,to:d,preventScrollReset:f,viewTransition:p}=e,m=Se(e,ke),{basename:g}=r.useContext(G),x=!1;if("string"===typeof d&&Ne.test(d)&&(n=d,Pe))try{let e=new URL(window.location.href),t=d.startsWith("//")?new URL(e.protocol+d):new URL(d),n=T(t.pathname,g);t.origin===e.origin&&null!=n?d=n+t.search+t.hash:x=!0}catch(rS){}let v=function(e,t){let{relative:n}=void 0===t?{}:t;Z()||u(!1);let{basename:o,navigator:i}=r.useContext(G),{hash:a,pathname:s,search:l}=re(e,{relative:n}),c=s;return"/"!==o&&(c="/"===s?o:_([o,s])),i.createHref({pathname:c,search:l,hash:a})}(d,{relative:i}),y=function(e,t){let{target:n,replace:o,state:i,preventScrollReset:a,relative:s,viewTransition:l}=void 0===t?{}:t,c=te(),u=$(),d=re(e,{relative:s});return r.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,n)){t.preventDefault();let n=void 0!==o?o:h(u)===h(d);c(e,{replace:n,state:i,preventScrollReset:a,relative:s,viewTransition:l})}}),[u,c,d,o,i,n,e,a,s,l])}(d,{replace:s,state:l,target:c,preventScrollReset:f,relative:i,viewTransition:p});return r.createElement("a",we({},m,{href:n||v,onClick:x||a?o:function(e){o&&o(e),e.defaultPrevented||y(e)},ref:t,target:c}))}));const Re=r.forwardRef((function(e,t){let{"aria-current":n="page",caseSensitive:o=!1,className:i="",end:a=!1,style:s,to:l,viewTransition:c,children:d}=e,f=Se(e,je),p=re(l,{relative:f.relative}),h=$(),m=r.useContext(Y),{navigator:g,basename:x}=r.useContext(G),v=null!=m&&function(e,t){void 0===t&&(t={});let n=r.useContext(Ee);null==n&&u(!1);let{basename:o}=Le(Oe.useViewTransitionState),i=re(e,{relative:t.relative});if(!n.isTransitioning)return!1;let a=T(n.currentLocation.pathname,o)||n.currentLocation.pathname,s=T(n.nextLocation.pathname,o)||n.nextLocation.pathname;return null!=R(i.pathname,s)||null!=R(i.pathname,a)}(p)&&!0===c,y=g.encodeLocation?g.encodeLocation(p).pathname:p.pathname,b=h.pathname,w=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;o||(b=b.toLowerCase(),w=w?w.toLowerCase():null,y=y.toLowerCase()),w&&x&&(w=T(w,x)||w);const S="/"!==y&&y.endsWith("/")?y.length-1:y.length;let k,j=b===y||!a&&b.startsWith(y)&&"/"===b.charAt(S),E=null!=w&&(w===y||!a&&w.startsWith(y)&&"/"===w.charAt(y.length)),C={isActive:j,isPending:E,isTransitioning:v},A=j?n:void 0;k="function"===typeof i?i(C):[i,j?"active":null,E?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let P="function"===typeof s?s(C):s;return r.createElement(ze,we({},f,{"aria-current":A,className:k,ref:t,style:P,to:l,viewTransition:c}),"function"===typeof d?d(C):d)}));var Oe,Te;function Le(e){let t=r.useContext(K);return t||u(!1),t}(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Oe||(Oe={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(Te||(Te={}));const Fe=n.p+"static/media/logo.7b976746aab6e5246566.png";var Me={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},De=r.createContext&&r.createContext(Me),_e=["attr","size","title"];function Ie(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Ue(){return Ue=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ue.apply(this,arguments)}function Be(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function We(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Be(Object(n),!0).forEach((function(t){He(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Be(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function He(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qe(e){return e&&e.map(((e,t)=>r.createElement(e.tag,We({key:t},e.attr),qe(e.child))))}function Ve(e){return t=>r.createElement(Ke,Ue({attr:We({},e.attr)},t),qe(e.child))}function Ke(e){var t=t=>{var n,{attr:o,size:i,title:a}=e,s=Ie(e,_e),l=i||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",Ue({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,s,{className:n,style:We(We({color:e.color||t.color},t.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&r.createElement("title",null,a),e.children)};return void 0!==De?r.createElement(De.Consumer,null,(e=>t(e))):t(Me)}function Ye(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 19 5 12 12 5"},child:[]}]})(e)}function Ge(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 5 19 12 12 19"},child:[]}]})(e)}function Qe(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 12 15 18 9"},child:[]}]})(e)}function Je(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"},child:[]}]})(e)}function Xe(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"2",y1:"12",x2:"22",y2:"12"},child:[]},{tag:"path",attr:{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"},child:[]}]})(e)}function Ze(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"8.5",r:"1.5"},child:[]},{tag:"polyline",attr:{points:"21 15 16 10 5 21"},child:[]}]})(e)}function $e(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"},child:[]},{tag:"polyline",attr:{points:"16 17 21 12 16 7"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"9",y2:"12"},child:[]}]})(e)}function et(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(e)}function tt(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"},child:[]}]})(e)}function nt(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(e)}function rt(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"},child:[]}]})(e)}function ot(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"},child:[]}]})(e)}function it(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(e)}function at(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"22",y1:"2",x2:"11",y2:"13"},child:[]},{tag:"polygon",attr:{points:"22 2 15 22 11 13 2 9 22 2"},child:[]}]})(e)}function st(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"},child:[]},{tag:"line",attr:{x1:"7",y1:"7",x2:"7.01",y2:"7"},child:[]}]})(e)}function lt(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(e)}function ct(e){return Ve({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(e)}function ut(e,t){return function(){return e.apply(t,arguments)}}const{toString:dt}=Object.prototype,{getPrototypeOf:ft}=Object,pt=(ht=Object.create(null),e=>{const t=dt.call(e);return ht[t]||(ht[t]=t.slice(8,-1).toLowerCase())});var ht;const mt=e=>(e=e.toLowerCase(),t=>pt(t)===e),gt=e=>t=>typeof t===e,{isArray:xt}=Array,vt=gt("undefined");const yt=mt("ArrayBuffer");const bt=gt("string"),wt=gt("function"),St=gt("number"),kt=e=>null!==e&&"object"===typeof e,jt=e=>{if("object"!==pt(e))return!1;const t=ft(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Et=mt("Date"),Ct=mt("File"),At=mt("Blob"),Pt=mt("FileList"),Nt=mt("URLSearchParams"),[zt,Rt,Ot,Tt]=["ReadableStream","Request","Response","Headers"].map(mt);function Lt(e,t){let n,r,{allOwnKeys:o=!1}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),xt(e))for(n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else{const r=o?Object.getOwnPropertyNames(e):Object.keys(e),i=r.length;let a;for(n=0;n<i;n++)a=r[n],t.call(null,e[a],a,e)}}function Ft(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const Mt="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:global,Dt=e=>!vt(e)&&e!==Mt;const _t=(It="undefined"!==typeof Uint8Array&&ft(Uint8Array),e=>It&&e instanceof It);var It;const Ut=mt("HTMLFormElement"),Bt=(e=>{let{hasOwnProperty:t}=e;return(e,n)=>t.call(e,n)})(Object.prototype),Wt=mt("RegExp"),Ht=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Lt(n,((n,o)=>{let i;!1!==(i=t(n,o,e))&&(r[o]=i||n)})),Object.defineProperties(e,r)};const qt=mt("AsyncFunction"),Vt=(Kt="function"===typeof setImmediate,Yt=wt(Mt.postMessage),Kt?setImmediate:Yt?((e,t)=>(Mt.addEventListener("message",(n=>{let{source:r,data:o}=n;r===Mt&&o===e&&t.length&&t.shift()()}),!1),n=>{t.push(n),Mt.postMessage(e,"*")}))(`axios@${Math.random()}`,[]):e=>setTimeout(e));var Kt,Yt;const Gt="undefined"!==typeof queueMicrotask?queueMicrotask.bind(Mt):"undefined"!==typeof process&&process.nextTick||Vt,Qt={isArray:xt,isArrayBuffer:yt,isBuffer:function(e){return null!==e&&!vt(e)&&null!==e.constructor&&!vt(e.constructor)&&wt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"===typeof FormData&&e instanceof FormData||wt(e.append)&&("formdata"===(t=pt(e))||"object"===t&&wt(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&yt(e.buffer),t},isString:bt,isNumber:St,isBoolean:e=>!0===e||!1===e,isObject:kt,isPlainObject:jt,isReadableStream:zt,isRequest:Rt,isResponse:Ot,isHeaders:Tt,isUndefined:vt,isDate:Et,isFile:Ct,isBlob:At,isRegExp:Wt,isFunction:wt,isStream:e=>kt(e)&&wt(e.pipe),isURLSearchParams:Nt,isTypedArray:_t,isFileList:Pt,forEach:Lt,merge:function e(){const{caseless:t}=Dt(this)&&this||{},n={},r=(r,o)=>{const i=t&&Ft(n,o)||o;jt(n[i])&&jt(r)?n[i]=e(n[i],r):jt(r)?n[i]=e({},r):xt(r)?n[i]=r.slice():n[i]=r};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&Lt(arguments[o],r);return n},extend:function(e,t,n){let{allOwnKeys:r}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return Lt(t,((t,r)=>{n&&wt(t)?e[r]=ut(t,n):e[r]=t}),{allOwnKeys:r}),e},trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,i,a;const s={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),i=o.length;i-- >0;)a=o[i],r&&!r(a,e,t)||s[a]||(t[a]=e[a],s[a]=!0);e=!1!==n&&ft(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:pt,kindOfTest:mt,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(xt(e))return e;let t=e.length;if(!St(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:Ut,hasOwnProperty:Bt,hasOwnProp:Bt,reduceDescriptors:Ht,freezeMethods:e=>{Ht(e,((t,n)=>{if(wt(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];wt(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return xt(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>null!=e&&Number.isFinite(e=+e)?e:t,findKey:Ft,global:Mt,isContextDefined:Dt,isSpecCompliantForm:function(e){return!!(e&&wt(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(kt(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=xt(e)?[]:{};return Lt(e,((e,t)=>{const i=n(e,r+1);!vt(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:qt,isThenable:e=>e&&(kt(e)||wt(e))&&wt(e.then)&&wt(e.catch),setImmediate:Vt,asap:Gt};function Jt(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o,this.status=o.status?o.status:null)}Qt.inherits(Jt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:Qt.toJSONObject(this.config),code:this.code,status:this.status}}});const Xt=Jt.prototype,Zt={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{Zt[e]={value:e}})),Object.defineProperties(Jt,Zt),Object.defineProperty(Xt,"isAxiosError",{value:!0}),Jt.from=(e,t,n,r,o,i)=>{const a=Object.create(Xt);return Qt.toFlatObject(e,a,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),Jt.call(a,e.message,t,n,r,o),a.cause=e,a.name=e.name,i&&Object.assign(a,i),a};const $t=Jt;function en(e){return Qt.isPlainObject(e)||Qt.isArray(e)}function tn(e){return Qt.endsWith(e,"[]")?e.slice(0,-2):e}function nn(e,t,n){return e?e.concat(t).map((function(e,t){return e=tn(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const rn=Qt.toFlatObject(Qt,{},null,(function(e){return/^is[A-Z]/.test(e)}));const on=function(e,t,n){if(!Qt.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=Qt.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!Qt.isUndefined(t[e])}))).metaTokens,o=n.visitor||c,i=n.dots,a=n.indexes,s=(n.Blob||"undefined"!==typeof Blob&&Blob)&&Qt.isSpecCompliantForm(t);if(!Qt.isFunction(o))throw new TypeError("visitor must be a function");function l(e){if(null===e)return"";if(Qt.isDate(e))return e.toISOString();if(!s&&Qt.isBlob(e))throw new $t("Blob is not supported. Use a Buffer instead.");return Qt.isArrayBuffer(e)||Qt.isTypedArray(e)?s&&"function"===typeof Blob?new Blob([e]):Buffer.from(e):e}function c(e,n,o){let s=e;if(e&&!o&&"object"===typeof e)if(Qt.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(Qt.isArray(e)&&function(e){return Qt.isArray(e)&&!e.some(en)}(e)||(Qt.isFileList(e)||Qt.endsWith(n,"[]"))&&(s=Qt.toArray(e)))return n=tn(n),s.forEach((function(e,r){!Qt.isUndefined(e)&&null!==e&&t.append(!0===a?nn([n],r,i):null===a?n:n+"[]",l(e))})),!1;return!!en(e)||(t.append(nn(o,n,i),l(e)),!1)}const u=[],d=Object.assign(rn,{defaultVisitor:c,convertValue:l,isVisitable:en});if(!Qt.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!Qt.isUndefined(n)){if(-1!==u.indexOf(n))throw Error("Circular reference detected in "+r.join("."));u.push(n),Qt.forEach(n,(function(n,i){!0===(!(Qt.isUndefined(n)||null===n)&&o.call(t,n,Qt.isString(i)?i.trim():i,r,d))&&e(n,r?r.concat(i):[i])})),u.pop()}}(e),t};function an(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function sn(e,t){this._pairs=[],e&&on(e,this,t)}const ln=sn.prototype;ln.append=function(e,t){this._pairs.push([e,t])},ln.toString=function(e){const t=e?function(t){return e.call(this,t,an)}:an;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const cn=sn;function un(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function dn(e,t,n){if(!t)return e;const r=n&&n.encode||un;Qt.isFunction(n)&&(n={serialize:n});const o=n&&n.serialize;let i;if(i=o?o(t,n):Qt.isURLSearchParams(t)?t.toString():new cn(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}const fn=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){Qt.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},pn={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},hn={isBrowser:!0,classes:{URLSearchParams:"undefined"!==typeof URLSearchParams?URLSearchParams:cn,FormData:"undefined"!==typeof FormData?FormData:null,Blob:"undefined"!==typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},mn="undefined"!==typeof window&&"undefined"!==typeof document,gn="object"===typeof navigator&&navigator||void 0,xn=mn&&(!gn||["ReactNative","NativeScript","NS"].indexOf(gn.product)<0),vn="undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"===typeof self.importScripts,yn=mn&&window.location.href||"http://localhost",bn={...e,...hn};const wn=function(e){function t(e,n,r,o){let i=e[o++];if("__proto__"===i)return!0;const a=Number.isFinite(+i),s=o>=e.length;if(i=!i&&Qt.isArray(r)?r.length:i,s)return Qt.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!a;r[i]&&Qt.isObject(r[i])||(r[i]=[]);return t(e,n,r[i],o)&&Qt.isArray(r[i])&&(r[i]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(r[i])),!a}if(Qt.isFormData(e)&&Qt.isFunction(e.entries)){const n={};return Qt.forEachEntry(e,((e,r)=>{t(function(e){return Qt.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null};const Sn={transitional:pn,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=Qt.isObject(e);o&&Qt.isHTMLForm(e)&&(e=new FormData(e));if(Qt.isFormData(e))return r?JSON.stringify(wn(e)):e;if(Qt.isArrayBuffer(e)||Qt.isBuffer(e)||Qt.isStream(e)||Qt.isFile(e)||Qt.isBlob(e)||Qt.isReadableStream(e))return e;if(Qt.isArrayBufferView(e))return e.buffer;if(Qt.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return on(e,new bn.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return bn.isNode&&Qt.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((i=Qt.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return on(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(Qt.isString(e))try{return(t||JSON.parse)(e),Qt.trim(e)}catch(rS){if("SyntaxError"!==rS.name)throw rS}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Sn.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(Qt.isResponse(e)||Qt.isReadableStream(e))return e;if(e&&Qt.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(rS){if(n){if("SyntaxError"===rS.name)throw $t.from(rS,$t.ERR_BAD_RESPONSE,this,null,this.response);throw rS}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:bn.classes.FormData,Blob:bn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Qt.forEach(["delete","get","head","post","put","patch"],(e=>{Sn.headers[e]={}}));const kn=Sn,jn=Qt.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),En=Symbol("internals");function Cn(e){return e&&String(e).trim().toLowerCase()}function An(e){return!1===e||null==e?e:Qt.isArray(e)?e.map(An):String(e)}function Pn(e,t,n,r,o){return Qt.isFunction(r)?r.call(this,t,n):(o&&(t=n),Qt.isString(t)?Qt.isString(r)?-1!==t.indexOf(r):Qt.isRegExp(r)?r.test(t):void 0:void 0)}class Nn{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=Cn(t);if(!o)throw new Error("header name must be a non-empty string");const i=Qt.findKey(r,o);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=An(e))}const i=(e,t)=>Qt.forEach(e,((e,n)=>o(e,n,t)));if(Qt.isPlainObject(e)||e instanceof this.constructor)i(e,t);else if(Qt.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))i((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&jn[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t);else if(Qt.isHeaders(e))for(const[a,s]of e.entries())o(s,a,n);else null!=e&&o(t,e,n);return this}get(e,t){if(e=Cn(e)){const n=Qt.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(Qt.isFunction(t))return t.call(this,e,n);if(Qt.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=Cn(e)){const n=Qt.findKey(this,e);return!(!n||void 0===this[n]||t&&!Pn(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=Cn(e)){const o=Qt.findKey(n,e);!o||t&&!Pn(0,n[o],o,t)||(delete n[o],r=!0)}}return Qt.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!Pn(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return Qt.forEach(this,((r,o)=>{const i=Qt.findKey(n,o);if(i)return t[i]=An(r),void delete t[o];const a=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();a!==o&&delete t[o],t[a]=An(r),n[a]=!0})),this}concat(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.constructor.concat(this,...t)}toJSON(e){const t=Object.create(null);return Qt.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&Qt.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((e=>{let[t,n]=e;return t+": "+n})).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e){const t=new this(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.forEach((e=>t.set(e))),t}static accessor(e){const t=(this[En]=this[En]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=Cn(e);t[r]||(!function(e,t){const n=Qt.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return Qt.isArray(e)?e.forEach(r):r(e),this}}Nn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),Qt.reduceDescriptors(Nn.prototype,((e,t)=>{let{value:n}=e,r=t[0].toUpperCase()+t.slice(1);return{get:()=>n,set(e){this[r]=e}}})),Qt.freezeMethods(Nn);const zn=Nn;function Rn(e,t){const n=this||kn,r=t||n,o=zn.from(r.headers);let i=r.data;return Qt.forEach(e,(function(e){i=e.call(n,i,o.normalize(),t?t.status:void 0)})),o.normalize(),i}function On(e){return!(!e||!e.__CANCEL__)}function Tn(e,t,n){$t.call(this,null==e?"canceled":e,$t.ERR_CANCELED,t,n),this.name="CanceledError"}Qt.inherits(Tn,$t,{__CANCEL__:!0});const Ln=Tn;function Fn(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new $t("Request failed with status code "+n.status,[$t.ERR_BAD_REQUEST,$t.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}const Mn=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,a=0;return t=void 0!==t?t:1e3,function(s){const l=Date.now(),c=r[a];o||(o=l),n[i]=s,r[i]=l;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),l-o<t)return;const f=c&&l-c;return f?Math.round(1e3*d/f):void 0}};const Dn=function(e,t){let n,r,o=0,i=1e3/t;const a=function(t){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Date.now();o=i,n=null,r&&(clearTimeout(r),r=null),e.apply(null,t)};return[function(){const e=Date.now(),t=e-o;for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];t>=i?a(l,e):(n=l,r||(r=setTimeout((()=>{r=null,a(n)}),i-t)))},()=>n&&a(n)]},_n=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,r=0;const o=Mn(50,250);return Dn((n=>{const i=n.loaded,a=n.lengthComputable?n.total:void 0,s=i-r,l=o(s);r=i;e({loaded:i,total:a,progress:a?i/a:void 0,bytes:s,rate:l||void 0,estimated:l&&a&&i<=a?(a-i)/l:void 0,event:n,lengthComputable:null!=a,[t?"download":"upload"]:!0})}),n)},In=(e,t)=>{const n=null!=e;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Un=e=>function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Qt.asap((()=>e(...n)))},Bn=bn.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,bn.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(bn.origin),bn.navigator&&/(msie|trident)/i.test(bn.navigator.userAgent)):()=>!0,Wn=bn.hasStandardBrowserEnv?{write(e,t,n,r,o,i){const a=[e+"="+encodeURIComponent(t)];Qt.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),Qt.isString(r)&&a.push("path="+r),Qt.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function Hn(e,t,n){let r=!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);return e&&(r||0==n)?function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const qn=e=>e instanceof zn?{...e}:e;function Vn(e,t){t=t||{};const n={};function r(e,t,n,r){return Qt.isPlainObject(e)&&Qt.isPlainObject(t)?Qt.merge.call({caseless:r},e,t):Qt.isPlainObject(t)?Qt.merge({},t):Qt.isArray(t)?t.slice():t}function o(e,t,n,o){return Qt.isUndefined(t)?Qt.isUndefined(e)?void 0:r(void 0,e,0,o):r(e,t,0,o)}function i(e,t){if(!Qt.isUndefined(t))return r(void 0,t)}function a(e,t){return Qt.isUndefined(t)?Qt.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function s(n,o,i){return i in t?r(n,o):i in e?r(void 0,n):void 0}const l={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:s,headers:(e,t,n)=>o(qn(e),qn(t),0,!0)};return Qt.forEach(Object.keys(Object.assign({},e,t)),(function(r){const i=l[r]||o,a=i(e[r],t[r],r);Qt.isUndefined(a)&&i!==s||(n[r]=a)})),n}const Kn=e=>{const t=Vn({},e);let n,{data:r,withXSRFToken:o,xsrfHeaderName:i,xsrfCookieName:a,headers:s,auth:l}=t;if(t.headers=s=zn.from(s),t.url=dn(Hn(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),Qt.isFormData(r))if(bn.hasStandardBrowserEnv||bn.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(!1!==(n=s.getContentType())){const[e,...t]=n?n.split(";").map((e=>e.trim())).filter(Boolean):[];s.setContentType([e||"multipart/form-data",...t].join("; "))}if(bn.hasStandardBrowserEnv&&(o&&Qt.isFunction(o)&&(o=o(t)),o||!1!==o&&Bn(t.url))){const e=i&&a&&Wn.read(a);e&&s.set(i,e)}return t},Yn="undefined"!==typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){const r=Kn(e);let o=r.data;const i=zn.from(r.headers).normalize();let a,s,l,c,u,{responseType:d,onUploadProgress:f,onDownloadProgress:p}=r;function h(){c&&c(),u&&u(),r.cancelToken&&r.cancelToken.unsubscribe(a),r.signal&&r.signal.removeEventListener("abort",a)}let m=new XMLHttpRequest;function g(){if(!m)return;const r=zn.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders());Fn((function(e){t(e),h()}),(function(e){n(e),h()}),{data:d&&"text"!==d&&"json"!==d?m.response:m.responseText,status:m.status,statusText:m.statusText,headers:r,config:e,request:m}),m=null}m.open(r.method.toUpperCase(),r.url,!0),m.timeout=r.timeout,"onloadend"in m?m.onloadend=g:m.onreadystatechange=function(){m&&4===m.readyState&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))&&setTimeout(g)},m.onabort=function(){m&&(n(new $t("Request aborted",$t.ECONNABORTED,e,m)),m=null)},m.onerror=function(){n(new $t("Network Error",$t.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let t=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const o=r.transitional||pn;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new $t(t,o.clarifyTimeoutError?$t.ETIMEDOUT:$t.ECONNABORTED,e,m)),m=null},void 0===o&&i.setContentType(null),"setRequestHeader"in m&&Qt.forEach(i.toJSON(),(function(e,t){m.setRequestHeader(t,e)})),Qt.isUndefined(r.withCredentials)||(m.withCredentials=!!r.withCredentials),d&&"json"!==d&&(m.responseType=r.responseType),p&&([l,u]=_n(p,!0),m.addEventListener("progress",l)),f&&m.upload&&([s,c]=_n(f),m.upload.addEventListener("progress",s),m.upload.addEventListener("loadend",c)),(r.cancelToken||r.signal)&&(a=t=>{m&&(n(!t||t.type?new Ln(null,e,m):t),m.abort(),m=null)},r.cancelToken&&r.cancelToken.subscribe(a),r.signal&&(r.signal.aborted?a():r.signal.addEventListener("abort",a)));const x=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(r.url);x&&-1===bn.protocols.indexOf(x)?n(new $t("Unsupported protocol "+x+":",$t.ERR_BAD_REQUEST,e)):m.send(o||null)}))},Gn=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n,r=new AbortController;const o=function(e){if(!n){n=!0,a();const t=e instanceof Error?e:this.reason;r.abort(t instanceof $t?t:new Ln(t instanceof Error?t.message:t))}};let i=t&&setTimeout((()=>{i=null,o(new $t(`timeout ${t} of ms exceeded`,$t.ETIMEDOUT))}),t);const a=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach((e=>{e.unsubscribe?e.unsubscribe(o):e.removeEventListener("abort",o)})),e=null)};e.forEach((e=>e.addEventListener("abort",o)));const{signal:s}=r;return s.unsubscribe=()=>Qt.asap(a),s}},Qn=function*(e,t){let n=e.byteLength;if(!t||n<t)return void(yield e);let r,o=0;for(;o<n;)r=o+t,yield e.slice(o,r),o=r},Jn=async function*(e){if(e[Symbol.asyncIterator])return void(yield*e);const t=e.getReader();try{for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},Xn=(e,t,n,r)=>{const o=async function*(e,t){for await(const n of Jn(e))yield*Qn(n,t)}(e,t);let i,a=0,s=e=>{i||(i=!0,r&&r(e))};return new ReadableStream({async pull(e){try{const{done:t,value:r}=await o.next();if(t)return s(),void e.close();let i=r.byteLength;if(n){let e=a+=i;n(e)}e.enqueue(new Uint8Array(r))}catch(t){throw s(t),t}},cancel:e=>(s(e),o.return())},{highWaterMark:2})},Zn="function"===typeof fetch&&"function"===typeof Request&&"function"===typeof Response,$n=Zn&&"function"===typeof ReadableStream,er=Zn&&("function"===typeof TextEncoder?(tr=new TextEncoder,e=>tr.encode(e)):async e=>new Uint8Array(await new Response(e).arrayBuffer()));var tr;const nr=function(e){try{for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return!!e(...n)}catch(rS){return!1}},rr=$n&&nr((()=>{let e=!1;const t=new Request(bn.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t})),or=$n&&nr((()=>Qt.isReadableStream(new Response("").body))),ir={stream:or&&(e=>e.body)};var ar;Zn&&(ar=new Response,["text","arrayBuffer","blob","formData","stream"].forEach((e=>{!ir[e]&&(ir[e]=Qt.isFunction(ar[e])?t=>t[e]():(t,n)=>{throw new $t(`Response type '${e}' is not supported`,$t.ERR_NOT_SUPPORT,n)})})));const sr=async(e,t)=>{const n=Qt.toFiniteNumber(e.getContentLength());return null==n?(async e=>{if(null==e)return 0;if(Qt.isBlob(e))return e.size;if(Qt.isSpecCompliantForm(e)){const t=new Request(bn.origin,{method:"POST",body:e});return(await t.arrayBuffer()).byteLength}return Qt.isArrayBufferView(e)||Qt.isArrayBuffer(e)?e.byteLength:(Qt.isURLSearchParams(e)&&(e+=""),Qt.isString(e)?(await er(e)).byteLength:void 0)})(t):n},lr=Zn&&(async e=>{let{url:t,method:n,data:r,signal:o,cancelToken:i,timeout:a,onDownloadProgress:s,onUploadProgress:l,responseType:c,headers:u,withCredentials:d="same-origin",fetchOptions:f}=Kn(e);c=c?(c+"").toLowerCase():"text";let p,h=Gn([o,i&&i.toAbortSignal()],a);const m=h&&h.unsubscribe&&(()=>{h.unsubscribe()});let g;try{if(l&&rr&&"get"!==n&&"head"!==n&&0!==(g=await sr(u,r))){let e,n=new Request(t,{method:"POST",body:r,duplex:"half"});if(Qt.isFormData(r)&&(e=n.headers.get("content-type"))&&u.setContentType(e),n.body){const[e,t]=In(g,_n(Un(l)));r=Xn(n.body,65536,e,t)}}Qt.isString(d)||(d=d?"include":"omit");const o="credentials"in Request.prototype;p=new Request(t,{...f,signal:h,method:n.toUpperCase(),headers:u.normalize().toJSON(),body:r,duplex:"half",credentials:o?d:void 0});let i=await fetch(p);const a=or&&("stream"===c||"response"===c);if(or&&(s||a&&m)){const e={};["status","statusText","headers"].forEach((t=>{e[t]=i[t]}));const t=Qt.toFiniteNumber(i.headers.get("content-length")),[n,r]=s&&In(t,_n(Un(s),!0))||[];i=new Response(Xn(i.body,65536,n,(()=>{r&&r(),m&&m()})),e)}c=c||"text";let x=await ir[Qt.findKey(ir,c)||"text"](i,e);return!a&&m&&m(),await new Promise(((t,n)=>{Fn(t,n,{data:x,headers:zn.from(i.headers),status:i.status,statusText:i.statusText,config:e,request:p})}))}catch(x){if(m&&m(),x&&"TypeError"===x.name&&/fetch/i.test(x.message))throw Object.assign(new $t("Network Error",$t.ERR_NETWORK,e,p),{cause:x.cause||x});throw $t.from(x,x&&x.code,e,p)}}),cr={http:null,xhr:Yn,fetch:lr};Qt.forEach(cr,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(rS){}Object.defineProperty(e,"adapterName",{value:t})}}));const ur=e=>`- ${e}`,dr=e=>Qt.isFunction(e)||null===e||!1===e,fr=e=>{e=Qt.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let i=0;i<t;i++){let t;if(n=e[i],r=n,!dr(n)&&(r=cr[(t=String(n)).toLowerCase()],void 0===r))throw new $t(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+i]=r}if(!r){const e=Object.entries(o).map((e=>{let[t,n]=e;return`adapter ${t} `+(!1===n?"is not supported by the environment":"is not available in the build")}));let n=t?e.length>1?"since :\n"+e.map(ur).join("\n"):" "+ur(e[0]):"as no adapter specified";throw new $t("There is no suitable adapter to dispatch the request "+n,"ERR_NOT_SUPPORT")}return r};function pr(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ln(null,e)}function hr(e){pr(e),e.headers=zn.from(e.headers),e.data=Rn.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return fr(e.adapter||kn.adapter)(e).then((function(t){return pr(e),t.data=Rn.call(e,e.transformResponse,t),t.headers=zn.from(t.headers),t}),(function(t){return On(t)||(pr(e),t&&t.response&&(t.response.data=Rn.call(e,e.transformResponse,t.response),t.response.headers=zn.from(t.response.headers))),Promise.reject(t)}))}const mr="1.8.4",gr={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{gr[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const xr={};gr.transitional=function(e,t,n){function r(e,t){return"[Axios v1.8.4] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,o,i)=>{if(!1===e)throw new $t(r(o," has been removed"+(t?" in "+t:"")),$t.ERR_DEPRECATED);return t&&!xr[o]&&(xr[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,i)}},gr.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};const vr={assertOptions:function(e,t,n){if("object"!==typeof e)throw new $t("options must be an object",$t.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],a=t[i];if(a){const t=e[i],n=void 0===t||a(t,i,e);if(!0!==n)throw new $t("option "+i+" must be "+n,$t.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new $t("Unknown option "+i,$t.ERR_BAD_OPTION)}},validators:gr},yr=vr.validators;class br{constructor(e){this.defaults=e,this.interceptors={request:new fn,response:new fn}}async request(e,t){try{return await this._request(e,t)}catch(n){if(n instanceof Error){let e={};Error.captureStackTrace?Error.captureStackTrace(e):e=new Error;const t=e.stack?e.stack.replace(/^.+\n/,""):"";try{n.stack?t&&!String(n.stack).endsWith(t.replace(/^.+\n.+\n/,""))&&(n.stack+="\n"+t):n.stack=t}catch(rS){}}throw n}}_request(e,t){"string"===typeof e?(t=t||{}).url=e:t=e||{},t=Vn(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&vr.assertOptions(n,{silentJSONParsing:yr.transitional(yr.boolean),forcedJSONParsing:yr.transitional(yr.boolean),clarifyTimeoutError:yr.transitional(yr.boolean)},!1),null!=r&&(Qt.isFunction(r)?t.paramsSerializer={serialize:r}:vr.assertOptions(r,{encode:yr.function,serialize:yr.function},!0)),void 0!==t.allowAbsoluteUrls||(void 0!==this.defaults.allowAbsoluteUrls?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),vr.assertOptions(t,{baseUrl:yr.spelling("baseURL"),withXsrfToken:yr.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let i=o&&Qt.merge(o.common,o[t.method]);o&&Qt.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=zn.concat(i,o);const a=[];let s=!0;this.interceptors.request.forEach((function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(s=s&&e.synchronous,a.unshift(e.fulfilled,e.rejected))}));const l=[];let c;this.interceptors.response.forEach((function(e){l.push(e.fulfilled,e.rejected)}));let u,d=0;if(!s){const e=[hr.bind(this),void 0];for(e.unshift.apply(e,a),e.push.apply(e,l),u=e.length,c=Promise.resolve(t);d<u;)c=c.then(e[d++],e[d++]);return c}u=a.length;let f=t;for(d=0;d<u;){const e=a[d++],t=a[d++];try{f=e(f)}catch(p){t.call(this,p);break}}try{c=hr.call(this,f)}catch(p){return Promise.reject(p)}for(d=0,u=l.length;d<u;)c=c.then(l[d++],l[d++]);return c}getUri(e){return dn(Hn((e=Vn(this.defaults,e)).baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}}Qt.forEach(["delete","get","head","options"],(function(e){br.prototype[e]=function(t,n){return this.request(Vn(n||{},{method:e,url:t,data:(n||{}).data}))}})),Qt.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(Vn(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}br.prototype[e]=t(),br.prototype[e+"Form"]=t(!0)}));const wr=br;class Sr{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new Ln(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new Sr((function(t){e=t})),cancel:e}}}const kr=Sr;const jr={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(jr).forEach((e=>{let[t,n]=e;jr[n]=t}));const Er=jr;const Cr=function e(t){const n=new wr(t),r=ut(wr.prototype.request,n);return Qt.extend(r,wr.prototype,n,{allOwnKeys:!0}),Qt.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(Vn(t,n))},r}(kn);Cr.Axios=wr,Cr.CanceledError=Ln,Cr.CancelToken=kr,Cr.isCancel=On,Cr.VERSION=mr,Cr.toFormData=on,Cr.AxiosError=$t,Cr.Cancel=Cr.CanceledError,Cr.all=function(e){return Promise.all(e)},Cr.spread=function(e){return function(t){return e.apply(null,t)}},Cr.isAxiosError=function(e){return Qt.isObject(e)&&!0===e.isAxiosError},Cr.mergeConfig=Vn,Cr.AxiosHeaders=zn,Cr.formToJSON=e=>wn(Qt.isHTMLForm(e)?new FormData(e):e),Cr.getAdapter=fr,Cr.HttpStatusCode=Er,Cr.default=Cr;const Ar=Cr,Pr=Ar.create({baseURL:"http://localhost:8080/api/v1",headers:{"Content-Type":"application/json",Accept:"application/json"},withCredentials:!1});Pr.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e}),(e=>(console.error("Request error:",e),Promise.reject(e)))),Pr.interceptors.response.use((e=>e),(e=>e.response?(e.response&&401===e.response.status&&localStorage.removeItem("token"),Promise.reject(e.response?e.response.data:e.message)):(console.error("Network Error:",e.message),Promise.reject({message:"Network error. Please check your connection and try again."}))));const Nr=Pr,zr=e=>{try{const t=e.split(".");if(3!==t.length)return null;const n=atob(t[1]),r=JSON.parse(n);console.log("JWT payload:",r);const o=r.userID||r.id||r.sub||null;return console.log("Extracted ID:",o),o}catch(t){return console.error("Error extracting user ID from token:",t),null}},Rr=async e=>{try{return(await Nr.get(`/users/${e}`)).data}catch(t){throw console.error("Get user profile error:",t),t}},Or=async e=>{try{return(await Nr.get(`/users/email?email=${encodeURIComponent(e)}`)).data}catch(t){throw console.error("Get user by email error:",t),t}},Tr=()=>{try{const e=localStorage.getItem("user");return e?JSON.parse(e):null}catch(e){return console.error("Error parsing user data:",e),localStorage.removeItem("user"),null}};var Lr=n(579);const Fr=(0,r.createContext)(null),Mr=e=>{let{children:t}=e;const[n,o]=(0,r.useState)(null),[i,a]=(0,r.useState)(!0);(0,r.useEffect)((()=>{(()=>{try{return!!localStorage.getItem("token")}catch(e){return console.error("Error checking authentication:",e),!1}})()&&o(Tr()),a(!1)}),[]);const s={user:n,loading:i,isAuthenticated:!!n,login:e=>{o(e)},logout:()=>{localStorage.removeItem("token"),localStorage.removeItem("user"),o(null)},register:()=>{},updateUser:e=>{o(e)}};return(0,Lr.jsx)(Fr.Provider,{value:s,children:t})},Dr=()=>{const e=(0,r.useContext)(Fr);if(null===e)throw new Error("useAuth must be used within an AuthProvider");return e},_r=()=>{const{user:e,isAuthenticated:t,logout:n}=Dr(),o=$(),i=te(),[a,s]=(0,r.useState)(0),l=(0,r.useRef)(null),c=(0,r.useRef)(null),[u,d]=(0,r.useState)(!1),f=[{path:"/",label:"HOME"},{path:"/about",label:"ABOUT"},{path:"/syllabus",label:"SYLLABUS"},{path:"/blog",label:"BLOG"},{path:"/forum",label:"FORUM"},{path:"/project-results",label:"PROJECT RESULTS"},{path:"/contact",label:"CONTACT US"}];(0,r.useEffect)((()=>{if("/profile"===o.pathname||"/edit-profile"===o.pathname)s(-1);else if(o.pathname.startsWith("/blog")){const e=f.findIndex((e=>"/blog"===e.path));s(e)}else if(o.pathname.startsWith("/forum")){const e=f.findIndex((e=>"/forum"===e.path));s(e)}else{const e=f.findIndex((e=>e.path===o.pathname));s(e>=0?e:0)}}),[o]),(0,r.useEffect)((()=>{if(l.current&&c.current){const e=l.current.querySelectorAll("li");if("/login"===o.pathname||"/verify-email"===o.pathname||"/reset-password"===o.pathname||"/forgot-password"===o.pathname||"/profile"===o.pathname||"/edit-profile"===o.pathname)c.current.style.opacity="0";else if(c.current.style.opacity="1",e.length>0&&a>=0&&a<e.length){const t=e[a].getBoundingClientRect(),n=l.current.getBoundingClientRect();c.current.style.width=`${t.width}px`,c.current.style.left=t.left-n.left+"px"}}}),[a,o.pathname]);const p="/login"===o.pathname&&!o.search.includes("signup=true")||"/reset-password"===o.pathname||"/forgot-password"===o.pathname,h="/verify-email"===o.pathname||"/login"===o.pathname&&o.search.includes("signup=true"),m="/profile"===o.pathname||"/edit-profile"===o.pathname;return(0,r.useEffect)((()=>{d(!1),document.body.classList.remove("menu-open")}),[o]),(0,Lr.jsx)("header",{className:"header",children:(0,Lr.jsxs)("div",{className:"header-container",children:[(0,Lr.jsxs)("div",{className:"logo-section",children:[(0,Lr.jsx)("div",{className:"main-logo",children:(0,Lr.jsx)("img",{src:Fe,alt:"IT-ISQS Logo",className:"main-logo-img"})}),(0,Lr.jsx)("div",{className:"eu-logo",children:(0,Lr.jsx)("a",{href:"https://european-union.europa.eu/index_en",target:"_blank",rel:"noopener noreferrer",title:"Visit European Union Official Website",children:(0,Lr.jsx)("img",{src:"data:image/png;base64,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",alt:"Co-funded by the European Union",className:"eu-logo-full"})})})]}),(0,Lr.jsx)("button",{className:"hamburger-menu",onClick:()=>{d(!u),document.body.classList.toggle("menu-open")},children:u?(0,Lr.jsx)(ct,{size:24}):(0,Lr.jsx)(nt,{size:24})}),(0,Lr.jsxs)("div",{className:"nav-container "+(u?"nav-open":""),children:[(0,Lr.jsx)("nav",{className:"main-nav",children:(0,Lr.jsxs)("ul",{className:"nav-links",ref:l,children:[f.map(((e,t)=>(0,Lr.jsx)("li",{children:(0,Lr.jsx)(Re,{to:e.path,className:t=>{let{isActive:n}=t;return"/blog"===e.path?"/blog"!==o.pathname&&!o.pathname.startsWith("/blog/")||m?"":"active":"/forum"===e.path?"/forum"!==o.pathname&&!o.pathname.startsWith("/forum/")||m?"":"active":n&&!m?"active":""},onClick:()=>d(!1),children:e.label})},e.path))),(0,Lr.jsx)("div",{className:"nav-indicator",ref:c})]})}),(0,Lr.jsx)("div",{className:"right-section",children:(0,Lr.jsx)("div",{className:"auth-buttons",children:t?(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(ze,{to:"/profile",className:"profile-btn "+(m?"profile-btn-active":""),title:"Profile",children:(0,Lr.jsx)(lt,{size:24})}),(0,Lr.jsx)("button",{onClick:()=>{n(),i("/")},className:"logout-btn",title:"Log Out",children:(0,Lr.jsx)($e,{size:24})})]}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(ze,{to:"/login?signup=true",className:"contact-btn "+(h?"signup-btn-active":""),children:"SIGN UP"}),(0,Lr.jsx)(ze,{to:"/login",className:"login-btn "+(p?"login-btn-active":""),children:"SIGN IN"})]})})})]})]})})};const Ir=n.p+"static/media/european.88fc18aa18ebda341d47d50b945d03eb.svg",Ur=()=>{const e=(new Date).getFullYear();return(0,Lr.jsxs)("footer",{className:"footer",children:[(0,Lr.jsxs)("div",{className:"footer-content",children:[(0,Lr.jsxs)("div",{className:"footer-section logo-section",children:[(0,Lr.jsx)("div",{className:"footer-logo",children:(0,Lr.jsx)("img",{src:Fe,alt:"IT-ISQS Logo",className:"footer-logo-img"})}),(0,Lr.jsx)("p",{className:"footer-description",children:"Developed within the framework of the Erasmus+ Programme (KA220-HED). Learn more about our mission to promote international software quality standards. For inquiries, please contact us."})]}),(0,Lr.jsxs)("div",{className:"footer-section links-section",children:[(0,Lr.jsxs)("div",{className:"footer-links-column",children:[(0,Lr.jsx)(ze,{to:"/",children:"Home"}),(0,Lr.jsx)(ze,{to:"/about",children:"About"}),(0,Lr.jsx)(ze,{to:"/syllabus",children:"Syllabus"}),(0,Lr.jsx)(ze,{to:"/blog",children:"Blog"}),(0,Lr.jsx)(ze,{to:"/community-forum",children:"Community Forum"})]}),(0,Lr.jsxs)("div",{className:"footer-links-column",children:[(0,Lr.jsx)(ze,{to:"/project-results",children:"Project Results"}),(0,Lr.jsx)(ze,{to:"/privacy-policy",children:"Privacy & Policy"}),(0,Lr.jsx)(ze,{to:"/terms",children:"Terms of Service"}),(0,Lr.jsx)(ze,{to:"/contact",children:"Contact Us"})]})]}),(0,Lr.jsx)("div",{className:"footer-section eu-section",children:(0,Lr.jsxs)("div",{className:"eu-content",children:[(0,Lr.jsx)("div",{className:"eu-flag",children:(0,Lr.jsx)("img",{src:Ir,alt:"European Union Flag",className:"eu-flag-img"})}),(0,Lr.jsx)("p",{className:"eu-disclaimer",children:"Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the National Agency. Neither the European Union nor National Agency can be held responsible for them."})]})})]}),(0,Lr.jsx)("div",{className:"footer-bottom",children:(0,Lr.jsxs)("p",{className:"copyright",children:["\xa9 ",e," IT-ISQS. All rights reserved."]})})]})};var Br=function(){return Br=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},Br.apply(this,arguments)};Object.create;function Wr(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Hr=n(7324),qr=n.n(Hr),Vr="-ms-",Kr="-moz-",Yr="-webkit-",Gr="comm",Qr="rule",Jr="decl",Xr="@keyframes",Zr=Math.abs,$r=String.fromCharCode,eo=Object.assign;function to(e){return e.trim()}function no(e,t){return(e=t.exec(e))?e[0]:e}function ro(e,t,n){return e.replace(t,n)}function oo(e,t,n){return e.indexOf(t,n)}function io(e,t){return 0|e.charCodeAt(t)}function ao(e,t,n){return e.slice(t,n)}function so(e){return e.length}function lo(e){return e.length}function co(e,t){return t.push(e),e}function uo(e,t){return e.filter((function(e){return!no(e,t)}))}var fo=1,po=1,ho=0,mo=0,go=0,xo="";function vo(e,t,n,r,o,i,a,s){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:fo,column:po,length:a,return:"",siblings:s}}function yo(e,t){return eo(vo("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function bo(e){for(;e.root;)e=yo(e.root,{children:[e]});co(e,e.siblings)}function wo(){return go=mo>0?io(xo,--mo):0,po--,10===go&&(po=1,fo--),go}function So(){return go=mo<ho?io(xo,mo++):0,po++,10===go&&(po=1,fo++),go}function ko(){return io(xo,mo)}function jo(){return mo}function Eo(e,t){return ao(xo,e,t)}function Co(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ao(e){return fo=po=1,ho=so(xo=e),mo=0,[]}function Po(e){return xo="",e}function No(e){return to(Eo(mo-1,Oo(91===e?e+2:40===e?e+1:e)))}function zo(e){for(;(go=ko())&&go<33;)So();return Co(e)>2||Co(go)>3?"":" "}function Ro(e,t){for(;--t&&So()&&!(go<48||go>102||go>57&&go<65||go>70&&go<97););return Eo(e,jo()+(t<6&&32==ko()&&32==So()))}function Oo(e){for(;So();)switch(go){case e:return mo;case 34:case 39:34!==e&&39!==e&&Oo(go);break;case 40:41===e&&Oo(e);break;case 92:So()}return mo}function To(e,t){for(;So()&&e+go!==57&&(e+go!==84||47!==ko()););return"/*"+Eo(t,mo-1)+"*"+$r(47===e?e:So())}function Lo(e){for(;!Co(ko());)So();return Eo(e,mo)}function Fo(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Mo(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case Jr:return e.return=e.return||e.value;case Gr:return"";case Xr:return e.return=e.value+"{"+Fo(e.children,r)+"}";case Qr:if(!so(e.value=e.props.join(",")))return""}return so(n=Fo(e.children,r))?e.return=e.value+"{"+n+"}":""}function Do(e,t,n){switch(function(e,t){return 45^io(e,0)?(((t<<2^io(e,0))<<2^io(e,1))<<2^io(e,2))<<2^io(e,3):0}(e,t)){case 5103:return Yr+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Yr+e+e;case 4789:return Kr+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Yr+e+Kr+e+Vr+e+e;case 5936:switch(io(e,t+11)){case 114:return Yr+e+Vr+ro(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Yr+e+Vr+ro(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Yr+e+Vr+ro(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Yr+e+Vr+e+e;case 6165:return Yr+e+Vr+"flex-"+e+e;case 5187:return Yr+e+ro(e,/(\w+).+(:[^]+)/,Yr+"box-$1$2"+Vr+"flex-$1$2")+e;case 5443:return Yr+e+Vr+"flex-item-"+ro(e,/flex-|-self/g,"")+(no(e,/flex-|baseline/)?"":Vr+"grid-row-"+ro(e,/flex-|-self/g,""))+e;case 4675:return Yr+e+Vr+"flex-line-pack"+ro(e,/align-content|flex-|-self/g,"")+e;case 5548:return Yr+e+Vr+ro(e,"shrink","negative")+e;case 5292:return Yr+e+Vr+ro(e,"basis","preferred-size")+e;case 6060:return Yr+"box-"+ro(e,"-grow","")+Yr+e+Vr+ro(e,"grow","positive")+e;case 4554:return Yr+ro(e,/([^-])(transform)/g,"$1"+Yr+"$2")+e;case 6187:return ro(ro(ro(e,/(zoom-|grab)/,Yr+"$1"),/(image-set)/,Yr+"$1"),e,"")+e;case 5495:case 3959:return ro(e,/(image-set\([^]*)/,Yr+"$1$`$1");case 4968:return ro(ro(e,/(.+:)(flex-)?(.*)/,Yr+"box-pack:$3"+Vr+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Yr+e+e;case 4200:if(!no(e,/flex-|baseline/))return Vr+"grid-column-align"+ao(e,t)+e;break;case 2592:case 3360:return Vr+ro(e,"template-","")+e;case 4384:case 3616:return n&&n.some((function(e,n){return t=n,no(e.props,/grid-\w+-end/)}))?~oo(e+(n=n[t].value),"span",0)?e:Vr+ro(e,"-start","")+e+Vr+"grid-row-span:"+(~oo(n,"span",0)?no(n,/\d+/):+no(n,/\d+/)-+no(e,/\d+/))+";":Vr+ro(e,"-start","")+e;case 4896:case 4128:return n&&n.some((function(e){return no(e.props,/grid-\w+-start/)}))?e:Vr+ro(ro(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return ro(e,/(.+)-inline(.+)/,Yr+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(so(e)-1-t>6)switch(io(e,t+1)){case 109:if(45!==io(e,t+4))break;case 102:return ro(e,/(.+:)(.+)-([^]+)/,"$1"+Yr+"$2-$3$1"+Kr+(108==io(e,t+3)?"$3":"$2-$3"))+e;case 115:return~oo(e,"stretch",0)?Do(ro(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return ro(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(t,n,r,o,i,a,s){return Vr+n+":"+r+s+(o?Vr+n+"-span:"+(i?a:+a-+r)+s:"")+e}));case 4949:if(121===io(e,t+6))return ro(e,":",":"+Yr)+e;break;case 6444:switch(io(e,45===io(e,14)?18:11)){case 120:return ro(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Yr+(45===io(e,14)?"inline-":"")+"box$3$1"+Yr+"$2$3$1"+Vr+"$2box$3")+e;case 100:return ro(e,":",":"+Vr)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return ro(e,"scroll-","scroll-snap-")+e}return e}function _o(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Jr:return void(e.return=Do(e.value,e.length,n));case Xr:return Fo([yo(e,{value:ro(e.value,"@","@"+Yr)})],r);case Qr:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,(function(t){switch(no(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":bo(yo(e,{props:[ro(t,/:(read-\w+)/,":-moz-$1")]})),bo(yo(e,{props:[t]})),eo(e,{props:uo(n,r)});break;case"::placeholder":bo(yo(e,{props:[ro(t,/:(plac\w+)/,":"+Yr+"input-$1")]})),bo(yo(e,{props:[ro(t,/:(plac\w+)/,":-moz-$1")]})),bo(yo(e,{props:[ro(t,/:(plac\w+)/,Vr+"input-$1")]})),bo(yo(e,{props:[t]})),eo(e,{props:uo(n,r)})}return""}))}}function Io(e){return Po(Uo("",null,null,null,[""],e=Ao(e),0,[0],e))}function Uo(e,t,n,r,o,i,a,s,l){for(var c=0,u=0,d=a,f=0,p=0,h=0,m=1,g=1,x=1,v=0,y="",b=o,w=i,S=r,k=y;g;)switch(h=v,v=So()){case 40:if(108!=h&&58==io(k,d-1)){-1!=oo(k+=ro(No(v),"&","&\f"),"&\f",Zr(c?s[c-1]:0))&&(x=-1);break}case 34:case 39:case 91:k+=No(v);break;case 9:case 10:case 13:case 32:k+=zo(h);break;case 92:k+=Ro(jo()-1,7);continue;case 47:switch(ko()){case 42:case 47:co(Wo(To(So(),jo()),t,n,l),l);break;default:k+="/"}break;case 123*m:s[c++]=so(k)*x;case 125*m:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:-1==x&&(k=ro(k,/\f/g,"")),p>0&&so(k)-d&&co(p>32?Ho(k+";",r,n,d-1,l):Ho(ro(k," ","")+";",r,n,d-2,l),l);break;case 59:k+=";";default:if(co(S=Bo(k,t,n,c,u,o,s,y,b=[],w=[],d,i),i),123===v)if(0===u)Uo(k,t,S,S,b,i,d,s,w);else switch(99===f&&110===io(k,3)?100:f){case 100:case 108:case 109:case 115:Uo(e,S,S,r&&co(Bo(e,S,S,0,0,o,s,y,o,b=[],d,w),w),o,w,d,s,r?b:w);break;default:Uo(k,S,S,S,[""],w,0,s,w)}}c=u=p=0,m=x=1,y=k="",d=a;break;case 58:d=1+so(k),p=h;default:if(m<1)if(123==v)--m;else if(125==v&&0==m++&&125==wo())continue;switch(k+=$r(v),v*m){case 38:x=u>0?1:(k+="\f",-1);break;case 44:s[c++]=(so(k)-1)*x,x=1;break;case 64:45===ko()&&(k+=No(So())),f=ko(),u=d=so(y=k+=Lo(jo())),v++;break;case 45:45===h&&2==so(k)&&(m=0)}}return i}function Bo(e,t,n,r,o,i,a,s,l,c,u,d){for(var f=o-1,p=0===o?i:[""],h=lo(p),m=0,g=0,x=0;m<r;++m)for(var v=0,y=ao(e,f+1,f=Zr(g=a[m])),b=e;v<h;++v)(b=to(g>0?p[v]+" "+y:ro(y,/&\f/g,p[v])))&&(l[x++]=b);return vo(e,t,n,0===o?Qr:s,l,c,u,d)}function Wo(e,t,n,r){return vo(e,t,n,Gr,$r(go),ao(e,2,-2),0,r)}function Ho(e,t,n,r,o){return vo(e,t,n,Jr,ao(e,0,r),ao(e,r+1,-1),r,o)}var qo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Vo="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",Ko="active",Yo="data-styled-version",Go="6.1.17",Qo="/*!sc*/\n",Jo="undefined"!=typeof window&&"HTMLElement"in window,Xo=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Zo={},$o=(new Set,Object.freeze([])),ei=Object.freeze({});function ti(e,t,n){return void 0===n&&(n=ei),e.theme!==n.theme&&e.theme||t||n.theme}var ni=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ri=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,oi=/(^-|-$)/g;function ii(e){return e.replace(ri,"-").replace(oi,"")}var ai=/(a)(d)/gi,si=function(e){return String.fromCharCode(e+(e>25?39:97))};function li(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=si(t%52)+n;return(si(t%52)+n).replace(ai,"$1-$2")}var ci,ui=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},di=function(e){return ui(5381,e)};function fi(e){return li(di(e)>>>0)}function pi(e){return e.displayName||e.name||"Component"}function hi(e){return"string"==typeof e&&!0}var mi="function"==typeof Symbol&&Symbol.for,gi=mi?Symbol.for("react.memo"):60115,xi=mi?Symbol.for("react.forward_ref"):60112,vi={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},yi={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},bi={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},wi=((ci={})[xi]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ci[gi]=bi,ci);function Si(e){return("type"in(t=e)&&t.type.$$typeof)===gi?bi:"$$typeof"in e?wi[e.$$typeof]:vi;var t}var ki=Object.defineProperty,ji=Object.getOwnPropertyNames,Ei=Object.getOwnPropertySymbols,Ci=Object.getOwnPropertyDescriptor,Ai=Object.getPrototypeOf,Pi=Object.prototype;function Ni(e,t,n){if("string"!=typeof t){if(Pi){var r=Ai(t);r&&r!==Pi&&Ni(e,r,n)}var o=ji(t);Ei&&(o=o.concat(Ei(t)));for(var i=Si(e),a=Si(t),s=0;s<o.length;++s){var l=o[s];if(!(l in yi||n&&n[l]||a&&l in a||i&&l in i)){var c=Ci(t,l);try{ki(e,l,c)}catch(e){}}}}return e}function zi(e){return"function"==typeof e}function Ri(e){return"object"==typeof e&&"styledComponentId"in e}function Oi(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Ti(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Li(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Fi(e,t,n){if(void 0===n&&(n=!1),!n&&!Li(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Fi(e[r],t[r]);else if(Li(t))for(var r in t)e[r]=Fi(e[r],t[r]);return e}function Mi(e,t){Object.defineProperty(e,"toString",{value:t})}function Di(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var _i=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)if((o<<=1)<0)throw Di(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var i=r;i<o;i++)this.groupSizes[i]=0}for(var a=this.indexOfGroup(e+1),s=(i=0,t.length);i<s;i++)this.tag.insertRule(a,t[i])&&(this.groupSizes[e]++,a++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,i=r;i<o;i++)t+="".concat(this.tag.getRule(i)).concat(Qo);return t},e}(),Ii=new Map,Ui=new Map,Bi=1,Wi=function(e){if(Ii.has(e))return Ii.get(e);for(;Ui.has(Bi);)Bi++;var t=Bi++;return Ii.set(e,t),Ui.set(t,e),t},Hi=function(e,t){Bi=t+1,Ii.set(e,t),Ui.set(t,e)},qi="style[".concat(Vo,"][").concat(Yo,'="').concat(Go,'"]'),Vi=new RegExp("^".concat(Vo,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ki=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},Yi=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Qo),o=[],i=0,a=r.length;i<a;i++){var s=r[i].trim();if(s){var l=s.match(Vi);if(l){var c=0|parseInt(l[1],10),u=l[2];0!==c&&(Hi(u,c),Ki(e,u,l[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(s)}}},Gi=function(e){for(var t=document.querySelectorAll(qi),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Vo)!==Ko&&(Yi(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Qi(){return n.nc}var Ji=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Vo,"]")));return t[t.length-1]}(n),i=void 0!==o?o.nextSibling:null;r.setAttribute(Vo,Ko),r.setAttribute(Yo,Go);var a=Qi();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},Xi=function(){function e(e){this.element=Ji(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}throw Di(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Zi=function(){function e(e){this.element=Ji(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),$i=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),ea=Jo,ta={isServer:!Jo,useCSSOMInjection:!Xo},na=function(){function e(e,t,n){void 0===e&&(e=ei),void 0===t&&(t={});var r=this;this.options=Br(Br({},ta),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Jo&&ea&&(ea=!1,Gi(this)),Mi(this,(function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=function(n){var o=function(e){return Ui.get(e)}(n);if(void 0===o)return"continue";var i=e.names.get(o),a=t.getGroup(n);if(void 0===i||!i.size||0===a.length)return"continue";var s="".concat(Vo,".g").concat(n,'[id="').concat(o,'"]'),l="";void 0!==i&&i.forEach((function(e){e.length>0&&(l+="".concat(e,","))})),r+="".concat(a).concat(s,'{content:"').concat(l,'"}').concat(Qo)},i=0;i<n;i++)o(i);return r}(r)}))}return e.registerId=function(e){return Wi(e)},e.prototype.rehydrate=function(){!this.server&&Jo&&Gi(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(Br(Br({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new $i(n):t?new Xi(n):new Zi(n)}(this.options),new _i(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Wi(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Wi(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Wi(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),ra=/&/g,oa=/^\s*\/\/.*$/gm;function ia(e,t){return e.map((function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map((function(e){return"".concat(t," ").concat(e)}))),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=ia(e.children,t)),e}))}function aa(e){var t,n,r,o=void 0===e?ei:e,i=o.options,a=void 0===i?ei:i,s=o.plugins,l=void 0===s?$o:s,c=function(e,r,o){return o.startsWith(n)&&o.endsWith(n)&&o.replaceAll(n,"").length>0?".".concat(t):e},u=l.slice();u.push((function(e){e.type===Qr&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(ra,n).replace(r,c))})),a.prefix&&u.push(_o),u.push(Mo);var d=function(e,o,i,s){void 0===o&&(o=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,n=o,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(oa,""),c=Io(i||o?"".concat(i," ").concat(o," { ").concat(l," }"):l);a.namespace&&(c=ia(c,a.namespace));var d,f=[];return Fo(c,function(e){var t=lo(e);return function(n,r,o,i){for(var a="",s=0;s<t;s++)a+=e[s](n,r,o,i)||"";return a}}(u.concat((d=function(e){return f.push(e)},function(e){e.root||(e=e.return)&&d(e)})))),f};return d.hash=l.length?l.reduce((function(e,t){return t.name||Di(15),ui(e,t.name)}),5381).toString():"",d}var sa=new na,la=aa(),ca=r.createContext({shouldForwardProp:void 0,styleSheet:sa,stylis:la}),ua=(ca.Consumer,r.createContext(void 0));function da(){return(0,r.useContext)(ca)}function fa(e){var t=(0,r.useState)(e.stylisPlugins),n=t[0],o=t[1],i=da().styleSheet,a=(0,r.useMemo)((function(){var t=i;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target,i]),s=(0,r.useMemo)((function(){return aa({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})}),[e.enableVendorPrefixes,e.namespace,n]);(0,r.useEffect)((function(){qr()(n,e.stylisPlugins)||o(e.stylisPlugins)}),[e.stylisPlugins]);var l=(0,r.useMemo)((function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:a,stylis:s}}),[e.shouldForwardProp,a,s]);return r.createElement(ca.Provider,{value:l},r.createElement(ua.Provider,{value:s},e.children))}var pa=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=la);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Mi(this,(function(){throw Di(12,String(n.name))}))}return e.prototype.getName=function(e){return void 0===e&&(e=la),this.name+e.hash},e}(),ha=function(e){return e>="A"&&e<="Z"};function ma(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;ha(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var ga=function(e){return null==e||!1===e||""===e},xa=function(e){var t,n,r=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!ga(i)&&(Array.isArray(i)&&i.isCss||zi(i)?r.push("".concat(ma(o),":"),i,";"):Li(i)?r.push.apply(r,Wr(Wr(["".concat(o," {")],xa(i),!1),["}"],!1)):r.push("".concat(ma(o),": ").concat((t=o,null==(n=i)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in qo||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function va(e,t,n,r){return ga(e)?[]:Ri(e)?[".".concat(e.styledComponentId)]:zi(e)?!zi(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:va(e(t),t,n,r):e instanceof pa?n?(e.inject(n,r),[e.getName(r)]):[e]:Li(e)?xa(e):Array.isArray(e)?Array.prototype.concat.apply($o,e.map((function(e){return va(e,t,n,r)}))):[e.toString()];var o}function ya(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(zi(n)&&!Ri(n))return!1}return!0}var ba=di(Go),wa=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&ya(e),this.componentId=t,this.baseHash=ui(ba,t),this.baseStyle=n,na.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Oi(r,this.staticRulesId);else{var o=Ti(va(this.rules,e,t,n)),i=li(ui(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,i)){var a=n(o,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,a)}r=Oi(r,i),this.staticRulesId=i}else{for(var s=ui(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var u=this.rules[c];if("string"==typeof u)l+=u;else if(u){var d=Ti(va(u,e,t,n));s=ui(s,d+c),l+=d}}if(l){var f=li(s>>>0);t.hasNameForId(this.componentId,f)||t.insertRules(this.componentId,f,n(l,".".concat(f),void 0,this.componentId)),r=Oi(r,f)}}return r},e}(),Sa=r.createContext(void 0);Sa.Consumer;var ka={};new Set;function ja(e,t,n){var o=Ri(e),i=e,a=!hi(e),s=t.attrs,l=void 0===s?$o:s,c=t.componentId,u=void 0===c?function(e,t){var n="string"!=typeof e?"sc":ii(e);ka[n]=(ka[n]||0)+1;var r="".concat(n,"-").concat(fi(Go+n+ka[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):c,d=t.displayName,f=void 0===d?function(e){return hi(e)?"styled.".concat(e):"Styled(".concat(pi(e),")")}(e):d,p=t.displayName&&t.componentId?"".concat(ii(t.displayName),"-").concat(t.componentId):t.componentId||u,h=o&&i.attrs?i.attrs.concat(l).filter(Boolean):l,m=t.shouldForwardProp;if(o&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;m=function(e,t){return g(e,t)&&x(e,t)}}else m=g}var v=new wa(n,p,o?i.componentStyle:void 0);function y(e,t){return function(e,t,n){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,u=r.useContext(Sa),d=da(),f=e.shouldForwardProp||d.shouldForwardProp,p=ti(t,u,a)||ei,h=function(e,t,n){for(var r,o=Br(Br({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var a=zi(r=e[i])?r(o):r;for(var s in a)o[s]="className"===s?Oi(o[s],a[s]):"style"===s?Br(Br({},o[s]),a[s]):a[s]}return t.className&&(o.className=Oi(o.className,t.className)),o}(o,t,p),m=h.as||c,g={};for(var x in h)void 0===h[x]||"$"===x[0]||"as"===x||"theme"===x&&h.theme===p||("forwardedAs"===x?g.as=h.forwardedAs:f&&!f(x,m)||(g[x]=h[x]));var v=function(e,t){var n=da();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,h),y=Oi(s,l);return v&&(y+=" "+v),h.className&&(y+=" "+h.className),g[hi(m)&&!ni.has(m)?"class":"className"]=y,n&&(g.ref=n),(0,r.createElement)(m,g)}(b,e,t)}y.displayName=f;var b=r.forwardRef(y);return b.attrs=h,b.componentStyle=v,b.displayName=f,b.shouldForwardProp=m,b.foldedComponentIds=o?Oi(i.foldedComponentIds,i.styledComponentId):"",b.styledComponentId=p,b.target=o?i.target:e,Object.defineProperty(b,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=o?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,o=t;r<o.length;r++)Fi(e,o[r],!0);return e}({},i.defaultProps,e):e}}),Mi(b,(function(){return".".concat(b.styledComponentId)})),a&&Ni(b,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),b}function Ea(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Ca=function(e){return Object.assign(e,{isCss:!0})};function Aa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(zi(e)||Li(e))return Ca(va(Ea($o,Wr([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?va(r):Ca(va(Ea(r,t)))}function Pa(e,t,n){if(void 0===n&&(n=ei),!t)throw Di(1,t);var r=function(r){for(var o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];return e(t,n,Aa.apply(void 0,Wr([r],o,!1)))};return r.attrs=function(r){return Pa(e,t,Br(Br({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Pa(e,t,Br(Br({},n),r))},r}var Na=function(e){return Pa(ja,e)},za=Na;ni.forEach((function(e){za[e]=Na(e)}));var Ra=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=ya(e),na.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var o=r(Ti(va(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&na.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function Oa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=Aa.apply(void 0,Wr([e],t,!1)),i="sc-global-".concat(fi(JSON.stringify(o))),a=new Ra(o,i),s=function(e){var t=da(),n=r.useContext(Sa),o=r.useRef(t.styleSheet.allocateGSInstance(i)).current;return t.styleSheet.server&&l(o,e,t.styleSheet,n,t.stylis),r.useLayoutEffect((function(){if(!t.styleSheet.server)return l(o,e,t.styleSheet,n,t.stylis),function(){return a.removeStyles(o,t.styleSheet)}}),[o,e,t.styleSheet,n,t.stylis]),null};function l(e,t,n,r,o){if(a.isStatic)a.renderStyles(e,Zo,n,o);else{var i=Br(Br({},t),{theme:ti(t,r,s.defaultProps)});a.renderStyles(e,i,n,o)}}return r.memo(s)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Qi(),r=Ti([n&&'nonce="'.concat(n,'"'),"".concat(Vo,'="true"'),"".concat(Yo,'="').concat(Go,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Di(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Di(2);var n=e.instance.toString();if(!n)return[];var o=((t={})[Vo]="",t[Yo]=Go,t.dangerouslySetInnerHTML={__html:n},t),i=Qi();return i&&(o.nonce=i),[r.createElement("style",Br({},o,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new na({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Di(2);return r.createElement(fa,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Di(3)}})(),"__sc-".concat(Vo,"__");const Ta="#223A70",La="#4059A9",Fa=za.div`
    background-color: #FFF;
    border-radius: 30px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: visible;
    width: 1000px;
    max-width: 100%;
    min-height: 680px;
    margin: 1px auto;
`,Ma=za.form`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    overflow: hidden;
    max-height: 100%;
    text-align: center;
`,Da=za.h1`
    font-weight: bold;
    margin: 0;
    font-size: 2rem;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`,_a=za.h1`
    font-weight: bold;
    margin: 0 0 20px;
    font-size: 2rem;
    color: #333;
    text-shadow: none;
`,Ia=za.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 15px;
    color: #666;
`,Ua=za.input`
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
    margin: 6px 0;
    width: 100%;
    font-size: 1rem;
`,Ba=za.select`
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
    margin: 6px 0;
    width: 100%;
    font-size: 1rem;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 15px top 50%;
    background-size: 12px auto;

    /* Placeholder rengi için */
    option:first-child {
        color: #757575;
    }

    /* Seçilmiş değer için normal renk */
    option:not(:first-child) {
        color: #333;
    }

    /* Seçilmemiş durum için placeholder rengi */
    &:invalid {
        color: #757575;
    }
`,Wa=za.button`
    border-radius: 30px;
    border: 1px solid #fff;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 0.3s ease;
    margin-top: 15px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        background-color: #f8f8f8;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #cccccc;
        border-color: #cccccc;
        cursor: not-allowed;
    }
`,Ha=za.button`
    background: linear-gradient(90deg, ${Ta}, ${La});
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 35px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 0.3s ease, box-shadow 0.3s;
    margin-top: 15px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(34, 58, 112, 0.2);

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 15px rgba(34, 58, 112, 0.3);
    }
`,qa=za.a`
    color: ${Ta};
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`,Va=(za.button`
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 5px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`,za.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 30px;
    font-size: 14px;
    padding: 12px 20px;
    margin: 10px 0;
    width: 100%;
    color: #666;
    font-weight: 500;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }
`),Ka=(za.img`
    width: 20px;
    height: 20px;
`,za.div`
    position: relative;
    width: 100%;
    text-align: center;
    margin: 15px 0;
    
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 40%;
        height: 1px;
        background-color: #ddd;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 40%;
        height: 1px;
        background-color: #ddd;
    }
`,za.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 8px 0;
`,za.input`
    margin-right: 10px;
`,za.label`
    font-size: 14px;
    color: #666;
    text-align: left;
`,za.div`
    position: relative;
    width: 100%;
`,za.div`
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #999;
`,za.img`
    position: absolute;
    top: 50px;
    left: 30px;
    width: 230px;
    height: 230px;
    z-index: 125;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(-5deg);
`),Ya=za.img`
    position: absolute;
    bottom: 5px;
    left: 1050px;
    width: 250px;
    height: 250px;
    z-index: 160;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(-8deg);
`,Ga=za.img`
    position: absolute;
    top: -35px;
    right: 120px;
    width: 200px;
    height: 200px;
    z-index: 160;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(5deg);
`,Qa=za.img`
    position: absolute;
    bottom: -100px;
    right: 900px;
    width: 350px;
    height: 350px;
    z-index: 125;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(8deg);
`,Ja=za.div.attrs((e=>({"data-islogin":e.$isLogin})))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    left: 0;
    width: 65%;
    opacity: 0;
    z-index: 300;
    border-radius: 30px;
    background-color: rgba(140, 158, 193, 0.5);
    visibility: hidden;
    overflow: hidden;
    ${e=>!e.$isLogin&&Aa`
        transform: translateX(53.8%);
        opacity: 1;
        z-index: 300;
        visibility: visible;
    `}
`,Xa=za.div.attrs((e=>({"data-islogin":e.$isLogin})))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    left: 0;
    width: 65%;
    z-index: 300;
    opacity: 1;
    visibility: visible;
    border-radius: 30px;
    background-color: rgba(140, 158, 193, 0.5);
    overflow: hidden;
    ${e=>!e.$isLogin&&Aa`
        transform: translateX(53.8%);
        opacity: 0;
        visibility: hidden;
    `}
`,Za=za.div.attrs((e=>({"data-islogin":e.$isLogin})))`
    position: absolute;
    top: 0;
    left: 65%;
    width: 35%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    z-index: 150;
    border-radius: 50px 0 0 50px;
    ${e=>!e.$isLogin&&Aa`
        transform: translateX(-185.7%);
        border-radius: 30px 30px 30px 30px;
        z-index: 150;
    `}
`,$a=za.div.attrs((e=>({"data-islogin":e.$isLogin})))`
    background: rgba(255, 255, 255, 0.98);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7));
    color: #333;
    position: relative;
    left: -100%;
    height: 100%;
    width: 185%;
    transform: translateX(54%);
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    border-radius: 50px 0 0 50px;
    ${e=>!e.$isLogin&&Aa`
        transform: translateX(0);
        border-radius: 0 50px 50px 0;
    `}
`,es=za.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 45%;
    transform: translateX(0);
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
`,ts=za(es).attrs((e=>({"data-islogin":e.$isLogin})))`
    transform: translateX(10%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${e=>!e.$isLogin&&Aa`
        transform: translateX(-10%);
    `}

    ${Da} {
        color: #333;
    }

    ${Ia} {
        color: #666;
    }

    ${Ha} {
        background: linear-gradient(90deg, ${Ta}, ${La});
        color: white;
    }
`,ns=za(es).attrs((e=>({"data-islogin":e.$isLogin})))`
    right: 0;
    transform: translateX(35%);
    ${e=>!e.$isLogin&&Aa`
        transform: translateX(10%);
    `}

    ${Da} {
        color: #333;
    }

    ${Ia} {
        color: #666;
    }

    ${Ha} {
        background: linear-gradient(90deg, ${Ta}, ${La});
        color: white;
    }
`,rs=za.p`
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0;
`,os=za.div`
    color: #e74c3c;
    font-size: 12px;
    margin: 2px 0 8px 15px;
    text-align: left;
    width: 100%;
    font-weight: 500;
    display: flex;
    align-items: center;
    animation: errorAppear 0.3s ease-in-out;
    
    @keyframes errorAppear {
        0% {
            opacity: 0;
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    &::before {
        content: "!";
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background-color: #e74c3c;
        color: white;
        border-radius: 50%;
        margin-right: 6px;
        font-size: 10px;
        font-weight: bold;
    }
`;za.div`
    width: 100%;
    margin: 0 0 10px 0;
`,za.div`
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    margin-top: 5px;
    overflow: hidden;
    position: relative;
`,za.div`
    height: 100%;
    width: ${e=>e.strength}%;
    background-color: ${e=>e.strength<33?"#e74c3c":e.strength<66?"#f39c12":"#27ae60"};
    border-radius: 2px;
    transition: width 0.3s ease, background-color 0.3s ease;
`,za.div`
    font-size: 12px;
    margin-top: 4px;
    text-align: right;
    color: ${e=>e.strength<33?"#e74c3c":e.strength<66?"#f39c12":"#27ae60"};
`,za.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: 0;
`;n.p;const is=n.p+"static/media/mail.ee2cf15675e0d69a0509.png",as=n.p+"static/media/tik.c1e8618dd14672e8dedb.png",ss=za.div`
    display: flex;
    gap: 10px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`,ls=za(Ua)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        font-size: 15px;
        padding: 12px 15px;
    }
`,cs=(za(Va)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        font-size: 14px;
        padding: 10px;
    }
`,za.div`
    display: none;
    
    @media (max-width: 768px) {
        display: block;
        width: 100%;
        min-height: 100vh;
        padding: 20px;
        background-color: #fff;
    }
`),us=za.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`,ds=za.h2`
    font-size: 24px;
    color: #223A70;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
`,fs=za.input`
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    
    &:focus {
        outline: none;
        border-color: #223A70;
    }
`,ps=za.select`
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    background-color: white;
    
    &:focus {
        outline: none;
        border-color: #223A70;
    }
`,hs=za.button`
    width: 100%;
    padding: 14px;
    background-color: #223A70;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    
    &:disabled {
        background-color: #cccccc;
    }
`,ms=za.button`
    width: 100%;
    padding: 12px;
    background-color: transparent;
    color: #223A70;
    border: 1px solid #223A70;
    border-radius: 8px;
    font-size: 15px;
    margin-top: 10px;
`,gs=za.div`
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
`,xs=za(ze)`
    color: #223A70;
    text-align: center;
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    
    &:hover {
        text-decoration: underline;
    }
`,vs=za(Fa)`
    @media (max-width: 768px) {
        display: none;
    }
`,ys=(za.div`
    display: none;
    
    @media (max-width: 768px) {
        display: none;
    }
`,za.div`
    @media (max-width: 768px) {
        display: none;
    }
`),bs=()=>{const e=$(),[t,n]=(0,r.useState)(!0),[o,i]=(0,r.useState)({email:"",password:""}),[a,s]=(0,r.useState)({firstName:"",lastName:"",email:"",password:"",confirmPassword:"",country:"",institution:"",role:""}),[l,c]=(0,r.useState)(!1),[u,d]=(0,r.useState)(""),[f,p]=(0,r.useState)({}),h=te(),{login:m}=Dr(),g=["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","England","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];(0,r.useEffect)((()=>{const t=new URLSearchParams(e.search).get("signup");n("true"!==t)}),[e.search]);const x=e=>{i({...o,[e.target.name]:e.target.value}),f[e.target.name]&&p({...f,[e.target.name]:""})},v=e=>{const t="checkbox"===e.target.type?e.target.checked:e.target.value;s({...a,[e.target.name]:t}),f[e.target.name]&&p({...f,[e.target.name]:""})},y=async e=>{if(e.preventDefault(),c(!0),d(""),p({}),(()=>{const e={};let t=!0;return o.email?/\S+@\S+\.\S+/.test(o.email)||(e.loginEmail="Email address is invalid",t=!1):(e.loginEmail="Email is required",t=!1),o.password||(e.loginPassword="Password is required",t=!1),p(e),t})())try{const e=await(async e=>{try{const n=await Nr.post("/users/login",e);if(n.data&&n.data.token){const r=n.data.token;localStorage.setItem("token",r);const o=zr(r);console.log("Extracted user ID from token:",o);let i={email:e.email,id:o,userID:o};try{if(o){const e=await Rr(o);console.log("Profile response from API:",e),e&&(i={...i,...e,id:o,userID:o})}else{const t=await Or(e.email);if(console.log("Profile by email response:",t),t){const e=t.userID;i={...i,...t,id:e,userID:e}}}}catch(t){console.warn("Could not fetch complete profile:",t)}return console.log("Final user info to be stored:",i),localStorage.setItem("user",JSON.stringify(i)),{token:r,message:n.data.message||"Login successful",user:i}}return n.data}catch(u){if(console.error("Login service error:",u),u.response&&403===u.response.status&&u.response.data&&u.response.data.message&&u.response.data.message.includes("blocked"))throw{message:u.response.data.message||"Your account has been blocked. Please contact the administrator.",status:403,isBlocked:!0};throw u}})(o);if(console.log("Login successful:",e),!e.user)throw new Error("Login response did not contain user data");m(e.user),h("/")}catch(t){console.error("Login error:",t),t.isBlocked?d("Your account has been blocked. Please contact the administrator."):t.message?d(t.message):d("string"===typeof t?t:"Login failed. Please check your credentials.")}finally{c(!1)}else c(!1)},b=async e=>{if(e.preventDefault(),console.log("Form submitted, current data:",a),c(!0),d(""),p({}),!(()=>{const e={};let t=!0;return a.firstName.trim()?a.firstName.length<2&&(e.firstName="First name must be at least 2 characters",t=!1):(e.firstName="First name is required",t=!1),a.lastName.trim()?a.lastName.length<2&&(e.lastName="Last name must be at least 2 characters",t=!1):(e.lastName="Last name is required",t=!1),a.email?/\S+@\S+\.\S+/.test(a.email)||(e.email="Email address is invalid",t=!1):(e.email="Email is required",t=!1),a.password?a.password.length<8?(e.password="Password must be at least 8 characters",t=!1):/(?=.*[0-9])/.test(a.password)?/(?=.*[A-Z])/.test(a.password)||(e.password="Password must contain at least one uppercase letter",t=!1):(e.password="Password must contain at least one number",t=!1):(e.password="Password is required",t=!1),a.confirmPassword?a.password!==a.confirmPassword&&(e.confirmPassword="Passwords do not match",t=!1):(e.confirmPassword="Please confirm your password",t=!1),a.country||(e.country="Please select your country",t=!1),a.role||(e.role="Please select your role",t=!1),p(e),t})())return console.log("Form validation failed, errors:",f),void c(!1);try{const e=g.find((e=>e.toLowerCase()===a.country.toLowerCase()))||a.country,t={firstName:a.firstName,lastName:a.lastName,email:a.email,password:a.password,country:e,institution:a.institution||"",role:a.role,isActive:!1,isBlocked:!1};console.log("Sending registration data to backend:",t);const n=await(async e=>{try{console.log("Registering user with data:",e);const t=await Nr.post("/users/register",e);if(console.log("Registration successful:",t.data),t.data&&t.data.token){localStorage.setItem("token",t.data.token);const n={email:e.email,firstName:e.firstName,lastName:e.lastName,institution:e.institution||"",country:e.country,role:e.role};localStorage.setItem("user",JSON.stringify(n))}return t.data}catch(u){throw console.error("Register service error:",u),u.response?(console.error("API error response:",u.response.data),{message:u.response.data.message||"Registration failed. Please try again.",status:u.response.status}):u.request?(console.error("No response received:",u.request),{message:"No response from server. Please check your connection.",status:0}):(console.error("Request error:",u.message),{message:"Failed to create request. Please try again.",status:0})}})(t);console.log("Registration successful:",n),h("/verify-email",{state:{email:a.email}})}catch(t){console.error("Registration error:",t),t.response&&t.response.data?(d(t.response.data.message||"Registration failed. Please try again."),t.response.data.validationErrors&&p(t.response.data.validationErrors)):d("An error occurred during registration. Please try again.")}finally{c(!1)}},w=e=>Boolean(f[e]);return(0,Lr.jsxs)("div",{className:"page login-page",style:{position:"relative"},children:[(0,Lr.jsxs)(ys,{children:[(0,Lr.jsx)(Ka,{src:is}),(0,Lr.jsx)(Qa,{src:as}),(0,Lr.jsx)(Ya,{src:"data:image/png;base64,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"}),(0,Lr.jsx)(Ga,{src:"data:image/png;base64,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"})]}),(0,Lr.jsxs)(cs,{children:[(0,Lr.jsx)(ds,{children:t?"Sign In":"Create Account"}),t?(0,Lr.jsxs)(us,{onSubmit:y,children:[(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"email",name:"email",placeholder:"Email Address",value:o.email,onChange:x,required:!0,style:w("loginEmail")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.loginEmail&&(0,Lr.jsx)(gs,{children:f.loginEmail})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"password",name:"password",placeholder:"Password",value:o.password,onChange:x,required:!0,style:w("loginPassword")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.loginPassword&&(0,Lr.jsx)(gs,{children:f.loginPassword})]}),(0,Lr.jsx)(xs,{to:"/forgot-password",children:"Forgot your password?"}),(0,Lr.jsx)(hs,{type:"submit",disabled:l,children:l?"Processing...":"Sign In"}),(0,Lr.jsx)(ms,{type:"button",onClick:()=>h("/login?signup=true"),children:"Don't have an account? Sign Up"})]}):(0,Lr.jsxs)(us,{onSubmit:b,children:[(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"text",name:"firstName",placeholder:"First Name",value:a.firstName,onChange:v,required:!0,style:w("firstName")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.firstName&&(0,Lr.jsx)(gs,{children:f.firstName})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"text",name:"lastName",placeholder:"Last Name",value:a.lastName,onChange:v,required:!0,style:w("lastName")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.lastName&&(0,Lr.jsx)(gs,{children:f.lastName})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"email",name:"email",placeholder:"Email Address",value:a.email,onChange:v,required:!0,style:w("email")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.email&&(0,Lr.jsx)(gs,{children:f.email})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"password",name:"password",placeholder:"Password",value:a.password,onChange:v,required:!0,style:w("password")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.password&&(0,Lr.jsx)(gs,{children:f.password})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"password",name:"confirmPassword",placeholder:"Confirm Password",value:a.confirmPassword,onChange:v,required:!0,style:w("confirmPassword")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.confirmPassword&&(0,Lr.jsx)(gs,{children:f.confirmPassword})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsxs)(ps,{name:"country",value:a.country,onChange:v,required:!0,style:w("country")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},children:[(0,Lr.jsx)("option",{value:"",children:"Select Country"}),g.map(((e,t)=>(0,Lr.jsx)("option",{value:e.toLowerCase(),children:e},t)))]}),f.country&&(0,Lr.jsx)(gs,{children:f.country})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsx)(fs,{type:"text",name:"institution",placeholder:"Institution",value:a.institution,onChange:v,style:w("institution")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.institution&&(0,Lr.jsx)(gs,{children:f.institution})]}),(0,Lr.jsxs)("div",{children:[(0,Lr.jsxs)(ps,{name:"role",value:a.role,onChange:v,required:!0,style:w("role")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},children:[(0,Lr.jsx)("option",{value:"",children:"Select Role"}),(0,Lr.jsx)("option",{value:"STUDENT",children:"Student"}),(0,Lr.jsx)("option",{value:"ACADEMIC",children:"Academic"}),(0,Lr.jsx)("option",{value:"INDUSTRY_PROFESSIONAL",children:"Industry Professional"}),(0,Lr.jsx)("option",{value:"OTHER",children:"Other"})]}),f.role&&(0,Lr.jsx)(gs,{children:f.role})]}),(0,Lr.jsx)(hs,{type:"submit",disabled:l,children:l?"Processing...":"Sign Up"}),(0,Lr.jsx)(ms,{type:"button",onClick:()=>h("/login"),children:"Already have an account? Sign In"})]}),u&&(0,Lr.jsx)(gs,{style:{textAlign:"center",marginTop:"20px"},children:u})]}),(0,Lr.jsxs)(vs,{children:[(0,Lr.jsx)(Ja,{$isLogin:t,children:(0,Lr.jsxs)(Ma,{onSubmit:b,style:{position:"relative"},children:[(0,Lr.jsx)(_a,{children:"Sign Up"}),(0,Lr.jsxs)(ss,{children:[(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"text",name:"firstName",placeholder:"First Name",value:a.firstName,onChange:v,required:!0,style:{...w("firstName")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.firstName&&(0,Lr.jsx)(os,{children:f.firstName})]}),(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"text",name:"lastName",placeholder:"Last Name",value:a.lastName,onChange:v,required:!0,style:{...w("lastName")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.lastName&&(0,Lr.jsx)(os,{children:f.lastName})]})]}),(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"email",name:"email",placeholder:"Email Address",value:a.email,onChange:v,required:!0,style:{...w("email")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.email&&(0,Lr.jsx)(os,{children:f.email})]}),(0,Lr.jsxs)(ss,{children:[(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"password",name:"password",placeholder:"Password",value:a.password,onChange:v,required:!0,style:{...w("password")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.password&&(0,Lr.jsx)(os,{children:f.password})]}),(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"password",name:"confirmPassword",placeholder:"Confirm Password",value:a.confirmPassword,onChange:v,required:!0,style:{...w("confirmPassword")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.confirmPassword&&(0,Lr.jsx)(os,{children:f.confirmPassword})]})]}),(0,Lr.jsx)(ss,{children:(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsxs)(Ba,{name:"country",value:a.country,onChange:v,required:!0,style:{...w("country")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}},children:[(0,Lr.jsx)("option",{value:"",children:"Country"}),g.map(((e,t)=>(0,Lr.jsx)("option",{value:e.toLowerCase(),children:e},t)))]}),f.country&&(0,Lr.jsx)(os,{children:f.country})]})}),(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsx)(Ua,{type:"text",name:"institution",placeholder:"Institution",value:a.institution,onChange:v,style:{...w("institution")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}}}),f.institution&&(0,Lr.jsx)(os,{children:f.institution})]}),(0,Lr.jsxs)("div",{style:{width:"100%"},children:[(0,Lr.jsxs)(Ba,{name:"role",value:a.role,onChange:v,required:!0,style:{...w("role")?{borderColor:"#e74c3c",borderWidth:"2px"}:{},"@media (max-width: 768px)":{fontSize:"15px",padding:"12px 15px"}},children:[(0,Lr.jsx)("option",{value:"",children:"Role"}),(0,Lr.jsx)("option",{value:"STUDENT",children:"Student"}),(0,Lr.jsx)("option",{value:"ACADEMIC",children:"Academic"}),(0,Lr.jsx)("option",{value:"INDUSTRY_PROFESSIONAL",children:"Industry Professional"}),(0,Lr.jsx)("option",{value:"OTHER",children:"Other"})]}),f.role&&(0,Lr.jsx)(os,{children:f.role})]}),(0,Lr.jsx)(Wa,{type:"submit",disabled:l,style:{"@media (max-width: 768px)":{width:"100%",fontSize:"15px",padding:"12px 20px",marginTop:"20px"}},children:l?"Processing...":"Sign Up"})]})}),(0,Lr.jsx)(Xa,{$isLogin:t,children:(0,Lr.jsxs)(Ma,{onSubmit:y,children:[(0,Lr.jsx)(_a,{children:"Sign In"}),(0,Lr.jsxs)("div",{style:{width:"80%","@media (max-width: 768px)":{width:"100%"}},children:[(0,Lr.jsx)(ls,{type:"email",name:"email",placeholder:"Email Address",value:o.email,onChange:x,required:!0,style:w("loginEmail")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.loginEmail&&(0,Lr.jsx)(os,{style:{marginLeft:"10%","@media (max-width: 768px)":{marginLeft:0}},children:f.loginEmail})]}),(0,Lr.jsxs)("div",{style:{width:"80%","@media (max-width: 768px)":{width:"100%"}},children:[(0,Lr.jsx)(ls,{type:"password",name:"password",placeholder:"Password",value:o.password,onChange:x,required:!0,style:w("loginPassword")?{borderColor:"#e74c3c",borderWidth:"2px"}:{}}),f.loginPassword&&(0,Lr.jsx)(os,{style:{marginLeft:"10%","@media (max-width: 768px)":{marginLeft:0}},children:f.loginPassword})]}),(0,Lr.jsx)(qa,{as:ze,to:"/forgot-password",style:{"@media (max-width: 768px)":{fontSize:"14px",marginTop:"10px",marginBottom:"20px"}},children:"Forgot your password?"}),(0,Lr.jsx)(Wa,{type:"submit",disabled:l,style:{"@media (max-width: 768px)":{width:"100%",fontSize:"15px",padding:"12px 20px"}},children:l?"Processing...":"Sign In"})]})}),(0,Lr.jsx)(Za,{$isLogin:t,children:(0,Lr.jsxs)($a,{$isLogin:t,children:[(0,Lr.jsxs)(ts,{$isLogin:t,children:[(0,Lr.jsx)(Da,{children:"Hello!"}),(0,Lr.jsxs)(Ia,{style:{"@media (max-width: 768px)":{fontSize:"14px",lineHeight:"1.4"}},children:["Don't you have an account?",(0,Lr.jsx)("br",{}),"Join us to use all of site features."]}),(0,Lr.jsx)(Ha,{onClick:()=>{h("/login?signup=true")},style:{"@media (max-width: 768px)":{fontSize:"14px",padding:"10px 20px"}},children:"SIGN UP"})]}),(0,Lr.jsxs)(ns,{$isLogin:t,children:[(0,Lr.jsx)(Da,{children:"Welcome!"}),(0,Lr.jsxs)(Ia,{style:{"@media (max-width: 768px)":{fontSize:"14px",lineHeight:"1.4"}},children:["You already have an account?",(0,Lr.jsx)("br",{}),"Sign In!"]}),(0,Lr.jsx)(Ha,{onClick:()=>{h("/login")},style:{"@media (max-width: 768px)":{fontSize:"14px",padding:"10px 20px"}},children:"SIGN IN"})]})]})}),u&&(0,Lr.jsx)(rs,{children:u})]})]})},ws=n.p+"static/media/about-us.b47de3b1958349f0e7cc.png";var Ss=n(7681);const ks=Math.min,js=Math.max,Es=Math.round,Cs=Math.floor,As=e=>({x:e,y:e}),Ps={left:"right",right:"left",bottom:"top",top:"bottom"},Ns={start:"end",end:"start"};function zs(e,t,n){return js(e,ks(t,n))}function Rs(e,t){return"function"===typeof e?e(t):e}function Os(e){return e.split("-")[0]}function Ts(e){return e.split("-")[1]}function Ls(e){return"x"===e?"y":"x"}function Fs(e){return"y"===e?"height":"width"}function Ms(e){return["top","bottom"].includes(Os(e))?"y":"x"}function Ds(e){return Ls(Ms(e))}function _s(e){return e.replace(/start|end/g,(e=>Ns[e]))}function Is(e){return e.replace(/left|right|bottom|top/g,(e=>Ps[e]))}function Us(e){return"number"!==typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}function Bs(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function Ws(e,t,n){let{reference:r,floating:o}=e;const i=Ms(t),a=Ds(t),s=Fs(a),l=Os(t),c="y"===i,u=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,f=r[s]/2-o[s]/2;let p;switch(l){case"top":p={x:u,y:r.y-o.height};break;case"bottom":p={x:u,y:r.y+r.height};break;case"right":p={x:r.x+r.width,y:d};break;case"left":p={x:r.x-o.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Ts(t)){case"start":p[a]-=f*(n&&c?-1:1);break;case"end":p[a]+=f*(n&&c?-1:1)}return p}async function Hs(e,t){var n;void 0===t&&(t={});const{x:r,y:o,platform:i,rects:a,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:f=!1,padding:p=0}=Rs(t,e),h=Us(p),m=s[f?"floating"===d?"reference":"floating":d],g=Bs(await i.getClippingRect({element:null==(n=await(null==i.isElement?void 0:i.isElement(m)))||n?m:m.contextElement||await(null==i.getDocumentElement?void 0:i.getDocumentElement(s.floating)),boundary:c,rootBoundary:u,strategy:l})),x="floating"===d?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,v=await(null==i.getOffsetParent?void 0:i.getOffsetParent(s.floating)),y=await(null==i.isElement?void 0:i.isElement(v))&&await(null==i.getScale?void 0:i.getScale(v))||{x:1,y:1},b=Bs(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:x,offsetParent:v,strategy:l}):x);return{top:(g.top-b.top+h.top)/y.y,bottom:(b.bottom-g.bottom+h.bottom)/y.y,left:(g.left-b.left+h.left)/y.x,right:(b.right-g.right+h.right)/y.x}}function qs(){return"undefined"!==typeof window}function Vs(e){return Gs(e)?(e.nodeName||"").toLowerCase():"#document"}function Ks(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function Ys(e){var t;return null==(t=(Gs(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function Gs(e){return!!qs()&&(e instanceof Node||e instanceof Ks(e).Node)}function Qs(e){return!!qs()&&(e instanceof Element||e instanceof Ks(e).Element)}function Js(e){return!!qs()&&(e instanceof HTMLElement||e instanceof Ks(e).HTMLElement)}function Xs(e){return!(!qs()||"undefined"===typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof Ks(e).ShadowRoot)}function Zs(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=ol(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function $s(e){return["table","td","th"].includes(Vs(e))}function el(e){return[":popover-open",":modal"].some((t=>{try{return e.matches(t)}catch(rS){return!1}}))}function tl(e){const t=nl(),n=Qs(e)?ol(e):e;return["transform","translate","scale","rotate","perspective"].some((e=>!!n[e]&&"none"!==n[e]))||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","translate","scale","rotate","perspective","filter"].some((e=>(n.willChange||"").includes(e)))||["paint","layout","strict","content"].some((e=>(n.contain||"").includes(e)))}function nl(){return!("undefined"===typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function rl(e){return["html","body","#document"].includes(Vs(e))}function ol(e){return Ks(e).getComputedStyle(e)}function il(e){return Qs(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function al(e){if("html"===Vs(e))return e;const t=e.assignedSlot||e.parentNode||Xs(e)&&e.host||Ys(e);return Xs(t)?t.host:t}function sl(e){const t=al(e);return rl(t)?e.ownerDocument?e.ownerDocument.body:e.body:Js(t)&&Zs(t)?t:sl(t)}function ll(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);const o=sl(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=Ks(o);if(i){const e=cl(a);return t.concat(a,a.visualViewport||[],Zs(o)?o:[],e&&n?ll(e):[])}return t.concat(o,ll(o,[],n))}function cl(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ul(e){const t=ol(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=Js(e),i=o?e.offsetWidth:n,a=o?e.offsetHeight:r,s=Es(n)!==i||Es(r)!==a;return s&&(n=i,r=a),{width:n,height:r,$:s}}function dl(e){return Qs(e)?e:e.contextElement}function fl(e){const t=dl(e);if(!Js(t))return As(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:i}=ul(t);let a=(i?Es(n.width):n.width)/r,s=(i?Es(n.height):n.height)/o;return a&&Number.isFinite(a)||(a=1),s&&Number.isFinite(s)||(s=1),{x:a,y:s}}const pl=As(0);function hl(e){const t=Ks(e);return nl()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:pl}function ml(e,t,n,r){void 0===t&&(t=!1),void 0===n&&(n=!1);const o=e.getBoundingClientRect(),i=dl(e);let a=As(1);t&&(r?Qs(r)&&(a=fl(r)):a=fl(e));const s=function(e,t,n){return void 0===t&&(t=!1),!(!n||t&&n!==Ks(e))&&t}(i,n,r)?hl(i):As(0);let l=(o.left+s.x)/a.x,c=(o.top+s.y)/a.y,u=o.width/a.x,d=o.height/a.y;if(i){const e=Ks(i),t=r&&Qs(r)?Ks(r):r;let n=e,o=cl(n);for(;o&&r&&t!==n;){const e=fl(o),t=o.getBoundingClientRect(),r=ol(o),i=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;l*=e.x,c*=e.y,u*=e.x,d*=e.y,l+=i,c+=a,n=Ks(o),o=cl(n)}}return Bs({width:u,height:d,x:l,y:c})}function gl(e,t){const n=il(e).scrollLeft;return t?t.left+n:ml(Ys(e)).left+n}function xl(e,t,n){void 0===n&&(n=!1);const r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-(n?0:gl(e,r)),y:r.top+t.scrollTop}}function vl(e,t,n){let r;if("viewport"===t)r=function(e,t){const n=Ks(e),r=Ys(e),o=n.visualViewport;let i=r.clientWidth,a=r.clientHeight,s=0,l=0;if(o){i=o.width,a=o.height;const e=nl();(!e||e&&"fixed"===t)&&(s=o.offsetLeft,l=o.offsetTop)}return{width:i,height:a,x:s,y:l}}(e,n);else if("document"===t)r=function(e){const t=Ys(e),n=il(e),r=e.ownerDocument.body,o=js(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=js(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-n.scrollLeft+gl(e);const s=-n.scrollTop;return"rtl"===ol(r).direction&&(a+=js(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:a,y:s}}(Ys(e));else if(Qs(t))r=function(e,t){const n=ml(e,!0,"fixed"===t),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=Js(e)?fl(e):As(1);return{width:e.clientWidth*i.x,height:e.clientHeight*i.y,x:o*i.x,y:r*i.y}}(t,n);else{const n=hl(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Bs(r)}function yl(e,t){const n=al(e);return!(n===t||!Qs(n)||rl(n))&&("fixed"===ol(n).position||yl(n,t))}function bl(e,t,n){const r=Js(t),o=Ys(t),i="fixed"===n,a=ml(e,!0,i,t);let s={scrollLeft:0,scrollTop:0};const l=As(0);if(r||!r&&!i)if(("body"!==Vs(t)||Zs(o))&&(s=il(t)),r){const e=ml(t,!0,i,t);l.x=e.x+t.clientLeft,l.y=e.y+t.clientTop}else o&&(l.x=gl(o));const c=!o||r||i?As(0):xl(o,s);return{x:a.left+s.scrollLeft-l.x-c.x,y:a.top+s.scrollTop-l.y-c.y,width:a.width,height:a.height}}function wl(e){return"static"===ol(e).position}function Sl(e,t){if(!Js(e)||"fixed"===ol(e).position)return null;if(t)return t(e);let n=e.offsetParent;return Ys(e)===n&&(n=n.ownerDocument.body),n}function kl(e,t){const n=Ks(e);if(el(e))return n;if(!Js(e)){let t=al(e);for(;t&&!rl(t);){if(Qs(t)&&!wl(t))return t;t=al(t)}return n}let r=Sl(e,t);for(;r&&$s(r)&&wl(r);)r=Sl(r,t);return r&&rl(r)&&wl(r)&&!tl(r)?n:r||function(e){let t=al(e);for(;Js(t)&&!rl(t);){if(tl(t))return t;if(el(t))return null;t=al(t)}return null}(e)||n}const jl={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const i="fixed"===o,a=Ys(r),s=!!t&&el(t.floating);if(r===a||s&&i)return n;let l={scrollLeft:0,scrollTop:0},c=As(1);const u=As(0),d=Js(r);if((d||!d&&!i)&&(("body"!==Vs(r)||Zs(a))&&(l=il(r)),Js(r))){const e=ml(r);c=fl(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}const f=!a||d||i?As(0):xl(a,l,!0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-l.scrollLeft*c.x+u.x+f.x,y:n.y*c.y-l.scrollTop*c.y+u.y+f.y}},getDocumentElement:Ys,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const i="clippingAncestors"===n?el(t)?[]:function(e,t){const n=t.get(e);if(n)return n;let r=ll(e,[],!1).filter((e=>Qs(e)&&"body"!==Vs(e))),o=null;const i="fixed"===ol(e).position;let a=i?al(e):e;for(;Qs(a)&&!rl(a);){const t=ol(a),n=tl(a);n||"fixed"!==t.position||(o=null),(i?!n&&!o:!n&&"static"===t.position&&o&&["absolute","fixed"].includes(o.position)||Zs(a)&&!n&&yl(e,a))?r=r.filter((e=>e!==a)):o=t,a=al(a)}return t.set(e,r),r}(t,this._c):[].concat(n),a=[...i,r],s=a[0],l=a.reduce(((e,n)=>{const r=vl(t,n,o);return e.top=js(r.top,e.top),e.right=ks(r.right,e.right),e.bottom=ks(r.bottom,e.bottom),e.left=js(r.left,e.left),e}),vl(t,s,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:kl,getElementRects:async function(e){const t=this.getOffsetParent||kl,n=this.getDimensions,r=await n(e.floating);return{reference:bl(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:n}=ul(e);return{width:t,height:n}},getScale:fl,isElement:Qs,isRTL:function(e){return"rtl"===ol(e).direction}};function El(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Cl(e,t,n,r){void 0===r&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:a="function"===typeof ResizeObserver,layoutShift:s="function"===typeof IntersectionObserver,animationFrame:l=!1}=r,c=dl(e),u=o||i?[...c?ll(c):[],...ll(t)]:[];u.forEach((e=>{o&&e.addEventListener("scroll",n,{passive:!0}),i&&e.addEventListener("resize",n)}));const d=c&&s?function(e,t){let n,r=null;const o=Ys(e);function i(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function a(s,l){void 0===s&&(s=!1),void 0===l&&(l=1),i();const c=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=c;if(s||t(),!f||!p)return;const h={rootMargin:-Cs(d)+"px "+-Cs(o.clientWidth-(u+f))+"px "+-Cs(o.clientHeight-(d+p))+"px "+-Cs(u)+"px",threshold:js(0,ks(1,l))||1};let m=!0;function g(t){const r=t[0].intersectionRatio;if(r!==l){if(!m)return a();r?a(!1,r):n=setTimeout((()=>{a(!1,1e-7)}),1e3)}1!==r||El(c,e.getBoundingClientRect())||a(),m=!1}try{r=new IntersectionObserver(g,{...h,root:o.ownerDocument})}catch(rS){r=new IntersectionObserver(g,h)}r.observe(e)}(!0),i}(c,n):null;let f,p=-1,h=null;a&&(h=new ResizeObserver((e=>{let[r]=e;r&&r.target===c&&h&&(h.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame((()=>{var e;null==(e=h)||e.observe(t)}))),n()})),c&&!l&&h.observe(c),h.observe(t));let m=l?ml(e):null;return l&&function t(){const r=ml(e);m&&!El(m,r)&&n();m=r,f=requestAnimationFrame(t)}(),n(),()=>{var e;u.forEach((e=>{o&&e.removeEventListener("scroll",n),i&&e.removeEventListener("resize",n)})),null==d||d(),null==(e=h)||e.disconnect(),h=null,l&&cancelAnimationFrame(f)}}const Al=function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:i,placement:a,middlewareData:s}=t,l=await async function(e,t){const{placement:n,platform:r,elements:o}=e,i=await(null==r.isRTL?void 0:r.isRTL(o.floating)),a=Os(n),s=Ts(n),l="y"===Ms(n),c=["left","top"].includes(a)?-1:1,u=i&&l?-1:1,d=Rs(t,e);let{mainAxis:f,crossAxis:p,alignmentAxis:h}="number"===typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&"number"===typeof h&&(p="end"===s?-1*h:h),l?{x:p*u,y:f*c}:{x:f*c,y:p*u}}(t,e);return a===(null==(n=s.offset)?void 0:n.placement)&&null!=(r=s.arrow)&&r.alignmentOffset?{}:{x:o+l.x,y:i+l.y,data:{...l,placement:a}}}}},Pl=function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o}=t,{mainAxis:i=!0,crossAxis:a=!1,limiter:s={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Rs(e,t),c={x:n,y:r},u=await Hs(t,l),d=Ms(Os(o)),f=Ls(d);let p=c[f],h=c[d];if(i){const e="y"===f?"bottom":"right";p=zs(p+u["y"===f?"top":"left"],p,p-u[e])}if(a){const e="y"===d?"bottom":"right";h=zs(h+u["y"===d?"top":"left"],h,h-u[e])}const m=s.fn({...t,[f]:p,[d]:h});return{...m,data:{x:m.x-n,y:m.y-r,enabled:{[f]:i,[d]:a}}}}}},Nl=function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:i,rects:a,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:m=!0,...g}=Rs(e,t);if(null!=(n=i.arrow)&&n.alignmentOffset)return{};const x=Os(o),v=Ms(s),y=Os(s)===s,b=await(null==l.isRTL?void 0:l.isRTL(c.floating)),w=f||(y||!m?[Is(s)]:function(e){const t=Is(e);return[_s(e),t,_s(t)]}(s)),S="none"!==h;!f&&S&&w.push(...function(e,t,n,r){const o=Ts(e);let i=function(e,t,n){const r=["left","right"],o=["right","left"],i=["top","bottom"],a=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?i:a;default:return[]}}(Os(e),"start"===n,r);return o&&(i=i.map((e=>e+"-"+o)),t&&(i=i.concat(i.map(_s)))),i}(s,m,h,b));const k=[s,...w],j=await Hs(t,g),E=[];let C=(null==(r=i.flip)?void 0:r.overflows)||[];if(u&&E.push(j[x]),d){const e=function(e,t,n){void 0===n&&(n=!1);const r=Ts(e),o=Ds(e),i=Fs(o);let a="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[i]>t.floating[i]&&(a=Is(a)),[a,Is(a)]}(o,a,b);E.push(j[e[0]],j[e[1]])}if(C=[...C,{placement:o,overflows:E}],!E.every((e=>e<=0))){var A,P;const e=((null==(A=i.flip)?void 0:A.index)||0)+1,t=k[e];if(t)return{data:{index:e,overflows:C},reset:{placement:t}};let n=null==(P=C.filter((e=>e.overflows[0]<=0)).sort(((e,t)=>e.overflows[1]-t.overflows[1]))[0])?void 0:P.placement;if(!n)switch(p){case"bestFit":{var N;const e=null==(N=C.filter((e=>{if(S){const t=Ms(e.placement);return t===v||"y"===t}return!0})).map((e=>[e.placement,e.overflows.filter((e=>e>0)).reduce(((e,t)=>e+t),0)])).sort(((e,t)=>e[1]-t[1]))[0])?void 0:N[0];e&&(n=e);break}case"initialPlacement":n=s}if(o!==n)return{reset:{placement:n}}}return{}}}},zl=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:i,platform:a,elements:s,middlewareData:l}=t,{element:c,padding:u=0}=Rs(e,t)||{};if(null==c)return{};const d=Us(u),f={x:n,y:r},p=Ds(o),h=Fs(p),m=await a.getDimensions(c),g="y"===p,x=g?"top":"left",v=g?"bottom":"right",y=g?"clientHeight":"clientWidth",b=i.reference[h]+i.reference[p]-f[p]-i.floating[h],w=f[p]-i.reference[p],S=await(null==a.getOffsetParent?void 0:a.getOffsetParent(c));let k=S?S[y]:0;k&&await(null==a.isElement?void 0:a.isElement(S))||(k=s.floating[y]||i.floating[h]);const j=b/2-w/2,E=k/2-m[h]/2-1,C=ks(d[x],E),A=ks(d[v],E),P=C,N=k-m[h]-A,z=k/2-m[h]/2+j,R=zs(P,z,N),O=!l.arrow&&null!=Ts(o)&&z!==R&&i.reference[h]/2-(z<P?C:A)-m[h]/2<0,T=O?z<P?z-P:z-N:0;return{[p]:f[p]+T,data:{[p]:R,centerOffset:z-R-T,...O&&{alignmentOffset:T}},reset:O}}}),Rl=(e,t,n)=>{const r=new Map,o={platform:jl,...n},i={...o.platform,_c:r};return(async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:a}=n,s=i.filter(Boolean),l=await(null==a.isRTL?void 0:a.isRTL(t));let c=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=Ws(c,r,l),f=r,p={},h=0;for(let m=0;m<s.length;m++){const{name:n,fn:i}=s[m],{x:g,y:x,data:v,reset:y}=await i({x:u,y:d,initialPlacement:r,placement:f,strategy:o,middlewareData:p,rects:c,platform:a,elements:{reference:e,floating:t}});u=null!=g?g:u,d=null!=x?x:d,p={...p,[n]:{...p[n],...v}},y&&h<=50&&(h++,"object"===typeof y&&(y.placement&&(f=y.placement),y.rects&&(c=!0===y.rects?await a.getElementRects({reference:e,floating:t,strategy:o}):y.rects),({x:u,y:d}=Ws(c,f,l))),m=-1)}return{x:u,y:d,placement:f,strategy:o,middlewareData:p}})(e,t,{...o,platform:i})};var Ol=n(8139);const Tl="react-tooltip-core-styles",Ll="react-tooltip-base-styles",Fl={core:!1,base:!1};function Ml(e){let{css:t,id:n=Ll,type:r="base",ref:o}=e;var i,a;if(!t||"undefined"==typeof document||Fl[r])return;if("core"===r&&"undefined"!=typeof process&&(null===(i=null===process||void 0===process?void 0:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})||void 0===i?void 0:i.REACT_TOOLTIP_DISABLE_CORE_STYLES))return;if("base"!==r&&"undefined"!=typeof process&&(null===(a=null===process||void 0===process?void 0:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})||void 0===a?void 0:a.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;"core"===r&&(n=Tl),o||(o={});const{insertAt:s}=o;if(document.getElementById(n))return;const l=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.id=n,c.type="text/css","top"===s&&l.firstChild?l.insertBefore(c,l.firstChild):l.appendChild(c),c.styleSheet?c.styleSheet.cssText=t:c.appendChild(document.createTextNode(t)),Fl[r]=!0}const Dl=async e=>{let{elementReference:t=null,tooltipReference:n=null,tooltipArrowReference:r=null,place:o="top",offset:i=10,strategy:a="absolute",middlewares:s=[Al(Number(i)),Nl({fallbackAxisSideDirection:"start"}),Pl({padding:5})],border:l}=e;if(!t)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};if(null===n)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};const c=s;return r?(c.push(zl({element:r,padding:5})),Rl(t,n,{placement:o,strategy:a,middleware:c}).then((e=>{let{x:t,y:n,placement:r,middlewareData:o}=e;var i,a;const s={left:`${t}px`,top:`${n}px`,border:l},{x:c,y:u}=null!==(i=o.arrow)&&void 0!==i?i:{x:0,y:0},d=null!==(a={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]])&&void 0!==a?a:"bottom",f=l&&{borderBottom:l,borderRight:l};let p=0;if(l){const e=`${l}`.match(/(\d+)px/);p=(null==e?void 0:e[1])?Number(e[1]):1}return{tooltipStyles:s,tooltipArrowStyles:{left:null!=c?`${c}px`:"",top:null!=u?`${u}px`:"",right:"",bottom:"",...f,[d]:`-${4+p}px`},place:r}}))):Rl(t,n,{placement:"bottom",strategy:a,middleware:c}).then((e=>{let{x:t,y:n,placement:r}=e;return{tooltipStyles:{left:`${t}px`,top:`${n}px`},tooltipArrowStyles:{},place:r}}))},_l=(e,t)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(e,t),Il=(e,t,n)=>{let r=null;const o=function(){for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];const s=()=>{r=null,n||e.apply(this,i)};n&&!r&&(e.apply(this,i),r=setTimeout(s,t)),n||(r&&clearTimeout(r),r=setTimeout(s,t))};return o.cancel=()=>{r&&(clearTimeout(r),r=null)},o},Ul=e=>null!==e&&!Array.isArray(e)&&"object"==typeof e,Bl=(e,t)=>{if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every(((e,n)=>Bl(e,t[n])));if(Array.isArray(e)!==Array.isArray(t))return!1;if(!Ul(e)||!Ul(t))return e===t;const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every((n=>Bl(e[n],t[n])))},Wl=e=>{if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const t=getComputedStyle(e);return["overflow","overflow-x","overflow-y"].some((e=>{const n=t.getPropertyValue(e);return"auto"===n||"scroll"===n}))},Hl=e=>{if(!e)return null;let t=e.parentElement;for(;t;){if(Wl(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},ql="undefined"!=typeof window?r.useLayoutEffect:r.useEffect,Vl=e=>{e.current&&(clearTimeout(e.current),e.current=null)},Kl="DEFAULT_TOOLTIP_ID",Yl={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},Gl=(0,r.createContext)({getTooltipData:()=>Yl});function Ql(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Kl;return(0,r.useContext)(Gl).getTooltipData(e)}var Jl={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},Xl={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const Zl=e=>{let{forwardRef:t,id:n,className:o,classNameArrow:i,variant:a="dark",anchorId:s,anchorSelect:l,place:c="top",offset:u=10,events:d=["hover"],openOnClick:f=!1,positionStrategy:p="absolute",middlewares:h,wrapper:m,delayShow:g=0,delayHide:x=0,float:v=!1,hidden:y=!1,noArrow:b=!1,clickable:w=!1,closeOnEsc:S=!1,closeOnScroll:k=!1,closeOnResize:j=!1,openEvents:E,closeEvents:C,globalCloseEvents:A,imperativeModeOnly:P,style:N,position:z,afterShow:R,afterHide:O,disableTooltip:T,content:L,contentWrapperRef:F,isOpen:M,defaultIsOpen:D=!1,setIsOpen:_,activeAnchor:I,setActiveAnchor:U,border:B,opacity:W,arrowColor:H,role:q="tooltip"}=e;var V;const K=(0,r.useRef)(null),Y=(0,r.useRef)(null),G=(0,r.useRef)(null),Q=(0,r.useRef)(null),J=(0,r.useRef)(null),[X,Z]=(0,r.useState)({tooltipStyles:{},tooltipArrowStyles:{},place:c}),[$,ee]=(0,r.useState)(!1),[te,ne]=(0,r.useState)(!1),[re,oe]=(0,r.useState)(null),ie=(0,r.useRef)(!1),ae=(0,r.useRef)(null),{anchorRefs:se,setActiveAnchor:le}=Ql(n),ce=(0,r.useRef)(!1),[ue,de]=(0,r.useState)([]),fe=(0,r.useRef)(!1),pe=f||d.includes("click"),he=pe||(null==E?void 0:E.click)||(null==E?void 0:E.dblclick)||(null==E?void 0:E.mousedown),me=E?{...E}:{mouseover:!0,focus:!0,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1};!E&&pe&&Object.assign(me,{mouseenter:!1,focus:!1,mouseover:!1,click:!0});const ge=C?{...C}:{mouseout:!0,blur:!0,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1};!C&&pe&&Object.assign(ge,{mouseleave:!1,blur:!1,mouseout:!1});const xe=A?{...A}:{escape:S||!1,scroll:k||!1,resize:j||!1,clickOutsideAnchor:he||!1};P&&(Object.assign(me,{mouseover:!1,focus:!1,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(ge,{mouseout:!1,blur:!1,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(xe,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),ql((()=>(fe.current=!0,()=>{fe.current=!1})),[]);const ve=e=>{fe.current&&(e&&ne(!0),setTimeout((()=>{fe.current&&(null==_||_(e),void 0===M&&ee(e))}),10))};(0,r.useEffect)((()=>{if(void 0===M)return()=>null;M&&ne(!0);const e=setTimeout((()=>{ee(M)}),10);return()=>{clearTimeout(e)}}),[M]),(0,r.useEffect)((()=>{if($!==ie.current)if(Vl(J),ie.current=$,$)null==R||R();else{const e=(()=>{const e=getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay").match(/^([\d.]+)(ms|s)$/);if(!e)return 0;const[,t,n]=e;return Number(t)*("ms"===n?1:1e3)})();J.current=setTimeout((()=>{ne(!1),oe(null),null==O||O()}),e+25)}}),[$]);const ye=e=>{Z((t=>Bl(t,e)?t:e))},be=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g;Vl(G),te?ve(!0):G.current=setTimeout((()=>{ve(!0)}),e)},we=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x;Vl(Q),Q.current=setTimeout((()=>{ce.current||ve(!1)}),e)},Se=e=>{var t;if(!e)return;const n=null!==(t=e.currentTarget)&&void 0!==t?t:e.target;if(!(null==n?void 0:n.isConnected))return U(null),void le({current:null});g?be():ve(!0),U(n),le({current:n}),Vl(Q)},ke=()=>{w?we(x||100):x?we():ve(!1),Vl(G)},je=e=>{let{x:t,y:n}=e;var r;const o={getBoundingClientRect:()=>({x:t,y:n,width:0,height:0,top:n,left:t,right:t,bottom:n})};Dl({place:null!==(r=null==re?void 0:re.place)&&void 0!==r?r:c,offset:u,elementReference:o,tooltipReference:K.current,tooltipArrowReference:Y.current,strategy:p,middlewares:h,border:B}).then((e=>{ye(e)}))},Ee=e=>{if(!e)return;const t=e,n={x:t.clientX,y:t.clientY};je(n),ae.current=n},Ce=e=>{var t;if(!$)return;const n=e.target;n.isConnected&&((null===(t=K.current)||void 0===t?void 0:t.contains(n))||[document.querySelector(`[id='${s}']`),...ue].some((e=>null==e?void 0:e.contains(n)))||(ve(!1),Vl(G)))},Ae=Il(Se,50,!0),Pe=Il(ke,50,!0),Ne=e=>{Pe.cancel(),Ae(e)},ze=()=>{Ae.cancel(),Pe()},Re=(0,r.useCallback)((()=>{var e,t;const n=null!==(e=null==re?void 0:re.position)&&void 0!==e?e:z;n?je(n):v?ae.current&&je(ae.current):(null==I?void 0:I.isConnected)&&Dl({place:null!==(t=null==re?void 0:re.place)&&void 0!==t?t:c,offset:u,elementReference:I,tooltipReference:K.current,tooltipArrowReference:Y.current,strategy:p,middlewares:h,border:B}).then((e=>{fe.current&&ye(e)}))}),[$,I,L,N,c,null==re?void 0:re.place,u,p,z,null==re?void 0:re.position,v]);(0,r.useEffect)((()=>{var e,t;const n=new Set(se);ue.forEach((e=>{(null==T?void 0:T(e))||n.add({current:e})}));const r=document.querySelector(`[id='${s}']`);r&&!(null==T?void 0:T(r))&&n.add({current:r});const o=()=>{ve(!1)},i=Hl(I),a=Hl(K.current);xe.scroll&&(window.addEventListener("scroll",o),null==i||i.addEventListener("scroll",o),null==a||a.addEventListener("scroll",o));let l=null;xe.resize?window.addEventListener("resize",o):I&&K.current&&(l=Cl(I,K.current,Re,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const c=e=>{"Escape"===e.key&&ve(!1)};xe.escape&&window.addEventListener("keydown",c),xe.clickOutsideAnchor&&window.addEventListener("click",Ce);const u=[],d=e=>Boolean((null==e?void 0:e.target)&&(null==I?void 0:I.contains(e.target))),f=e=>{$&&d(e)||Se(e)},p=e=>{$&&d(e)&&ke()},h=["mouseover","mouseout","mouseenter","mouseleave","focus","blur"],m=["click","dblclick","mousedown","mouseup"];Object.entries(me).forEach((e=>{let[t,n]=e;n&&(h.includes(t)?u.push({event:t,listener:Ne}):m.includes(t)&&u.push({event:t,listener:f}))})),Object.entries(ge).forEach((e=>{let[t,n]=e;n&&(h.includes(t)?u.push({event:t,listener:ze}):m.includes(t)&&u.push({event:t,listener:p}))})),v&&u.push({event:"pointermove",listener:Ee});const g=()=>{ce.current=!0},x=()=>{ce.current=!1,ke()},y=w&&(ge.mouseout||ge.mouseleave);return y&&(null===(e=K.current)||void 0===e||e.addEventListener("mouseover",g),null===(t=K.current)||void 0===t||t.addEventListener("mouseout",x)),u.forEach((e=>{let{event:t,listener:r}=e;n.forEach((e=>{var n;null===(n=e.current)||void 0===n||n.addEventListener(t,r)}))})),()=>{var e,t;xe.scroll&&(window.removeEventListener("scroll",o),null==i||i.removeEventListener("scroll",o),null==a||a.removeEventListener("scroll",o)),xe.resize?window.removeEventListener("resize",o):null==l||l(),xe.clickOutsideAnchor&&window.removeEventListener("click",Ce),xe.escape&&window.removeEventListener("keydown",c),y&&(null===(e=K.current)||void 0===e||e.removeEventListener("mouseover",g),null===(t=K.current)||void 0===t||t.removeEventListener("mouseout",x)),u.forEach((e=>{let{event:t,listener:r}=e;n.forEach((e=>{var n;null===(n=e.current)||void 0===n||n.removeEventListener(t,r)}))}))}}),[I,Re,te,se,ue,E,C,A,pe,g,x]),(0,r.useEffect)((()=>{var e,t;let r=null!==(t=null!==(e=null==re?void 0:re.anchorSelect)&&void 0!==e?e:l)&&void 0!==t?t:"";!r&&n&&(r=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`);const o=new MutationObserver((e=>{const t=[],o=[];e.forEach((e=>{if("attributes"===e.type&&"data-tooltip-id"===e.attributeName&&(e.target.getAttribute("data-tooltip-id")===n?t.push(e.target):e.oldValue===n&&o.push(e.target)),"childList"===e.type){if(I){const t=[...e.removedNodes].filter((e=>1===e.nodeType));if(r)try{o.push(...t.filter((e=>e.matches(r)))),o.push(...t.flatMap((e=>[...e.querySelectorAll(r)])))}catch(e){}t.some((e=>{var t;return!!(null===(t=null==e?void 0:e.contains)||void 0===t?void 0:t.call(e,I))&&(ne(!1),ve(!1),U(null),Vl(G),Vl(Q),!0)}))}if(r)try{const n=[...e.addedNodes].filter((e=>1===e.nodeType));t.push(...n.filter((e=>e.matches(r)))),t.push(...n.flatMap((e=>[...e.querySelectorAll(r)])))}catch(e){}}})),(t.length||o.length)&&de((e=>[...e.filter((e=>!o.includes(e))),...t]))}));return o.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{o.disconnect()}}),[n,l,null==re?void 0:re.anchorSelect,I]),(0,r.useEffect)((()=>{Re()}),[Re]),(0,r.useEffect)((()=>{if(!(null==F?void 0:F.current))return()=>null;const e=new ResizeObserver((()=>{setTimeout((()=>Re()))}));return e.observe(F.current),()=>{e.disconnect()}}),[L,null==F?void 0:F.current]),(0,r.useEffect)((()=>{var e;const t=document.querySelector(`[id='${s}']`),n=[...ue,t];I&&n.includes(I)||U(null!==(e=ue[0])&&void 0!==e?e:t)}),[s,ue,I]),(0,r.useEffect)((()=>(D&&ve(!0),()=>{Vl(G),Vl(Q)})),[]),(0,r.useEffect)((()=>{var e;let t=null!==(e=null==re?void 0:re.anchorSelect)&&void 0!==e?e:l;if(!t&&n&&(t=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`),t)try{const e=Array.from(document.querySelectorAll(t));de(e)}catch(e){de([])}}),[n,l,null==re?void 0:re.anchorSelect]),(0,r.useEffect)((()=>{G.current&&(Vl(G),be(g))}),[g]);const Oe=null!==(V=null==re?void 0:re.content)&&void 0!==V?V:L,Te=$&&Object.keys(X.tooltipStyles).length>0;return(0,r.useImperativeHandle)(t,(()=>({open:e=>{if(null==e?void 0:e.anchorSelect)try{document.querySelector(e.anchorSelect)}catch(t){return void console.warn(`[react-tooltip] "${e.anchorSelect}" is not a valid CSS selector`)}oe(null!=e?e:null),(null==e?void 0:e.delay)?be(e.delay):ve(!0)},close:e=>{(null==e?void 0:e.delay)?we(e.delay):ve(!1)},activeAnchor:I,place:X.place,isOpen:Boolean(te&&!y&&Oe&&Te)}))),te&&!y&&Oe?r.createElement(m,{id:n,role:q,className:Ol("react-tooltip",Jl.tooltip,Xl.tooltip,Xl[a],o,`react-tooltip__place-${X.place}`,Jl[Te?"show":"closing"],Te?"react-tooltip__show":"react-tooltip__closing","fixed"===p&&Jl.fixed,w&&Jl.clickable),onTransitionEnd:e=>{Vl(J),$||"opacity"!==e.propertyName||(ne(!1),oe(null),null==O||O())},style:{...N,...X.tooltipStyles,opacity:void 0!==W&&Te?W:void 0},ref:K},Oe,r.createElement(m,{className:Ol("react-tooltip-arrow",Jl.arrow,Xl.arrow,i,b&&Jl.noArrow),style:{...X.tooltipArrowStyles,background:H?`linear-gradient(to right bottom, transparent 50%, ${H} 50%)`:void 0},ref:Y})):null},$l=e=>{let{content:t}=e;return r.createElement("span",{dangerouslySetInnerHTML:{__html:t}})},ec=r.forwardRef(((e,t)=>{let{id:n,anchorId:o,anchorSelect:i,content:a,html:s,render:l,className:c,classNameArrow:u,variant:d="dark",place:f="top",offset:p=10,wrapper:h="div",children:m=null,events:g=["hover"],openOnClick:x=!1,positionStrategy:v="absolute",middlewares:y,delayShow:b=0,delayHide:w=0,float:S=!1,hidden:k=!1,noArrow:j=!1,clickable:E=!1,closeOnEsc:C=!1,closeOnScroll:A=!1,closeOnResize:P=!1,openEvents:N,closeEvents:z,globalCloseEvents:R,imperativeModeOnly:O=!1,style:T,position:L,isOpen:F,defaultIsOpen:M=!1,disableStyleInjection:D=!1,border:_,opacity:I,arrowColor:U,setIsOpen:B,afterShow:W,afterHide:H,disableTooltip:q,role:V="tooltip"}=e;const[K,Y]=(0,r.useState)(a),[G,Q]=(0,r.useState)(s),[J,X]=(0,r.useState)(f),[Z,$]=(0,r.useState)(d),[ee,te]=(0,r.useState)(p),[ne,re]=(0,r.useState)(b),[oe,ie]=(0,r.useState)(w),[ae,se]=(0,r.useState)(S),[le,ce]=(0,r.useState)(k),[ue,de]=(0,r.useState)(h),[fe,pe]=(0,r.useState)(g),[he,me]=(0,r.useState)(v),[ge,xe]=(0,r.useState)(null),[ve,ye]=(0,r.useState)(null),be=(0,r.useRef)(D),{anchorRefs:we,activeAnchor:Se}=Ql(n),ke=e=>null==e?void 0:e.getAttributeNames().reduce(((t,n)=>{var r;return n.startsWith("data-tooltip-")&&(t[n.replace(/^data-tooltip-/,"")]=null!==(r=null==e?void 0:e.getAttribute(n))&&void 0!==r?r:null),t}),{}),je=e=>{const t={place:e=>{var t;X(null!==(t=e)&&void 0!==t?t:f)},content:e=>{Y(null!=e?e:a)},html:e=>{Q(null!=e?e:s)},variant:e=>{var t;$(null!==(t=e)&&void 0!==t?t:d)},offset:e=>{te(null===e?p:Number(e))},wrapper:e=>{var t;de(null!==(t=e)&&void 0!==t?t:h)},events:e=>{const t=null==e?void 0:e.split(" ");pe(null!=t?t:g)},"position-strategy":e=>{var t;me(null!==(t=e)&&void 0!==t?t:v)},"delay-show":e=>{re(null===e?b:Number(e))},"delay-hide":e=>{ie(null===e?w:Number(e))},float:e=>{se(null===e?S:"true"===e)},hidden:e=>{ce(null===e?k:"true"===e)},"class-name":e=>{xe(e)}};Object.values(t).forEach((e=>e(null))),Object.entries(e).forEach((e=>{let[n,r]=e;var o;null===(o=t[n])||void 0===o||o.call(t,r)}))};(0,r.useEffect)((()=>{Y(a)}),[a]),(0,r.useEffect)((()=>{Q(s)}),[s]),(0,r.useEffect)((()=>{X(f)}),[f]),(0,r.useEffect)((()=>{$(d)}),[d]),(0,r.useEffect)((()=>{te(p)}),[p]),(0,r.useEffect)((()=>{re(b)}),[b]),(0,r.useEffect)((()=>{ie(w)}),[w]),(0,r.useEffect)((()=>{se(S)}),[S]),(0,r.useEffect)((()=>{ce(k)}),[k]),(0,r.useEffect)((()=>{me(v)}),[v]),(0,r.useEffect)((()=>{be.current!==D&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")}),[D]),(0,r.useEffect)((()=>{"undefined"!=typeof window&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:"core"===D,disableBase:D}}))}),[]),(0,r.useEffect)((()=>{var e;const t=new Set(we);let r=i;if(!r&&n&&(r=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`),r)try{document.querySelectorAll(r).forEach((e=>{t.add({current:e})}))}catch(e){console.warn(`[react-tooltip] "${r}" is not a valid CSS selector`)}const a=document.querySelector(`[id='${o}']`);if(a&&t.add({current:a}),!t.size)return()=>null;const s=null!==(e=null!=ve?ve:a)&&void 0!==e?e:Se.current,l=new MutationObserver((e=>{e.forEach((e=>{var t;if(!s||"attributes"!==e.type||!(null===(t=e.attributeName)||void 0===t?void 0:t.startsWith("data-tooltip-")))return;const n=ke(s);je(n)}))})),c={attributes:!0,childList:!1,subtree:!1};if(s){const e=ke(s);je(e),l.observe(s,c)}return()=>{l.disconnect()}}),[we,Se,ve,o,i]),(0,r.useEffect)((()=>{(null==T?void 0:T.border)&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),_&&!_l("border",`${_}`)&&console.warn(`[react-tooltip] "${_}" is not a valid \`border\`.`),(null==T?void 0:T.opacity)&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),I&&!_l("opacity",`${I}`)&&console.warn(`[react-tooltip] "${I}" is not a valid \`opacity\`.`)}),[]);let Ee=m;const Ce=(0,r.useRef)(null);if(l){const e=l({content:(null==ve?void 0:ve.getAttribute("data-tooltip-content"))||K||null,activeAnchor:ve});Ee=e?r.createElement("div",{ref:Ce,className:"react-tooltip-content-wrapper"},e):null}else K&&(Ee=K);G&&(Ee=r.createElement($l,{content:G}));const Ae={forwardRef:t,id:n,anchorId:o,anchorSelect:i,className:Ol(c,ge),classNameArrow:u,content:Ee,contentWrapperRef:Ce,place:J,variant:Z,offset:ee,wrapper:ue,events:fe,openOnClick:x,positionStrategy:he,middlewares:y,delayShow:ne,delayHide:oe,float:ae,hidden:le,noArrow:j,clickable:E,closeOnEsc:C,closeOnScroll:A,closeOnResize:P,openEvents:N,closeEvents:z,globalCloseEvents:R,imperativeModeOnly:O,style:T,position:L,isOpen:F,defaultIsOpen:M,border:_,opacity:I,arrowColor:U,setIsOpen:B,afterShow:W,afterHide:H,disableTooltip:q,activeAnchor:ve,setActiveAnchor:e=>ye(e),role:V};return r.createElement(Zl,{...Ae})}));"undefined"!=typeof window&&window.addEventListener("react-tooltip-inject-styles",(e=>{e.detail.disableCore||Ml({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),e.detail.disableBase||Ml({css:"\n.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}",type:"base"})}));const tc=n.p+"static/media/cankaya-logo.ed407f926bfdbbba8ad7.png",nc="data:image/png;base64,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",rc=n.p+"static/media/fufdv-logo.64f066b1db91304bfd0c.png",oc=n.p+"static/media/ted-logo.e92bfe80e16cbea872ef.png",ic=e=>{let{type:t,data:n}=e;switch(t){case"cankaya":return(0,Lr.jsxs)("div",{className:"custom-tooltip-container",children:[(0,Lr.jsx)("div",{className:"tooltip-logo-container",children:(0,Lr.jsx)("img",{src:tc,alt:"\xc7ankaya \xdcniversitesi Logo",className:"tooltip-logo"})}),(0,Lr.jsxs)("div",{className:"tooltip-content",children:[(0,Lr.jsx)("h3",{className:"tooltip-title",children:"Cankaya University (T\xfcrkiye)"}),(0,Lr.jsx)("p",{className:"tooltip-subtitle",children:"(Project Coordinator)"}),(0,Lr.jsx)("p",{className:"tooltip-description",children:"\xc7ankaya University, serving as the project coordinator, is a leading private institution in Ankara, T\xfcrkiye. Known for its emphasis on research, innovation, and quality education, the university plays a key role in the strategic and operational management of the project. Its extensive experience in international collaborations ensures smooth coordination and impactful outcomes."})]})]});case"open-uni":return(0,Lr.jsxs)("div",{className:"custom-tooltip-container",children:[(0,Lr.jsx)("div",{className:"tooltip-logo-container",children:(0,Lr.jsx)("img",{src:nc,alt:"Open Universiteit Logo",className:"tooltip-logo"})}),(0,Lr.jsxs)("div",{className:"tooltip-content",children:[(0,Lr.jsx)("h3",{className:"tooltip-title",children:"Open Universiteit (Netherlands)"}),(0,Lr.jsx)("p",{className:"tooltip-description",children:"Open Universiteit, based in Heerlen, the Netherlands, is renowned for its pioneering role in distance education and digital learning. As a partner, it provides critical expertise in online education tools and methodologies, helping the project reach wider audiences and foster flexible, inclusive learning environments."})]})]});case"fufdv":return(0,Lr.jsxs)("div",{className:"custom-tooltip-container",children:[(0,Lr.jsx)("div",{className:"tooltip-logo-container",children:(0,Lr.jsx)("img",{src:rc,alt:"Fundacion Universidad Francisco De Vitoria Logo",className:"tooltip-logo"})}),(0,Lr.jsxs)("div",{className:"tooltip-content",children:[(0,Lr.jsx)("h3",{className:"tooltip-title",children:"Fundacion Universidad"}),(0,Lr.jsx)("h3",{className:"tooltip-title",children:"Francisco De Vitoria (Spain)"}),(0,Lr.jsx)("p",{className:"tooltip-description",children:"Located in Madrid, Spain, Universidad Francisco de Vitoria is a prestigious university recognized for its commitment to ethical values and academic excellence. Its participation enriches the project through deep-rooted experience in educational reform, international mobility, and cultural integration."})]})]});case"ted":return(0,Lr.jsxs)("div",{className:"custom-tooltip-container",children:[(0,Lr.jsx)("div",{className:"tooltip-logo-container",children:(0,Lr.jsx)("img",{src:oc,alt:"TED \xdcniversitesi Logo",className:"tooltip-logo"})}),(0,Lr.jsxs)("div",{className:"tooltip-content",children:[(0,Lr.jsx)("h3",{className:"tooltip-title",children:"TED University (T\xfcrkiye)"}),(0,Lr.jsx)("p",{className:"tooltip-description",children:"TED University, based in Ankara, T\xfcrkiye, is a progressive and dynamic institution dedicated to liberal education and student-centered learning. With its strong focus on pedagogy and interdisciplinary approaches, TEDU brings valuable insights to the development of innovative teaching methodologies within the project."})]})]});default:return(0,Lr.jsx)("span",{children:n})}},ac=[{name:"\xc7ankaya University",coordinates:[32.7597,39.4334],color:"#FF3A33",tooltipType:"cankaya"},{name:"Open Universiteit",coordinates:[4.9815,52.3883],color:"#FF9326",tooltipType:"open-uni"},{name:"Universidad Francisco De Vitoria",coordinates:[-3.7038,40.4168],color:"#FF9326",tooltipType:"fufdv"},{name:"TED University",coordinates:[35,39.5334],color:"#FF9326",tooltipType:"ted"}],sc=()=>(0,Lr.jsxs)("div",{className:"world-map-container",children:[(0,Lr.jsx)(ec,{id:"map-tooltip",className:"map-custom-tooltip",render:e=>{let{content:t,activeAnchor:n}=e;const r=ac.find((e=>e.name===t));return(0,Lr.jsx)(ic,{type:null===r||void 0===r?void 0:r.tooltipType,data:t})}}),(0,Lr.jsxs)(Ss.ComposableMap,{projection:"geoMercator",projectionConfig:{scale:275,center:[32,18]},className:"static-map",children:[(0,Lr.jsx)(Ss.Geographies,{geography:"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",children:e=>{let{geographies:t}=e;return t.map((e=>(0,Lr.jsx)(Ss.Geography,{geography:e,fill:"#B3C9E3",stroke:"#738FB5",strokeWidth:.8,style:{default:{outline:"none"},hover:{outline:"none",fill:"#A0B9D8"},pressed:{outline:"none"}}},e.rsmKey)))}}),ac.map((e=>{let{name:t,coordinates:n,color:r}=e;return(0,Lr.jsx)(Ss.Marker,{coordinates:n,"data-tooltip-id":"map-tooltip","data-tooltip-content":t,children:(0,Lr.jsx)("circle",{r:7,fill:r,stroke:"#fff",strokeWidth:2,className:"map-marker"})},t)}))]})]}),lc=()=>{const[e,t]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{const e=()=>{t(window.innerWidth<=768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),(0,Lr.jsxs)("div",{className:"page about-page",children:[(0,Lr.jsx)("div",{className:"about-banner",children:(0,Lr.jsx)("img",{src:ws,alt:"IT-ISQS Community",className:"banner-image"})}),(0,Lr.jsxs)("div",{className:"about-content",children:[(0,Lr.jsx)("h1",{className:"about-heading",children:"ABOUT IT-ISQS"}),(0,Lr.jsxs)("div",{className:"about-text",children:[(0,Lr.jsx)("p",{children:"Innovative Training for International Software Quality Standards (IT-ISQS) is an Erasmus+ cooperation partnership project that aims to address the global lack of awareness and educational coverage regarding international software quality standards (ISQS). Despite the growing dependence on software in nearly all aspects of modern life\u2014from healthcare to finance, education, and entertainment\u2014most software engineering curricula around the world still provide limited exposure to ISO/IEC standards, which are essential for ensuring software quality, reliability, and safety."}),(0,Lr.jsx)("p",{children:"The IT-ISQS project seeks to close this educational gap by integrating ISQS more deeply into higher education programs. This course will include gamified learning elements, real-life case studies, AI-supported tools, and interactive exercises that reflect real industry practices and challenges."}),(0,Lr.jsx)("p",{children:"The project methodology includes a comprehensive literature review, stakeholder surveys, expert interviews, and statistical analyses to define the challenges in current educational practices. Based on these findings, the consortium will co-develop a modern course design and pilot test it in partner institutions. Feedback from students, professors, and industry representatives will guide the refinement of the content and teaching methods."}),(0,Lr.jsx)("p",{children:"Ultimately, IT-ISQS aims to:"}),(0,Lr.jsx)("p",{children:"- Improve the quality and relevance of engineering education"}),(0,Lr.jsx)("p",{children:"- Enhance students' readiness for the software industry"}),(0,Lr.jsx)("p",{children:"- Promote awareness and understanding of ISO/IEC standards"}),(0,Lr.jsx)("p",{children:"- Support continuous education for software professionals"}),(0,Lr.jsx)("p",{children:"- Encourage international cooperation and exchange of best practices"}),(0,Lr.jsx)("p",{children:"- Through its academic and societal impact, IT-ISQS contributes to building a more knowledgeable, skilled, and globally connected community of software engineers."})]}),(0,Lr.jsx)("h2",{className:"partnerships-heading",children:"OUR PARTNERSHIPS"}),!e&&(0,Lr.jsx)(sc,{}),(0,Lr.jsxs)("div",{className:"about-text",children:[(0,Lr.jsx)("p",{children:"The success and impact of the IT-ISQS project are rooted in its strong international partnership model, bringing together distinguished institutions with a shared commitment to advancing software quality education. Coordinated by \xc7ankaya University (Turkey), the consortium includes:"}),(0,Lr.jsx)("p",{children:"- TED University (Ankara, Turkey)"}),(0,Lr.jsx)("p",{children:"- Universidad Francisco de Vitoria (Madrid, Spain)"}),(0,Lr.jsx)("p",{children:"- Open Universiteit (Heerlen, Netherlands)"}),(0,Lr.jsx)("p",{children:"Each partner plays a critical role in contributing academic expertise, pedagogical innovation, and regional perspectives to ensure the project's excellence and international relevance. This collaborative framework enables joint curriculum development, mutual capacity building, and the integration of ISO/IEC standards into engineering education through state-of-the-art teaching methodologies."})]})]})]})},cc=n.p+"static/media/project.1ff9b1138f0b7d96dc98.png",uc=()=>(0,Lr.jsxs)("div",{className:"page project-results-page",children:[(0,Lr.jsx)("div",{className:"project-banner",children:(0,Lr.jsx)("img",{src:cc,alt:"IT-ISQS Project Results",className:"banner-image"})}),(0,Lr.jsxs)("div",{className:"project-content",children:[(0,Lr.jsx)("h1",{className:"project-heading",children:"PROJECT RESULTS"}),(0,Lr.jsxs)("div",{className:"project-text",children:[(0,Lr.jsx)("p",{children:"The web platform developed as part of this project has achieved its primary goals and successfully delivered a fully functional, user-friendly, and scalable system. Designed with a focus on accessibility, collaboration, and usability, the website serves as a centralized hub for sharing knowledge, interacting with peers, and accessing project-specific resources. Through consistent development iterations and feedback loops, the final outcome has demonstrated substantial alignment with the initial requirements and expectations of stakeholders."}),(0,Lr.jsx)("p",{children:"One of the key achievements of the project is the implementation of a dynamic user management system. Users are able to register, authenticate, and access features based on their roles, ensuring both personalization and security. The system\u2019s backend is powered by a RESTful API that enables fast data retrieval and manipulation, while the frontend interface ensures a seamless experience across devices. Mobile responsiveness and cross-browser compatibility were prioritized, resulting in a site that performs well on smartphones, tablets, and desktops alike."}),(0,Lr.jsx)("p",{children:"Another major success is the integration of a collaborative environment where users can post, comment, and engage in topic-based discussions. This feature fosters community interaction and encourages the exchange of knowledge and ideas among participants. Additionally, all user-generated content is moderated and stored in a relational database, which maintains integrity and supports future data analysis."}),(0,Lr.jsx)("p",{children:"In terms of performance and reliability, the system underwent rigorous testing procedures including unit, integration, and user acceptance testing. The hosting infrastructure was configured to support scalability, with the possibility of migrating to cloud services if the user base grows significantly in the future."}),(0,Lr.jsx)("p",{children:"Throughout the project lifecycle, emphasis was placed on clean code practices, version control with Git, and continuous integration. This approach not only improved development efficiency but also ensured that all changes were traceable and reversible, reducing the risk of major bugs."}),(0,Lr.jsx)("p",{children:"In conclusion, the project has resulted in the successful delivery of a well-structured and practical web solution. Beyond meeting technical requirements, the site has also been well-received in terms of design and usability. With its modular architecture and clear documentation, the system is ready for future enhancements, such as the addition of AI-based recommendation systems, multi-language support, or third-party integrations. This project not only serves its intended purpose effectively but also lays a strong foundation for long-term sustainability and expansion."})]})]})]}),dc=n.p+"static/media/syllabus.e2e5c862802e5a3a1151.png",fc=()=>{const[e,t]=(0,r.useState)({}),n=[{week:1,title:"Introduction to the Course",content:["Course overview and objectives","Introduction to key concepts","Setting up the development environment","Assignment: Personal introduction and expectations"]},{week:2,title:"Fundamentals of Web Development",content:["HTML5 structure and semantics","CSS3 basics and responsive design","JavaScript fundamentals","Assignment: Create a simple personal webpage"]},...Array.from({length:12},((e,t)=>({week:t+3,title:`Week ${t+3} Content`,content:["Lecture 1: Topic overview","Lecture 2: Practical applications","Lab exercise: Hands-on implementation","Assignment: Project milestone"]})))];return(0,Lr.jsxs)("div",{className:"page syllabus-page",children:[(0,Lr.jsx)("div",{className:"syllabus-banner",children:(0,Lr.jsx)("img",{src:dc,alt:"IT-ISQS Syllabus",className:"banner-image"})}),(0,Lr.jsxs)("div",{className:"syllabus-content",children:[(0,Lr.jsx)("div",{className:"syllabus-header",children:(0,Lr.jsx)("h1",{className:"syllabus-heading",children:"SYLLABUS"})}),(0,Lr.jsx)("div",{className:"syllabus-text",children:(0,Lr.jsx)("p",{children:"The IT-ISQS course syllabus is designed to offer a comprehensive and innovative approach to teaching international software quality standards (ISQS). Developed through collaboration between academia and industry, the syllabus incorporates gamified learning, real-life case studies, interactive exercises, and AI-supported tools. It aims to equip students with practical skills and theoretical knowledge aligned with ISO/IEC standards, preparing them to meet the quality expectations of modern software engineering."})}),(0,Lr.jsx)("div",{className:"syllabus-weeks",children:n.map((n=>(0,Lr.jsxs)("div",{className:"syllabus-week",children:[(0,Lr.jsxs)("button",{className:"week-header "+(e[n.week]?"week-open":""),onClick:()=>{return e=n.week,void t((t=>({...t,[e]:!t[e]})));var e},children:[(0,Lr.jsxs)("span",{className:"week-title",children:["week ",n.week]}),(0,Lr.jsx)("span",{className:"week-arrow",children:e[n.week]?"\u25b2":"\u25bc"})]}),e[n.week]&&(0,Lr.jsxs)("div",{className:"week-content",children:[(0,Lr.jsx)("h3",{children:n.title}),(0,Lr.jsx)("ul",{children:n.content.map(((e,t)=>(0,Lr.jsx)("li",{children:e},t)))})]})]},n.week)))})]})]})},pc=n.p+"static/media/mailman.39ef55003cf327a91bcb.png",hc=za.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  background-color: ${e=>"success"===e.type?"#27ae60":"#e74c3c"};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`,mc=za.span`
  font-size: 1.2em;
`,gc=za.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`,xc=e=>{let{message:t,type:n="success",duration:o=3e3,onClose:i}=e;return(0,r.useEffect)((()=>{const e=setTimeout((()=>{i&&i()}),o);return()=>clearTimeout(e)}),[o,i]),(0,Lr.jsxs)(hc,{type:n,children:[(0,Lr.jsx)(mc,{children:"success"===n?"\u2713":"\u2715"}),(0,Lr.jsx)(gc,{children:t})]})},vc=za.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 2rem auto;
  min-height: 80vh;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`,yc=za.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`,bc=za.img`
  max-width: 100%;
  height: auto;
`,wc=za.div`
  flex: 1;
  background-color: #e1e5ee;
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,Sc=za.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #223A70;
  font-weight: bold;
`,kc=za.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`,jc=za.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`,Ec=za.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,Cc=za.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`,Ac=za.p`
  margin-top: 2.5rem;
  font-size: 0.95rem;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`,Pc=za.button`
  background-color: rgba(34, 58, 112, 0.1);
  border: none;
  color: #223A70;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: rgba(34, 58, 112, 0.2);
    color: #192C54;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(34, 58, 112, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,Nc=za.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.5s ease-in-out;

  ${Pc}:hover & {
    transform: rotate(180deg);
  }
`,zc=()=>{const[e,t]=(0,r.useState)(["","","","","",""]),[n,o]=(0,r.useState)(!1),[i,a]=(0,r.useState)(!1),[s,l]=(0,r.useState)(""),[c,u]=(0,r.useState)(""),[d,f]=(0,r.useState)(!1),p=(0,r.useRef)([]),h=te(),m=$();(0,r.useEffect)((()=>{m.state&&m.state.email?u(m.state.email):h("/login"),p.current[0]&&p.current[0].focus()}),[m,h]);const g=()=>e.every((e=>""!==e));return(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsxs)(vc,{children:[(0,Lr.jsx)(yc,{children:(0,Lr.jsx)(bc,{src:pc,alt:"Email verification"})}),(0,Lr.jsxs)(wc,{children:[(0,Lr.jsx)(Sc,{children:"We Send You an E-mail."}),(0,Lr.jsx)(kc,{children:"Please check your e-mail."}),(0,Lr.jsx)(jc,{children:[0,1,2,3,4,5].map((n=>(0,Lr.jsx)(Ec,{type:"text",maxLength:"1",value:e[n],onChange:r=>((n,r)=>{r.length>1&&(r=r[0]);const o=[...e];o[n]=r,t(o),""!==r&&n<5&&p.current[n+1].focus()})(n,r.target.value),onKeyDown:t=>((t,n)=>{"Backspace"===n.key&&""===e[t]&&t>0&&p.current[t-1].focus()})(n,t),ref:e=>p.current[n]=e},n)))}),(0,Lr.jsx)(Cc,{onClick:async()=>{if(g()&&!n&&!i){o(!0),l("");try{const t=e.join("");console.log("Verifying code:",t);const n=await(async e=>{try{return(await Nr.post("/users/verify",{code:e})).data}catch(s){throw console.error("Verify email service error:",s),s}})(t);console.log("Verification successful:",n),f(!0),setTimeout((()=>{f(!1),h("/login",{state:{verificationSuccess:!0}})}),2e3)}catch(t){console.error("Verification error:",t),t.message?l(t.message):l("string"===typeof t?t:"Invalid verification code. Please try again.")}finally{o(!1)}}},disabled:!g()||n||i,children:n?"Verifying...":"Done"}),s&&(0,Lr.jsx)("p",{style:{color:"red",marginTop:"1rem"},children:s}),(0,Lr.jsxs)(Ac,{children:["Didn't receive a code?",(0,Lr.jsxs)(Pc,{onClick:async()=>{if(c&&!i&&!n){a(!0),l("");try{const e=await(async e=>{try{return(await Nr.post("/users/resend-verification",{email:e})).data}catch(s){throw console.error("Resend code service error:",s),s}})(c);console.log("Resend code successful:",e),a(!1),alert("A new verification code has been sent to your email.")}catch(e){console.error("Resend code error:",e),e.message?l(e.message):l("string"===typeof e?e:"Failed to resend verification code. Please try again."),a(!1)}}},disabled:i||n,children:[(0,Lr.jsx)(Nc,{viewBox:"0 0 24 24",children:(0,Lr.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 9h7V2l-2.35 4.35z"})}),i?"Sending...":"Resend code"]})]})]})]}),d&&(0,Lr.jsx)(xc,{title:"Success!",message:"Your email has been verified successfully. Redirecting to login...",onClose:()=>f(!1)})]})},Rc=n.p+"static/media/contactus.8e3a2054c0e8989a83d9.png",Oc=za.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right, #e1e5ee 50%, white 50%);
  padding-bottom: 150px; /* Footer için alan */
`,Tc=za.div`
  width: 100%;
  padding: 0;
  margin: 0;
`,Lc=za.div`
  display: flex;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    background: #e1e5ee;
  }
`,Fc=za.div`
  width: 50%;
  padding: 6rem 4rem 4rem 8rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 2rem;
  }
`,Mc=za.div`
  width: 50%;
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Dc=za.img`
  max-width: 72%;
  height: auto;
  transform: translateY(-2rem);
`,_c=za.h1`
  font-size: 2.8rem;
  font-weight: bold;
  color: #223A70;
  margin-bottom: 1rem;
  text-transform: uppercase;
`,Ic=za.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 3.5rem;
  line-height: 1.5;
`,Uc=za.div`
  margin-top: -0.5rem;
`,Bc=za.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
  object-fit: contain;
`,Wc=za.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`,Hc=za.span`
  color: #333;
  font-size: 1.05rem;
`,qc=za.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.3rem 0 0.5rem 0;
`,Vc=za.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-top: -2rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 0 1rem;
  }
`,Kc=za.div`
  padding: 2.5rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 80%;
  max-width: 800px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`,Yc=za.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #223A70;
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: 600;
`,Gc=za.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Qc=za.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Jc=za.input`
  padding: 12px 15px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 1rem;
  flex: 1;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
  
  &::placeholder {
    color: #aaa;
  }
`,Xc=za.textarea`
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  min-height: 120px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
  
  &::placeholder {
    color: #aaa;
  }
`,Zc=za.button`
  padding: 10px 30px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin: 1.5rem auto 0;
  display: block;
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  &:disabled {
    background-color: #eee;
    cursor: not-allowed;
    transform: none;
  }
`,$c=()=>{const[e,t]=(0,r.useState)({name:"",surname:"",email:"",subject:"",message:""}),[n,o]=(0,r.useState)(!1);(0,r.useEffect)((()=>{window.scrollTo(0,0);const e=document.querySelector(".main-content");if(e)return e.classList.add("no-padding"),()=>{e.classList.remove("no-padding")}}),[]);const i=e=>{const{name:n,value:r}=e.target;t((e=>({...e,[n]:r})))};return(0,Lr.jsx)(Oc,{children:(0,Lr.jsxs)(Tc,{children:[(0,Lr.jsxs)(Lc,{children:[(0,Lr.jsxs)(Fc,{children:[(0,Lr.jsx)(_c,{children:"Contact Us"}),(0,Lr.jsx)(Ic,{children:"Contact us for request, suggestion, complaint and press relations."}),(0,Lr.jsxs)(Uc,{children:[(0,Lr.jsx)(Wc,{children:(0,Lr.jsxs)("div",{children:[(0,Lr.jsxs)(Hc,{children:[(0,Lr.jsx)(Bc,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAxCAYAAAAiCHJ/AAAB70lEQVR4Xr2Wa3XEIBBGPwmVgIRKiIRKQEIdbBy0DqiD1gESKgEJldDmy+tkmUkyZKH3nPtjwwyPgSUB7DwNvg5+DqbB343f83M/6KbwOnSDEfeDnRnw4CS40jfIjku84QIOsrRX5XZwISYc6g28yDNxOgGH+gMvRpwQIJNqyn+LiocMbuEzFBJkYAsjMjxkUEs7bOBpzAPO/MH1ar1jximNR0ZkM8dUuQQZuycnPsITmDfu+TGlqDiUVbBjEm+gvEEzMfgEh2lVea7m+LezztYz2AD3M8/VDAxOSoPm6fU48wKZq/nF4Pyh5npADDjIfM3IYMselQzOGyzP14wMTkqDpmOwgaKyWw9cz2ADATJXc7xorKeTpXdMOMBacsoKFd3rrJJjkgIHTpA5e45vN6c0HJkwTZjJDtNNdYPt4G77WOGPPKClARt6JaCl434vdEpAKxMUImRgCwMU+JbJA1vooMAXR8mJvWLEAT1kQk09Dmi5+gQDPWRiDT0MtFh9QgE9ZAeP6FFAzdXzA7UYD9nRFR0uEiE7K3H8YLhKycdBbsIDq16wfunkelSAh4+ryDs/MoyZleggB9gzoUK5c6zl93N8VSzlD2t0A45OPyfm1shG7H10dJuYpkTcD9zftTZmu/+cyL/D/f+XfW7CH5rrgoM1BZhQAAAAAElFTkSuQmCC",alt:"Location"})," Location"]}),(0,Lr.jsx)(qc,{}),(0,Lr.jsx)(Hc,{children:"Yukariyurtcu Mahallesi Mimar Sinan Caddesi No:4, 06815, Etimesgut/ANKARA"})]})}),(0,Lr.jsx)(Wc,{children:(0,Lr.jsxs)("div",{children:[(0,Lr.jsxs)(Hc,{children:[(0,Lr.jsx)(Bc,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAYAAAAXb/p7AAABxklEQVR4Xs2YbXnCMBSFj4RJiIRJiIRJqIPNAXGwOQAHm4NKmIRImIStJwVWcpO0KeWm7/O8f+i95FCaDwAAM/g9+DujH3xGA5aEu/hz7lElDjGnCV2KxAHmNKFLEQ8ZoqQJXYrUBrShS5GaSUK70KXICTJEyY/QpQgHjEOU/Brb9OggQ5RUXwstZIg52aPGE2SAOd9CpyK1M/llbNOjZqLww6jDOxIHSekxPhLqcFDOzjhQHM6c65vQQ4baTTjSQQajvLPmWtWQ3Nfc5BSdIzWb7bSgNbxbccD+pmIHMFAcspsWtMZCBuSz2WT9y/EJGfL9pqIxBukZbf9L2uMgA3rsZE28kDrl9DcVjUktO3RXzyMPp3FAepgWLYQrgcUDdqcTZMDakAw3fWT84BHjUe/uwPGbrwmZ65/K0JS1r2Pbcgzy/0Jw3eT1HEfIniVaVGKQD8nXeT3mAFm7VIcVGORD0sO18r5w1GElBuWQvHZMvF6rwx1w4qTOj1vqsAEO8o230mEjDMpf+VodNoa7joccaK0OD8Agv/PU6vBADMYBPOTAS3VQgvvtCelDcEk+MupYjHemRzmwR3pnUudyBKPdxPAj7Q9P0w3M6/50vAAAAABJRU5ErkJggg==",alt:"Phone"})," Phone"]}),(0,Lr.jsx)(qc,{}),(0,Lr.jsx)(Hc,{children:"+90 312 233 10 00"})]})}),(0,Lr.jsx)(Wc,{children:(0,Lr.jsxs)("div",{children:[(0,Lr.jsxs)(Hc,{children:[(0,Lr.jsx)(Bc,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAvCAYAAACYECivAAADS0lEQVR4Xs2ZAZWcMBCGfwmVMBIqIRLOQeOgdQAOWgfg4M4BEioBCZXQ8l+azUyAkCzc3n7vzVuYmSR/hoRwLXAdXxZzi/nFemW8p1/wBHxdrFvs92J/K2xebECYwENxi01YC2qxGaH6H4qgLJSVHmCXBO/Z5s9GfhQu+AC+YXtQinEIa/gIt9iIIDLvp7tlXQA7ywcYcH9lBKH6eQE4+ZqJF6Ew3emM6zaNLPYK2z+X1d2iO9jORpzorECPC0TnYn/Z8OX8gB1vsOEygseKjfSw43ISVcxIjXj9SFicODY3pZjoBt/R2OBiuHb1yTnZsEVgq1v9SC7GwS4N3m/icX4pOKQPIE6Y9zmCEOfvHiMqqqyr623okA7rgyAa/QOSwDhOqSgC28fqNedwX3UFbV9r/MLTvhITUl5vQ/ZE43UNgvV3Qaxmj7Dj83huJTxS3mRDtkrOhnbRYiiUa3b16BAG3hNegn3pZXbrmxe1nUQ8bBs+6hKCbdFHTEi5L9HplJMJNejBa19/Du2C9UHSRycHjM4hOgtwpjGfwltgQVoEe2xo65WT10foWfO6BYc2wQ4pl5N9Z1ROH50F2DDm39ZVJa37RZBy5+gcldNHZwEt2NlQFZ8quLXC5LRgvSZrdvyItnwNX3+nBeu3RM0m0vlTFjuihxXMNV1CT5CH2zteOd+is0C+cZyJ7sN2rFJLW4+N4ohy8iisgY1jm9o/Gn/CijUidpiRcr0O6DNbdGAHgW1D0fRtwclsiY3WpVQD/TpPdPBVBWo3kl7LtBnpH/sEYf0xh36dx31C0z7djr9TFu+Rce9G6mE7PrKRjbD+261kY2hiYQf6ETsTLeOwrmJu8fNTwzFHrHO18UnsMiIlTjZUxQtCH6zc/N+41Ci0tCkdbDv+Uij9RRzs7Hj/9LCyZ6r8cAR2LfN19PTkryuuzadHLw1WnO/Up4a7mjtWi/6oSgvCscvfUwjW79dOJ1wAixD3DF9npxGsRfOe/jPwCQ5Y93sJgu1jlAO6W1YdDuHNo99EUezl+6THWnQcjOI90gdMNIqgnyK3Jk3jqVY6CU8hOD7/a21C+xO6G8H+fxKWjEuB3xcOn4hDOGwohFXjJLTRHz9mTj36f4t/MonEqBXXAAAAAElFTkSuQmCC",alt:"Email"})," E-mail"]}),(0,Lr.jsx)(qc,{}),(0,Lr.jsx)(Hc,{children:"it.isqs.cankaya@gmail.com"})]})})]})]}),(0,Lr.jsx)(Mc,{children:(0,Lr.jsx)(Dc,{src:Rc,alt:"Contact support"})})]}),(0,Lr.jsx)(Vc,{children:(0,Lr.jsxs)(Kc,{children:[(0,Lr.jsx)(Yc,{children:"Send a Message"}),(0,Lr.jsxs)("form",{onSubmit:async n=>{n.preventDefault(),o(!0);try{await Ar.post("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/contact",e);t({name:"",surname:"",email:"",subject:"",message:""}),alert("Your message has been sent successfully!")}catch(a){var r,i;console.error("Error submitting contact form:",a);const e=(null===(r=a.response)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.message)||"Failed to send message. Please try again later.";alert(`Error: ${e}`)}finally{o(!1)}},children:[(0,Lr.jsxs)(Gc,{children:[(0,Lr.jsxs)(Qc,{children:[(0,Lr.jsx)(Jc,{type:"text",name:"name",placeholder:"Name*",value:e.name,onChange:i,required:!0}),(0,Lr.jsx)(Jc,{type:"text",name:"surname",placeholder:"Surname*",value:e.surname,onChange:i,required:!0}),(0,Lr.jsx)(Jc,{type:"email",name:"email",placeholder:"E-mail*",value:e.email,onChange:i,required:!0})]}),(0,Lr.jsxs)(Qc,{children:[(0,Lr.jsx)(Jc,{type:"text",name:"subject",placeholder:"Subject*",value:e.subject,onChange:i,required:!0}),(0,Lr.jsx)(Xc,{name:"message",placeholder:"Description*",value:e.message,onChange:i,required:!0})]})]}),(0,Lr.jsx)(Zc,{type:"submit",disabled:n,children:n?"Sending...":"Send"})]})]})})]})})},eu=n.p+"static/media/useremail.440bbf627afe460575b9.png",tu=za.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 70vh;
  justify-content: space-between;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`,nu=za.div`
  flex: 1;
  display: flex;
  margin-left: -0.5rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`,ru=za.img`
  max-width: 100%;
  height: auto;
`,ou=za.div`
  flex: 1;
  background-color: #e1e5ee;
  border-radius: 16px;
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,iu=za.h1`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  color: #223A70;
  font-weight: bold;
`,au=za.p`
  font-size: 1rem;
  margin-top: 0.3rem;
  color: #666;
`,su=za.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  position: relative;
`,lu=za.input`
  width: 100%;
  padding: 12px 15px 12px 22px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,cu=(za.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`,za.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`),uu=za.p`
  color: #e74c3c;
  margin-top: 1rem;
  font-size: 0.9rem;
`,du=za.p`
  color: #27ae60;
  margin-top: 1rem;
  font-size: 0.9rem;
`,fu=()=>{const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(!1),[i,a]=(0,r.useState)(""),[s,l]=(0,r.useState)(""),c=te();(0,r.useEffect)((()=>{window.scrollTo(0,0)}),[]);return(0,Lr.jsxs)(tu,{children:[(0,Lr.jsx)(nu,{children:(0,Lr.jsx)(ru,{src:eu,alt:"Email verification illustration"})}),(0,Lr.jsxs)(ou,{children:[(0,Lr.jsx)(iu,{children:"Please Enter Your E-mail Address"}),(0,Lr.jsx)(au,{children:"We will send you an email with a verification code to reset your password."}),(0,Lr.jsxs)("form",{onSubmit:async t=>{t.preventDefault(),o(!0),a(""),l("");try{const t=await(async e=>{try{return(await Nr.post("/users/forgot-password",{email:e})).data}catch(i){throw i.response?i.response.data:i.message}})(e);console.log("Reset password requested for:",e),console.log("Response:",t),l("Verification code has been sent to your email."),setTimeout((()=>{c("/reset-password",{state:{email:e,isPasswordReset:!0}})}),2e3)}catch(n){console.error("Error requesting password reset:",n),n?"string"===typeof n?a(n):n.message?a(n.message):a("Unable to process your request. Please try again later."):a("Unable to process your request. Please try again later.")}finally{o(!1)}},style:{width:"100%"},children:[(0,Lr.jsx)(su,{children:(0,Lr.jsx)(lu,{type:"email",placeholder:"e-mail address",value:e,onChange:e=>{t(e.target.value)},required:!0})}),(0,Lr.jsx)(cu,{type:"submit",disabled:n,children:n?"Processing...":"Send Verification Code"})]}),i&&(0,Lr.jsx)(uu,{children:i}),s&&(0,Lr.jsx)(du,{children:s})]})]})},pu=n.p+"static/media/newpassword.ea489dfb2a73256066fc.png",hu=za.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 2rem auto;
  min-height: 80vh;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`,mu=za.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`,gu=za.img`
  max-width: 90%;
  height: auto;
`,xu=za.div`
  flex: 1;
  background-color: #e1e5ee;
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,vu=za.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #223A70;
  font-weight: bold;
`,yu=za.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`,bu=za.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`,wu=za.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`,Su=za.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`,ku=za.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`,ju=za.p`
  color: #e74c3c;
  margin-top: 1rem;
  font-size: 0.9rem;
`,Eu=za.p`
  color: #27ae60;
  margin-top: 1rem;
  font-size: 0.9rem;
`,Cu=za.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`,Au=za.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,Pu=za.p`
  margin-top: 2.5rem;
  font-size: 0.95rem;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`,Nu=za.button`
  background-color: rgba(34, 58, 112, 0.1);
  border: none;
  color: #223A70;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: rgba(34, 58, 112, 0.2);
    color: #192C54;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(34, 58, 112, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,zu=za.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.5s ease-in-out;

  ${Nu}:hover & {
    transform: rotate(180deg);
  }
`,Ru=(za.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  text-align: left;
  padding-left: 1rem;
`,za.li`
  margin-bottom: 0.3rem;
  color: ${e=>e.fulfilled?"#27ae60":"#666"};
`,()=>{const[e,t]=(0,r.useState)(1),[n,o]=(0,r.useState)(["","","","","",""]),[i,a]=(0,r.useState)(""),[s,l]=(0,r.useState)(""),[c,u]=(0,r.useState)(!1),[d,f]=(0,r.useState)(!1),[p,h]=(0,r.useState)(""),[m,g]=(0,r.useState)(""),[x,v]=(0,r.useState)(""),[y,b]=(0,r.useState)(""),[w,S]=(0,r.useState)(!1),k=(0,r.useRef)([]),j=te(),E=$(),C=/[A-Z]/.test(i),A=/[a-z]/.test(i),P=/\d/.test(i),N=i.length>=8,z=i===s&&""!==i;(0,r.useEffect)((()=>{E.state&&E.state.email?(v(E.state.email),k.current[0]&&k.current[0].focus()):j("/forgot-password")}),[E,j]);const R=()=>n.every((e=>""!==e));return(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsxs)(hu,{children:[(0,Lr.jsx)(mu,{children:(0,Lr.jsx)(gu,{src:pu,alt:"Create new password illustration"})}),(0,Lr.jsx)(xu,{children:1===e?(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(vu,{children:"Verify Your Code"}),(0,Lr.jsxs)(yu,{children:["Enter the verification code sent to ",x]}),(0,Lr.jsx)(Cu,{children:[0,1,2,3,4,5].map((e=>(0,Lr.jsx)(Au,{type:"text",maxLength:"1",value:n[e],onChange:t=>((e,t)=>{t.length>1&&(t=t[0]);const r=[...n];r[e]=t,o(r),""!==t&&e<5&&k.current[e+1].focus()})(e,t.target.value),onKeyDown:t=>((e,t)=>{"Backspace"===t.key&&""===n[e]&&e>0&&k.current[e-1].focus()})(e,t),ref:t=>k.current[e]=t},e)))}),(0,Lr.jsx)(ku,{onClick:async()=>{if(R()&&!c&&!d){u(!0),h("");try{const e=n.join("");console.log("Verifying reset code:",e);const r=await(async e=>{try{return(await Nr.post("/users/verify-reset-code",{code:e})).data}catch(p){throw p.response?p.response.data:p.message}})(e);console.log("Code verification successful:",r),b(e),g("Verification successful! You can now reset your password."),setTimeout((()=>{g(""),t(2)}),1500)}catch(e){console.error("Code verification error:",e),e.message?h(e.message):h("string"===typeof e?e:"Invalid verification code. Please try again.")}finally{u(!1)}}},disabled:!R()||c||d,children:c?"Verifying...":"Done"}),p&&(0,Lr.jsx)("p",{style:{color:"red",marginTop:"1rem"},children:p}),m&&(0,Lr.jsx)(Eu,{children:m}),(0,Lr.jsxs)(Pu,{children:["Didn't receive a code?",(0,Lr.jsxs)(Nu,{onClick:async()=>{if(x&&!d&&!c){f(!0),h("");try{const e=await(async e=>{try{return(await Nr.post("/users/resend-reset-code",{email:e})).data}catch(p){throw p.response?p.response.data:p.message}})(x);console.log("Resend code successful:",e),f(!1),alert("A new verification code has been sent to your email.")}catch(e){console.error("Resend code error:",e),e.message?h(e.message):h("string"===typeof e?e:"Failed to resend verification code. Please try again."),f(!1)}}},disabled:d||c,children:[(0,Lr.jsx)(zu,{viewBox:"0 0 24 24",children:(0,Lr.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 9h7V2l-2.35 4.35z"})}),d?"Sending...":"Resend code"]})]})]}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(vu,{children:"Create a new password"}),(0,Lr.jsx)(yu,{children:"Enter your new password"}),(0,Lr.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),u(!0),h(""),g(""),!z)return h("Passwords do not match"),void u(!1);if(!N||!C||!A||!P)return h("Password does not meet the requirements"),void u(!1);try{const e=await(async(e,t)=>{try{return(await Nr.post("/users/reset-password",{code:e,newPassword:t})).data}catch(p){throw p.response?p.response.data:p.message}})(y,i);console.log("Password reset successful:",e),S(!0),setTimeout((()=>{S(!1),j("/login",{state:{passwordReset:!0}})}),2e3)}catch(t){console.error("Error resetting password:",t),t?"string"===typeof t?h(t):t.message?h(t.message):h("Unable to reset your password. Please try again later."):h("Unable to reset your password. Please try again later.")}finally{u(!1)}},style:{width:"100%"},children:[(0,Lr.jsx)(bu,{children:(0,Lr.jsx)(wu,{type:"password",placeholder:"New password",value:i,onChange:e=>{a(e.target.value)},required:!0})}),(0,Lr.jsx)(bu,{children:(0,Lr.jsx)(wu,{type:"password",placeholder:"Confirm new password",value:s,onChange:e=>{l(e.target.value)},required:!0})}),(0,Lr.jsx)(Su,{type:"submit",disabled:c||!N||!C||!A||!P||!z,children:c?"Processing...":"Reset Password"})]}),p&&(0,Lr.jsx)(ju,{children:p}),m&&(0,Lr.jsx)(Eu,{children:m})]})})]}),w&&(0,Lr.jsx)(xc,{title:"Success!",message:"Your password has been reset successfully. Redirecting to login...",onClose:()=>S(!1)})]})});function Ou(e){return Ve({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"},child:[]}]})(e)}function Tu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"},child:[]}]})(e)}function Lu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"},child:[]}]})(e)}function Fu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(e)}function Mu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(e)}function Du(e){return Ve({tag:"svg",attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"},child:[]}]})(e)}function _u(e){return Ve({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"},child:[]}]})(e)}function Iu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]})(e)}function Uu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 352 512"},child:[{tag:"path",attr:{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},child:[]}]})(e)}function Bu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"},child:[]}]})(e)}function Wu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"},child:[]}]})(e)}function Hu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"},child:[]}]})(e)}function qu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z"},child:[]}]})(e)}function Vu(e){return Ve({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(e)}const Ku=n.p+"static/media/defaultpp.7fe14f0accd9979e3303.jpg";const Yu=function(e){let{userId:t,currentPicture:n,onPictureUpdated:o}=e;const[i,a]=(0,r.useState)(!1),[s,l]=(0,r.useState)(""),[c,u]=(0,r.useState)(!1),d=(0,r.useRef)(null),f=(0,r.useRef)(null);function p(){if(console.log("handleImageClick triggered"),console.log("fileInputRef.current:",d.current),f.current){const e=f.current.style.border;f.current.style.border="3px solid #223A70",console.log("Image border changed"),setTimeout((()=>{f.current&&(f.current.style.border=e),console.log("Image border reverted")}),300)}d.current?(d.current.click(),console.log("fileInputRef.current.click() called")):console.error("fileInputRef.current is null or undefined")}return(0,Lr.jsxs)("div",{style:{textAlign:"center"},children:[(0,Lr.jsx)("p",{style:{marginBottom:"15px",color:"#666",fontSize:"14px"},children:"Click on the image or the button to select a new profile picture"}),(0,Lr.jsx)("div",{style:{textAlign:"center",marginBottom:"20px"},children:(0,Lr.jsx)("img",{ref:f,src:n||Ku,alt:"Profile Picture",onClick:p,style:{width:"180px",height:"180px",borderRadius:"50%",objectFit:"cover",border:"3px solid #ccc",cursor:"pointer",boxShadow:"0 4px 8px rgba(0,0,0,0.1)",transition:"transform 0.2s, box-shadow 0.2s, border-color 0.1s ease-in-out",margin:"0 auto",display:"block"},onMouseOver:e=>{e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 12px rgba(0,0,0,0.2)"},onMouseOut:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 8px rgba(0,0,0,0.1)"}})}),(0,Lr.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"15px"},children:[n&&(0,Lr.jsxs)("button",{onClick:async function(){if(window.confirm("Are you sure you want to remove your profile picture?")){a(!0),l(""),u(!1);try{const e=await Nr.post(`/users/${t}/remove-profile-picture`);console.log("Profile picture removed:",e.data),o&&o(null),u(!0)}catch(s){console.error("Remove picture error:",s);let t="An error occurred while removing the profile picture";s.response&&s.response.data?t=s.response.data.message||t:s.message?t=s.message:"string"===typeof s&&(t=s),l(t)}finally{a(!1)}}},style:{padding:"8px 20px",backgroundColor:"#c62828",color:"white",border:"none",borderRadius:"20px",cursor:"pointer",fontSize:"14px",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"background-color 0.2s"},onMouseOver:e=>{e.currentTarget.style.backgroundColor="#b71c1c"},onMouseOut:e=>{e.currentTarget.style.backgroundColor="#c62828"},children:[(0,Lr.jsx)(Bu,{})," Remove Image"]}),(0,Lr.jsxs)("button",{onClick:p,style:{padding:"8px 20px",backgroundColor:"#223A70",color:"white",border:"none",borderRadius:"20px",cursor:"pointer",fontSize:"14px",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"background-color 0.2s"},onMouseOver:e=>{e.currentTarget.style.backgroundColor="#192C54"},onMouseOut:e=>{e.currentTarget.style.backgroundColor="#223A70"},children:[(0,Lr.jsx)(Hu,{})," Select New Image"]})]}),(0,Lr.jsxs)("div",{style:{textAlign:"left",fontSize:"13px",color:"#666",backgroundColor:"#f8f9fa",padding:"12px",borderRadius:"8px",marginBottom:"15px",maxWidth:"400px",margin:"0 auto 15px"},children:[(0,Lr.jsx)("p",{style:{fontWeight:"bold",marginBottom:"8px",color:"#444"},children:"Image Requirements:"}),(0,Lr.jsxs)("ul",{style:{paddingLeft:"20px",margin:0},children:[(0,Lr.jsx)("li",{children:"File format: JPEG, PNG, GIF, or WEBP"}),(0,Lr.jsx)("li",{children:"Maximum file size: 5MB"}),(0,Lr.jsx)("li",{children:"Recommended resolution: 400x400 pixels"}),(0,Lr.jsx)("li",{children:"Square images work best"})]})]}),(0,Lr.jsx)("input",{ref:d,type:"file",accept:"image/jpeg, image/png, image/gif, image/webp",onChange:async function(e){const n=e.target.files[0];if(!n)return;if(console.log("File selected:",n.name),n.size>5242880)return void l("Image size exceeds 5MB limit. Please choose a smaller file.");if(!["image/jpeg","image/png","image/gif","image/webp"].includes(n.type))return void l("Invalid file type. Please use JPEG, PNG, GIF or WEBP formats.");a(!0),l(""),u(!1);const r=new FormData;r.append("file",n);try{const e=await Nr.post(`/users/${t}/profile-picture`,r,{headers:{"Content-Type":"multipart/form-data"}});console.log("Profile picture uploaded:",e.data),o&&o(e.data.pictureUrl),u(!0)}catch(s){console.error("Upload error:",s);let t="An error occurred while uploading the image";s.response&&s.response.data?t=s.response.data.message||t:s.message?t=s.message:"string"===typeof s&&(t=s),l(t)}finally{a(!1)}},style:{display:"none"}}),i&&(0,Lr.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#666",fontSize:"14px",marginTop:"10px"},children:[(0,Lr.jsx)(Iu,{style:{animation:"spin 1s linear infinite"}})," ",n?"Processing...":"Uploading..."]}),s&&(0,Lr.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#d32f2f",fontSize:"14px",marginTop:"10px",padding:"8px",backgroundColor:"#ffebee",borderRadius:"4px"},children:[(0,Lr.jsx)(Mu,{})," ",s]}),c&&(0,Lr.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",color:"#2e7d32",fontSize:"14px",marginTop:"10px",padding:"8px",backgroundColor:"#e8f5e9",borderRadius:"4px"},children:[(0,Lr.jsx)(Tu,{})," ",n?"Profile picture successfully removed!":"Profile picture successfully updated!"]}),(0,Lr.jsx)("style",{dangerouslySetInnerHTML:{__html:"\n        @keyframes spin {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n      "}})]})},Gu=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 100px;
  min-height: 80vh;
  background-color: #FFF;
  position: relative;
  display: flex;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: center;
  }
`,Qu=za.div`
  width: 250px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 30px;
  }
`,Ju=za.div`
  flex: 1;
  padding-left: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 470px;
    width: 1px;
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    
    &::before {
      display: none;
    }
  }
`,Xu=za.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
  }
`,Zu=za.button`
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #192C54;
  }
`,$u=za.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 1px 0;
  text-align: center;
  color: #223A70;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`,ed=za.div`
  display: flex;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 15px;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`,td=za.button`
  padding: 10px 15px;
  margin-right: 20px;
  border: none;
  background: transparent;
  color: ${e=>"true"===e.active?"#0056b3":"#333"};
  font-size: 16px;
  font-weight: ${e=>"true"===e.active?"700":"600"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  position: relative;
  opacity: ${e=>e.disabled?.5:1};
  transition: color 0.3s, background-color 0.3s;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
    margin-right: 10px;
  }
`,nd=za.div`
  padding: 20px 0;
`,rd=za.div`
  background-color: #fff;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`,od=za.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  padding: 10px 0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 15px 0;
  }
`,id=za.div`
  width: 150px;
  font-weight: 500;
  color: #666;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #223A70;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5px;
  }
`,ad=za.div`
  flex: 1;
  color: #333;
  font-weight: ${e=>e.bold?"bold":"normal"};
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 15px;
  }
`,sd=za.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #192C54;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    top: auto;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`,ld=za.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`,cd=za.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`,ud=za.label`
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
  display: none;
`,dd=za.input`
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f1f1f1;
  
  &:focus {
    outline: none;
    background-color: #e9e9e9;
  }
  
  &::placeholder {
    color: #666;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 12px;
  }
`,fd=za.button`
  padding: 12px 25px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    font-size: 15px;
    padding: 10px 20px;
  }
`,pd=za.div`
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: ${e=>e.error?"#ffebee":"#e8f5e9"};
  color: ${e=>e.error?"#c62828":"#2e7d32"};
  border-left: 5px solid ${e=>e.error?"#c62828":"#2e7d32"};
`,hd=za.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
  
  &:hover {
    border-color: #223A70;
    background-color: #f8f9fa;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 15px;
  }
`,md=za.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23223A70%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 15px;
  }
`,gd=za.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    background: white;
    padding: 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    justify-content: center;
  }
`,xd=za.button`
  padding: 8px 15px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: #e1e1e1;
  }
`,vd=za.button`
  padding: 8px 15px;
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: #192C54;
  }
`,yd=za.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 40px;
`,bd=za.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #223A70;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,wd=(za.div`
  font-size: 16px;
  color: #667085;
  margin-top: 16px;
`,za.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`),Sd=za.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 480px;
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
    margin: 10px;
  }
`,kd=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f1f1;
`,jd=za.h2`
  margin: 0;
  color: #223A70;
  font-size: 1.5rem;
  font-weight: 600;
`,Ed=za.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #666;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f1f1;
    color: #333;
  }
  
  &:focus {
    outline: none;
  }
`,Cd=()=>{const e=te(),[t,n]=(0,r.useState)("about"),[o,i]=(0,r.useState)(null),[a,s]=(0,r.useState)(!0),[l,c]=(0,r.useState)({text:"",error:!1}),[u,d]=(0,r.useState)(!1),[f,p]=(0,r.useState)(!1),[h,m]=(0,r.useState)({firstName:"",lastName:"",email:"",institution:"",country:"",role:"",age:"",gender:""}),[g,x]=(0,r.useState)({oldPassword:"",newPassword:"",confirmPassword:""}),[v,y]=(0,r.useState)({userID:0,firstName:"",lastName:"",email:"",role:"",institution:"",country:"",age:0,gender:"",picture:""});(0,r.useEffect)((()=>{(async()=>{try{const u=Tr();if(!u)return void e("/login");try{const e=u.userID||u.id;if(console.log("Current user from localStorage:",u),console.log("Extracted user ID:",e),e)try{const n=await Rr(e);if(console.log("API response - user profile data:",n),n){var t;const r={...u,...n,id:e};return console.log("Final user data after merging:",r),i(r),m({firstName:r.firstName||"",lastName:r.lastName||"",email:r.email||"",institution:r.institution||"",country:r.country||"",role:r.role||"",age:(null===(t=r.age)||void 0===t?void 0:t.toString())||"",gender:r.gender||""}),localStorage.setItem("user",JSON.stringify(r)),y({userID:r.userID,firstName:r.firstName,lastName:r.lastName,email:r.email,institution:r.institution||"",country:r.country||"",role:r.role||"",age:r.age||0,gender:r.gender||"",picture:r.picture||""}),void s(!1)}}catch(o){console.error("Error fetching user profile by ID:",o)}if(u.email)try{const e=await Or(u.email);if(console.log("API response - user by email:",e),e){var n;const t={...u,...e,id:e.userID,userID:e.userID};return console.log("Final user data after merging with email data:",t),i(t),m({firstName:t.firstName||"",lastName:t.lastName||"",email:t.email||"",institution:t.institution||"",country:t.country||"",role:t.role||"",age:(null===(n=t.age)||void 0===n?void 0:n.toString())||"",gender:t.gender||""}),localStorage.setItem("user",JSON.stringify(t)),y({userID:t.userID,firstName:t.firstName,lastName:t.lastName,email:t.email,institution:t.institution||"",country:t.country||"",role:t.role||"",age:t.age||0,gender:t.gender||"",picture:t.picture||""}),void s(!1)}}catch(a){console.error("Error fetching user profile by email:",a),c({text:"Profil bilgileri y\xfcklenemedi. L\xfctfen \xe7\u0131k\u0131\u015f yap\u0131p tekrar giri\u015f yap\u0131n.",error:!0})}}catch(l){console.error("Error fetching user profile from API:",l),c({text:"Profil bilgileri y\xfcklenemedi. L\xfctfen \xe7\u0131k\u0131\u015f yap\u0131p tekrar giri\u015f yap\u0131n.",error:!0})}var r;if(u)i(u),m({firstName:u.firstName||"",lastName:u.lastName||"",email:u.email||"",institution:u.institution||"",country:u.country||"",role:u.role||"",age:(null===(r=u.age)||void 0===r?void 0:r.toString())||"",gender:u.gender||""});else c({text:"Oturum bilgileriniz bulunamad\u0131. L\xfctfen tekrar giri\u015f yap\u0131n.",error:!0}),setTimeout((()=>e("/login")),2e3)}catch(l){console.error("Error in profile component:",l),c({text:"Bir hata olu\u015ftu. L\xfctfen \xe7\u0131k\u0131\u015f yap\u0131p tekrar giri\u015f yap\u0131n.",error:!0})}finally{s(!1)}})()}),[e]);const b=e=>{const{name:t,value:n}=e.target;if("age"===t){const e=""===n.trim()?"":n;m((n=>({...n,[t]:e})))}else m((e=>({...e,[t]:n})))},w=e=>{const{name:t,value:n}=e.target;x((e=>({...e,[t]:n})))};if(a)return(0,Lr.jsx)(yd,{children:(0,Lr.jsx)(bd,{})});const S=()=>{var e;u&&m({firstName:o.firstName||"",lastName:o.lastName||"",email:o.email||"",institution:o.institution||"",country:o.country||"",role:o.role||"",age:(null===(e=o.age)||void 0===e?void 0:e.toString())||"",gender:o.gender||""});d(!u)},k=["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","England","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"],j=e=>{if(!e)return"";switch(e){case"STUDENT":return"Student";case"ACADEMIC":return"Academic";case"INDUSTRY_PROFESSIONAL":return"Industry Professional";case"OTHER":return"Other";default:return e===e.toUpperCase()?e.charAt(0)+e.slice(1).toLowerCase().replace(/_/g," "):e}},E=e=>{if(!e)return"";switch(e){case"MALE":return"Male";case"FEMALE":return"Female";case"OTHER":return"Other";default:return e===e.toUpperCase()?e.charAt(0)+e.slice(1).toLowerCase():e}};return(0,Lr.jsxs)(Gu,{children:[(0,Lr.jsxs)(Qu,{children:[(0,Lr.jsx)(Xu,{children:(0,Lr.jsx)("img",{src:v.picture||Ku,alt:`${v.firstName}'s avatar`})}),u&&(0,Lr.jsxs)(Zu,{onClick:()=>p(!0),children:[(0,Lr.jsx)(Lu,{})," Change Profile Picture"]}),(0,Lr.jsx)($u,{children:`${v.firstName} ${v.lastName}`})]}),(0,Lr.jsxs)(Ju,{children:[(0,Lr.jsxs)(ed,{children:[(0,Lr.jsx)(td,{active:"about"===t?"true":"false",onClick:()=>n("about"),children:"About"}),(0,Lr.jsx)(td,{active:"password"===t?"true":"false",onClick:()=>n("password"),children:"Change Password"})]}),l.text&&(0,Lr.jsx)(pd,{error:l.error,children:l.text}),(0,Lr.jsxs)(nd,{children:["about"===t&&(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsxs)(rd,{children:[(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(Fu,{})," E-mail:"]}),(0,Lr.jsx)(ad,{children:(null===o||void 0===o?void 0:o.email)||(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]}),(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(Wu,{})," Institution:"]}),u?(0,Lr.jsx)(hd,{type:"text",name:"institution",value:h.institution,onChange:b}):(0,Lr.jsx)(ad,{children:(null===o||void 0===o?void 0:o.institution)||(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]}),(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(Du,{})," Country:"]}),u?(0,Lr.jsxs)(md,{name:"country",value:h.country,onChange:b,children:[(0,Lr.jsx)("option",{value:"",children:"Select Country"}),k.map(((e,t)=>(0,Lr.jsx)("option",{value:e,children:e},t)))]}):(0,Lr.jsx)(ad,{children:null!==o&&void 0!==o&&o.country?"string"===typeof o.country?(e=>{if(!e)return"";const t=k.find((t=>t.toLowerCase()===e.toLowerCase()));return t||e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()})(o.country):o.country:(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]}),(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(qu,{})," Role:"]}),u?(0,Lr.jsxs)(md,{name:"role",value:h.role,onChange:b,children:[(0,Lr.jsx)("option",{value:"",children:"Select Role"}),["STUDENT","ACADEMIC","INDUSTRY_PROFESSIONAL","OTHER"].map(((e,t)=>(0,Lr.jsx)("option",{value:e,children:j(e)},t)))]}):(0,Lr.jsx)(ad,{children:null!==o&&void 0!==o&&o.role?"string"===typeof o.role?j(o.role):o.role:(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]}),(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(Ou,{})," Age:"]}),u?(0,Lr.jsx)(hd,{type:"number",name:"age",min:"1",max:"120",value:h.age,onChange:b}):(0,Lr.jsx)(ad,{children:null!==(null===o||void 0===o?void 0:o.age)&&void 0!==(null===o||void 0===o?void 0:o.age)?o.age:(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]}),(0,Lr.jsxs)(od,{children:[(0,Lr.jsxs)(id,{children:[(0,Lr.jsx)(Vu,{})," Gender:"]}),u?(0,Lr.jsxs)(md,{name:"gender",value:h.gender,onChange:b,children:[(0,Lr.jsx)("option",{value:"",children:"Select Gender"}),["MALE","FEMALE","OTHER"].map(((e,t)=>(0,Lr.jsx)("option",{value:e,children:E(e)},t)))]}):(0,Lr.jsx)(ad,{children:null!==o&&void 0!==o&&o.gender?"string"===typeof o.gender?E(o.gender):o.gender:(0,Lr.jsx)("span",{style:{color:"#999",fontStyle:"italic"},children:"Not specified"})})]})]}),u&&(0,Lr.jsxs)(gd,{children:[(0,Lr.jsxs)(xd,{onClick:S,children:[(0,Lr.jsx)(Uu,{})," Cancel"]}),(0,Lr.jsxs)(vd,{onClick:async()=>{s(!0),c({text:"",error:!1});try{var e;const n=o.userID||o.id;if(!n)throw new Error("User ID is missing. Please log in again.");const r={firstName:h.firstName,lastName:h.lastName,institution:h.institution,country:h.country,role:null===(e=h.role)||void 0===e?void 0:e.toUpperCase(),picture:o.picture};var t;if(h.age&&""!==h.age.trim()?r.age=parseInt(h.age):r.age=null,h.gender&&""!==h.gender.trim())r.gender=null===(t=h.gender)||void 0===t?void 0:t.toUpperCase();console.log("Current user data:",o),console.log("Sending profile update data with picture:",r),await(async(e,t)=>{try{const n=await Nr.put(`/users/${e}`,t),r=Tr();if(r){const e={...r,...t};localStorage.setItem("user",JSON.stringify(e))}return n.data}catch(n){throw console.error("Update profile service error:",n),n}})(n,r),i((e=>({...e,...r,role:h.role,gender:h.gender,picture:e.picture}))),y((e=>({...e,...r,role:h.role,gender:h.gender,picture:e.picture}))),c({text:"Profile updated successfully!",error:!1}),d(!1)}catch(n){console.error("Profile update error:",n),c({text:n.message||"Failed to update profile. Please try again.",error:!0})}finally{s(!1)}},children:[(0,Lr.jsx)(_u,{})," Save"]})]})]}),"password"===t&&(0,Lr.jsxs)(ld,{onSubmit:async e=>{if(e.preventDefault(),s(!0),c({text:"",error:!1}),g.newPassword!==g.confirmPassword)return c({text:"New passwords do not match!",error:!0}),void s(!1);if(g.newPassword.length<8)return c({text:"New password must be at least 8 characters long",error:!0}),void s(!1);if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(g.newPassword))return c({text:"Password must contain at least one uppercase letter, one lowercase letter, and one number",error:!0}),void s(!1);if(g.oldPassword===g.newPassword)return c({text:"New password cannot be the same as the current password",error:!0}),void s(!1);try{const e=o.userID||o.id;if(!e)throw new Error("User ID is missing. Please log in again.");console.log("Sending password update request for user ID:",e);const t=await(async(e,t)=>{try{console.log(`Sending password update request to: /users/${e}/password`);const n=await Nr.put(`/users/${e}/password`,t);return n.data?(console.log("Password update successful:",n.data),n.data):{message:"Password updated successfully"}}catch(n){if(console.error("Update password service error:",n),400===n.status||n.message&&n.message.toLowerCase().includes("password"))throw new Error("Old password is incorrect");throw n.message?n:new Error("Failed to update password")}})(e,{oldPassword:g.oldPassword,newPassword:g.newPassword});console.log("Password update response:",t),c({text:"Password updated successfully!",error:!1}),x({oldPassword:"",newPassword:"",confirmPassword:""})}catch(t){console.error("Password update error:",t),t.message&&t.message.includes("incorrect")?c({text:"Current password is incorrect",error:!0}):c({text:t.message||"Failed to update password. Please try again.",error:!0})}finally{s(!1)}},children:[(0,Lr.jsxs)(cd,{children:[(0,Lr.jsx)(ud,{htmlFor:"oldPassword",children:"Current Password"}),(0,Lr.jsx)(dd,{type:"password",id:"oldPassword",name:"oldPassword",value:g.oldPassword,onChange:w,required:!0,placeholder:"Current Password",minLength:"8",maxLength:"64"})]}),(0,Lr.jsxs)(cd,{children:[(0,Lr.jsx)(ud,{htmlFor:"newPassword",children:"New Password"}),(0,Lr.jsx)(dd,{type:"password",id:"newPassword",name:"newPassword",value:g.newPassword,onChange:w,required:!0,placeholder:"New Password",minLength:"8",maxLength:"64",title:"Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters",pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"})]}),(0,Lr.jsxs)(cd,{children:[(0,Lr.jsx)(ud,{htmlFor:"confirmPassword",children:"Confirm New Password"}),(0,Lr.jsx)(dd,{type:"password",id:"confirmPassword",name:"confirmPassword",value:g.confirmPassword,onChange:w,required:!0,placeholder:"Confirm New Password",minLength:"8",maxLength:"64"}),g.confirmPassword&&g.newPassword&&g.confirmPassword!==g.newPassword&&(0,Lr.jsx)("small",{style:{color:"#c62828",fontSize:"12px",marginTop:"5px"},children:"Passwords do not match"})]}),(0,Lr.jsx)(fd,{type:"submit",disabled:a||g.confirmPassword&&g.newPassword&&g.confirmPassword!==g.newPassword,children:a?"Processing...":"Change Password"})]})]})]}),(0,Lr.jsxs)(sd,{onClick:S,children:[(0,Lr.jsx)(Lu,{})," ",u?"Cancel Edit":"Edit Profile"]}),f&&(0,Lr.jsx)(wd,{children:(0,Lr.jsxs)(Sd,{children:[(0,Lr.jsxs)(kd,{children:[(0,Lr.jsx)(jd,{children:"Update Profile Picture"}),(0,Lr.jsx)(Ed,{onClick:()=>p(!1),children:(0,Lr.jsx)("span",{style:{fontSize:"24px",fontWeight:"bold"},children:"\xd7"})})]}),(0,Lr.jsx)(Yu,{userId:v.userID,currentPicture:v.picture,onPictureUpdated:e=>{console.log("handlePictureUpdate called with pictureUrl:",e),y((t=>{console.log("Previous userProfile:",t);const n={...t,picture:e};return console.log("Updated userProfile:",n),n})),i((t=>{console.log("Previous user state:",t);const n={...t,picture:e};return console.log("Updated user state:",n),n}));try{const t=JSON.parse(localStorage.getItem("user"));if(t){console.log("Updating localStorage user data with new picture URL");const n={...t,picture:e};localStorage.setItem("user",JSON.stringify(n))}}catch(t){console.error("Error updating user data in localStorage:",t)}c({text:"Profile picture successfully updated!",error:!1}),p(!1)}})]})})]})},Ad=()=>{try{return!!localStorage.getItem("adminToken")}catch(e){return console.error("Error checking admin authentication:",e),!1}},Pd=za.div`
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`,Nd=za.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
`,zd=za.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Rd=za.div`
  display: flex;
  flex-direction: column;
`,Od=za.label`
  font-weight: 600;
  margin-bottom: 8px;
`,Td=za.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`,Ld=za.button`
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`,Fd=za.div`
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
`,Md=()=>{const e=te(),[t,n]=(0,r.useState)({email:"",password:""}),[o,i]=(0,r.useState)(!1),[a,s]=(0,r.useState)("");(0,r.useEffect)((()=>{Ad()&&e("/admin/dashboard")}),[e]);const l=e=>{const{name:t,value:r}=e.target;n((e=>({...e,[t]:r})))};return(0,Lr.jsxs)(Pd,{children:[(0,Lr.jsx)(Nd,{children:"Admin Login"}),a&&(0,Lr.jsx)(Fd,{children:a}),(0,Lr.jsxs)(zd,{onSubmit:async n=>{n.preventDefault(),i(!0),s("");try{await(async e=>{try{const t=await Nr.post("/admins/login",e);return t.data&&t.data.token&&(localStorage.setItem("adminToken",t.data.token),localStorage.setItem("admin",JSON.stringify(t.data.user))),t.data}catch(a){throw console.error("Admin login service error:",a),a}})(t),e("/admin/dashboard")}catch(r){console.error("Login error:",r),s(r.message||"Login failed. Please check your credentials and try again.")}finally{i(!1)}},children:[(0,Lr.jsxs)(Rd,{children:[(0,Lr.jsx)(Od,{htmlFor:"email",children:"Email"}),(0,Lr.jsx)(Td,{type:"email",id:"email",name:"email",value:t.email,onChange:l,required:!0})]}),(0,Lr.jsxs)(Rd,{children:[(0,Lr.jsx)(Od,{htmlFor:"password",children:"Password"}),(0,Lr.jsx)(Td,{type:"password",id:"password",name:"password",value:t.password,onChange:l,required:!0})]}),(0,Lr.jsx)(Ld,{type:"submit",disabled:o,children:o?"Signing in...":"Sign In"})]})]})},Dd=Ar.create({baseURL:"http://localhost:8080/api/v1",timeout:1e4});Dd.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e}),(e=>Promise.reject(e))),Dd.interceptors.response.use((e=>e),(e=>{var t;return 401===(null===(t=e.response)||void 0===t?void 0:t.status)&&(localStorage.removeItem("token"),window.location.href="/admin/login"),Promise.reject(e)}));const _d=Dd,Id=za.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,Ud=za.div`
  background-color: white;
  border-radius: 8px;
  width: 95%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 24px;
`,Bd=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,Wd=za.h2`
  margin: 0;
  color: #223A70;
`,Hd=za.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #222;
  }
`,qd=za.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Vd=za.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Kd=za.label`
  font-weight: 600;
  color: #333;
`,Yd=za.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,Gd=za.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,Qd=za.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`,Jd=za.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`,Xd=za(Jd)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #e1e1e1;
  }
`,Zd=za(Jd)`
  background-color: #223A70;
  color: white;
  
  &:hover {
    background-color: #192C54;
  }
`,$d=e=>{let{user:t,onClose:n,onSave:o}=e;const[i,a]=(0,r.useState)({firstName:"",lastName:"",email:"",institution:"",country:"",role:""});(0,r.useEffect)((()=>{t&&a({firstName:t.firstName||"",lastName:t.lastName||"",email:t.email||"",institution:t.institution||"",country:t.country||"",role:t.role||""})}),[t]);const s=e=>{const{name:t,value:n}=e.target;a((e=>({...e,[t]:n})))};return(0,Lr.jsx)(Id,{onClick:n,children:(0,Lr.jsxs)(Ud,{onClick:e=>e.stopPropagation(),children:[(0,Lr.jsxs)(Bd,{children:[(0,Lr.jsx)(Wd,{children:"Edit User"}),(0,Lr.jsx)(Hd,{onClick:n,children:"\xd7"})]}),(0,Lr.jsxs)(qd,{onSubmit:e=>{e.preventDefault(),o(t.userID,i)},children:[(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"firstName",children:"First Name"}),(0,Lr.jsx)(Yd,{id:"firstName",name:"firstName",value:i.firstName,onChange:s})]}),(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"lastName",children:"Last Name"}),(0,Lr.jsx)(Yd,{id:"lastName",name:"lastName",value:i.lastName,onChange:s})]}),(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"email",children:"Email"}),(0,Lr.jsx)(Yd,{id:"email",name:"email",type:"email",value:i.email,onChange:s,disabled:!0})]}),(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"institution",children:"Institution"}),(0,Lr.jsx)(Yd,{id:"institution",name:"institution",value:i.institution,onChange:s})]}),(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"country",children:"Country"}),(0,Lr.jsx)(Yd,{id:"country",name:"country",value:i.country,onChange:s})]}),(0,Lr.jsxs)(Vd,{children:[(0,Lr.jsx)(Kd,{htmlFor:"role",children:"Role"}),(0,Lr.jsxs)(Gd,{id:"role",name:"role",value:i.role,onChange:s,children:[(0,Lr.jsx)("option",{value:"STUDENT",children:"Student"}),(0,Lr.jsx)("option",{value:"PROFESSOR",children:"Professor"}),(0,Lr.jsx)("option",{value:"ADMIN",children:"Admin"}),(0,Lr.jsx)("option",{value:"OTHER",children:"Other"})]})]}),(0,Lr.jsxs)(Qd,{children:[(0,Lr.jsx)(Xd,{type:"button",onClick:n,children:"Cancel"}),(0,Lr.jsx)(Zd,{type:"submit",children:"Save Changes"})]})]})]})})};function ef(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function tf(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function nf(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?tf(Object(n),!0).forEach((function(t){ef(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):tf(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const rf=()=>{};let of={},af={},sf=null,lf={mark:rf,measure:rf};try{"undefined"!==typeof window&&(of=window),"undefined"!==typeof document&&(af=document),"undefined"!==typeof MutationObserver&&(sf=MutationObserver),"undefined"!==typeof performance&&(lf=performance)}catch(rS){}const{userAgent:cf=""}=of.navigator||{},uf=of,df=af,ff=sf,pf=lf,hf=(uf.document,!!df.documentElement&&!!df.head&&"function"===typeof df.addEventListener&&"function"===typeof df.createElement),mf=~cf.indexOf("MSIE")||~cf.indexOf("Trident/");var gf={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},xf=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],vf="classic",yf="duotone",bf=[vf,yf,"sharp","sharp-duotone"],wf=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),Sf=["fak","fa-kit","fakd","fa-kit-duotone"],kf={fak:"kit","fa-kit":"kit"},jf={fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"},Ef=["fak","fakd"],Cf={kit:"fak"},Af={"kit-duotone":"fakd"},Pf={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Nf=["fak","fa-kit","fakd","fa-kit-duotone"],zf={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},Rf=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Of=[1,2,3,4,5,6,7,8,9,10],Tf=Of.concat([11,12,13,14,15,16,17,18,19,20]),Lf=[...Object.keys({classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]}),"solid","regular","light","thin","duotone","brands","2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Pf.GROUP,Pf.SWAP_OPACITY,Pf.PRIMARY,Pf.SECONDARY].concat(Of.map((e=>"".concat(e,"x")))).concat(Tf.map((e=>"w-".concat(e))));const Ff="___FONT_AWESOME___",Mf=16,Df="svg-inline--fa",_f="data-fa-i2svg",If="data-fa-pseudo-element",Uf="data-prefix",Bf="data-icon",Wf="fontawesome-i2svg",Hf=["HTML","HEAD","STYLE","SCRIPT"],qf=(()=>{try{return!0}catch(e){return!1}})();function Vf(e){return new Proxy(e,{get:(e,t)=>t in e?e[t]:e[vf]})}const Kf=nf({},gf);Kf[vf]=nf(nf(nf(nf({},{"fa-duotone":"duotone"}),gf[vf]),kf),jf);const Yf=Vf(Kf),Gf=nf({},{classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}});Gf[vf]=nf(nf(nf(nf({},{duotone:"fad"}),Gf[vf]),Cf),Af);const Qf=Vf(Gf),Jf=nf({},zf);Jf[vf]=nf(nf({},Jf[vf]),{fak:"fa-kit"});const Xf=Vf(Jf),Zf=nf({},{classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}});Zf[vf]=nf(nf({},Zf[vf]),{"fa-kit":"fak"});Vf(Zf);const $f=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,ep="fa-layers-text",tp=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,np=(Vf(nf({},{classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}})),["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"]),rp={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},op=["kit",...Lf],ip=uf.FontAwesomeConfig||{};if(df&&"function"===typeof df.querySelector){[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach((e=>{let[t,n]=e;const r=function(e){return""===e||"false"!==e&&("true"===e||e)}(function(e){var t=df.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}(t));void 0!==r&&null!==r&&(ip[n]=r)}))}const ap={styleDefault:"solid",familyDefault:vf,cssPrefix:"fa",replacementClass:Df,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ip.familyPrefix&&(ip.cssPrefix=ip.familyPrefix);const sp=nf(nf({},ap),ip);sp.autoReplaceSvg||(sp.observeMutations=!1);const lp={};Object.keys(ap).forEach((e=>{Object.defineProperty(lp,e,{enumerable:!0,set:function(t){sp[e]=t,cp.forEach((e=>e(lp)))},get:function(){return sp[e]}})})),Object.defineProperty(lp,"familyPrefix",{enumerable:!0,set:function(e){sp.cssPrefix=e,cp.forEach((e=>e(lp)))},get:function(){return sp.cssPrefix}}),uf.FontAwesomeConfig=lp;const cp=[];const up=Mf,dp={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function fp(){let e=12,t="";for(;e-- >0;)t+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[62*Math.random()|0];return t}function pp(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function hp(e){return e.classList?pp(e.classList):(e.getAttribute("class")||"").split(" ").filter((e=>e))}function mp(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function gp(e){return Object.keys(e||{}).reduce(((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";")),"")}function xp(e){return e.size!==dp.size||e.x!==dp.x||e.y!==dp.y||e.rotate!==dp.rotate||e.flipX||e.flipY}function vp(){const e="fa",t=Df,n=lp.cssPrefix,r=lp.replacementClass;let o=':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';if(n!==e||r!==t){const i=new RegExp("\\.".concat(e,"\\-"),"g"),a=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");o=o.replace(i,".".concat(n,"-")).replace(a,"--".concat(n,"-")).replace(s,".".concat(r))}return o}let yp=!1;function bp(){lp.autoAddCss&&!yp&&(!function(e){if(!e||!hf)return;const t=df.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=df.head.childNodes;let r=null;for(let o=n.length-1;o>-1;o--){const e=n[o],t=(e.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(t)>-1&&(r=e)}df.head.insertBefore(t,r)}(vp()),yp=!0)}var wp={mixout:()=>({dom:{css:vp,insertCss:bp}}),hooks:()=>({beforeDOMElementCreation(){bp()},beforeI2svg(){bp()}})};const Sp=uf||{};Sp[Ff]||(Sp[Ff]={}),Sp[Ff].styles||(Sp[Ff].styles={}),Sp[Ff].hooks||(Sp[Ff].hooks={}),Sp[Ff].shims||(Sp[Ff].shims=[]);var kp=Sp[Ff];const jp=[],Ep=function(){df.removeEventListener("DOMContentLoaded",Ep),Cp=1,jp.map((e=>e()))};let Cp=!1;function Ap(e){const{tag:t,attributes:n={},children:r=[]}=e;return"string"===typeof e?mp(e):"<".concat(t," ").concat(function(e){return Object.keys(e||{}).reduce(((t,n)=>t+"".concat(n,'="').concat(mp(e[n]),'" ')),"").trim()}(n),">").concat(r.map(Ap).join(""),"</").concat(t,">")}function Pp(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}hf&&(Cp=(df.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(df.readyState),Cp||df.addEventListener("DOMContentLoaded",Ep));var Np=function(e,t,n,r){var o,i,a,s=Object.keys(e),l=s.length,c=void 0!==r?function(e,t){return function(n,r,o,i){return e.call(t,n,r,o,i)}}(t,r):t;for(void 0===n?(o=1,a=e[s[0]]):(o=0,a=n);o<l;o++)a=c(a,e[i=s[o]],i,e);return a};function zp(e){const t=function(e){const t=[];let n=0;const r=e.length;for(;n<r;){const o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<r){const r=e.charCodeAt(n++);56320==(64512&r)?t.push(((1023&o)<<10)+(1023&r)+65536):(t.push(o),n--)}else t.push(o)}return t}(e);return 1===t.length?t[0].toString(16):null}function Rp(e){return Object.keys(e).reduce(((t,n)=>{const r=e[n];return!!r.icon?t[r.iconName]=r.icon:t[n]=r,t}),{})}function Op(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{skipHooks:r=!1}=n,o=Rp(t);"function"!==typeof kp.hooks.addPack||r?kp.styles[e]=nf(nf({},kp.styles[e]||{}),o):kp.hooks.addPack(e,Rp(t)),"fas"===e&&Op("fa",t)}const{styles:Tp,shims:Lp}=kp,Fp=Object.keys(Xf),Mp=Fp.reduce(((e,t)=>(e[t]=Object.keys(Xf[t]),e)),{});let Dp=null,_p={},Ip={},Up={},Bp={},Wp={};function Hp(e,t){const n=t.split("-"),r=n[0],o=n.slice(1).join("-");return r!==e||""===o||(i=o,~op.indexOf(i))?null:o;var i}const qp=()=>{const e=e=>Np(Tp,((t,n,r)=>(t[r]=Np(n,e,{}),t)),{});_p=e(((e,t,n)=>{if(t[3]&&(e[t[3]]=n),t[2]){t[2].filter((e=>"number"===typeof e)).forEach((t=>{e[t.toString(16)]=n}))}return e})),Ip=e(((e,t,n)=>{if(e[n]=n,t[2]){t[2].filter((e=>"string"===typeof e)).forEach((t=>{e[t]=n}))}return e})),Wp=e(((e,t,n)=>{const r=t[2];return e[n]=n,r.forEach((t=>{e[t]=n})),e}));const t="far"in Tp||lp.autoFetchSvg,n=Np(Lp,((e,n)=>{const r=n[0];let o=n[1];const i=n[2];return"far"!==o||t||(o="fas"),"string"===typeof r&&(e.names[r]={prefix:o,iconName:i}),"number"===typeof r&&(e.unicodes[r.toString(16)]={prefix:o,iconName:i}),e}),{names:{},unicodes:{}});Up=n.names,Bp=n.unicodes,Dp=Jp(lp.styleDefault,{family:lp.familyDefault})};var Vp;function Kp(e,t){return(_p[e]||{})[t]}function Yp(e,t){return(Wp[e]||{})[t]}function Gp(e){return Up[e]||{prefix:null,iconName:null}}function Qp(){return Dp}Vp=e=>{Dp=Jp(e.styleDefault,{family:lp.familyDefault})},cp.push(Vp),qp();function Jp(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{family:n=vf}=t,r=Yf[n][e];if(n===yf&&!e)return"fad";const o=Qf[n][e]||Qf[n][r],i=e in kp.styles?e:null;return o||i||null}function Xp(e){return e.sort().filter(((e,t,n)=>n.indexOf(e)===t))}function Zp(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{skipLookups:n=!1}=t;let r=null;const o=Rf.concat(Nf),i=Xp(e.filter((e=>o.includes(e)))),a=Xp(e.filter((e=>!Rf.includes(e)))),s=i.filter((e=>(r=e,!xf.includes(e)))),[l=null]=s,c=function(e){let t=vf;const n=Fp.reduce(((e,t)=>(e[t]="".concat(lp.cssPrefix,"-").concat(t),e)),{});return bf.forEach((r=>{(e.includes(n[r])||e.some((e=>Mp[r].includes(e))))&&(t=r)})),t}(i),u=nf(nf({},function(e){let t=[],n=null;return e.forEach((e=>{const r=Hp(lp.cssPrefix,e);r?n=r:e&&t.push(e)})),{iconName:n,rest:t}}(a)),{},{prefix:Jp(l,{family:c})});return nf(nf(nf({},u),function(e){const{values:t,family:n,canonical:r,givenPrefix:o="",styles:i={},config:a={}}=e,s=n===yf,l=t.includes("fa-duotone")||t.includes("fad"),c="duotone"===a.familyDefault,u="fad"===r.prefix||"fa-duotone"===r.prefix;!s&&(l||c||u)&&(r.prefix="fad");(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab");if(!r.prefix&&$p.includes(n)){if(Object.keys(i).find((e=>eh.includes(e)))||a.autoFetchSvg){const e=wf.get(n).defaultShortPrefixId;r.prefix=e,r.iconName=Yp(r.prefix,r.iconName)||r.iconName}}"fa"!==r.prefix&&"fa"!==o||(r.prefix=Qp()||"fas");return r}({values:e,family:c,styles:Tp,config:lp,canonical:u,givenPrefix:r})),function(e,t,n){let{prefix:r,iconName:o}=n;if(e||!r||!o)return{prefix:r,iconName:o};const i="fa"===t?Gp(o):{},a=Yp(r,o);o=i.iconName||a||o,r=i.prefix||r,"far"!==r||Tp.far||!Tp.fas||lp.autoFetchSvg||(r="fas");return{prefix:r,iconName:o}}(n,r,u))}const $p=bf.filter((e=>e!==vf||e!==yf)),eh=Object.keys(zf).filter((e=>e!==vf)).map((e=>Object.keys(zf[e]))).flat();let th=[],nh={};const rh={},oh=Object.keys(rh);function ih(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return(nh[e]||[]).forEach((e=>{t=e.apply(null,[t,...r])})),t}function ah(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];(nh[e]||[]).forEach((e=>{e.apply(null,n)}))}function sh(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return rh[e]?rh[e].apply(null,t):void 0}function lh(e){"fa"===e.prefix&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||Qp();if(t)return t=Yp(n,t)||t,Pp(ch.definitions,n,t)||Pp(kp.styles,n,t)}const ch=new class{constructor(){this.definitions={}}add(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.reduce(this._pullDefinitions,{});Object.keys(r).forEach((e=>{this.definitions[e]=nf(nf({},this.definitions[e]||{}),r[e]),Op(e,r[e]);const t=Xf[vf][e];t&&Op(t,r[e]),qp()}))}reset(){this.definitions={}}_pullDefinitions(e,t){const n=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(n).map((t=>{const{prefix:r,iconName:o,icon:i}=n[t],a=i[2];e[r]||(e[r]={}),a.length>0&&a.forEach((t=>{"string"===typeof t&&(e[r][t]=i)})),e[r][o]=i})),e}},uh={i2svg:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return hf?(ah("beforeI2svg",e),sh("pseudoElements2svg",e),sh("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;var n;!1===lp.autoReplaceSvg&&(lp.autoReplaceSvg=!0),lp.observeMutations=!0,n=()=>{ph({autoReplaceSvgRoot:t}),ah("watch",e)},hf&&(Cp?setTimeout(n,0):jp.push(n))}},dh={icon:e=>{if(null===e)return null;if("object"===typeof e&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:Yp(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&2===e.length){const t=0===e[1].indexOf("fa-")?e[1].slice(3):e[1],n=Jp(e[0]);return{prefix:n,iconName:Yp(n,t)||t}}if("string"===typeof e&&(e.indexOf("".concat(lp.cssPrefix,"-"))>-1||e.match($f))){const t=Zp(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||Qp(),iconName:Yp(t.prefix,t.iconName)||t.iconName}}if("string"===typeof e){const t=Qp();return{prefix:t,iconName:Yp(t,e)||e}}}},fh={noAuto:()=>{lp.autoReplaceSvg=!1,lp.observeMutations=!1,ah("noAuto")},config:lp,dom:uh,parse:dh,library:ch,findIconDefinition:lh,toHtml:Ap},ph=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{autoReplaceSvgRoot:t=df}=e;(Object.keys(kp.styles).length>0||lp.autoFetchSvg)&&hf&&lp.autoReplaceSvg&&fh.dom.i2svg({node:t})};function hh(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map((e=>Ap(e)))}}),Object.defineProperty(e,"node",{get:function(){if(!hf)return;const t=df.createElement("div");return t.innerHTML=e.html,t.children}}),e}function mh(e){const{icons:{main:t,mask:n},prefix:r,iconName:o,transform:i,symbol:a,title:s,maskId:l,titleId:c,extra:u,watchable:d=!1}=e,{width:f,height:p}=n.found?n:t,h=Ef.includes(r),m=[lp.replacementClass,o?"".concat(lp.cssPrefix,"-").concat(o):""].filter((e=>-1===u.classes.indexOf(e))).filter((e=>""!==e||!!e)).concat(u.classes).join(" ");let g={children:[],attributes:nf(nf({},u.attributes),{},{"data-prefix":r,"data-icon":o,class:m,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(f," ").concat(p)})};const x=h&&!~u.classes.indexOf("fa-fw")?{width:"".concat(f/p*16*.0625,"em")}:{};d&&(g.attributes[_f]=""),s&&(g.children.push({tag:"title",attributes:{id:g.attributes["aria-labelledby"]||"title-".concat(c||fp())},children:[s]}),delete g.attributes.title);const v=nf(nf({},g),{},{prefix:r,iconName:o,main:t,mask:n,maskId:l,transform:i,symbol:a,styles:nf(nf({},x),u.styles)}),{children:y,attributes:b}=n.found&&t.found?sh("generateAbstractMask",v)||{children:[],attributes:{}}:sh("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=y,v.attributes=b,a?function(e){let{prefix:t,iconName:n,children:r,attributes:o,symbol:i}=e;const a=!0===i?"".concat(t,"-").concat(lp.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:nf(nf({},o),{},{id:a}),children:r}]}]}(v):function(e){let{children:t,main:n,mask:r,attributes:o,styles:i,transform:a}=e;if(xp(a)&&n.found&&!r.found){const{width:e,height:t}=n,r={x:e/t/2,y:.5};o.style=gp(nf(nf({},i),{},{"transform-origin":"".concat(r.x+a.x/16,"em ").concat(r.y+a.y/16,"em")}))}return[{tag:"svg",attributes:o,children:t}]}(v)}function gh(e){const{content:t,width:n,height:r,transform:o,title:i,extra:a,watchable:s=!1}=e,l=nf(nf(nf({},a.attributes),i?{title:i}:{}),{},{class:a.classes.join(" ")});s&&(l[_f]="");const c=nf({},a.styles);xp(o)&&(c.transform=function(e){let{transform:t,width:n=Mf,height:r=Mf,startCentered:o=!1}=e,i="";return i+=o&&mf?"translate(".concat(t.x/up-n/2,"em, ").concat(t.y/up-r/2,"em) "):o?"translate(calc(-50% + ".concat(t.x/up,"em), calc(-50% + ").concat(t.y/up,"em)) "):"translate(".concat(t.x/up,"em, ").concat(t.y/up,"em) "),i+="scale(".concat(t.size/up*(t.flipX?-1:1),", ").concat(t.size/up*(t.flipY?-1:1),") "),i+="rotate(".concat(t.rotate,"deg) "),i}({transform:o,startCentered:!0,width:n,height:r}),c["-webkit-transform"]=c.transform);const u=gp(c);u.length>0&&(l.style=u);const d=[];return d.push({tag:"span",attributes:l,children:[t]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}const{styles:xh}=kp;function vh(e){const t=e[0],n=e[1],[r]=e.slice(4);let o=null;return o=Array.isArray(r)?{tag:"g",attributes:{class:"".concat(lp.cssPrefix,"-").concat(rp.GROUP)},children:[{tag:"path",attributes:{class:"".concat(lp.cssPrefix,"-").concat(rp.SECONDARY),fill:"currentColor",d:r[0]}},{tag:"path",attributes:{class:"".concat(lp.cssPrefix,"-").concat(rp.PRIMARY),fill:"currentColor",d:r[1]}}]}:{tag:"path",attributes:{fill:"currentColor",d:r}},{found:!0,width:t,height:n,icon:o}}const yh={found:!1,width:512,height:512};function bh(e,t){let n=t;return"fa"===t&&null!==lp.styleDefault&&(t=Qp()),new Promise(((r,o)=>{if("fa"===n){const n=Gp(e)||{};e=n.iconName||e,t=n.prefix||t}if(e&&t&&xh[t]&&xh[t][e]){return r(vh(xh[t][e]))}!function(e,t){qf||lp.showMissingIcons||!e||console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}(e,t),r(nf(nf({},yh),{},{icon:lp.showMissingIcons&&e&&sh("missingIconAbstract")||{}}))}))}const wh=()=>{},Sh=lp.measurePerformance&&pf&&pf.mark&&pf.measure?pf:{mark:wh,measure:wh},kh='FA "6.7.2"',jh=e=>{Sh.mark("".concat(kh," ").concat(e," ends")),Sh.measure("".concat(kh," ").concat(e),"".concat(kh," ").concat(e," begins"),"".concat(kh," ").concat(e," ends"))};var Eh=e=>(Sh.mark("".concat(kh," ").concat(e," begins")),()=>jh(e));const Ch=()=>{};function Ah(e){return"string"===typeof(e.getAttribute?e.getAttribute(_f):null)}function Ph(e){return df.createElementNS("http://www.w3.org/2000/svg",e)}function Nh(e){return df.createElement(e)}function zh(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{ceFn:n=("svg"===e.tag?Ph:Nh)}=t;if("string"===typeof e)return df.createTextNode(e);const r=n(e.tag);Object.keys(e.attributes||[]).forEach((function(t){r.setAttribute(t,e.attributes[t])}));return(e.children||[]).forEach((function(e){r.appendChild(zh(e,{ceFn:n}))})),r}const Rh={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach((e=>{t.parentNode.insertBefore(zh(e),t)})),null===t.getAttribute(_f)&&lp.keepOriginalSource){let e=df.createComment(function(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}(t));t.parentNode.replaceChild(e,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~hp(t).indexOf(lp.replacementClass))return Rh.replace(e);const r=new RegExp("".concat(lp.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const e=n[0].attributes.class.split(" ").reduce(((e,t)=>(t===lp.replacementClass||t.match(r)?e.toSvg.push(t):e.toNode.push(t),e)),{toNode:[],toSvg:[]});n[0].attributes.class=e.toSvg.join(" "),0===e.toNode.length?t.removeAttribute("class"):t.setAttribute("class",e.toNode.join(" "))}const o=n.map((e=>Ap(e))).join("\n");t.setAttribute(_f,""),t.innerHTML=o}};function Oh(e){e()}function Th(e,t){const n="function"===typeof t?t:Ch;if(0===e.length)n();else{let t=Oh;"async"===lp.mutateApproach&&(t=uf.requestAnimationFrame||Oh),t((()=>{const t=!0===lp.autoReplaceSvg?Rh.replace:Rh[lp.autoReplaceSvg]||Rh.replace,r=Eh("mutate");e.map(t),r(),n()}))}}let Lh=!1;function Fh(){Lh=!0}function Mh(){Lh=!1}let Dh=null;function _h(e){if(!ff)return;if(!lp.observeMutations)return;const{treeCallback:t=Ch,nodeCallback:n=Ch,pseudoElementsCallback:r=Ch,observeMutationsRoot:o=df}=e;Dh=new ff((e=>{if(Lh)return;const o=Qp();pp(e).forEach((e=>{if("childList"===e.type&&e.addedNodes.length>0&&!Ah(e.addedNodes[0])&&(lp.searchPseudoElements&&r(e.target),t(e.target)),"attributes"===e.type&&e.target.parentNode&&lp.searchPseudoElements&&r(e.target.parentNode),"attributes"===e.type&&Ah(e.target)&&~np.indexOf(e.attributeName))if("class"===e.attributeName&&function(e){const t=e.getAttribute?e.getAttribute(Uf):null,n=e.getAttribute?e.getAttribute(Bf):null;return t&&n}(e.target)){const{prefix:t,iconName:n}=Zp(hp(e.target));e.target.setAttribute(Uf,t||o),n&&e.target.setAttribute(Bf,n)}else(function(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(lp.replacementClass)})(e.target)&&n(e.target)}))})),hf&&Dh.observe(o,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Ih(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=void 0!==e.innerText?e.innerText.trim():"";let o=Zp(hp(e));return o.prefix||(o.prefix=Qp()),t&&n&&(o.prefix=t,o.iconName=n),o.iconName&&o.prefix||(o.prefix&&r.length>0&&(o.iconName=function(e,t){return(Ip[e]||{})[t]}(o.prefix,e.innerText)||Kp(o.prefix,zp(e.innerText))),!o.iconName&&lp.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(o.iconName=e.firstChild.data)),o}function Uh(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{styleParser:!0};const{iconName:n,prefix:r,rest:o}=Ih(e),i=function(e){const t=pp(e.attributes).reduce(((e,t)=>("class"!==e.name&&"style"!==e.name&&(e[t.name]=t.value),e)),{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return lp.autoA11y&&(n?t["aria-labelledby"]="".concat(lp.replacementClass,"-title-").concat(r||fp()):(t["aria-hidden"]="true",t.focusable="false")),t}(e),a=ih("parseNodeAttributes",{},e);let s=t.styleParser?function(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce(((e,t)=>{const n=t.split(":"),r=n[0],o=n.slice(1);return r&&o.length>0&&(e[r]=o.join(":").trim()),e}),{})),n}(e):[];return nf({iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:r,transform:dp,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:s,attributes:i}},a)}const{styles:Bh}=kp;function Wh(e){const t="nest"===lp.autoReplaceSvg?Uh(e,{styleParser:!1}):Uh(e);return~t.extra.classes.indexOf(ep)?sh("generateLayersText",e,t):sh("generateSvgReplacementMutation",e,t)}function Hh(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!hf)return Promise.resolve();const n=df.documentElement.classList,r=e=>n.add("".concat(Wf,"-").concat(e)),o=e=>n.remove("".concat(Wf,"-").concat(e)),i=lp.autoFetchSvg?[...Sf,...Rf]:xf.concat(Object.keys(Bh));i.includes("fa")||i.push("fa");const a=[".".concat(ep,":not([").concat(_f,"])")].concat(i.map((e=>".".concat(e,":not([").concat(_f,"])")))).join(", ");if(0===a.length)return Promise.resolve();let s=[];try{s=pp(e.querySelectorAll(a))}catch(u){}if(!(s.length>0))return Promise.resolve();r("pending"),o("complete");const l=Eh("onTree"),c=s.reduce(((e,t)=>{try{const n=Wh(t);n&&e.push(n)}catch(u){qf||"MissingIcon"===u.name&&console.error(u)}return e}),[]);return new Promise(((e,n)=>{Promise.all(c).then((n=>{Th(n,(()=>{r("active"),r("complete"),o("pending"),"function"===typeof t&&t(),l(),e()}))})).catch((e=>{l(),n(e)}))}))}function qh(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Wh(e).then((e=>{e&&Th([e],t)}))}function Vh(e){return function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=(t||{}).icon?t:lh(t||{});let{mask:o}=n;return o&&(o=(o||{}).icon?o:lh(o||{})),e(r,nf(nf({},n),{},{mask:o}))}}const Kh=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{transform:n=dp,symbol:r=!1,mask:o=null,maskId:i=null,title:a=null,titleId:s=null,classes:l=[],attributes:c={},styles:u={}}=t;if(!e)return;const{prefix:d,iconName:f,icon:p}=e;return hh(nf({type:"icon"},e),(()=>(ah("beforeDOMElementCreation",{iconDefinition:e,params:t}),lp.autoA11y&&(a?c["aria-labelledby"]="".concat(lp.replacementClass,"-title-").concat(s||fp()):(c["aria-hidden"]="true",c.focusable="false")),mh({icons:{main:vh(p),mask:o?vh(o.icon):{found:!1,width:null,height:null,icon:{}}},prefix:d,iconName:f,transform:nf(nf({},dp),n),symbol:r,title:a,maskId:i,titleId:s,extra:{attributes:c,styles:u,classes:l}}))))};var Yh={mixout:()=>({icon:Vh(Kh)}),hooks:()=>({mutationObserverCallbacks:e=>(e.treeCallback=Hh,e.nodeCallback=qh,e)}),provides(e){e.i2svg=function(e){const{node:t=df,callback:n=()=>{}}=e;return Hh(t,n)},e.generateSvgReplacementMutation=function(e,t){const{iconName:n,title:r,titleId:o,prefix:i,transform:a,symbol:s,mask:l,maskId:c,extra:u}=t;return new Promise(((t,d)=>{Promise.all([bh(n,i),l.iconName?bh(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then((l=>{let[d,f]=l;t([e,mh({icons:{main:d,mask:f},prefix:i,iconName:n,transform:a,symbol:s,maskId:c,title:r,titleId:o,extra:u,watchable:!0})])})).catch(d)}))},e.generateAbstractIcon=function(e){let{children:t,attributes:n,main:r,transform:o,styles:i}=e;const a=gp(i);let s;return a.length>0&&(n.style=a),xp(o)&&(s=sh("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),t.push(s||r.icon),{children:t,attributes:n}}}},Gh={mixout:()=>({layer(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{classes:n=[]}=t;return hh({type:"layer"},(()=>{ah("beforeDOMElementCreation",{assembler:e,params:t});let r=[];return e((e=>{Array.isArray(e)?e.map((e=>{r=r.concat(e.abstract)})):r=r.concat(e.abstract)})),[{tag:"span",attributes:{class:["".concat(lp.cssPrefix,"-layers"),...n].join(" ")},children:r}]}))}})},Qh={mixout:()=>({counter(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{title:n=null,classes:r=[],attributes:o={},styles:i={}}=t;return hh({type:"counter",content:e},(()=>(ah("beforeDOMElementCreation",{content:e,params:t}),function(e){const{content:t,title:n,extra:r}=e,o=nf(nf(nf({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=gp(r.styles);i.length>0&&(o.style=i);const a=[];return a.push({tag:"span",attributes:o,children:[t]}),n&&a.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),a}({content:e.toString(),title:n,extra:{attributes:o,styles:i,classes:["".concat(lp.cssPrefix,"-layers-counter"),...r]}}))))}})},Jh={mixout:()=>({text(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{transform:n=dp,title:r=null,classes:o=[],attributes:i={},styles:a={}}=t;return hh({type:"text",content:e},(()=>(ah("beforeDOMElementCreation",{content:e,params:t}),gh({content:e,transform:nf(nf({},dp),n),title:r,extra:{attributes:i,styles:a,classes:["".concat(lp.cssPrefix,"-layers-text"),...o]}}))))}}),provides(e){e.generateLayersText=function(e,t){const{title:n,transform:r,extra:o}=t;let i=null,a=null;if(mf){const t=parseInt(getComputedStyle(e).fontSize,10),n=e.getBoundingClientRect();i=n.width/t,a=n.height/t}return lp.autoA11y&&!n&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,gh({content:e.innerHTML,width:i,height:a,transform:r,title:n,extra:o,watchable:!0})])}}};const Xh=new RegExp('"',"ug"),Zh=[1105920,1112319],$h=nf(nf(nf(nf({},{FontAwesome:{normal:"fas",400:"fas"}}),{"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}}),{"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}}),{"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}}),em=Object.keys($h).reduce(((e,t)=>(e[t.toLowerCase()]=$h[t],e)),{}),tm=Object.keys(em).reduce(((e,t)=>{const n=em[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e}),{});function nm(e,t){const n="".concat("data-fa-pseudo-element-pending").concat(t.replace(":","-"));return new Promise(((r,o)=>{if(null!==e.getAttribute(n))return r();const i=pp(e.children).filter((e=>e.getAttribute(If)===t))[0],a=uf.getComputedStyle(e,t),s=a.getPropertyValue("font-family"),l=s.match(tp),c=a.getPropertyValue("font-weight"),u=a.getPropertyValue("content");if(i&&!l)return e.removeChild(i),r();if(l&&"none"!==u&&""!==u){const u=a.getPropertyValue("content");let d=function(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),o=isNaN(r)?"normal":r;return(em[n]||{})[o]||tm[n]}(s,c);const{value:f,isSecondary:p}=function(e){const t=e.replace(Xh,""),n=function(e,t){const n=e.length;let r,o=e.charCodeAt(t);return o>=55296&&o<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?1024*(o-55296)+r-56320+65536:o}(t,0),r=n>=Zh[0]&&n<=Zh[1],o=2===t.length&&t[0]===t[1];return{value:zp(o?t[0]:t),isSecondary:r||o}}(u),h=l[0].startsWith("FontAwesome");let m=Kp(d,f),g=m;if(h){const e=function(e){const t=Bp[e],n=Kp("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}(f);e.iconName&&e.prefix&&(m=e.iconName,d=e.prefix)}if(!m||p||i&&i.getAttribute(Uf)===d&&i.getAttribute(Bf)===g)r();else{e.setAttribute(n,g),i&&e.removeChild(i);const a={iconName:null,title:null,titleId:null,prefix:null,transform:dp,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}},{extra:s}=a;s.attributes[If]=t,bh(m,d).then((o=>{const i=mh(nf(nf({},a),{},{icons:{main:o,mask:{prefix:null,iconName:null,rest:[]}},prefix:d,iconName:g,extra:s,watchable:!0})),l=df.createElementNS("http://www.w3.org/2000/svg","svg");"::before"===t?e.insertBefore(l,e.firstChild):e.appendChild(l),l.outerHTML=i.map((e=>Ap(e))).join("\n"),e.removeAttribute(n),r()})).catch(o)}}else r()}))}function rm(e){return Promise.all([nm(e,"::before"),nm(e,"::after")])}function om(e){return e.parentNode!==document.head&&!~Hf.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(If)&&(!e.parentNode||"svg"!==e.parentNode.tagName)}function im(e){if(hf)return new Promise(((t,n)=>{const r=pp(e.querySelectorAll("*")).filter(om).map(rm),o=Eh("searchPseudoElements");Fh(),Promise.all(r).then((()=>{o(),Mh(),t()})).catch((()=>{o(),Mh(),n()}))}))}var am={hooks:()=>({mutationObserverCallbacks:e=>(e.pseudoElementsCallback=im,e)}),provides(e){e.pseudoElements2svg=function(e){const{node:t=df}=e;lp.searchPseudoElements&&im(t)}}};let sm=!1;var lm={mixout:()=>({dom:{unwatch(){Fh(),sm=!0}}}),hooks:()=>({bootstrap(){_h(ih("mutationObserverCallbacks",{}))},noAuto(){Dh&&Dh.disconnect()},watch(e){const{observeMutationsRoot:t}=e;sm?Mh():_h(ih("mutationObserverCallbacks",{observeMutationsRoot:t}))}})};const cm=e=>e.toLowerCase().split(" ").reduce(((e,t)=>{const n=t.toLowerCase().split("-"),r=n[0];let o=n.slice(1).join("-");if(r&&"h"===o)return e.flipX=!0,e;if(r&&"v"===o)return e.flipY=!0,e;if(o=parseFloat(o),isNaN(o))return e;switch(r){case"grow":e.size=e.size+o;break;case"shrink":e.size=e.size-o;break;case"left":e.x=e.x-o;break;case"right":e.x=e.x+o;break;case"up":e.y=e.y-o;break;case"down":e.y=e.y+o;break;case"rotate":e.rotate=e.rotate+o}return e}),{size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0});var um={mixout:()=>({parse:{transform:e=>cm(e)}}),hooks:()=>({parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=cm(n)),e}}),provides(e){e.generateAbstractTransformGrouping=function(e){let{main:t,transform:n,containerWidth:r,iconWidth:o}=e;const i={transform:"translate(".concat(r/2," 256)")},a="translate(".concat(32*n.x,", ").concat(32*n.y,") "),s="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),l="rotate(".concat(n.rotate," 0 0)"),c={outer:i,inner:{transform:"".concat(a," ").concat(s," ").concat(l)},path:{transform:"translate(".concat(o/2*-1," -256)")}};return{tag:"g",attributes:nf({},c.outer),children:[{tag:"g",attributes:nf({},c.inner),children:[{tag:t.icon.tag,children:t.icon.children,attributes:nf(nf({},t.icon.attributes),c.path)}]}]}}}};const dm={x:0,y:0,width:"100%",height:"100%"};function fm(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}var pm={hooks:()=>({parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),r=n?Zp(n.split(" ").map((e=>e.trim()))):{prefix:null,iconName:null,rest:[]};return r.prefix||(r.prefix=Qp()),e.mask=r,e.maskId=t.getAttribute("data-fa-mask-id"),e}}),provides(e){e.generateAbstractMask=function(e){let{children:t,attributes:n,main:r,mask:o,maskId:i,transform:a}=e;const{width:s,icon:l}=r,{width:c,icon:u}=o,d=function(e){let{transform:t,containerWidth:n,iconWidth:r}=e;const o={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(32*t.x,", ").concat(32*t.y,") "),a="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)");return{outer:o,inner:{transform:"".concat(i," ").concat(a," ").concat(s)},path:{transform:"translate(".concat(r/2*-1," -256)")}}}({transform:a,containerWidth:c,iconWidth:s}),f={tag:"rect",attributes:nf(nf({},dm),{},{fill:"white"})},p=l.children?{children:l.children.map(fm)}:{},h={tag:"g",attributes:nf({},d.inner),children:[fm(nf({tag:l.tag,attributes:nf(nf({},l.attributes),d.path)},p))]},m={tag:"g",attributes:nf({},d.outer),children:[h]},g="mask-".concat(i||fp()),x="clip-".concat(i||fp()),v={tag:"mask",attributes:nf(nf({},dm),{},{id:g,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[f,m]},y={tag:"defs",children:[{tag:"clipPath",attributes:{id:x},children:(b=u,"g"===b.tag?b.children:[b])},v]};var b;return t.push(y,{tag:"rect",attributes:nf({fill:"currentColor","clip-path":"url(#".concat(x,")"),mask:"url(#".concat(g,")")},dm)}),{children:t,attributes:n}}}},hm={provides(e){let t=!1;uf.matchMedia&&(t=uf.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const e=[],n={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};e.push({tag:"path",attributes:nf(nf({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=nf(nf({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:nf(nf({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return t||i.children.push({tag:"animate",attributes:nf(nf({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:nf(nf({},o),{},{values:"1;0;1;1;0;1;"})}),e.push(i),e.push({tag:"path",attributes:nf(nf({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:t?[]:[{tag:"animate",attributes:nf(nf({},o),{},{values:"1;0;0;0;0;1;"})}]}),t||e.push({tag:"path",attributes:nf(nf({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:nf(nf({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:e}}}},mm={hooks:()=>({parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),r=null!==n&&(""===n||n);return e.symbol=r,e}})};!function(e,t){let{mixoutsTo:n}=t;th=e,nh={},Object.keys(rh).forEach((e=>{-1===oh.indexOf(e)&&delete rh[e]})),th.forEach((e=>{const t=e.mixout?e.mixout():{};if(Object.keys(t).forEach((e=>{"function"===typeof t[e]&&(n[e]=t[e]),"object"===typeof t[e]&&Object.keys(t[e]).forEach((r=>{n[e]||(n[e]={}),n[e][r]=t[e][r]}))})),e.hooks){const t=e.hooks();Object.keys(t).forEach((e=>{nh[e]||(nh[e]=[]),nh[e].push(t[e])}))}e.provides&&e.provides(rh)}))}([wp,Yh,Gh,Qh,Jh,am,lm,um,pm,hm,mm],{mixoutsTo:fh});const gm=fh.parse,xm=fh.icon;var vm=n(5173),ym=n.n(vm);function bm(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function wm(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?bm(Object(n),!0).forEach((function(t){km(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bm(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Sm(e){return Sm="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Sm(e)}function km(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function jm(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Em(e){return function(e){if(Array.isArray(e))return Cm(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return Cm(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Cm(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Cm(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Am(e){return t=e,(t-=0)===t?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1);var t}var Pm=["style"];var Nm=!1;try{Nm=!0}catch(rS){}function zm(e){return e&&"object"===Sm(e)&&e.prefix&&e.iconName&&e.icon?e:gm.icon?gm.icon(e):null===e?null:e&&"object"===Sm(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"===typeof e?{prefix:"fas",iconName:e}:void 0}function Rm(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?km({},e,t):{}}var Om={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},Tm=r.forwardRef((function(e,t){var n=wm(wm({},Om),e),r=n.icon,o=n.mask,i=n.symbol,a=n.className,s=n.title,l=n.titleId,c=n.maskId,u=zm(r),d=Rm("classes",[].concat(Em(function(e){var t,n=e.beat,r=e.fade,o=e.beatFade,i=e.bounce,a=e.shake,s=e.flash,l=e.spin,c=e.spinPulse,u=e.spinReverse,d=e.pulse,f=e.fixedWidth,p=e.inverse,h=e.border,m=e.listItem,g=e.flip,x=e.size,v=e.rotation,y=e.pull,b=(km(t={"fa-beat":n,"fa-fade":r,"fa-beat-fade":o,"fa-bounce":i,"fa-shake":a,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":u,"fa-spin-pulse":c,"fa-pulse":d,"fa-fw":f,"fa-inverse":p,"fa-border":h,"fa-li":m,"fa-flip":!0===g,"fa-flip-horizontal":"horizontal"===g||"both"===g,"fa-flip-vertical":"vertical"===g||"both"===g},"fa-".concat(x),"undefined"!==typeof x&&null!==x),km(t,"fa-rotate-".concat(v),"undefined"!==typeof v&&null!==v&&0!==v),km(t,"fa-pull-".concat(y),"undefined"!==typeof y&&null!==y),km(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(b).map((function(e){return b[e]?e:null})).filter((function(e){return e}))}(n)),Em((a||"").split(" ")))),f=Rm("transform","string"===typeof n.transform?gm.transform(n.transform):n.transform),p=Rm("mask",zm(o)),h=xm(u,wm(wm(wm(wm({},d),f),p),{},{symbol:i,title:s,titleId:l,maskId:c}));if(!h)return function(){var e;!Nm&&console&&"function"===typeof console.error&&(e=console).error.apply(e,arguments)}("Could not find icon",u),null;var m=h.abstract,g={ref:t};return Object.keys(n).forEach((function(e){Om.hasOwnProperty(e)||(g[e]=n[e])})),Lm(m[0],g)}));Tm.displayName="FontAwesomeIcon",Tm.propTypes={beat:ym().bool,border:ym().bool,beatFade:ym().bool,bounce:ym().bool,className:ym().string,fade:ym().bool,flash:ym().bool,mask:ym().oneOfType([ym().object,ym().array,ym().string]),maskId:ym().string,fixedWidth:ym().bool,inverse:ym().bool,flip:ym().oneOf([!0,!1,"horizontal","vertical","both"]),icon:ym().oneOfType([ym().object,ym().array,ym().string]),listItem:ym().bool,pull:ym().oneOf(["right","left"]),pulse:ym().bool,rotation:ym().oneOf([0,90,180,270]),shake:ym().bool,size:ym().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:ym().bool,spinPulse:ym().bool,spinReverse:ym().bool,symbol:ym().oneOfType([ym().bool,ym().string]),title:ym().string,titleId:ym().string,transform:ym().oneOfType([ym().string,ym().object]),swapOpacity:ym().bool};var Lm=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"===typeof n)return n;var o=(n.children||[]).map((function(n){return e(t,n)})),i=Object.keys(n.attributes||{}).reduce((function(e,t){var r=n.attributes[t];switch(t){case"class":e.attrs.className=r,delete n.attributes.class;break;case"style":e.attrs.style=r.split(";").map((function(e){return e.trim()})).filter((function(e){return e})).reduce((function(e,t){var n,r=t.indexOf(":"),o=Am(t.slice(0,r)),i=t.slice(r+1).trim();return o.startsWith("webkit")?e[(n=o,n.charAt(0).toUpperCase()+n.slice(1))]=i:e[o]=i,e}),{});break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=r:e.attrs[Am(t)]=r}return e}),{attrs:{}}),a=r.style,s=void 0===a?{}:a,l=jm(r,Pm);return i.attrs.style=wm(wm({},i.attrs.style),s),t.apply(void 0,[n.tag,wm(wm({},i.attrs),l)].concat(Em(o)))}.bind(null,r.createElement);const Fm={prefix:"fas",iconName:"pen-to-square",icon:[512,512,["edit"],"f044","M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"]},Mm=Fm,Dm={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"]},_m={prefix:"fas",iconName:"unlock",icon:[448,512,[128275],"f09c","M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z"]},Im={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},Um=Im;const Bm=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`,Wm=za.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`,Hm=za.h1`
  color: #2c3e50;
  margin: 0;
`,qm=za.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #c0392b;
  }
`,Vm=za.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`,Km=za.button`
  padding: 12px 20px;
  border: none;
  background: ${e=>e.active?"#223A70":"transparent"};
  color: ${e=>e.active?"white":"#333"};
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid ${e=>e.active?"#223A70":"transparent"};
  font-weight: ${e=>e.active?"bold":"normal"};
  transition: background 0.3s, color 0.3s, border-bottom 0.3s;

  &:hover {
    background: ${e=>e.active?"#223A70":"#f5f5f5"};
    border-bottom: 3px solid ${e=>e.active?"#223A70":"#ddd"};
  }
`,Ym=za.div`
  position: relative;
  margin-bottom: 20px;
`,Gm=za.input`
  width: 100%;
  padding: 12px 45px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`,Qm=za.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`,Jm=za.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e5ee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`,Xm=za.th`
  background-color: #f5f7fa;
  color: #333;
  font-weight: 600;
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #e1e5ee;
`,Zm=za.td`
  padding: 15px;
  border-bottom: 1px solid #e1e5ee;
  color: #333;
`,$m=za.div`
  display: flex;
  gap: 8px;
`,eg=za.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: ${e=>e.color||"#223A70"};
  color: white;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`,tg=za.div`
  text-align: center;
  padding: 40px;
  color: #777;
  font-style: italic;
`,ng=()=>{const e=te(),[t,n]=(0,r.useState)("users"),[o,i]=(0,r.useState)([]),[a,s]=(0,r.useState)(""),[l,c]=(0,r.useState)(null),[u,d]=(0,r.useState)("success"),[f,p]=(0,r.useState)(!0),[h,m]=(0,r.useState)(null),[g,x]=(0,r.useState)(!1);(0,r.useEffect)((()=>{Ad()?v():e("/admin/login")}),[e]);const v=async()=>{p(!0);try{const e=await _d.get("/admins/users");i(e.data),p(!1)}catch(e){y("Failed to fetch users","error"),p(!1)}},y=(e,t)=>{c(e),d(t),setTimeout((()=>c(null)),3e3)},b=o.filter((e=>{var t,n,r;return(null===(t=e.firstName)||void 0===t?void 0:t.toLowerCase().includes(a.toLowerCase()))||(null===(n=e.lastName)||void 0===n?void 0:n.toLowerCase().includes(a.toLowerCase()))||(null===(r=e.email)||void 0===r?void 0:r.toLowerCase().includes(a.toLowerCase()))}));return f?(0,Lr.jsx)("div",{style:{textAlign:"center",padding:"50px"},children:"Loading users..."}):(0,Lr.jsxs)(Bm,{children:[(0,Lr.jsxs)(Wm,{children:[(0,Lr.jsx)(Hm,{children:"Admin Dashboard"}),(0,Lr.jsx)(qm,{onClick:()=>{localStorage.removeItem("adminToken"),localStorage.removeItem("admin"),e("/admin/login")},children:"Logout"})]}),(0,Lr.jsxs)(Vm,{children:[(0,Lr.jsx)(Km,{active:"users"===t,onClick:()=>n("users"),children:"User Management"}),(0,Lr.jsx)(Km,{active:"blogPosts"===t,onClick:()=>n("blogPosts"),children:"Blog Posts"}),(0,Lr.jsx)(Km,{active:"reportedUsers"===t,onClick:()=>n("reportedUsers"),children:"Reported Users"})]}),l&&(0,Lr.jsx)(xc,{message:l,type:u,onClose:()=>c(null)}),"users"===t&&(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsxs)(Ym,{children:[(0,Lr.jsx)(Gm,{type:"text",placeholder:"Search User",value:a,onChange:e=>s(e.target.value)}),(0,Lr.jsx)(Qm,{children:(0,Lr.jsx)(Tm,{icon:Um})})]}),(0,Lr.jsxs)(Jm,{children:[(0,Lr.jsx)("thead",{children:(0,Lr.jsxs)("tr",{children:[(0,Lr.jsx)(Xm,{children:"Name Surname"}),(0,Lr.jsx)(Xm,{children:"E-Mail"}),(0,Lr.jsx)(Xm,{children:"Country"}),(0,Lr.jsx)(Xm,{children:"Intitution"}),(0,Lr.jsx)(Xm,{children:"Role"}),(0,Lr.jsx)(Xm,{children:"Actions"})]})}),(0,Lr.jsx)("tbody",{children:b.length>0?b.map((e=>(0,Lr.jsxs)("tr",{children:[(0,Lr.jsx)(Zm,{children:`${e.firstName||""} ${e.lastName||""}`}),(0,Lr.jsx)(Zm,{children:e.email}),(0,Lr.jsx)(Zm,{children:e.country||"-"}),(0,Lr.jsx)(Zm,{children:e.institution||"-"}),(0,Lr.jsx)(Zm,{children:e.role||"-"}),(0,Lr.jsx)(Zm,{children:(0,Lr.jsxs)($m,{children:[(0,Lr.jsx)(eg,{color:"#3498db",onClick:()=>(e=>{m(e),x(!0)})(e),title:"Edit User",children:(0,Lr.jsx)(Tm,{icon:Mm})}),(0,Lr.jsx)(eg,{color:e.isBlocked?"#27ae60":"#e74c3c",onClick:()=>(async(e,t)=>{try{await _d.put(`/admins/users/${e}/block`,{blocked:!t}),y(`User ${t?"unblocked":"blocked"} successfully`,"success"),v()}catch(n){y("Failed to update user status","error")}})(e.userID,e.isBlocked),title:e.isBlocked?"Unblock User":"Block User",children:(0,Lr.jsx)(Tm,{icon:e.isBlocked?_m:Dm})})]})})]},e.userID))):(0,Lr.jsx)("tr",{children:(0,Lr.jsx)(Zm,{colSpan:"6",children:(0,Lr.jsx)(tg,{children:"No users found"})})})})]})]}),"blogPosts"===t&&(0,Lr.jsx)("div",{children:(0,Lr.jsx)("h2",{children:"Blog Posts"})}),"reportedUsers"===t&&(0,Lr.jsx)("div",{children:(0,Lr.jsx)("h2",{children:"Reported Users"})}),g&&h&&(0,Lr.jsx)($d,{user:h,onClose:()=>x(!1),onSave:async(e,t)=>{try{t.role!==h.role&&await _d.put(`/admins/users/${e}/role`,{role:t.role}),await _d.put(`/users/${e}`,{firstName:t.firstName,lastName:t.lastName,institution:t.institution,country:t.country}),y("User updated successfully","success"),x(!1),v()}catch(n){y("Failed to update user","error")}}})]})},rg="https://closed-merola-deveracankaya-2f4e22df.koyeb.app",og="/api/v1/blogs";const ig=new class{getAllBlogs(){return Ar.get(`${rg}${og}`)}getRecentBlogs(){return Ar.get(`${rg}${og}`)}getBlogById(e){return Ar.get(`${rg}${og}/${e}`)}getBlogsByCategory(e){return Ar.get(`${rg}${og}`)}searchBlogs(e){return Ar.get(`${rg}${og}`)}getRelatedBlogs(e){return Ar.get(`${rg}${og}`)}getAllCategories(){return Ar.get(`${rg}${og}`)}createBlog(e){return Ar.post(`${rg}${og}/create`,e)}updateBlog(e,t){return Ar.put(`${rg}${og}/${e}`,t)}deleteBlog(e){return Ar.delete(`${rg}${og}/${e}`)}},ag=n.p+"static/media/defaultblog.315ee2e873ba84badcd5.png",sg=n.p+"static/media/blog-banner.3d555fc63a53d59e844e.png",lg=Oa`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`,cg=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`,ug=(za.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
`,za.div`
  background-color: #f5f7ff;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 40px 0;
  margin-top: -30px;
`),dg=(za.div`
  padding-top: 20px;
`,za.h1`
  font-size: 26px;
  font-weight: 550;
  color: #101828;
  margin: 0;
  max-width: 1000px;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 0 10px;
  }
`),fg=za.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 30px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin: 20px 0;

    /* Create a container for Sort and Categories buttons */
    & > form {
      order: 1;
      margin-bottom: 10px;
    }

    & > div:last-child {
      order: 3;
    }

    /* Container for Sort and Categories buttons */
    & > div:not(:last-child) {
      order: 2;
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
  }
`,pg=za.form`
  display: flex;
  align-items: center;
  background-color: #f2f4f7;
  border-radius: 25px;
  padding: 8px 16px;
  flex-grow: 1;
  max-width: 380px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`,hg=za.input`
  width: 100%;
  padding: 8px 8px 8px 10px;
  border: none;
  background: transparent;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`,mg=za.div`
  color: #667085;
  font-size: 16px;
  display: flex;
  align-items: center;
`,gg=za.div`
  position: relative;
  margin: 0 4px;

  @media (max-width: 768px) {
    margin: 0;
    flex: 1;
  }
`,xg=za.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 10px 16px;
  height: 39px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`,vg=za.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`,yg=za.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  
  ${e=>{let{selected:t}=e;return t&&"\n    background-color: #EFF6FF;\n    color: #1E40AF;\n    font-weight: 500;\n  "}}
  
  &:hover:not(${e=>{let{selected:t}=e;return t&&"&"}}) {
    background-color: #F2F4F7;
  }
`,bg=za.div`
  position: relative;
  margin: 0 4px;

  @media (max-width: 768px) {
    margin: 0;
    flex: 1;
  }
`,wg=za.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 10px;
  height: 39px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  min-width: 130px;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    justify-content: center;
  }
`,Sg=za.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  max-height: 310px; // Match Forum.js
  overflow-y: auto;
`,kg=za.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  ${e=>{let{selected:t}=e;return t&&"\n    background-color: #EFF6FF;\n    color: #1E40AF;\n    font-weight: 500;\n  "}}
  
  &:hover:not(${e=>{let{selected:t}=e;return t&&"&"}}) {
    background-color: #F2F4F7;
  }
`,jg=za.section`
  margin: 40px 0;
`,Eg=za.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
`,Cg=za.div`
  display: grid;
  grid-template-columns: 1.5fr 1.25fr;
  gap: 28px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,Ag=za.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Pg=za.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`,Ng=za.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 180px;
  }
`,zg=za.div`
  padding: 20px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`,Rg=za.p`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`,Og=za.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #101828;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,Tg=za.p`
  font-size: 16px;
  color: #667085;
  margin-bottom: 16px;
  line-height: 1.5;
  flex-grow: 1;
  min-height: 72px;
  
  ${e=>{let{short:t}=e;return t&&"\n    display: -webkit-box;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    margin-bottom: 8px;\n    min-height: 60px;\n  "}}

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 60px;
    margin-bottom: 12px;
  }
`,Lg=za.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 4px;
  }
`,Fg=za.span`
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${e=>e.$categoryColor||"#475467"};
  background-color: ${e=>e.$categoryColor?e.$categoryColor+"33":"#e9ecef"};

  &:hover {
    background-color: ${e=>e.$categoryColor?e.$categoryColor+"55":"#d8dde1"};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 8px;
  }
`,Mg=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 40px 0;
  padding: 4px;
  border-radius: 10px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
    justify-content: center;
  }
`,Dg=za(ze)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 36px;
  border-radius: 8px;
  color: #667085;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F2F4F7;
    color: #1E40AF;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 10px;
  }
`,_g=za.div`
  display: flex;
  gap: 2px;
`,Ig=za(ze)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 14px;
  color: #667085;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &.active {
    background-color: #EFF6FF;
    color: #1E40AF;
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    background-color: #F2F4F7;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
`,Ug=(za.div`
  text-align: center;
  font-size: 18px;
  color: #667085;
  padding: 60px;
`,za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`),Bg=za.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Wg=za.div`
  text-align: center;
  font-size: 18px;
  color: #F04438;
  padding: 60px;
`,Hg=za.img`
  height: 200px;
  margin-left: auto;
  margin-top: -120px;
  position: absolute;
  right: -100px;
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`,qg=za.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid #E4E7EC;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
`,Vg=za.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    height: 200px;
  }
`,Kg=za.div`
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`,Yg=za.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`,Gg=za.h2`
  font-size: 22px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 10px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,Qg=za.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
  }
`,Jg=za.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 14px;
  padding: 18px 18px 18px 240px;
  border: 1px solid #E4E7EC;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  min-height: 230px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    padding: 0;
    min-height: auto;
  }
`,Xg=za.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
    border-right: none;
  }
`,Zg=za.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,$g=za.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`,ex=za.h3`
  font-size: 17px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 6px;
  line-height: 1.3;
`,tx=za.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
`,nx=za.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
`,rx=()=>{const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(""),[i,a]=(0,r.useState)([]),[s,l]=(0,r.useState)([]),[c,u]=(0,r.useState)([]),[d,f]=(0,r.useState)(!0),[p,h]=(0,r.useState)(0),[m,g]=(0,r.useState)(0),[x,v]=(0,r.useState)(null),[y,b]=(0,r.useState)("newest"),[w,S]=(0,r.useState)(!1),k=(0,r.useRef)(null),j=te(),[E,C]=(0,r.useState)([]),[A,P]=(0,r.useState)({}),[N,z]=(0,r.useState)([]),[R,O]=(0,r.useState)(!1),T=(0,r.useRef)(null),L=["ARVR","Blockchain","CloudComputing","Cybersecurity","DataScience","DatabaseManagement","DevOps","EmbeddedSystems","GameDevelopment","MachineLearning","MobileDevelopment","OpenSource","ProjectManagement","QAStandards","SoftwareArchitecture","SoftwareTesting","TestPlanning","WebDevelopment"];(0,r.useEffect)((()=>{(async()=>{f(!0),v(null);try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/blogs");if(!e||!e.data)throw new Error("Invalid response format");{const t=e.data;if(t.length>0){const e=[...t].sort(((e,t)=>{const n=e.createdAt?new Date(e.createdAt):new Date(0);return(t.createdAt?new Date(t.createdAt):new Date(0))-n})),n=e.slice(0,3).map((e=>({id:e.blogID,title:e.title,summary:e.description.substring(0,150)+"...",categories:[e.category||"Uncategorized"],date:e.createdAt?new Date(e.createdAt).toLocaleDateString():(new Date).toLocaleDateString(),author:e.owner||e.createdBy||"Anonymous",imageUrl:e.media||""})));a(n);const r=e.map((e=>({id:e.blogID,title:e.title,summary:e.description.substring(0,150)+"...",categories:[e.category||"Uncategorized"],date:e.createdAt?new Date(e.createdAt).toLocaleDateString():(new Date).toLocaleDateString(),author:e.owner||e.createdBy||"Anonymous",imageUrl:e.media||""})));l(r);const o=[...new Set(t.map((e=>e.category)).filter((e=>e)))];o.length>0?u(o):u(["Uncategorized"]),g(Math.ceil(t.length/10))}else v("No blog posts available yet."),a([]),l([]),u(["Uncategorized"]),g(0)}f(!1)}catch(e){console.error("Error while fetching blog data:",e),v("An error occurred while loading blog data. Please try again later."),a([]),l([]),u(["Uncategorized"]),g(0),f(!1)}})()}),[p]),(0,r.useEffect)((()=>{(async()=>{try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories");let t=[];if(e&&e.data){t=e.data,C(t);const n=t.reduce(((e,t)=>(t.name&&t.color&&(e[t.name]=t.color),e)),{});P(n)}else C([]),P({});const n=t.filter((e=>L.includes(e.name)));n.sort(((e,t)=>e.name.localeCompare(t.name))),z(n)}catch(x){console.error("Error fetching or filtering categories for blog:",x),C([]),z([]),P({})}})()}),[]),(0,r.useEffect)((()=>{function e(e){k.current&&!k.current.contains(e.target)&&S(!1),T.current&&!T.current.contains(e.target)&&O(!1)}return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[k,T]);const F=e=>{h(e)},M=e=>{o(e),O(!1);const t=s.filter((t=>!e||t.categories&&t.categories.includes(e)));e&&0===t.length?v(`No blogs found in the "${e}" category.`):v(null),h(0)},D=e=>{j(`/blog/${e}`)},_=e=>e.imageUrl?e.imageUrl.startsWith("http")?e.imageUrl:`https://closed-merola-deveracankaya-2f4e22df.koyeb.app${e.imageUrl}`:e.imageData?`data:image/${e.imageType||"jpeg"};base64,${e.imageData}`:ag,I=e=>{b(e),S(!1);const t=[...s].sort(((t,n)=>{switch(e){case"newest":return new Date(n.date)-new Date(t.date);case"oldest":return new Date(t.date)-new Date(n.date);case"a-z":return t.title.localeCompare(n.title);case"z-a":return n.title.localeCompare(t.title);default:return 0}}));l(t)};return d?(0,Lr.jsx)(cg,{children:(0,Lr.jsx)(Ug,{children:(0,Lr.jsx)(Bg,{})})}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(lg,{}),(0,Lr.jsx)(ug,{children:(0,Lr.jsx)(cg,{children:(0,Lr.jsx)(dg,{children:"Shaping the Future: Research and Industry Perspectives"})})}),(0,Lr.jsxs)(cg,{style:{marginTop:"30px"},children:[(0,Lr.jsxs)(fg,{children:[(0,Lr.jsxs)(pg,{onSubmit:async t=>{if(t.preventDefault(),e.trim())try{const t=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/blogs");if(!t||!t.data)throw new Error("Invalid response format");{const n=t.data.filter((t=>{const n=e.toLowerCase();return t.title&&t.title.toLowerCase().includes(n)||t.description&&t.description.toLowerCase().includes(n)||t.category&&t.category.toLowerCase().includes(n)||t.owner&&t.owner.toLowerCase().includes(n)||t.createdBy&&t.createdBy.toLowerCase().includes(n)}));0===n.length?v("No blogs found matching your search criteria."):v(null);const r=n.map((e=>({id:e.blogID,title:e.title,summary:e.description.substring(0,150)+"...",categories:[e.category||"Uncategorized"],date:e.createdAt?new Date(e.createdAt).toLocaleDateString():(new Date).toLocaleDateString(),author:e.owner||e.createdBy||"Anonymous",imageUrl:e.media})));l(r),g(Math.ceil(r.length/10))}}catch(n){console.error("An error occurred while searching for a blog:",n),v("An error occurred while searching. Please try again later.")}},children:[(0,Lr.jsx)(mg,{children:(0,Lr.jsx)(it,{})}),(0,Lr.jsx)(hg,{type:"text",placeholder:"Search in Blogs",value:e,onChange:e=>t(e.target.value)})]}),(0,Lr.jsxs)(gg,{ref:k,children:[(0,Lr.jsxs)(xg,{onClick:()=>S(!w),children:[(0,Lr.jsx)(Je,{}),(0,Lr.jsx)("span",{children:"Sort"}),(0,Lr.jsx)(Qe,{})]}),w&&(0,Lr.jsxs)(vg,{children:[(0,Lr.jsx)(yg,{selected:"newest"===y,onClick:()=>I("newest"),children:"Newest first"}),(0,Lr.jsx)(yg,{selected:"oldest"===y,onClick:()=>I("oldest"),children:"Oldest first"}),(0,Lr.jsx)(yg,{selected:"a-z"===y,onClick:()=>I("a-z"),children:"A-Z"}),(0,Lr.jsx)(yg,{selected:"z-a"===y,onClick:()=>I("z-a"),children:"Z-A"})]})]}),(0,Lr.jsxs)(bg,{ref:T,children:[(0,Lr.jsxs)(wg,{onClick:()=>O(!R),children:[(0,Lr.jsx)("span",{children:n||"Categories"}),(0,Lr.jsx)(Qe,{size:16})]}),R&&(0,Lr.jsxs)(Sg,{children:[(0,Lr.jsx)(kg,{selected:""===n,onClick:()=>M(""),children:"All Categories"}),N.map((e=>(0,Lr.jsx)(kg,{selected:n===e.name,onClick:()=>M(e.name),children:e.name},e.categoryId)))]})]}),(0,Lr.jsx)(Hg,{src:sg,alt:"Blog Logo"})]}),"newest"===y&&!n&&!e.trim()&&!x&&(0,Lr.jsxs)(jg,{children:[(0,Lr.jsx)(Eg,{children:"Recently added blog posts"}),(0,Lr.jsxs)(Cg,{children:[i.length>0&&(0,Lr.jsxs)(qg,{onClick:()=>D(i[0].id),children:[(0,Lr.jsx)(Vg,{src:_(i[0]),alt:i[0].title}),(0,Lr.jsxs)(Kg,{children:[(0,Lr.jsxs)(Yg,{children:[i[0].author," \u2022 ",i[0].date]}),(0,Lr.jsx)(Gg,{children:i[0].title}),(0,Lr.jsx)(Qg,{children:i[0].summary}),(0,Lr.jsx)(Lg,{children:i[0].categories&&i[0].categories.map(((e,t)=>(0,Lr.jsx)(Fg,{$categoryColor:A[e]||null,children:e},t)))})]})]}),(0,Lr.jsx)(nx,{children:i.slice(1,3).map((e=>(0,Lr.jsxs)(Jg,{onClick:()=>D(e.id),children:[(0,Lr.jsx)(Xg,{src:_(e),alt:e.title}),(0,Lr.jsxs)(Zg,{children:[(0,Lr.jsxs)($g,{children:[e.author," \u2022 ",e.date]}),(0,Lr.jsx)(ex,{children:e.title}),(0,Lr.jsx)(tx,{children:e.summary}),(0,Lr.jsx)(Lg,{children:e.categories&&e.categories.map(((e,t)=>(0,Lr.jsx)(Fg,{$categoryColor:A[e]||null,children:e},t)))})]})]},e.id)))})]})]}),(0,Lr.jsxs)(jg,{children:[(0,Lr.jsx)(Eg,{children:"All blog posts"}),x?(0,Lr.jsx)(Wg,{children:x}):(0,Lr.jsx)(Ag,{children:s.filter((e=>!n||e.categories&&e.categories.includes(n))).slice(10*p,10*(p+1)).map((e=>(0,Lr.jsxs)(Pg,{onClick:()=>D(e.id),children:[(0,Lr.jsx)(Ng,{className:"blog-card-image",src:_(e),alt:e.title}),(0,Lr.jsxs)(zg,{children:[(0,Lr.jsxs)(Rg,{children:[e.author," \u2022 ",e.date]}),(0,Lr.jsx)(Og,{children:e.title}),(0,Lr.jsx)(Tg,{children:e.summary}),(0,Lr.jsx)(Lg,{children:e.categories.map(((e,t)=>(0,Lr.jsx)(Fg,{$categoryColor:A[e]||null,children:e},t)))})]})]},e.id)))})]}),!x&&s.filter((e=>!n||e.categories&&e.categories.includes(n))).length>0&&(0,Lr.jsxs)(Mg,{children:[(0,Lr.jsxs)(Dg,{to:"#",className:"prev",onClick:()=>F(p-1),style:{visibility:p>0?"visible":"hidden"},children:[(0,Lr.jsx)(Ge,{style:{transform:"rotate(180deg)",marginRight:"4px"}})," Previous"]}),(0,Lr.jsx)(_g,{children:[...Array(m).keys()].map((e=>(0,Lr.jsx)(Ig,{to:"#",className:p===e?"active":"",onClick:()=>F(e),children:e+1},e)))}),(0,Lr.jsxs)(Dg,{to:"#",className:"next",onClick:()=>F(p+1),style:{visibility:p<m-1?"visible":"hidden"},children:["Next ",(0,Lr.jsx)(Ge,{style:{marginLeft:"4px"}})]})]})]})]})},ox=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`,ix=za(ze)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667085;
  text-decoration: none;
  margin-bottom: 32px;
  font-size: 16px;
  
  &:hover {
    color: #1E40AF;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 14px;
  }
`,ax=za.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(33.33% - 1px);
    width: 1px;
    background-color: #E4E7EC;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    &::after {
      display: none;
    }
  }
`,sx=za.div`
  padding-right: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
`,lx=za.div`
  padding-left: 20px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    width: 100%;
  }
`,cx=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 24px;
  position: relative;
`,ux=za.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
`,dx=za.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #F9FAFB;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`,fx=za.img`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`,px=za.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
`,hx=za.h3`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0;
  line-height: 1.3;
  transition: color 0.3s ease;

  ${dx}:hover & {
    color: #1E40AF;
  }
`,mx=za.div`
  font-size: 14px;
  color: #667085;
  font-weight: 500;
  margin-bottom: 4px;
`,gx=za.p`
  font-size: 14px;
  color: #4B5563;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`,xx=za.div`
  margin-bottom: 32px;
`,vx=za.h1`
  font-size: 32px;
  font-weight: 700;
  color: #101828;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
`,yx=za.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  color: #667085;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
    gap: 12px;
    margin-bottom: 16px;
  }
`,bx=za.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  
  span[role="img"] {
    font-size: 16px;
    margin-right: 2px;
  }
`,wx=za.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;

  @media (max-width: 768px) {
    gap: 6px;
    margin-top: 6px;
  }
`,Sx=za.span`
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${e=>e.$categoryColor||"#475467"};
  background-color: ${e=>e.$categoryColor?e.$categoryColor+"33":"#e9ecef"};

  &:hover {
    background-color: ${e=>e.$categoryColor?e.$categoryColor+"55":"#d8dde1"};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 8px;
  }
`,kx=za.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  object-fit: cover;
  max-height: 300px;

  @media (max-width: 768px) {
    border-radius: 8px;
    margin-bottom: 16px;
    max-height: 200px;
  }
`,jx=za.div`
  color: #374151;
  font-size: 17px;
  line-height: 1.6;
  
  .blog-description {
    font-size: 18px;
    color: #4B5563;
    margin-bottom: 24px;
    line-height: 1.6;
    border-bottom: 1px solid #E5E7EB;
    padding-bottom: 24px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 32px 0 16px;
    color: #101828;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 28px 0 14px;
    color: #101828;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 24px 0;
  }
  
  ul, ol {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  blockquote {
    border-left: 4px solid #1E40AF;
    padding-left: 16px;
    margin: 24px 0;
    font-style: italic;
    color: #4B5563;
  }
  
  code {
    background-color: #F3F4F6;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background-color: #1F2937;
    color: #F9FAFB;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 24px 0;
  }
  
  a {
    color: #1E40AF;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .blog-image-container {
    display: flex;
    justify-content: center;
    margin: 32px 0;
  }
  
  .blog-content-image {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 15px;
    
    .blog-description {
      font-size: 16px;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    
    h2 {
      font-size: 20px;
      margin: 24px 0 12px;
    }
    
    h3 {
      font-size: 18px;
      margin: 20px 0 10px;
    }
    
    p {
      margin-bottom: 16px;
    }
    
    img {
      margin: 16px 0;
    }
    
    blockquote {
      margin: 16px 0;
      padding-left: 12px;
    }
    
    pre {
      padding: 12px;
      margin: 16px 0;
    }
    
    .blog-image-container {
      margin: 24px 0;
    }
  }
`,Ex=(za.div`
  padding: 40px;
  text-align: center;
  font-size: 18px;
  color: #667085;
`,za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`),Cx=za.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Ax=za.div`
  padding: 40px;
  text-align: center;
  font-size: 20px;
  color: #1F2937;
  background-color: #F9FAFB;
  border-radius: 8px;
  border: 1px dashed #D1D5DB;

  @media (max-width: 768px) {
    padding: 24px;
    font-size: 16px;
  }
`,Px=za.div`
  padding: 24px;
  background-color: #FEF2F2;
  color: #B91C1C;
  border-radius: 8px;
  border-left: 4px solid #B91C1C;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
    font-size: 14px;
  }
`,Nx=()=>{const{id:e}=ne(),t=te(),[n,o]=(0,r.useState)(null),[i,a]=(0,r.useState)([]),[s,l]=(0,r.useState)(!0),[c,u]=(0,r.useState)(null),[d,f]=(0,r.useState)({});(0,r.useEffect)((()=>{(async()=>{l(!0);try{const t=(await ig.getBlogById(e)).data;t.categories||(t.categories=t.category?[t.category]:[]),!t.date&&t.createdAt&&(t.date=new Date(t.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})),o(t);const n=(await ig.getRecentBlogs(4)).data.filter((t=>t.blogID!==parseInt(e))).slice(0,3),r=n.map((e=>{let t=e.date;t||(t=e.createdAt?new Date(e.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"No date");let n=e.summary;return!n&&e.description?n=e.description.length>150?`${e.description.substring(0,150)}...`:e.description:n||(n="No description available"),{...e,id:e.blogID||e.id,summary:n,date:t,categories:e.categories||(e.category?[e.category]:[])}}));a(r),l(!1)}catch(t){console.error("Error while fetching blog details:",t),u("An error occurred while loading blog details. Please try again later."),l(!1);const n={id:parseInt(e),title:"A Research about Standards",content:'<p>A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the design more visually appealing and easier to navigate.</p>\n                    <div class="blog-image-container">\n                        <img src="/images/blog/blog-content.jpg" alt="Blog content image" class="blog-content-image" />\n                    </div>\n                    <p>If you\'ve been to New York City and have walked the streets, it is easy to figure out how to get from one place to another because of the grid system that the city is built on. Just as the predictability of a city grid helps people navigate and tourists get around easily, so do webpage grids provide a structure that guides users and designers alike. Because of their consistent reference point, grids improve page readability and scannability and provide a clear structure for where they need to go.</p>\n                    <h2>Definition: A grid is made up of columns, gutters, and margins that provide a structure for the layout of elements on a page.</h2>',owner:"John Doe",date:"Sunday, 1 Jan 2023",readTime:"5 min read",categories:["Frameworks"],imageUrl:"/images/blog/office-1.jpg"};o(n),a([{id:2,title:"UX review presentations",summary:"How do you create compelling presentations that wow your colleagues and impress your managers?",owner:"Olivia Rhye",date:"Sunday, 1 Jan 2023",categories:["Design","Research"],imageUrl:"/images/blog/office-2.jpg"},{id:3,title:"Migrating to Linear 101",summary:"Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get...",owner:"Phoenix Baker",date:"Sunday, 1 Jan 2023",categories:["Design","Research"],imageUrl:"/images/blog/office-3.jpg"},{id:4,title:"Building your API Stack",summary:"The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...",owner:"Lana Steiner",date:"Sunday, 1 Jan 2023",categories:["Design","Research"],imageUrl:"/images/blog/office-4.jpg"}])}})()}),[e]),(0,r.useEffect)((()=>{(async()=>{try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories");if(e&&e.data){const t=e.data.reduce(((e,t)=>(t.name&&t.color&&(e[t.name]=t.color),e)),{});f(t)}else f({})}catch(c){console.error("Error fetching categories for blog detail:",c),f({})}})()}),[]);const p=e=>e?e.imageUrl?e.imageUrl.startsWith("http")||e.imageUrl.startsWith("/images")?e.imageUrl:`${{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL||"https://closed-merola-deveracankaya-2f4e22df.koyeb.app/"}${e.imageUrl}`:e.media?e.media.startsWith("http")||e.media.startsWith("/images")?e.media:`${{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL||"https://closed-merola-deveracankaya-2f4e22df.koyeb.app/"}${e.media}`:e.imageData?`data:image/${e.imageType||"jpeg"};base64,${e.imageData}`:ag:ag;return s?(0,Lr.jsx)(ox,{children:(0,Lr.jsx)(Ex,{children:(0,Lr.jsx)(Cx,{})})}):c?(0,Lr.jsx)(ox,{children:(0,Lr.jsx)(Px,{children:c})}):n?(0,Lr.jsxs)(ox,{children:[(0,Lr.jsxs)(ix,{to:"/blog",children:[(0,Lr.jsx)(Ye,{})," Back to Blogs"]}),(0,Lr.jsxs)(ax,{children:[(0,Lr.jsxs)(sx,{children:[(0,Lr.jsx)(cx,{children:"Recent blog posts"}),(0,Lr.jsx)(ux,{children:i.map((e=>(0,Lr.jsxs)(dx,{onClick:()=>{return n=e.id,void t(`/blog/${n}`);var n},children:[(0,Lr.jsx)(fx,{src:p(e),alt:e.title}),(0,Lr.jsxs)(px,{children:[(0,Lr.jsxs)(mx,{children:[e.owner||e.author||"Anonymous"," \u2022 ",e.date||"No date"]}),(0,Lr.jsx)(hx,{children:e.title}),(0,Lr.jsx)(gx,{children:e.summary||"No description available"}),e.categories&&e.categories.length>0&&(0,Lr.jsx)(wx,{children:e.categories.map(((e,t)=>(0,Lr.jsx)(Sx,{$categoryColor:d[e]||null,children:e},t)))})]})]},e.id)))})]}),(0,Lr.jsxs)(lx,{children:[(0,Lr.jsxs)(xx,{children:[(0,Lr.jsx)(kx,{src:p(n),alt:n.title}),(0,Lr.jsx)(vx,{children:n.title}),(0,Lr.jsx)(yx,{children:(0,Lr.jsxs)(bx,{children:[n.owner||n.author||"Anonymous"," \u2022 ",n.date||"No date",n.readTime&&` \u2022 ${n.readTime}`]})}),n.categories&&n.categories.length>0&&(0,Lr.jsx)(wx,{children:n.categories.map(((e,t)=>(0,Lr.jsx)(Sx,{$categoryColor:d[e]||null,children:e},t)))})]}),(0,Lr.jsxs)(jx,{children:[n.description&&(0,Lr.jsx)("p",{className:"blog-description",children:n.description}),(0,Lr.jsx)("div",{dangerouslySetInnerHTML:{__html:n.content||""}})]})]})]})]}):(0,Lr.jsx)(ox,{children:(0,Lr.jsx)(Ax,{children:"Blog post not found"})})},zx=n.p+"static/media/forum.1fa792242d631a95dbe0.png",Rx=Oa`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`,Ox=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`,Tx=za.div`
  background-color: #f5f7ff;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 40px 0;
  margin-top: -30px;
`,Lx=za.h1`
  font-size: 28px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 8px;
  }
`,Fx=za.p`
  font-size: 16px;
  color: #475467;
  margin: 0;
  max-width: 1000px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Mx=za.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 20px;

    & > form {
      width: 100%;
      margin-bottom: 8px;
    }

    & > div:not(:last-child) {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    & > button:last-child {
      width: 100%;
    }
  }
`,Dx=za.form`
  display: flex;
  align-items: center;
  background-color: #f2f4f7;
  border-radius: 25px;
  padding: 8px 16px;
  flex-grow: 1;
  max-width: 380px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`,_x=za.input`
  width: 100%;
  padding: 8px 8px 8px 10px;
  border: none;
  background: transparent;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`,Ix=za.div`
  color: #667085;
  font-size: 16px;
  display: flex;
  align-items: center;
`,Ux=za.div`
  position: relative;
  margin: 0 4px;

  @media (max-width: 768px) {
    flex: 1;
    margin: 0;
  }
`,Bx=za.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 12px;
    gap: 6px;
  }
`,Wx=za.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`,Hx=za.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  ${e=>{let{selected:t}=e;return t&&"\n    background-color: #EFF6FF;\n    color: #1E40AF;\n    font-weight: 500;\n  "}}
  
  &:hover:not(${e=>{let{selected:t}=e;return t&&"&"}}) {
    background-color: #F2F4F7;
  }
`,qx=za.div`
  position: relative;
  margin: 0 4px;

  @media (max-width: 768px) {
    flex: 1;
    margin: 0;
  }
`,Vx=za.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 12px;
    gap: 6px;
  }
`,Kx=za.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  max-height: 310px;
  overflow-y: auto;
`,Yx=za.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  ${e=>{let{selected:t}=e;return t&&"\n    background-color: #EFF6FF;\n    color: #1E40AF;\n    font-weight: 500;\n  "}}
  
  &:hover:not(${e=>{let{selected:t}=e;return t&&"&"}}) {
    background-color: #F2F4F7;
  }
`,Gx=za.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(to right, #18325e, #1a3a7d, #2a4c8f);
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  margin-left: auto;
  
  &:hover {
    background-color: #0284C7;
  }

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 20px;
  }
`,Qx=za.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`,Jx=za.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  padding-top: 66px;

  @media (max-width: 768px) {
    display: none;
  }
`,Xx=za.div`
  flex: 0 0 70%;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`,Zx=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`,$x=za.div`
  color: #667085;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  background: #F9FAFB;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  margin-bottom: 30px;
  line-height: 1.5;
`,ev=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`,tv=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`,nv=za.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  overflow: hidden;
`,rv=za.div`
  padding: 15px;
  position: relative;
  border-bottom: 1px solid #F2F4F7;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fff;
  
  &:hover {
    background-color: #F9FAFB;
    box-shadow: 0 2px 4px rgba(16, 24, 40, 0.1);
    transform: translateY(-1px);
    z-index: 1;
    margin: 0 -1px;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`,ov=za.h3`
  font-size: 15px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 8px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`,iv=za.div`
  font-size: 12px;
  color: #667085;
  margin-bottom: 6px;
`,av=za.div`
  font-size: 12px;
  color: #667085;
`,sv=za.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,lv=za.div`
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`,cv=za.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    gap: 10px;
  }
`,uv=za.div`
  display: flex;
  gap: 10px;
`,dv=za.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    loading: lazy;
  }
`,fv=za.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,pv=za.div`
  font-size: 14px;
  font-weight: 500;
  color: #344054;
`,hv=za.div`
  font-size: 12px;
  color: #667085;
`,mv=za.div`
  margin-bottom: 15px;
`,gv=za.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`,xv=za.p`
  font-size: 14px;
  color: #475467;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.4;
  }
`,vv=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`,yv=za.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 11px;
    gap: 8px;
  }
`,bv=za.div`
  /* Styles moved to PostStatsContainer, keep specific overrides if needed */
`,wv=za.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`,Sv=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`,kv=za.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,jv=(za.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  border-top: 1px solid #F2F4F7;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #EFF6FF;
    color: #1E40AF;
  }
  
  &::after {
    content: '→';
    margin-left: 6px;
    transition: transform 0.2s ease;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`,za.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #e4e7ec;
`),Ev=za.p`
  font-size: 16px;
  color: #667085;
  text-align: center;
  font-style: italic;
`,Cv=za.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,Av=za.div`
  background-color: white;
  border-radius: 30px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`,Pv=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E4E7EC;
`,Nv=za.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`,zv=za.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #667085;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f4f7;
  }
`,Rv=za.div`
  padding: 24px 30px;
  flex-grow: 1;
  overflow-y: auto;
`,Ov=za.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`,Tv=za.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #D0D5DD;
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
`,Lv=za.textarea`
  width: 100%;
  min-height: 150px;
  padding: 10px 15px;
  border: 1px solid #d0d5dd;
  border-radius: 30px;
  font-size: 1rem;
  resize: none;
  margin-bottom: 15px;
  &:focus {
    outline: none;
    border-color: #223A70;
  }
`,Fv=za.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 15px;
  background-color: white;
  cursor: pointer;
  color: ${e=>""===e.value?"#98a2b3":"#101828"};
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;

  option:disabled {
    color: #98a2b3;
  }

  option {
    color: #223A70;
  }

  &:focus {
    outline: none;
    border-color: #223A70;
  }
`,Mv=za.div`
  margin-bottom: 15px;
`,Dv=za.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 100px; // Limit height for many files
  overflow-y: auto; // Add scroll if needed
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  padding: 8px;
`,_v=za.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #475467;
  padding: 4px 8px;
  background-color: #f9fafb;
  border-radius: 4px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`,Iv=za.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
`,Uv=za.button`
  background: none;
  border: none;
  color: #98a2b3;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #d92d20;
  }
`,Bv=za.div`
  color: #d92d20;
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
`,Wv=za.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 30px;
  border-top: 1px solid #E4E7EC;
`,Hv=za.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e1e1e1;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`,qv=za.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #223A70;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #192C54;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`,Vv=za.img.attrs({loading:"lazy"})`
  height: 130px;
  margin-left: auto;
  margin-top: -90px;
  position: absolute;
  right: -15px;
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Kv=za.span`
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${e=>e.$categoryColor||"#475467"};
  background-color: ${e=>e.$categoryColor?e.$categoryColor+"33":"#e9ecef"};

  &:hover {
    background-color: ${e=>e.$categoryColor?e.$categoryColor+"55":"#d8dde1"};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 8px;
  }
`,Yv=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 40px 0;
  padding: 4px;
  border-radius: 10px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
    justify-content: center;
  }
`,Gv=za(ze)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 36px;
  border-radius: 8px;
  color: #667085;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F2F4F7;
    color: #1E40AF;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 10px;
  }
`,Qv=za.div`
  display: flex;
  gap: 2px;
`,Jv=za(ze)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 14px;
  color: #667085;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &.active {
    background-color: #EFF6FF;
    color: #1E40AF;
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    background-color: #F2F4F7;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
`,Xv=za(kv)`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-top-color: white;
  border-left-color: white;
  border-bottom-color: white;
  margin: 0;
`,Zv=za.div`
  background-color: #e8f5e9; // Light green background
  color: #2e7d32; // Dark green text
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 5px solid #4caf50;
  font-weight: 500;
`,$v=za(Zv)`
  background-color: #ffebee; // Light red background
  color: #c62828; // Dark red text
  border-left-color: #f44336;
`,ey=za.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`,ty=za.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1849A9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`,ny=za.p`
  margin: 0;
  color: ${e=>"error"===e.type?"#B42318":"#101828"};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`,ry=za.div`
  font-size: 24px;
`,oy=()=>{const[e,t]=(0,r.useState)(""),[n,o]=(0,r.useState)([]),[i,a]=(0,r.useState)([]),[s,l]=(0,r.useState)([]),[c,u]=(0,r.useState)(["Research","Frameworks","Tools","Software Development"]),[d,f]=(0,r.useState)(""),[p,h]=(0,r.useState)(!0),[m,g]=(0,r.useState)(null),[x,v]=(0,r.useState)(0),[y,b]=(0,r.useState)(0),[w,S]=(0,r.useState)(!1),[k,j]=(0,r.useState)("newest"),E=(0,r.useRef)(null),C=(0,r.useRef)(null),A=te(),[P,N]=(0,r.useState)(!1),[z,R]=(0,r.useState)(""),[O,T]=(0,r.useState)(""),[L,F]=(0,r.useState)(""),[M,D]=(0,r.useState)([]),[_,I]=(0,r.useState)({}),[U,B]=(0,r.useState)([]),[W,H]=(0,r.useState)([]),q=(0,r.useRef)(null),[V,K]=(0,r.useState)(!1),[Y,G]=(0,r.useState)(""),Q=(0,r.useRef)(null),[J,X]=(0,r.useState)(!1),[Z,$]=(0,r.useState)(0),[ee,ne]=(0,r.useState)(""),[re,oe]=(0,r.useState)([]),[ie,ae]=(0,r.useState)(!0),[se,le]=(0,r.useState)(!1),[ce,ue]=(0,r.useState)("loading"),[de,fe]=(0,r.useState)("Checking post..."),pe=["ARVR","Blockchain","CloudComputing","Cybersecurity","DataScience","DatabaseManagement","DevOps","EmbeddedSystems","GameDevelopment","MachineLearning","MobileDevelopment","OpenSource","ProjectManagement","QAStandards","SoftwareArchitecture","SoftwareTesting","TestPlanning","WebDevelopment"];(0,r.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token");if(!e)return void ae(!0);const t=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/user/interaction-count",{headers:{Authorization:`Bearer ${e}`}});ae(t.data.interactionCount<5),t.data.interactionCount>=5&&he()}catch(e){console.error("Error checking cold start:",e),ae(!0)}})()}),[]);const he=async()=>{try{const e=localStorage.getItem("token");if(!e)return;const t=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/recommendations/forum-posts",{headers:{Authorization:`Bearer ${e}`}});if(t&&t.data){const e=t.data.map((e=>({id:e.forumPostId,title:e.title,categoryName:e.categoryName,commentCount:e.commentCount||0,similarityScore:e.similarityScore})));oe(e)}}catch(e){console.error("Error fetching recommendations:",e),oe([])}};(0,r.useEffect)((()=>{(async()=>{h(!0),g(null);try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts");if(!e||!e.data)throw new Error("Invalid response format");{const t=e.data;if(t.length>0){const e=[...new Set(t.filter((e=>e.tags&&e.tags.length>0)).flatMap((e=>e.tags)))];e.length>0&&u(e);const n=[...t].sort(((e,t)=>{const n=e.createdAt?new Date(e.createdAt):new Date(0);return(t.createdAt?new Date(t.createdAt):new Date(0))-n})),r=n.map((e=>({id:e.forumPostID,title:e.title,description:e.description,media:e.mediaList||[],likesCount:e.likesCount||0,commentCount:e.commentCount||0,createdBy:e.createdBy,createdByType:e.createdByType,createdAt:e.createdAt,formattedDate:me(e.createdAt),timeAgo:ge(e.createdAt),updatedAt:e.updatedAt,tags:e.category?[e.category.name]:["General"],userName:e.creatorName||"Anonymous",userProfilePic:e.creatorProfilePic||Ku})));l(r),a(r.slice(0,5));const i=[...r].sort(((e,t)=>t.commentCount-e.commentCount)).slice(0,10);o(i),b(Math.ceil(r.length/10))}else l([]),o([]),a([]),g("No forum posts found.")}h(!1)}catch(e){console.error("Error fetching forum posts:",e),g("Failed to load forum posts. Please try again later."),l([]),o([]),a([]),h(!1)}})()}),[x,Z]),(0,r.useEffect)((()=>{(async()=>{try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories");let t=[];if(e&&e.data){t=e.data,D(t);const n=t.reduce(((e,t)=>(t.name&&t.color&&(e[t.name]=t.color),e)),{});I(n)}else D([]),I({});const n=t.filter((e=>pe.includes(e.name)));n.sort(((e,t)=>e.name.localeCompare(t.name))),B(n)}catch(m){console.error("Error fetching or filtering categories:",m),D([]),B([]),I({})}})()}),[]);const me=e=>{if(!e)return"Unknown date";const t=new Date(e);return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(t)},ge=e=>{if(!e)return"Unknown time";const t=new Date(e),n=new Date,r=Math.floor((n-t)/1e3);if(r<60)return`${r} seconds ago`;const o=Math.floor(r/60);if(o<60)return`${o} minute${1===o?"":"s"} ago`;const i=Math.floor(o/60);if(i<24)return`${i} hour${1===i?"":"s"} ago`;const a=Math.floor(i/24);if(a<30)return`${a} day${1===a?"":"s"} ago`;const s=Math.floor(a/30);if(s<12)return`${s} month${1===s?"":"s"} ago`;const l=Math.floor(s/12);return`${l} year${1===l?"":"s"} ago`};(0,r.useEffect)((()=>{function e(e){E.current&&!E.current.contains(e.target)&&S(!1),C.current&&!C.current.contains(e.target)&&X(!1)}return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[E,C]);const xe=e=>{const t=e.target.value;if(f(t),!t)return void a(s.slice(0,5));const n=s.filter((e=>e.tags&&e.tags.includes(t)));a(n.slice(0,5))},ve=t=>{if(t<0||t>=y)return;v(t);const n=5*t;let r=[];if(d){r=s.filter((e=>e.tags&&e.tags.includes(d))).slice(n,n+5)}else if(e){r=s.filter((t=>{const n=e.toLowerCase();return t.title&&t.title.toLowerCase().includes(n)||t.description&&t.description.toLowerCase().includes(n)})).slice(n,n+5)}else r=s.slice(n,n+5);a(r)},ye=e=>{j(e),S(!1);let t=[...i];switch(e){case"newest":t.sort(((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)));break;case"oldest":t.sort(((e,t)=>new Date(e.createdAt)-new Date(t.createdAt)));break;case"most-commented":t.sort(((e,t)=>t.commentCount-e.commentCount))}a(t)};(0,r.useEffect)((()=>{function e(e){Q.current&&!Q.current.contains(e.target)&&N(!1)}return P&&document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[P,Q]);return p?(0,Lr.jsx)(Ox,{children:(0,Lr.jsx)(Sv,{children:(0,Lr.jsx)(kv,{})})}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(Rx,{}),(0,Lr.jsx)(Tx,{children:(0,Lr.jsxs)(Ox,{children:[(0,Lr.jsx)(Lx,{children:"Welcome to Community Forum!"}),(0,Lr.jsx)(Fx,{children:"Here you are free to ask questions, share your ideas and engage in thoughtful communications with our community."}),(0,Lr.jsx)(Vv,{src:zx,alt:"Forum Logo"})]})}),(0,Lr.jsxs)(Ox,{style:{marginTop:"30px"},children:[ee&&(0,Lr.jsx)(Zv,{children:ee}),m&&(0,Lr.jsx)($v,{children:m}),(0,Lr.jsxs)(Qx,{children:[(0,Lr.jsxs)(Jx,{children:[(0,Lr.jsx)(Zx,{children:"Recommendations"}),ie?(0,Lr.jsx)($x,{children:"You can see suggested posts by commenting and liking the posts."}):re.length>0?(0,Lr.jsx)(nv,{children:re.map((e=>(0,Lr.jsxs)(rv,{onClick:()=>A(`/forum/post/${e.id}`),children:[(0,Lr.jsx)(ov,{children:e.title}),e.categoryName&&(0,Lr.jsx)(Kv,{$categoryColor:_[e.categoryName]||null,children:e.categoryName}),(0,Lr.jsx)(av,{children:(0,Lr.jsxs)("span",{children:[e.commentCount," comments"]})})]},e.id)))}):(0,Lr.jsx)($x,{children:"No recommendations available at the moment."}),(0,Lr.jsx)(ev,{children:"Popular Forum Posts"}),(0,Lr.jsx)(nv,{children:n.length>0?n.map((e=>(0,Lr.jsxs)(rv,{onClick:()=>A(`/forum/post/${e.id}`),children:[(0,Lr.jsx)(ov,{children:e.title}),(0,Lr.jsx)(iv,{children:e.userName}),(0,Lr.jsx)(av,{children:(0,Lr.jsxs)("span",{children:[e.commentCount," comments"]})})]},e.id))):(0,Lr.jsx)(Ev,{style:{padding:"20px 0"},children:"No popular posts yet"})})]}),(0,Lr.jsxs)(Xx,{children:[(0,Lr.jsxs)(Mx,{children:[(0,Lr.jsxs)(Dx,{onSubmit:t=>{if(t.preventDefault(),!e.trim())return void a(s.slice(0,5));const n=s.filter((t=>{const n=e.toLowerCase();return t.title&&t.title.toLowerCase().includes(n)||t.description&&t.description.toLowerCase().includes(n)}));a(n.slice(0,5))},children:[(0,Lr.jsx)(Ix,{children:(0,Lr.jsx)(it,{})}),(0,Lr.jsx)(_x,{type:"text",placeholder:"Search in Forum",value:e,onChange:e=>t(e.target.value)})]}),(0,Lr.jsxs)(Ux,{ref:E,children:[(0,Lr.jsxs)(Bx,{onClick:()=>S(!w),children:[(0,Lr.jsx)(Je,{size:16}),(0,Lr.jsx)(Qe,{size:16})]}),w&&(0,Lr.jsxs)(Wx,{children:[(0,Lr.jsx)(Hx,{selected:"newest"===k,onClick:()=>ye("newest"),children:"Newest first"}),(0,Lr.jsx)(Hx,{selected:"oldest"===k,onClick:()=>ye("oldest"),children:"Oldest first"}),(0,Lr.jsx)(Hx,{selected:"most-commented"===k,onClick:()=>ye("most-commented"),children:"Most commented"})]})]}),(0,Lr.jsxs)(qx,{ref:C,children:[(0,Lr.jsxs)(Vx,{onClick:()=>X(!J),children:[(0,Lr.jsx)(st,{size:16}),(0,Lr.jsx)(Qe,{size:16})]}),J&&(0,Lr.jsxs)(Kx,{children:[(0,Lr.jsx)(Yx,{selected:""===d,onClick:()=>xe({target:{value:""}}),children:"All Categories"}),U.map((e=>(0,Lr.jsx)(Yx,{selected:d===e.name,onClick:()=>xe({target:{value:e.name}}),children:e.name},e.categoryId)))]})]}),(0,Lr.jsx)(Gx,{onClick:()=>{N(!0),R(""),T(""),F(""),H([]),G("")},children:"Create Forum Post"})]}),(0,Lr.jsx)(tv,{children:"Recently Forum Posts"}),(0,Lr.jsx)(sv,{children:i.length>0?i.map(((e,t)=>(0,Lr.jsxs)(lv,{onClick:()=>A(`/forum/post/${e.id}`),children:[(0,Lr.jsx)(cv,{children:(0,Lr.jsxs)(uv,{children:[(0,Lr.jsx)(dv,{children:(0,Lr.jsx)("img",{src:e.userProfilePic,alt:"User avatar",onError:e=>{e.target.onerror=null,e.target.src=Ku},loading:"lazy"})}),(0,Lr.jsxs)(fv,{children:[(0,Lr.jsx)(pv,{children:e.userName}),(0,Lr.jsx)(hv,{children:e.timeAgo})]})]})}),(0,Lr.jsxs)(mv,{children:[(0,Lr.jsx)(gv,{children:e.title}),(0,Lr.jsx)(xv,{children:e.description.length>300?`${e.description.substring(0,300)}...`:e.description})]}),(0,Lr.jsxs)(vv,{children:[(0,Lr.jsx)(yv,{children:(0,Lr.jsxs)(bv,{children:[e.commentCount," comment",1!==e.commentCount?"s":""]})}),(0,Lr.jsx)(wv,{children:e.tags&&e.tags.length>0?e.tags.map(((e,t)=>(0,Lr.jsx)(Kv,{$categoryColor:_[e]||null,children:e},t))):(0,Lr.jsx)(Kv,{children:"General"})})]})]},`recent-${e.id}`))):(0,Lr.jsx)(jv,{children:(0,Lr.jsx)(Ev,{children:"No forum posts available"})})}),(0,Lr.jsxs)(Yv,{children:[(0,Lr.jsxs)(Gv,{to:"#",className:"prev",onClick:()=>ve(x-1),style:{visibility:x>0?"visible":"hidden"},children:[(0,Lr.jsx)(Ge,{style:{transform:"rotate(180deg)",marginRight:"4px"}})," Previous"]}),(0,Lr.jsx)(Qv,{children:[...Array(y).keys()].map((e=>(0,Lr.jsx)(Jv,{to:"#",className:x===e?"active":"",onClick:()=>ve(e),children:e+1},e)))}),(0,Lr.jsxs)(Gv,{to:"#",className:"next",onClick:()=>ve(x+1),style:{visibility:x<y-1?"visible":"hidden"},children:["Next ",(0,Lr.jsx)(Ge,{style:{marginLeft:"4px"}})]})]})]})]})]}),P&&(0,Lr.jsx)(Cv,{children:(0,Lr.jsxs)(Av,{ref:Q,children:[(0,Lr.jsxs)(Pv,{children:[(0,Lr.jsx)(Nv,{children:"Create a New Post"}),(0,Lr.jsx)(zv,{onClick:()=>N(!1),children:(0,Lr.jsx)(ct,{})})]}),(0,Lr.jsxs)(Rv,{children:[(0,Lr.jsx)(Ov,{children:"Title"}),(0,Lr.jsx)(Tv,{type:"text",placeholder:"Enter a descriptive title",value:z,onChange:e=>R(e.target.value)}),(0,Lr.jsx)(Ov,{children:"Category"}),(0,Lr.jsxs)(Fv,{value:L,onChange:e=>{F(e.target.value)},children:[(0,Lr.jsx)("option",{value:"",disabled:!0,children:"Select a category"}),U.map((e=>(0,Lr.jsx)("option",{value:e.categoryId,children:e.name},e.categoryId)))]}),(0,Lr.jsx)(Ov,{children:"Content"}),(0,Lr.jsx)(Lv,{placeholder:"Share your thoughts, questions, or ideas...",value:O,onChange:e=>T(e.target.value)}),(0,Lr.jsx)("input",{type:"file",multiple:!0,accept:"image/*,video/*",ref:q,onChange:e=>{const t=Array.from(e.target.files);W.length+t.length>10?G("You can upload a maximum of 10 media files."):(H((e=>[...e,...t])),G(""),q.current&&(q.current.value=""))},style:{display:"none"}}),W.length>0&&(0,Lr.jsxs)(Mv,{children:[(0,Lr.jsxs)(Ov,{style:{marginBottom:"5px"},children:["Selected Files (",W.length,"/10):"]}),(0,Lr.jsx)(Dv,{children:W.map(((e,t)=>(0,Lr.jsxs)(_v,{children:[(0,Lr.jsxs)(Iv,{children:[e.name," (",(e.size/1024).toFixed(1)," KB)"]}),(0,Lr.jsx)(Uv,{onClick:()=>{return t=e.name,void H((e=>e.filter((e=>e.name!==t))));var t},children:(0,Lr.jsx)(ct,{size:14})})]},t)))})]}),Y&&(0,Lr.jsx)(Bv,{children:Y})]}),(0,Lr.jsxs)(Wv,{children:[(0,Lr.jsxs)(Hv,{onClick:()=>{q.current&&q.current.click()},disabled:V,children:[(0,Lr.jsx)(Ze,{}),"Add Media (Max 5)"]}),(0,Lr.jsx)(qv,{onClick:async()=>{if(z.trim())if(O.trim())if(L){K(!0),G(""),le(!0),ue("loading"),fe("Checking post...");try{const t=localStorage.getItem("token");if(!t)return A("/login",{state:{from:"/forum",message:"Please log in to create a post"}}),K(!1),void le(!1);let n;if(W.length>0){const e=new FormData;e.append("title",z),e.append("description",O),e.append("categoryId",L),W.forEach((t=>{e.append("mediaFiles",t)})),n=await Ar.post("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/with-media",e,{headers:{Authorization:`Bearer ${t}`}})}else n=await Ar.post("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts",{title:z,description:O,categoryId:L},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});var e;if(!n||200!==n.status&&201!==n.status)G((null===(e=n.data)||void 0===e?void 0:e.message)||"Failed to create post. Unexpected response."),K(!1),ue("error"),fe("Failed to create post. Please try again."),setTimeout((()=>{le(!1)}),3e3);else N(!1),K(!1),le(!1),ne("Forum post published successfully!"),setTimeout((()=>{ne("")}),5e3),$((e=>e+1))}catch(a){var t,n,r,o,i;console.error("Error creating forum post:",a),K(!1),ue("error"),null!==(t=a.response)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&null!==(r=n.message)&&void 0!==r&&r.includes("toxic")?(fe("Your post contains inappropriate content. Please revise and try again."),G("Please ensure your content follows community guidelines.")):401===(null===(o=a.response)||void 0===o?void 0:o.status)||403===(null===(i=a.response)||void 0===i?void 0:i.status)?(fe("Authentication error. Please log in again."),G("Authentication error. Please log in again.")):(fe("Failed to submit post. Please try again."),G("Failed to submit post. Please try again.")),setTimeout((()=>{le(!1)}),3e3)}}else G("Please select a category for your post");else G("Please enter content for your post");else G("Please enter a title for your post")},disabled:V,children:V?(0,Lr.jsx)(Xv,{}):(0,Lr.jsxs)(Lr.Fragment,{children:["Post ",(0,Lr.jsx)(at,{})]})})]})]})}),se&&(0,Lr.jsx)(Cv,{children:(0,Lr.jsx)(ey,{children:"loading"===ce?(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(ty,{}),(0,Lr.jsx)(ny,{children:"Under review"})]}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(ry,{children:"\u26a0\ufe0f"}),(0,Lr.jsx)(ny,{type:"error",children:de})]})})})]})};function iy(){return iy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},iy.apply(null,arguments)}var ay=r.useLayoutEffect,sy=function(e,t){"function"!==typeof e?e.current=t:e(t)},ly={"min-height":"0","max-height":"none",height:"0",visibility:"hidden",overflow:"hidden",position:"absolute","z-index":"-1000",top:"0",right:"0",display:"block"},cy=function(e){Object.keys(ly).forEach((function(t){e.style.setProperty(t,ly[t],"important")}))},uy=null,dy=function(e,t){var n=e.scrollHeight;return"border-box"===t.sizingStyle.boxSizing?n+t.borderSize:n-t.paddingSize};var fy=function(){},py=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth","boxSizing","fontFamily","fontSize","fontStyle","fontWeight","letterSpacing","lineHeight","paddingBottom","paddingLeft","paddingRight","paddingTop","tabSize","textIndent","textRendering","textTransform","width","wordBreak","wordSpacing","scrollbarGutter"],hy=!!document.documentElement.currentStyle,my=function(e){var t=window.getComputedStyle(e);if(null===t)return null;var n,r=(n=t,py.reduce((function(e,t){return e[t]=n[t],e}),{})),o=r.boxSizing;return""===o?null:(hy&&"border-box"===o&&(r.width=parseFloat(r.width)+parseFloat(r.borderRightWidth)+parseFloat(r.borderLeftWidth)+parseFloat(r.paddingRight)+parseFloat(r.paddingLeft)+"px"),{sizingStyle:r,paddingSize:parseFloat(r.paddingBottom)+parseFloat(r.paddingTop),borderSize:parseFloat(r.borderBottomWidth)+parseFloat(r.borderTopWidth)})};function gy(e,t,n){var o=function(e){var t=r.useRef(e);return ay((function(){t.current=e})),t}(n);r.useLayoutEffect((function(){var n=function(e){return o.current(e)};if(e)return e.addEventListener(t,n),function(){return e.removeEventListener(t,n)}}),[])}var xy=["cacheMeasurements","maxRows","minRows","onChange","onHeightChange"],vy=function(e,t){var n=e.cacheMeasurements,o=e.maxRows,i=e.minRows,a=e.onChange,s=void 0===a?fy:a,l=e.onHeightChange,c=void 0===l?fy:l,u=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}(e,xy),d=void 0!==u.value,f=r.useRef(null),p=function(e,t){var n=r.useRef();return r.useCallback((function(r){e.current=r,n.current&&sy(n.current,null),n.current=t,t&&sy(t,r)}),[t])}(f,t),h=r.useRef(0),m=r.useRef(),g=function(){var e=f.current,t=n&&m.current?m.current:my(e);if(t){m.current=t;var r=function(e,t,n,r){void 0===n&&(n=1),void 0===r&&(r=1/0),uy||((uy=document.createElement("textarea")).setAttribute("tabindex","-1"),uy.setAttribute("aria-hidden","true"),cy(uy)),null===uy.parentNode&&document.body.appendChild(uy);var o=e.paddingSize,i=e.borderSize,a=e.sizingStyle,s=a.boxSizing;Object.keys(a).forEach((function(e){var t=e;uy.style[t]=a[t]})),cy(uy),uy.value=t;var l=dy(uy,e);uy.value=t,l=dy(uy,e),uy.value="x";var c=uy.scrollHeight-o,u=c*n;"border-box"===s&&(u=u+o+i),l=Math.max(u,l);var d=c*r;return"border-box"===s&&(d=d+o+i),[l=Math.min(d,l),c]}(t,e.value||e.placeholder||"x",i,o),a=r[0],s=r[1];h.current!==a&&(h.current=a,e.style.setProperty("height",a+"px","important"),c(a,{rowHeight:s}))}};return r.useLayoutEffect(g),function(e,t){gy(document.body,"reset",(function(n){e.current.form===n.target&&t(n)}))}(f,(function(){if(!d){var e=f.current.value;requestAnimationFrame((function(){var t=f.current;t&&e!==t.value&&g()}))}})),function(e){gy(window,"resize",e)}(g),function(e){gy(document.fonts,"loadingdone",e)}(g),r.createElement("textarea",iy({},u,{onChange:function(e){d||g(),s(e)},ref:p}))},yy=r.forwardRef(vy);const by=Oa`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`,wy=e=>{var t;let{comment:n,replyingTo:r,replyTexts:o,handleReplyTextChange:i,setReplyingTo:a,handleSubmitReply:s,defaultProfilePic:l,isReply:c=!1}=e;return(0,Lr.jsxs)(nb,{$isReply:c,children:[(0,Lr.jsxs)(rb,{children:[(0,Lr.jsx)(ob,{$isReply:c,children:(0,Lr.jsx)("img",{src:n.userProfilePic||l,alt:n.userName,onError:e=>{e.target.onerror=null,e.target.src=l}})}),(0,Lr.jsxs)(ib,{children:[(0,Lr.jsxs)(ab,{children:[(0,Lr.jsx)(sb,{children:n.userName}),(0,Lr.jsx)(lb,{children:n.timeAgo})]}),(0,Lr.jsx)(cb,{children:n.content}),(0,Lr.jsx)(ub,{children:!c&&(0,Lr.jsxs)(db,{onClick:()=>a(r===n.id?null:n.id),className:r===n.id?"active":"",children:[(0,Lr.jsx)(rt,{size:14}),(0,Lr.jsx)("span",{children:"Reply"})]})})]})]}),!c&&r===n.id&&(0,Lr.jsx)(fb,{children:(0,Lr.jsxs)(Xy,{onSubmit:e=>{e.preventDefault(),s(n.id)},children:[(0,Lr.jsx)(Zy,{placeholder:"Write a reply...",value:o[n.id]||"",onChange:e=>i(n.id,e.target.value),minRows:1,maxRows:20,autoFocus:!0}),(0,Lr.jsx)($y,{type:"submit",disabled:!(null!==(t=o[n.id])&&void 0!==t&&t.trim()),children:(0,Lr.jsx)(at,{})})]})}),n.replies&&n.replies.length>0&&(0,Lr.jsx)(pb,{children:n.replies.map((e=>(0,Lr.jsx)(wy,{comment:e,replyingTo:r,replyTexts:o,handleReplyTextChange:i,setReplyingTo:a,handleSubmitReply:s,defaultProfilePic:l,isReply:!0},e.id)))})]})},Sy=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`,ky=za.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`,jy=za.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`,Ey=za.div`
  flex: 0 0 70%;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`,Cy=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`,Ay=za.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  overflow: hidden;
`,Py=za.div`
  padding: 15px;
  position: relative;
  border-bottom: 1px solid #F2F4F7;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isActive?"#F0F4FF":"#fff"};
  
  &:hover {
    background-color: ${e=>e.$isActive?"#F0F4FF":"#F9FAFB"};
    box-shadow: 0 2px 4px rgba(16, 24, 40, 0.1);
    transform: translateY(-1px);
    z-index: 1;
    margin: 0 -1px;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,Ny=za.div`
  font-size: 12px;
  color: #667085;
  margin-bottom: 6px;
`,zy=za.h3`
  font-size: 15px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 8px 0;
  line-height: 1.3;
`,Ry=za.div`
  font-size: 12px;
  color: #667085;
`,Oy=za.button`
  background: none;
  border: none;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #EFF6FF;
    color: #172554;
  }

  &:active {
      transform: translateY(1px);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 5px 8px;
    margin-bottom: 15px;
  }
`,Ty=za.div`
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`,Ly=za.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,Fy=za.div`
  display: flex;
  align-items: center;
`,My=za.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    loading: lazy;
  }
`,Dy=za.div`
  display: flex;
  flex-direction: column;
`,_y=za.div`
  font-weight: 500;
  color: #101828;
  margin-bottom: 4px;
`,Iy=za.div`
  font-size: 12px;
  color: #667085;
`,Uy=za.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,By=za.span`
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${e=>e.$categoryColor||"#475467"};
  background-color: ${e=>e.$categoryColor?e.$categoryColor+"33":"#e9ecef"};

  &:hover {
    background-color: ${e=>e.$categoryColor?e.$categoryColor+"55":"#d8dde1"};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 8px;
  }
`,Wy=za.div`
  margin-bottom: 20px;
`,Hy=za.h1`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 12px 0;
  }
`,qy=za.div`
  font-size: 16px;
  color: #344054;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`,Vy=za.img.attrs({loading:"lazy"})`
  max-width: 70%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  margin-top: 10px;
  cursor: zoom-in;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 8px;
  }
`,Ky=za.video.attrs({preload:"none"})`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  display: block; // Ensure video takes its own line
`,Yy=za.div`
  display: flex;
  flex-direction: column; // Display media vertically
  gap: 15px; // Add some space between media items
  margin-top: 20px;
`,Gy=za.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #F2F4F7;
  padding-top: 15px;
`,Qy=za.div`
  font-size: 14px;
  color: #667085;
`,Jy=za.div`
  margin-top: 40px;
  background: #FFFFFF;
  border: 1px solid #E4E7EC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
    border-radius: 8px;
  }
`,Xy=za.form`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,Zy=za(yy)`
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  font-size: 15px;
  resize: none;
  min-height: 44px;
  line-height: 1.5;
  background-color: #FFFFFF;

  &:focus {
    outline: none;
    border-color: #1570EF;
    box-shadow: 0 0 0 2px rgba(21, 112, 239, 0.1);
  }

  &::placeholder {
    color: #98A2B3;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
    min-height: 40px;
  }
`,$y=za.button`
  background: none;
  border: none;
  color: #1570EF;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 44px;
  width: 44px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: #0D5ECB;
    background-color: rgba(21, 112, 239, 0.08);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    color: #98A2B3;
    cursor: not-allowed;
  }
`,eb=za.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 24px 0 24px 0;
  padding: 0 0 16px 0;
  border-bottom: 1px solid #E4E7EC;
`,tb=za.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,nb=za.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.$isReply?"20px":"24px"};
  padding: ${e=>e.$isReply?"0":"32px 0"};
  border-bottom: ${e=>e.$isReply?"none":"1px solid #E4E7EC"};
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: ${e=>e.$isReply?"16px":"20px"};
    padding: ${e=>e.$isReply?"0":"24px 0"};
  }
`,rb=za.div`
  display: flex;
  gap: 16px;
  width: 100%;
`,ob=za.div`
  width: ${e=>e.$isReply?"36px":"40px"};
  height: ${e=>e.$isReply?"36px":"40px"};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    loading: lazy;
  }
`,ib=za.div`
  flex-grow: 1;
  min-width: 0;
  padding-right: 16px;
`,ab=za.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`,sb=za.div`
  font-weight: 600;
  color: #101828;
  font-size: 15px;
`,lb=za.div`
  font-size: 13px;
  color: #667085;
`,cb=za.p`
  margin: 0;
  font-size: 15px;
  color: #344054;
  line-height: 1.6;
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`,ub=za.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
  margin-left: -10px;
`,db=(za.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: #E94A65;
    background-color: rgba(233, 74, 101, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(233, 74, 101, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: width 0.4s ease-out, height 0.4s ease-out;
  }

  &:active:before {
    width: 150%;
    height: 150%;
  }

  &.liked {
    color: #E94A65;
    background-color: rgba(233, 74, 101, 0.08);
    font-weight: 600;

    svg {
      transform: scale(1.1);
    }
  }
`,za.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover, &.active {
    color: #1570EF;
    background-color: rgba(21, 112, 239, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(21, 112, 239, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: width 0.4s ease-out, height 0.4s ease-out;
  }

  &:active:before {
    width: 150%;
    height: 150%;
  }

  &.active {
    font-weight: 600;

    svg {
      transform: scale(1.1);
    }
  }
`),fb=za.div`
  margin-left: 56px;
  margin-top: 12px;
  margin-bottom: 16px;
  position: relative;
  width: calc(100% - 56px);
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
`,pb=za.div`
  margin-left: 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-left: 28px;
  width: calc(100% - 56px);

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 16px;
    width: 2px;
    background-color: #E4E7EC;
  }

  @media (max-width: 768px) {
    margin-left: 40px;
    padding-left: 20px;
    width: calc(100% - 40px);
    gap: 16px;
  }
`,hb=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 30px 0;
  color: #667085;
  font-size: 14px;
  font-weight: 500;
  border: 1px dashed #E4E7EC;
  border-radius: 8px;
`,mb=za.p`
  color: #667085;
  text-align: center;
  padding: 20px 0;
  font-style: italic;
`,gb=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`,xb=za.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,vb=za.div`
  color: #d92d20;
  background-color: #fef3f2;
  border: 1px solid #fecdca;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`,yb=za.button`
  background-color: #1570EF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #0d5ecb;
  }
`,bb=za.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; // Ensure it's above other elements
  cursor: pointer;
`,wb=za.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default; // Prevent overlay cursor on the image itself
`,Sb=za.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: modalAppear 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
    width: 85%;
  }

  @keyframes modalAppear {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`,kb=za.h3`
  margin: 0 0 12px 0;
  color: #101828;
  font-size: 18px;
  font-weight: 600;
`,jb=za.p`
  margin: 0 0 24px 0;
  color: #475467;
  font-size: 14px;
  line-height: 1.5;
`,Eb=za.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Cb=za.button`
  padding: 8px 16px;
  border: 1px solid #D0D5DD;
  background: white;
  color: #344054;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #F9FAFB;
    border-color: #98A2B3;
  }
`,Ab=za.button`
  padding: 8px 16px;
  border: none;
  background: #1849A9;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1237A3;
  }
`,Pb=za.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,Nb=za.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`,zb=za.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1849A9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`,Rb=za.p`
  margin: 0;
  color: ${e=>"error"===e.type?"#B42318":"#101828"};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`,Ob=za.div`
  font-size: 24px;
`,Tb=za.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`,Lb=za.div`
  color: #667085;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  background: #F9FAFB;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  margin-bottom: 30px;
  line-height: 1.5;
`,Fb=()=>{const{postId:e}=ne(),t=te(),[n,o]=(0,r.useState)(null),[i,a]=(0,r.useState)(!0),[s,l]=(0,r.useState)(null),[c,u]=(0,r.useState)([]),[d,f]=(0,r.useState)(!1),[p,h]=(0,r.useState)(null),[m,g]=(0,r.useState)(""),[x,v]=(0,r.useState)([]),[y,b]=(0,r.useState)({}),[w,S]=(0,r.useState)(null),[k,j]=(0,r.useState)(null),[E,C]=(0,r.useState)({}),[A,P]=(0,r.useState)(!1),[N,z]=(0,r.useState)([]),[R,O]=(0,r.useState)(!1),[T,L]=(0,r.useState)(!1),[F,M]=(0,r.useState)("loading"),[D,_]=(0,r.useState)("Checking comment..."),[I,U]=(0,r.useState)(""),[B,W]=(0,r.useState)(null),[H,q]=(0,r.useState)(!0),V=(0,r.useCallback)((async e=>{f(!0),h(null);try{console.log("Fetching comments for post:",e);const t=localStorage.getItem("token"),n={Accept:"application/json","Content-Type":"application/json"};t&&(n.Authorization=`Bearer ${t}`),console.log("Making request with headers:",n);const r=await Ar.get(`https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-comments/post/${e}/all`,{headers:n});if(console.log("Raw response:",r),console.log("Response status:",r.status),console.log("Response headers:",r.headers),console.log("Response data type:",typeof r.data),console.log("Response data:",JSON.stringify(r.data,null,2)),r&&r.data){let e=r.data;console.log("Initial commentsData type:",typeof e),console.log("Initial commentsData:",e),Array.isArray(e)||(e.content?(e=e.content,console.log("Using content property:",e)):e.comments?(e=e.comments,console.log("Using comments property:",e)):e.data&&(e=e.data,console.log("Using data property:",e))),Array.isArray(e)||(console.warn("Comments data is not an array after all checks:",e),e=[]),console.log("Final commentsData before mapping:",e);const t=e.map((e=>(console.log("Processing comment:",e),{id:e.commentId||e.id,content:e.description||e.content,createdAt:e.createdAt,timeAgo:J(e.createdAt),userName:e.creatorName||e.userName||"Anonymous",userProfilePic:e.creatorPicture||e.userProfilePic||Ku,likes:e.likes||0,isLiked:e.isLiked||!1,replies:Array.isArray(e.replies)?e.replies.map((e=>({id:e.commentId||e.id,content:e.description||e.content,createdAt:e.createdAt,timeAgo:J(e.createdAt),userName:e.creatorName||e.userName||"Anonymous",userProfilePic:e.creatorPicture||e.userProfilePic||Ku,likes:e.likes||0,isLiked:e.isLiked||!1}))):[]})));console.log("Final formatted comments:",t),u(t)}else console.log("No comments data in response"),u([])}catch(r){var t,n;console.error("Error fetching comments:",r),console.error("Error details:",{message:r.message,response:r.response,request:r.request}),401===(null===(t=r.response)||void 0===t?void 0:t.status)||403===(null===(n=r.response)||void 0===n?void 0:n.status)?h("Please log in to view comments."):h("Failed to load comments.")}finally{f(!1)}}),[]);(0,r.useEffect)((()=>{(async()=>{try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories");if(e&&e.data){const t=e.data.reduce(((e,t)=>(t.name&&t.color&&(e[t.name]=t.color),e)),{});b(t)}else b({})}catch(s){console.error("Error fetching categories:",s),b({})}})(),(async()=>{a(!0),l(null);try{console.log("Fetching post with ID:",e);const t=await Ar.get(`https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/${e}`);if(console.log("Forum post response:",t),t&&t.data){const r=t.data;console.log("Raw post data received from backend:",r),o({id:r.forumPostID,title:r.title,description:r.description,media:r.mediaList||[],commentCount:r.commentCount||0,createdBy:r.createdBy,createdByType:r.createdByType,createdAt:r.createdAt,formattedDate:Q(r.createdAt),timeAgo:J(r.createdAt),updatedAt:r.updatedAt,tags:r.category?[r.category.name]:[],userName:r.creatorName||"Anonymous",userProfilePic:r.creatorProfilePic||Ku}),V(r.forumPostID||e);try{const t=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts");if(t&&t.data){const n=t.data.map((e=>({id:e.forumPostID,title:e.title,description:e.description,commentCount:e.commentCount||0,createdAt:e.createdAt,timeAgo:J(e.createdAt),userName:e.creatorName||"Anonymous"}))),r=[...n].sort(((e,t)=>t.commentCount-e.commentCount)).slice(0,10).filter((t=>t.id!==parseInt(e)));v(r)}}catch(n){console.error("Error fetching all posts:",n)}}else l("No post data returned from server")}catch(r){if(console.error("Error fetching forum post:",r),r.response)if(console.error("Error response data:",r.response.data),console.error("Error response status:",r.response.status),404===r.response.status)l("Forum post not found. It may have been deleted or never existed.");else if(403===r.response.status)l("You do not have permission to view this post.");else{var t;l(`Error loading post: ${(null===(t=r.response.data)||void 0===t?void 0:t.message)||r.response.statusText}`)}else r.request?(console.error("Error request:",r.request),l("Could not connect to the server. Please check your internet connection.")):(console.error("Error message:",r.message),l("Failed to load the forum post. Please try again later."))}finally{a(!1)}})()}),[e,t]);const K=async()=>{const t=localStorage.getItem("token");if(t)try{const n=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/recommendations/forum-posts",{headers:{Authorization:`Bearer ${t}`}});if(n&&n.data){const t=n.data.filter((t=>t.forumPostId!==parseInt(e))),r=t.map((e=>({id:e.forumPostId,title:e.title,categoryName:e.categoryName,commentCount:e.commentCount||0,similarityScore:e.similarityScore})));z(r),console.log("Recommendations loaded:",r)}else z([])}catch(n){console.error("Error fetching recommendations:",n),z([])}else z([])};(0,r.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token");if(!e)return void q(!0);const t=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/user/interaction-count",{headers:{Authorization:`Bearer ${e}`}});q(t.data.interactionCount<5)}catch(e){console.error("Error checking cold start:",e),q(!0)}})()}),[]);const Y=(e,t)=>{C((n=>({...n,[e]:t})))},G=async t=>{const n=E[t];if(null===n||void 0===n||!n.trim())return;const r=localStorage.getItem("token");if(r){h(null);try{await Ar.post("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-comments",{forumPostID:parseInt(e),description:n,parentCommentID:t},{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),C((e=>({...e,[t]:""}))),j(null),V(e)}catch(s){var o,i;if(console.error("Error submitting reply:",s),401===(null===(o=s.response)||void 0===o?void 0:o.status)||403===(null===(i=s.response)||void 0===i?void 0:i.status))h("Authentication error or insufficient permissions. Please log in again.");else if(s.response){var a;h(`Error: ${(null===(a=s.response.data)||void 0===a?void 0:a.message)||"Failed to submit reply."}`)}else h("Failed to submit reply. Please check your connection and try again.")}}else P(!0)},Q=e=>{if(!e)return"Unknown date";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},J=e=>{if(!e)return"Unknown time";const t=new Date(e),n=new Date,r=Math.floor((n-t)/1e3);if(r<60)return`${r} second${1!==r?"s":""} ago`;const o=Math.floor(r/60);if(o<60)return`${o} minute${1!==o?"s":""} ago`;const i=Math.floor(o/60);if(i<24)return`${i} hour${1!==i?"s":""} ago`;const a=Math.floor(i/24);if(a<30)return`${a} day${1!==a?"s":""} ago`;const s=Math.floor(a/30);if(s<12)return`${s} month${1!==s?"s":""} ago`;const l=Math.floor(s/12);return`${l} year${1!==l?"s":""} ago`};return i?(0,Lr.jsx)(Sy,{children:(0,Lr.jsx)(gb,{children:(0,Lr.jsx)(xb,{})})}):s||!n?(0,Lr.jsx)(Sy,{children:(0,Lr.jsxs)(vb,{children:[s||"Post not found. It may have been removed or is unavailable.",(0,Lr.jsx)(yb,{onClick:()=>t("/forum"),children:"Back to Forum"})]})}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(by,{}),(0,Lr.jsx)(Sy,{children:(0,Lr.jsxs)(ky,{children:[(0,Lr.jsxs)(jy,{children:[(0,Lr.jsx)(Tb,{children:"Recommendations"}),H?(0,Lr.jsx)(Lb,{children:"You can see suggested posts by commenting and liking the posts."}):N.length>0?(0,Lr.jsx)(Ay,{children:N.map((n=>(0,Lr.jsxs)(Py,{onClick:()=>t(`/forum/post/${n.id}`),$isActive:n.id===parseInt(e),children:[(0,Lr.jsx)(zy,{children:n.title}),n.categoryName&&(0,Lr.jsx)(By,{$categoryColor:y[n.categoryName]||null,children:n.categoryName}),(0,Lr.jsx)(Ry,{children:(0,Lr.jsxs)("span",{children:[n.commentCount," comments"]})})]},n.id)))}):(0,Lr.jsx)(Lb,{children:"No recommendations available at the moment."}),(0,Lr.jsx)(Cy,{children:"Popular Forum Posts"}),(0,Lr.jsx)(Ay,{children:x.length>0?x.map((n=>(0,Lr.jsxs)(Py,{onClick:()=>t(`/forum/post/${n.id}`),$isActive:n.id===parseInt(e),children:[(0,Lr.jsx)(zy,{children:n.title}),(0,Lr.jsx)(Ny,{children:n.userName}),(0,Lr.jsx)(Ry,{children:(0,Lr.jsxs)("span",{children:[n.commentCount," comments"]})})]},n.id))):(0,Lr.jsx)(mb,{style:{padding:"20px 0"},children:"No popular posts yet"})})]}),(0,Lr.jsxs)(Ey,{children:[(0,Lr.jsxs)(Oy,{onClick:()=>t("/forum"),children:[(0,Lr.jsx)(Ye,{size:16})," Back to Forum"]}),(0,Lr.jsxs)(Ty,{children:[(0,Lr.jsxs)(Ly,{children:[(0,Lr.jsxs)(Fy,{children:[(0,Lr.jsx)(My,{children:(0,Lr.jsx)("img",{src:n.userProfilePic||Ku,alt:"User avatar",onError:e=>{e.target.onerror=null,e.target.src=Ku}})}),(0,Lr.jsxs)(Dy,{children:[(0,Lr.jsx)(_y,{children:n.userName}),(0,Lr.jsx)(Iy,{children:n.timeAgo})]})]}),(0,Lr.jsx)(Uy,{children:n.tags&&n.tags.length>0?n.tags.map(((e,t)=>(0,Lr.jsx)(By,{$categoryColor:y[e]||null,children:e},t))):(0,Lr.jsx)(By,{children:"General"})})]}),(0,Lr.jsxs)(Wy,{children:[(0,Lr.jsx)(Hy,{children:n.title}),(0,Lr.jsx)(qy,{children:n.description}),Array.isArray(n.media)&&n.media.length>0&&(0,Lr.jsx)(Yy,{children:n.media.map(((e,t)=>null!=e.match(/\.(jpeg|jpg|gif|png)$/)?(0,Lr.jsx)(Vy,{src:e,alt:`Post media ${t+1}`,onClick:()=>S(e)},t):null!=e.match(/\.(mp4|webm|ogg)$/)?(0,Lr.jsx)(Ky,{src:e,controls:!0,preload:"none"},t):null))})]}),(0,Lr.jsx)(Gy,{children:(0,Lr.jsxs)(Qy,{children:[n.commentCount," comment",1!==n.commentCount?"s":""]})})]}),(0,Lr.jsxs)(Jy,{children:[(0,Lr.jsxs)(Xy,{onSubmit:async n=>{if(n.preventDefault(),!m.trim())return;const r=localStorage.getItem("token");if(r){h(null),O(!0),L(!0),M("loading"),_("Checking comment...");try{const t=await Ar.post("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-comments",{forumPostID:parseInt(e),description:m},{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});console.log("Comment submitted successfully:",t.data),g(""),L(!1),await V(e),await K(),o((e=>({...e,commentCount:(e.commentCount||0)+1})))}catch(u){var i,a,s,l,c;console.error("Error submitting comment:",u),M("error"),null!==(i=u.response)&&void 0!==i&&null!==(a=i.data)&&void 0!==a&&null!==(s=a.message)&&void 0!==s&&s.includes("toxic")?(_("Your comment contains inappropriate content. Please revise and try again."),h("Please ensure your comment follows community guidelines.")):401===(null===(l=u.response)||void 0===l?void 0:l.status)||403===(null===(c=u.response)||void 0===c?void 0:c.status)?(_("Authentication error. Please log in again."),h("Authentication error. Please log in again.")):(_("Failed to submit comment. Please try again."),h("Failed to submit comment. Please try again.")),setTimeout((()=>{L(!1)}),3e3)}finally{O(!1)}}else t("/login",{state:{from:`/forum/post/${e}`,message:"Please log in to comment"}})},children:[(0,Lr.jsx)(Zy,{placeholder:"Write a comment...",value:m,onChange:e=>g(e.target.value),minRows:1,maxRows:20}),(0,Lr.jsx)($y,{type:"submit",disabled:!m.trim(),children:(0,Lr.jsx)(at,{})})]}),p&&(0,Lr.jsx)(vb,{style:{marginTop:"10px"},children:p}),(0,Lr.jsxs)(eb,{children:["Comments (",c.length,")"]}),(0,Lr.jsx)(tb,{children:d?(0,Lr.jsx)(gb,{children:(0,Lr.jsx)(xb,{})}):c.length>0?c.map((e=>(0,Lr.jsx)(wy,{comment:e,replyingTo:k,replyTexts:E,handleReplyTextChange:Y,setReplyingTo:j,handleSubmitReply:G,defaultProfilePic:Ku},e.id))):!p&&(0,Lr.jsxs)(hb,{children:[(0,Lr.jsx)(rt,{size:18})," No comments yet. Be the first to comment!"]})})]})]})]})}),A&&(0,Lr.jsx)(Pb,{onClick:()=>P(!1),children:(0,Lr.jsxs)(Sb,{onClick:e=>e.stopPropagation(),children:[(0,Lr.jsx)(kb,{children:"Sign in Required"}),(0,Lr.jsx)(jb,{children:"You need to be signed in to participate in discussions. Would you like to sign in or create an account?"}),(0,Lr.jsxs)(Eb,{children:[(0,Lr.jsx)(Cb,{onClick:()=>P(!1),children:"Cancel"}),(0,Lr.jsx)(Ab,{onClick:()=>t("/login",{state:{from:`/forum/post/${e}`,message:"Please log in to comment"}}),children:"Sign in / Sign up"})]})]})}),w&&(0,Lr.jsx)(bb,{onClick:()=>S(null),children:(0,Lr.jsx)(wb,{src:w,alt:"Zoomed post media"})}),T&&(0,Lr.jsx)(Pb,{children:(0,Lr.jsx)(Nb,{children:"loading"===F?(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(zb,{}),(0,Lr.jsx)(Rb,{children:"Under review"})]}):(0,Lr.jsxs)(Lr.Fragment,{children:[(0,Lr.jsx)(Ob,{children:"\u26a0\ufe0f"}),(0,Lr.jsx)(Rb,{type:"error",children:D})]})})})]})},Mb=n.p+"static/media/home.43ecd9dad5ec596a8270.png",Db=n.p+"static/media/home2.12ed5b6df67b0c677b46.png",_b=n.p+"static/media/our.bccd72dbb609e681a525.png",Ib=e=>{if(!e||"N/A"===e)return"N/A";const t=new Date(e);if(isNaN(t.getTime()))return console.warn("Invalid date string received:",e),"Invalid Date";const n=new Date,r=Math.floor((n-t)/1e3),o=Math.floor(r/3600);if(o<1){const e=Math.floor(r/60);return e<1?"Just now":`${e}m ago`}return o<24?`${o}h ago`:t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})},Ub=[{id:1,logo:tc,name:"Cankaya Universitesi",country:"T\xfcrkiye",role:"Project Coordinator",address:"Yukariyurtcu Mahallesi Mimar Sinan Caddesi No:4, 06815, Etimesgut/ANKARA",phone:"+90 312 233 10 00",email:"webadmin@cankaya.edu.tr",website:"https://www.cankaya.edu.tr/index_en.php"},{id:2,logo:oc,name:"TED Universitesi",country:"T\xfcrkiye",role:null,address:"Ziya G\xf6kalp Caddesi No:48 06420, Kolej \xc7ankaya/ANKARA",phone:"+90 (312) 585 00 00",email:"info@tedu.edu.tr",website:"https://www.tedu.edu.tr/en"},{id:3,logo:rc,name:"Fundacion Universidad Francisco De Vitoria",country:"Spain",role:null,address:"Ctra. Pozuelo-Majadahonda KM 1.800, 28223 Pozuelo de Alarc\xf3n (Madrid)",phone:"+34 91 709 14 00",email:"info@ufv.es",website:"https://www.ufv.es/en/"},{id:4,logo:nc,name:"Open Universiteit",country:"Netherlands",role:null,address:"Valkenburgerweg 177, 6419 AT Heerlen",phone:"+31 (0)45 576 28 88",email:"info@ou.nl",website:"https://www.ou.nl/en"}],Bb=za.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`,Wb=za.section`
  background-image: url(${Mb});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 768px) {
    min-height: 450px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-height: 400px;
  }
`,Hb=za.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
`,qb=za.div`
  width: 60%;
  padding-left: 50px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 992px) {
    width: 80%;
    padding-left: 30px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`,Vb=za.h1`
  font-size: 72px;
  line-height: 1;
  margin-bottom: 30px;
  
  @media (max-width: 992px) {
    font-size: 60px;
  }
  
  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 36px;
  }
`,Kb=za.span`
  color: #6B7DD1;
  font-weight: 700;
  display: block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`,Yb=za.span`
  color: white;
  font-weight: 700;
  display: block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`,Gb=za.p`
  color: white;
  font-size: 16px;
  line-height: 1.6;
  margin-top: 170px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 992px) {
    margin-top: 120px;
  }

  @media (max-width: 768px) {
    margin-top: 80px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 60px;
    font-size: 14px;
  }
`,Qb=(za(ze)`
  display: inline-block;
  background: linear-gradient(to right, #1e3c7a, #2a4b8d, #3a5ca0);
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: linear-gradient(to right, #18325e, #1a3a7d, #2a4c8f);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`,za.section`
  margin: 60px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 40px 0;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    margin: 30px 0;
    padding: 0 10px;
  }
`),Jb=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`,Xb=za.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Zb=za(ze)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7DD1;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #1E3C7A;
  }
`,$b=za.div`
  display: grid;
  grid-template-columns: 1.5fr 1.25fr;
  gap: 28px;
  margin-top: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,ew=za.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid #E4E7EC;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`,tw=za.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`,nw=za.div`
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`,rw=za.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`,ow=za.h2`
  font-size: 22px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 10px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`,iw=za.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
    margin-bottom: 12px;
  }
`,aw=za.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 14px;
  padding: 18px 18px 18px 240px;
  border: 1px solid #E4E7EC;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  min-height: 230px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    padding: 15px;
    min-height: auto;
    margin-bottom: 20px;
  }
`,sw=za.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`,lw=za.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,cw=za.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`,uw=za.h3`
  font-size: 17px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 6px;
  line-height: 1.3;
`,dw=za.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
`,fw=za.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
`,pw=za.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`,hw=za.span`
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${e=>e.$categoryColor||"#475467"};
  background-color: ${e=>e.$categoryColor?e.$categoryColor+"33":"#e9ecef"};

  &:hover {
    background-color: ${e=>e.$categoryColor?e.$categoryColor+"55":"#d8dde1"};
    transform: translateY(-1px);
  }
`,mw=za.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`,gw=za.div`
  width: 40px;
  height: 40px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,xw=za.p`
  text-align: center;
  color: #E11D48;
  padding: 20px;
`,vw=za.p`
  text-align: center;
  color: #667085;
  padding: 20px;
`,yw=za.section`
  margin: 60px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 40px 0;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    margin: 30px 0;
    padding: 0 10px;
  }
`,bw=za.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;
`,ww=za.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Sw=za.div`
  background-color: #F9FAFB;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
    border-radius: 8px;
  }
`,kw=za.div`
  display: flex;
  align-items: center;
  background-color: #F2F4F7;
  padding: 16px 20px;
  font-weight: 500;
  color: #667085;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`,jw=za.div`
  flex: 4;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`,Ew=za.div`
  flex: 1;
  text-align: right;
  padding-left: 125px;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Cw=za.div`
  flex: 1.5;
  text-align: right;
  padding-right: 100px;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Aw=za.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #F2F4F7;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F9FAFB;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
  }
`,Pw=za.div`
  flex: 3;
  padding-right: 20px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    padding-right: 0;
  }
`,Nw=za.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1E40AF;
  margin: 0 0 8px 0;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`,zw=za.p`
  font-size: 14px;
  color: #475467;
  margin: 0 0 12px 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`,Rw=za.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`,Ow=za.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`,Tw=za.span`
  font-size: 14px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,Lw=za.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Fw=za.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`,Mw=za.span`
  font-size: 14px;
  color: #667085;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,Dw=za.section`
  margin: 60px 0;
  padding: 0 20px;
  background-color: #ffffff; // White background for the section container
  border-radius: 12px;
  overflow: hidden;
`,_w=za.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
  border-radius: 36px;

  @media (max-width: 768px) {
    max-height: 300px;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    max-height: 250px;
    border-radius: 16px;
  }
`,Iw=za.div`
  padding: 30px 20px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`,Uw=za.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2a4b8d;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`,Bw=za.p`
  font-size: 16px;
  color: #475467; // Standard text color
  line-height: 1.6;
  text-align: left; // Align text to the left
`,Ww=za.section`
  margin: 60px 0;
  padding: 0 20px; // Consistent padding
`,Hw=za.img`
  width: 50%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
  border-radius: 12px;
  margin: 0 auto;

  @media (max-width: 992px) {
    width: 70%;
    max-height: 400px;
  }

  @media (max-width: 768px) {
    width: 80%;
    max-height: 350px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-height: 300px;
  }
`,qw=za.section`
  margin: 60px 0;
  padding: 0 20px;
`,Vw=za.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  gap: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 15px;
  }
`,Kw=za.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  a {
    display: block; // Make the link a block element for centering
    margin-bottom: 10px;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 15px;
  }
`,Yw=za.img`
  width: 100px; // Adjust size as needed
  height: 100px;
  object-fit: contain;
  border-radius: 8px; // Slightly rounded corners for logo
  transition: transform 0.2s ease;

  &:hover {
      transform: scale(1.05);
  }
`,Gw=za.h3`
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`,Qw=za.span`
  font-size: 14px;
  font-weight: 500;
  color: #D9480F; // Example: Orange color for role
  margin-top: 4px;
`,Jw=za.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 1px solid #E4E7EC;
  border-right: 1px solid #E4E7EC;
  padding: 0 20px 0 40px;

  @media (max-width: 992px) {
    width: 100%;
    border: none;
    border-top: 1px solid #E4E7EC;
    border-bottom: 1px solid #E4E7EC;
    padding: 15px 0;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    padding: 12px 0;
    margin: 12px 0;
    gap: 6px;
  }
`,Xw=za.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #475467;

  svg {
    min-width: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 6px;
  }
`,Zw=za.div`
  flex: 1.5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: 992px) {
    width: 100%;
    justify-content: flex-start;
  }
`,$w=za.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1E40AF;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`,eS=()=>{const{isAuthenticated:e}=Dr(),[t,n]=(0,r.useState)([]),[o,i]=(0,r.useState)([]),[a,s]=(0,r.useState)(!0),[l,c]=(0,r.useState)(!0),[u,d]=(0,r.useState)(null),[f,p]=(0,r.useState)(null),[h,m]=(0,r.useState)({}),g=te();(0,r.useEffect)((()=>{(async()=>{s(!0),d(null);try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/blogs");if(e&&e.data){const t=e.data;if(t.length>0){const e=t.sort(((e,t)=>new Date(t.creationDate)-new Date(e.creationDate))),r=e.slice(0,3).map((e=>({id:e.blogID,title:e.title,summary:e.description.substring(0,150)+"...",categories:e.category?[e.category]:[],date:e.createdAt?new Date(e.createdAt).toLocaleDateString():(new Date).toLocaleDateString(),author:e.owner||e.createdBy||"Anonymous",imageUrl:e.media||""})));n(r)}else n([])}s(!1)}catch(e){console.error("Error while fetching blog data:",e),d("An error occurred while loading blog data. Please try again later."),n([]),s(!1)}})(),(async()=>{c(!0),p(null);try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/recent");if(e&&e.data)if(Array.isArray(e.data)){const t=e.data.map((e=>({id:e.forumPostID||e.id,title:e.title||"Untitled Post",description:e.description?e.description.substring(0,100)+"...":"No description available.",author:e.creatorName||"Anonymous",authorAvatar:e.creatorProfilePic||Ku,replies:e.commentCount||0,createdAt:e.createdAt})));i(t)}else console.warn("API response for recent forum posts is not an array:",e.data),i([]);else console.warn("API response for recent forum posts is missing data."),i([]);c(!1)}catch(e){console.error("Error fetching forum data:",e),p("An error occurred while loading forum posts. Please try again later."),i([]),c(!1)}})()}),[]),(0,r.useEffect)((()=>{(async()=>{try{const e=await Ar.get("https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories");if(e&&e.data){const t=e.data.reduce(((e,t)=>(t.name&&t.color&&(e[t.name]=t.color),e)),{});m(t)}else m({})}catch(u){console.error("Error fetching categories for home page:",u),m({})}})()}),[]);const x=e=>{g(`/blog/${e}`)};return(0,Lr.jsxs)(Bb,{children:[(0,Lr.jsxs)(Wb,{children:[(0,Lr.jsx)(Hb,{}),(0,Lr.jsxs)(qb,{children:[(0,Lr.jsxs)(Vb,{children:[(0,Lr.jsx)(Kb,{children:"MEET"}),(0,Lr.jsx)(Yb,{children:"IT-ISQS!"})]}),(0,Lr.jsx)(Gb,{children:"Empowering the Future of Software Engineering through International Quality Standards The Innovative Training for International Software Quality Standards (IT-ISQS) project, supported by Erasmus+, is dedicated to reshaping software engineering education by embedding internationally recognized quality standards into academic curricula. In an age where software reliability is vital for sectors like healthcare, finance, mobility, and education, we believe that quality should not be an afterthought \u2014 it should be a foundation. Join us in building a future where software is not only innovative, but also reliable, robust, and safe."})]})]}),(0,Lr.jsxs)(Qb,{children:[(0,Lr.jsxs)(Jb,{children:[(0,Lr.jsx)(Xb,{children:"Recent Blog Posts"}),(0,Lr.jsxs)(Zb,{to:"/blog",children:["View All Blog Posts ",(0,Lr.jsx)(Ge,{})]})]}),a?(0,Lr.jsx)(mw,{children:(0,Lr.jsx)(gw,{})}):u?(0,Lr.jsx)(xw,{children:u}):0===t.length?(0,Lr.jsx)(vw,{children:"No blog posts available."}):(0,Lr.jsxs)($b,{children:[t.length>0&&(0,Lr.jsxs)(ew,{onClick:()=>x(t[0].id),children:[(0,Lr.jsx)(tw,{src:t[0].imageUrl||ag,alt:t[0].title,onError:e=>{e.target.onerror=null,e.target.src=ag}}),(0,Lr.jsxs)(nw,{children:[(0,Lr.jsxs)(rw,{children:[t[0].author," \u2022 ",t[0].date]}),(0,Lr.jsx)(ow,{children:t[0].title}),(0,Lr.jsx)(iw,{children:t[0].summary}),(0,Lr.jsx)(pw,{children:t[0].categories.map(((e,t)=>(0,Lr.jsx)(hw,{$categoryColor:h[e]||null,children:e},t)))})]})]}),(0,Lr.jsx)(fw,{children:t.slice(1,3).map((e=>(0,Lr.jsxs)(aw,{onClick:()=>x(e.id),children:[(0,Lr.jsx)(sw,{src:e.imageUrl||ag,alt:e.title,onError:e=>{e.target.onerror=null,e.target.src=ag}}),(0,Lr.jsxs)(lw,{children:[(0,Lr.jsxs)(cw,{children:[e.author," \u2022 ",e.date]}),(0,Lr.jsx)(uw,{children:e.title}),(0,Lr.jsx)(dw,{children:e.summary}),(0,Lr.jsx)(pw,{children:e.categories.map(((e,t)=>(0,Lr.jsx)(hw,{$categoryColor:h[e]||null,children:e},t)))})]})]},e.id)))})]})]}),(0,Lr.jsxs)(yw,{children:[(0,Lr.jsxs)(bw,{children:[(0,Lr.jsx)(ww,{children:"Recent Forum Posts"}),(0,Lr.jsxs)(Zb,{to:"/forum",children:["View All Forum Posts ",(0,Lr.jsx)(Ge,{})]})]}),l?(0,Lr.jsx)(mw,{children:(0,Lr.jsx)(gw,{})}):f?(0,Lr.jsx)(xw,{children:f}):0===o.length?(0,Lr.jsx)(vw,{children:"No forum posts available."}):(0,Lr.jsxs)(Sw,{children:[(0,Lr.jsxs)(kw,{children:[(0,Lr.jsx)(jw,{}),(0,Lr.jsx)(Ew,{children:"Replies"}),(0,Lr.jsx)(Cw,{children:"Date"})]}),o.map((e=>(0,Lr.jsxs)(Aw,{onClick:()=>{return t=e.id,void g(`/forum/post/${t}`);var t},children:[(0,Lr.jsxs)(Pw,{children:[(0,Lr.jsx)(Nw,{children:e.title}),(0,Lr.jsx)(zw,{children:e.description}),(0,Lr.jsxs)(Rw,{children:[(0,Lr.jsx)(Ow,{src:e.authorAvatar,alt:e.author,onError:e=>{e.target.onerror=null,e.target.src=Ku}}),(0,Lr.jsx)(Tw,{children:e.author})]})]}),(0,Lr.jsx)(Lw,{children:(0,Lr.jsx)(Mw,{children:e.replies})}),(0,Lr.jsx)(Fw,{children:(0,Lr.jsx)(Mw,{children:Ib(e.createdAt)})})]},e.id)))]})]}),(0,Lr.jsxs)(Dw,{children:[(0,Lr.jsx)(_w,{src:Db,alt:"Group discussion"}),(0,Lr.jsxs)(Iw,{children:[(0,Lr.jsx)(Uw,{children:"WHAT CAN YOU DO IN THIS WEBSITE?"}),(0,Lr.jsxs)(Bw,{children:["This platform is designed to be more than just an information portal \u2014 it's a collaborative space for learning, sharing, and growing within the field of international software quality standards.",(0,Lr.jsx)("br",{}),(0,Lr.jsx)("br",{}),"Explore Interactive Course Materials: Dive into high-quality resources, including gamified exercises, real-life case studies, and AI-powered learning tools developed by leading experts and educators.",(0,Lr.jsx)("br",{}),(0,Lr.jsx)("br",{}),"Join the Forum: Engage in discussions with students, academics, and professionals. Ask questions, exchange ideas, and find support as you learn more about ISO/IEC software quality standards.",(0,Lr.jsx)("br",{}),(0,Lr.jsx)("br",{}),"Read and Contribute to the Blog: Stay up-to-date with the latest trends, best practices, and project updates. Our blog features articles from educators, developers, and researchers across Europe.",(0,Lr.jsx)("br",{}),(0,Lr.jsx)("br",{}),"Access Project Deliverables and Events: View key documents, research findings, and updates from project meet-ups and multiplier events across T\xfcrkiye, Spain, and the Netherlands.",(0,Lr.jsx)("br",{}),(0,Lr.jsx)("br",{}),"Whether you're a student, an educator, or a software professional, this website is your gateway to a smarter, higher-quality future in software engineering."]})]})]}),(0,Lr.jsx)(Ww,{children:(0,Lr.jsx)(Hw,{src:_b,alt:"Our image"})}),(0,Lr.jsx)(qw,{children:Ub.map((e=>(0,Lr.jsxs)(Vw,{children:[(0,Lr.jsxs)(Kw,{children:[(0,Lr.jsx)("a",{href:e.website,target:"_blank",rel:"noopener noreferrer",children:(0,Lr.jsx)(Yw,{src:e.logo,alt:`${e.name} Logo`})}),(0,Lr.jsxs)(Gw,{children:[e.name," (",e.country,")"]}),e.role&&(0,Lr.jsx)(Qw,{children:e.role})]}),(0,Lr.jsxs)(Jw,{children:[(0,Lr.jsxs)(Xw,{children:[(0,Lr.jsx)(tt,{})," ",e.address]}),(0,Lr.jsxs)(Xw,{children:[(0,Lr.jsx)(ot,{})," ",e.phone]}),(0,Lr.jsxs)(Xw,{children:[(0,Lr.jsx)(et,{})," ",e.email]})]}),(0,Lr.jsx)(Zw,{children:(0,Lr.jsxs)($w,{href:e.website,target:"_blank",rel:"noopener noreferrer",children:[(0,Lr.jsx)(Xe,{})," ",e.website.replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,"")]})})]},e.id)))})]})};const tS=function(){return(0,Lr.jsx)(Mr,{children:(0,Lr.jsx)(Ae,{children:(0,Lr.jsxs)("div",{className:"App",children:[(0,Lr.jsx)(_r,{}),(0,Lr.jsx)("main",{className:"main-content",children:(0,Lr.jsxs)(ye,{children:[(0,Lr.jsx)(xe,{path:"/",element:(0,Lr.jsx)(eS,{})}),(0,Lr.jsx)(xe,{path:"/about",element:(0,Lr.jsx)(lc,{})}),(0,Lr.jsx)(xe,{path:"/syllabus",element:(0,Lr.jsx)(fc,{})}),(0,Lr.jsx)(xe,{path:"/blog",element:(0,Lr.jsx)(rx,{})}),(0,Lr.jsx)(xe,{path:"/blog/:id",element:(0,Lr.jsx)(Nx,{})}),(0,Lr.jsx)(xe,{path:"/forum",element:(0,Lr.jsx)(oy,{})}),(0,Lr.jsx)(xe,{path:"/forum/post/:postId",element:(0,Lr.jsx)(Fb,{})}),(0,Lr.jsx)(xe,{path:"/project-results",element:(0,Lr.jsx)(uc,{})}),(0,Lr.jsx)(xe,{path:"/contact",element:(0,Lr.jsx)($c,{})}),(0,Lr.jsx)(xe,{path:"/login",element:(0,Lr.jsx)(bs,{})}),(0,Lr.jsx)(xe,{path:"/verify-email",element:(0,Lr.jsx)(zc,{})}),(0,Lr.jsx)(xe,{path:"/forgot-password",element:(0,Lr.jsx)(fu,{})}),(0,Lr.jsx)(xe,{path:"/reset-password",element:(0,Lr.jsx)(Ru,{})}),(0,Lr.jsx)(xe,{path:"/profile",element:(0,Lr.jsx)(Cd,{})}),(0,Lr.jsx)(xe,{path:"/admin/login",element:(0,Lr.jsx)(Md,{})}),(0,Lr.jsx)(xe,{path:"/admin/dashboard",element:(0,Lr.jsx)(ng,{})}),(0,Lr.jsx)(xe,{path:"/privacy-policy",element:(0,Lr.jsx)("div",{className:"page",children:"Privacy & Policy Page"})}),(0,Lr.jsx)(xe,{path:"/terms",element:(0,Lr.jsx)("div",{className:"page",children:"Terms of Service Page"})}),(0,Lr.jsx)(xe,{path:"/cookie-settings",element:(0,Lr.jsx)("div",{className:"page",children:"Cookie Settings Page"})}),(0,Lr.jsx)(xe,{path:"/faqs",element:(0,Lr.jsx)("div",{className:"page",children:"FAQs Page"})}),(0,Lr.jsx)(xe,{path:"*",element:(0,Lr.jsx)("div",{className:"page",children:"404 Not Found"})})]})}),(0,Lr.jsx)(Ur,{})]})})})},nS=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,6453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)}))};i.createRoot(document.getElementById("root")).render((0,Lr.jsx)(r.StrictMode,{children:(0,Lr.jsx)(tS,{})})),nS()})()})();
//# sourceMappingURL=main.e24a221e.js.map