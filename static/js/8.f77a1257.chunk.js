(window.webpackJsonpps=window.webpackJsonpps||[]).push([[8],{126:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("img",{className:e.className,src:e.src,alt:e.alt,style:e.style})}},353:function(e,t,a){e.exports=a.p+"static/media/Search.d50e8c79.svg"},370:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(91),c=a.n(o),l=a(17),i=a(10),s=a(72),m=a(75),p=a(79),u="ps/UltimateEmpPage/LOAD_EMPLOYEES",d="ps/UltimateEmpPage/SAVE_EMPLOYEE",E="ps/UltimateEmpPage/CREATE_EMPLOYEE",b="ps/UltimateEmpPage/CHANGE_VISIBILITY",y="ps/UltimateEmpPage/CHANGE_EMPLOYEE_NAME",f="ps/UltimateEmpPage/CHANGE_EMPLOYEE_EMAIL",h="ps/UltimateEmpPage/CHANGE_EMPLOYEE_PHONE",v="ps/UltimateEmpPage/CHANGE_EMPLOYEE_BIRTHDAY",g="ps/UltimateEmpPage/DELETE_EMPLOYEE",x="ps/UltimateEmpPage/DELETED_EMPLOYEE",O="ps/UltimateEmpPage/SELECT_EMPLOYEE",_="ps/UltimateEmpPage/UPDATE_EMPLOYEE_NAME",j="ps/UltimateEmpPage/UPDATE_EMPLOYEE_EMAIL",P="ps/UltimateEmpPage/UPDATE_EMPLOYEE_PHONE",k="ps/UltimateEmpPage/UPDATE_EMPLOYEE_BIRTHDAY",S="ps/UltimateEmpPage/UPDATE_EMPLOYEE",w="ps/UltimateEmpPage/UPDATED_EMPLOYEE",N="ps/UltimateEmpPage/CHANGE_FILTER";function T(e){return{type:E,employee:e}}var C=a(80),D={employees:[],isCreatePrdFormVisible:!1,name:"",email:"",phone:"",birthday:new Date,is_crtForm_visible:!1,is_updtForm_visible:!1,selected_employee:{_id:"xxxxxxx",name:"",email:"",phone:"",birthday:new Date},filter:""},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;return Object(C.a)(e,(function(e){switch(t.type){case u:e.employees=t.employees;break;case d:break;case E:e.employees=e.employees.concat([t.employee]),e.name="",e.email="",e.phone="",e.birthday=new Date,e.is_crtForm_visible=!1;break;case b:switch(t.who){case"crtForm":e.is_crtForm_visible=t.visibility;break;case"updtForm":e.is_updtForm_visible=t.visibility}break;case y:e.name=t.name;break;case f:e.email=t.email;break;case h:e.phone=t.phone;break;case v:e.birthday=t.birthday;break;case g:e.selected_employee=e.employees.find((function(e){return e._id===t._id}));break;case x:var a=e.employees.findIndex((function(e){return e._id===t.employee._id}));e.employees.splice(1,a);break;case O:e.selected_employee=e.employees.find((function(e){return e._id===t._id}));break;case _:e.selected_employee.name=t.name;break;case j:e.selected_employee.email=t.email;break;case P:e.selected_employee.phone=t.phone;break;case k:e.selected_employee.birthday=t.birthday;break;case S:break;case w:var n=e.employees.findIndex((function(e){return e._id===t.employee._id}));e.employees[n]=t.employee,e.is_updtForm_visible=!1;break;case N:e.filter=t.filter}}))},U=function(e){return e.employees||D},A=function(){return Object(s.a)(U,(function(e){return{name:e.name,email:e.email,phone:e.phone,birthday:e.birthday}}))},I=function(){return Object(s.a)(U,(function(e){return e.selected_employee}))},F=a(71),M=a(106),Y=a.n(M),R=(a(201),a(203)),B=a(76),H=a(89),V=a(353),z=a.n(V),G=a(126),J=a(85),W=a.n(J),X=a(86),q=a(77),K=W.a.mark(ee),Q=W.a.mark(te),Z=W.a.mark(ae),$=W.a.mark(ne);function ee(){var e,t,a,n;return W.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(X.c)(A());case 2:return e=r.sent,t="".concat(Object(F.a)(),"/employees"),r.prev=4,a=localStorage.getItem("PointOfSaleToken"),r.next=8,Object(X.a)(q.a,t,{body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},method:"POST"});case 8:return n=r.sent,r.next=11,Object(X.b)(T(n));case 11:r.next=17;break;case 13:r.prev=13,r.t0=r.catch(4),console.log("err"),console.log(r.t0);case 17:case"end":return r.stop()}}),K,null,[[4,13]])}function te(){var e,t,a,n;return W.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(X.c)(I());case 2:return e=r.sent,t="".concat(Object(F.a)(),"/employees/").concat(e._id),r.prev=4,a=localStorage.getItem("PointOfSaleToken"),r.next=8,Object(X.a)(q.a,t,{body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},method:"DELETE"});case 8:return n=r.sent,console.log(n),r.next=12,Object(X.b)({type:x,employee:n});case 12:r.next=18;break;case 14:r.prev=14,r.t0=r.catch(4),console.log("err"),console.log(r.t0);case 18:case"end":return r.stop()}}),Q,null,[[4,14]])}function ae(){var e,t,a,n;return W.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(X.c)(I());case 2:return e=r.sent,t="".concat(Object(F.a)(),"/employees/").concat(e._id),r.prev=4,a=localStorage.getItem("PointOfSaleToken"),r.next=8,Object(X.a)(q.a,t,{body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},method:"PATCH"});case 8:return n=r.sent,console.log(n),r.next=12,Object(X.b)({type:w,employee:n});case 12:r.next=18;break;case 14:r.prev=14,r.t0=r.catch(4),console.log("err"),console.log(r.t0);case 18:case"end":return r.stop()}}),Z,null,[[4,14]])}function ne(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(X.d)(d,ee);case 2:return e.next=4,Object(X.d)(g,te);case 4:return e.next=6,Object(X.d)(S,ae);case 6:case"end":return e.stop()}}),$)}a.d(t,"mapDispatchToProps",(function(){return se}));var re="employees";Object(M.registerLocale)("es",R.a);var oe=function(e){var t=e.new_employee,a=e.onChangeEmployee,n=e.onSaveEmployee,o=e.changeVisibility;return r.a.createElement("div",{class:"modal-content"},r.a.createElement("div",{class:"modal-header"},r.a.createElement("h5",{class:"modal-title"},"Crear Empleado"),r.a.createElement("button",{type:"button",class:"close",onClick:function(){return o("crtForm",!1)}},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{class:"modal-body"},r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Nombre(s)"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Nombre(s)",value:t.name,onChange:function(e){return a("name",e.target.value)}})),r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Email"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Email",value:t.email,onChange:function(e){return a("email",e.target.value)}})),r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Tel\xe9fono"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Tel\xe9fono",value:t.phone,onChange:function(e){return a("phone",e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Fecha de nacimiento")," ",r.a.createElement("br",null),r.a.createElement(Y.a,{locale:"es",className:"form-control",showMonthDropdown:!0,showYearDropdown:!0,selected:new Date(t.birthday),onSelect:function(e){a("birthday",e)}})),r.a.createElement("div",{className:"btn btn-dark",style:{marginTop:"8px"},onClick:n},"Crear Empleado")))},ce=function(e){var t=e.employee,a=e.changeVisibility,n=e.onUpdateEmployee,o=e.onUpdateSelected;return r.a.createElement("div",{class:"modal-content"},r.a.createElement("div",{class:"modal-header"},r.a.createElement("h5",{class:"modal-title"},"Crear Empleado"),r.a.createElement("button",{type:"button",class:"close",onClick:function(){return a("updtForm",!1)}},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{class:"modal-body"},r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Nombre(s)"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Nombre(s)",value:t.name,onChange:function(e){return n("name",e.target.value)}})),r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Email"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Email",value:t.email,onChange:function(e){return n("email",e.target.value)}})),r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Tel\xe9fono"),r.a.createElement("input",{type:"text",class:"form-control",placeholder:"Tel\xe9fono",value:t.phone,onChange:function(e){return n("phone",e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Fecha de nacimiento")," ",r.a.createElement("br",null),r.a.createElement(Y.a,{locale:"es",className:"form-control",showMonthDropdown:!0,showYearDropdown:!0,selected:new Date(t.birthday),onSelect:function(e){n("birthday",e)}})),r.a.createElement("div",{className:"btn btn-dark",style:{marginTop:"8px"},onClick:o},"Actualizar Empleado")))},le=function(e){var t=e.employees,a=e.changeVisibility,n=e.onDeleteEmployee,o=e.onSelectEmployee;return t.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",{style:{border:"none"},scope:"row"},e._id),r.a.createElement("td",{style:{border:"none"}},e.name),r.a.createElement("td",{style:{border:"none"}},e.email),r.a.createElement("td",{style:{border:"none"}},e.phone),r.a.createElement("td",{style:{border:"none"}},"object"===typeof e.birthday?e.birthday.toLocaleDateString("es-MX"):new Date(e.birthday).toLocaleDateString()),r.a.createElement("td",{style:{border:"none"}},0===e.status?r.a.createElement("span",{class:"badge badge-secondary"},"Inactivo"):r.a.createElement("span",{class:"badge badge-secondary"},"Activo")),r.a.createElement("td",{style:{border:"none"}},r.a.createElement("img",{src:"p.png",style:{height:"16px",cursor:"pointer",margin:"0 4px"},onClick:function(){o(e._id),a("updtForm",!0)}}),r.a.createElement("img",{src:"r.png",style:{height:"16px",cursor:"pointer",margin:"0 4px"},onClick:function(){n(e._id)}})))}))};var ie=Object(s.b)({employees:Object(s.a)(U,(function(e){return e.employees})),form_visibility:Object(s.a)(U,(function(e){return{crtForm:e.is_crtForm_visible,updtForm:e.is_updtForm_visible}})),new_employee:A(),selected_empoyee:I(),filter:Object(s.a)(U,(function(e){return e.filter})),filtered_employees:Object(s.a)(U,(function(e){return e.employees.filter((function(t){return t.name.startsWith(e.filter)}))}))});function se(e){return{onLoadEmployees:function(t){return e(function(e){return{type:u,employees:e}}(t))},changeVisibility:function(t,a){return e(function(e,t){return{type:b,who:e,visibility:t}}(t,a))},onChangeEmployee:function(t,a){return e(function(e,t){switch(e){case"name":return{type:y,name:t};case"email":return{type:f,email:t};case"phone":return{type:h,phone:t};case"birthday":return{type:v,birthday:t}}}(t,a))},onUpdateEmployee:function(t,a){return e(function(e,t){switch(e){case"name":return{type:_,name:t};case"email":return{type:j,email:t};case"phone":return{type:P,phone:t};case"birthday":return{type:k,birthday:t}}}(t,a))},onSaveEmployee:function(){return e({type:d})},onDeleteEmployee:function(t){return e({type:g,_id:t})},onSelectEmployee:function(t){return e({type:O,_id:t})},onUpdateSelected:function(){return e({type:S})},onChangeFilter:function(t){return e((a=t.target.value,{type:N,filter:a}));var a}}}var me=Object(l.c)(ie,se);t.default=Object(i.d)(me,n.memo)((function(e){var t,a,o=e.employees,l=e.form_visibility,i=e.new_employee,s=e.selected_empoyee,u=e.filter,d=e.filtered_employees,E=e.onLoadEmployees,b=e.changeVisibility,y=e.onChangeEmployee,f=e.onSaveEmployee,h=e.onDeleteEmployee,v=e.onSelectEmployee,g=e.onUpdateEmployee,x=e.onUpdateSelected,O=e.onChangeFilter;return Object(m.a)({key:re,reducer:L}),Object(p.a)({key:re,saga:ne}),Object(n.useEffect)((function(){var e="".concat(Object(F.a)(),"/employees");try{var t=localStorage.getItem("PointOfSaleToken");c.a.get(e,{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){var t=e.data;E(t.data)}))}catch(a){console.log("err"),console.log(a)}}),[]),t=r.a.createElement(oe,{new_employee:i,onChangeEmployee:y,onSaveEmployee:f,changeVisibility:b}),a=r.a.createElement(ce,{changeVisibility:b,employee:s,onUpdateEmployee:g,onUpdateSelected:x}),r.a.createElement("div",{className:"container-fluid",style:{padding:"0px"}},r.a.createElement(B.a,{is_active:"employees"}),r.a.createElement(H.a,{is_visible:l.crtForm,children:t}),r.a.createElement(H.a,{is_visible:l.updtForm,children:a}),r.a.createElement("div",{style:{position:"absolute",top:"68px",right:"8px",width:"200px",zIndex:"1"}},r.a.createElement("div",{className:"input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},r.a.createElement(G.a,{src:z.a,alt:"desc",style:{width:"16px",heigth:"100%"}}))),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Buscar",value:u,onChange:O}))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-6"},r.a.createElement("h1",null,"Empleados")),r.a.createElement("div",{className:"col-6"},r.a.createElement("div",{className:"btn btn-dark",style:{marginTop:"12px"},onClick:function(){return b("crtForm",!0)}},"Crear Empleado"))),r.a.createElement("div",{className:"col-12"},r.a.createElement("table",{class:"table table-hover",style:{backgroundColor:"white",borderRadius:"8px",marginTop:"8vh",boxShadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.06), 0px 6px 10px 0px rgba(0, 0, 0, 0.042), 0px 1px 18px 0px rgba(0, 0, 0, 0.036)"}},r.a.createElement("thead",null,r.a.createElement("tr",{style:{color:"rgba(0, 0, 0, 0.54)",fontSize:"12px",lineHeight:"1.3rem",borderRadius:"4px"}},r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"ID"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Nombre"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Email"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Tel\xe9fono"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Cumplea\xf1os"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Estado"),r.a.createElement("th",{style:{borderBottom:"1px solid #dee2e6",borderTop:"none",padding:"0.5rem"},scope:"col"},"Acciones"))),r.a.createElement("tbody",null,""===u?r.a.createElement(le,{employees:o,changeVisibility:b,onDeleteEmployee:h,onSelectEmployee:v}):r.a.createElement(le,{employees:d,changeVisibility:b,onDeleteEmployee:h,onSelectEmployee:v})))))}))},70:function(e,t,a){"use strict";function n(e){return!0}a.d(t,"a",(function(){return n}))},71:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(){return"https://2c5046b9.ngrok.io"}},75:function(e,t,a){"use strict";a(64),a(65),a(68),a(66),a(69);var n=a(0),r=a.n(n),o=(a(14),a(17)),c=a(1),l=a.n(c),i=a(74),s=a(70),m=a(30);function p(e,t){return function(a,n){t||Object(s.a)(e),l()(Object(i.isString)(a)&&!Object(i.isEmpty)(a)&&Object(i.isFunction)(n),"(src/utils...) injectReducer: Expected `reducer` to be a reducer function"),Reflect.has(e.injectedReducers,a)&&e.injectedReducers[a]===n||(e.injectedReducers[a]=n,e.replaceReducer(Object(m.a)(e.injectedReducers)))}}function u(e){return Object(s.a)(e),{injectReducer:p(e,!0)}}a.d(t,"a",(function(){return d}));var d=function(e){var t=e.key,a=e.reducer,n=r.a.useContext(o.b);r.a.useEffect((function(){u(n.store).injectReducer(t,a)}),[])}},76:function(e,t,a){"use strict";var n=a(64),r=a(65),o=a(68),c=a(66),l=a(69),i=a(0),s=a.n(i),m=a(5),p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(c.a)(t).call(this,e))).state={is_loggedIn:!0},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},this.state.is_loggedIn?null:s.a.createElement(m.a,{to:"/PS/login"}),s.a.createElement("a",{className:"navbar-brand",href:"#"},"PS"),s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),s.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarText"},s.a.createElement("ul",{className:"navbar-nav mr-auto"},s.a.createElement("li",{className:"dashboard"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/dashboard"},"Dashboard")),s.a.createElement("li",{className:"employees"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/employees"},"Employees")),s.a.createElement("li",{className:"product"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/ultimate"},"Products")),s.a.createElement("li",{className:"analytics"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/analytics"},"Analytics")),s.a.createElement("li",{className:"flow"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/flow"},"Flujo")),s.a.createElement("li",{className:"cash"===this.props.is_active?"nav-item active":"nav-item"},s.a.createElement("a",{className:"nav-link",href:"/PS/cash"},"Caja"))),s.a.createElement("span",{className:"navbar-text",style:{cursor:"pointer"},onClick:function(){localStorage.removeItem("PointOfSaleToken"),e.setState({is_loggedIn:!1})}},"Cerrar Sesi\xf3n")))}}]),t}(s.a.Component);t.a=p},77:function(e,t,a){"use strict";function n(e){return 204===e.status||205===e.status?null:e.json()}function r(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function o(e,t){return fetch(e,t).then(r).then(n)}a.d(t,"a",(function(){return o}))},79:function(e,t,a){"use strict";a(64),a(65),a(68),a(66),a(69);var n=a(0),r=a.n(n),o=(a(14),a(17)),c=a(31),l=a(1),i=a.n(l),s=a(74),m=a(70),p="@@saga-injector/daemon",u="@@saga-injector/once-till-unmount";function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function E(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(a,!0).forEach((function(t){Object(c.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b=function(e){return i()(Object(s.isString)(e)&&!Object(s.isEmpty)(e),"(app/utils...) injectSaga: Expected `key` to be a non empty string")};function y(e,t){return function(a){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0;t||Object(m.a)(e);var o=E({},n,{mode:n.mode||p}),c=o.saga,l=o.mode;b(a);var i=Reflect.has(e.injectedSagas,a);(!i||i&&l!==p&&l!==u)&&(e.injectedSagas[a]=E({},o,{task:e.runSaga(c,r)}))}}function f(e,t){return function(a){if(t||Object(m.a)(e),b(a),Reflect.has(e.injectedSagas,a)){var n=e.injectedSagas[a];n.mode&&n.mode!==p&&(n.task.cancel(),e.injectedSagas[a]="done")}}}function h(e){return Object(m.a)(e),{injectSaga:y(e,!0),ejectSaga:f(e,!0)}}a.d(t,"a",(function(){return v}));var v=function(e){var t=e.key,a=e.saga,n=e.mode,c=r.a.useContext(o.b);r.a.useEffect((function(){var e=h(c.store);return e.injectSaga(t,{saga:a,mode:n}),function(){e.ejectSaga(t)}}),[])}},89:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(23),c=a.n(o);t.a=function(e){var t=e.is_visible,a=e.children;return c.a.createPortal(r.a.createElement("div",{class:"modal show fade",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLiveLabel","aria-modal":"true",style:{display:t?"block":"none",opacity:t?1:0,backgroundColor:"rgba(0,0,0,0.5)"}},r.a.createElement("div",{class:"modal-dialog",role:"document"},a)),document.body)}}}]);
//# sourceMappingURL=8.f77a1257.chunk.js.map