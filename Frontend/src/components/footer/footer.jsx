import './index.scss'

export default function Footer() {
    return (
        <div className="Footer">
            <div className="img">
            <img className='footer-img' src="/image/logo-isnsf.png" alt="logo" />
            </div>

            <div className="title">
            <p>Desenvolvido pelos alunos da Informática A</p>
            </div>
            
            <div className="names">
            <a href="https://github.com/KuromiHitagi" target='_blank'>Nicolas Freitas Souza</a>
            <a href="https://github.com/Nato0202" target='_blank'>Renan Nunes de Jesus</a>
            </div>
        </div>
    )
}