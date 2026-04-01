import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineLogout, HiTranslate, HiMoon, HiSun } from "react-icons/hi";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ toggleTheme, toggleLocale, onLogout=null, name=null }) {
    const theme = React.useContext(ThemeContext);
    const locale = React.useContext(LocaleContext);
    
    return (
        <div className="navigation">
            <ul>
                { name ? <li><Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archive'}</Link></li> : null}
                <li>
                    <button className="toggle-locale" onClick={toggleLocale}>
                        <HiTranslate />
                    </button>
                </li>
                <li>
                    <button className="toggle-theme" onClick={toggleTheme}>
                        {theme === 'light' ? <HiMoon /> : <HiSun />}
                    </button>
                </li>
                { name ? <li><button className="button-logout" onClick={onLogout}><HiOutlineLogout />{name}</button></li> : null}
            </ul>
        </div>
    );
}

export default Navigation;
