let proxyEnabled = false;

browser.browserAction.onClicked.addListener(() => {
    if (!proxyEnabled) {
        enableProxy();
    } else {
        disableProxy();
    }
});

async function enableProxy() {
    try {
        browser.browserAction.disable();
        
        console.log('Enabling proxy script...');
        await browser.proxy.register('fiddler.js');
        console.log('Enabled proxy script.');
        
        proxyEnabled = true;
        browser.browserAction.setBadgeText({text: '✓'});
        browser.browserAction.setBadgeBackgroundColor({color:'green'});
    } finally {
        browser.browserAction.enable();
    }
}

async function disableProxy() {
    try {
        browser.browserAction.disable();
        
        console.log('Disabling proxy script...');
        await browser.proxy.unregister();
        console.log('Disabled proxy script.');
        
        proxyEnabled = false;
        browser.browserAction.setBadgeText({text: ''});
        browser.browserAction.setBadgeBackgroundColor({color:''});
    } finally {
        browser.browserAction.enable();
    }
}