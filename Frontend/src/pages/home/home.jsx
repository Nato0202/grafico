import './index.scss'
import NavBar from "../../components/navBar/navBar.jsx";
import Footer from '../../components/footer/footer.jsx';

export default function Home() {
    return (
        <div className="Home">
            <NavBar />
            <div className="Info">
                <div className="Info-txt">
                    <h1>Bem vindo aos gráficos de Inscrições 2026</h1>
                    <h2>Este projeto foi desenvolvido para exibir gráficos de linha <br />e barra, para facilitar a visualização dos agendamentos.</h2>
                    <h3>Utilize a barra de navegação acima para alternar entre os gráficos por favor.</h3>
                </div>
            </div>
            <Footer />
        </div>
    )
}