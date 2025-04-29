  //  pages/adm/[id]/page.tsx
  'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { handleDeleteLink, handleEmpresa } from "../../actions/serverActions";
import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";

export default function EditEmpresa() {
  const router = useRouter();
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Informações do user logado
  const [empresa, setEmpresa] = useState<any>(null);
  const [update, setUpdate] = useState<any>(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar sua lógica de validação
    if (email === 'admin@assumtek.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      router.push('/');
    }
  };

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
      }
    }

    if (isLoggedIn) {
      getEmpresa();
    }
  }, [update, isLoggedIn]);

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

  if (!isLoggedIn) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginModal}>
          <h2>Login Administrativo</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

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
            <div key={links.id}>
              <a href={links.url} className={styles.card}>
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