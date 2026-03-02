import { Database, Zap } from "lucide-react";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__inner">
                <div className="navbar__brand">
                    <div className="navbar__logo">
                        <Database size={18} color="#fff" />
                    </div>
                    <span className="navbar__title">CipherSQL</span>
                    <span className="navbar__subtitle">&nbsp;Studio</span>
                </div>
                <div className="navbar__tagline">
                    <Zap size={12} className="navbar__tagline-dot" />
                    Interactive SQL Playground
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
