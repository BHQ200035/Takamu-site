
document.addEventListener('DOMContentLoaded', function() {
    
    // ======== كود الشريط الذكي (Smart Navbar) والتحويلات الأخرى =============
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; 

    function toggleBackground() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    function handleSmartNavbar() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', function() {
        toggleBackground();
        handleSmartNavbar();
    });
    toggleBackground();

});












// ===================================
// كود السلايدر (Slider JavaScript)
// ===================================

let slideIndex = 1;
let slidesTimeout; // متغير لتخزين مؤقت التشغيل التلقائي

// دالة لعرض الشريحة الحالية
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active-dot";

    // **هنا يتم إعادة تشغيل المؤقت:**
    clearTimeout(slidesTimeout);
    slidesTimeout = setTimeout(autoSlides, 5000); // تغيير الصورة كل 5 ثواني (5000ms)
}

// دالة للانتقال للصور التالية/السابقة (لأزرار التنقل اليدوي)
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// دالة للانتقال مباشرة إلى شريحة محددة (عبر النقاط)
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// دالة التشغيل التلقائي: هي فقط تزيد العداد وتستدعي دالة العرض
function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

// البدء في عرض الشرائح عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', (event) => {
    // تأكد من وجود عناصر السلايدر قبل تشغيله
    if (document.getElementById("main-slider")) {
        showSlides(slideIndex);
    }
});




































document.addEventListener('DOMContentLoaded', function() {
    // تحديد العناصر
    const menuToggler = document.querySelector('.menu-toggler');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn');

    // 1. وظيفة لفتح القائمة
    function openMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active'); // إضافة كلاس 'active' لإظهار القائمة
            document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
        }
    }

    // 2. وظيفة لإغلاق القائمة
    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active'); // إزالة كلاس 'active' لإخفاء القائمة
            document.body.style.overflow = ''; // استعادة التمرير
        }
    }

    // 3. معالج حدث النقر لزر الفتح
    if (menuToggler) {
        menuToggler.addEventListener('click', openMenu);
    }

    // 4. معالج حدث النقر لزر الإغلاق
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // 5. إغلاق القائمة عند النقر خارجها (على الخلفية الداكنة)
    window.addEventListener('click', function(event) {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });

    // 6. إغلاق القائمة عند النقر على أي رابط داخلها
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});








document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. تحديد العناصر الأساسية والنوافذ
    // ===============================================

    const serviceCards = document.querySelectorAll('.service-card');
    
    // النوافذ:
    const serviceModal = document.getElementById('serviceModal');      // نافذة التفاصيل
    const imageModal = document.getElementById('imageModal');          // نافذة الصورة
    
    // محتوى النوافذ
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalCenterImage');

    // 🔴 2. تحديد أزرار الإغلاق (التركيز هنا على الكلاسات)
    // نعتمد على الكلاسات المستخدمة في HTML: .service-close و .image-close-btn
    const closeServiceModal = serviceModal ? serviceModal.querySelector('.service-close') : null;
    const closeImageModal = imageModal ? imageModal.querySelector('.image-close') : null;


    // ===============================================
    // 3. وظائف الفتح والإغلاق
    // ===============================================

    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            document.body.style.overflow = ''; 
        }
    }

    // ===============================================
    // 4. معالجات الإغلاق (الحل للمشكلة)
    // ===============================================

    // 💡 الإغلاق عند النقر على زر X 💡
    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => closeModal(serviceModal));
    } else {
        console.error("خطأ: لم يتم العثور على زر إغلاق نافذة التفاصيل (.service-close).");
    }

    if (closeImageModal) {
        closeImageModal.addEventListener('click', () => closeModal(imageModal));
    } else {
        console.error("خطأ: لم يتم العثور على زر إغلاق نافذة الصورة (.image-close-btn).");
    }
    
    // 💡 الإغلاق عند النقر خارج النافذة 💡
    window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
            closeModal(serviceModal);
        }
        if (event.target === imageModal) {
            closeModal(imageModal);
        }
    });

    // 💡 الإغلاق عند الضغط على زر ESCAPE 💡
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(serviceModal); 
            closeModal(imageModal); 
        }
    });
    
    // ===============================================
    // 5. منطق البطاقات المزدوج (فتح النوافذ)
    // ===============================================

    serviceCards.forEach(card => {
        
        const readMoreLink = card.querySelector('.read-more');
        const defaultImage = card.querySelector('.img-default'); 

        // أ. فتح نافذة التفاصيل عند النقر على "أقرأ المزيد"
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(event) {
                event.preventDefault(); 
                event.stopPropagation(); 
                
                const title = event.target.getAttribute('data-modal-title');
                const content = event.target.getAttribute('data-modal-content');
                
                if (modalTitle && modalDescription) {
                    modalTitle.innerHTML = title;
                    modalDescription.innerHTML = content; 
                    openModal(serviceModal); 
                }
            });
        }

        // ب. فتح نافذة الصورة عند النقر على باقي البطاقة
        card.addEventListener('click', function(event) {
            if (event.target.closest('.read-more')) {
                return; 
            }

            if (defaultImage && modalImage) {
                const defaultImageSrc = defaultImage.getAttribute('src');
                modalImage.setAttribute('src', defaultImageSrc);
                openModal(imageModal); 
            }
        });
    });
});



























