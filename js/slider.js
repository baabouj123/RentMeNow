window.addEventListener("DOMContentLoaded", () => {
  const { children: slides } = document.querySelector(".slider");
  console.log(slides);
  let index = 0;
  showSlides();
  function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    index++;
    if (index > slides.length) {
      index = 1;
    }
    slides[index - 1].style.display = "flex";
    setTimeout(showSlides, 3000);
  }
});
