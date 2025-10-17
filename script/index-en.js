


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