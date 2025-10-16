

// ============= كود الأكورديون (الأسئلة المتكررة) =============
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        // تحديد العنصر الأب (accordion-item)
        const item = this.closest('.accordion-item');
        
        // إغلاق أي عنصر آخر مفتوح
        const currentlyOpen = document.querySelector('.accordion-item.open');
        if (currentlyOpen && currentlyOpen !== item) {
            currentlyOpen.classList.remove('open');
        }

        // تبديل حالة الفتح/الإغلاق للعنصر الحالي
        item.classList.toggle('open');
    });
});
// ===================================================
