








document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. المتغيرات الرئيسية
    // ===============================================

    const navbar = document.querySelector('.navbar');
    const menuToggler = document.querySelector('.menu-toggler');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = mobileMenu ? mobileMenu.querySelector('.close-btn') : null;
    
    // متغيرات الإخفاء الذكي
    let lastScrollTop = 0;
    const scrollThreshold = 50; 
    
    if (!navbar) return; 

    // ===============================================
    // 2. وظيفة الإخفاء الذكي وتغيير الخلفية عند التمرير
    // ===============================================

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbarHeight = navbar.offsetHeight;

        // أ. التحكم بالإخفاء والإظهار
        if (currentScroll > lastScrollTop && currentScroll > navbarHeight + scrollThreshold) {
            // التمرير للأسفل (إخفاء الشريط)
            navbar.classList.add('hidden');
        } else if (currentScroll < lastScrollTop || currentScroll < navbarHeight) {
            // التمرير للأعلى (إظهار الشريط) أو العودة لأعلى الصفحة
            navbar.classList.remove('hidden');
        }

        // ب. التحكم بتغيير الخلفية (Scrolled)
        if (currentScroll > navbarHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false); 

    // ===============================================
    // 3. وظيفة فتح وإغلاق قائمة الجوال (Mobile Menu)
    // ===============================================
    
    // الفتح
    if (menuToggler && mobileMenu) {
        menuToggler.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            // إيقاف التمرير على الجسم عند فتح القائمة (اختياري)
            document.body.style.overflow = 'hidden'; 
        });
    }

    // الإغلاق
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // إعادة التمرير للجسم
        });
    }

    // إغلاق عند النقر خارج القائمة
    window.addEventListener('click', function(event) {
        if (event.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // إغلاق عند النقر على أي رابط داخل القائمة (اختياري)
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});