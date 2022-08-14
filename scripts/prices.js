$(function(){
  $('.header__burger').click(function(event){
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  })
});

function checkForm(){
  //first name validation
  let userFirstName = document.getElementById('firstName').value;
  if(userFirstName == ''){
    firstNameError.innerText = 'Не залишайте це поле пустим';
    return;
  } else{
    firstNameError.innerText = '';
  }

  //last name validation
  let userLastName = document.getElementById('lastName').value;
  if(userLastName == ''){
    lastNameError.innerText = 'Не залишайте це поле пустим';
    return;
  } else{
    lastNameError.innerText = '';
  }

  //phone
  let userPhone = document.getElementById("phone").value;
  let templatePhone = /^\d+$/;
  if(userPhone == ''){
    phoneError.innerText = 'Не залишайте це поле пустим';
    return;
  } else if(templatePhone.test(userPhone) == false){
    phoneError.innerText = 'Введіть числа';
    return;
  } else{
    phoneError.innerText = '';
  }

  //email
  let userEmail = document.getElementById('email').value;
  let templateEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if(userEmail == ''){
    emailError.innerText = 'Не залишайте це поле пустим';
    return;
  } else if(templateEmail.test(userEmail) == false){
    emailError.innerText = 'Не схоже на email адресу'
    return;
  } else{
    emailError.innerText = '';
  }

  // first lesson date check
  let now = new Date();
  let userFirstLesson = document.getElementById("firstLesson").value;
  if(userFirstLesson == ''){
    firstLessonError.innerText = 'Не залишайте це поле пустим';
    return;
  } else if(Date.parse(userFirstLesson) < Date.parse(now)){
    firstLessonError.innerText = 'Введіть майбутню дату';
    return;
  } else{
    firstLessonError.innerText = '';
  }
  //level of English
  let userLevel = document.getElementById('level').value;
  if(userLevel == ''){
    levelError.innerText = 'Не залишайте це поле пустим';
    return;
  } else{
    levelError.innerText = '';
  }

  // lesson quantity
  let userLessonQuantity = document.getElementById('lessonQuantity').value;
  if(userLessonQuantity == ''){
    lessonQuantityError.innerText = 'Оберіть варіант';
    return;
  } else if(userLessonQuantity <= 0){
    lessonQuantityError.innerText = 'Оберіть додатне число';
    return;
  }else{
    lessonQuantityError.innerText = '';
  }

  //result
  let userResultTime = document.getElementById('resultTime').value;
  if(userResultTime == ''){
    resultTimeError.innerText = 'Оберіть варіант';
    return;
  } else{
    resultTimeError.innerText = '';
  }

  //interests
  let elements = document.getElementsByClassName('active');
  let userInterests = '';
  for(let i=0; i < elements.length; i++){
    let interest = elements[i].nextSibling.nextSibling.innerHTML;
    userInterests += interest + ',';
  }
  document.getElementById('topics').value = userInterests;

  document.getElementById('formTelegram').submit();
}

clickArea.addEventListener('click', function chooseInterests(event){
  let target = event.target;
  let parent = target.parentNode;
  if(target.tagName == 'IMG' && !target.classList.contains('active')){
    target.classList.add('active');
    parent.style.border = '2px solid rgba(64,132,238,1)';
  } else{
    target.classList.remove('active');
    parent.style.border = '2px solid rgb(220, 220, 220)';
  }
})

function showResults(){
  let userLevel = document.getElementById('level').value;
  let userLessonQuantity = document.getElementById('lessonQuantity').value; 
  let userResultTime = document.getElementById('resultTime').value;
  if(userLevel == '' || userLessonQuantity == '' || userLevel == 'unknown' || userResultTime == ''){
    return;
  } else{
    recomendation.style.display = 'block';
    move()
  }
}

var i = 0;
function move() {
  let userLevel = document.getElementById('level').value;
  let userLessonQuantity = document.getElementById('lessonQuantity').value; 
  let userResultTime = document.getElementById('resultTime').value;
  let courseLessonNum;
  if(userLevel == 'Beginner'){
    courseLessonNum = 40;
  } else if(userLevel == 'Elementary'){
    courseLessonNum = 45;
  } else if(userLevel == 'Pre-Intermediate'){
    courseLessonNum = 54;
  } else if(userLevel == 'Intermediate'){
    courseLessonNum = 45;
  } else if(userLevel == 'Upper-Intermediate'){
    courseLessonNum = 71;
  } else if(userLevel == 'Advanced'){
    courseLessonNum = 55;
  }
  let numLessonsPlanned = userResultTime * 4 * userLessonQuantity;
  let resultAccomplishment = Math.trunc((numLessonsPlanned * 100) / courseLessonNum);
  if(resultAccomplishment >= 100){
    resultAccomplishment = 100;
    recomend.innerHTML = 'Вітаю! Ви успішно запланували власний навчальний процес!';
  } else{
    recomend.innerHTML = 'Іноді відведеного часу може не вистачити на реалізацію усіх планів. В такому випадку, ми рекомендуємо Вам збільшити інтенсивність уроків в тиждень або дати собі трошки більше часу для досягнення мети. Ми віримо, що разом зможемо досягти максимального результату!'
  }
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= resultAccomplishment) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        }
      }
    }
}
