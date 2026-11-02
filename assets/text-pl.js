export const pl={
 prompt:{
  task:{
   custom:'Wykonaj moje zadanie na podstawie podanych szczegółów i ograniczeń. Zacznij od wyniku, którego potrzebuję, a potem wyjaśnij, co jest potrzebne, żeby go wykorzystać lub sprawdzić.',
   compare:'Porównaj dwie pozycje podane niżej pod kątem mojego celu i kryteriów. Dla obu przyjmij ten sam zakres i te same definicje. Oddziel udokumentowane funkcje, twierdzenia marketingowe i własne wnioski. Przy porównaniach faktów podawaj źródło. Nie wnioskuj, że funkcji brakuje, tylko dlatego, że nie jest udokumentowana. Niedostępne informacje oznacz jako nieznane. Nie wymyślaj ocen, pomiarów ani uniwersalnego zwycięzcy. Wyjaśnij, która opcja pasuje do jakich potrzeb.',
   review:'Sprawdź kod pod kątem poprawności i istotnych dla niego scenariuszy awarii. Uszereguj ważne ustalenia według wagi skutków. Przy każdym ustaleniu wskaż odpowiedni fragment kodu i zaproponuj przydatny sposób weryfikacji. Jeśli masz na to podstawy, wyjaśnij też, co wywołuje problem i jakie ma skutki. Nie wymyślaj plików, zachowań ani wyników testów.',
   debug:'Zdiagnozuj problem na podstawie dostępnych dowodów. Oddziel potwierdzone przyczyny od hipotez. Zanim zaproponujesz poprawkę, w pierwszej kolejności wskaż sprawdzenia, które pozwolą je od siebie odróżnić. Napisz, co ustali każde z nich.',
   code:'Zaimplementuj działanie, o które proszę, na podstawie podanych wymagań i kontekstu. Jeśli nie możesz edytować projektu, podaj odpowiedni kod i wyjaśnij, jak go wprowadzić. Wyjaśnij ważne zmiany i założenia. Pokaż, jak sprawdzić wynik. Nie twierdź, że wykonano sprawdzenia, których nie wykonano.',
   architecture:'Oceń architekturę pod kątem podanych wymagań. Wyjaśnij zależności, kompromisy i scenariusze awarii. Oddziel znane ograniczenia od założeń. Uzależnij rekomendacje od tych wymagań.',
   research:'Zbadaj zagadnienie, korzystając z odpowiednich źródeł pierwotnych, jeśli są dostępne. Wyjaśnij, co potwierdzają źródła, w czym się różnią i czego nadal nie wiadomo. Podawaj źródła twierdzeń o faktach. Odróżniaj jakość źródeł od stopnia pewności własnego wniosku.',
   paper:'Wyjaśnij pytanie badawcze artykułu, metodę, wyniki i ograniczenia. Zachowaj definicje, równania, niepewność i zakres dowodów. Oddziel ustalenia autorów od własnej interpretacji. Nie uogólniaj poza badane warunki.',
   summary:'Streść dostarczony materiał pod kątem mojego celu. Zachowaj główne tezy, ważne zastrzeżenia i istotne liczby. Oddziel twierdzenia źródła od własnej interpretacji. Jeśli brakuje niezbędnego materiału, poproś o niego.',
   procedure:'Wyjaśnij, jak wykonać zadanie. Uwzględnij potrzebne warunki wstępne, czynności w odpowiedniej kolejności i oczekiwane wyniki. Jeśli podane informacje na to pozwalają, opisz też, co zrobić w razie niepowodzenia.',
   writing:'Napisz lub zredaguj tekst na stronę internetową lub do prezentacji z myślą o jego docelowych odbiorcach. Zachowaj fakty, zastrzeżenia i terminy techniczne. Usuń watę słowną, ogólnikowe pochwały i obietnice bez pokrycia. Jeśli dołączono próbkę stylu, dopasuj się do niej, ale nie wymyślaj osobistych doświadczeń.'
  },
  answer:{
   text:'Podaj jasne, uporządkowane wyjaśnienie. Zacznij od odpowiedzi. Dodaj uzasadnienie i szczegóły potrzebne, żeby ją wykorzystać lub sprawdzić. Używaj nagłówków tylko wtedy, gdy ułatwiają nawigację.',
   steps:'Podaj ponumerowane instrukcje w kolejności, w jakiej da się je wykonać. Oddziel czynności od wyjaśnień. Warunki umieszczaj przed czynnościami, których dotyczą. Jeśli oczekiwany wynik jest znany, podaj go.',
   code:'Podaj odpowiedni kod ze zwięzłym wyjaśnieniem, jak go używać. Zależności i konfigurację uwzględnij tylko wtedy, gdy są potrzebne. Opisz sensowne sposoby sprawdzenia i oczekiwane wyniki.',
   table:'Użyj tabeli z czytelnymi nagłówkami kolumn, a pod nią dodaj zwięzłe wyjaśnienie. W porównaniach stosuj jawne kryteria i wyjaśnij kompromisy. Nieznane wartości oznacz jako nieznane. Nie wymyślaj ocen ani pomiarów.',
   checklist:'Podaj zwięzłą listę kontrolną czynności lub sprawdzeń, które wynikają z mojego zadania lub źródła. Używaj konkretnych punktów, które da się sprawdzić niezależnie od siebie; jeśli znasz oczekiwane wyniki lub warunki, podaj je. Ustalone fakty i otwarte pytania zapisz zwykłym tekstem, a nie jako punkty listy. Nie dodawaj czynności, których źródło nie wymienia. Zamiast zgadywać, oznaczaj niewiadome.',
   diagram:'Utwórz zwięzły diagram Mermaid przedstawiający istotne komponenty, granice lub przepływ. Użyj etykiet zgodnych z wyjaśnieniem. Oznacz niepewne zależności. Dołącz krótki tekstowy odpowiednik.',
   interactive:'Utwórz jedno samodzielne narzędzie HTML z osadzonym kodem CSS i JavaScript. Nie używaj zewnętrznych zależności ani żądań sieciowych. Dodaj elementy sterujące z etykietami, widoczne wyniki i opcję resetu. Podaj model, jednostki, założenia i ograniczenia. Dołącz alternatywę liczbową lub tekstową i uwzględnij preferencję ograniczonego ruchu.',
   animation:'Utwórz samodzielną animację HTML z osadzonym kodem CSS i JavaScript. Dodaj przyciski odtwarzania, pauzy, resetu i przejścia o krok. Nadaj etykietę każdemu stanowi. Podaj założenia i odróżnij uproszczony model od rzeczywistego działania. Dołącz tekstowy odpowiednik i obsługę preferencji ograniczonego ruchu. Nie używaj zewnętrznych zależności ani żądań sieciowych.'
  },
  myTask:'Moje zadanie:',
  comparison:(a,b,criteria)=>`Porównywane pozycje:\nA: ${a}\nB: ${b}\n\nKryteria porównania:\n${criteria}\n\nMoje zadanie powyżej określa cel porównania. Jeśli któraś pozycja jest niejednoznaczna, przed porównaniem poproś mnie o doprecyzowanie.`,
  readable:'Napisz odpowiedź tak, żeby łatwo było ją przeczytać i na jej podstawie działać. Używaj prostych zdań, konkretnych czasowników, spójnych terminów i krótkich akapitów. Kolejne sprawdzenia lub czynności podawaj w listach numerowanych. Zachowaj fakty, nazwy techniczne, jednostki, kod i ważne zastrzeżenia. Odróżniaj dowody od wniosków.',
  procedure:'W procedurach kieruj się duchem ASD-STE100: staraj się, by zdanie miało najwyżej 20 słów. Rozdzielaj kolejne czynności. Czynności, które muszą odbywać się jednocześnie, zostaw razem. Traktuj to jako wskazówki dotyczące pisania, a nie deklarację zgodności ze STE.',
  sources:'Przestrzegaj moich ograniczeń dotyczących źródeł i przeglądania sieci. Jeśli przeglądanie sieci jest dozwolone i dostępne, sprawdzaj twierdzenia zależne od czasu w aktualnych źródłach. Sam adres URL nie dowodzi, że treść strony została przeczytana. Jeśli nie masz dostępu do potrzebnego źródła, powiedz o tym i poproś o odpowiedni materiał. Nie wymyślaj cytowań i nie traktuj niezweryfikowanych twierdzeń jak ustalonych faktów.',
  missing:'Jeśli brakuje informacji niezbędnych do poprawnej odpowiedzi, zadaj konkretne pytanie zamiast zgadywać. Odpowiadaj w języku mojego zadania, chyba że poproszę o inny.',
  answerFormat:'Forma odpowiedzi:',
  compareTable:'Użyj tabeli porównawczej z jednym wierszem na każde kryterium i osobną kolumną dla każdej pozycji. Pod tabelą zwięźle wyjaśnij kompromisy i ograniczenia dowodów.',
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
  help:'Opisz zadanie, oczekiwany wynik i ważne ograniczenia.',
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
  color:'Kolor liter'
 }
};
