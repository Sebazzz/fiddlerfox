let proxyEnabled = false;
let host = 'localhost';
let port = '8888';

function onWebRequestRedirectToFiddler(requestInfo) {
	// console.log('Proxying request to Fiddler', requestInfo, requestInfo.documentUrl);

	return {
		type: 'http',
		host,
		port,
		failoverTimeout: 60 * 60 * 24
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

        try{
            const storageHost = await browser.storage.local.get('host');
            const storagePort = await browser.storage.local.get('port');
            host = storageHost.host || 'localhost';
            port = storagePort.port || '8888';
        }catch(error){
            console.log('Options error: %s', error);
        }    
        
        console.log('Enabling proxy script...');
        console.log('Host: %s, Port: %s', host, port);
        browser.proxy.onRequest.addListener(onWebRequestRedirectToFiddler, { urls: ['*://*/*'] } );
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
        browser.browserAction.setBadgeBackgroundColor({color:'green'});
    } finally {
        browser.browserAction.enable();
    }
}