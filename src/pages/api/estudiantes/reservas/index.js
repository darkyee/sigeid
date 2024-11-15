import { supabase } from "~/lib/supabase";

export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            let { data, error } = await supabase
                .from('InstalacionDeportiva')
                .select('*', { count: 'exact' })
                .eq('se_presta', true)
                .not('disponibilidad_horario', 'is', null)

            if (error) {
                return res.json({ error: error.message }, { status: 400 });
            }

            return res.json({ data }, { status: 200 }); // Devolver la respuesta exitosa
        } catch (error) {
            return res.json({ error: 'Error al procesar la solicitud', message: error }, { status: 500 });
        }
    }

    else if (req.method === "POST") {
        try {

            const { fecha_solicitud, participantes, solicitante, instalacion_deportiva, fecha_inicio_reserva, fecha_fin_reserva } = req.body

            console.log('fecha_solicitud', fecha_solicitud)
            console.log('participantes', participantes)
            console.log('solicitante', solicitante)
            console.log('instalacion_deportiva', instalacion_deportiva)
            console.log('fecha_inicio_reserva', fecha_inicio_reserva)
            console.log('fecha_fin_reserva', fecha_fin_reserva)

            // participantes.forEach(async (participante) => {

            //     // Agrega el participante
            //     await supabase
            //         .from('Participante')
            //         .insert({
            //             numero_carnet: participante.numero_carnet,
            //             nombre: participante.nombre
            //         })

            //     // Agrega la reserva
            //     let { data, error } = await supabase
            //         .from('SolicitudReserva')
            //         .insert({
            //             fecha_solicitud,
            //             carnet_participante: participante.numero_carnet,
            //             solicitante,
            //             instalacion_deportiva,
            //             fecha_inicio_reserva,
            //             fecha_fin_reserva,
            //         })

            //     if (error) {
            //         return res.json({ error: error.message }, { status: 400 });
            //     }

            // })

            return res.json({ data: 'ok' }, { status: 200 }); // Devolver la respuesta exitosa
        } catch (error) {
            console.log(error)
            return res.json({ error: 'Error al procesar la solicitud', message: error }, { status: 500 }); // Devolver respuesta de error
        }
    }

}