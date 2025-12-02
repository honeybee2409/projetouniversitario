/* main.js */
(function () {
    // --- LÓGICA DO HEADER (Funciona em todas as páginas) ---
    const header = document.querySelector('header');
    if (header) {
        const LARGE_BREAKPOINT = 980;
        const SCROLL_THRESHOLD = 60;

        function applyState() {
            const wide = window.innerWidth >= LARGE_BREAKPOINT;
            if (window.scrollY > SCROLL_THRESHOLD || !wide) {
                header.classList.add('header--compact');
                header.classList.remove('header--large');
            } else {
                header.classList.add('header--large');
                header.classList.remove('header--compact');
            }
        }
        document.addEventListener('DOMContentLoaded', applyState);
        window.addEventListener('scroll', applyState, { passive: true });
        window.addEventListener('resize', applyState);
    }

    // --- LÓGICA DO FORMULÁRIO (Só roda se o formulário existir na página) ---
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('msg-sucesso');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Impede o redirecionamento padrão

            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Enviando...";
            btn.disabled = true;

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    // Sucesso: Esconde formulário, mostra mensagem
                    form.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'block';
                })
                .catch(error => {
                    alert("Algo deu errado no túnel... Tente novamente.");
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // --- LÓGICA DO CARROSSEL (index.html) ---
    const track = document.querySelector('.carousel-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (track && btnPrev && btnNext) {
        let currentPosition = 0;

        // Função para mover o carrossel
        function moveCarousel(direction) {
            const card = track.querySelector('.card');
            // Pega a largura do card + o gap (espaço) calculado pelo navegador
            const cardWidth = card.offsetWidth + 28; // 28 é o gap do CSS

            // Calcula o limite máximo para não rolar pro vazio
            const trackWidth = track.scrollWidth;
            const containerWidth = track.parentElement.offsetWidth;
            const maxScroll = -(trackWidth - containerWidth);

            if (direction === 'next') {
                currentPosition -= cardWidth;
                // Se passar do limite, volta um pouco ou trava
                if (currentPosition < maxScroll) currentPosition = maxScroll;
            } else {
                currentPosition += cardWidth;
                // Não deixa passar do início (0)
                if (currentPosition > 0) currentPosition = 0;
            }

            track.style.transform = `translateX(${currentPosition}px)`;
        }

        btnNext.addEventListener('click', () => moveCarousel('next'));
        btnPrev.addEventListener('click', () => moveCarousel('prev'));
    }
})();
