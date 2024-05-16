document.addEventListener("DOMContentLoaded", () => {
    fetch('/ruta/a/tu/archivo.php')
        .then(response => response.json())
        .then(estudiantes => {
            const listaSanJuan = document.getElementById('fichas-san-juan');
            const listaNecocli = document.getElementById('fichas-necocli');
            const listaArboletes = document.getElementById('fichas-arboletes');

            estudiantes.forEach(estudiante => {
                const estudianteElement = document.createElement('div');
                estudianteElement.classList.add('ficha-estudiante-item');
                estudianteElement.innerHTML = `
                    <p>${estudiante.nombres} ${estudiante.apellidos}</p>
                    <input type="checkbox" id="asistencia-${estudiante.EstudianteID}" ${estudiante.asistencia ? 'checked' : ''}>
                    <label for="asistencia-${estudiante.EstudianteID}">Presente</label>
                `;

                if (estudiante.ciudad === 'San Juan') {
                    listaSanJuan.appendChild(estudianteElement);
                } else if (estudiante.ciudad === 'Necoclí') {
                    listaNecocli.appendChild(estudianteElement);
                } else if (estudiante.ciudad === 'Arboletes') {
                    listaArboletes.appendChild(estudianteElement);
                }

                // Evento para manejar el cambio de estado de la casilla
                const checkbox = document.getElementById(`asistencia-${estudiante.EstudianteID}`);
                checkbox.addEventListener('change', () => {
                    const asistencia = checkbox.checked ? 1 : 0;
                    fetch('/ruta/a/tu/archivo.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            estudianteID: estudiante.EstudianteID,
                            asistencia: asistencia
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            console.log(data.message);
                        } else {
                            console.error('Error al actualizar la asistencia');
                        }
                    })
                    .catch(error => {
                        console.error('Error al actualizar la asistencia', error);
                    });
                });
            });
        })
        .catch(error => console.error('Error al cargar estudiantes:', error));
});


