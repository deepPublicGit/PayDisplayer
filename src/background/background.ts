chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "FETCH_LEVELS") {
        fetch(message.url).then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        }).then((html) => sendResponse({success: true, html}))
            .catch((err) => sendResponse({success: false, error: err.message})
            );
        return true;
    }
})