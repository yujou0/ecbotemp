import{_ as x}from"./searchResult.18badcd4.js";import{l as z,u as G,r as u,b as R,o as q,n as j,p as A,c as _,d as f,e as t,q as H,f as c,w,k as U,s as J,F as M,g as $,_ as K,i as Q,j as W,t as i,m}from"./index.9e04de1e.js";import{u as X,_ as Z}from"./commandApiSearch.ba7ac40a.js";import{_ as tt}from"./SelectTwoGroupBox.30b111b8.js";/* empty css             */import{_ as et}from"./CustomDatePicker.vue_vue_type_script_setup_true_lang.8ea59563.js";const at={class:"voucherSearch"},st={class:"searchSetion"},nt={class:"d-flex justify-content-between"},rt={class:"d-flex col-6"},ot={class:"Result"},lt={class:"table table-hover m-0"},ut=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"\u8A02\u55AE\u7DE8\u865F"),t("th",null,"\u8A02\u55AE\u91D1\u984D"),t("th",null,"\u8A02\u55AE\u5EFA\u7ACB\u6642\u9593"),t("th",null,"\u642D\u8ECA\u91D1\u532F\u5165\u72C0\u614B")])],-1),Y=20,ft={__name:"voucherSearch",setup(ct){const y=z(),o=G(),P=X(),d=u(1),h=u([]),I=new Date,E=new Date(new Date().setDate(I.getDate()-7)),p=R(),S=u(!1);q(()=>{h.value=[E,I],e.StartDate=h.value[0],e.EndDate=h.value[1]}),j(()=>{p.IsLoading=!1});const e=A({TicketInsertStatus:"",StartDate:"",EndDate:""}),k=u(0),g=u(0),l=u([]),v=u(!1),T=u(""),b=async s=>{if(v.value=!0,typeof s!="number"?s=d.value:d.value=s,e.TicketInsertStatus){if(e.TicketInsertStatus==="\u5168\u90E8")e.TicketInsertStatus="";else for(const a in o.TicketStatusMap)if(o.TicketStatusMap[a]===e.TicketInsertStatus){e.TicketInsertStatus=a;break}}const r=`/Order/TicketInsert?StartDate=${o.formatDateToYYYYMMDD(e.StartDate)}&EndDate=${o.formatDateToYYYYMMDD(e.EndDate)}&TicketInsertStatus=${e.TicketInsertStatus}&Page=${s}&PageSize=20`;try{if(e.StartDate===""&&e.EndDate===""){v.value=!1,p.IsLoading=!1,S.value=!0;return}if(!o.isValidDate(T.value)){v.value=!1,p.IsLoading=!1,S.value=!0;return}const a=await P.getData(r);a.State===0?(l.value=[],l.value=a.Data.Data,k.value=a.Data.PageCount,g.value=a.Data.TotalCount):l.value=[],S.value=!0,v.value=!1,p.IsLoading=!1}catch(a){console.error("Error sending POST request:",a),a.response.request.status===401&&y.userLogout()}},L=s=>{T.value=s.value2;const r=new Date(s.value1[0]),a=new Date(s.value1[1]);r.setHours(0,0,0,0),a.setHours(23,59,59,999),e.StartDate=r,e.EndDate=a},F=s=>{e.TicketInsertStatus=s.trim()};return(s,r)=>{const a=tt,O=Z,C=K,B=Q,N=W,V=x;return _(),f("div",at,[t("div",st,[t("form",{onSubmit:r[1]||(r[1]=H(n=>b(1),["prevent"]))},[t("div",nt,[t("div",rt,[c(a,{options:["\u8ACB\u9078\u64C7\u642D\u8ECA\u91D1\u532F\u5165\u72C0\u614B","\u5168\u90E8","\u5DF2\u767C\u653E","\u5F85\u767C\u653E","\u8655\u7406\u4E2D","\u5931\u6557"],inputType:"text",inputId:"searchForm.TicketInsertStatus",inputName:"searchForm.TicketInsertStatus","data-value":e.TicketInsertStatus,value:e.TicketInsertStatus,label:"\u642D\u8ECA\u91D1",disabledChoice:"\u8ACB\u9078\u64C7\u642D\u8ECA\u91D1\u532F\u5165\u72C0\u6CC1",errorMessage:"",tabIndex:"1",onGetReturnData:F},null,8,["data-value","value"]),c(et,{selectedValue:s.selectedDates,"onUpdate:selectedValue":r[0]||(r[0]=n=>s.selectedDates=n),datepicketStatus:s.datepicketStatus,onGetReturnData:L,label:"\u8A02\u55AE\u5EFA\u7ACB\u6642\u9593 (\u9650\u641C\u5C0B 92 \u5929\u5167\u5340\u9593)"},null,8,["selectedValue","datepicketStatus"])]),c(O,{searchLoading:v.value},null,8,["searchLoading"])])],32)]),c(V,{searchedData:l.value,notSearchYet:S.value},{content:w(()=>[U(t("div",ot,[c(C,{class:"mt-0",currentPage:d.value,pageSize:Y,searchedData:l.value,totalCount:g.value},null,8,["currentPage","searchedData","totalCount"]),c(B,null,{default:w(()=>[t("table",lt,[ut,t("tbody",null,[(_(!0),f(M,null,$(l.value,n=>(_(),f("tr",{key:n.Id,class:""},[t("td",null,i(n.Id),1),t("td",null,i(n.OrderNumber?n.OrderNumber:"--"),1),t("td",null,i(n.OrderTotalSum?n.OrderTotalSum:"--"),1),t("td",null,i(n.OrderCreateTime?m(o).formatDate(n.OrderCreateTime):"--"),1),t("td",null,[(_(!0),f(M,null,$(n.TicketInsertInfo,D=>(_(),f("p",{key:D},i(D.AID)+" / "+i(m(o).TicketStatusMap[m(o).NumericStatusMap[D.Status]])+" "+i(D.Msg?"/ "+D.Msg:""),1))),128))])]))),128))])])]),_:1}),c(C,{currentPage:d.value,pageSize:Y,searchedData:l.value,totalCount:g.value},null,8,["currentPage","searchedData","totalCount"]),t("div",null,[c(N,{searchFun:b,currentPage:d.value,pageCount:k.value},null,8,["currentPage","pageCount"])])],512),[[J,l.value.length>0&&S.value]])]),_:1},8,["searchedData","notSearchYet"])])}}};export{ft as default};