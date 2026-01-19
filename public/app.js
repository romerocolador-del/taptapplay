const tg = window.Telegram.WebApp;
tg.expand();

function tap() {
  fetch("/tap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: tg.initDataUnsafe.user.id
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("taps").innerText = data.taps;
    document.getElementById("energy").innerText = data.energy;
  });
}
