<?php
header('Content-Type: application/json');

$serverName = "tu_servidor";
$connectionOptions = array(
    "Database" => "tu_base_de_datos",
    "Uid" => "tu_usuario",
    "PWD" => "tu_contraseña"
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(json_encode(array("error" => sqlsrv_errors())));
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Obtener los estudiantes
    $query = "SELECT * FROM Estudiantes";
    $stmt = sqlsrv_query($conn, $query);

    if ($stmt === false) {
        die(json_encode(array("error" => sqlsrv_errors())));
    }

    $estudiantes = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $estudiantes[] = $row;
    }

    echo json_encode($estudiantes);
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Actualizar la asistencia
    $input = json_decode(file_get_contents('php://input'), true);
    $estudianteID = $input['estudianteID'];
    $asistencia = $input['asistencia'];

    $query = "UPDATE Estudiantes SET Asistencia = ? WHERE EstudianteID = ?";
    $params = array($asistencia, $estudianteID);
    $stmt = sqlsrv_query($conn, $query, $params);

    if ($stmt === false) {
        die(json_encode(array("error" => sqlsrv_errors())));
    }

    echo json_encode(array("message" => "Asistencia actualizada"));
}

sqlsrv_close($conn);
