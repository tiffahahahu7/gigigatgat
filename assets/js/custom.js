document.addEventListener("DOMContentLoaded", function () {
    const gifs = [
        {
            id: "wave-sloth",
            src: "https://images.gigigatgat.ca/wave-sloth.gif",
            alt: "Wave sloth"
        },
        {
            id: "flying-avocado",
            src: "https://images.gigigatgat.ca/avocado-flying.gif",
            alt: "Flying avocado"
        }
    ];

    const container = document.getElementById("gif-container");
    if (!container) return;

    // Get last shown index from localStorage
    const lastIndex = parseInt(localStorage.getItem("lastGifIndex")) || -1;

    // Pick a new index different from last
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * gifs.length);
    } while (gifs.length > 1 && newIndex === lastIndex);

    // Store new index
    localStorage.setItem("lastGifIndex", newIndex);

    const gif = gifs[newIndex];
    const img = document.createElement("img");
    img.id = gif.id;
    img.src = gif.src;
    img.alt = gif.alt;

    container.appendChild(img);
});
