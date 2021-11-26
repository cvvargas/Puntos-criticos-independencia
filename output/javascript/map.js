if (mapboxgl) {
    const MAPBOX_KEY = "pk.eyJ1IjoiY3Z2YXJnYXMiLCJhIjoiY2t3OW41c3F2MmNrZDJ3cGRkb3h3NTk0OSJ9.4fsgjoHJzmDylDx0zL8VOA"; // Se debe obtener un Token desde Mapbox
    mapboxgl.accessToken = MAPBOX_KEY;

        // Se define constante GLOBAL con referencia al Mapa
        const map = new mapboxgl.Map({
            container: 'MapaComuna',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-70.665088, -33.413962],
            zoom: 12
        });
    
        Plotly.d3.json("javascript/puntos_independencia.json", function (err, json_data) {
            if (err) {
                console.log("Error al leer JSON", err);
                return;
            }
    
    
            console.log("JSON", json_data);
    
            // Agregar Marcadores.
            let ids_keys = Object.keys(json_data);
            // ids_keys = ["3", "8"...]
            for (const ids of ids_keys) {
                // Create a DOM element for each marker.
                const el = document.createElement('div');
                // <div class="marker" style="border-radius...></div>
                const width = 25;
                const height = 25;
                el.className = 'marker';
                el.style.borderRadius = "5px";
                //cel.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.backgroundSize = '100%';
                el.style.backgroundColor = 'orange';
        
                if (json_data[ids]["ACCIDENTES"] > 7) {
                    el.style.backgroundColor = 'red';
                }
    
                el.addEventListener('click', () => {
                    let accidente = (json_data[ids]["ACCIDENTES"]);
                    let msg = `
                    El punto crítico ${json_data[ids]["FID"]}, \n
                    concentró un total de ${accidente} accidentes. \n
                    hubieron ${json_data[ids]["FALLECIDOS"]} fallecidos, \n
                    ${json_data[ids]["GRAVES"]} lesionados graves, \n
                    ${json_data[ids]["MENOS_GRAVES"]} lesionados menos graves, \n
                    y ${json_data[ids]["LEVES"]} lesionados leves, \n
                    `;

                    window.alert(msg);
                });
    
                // Add markers to the map.
                new mapboxgl.Marker(el)
                    .setLngLat([json_data[ids]["GEO_LON"], json_data[ids]["GEO_LAT"]])
                    .addTo(map);
                }

            })
        }
        