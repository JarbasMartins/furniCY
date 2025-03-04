const leftItems = document.querySelectorAll(".left");

function revealItems() {
    leftItems.forEach((itemL) => {
        itemL.classList.add("revealLeft");
    });
}

window.addEventListener("DOMContentLoaded", revealItems);

//

const items = document.querySelectorAll(".item");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// Função para mostrar o slide atual
function showSlide(index) {
    // Remove a classe ativo de todos os itens
    items.forEach((item) => {
        item.classList.remove("ativo");
    });

    // Adiciona a classe ativo ao item atual
    items[index].classList.add("ativo");

    currentIndex = index;
}

function nextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= items.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

// Função para ir para o slide anterior
function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
        newIndex = items.length - 1;
    }
    showSlide(newIndex);
}

// Adiciona eventos aos botões
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

showSlide(currentIndex);
