let proxyEnabled = false;

function onWebRequestRedirectToFiddler(requestInfo) {
	console.log('Proxying request to Fiddler: %s', requestInfo && requestInfo.documentUrl);
	
	return {
		type: 'http',
		host: 'localhost',
		port: 8888,
		failoverTimeout: 60* 60 * 24
	};
}

function onProxyErr() {
	console.error(arguments);
}

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
        browser.proxy.onRequest.addListener(onWebRequestRedirectToFiddler, { urls: ['*://*/*', 'http://example.com/'] } );
		browser.proxy.onError.removeListener(onProxyErr);
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
        browser.proxy.onRequest.removeListener(onWebRequestRedirectToFiddler);
        browser.proxy.onError.removeListener(onProxyErr);
        console.log('Disabled proxy script.');
        
        proxyEnabled = false;
        browser.browserAction.setBadgeText({text: ''});
        browser.browserAction.setBadgeBackgroundColor({color:''});
    } finally {
        browser.browserAction.enable();
    }
}