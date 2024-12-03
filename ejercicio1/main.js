const selectGOT = async () => {
  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const gotArr = await response.json();
    console.log(gotArr);

    const card = document.querySelector(".character-image");
    const charInfo = document.createElement("div");
    charInfo.className = "info";
    card.insertAdjacentElement("afterend", charInfo);
    const characterSelect = document.getElementById("character-list");

    const cardText = (elem) => `
                <h3>${elem.fullName}</h3>
                <p>${elem.title}</p>
                <p>of house ${elem.family}</p>`;

    const selectChar = document.createElement("option");
    selectChar.innerText = "Choose your character";
    selectChar.setAttribute("disabled", true);
    selectChar.setAttribute("selected", true);
    characterSelect.append(selectChar);

    gotArr.forEach((elem) => {
      const optionChar = document.createElement("option");
      optionChar.innerText = elem.fullName;
      optionChar.value = elem.imageUrl;
      optionChar.setAttribute("data-index", gotArr.indexOf(elem));
      characterSelect.append(optionChar);
    });

    characterSelect.addEventListener("change", (ev) => {
      const selectedIdx =
        ev.target.selectedOptions[0].getAttribute("data-index");
      const selectedChar = gotArr[selectedIdx];

      if (selectedChar) {
        card.src = selectedChar.imageUrl;
        charInfo.innerHTML = cardText(selectedChar);
      } else {
        card.src = "";
        charInfo.innerHTML = "";
      }
    });
  } catch (error) {
    console.error(error);
  }
};

selectGOT();
