

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
        
        // جلب العناصر الأساسية
        const navbar = document.querySelector('.navbar');
        const navbarLogo = document.getElementById('navbarLogo'); 
        
        const scrollThreshold = 50; // المسافة التي يجب التمريرها لتفعيل التغيير

        // 💡 مسارات الصور: تأكد من أن هذه الملفات موجودة في المسار الصحيح
        const defaultLogoSrc = 'takamul/sprite/logo.png';
        const scrolledLogoSrc = 'takamul/sprite/logo (1).png'; 

        function toggleLogoOnScroll() {
            // التحقق من وجود عنصر الشعار قبل محاولة التغيير
            if (!navbarLogo) return; 

            if (window.scrollY > scrollThreshold) {
                // 1. إضافة كلاس التمرير
                navbar.classList.add('scrolled');
                
                // 2. تبديل صورة الشعار
                if (navbarLogo.src.indexOf('logo-scrolled') === -1) {
                    navbarLogo.src = scrolledLogoSrc;
                }
            } else {
                // 1. إزالة كلاس التمرير
                navbar.classList.remove('scrolled');
                
                // 2. إعادة الصورة الأصلية
                if (navbarLogo.src.indexOf('logo.png') === -1) {
                    navbarLogo.src = defaultLogoSrc;
                }
            }
        }
        
        // ربط الدالة بحدث التمرير
        window.addEventListener('scroll', toggleLogoOnScroll);
        
        // تشغيل الدالة عند التحميل لضبط الحالة الابتدائية
        toggleLogoOnScroll();

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