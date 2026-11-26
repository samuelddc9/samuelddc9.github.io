import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../contact.js',import.meta.url),'utf8');
function setup(fetcher,valid=true){
 const listeners={};const values={name:'Test visitor',email:'visitor@example.com',message:'A local test only.'};
 const controls=Object.fromEntries(Object.keys(values).map(name=>[name,{name,attrs:{},removeAttribute(k){delete this.attrs[k]},setAttribute(k,v){this.attrs[k]=v}}]));
 const errors=Object.fromEntries(Object.keys(values).map(name=>['#contact-'+name+'-error',{textContent:''}]));
 const fieldset={disabled:false};const submit={textContent:'Send message'};const status={textContent:'',dataset:{},focus(){this.focused=true}};
 const form={action:'https://formspree.io/f/xdegjykl',attrs:{},elements:{namedItem:n=>controls[n]},querySelector:s=>s==='fieldset'?fieldset:submit,addEventListener:(name,handler)=>listeners[name]=handler,reportValidity:()=>valid,reset(){this.resetCount=(this.resetCount||0)+1;for(const name in values)values[name]=''},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}};
 class FakeFormData{constructor(){this.entries={...values}}}
 let calls=0;let submitted;
 const fetch=async(url,options)=>{calls++;submitted={url,options};return fetcher(url,options)};
 vm.runInNewContext(source,{document:{querySelector:s=>s==='#contact-form'?form:s==='#contact-status'?status:errors[s]},window:{fetch,FormData:FakeFormData},fetch,FormData:FakeFormData,AbortController,setTimeout,clearTimeout});
 return {form,controls,errors,fieldset,submit,status,values,listeners,get calls(){return calls},get submitted(){return submitted},send:()=>listeners.submit({preventDefault(){}})};
}
let t=setup(async()=>({ok:true}));await t.send();assert.equal(t.calls,1);assert.equal(t.submitted.url,'https://formspree.io/f/xdegjykl');assert.equal(t.submitted.options.method,'POST');assert.equal(t.submitted.options.headers.Accept,'application/json');assert.equal(t.submitted.options.body.entries.email,'visitor@example.com');assert.equal(t.status.dataset.state,'success');assert.equal(t.form.resetCount,1);assert.equal(t.fieldset.disabled,false);
t=setup(async()=>({ok:false,status:422,json:async()=>({errors:[{field:'email',message:'Please use a valid email.'}]})}));await t.send();assert.equal(t.status.dataset.state,'error');assert.equal(t.controls.email.attrs['aria-invalid'],'true');assert.equal(t.errors['#contact-email-error'].textContent,'Please use a valid email.');assert.equal(t.values.message,'A local test only.');t.listeners.input({target:t.controls.email});assert.equal(t.controls.email.attrs['aria-invalid'],undefined);
t=setup(async()=>{throw new Error('Offline')});await t.send();assert.equal(t.status.dataset.state,'error');assert.match(t.status.textContent,/couldn’t confirm delivery/);assert.equal(t.values.message,'A local test only.');assert.equal(t.fieldset.disabled,false);
t=setup(async()=>({ok:false,status:429,json:async()=>({})}));await t.send();assert.match(t.status.textContent,/too many requests/);
t=setup(async()=>({ok:true}),false);await t.send();assert.equal(t.calls,0);
let finish;t=setup(()=>new Promise(resolve=>{finish=resolve}));const first=t.send();assert.equal(t.fieldset.disabled,true);assert.equal(t.submit.textContent,'Sending…');await t.send();assert.equal(t.calls,1);finish({ok:true});await first;assert.equal(t.submit.textContent,'Send message');
console.log('Passed: successful POST, field errors, offline preservation, rate limit, native validation, and duplicate-submit prevention. No external requests were sent.');
