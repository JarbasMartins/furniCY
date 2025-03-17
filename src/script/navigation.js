// Função para determinar o caminho base para redirecionamento
function getBasePath() {
    // Obtém o caminho atual da URL
    const path = window.location.pathname;

    // Verifica se estamos em uma subpasta (como src/pages)
    if (path.includes("/src/pages/")) {
        // Se estamos em src/pages, precisamos voltar dois níveis para a raiz
        return "../..";
    } else {
        // Se estamos na raiz
        return ".";
    }
}

// Função para redirecionar para a página desejada
function navigateTo(page) {
    const basePath = getBasePath();

    // Define os caminhos para cada página
    const routes = {
        home: "/index.html",
        about: "/src/pages/about.html",
        shop: "/src/pages/shop.html",
        services: "/src/pages/services.html",
        blog: "/src/pages/blog.html",
        contact: "/src/pages/contact.html",
        car: "/src/pages/car.html",
    };

    // Redireciona para a página escolhida
    window.location.href = basePath + routes[page];
}

// Adiciona os event listeners aos links quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os links da navegação
    const links = document.querySelectorAll(".links a");

    // Adiciona event listeners para cada link
    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Previne o comportamento padrão do link

            // Determina qual página deve ser carregada baseado no texto ou atributo do link
            const linkText = this.textContent.toLowerCase().trim();

            if (linkText.includes("home")) {
                navigateTo("home");
            } else if (linkText.includes("sobre")) {
                navigateTo("about");
            } else if (linkText.includes("shop")) {
                navigateTo("shop");
            } else if (linkText.includes("serviços")) {
                navigateTo("services");
            } else if (linkText.includes("contatos")) {
                navigateTo("contact");
            } else if (linkText.includes("carrinho")) {
                navigateTo("car");
            }
        });
    });
});
