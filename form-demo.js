// Deliberately local-only: no storage, fetch, submission or contact action.
const demoForm=document.querySelector('#consult-form');
const preview=document.querySelector('#form-preview');
demoForm.addEventListener('submit',event=>{
 event.preventDefault();
 const output=document.querySelector('#preview-content');output.replaceChildren();
 const fields=[['ご相談の種類','topic'],['相談方法','method'],['希望時期','timing'],['お名前（入力例）','demo-name'],['メールアドレス（入力例）','demo-email'],['ご相談内容','message']];
 fields.forEach(([label,name])=>{const el=demoForm.elements.namedItem(name),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=el.tagName==='SELECT'?el.selectedOptions[0].text:el.value.trim()||'未入力';output.append(dt,dd)});
 preview.hidden=false;demoForm.hidden=true;preview.focus({preventScroll:true});preview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
});
document.querySelector('#back-to-form').addEventListener('click',()=>{preview.hidden=true;demoForm.hidden=false;document.querySelector('#form-topic').focus()});

demoForm.querySelector('[type=submit]').disabled=false;
