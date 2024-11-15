// Fake data for testing based on the 'ReporteDesperfecto', 'FotoDesperfecto', and 'EstadoReporte' tables

export const datosPrueba = [
    {
      id_reporte_desperfecto: 1,
      asunto: 'Fuga de agua',
      descripcion: 'Fuga de agua en el baño del tercer piso',
      instalacion_afectada: 1,
      fecha_reporte: '2024-10-01 09:45:00',
      estado_reporte: 1, // Pendiente
      reportado_por: 'Juan Pérez',
      numero_reporte_archivo: 1001,
      fotos: [
        { id_foto_desperfecto: 1, id_reporte: 1, foto: 'foto_fuga_agua_1.jpg' }
      ],
    },
    {
      id_reporte_desperfecto: 2,
      asunto: 'Aire acondicionado dañado',
      descripcion: 'El aire acondicionado de la sala de reuniones no funciona',
      instalacion_afectada: 2,
      fecha_reporte: '2024-10-05 14:22:00',
      estado_reporte: 2, // En Proceso
      reportado_por: 'María García',
      numero_reporte_archivo: 1002,
      fotos: [
        { id_foto_desperfecto: 2, id_reporte: 2, foto: 'foto_ac_daño_1.jpg' }
      ],
    },
    {
      id_reporte_desperfecto: 3,
      asunto: 'Problemas eléctricos',
      descripcion: 'Corto circuito en el panel principal de la planta baja',
      instalacion_afectada: 3,
      fecha_reporte: '2024-10-07 11:35:00',
      estado_reporte: 1, // Pendiente
      reportado_por: 'Luis Rodríguez',
      numero_reporte_archivo: 1003,
      fotos: [
        { id_foto_desperfecto: 3, id_reporte: 3, foto: 'foto_electricidad_problema_1.jpg' }
      ],
    },
    {
      id_reporte_desperfecto: 4,
      asunto: 'Ventana rota',
      descripcion: 'Ventana de la oficina de recursos humanos está rota',
      instalacion_afectada: 4,
      fecha_reporte: '2024-10-10 16:50:00',
      estado_reporte: 3, // Resuelto
      reportado_por: 'Ana Martínez',
      numero_reporte_archivo: 1004,
      fotos: [
        { id_foto_desperfecto: 4, id_reporte: 4, foto: 'foto_ventana_rota_1.jpg' }
      ],
    },
    {
      id_reporte_desperfecto: 5,
      asunto: 'Humedad en la pared',
      descripcion: 'Manchas de humedad en las paredes del segundo piso',
      instalacion_afectada: 1,
      fecha_reporte: '2024-10-12 08:10:00',
      estado_reporte: 2, // En Proceso
      reportado_por: 'Pedro Hernández',
      numero_reporte_archivo: 1005,
      fotos: [
        { id_foto_desperfecto: 5, id_reporte: 5, foto: 'foto_humedad_pared_1.jpg' }
      ],
    }
  ];
  
  // Fake data for 'EstadoReporte' (just as a reference)
  export const estadoReporte = [
    { id_estado_reporte: 1, estado: 'Pendiente' },
    { id_estado_reporte: 2, estado: 'En Proceso' },
    { id_estado_reporte: 3, estado: 'Resuelto' }
  ];