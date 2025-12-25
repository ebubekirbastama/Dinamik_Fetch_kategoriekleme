<script>
function addCategory() {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
        console.error("CSRF token bulunamadı");
        return;
    }

    const url = APP_CONFIG.BASE_URL + APP_CONFIG.ADD_CATEGORY_ENDPOINT;

    const payload = new URLSearchParams({
        csrf_token: csrfToken,
        lang_id: 2,
        parent_id: "",
        name: "Asayiş",
        slug: "asayis",
        description: "Asayiş haberleri ile Türkiye ve dünyadan güvenlik, polis ve adliye gelişmelerini anlık olarak takip edin. Son dakika asayiş haberleri burada.",
        keywords: "asayiş, güvenlik, polis haberleri",
        color: "#2c3e50",
        category_order: 12,
        category_status: 1,
        show_on_menu: 1,
        show_on_homepage: 1,
        block_type: "block-3",
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
        console.log("Kategori eklendi:", res);
    })
    .catch(err => {
        console.error("İstek hatası:", err);
    });
}
</script>
