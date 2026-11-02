const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)});
const priority={light:['明るさを「時間」で確かめる','窓の大きさだけでなく、普段家にいる時間帯の光の入り方や周囲の建物も見てみましょう。'],work:['集中する場所と休む場所を分ける','部屋数だけでなく、仕事の道具を片付ける場所、生活音の伝わり方、家族の動線を確認してみましょう。'],family:['一緒にいる時間の動線を見る','ダイニングとキッチンのつながり、帰宅時の荷物の置き場など、家族の1日を思い浮かべて歩いてみましょう。']};
const topic={buy:['希望する暮らしを1つ。','エリア・予算・入居時期が未定でも、今の住まいで変えたいことを整理しておくと、相談の出発点になります。'],sell:['売りたい理由と希望時期を。','住まいの状況、売却を考えたきっかけ、急ぐ事情があるかを整理します。資料がそろっていない場合も、分かることから確認します。'],both:['売却と購入を一緒に整理。','現在の住まいと次の住まい、両方の希望時期を整理します。どちらを先に進めるかは資金や予定によって異なるため、個別に検討します。']};
function setup(key,data){document.querySelectorAll('[data-'+key+']').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-'+key+']').forEach(x=>x.setAttribute('aria-pressed',x===b));let value=data[b.dataset[key]];document.querySelector('#'+key+'-title').textContent=value[0];document.querySelector('#'+key+'-text').textContent=value[1];let a=b.closest('section').querySelector('.answer');animatePanel(a)}))}setup('priority',priority);setup('topic',topic);document.querySelector('#check')?.addEventListener('click',()=>{const list=document.querySelector('#checklist');list.hidden=!list.hidden;document.querySelector('#check').setAttribute('aria-expanded',!list.hidden)});

// Close the mobile navigation predictably for keyboard users and on layout changes.
function closeMenu(){menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){closeMenu();menu.focus()}});
window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu()});
const areas={central:['日々の移動を考える中央エリア','駅や買い物先までの距離だけでなく、通勤時間帯の動線や夜の帰り道まで。普段の生活に合うかを確認する視点を大切にします。'],river:['散歩の時間も楽しむ川辺エリア','家の中だけでなく、散歩する道や周辺の緑も暮らしの一部です。川に近い立地は、自然の心地よさと防災情報の両方を確認します。'],green:['ゆとりある生活を考えるみどり台エリア','庭や部屋の広さを楽しむ一方で、買い物や通院の移動方法も考えます。今の暮らしだけでなく、先の生活にも合うかを整理します。']};
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-area]').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=areas[b.dataset.area];document.querySelector('#area-title').textContent=d[0];document.querySelector('#area-text').textContent=d[1];document.querySelector('.area-detail').dataset.active=b.dataset.area;animatePanel(document.querySelector('.area-detail>div:last-child'))}));
const methods={form:['文章でまとめる相談','相談の種類、気になること、希望時期、ご連絡方法を記入する流れです。最初からすべて決める必要はなく、確認したいことを1つ挙げるところから始めます。'],phone:['まず声で話す相談','購入か売却か、現在の状況と希望時期をお聞きする流れです。資料が手元にない場合は、確認が必要な項目を整理して次の相談につなげます。'],online:['資料を見ながら進める相談','事前に相談内容を整理し、日時を決めて資料を共有する流れです。対面で確認が必要なことは、オンラインで分かる範囲と分けてご案内します。']};
document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>{const d=methods[b.dataset.method],box=document.querySelector('#method-answer');box.hidden=false;document.querySelectorAll('[data-method]').forEach(x=>x.setAttribute('aria-pressed',x===b));animatePanel(box);document.querySelector('#method-title').textContent=d[0];document.querySelector('#method-text').textContent=d[1];box.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})}));


// Motion expresses a change of information, not a uniform entrance effect.
function animatePanel(element){
  if(!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !element.animate)return;
  element.getAnimations().forEach(animation=>animation.cancel());
  element.animate([{opacity:.2,transform:'translateX(10px)'},{opacity:1,transform:'translateX(0)'}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});
}
// Every FAQ starts in the same closed state; readers choose what to open.
document.querySelectorAll('.faq details').forEach(item=>item.removeAttribute('open'));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
const motionTargets=document.querySelectorAll('.split figure,.eyebrow,.cards article,.steps li');
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -15px 0px'});
  motionTargets.forEach(target=>observer.observe(target));
}else{
  motionTargets.forEach(target=>target.classList.add('is-visible'));
}
