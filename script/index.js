document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================================================
    // 🚀 1. وظيفة فتح وإغلاق القائمة الجانبية (Mobile Menu) 🚀
    // ==============================================================
    
    const menuToggler = document.querySelector('.menu-toggler');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li a');

    // وظيفة الفتح
    if (menuToggler && mobileMenu) {
        menuToggler.addEventListener('click', () => {
            mobileMenu.classList.add('active'); 
        });
    }

    // وظيفة الإغلاق بزر X
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // إغلاق القائمة عند النقر على أي رابط
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    
    // ==============================================================
    // 2. كود الشريط الذكي (Smart Navbar) وتغيير الشعار (المدمج)
    // ==============================================================
    
    const navbar = document.querySelector('.navbar');
    const logoImage = document.getElementById('navbar-logo');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; 

    // مسارات الصور
    const defaultLogo = 'sprite/logo.png'; 
    const scrolledLogo = 'sprite/logo (1).png'; 

    function toggleBackgroundAndLogo() {
        if (!navbar || !logoImage) return; // فحص وجود العناصر أولاً (مهم لحل مشكلة null)

        // 2-1: معالجة الخلفية والتغيرات عند التمرير
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
            // تغيير الشعار إلى Scrolled
            if (logoImage.src.indexOf(scrolledLogo) === -1) {
                logoImage.src = scrolledLogo;
            }
        } else {
            navbar.classList.remove('scrolled');
            // تغيير الشعار إلى Default
            if (logoImage.src.indexOf(defaultLogo) === -1) {
                logoImage.src = defaultLogo;
            }
        }
    }
    
    function handleSmartNavbar() {
        if (!navbar) return;
        const currentScrollY = window.scrollY;

        // إخفاء الشريط عند النزول، وإظهاره عند الصعود
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', function() {
        toggleBackgroundAndLogo();
        handleSmartNavbar();
    });

    // تشغيل الدالة عند التحميل لتحديد الحالة الأولية
    toggleBackgroundAndLogo(); 


    // ==============================================================
    // 3. منطق النوافذ المنبثقة للخدمات (Modals)
    // ==============================================================

    const serviceModal = document.getElementById('serviceModal'); 
    // لا نحتاج لتعريف serviceCards و modalTitle/Description إذا لم يكن منطق البطاقات كاملاً هنا
    
    // دوال الفتح والإغلاق (مع استخدام متغيرات local لمنع التضارب)
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

    function setupCloseButton(modal) {
        if (modal) {
            const closeBtn = modal.querySelector('.close-btn, .service-close'); 
            if (closeBtn) {
                closeBtn.onclick = function() { 
                    closeModal(modal);
                };
            }
        }
    }

    // ربط جميع أزرار الإغلاق في جميع النوافذ المنبثقة
    document.querySelectorAll('.modal').forEach(modal => {
        setupCloseButton(modal); 
    });

    // الإغلاق عند النقر خارج النافذة
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // الإغلاق عند الضغط على زر ESCAPE
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal); 
                }
            });
        }
    });

    // ... (هنا يتم وضع أي كود متبقي يتعلق بـ serviceCards إذا كان موجوداً)
    
});