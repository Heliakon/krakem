export const pl={
 prompt:{
  task:{
   custom:'Zacznij od wyniku, którego potrzebuję, a potem dodaj to, co pozwoli go wykorzystać lub sprawdzić.',
   compare:'Porównaj dwie pozycje podane niżej pod kątem mojego celu i kryteriów, w tym samym zakresie dla obu. Przy faktach podawaj źródła. Jeśli czegoś nie udokumentowano, oznacz to jako nieznane; nie zakładaj, że tego brakuje. Nie wymyślaj ocen ani uniwersalnego zwycięzcy. Napisz, która opcja pasuje do jakich potrzeb.',
   review:'Sprawdź kod pod kątem błędów i istotnych scenariuszy awarii. Uszereguj ustalenia według wagi skutków; przy każdym wskaż kod, co wywołuje problem i jak to sprawdzić.',
   debug:'Znajdź przyczynę na podstawie dowodów. Oddziel potwierdzone przyczyny od przypuszczeń. Zanim zaproponujesz poprawkę, wskaż sprawdzenia, które pozwolą je odróżnić.',
   code:'Wprowadź zmianę, o którą proszę. Jeśli nie możesz edytować projektu, podaj kod i napisz, gdzie go umieścić. Wymień założenia i sposób sprawdzenia wyniku. Nie twierdź, że wykonano sprawdzenia, których nie wykonano.',
   architecture:'Oceń architekturę pod kątem moich wymagań. Omów zależności, kompromisy i scenariusze awarii. Napisz, co zakładasz.',
   research:'Zbadaj zagadnienie, w miarę możliwości na podstawie źródeł pierwotnych. Podawaj źródła twierdzeń o faktach. Napisz, w czym źródła się różnią i czego nadal nie wiadomo.',
   paper:'Wyjaśnij pytanie badawcze artykułu, metodę, wyniki i ograniczenia. Zachowaj kluczowe definicje i równania. Oddziel ustalenia autorów od własnej interpretacji.',
   summary:'Streść materiał pod kątem mojego celu. Zachowaj główne tezy, kluczowe liczby i ważne zastrzeżenia.',
   procedure:'Wyjaśnij, jak to zrobić: warunki wstępne, kroki we właściwej kolejności i oczekiwany wynik.',
   motion:'Zaprojektuj i zbuduj animację, którą opisuję. Najpierw w kilku linijkach podaj koncepcję, paletę, krój pisma i czas trwania scen. Styl wyprowadź z tematu, z czystym, nowoczesnym wyglądem. Ruch ma być płynny i przemyślany, a całość ma prowadzić do jednego zapamiętywalnego momentu.',
   writing:'Napisz lub zredaguj tekst z myślą o jego odbiorcach. Zachowaj fakty i terminy techniczne. Usuń watę słowną, ogólnikowe pochwały i obietnice bez pokrycia.'
  },
  answer:{
   text:'Jasne wyjaśnienie. Zacznij od odpowiedzi. Używaj nagłówków tylko wtedy, gdy pomagają.',
   steps:'Ponumerowane kroki we właściwej kolejności. Warunki umieszczaj przed czynnościami, których dotyczą.',
   code:'Kod z krótką notą, jak go użyć i sprawdzić.',
   table:'Tabela z czytelnymi nagłówkami kolumn, a pod nią krótkie wyjaśnienie. Nieznane wartości oznacz jako nieznane.',
   checklist:'Krótka lista kontrolna z konkretnymi punktami, które da się sprawdzić. Fakty i otwarte pytania zapisz zwykłym tekstem, nie jako punkty. Nie dodawaj czynności, których źródło nie wymienia.',
   diagram:'Zwięzły diagram Mermaid z etykietami zgodnymi z wyjaśnieniem i krótkim opisem tekstowym.',
   interactive:'Jeden samodzielny plik HTML z osadzonym CSS i JavaScriptem, bez zewnętrznych zależności. Dodaj opisane elementy sterujące i widoczne wyniki. Podaj założenia.',
   animation:'Samodzielna animacja HTML z osadzonym CSS i JavaScriptem, bez zewnętrznych zależności. Dodaj przyciski odtwarzania, pauzy i przejścia o krok oraz etykietę każdego stanu.'
  },
  myTask:'Moje zadanie:',
  comparison:(a,b,criteria)=>`Porównywane pozycje:\nA: ${a}\nB: ${b}\n\nKryteria porównania:\n${criteria}`,
  readable:'Pisz prosto: krótkie zdania, spójne terminy i listy numerowane dla kroków. Zachowaj fakty, nazwy, jednostki, kod i ważne zastrzeżenia. Odróżniaj dowody od wniosków.',
  procedure:'Każde zdanie ma mieć mniej niż 20 słów, a każdy krok jedną czynność.',
  sources:'Jeśli nie możesz otworzyć linku lub źródła, powiedz o tym, zamiast zgadywać jego treść. Nie wymyślaj cytowań.',
  missing:'Jeśli brakuje czegoś niezbędnego, zadaj konkretne pytanie zamiast zgadywać.',
  ownership:{own:'Ten kod jest twój: będziesz go dalej rozwijać. W trakcie pracy scalaj powtarzający się kod i naprawiaj powiązane problemy. Wymień zmiany wykraczające poza prośbę.',other:'Ten kod należy do kogoś innego. Trzymaj się jego obecnej struktury i wprowadź tylko zmianę, o którą proszę. Zgłaszaj inne problemy, zamiast je naprawiać.'},
  design:'Wyjdź poza podstawy: nadaj temu wyrazisty, dopracowany styl, bez szablonowych układów i domyślnych fontów.',
  answerFormat:'Forma odpowiedzi:',
  motionAnimation:'Samodzielna animacja HTML z osadzonym CSS i JavaScriptem, bez zewnętrznych zależności. Dodaj przyciski odtwarzania, pauzy i ponownego uruchomienia.',
  compareTable:'Tabela z jednym wierszem na kryterium i jedną kolumną na pozycję, a pod nią krótka uwaga o kompromisach.',
  sourceMaterial:'Materiały źródłowe do tego zadania:',
  issues:{
   briefCompare:'Opisz decyzję, w której ma pomóc to porównanie.',
   brief:'Opisz, nad czym pracujesz.',
   subjectA:'Dodaj pierwszą stronę lub produkt.',
   subjectB:'Dodaj drugą stronę lub produkt.',
   sameSubjects:'Wybierz dwie różne pozycje do porównania.',
   criteria:'Dodaj co najmniej jedno kryterium porównania.'
  }
 },
 creator:{
  examples:{
   deploy:{before:'Po zapisaniu konfiguracji warto byłoby zrestartować usługę i sprawdzić, czy endpoint stanu workera zwraca HTTP 200, a jeśli proces nie przejdzie tej kontroli, przywrócić poprzednią konfigurację.',after:'<ol><li>Zapisz konfigurację.</li><li>Uruchom ponownie workera.</li><li>Sprawdź endpoint stanu workera.</li></ol><p>Oczekiwany wynik: HTTP 200. Jeśli kontrola się nie powiedzie, przywróć poprzednią konfigurację.</p>',note:'Jedna nazwa. Widoczne kroki. Określony wynik.'},
   review:{before:'Mechanizm ponowień może potencjalnie wysłać tę samą płatność dwukrotnie po przekroczeniu limitu czasu, dlatego korzystne byłoby zweryfikowanie, czy API płatności akceptuje klucz idempotencji, a jeśli tak, doprowadzenie do tego, by procesor ponowień używał go przy wszystkich próbach tej płatności.',after:'<p>Worker ponowień może wysłać tę samą płatność dwa razy po przekroczeniu limitu czasu. Sprawdź, czy API płatności przyjmuje klucz idempotencji.</p><p>Jeśli tak, używaj tego samego klucza przy każdej próbie tej płatności.</p>',note:'Przykładowa diagnoza. Konkretne pytanie. Warunkowa poprawka.'},
   research:{before:'Proszę o przedstawienie wyczerpującego omówienia zastosowanej w artykule metryki skuteczności, jej punktu odniesienia, zbioru danych i niepewności, wraz z naświetleniem, jakie warunki zostały przetestowane, oraz wyjaśnieniem, że skuteczność poza nimi nie została zweryfikowana.',after:'<p>Podaj metrykę z artykułu, punkt odniesienia, zbiór danych i niepewność.</p><p>Napisz, jakie warunki przetestowano. Skuteczność poza tymi warunkami traktuj jako niezweryfikowaną.</p>',note:'Prośba o analizę, która wymaga dowodów zamiast pochwał.'}
  },
  help:'Opisz zadanie, oczekiwany wynik, powód, dla którego jest ważny, i ważne ograniczenia.',
  helpCompare:'Opisz decyzję, w której ma pomóc porównanie, odbiorców i ewentualne ograniczenia.',
  empty:'Prompt pojawi się tutaj w trakcie pisania. Opisz zadanie i wybierz formę odpowiedzi.',
  emptyCompare:'Uzupełnij szczegóły porównania. Gotowy prompt obejmie obie pozycje, Twój cel i te same kryteria dla każdej z nich.',
  detailsLeft:count=>`${count} ${count===1?'szczegół':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'szczegóły':'szczegółów'} do uzupełnienia przed skopiowaniem.`,
  describeTask:'Opisz zadanie, aby utworzyć gotowy prompt.',
  readyCompare:'Gotowe do wklejenia. Prompt zawiera obie pozycje, Twój cel i kryteria.',
  readySource:'Gotowe do wklejenia. Prompt zawiera zadanie i materiały źródłowe.',
  readySummary:'Gotowe do wklejenia. Dodaj dokument w polu Materiały źródłowe – inaczej AI o niego poprosi.',
  ready:'Gotowe do wklejenia. Prompt zawiera zadanie i formę odpowiedzi.',
  draftFailed:'Nie udało się zapisać szkicu. Skopiuj prompt, zanim opuścisz stronę.',
  draftUnavailable:'Wszystko powstaje w Twojej przeglądarce i nigdzie nie jest wysyłane. Ta przeglądarka nie zachowuje szkiców, więc skopiuj prompt, zanim opuścisz stronę.'
 },
 humanize:{
  examples:{
   web:{before:'Nasz wszechstronny panel pozwala zespołom bez wysiłku monitorować nieudane zadania i bezproblemowo je ponawiać z jednego, ujednoliconego miejsca.',after:'<h3>Zobacz, które zadania się nie powiodły. Ponów je tutaj.</h3><p>Panel zbiera nieudane zadania i przyciski ponawiania w jednym miejscu.</p>',reason:'Tekst na stronę: nazwij zadanie, wyjaśnij, co użytkownik może zrobić, i usuń pochwały bez pokrycia.',lang:'pl'},
   slides:{before:'Migracja przyniosła imponujące 18-procentowe skrócenie mediany czasu budowania – z 10 do 8,2 minuty – w 20 przebiegach na tym samym runnerze, co stanowi znaczący krok naprzód w produktywności programistów.',after:'<h3>Mediana czasu budowania spadła o 18%.</h3><p>10 minut → 8,2 minuty</p><p><strong>Notatki prelegenta:</strong> Porównanie objęło 20 przebiegów na tym samym runnerze. Nie mierzy ogólnej produktywności programistów.</p>',reason:'Slajdy: przenieś zmierzony wynik do tytułu. Próbkę, warunki i zakres zostaw w notatkach prelegenta. Wszystkie liczby w tym przykładzie są fikcyjne.',lang:'pl'},
   polish:{before:'Nasz zaawansowany panel umożliwia zespołom bezproblemowe monitorowanie nieudanych zadań oraz ich płynne ponawianie z jednego, scentralizowanego miejsca.',after:'<h3>Sprawdź, które zadania się nie powiodły. Ponów je w panelu.</h3><p>Lista nieudanych zadań i przyciski ponawiania są w jednym miejscu.</p>',reason:'Polski: nazwij konkretną czynność. Usuń ogólniki i kalki, zachowując znaczenie. Przykład redakcji: zachowane znaczenie, mniej ogólników.',lang:'pl'}
  },
  empty:'Gotowe wytyczne pojawią się tutaj, gdy podasz odbiorców i tekst oryginalny.',
  readySample:'Gotowe do wklejenia. Wytyczne zawierają odbiorców, próbkę stylu i tekst oryginalny.',
  ready:'Gotowe do wklejenia. Wytyczne zawierają odbiorców i tekst oryginalny.',
  detailsLeft:count=>`${count} ${count===1?'szczegół':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'szczegóły':'szczegółów'} do uzupełnienia przed skopiowaniem.`,
  start:'Podaj odbiorców i tekst oryginalny, aby utworzyć gotowe wytyczne.',
  draftFailed:'Nie udało się zapisać szkicu. Skopiuj wytyczne, zanim opuścisz stronę.',
  draftUnavailable:'Wszystko powstaje w Twojej przeglądarce i nigdzie nie jest wysyłane. Ta przeglądarka nie zachowuje szkiców, więc skopiuj wytyczne, zanim opuścisz stronę.'
 },
 brief:{
  issues:{audience:'Napisz, kto przeczyta tekst.',original:'Wklej tekst, który chcesz zredagować.'}
 },
 drafts:{
  kept:'Wszystko powstaje w Twojej przeglądarce i nigdzie nie jest wysyłane. Szkic zostaje w tej karcie, dopóki go nie wyczyścisz lub nie zamkniesz karty.',
  failedToast:'Nie udało się zapisać szkicu.',
  cleared:'Wyczyszczono szkic.'
 },
 common:{
  motionOn:'Ruch włączony',
  motionOff:'Ruch wyłączony',
  pauseTitle:'Wstrzymaj animację dekoracyjną',
  enableTitle:'Włącz animację dekoracyjną',
  copied:'Tekst skopiowany. Możesz go wkleić.',
  copiedFallback:'Tekst skopiowany.',
  selected:'Tekst zaznaczony. Naciśnij Ctrl+C lub ⌘C, aby go skopiować.'
 },
 field:{
  chaosMoving:'CHAOS W RUCHU',
  chaosPaused:'CHAOS WSTRZYMANY',
  evolving:'POWOLNA EWOLUCJA',
  paused:'RUCH WSTRZYMANY',
  restore:'Przywróć uporządkowany ruch',
  scatter:'Rozprosz cząsteczki'
 },
 screensaver:{
  speed:'Prędkość liter',
  fade:'Płynne pojawianie się liter',
  color:'Kolor liter',
  cycle:'Powolna zmiana koloru',
  turnOff:'Wyłącz wygaszacz'
 }
};
