// ====================================================================
// i18n.js - كود معالجة الترجمة باستخدام i18next
// ====================================================================

// --------------------------------------------------------------------
// 1. تهيئة i18next
// --------------------------------------------------------------------

// نحدد مسار ملفات الترجمة. افتراضياً، نعتبر أن ملفات JSON موجودة في نفس مجلد ملف HTML أو في مجلد فرعي.
// إذا وضعت ملفاتك في مجلد /locales/ar/translation.json
// يجب أن يكون المسار: '/locales/{{lng}}/translation.json'
const resources = {
    ar: {
        translation: /* هنا يجب تحميل محتوى ar.json */ {} 
    },
    en: {
        translation: /* هنا يجب تحميل محتوى en.json */ {}
    }
};

// وظيفة جلب ملفات JSON
// في بيئة الإنتاج، يفضل جلب الملفات عبر Fetch API
async function loadTranslations() {
    try {
        const [arResponse, enResponse] = await Promise.all([
            fetch('ar.json').then(res => res.json()),
            fetch('en.json').then(res => res.json())
        ]);
        
        resources.ar.translation = arResponse;
        resources.en.translation = enResponse;
        
        // بمجرد تحميل الملفات، نقوم بالتهيئة
        initializeI18n();

    } catch (error) {
        console.error("Failed to load translation files:", error);
        // في حال فشل التحميل، نعتمد على النصوص الموجودة في HTML
        initializeI18n(true); 
    }
}

function initializeI18n(fallback = false) {
    
    // إذا لم تنجح عملية تحميل الملفات، نستخدم الـ Fallback
    if (fallback) {
        console.warn("Using fallback mode for i18n initialization. Only language/direction switch will be active.");
    }
    
    i18next
        // ربط المكتبة بمحدد اللغة
        .use(i18nextBrowserLanguageDetector)
        // تهيئة الإعدادات
        .init({
            fallbackLng: 'ar', 
            // تحديد اللغات المدعومة
            supportedLngs: ['ar', 'en'],
            // تحديد ملفات الترجمة
            resources: resources,
            // المفتاح الذي يحتوي على النصوص المترجمة في ملف JSON (في مثالنا هو 'translation')
            ns: ['translation'],
            defaultNS: 'translation',
            // هذا لكي لا تحاول المكتبة جلب الملفات مرة أخرى إذا تم تمريرها يدوياً
            backend: { loadPath: false },
            
            detection: {
                // ترتيب محاولات اكتشاف اللغة
                order: ['querystring', 'cookie', 'localStorage', 'navigator'],
                caches: ['localStorage', 'cookie']
            },
            
            // تهيئة إضافية لتمكين استخدام data-i18n
            // هذا الخيار مهم لربط مفاتيح الترجمة مباشرة بالعناصر
            interpolation: {
                escapeValue: false 
            }
        }, (err, t) => {
            if (err) return console.error('something went wrong loading', err);
            
            // 3. تطبيق اللغة عند التحميل الأولي
            updateContent(); 
            // 4. تفعيل مستمع الحدث بعد التهيئة
            setupLanguageSwitch();
        });
}

// --------------------------------------------------------------------
// 2. وظيفة تحديث محتوى الصفحة بالكامل
// --------------------------------------------------------------------
function updateContent() {
    const lang = i18next.language;
    const isRtl = lang === 'ar';
    const body = document.body;
    const html = document.documentElement;

    // 2.1 تحديث الاتجاه (Direction) في الـ HTML والـ Body
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    body.classList.toggle('rtl', isRtl);

    // 2.2 تحديث رابط ملف CSS (هام للتنسيقات)
    // نبحث عن رابط index-ar.css أو index-en.css
    const currentCssLink = document.querySelector('link[href*="index-"]');
    if (currentCssLink) {
        const newCssFile = isRtl ? 'index-ar.css' : 'index-en.css';
        currentCssLink.href = newCssFile;
    }
    
    // 2.3 تطبيق الترجمة على جميع العناصر باستخدام i18next
    // استخدام selector مخصص لـ i18next
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // ترجمة المحتوى الداخلي
        element.innerHTML = i18next.t(key);
    });

    // ترجمة الـ Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        // ترجمة الـ placeholder
        element.setAttribute('placeholder', i18next.t(key));
    });

    // ترجمة الـ Alt Attributes (لصور العملاء)
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        element.setAttribute('alt', i18next.t(key));
    });
    
    // ترجمة الـ Title Attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.setAttribute('title', i18next.t(key));
    });
    
    // ترجمة الـ data-modal-content للعناصر المخصصة
    document.querySelectorAll('[data-i18n-data-modal-content]').forEach(element => {
        const key = element.getAttribute('data-i18n-data-modal-content');
        element.setAttribute('data-modal-content', i18next.t(key));
    });

    // ترجمة خيارات الـ Select في نموذج الاتصال
    // (يجب تحديثها يدوياً لأنها ليست عناصر بسيطة)
    const selectOptions = document.querySelectorAll('#inquiryForm select option');
    selectOptions.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (key) {
             option.textContent = i18next.t(key);
        }
    });
    
    // تحديث نص زر تبديل اللغة
    const langToggleSpans = document.querySelectorAll('#lang-toggle span, #lang-toggle-mobile span');
    langToggleSpans.forEach(span => {
        if (lang === 'ar') {
            span.textContent = 'ENGLISH';
            span.parentElement.setAttribute('data-lang', 'en');
        } else {
            span.textContent = 'العربية';
            span.parentElement.setAttribute('data-lang', 'ar');
        }
    });

    // إذا كانت هناك مكتبة AOS، يجب تحديثها بعد تغيير الاتجاه
    if (typeof AOS !== 'undefined') {
        AOS.refreshHard();
    }
}

// --------------------------------------------------------------------
// 3. وظيفة تبديل اللغة عند الضغط على الزر
// --------------------------------------------------------------------
function switchLanguage(targetLang) {
    if (i18next.language !== targetLang) {
        i18next.changeLanguage(targetLang, (err, t) => {
            if (err) return console.error('error changing language', err);
            updateContent();
        });
    }
}

// --------------------------------------------------------------------
// 4. إعداد مستمع الحدث لأزرار التبديل
// --------------------------------------------------------------------
function setupLanguageSwitch() {
    const toggles = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            // الحصول على اللغة المستهدفة من الـ data-lang
            const currentLang = i18next.language;
            const targetLang = currentLang === 'ar' ? 'en' : 'ar';
            
            // تمرير اللغة المستهدفة لوظيفة التبديل
            switchLanguage(targetLang);

            // إغلاق قائمة الموبايل بعد التبديل إذا كانت مفتوحة
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    });
}


// --------------------------------------------------------------------
// 5. بدء عملية التحميل والتهيئة
// --------------------------------------------------------------------

// للتأكد من أننا نستخدم المكتبة فعلاً، يجب تضمين ملفات i18next قبل هذا الكود.
// إذا كنت تستخدم <script src="i18n.js" defer></script>
// تأكد من أن ملفات المكتبة تم تضمينها قبله.

// ابدأ عملية تحميل ملفات JSON
if (typeof i18next !== 'undefined') {
    loadTranslations();
} else {
    // إذا لم يتم تضمين ملفات مكتبة i18next
    console.error("i18next library is not loaded. Please include the necessary script tags before i18n.js.");
}