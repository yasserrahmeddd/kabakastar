document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        let slideIndex = 0;
        const slides = document.getElementsByClassName("slide");

        function showSlides() {
            if (slides.length === 0) return;
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].classList.add("active");
            setTimeout(showSlides, 4000); // Change image every 4 seconds
        }

        // Make moveSlide globally accessible for onclick handlers
        window.moveSlide = function(n) {
            slideIndex += n;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            slides[slideIndex - 1].classList.add("active");
        };

        showSlides();
    }

    // Modal functionality
    const checkoutModal = document.getElementById('checkoutModal');
    let selectedProduct = null;
    
    if (checkoutModal) {
        window.showCheckout = function(productName = '', productPrice = '') {
            selectedProduct = productName ? { name: productName, price: productPrice } : null;
            checkoutModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        window.closeCheckout = function() {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        window.onclick = function(event) {
            if (event.target === checkoutModal) {
                closeCheckout();
            }
        };

        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(this);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }

                let productInfo = '';
                if (selectedProduct) {
                    productInfo = `
📦 *معلومات المنتج:*
الاسم: ${selectedProduct.name}
السعر: ${selectedProduct.price}

`;
                }

                const whatsappMessage = `
🛍️ *KABAKA STAR - طلب جديد*
${productInfo}
👤 *معلومات العميل:*
الاسم: ${data.name}
الهاتف: ${data.phone}
المحافظة: ${data.governorate}
العنوان: ${data.address}

💳 *طريقة الدفع:* ${data.payment}

📝 *ملاحظات إضافية:*
${data.notes || 'لا يوجد'}

---
تم استلام الطلب من الموقع الإلكتروني
                `.trim();

                const whatsappNumber = '201150501023';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

                // Show success message first, then open WhatsApp
                alert('تم إرسال طلبك بنجاح! سيتم فتح واتساب الآن لإرسال الطلب.');
                
                // Small delay to ensure user sees the message
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1000);

                closeCheckout();
                this.reset();
            });
        }
    }

    // Contact form submission in footer
    const contactForm = document.querySelector('.footer-section.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            const whatsappMessage = `
📧 *KABAKA STAR - رسالة جديدة*

*من:* ${email}

*الرسالة:*
${message}

---
رسالة من نموذج الاتصال بالموقع
            `.trim();

            const whatsappNumber = '201150501023';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

                // Show success message first, then open WhatsApp
                alert('تم إرسال رسالتك بنجاح! سيتم فتح واتساب الآن لإرسال الرسالة.');
                
                // Small delay to ensure user sees the message
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1000);

                this.reset();
        });
    }

    // Direct WhatsApp sending function
    window.sendDirectWhatsApp = function() {
        const checkoutForm = document.getElementById('checkoutForm');
        if (!checkoutForm) return;

        // Validate required fields
        const requiredFields = ['name', 'phone', 'address', 'governorate', 'payment'];
        let isValid = true;
        let missingFields = [];

        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element || !element.value.trim()) {
                isValid = false;
                missingFields.push(field);
            }
        });

        if (!isValid) {
            alert('يرجى ملء جميع الحقول المطلوبة: ' + missingFields.join(', '));
            return;
        }

        // Get form data
        const formData = new FormData(checkoutForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Prepare product info
        let productInfo = '';
        if (selectedProduct) {
            productInfo = `
📦 *معلومات المنتج:*
الاسم: ${selectedProduct.name}
السعر: ${selectedProduct.price}

`;
        }

        // Create WhatsApp message
        const whatsappMessage = `
🛍️ *KABAKA STAR - طلب جديد*
${productInfo}
👤 *معلومات العميل:*
الاسم: ${data.name}
الهاتف: ${data.phone}
المحافظة: ${data.governorate}
العنوان: ${data.address}

💳 *طريقة الدفع:* ${data.payment}

📝 *ملاحظات إضافية:*
${data.notes || 'لا يوجد'}

---
تم استلام الطلب من الموقع الإلكتروني
        `.trim();

        // Send via WhatsApp
        const whatsappNumber = '201150501023';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Show success message
        alert('سيتم فتح واتساب الآن لإرسال الطلب مباشرة!');
        
        // Open WhatsApp with delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);

        // Close modal and reset form
        closeCheckout();
        checkoutForm.reset();
    };

    // Scroll animations for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.backgroundColor = '#000';
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});