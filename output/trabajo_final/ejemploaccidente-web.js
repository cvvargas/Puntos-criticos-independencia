// Cargar las librerías
const axios = require("axios").default;
const cheerio = require("cheerio");

// Definir la página de origen
const url = "https://www.meganoticias.cl/";

// Pedir los datos al origen
axios
  .get(url)
  .then(function (response) {
    // Obtener los datos
    //console.log("Datos del origen",response.data)

    // Analizar los datos
    const $ = cheerio.load(response.data);
    var noticias = $(".mas-noticias article");
    //console.log("Bloque de noticias", noticias)
    var ejemplonoticiaaccidente = cheerio.load(noticias[4]);
    var titulo_noticia_accidente = ejemplonoticiaaccidente(".bottom figcaption a h2").text();
    console.log("Noticia Ejemplo Accidente de tránsito:", titulo_noticia_accidente);
  })
  .catch(function (error) {
    console.log(error);
  });

  //link de la noticia original ejemplo de accidente: https://www.meganoticias.cl/nacional/358535-joven-pareja-muere-choque-delincuentes-auto-robado-marcelo-comparini-casablanca-16-11-2021.html