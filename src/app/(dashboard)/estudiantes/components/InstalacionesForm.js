"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ParticipantSelector from './ParticipantSelector';

const Form = forwardRef(({ onEdit, onInsert }, ref) => {

    const [horario, setHorario] = useState([]);

    // Usa el valor inicial calculado en useState
    const [selectedDate, setSelectedDate] = useState('');

    const [participants, setParticipants] = useState([]);

    // Opciones de ejemplo
    const [days, setDays] = useState([]);
    const [startTimes, setStartTimes] = useState([]);
    const [endTimes, setEndTimes] = useState([]);

    // Estados para los valores seleccionados
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    useImperativeHandle(ref, () => ({

        mostrarFormulario: (data) => {

            const horario = data.disponibilidad_horario.filter(v => v.times.length)
            const days = []

            horario.forEach(weekdays => {
                days.push(weekdays.day)
            })

            setHorario(horario)
            setDays(days)

            const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
            modal.show();
        }
    }))

    const actualizarDia = (weekday) => {
        horario.forEach(weekdays => {
            if (weekdays.day === weekday) {
                setStartTimes(weekdays.times.map(v => v.start))
                // setEndTimes(weekdays.times.map(v => v.end))
            }
        })
        setDay(weekday)
    }

    const actualizarHoraInicio = (time) => {
        setStartTime(time)
        
        // aqui deberia actualizar la hora de fin
    }

    // Manejador del submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Aquí puedes manejar el envío del formulario
        const formData = {
            fecha_solicitud: moment().format('yyyy-MM-DD'),
            participantes: participants,
            solicitante,
            // instalacion_deportiva,
            // fecha_inicio_reserva,
            // fecha_fin_reserva
        };
        console.log('Reservas', formData); // Simular envío

        fetch('/api/estudiantes/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.status === 200) {
                    onInsert && onInsert()
                }
            })

        // fetch('/api/administradores/instalaciones', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then(response => {
        //         if (response.status === 200) {
        //             onInsert && onInsert()
        //         }
        //     })
    };


    const DatePicker = () => {
        // Calcula la fecha actual con 2 días de anticipación
        const today = new Date();
        const dateWithTwoDays = new Date(today);
        dateWithTwoDays.setDate(today.getDate() + 2); // Sumar 2 días

        // Convierte la fecha a formato 'YYYY-MM-DD' para el input de tipo date
        const formattedDate = dateWithTwoDays.toISOString().split("T")[0];

        const isWeekend = (date) => {
            const day = new Date(date).getDay();
            return day === 5 || day === 6; // 6 = Sábado, 0 = Domingo
        };

        const handleDateChange = (event) => {
            const chosenDate = event.target.value;

            // Si es sábado o domingo, muestra una alerta y no actualiza el estado
            if (isWeekend(chosenDate)) {
                alert("Los sábados y domingos no están permitidos.");
                setSelectedDate(''); // Restablece el valor si es fin de semana
            } else {

                setSelectedDate(chosenDate); // Actualiza el estado si es un día permitido

                actualizarDia(moment(chosenDate).format('dddd'))

                fetch('/api/estudiantes/reservas/fecha', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date: chosenDate }),
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response.data)
                    })

            }
        };

        return (
            <input
                className='form-control'
                type="date"
                value={selectedDate}
                min={formattedDate}
                onChange={handleDateChange}
            />
        );
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form onSubmit={handleSubmit}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Formulario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col col-12 col-sm-6 mb-3'>

                                        <label className="form-label">Horarios Disponibles</label>
                                        <div className='row'>
                                            {
                                                horario.map((item, index) => {
                                                    return (
                                                        <div className='col col-12' key={index}>
                                                            <div className='card'>
                                                                <div className="card-body">
                                                                    <div className='row'>
                                                                        <div className='col col-12 col-lg-4'>
                                                                            {item.day}
                                                                        </div>
                                                                        <div className='col col-12 col-lg-8'>
                                                                            {
                                                                                item.times.map((item, index) => {
                                                                                    return (
                                                                                        <div key={index}>
                                                                                            {item.start} -&gt; {item.end}
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    <div className='col col-12 col-sm-6'>

                                        <label className="form-label">Reserva</label>
                                        <hr />

                                        <div className="row mb-3">
                                            <div className="col col-12 mb-2">
                                                <label htmlFor="daySelect" className="form-label">Día</label>

                                                <DatePicker></DatePicker>

                                                <select
                                                    id="daySelect"
                                                    className="form-select"
                                                    value={day}
                                                    disabled={!selectedDate}
                                                    onChange={(e) => actualizarDia(e.target.value)}
                                                >
                                                    <option value="">Selecciona un día</option>
                                                    {days.map((d, index) => (
                                                        <option key={index} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col col-12 mb-2">
                                                <label htmlFor="startTimeSelect" className="form-label">Hora de Inicio</label>
                                                <select
                                                    id="startTimeSelect"
                                                    className="form-select"
                                                    value={startTime}
                                                    disabled={!day}
                                                    onChange={(e) => actualizarHoraInicio(e.target.value)}
                                                >
                                                    <option value="">Selecciona una hora de inicio</option>
                                                    {startTimes.map((time, index) => (
                                                        <option key={index} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col col-12 mb-2">
                                                <label htmlFor="endTimeSelect" className="form-label">Hora de Fin</label>
                                                <select
                                                    id="endTimeSelect"
                                                    className="form-select"
                                                    value={endTime}
                                                    disabled={!day}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                >
                                                    <option value="">Selecciona una hora de fin</option>
                                                    {endTimes.map((time, index) => (
                                                        <option key={index} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='col col-12'>
                                        <label className="form-label">Participantes</label>
                                        <hr />
                                        <ParticipantSelector onChange={(e) => {
                                            setParticipants([...e])
                                        }} />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary">Reservar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
})

export default Form;