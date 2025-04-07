        // Opcional: establece el máximo número de intentos de validación del captcha
        const maxNumberOfTries = 5;

        // Inicialización del captcha
        let myCaptcha = new jCaptcha({
            el: '.jCaptcha',
            canvasClass: 'jCaptchaCanvas',
            canvasStyle: {
                // Estilos requeridos para el captcha
                width: 75,
                height: 15,
                textBaseline: 'top',
                font: '15px Work Sans',
                textAlign: 'left',
                fillStyle: '#333'
            },

            // Callback después de validar el captcha
            callback: function (response, $captchaInputElement, numberOfTries) {
                if (numberOfTries >= maxNumberOfTries) {
                    // Si se alcanzó el número máximo de intentos
                    document.querySelector("form").removeEventListener("submit", formSubmit);
                    $captchaInputElement.classList.add("disabled");
                    $captchaInputElement.placeholder = "¡Se alcanzó el máximo de intentos!";
                    $captchaInputElement.setAttribute("disabled", "true");

                    // Deshabilitar el botón de envío
                    document.querySelector(".submit-btn").setAttribute("disabled", "true");
                    return;
                }

                if (response == 'success') {
                    $captchaInputElement.classList.remove('error');
                    $captchaInputElement.classList.add('success');
                    $captchaInputElement.placeholder = 'Captcha correcto, enviando...';

                    // Enviar el formulario si el captcha es válido
                    document.querySelector("form").submit();
                } else if (response == 'error') {
                    $captchaInputElement.classList.remove('success');
                    $captchaInputElement.classList.add('error');
                    $captchaInputElement.placeholder = 'Por favor, intenta nuevamente!';
                }
            }
        });

        // Validar el captcha al intentar enviar el formulario
        function formSubmit(e) {
            e.preventDefault(); // Evita el envío automático del formulario

            // Valida el captcha
            myCaptcha.validate();
        }

        // Agregar el evento de envío del formulario
        document.querySelector("form").addEventListener("submit", formSubmit);
