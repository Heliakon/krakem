const taskGuidance={
 custom:'Complete my task using the details and constraints I provide. Start with the result I need, then explain what I need to use or check it.',
 compare:'Compare the two subjects below against my goal and criteria. Use equivalent scope and definitions for both. Separate documented features, marketing claims, and your inferences. Cite the source for factual comparisons. Do not infer that a feature is absent because it is not documented. Mark unavailable information as unknown. Do not invent scores, measurements, or a universal winner. Explain which option fits which needs.',
 review:'Review the code for correctness and relevant failure modes. Prioritize material findings by impact. For each finding, identify the relevant code, explain the trigger and impact when supported, and suggest a useful verification step. Do not invent files, behavior, or test results.',
 debug:'Diagnose the problem from the available evidence. Separate confirmed causes from hypotheses. Prioritize checks that distinguish between them before proposing a fix. State what each check would establish.',
 code:'Implement the requested behavior using the supplied requirements and context. If you cannot edit the project, provide the relevant code and explain how to apply it. Explain important changes and assumptions. Show how to verify the result. Do not claim to have run checks that you have not run.',
 architecture:'Assess the architecture against the stated requirements. Explain dependencies, trade-offs, and failure modes. Separate known constraints from assumptions. Make recommendations conditional on those requirements.',
 research:'Investigate the question using relevant primary sources where available. Explain what the sources support, where they disagree, and what remains unknown. Cite factual claims. Distinguish source quality from confidence in your conclusion.',
 paper:'Explain the paper’s research question, method, results, and limitations. Preserve definitions, equations, uncertainty, and the scope of the evidence. Separate the authors’ findings from your interpretation. Do not generalize beyond the conditions studied.',
 summary:'Summarize the supplied material for my stated purpose. Preserve its main points, important qualifications, and relevant numbers. Separate the source’s claims from your interpretation. If essential material is missing, ask for it.',
 procedure:'Explain how to complete the task. Include relevant prerequisites, ordered actions, expected results, and a recovery path when the supplied information supports one.',
 writing:'Write or edit the requested website or presentation text for its intended reader. Preserve facts, qualifications, and technical terms. Remove filler, vague praise, and unsupported promises. Match any supplied voice sample without inventing personal experience.'
};
const answerGuidance={
 text:'Give a clear, structured explanation. Start with the answer. Add the reasoning and details needed to use or check it. Use headings only when they help navigation.',
 steps:'Return numbered instructions in a usable order. Separate actions from explanations. Put conditions before the actions they control. State the expected result where it is known.',
 code:'Return the relevant code with a concise explanation of how to use it. Include dependencies or setup only when needed. Describe meaningful checks and expected results.',
 table:'Use a table with clear column labels, followed by a concise explanation. For comparisons, use explicit criteria and explain trade-offs. Mark unknown values as unknown. Do not invent scores or measurements.',
 checklist:'Give a concise checklist of the actions or checks that my task or source supports. Use concrete, independently checkable items; include expected results or conditions when known. Keep decided facts and open questions as plain text, not checklist items. Do not add actions the source does not state. Mark unknowns instead of guessing.',
 diagram:'Create a compact Mermaid diagram of the relevant components, boundaries, or flow. Use labels that match the explanation. Mark uncertain relationships. Include a short text equivalent.',
 interactive:'Create a single self-contained HTML tool with embedded CSS and JavaScript. Use no external dependencies or network requests. Add labeled controls, visible results, and a reset option. State the model, units, assumptions, and limits. Include a numerical or text alternative and respect reduced-motion preferences.',
 animation:'Create a self-contained HTML animation with embedded CSS and JavaScript. Include play, pause, reset, and step controls. Label each state. State assumptions and distinguish a simplified model from real behavior. Include a text equivalent and reduced-motion support. Use no external dependencies or network requests.'
};
export const defaultFormats={custom:'text',compare:'table',review:'text',debug:'steps',code:'code',architecture:'diagram',research:'text',paper:'text',summary:'text',procedure:'steps',writing:'text'};

function subjectKey(value){
 const text=value.trim();
 try{
  const url=new URL(/^https?:\/\//i.test(text)?text:`https://${text}`);
  if(url.hostname.includes('.')&&!/\s/.test(text))return `${url.host.toLowerCase().replace(/^www\./,'')}${url.pathname.replace(/\/$/,'')}${url.search}${url.hash}`;
 }catch{}
 return text.toLocaleLowerCase().replace(/\s+/g,' ');
}

export function validatePrompt({brief='',task='custom',subjectA='',subjectB='',criteria=''}={}){
 const issues=[];
 if(!brief.trim())issues.push({field:'task-brief',message:task==='compare'?'Describe the decision this comparison should support.':'Describe what you’re working on.'});
 if(task==='compare'){
  if(!subjectA.trim())issues.push({field:'compare-a',message:'Add the first website or product.'});
  if(!subjectB.trim())issues.push({field:'compare-b',message:'Add the second website or product.'});
  if(subjectA.trim()&&subjectB.trim()&&subjectKey(subjectA)===subjectKey(subjectB))issues.push({field:'compare-b',message:'Choose two different subjects to compare.'});
  if(!criteria.trim())issues.push({field:'compare-criteria',message:'Add at least one comparison criterion.'});
 }
 return issues;
}

export function buildTechnicalPrompt({brief='',task='custom',format='text',source='',subjectA='',subjectB='',criteria=''}={}){
 if(validatePrompt({brief,task,subjectA,subjectB,criteria}).length)return '';
 const sections=[`My task:\n${brief.trim()}`,taskGuidance[task]??taskGuidance.custom];
 if(task==='compare')sections.push(`Comparison subjects:\nA: ${subjectA.trim()}\nB: ${subjectB.trim()}\n\nComparison criteria:\n${criteria.trim()}\n\nUse my task above as the comparison goal. If either subject is ambiguous, ask me to identify it before comparing.`);
 sections.push('Make the answer easier to read and act on. Use direct sentences, concrete verbs, consistent terms, and short paragraphs. Use numbered lists for sequential checks or actions. Preserve facts, technical names, units, code, and important qualifications. Distinguish evidence from inference.');
 if(task==='procedure'||format==='steps')sections.push('For procedures, use the spirit of ASD-STE100: aim for 20 words or fewer per sentence. Separate sequential actions. Keep actions together when they must happen simultaneously. Treat this as writing guidance, not a claim of STE compliance.');
 const hasUrl=[brief,source].some(value=>/https?:\/\/\S+/i.test(value));
 if(['compare','research','paper'].includes(task)||hasUrl)sections.push('Respect my source and browsing limits. When browsing is permitted and available, verify time-sensitive claims against current sources. A URL alone is not evidence that you read its contents. If you cannot access a needed source, say so and ask for the relevant material. Do not invent citations or treat unverified claims as established facts.');
 sections.push('If information essential to a correct answer is missing, ask a focused question rather than guessing. Write in the same language as my task unless I request another language.');
 sections.push(`Answer format:\n${task==='compare'&&format==='table'?'Use a comparison table with one row per criterion and a column for each subject. Follow it with a concise explanation of the trade-offs and the limits of the evidence.':answerGuidance[format]??answerGuidance.text}`);
 if(source.trim())sections.push(`Source material for this task:\n${source}`);
 return sections.join('\n\n');
}
