import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image src="/LogoAssumteck.png" alt="Logo Assumtek" width={100} height={100} />
          <div>
            <h1>GRUPO ASSUMTEK</h1>
            <p>Conheça mais sobre</p>
          </div>
        </div>

        <p className={styles.bioDescption}>
          Escolha alguma empresa do nosso grupo para saber mais
        </p>
      </header>

    </div>
  );
}
