"use client";
//import datosPrueba from '../datosPrueba'; // se simula la tabla de Supabase
import { useRouter } from 'next/navigation';
import './style.css';


// async function fetchReport(id) {
//     const response = await fetch(`https://your-api.com/reports/${id}`); 
//     if (!response.ok) {
//       throw new Error('Failed to fetch report');
//     }
//     return response.json();
//   }

const clickVolver = () => {router.push(`./desperfectos/`)};
  
  const detallesDesper = async ({ params }) => {
    const { id } = params; // Access the dynamic id parameter
    //const report = await fetchReport(id); // Fetch report data based on id

      // Find the report from your fake data
    const report = datosPrueba.find((report) => report.id_reporte_desperfecto == id);

    if (!report) {
        return <div>Desperfecto No Encontrado.</div>; 
    }
  
    return (
      <div>
        <h1 style={{marginTop:'50px', marginBottom: '65px'}}>Report Details for ID: {id}</h1>
        <p><strong>Asunto:</strong> {report.asunto}</p>
        <p><strong>Instalación Afectada:</strong> {report.instalacion_afectada}</p>
        <p><strong>Fecha Reporte:</strong> {report.fecha_reporte}</p>
        <p><strong>Estado Reporte:</strong> {report.estado_reporte}</p>
        <p><strong>Descripción:</strong> {report.descripcion}</p>
        <button style={buttonEstado}>Editar Estado</button>
      </div>
    );
  };

  const buttonEstado = {
    position: 'relative',
    bottom: '142px',
    left: '350px',
    backgroundColor: '#002855',
    color: 'White',
    borderRadius: '4px',
    //borderColor: '#001936'

  }
  
  const buttonVolver = {
    position: 'relative',
    bottom: '20px',
    left: '1100px'
  }


  export default detallesDesper;