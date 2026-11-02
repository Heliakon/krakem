export const sv={
 prompt:{
  task:{
   custom:'Utför min uppgift utifrån de detaljer och begränsningar som jag anger. Börja med det resultat jag behöver och förklara sedan vad jag behöver för att använda eller kontrollera det.',
   compare:'Jämför de två alternativen nedan utifrån mitt mål och mina kriterier. Använd samma avgränsning och definitioner för båda. Håll isär dokumenterade funktioner, marknadsföringspåståenden och dina egna slutsatser. Ange källa för faktabaserade jämförelser. Dra inte slutsatsen att en funktion saknas bara för att den inte är dokumenterad. Markera information som inte finns tillgänglig som okänd. Hitta inte på betyg, mätvärden eller en generell vinnare. Förklara vilket alternativ som passar vilka behov.',
   review:'Granska koden med avseende på korrekthet och relevanta felscenarier. Prioritera väsentliga fynd efter hur stor påverkan de har. För varje fynd: peka ut den berörda koden, förklara vad som utlöser problemet och vilka följderna blir när underlaget stöder det, och föreslå ett användbart verifieringssteg. Hitta inte på filer, beteenden eller testresultat.',
   debug:'Diagnostisera problemet utifrån tillgängliga belägg. Håll isär bekräftade orsaker och hypoteser. Prioritera kontroller som skiljer mellan dem innan du föreslår en lösning. Ange vad varje kontroll skulle visa.',
   code:'Implementera det efterfrågade beteendet utifrån de krav och det sammanhang som jag har gett. Om du inte kan redigera projektet, ge mig den relevanta koden och förklara hur jag tillämpar den. Förklara viktiga ändringar och antaganden. Visa hur resultatet kan verifieras. Påstå inte att du har kört kontroller som du inte har kört.',
   architecture:'Bedöm arkitekturen mot de angivna kraven. Förklara beroenden, avvägningar och felscenarier. Håll isär kända begränsningar och antaganden. Gör rekommendationerna villkorade av de kraven.',
   research:'Undersök frågan med hjälp av relevanta primärkällor där sådana finns. Förklara vad källorna stöder, var de går isär och vad som fortfarande är okänt. Ange källor för faktapåståenden. Skilj mellan källornas kvalitet och hur säker du är på din slutsats.',
   paper:'Förklara artikelns forskningsfråga, metod, resultat och begränsningar. Behåll definitioner, ekvationer, osäkerhet och beläggens räckvidd. Håll isär författarnas resultat och din tolkning. Generalisera inte utöver de förhållanden som studerades.',
   summary:'Sammanfatta materialet för det syfte som jag har angett. Behåll huvudpunkterna, viktiga förbehåll och relevanta siffror. Håll isär källans påståenden och din tolkning. Om väsentligt material saknas, be om det.',
   procedure:'Förklara hur uppgiften utförs. Ta med relevanta förutsättningar, åtgärderna i ordning, förväntade resultat och ett sätt att återställa om något går fel, när informationen jag har gett stöder det.',
   writing:'Skriv eller redigera den efterfrågade webb- eller presentationstexten för dess tänkta läsare. Behåll fakta, förbehåll och tekniska termer. Ta bort utfyllnad, vagt beröm och löften utan grund. Om jag har gett ett textprov, efterlikna det utan att hitta på personliga erfarenheter.'
  },
  answer:{
   text:'Ge en tydlig och strukturerad förklaring. Börja med svaret. Lägg till de resonemang och detaljer som behövs för att använda eller kontrollera det. Använd rubriker bara när de gör texten lättare att navigera i.',
   steps:'Ge numrerade instruktioner i en ordning som går att följa. Håll isär åtgärder och förklaringar. Skriv villkor före de åtgärder de styr. Ange det förväntade resultatet när det är känt.',
   code:'Ge den relevanta koden med en kort förklaring av hur den används. Ta bara med beroenden eller installation när det behövs. Beskriv meningsfulla kontroller och förväntade resultat.',
   table:'Använd en tabell med tydliga kolumnrubriker, följd av en kort förklaring. Vid jämförelser: använd uttryckliga kriterier och förklara avvägningarna. Markera okända värden som okända. Hitta inte på betyg eller mätvärden.',
   checklist:'Ge en kort checklista med de åtgärder eller kontroller som min uppgift eller källa stöder. Använd konkreta punkter som var för sig går att kontrollera; ta med förväntade resultat eller villkor när de är kända. Skriv fastställda fakta och öppna frågor som vanlig text, inte som punkter i checklistan. Lägg inte till åtgärder som källan inte nämner. Markera det som är okänt i stället för att gissa.',
   diagram:'Skapa ett kompakt Mermaid-diagram över relevanta komponenter, gränser eller flöden. Använd etiketter som stämmer med förklaringen. Markera osäkra samband. Ta med en kort textversion av diagrammet.',
   interactive:'Skapa ett enda fristående HTML-verktyg med inbäddad CSS och JavaScript. Använd inga externa beroenden eller nätverksanrop. Lägg till kontroller med etiketter, synliga resultat och ett sätt att återställa. Ange modell, enheter, antaganden och begränsningar. Ta med ett alternativ i siffror eller text och respektera inställningar för minskad rörelse.',
   animation:'Skapa en fristående HTML-animering med inbäddad CSS och JavaScript. Ta med kontroller för uppspelning, paus, återställning och stegning. Ge varje tillstånd en etikett. Ange antaganden och skilj en förenklad modell från verkligt beteende. Ta med en textversion och stöd för minskad rörelse. Använd inga externa beroenden eller nätverksanrop.'
  },
  myTask:'Min uppgift:',
  comparison:(a,b,criteria)=>`Alternativ att jämföra:\nA: ${a}\nB: ${b}\n\nJämförelsekriterier:\n${criteria}\n\nAnvänd min uppgift ovan som mål för jämförelsen. Om något av alternativen är tvetydigt, be mig ange vilket som avses innan du jämför.`,
  readable:'Gör svaret lättare att läsa och agera på. Använd raka meningar, konkreta verb, enhetliga termer och korta stycken. Använd numrerade listor för kontroller eller åtgärder som görs i ordning. Behåll fakta, tekniska namn, enheter, kod och viktiga förbehåll. Skilj mellan belägg och slutsatser.',
  procedure:'Följ andan i ASD-STE100 när du beskriver procedurer: sikta på högst 20 ord per mening. Dela upp åtgärder som sker efter varandra. Håll ihop åtgärder som måste ske samtidigt. Se detta som skrivråd, inte som ett påstående om att texten följer STE.',
  sources:'Respektera mina begränsningar för källor och webbsökning. När webbsökning är tillåten och tillgänglig, kontrollera tidskänsliga påståenden mot aktuella källor. En URL i sig är inget belägg för att du har läst innehållet. Om du inte kommer åt en källa som behövs, säg det och be om det relevanta materialet. Hitta inte på källhänvisningar och behandla inte overifierade påståenden som fastställda fakta.',
  missing:'Om information som behövs för ett korrekt svar saknas, ställ en riktad fråga i stället för att gissa. Svara på samma språk som min uppgift, om jag inte ber om ett annat språk.',
  answerFormat:'Svarsformat:',
  compareTable:'Använd en jämförelsetabell med en rad per kriterium och en kolumn för varje alternativ. Följ upp med en kort förklaring av avvägningarna och beläggens begränsningar.',
  sourceMaterial:'Källmaterial för uppgiften:',
  issues:{
   briefCompare:'Beskriv beslutet som jämförelsen ska ge underlag för.',
   brief:'Beskriv vad du arbetar med.',
   subjectA:'Ange den första webbplatsen eller produkten.',
   subjectB:'Ange den andra webbplatsen eller produkten.',
   sameSubjects:'Välj två olika alternativ att jämföra.',
   criteria:'Ange minst ett jämförelsekriterium.'
  }
 },
 creator:{
  examples:{
   deploy:{before:'När du har sparat konfigurationen kan det vara bra att starta om tjänsten och kontrollera att workerns hälsokontroll returnerar HTTP 200, samt att återställa den tidigare konfigurationen om processen inte klarar kontrollen.',after:'<ol><li>Spara konfigurationen.</li><li>Starta om workern.</li><li>Kör workerns hälsokontroll.</li></ol><p>Förväntat resultat: HTTP 200. Om kontrollen misslyckas, återställ den tidigare konfigurationen.</p>',note:'Ett namn. Synliga steg. Ett definierat resultat.'},
   review:{before:'Retry-motorn kan potentiellt komma att skicka samma betalning två gånger efter en timeout, varför det vore fördelaktigt att verifiera huruvida betalnings-API:et accepterar en idempotensnyckel och i så fall låta retry-processorn återanvända den vid samtliga försök för den aktuella betalningen.',after:'<p>Retry-workern kan skicka samma betalning två gånger efter en timeout. Kontrollera om betalnings-API:et accepterar en idempotensnyckel.</p><p>Om det gör det, använd samma nyckel för varje försök med den betalningen.</p>',note:'Illustrerande diagnos. En konkret fråga. En villkorad åtgärd.'},
   research:{before:'Vänligen tillhandahåll en heltäckande översikt av artikelns prestandamått, dess baslinje, dataset och osäkerhet, samtidigt som du belyser vilka förhållanden som testades och förtydligar att prestanda utanför dessa inte har verifierats.',after:'<p>Redovisa artikelns mått, baslinje, dataset och osäkerhet.</p><p>Ange vilka förhållanden som testades. Behandla prestanda utanför de förhållandena som overifierad.</p>',note:'En läsinstruktion som ber om belägg i stället för beröm.'}
  },
  help:'Beskriv uppgiften, resultatet du behöver och eventuella viktiga begränsningar.',
  helpCompare:'Beskriv beslutet som jämförelsen ska ge underlag för, vilka som ska läsa den och eventuella begränsningar.',
  empty:'Din prompt visas här medan du skriver. Beskriv uppgiften och välj vilket svar du vill ha.',
  emptyCompare:'Fyll i uppgifterna för jämförelsen. Den färdiga prompten innehåller båda alternativen, ditt mål och samma kriterier för båda.',
  detailsLeft:count=>`${count} ${count===1?'detalj':'detaljer'} kvar att fylla i innan du kan kopiera.`,
  describeTask:'Beskriv uppgiften för att skapa en färdig prompt.',
  readyCompare:'Klar att klistra in. Båda alternativen, ditt mål och kriterierna finns med.',
  readySource:'Klar att klistra in. Din uppgift och ditt källmaterial finns med.',
  readySummary:'Klar att klistra in. Lägg till dokumentet under Källmaterial, annars kommer AI:n att be om det.',
  ready:'Klar att klistra in. Din uppgift och ditt svarsformat finns med.',
  draftFailed:'Utkastet kunde inte sparas. Kopiera prompten innan du lämnar sidan.',
  draftUnavailable:'Skapas i din webbläsare och skickas aldrig någonstans. Den här webbläsaren sparar inga utkast, så kopiera prompten innan du lämnar sidan.'
 },
 humanize:{
  examples:{
   web:{before:'Vår kraftfulla och heltäckande instrumentpanel ger ditt team möjlighet att smidigt övervaka misslyckade jobb och utan ansträngning köra om dem – allt från en och samma samlade plats.',after:'<h3>Se vilka jobb som misslyckades. Kör om dem här.</h3><p>Panelen visar misslyckade jobb och knapparna för att köra om dem på samma ställe.</p>',reason:'Webbtext: säg vad uppgiften är, förklara vad läsaren kan göra och stryk ogrundat beröm.',lang:'sv'},
   slides:{before:'Migreringen levererade en imponerande minskning av medianbyggtiden med 18 %, från 10 minuter till 8,2 minuter, över 20 byggen på samma runner, vilket understryker ett betydande steg framåt för utvecklarnas produktivitet.',after:'<h3>Medianbyggtiden sjönk med 18 %.</h3><p>10 minuter → 8,2 minuter</p><p><strong>Talaranteckningar:</strong> Jämförelsen omfattade 20 byggen på samma runner. Den mäter inte utvecklarnas produktivitet i stort.</p>',reason:'Presentationsbilder: lyft in det uppmätta resultatet i rubriken. Lägg urval, förutsättningar och avgränsning i talaranteckningarna. Alla siffror här är påhittade exempeldata.',lang:'sv'},
   polish:{before:'Nasz zaawansowany panel umożliwia zespołom bezproblemowe monitorowanie nieudanych zadań oraz ich płynne ponawianie z jednego, scentralizowanego miejsca.',after:'<h3>Sprawdź, które zadania się nie powiodły. Ponów je w panelu.</h3><p>Lista nieudanych zadań i przyciski ponawiania są w jednym miejscu.</p>',reason:'Polski: nazwij konkretną czynność. Usuń ogólniki i kalki, zachowując znaczenie. Przykład redakcji: zachowane znaczenie, mniej ogólników.',lang:'pl'}
  },
  empty:'Ditt färdiga redigeringsuppdrag visas här när du har angett läsarna och originaltexten.',
  readySample:'Klart att klistra in. Läsarna, textprovet och originaltexten finns med.',
  ready:'Klart att klistra in. Läsarna och originaltexten finns med.',
  detailsLeft:count=>`${count} ${count===1?'detalj':'detaljer'} kvar att fylla i innan du kan kopiera.`,
  start:'Ange läsarna och originaltexten för att skapa ett färdigt redigeringsuppdrag.',
  draftFailed:'Utkastet kunde inte sparas. Kopiera redigeringsuppdraget innan du lämnar sidan.',
  draftUnavailable:'Skapas i din webbläsare och skickas aldrig någonstans. Den här webbläsaren sparar inga utkast, så kopiera redigeringsuppdraget innan du lämnar sidan.'
 },
 brief:{
  issues:{audience:'Ange vem som ska läsa texten.',original:'Klistra in originaltexten som du vill redigera.'}
 },
 drafts:{
  kept:'Skapas i din webbläsare och skickas aldrig någonstans. Utkastet finns kvar i den här fliken tills du rensar det eller stänger fliken.',
  failedToast:'Utkastet kunde inte sparas.',
  cleared:'Utkastet är rensat.'
 },
 common:{
  motionOn:'Rörelse på',
  motionOff:'Rörelse av',
  pauseTitle:'Pausa den dekorativa animeringen',
  enableTitle:'Slå på den dekorativa animeringen',
  copied:'Texten är kopierad och klar att klistra in.',
  copiedFallback:'Texten är kopierad.',
  selected:'Texten är markerad. Tryck på Ctrl+C eller ⌘C för att kopiera.'
 },
 field:{
  chaosMoving:'KAOS I RÖRELSE',
  chaosPaused:'KAOS PAUSAT',
  evolving:'FÖRÄNDRAS LÅNGSAMT',
  paused:'RÖRELSEN PAUSAD',
  restore:'Återställ den strukturerade rörelsen',
  scatter:'Sprid ut partiklarna'
 },
 screensaver:{
  speed:'Bokstävernas hastighet',
  fade:'Tona in bokstäverna',
  color:'Bokstävernas färg'
 }
};
