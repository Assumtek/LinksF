'use client';

import Image from "next/image";
import styles from "./page.module.css";

import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";
import { useEffect, useState } from "react";
import { handleEditDescriptionEmpresa, handleEmpresa } from "@/app/actions/serverActions";



export default function FormDescricao() {

  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  // Informações do user logado
  const [empresa, setEmpresa] = useState<any>(null);
  const [inputValue, setInputValue] = useState<any>("");

  console.log(IdEmpresa);

  // USEEFFECTS
  // Pega as informações do empresa fornecida na URL logado
  useEffect(() => {
    async function getEmpresa() {
      try {
        const empresa = await handleEmpresa(IdEmpresa);
        setEmpresa(empresa.empresa);
      } catch (error) {
        console.error("Erro ao carregar o empresa:", error);
      } finally {
        // setIsLoading(false); // Após a verificação, remover o loading
      }
    }

    getEmpresa();
  }, []);

  // Atualiza inputValue quando empresa é carregado
  useEffect(() => {
    if (empresa && empresa.description) {
      setInputValue(empresa.description);
    }
  }, [empresa]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleEditDescriptionEmpresa(IdEmpresa, inputValue);
      alert('Descrição atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar a descrição.');
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
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="descrição"
          placeholder="Descrição"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.btn} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
