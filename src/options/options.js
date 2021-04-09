function saveOptions(e) {
  browser.storage.local.set({
      host: document.querySelector("#host").value,
      port: document.querySelector("#port").value,
  });

  e.preventDefault();
}

async function restoreOptions() {
  let host = 'localhost';
  let port = '8888';

  try{
    const storageHost = await browser.storage.local.get('host');
    const storagePort = await browser.storage.local.get('port');
    host = storageHost.host || 'localhost';
    port = storagePort.port || '8888';
  }catch(error){
    console.log(error);
  }

  document.querySelector("#host").value = host;
  document.querySelector("#port").value = port;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
