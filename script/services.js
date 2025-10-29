document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. تحديد العناصر الأساسية والنوافذ
    // ===============================================

    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal'); 
    
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    const closeButtons = document.querySelectorAll('.modal .close-btn, .modal .image-close');


    // ===============================================
    // 2. وظائف الفتح والإغلاق (تدعم سجل التصفح)
    // ===============================================

    function openModal(modalElement) {
        if (modalElement && modalElement.style.display !== 'block') {
            const modalId = modalElement.id;
            
            // فتح النافذة
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            
            // إضافة حالة وهمية إلى سجل التصفح
            history.pushState({ modalId: modalId, opened: true }, null, `#${modalId}`);
        }
    }

    function closeModal(modalElement) {
        if (modalElement && modalElement.style.display === 'block') {
            // إغلاق النافذة
            modalElement.style.display = 'none';
            document.body.style.overflow = ''; 
        }
    }

    // ===============================================
    // 3. معالجات الإغلاق العامة
    // ===============================================

    // الإغلاق عند النقر على زر X (لكل النوافذ)
    closeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
             event.preventDefault(); 
             event.stopPropagation();
             
             if (history.state && history.state.modalId) {
                 history.back();
             } else {
                 const modalToClose = event.target.closest('.modal');
                 closeModal(modalToClose);
             }
        });
    });

    // الإغلاق عند النقر خارج النافذة (لكل النوافذ)
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
             if (history.state && history.state.modalId) {
                 history.back();
             } else {
                 closeModal(event.target);
             }
        }
    });

    // الإغلاق عند الضغط على زر ESCAPE 
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal[style*="display: block"]');
            
            if (openModalElement) {
                 if (history.state && history.state.modalId) {
                     history.back(); 
                 } else {
                     closeModal(openModalElement); 
                 }
            }
        }
    });

    // ===============================================
    // 4. معالجة زر الرجوع في الجوال/المتصفح (Popstate Event)
    // ===============================================
    
    window.addEventListener('popstate', function(event) {
        const openModalElement = document.querySelector('.modal[style*="display: block"]');
        
        if (openModalElement) {
            closeModal(openModalElement);
            
        } else if (event.state && event.state.modalId) {
            const targetModal = document.getElementById(event.state.modalId);
            closeModal(targetModal);
        }
    });
    
    // ===============================================
    // 5. منطق البطاقات (فتح نافذة التفاصيل أو النافذة المخصصة)
    // ===============================================

    serviceCards.forEach(card => {
        
        const readMoreLink = card.querySelector('.read-more');

        // أ. فتح نافذة التفاصيل
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(event) {
                event.preventDefault(); 
                event.stopPropagation();
                
                const title = event.target.getAttribute('data-modal-title');
                const content = event.target.getAttribute('data-modal-content');
                
                if (modalTitle && modalDescription) {
                    modalTitle.innerHTML = title;
                    modalDescription.innerHTML = content; 
                    openModal(serviceModal); // فتح نافذة serviceModal
                }
            });
        }

        // ب. فتح النافذة المخصصة عند النقر على باقي البطاقة
        card.addEventListener('click', function(event) {
            // منع الفتح المزدوج إذا تم النقر على رابط "اقرأ المزيد"
            if (event.target.closest('.read-more')) {
                return; 
            }
            
            const targetModalId = card.getAttribute('data-modal-target');
            const defaultImage = card.querySelector('.img-default'); 

            if (targetModalId) {
                const targetModal = document.getElementById(targetModalId);
                
                if (targetModal) {
                    
                    // 1. تحديد عنصر الصورة داخل النافذة المخصصة
                    const modalImageElement = targetModal.querySelector('.modal-center-image-form');
                    
                    // 2. تحديث مصدر الصورة
                    if (defaultImage && modalImageElement) {
                        const defaultImageSrc = defaultImage.getAttribute('src');
                        modalImageElement.setAttribute('src', defaultImageSrc);
                    }

                    // 3. فتح النافذة المخصصة
                    openModal(targetModal);
                } else {
                    console.error(`خطأ: لم يتم العثور على النافذة بالمعرف: ${targetModalId}`);
                }
            }
        });
    });
    
    // ===============================================
    // 6. تحديث أسماء الملفات عند الاختيار
    // ===============================================

    const fileInputs = document.querySelectorAll('.actual-file-input');

    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            // تحديد العنصر المجاور لعرض اسم الملفات
            const displayElement = this.parentNode.querySelector('.file-name-display');
            
            if (this.files && this.files.length > 0) {
                if (this.files.length === 1) {
                    displayElement.textContent = this.files[0].name;
                } else {
                    displayElement.textContent = `${this.files.length} ملفات مختارة`;
                }
            } else {
                displayElement.textContent = 'لم يتم اختيار ملفات بعد...';
            }
        });
    });
// ===============================================
// 7. منطق أزرار "سجل الان" داخل النوافذ المنبثقة
// ===============================================

const registerButtons = document.querySelectorAll('#modal-tsjeel-moured .select-btn');

registerButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); 
    event.stopPropagation();

    const targetModalId = this.getAttribute('data-target-modal'); 
    const currentModal = this.closest('.modal');
    
    if (targetModalId) {
      const targetModal = document.getElementById(targetModalId);

      if (targetModal) {
        
        // 1. إغلاق النافذة الحالية (بدون استخدام history.back() لتجنب popstate)
        if (currentModal) {
          closeModal(currentModal);
          
          // **تم إزالة: history.back()**
        }
        
        // 2. تحديث الصورة (باقي الكود كما هو)
        const modalImageElement = targetModal.querySelector('.modal-center-image-form');
        
        // ... (منطق تحديد الصورة) ...
        
        // 3. فتح النافذة الجديدة (وهذا سيضيف حالة جديدة للسجل)
        openModal(targetModal);

      } else {
        console.error(`خطأ: لم يتم العثور على النافذة الهدف بالمعرف: ${targetModalId}`); 
      }
    } else {
            console.error("خطأ: targetModalId مفقود في الزر!");
        }
  });
});

});