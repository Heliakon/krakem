// English text for the site's scripts. text-pl.js and text-sv.js use the same keys; the checks compare them.
// Values may contain HTML only where a script sets innerHTML (the "after" examples).
export const en={
 prompt:{
  task:{
   custom:'Start with the result I need, then add what I need to use or check it.',
   compare:'Compare the two subjects below against my goal and criteria, with the same scope for both. Cite sources for facts. If something is not documented, mark it unknown; do not assume it is missing. Do not invent scores or a universal winner. Say which option fits which needs.',
   review:'Review the code for bugs and failure modes that matter. List findings by impact, each with the code, what triggers it, and how to verify it.',
   debug:'Find the cause from the evidence. Separate confirmed causes from guesses. Suggest checks that tell them apart before proposing a fix.',
   code:'Implement the requested change. If you cannot edit the project, give the code and say where it goes. Note assumptions and how to verify the result. Do not claim checks you have not run.',
   architecture:'Assess the architecture against my requirements. Cover dependencies, trade-offs, and failure modes. Say what you assume.',
   research:'Research the question, using primary sources where possible. Cite factual claims. Say where sources disagree and what remains unknown.',
   paper:'Explain the paper’s question, method, results, and limitations. Keep key definitions and equations. Separate the authors’ findings from your interpretation.',
   summary:'Summarize the material for my purpose. Keep the main points, key numbers, and important caveats.',
   procedure:'Explain how to do it: prerequisites, steps in order, and the expected result.',
   motion:'Design and build the motion piece I describe. First give the concept, palette, typeface, and scene timing in a few lines. Take the style from the subject, with a clean, modern look. Keep the motion smooth and deliberate, and build toward one memorable moment.',
   writing:'Write or edit the text for its reader. Keep facts and technical terms. Cut filler, vague praise, and unsupported promises.'
  },
  answer:{
   text:'A clear explanation. Start with the answer. Use headings only when they help.',
   steps:'Numbered steps in order. Put conditions before the actions they control.',
   code:'The code, with a short note on how to use and test it.',
   table:'A table with clear column labels, then a short explanation. Mark unknown values as unknown.',
   checklist:'A short checklist of concrete, checkable items. Write facts and open questions as plain text, not items. Add no actions the source does not state.',
   diagram:'A compact Mermaid diagram with labels that match the explanation, plus a short text summary.',
   interactive:'One self-contained HTML file with embedded CSS and JavaScript and no external dependencies. Add labeled controls and visible results. State the assumptions.',
   animation:'A self-contained HTML animation with embedded CSS and JavaScript and no external dependencies. Add play, pause, and step controls, and label each state.'
  },
  myTask:'My task:',
  comparison:(a,b,criteria)=>`Comparison subjects:\nA: ${a}\nB: ${b}\n\nComparison criteria:\n${criteria}`,
  readable:'Write plainly: short sentences, consistent terms, and numbered lists for steps. Preserve facts, names, units, code, and important qualifications. Distinguish evidence from inference.',
  procedure:'Keep each sentence under 20 words, with one action per step.',
  sources:'If you cannot open a link or source, say so instead of guessing what it says. Do not invent citations.',
  missing:'If something essential is missing, ask a focused question rather than guessing.',
  ownership:{own:'This codebase is yours: you will keep building on it. Merge repeated code and fix related problems as you go. List changes beyond the request.',other:'This codebase belongs to someone else. Follow its existing structure and make only the requested change. Report other problems instead of fixing them.'},
  design:'Go beyond the basics: give it a distinctive, polished style, with no generic layouts or default fonts.',
  answerFormat:'Answer format:',
  motionAnimation:'A self-contained HTML animation with embedded CSS and JavaScript and no external dependencies. Add play, pause, and restart controls.',
  compareTable:'A table with one row per criterion and one column per subject, then a short note on the trade-offs.',
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
  help:'Describe your task, the result you need, why it matters, and any important constraints.',
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
  color:'Letter color',
  cycle:'Change color slowly',
  turnOff:'Turn off screensaver'
 }
};
