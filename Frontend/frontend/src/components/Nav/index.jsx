import jpIMG from '../../assets/logo.png';
import './styles.css'

export const Nav = () => {

    return (
        <header>
            <nav className="container">
                <div className="redlack-nav-content">
                    <div className="redlack-contact-container">
                        <img src={jpIMG} className="logo-redlack" alt="Jovem Programador" />
                    </div>
                </div>
            </nav>
        </header>
    )
}