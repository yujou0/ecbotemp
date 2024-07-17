import{_ as G}from"./searchResult.18badcd4.js";import{J as R,u as z,l as K,r as n,b as T,o as Y,n as j,p as w,c as y,d as F,e,q,f as u,w as M,k as A,s as J,F as H,g as O,_ as W,i as X,j as Z,t as r,K as ee,L as te}from"./index.9e04de1e.js";import{u as ae,_ as oe}from"./commandApiSearch.ba7ac40a.js";import{_ as se}from"./InputTwoGroupBox.101f9f38.js";/* empty css             */const ne=p=>(ee("data-v-208edc50"),p=p(),te(),p),ue={class:"productSearch"},re={class:"searchSetion"},le={class:"d-flex"},ce={class:"d-flex col-6"},de={class:"d-flex col-6 justify-content-end"},ie={class:"Result"},_e={class:"table table-hover m-0"},me=ne(()=>e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"\u5546\u54C1\u8CA8\u865F"),e("th",null,"\u5546\u54C1\u540D\u7A31"),e("th",null,"\u5EAB\u5B58/\u6578\u91CF"),e("th",null,"\u5546\u54C1\u539F\u50F9"),e("th",null,"\u5546\u54C1\u7279\u50F9"),e("th",null,"\u5546\u54C1\u6210\u672C")])],-1)),m=20,pe={__name:"productSearch",setup(p){const v=z(),L=K();ae();const d=n(1),P=n([]),C=new Date,V=new Date(new Date().setDate(C.getDate()-7)),S=T(),h=n(!1);Y(()=>{P.value=[V,C],t.StartDate=P.value[0],t.EndDate=P.value[1]}),j(()=>{S.IsLoading=!1});const U=n(!1),Q=n(!1),t=w({Sku:"",ProductName:""}),l=w({Sku:"",ProductName:""}),x=n(0),k=n(0),c=n([]),i=n(!1),$=[{Id:1,Sku:"SKU123456",ProductName:"Product 1",Quantity:100,Price:1e3,PriceSale:900,Cost:700,UnlimitedQuantity:!1},{Id:2,Sku:"SKU123457",ProductName:"Product 2",Quantity:200,Price:2e3,PriceSale:1800,Cost:1500,UnlimitedQuantity:!0}],b=async s=>{i.value=!0,typeof s!="number"?s=d.value:d.value=s;try{if(t.Sku===""&&t.ProductName===""){l.Sku="\u8ACB\u8F38\u5165\u81F3\u5C11\u4E00\u9805\u641C\u5C0B\u689D\u4EF6",l.ProductName="\u8ACB\u8F38\u5165\u81F3\u5C11\u4E00\u9805\u641C\u5C0B\u689D\u4EF6",i.value=!1,S.IsLoading=!1;return}if(l.Sku=v.isValidSku(t.Sku).errorMessage,l.ProductName=v.isValidProductName(t.ProductName).errorMessage,!v.isValidSku(t.Sku).isValid||!v.isValidProductName(t.ProductName).isValid){i.value=!1,S.IsLoading=!1,h.value=!0;return}const o=$.filter(f=>{const D=t.Sku===""||f.Sku.includes(t.Sku),I=t.ProductName===""||f.ProductName.includes(t.ProductName);return D&&I}),_=(s-1)*m,N=_+m,g=o.slice(_,N);c.value=g,x.value=Math.ceil(o.length/m),k.value=o.length,h.value=!0,i.value=!1,S.IsLoading=!1}catch(o){console.error("Error:",o),o.response.request.status===401&&L.userLogout()}},B=s=>{t.Sku=s.trim()},E=s=>{t.ProductName=s.trim()};return(s,o)=>{const _=se,N=oe,g=W,f=X,D=Z,I=G;return y(),F("div",ue,[e("div",re,[e("form",{onSubmit:o[2]||(o[2]=q(a=>b(1),["prevent"]))},[e("div",le,[e("div",ce,[u(_,{inputType:"text",inputId:"searchForm.Sku",inputName:"searchForm.Sku","data-value":t.Sku,value:t.Sku,isFocused:U.value,label:"\u5546\u54C1\u8CA8\u865F",tabIndex:0,errorMessage:l.Sku,"onUpdate:modelValue":o[0]||(o[0]=a=>t.Sku=a),onGetReturnData:B},null,8,["data-value","value","isFocused","errorMessage"]),u(_,{inputType:"text",inputId:"searchForm.ProductName",inputName:"searchForm.ProductName","data-value":t.ProductName,value:t.ProductName,isFocused:Q.value,label:"\u5546\u54C1\u540D\u7A31",tabIndex:1,errorMessage:l.ProductName,"onUpdate:modelValue":o[1]||(o[1]=a=>t.ProductName=a),onGetReturnData:E},null,8,["data-value","value","isFocused","errorMessage"])]),e("div",de,[u(N,{searchLoading:i.value},null,8,["searchLoading"])])])],32)]),u(I,{searchedData:c.value,notSearchYet:h.value},{content:M(()=>[A(e("div",ie,[u(g,{class:"mt-0",currentPage:d.value,pageSize:m,searchedData:c.value,totalCount:k.value},null,8,["currentPage","searchedData","totalCount"]),u(f,null,{default:M(()=>[e("table",_e,[me,e("tbody",null,[(y(!0),F(H,null,O(c.value,a=>(y(),F("tr",{key:a.Id,class:""},[e("td",null,r(a.Id),1),e("td",null,r(a.Sku?a.Sku:"--"),1),e("td",null,r(a.ProductName?a.ProductName:"--"),1),e("td",null,r(a.UnlimitedQuantity===!0?"\u7121\u4E0A\u9650":a.Quantity?a.Quantity:"--"),1),e("td",null,r(a.Price?a.Price:"--"),1),e("td",null,r(a.PriceSale?a.PriceSale:"--"),1),e("td",null,r(a.Cost?a.Cost:"--"),1)]))),128))])])]),_:1}),u(g,{currentPage:d.value,pageSize:m,searchedData:c.value,totalCount:k.value},null,8,["currentPage","searchedData","totalCount"]),e("div",null,[u(D,{searchFun:b,currentPage:d.value,pageCount:x.value},null,8,["currentPage","pageCount"])])],512),[[J,c.value.length>0&&h.value]])]),_:1},8,["searchedData","notSearchYet"])])}}},Pe=R(pe,[["__scopeId","data-v-208edc50"]]);export{Pe as default};