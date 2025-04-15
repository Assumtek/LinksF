import Image from "next/image";
import styles from "./notfound.module.css";

export default function NotFound() {
    return (
      <div className={styles.main}>
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
      </div>
    );
  }