import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image src="/LogoAssumteck.png" alt="Logo Assumtek" width={100} height={100} />
          <div>
            <h1>ASSUMTEK</h1>
            <p>E-education</p>
          </div>
        </div>

        <p className={styles.bioDescption}>
          A ASSUMTEK nasceu com o propósito de democratizar o conhecimento voltado a SAP S/4HANA,
          de uma forma descomplicada e aplicando as melhores metodologias e tecnologias disponíveis no mercado.
        </p>

        <div className={styles.biolinks}>
          <div>
            <Image src="/instagram.svg" alt="Instagram" width={40} height={40} />
            <a href="https://www.instagram.com/assumtek/" target="_blank">Instagram</a>
          </div>
          <div>
            <Image src="/linkedin.svg" alt="LinkedIn" width={40} height={40} />
            <a href="https://www.linkedin.com/company/assumtek/" target="_blank">LinkedIn</a>
          </div>
          <div>
            <Image src="/smartphone.svg" alt="WhatsApp" width={40} height={40} />
            <a href="http://bit.ly/assumtek-comercial" target="_blank">WhatsApp</a>
          </div>
          <div>
            <Image src="/mail.svg" alt="Email" width={40} height={40} />
            <a href="/cdn-cgi/l/email-protection#1e7d71706a7f6a715e7f6d6d6b736a7b7d75307d7173307c6c" target="_blank">Email</a>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.cards}>
          <a href="https://assumtek.com.br/" target="_blank" className={styles.card}>
            <div className={styles.carttext}>
              <h2>SITE INSTITUCIONAL</h2>
              <p>
                Aqui você vai poder conhecer mais sobre nossos treinamentos, números, blog, contato e muitas outras informações sobre a ASSUMTEK.
              </p>
            </div>
            <Image src="/LogoAssumteck.png" alt="Email" width={100} height={100} />
          </a>

          <a href="https://assumtek.com.br/paraempresas/" target="_blank" className={styles.card}>
            <div className={styles.carttext}>
              <h2>PARA EMPRESAS</h2>
              <p>
                Impulsione a produtividade e leve seu time para o próximo nível. Engajar, capacitar e acompanhar o aprendizado do seu time nunca foi tão simples.
              </p>
            </div>
            <Image src="/LogoAssumteck.png" alt="Email" width={100} height={100} />
          </a>
        </div>
      </main>
    </div>
  );
}
