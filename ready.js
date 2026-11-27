/* ===== SETUP: fill these in, nothing else needs editing =====
   1. Create a free account with an email tool (Buttondown, Kit or Beehiiv).
   2. Copy the form "action" URL from its embed code into `action`.
   3. Copy the field names it expects (they're in the same embed code).
   Until `action` is filled in, the form shows a "not switched on yet" message. */
const SIGNUP = {
  action: "https://buttondown.com/api/emails/embed-subscribe/hecmartin3",
  fields: {
    email: "email",                    // Buttondown: "email"; Kit: "email_address"
    setup: "metadata__setup",          // Buttondown: "metadata__setup"; Kit: "fields[setup]"
    gpu: "metadata__gpu",              // Buttondown: "metadata__gpu";   Kit: "fields[gpu]"
    kit: "metadata__wants_kit",        // Buttondown: "metadata__wants_kit"; Kit: "fields[wants_kit]"
    source: "metadata__source"         // Buttondown: "metadata__source"; Kit: "fields[source]"
  }
};

/* Product picks: add affiliate links here once you've chosen them.
   Example: { name: "Budget: 1 TB with heatsink", note: "Plenty for GTA VI plus a few more games", url: "https://..." } */
const PICKS = [];

/* ===== end of setup ===== */

(function () {
  const $ = (id) => document.getElementById(id);
  const form = $("signup");

  // Remember where the visitor came from: ready.html?src=tiktok or ?src=yt-short-12
  const src = new URLSearchParams(location.search).get("src") || (document.referrer ? new URL(document.referrer).hostname : "direct");
  $("f-source").value = src.slice(0, 60);

  $("f-setup").addEventListener("change", (e) => { $("gpu-wrap").hidden = e.target.value !== "pc"; });

  const map = { "f-email": "email", "f-setup": "setup", "f-gpu": "gpu", "f-kit": "kit", "f-source": "source" };
  for (const [id, key] of Object.entries(map)) $(id).name = SIGNUP.fields[key];
  $("f-kit").value = "yes";

  if (SIGNUP.action) {
    form.action = SIGNUP.action;
  } else {
    form.addEventListener("submit", (e) => { e.preventDefault(); $("not-connected").hidden = false; });
  }

  if (PICKS.length) {
    const box = $("picks");
    for (const p of PICKS) {
      const d = document.createElement("div"); d.className = "pick";
      const a = document.createElement("a"); a.href = p.url; a.textContent = p.name;
      a.rel = "sponsored noopener"; a.target = "_blank";
      const n = document.createElement("div"); n.className = "fine"; n.textContent = p.note || "";
      d.append(a, n); box.append(d);
    }
    $("picks-empty").hidden = true;
    $("aff-note").hidden = false;
  }
})();
