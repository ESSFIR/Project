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

window.addEventListener('load', function(){
  getInfo()
})

let audioPath

function getInfo(){
  //get photo request 
  let request;
  let pictureName = search.value;
  if(window.XMLHttpRequest){
    request = new XMLHttpRequest();
  }
  else{
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.open("GET", "https://api.unsplash.com/search/photos?query=" + pictureName + "&orientation=portrait&client_id=9OQvTJNK8kf9jMSuegi_HYGPBvN1GLwccy5nA8GZpys");
  request.onload = function(){
    if(request.status === 200){
      let photosObj = JSON.parse(request.response)
      if(photosObj.results.length <= 0){
        picture.src = 'img/20.jpg';
        return;
      }
      let picturePath = photosObj.results[0].urls.regular;
      picture.src = picturePath;
    }
  }
  request.send();

  //reach audio and phonetics request
  let requestPhonetics;
  let word = search.value;
  if(search.value == ''){
    word = 'dictionary'
  }

  if(window.XMLHttpRequest){
    requestPhonetics = new XMLHttpRequest();
  }
  else{
    requestPhonetics = new ActiveXObject("Microsoft.XMLHTTP");
  }
  requestPhonetics.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
  requestPhonetics.onload = function(){
    if(requestPhonetics.status === 200){
      phoneticsObj = JSON.parse(requestPhonetics.response);
      audioButton.removeAttribute("disabled");
      audioButton.style.background = 'rgb(64,132,238)';
      audioButton.style.background = 'linear-gradient(180deg, rgba(64,132,238,1) 0%, #806bf1 87%)';
      //get audio
      phoneticsArr = phoneticsObj[0].phonetics;
      for(let i = 0; i < phoneticsArr.length; i++){
        if(phoneticsObj[0].phonetics[i].audio == ''){
          continue;
        } else{
          audioPath = phoneticsObj[0].phonetics[i].audio;
        }
      }
      if(phoneticsObj[0].phonetics == '' || phoneticsObj[0].phonetics[0].audio == ''){
        audioButton.style.background = 'grey';
        audioButton.setAttribute("disabled", "disabled");
      } else {
        audioButton.removeAttribute("disabled");
        audioButton.style.background = 'rgb(64,132,238)';
        audioButton.style.background = 'linear-gradient(180deg, rgba(64,132,238,1) 0%, #806bf1 87%)';
      }
      //get symbols
      if(phoneticsObj[0].phonetics == '' || phoneticsObj[0].phonetics[0].text == undefined){
        transcription.innerHTML = '';
      } else {
        transcription.innerHTML = phoneticsObj[0].phonetics[0].text;
      }
      
    } else if(requestPhonetics.status === 404){
      audioButton.style.background = 'grey';
      audioButton.setAttribute("disabled", "disabled");
      transcription.innerHTML = '';
    }
  }
  requestPhonetics.send();

  //reach dictionary request
  let requestDictionary;

  if(window.XMLHttpRequest){
    requestDictionary = new XMLHttpRequest();
  }
  else{
    requestDictionary = new ActiveXObject("Microsoft.XMLHTTP");
  }
  requestDictionary.open("GET", "https://www.dictionaryapi.com/api/v3/references/learners/json/" + word + "?key=633479c7-9402-4fe6-b973-28e3d5991b57");
  requestDictionary.onload = function(){
    if(requestDictionary.status === 200){
      wordFill.innerHTML = word;
      let wordObj = JSON.parse(requestDictionary.response);
      contentBlock.style.display = 'block';
      errorBlock.style.display = 'none';

      if(wordObj.length == 0){
        errorBlock.style.display = 'block';
        contentBlock.style.display = 'none';
      }
      // parts of speech
      if(wordObj[0].fl == 'noun'){
        if(word[0] == 'a' || word[0] == 'e' || word[0] == 'i' || word[0] == 'o' || word[0] == 'u' || word[0] == 'y'){
          wordFill.innerHTML = 'an ' + word
        } else{
          wordFill.innerHTML = 'a ' + word
        }
        partOfSpeachFill.innerHTML = 'noun'
      }
      if(wordObj[0].fl == 'verb'){
        wordFill.innerHTML = 'to ' + word
        partOfSpeachFill.innerHTML = 'verb'
      }
      if(wordObj[0].fl == 'preposition'){
        partOfSpeachFill.innerHTML = 'preposition'
      }
      if(wordObj[0].fl == 'adjective'){
        partOfSpeachFill.innerHTML = 'adjective'
      }
      if(wordObj[0].fl == 'adverb'){
        partOfSpeachFill.innerHTML = 'adverb'
      }
      if(wordObj[0].fl == 'pronoun'){
        partOfSpeachFill.innerHTML = 'pronoun'
      }
      if(wordObj[0].fl == 'conjunction'){
        partOfSpeachFill.innerHTML = 'conjunction'
      }

      //definition
      if(Object.prototype.hasOwnProperty.call(wordObj[0], "shortdef")){
        definition.innerHTML = wordObj[0].shortdef[0]
      } else{
        errorBlock.style.display = 'block';
        contentBlock.style.display = 'none';
        return;
      }
      examplePath = wordObj[0].def[0].sseq[0][0][1].dt;

      //example
      if(!Object.prototype.hasOwnProperty.call(wordObj[0].def[0].sseq[0][0][1], 'dt')){
        exampleTitle.style.display = 'none';
        example.style.display = 'none';
      } else{

        for(let i = 0; i < examplePath.length; i++){
          if(examplePath[i][0] == 'uns'){
                exampleTitle.style.display = 'none';
                example.style.display = 'none';
              }
        }
  
        for(let i = 0; i < examplePath.length; i++){
          if(examplePath[i][0] != 'vis'){
            continue;
          }
            exampleTitle.style.display = 'block';
            example.style.display = 'block';
            let result = examplePath[i][1][0].t;
            //building result
            let beginning = result.indexOf('{');
            let numSigns = word.length + 7;
            let str = result.split('');
            let removed = str.splice(beginning + 1, numSigns).join('')
            let newStr = str.join('').replace('{}', '<b>' + word + '</b>')
            if(newStr.includes('{t}')){
              newStr = str.join('').replace('{t}', '<b>' + word + '</b>')
            }
            example.innerHTML = newStr;
        }
      }

      //idioms

      if(Object.prototype.hasOwnProperty.call(wordObj[0], "dros")){
        idioms.style.display = 'block';
        let idiomPath = wordObj[0].dros;
        let counter = 0;

        if(idioms.childNodes.length > 3){
          for(let i = 1; i < idioms.childNodes.length; i++){
            let child = idioms.childNodes[3];
            child.remove()
          }
        }

        for(let i = 0; i < idiomPath.length; i++){
          if(counter > 2){
            return;
          }
          let line = document.createElement("p");
          line.innerHTML = wordObj[0].dros[i].drp;
          document.getElementById("idioms").appendChild(line);
          counter++
        }
      } else{
        idioms.style.display = 'none';
        return;
      }

    } else if(requestDictionary.status === 404){
      errorBlock.style.display = 'block';
      contentBlock.style.display = 'none';
    }
  }
  requestDictionary.send();
}

function playMusic(){
  let audio = new Audio(audioPath);
  audio.play();
}

//txt files in JS
readStringFromFileAtPath = function(pathOfFileToReadFrom)
  {
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var returnValue = request.responseText;
    return returnValue;
  }
//autocomplete
$( function() {
  var text = readStringFromFileAtPath("engmix.txt");
  let wordsDictionary = text.split(/\r?\n/);
  $( "#search" ).autocomplete({
    minLength: 4,
    source: wordsDictionary
  });

  //rules to filter the words
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
    return matcher.test(value.label || value.value || value);
    });
  };
});

//press enter and find
let input = document.getElementById('search');
  input.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
      getInfo()
    }
  });
