<?php
// Conexión a la base de datos SQL Server
$serverName = "tu_servidor";
$connectionOptions = array(
    "Database" => "tu_base_de_datos",
    "Uid" => "tu_usuario",
    "PWD" => "tu_contraseña"
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Manejar la solicitud POST para actualizar la asistencia
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el ID del estudiante y el estado de la asistencia del cuerpo de la solicitud
    $estudianteID = $_POST['estudianteID'];
    $asistencia = $_POST['asistencia'];

    // Actualizar la base de datos SQL Server
    $query = "UPDATE Estudiantes SET Asistencia = ? WHERE EstudianteID = ?";
    $params = array($asistencia, $estudianteID);
    $stmt = sqlsrv_query($conn, $query, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    // Enviar una respuesta JSON al cliente
    header('Content-Type: application/json');
    echo json_encode(array("message" => "Asistencia actualizada"));
}

// Cerrar la conexión a la base de datos
sqlsrv_close($conn);
