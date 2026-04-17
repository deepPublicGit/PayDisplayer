chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    console.log("PayDisplayer: Background script received message:", message, "from sender:", sender);
    if (message.type === "FETCH_LEVELS") {
        console.log(`PayDisplayer: Fetching ${message.url}`);
        fetch(message.url).then((res) => {
            if (!res.ok) {
                console.error(`PayDisplayer: Fetch failed with status ${res.status}`);
                throw new Error(`HTTP ${res.status}`);
            }
            return res.text();
        }).then((html) => {
            console.log(`PayDisplayer: Successfully fetched data from ${message.url}`);
            sendResponse({success: true, html});
        })
            .catch((err: Error) => {
                console.error(`PayDisplayer: Error fetching ${message.url}:`, err);
                sendResponse({success: false, error: err.message});
            });
        return true;
    }
})