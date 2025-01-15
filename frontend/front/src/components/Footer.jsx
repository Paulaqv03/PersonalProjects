function Footer() {
    return (
        <footer className="bg-[#002647] py-6">
            <div className="container mx-auto text-right">
                <div className="flex justify-end space-x-4">
                    <a
                        href="https://www.facebook.com/universitariaco/"
                        className="text-gray-300 text-2xl hover:text-white transition"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCy32aUKfACpU4cvE1TtmgxA"
                        className="text-gray-300 text-2xl hover:text-white transition"
                    >
                        <i className="fab fa-youtube"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/universitaria_oficial/"
                        className="text-gray-300 text-2xl hover:text-white transition"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/universitaria-de-colombia/"
                        className="text-gray-300 text-2xl hover:text-white transition"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                        href="https://www.tiktok.com/@universitariadecolombia?lang=es"
                        target="_blank"
                        className="text-gray-300 text-2xl hover:text-white transition"
                    >
                        <i className="fab fa-tiktok"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
