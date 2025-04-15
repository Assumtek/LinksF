'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";

export default function FormCard() {
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  const [link, setLink] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [order, setOrder] = useState<number>(1);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("companyId", IdEmpresa);
    formData.append("title", titulo);
    formData.append("description", descricao);
    formData.append("url", link);
    formData.append("order", String(order));
    formData.append("icon", imagem); // Aqui vai a imagem real

    try {
      const response = await fetch("https://linksb-production.up.railway.app/links", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o link");
      }

      alert("Link criado com sucesso!");
      // Se quiser resetar os campos:
      setLink("");
      setTitulo("");
      setDescricao("");
      setImagem(null);
      setOrder(1);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar o link.");
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
          name="link"
          placeholder="Link"
          className={styles.input}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          className={styles.input}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="file"
          name="imagem"
          className={styles.input}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagem(file);
            }
          }}
        />
        <input
          type="number"
          name="order"
          placeholder="Ordem"
          className={styles.input}
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
        <button className={styles.btn} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
