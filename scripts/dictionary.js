$(function(){
  $('.header__burger').click(function(event){
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  })
});

function getInfo(){
  let request;
  if(window.XMLHttpRequest){
    request = new XMLHttpRequest();
  }
  else{
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  let pictureName = search.value;
  if(pictureName == ''){
    pictureName = 'apple'
  }
  request.open("GET", "https://api.unsplash.com/search/photos?query=" + pictureName + "&orientation=portrait&lang=uk&client_id=9OQvTJNK8kf9jMSuegi_HYGPBvN1GLwccy5nA8GZpys");
  request.onload = function(){
    if(request.status === 200){
      let photosObj = JSON.parse(request.response)
      if(photosObj.results.length <= 0){
        picture.src = 'img/10.jpg';
        return;
      }
      let picturePath = photosObj.results[0].urls.regular;
      picture.src = picturePath;
    }
    // } else if(photosObj.results[0].urls.regular == 'undefined'){
    //   errorBlock.style.display = 'block';
    //   contentBlock.style.display = 'none';
    // }
  }
  request.send();
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