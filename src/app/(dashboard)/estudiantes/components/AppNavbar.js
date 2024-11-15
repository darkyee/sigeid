import AppNavbarGlobal from "@/components/AppNavbar"

export default function AppNavbar() {

    const items = [
        { text: "Reserva de Instalaciones", url: "/estudiantes/reservas" },
        { text: "Préstamo de Equipo", url: "/estudiantes/prestamos" }
    ]

    return (
        <AppNavbarGlobal items={items} />
    )
}