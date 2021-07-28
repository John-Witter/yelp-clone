import './Footer.css'

export const Footer = () => {
    return (
        <div className='footer'>
            <ul className='footer-ul'>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="https://github.com/John-Witter/yelp-clone" target="_blank" rel="noreferrer" className="link-text">
                            GitHub
                        </a>
                    </p>
                </li>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="https://github.com/John-Witter" target="_blank" rel="noreferrer" className="link-text">
                            John Witter
                        </a>
                    </p>
                </li>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="https://www.linkedin.com/in/john-witter-witlacil-556a3b158/" target="_blank" rel="noreferrer" className="link-text">
                            LinkedIn
                        </a>
                    </p>
                </li>
            </ul>
            
        </div>
    )
}
