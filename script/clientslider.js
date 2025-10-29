// في نهاية ملف HTML (داخل وسم <script>)
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('client-slide-track');
    
    if (track) {
        const originalContent = track.innerHTML;
        
        // ✅ نكرر المحتوى ثلاث مرات إضافية (المجموع 4 مجموعات)
        track.innerHTML = originalContent + originalContent + originalContent + originalContent;
    }
});