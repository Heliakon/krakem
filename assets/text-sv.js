export const sv={
 prompt:{
  task:{
   custom:'Börja med det resultat jag behöver och lägg sedan till det jag behöver för att använda eller kontrollera det.',
   compare:'Jämför de två alternativen nedan utifrån mitt mål och mina kriterier, med samma avgränsning för båda. Ange källor för fakta. Om något inte är dokumenterat, markera det som okänt; anta inte att det saknas. Hitta inte på betyg eller en generell vinnare. Säg vilket alternativ som passar vilka behov.',
   review:'Granska koden efter fel och felscenarier som spelar roll. Lista fynden efter påverkan, vart och ett med koden, vad som utlöser problemet och hur det kan verifieras.',
   debug:'Hitta orsaken utifrån beläggen. Håll isär bekräftade orsaker och gissningar. Föreslå kontroller som skiljer mellan dem innan du föreslår en lösning.',
   code:'Implementera den efterfrågade ändringen. Om du inte kan redigera projektet, ge mig koden och säg var den ska in. Ange antaganden och hur resultatet kan verifieras. Påstå inte att du har kört kontroller som du inte har kört.',
   architecture:'Bedöm arkitekturen mot mina krav. Ta upp beroenden, avvägningar och felscenarier. Säg vad du antar.',
   research:'Undersök frågan, med primärkällor där det går. Ange källor för faktapåståenden. Säg var källorna går isär och vad som fortfarande är okänt.',
   paper:'Förklara artikelns forskningsfråga, metod, resultat och begränsningar. Behåll viktiga definitioner och ekvationer. Håll isär författarnas resultat och din tolkning.',
   summary:'Sammanfatta materialet för mitt syfte. Behåll huvudpunkterna, nyckeltalen och viktiga förbehåll.',
   procedure:'Förklara hur det görs: förutsättningar, stegen i ordning och det förväntade resultatet.',
   motion:'Designa och bygg den rörliga design jag beskriver. Ge först konceptet, paletten, typsnittet och scenernas tider på några rader. Hämta stilen från ämnet, med ett rent, modernt utseende. Gör rörelsen mjuk och genomtänkt och bygg mot ett minnesvärt ögonblick.',
   writing:'Skriv eller redigera texten för dess läsare. Behåll fakta och tekniska termer. Ta bort utfyllnad, vagt beröm och löften utan grund.'
  },
  answer:{
   text:'En tydlig förklaring. Börja med svaret. Använd rubriker bara när de hjälper.',
   steps:'Numrerade steg i ordning. Skriv villkor före de åtgärder de styr.',
   code:'Koden, med en kort förklaring av hur den används och testas.',
   table:'En tabell med tydliga kolumnrubriker, följd av en kort förklaring. Markera okända värden som okända.',
   checklist:'En kort checklista med konkreta punkter som går att kontrollera. Skriv fakta och öppna frågor som vanlig text, inte som punkter. Lägg inte till åtgärder som källan inte nämner.',
   diagram:'Ett kompakt Mermaid-diagram med etiketter som stämmer med förklaringen, plus en kort textversion.',
   interactive:'En enda fristående HTML-fil med inbäddad CSS och JavaScript och inga externa beroenden. Lägg till kontroller med etiketter och synliga resultat. Ange antagandena.',
   animation:'En fristående HTML-animation med inbäddad CSS och JavaScript och inga externa beroenden. Lägg till kontroller för uppspelning, paus och stegning, och ge varje tillstånd en etikett.'
  },
  myTask:'Min uppgift:',
  comparison:(a,b,criteria)=>`Alternativ att jämföra:\nA: ${a}\nB: ${b}\n\nJämförelsekriterier:\n${criteria}`,
  readable:'Skriv enkelt: korta meningar, enhetliga termer och numrerade listor för steg. Behåll fakta, namn, enheter, kod och viktiga förbehåll. Skilj mellan belägg och slutsatser.',
  procedure:'Håll varje mening under 20 ord, med en åtgärd per steg.',
  sources:'Om du inte kan öppna en länk eller källa, säg det i stället för att gissa vad den innehåller. Hitta inte på källhänvisningar.',
  missing:'Om något väsentligt saknas, ställ en riktad fråga i stället för att gissa.',
  ownership:{own:'Den här kodbasen är din: du kommer att bygga vidare på den. Slå ihop upprepad kod och rätta närliggande problem medan du arbetar. Lista ändringar utöver det jag bad om.',other:'Den här kodbasen tillhör någon annan. Följ dess befintliga struktur och gör bara den ändring jag ber om. Rapportera andra problem i stället för att rätta dem.'},
  design:'Gå längre än grunderna: ge det en tydlig, genomarbetad stil, utan generiska layouter och standardtypsnitt.',
  answerFormat:'Svarsformat:',
  motionAnimation:'En fristående HTML-animation med inbäddad CSS och JavaScript och inga externa beroenden. Lägg till kontroller för att spela upp, pausa och starta om.',
  compareTable:'En tabell med en rad per kriterium och en kolumn per alternativ, följd av en kort kommentar om avvägningarna.',
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
  help:'Beskriv uppgiften, resultatet du behöver, varför det är viktigt och eventuella viktiga begränsningar.',
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
  color:'Bokstävernas färg',
  cycle:'Ändra färg långsamt',
  turnOff:'Stäng av skärmsläckaren'
 }
};
