const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)});
const priority={light:['明るさを「時間」で確かめる','窓の大きさだけでなく、普段家にいる時間帯の光の入り方や周囲の建物も見てみましょう。'],work:['集中する場所と休む場所を分ける','部屋数だけでなく、仕事の道具を片付ける場所、生活音の伝わり方、家族の動線を確認してみましょう。'],family:['一緒にいる時間の動線を見る','ダイニングとキッチンのつながり、帰宅時の荷物の置き場など、家族の1日を思い浮かべて歩いてみましょう。']};
const topic={buy:['希望する暮らしを1つ。','エリア・予算・入居時期が未定でも、今の住まいで変えたいことを整理しておくと、相談の出発点になります。'],sell:['売りたい理由と希望時期を。','住まいの状況、売却を考えたきっかけ、急ぐ事情があるかを整理します。資料がそろっていない場合も、分かることから確認します。'],both:['売却と購入を一緒に整理。','現在の住まいと次の住まい、両方の希望時期を整理します。どちらを先に進めるかは資金や予定によって異なるため、個別に検討します。']};
function setup(key,data){document.querySelectorAll('[data-'+key+']').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-'+key+']').forEach(x=>x.setAttribute('aria-pressed',x===b));if(key==='topic'){const topicField=document.querySelector('#form-topic');if(topicField){topicField.value=b.dataset[key];topicField.dispatchEvent(new Event('change',{bubbles:true}))}}let value=data[b.dataset[key]];document.querySelector('#'+key+'-title').textContent=value[0];document.querySelector('#'+key+'-text').textContent=value[1];let a=b.closest('section').querySelector('.answer');animatePanel(a)}))}setup('priority',priority);setup('topic',topic);document.querySelector('#check')?.addEventListener('click',()=>{const list=document.querySelector('#checklist');list.hidden=!list.hidden;document.querySelector('#check').setAttribute('aria-expanded',!list.hidden)});

// Close the mobile navigation predictably for keyboard users and on layout changes.
function closeMenu(){menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){closeMenu();menu.focus()}});
window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu()});
const areas={central:['日々の移動を考える中央エリア','駅や買い物先までの距離だけでなく、通勤時間帯の動線や夜の帰り道まで。普段の生活に合うかを確認する視点を大切にします。'],river:['散歩の時間も楽しむ川辺エリア','家の中だけでなく、散歩する道や周辺の緑も暮らしの一部です。川に近い立地は、自然の心地よさと防災情報の両方を確認します。'],green:['ゆとりある生活を考えるみどり台エリア','庭や部屋の広さを楽しむ一方で、買い物や通院の移動方法も考えます。今の暮らしだけでなく、先の生活にも合うかを整理します。']};
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-area]').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=areas[b.dataset.area];document.querySelector('#area-title').textContent=d[0];document.querySelector('#area-text').textContent=d[1];document.querySelector('.area-detail').dataset.active=b.dataset.area;animatePanel(document.querySelector('.area-detail>div:last-child'))}));
const methods={visit:['資料を広げて話す対面相談','ご希望の相談内容を整理し、日時を調整して対面で話す流れです。資料を一緒に見ながら確認し、その場で分からない点は持ち帰って確かめます。'],form:['文章でまとめる相談','相談の種類、気になること、希望時期、ご連絡方法を記入する流れです。最初からすべて決める必要はなく、確認したいことを1つ挙げるところから始めます。'],phone:['まず声で話す相談','購入か売却か、現在の状況と希望時期をお聞きする流れです。資料が手元にない場合は、確認が必要な項目を整理して次の相談につなげます。'],online:['資料を見ながら進める相談','事前に相談内容を整理し、日時を決めて資料を共有する流れです。対面で確認が必要なことは、オンラインで分かる範囲と分けてご案内します。']};
document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>{const d=methods[b.dataset.method],box=document.querySelector('#method-answer');box.hidden=false;document.querySelectorAll('[data-method]').forEach(x=>x.setAttribute('aria-pressed',x===b));animatePanel(box);document.querySelector('#method-title').textContent=d[0];document.querySelector('#method-text').textContent=d[1];const editForm=document.querySelector('#consult-form'),preview=document.querySelector('#form-preview');if(editForm)editForm.hidden=false;if(preview)preview.hidden=true;const field=document.querySelector('#form-method');if(field){field.value=b.dataset.method;field.dispatchEvent(new Event('change',{bubbles:true}))}const form=document.querySelector('#consultation')||document.querySelector('#consult-form');(form||box).scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}));


