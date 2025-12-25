(function () {

    /* ===============================
       GLOBAL AYARLAR (OTOMATİK)
    =============================== */
    const APP_CONFIG = {
        BASE_URL: location.origin,
        RSS_IMPORT_ENDPOINT: "/Rss/importFeedPost",
        BACK_URL: location.pathname + location.search
    };

    /* ===============================
       CSRF TOKEN OKUYUCU
    =============================== */
    function getCsrfToken() {
        const input = document.querySelector('input[name="csrf_token"]');
        return input ? input.value : null;
    }

    /* ===============================
       RSS IMPORT
    =============================== */
    function importRssFeed() {
        const csrfToken = getCsrfToken();

        if (!csrfToken) {
            console.error("❌ CSRF token bulunamadı");
            return;
        }

        const url = APP_CONFIG.BASE_URL + APP_CONFIG.RSS_IMPORT_ENDPOINT;

        const payload = new URLSearchParams({
            csrf_token: csrfToken,
            feed_name: "Asayiş",
            feed_url: "rssurl",
            post_limit: 50,
            lang_id: 2,
            category_id: 108,
            subcategory_id: 0,
            image_saving_method: "url",
            auto_update: 1,
            generate_keywords_from_title: 0,
            read_more_button: 0,
            add_posts_as_draft: 0,
            read_more_button_text: "Read More",
            back_url: APP_CONFIG.BASE_URL + APP_CONFIG.BACK_URL
        });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: payload.toString(),
            credentials: "include"
        })
        .then(r => r.text())
        .then(res => {
            console.log("✅ RSS import tamamlandı / response:", res);
        })
        .catch(err => {
            console.error("❌ Fetch hatası:", err);
        });
    }

    /* ===============================
       OTOMATİK ÇALIŞTIR
    =============================== */
    importRssFeed();

})();
