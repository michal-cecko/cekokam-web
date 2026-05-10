var slideCislo = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideCislo++;
  if (slideCislo > slides.length) {
    slideCislo = 1;
  }
  slides[slideCislo - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}
