'use client';

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";
import { handleEmpresa } from "@/app/actions/serverActions";

export default function Home() {
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  const [empresa, setEmpresa] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // Estado para erros

  console.log(IdEmpresa);

  useEffect(() => {
    async function getEmpresa() {
      try {
        const empresa = await handleEmpresa(IdEmpresa);
        setEmpresa(empresa.empresa);
        console.log(empresa.empresa);
      } catch (err: any) {
        console.error("Erro ao carregar o empresa:", err);
        setError("Erro ao carregar os dados da empresa."); // Define o estado de erro
      }
    }

    getEmpresa();
  }, []);

  if (error) {
    return <div>{error}</div>; // Exibe a mensagem de erro
  }

  if (!empresa) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image src="/LogoAssumteck.png" alt="Logo Assumtek" width={100} height={100} />
          <div>
            <h1>{empresa.name}</h1>
            <p>{empresa.subname}</p>
          </div>
        </div>

        <p className={styles.bioDescption}>{empresa.description}</p>

        <div className={styles.biolinks}>
          <div>
            <Image src="/instagram.svg" alt="Instagram" width={40} height={40} />
            <a href={empresa.instagram} target="_blank">
              Instagram
            </a>
          </div>
          <div>
            <Image src="/linkedin.svg" alt="LinkedIn" width={40} height={40} />
            <a href={empresa.linkedin} target="_blank">
              LinkedIn
            </a>
          </div>
          <div>
            <Image src="/smartphone.svg" alt="WhatsApp" width={40} height={40} />
            <a href={empresa.whatsapp} target="_blank">
              WhatsApp
            </a>
          </div>
          <div>
            <Image src="/mail.svg" alt="Email" width={40} height={40} />
            <a href={`mailto:${empresa.email}`} target="_blank">
              Email
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.cards}>
          {empresa.Links && empresa.Links.map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" className={styles.card}>
              <div className={styles.carttext}>
                <h2>{link.title}</h2>
                <p>{link.description}</p>
              </div>
              <Image src={link.icon_url} alt="Link Image" width={110} height={110} />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}