import{r as o,B as ee,y as j,c as f,d as M,e,k as R,M as te,C as B,t as c,h as $,u as ae,b as se,p as U,o as ne,n as oe,q as le,O as Y,P as L,f as D,s as k,w as re,F as ue,g as ie,_ as de,i as ce,j as me,m as z}from"./index.9e04de1e.js";import{u as ve,_ as pe}from"./commandApiSearch.ba7ac40a.js";import{_ as he}from"./SelectThreeGroupBox.6fdcb01e.js";import{_ as ge}from"./InputTwoGroupBox.101f9f38.js";/* empty css             */import{_ as De}from"./CustomDatePicker.vue_vue_type_script_setup_true_lang.8ea59563.js";const fe={class:"inputThreegroupBox"},_e={class:"inputThreegroup d-flex justify-content-between"},Ce={class:"d-flex position-relative w-100"},be={class:"group"},Te=["type","id","name","value","data-value","tabindex"],Ie=["for"],Re={class:"input-group-right d-flex align-items-center"},Me={key:0,class:"d-flex"},Pe={class:"error"},Ve={__name:"InputThreeGroupBox",props:["inputType","inputId","inputName","value","label","errorMessage","tabIndex"],emits:["getReturnData"],setup(m,{emit:i}){const _=m,l=o(_.value),d=o(!1),C=ee(()=>typeof _.errorMessage>"u"?!1:_.errorMessage!==""),P=()=>{l.value="",b(l.value)};j(()=>_.value,r=>{l.value=r,b(l.value)});const y=r=>{l.value=r.target.value,b(l.value)},b=r=>{i("getReturnData",r)};return(r,h)=>(f(),M("div",fe,[e("div",_e,[e("div",Ce,[e("div",be,[R(e("input",{type:m.inputType,id:m.inputId,name:m.inputName,value:l.value,"onUpdate:modelValue":h[0]||(h[0]=V=>l.value=V),onInput:y,"data-value":l.value,onFocus:h[1]||(h[1]=V=>d.value=!0),onBlur:h[2]||(h[2]=V=>d.value=!1),tabindex:m.tabIndex,autocomplete:"off",class:B({"error-state":C.value})},null,42,Te),[[te,l.value]]),e("label",{for:m.inputId},c(m.label),9,Ie)]),e("span",Re,[d.value||typeof l.value<"u"&&l.value!==""?(f(),M("button",{key:0,type:"button",class:"border-0 btn p-0",onClick:P},[e("i",{class:B(["bi bi-x-circle",{"error-state":C.value}])},null,2)])):$("",!0)])])]),C.value?(f(),M("div",Me,[e("span",Pe,c(m.errorMessage),1)])):$("",!0)]))}},Se={class:"memberSearch"},xe={class:"searchSetion"},Ne={class:"d-flex col-6"},ye={class:"input-group"},$e={class:"input-group-prepend"},Ae={for:"radio1",class:"d-flex align-items-center"},Fe=e("span",null,"\u9580\u865F",-1),we={for:"radio2",class:"d-flex align-items-center"},ke=e("span",null,"CAID",-1),Be={class:"col-6"},Ee=e("p",{class:"advancedTitle"},"\u9032\u968E\u641C\u5C0B\u689D\u4EF6",-1),Oe={class:"d-flex"},Ge={class:"d-flex w-100 justify-content-between"},Ue={class:"advancedTitle-content d-flex align-items-center"},Ye={class:"searchResult"},Le=e("h4",null,"\u641C\u5C0B\u7D50\u679C",-1),ze={class:"searchResult-content d-flex justify-content-center align-items-center"},je={class:"Result"},He={class:"table table-hover m-0"},qe=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"\u8A3B\u518A\u9580\u865F"),e("th",null,"\u59D3\u540D"),e("th",null,"\u718A\u7C4D"),e("th",null,"\u7D2F\u7A4D\u8A02\u55AE\u6578"),e("th",null,"\u7D2F\u7A4D\u8A02\u55AE\u91D1\u984D"),e("th",null,"\u8A3B\u518A\u6642\u9593"),e("th",null,"\u6700\u5F8C\u767B\u5165\u6642\u9593")])],-1),Je=e("div",{class:"noResult"},[e("i",{class:"bi bi-file-text-fill custom-icon"}),e("p",null,"\u8ACB\u8F38\u5165\u6216\u8A2D\u5B9A\u9700\u8981\u7684\u689D\u4EF6\u5F8C\u6309\u4E0B\u641C\u5C0B\u6309\u9215"),e("p",null,"\u5C07\u5728\u6B64\u70BA\u60A8\u986F\u793A\u641C\u5C0B\u7D50\u679C")],-1),Ke=[Je],Qe=e("div",{class:"noResult"},[e("i",{class:"bi bi-clipboard2-x-fill custom-icon"}),e("p",null,"\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u8CC7\u6599")],-1),We=[Qe],N=20,nt={__name:"memeberSearch",setup(m){const i=ae(),_=o([]),l=o("");ve();const d=o(1),C=o([]),P=new Date,y=new Date(new Date().setDate(P.getDate()-7)),b=se(),r=o(!1),h=o(!1),V=o(!1),H=o(!1),v=o("phone"),t=U({RegisterPhone:"",CAID:"",StartDate:"",EndDate:"",CustomerName:"",MemberTierValue:""}),g=U({RegisterPhone:"",CAID:"",StartDate:"",EndDate:"",CustomerName:"",MemberTierValue:""}),E=o(0),A=o(0),I=o([]),S=o(!1),O=o(""),q={State:0,Data:{Data:[{Id:1,RegisterPhone:"0912345678",Name:"John Doe",MemberTierValue:"Small",OrderCount:5,OrdersTotalSum:1e4,RegisterTime:"2023-07-10T10:00:00",\u6700\u5F8C\u767B\u5165\u6642\u9593:"2023-07-15T10:00:00"},{Id:2,RegisterPhone:"0987654321",Name:"Jane Smith",MemberTierValue:"Silver",OrderCount:3,OrdersTotalSum:5e3,RegisterTime:"2023-07-12T11:00:00",\u6700\u5F8C\u767B\u5165\u6642\u9593:"2023-07-16T11:00:00"},{Id:3,RegisterPhone:"0985557891",Name:"Corey Lin",MemberTierValue:"Silver",OrderCount:3,OrdersTotalSum:5e3,RegisterTime:"2024-07-12T11:00:00",\u6700\u5F8C\u767B\u5165\u6642\u9593:"2024-07-16T11:00:00"}],PageCount:1,TotalCount:2}};ne(()=>{C.value=[y,P],y.setHours(0,0,0,0),P.setHours(23,59,59,999),t.StartDate=C.value[0],t.EndDate=C.value[1]}),j(v,s=>{s==="phone"?t.CAID="":s==="caid"&&(t.RegisterPhone="",g.CAID=""),(s==="phone"||s==="caid")&&(g.RegisterPhone="",g.CAID="")}),oe(()=>{b.IsLoading=!1});const G=async s=>{if(typeof s!="number"?s=d.value:d.value=s,S.value=!0,t.MemberTierValue){if(t.MemberTierValue==="\u5168\u90E8")t.MemberTierValue="";else for(const p in i.MemberTierValueMap)if(i.MemberTierValueMap[p]===t.MemberTierValue){t.MemberTierValue=p;break}}const n=t.RegisterPhone===""?"":`RegisterPhone=${encodeURIComponent(t.RegisterPhone)}`,T=t.CAID===""?"":`CAID=${encodeURIComponent(t.CAID)}`,F=t.CustomerName===""?"":`CustomerName=${encodeURIComponent(t.CustomerName)}`;`${n}${T}${i.formatDateToYYYYMMDD(t.StartDate)}${i.formatDateToYYYYMMDD(t.EndDate)}${F}${t.MemberTierValue}${s}`;try{if(t.RegisterPhone===""&&t.CAID===""&&t.StartDate===""&&t.EndDate===""){S.value=!1,r.value=!0;return}if(g.RegisterPhone=i.isValidPhone(t.RegisterPhone).errorMessage,!i.isValidPhone(t.RegisterPhone).isValid||!i.isValidDate(O.value)){S.value=!1,b.IsLoading=!1,r.value=!0;return}const p=q,x=p.Data.Data.filter(u=>(!t.RegisterPhone||u.RegisterPhone.includes(t.RegisterPhone))&&(!t.CAID||u.CAID===t.CAID)&&(!t.CustomerName||u.Name.includes(t.CustomerName))&&(!t.MemberTierValue||u.MemberTierValue===t.MemberTierValue)&&new Date(u.RegisterTime)>=t.StartDate&&new Date(u.RegisterTime)<=t.EndDate);if(p.State===0){const u=(d.value-1)*N,w=u+N;I.value=x.slice(u,w),E.value=Math.ceil(x.length/N),A.value=x.length}r.value=!0,S.value=!1,b.IsLoading=!1}catch(p){console.error("Error sending POST request:",p)}},J=s=>{t.RegisterPhone=s.trim()},K=s=>{t.CAID=s.trim()},Q=s=>{O.value=s.value2;const n=new Date(s.value1[0]),T=new Date(s.value1[1]);n.setHours(0,0,0,0),T.setHours(23,59,59,999),t.StartDate=n,t.EndDate=T},W=s=>{t.CustomerName=s.trim()},X=s=>{t.MemberTierValue=s.trim()};return(s,n)=>{const T=ge,F=Ve,p=he,x=pe,u=de,w=ce,Z=me;return f(),M("div",Se,[e("div",xe,[e("form",{onSubmit:n[6]||(n[6]=le(a=>G(1),["prevent"]))},[e("div",Ne,[e("div",ye,[e("div",$e,[e("span",{class:B(["input-group-text d-flex flex-column align-items-start",{error:g.CAID!==""||g.RegisterPhone!==""}])},[e("label",Ae,[R(e("input",{type:"radio",id:"radio1",name:"radioGroup","onUpdate:modelValue":n[0]||(n[0]=a=>v.value=a),value:"phone"},null,512),[[Y,v.value]]),Fe]),e("label",we,[R(e("input",{type:"radio",id:"radio2",name:"radioGroup","onUpdate:modelValue":n[1]||(n[1]=a=>v.value=a),value:"caid"},null,512),[[Y,v.value]]),ke])],2)]),v.value==="phone"?(f(),L(T,{key:0,inputType:"phone",inputId:"RegisterPhone",inputName:"RegisterPhone","data-value":t.RegisterPhone,value:v.value==="phone"?t.RegisterPhone:"",isFocused:h.value,label:"\u8A3B\u518A\u9580\u865F",errorMessage:g.RegisterPhone,"onUpdate:modelValue":n[2]||(n[2]=a=>t.RegisterPhone=a),onGetReturnData:J},null,8,["data-value","value","isFocused","errorMessage"])):$("",!0),v.value==="caid"?(f(),L(T,{key:1,inputType:"text",inputId:"CAID",inputName:"CAID","data-value":t.CAID,value:v.value==="caid"?t.CAID:"",isFocused:V.value,label:"CAID",errorMessage:g.CAID,"onUpdate:modelValue":n[3]||(n[3]=a=>t.CAID=a),onGetReturnData:K},null,8,["data-value","value","isFocused","errorMessage"])):$("",!0)]),e("div",Be,[D(De,{label:"\u8A3B\u518A\u6642\u9593 (\u9650\u641C\u5C0B 92 \u5929\u5167\u5340\u9593)",selectedValue:_.value,"onUpdate:selectedValue":n[4]||(n[4]=a=>_.value=a),datepicketStatus:l.value,onGetReturnData:Q},null,8,["selectedValue","datepicketStatus"])])]),Ee,e("div",Oe,[e("div",Ge,[e("div",Ue,[D(F,{inputType:"text",inputId:"searchForm.CustomerName",inputName:"searchForm.CustomerName","data-value":t.CustomerName,value:t.CustomerName,isFocused:H.value,label:"\u6703\u54E1\u59D3\u540D",tabIndex:1,"onUpdate:modelValue":n[5]||(n[5]=a=>t.CustomerName=a),onGetReturnData:W},null,8,["data-value","value","isFocused"]),D(p,{options:["\u8ACB\u9078\u64C7\u6703\u54E1\u7B49\u7D1A","\u5168\u90E8","\u5C0F\u718A","\u9ED1\u718A","\u9280\u718A","\u91D1\u718A","\u947D\u77F3\u718A"],inputType:"text",inputId:"searchForm.MemberTierValue",inputName:"searchForm.MemberTierValue","data-value":t.MemberTierValue,value:t.MemberTierValue,label:"\u718A\u7C4D",disabledChoice:"\u8ACB\u9078\u64C7\u6703\u54E1\u7B49\u7D1A",errorMessage:"",tabIndex:"1",onGetReturnData:X},null,8,["data-value","value"])]),D(x,{searchLoading:S.value},null,8,["searchLoading"])])])],32)]),e("div",Ye,[Le,e("div",ze,[R(e("div",je,[D(u,{class:"mt-0",currentPage:d.value,pageSize:N,searchedData:I.value,totalCount:A.value},null,8,["currentPage","searchedData","totalCount"]),D(w,null,{default:re(()=>[e("table",He,[qe,e("tbody",null,[(f(!0),M(ue,null,ie(I.value,a=>(f(),M("tr",{key:a.CAID,class:""},[e("td",null,c(a.Id),1),e("td",null,c(a.RegisterPhone?a.RegisterPhone:"--"),1),e("td",null,c(a.Name?a.Name:"--"),1),e("td",null,c(a.MemberTierValue?z(i).MemberTierValueMap[a.MemberTierValue]:"--"),1),e("td",null,c(a.OrderCount?a.OrderCount:"0"),1),e("td",null,c(a.OrdersTotalSum?a.OrdersTotalSum:"--"),1),e("td",null,c(a.RegisterTime?z(i).formatDate(a.RegisterTime):"--"),1),e("td",null,c(a.\u6700\u5F8C\u767B\u5165\u6642\u9593?a.\u6700\u5F8C\u767B\u5165\u6642\u9593:"--"),1)]))),128))])])]),_:1}),D(u,{currentPage:d.value,pageSize:N,searchedData:I.value,totalCount:A.value},null,8,["currentPage","searchedData","totalCount"]),e("div",null,[D(Z,{searchFun:G,currentPage:d.value,pageCount:E.value},null,8,["currentPage","pageCount"])])],512),[[k,I.value.length>0&&r.value]]),R(e("div",null,Ke,512),[[k,!r.value]]),R(e("div",null,We,512),[[k,I.value.length==0&&r.value]])])])])}}};export{nt as default};