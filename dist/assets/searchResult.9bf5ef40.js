import{j as v,r as i,k as p,c as f,d as m,z as r,e,i as h,G as u,u as a}from"./index.acd8174a.js";const R={class:"searchResult"},S=e("h4",null,"\u641C\u5C0B\u7D50\u679C",-1),b={class:"searchResult-content d-flex justify-content-center align-items-center"},B=e("div",{class:"noResult"},[e("i",{class:"bi bi-file-text-fill custom-icon"}),e("p",null,"\u8ACB\u8F38\u5165\u6216\u8A2D\u5B9A\u9700\u8981\u7684\u689D\u4EF6\u5F8C\u6309\u4E0B\u641C\u5C0B\u6309\u9215"),e("p",null,"\u5C07\u5728\u6B64\u70BA\u60A8\u986F\u793A\u641C\u5C0B\u7D50\u679C")],-1),D=[B],k=e("div",{class:"noResult"},[e("i",{class:"bi bi-clipboard2-x-fill custom-icon"}),e("p",null,"\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u8CC7\u6599")],-1),w=[k],Y={__name:"searchResult",props:{notSearchYet:Boolean,searchedData:Array},setup(d){const _=d,{notSearchYet:c,searchedData:o}=v(_),t=i(c.value),l=i(o.value);return p([c,o],([s,n])=>{t.value=s,l.value=n}),(s,n)=>(f(),m("div",R,[S,r(s.$slots,"header"),e("div",b,[r(s.$slots,"content"),h(e("div",null,D,512),[[u,!a(t)]]),h(e("div",null,w,512),[[u,a(l).length==0&&a(t)]])])]))}};export{Y as _};
