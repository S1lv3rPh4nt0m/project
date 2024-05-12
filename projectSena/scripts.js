const sql = require('mssql');

const config = {
    user: 'si',
    password: 'tambien',
    server: 'localhost', 
    database: 'EstudiantesDB',
};

// Ejemplo de conexión y consulta a la base de datos
async function obtenerEstudiantes() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM Estudiantes');
        console.log(result);
    } catch (err) {
        console.error('Error en la conexión', err);
    }
}

obtenerEstudiantes();

// Realizar la solicitud fetch para obtener la lista de estudiantes y mostrarla en la página
fetch('/api/estudiantes')
    .then(response => response.json())
    .then(estudiantes => {
        const listaEstudiantes = document.getElementById('lista-estudiantes');
        estudiantes.forEach(estudiante => {
            const estudianteElement = document.createElement('div');
            estudianteElement.innerHTML = `
                <p>${estudiante.nombres} ${estudiante.apellidos}</p>
                <input type="checkbox" id="asistencia-${estudiante.estudianteID}" ${estudiante.asistencia ? 'checked' : ''}>
                <label for="asistencia-${estudiante.estudianteID}">Presente</label>
            `;
            listaEstudiantes.appendChild(estudianteElement);

            // Evento para manejar el cambio de estado de la casilla
            const checkbox = document.getElementById(`asistencia-${estudiante.estudianteID}`);
            checkbox.addEventListener('change', () => {
                const asistencia = checkbox.checked ? 1 : 0;
                // Realizar la solicitud POST para actualizar la asistencia
                fetch(`/api/asistencia/${estudiante.estudianteID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ asistencia }),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Asistencia actualizada');
                    } else {
                        console.error('Error al actualizar la asistencia');
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar la asistencia', error);
                });
            });
        });
    });