// Motion expresses a change of information, not a uniform entrance effect.
function animatePanel(element){
  if(!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !element.animate)return;
  element.getAnimations().forEach(animation=>animation.cancel());
  element.animate([{opacity:.2,transform:'translateX(10px)'},{opacity:1,transform:'translateX(0)'}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});
}
// Every FAQ starts in the same closed state; readers choose what to open.
document.querySelectorAll('.faq details').forEach(item=>item.removeAttribute('open'));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
const motionTargets=document.querySelectorAll('.split figure,.eyebrow,.cards article,.steps li,.money-flow');
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    });
  },{threshold:0,rootMargin:'0px 0px 0px 0px'});
  motionTargets.forEach(target=>observer.observe(target));
}else{
  motionTargets.forEach(target=>target.classList.add('is-visible'));
}

// Follow the decision, not a decoration: the selected numbered item stays readable.
function enhanceDecisionSequence(group,index){
  const items=[...group.children].filter(item=>item.matches('article,li'));
  if(items.length<2 || !items.every(item=>item.querySelector('.num') || item.matches('li')&&item.firstElementChild?.matches('span')))return;
  let userSelected=false,timers=[],selected=-1;
  const picks=[];
  const stopTour=()=>{timers.forEach(clearTimeout);timers=[]};
  function select(position,manual=false){
    if(manual){userSelected=true;stopTour()}
    if(selected===position)return;
    selected=position;
    group.style.setProperty('--sequence-progress',((position+1)/items.length*100)+'%');
    group.style.setProperty('--progress-ratio',String(position/(items.length-1)));
    items.forEach((item,i)=>{
      item.classList.toggle('decision-active',i===position);
      item.classList.toggle('decision-passed',i<position);
      picks[i].setAttribute('aria-pressed',String(i===position));
    });
  }
  items.forEach((item,i)=>{
    const number=item.querySelector('.num') || item.firstElementChild;
    const title=item.querySelector('h3')?.textContent || number.textContent;
    const pick=document.createElement('button');
    pick.type='button';pick.className='sequence-pick';pick.setAttribute('aria-label','手順'+(i+1)+'を確認 '+title);pick.setAttribute('aria-pressed','false');
    pick.textContent=number.textContent;number.replaceWith(pick);picks.push(pick);
    pick.addEventListener('click',()=>select(i,true));
    pick.addEventListener('focus',()=>select(i,true));
    pick.addEventListener('keydown',event=>{
      let next=i;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%items.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i+items.length-1)%items.length;
      else return;
      event.preventDefault();picks[next].focus();
    });
    item.classList.add('decision-item');
  });
  group.classList.add('decision-sequence');
  group.setAttribute('aria-label',group.classList.contains('steps')?'相談から手続きまでの順序':'判断のための確認項目');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){select(0);return}
  if(group.classList.contains('steps')){
    // As each stage reaches the reading position, its number and the connecting rail advance.
    let scheduled=false;
    function followReadingPosition(){
      scheduled=false;if(userSelected)return;
      const viewport=window.innerHeight,readingLine=viewport*.45;
      const candidates=items.map((item,i)=>({i,rect:item.getBoundingClientRect()})).filter(x=>x.rect.bottom>90&&x.rect.top<viewport*.85);
      if(!candidates.length)return;
      candidates.sort((a,b)=>Math.abs(a.rect.top+a.rect.height*.35-readingLine)-Math.abs(b.rect.top+b.rect.height*.35-readingLine));
      select(candidates[0].i);
    }
    window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(followReadingPosition)}},{passive:true});
    window.addEventListener('resize',followReadingPosition);
    followReadingPosition();
  }else if('IntersectionObserver' in window){
    const tour=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(!entry.isIntersecting)return;tour.disconnect();if(userSelected)return;
        select(0);items.slice(1).forEach((_,i)=>timers.push(setTimeout(()=>{if(!userSelected)select(i+1)},(i+1)*1100)));
      });
    },{threshold:.3});
    tour.observe(group);
  }else select(0);
}
document.querySelectorAll('.steps,.cards').forEach(enhanceDecisionSequence);
