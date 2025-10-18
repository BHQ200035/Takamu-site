














document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================================================
    // 🚀 1. وظيفة فتح وإغلاق القائمة الجانبية (Mobile Menu) 🚀
    // ==============================================================
    
    // تحديد العناصر الأساسية
    const menuToggler = document.querySelector('.menu-toggler');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn'); // محدد أكثر دقة
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li a');

    // وظيفة فتح القائمة (ربطها بـ .menu-toggler)
    if (menuToggler && mobileMenu) {
        menuToggler.addEventListener('click', () => {
            // إضافة فئة 'active' التي تجعل width: 300px في CSS
            mobileMenu.classList.add('active'); 
        });
    }

    // وظيفة إغلاق القائمة (ربطها بـ .close-btn)
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            // إزالة فئة 'active' التي تعيد width: 0 في CSS
            mobileMenu.classList.remove('active');
        });
    }

    // إغلاق القائمة عند النقر على أي رابط داخلها
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    
    // ==============================================================
    // 2. كود الشريط الذكي (Smart Navbar) الحالي
    // ==============================================================
    
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
    toggleBackground(); // لتشغيل الخلفية عند التحميل إذا كان الصفحة غير في القمة

});






document.addEventListener('DOMContentLoaded', function() {
    // 1. تعريف المتغيرات
    const navbar = document.querySelector('.navbar');
    const logoImage = document.getElementById('navbar-logo');
    
    // 2. تعريف مسارات الصور
    // مسار الصورة الافتراضية (عندما يكون النافبار في الأعلى)
    const defaultLogo = 'sprite/logo.png'; 
    // مسار الصورة الجديدة (عندما ينزل المستخدم)
    // *** يجب استبدال هذا المسار بمسار صورتك الجديدة ***
    const scrolledLogo = 'sprite/logo (1).png'; // مثال: شعار بلون مختلف أو أصغر

    // 3. دالة معالجة التمرير
    function handleScrollLogo() {
        // التأكد من أن النافبار موجود
        if (!navbar || !logoImage) return; 

        // التحقق مما إذا كانت الفئة .scrolled مطبقة على النافبار
        // (وهي الفئة التي تطبقها عندما ينزل المستخدم بمسافة معينة)
        if (navbar.classList.contains('scrolled')) {
            // إذا كان المستخدم قد نزل (النافبار تغير لونه)
            if (logoImage.src.indexOf(scrolledLogo) === -1) {
                logoImage.src = scrolledLogo;
            }
        } else {
            // إذا كان المستخدم في أعلى الصفحة
            if (logoImage.src.indexOf(defaultLogo) === -1) {
                logoImage.src = defaultLogo;
            }
        }
    }

    // 4. ربط الدالة بحدث التمرير
    window.addEventListener('scroll', handleScrollLogo);

    // *ملاحظة:* تأكد من أن لديك دالة JavaScript تقوم بإضافة وإزالة الفئة .scrolled إلى النافبار
    // بناءً على موضع التمرير، مثل هذا المثال:

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        // قم بتغيير القيمة 100 بكسل حسب المسافة التي تريدها
        if (scrollPosition > 100) { 
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // استدعاء دالة تغيير الشعار للتأكد من تحديثها
        handleScrollLogo();
    });
    
    // استدعاء الدالة عند تحميل الصفحة لتحديد الشعار الصحيح
    handleScrollLogo();
});









































document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. تحديد العناصر الأساسية والنوافذ (تعديل طفيف هنا)
    // ===============================================

    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal'); 
    
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // دالة لفتح النافذة
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        }
    }

    // دالة لإغلاق النافذة
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            document.body.style.overflow = ''; 
        }
    }

    // دالة موحدة لربط زر الإغلاق (X) بالنافذة
    function setupCloseButton(modal) {
        if (modal) {
            // نبحث عن زر الإغلاق الذي يحمل الفئة 'close-btn' (أو 'service-close')
            const closeBtn = modal.querySelector('.close-btn, .service-close'); 
            if (closeBtn) {
                // التأكد من عدم إضافة الحدث أكثر من مرة إذا كان الكود يعمل
                closeBtn.onclick = function() { 
                    closeModal(modal);
                };
            }
        }
    }


    // ===============================================
    // 3. معالجات الإغلاق العامة (التعديل الرئيسي هنا)
    // ===============================================

    // ربط جميع أزرار الإغلاق في جميع النوافذ المنبثقة
    document.querySelectorAll('.modal').forEach(modal => {
        setupCloseButton(modal); // تطبيق دالة الربط على كل نافذة
    });


    // الإغلاق عند النقر خارج النافذة (يبقى كما هو)
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // الإغلاق عند الضغط على زر ESCAPE (يبقى كما هو)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal); 
                }
            });
        }
    });
    
    // ===============================================
    // 4. منطق البطاقات (بدون تغيير)
    // ===============================================
    // ... (باقي كود البطاقات يبقى كما هو)
    
});