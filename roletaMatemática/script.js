const roleta = document.getElementById('roleta');
let cartuchos = [];

function criarRoleta() {
  roleta.innerHTML = "";
  cartuchos = Array(6).fill("CLIC");
  const indiceBang = Math.floor(Math.random() * 6);
  cartuchos[indiceBang] = "BANG";

  const centro = 40;
  const raio = 30;

  cartuchos.forEach((tipo, i) => {
    const ang = (360 / cartuchos.length) * i - 90;
    const rad = ang * (Math.PI / 180);
    const x = centro + Math.cos(rad) * raio;
    const y = centro + Math.sin(rad) * raio;

    const div = document.createElement('div');
    div.className = `camara ${tipo === "BANG" ? "bang" : "clic"}`;
    div.style.left = `${x}%`;
    div.style.top = `${y}%`;
    div.dataset.tipo = tipo;
    div.textContent = i + 1;
    roleta.appendChild(div);
  });
}

function girar() {
    const cams = [...document.querySelectorAll('.camara:not(.oculto)')];
    if (cams.length === 0) {
      alert("Reiniciando...");
      criarRoleta();
      return;
    }
  
    const gunFire = document.getElementById('gunFire');
    const gunReload = document.getElementById('gunReload');
  
    // Para qualquer som que esteja tocando
    gunFire.pause();
    gunFire.currentTime = 0;
    gunReload.pause();
    gunReload.currentTime = 0;
  
    const sorteada = cams[Math.floor(Math.random() * cams.length)];
    const tipo = sorteada.dataset.tipo;
  
    if (tipo === "BANG") {
      gunFire.play();
      setTimeout(() => {
        alert("💥 BANG! Você perdeu. Reiniciando...");
        criarRoleta();
      }, 700);
    } else {
      gunReload.play();
      sorteada.classList.add('oculto');
    }
  }

criarRoleta();