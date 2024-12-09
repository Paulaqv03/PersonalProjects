import React from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    // Animación de entrada con GSAP
    React.useEffect(() => {
        gsap.fromTo(
            ".navbar",
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1 }
        );
    }, []);

    // Obtenemos la ruta actual
    const location = useLocation();

    // Definir el mensaje que debe mostrar según la ruta
    let currentLocation = "Consultorio del Valle del Software";
    if (location.pathname === "/empresa") {
        currentLocation = "Sección Empresa";
    } else if (location.pathname === "/usuario") {
        currentLocation = "Sección Usuario";
    }

    return (
        <div className="navbar bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-8 justify-start flex-1">
                <Link to="/">
                    <img
                        src="/src/assets/logo.png"
                        alt="Logo"
                        className="w-80 h-auto"
                    />
                </Link>
            </div>

            {/* Texto en el centro */}
            <div className="text-lg font-semibold text-gray-700 flex-1 text-center">
                {currentLocation}
            </div>

            {/* Enlaces de navegación */}
            <div className="flex items-center gap-8 justify-end flex-1">
                {/* Texto "Soy empresa" como enlace */}
                <Link
                    to="/empresa"
                    className={`text-sm font-medium px-4 py-2 rounded-lg ${location.pathname === "/empresa"
                            ? "bg-blue-100 text-blue-600 border border-blue-400"
                            : "text-gray-700 hover:text-blue-500"
                        } transition`}
                >
                    Soy empresa
                </Link>

                <Link to="/usuario">
                    <button
                        className={`px-4 py-2 rounded-lg ${location.pathname === "/usuario"
                                ? "bg-[#979e6f] text-white border border-[#00102D]"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            } transition`}
                    >
                        Soy usuario
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
