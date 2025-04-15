// pages/adm/[id]/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import { handleDeleteLink, handleEmpresa } from "../../actions/serverActions";
import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";

export default function EditEmpresa() {
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  // Informações do user logado
  const [empresa, setEmpresa] = useState<any>(null);
  const [update, setUpdate] = useState<any>(true);

  console.log(IdEmpresa);

  // USEEFFECTS
  // Pega as informações do empresa fornecida na URL logado
  useEffect(() => {
    async function getEmpresa() {
      try {
        const empresa = await handleEmpresa(IdEmpresa);
        setEmpresa(empresa.empresa);
        console.log("Dados da empresa:",empresa.empresa);
      } catch (error) {
        console.error("Erro ao carregar o empresa:", error);
      } finally {
        // setIsLoading(false); // Após a verificação, remover o loading
      }
    }

    getEmpresa();
  }, [update]);

  const handleDeleteCard = async (IdEmpresa: string) => {
    try {
      await handleDeleteLink(IdEmpresa);
      setUpdate(!update)
      alert('Card deletado com sucesso!');
      
      
    } catch (error) {
      console.error("Erro ao deletar o card:", error);
      alert('Erro ao deletar o card.');
    }
  };

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
            <a href={"/formDescricao/" + IdEmpresa} >Mudar descrição</a>
          </div>
          <div>
            <a href={"/formLink/" + IdEmpresa} >Mudar links</a>
          </div>
          <div>
            <a href={"/formCard/" + IdEmpresa} >Adicionar novo card</a>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.cards}>
          {empresa?.Links.map((links: any) => (
            <div>
              <a key={links.id} href={links.url} className={styles.card}>
                <div className={styles.carttext}>
                  <h2>{links.title}</h2>
                  <p>
                    {links.description}
                  </p>
                </div>
                <Image src={links.icon_url} alt="Email" width={100} height={100} />
              </a>
              <div className={styles.cardActions}>
              <button className={styles.btnDelete} onClick={() => handleDeleteCard(links.id)}>Deletar card</button>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}