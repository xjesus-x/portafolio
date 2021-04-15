const monster = document.getElementById("monster");
const inputUsuario = document.getElementById("input-usuario");
const inputClave = document.getElementById("input-clave");
const body = document.querySelector("body");
const anchoMitad = window.innerWidth / 2;
const altoMitad = window.innerHeight / 2;
let seguirPunteroMouse = true;

body.addEventListener("mousemove", (m) => {
  if (seguirPunteroMouse) {
    if (m.clientX < anchoMitad && m.clientY < altoMitad) {
      monster.src = "/Proyectos/Login animado/img/idle/2.png";
    } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
      monster.src = "/Proyectos/Login animado/img/idle/3.png";
    } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
      monster.src = "/Proyectos/Login animado/img/idle/5.png";
    } else {
      monster.src = "/Proyectos/Login animado/img/idle/4.png";
    }
  }
});

inputUsuario.addEventListener("focus", () => {
  seguirPunteroMouse = false;
});
inputUsuario.addEventListener("blur", () => {
  seguirPunteroMouse = true;
});
inputUsuario.addEventListener("keyup", () => {
  let caracteres = inputUsuario.value.length;
  if (caracteres >= 0 && caracteres <= 5) {
    monster.src = "/Proyectos/Login animado/img/read/1.png";
  } else if (caracteres >= 6 && caracteres <= 20) {
    monster.src = "/Proyectos/Login animado/img/read/2.png";
  } else if (caracteres >= 20 && caracteres <= 30) {
    monster.src = "/Proyectos/Login animado/img/read/3.png";
  } else {
    monster.src = "/Proyectos/Login animado/img/read/4.png";
  }
});

inputClave.addEventListener("focus", () => {
  seguirPunteroMouse = false;
  let cont = 1;
  const cubrirojo = setInterval(() => {
    monster.src = "/Proyectos/Login animado/img/cover//" + cont + ".png";
    if (cont < 8) {
      cont++;
    } else {
      clearInterval(cubrirojo);
    }
  }, 100);
});
inputClave.addEventListener("blur", () => {
  seguirPunteroMouse = false;
  let cont = 7;
  const descubrirojo = setInterval(() => {
    monster.src = "/Proyectos/Login animado/img/cover//" + cont + ".png";
    if (cont > 1) {
      cont--;
    } else {
      clearInterval(descubrirojo);
    }
  }, 100);
});
