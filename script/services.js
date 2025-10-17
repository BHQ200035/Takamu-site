document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. تحديد العناصر الأساسية والنوافذ
    // ===============================================

    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal'); 
    
    // العناصر التي تعرض تفاصيل الـ 'أقرأ المزيد' (نحتفظ بها)
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    // تحديد أزرار الإغلاق للنوافذ الثابتة (serviceModal)
    // ملاحظة: قمت بتغيير الاستعلام ليشمل كل الأزرار لتوحيد المعالجة
    const closeButtons = document.querySelectorAll('.modal .close-btn, .modal .image-close');


    // ===============================================
    // 2. وظائف الفتح والإغلاق (محدثة لدعم سجل التصفح)
    // ===============================================

    function openModal(modalElement) {
        if (modalElement && modalElement.style.display !== 'block') {
            const modalId = modalElement.id;
            
            // فتح النافذة
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            
            // **[الإضافة لحل مشكلة الجوال]**
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
    // 3. معالجات الإغلاق العامة (محدثة لاستخدام history.back)
    // ===============================================

    // الإغلاق عند النقر على زر X (لكل النوافذ)
    closeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
             event.preventDefault(); 
             event.stopPropagation();
             
             // **[تعديل الإغلاق]**
             // عند النقر على زر الإغلاق، نقوم بالرجوع خطوة في سجل التصفح
             // وهذا سيؤدي لتشغيل حدث 'popstate' أدناه، والذي سيقوم بدوره بإغلاق النافذة
             if (history.state && history.state.modalId) {
                history.back();
             } else {
                 // كحل احتياطي، نغلق النافذة مباشرة إذا لم يتم إضافة حالة في السجل
                 const modalToClose = event.target.closest('.modal');
                 closeModal(modalToClose);
             }
        });
    });

    // الإغلاق عند النقر خارج النافذة (لكل النوافذ)
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            // **[تعديل الإغلاق]**
            // عند النقر على الخلفية، نستخدم history.back() لإزالة الحالة الوهمية
            if (history.state && history.state.modalId) {
                history.back();
            } else {
                 closeModal(event.target);
            }
        }
    });

    // الإغلاق عند الضغط على زر ESCAPE (لكل النوافذ المفتوحة)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // نبحث عن أول نافذة مفتوحة ونغلقها
            const openModalElement = document.querySelector('.modal[style*="display: block"]');
            
            if (openModalElement) {
                 // **[تعديل الإغلاق]**
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
        // نبحث عن أي نافذة حاليًا "ظاهرة" (بغض النظر عن حالة history.state)
        const openModalElement = document.querySelector('.modal[style*="display: block"]');
        
        if (openModalElement) {
            // إذا كانت هناك نافذة مفتوحة
            const modalId = openModalElement.id;
            
            // نغلقها. هذا هو العمل الذي نريده من زر الرجوع في الجوال.
            closeModal(openModalElement);
            
        } else if (event.state && event.state.modalId) {
            // هذه الحالة قد تحدث إذا كان المتصفح يحاول الرجوع إلى حالة نافذة مغلقة
            // نغلق النافذة في حال كانت موجودة ومرئية
            const targetModal = document.getElementById(event.state.modalId);
            closeModal(targetModal);
        }
        
        // ملاحظة هامة: إذا لم تكن هناك نافذة مفتوحة، فإن المتصفح يقوم بعملية الرجوع العادية تلقائيًا
        // (إما إلى صفحة سابقة أو خروج من الموقع)، وهذا هو السلوك الصحيح في هذه الحالة.
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
                    
                    // 1. تحديد عنصر الصورة داخل النافذة المخصصة (تأكد من عدم تكرار #modalCenterImage في HTML)
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
                    // في حالة ملف واحد
                    displayElement.textContent = this.files[0].name;
                } else {
                    // في حالة عدة ملفات
                    displayElement.textContent = `${this.files.length} ملفات مختارة`;
                }
            } else {
                displayElement.textContent = 'لم يتم اختيار ملفات بعد...';
            }
        });
    });
});