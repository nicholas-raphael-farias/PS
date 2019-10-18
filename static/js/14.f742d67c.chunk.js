(window.webpackJsonpps=window.webpackJsonpps||[]).push([[14],{368:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(91),o=a.n(c),i=a(17),s=a(10),l=a(71),u=a(72),d=a(75),m=a(79),p=a(76),f=a(89),v="ps/ProductsPage/LOAD_PRODUCTS",b="ps/ProductsPage/SAVE_PRODUCT",g="ps/ProductsPage/CREATE_PRODUCT",P="ps/ProductsPage/MAKE_FORM_VISIBLE",h="ps/ProductsPage/CHANGE_PRODUCT_NAME",E="ps/ProductsPage/CHANGE_PRODUCT_HAS_PRICE",j="ps/ProductsPage/CHANGE_PRODUCT_PRICE";function y(e){return{type:g,product:e}}var O=a(80),k={products:[],isCreatePrdFormVisible:!1,productName:"",productHasPrice:!1,productPrice:0},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;return Object(O.a)(e,(function(e){switch(t.type){case h:e.productName=t.name;break;case E:e.productHasPrice=t.hasPrice,e.productPrice=0;break;case j:e.productPrice=t.price;break;case v:e.products=t.products;break;case b:break;case g:e.products=e.products.concat([t.product]),e.productName="",e.productPrice="",e.isCreatePrdFormVisible=!1;break;case P:switch(t.form){case"createProductForm":e.isCreatePrdFormVisible=t.visibility}}}))},C=function(e){return e.products||k},N=function(){return Object(u.a)(C,(function(e){return{name:e.productName,modifiers:[],type:0,price:e.productPrice}}))},x=a(85),w=a.n(x),_=a(86),R=a(77),T=w.a.mark(D),F=w.a.mark(V);function D(){var e,t,a,r;return w.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(_.c)(N());case 2:return e=n.sent,t="".concat(Object(l.a)(),"/products"),n.prev=4,a=localStorage.getItem("PointOfSaleToken"),n.next=8,Object(_.a)(R.a,t,{body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},method:"POST"});case 8:return r=n.sent,n.next=11,Object(_.b)(y(r));case 11:n.next=17;break;case 13:n.prev=13,n.t0=n.catch(4),console.log("err"),console.log(n.t0);case 17:case"end":return n.stop()}}),T,null,[[4,13]])}function V(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)(b,D);case 2:case"end":return e.stop()}}),F)}a.d(t,"ProductPage",(function(){return H})),a.d(t,"mapDispatchToProps",(function(){return M}));var A="products",I=function(e){var t=e.product;return n.a.createElement("a",{href:"/ultimate/".concat(t._id),style:{color:"black"}},n.a.createElement("div",{className:"card",style:{width:"240px",margin:"8px"}},n.a.createElement("div",{class:"modal-header"},n.a.createElement("span",null,t.name),n.a.createElement("span",null,function(){switch(t.price){case 0:return"Sin precio";default:return"$ ".concat(t.price)}}())),n.a.createElement("div",{className:"card-body"},t.modifiers.map((function(e){return n.a.createElement("div",{className:"btn btn-dark",style:{margin:"4px"}},e.name)})))))},L=function(e){var t=e.product,a=e.onChangeProduct,r=e.onSaveProduct,c=e.makeFormVisible;return n.a.createElement("div",{class:"modal-content"},n.a.createElement("div",{class:"modal-header"},n.a.createElement("h5",{class:"modal-title",id:"exampleModalLiveLabel"},"Crear Producto"),n.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",onClick:function(){return c("createProductForm",!1)}},n.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),n.a.createElement("div",{class:"modal-body"},n.a.createElement("div",{class:"form-group"},n.a.createElement("label",{for:"exampleInputEmail1"},"Nombre del Producto"),n.a.createElement("input",{type:"text",class:"form-control",placeholder:"Nombre del Producto",value:t.name,onChange:function(e){return a("name",e.target.value)}})),n.a.createElement("div",{class:"form-check"},n.a.createElement("input",{type:"checkbox",class:"form-check-input",checked:t.hasPrice,onChange:function(e){return a("hasPrice",e.target.checked)}}),n.a.createElement("label",{class:"form-check-label",for:"defaultCheck1"},"Tiene precio?")),t.hasPrice?n.a.createElement("div",{class:"form-group"},n.a.createElement("label",{for:"exampleInputEmail1"},"Precio del producto"),n.a.createElement("input",{type:"text",class:"form-control",placeholder:"Precio",value:t.price,onChange:function(e){return a("price",e.target.value)}})):null,n.a.createElement("div",{className:"btn btn-dark",style:{marginTop:"8px"},onClick:r},"Crear Producto")))};function H(e){var t,a=e.products,c=e.product,i=e.formStatus,s=e.onLoadProducts,u=e.makeFormVisible,v=e.onChangeProduct,b=e.onSaveProduct;return Object(d.a)({key:A,reducer:S}),Object(m.a)({key:A,saga:V}),Object(r.useEffect)((function(){var e="".concat(Object(l.a)(),"/products");try{var t=localStorage.getItem("PointOfSaleToken");o.a.get(e,{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){var t=e.data;console.log(t.data),s(t.data)}))}catch(a){console.log("err"),console.log(a)}}),[]),t=n.a.createElement(L,{product:c,onChangeProduct:v,onSaveProduct:b,makeFormVisible:u}),n.a.createElement("div",{className:"container-fluid",style:{padding:"0px"}},n.a.createElement(p.a,{is_active:"product"}),n.a.createElement(f.a,{is_visible:i.isVisibleCreateProd,children:t}),n.a.createElement("div",{className:"row justify-content-center"},n.a.createElement("div",{className:"col-6"},n.a.createElement("h1",null,"Productos")),n.a.createElement("div",{className:"col-6"},n.a.createElement("div",{className:"btn btn-dark",style:{marginTop:"12px"},onClick:function(){return u("createProductForm",!0)}},"Crear Producto"))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12",style:{display:"flex",flexWrap:"wrap",justifyContent:"center"}},a.map((function(e){return n.a.createElement(I,{product:e,makeFormVisible:u})})))))}var U=Object(u.b)({products:Object(u.a)(C,(function(e){return e.products})),product:Object(u.a)(C,(function(e){return{name:e.productName,hasPrice:e.productHasPrice,price:e.productPrice}})),formStatus:Object(u.a)(C,(function(e){return{isVisibleCreateProd:e.isCreatePrdFormVisible}})),newProduct:N()});function M(e){return{onLoadProducts:function(t){return e(function(e){return{type:v,products:e}}(t))},makeFormVisible:function(t,a){return e(function(e,t){return{type:P,form:e,visibility:t}}(t,a))},onChangeProduct:function(t,a){return e(function(e,t){switch(e){case"name":return{type:h,name:t};case"hasPrice":return{type:E,hasPrice:t};case"price":return{type:j,price:t}}}(t,a))},onSaveProduct:function(){return e({type:b})}}}var B=Object(i.c)(U,M);t.default=Object(s.d)(B,r.memo)(H)},70:function(e,t,a){"use strict";function r(e){return!0}a.d(t,"a",(function(){return r}))},71:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r=function(){return"https://e7c274ef.ngrok.io"}},75:function(e,t,a){"use strict";a(64),a(65),a(68),a(66),a(69);var r=a(0),n=a.n(r),c=(a(14),a(17)),o=a(1),i=a.n(o),s=a(74),l=a(70),u=a(30);function d(e,t){return function(a,r){t||Object(l.a)(e),i()(Object(s.isString)(a)&&!Object(s.isEmpty)(a)&&Object(s.isFunction)(r),"(src/utils...) injectReducer: Expected `reducer` to be a reducer function"),Reflect.has(e.injectedReducers,a)&&e.injectedReducers[a]===r||(e.injectedReducers[a]=r,e.replaceReducer(Object(u.a)(e.injectedReducers)))}}function m(e){return Object(l.a)(e),{injectReducer:d(e,!0)}}a.d(t,"a",(function(){return p}));var p=function(e){var t=e.key,a=e.reducer,r=n.a.useContext(c.b);n.a.useEffect((function(){m(r.store).injectReducer(t,a)}),[])}},76:function(e,t,a){"use strict";var r=a(64),n=a(65),c=a(68),o=a(66),i=a(69),s=a(0),l=a.n(s),u=a(5),d=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={is_loggedIn:!0},a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},this.state.is_loggedIn?null:l.a.createElement(u.a,{to:"/PS/login"}),l.a.createElement("a",{className:"navbar-brand",href:"#"},"PS"),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarText"},l.a.createElement("ul",{className:"navbar-nav mr-auto"},l.a.createElement("li",{className:"dashboard"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/dashboard"},"Dashboard")),l.a.createElement("li",{className:"employees"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/employees"},"Employees")),l.a.createElement("li",{className:"product"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/ultimate"},"Products")),l.a.createElement("li",{className:"analytics"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/analytics"},"Analytics")),l.a.createElement("li",{className:"flow"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/flow"},"Flujo")),l.a.createElement("li",{className:"cash"===this.props.is_active?"nav-item active":"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/PS/cash"},"Caja"))),l.a.createElement("span",{className:"navbar-text",style:{cursor:"pointer"},onClick:function(){localStorage.removeItem("PointOfSaleToken"),e.setState({is_loggedIn:!1})}},"Cerrar Sesi\xf3n")))}}]),t}(l.a.Component);t.a=d},77:function(e,t,a){"use strict";function r(e){return 204===e.status||205===e.status?null:e.json()}function n(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function c(e,t){return fetch(e,t).then(n).then(r)}a.d(t,"a",(function(){return c}))},79:function(e,t,a){"use strict";a(64),a(65),a(68),a(66),a(69);var r=a(0),n=a.n(r),c=(a(14),a(17)),o=a(31),i=a(1),s=a.n(i),l=a(74),u=a(70),d="@@saga-injector/daemon",m="@@saga-injector/once-till-unmount";function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(a,!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var v=function(e){return s()(Object(l.isString)(e)&&!Object(l.isEmpty)(e),"(app/utils...) injectSaga: Expected `key` to be a non empty string")};function b(e,t){return function(a){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;t||Object(u.a)(e);var c=f({},r,{mode:r.mode||d}),o=c.saga,i=c.mode;v(a);var s=Reflect.has(e.injectedSagas,a);(!s||s&&i!==d&&i!==m)&&(e.injectedSagas[a]=f({},c,{task:e.runSaga(o,n)}))}}function g(e,t){return function(a){if(t||Object(u.a)(e),v(a),Reflect.has(e.injectedSagas,a)){var r=e.injectedSagas[a];r.mode&&r.mode!==d&&(r.task.cancel(),e.injectedSagas[a]="done")}}}function P(e){return Object(u.a)(e),{injectSaga:b(e,!0),ejectSaga:g(e,!0)}}a.d(t,"a",(function(){return h}));var h=function(e){var t=e.key,a=e.saga,r=e.mode,o=n.a.useContext(c.b);n.a.useEffect((function(){var e=P(o.store);return e.injectSaga(t,{saga:a,mode:r}),function(){e.ejectSaga(t)}}),[])}},89:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(23),o=a.n(c);t.a=function(e){var t=e.is_visible,a=e.children;return o.a.createPortal(n.a.createElement("div",{class:"modal show fade",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLiveLabel","aria-modal":"true",style:{display:t?"block":"none",opacity:t?1:0,backgroundColor:"rgba(0,0,0,0.5)"}},n.a.createElement("div",{class:"modal-dialog",role:"document"},a)),document.body)}}}]);
//# sourceMappingURL=14.f742d67c.chunk.js.map