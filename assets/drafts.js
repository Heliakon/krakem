// Unfinished drafts live in this tab's sessionStorage only: they survive navigation and reload, and end with the tab.
// Nothing here touches the network. If storage is blocked or full, the page keeps working without saving.
export function draftStore(key,getStorage=()=>window.sessionStorage){
 let storage=null;
 try{storage=getStorage();const probe=`${key}-probe`;storage.setItem(probe,'1');storage.removeItem(probe);}catch{storage=null;}
 return {
  available:Boolean(storage),
  load(){
   if(!storage)return null;
   try{const value=JSON.parse(storage.getItem(key)??'null');return value&&typeof value==='object'&&!Array.isArray(value)?value:null;}catch{return null;}
  },
  save(value){if(!storage)return false;try{storage.setItem(key,JSON.stringify(value));return true;}catch{return false;}},
  clear(){try{storage?.removeItem(key);}catch{}}
 };
}

// Selects only accept stored values that still match an option, so an outdated draft cannot blank a field.
export function restoreValue(field,value){
 if(typeof value!=='string')return;
 if(field.options&&![...field.options].some(option=>option.value===value))return;
 field.value=value;
}
