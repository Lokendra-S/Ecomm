// var NumberOfSlides = 0
// const SwiperFunction = (number) => {
//   if ( window.screen.width < 450 ){
//     number = 1
//     console.log(NumberOfSlides)
//   }else if(window.screen.width > 450 && window.screen.width < 600){
//     number = 2
//   }else{
//     number = 4
//   }

//   const swiper = new Swiper('.swiper', {
//     loop: false,
//     slidesPerView: number,
//     spaceBetween: 10,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//       bulletClass: `swiper-pagination-bullet`
//     },
//     // navigation: {
//     //   nextEl: '.swiper-button-next',
//     //   prevEl: '.swiper-button-prev',
//     // }
//   });
// }
// SwiperFunction(NumberOfSlides)
// // console.log(window.screen.width)
// // <450 = 1
// // 450 -600 = 2

// var select = document.querySelector('.selectFilter')

// select.addEventListener('change',()=>{
//   console.log(select.options[select.selectedIndex].value)
// })
const swiper = new Swiper('.swiper', {
  loop: false,
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass: `swiper-pagination-bullet`
  },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // }
});