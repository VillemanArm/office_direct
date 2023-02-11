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
