import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image src="/LogoAssumteck.png" alt="Logo Assumtek" width={100} height={100} />
          <div>
            <h1>Painel de ADM</h1>
            <p>Configurações</p>
          </div>
        </div>

        <p className={styles.bioDescption}>
          Mude as informações que forem necessárias aqui
        </p>

        <div className={styles.biolinks}>
          <div>
            {/* <Image src="/instagram.svg" alt="Instagram" width={40} height={40} /> */}
            <a href="/formDescricao" >Mudar descrição</a>
          </div>
          <div>
            {/* <Image src="/linkedin.svg" alt="LinkedIn" width={40} height={40} /> */}
            <a href="/formLink" >Mudar links</a>
          </div>
          <div>
            {/* <Image src="/smartphone.svg" alt="WhatsApp" width={40} height={40} /> */}
            <a href="/formCard" >Adicionar novo card</a>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.cards}>
          <a href="https://assumtek.com.br/"  className={styles.card}>
            <div className={styles.carttext}>
              <h2>SITE INSTITUCIONAL</h2>
              <p>
                Aqui você vai poder conhecer mais sobre nossos treinamentos, números, blog, contato e muitas outras informações sobre a ASSUMTEK.
              </p>
            </div>
            <Image src="/LogoAssumteck.png" alt="Email" width={100} height={100} />

          </a>
          <a href="/formCard">Editar card</a>

          <a href="https://assumtek.com.br/paraempresas/"  className={styles.card}>
            <div className={styles.carttext}>
              <h2>PARA EMPRESAS</h2>
              <p>
                Impulsione a produtividade e leve seu time para o próximo nível. Engajar, capacitar e acompanhar o aprendizado do seu time nunca foi tão simples.
              </p>
            </div>
            <Image src="/LogoAssumteck.png" alt="Email" width={100} height={100} />
          </a>
          <a href="/formCard">Editar card</a>
        </div>
      </main>
    </div>
  );
}
