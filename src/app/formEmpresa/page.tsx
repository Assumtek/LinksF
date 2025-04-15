'use client';

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subname: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    email: "",
    links: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      // Adiciona todos os campos de texto
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      // Adiciona a imagem
      if (logoFile) {
        data.append("logo", logoFile);
      }

      const response = await axios.post("https://assumteklinksbackend.onrender.com/panel", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resposta da API:", response.data);
      setSuccess(true);
    } catch (error: any) {
      console.error("Erro ao enviar:", error);
      setError("Ocorreu um erro ao enviar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image
            src="/LogoAssumteck.png"
            alt="Logo Assumtek"
            width={100}
            height={100}
          />
          <div>
            <h1>Painel de ADM</h1>
            <p>Configurações</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da empresa"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="file"
          name="logo"
          className={styles.input}
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          className={styles.input}
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subname"
          placeholder="Subname"
          className={styles.input}
          value={formData.subname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          className={styles.input}
          value={formData.instagram}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          className={styles.input}
          value={formData.linkedin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="Whatsapp"
          className={styles.input}
          value={formData.whatsapp}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="links"
          placeholder="Links"
          className={styles.input}
          value={formData.links}
          onChange={handleChange}
        />
        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Dados enviados com sucesso!</p>}
    </div>
  );
}
