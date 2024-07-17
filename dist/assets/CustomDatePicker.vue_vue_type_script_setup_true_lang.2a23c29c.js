import{_ as v,I as M,J as S,r as o,o as B,k as E,m as w,c as R,d as T,e as n,t as h,f as V,u as z,x as d}from"./index.acd8174a.js";const A={locale:"zh_TW",today:"\u4ECA\u5929",now:"\u6B64\u523B",backToToday:"\u8FD4\u56DE\u4ECA\u5929",ok:"\u78BA\u5B9A",timeSelect:"\u9078\u64C7\u6642\u9593",dateSelect:"\u9078\u64C7\u65E5\u671F",weekSelect:"\u9078\u64C7\u5468",clear:"\u6E05\u9664",month:"\u6708",year:"\u5E74",previousMonth:"\u4E0A\u500B\u6708 (\u7FFB\u9801\u4E0A\u9375)",nextMonth:"\u4E0B\u500B\u6708 (\u7FFB\u9801\u4E0B\u9375)",monthSelect:"\u9078\u64C7\u6708\u4EFD",yearSelect:"\u9078\u64C7\u5E74\u4EFD",decadeSelect:"\u9078\u64C7\u5E74\u4EE3",yearFormat:"YYYY\u5E74",dayFormat:"D\u65E5",dateFormat:"YYYY\u5E74M\u6708D\u65E5",dateTimeFormat:"YYYY\u5E74M\u6708D\u65E5 HH\u6642mm\u5206ss\u79D2",previousYear:"\u4E0A\u4E00\u5E74 (Control\u9375\u52A0\u5DE6\u65B9\u5411\u9375)",nextYear:"\u4E0B\u4E00\u5E74 (Control\u9375\u52A0\u53F3\u65B9\u5411\u9375)",previousDecade:"\u4E0A\u4E00\u5E74\u4EE3",nextDecade:"\u4E0B\u4E00\u5E74\u4EE3",previousCentury:"\u4E0A\u4E00\u4E16\u7D00",nextCentury:"\u4E0B\u4E00\u4E16\u7D00"},L=A,$={placeholder:"\u8ACB\u9078\u64C7\u6642\u9593"},H=$,C={lang:v({placeholder:"\u8ACB\u9078\u64C7\u65E5\u671F",yearPlaceholder:"\u8ACB\u9078\u64C7\u5E74\u4EFD",quarterPlaceholder:"\u8ACB\u9078\u64C7\u5B63\u5EA6",monthPlaceholder:"\u8ACB\u9078\u64C7\u6708\u4EFD",weekPlaceholder:"\u8ACB\u9078\u64C7\u5468",rangePlaceholder:["\u958B\u59CB\u65E5\u671F","\u7D50\u675F\u65E5\u671F"],rangeYearPlaceholder:["\u958B\u59CB\u5E74\u4EFD","\u7D50\u675F\u5E74\u4EFD"],rangeMonthPlaceholder:["\u958B\u59CB\u6708\u4EFD","\u7D50\u675F\u6708\u4EFD"],rangeQuarterPlaceholder:["\u958B\u59CB\u5B63\u5EA6","\u7D50\u675F\u5B63\u5EA6"],rangeWeekPlaceholder:["\u958B\u59CB\u5468","\u7D50\u675F\u5468"]},L),timePickerLocale:v({},H)};C.lang.ok="\u78BA \u5B9A";const N=C,U={id:"custom-datepicker"},W={class:"d-flex flex-column"},j={class:"custom-datepicker-label"},q="YYYY/MM/DD",J=M({__name:"CustomDatePicker",props:["label"],emits:["getReturnData"],setup(f,{emit:k}){const y=f,c=S(),D=c.subtract(6,"day"),g=c,a=o(""),l=o([D,g]),i=o(),r=o(""),m=o(),Y=o(y.label),_=e=>{e?(m.value=[],i.value=[]):i.value=void 0},x=e=>{l.value=e},P=e=>{m.value=e};B(()=>{p(l,a)}),E([l,a],([e,t])=>{b(e),p(e,t)});const p=(e,t)=>{k("getReturnData",{value1:e,value2:t})},b=e=>{const[t,s]=e,u=91,F=s.diff(t,"day");s.isAfter(c,"day")?(r.value="\u958B\u59CB/\u7D50\u675F\u65E5\u671F\u5FC5\u9808\u5C0F\u65BC\u4ECA\u5929\u3002",a.value="error"):F>u?(r.value="\u8ACB\u9078\u64C7 92 \u5929\u5167\u7684\u65E5\u671F\u5340\u9593",a.value="error"):(r.value="",a.value="")};return(e,t)=>{const s=w("a-range-picker");return R(),T("div",U,[n("div",W,[n("label",j,h(Y.value),1),V(s,{placement:"bottomRight",autofocus:!1,locale:z(N),status:a.value,value:l.value,"onUpdate:value":t[0]||(t[0]=u=>l.value=u),allowClear:!1,format:q,onChange:x,onOpenChange:_,onCalendarChange:P,style:d({borderColor:a.value?"#DC3545":""})},null,8,["locale","status","value","style"]),n("i",{class:"bi bi-calendar-week",style:d([{"font-size":"16px"},{color:a.value?"#DC3545":""}])},null,4),n("span",{class:"datepicaker-error",style:d({color:a.value?"#DC3545":""})},h(r.value),5)])])}}});export{J as _};
