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
let center = [55.609685315592216, 37.49508010575369];

function init() {
  let map = new ymaps.Map("map-element", {
    center: center,
    zoom: 15,
  });

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты

  let placemark = new ymaps.Placemark(
    center,
    {
      balloonContent: `
        <div class="balloon" style="width: 150px; height: 100px;">
          <b>ОфисДирект</b><br>
          Режим работы:<br>
          ежедневно с 10 до 19 часов
        </div>
`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../img/map/placemark.svg",
      iconImageSize: [70, 100],
      iconImageOffset: [-30, -100],
    }
  );

  map.geoObjects.add(placemark);
}

ymaps.ready(init);
