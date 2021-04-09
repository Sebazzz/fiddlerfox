let host = 'localhost';
let port = '8888';
let urls = ['*://*/*'];

function saveOptions(e) {
  for(let i=0; i<urls.length; ++i){
    const input = document.querySelector(`#urls #url-${i} input`);
    urls[i] = input.value;
  }

  browser.storage.sync.set({
      host: document.querySelector("#host").value,
      port: document.querySelector("#port").value,
      urls: urls,
  });

  e.preventDefault();
}

async function restoreOptions() {
  try{
    const storageHost = await browser.storage.sync.get('host');
    const storagePort = await browser.storage.sync.get('port');
    const storageUrls = await browser.storage.sync.get('urls');
    host = storageHost.host || 'localhost';
    port = storagePort.port || '8888';
    urls = storageUrls.urls || ['*://*/*'];
  }catch(error){
    console.log(error);
  }

  document.querySelector("#host").value = host;
  document.querySelector("#port").value = port;

  drawFilterTable();
}

function drawFilterTable(){
  const table = document.querySelector("#urls");

  document.querySelectorAll('.filter').forEach(element => element.remove());
  
  for(let i=0; i<urls.length; ++i){
    const row = table.insertRow(i + 1);
    row.id = `url-${i}`;
    row.classList.add('filter');

    let cell = row.insertCell(0);
    const input = document.createElement("input");
    input.value = urls[i];
    input.addEventListener('blur', () => {
      const element = document.querySelector(`#url-${i} input`);
      if(element != null){
        urls[i] = element.value;
      }
    });
    cell.appendChild(input);

    cell = row.insertCell(1);
    const remove = document.createElement('button');
    remove.innerHTML = 'Remove';
    remove.type = "button";
    remove.addEventListener('click', () => {
      urls.splice(i, 1);
      drawFilterTable();
    });

    cell.appendChild(remove);
  }
}

function addUrl() {
  urls.push('*://example.com/*');  
  drawFilterTable();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#addUrl").addEventListener("click", addUrl);
