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
      </header>

      <form action="" className={styles.form}>
        <input type="text" name="descrição" placeholder="Linekdin" className={styles.input} />
        <input type="text" name="descrição" placeholder="WhatsApp" className={styles.input} />
        <input type="text" name="descrição" placeholder="Email" className={styles.input} />
        <input type="text" name="descrição" placeholder="Instagram" className={styles.input} />
        <button className={styles.btn} type="submit">Enviar</button>
      </form>
    </div>
  );
}
