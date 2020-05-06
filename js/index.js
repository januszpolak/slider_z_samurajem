class Slider {
  constructor(images) {
    this.images = images;
    this.slide = null;
    this.buttonPrev = null;
    this.buttonNext = null;
    this.image = null;
    this.currentSlide = 0;
    this.slideArrayLenght = 0;
    this.slideCaption = null;

    this.UiSelectors = {
      slide: "[data-slider]",
      buttonPrev: "[data-button-prev]",
      buttonNext: "[data-button-next]",
    };
  }

  initializeSlider() {
    this.slide = document.querySelector(this.UiSelectors.slide);
    this.buttonPrev = document.querySelector(this.UiSelectors.buttonPrev);
    this.buttonNext = document.querySelector(this.UiSelectors.buttonNext);
    this.image = document.createElement("img");
    this.image.classList.add("slide__image");
    this.slide.appendChild(this.image);
    this.setSlideAtributes(0);
    this.slideArrayLenght = this.images && this.images.length;

    this.slideCaption = document.createElement("figcaption");
    this.addCaption();
    this.slideCaption.classList.add("slide__caption");
    this.slide.append(this.slideCaption);

    this.disableButtons();
    this.addListeners();
  }

  addListeners() {
    this.buttonPrev.addEventListener("click", () =>
      this.changeSlide(this.currentSlide - 1)
    );
    this.buttonNext.addEventListener("click", () =>
      this.changeSlide(this.currentSlide + 1)
    );

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 37) {
        this.changeSlide(this.currentSlide - 1);
      } else if (e.keyCode === 39) {
        this.changeSlide(this.currentSlide + 1);
      }
    });
  }

  disableButtons() {
    this.currentSlide === 0
      ? this.buttonPrev.setAttribute("disabled", true)
      : this.buttonPrev.removeAttribute("disabled");
    this.currentSlide === this.slideArrayLenght - 1
      ? this.buttonNext.setAttribute("disabled", true)
      : this.buttonNext.removeAttribute("disabled");
  }

  changeSlide(index) {
    if (index === -1 || index === this.slideArrayLenght) return;
    this.currentSlide = index;
    this.setSlideAtributes(index);
    this.disableButtons();
    this.addCaption();
  }

  addCaption() {
    this.slideCaption.innerText = `${this.currentSlide + 1}/${
      this.slideArrayLenght
    }`;
  }

  setSlideAtributes(index) {
    this.image.setAttribute(
      "src",
      Array.isArray(this.images) && this.images.length && this.images[index]
    );
    this.image.setAttribute("alt", `Slide ${index + 1}`);
  }
}
