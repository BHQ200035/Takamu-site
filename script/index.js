document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 🚀 كود الشريط الذكي (Smart Navbar) + تغيير الخلفية 🚀
    // =========================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; 

    function toggleBackground() {
        if (navbar) {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    // **دالة الشريط الذكي المعدلة قليلاً للتأكد من الموثوقية**
    function handleSmartNavbar() {
        if (navbar) {
            const currentScrollY = window.scrollY;
            
            // 1. **إذا كان التمرير للأعلى (الإظهار)**
            if (currentScrollY < lastScrollY) {
                navbar.classList.remove('hidden'); 
            } 
            // 2. **إذا كان التمرير للأسفل وتجاوز عتبة الإخفاء (الإخفاء)**
            else if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.classList.add('hidden');
            }
            
            // 3. **عند الوصول إلى قمة الصفحة تماماً (الإظهار دائماً)**
            if (currentScrollY === 0) {
                navbar.classList.remove('hidden'); 
            }

            lastScrollY = currentScrollY;
        }
    }

    // ربط وظائف الشريط الذكي بحدث التمرير
    window.addEventListener('scroll', function() {
        toggleBackground();
        handleSmartNavbar();
    });
    // ضبط الحالة الأولية للخلفية عند التحميل
    toggleBackground();
    // =========================================================
    

    // ==============================================================
    // 🚀 1. وظيفة فتح وإغلاق القائمة الجانبية (Mobile Menu) 🚀
    // ==============================================================
    
    const menuToggler = document.querySelector('.menu-toggler');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    
// وظيفة الإغلاق المركزية
window.closeMobileMenu = function() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay'); // قم بتعريف المتغير هنا إذا لم يكن معرّفاً خارج الدالة
    
    if (mobileMenu) {
        // 1. إغلاق القائمة الرئيسية
        mobileMenu.classList.remove('active');
        
        // 2. إخفاء القائمة المنسدلة لخدماتنا
        const servicesLi = document.querySelector('.mobile-services-menu');
        if (servicesLi) {
            servicesLi.classList.remove('open'); // إزالة فئة الإظهار
        }
    }
}

    // وظيفة الفتح
    if (menuToggler && mobileMenu) {
        menuToggler.addEventListener('click', () => {
            mobileMenu.classList.add('active'); 
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    // =========================================================
    // 🚀 إضافة منطق فتح/إغلاق القائمة الفرعية (خدماتنا) في الجوال 🚀
    // =========================================================
    const servicesSubmenuToggle = document.querySelector('.services-submenu-link');

    if (servicesSubmenuToggle) {
        servicesSubmenuToggle.addEventListener('click', function(event) {
            event.preventDefault(); 

            // تحديد العنصر الأب (<li>) الذي يحمل فئة 'has-submenu'
            const parentLi = this.closest('.has-submenu');

            // تبديل الفئة 'open'
            if (parentLi) {
                parentLi.classList.toggle('open');
            }
            
            // (اختياري) إغلاق أي قوائم فرعية أخرى مفتوحة
            document.querySelectorAll('.mobile-nav-links .has-submenu').forEach(item => {
                if (item !== parentLi && item.classList.contains('open')) {
                    item.classList.remove('open');
                }
            });
        });
    }

});