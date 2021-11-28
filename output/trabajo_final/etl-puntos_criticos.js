// Cargar las librerías
const { log, clear } = require("console"); // Para mensajes por consola (terminal)
const fs = require("fs"); // Para lecturas/escrituras de archivos
const path = require("path"); // Para acceso a directorios
const XLSX = require("xlsx"); // Para manejo de archivos Excel (XLS, XLSX)
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // Para generar archivo CSV

// Definir archivo de origen
const xlsx = path.resolve("src/Puntos_criticos_2019_excel.xlsx"); // Obtiene la ruta absoluta al archivo

// Definir filtros

const REGION = "REGION METROPOLITANA";
const COMMUNE = ["INDEPENDENCIA"];

// Leer los datos del archivo origen
var buf = fs.readFileSync(xlsx); // Leer archivo
var wb = XLSX.read(buf, { type: 'buffer' }); // Interpreta el formato Excel desde la lectura
var hoja = wb.Sheets["Hoja1"]; // Accede a una hoja por su nombre
var hoja_json = XLSX.utils.sheet_to_json(hoja); // Convierte la hoja a formato JSON

// Muestra por consola el contenido de la primera fila
log("Encabezados en Hoja", hoja_json[0]);


// Preparar variable donde se mantendrá la transformación, en formato JSON
var output_data = {} // Objeto JSON "vacío", es decir sin datos

// Ciclo para recorrer todas las filas de la hoja
for (let idx = 0; idx < hoja_json.length; idx++) {
    /*
    obs: al recorrer cada fila, está se referencia por la variable "idx"
  
    Extraer datos de acuerdo a filtros:
      - COMUNA
      - FID
    */
    let region_hoja = hoja_json[idx].REGION; // Obtiene el valor de la columna COMUNA
    let comuna_hoja = hoja_json[idx].COMUNA; // Obtiene el valor de la columna COMUNA

      // Validar condición que la fila leida coincida con los filtros requeridos.
  // Ya que la variable COMMUNES es un arreglo, se una un método para validar.
  if (region_hoja == REGION && COMMUNE.indexOf(comuna_hoja) > -1) {
  
        // Obtener el registro desde la variable donde se mantendrá la transformación
        let data_comuna ={};
        
            data_comuna['COMUNA'] = comuna_hoja;
            data_comuna['FID'] = hoja_json[idx]['FID'];
            data_comuna['FALLECIDOS'] = hoja_json[idx]['FALLECIDOS'];
            data_comuna['GRAVES'] = hoja_json[idx]['GRAVES'];
            data_comuna['MENOS_GRAVES'] = hoja_json[idx]['MENOS_GRAVES'];
            data_comuna['LEVES'] = hoja_json[idx]['LEVES'];
            data_comuna['ACCIDENTES'] = hoja_json[idx]['ACCIDENTES'];
            data_comuna['GEO_LAT'] = hoja_json[idx]['GEO_LAT'];
            data_comuna['GEO_LON'] = hoja_json[idx]['GEO_LON'];

        // Se almacena en la variable la información procesada
        output_data [idx] = data_comuna;
    }
}

// Muestra por consola el contenido de información procesada
log("Data de Salida", output_data);


// Definir archivo de salida (JSON)
const json_file = path.resolve("output/javascript/puntos_independencia.json");

// Guardar en JSON los datos transformados 
fs.writeFileSync(json_file, JSON.stringify(output_data));

//Generar archivo CSV

/*
var output_csv = [] // Objeto Array vacío

// Ciclo para obtener los datos procesados de cada comuna
for (let n = 0; n < output_data.length; n++) {
  datos_comuna = output_data[n];
  let nombre_comuna =  datos_comuna["COMUNA"];
  output_csv.push({

    'ID': datos_comuna ["ID"],
    'COMUNA': nombre_comuna,
    'FID': datos_comuna['FID'],
    'Fallecidos': datos_comuna['Fallecidos'],
    'Graves': datos_comuna['Graves'],
    'Menos_Grav': datos_comuna['Menos_Grav'],
    'Leves': datos_comuna['Leves'],
    'Accidentes': datos_comuna['Accidentes'],
    'LAT': datos_comuna['LAT'],
    'LNG': datos_comuna['LNG'],
  })
}


log("Salida para CSV", output_csv);
*/

/*
// Definir archivo de salida (CSV)
const csv_file = path.resolve("output/puntos_criticos_independencia.csv");

// Configurar objeto de escritura CSV, indicando los nombres de columnas como encabezados
const csvWriter = createCsvWriter({
  path: csv_file,
  header: [
    
    { id: 'ID', title: 'ID' },
    { id: 'COMUNA', title: 'COMUNA' },
    { id: 'FID', title: 'FID' },
    { id: 'Fallecidos', title: 'Fallecidos' },
    { id: 'Graves', title: 'Graves' },
    { id: 'Menos_Grav', title: 'Menos_Grav' },
    { id: 'Leves', title: 'Leves' },
    { id: 'Accidentes', title: 'Accidentes' },
    { id: 'LAT', title: 'LAT' },
    { id: 'LNG', title: 'LNG' },
  ]
});

// Escribir el archivo de salida CSV
csvWriter.writeRecords(output_data).then(() => {
  log("Archivo CSV escrito!!!");
}).catch((error) => {
  log("Error al escribir el archivo CSV", error);
})
*/