document.addEventListener('DOMContentLoaded', function() {
    
    // ... (بقية الأكواد تبقى كما هي) ...
    
    // ============= كود الإحصائية الدائرية والعد عند التمرير =============
    
    const statsCircle = document.querySelector('.stats-circle');
    const percentageValue = document.querySelector('.percentage-value');
    
    if (statsCircle && percentageValue) {
        const targetPercentage = statsCircle.getAttribute('data-percentage');
        let isCounted = false; // لتجنب العد أكثر من مرة

        // 1. دالة لتشغيل تأثير العد (Count-Up Effect)
        function startCount(target, element) {
            let current = 0;
            const duration = 2000; // مدة العد 2 ثانية
            const step = target / (duration / 10); // زيادة في كل خطوة (10 مللي ثانية)

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    isCounted = true;
                }
                // تحديث النص والخاصية CSS للرسوم المتحركة
                element.textContent = `${Math.floor(current)}%`;
                statsCircle.style.setProperty('--percentage', Math.floor(current)); 
            }, 10);
        }

        // 2. استخدام Intersection Observer
        const observerOptions = {
            root: null, // منطقة المشاهدة هي إطار العرض (Viewport)
            rootMargin: '0px',
            threshold: 0.5 // يبدأ العد عندما يدخل 50% من العنصر منطقة العرض
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // إذا دخل العنصر منطقة العرض ولم يتم العد بعد
                if (entry.isIntersecting && !isCounted) {
                    // تعيين النسبة المئوية القصوى لـ CSS فوراً لتجنب الوميض
                    statsCircle.style.setProperty('--percentage', 94);
                    
                    // تشغيل العد من الصفر
                    startCount(parseInt(targetPercentage), percentageValue);
                    
                    // إيقاف مراقبة العنصر بعد العد بنجاح
                    observer.unobserve(statsCircle);
                }
            });
        }, observerOptions);

        // البدء بمراقبة العداد
        observer.observe(statsCircle);

    }
    // ===================================================
});











// ============= كود الأكورديون (الأسئلة المتكررة) =============
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        // تحديد العنصر الأب (accordion-item)
        const item = this.closest('.accordion-item');
        
        // إغلاق أي عنصر آخر مفتوح
        const currentlyOpen = document.querySelector('.accordion-item.open');
        if (currentlyOpen && currentlyOpen !== item) {
            currentlyOpen.classList.remove('open');
        }

        // تبديل حالة الفتح/الإغلاق للعنصر الحالي
        item.classList.toggle('open');
    });
});
// ===================================================



document.addEventListener('DOMContentLoaded', function() {
    // تأكد من أن الفورم يحمل id="inquiryForm"
    const form = document.getElementById('inquiryForm'); 

    if (form) {
        form.addEventListener('submit', function(event) {
            
            // منع الإرسال التلقائي حتى اكتمال التحقق
            event.preventDefault(); 
            
            let isFormValid = true;

            // استهداف جميع الحقول التي تحمل خاصية 'required'
            const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');

            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                let value = field.value.trim();

                // التحقق من أن القيمة ليست فارغة
                if (value === "") { 
                    formGroup.classList.add('error'); // إضافة فئة الخطأ لإظهار الرسالة وتغيير حدود الحقل
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('error'); // إزالة فئة الخطأ إذا كان الحقل ممتلئاً
                }
            });

            // إذا كان النموذج صالحاً، نتابع عملية الإرسال إلى FormSubmit
            if (isFormValid) {
                form.submit(); 
            }
        });
    }
});