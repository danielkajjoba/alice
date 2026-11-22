
const pages = document.querySelectorAll(".page");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const openLetterButton = document.getElementById("openLetterButton");
const pageDots = document.getElementById("pageDots");
const music = document.getElementById("backgroundMusic");
const bookNavigation = document.getElementById("bookNavigation");

let currentPage = 0;

pages.forEach((page, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.addEventListener("click", () => {
        showPage(index);
    });

    pageDots.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));

    pages.forEach((page, i) => {
        page.classList.toggle("active", i === currentPage);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentPage);
    });

    // Hide all navigation on the cover
    bookNavigation.style.display =
        currentPage === 0 ? "none" : "flex";

    prevButton.style.visibility =
        currentPage === 1 ? "hidden" : "visible";

    nextButton.style.visibility =
        currentPage === pages.length - 1 ? "hidden" : "visible";
}

// Open letter and start music
openLetterButton.addEventListener("click", async () => {
    showPage(1);

    try {
        await music.play();
    } catch (error) {
        console.log("Music could not start:", error);
    }
});

// Next page
nextButton.addEventListener("click", () => {
    showPage(currentPage + 1);
});

// Previous page
prevButton.addEventListener("click", () => {
    showPage(currentPage - 1);
});

// Swipe support for phones
let touchStartX = 0;

document.querySelector(".notebook").addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.querySelector(".notebook").addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
        if (difference > 0) {
            showPage(currentPage + 1);
        } else {
            showPage(currentPage - 1);
        }
    }
});

showPage(0);
