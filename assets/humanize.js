import {buildEditingBrief,validateEditingBrief,briefLanguages} from './humanize-brief.js';
import {draftStore,restoreValue} from './drafts.js';
import {language,text} from './i18n.js';
const t=text.humanize,examples=t.examples;
document.querySelectorAll('[data-voice]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-voice]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));const ex=examples[b.dataset.voice];for(const id of['voice-before','voice-after','voice-reason'])document.getElementById(id).lang=ex.lang;document.getElementById('voice-before').textContent=ex.before;document.getElementById('voice-after').innerHTML=ex.after;document.getElementById('voice-reason').textContent=ex.reason;}));
const briefLanguage=document.getElementById('writing-language'),surface=document.getElementById('writing-surface'),audience=document.getElementById('writing-audience'),original=document.getElementById('writing-original'),sample=document.getElementById('writing-sample');
const output=document.getElementById('writing-prompt'),copy=document.getElementById('copy-writing-prompt'),status=document.getElementById('writing-state'),checklist=document.getElementById('writing-checklist'),issueList=document.getElementById('writing-issues');
const clearDraft=document.getElementById('clear-humanize-draft'),draftNote=document.getElementById('humanize-draft-note');
const draft=draftStore('krakem-humanize-draft'),draftFields={language:briefLanguage,surface,audience,original,sample};
// The brief starts in the page's language when one is available.
const defaults={language:briefLanguages.includes(language)?language:'en',surface:'website',audience:'',original:'',sample:''};
briefLanguage.value=defaults.language;
function build(){
 const values={lang:briefLanguage.value,surface:surface.value,audience:audience.value,original:original.value,sample:sample.value,ui:language};
 const issues=validateEditingBrief(values),prompt=buildEditingBrief(values),started=[audience,original,sample].some(field=>field.value.trim());
 copy.disabled=!prompt;
 output.textContent=prompt||t.empty;
 output.lang=prompt?values.lang:language;
 output.classList.toggle('empty-prompt',!prompt);
 checklist.hidden=!started||!issues.length;
 issueList.replaceChildren(...issues.map(issue=>{const item=document.createElement('li'),link=document.createElement('a');link.href='#'+issue.field;link.textContent=issue.message;link.addEventListener('click',event=>{event.preventDefault();document.getElementById(issue.field).focus();});item.append(link);return item;}));
 const message=prompt?(sample.value.trim()?t.readySample:t.ready):started?t.detailsLeft(issues.length):t.start;
 if(status.textContent!==message)status.textContent=message;
 status.classList.toggle('ready',Boolean(prompt));
}
function edited(){return Object.entries(draftFields).some(([key,field])=>field.value!==defaults[key]);}
const keptNote=text.drafts.kept;
let saveFailed=false;
function saveDraft(){
 const dirty=edited(),saved=!dirty||draft.save(Object.fromEntries(Object.entries(draftFields).map(([key,field])=>[key,field.value])));
 // A failed save would leave the previous draft behind; remove it so a reload cannot restore stale text.
 if(!dirty||!saved)draft.clear();
 if(draft.available&&saved===saveFailed){
  saveFailed=!saved;draftNote.textContent=saveFailed?t.draftFailed:keptNote;
  if(saveFailed)window.dispatchEvent(new CustomEvent('krakem-toast',{detail:text.drafts.failedToast}));
 }
 clearDraft.disabled=!dirty;
}
function update(){build();saveDraft();}
Object.values(draftFields).forEach(field=>field.addEventListener('input',update));
clearDraft.addEventListener('click',()=>{
 for(const [key,field] of Object.entries(draftFields))field.value=defaults[key];
 build();saveDraft();audience.focus();
 window.dispatchEvent(new CustomEvent('krakem-toast',{detail:text.drafts.cleared}));
});
const saved=draft.load();
if(saved)for(const [key,field] of Object.entries(draftFields))restoreValue(field,saved[key]);
draftNote.textContent=draft.available?keptNote:t.draftUnavailable;
build();clearDraft.disabled=!edited();
