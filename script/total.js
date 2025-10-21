document.addEventListener('DOMContentLoaded', function() {

    // ========================================================
    // 1. وظيفة الحساب التلقائي (Calculation Logic) - مُعَدَّلة لدعم الجداول المتعددة
    // ========================================================
    
    // نحدد مدخلات الكمية والسعر في كل صفوف البنود للاستماع للأحداث
    const itemInputs = document.querySelectorAll('.item-row .quantity-input, .item-row .price-input');
    
    // دالة تحسب مجموع السطر الواحد
    function calculateRowTotal(row) {
        const quantityInput = row.querySelector('.quantity-input');
        const priceInput = row.querySelector('.price-input');
        const totalInput = row.querySelector('.total-input');
        
        // التأكد من أن القيمة رقمية موجبة
        const quantity = Math.max(0, parseFloat(quantityInput?.value) || 0);
        const price = Math.max(0, parseFloat(priceInput?.value) || 0);
        
        const rowTotal = quantity * price;
        totalInput.value = rowTotal.toFixed(2);
    }

    // دالة تحسب المجموع الكلي لنطاق جدول محدد
    function calculateGrandTotal(scopeElement) {
        // نجد جميع مدخلات المجموع ('total-input') داخل النطاق المحدد (الجدول) فقط
        const totalInputs = scopeElement.querySelectorAll('.item-row .total-input');
        // نجد حقل الإجمالي النهائي ('final-total-input') داخل النطاق المحدد
        const finalTotalInput = scopeElement.querySelector('.final-total-input');
        // نجد حقل المبلغ رقماً ('amount_numeric') داخل النطاق المحدد
        const amountNumericInput = scopeElement.querySelector('input[name="amount_numeric"]');
        
        let grandTotal = 0;
        totalInputs.forEach(input => {
            const rowValue = parseFloat(input.value) || 0;
            grandTotal += rowValue;
        });
        
        const finalValue = grandTotal.toFixed(2);
        
        if (finalTotalInput) finalTotalInput.value = finalValue;
        
        // تحديث حقل المبلغ رقماً لضمان المزامنة
        if (amountNumericInput) {
            amountNumericInput.value = finalValue;
        }
    }

    // معالج الحدث الذي يحدد نطاق الجدول
    function handleCalculation(event) {
        const row = event.target.closest('.item-row');
        // الخطوة الحاسمة: نجد أقرب عنصر <table> يحيط بالصف
        const table = event.target.closest('table'); 

        if (row) {
            calculateRowTotal(row);  
        }
        
        // ونستخدم عنصر الجدول كنطاق لحساب الإجمالي الكلي
        if (table) {
            calculateGrandTotal(table);   
        }
    }


    // نربط الدالة المعدلة بجميع مدخلات الكمية والسعر في جميع الجداول
    itemInputs.forEach(input => {
        input.addEventListener('input', handleCalculation);
    });
    
    // تنفيذ الحساب عند التحميل الأولي لجميع الجداول
    document.querySelectorAll('table').forEach(table => {
        if (table.querySelector('.item-row')) { // نتأكد أن الجدول يحتوي على بنود قبل محاولة الحساب
             table.querySelectorAll('.item-row').forEach(row => calculateRowTotal(row));
             calculateGrandTotal(table);
        }
    });

    // ========================================================
    // 2. وظيفة إدخال الكود المدمج (Code Input Logic) 
    // ========================================================
    
    const codeInputs = document.querySelectorAll('.code-digit-input');
    const mainCodeOutput = document.getElementById('main-code-output');
    const maxIndex = codeInputs.length - 1;

    function updateMainCodeOutput() {
        let fullCode = '';
        codeInputs.forEach(input => {
            const value = input.value.replace(/\D/g, '').slice(0, 1); 
            input.value = value;
            fullCode += value || ' '; 
        });
        
        if (mainCodeOutput) {
            mainCodeOutput.value = fullCode.trim().replace(/\s/g, ''); 
        }
    }

    function focusNext(currentIndex) {
        if (currentIndex < maxIndex) {
            setTimeout(() => {
                codeInputs[currentIndex + 1].focus();
                codeInputs[currentIndex + 1].select();
            }, 50); 
        }
    }

    function focusPrev(currentIndex) {
        if (currentIndex > 0) {
            setTimeout(() => {
                codeInputs[currentIndex - 1].focus();
                codeInputs[currentIndex - 1].select();
            }, 50);
        }
    }

    codeInputs.forEach((input, index) => {
        
        // 1. حدث الإدخال (للانتقال التلقائي وقبول رقم واحد)
        input.addEventListener('input', (e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, ''); 
            
            // التعامل مع اللصق أو الكتابة السريعة: توزيع القيمة
            if (value.length > 1) {
                for (let i = 0; i < value.length; i++) {
                    const targetIndex = index + i;
                    if (targetIndex <= maxIndex) {
                        codeInputs[targetIndex].value = value.charAt(i);
                    }
                }
                
                const nextFocusIndex = Math.min(maxIndex, index + value.length - 1);
                focusNext(nextFocusIndex);
                
            } else if (value.length === 1) {
                // إدخال رقم واحد: قم بالانتقال التلقائي
                focusNext(index);
            }
            
            e.target.value = e.target.value.slice(-1);
            
            updateMainCodeOutput();
        });
        
        // 2. حدث الضغط على مفتاح (للتنقل بالـ Backspace ومفاتيح الأسهم)
        input.addEventListener('keydown', (e) => {
            const isRTL = true; // نفترض أن التوجيه عربي/من اليمين لليسار
            const isBackspace = e.key === 'Backspace';
            
            if (isBackspace) {
                if (e.target.value === '') {
                    e.preventDefault(); 
                    focusPrev(index);
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                isRTL ? focusPrev(index) : focusNext(index); 
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                isRTL ? focusNext(index) : focusPrev(index); 
            }
        });
        
        // 3. تحديد النص عند التركيز
        input.addEventListener('focus', (e) => {
            setTimeout(() => e.target.select(), 0); 
        });
    });

    updateMainCodeOutput();


    // ========================================================
    // 3. وظيفة عرض الصورة المنبثقة (Modal Logic)
    // ========================================================

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-button");
    const imageLinks = document.querySelectorAll(".item-image-link");

    // وظيفة فتح النافذة المنبثقة
    imageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = link.getAttribute('data-image-url');
            
            if (imageUrl && modal && modalImage) {
                modal.style.display = "block";
                modalImage.src = imageUrl;
            }
        });
    });

    // وظيفة إغلاق النافذة المنبثقة بالزر
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal && modalImage) {
                modal.style.display = "none";
                modalImage.src = ""; 
            }
        });
    }

    // وظيفة إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', (e) => {
        if (modal && e.target == modal) {
            modal.style.display = "none";
            modalImage.src = "";
        }
    });
    
    // ========================================================
    // 4. وظيفة رفع الملفات (File Upload Logic) 
    // **تم نقل هذا القسم داخل DOMContentLoaded ليعمل بشكل صحيح**
    // ========================================================

    const fileInputs = document.querySelectorAll('.file-input-hidden');

    fileInputs.forEach(fileInput => {
        
        // الليبل هو العنصر السابق لـ input file
        const label = fileInput.previousElementSibling; 
        const iconElement = label ? label.querySelector('.file-icon') : null;
        
        if (iconElement) {
             // تهيئة الأيقونة الافتراضية عند التحميل
            if (!fileInput.files || fileInput.files.length === 0) {
                iconElement.textContent = '🖼️';
                label.classList.remove('file-attached');
            }

            // الاستماع لحدث اختيار الملف
            fileInput.addEventListener('change', (e) => {
                
                if (e.target.files && e.target.files.length > 0) {
                    // تم اختيار ملف: تغيير الأيقونة إلى علامة صح
                    label.classList.add('file-attached');
                    iconElement.textContent = '✅'; 
                } else {
                    // تم إلغاء اختيار الملف: العودة إلى أيقونة الصورة
                    label.classList.remove('file-attached');
                    iconElement.textContent = '🖼️'; 
                }
            });
        }
    });

}); // نهاية DOMContentLoaded