document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------------------------
       🔥 SLIDER (محسّن – أسرع – أنعم – ريسبونسيف)
    ----------------------------------------------------------- */
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;

    if (slides.length > 0) {
        function showSlides() {
            slides.forEach(slide => slide.classList.remove("active"));
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");

            setTimeout(showSlides, 4000);
        }

        window.moveSlide = function (n) {
            slides[slideIndex].classList.remove("active");
            slideIndex = (slideIndex + n + slides.length) % slides.length;
            slides[slideIndex].classList.add("active");
        };

        showSlides();
    }

    /* -----------------------------------------------------------
       🔥 CHECKOUT MODAL (محسّن + أنيميشن)
    ----------------------------------------------------------- */

    const checkoutModal = document.getElementById('checkoutModal');
    let selectedProduct = null;

    if (checkoutModal) {
        window.showCheckout = function (productName = '', productPrice = '') {
            selectedProduct = productName ? { name: productName, price: productPrice } : null;

            checkoutModal.classList.add("show");
            checkoutModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        window.closeCheckout = function () {
            checkoutModal.classList.remove("show");

            setTimeout(() => {
                checkoutModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        };

        // إغلاق عند الضغط على الخلفية
        checkoutModal.addEventListener('click', function (e) {
            if (e.target === checkoutModal) {
                closeCheckout();
            }
        });
    }

    /* -----------------------------------------------------------
       🔥 إرسال الفورم – واتساب
    ----------------------------------------------------------- */

    const checkoutForm = document.getElementById('checkoutForm');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(this).entries());

            const productInfo = selectedProduct ? `
📦 *معلومات المنتج:*
• الاسم: ${selectedProduct.name}
• السعر: ${selectedProduct.price}

` : '';

            const whatsappMessage = `
🛍️ *KABAKA STAR - طلب جديد*
${productInfo}
👤 *بيانات العميل:*
• الاسم: ${data.name}
• الهاتف: ${data.phone}
• المحافظة: ${data.governorate}
• العنوان: ${data.address}

💳 *طريقة الدفع:* ${data.payment}

📝 *ملاحظات:*
${data.notes || 'لا يوجد'}

---
تم إرسال الطلب من الموقع الإلكتروني
            `;

            alert('تم إرسال طلبك! سيتم فتح واتساب الآن.');

            setTimeout(() => {
                window.open(
                    `https://wa.me/201150501023?text=${encodeURIComponent(whatsappMessage)}`,
                    '_blank'
                );
            }, 800);

            closeCheckout();
            checkoutForm.reset();
        });
    }

    /* -----------------------------------------------------------
       🔥 إرسال رسالة من الفوتر – واتساب
    ----------------------------------------------------------- */
    const contactForm = document.querySelector('.footer-section.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector("input[name='email']").value;
            const message = this.querySelector("textarea[name='message']").value;

            const whatsappMessage = `
📧 *KABAKA STAR - رسالة جديدة*

👤 *البريد:* ${email}

💬 *الرسالة:*
${message}

---
مرسلة من نموذج التواصل بالموقع
            `;

            alert("تم الإرسال! سيتم فتح واتساب الآن");

            setTimeout(() => {
                window.open(
                    `https://wa.me/201150501023?text=${encodeURIComponent(whatsappMessage)}`,
                    '_blank'
                );
            }, 800);

            this.reset();
        });
    }

    /* -----------------------------------------------------------
       🔥 زر إرسال مباشر داخل الـ Modal
    ----------------------------------------------------------- */
    window.sendDirectWhatsApp = function () {

        const required = ['name', 'phone', 'address', 'governorate', 'payment'];
        const missing = required.filter(id => !document.getElementById(id)?.value.trim());

        if (missing.length) {
            alert("يرجى ملء الحقول المطلوبة.");
            return;
        }

        const data = Object.fromEntries(new FormData(checkoutForm).entries());

        const productInfo = selectedProduct ? `
📦 *المنتج:* ${selectedProduct.name}
💵 *السعر:* ${selectedProduct.price}

` : '';

        const msg = `
🛍️ *KABAKA STAR - طلب مباشر*
${productInfo}
👤 *العميل:* ${data.name}
📞 *الهاتف:* ${data.phone}
🌍 *المحافظة:* ${data.governorate}
📍 *العنوان:* ${data.address}

💳 *الدفع:* ${data.payment}

📝 *ملاحظات:* ${data.notes || 'لا يوجد'}
        `;

        alert("هيتم فتح واتساب الآن لإرسال الطلب.");

        setTimeout(() => {
            window.open(
                `https://wa.me/201150501023?text=${encodeURIComponent(msg)}`,
                "_blank"
            );
        }, 800);

        closeCheckout();
        checkoutForm.reset();
    };

    /* -----------------------------------------------------------
       🔥 Header Scroll Effect (ستايل ناري)
    ----------------------------------------------------------- */
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (!header) return;

        if (scrollY > 60) {
            header.style.background = "rgba(0,0,0,0.8)";
            header.style.boxShadow = "0 5px 25px rgba(255,80,0,0.4)"; // ناري
            header.style.backdropFilter = "blur(6px)";
        } else {
            header.style.background = "rgba(0,0,0,0.4)";
            header.style.boxShadow = "0 0 0 transparent";
        }
    });
});
