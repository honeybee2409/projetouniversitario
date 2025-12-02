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
})();