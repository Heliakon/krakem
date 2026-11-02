// English text for the site's scripts. text-pl.js and text-sv.js use the same keys; the checks compare them.
// Values may contain HTML only where a script sets innerHTML (the "after" examples).
export const en={
 prompt:{
  task:{
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
  },
  answer:{
   text:'Give a clear, structured explanation. Start with the answer. Add the reasoning and details needed to use or check it. Use headings only when they help navigation.',
   steps:'Return numbered instructions in a usable order. Separate actions from explanations. Put conditions before the actions they control. State the expected result where it is known.',
   code:'Return the relevant code with a concise explanation of how to use it. Include dependencies or setup only when needed. Describe meaningful checks and expected results.',
   table:'Use a table with clear column labels, followed by a concise explanation. For comparisons, use explicit criteria and explain trade-offs. Mark unknown values as unknown. Do not invent scores or measurements.',
   checklist:'Give a concise checklist of the actions or checks that my task or source supports. Use concrete, independently checkable items; include expected results or conditions when known. Keep decided facts and open questions as plain text, not checklist items. Do not add actions the source does not state. Mark unknowns instead of guessing.',
   diagram:'Create a compact Mermaid diagram of the relevant components, boundaries, or flow. Use labels that match the explanation. Mark uncertain relationships. Include a short text equivalent.',
   interactive:'Create a single self-contained HTML tool with embedded CSS and JavaScript. Use no external dependencies or network requests. Add labeled controls, visible results, and a reset option. State the model, units, assumptions, and limits. Include a numerical or text alternative and respect reduced-motion preferences.',
   animation:'Create a self-contained HTML animation with embedded CSS and JavaScript. Include play, pause, reset, and step controls. Label each state. State assumptions and distinguish a simplified model from real behavior. Include a text equivalent and reduced-motion support. Use no external dependencies or network requests.'
  },
  myTask:'My task:',
  comparison:(a,b,criteria)=>`Comparison subjects:\nA: ${a}\nB: ${b}\n\nComparison criteria:\n${criteria}\n\nUse my task above as the comparison goal. If either subject is ambiguous, ask me to identify it before comparing.`,
  readable:'Make the answer easier to read and act on. Use direct sentences, concrete verbs, consistent terms, and short paragraphs. Use numbered lists for sequential checks or actions. Preserve facts, technical names, units, code, and important qualifications. Distinguish evidence from inference.',
  procedure:'For procedures, use the spirit of ASD-STE100: aim for 20 words or fewer per sentence. Separate sequential actions. Keep actions together when they must happen simultaneously. Treat this as writing guidance, not a claim of STE compliance.',
  sources:'Respect my source and browsing limits. When browsing is permitted and available, verify time-sensitive claims against current sources. A URL alone is not evidence that you read its contents. If you cannot access a needed source, say so and ask for the relevant material. Do not invent citations or treat unverified claims as established facts.',
  missing:'If information essential to a correct answer is missing, ask a focused question rather than guessing. Write in the same language as my task unless I request another language.',
  answerFormat:'Answer format:',
  compareTable:'Use a comparison table with one row per criterion and a column for each subject. Follow it with a concise explanation of the trade-offs and the limits of the evidence.',
  sourceMaterial:'Source material for this task:',
  issues:{
   briefCompare:'Describe the decision this comparison should support.',
   brief:'Describe what you’re working on.',
   subjectA:'Add the first website or product.',
   subjectB:'Add the second website or product.',
   sameSubjects:'Choose two different subjects to compare.',
   criteria:'Add at least one comparison criterion.'
  }
 },
 creator:{
  examples:{
   deploy:{before:'After saving the configuration, you might want to restart the service and check that the worker’s health endpoint returns HTTP 200, restoring the previous configuration if the process fails this check.',after:'<ol><li>Save the configuration.</li><li>Restart the worker.</li><li>Check the worker’s health endpoint.</li></ol><p>Expected result: HTTP 200. If the check fails, restore the previous configuration.</p>',note:'One name. Visible steps. A defined result.'},
   review:{before:'The retry engine can potentially submit the same payment twice after a timeout, so it would be beneficial to verify whether the payment API accepts an idempotency key and, if so, have the retry processor reuse it for all attempts at that payment.',after:'<p>The retry worker can submit the same payment twice after a timeout. Verify whether the payment API accepts an idempotency key.</p><p>If it does, reuse the same key for every attempt at that payment.</p>',note:'Illustrative diagnosis. A specific question. A conditional fix.'},
   research:{before:'Please provide a comprehensive overview of the paper’s performance metric, its baseline, dataset and uncertainty, while illuminating which conditions were tested and clarifying that performance outside them has not been verified.',after:'<p>Report the paper’s metric, baseline, dataset, and uncertainty.</p><p>State which conditions were tested. Treat performance outside those conditions as unverified.</p>',note:'A reading brief that asks for evidence instead of praise.'}
  },
  help:'Describe your task, the result you need, and any important constraints.',
  helpCompare:'Describe the decision this comparison should support, your audience, and any constraints.',
  empty:'Your prompt will appear here as you type. Add your task and choose the answer you want.',
  emptyCompare:'Add your comparison details. Your complete prompt will include both subjects, your goal, and the same criteria for each.',
  detailsLeft:count=>`${count} ${count===1?'detail':'details'} to complete before copying.`,
  describeTask:'Describe your task to create a complete prompt.',
  readyCompare:'Ready to paste. Both subjects, your goal, and criteria are included.',
  readySource:'Ready to paste. Your task and source material are included.',
  readySummary:'Ready to paste. Add the document under Source material, or the AI will ask for it.',
  ready:'Ready to paste. Your task and answer format are included.',
  draftFailed:'This draft could not be saved. Copy your prompt before you leave the page.',
  draftUnavailable:'Built in your browser and never sent anywhere. This browser is not keeping drafts, so copy your prompt before you leave the page.'
 },
 humanize:{
  examples:{
   web:{before:'Our comprehensive dashboard empowers teams to seamlessly monitor failed jobs and effortlessly retry them from a single, unified location.',after:'<h3>See which jobs failed. Retry them here.</h3><p>The dashboard keeps failed jobs and retry controls in one place.</p>',reason:'Website copy: name the task, explain the useful action, and remove unsupported praise.',lang:'en'},
   slides:{before:'The migration delivered an impressive 18% reduction in median build time, from 10 minutes to 8.2 minutes, across 20 builds on the same runner, highlighting a significant step forward in developer productivity.',after:'<h3>Median build time fell by 18%.</h3><p>10 minutes → 8.2 minutes</p><p><strong>Speaker notes:</strong> The comparison covered 20 builds on the same runner. It does not measure overall developer productivity.</p>',reason:'Slides: move the measured result into the title. Keep the sample, conditions, and scope in speaker notes. All figures here are fictional example data.',lang:'en'},
   polish:{before:'Nasz zaawansowany panel umożliwia zespołom bezproblemowe monitorowanie nieudanych zadań oraz ich płynne ponawianie z jednego, scentralizowanego miejsca.',after:'<h3>Sprawdź, które zadania się nie powiodły. Ponów je w panelu.</h3><p>Lista nieudanych zadań i przyciski ponawiania są w jednym miejscu.</p>',reason:'Polski: nazwij konkretną czynność. Usuń ogólniki i kalki, zachowując znaczenie. Przykład redakcji: zachowane znaczenie, mniej ogólników.',lang:'pl'}
  },
  empty:'Your complete brief will appear here when you add your readers and the original text.',
  readySample:'Ready to paste. Your readers, voice sample, and original text are included.',
  ready:'Ready to paste. Your readers and original text are included.',
  detailsLeft:count=>`${count} ${count===1?'detail':'details'} to complete before copying.`,
  start:'Add your readers and the original text to create a complete brief.',
  draftFailed:'This draft could not be saved. Copy your brief before you leave the page.',
  draftUnavailable:'Built in your browser and never sent anywhere. This browser is not keeping drafts, so copy your brief before you leave the page.'
 },
 brief:{
  issues:{audience:'Add who will read the text.',original:'Paste the original text you want to edit.'}
 },
 drafts:{
  kept:'Built in your browser and never sent anywhere. Your draft stays in this tab until you clear it or close the tab.',
  failedToast:'Draft could not be saved.',
  cleared:'Draft cleared.'
 },
 common:{
  motionOn:'Motion on',
  motionOff:'Motion off',
  pauseTitle:'Pause decorative animation',
  enableTitle:'Enable decorative animation',
  copied:'Text copied. Ready to paste.',
  copiedFallback:'Text copied.',
  selected:'Text selected. Press Ctrl+C or ⌘C to copy.'
 },
 field:{
  chaosMoving:'CHAOS IN MOTION',
  chaosPaused:'CHAOS PAUSED',
  evolving:'SLOWLY EVOLVING',
  paused:'MOTION PAUSED',
  restore:'Restore structured motion',
  scatter:'Scatter the particles'
 },
 screensaver:{
  speed:'Letter speed',
  fade:'Fade letters in',
  color:'Letter color'
 }
};
