document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================================
    // 1. إعدادات السلايدر (Slider Variables)
    // ===================================================
    
    // متغير عام لتتبع الشريحة الحالية
    let slideIndex = 1; 
    // متغير لتخزين مؤقت التشغيل التلقائي
    let slidesTimeout; 

    // ===================================================
    // 2. دوال السلايدر (Slider Functions)
    // ===================================================

    // الوظيفة الرئيسية لعرض الشريحة المطلوبة
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        // إدارة التنقل الحلقي (Looping)
        if (n > slides.length) {slideIndex = 1} 
        if (n < 1) {slideIndex = slides.length}

        // إخفاء جميع الشرائح
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            // لضمان إعادة تشغيل تأثير الانتقال عند التبديل اليدوي
            slides[i].classList.remove('fade'); 
        }
        
        // إزالة فئة 'active-dot' من جميع النقاط
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active-dot"); 
            // استخدام className.replace(' active-dot', '') هو الأسلوب القديم
            // استخدام classList.remove هو الأسلوب الأحدث والأفضل
        }

        // عرض الشريحة الحالية وتفعيل النقطة
        if (slides.length > 0) {
            slides[slideIndex-1].style.display = "block";  
            slides[slideIndex-1].classList.add('fade'); // إضافة الحركة مجدداً
            
            // تفعيل النقطة
            if (dots.length > 0) {
                dots[slideIndex-1].classList.add("active-dot");
            }
        }

        // إعادة تشغيل المؤقت للتشغيل التلقائي
        clearTimeout(slidesTimeout);
        slidesTimeout = setTimeout(autoSlides, 5000); // تغيير الصورة كل 5 ثواني
    }

    // دالة الانتقال اليدوي (للأسهم)
    // يجب أن تكون هذه الدوال متاحة عالمياً (في الـ Window Scope) لأنها مستخدمة في HTML عبر onclick
    window.plusSlides = function(n) { 
        showSlides(slideIndex += n);
    }

    // دالة الانتقال عبر النقاط
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    // دالة التشغيل التلقائي
    function autoSlides() {
        slideIndex++;
        showSlides(slideIndex);
    }
    
    // تشغيل السلايدر عند التحميل
    if (document.getElementById("main-slider")) {
        showSlides(slideIndex);
    }

    // ===================================================
    // 3. الشريط الذكي (Smart Navbar)
    // ===================================================
    
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; 

    function toggleBackground() {
        if (window.scrollY > scrollThreshold) {
            navbar && navbar.classList.add('scrolled'); // التأكد من وجود العنصر
        } else {
            navbar && navbar.classList.remove('scrolled');
        }
    }
    
    function handleSmartNavbar() {
        const currentScrollY = window.scrollY;
        if (!navbar) return; // الخروج إذا لم يكن هناك شريط
        
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
    toggleBackground(); // لتشغيل الدالة عند تحميل الصفحة

    // ===================================================
    // 4. قائمة الجوال (Mobile Menu)
    // ===================================================
    
    const menuToggler = document.querySelector('.menu-toggler');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn');

    function openMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active'); 
            document.body.style.overflow = ''; 
        }
    }

    if (menuToggler) {
        menuToggler.addEventListener('click', openMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (this.classList.contains('submenu-toggle')) {
                event.preventDefault(); 
                return; 
            }
            closeMenu();
        });
    });

    // ===================================================
    // 5. النوافذ المنبثقة للخدمات والصور (Modals)
    // ===================================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal'); 
    const imageModal = document.getElementById('imageModal'); 
    
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalCenterImage');

    const closeServiceModal = serviceModal ? serviceModal.querySelector('.service-close') : null;
    const closeImageModal = imageModal ? imageModal.querySelector('.image-close') : null;

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
    
    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => closeModal(serviceModal));
    }

    if (closeImageModal) {
        closeImageModal.addEventListener('click', () => closeModal(imageModal));
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
            closeModal(serviceModal);
        }
        if (event.target === imageModal) {
            closeModal(imageModal);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(serviceModal); 
            closeModal(imageModal); 
        }
    });
    
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

    // ===================================================
    // 6. الإحصائية الدائرية والعد عند التمرير (Count-Up)
    // ===================================================

    const statsCircle = document.querySelector('.stats-circle');
    const percentageValue = document.querySelector('.percentage-value');
    
    if (statsCircle && percentageValue) {
        const targetPercentage = statsCircle.getAttribute('data-percentage');
        let isCounted = false; 

        function startCount(target, element) {
            let current = 0;
            const duration = 2000; 
            const step = target / (duration / 10); 

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    isCounted = true;
                }
                element.textContent = `${Math.floor(current)}%`;
                statsCircle.style.setProperty('--percentage', Math.floor(current)); 
            }, 10);
        }

        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isCounted) {
                    // تعيين النسبة القصوى لتجنب الوميض قبل العد
                    statsCircle.style.setProperty('--percentage', 94);
                    
                    startCount(parseInt(targetPercentage), percentageValue);
                    
                    observer.unobserve(statsCircle);
                }
            });
        }, observerOptions);

        observer.observe(statsCircle);
    }
    
    // ===================================================
    // 7. الأكورديون (الأسئلة المتكررة)
    // ===================================================

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            
            const currentlyOpen = document.querySelector('.accordion-item.open');
            if (currentlyOpen && currentlyOpen !== item) {
                currentlyOpen.classList.remove('open');
            }

            item.classList.toggle('open');
        });
    });

    // ===================================================
    // 8. التحقق من صحة نموذج الاستفسار (Form Validation)
    // ===================================================
    
    const form = document.getElementById('inquiryForm'); 

    if (form) {
        form.addEventListener('submit', function(event) {
            
            event.preventDefault(); 
            
            let isFormValid = true;

            const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');

            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                let value = field.value.trim();

                if (value === "") { 
                    formGroup.classList.add('error'); 
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('error'); 
                }
            });

            if (isFormValid) {
                // هنا يتم إرسال النموذج إذا كان صالحاً
                form.submit(); 
                // يمكنك إضافة كود AJAX هنا بدلاً من form.submit() إذا كنت تستخدم تقنية مختلفة
            }
        });
    }

}); // نهاية DOMContentLoaded