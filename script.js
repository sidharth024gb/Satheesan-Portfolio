let navbarHeight = document.querySelector("header").clientHeight + 10;
document
  .querySelector("body")
  .style.setProperty("--navbar-height", navbarHeight + "px");

/* ####################### Experience ####################### */

const companies = document.querySelectorAll("#companies>div");

companies.forEach((company) => {
  company.addEventListener("click", function () {
    const dialog = document.querySelector(
      `#companies-projects>dialog#${this.dataset.companyName}`
    );
    dialog.showModal();
  });
});

const dialogCloseBtn = document.querySelectorAll(
  "#companies-projects>dialog>#dialog-close-btn"
);

dialogCloseBtn.forEach((button) => {
  button.addEventListener("click", function () {
    this.parentElement.close();
  });
});

/* ####################### Carousel ####################### */

let slideNumber = 0;

function slideIndicator(dialog) {
  const indicators = document.querySelectorAll(
    `dialog#${dialog} .my-carousel-slide-no`
  );

  indicators.forEach((indicator, index) => {
    if (index === slideNumber) {
      indicator.classList.add("slide-active");
    } else {
      indicator.classList.remove("slide-active");
    }
  });
}

function slide({ button, moveTo = false }) {
  const dialog = button.dataset.dialog;
  const carousel = document.querySelector(
    `#companies-projects>dialog#${dialog} .my-carousel-inner`
  );
  const slideWidth = document.querySelector(
    `dialog#${dialog} .my-carousel .my-carousel-item`
  ).clientWidth;
  const slideCount = carousel.childElementCount;
  const action = parseInt(button.dataset.action);

  slideNumber = moveTo ? action : slideNumber + action;
  if (slideNumber > slideCount - 1) {
    slideNumber = 0;
  } else if (slideNumber < 0) {
    slideNumber = slideCount - 1;
  }
  const move = slideNumber * (slideWidth + 48);

  carousel.style.transform = `translateX(-${move}px)`;
  slideIndicator(dialog);
}

const carouselPrevBtns = document.querySelectorAll("dialog .my-carousel-prev");
carouselPrevBtns.forEach((button) => {
  button.addEventListener("click", function () {
    slide({ button: this });
  });
});

const carouselNextBtns = document.querySelectorAll("dialog .my-carousel-next");
carouselNextBtns.forEach((button) => {
  button.addEventListener("click", function () {
    slide({ button: this });
  });
});

const slideIndicatorBtns = document.querySelectorAll(
  "dialog .my-carousel-slide-no"
);
slideIndicatorBtns.forEach((button) => {
  button.addEventListener("click", function () {
    slide({ button: this, moveTo: true });
  });
});

// Reset Slide Number And Position
const dialogs = document.querySelectorAll("dialog");
dialogs.forEach((dialogBox) => {
  dialogBox.addEventListener("close", () => {
    slideNumber = 0;
    document.querySelector(
      `dialog#${dialogBox.id} .my-carousel-inner`
    ).style.transform = "translateX(0px)";
    slideIndicator(dialogBox.id);
  });
});
