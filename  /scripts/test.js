$(function(){
  $('.header__burger').click(function(event){
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  })
});

window.onload = function(){
  window.setTimeout(function(){
  document.body.classList.add('loaded')
}, 3000)
}

function print_doc(){
  let elementsToPrint = document.getElementsByClassName('elem-to-print');
  let newWin = window.open('Print-Window');
  for(let i=0; i < elementsToPrint.length; i++){
    console.log(elementsToPrint[i].innerHTML);
    newWin.document.write('<html><body onload="window.print()">' + elementsToPrint[i].innerHTML + '</body></html>');
  }
  newWin.document.close();
}

function startTest(){
  startPage.style.display = 'none';
  page1.style.display = 'block';
}

function scrollPage(){
  if(page1.style.display == 'block'){
    page1.style.display = 'none'
    page2.style.display = 'block';
  } else{
    page2.style.display = 'none'
    page3.style.display = 'block';
  }
}

let counter = 0

function checkTest(){
  page3.style.display = 'none';
  resultsPage.style.display = 'block';


  for(let i = 1; i < 31; i++){
    let elements = document.getElementsByName('test' + i);

    for(let j = 0; j < elements.length; j++){
      if(elements[j].checked && elements[j].value == 'right'){
        counter++;
      } 
    }
  }

  for(let i = 1; i < 31; i++){
    let elements = document.getElementsByName('test' + i);
    let error
    for(let j = 0; j < elements.length; j++){
      if(elements[j].checked && elements[j].value == 'wrong'){
        continue;
      } else if(elements[j].checked && elements[j].value == 'adjectives'){
        error = document.createElement("p");
        error.innerHTML = 'Degrees of adjectives';
        document.getElementById("errors").appendChild(error);
        console.log('degrees of comparison')
      } else if(elements[j].checked && elements[j].value == 'modals'){
        error = document.createElement("p");
        error.innerHTML = 'Modal verbs';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'pastSimple'){
        error = document.createElement("p");
        error.innerHTML = 'Past Simple';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'firstConditional'){
        error = document.createElement("p");
        error.innerHTML = 'First Conditional';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'passiveVoice'){
        error = document.createElement("p");
        error.innerHTML = 'Passive Voice';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'presentContinuous'){
        error = document.createElement("p");
        error.innerHTML = 'Present Continuous';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'iWish'){
        error = document.createElement("p");
        error.innerHTML = 'I wish ...';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'usedTo'){
        error = document.createElement("p");
        error.innerHTML = 'Used to';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'there'){
        error = document.createElement("p");
        error.innerHTML = 'There is / There are';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'presentPC'){
        error = document.createElement("p");
        error.innerHTML = 'Present Perfect Continuous';
        document.getElementById("errors").appendChild(error);
      } else if(elements[j].checked && elements[j].value == 'questions'){
        error = document.createElement("p");
        error.innerHTML = 'Questions formation';
        document.getElementById("errors").appendChild(error);
      }
    }
  }

  if(errors.childNodes.length == 1){
    hide.style.display = 'none';
    invitation.style.width = '100%';
  }

  testPoints.innerHTML = counter;
  if(counter <= 12){
    englishLevel.innerHTML = 'A1';
    englishDescription.innerHTML = 'Elementary';
    levelDescription.innerHTML = 'З цього етапу починається вивчення англійської мови. Людина вчить алфавіт, базові слова, цифри, календар. Намагається порахувати до ста, розповісти елементарну інформацію про себе (як звати, де і коли народилася, де живе), вчиться писати й читати прості речення з 5–9 слів.'
    localStorage.setItem('level', 'Elementary');
  } else if(counter <= 16){
    englishLevel.innerHTML = 'A2';
    englishDescription.innerHTML = 'Pre Intermediate';
    levelDescription.innerHTML = 'Ті, хто володіють мовою на цьому рівні, можуть підтримати просту розмову на базові життєві теми (професія, сім’я, хобі) і в різних ситуаціях (кафе, заправка, магазин, лікарня). Вміють писати короткі записки й твори, але зі словником. Можуть читати адаптовані тексти обсягом до 500 слів, де трапляються незнайомі слова, але це не заважає вловити загальну суть твору.'
    localStorage.setItem('level', 'Pre Intermediate');
  } else if(counter <= 20){
    englishLevel.innerHTML = 'B1';
    englishDescription.innerHTML = 'Intermediate';
    levelDescription.innerHTML = 'Ті, хто володіють англійською мовою на середньому рівні, зможуть підтримати розмову в будь-яких типових ситуаціях (зокрема, під час подорожі англомовною країною) і без пауз грамотно висловити свою думку. Зокрема, розповісти про мрії, наміри, минулий досвід.'
    localStorage.setItem('level', 'Intermediate');
  } else if(counter <= 24){
    englishLevel.innerHTML = 'B2';
    englishDescription.innerHTML = 'Upper Intermediate';
    levelDescription.innerHTML = 'Той рівень мови, який найчастіше запитують роботодавці як мінімально необхідний. Чому? Тому що ті, хто знають англійську на рівні В2, вміють висловлювати свою думку з прикладами, аргументами; описувати в подробицях ситуації, емоції й почуття; легко спілкуватися на повсякденні теми як з тими, хто починає вивчати мову, так і з носіями; читати ділову і художню літературу, пресу, аналітичні звіти; практично вільно сприймати на слух англомовні інтерв’ю, радіопередачі, ТВ-шоу, кінофільми; писати об’ємні тексти на велику кількість тем, ділові та неформальні листи.'
    localStorage.setItem('level', 'Upper Intermediate');
  } else if(counter <= 28){
    englishLevel.innerHTML = 'C1';
    englishDescription.innerHTML = 'Advanced';
    levelDescription.innerHTML = 'На цьому етапі людина вже вільно володіє мовою, але ще не на рівні носія. Може висловити свою думку на будь-яку тему, використовуючи складні граматичні конструкції. У неї виходить писати як художні тексти з метафорами, так і наукові статті, вести бізнес-листування.'
    localStorage.setItem('level', 'Advanced');
  } else if(counter <= 30){
    englishLevel.innerHTML = 'C2';
    englishDescription.innerHTML = 'Proficiency';
    levelDescription.innerHTML = 'Цей рівень означає, що ви володієте мовою вільно, як носій. Відмінно розумієте іншу людину, навіть якщо вона говорить дуже швидко (наприклад, як Емінем у своїх піснях). Можете підтримати будь-яку розмову, використовуючи складні граматичні конструкції, ідіоми. У вас виходить висловлювати свою думку навіть із вузькоспеціалізованих питань, як письмово, так і усно. Можете читати в оригіналі будь-які тексти — науково-популярні книги, наукові статті, художню або бізнес-літературу.'
    localStorage.setItem('level', 'Proficiency');
  }
  console.log(counter)
}