# fiddlerfox

This Firefox extension allows you to enable the Fiddler proxy from within Firefox. Because Firefox uses its own proxy settings, if Fiddler is started after Firefox is started, Firefox does not use Fiddler. This extension works around that: Once Fiddler is started you press the button in the toolbar and Firefox will then use Fiddler.

## What problem does it solve?
Firefox uses its own proxy settings instead of the OS-native proxy settings. The proxy settings from the OS are loaded when Firefox starts, but never refreshed afterwards. 

This poses a problem when you start Fiddler after you start Firefox. When Fiddler is enabled, it modifies the system proxy settings so that Fiddler is used as a proxy. Firefox does not notice this change, and keeps using whatever proxy was configured when it started.

Until this extension was developed, you needed to fiddle with the proxy settings buried deep in the Firefox menu, or restart the browser which is quite annoying during development with numberous of tabs and windows open.

### What's up with FiddlerHook?
Fiddler installs [FiddlerHook](http://docs.telerik.com/fiddler/knowledgebase/fiddlerhook), a local Firefox extension for detecting the presence of Fiddler and automatically enabling direction to Fiddler.

This extension is however not signed (causing issues) and is a "legacy" XPCOM extension which will be unusable from Firefox 57 onwards.

## How does it work
The extension works quite simple, once installed from [Mozilla Add-ons](https://addons.mozilla.org/nl/firefox/addon/fiddlerfox/), you get an icon in the toolbar of Firefox. 

When clicked, a checkmark will be shown and Firefox will use the local Fiddler instance at port 8888 for connecting to the web. To disable it, click the button again. 