export function initCheckout() {

    /* BESTÄLL BTN */
    const checkoutForm = document.querySelector('#checkoutForm');


    /* SUBMIT BTN */
    const submitBtn = document.querySelector('#submitBtn');

    checkoutForm.addEventListener('input', validateForm);
    checkoutForm.addEventListener('change', validateForm);

    function validateForm() {

        // 1. basic HTML-validation
        let isValid = checkoutForm.checkValidity();

        // 2. payment logic
        const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked');

        if (!selectedPayment) {
            isValid = false;
        }

        // 3. faktura → personnummer

        const PERSONNUMMER_REGEX = /^(\d{10}|\d{12}|\d{6}[- ]\d{4}|\d{8}[- ]\d{4})$/;

        function isValidSwedishPersonnummer(value) {
            return PERSONNUMMER_REGEX.test(value.trim());
        }

        if (selectedPayment?.value === 'invoice') {
            if (!isValidSwedishPersonnummer(personnummerInput.value)) {
                isValid = false;
                personnummerInput.setCustomValidity('Ogiltigt personnummer');
            } else {
                personnummerInput.setCustomValidity('');
            }
        }

        // 4. btn
        submitBtn.disabled = !isValid;
    }

    /* blocking send if errors */
    checkoutForm.addEventListener('submit', (e) => {
        if (!checkoutForm.checkValidity()) {
            e.preventDefault();
            checkoutForm.reportValidity();
            return;
        }

        console.log('BESTÄLLNING OK');
    });


    /* OPEN CART */



    document.querySelector('#closeCheckoutBtn')
        .addEventListener('click', () => {

            checkoutForm.style.display = 'none';;
        });



    /* Betalsätt START */

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const invoiceFields = document.querySelector('#invoiceFields');
    const cardFields = document.querySelector('#cardFields');

    const cardInputs = cardFields.querySelectorAll('input');
    const personnummerInput = document.querySelector('#personnummer');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const isCard = radio.value === 'card';
            const isInvoice = radio.value === 'invoice';

            // show / hide
            cardFields.hidden = !isCard;
            invoiceFields.hidden = !isInvoice;

            // required handling
            cardInputs.forEach(input => {
                input.required = isCard;
            });

            personnummerInput.required = isInvoice;
        });
    });

    /* Betalsätt END */



    /* FORM VALIDERING 1 */

    checkoutForm.addEventListener('input', (e) => {
        const input = e.target;
        if (!(input instanceof HTMLInputElement)) return;
        if (!input.id) return;

        input.dataset.touched = 'true';

        if (input.validity.valueMissing) {
            showError(input, 'Detta fält är obligatoriskt');
        }
        else if (input.validity.patternMismatch) {
            showError(input, getPatternErrorMessage(input));
        }
        else if (input.validity.typeMismatch) {
            showError(input, 'Ogiltigt format');
        }
        else {
            clearError(input);
        }
    });



    /* FORM VALIDERING */

    function showError(input, message) {
        const errorEl = document.getElementById(input.id + 'Error');
        errorEl.textContent = message;
    }

    function clearError(input) {
        const errorEl = document.getElementById(input.id + 'Error');
        errorEl.textContent = '';
    }

    function getPatternErrorMessage(input) {
        switch (input.id) {
            case 'firstName':
            case 'lastName':
            case 'city':
                return 'Endast bokstäver tillåtna';

            case 'phone':
                return 'Ange ett giltigt telefonnummer';

            case 'email':
                return 'Ange en giltig e-postadress';

            case 'zip':
                return 'Ange ett giltigt postnummer';

            default:
                return 'Ogiltigt format';
        }
    }
}