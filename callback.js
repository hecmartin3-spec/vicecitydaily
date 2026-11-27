  const q = new URLSearchParams(location.search);
  if (q.get("code")) {
    document.getElementById("ok").hidden = false;
    document.getElementById("url").textContent = location.href;
    document.getElementById("copy").onclick = async () => {
      try { await navigator.clipboard.writeText(location.href); document.getElementById("copied").textContent = "Copied!"; }
      catch (e) { document.getElementById("copied").textContent = "Select the text above and copy it."; }
    };
  } else {
    document.getElementById("err").hidden = false;
    document.getElementById("msg").textContent = (q.get("error") || "no code") + " " + (q.get("error_description") || "");
  }
