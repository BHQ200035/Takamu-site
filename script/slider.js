document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================
    // 1. كود السلايدر الرئيسي (Main Hero Slider)
    // ==========================================================
    
    let slideIndex = 1;
    showSlides(slideIndex);

    // وظيفة التنقل بالأسهم (ن - 1)
    window.plusSlides = function(n) {
      showSlides(slideIndex += n);
    }

    // وظيفة التنقل بالنقاط (رقم الشريحة)
    window.currentSlide = function(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      
      // إذا تجاوزنا العدد، نعود للشريحة الأولى
      if (n > slides.length) {
        slideIndex = 1
      }
      
      // إذا رجعنا إلى ما قبل الشريحة الأولى، نذهب للأخيرة
      if (n < 1) {
        slideIndex = slides.length
      }
      
      // إخفاء جميع الشرائح
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      
      // إزالة فئة النشط من جميع النقاط
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      
      // عرض الشريحة الحالية وإضافة فئة النشط للنقطة المقابلة
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }

    // 💡 وظيفة التشغيل التلقائي (اختياري) 💡
    /*
    function autoShowSlides() {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
      setTimeout(autoShowSlides, 5000); // تغيير الصورة كل 5 ثوانٍ
    }
    // ابدأ التشغيل التلقائي عن طريق إلغاء التعليق على السطر التالي:
    // autoShowSlides();
    */

    // ==========================================================
    // 2. كود الشريط الذكي (Smart Navbar) ووظيفة المنيو
    // ==========================================================
    
    // الشريط الذكي (Smart Navbar)
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

    // وظيفة فتح وإغلاق القائمة الجانبية (Mobile Menu)
    const menuToggler = document.querySelector('.menu-toggler');
    const closeBtn = document.querySelector('.mobile-menu-overlay .close-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li a');

    if (menuToggler && mobileMenu) {
        menuToggler.addEventListener('click', () => {
            mobileMenu.classList.add('active'); 
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // إضافة مستمعي الأحداث
    window.addEventListener('scroll', function() {
        toggleBackground();
        handleSmartNavbar();
    });
    toggleBackground(); // لتشغيل الخلفية عند التحميل
});





































