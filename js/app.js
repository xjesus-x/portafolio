const tecnologias = ["SASS","HTML", "CSS", "Javascript", "Wordpress", "JSON", "Gulp"];

window.onload = function () {
  //Estableciendo idioma
  localStorage.setItem("lang", "en");
  //Seleccionado los botones de lengu

  const blang = document.querySelectorAll(".lang-i");

  //Asignando la función lang a los botones
  blang.forEach(function (boton) {
    boton.addEventListener("click", lang);
  });

  //Llamando la función que carga el menú de tecnologías
  cargarmenu();

  //Generar proyectos
  renderprojects();
};

function cargarmenu() {
  const menu = document.querySelector(".menu-tecnologias");
  tecnologias.forEach((tecnologia) => {
    var seccion = document.createElement("button");
    seccion.innerText = tecnologia;
    seccion.classList.add("tecnologias");
    seccion.addEventListener("click", estilosmenu);
    menu.appendChild(seccion);
  });
}

function lang(e) {
  let idioma = e.toElement.id;
  //Selección del botón
  let bidioma = document.querySelector("#" + idioma);
  //Cambio en css del botón
  if (idioma == "en") {
    let botones = document.querySelector("#es");
    botones.classList.remove("selected-lang");
    bidioma.classList.add("selected-lang");
  } else {
    let botones = document.querySelector("#en");
    botones.classList.remove("selected-lang");
    bidioma.classList.add("selected-lang");
  }
  //Obtención de datos json
  fetch("./js/strings.json")
    //parseo a json
    .then((response) => response.json())
    //Condicional y cambio de texto
    .then((data) => {
      if (idioma == "en") {
        document.querySelector(".header-title").innerHTML = data.en.title;
        document.querySelector(".header-contact").innerHTML = data.en.contact;
        localStorage.setItem("lang", "en");
      } else {
        document.querySelector(".header-title").innerHTML = data.es.title;
        document.querySelector(".header-contact").innerHTML = data.es.contact;
        localStorage.setItem("lang", "es");
      }
      renderprojects();
    });
}

function renderprojects(condicion = "ok") {
  var lang = localStorage.getItem("lang");
  fetch("./js/proyectos.json")
    .then((response) => response.json())
    .then((response) => {
      //Seleccionando el área
      const main = document.querySelector(".proyectos");
      main.innerHTML = "";
      //recorriendo el json
      for (i = 0; i < response.length; i++) {
        var tecstring = JSON.stringify(response[i].tecnologies).replaceAll(
          ",",
          ", "
        );
        if (condicion == "ok" || tecstring.includes(condicion)) {
          //Creación de tarjeta
          const article = document.createElement("article");
          article.classList.add("card");

          //Agregando imagen
          const img = document.createElement("img");
          img.src =
            "https://raw.githubusercontent.com/xjesus-x/portafolio/main/img/" +
            response[i].img;
          article.appendChild(img);

          //Limpiando tecnologías

          tecstring = tecstring
            .replaceAll('"', "")
            .replace("[", "")
            .replace("]", "");

          //Si está en inglés
          if (lang == "en") {
            //Agregando título
            const title = document.createElement("h3");
            title.innerText = response[i].title.en;
            article.appendChild(title);
            main.appendChild(article);
            //Agregando tecnologías
            const tecs = document.createElement("p");
            tecs.innerHTML = "<span>Tecnologies: </span>" + tecstring;
            article.appendChild(tecs);
            //Si está en español
          } else {
            //Agregando título
            const title = document.createElement("h3");
            title.innerText = response[i].title.es;
            article.appendChild(title);
            main.appendChild(article);
            //Agregando tecnologías
            const tecs = document.createElement("p");
            tecs.innerHTML = "<span>Tecnologias empleadas: </span>" + tecstring;
            article.appendChild(tecs);
          }
          //Agregando botón
          const boton = document.createElement("a");
          //operador ternario para idioma
          var textoboton = lang == "en" ? "Visit site" : "Ver sitio";
          boton.textContent = textoboton;
          boton.href = response[i].web;
          const divboton = document.createElement("div");
          divboton.appendChild(boton);
          article.appendChild(divboton);
        } else {
        }
      }
    });
}

function estilosmenu(e) {
  let tecnologiase = e.target.innerText;
  console.log(tecnologiase);
  renderprojects(tecnologiase);
}
