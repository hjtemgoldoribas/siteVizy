document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('header ul a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.getElementById('leitor-btn').addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            var synth = window.speechSynthesis;
            var customTexts = {
                cabeçalho: "Bem-vindo à VIZY, você deseja saber mais sobre o nosso projeto, ou acessar a aba dos recursos de Acessibilidade?",
                inicio: "Somos uma startup sergipana formada por jovens desenvolvedores que buscam transformar o mercado e os meios digitais em ambientes integrativos, acessíveis e inclusivos.",
                servicos: "Oferecemos desenvolvimento de websites, implementação de plug-ins de acessibilidade e desenvolvimento de aplicativos mobile.",
                contato: "Entre em contato conosco através do formulário abaixo. Você pode nos enviar um e-mail ou nos seguir no Instagram."
            };
            var content = customTexts.cabeçalho;
            var utterance = new SpeechSynthesisUtterance(content);
            utterance.lang = 'pt-BR';
            utterance.rate = 1;
            utterance.pitch = 1;
            synth.speak(utterance);

            utterance.onend = function() {
                iniciarReconhecimentoVoz(customTexts);
            };
        } else {
            alert('A API de síntese de fala não é suportada neste navegador.');
        }
    });

    document.getElementById('contraste-btn').addEventListener('click', function() {
        document.body.classList.toggle('contraste');
    });

    document.getElementById('acessibilidade-btn').addEventListener('click', function() {
        var acessibilidadeContainer = document.getElementById('acessibilidade-container');
        acessibilidadeContainer.style.display = acessibilidadeContainer.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('fonte-btn').addEventListener('click', function() {
        document.body.classList.toggle('fonte-ampliada');
    });

    function iniciarReconhecimentoVoz(customTexts) {
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';
        document.getElementById('microfone-btn').classList.add('ativo');
        var audio = new Audio('beep.mp3.mp3');
        audio.play();

        recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var command = event.results[last][0].transcript.trim().toLowerCase();
            switch (command) {
                case 'contato':
                    document.getElementById('contato-btn').click();
                    break;
                case 'recursos':
                    document.getElementById('acessibilidade-btn').click();
                    break;
                case 'aba dos recursos':
                    document.getElementById('acessibilidade-btn').click();
                    break;
                case 'aba dos recursos de acessibilidade':
                    document.getElementById('acessibilidade-btn').click();
                    break;
                case 'recursos de acessibilidade':
                    document.getElementById('acessibilidade-btn').click();
                    break;
                case 'acessibilidade':
                    document.getElementById('acessibilidade-btn').click();
                    break;
                case 'saber mais':
                    falarTexto(customTexts.inicio);
                    break;
                default:
                    console.log('Comando não reconhecido:', command);
                    break;
            }
        };
        recognition.onspeechend = function() {
            recognition.stop();
            document.getElementById('microfone-btn').classList.remove('ativo');
        };
        recognition.onerror = function(event) {
            console.error('Erro ao reconhecer voz:', event.error);
            document.getElementById('microfone-btn').classList.remove('ativo');
        };
        recognition.start();
    }

    function falarTexto(texto) {
        if ('speechSynthesis' in window) {
            var synth = window.speechSynthesis;
            var utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 1;
            utterance.pitch = 1;
            synth.speak(utterance);
        } else {
            alert('A API de síntese de fala não é suportada neste navegador.');
        }
    }
});