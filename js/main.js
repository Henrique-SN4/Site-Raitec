// CONTEÚDO DO ARQUIVO: js/main.js
const pages = ['home-page', 'capacitacoes-page', 'praticar-page', 'course-page'];
window.conteudos = {}; // Guarda todos os cursos
let currentCourse = null;
let currentStep = 1;
let paginaOrigem = 'home-page';

function registrarConteudo(id, dados) { window.conteudos[id] = dados; }

function showPage(pageId) {
    pages.forEach(id => {
        const page = document.getElementById(id);
        if (page) page.style.display = 'none';
    });
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPage(pageId, targetId = null) {
    pages.forEach(id => {
        const page = document.getElementById(id);
        if (page) page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.style.display = 'block';

    if (targetId) {
        // Pequeno atraso para garantir que o display:block funcionou antes de rolar a tela
        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    } else {
        // Se não tiver alvo, vai pro topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goBackToCategory() { showPage(paginaOrigem); }

function updateCourse() {
    const step = currentCourse.steps[currentStep - 1];
    document.getElementById('step-1-title').textContent = step.title;
    document.getElementById('step-1-text').textContent = step.text;

    const allSteps = [
        document.getElementById('course-step-1'),
        document.getElementById('course-step-2'),
        document.getElementById('course-step-3')
    ];
    allSteps.forEach(el => el.style.display = 'none');
    allSteps[currentStep - 1].style.display = 'block';

    if (currentStep === 2) {
        document.getElementById('step-2-title').textContent = step.title;
        document.getElementById('step-2-text').textContent = step.text;
        document.getElementById('step-2-callout').textContent = step.callout || "";
    }
    if (currentStep === 3) {
        document.getElementById('step-3-title').textContent = step.title;
        document.getElementById('step-3-text').textContent = step.text;
    }

    document.getElementById('course-prev').style.visibility = (currentStep === 1) ? 'hidden' : 'visible';
    document.getElementById('course-next').style.visibility = (currentStep === currentCourse.steps.length) ? 'hidden' : 'visible';
}

function changeCourseStep(direction) {
    currentStep += direction;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > currentCourse.steps.length) currentStep = currentCourse.steps.length;
    updateCourse();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollCarousel(carouselId, amount) {
    document.getElementById(carouselId).scrollBy({ left: amount, behavior: 'smooth' });
}