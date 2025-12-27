(() => {

    const CONFIG = {
        CHECK_URL: window.location.origin + "/Rss/checkFeedPosts",
        BACK_URL: window.location.origin + "/admin/feeds",
        FEED_DELAY: 1200
    };

    function getCsrfToken() {
        let el = document.querySelector('input[name="csrf_token"]');
        if (el?.value) return el.value;

        el = document.querySelector('meta[name="csrf-token"]');
        if (el?.content) return el.content;

        if (window.csrf_token) return window.csrf_token;
        if (window.CSRF_TOKEN) return window.CSRF_TOKEN;

        const c = document.cookie.match(/csrf_token=([^;]+)/);
        if (c) return decodeURIComponent(c[1]);

        return null;
    }

    function collectFeedIds() {
        const ids = new Set();

        document.querySelectorAll("tr[data-id]").forEach(tr => {
            ids.add(tr.getAttribute("data-id"));
        });

        document.querySelectorAll('input[name="id"]').forEach(i => {
            if (i.value) ids.add(i.value);
        });

        return [...ids].filter(Boolean);
    }

    function runFeed(id, csrf) {
        const payload = new URLSearchParams({
            csrf_token: csrf,
            id: id,
            back_url: CONFIG.BACK_URL
        });

        return fetch(CONFIG.CHECK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: payload.toString(),
            credentials: "include"
        })
        .then(r => r.text())
        .then(() => {
            console.log(`✅ Feed ${id} işlendi`);
        })
        .catch(err => {
            console.error(`❌ Feed ${id} hata`, err);
        });
    }

    const csrf = getCsrfToken();
    if (!csrf) {
        console.error("❌ CSRF token bulunamadı, işlem durduruldu");
        return;
    }

    const feeds = collectFeedIds();
    if (!feeds.length) {
        console.warn("⚠ Feed ID bulunamadı");
        return;
    }

    console.log("🚀 Feed işlemi başlatıldı:", feeds);

    let i = 0;
    (function next() {
        if (i >= feeds.length) {
            console.log("🎉 Tüm feedler tamamlandı");
            return;
        }

        runFeed(feeds[i], csrf);
        i++;
        setTimeout(next, CONFIG.FEED_DELAY);
    })();

})();
