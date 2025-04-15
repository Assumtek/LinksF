'use client'

import Image from "next/image";
import styles from "./page.module.css";

import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";
import { useEffect, useState } from "react";
import { handleEditLinksEmpresa, handleEmpresa } from "@/app/actions/serverActions";

export default function FormLink() {
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  const [linkedin, setLinkedin] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");

  console.log(IdEmpresa);

  // Informações do user logado
  const [empresa, setEmpresa] = useState<any>(null);

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

  // Atualiza os estados quando empresa é carregado
  useEffect(() => {
    if (empresa) {
      setLinkedin(empresa.linkedin || "");
      setWhatsapp(empresa.whatsapp || "");
      setEmail(empresa.email || "");
      setInstagram(empresa.instagram || "");
    }
  }, [empresa]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleEditLinksEmpresa(
        IdEmpresa,
        linkedin,
        whatsapp,
        email,
        instagram,
      );
      alert('Links atualizados com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar os links.');
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
          name="linkedin"
          placeholder="LinkedIn"
          className={styles.input}
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          className={styles.input}
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          className={styles.input}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <button className={styles.btn} type="submit">Enviar</button>
      </form>
    </div>
  );
}