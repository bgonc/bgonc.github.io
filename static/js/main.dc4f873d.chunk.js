(this.webpackJsonpcleanfolio=this.webpackJsonpcleanfolio||[]).push([[0],{52:function(e,t,s){},55:function(e,t,s){},56:function(e,t,s){},57:function(e,t,s){},58:function(e,t,s){},59:function(e,t,s){},60:function(e,t,s){},61:function(e,t,s){},62:function(e,t,s){},63:function(e,t,s){},65:function(e,t,s){},67:function(e,t,s){"use strict";s.r(t);var c=s(0),i=s.n(c),n=s(35),r=s.n(n),a=s(5),l=s(1),j=Object(c.createContext)(),o=function(e){var t=e.children,s=Object(c.useState)("light"),i=Object(a.a)(s,2),n=i[0],r=i[1];Object(c.useEffect)((function(){var e=window.matchMedia("(prefers-color-scheme: dark)");r(e.matches?"dark":"light"),e.addEventListener("change",(function(e){r(e.matches?"dark":"light")}))}),[]);return Object(l.jsx)(j.Provider,{value:[{themeName:n,toggleTheme:function(){var e="dark"===n?"light":"dark";localStorage.setItem("themeName",e),r(e)}}],children:t})},b=s(43),h=s(3);const d="https://bgonc.github.io",m="BG",u={name:"Bruno",role:"IT Student",description:"Adipisicing sit fugit ullam unde aliquid sequi Facilis soluta facilis perspiciatis corporis nulla aspernatur. Autem eligendi rerum delectus modi quisquam? Illo ut quasi nemo ipsa cumque perspiciatis! Maiores minima consectetur.",resume:"#/resume",social:{linkedin:"https://linkedin.com/in/brunogoncalvesss/",github:"https://github.com/bgonc"}},x=[{name:"",description:"Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam",stack:["SASS","TypeScript","React"],sourceCode:"https://github.com",livePreview:"https://github.com"},{name:"Project 2",description:"Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam",stack:["SASS","TypeScript","React"],sourceCode:"https://github.com",livePreview:"https://github.com"},{name:"Project 3",description:"Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam",stack:["SASS","TypeScript","React"],sourceCode:"https://github.com",livePreview:"https://github.com"}],O=["C","AWS","Git"],p="bruno.goncalves@posteo.fi";var f=s(38),_=s.n(f),g=s(36),k=s.n(g),N=s(40),v=s.n(N),S=s(39),C=s.n(S),y=(s(52),function(){var e=Object(c.useContext)(j),t=Object(a.a)(e,1)[0],s=t.themeName,i=t.toggleTheme,n=Object(c.useState)(!1),r=Object(a.a)(n,2),o=r[0],b=r[1],h=function(){return b(!o)};return Object(l.jsxs)("nav",{className:"center nav",children:[Object(l.jsxs)("ul",{style:{display:o?"flex":null},className:"nav__list",children:[x.length?Object(l.jsx)("li",{className:"nav__list-item",children:Object(l.jsx)("a",{href:"#projects",onClick:h,className:"link link--nav",children:"Projects"})}):null,O.length?Object(l.jsx)("li",{className:"nav__list-item",children:Object(l.jsx)("a",{href:"#skills",onClick:h,className:"link link--nav",children:"Skills"})}):null,p?Object(l.jsx)("li",{className:"nav__list-item",children:Object(l.jsx)("a",{href:"#contact",onClick:h,className:"link link--nav",children:"Contact"})}):null]}),Object(l.jsx)("button",{type:"button",onClick:i,className:"btn btn--icon nav__theme","aria-label":"toggle theme",children:"dark"===s?Object(l.jsx)(k.a,{}):Object(l.jsx)(_.a,{})}),Object(l.jsx)("button",{type:"button",onClick:h,className:"btn btn--icon nav__hamburger","aria-label":"toggle navigation",children:o?Object(l.jsx)(C.a,{}):Object(l.jsx)(v.a,{})})]})}),P=(s(55),function(){var e=d,t=m;return Object(l.jsxs)("header",{className:"header center",children:[Object(l.jsx)("h3",{children:e?Object(l.jsx)("a",{href:e,className:"link",children:t}):t}),Object(l.jsx)(y,{})]})}),A=s(28),w=s.n(A),q=s(41),L=s.n(q);s(56);var E=()=>{const{name:e,role:t,description:s,resume:c,social:i}=u;return Object(l.jsxs)("div",{className:"about center",children:[e&&Object(l.jsxs)("h1",{children:["Hi, I am ",Object(l.jsx)("span",{className:"about__name",children:e})]}),t&&Object(l.jsxs)("h2",{className:"about__role",children:["an ",t]}),Object(l.jsx)("p",{className:"about__desc",children:s&&s}),Object(l.jsxs)("div",{className:"about__contact center",children:[c&&Object(l.jsx)("a",{href:c,children:Object(l.jsx)("span",{type:"button",className:"btn btn--outline",children:"Resume"})}),i&&Object(l.jsxs)(l.Fragment,{children:[i.github&&Object(l.jsx)("a",{href:i.github,"aria-label":"github",className:"link link--icon",children:Object(l.jsx)(w.a,{})}),i.linkedin&&Object(l.jsx)("a",{href:i.linkedin,"aria-label":"linkedin",className:"link link--icon",children:Object(l.jsx)(L.a,{})})]})]})]})},T=s(18),B=s.n(T),I=s(42),R=s.n(I),V=(s(57),function(e){var t=e.project;return Object(l.jsxs)("div",{className:"project",children:[Object(l.jsx)("h3",{children:t.name}),Object(l.jsx)("p",{className:"project__description",children:t.description}),t.stack&&Object(l.jsx)("ul",{className:"project__stack",children:t.stack.map((function(e){return Object(l.jsx)("li",{className:"project__stack-item",children:e},B()())}))}),t.sourceCode&&Object(l.jsx)("a",{href:t.sourceCode,"aria-label":"source code",className:"link link--icon",children:Object(l.jsx)(w.a,{})}),t.livePreview&&Object(l.jsx)("a",{href:t.livePreview,"aria-label":"live preview",className:"link link--icon",children:Object(l.jsx)(R.a,{})})]})}),G=(s(58),function(){return x.length?Object(l.jsxs)("section",{id:"projects",className:"section projects",children:[Object(l.jsx)("h2",{className:"section__title",children:"Projects"}),Object(l.jsx)("div",{className:"projects__grid",children:x.map((function(e){return Object(l.jsx)(V,{project:e},B()())}))})]}):null}),F=(s(59),function(){return O.length?Object(l.jsxs)("section",{className:"section skills",id:"skills",children:[Object(l.jsx)("h2",{className:"section__title",children:"Skills"}),Object(l.jsx)("ul",{className:"skills__list",children:O.map((function(e){return Object(l.jsx)("li",{className:"skills__list-item btn btn--plain",children:e},B()())}))})]}):null}),M=(s(60),function(){return p?Object(l.jsxs)("section",{className:"section contact center",id:"contact",children:[Object(l.jsx)("h2",{className:"section__title",children:"Contact"}),Object(l.jsx)("a",{href:"mailto:".concat(p),children:Object(l.jsx)("span",{type:"button",className:"btn btn--outline",children:"Email me"})})]}):null});s(61);var W=()=>Object(l.jsx)("footer",{className:"footer",children:Object(l.jsxs)("p",{className:"footer__text",children:["\xa9 2024 Bruno Goncalves."," ",Object(l.jsx)("a",{href:"https://github.com/rjshkhr/cleanfolio",target:"_blank",rel:"noopener noreferrer",className:"footer__link",children:Object(l.jsx)("em",{children:"Cleanfolio"})})," ","theme."]})});s(62);var D=()=>Object(l.jsxs)("div",{className:"resume",children:[Object(l.jsx)("h1",{className:"resume__title",children:"Bruno Gon\xe7alves - Resume"}),Object(l.jsxs)("section",{className:"resume__section",children:[Object(l.jsx)("h2",{className:"resume__section-title",children:"Summary"}),Object(l.jsx)("p",{children:"Aspiring IT professional and programmer with certifications in AWS, Linux Essentials, and Lean Six Sigma. Passionate about learning, problem-solving, and building impactful projects."})]}),Object(l.jsxs)("section",{className:"resume__section",children:[Object(l.jsx)("h2",{className:"resume__section-title",children:"Education"}),Object(l.jsxs)("p",{children:[Object(l.jsx)("strong",{children:"Bachelor's in IT Engineering"}),Object(l.jsx)("br",{}),"University Aberta, 2024 - Present"]})]}),Object(l.jsxs)("section",{className:"resume__section",children:[Object(l.jsx)("h2",{className:"resume__section-title",children:"Certifications"}),Object(l.jsxs)("table",{className:"resume__table",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Certification"}),Object(l.jsx)("th",{children:"Status"}),Object(l.jsx)("th",{children:"Link"})]})}),Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"AWS Certified Cloud Practitioner"}),Object(l.jsx)("td",{children:"Active"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{className:"resume__link",href:"https://cp.certmetrics.com/amazon/en/public/verify/credential/4daba3c5b8f94a68954ba1834e502af0",target:"_blank",rel:"noopener noreferrer",children:"Verify"})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"Linux Essentials"}),Object(l.jsx)("td",{children:"Active"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{className:"resume__link",href:"https://lpi.org/v/LPI000611806/r7maujk2d2",target:"_blank",rel:"noopener noreferrer",children:"Verify"})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"Lean Six Sigma Black Belt"}),Object(l.jsx)("td",{children:"Active"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{className:"resume__link",href:"https://the.glss.app/public/certificates/75138",target:"_blank",rel:"noopener noreferrer",children:"Verify"})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"Cisco Certified Network Associate (CCNA)"}),Object(l.jsx)("td",{children:"Expired"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{className:"resume__link",href:"/assets/images/ccna.jpg",target:"_blank",rel:"noopener noreferrer",children:"View Certificate"})})]})]})]})]}),Object(l.jsxs)("section",{className:"resume__section",children:[Object(l.jsx)("h2",{className:"resume__section-title",children:"Experience"}),Object(l.jsxs)("p",{children:[Object(l.jsx)("strong",{children:"Team Lead - Portuguese Customer Service"}),Object(l.jsx)("br",{}),"Swappie, Helsinki, Finland (2011 - Present)"]}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"Lead and manage a team to deliver excellent customer support."}),Object(l.jsx)("li",{children:"Collaborate with cross-functional teams to improve operations."})]})]}),Object(l.jsxs)("section",{className:"resume__section",children:[Object(l.jsx)("h2",{className:"resume__section-title",children:"Skills"}),Object(l.jsxs)("ul",{children:[Object(l.jsxs)("li",{children:[Object(l.jsx)("strong",{children:"Programming Languages:"})," C (beginner), Python (beginner)"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("strong",{children:"Tools:"})," GitHub, Linux Systems, Debugging"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("strong",{children:"Certifications:"})," AWS, Networking, Process Improvement"]})]})]}),Object(l.jsx)("section",{className:"resume__section",children:Object(l.jsx)("a",{className:"resume__link",href:"/assets/Bruno_Goncalves_resume.pdf",target:"_blank",rel:"noopener noreferrer",children:"Download My Resume as PDF"})})]});s(63);const H=()=>Object(l.jsxs)("main",{children:[Object(l.jsx)(E,{}),Object(l.jsx)(G,{}),Object(l.jsx)(F,{}),Object(l.jsx)(M,{})]});var J=()=>{const[{themeName:e}]=Object(c.useContext)(j);return Object(l.jsx)(b.a,{children:Object(l.jsxs)("div",{id:"top",className:"".concat(e," app"),children:[Object(l.jsx)(P,{}),Object(l.jsxs)(h.d,{children:[Object(l.jsx)(h.b,{path:"/",element:Object(l.jsx)(H,{})}),Object(l.jsx)(h.b,{path:"/resume",element:Object(l.jsx)(D,{})}),Object(l.jsx)(h.b,{path:"*",element:Object(l.jsx)(h.a,{to:"/"})})]}),Object(l.jsx)(W,{})]})})};s(65);r.a.createRoot(document.getElementById("root")).render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(o,{children:Object(l.jsx)(J,{})})}))}},[[67,1,2]]]);
//# sourceMappingURL=main.dc4f873d.chunk.js.map