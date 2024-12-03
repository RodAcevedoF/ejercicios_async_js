let randomNum = Math.floor(Math.random() * 151) + 1;

const btn = document.querySelector(".btn");
const img = document.querySelector(".pkmn-img");
const h3 = document.querySelector("div h3");

const getPkmn = async () => {
  try {
    img.classList.add("hidden");
    h3.style.opacity = "0";

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    );
    const pokemon = await response.json();
    console.log(pokemon);

    const spriteOptions = Object.values(pokemon.sprites).filter(
      (sprite) => typeof sprite === "string" && sprite.startsWith("http")
    );

    if (spriteOptions.length > 0) {
      const randomSprite =
        spriteOptions[Math.floor(Math.random() * spriteOptions.length)];

      setTimeout(() => {
        img.src = randomSprite;
        img.alt = pokemon.name;
        h3.textContent = `#${pokemon.id} ${pokemon.name}`;

        img.classList.remove("hidden");
        h3.style.opacity = "1";
      }, 500);
    } else {
      console.error("No hay sprites disponibles para este Pokémon.");
    }
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
  }
};

btn.addEventListener("click", () => {
  randomNum = Math.floor(Math.random() * 151) + 1;
  getPkmn();
});

getPkmn();
