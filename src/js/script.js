// select
const selectHeader = document.querySelector(".select__header");
const selectBody = document.querySelector(".select__body");
const selectTitle = document.querySelector(".select__title");
const selectItem = document.querySelectorAll(".select__item");
const selectImg = document.querySelector(".select__chevron img");

selectHeader.addEventListener("click", () => {
    if (selectBody.classList.contains("select__body_active")) {
        selectBody.classList.remove("select__body_active");
        selectImg.style.transform = "rotate(0deg)";
        selectBody.style.maxHeight = null;
    } else {
        selectBody.classList.add("select__body_active");
        selectImg.style.transform = "rotate(180deg)";
        selectBody.style.maxHeight = selectBody.scrollHeight + "px";
    }
});

selectItem.forEach((item, i) => {
    item.addEventListener("click", () => {
        selectTitle.textContent = item.textContent;
        selectBody.classList.remove("select__body_active");
        selectImg.style.transform = "rotate(0deg)";
        selectBody.style.maxHeight = null;
    });
});

// map
let center = [55.67508584336249, 37.50301247021486];
let placemarkCoordinates = [55.60970044783877, 37.49566439587404];
const mapElement = document.querySelector("#map-element");

function init() {
    let map = new ymaps.Map("map-element", {
        center: center,
        zoom: 11,
    });

    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил
    map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты

    if (mapElement.offsetWidth > 780) {
        let placemark = new ymaps.Placemark(
            placemarkCoordinates,
            {
                balloonContent: `
        <div class="balloon" style="width: 150px; height: 100px; line-height: 150%;">
          <b>ОфисДирект</b><br>
          Режим работы:<br>
          ежедневно с 10 до 19 часов
        </div>
`,
            },
            {
                iconLayout: "default#image",
                iconImageHref: "img/map/placemark.svg",
                iconImageSize: [70, 100],
                iconImageOffset: [-25, -90],
            }
        );
        map.geoObjects.add(placemark);
    } else {
        map.setCenter(placemarkCoordinates, 10);

        let placemark = new ymaps.Placemark(
            placemarkCoordinates,
            {
                balloonContent: `
          <div class="balloon" style="width: 150px; height: 100px; line-height: 150%;">
            <b>ОфисДирект</b><br>
            Режим работы:<br>
            ежедневно с 10 до 19 часов
          </div>
  `,
            },
            {
                iconLayout: "default#image",
                iconImageHref: "img/map/placemark.svg",
                iconImageSize: [45, 64],
                iconImageOffset: [-22, -60],
            }
        );
        map.geoObjects.add(placemark);
    }

    window.addEventListener("resize", () => {
        let width = mapElement.offsetWidth;
        if (mapElement.offsetWidth <= 780) {
            map.setCenter(placemarkCoordinates, 10);

            map.geoObjects.remove(placemark);
            placemark = new ymaps.Placemark(
                placemarkCoordinates,
                {
                    balloonContent: `
            <div class="balloon" style="width: 150px; height: 100px; line-height: 150%;">
              <b>ОфисДирект</b><br>
              Режим работы:<br>
              ежедневно с 10 до 19 часов
            </div>
    `,
                },
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/map/placemark.svg",
                    iconImageSize: [45, 64],
                    iconImageOffset: [-22, -60],
                }
            );

            map.geoObjects.add(placemark);
        } else {
            map.setCenter(center, 11);

            map.geoObjects.remove(placemark);
            placemark = new ymaps.Placemark(
                placemarkCoordinates,
                {
                    balloonContent: `
            <div class="balloon" style="width: 150px; height: 100px; line-height: 150%;">
              <b>ОфисДирект</b><br>
              Режим работы:<br>
              ежедневно с 10 до 19 часов
            </div>
    `,
                },
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/map/placemark.svg",
                    iconImageSize: [70, 100],
                    iconImageOffset: [-25, -90],
                }
            );

            map.geoObjects.add(placemark);
        }
    });
}

ymaps.ready(init);

//mobile menu

const headerBurgerFill = document.querySelector(".header__burger-fill");
const headerBurgerCross = document.querySelector(".header__burger-cross");
const headerMobileMenu = document.querySelector(".header__mobile-menu");
const body = document.querySelector("body");

headerBurgerFill.addEventListener("click", () => {
    headerMobileMenu.style.display = "flex";
    headerBurgerFill.style.display = "none";
    headerBurgerCross.style.display = "block";
    body.classList.add("noscroll");
});

headerBurgerCross.addEventListener("click", () => {
    headerMobileMenu.style.display = "none";
    headerBurgerFill.style.display = "block";
    headerBurgerCross.style.display = "none";
    body.classList.remove("noscroll");
});

// modal

const modal = document.querySelector(".modal"),
    buttonsModal = document.querySelectorAll(".button__modal");

buttonsModal.forEach((item) => {
    item.addEventListener("click", () => {
        modal.style.display = "flex";
        body.classList.add("noscroll");
    });
});

modal.addEventListener("click", (e) => {
    const isModal = e.target.closest(".modal__message");

    if (!isModal) {
        modal.style.display = "none";
        if (getComputedStyle(headerMobileMenu).display !== "flex") {
            body.classList.remove("noscroll");
        }
    }
});

//slider

const swiper = new Swiper(".slider", {
    // Optional parameters
    loop: true,
    //   // If we need pagination
    pagination: {
        el: ".slider-pagination",
        clickable: true,
    },

    //   // Navigation arrows
    navigation: {
        nextEl: ".slider__arrow-right",
        prevEl: ".slider__arrow-left",
    },
});

const slider = document.querySelector(".slider");
const sliderButtons = document.querySelectorAll(".slider__button");

sliderButtons.forEach((button) => {
    if (slider.offsetWidth <= 780) {
        button.innerHTML = "Тест-драйв";
    } else {
        button.innerHTML = "Запись на тест-драйв";
    }
});

window.addEventListener("resize", () => {
    sliderButtons.forEach((button) => {
        if (slider.offsetWidth <= 780) {
            button.innerHTML = "Тест-драйв";
        } else {
            button.innerHTML = "Запись на тест-драйв";
        }
    });
});

// send form

const form = document.querySelector(".form__element");

const sendForm = (data) => {
    // отправка данных в файл php
    return fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((res) => res.json());
};

form.addEventListener("submit", (e) => {
    e.preventDefault(); // отмена стандартного поведения кнопки submit

    const dataForm = new FormData(form); // сбор всех данных в input из формы
    const user = {};

    dataForm.forEach((value, key) => {
        user[key] = value;
    });

    sendForm(user).then((data) => {
        console.log("Письмо успешно отправлено.");
    });

    form.reset();
});

// добавляем анимацию

AOS.init();
