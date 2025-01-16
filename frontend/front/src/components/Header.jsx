function Header({ title }) {
    return (
        <header className="w-full py-8 bg-[#002647] fixed top-0 left-0 z-50 flex items-center">
            <div className="flex items-center justify-between w-full px-5">
                {/* Logo alineado a la izquierda */}
                <div className="flex items-center">
                    <img 
                        src="https://ww1.aulavirtualuniversitariadecolombia.co/pluginfile.php/1/theme_klassroom/logo/1732826367/thumbnail_logo-universidad_balnco40px.png"
                        alt="logo"
                        className="h-10"
                    />
                </div>
                
                {/* Título centrado */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white">
                    {title}
                </h1>
            </div>
        </header>
    );
}

export default Header;
