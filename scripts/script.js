$(function(){
  $('.header__burger').click(function(event){
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  })
});

function animationShow(){
  const animItems = document.querySelectorAll('.anim-items');
  if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
      for(let i = 0; i < animItems.length; i++){
        const  animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top - 50;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if(animItemHeight > window.innerHeight){
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
          animItem.classList.add('animated');
        } else{
          if(!animItem.classList.contains('anim-no-hide')){
            animItem.classList.remove('animated');
          }
        }
      }
    }
    function offset(el){
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top:  rect.top + scrollTop, left: rect.left + scrollLeft}
    }
  }
}
animationShow()

questionsSection.addEventListener('click', function(event){
  let target = event.target;
  let parent;
  if(target.tagName == 'BUTTON' || target.tagName == 'IMG' || target.tagName == 'H5' || target.tagName == 'SPAN' || target.className == 'questions__line'){
    if(target.tagName == 'BUTTON' || target.tagName == 'H5'){
      parent = target.parentNode.parentNode;
    } else if (target.tagName == 'IMG' || target.tagName == 'SPAN') {
      parent = target.parentNode.parentNode.parentNode;
    } else{
      parent = target.parentNode;
    }
    let elem = parent.childNodes[5]
    let arrow = parent.childNodes[1].childNodes[3].childNodes[0];
    console.log(arrow)
    if(elem.classList.contains('show')){
      elem.classList.remove("show");
      arrow.style.transform = 'rotate(0deg)';
    } else{
      elem.classList.add("show");
      arrow.style.transform = 'rotate(180deg)';
    }
  } else{
    return;
  }
})
  