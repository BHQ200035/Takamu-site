
document.addEventListener('DOMContentLoaded', function() {

    // ========================================================
    // 1. وظيفة الحساب التلقائي (Calculation Logic)
    // (هذا القسم تم تصحيحه بالفعل ويعمل بكفاءة)
    // ========================================================
    const itemInputs = document.querySelectorAll('.item-row .quantity-input, .item-row .price-input');
    const totalInputs = document.querySelectorAll('.item-row .total-input');
    const finalTotalInput = document.querySelector('.final-total-input');
    const amountNumericInput = document.querySelector('input[name="amount_numeric"]');

    function calculateRowTotal(row) {
        const quantityInput = row.querySelector('.quantity-input');
        const priceInput = row.querySelector('.price-input');
        const totalInput = row.querySelector('.total-input');
        
        // التأكد من أن القيمة رقمية موجبة، وإلا تكون صفر.
        const quantity = Math.max(0, parseFloat(quantityInput?.value) || 0);
        const price = Math.max(0, parseFloat(priceInput?.value) || 0);
        
        const rowTotal = quantity * price;
        totalInput.value = rowTotal.toFixed(2);
    }

    function calculateGrandTotal() {
        let grandTotal = 0;
        totalInputs.forEach(input => {
            const rowValue = parseFloat(input.value) || 0;
            grandTotal += rowValue;
        });
        
        const finalValue = grandTotal.toFixed(2);
        if (finalTotalInput) finalTotalInput.value = finalValue;
        // قم بتحديث حقل المبلغ رقماً إذا كان فارغاً، أو اتركه إذا تم إدخاله يدوياً (اختياري)
        if (amountNumericInput && amountNumericInput.value === '') { 
             amountNumericInput.value = finalValue;
        } else if (amountNumericInput) {
            // تحديثه دائماً لضمان المزامنة
            amountNumericInput.value = finalValue;
        }
    }

    function handleCalculation(event) {
        const row = event.target.closest('.item-row');
        if (row) {
            calculateRowTotal(row);  
            calculateGrandTotal();   
        }
    }

    itemInputs.forEach(input => {
        input.addEventListener('input', handleCalculation);
    });

    // تنفيذ الحساب عند التحميل الأولي
    document.querySelectorAll('.item-row').forEach(row => calculateRowTotal(row));
    calculateGrandTotal();

    // ========================================================
    // 2. وظيفة إدخال الكود المدمج (Code Input Logic) - مُحسَّنة
    // ========================================================
    
    const codeInputs = document.querySelectorAll('.code-digit-input');
    const mainCodeOutput = document.getElementById('main-code-output');
    const maxIndex = codeInputs.length - 1;

    function updateMainCodeOutput() {
        let fullCode = '';
        codeInputs.forEach(input => {
            // تنظيف القيمة والتأكد من أنها رقم واحد فقط
            const value = input.value.replace(/\D/g, '').slice(0, 1); 
            input.value = value;
            fullCode += value || ' '; // أضف مسافة بدلاً من الفراغ لتتبع الطول
        });
        
        if (mainCodeOutput) {
            mainCodeOutput.value = fullCode.trim().replace(/\s/g, ''); // إزالة المسافات وتحديث الحقل المخفي
        }
    }

    function focusNext(currentIndex) {
        if (currentIndex < maxIndex) {
            // استخدام setTimeout لحل مشكلة الانتقال غير المستقر
            setTimeout(() => {
                codeInputs[currentIndex + 1].focus();
                codeInputs[currentIndex + 1].select();
            }, 50); // تأخير بسيط جداً
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
            
            // تنظيف القيمة
            value = value.replace(/\D/g, ''); 
            
            // التعامل مع اللصق أو الكتابة السريعة: توزيع القيمة
            if (value.length > 1) {
                // نوزع القيمة على الخانات المتبقية
                for (let i = 0; i < value.length; i++) {
                    const targetIndex = index + i;
                    if (targetIndex <= maxIndex) {
                        codeInputs[targetIndex].value = value.charAt(i);
                    }
                }
                
                // التركيز على الخانة التالية بعد آخر رقم تم إدخاله
                const nextFocusIndex = Math.min(maxIndex, index + value.length - 1);
                focusNext(nextFocusIndex);
                
            } else if (value.length === 1) {
                // إدخال رقم واحد: قم بالانتقال التلقائي
                focusNext(index);
            }
            
            // إبقاء قيمة الخانة الحالية على رقم واحد فقط (سواء كانت مدخلة أو نتيجة لصق)
            e.target.value = e.target.value.slice(-1);
            
            updateMainCodeOutput();
        });
        
        // 2. حدث الضغط على مفتاح (للتنقل بالـ Backspace ومفاتيح الأسهم)
        input.addEventListener('keydown', (e) => {
            const isRTL = true; 
            const isBackspace = e.key === 'Backspace';
            
            if (isBackspace) {
                // إذا كانت الخانة فارغة، انتقل للخلف ومسح الخانة السابقة
                if (e.target.value === '') {
                    e.preventDefault(); 
                    focusPrev(index);
                }
                // عند العودة لتعديل رقم، سيتم مسحه أولاً ثم في الضغطة الثانية ينتقل للخلف.
                
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                // في RTL: السهم الأيمن ينقل للخلف
                isRTL ? focusPrev(index) : focusNext(index); 
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                // في RTL: السهم الأيسر ينقل للأمام
                isRTL ? focusNext(index) : focusPrev(index); 
            }
        });
        
        // 3. تحديد النص عند التركيز
        input.addEventListener('focus', (e) => {
            setTimeout(() => e.target.select(), 0); 
        });
    });

    // تحديث الكود عند تحميل الصفحة للقيم الافتراضية
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
            
            if (imageUrl && modal) {
                modal.style.display = "block";
                modalImage.src = imageUrl;
            }
        });
    });

    // وظيفة إغلاق النافذة المنبثقة بالزر
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
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

});







// ========================================================
// 3. وظيفة رفع الملفات (File Upload Logic) - **مُصَحَّح**
// ========================================================

const fileInputs = document.querySelectorAll('.file-input-hidden');

fileInputs.forEach(fileInput => {
    
    const label = fileInput.previousElementSibling; // الليبل هو العنصر السابق لـ input file
    const iconElement = label.querySelector('.file-icon');
    
    // **تهيئة الأيقونة الافتراضية عند التحميل:** // التأكد من أن رمز الصورة هو الرمز الأساسي إذا لم يكن هناك ملف موجود.
    // يتم وضع هذا الإعداد أيضاً في HTML كما في الخطوة 1.
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
            // تم إلغاء اختيار الملف (أو لم يتم اختياره): العودة إلى أيقونة الصورة
            label.classList.remove('file-attached');
            iconElement.textContent = '🖼️'; 
        }
    });
});