const preview = document.querySelectorAll(".current-img");
const inputs = document.querySelectorAll(".news-input");
const customBtn = document.querySelectorAll(".custom-btn");
const fileLoad = document.querySelectorAll(".load-img");
const publicNews = document.querySelector("#form-btn-3");

let summernoteLimit = document
  .querySelector("#summernote")
  .getAttribute("maxlength");

const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

function imgValidate(item) {
  const img = item.querySelector(".current-img").getAttribute("src");

  if (img === "") {
    item.classList.remove("afore");
    item.classList.add("error");
    item.classList.add("afore-error");
  }
}

function submitValidate(item) {
  if (item.value === "") {
    item.classList.add("empty-error");

    if (
      item.closest("section").getElementsByClassName("error-description")
        .length === 0
    ) {
      let fieldName = item.closest("section").querySelector("label").innerText;
      let errorDescription = `Поле "${fieldName}" обязательно для заполнения`;
      let errorStructure = `<div class="error-description">
          <span>${errorDescription}</span>
      </div>`;

      item.closest("section").insertAdjacentHTML("beforeend", errorStructure);
    }
  } else if (
    item.closest("section").getElementsByClassName("error-description").length >
    0
  ) {
    item.classList.remove("empty-error");
    item.closest("section").querySelector(".error-description").remove();
  }
}

preview.forEach(function (item) {
  item.addEventListener("error", function () {
    this.style.display = "none";
  });
});

customBtn.forEach(function (item, index) {
  item.addEventListener("click", function () {
    fileLoad[index].click();
  });
});

inputs.forEach(function (item) {
  item.addEventListener("input", function () {
    let lettersLength = item.value.length;
    let limit = item.getAttribute("maxlength");

    item
      .closest("section")
      .querySelector(".letters-limit").innerText = `${lettersLength}/${limit}`;
  });

  item.addEventListener("blur", function () {
    submitValidate(item);
  });
});

fileLoad.forEach(function (item) {
  item.addEventListener("change", function () {
    let [file] = item.files;

    if (file) {
      if (file["size"] < 1000000) {
        if (fileTypes.includes(file["type"])) {
          item
            .closest("section")
            .querySelector(
              ".custom-btn > .current-img"
            ).src = URL.createObjectURL(file);

          item
            .closest("section")
            .querySelector(".custom-btn > .current-img").style.display =
            "block";

          item
            .closest("section")
            .querySelector(".custom-btn")
            .classList.remove("afore");

          item
            .closest("section")
            .querySelector(".custom-btn")
            .classList.remove("afore-error");
        } else {
          alert("Недопустимый формат файла");
        }
      } else {
        alert("Файл слишком большой");
      }
    }
  });
});

$(document).ready(() => {
  $("#summernote").summernote({
    placeholder: "Введите основной текст",
    tabsize: 2,
    minHeight: 130,
    toolbar: [
      ["font", ["bold", "italic"]],
      ["para", ["ol", "ul"]],
      ["insert", ["link", "picture"]]
    ],
    callbacks: {
      onKeydown: function (e) {
        if (e.currentTarget.innerText.length >= summernoteLimit) {
          if (
            e.keyCode !== 8 &&
            e.keyCode !== 46 &&
            e.keyCode !== 37 &&
            e.keyCode !== 39
          ) {
            e.preventDefault();
          }
        }
      },
      onKeyup: function (e) {
        document.getElementById(
          "summernote-limit"
        ).innerText = `${e.currentTarget.innerText.length}/${summernoteLimit}`;
      }
    }
  });
});

publicNews.addEventListener("click", function (e) {
  e.preventDefault();

  inputs.forEach(function (item) {
    submitValidate(item);
  });

  customBtn.forEach(function (item) {
    imgValidate(item);
  });
});
