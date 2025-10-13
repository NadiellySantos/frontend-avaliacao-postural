import React from "react";
import "./Sobre.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Sobre() {
    const navigate = useNavigate();
  return (
    <>
          <Helmet>
            <title>Login - AlignMe</title>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
            />
          </Helmet>
        <div className="sobre-container">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Voltar
            </button>
        <div className="sobre-header">
            <h1>Sobre o Sistema de Avaliação Postural</h1>
            <p>
            Uma solução moderna que une <strong>fotogrametria</strong> e{" "}
            <strong>visão computacional</strong> para auxiliar fisioterapeutas na
            análise postural de seus pacientes com maior precisão e agilidade.
            </p>
        </div>

        <div className="sobre-section">
            <h2>🎯 Objetivo</h2>
            <p>
            O sistema tem como objetivo simplificar e padronizar o processo de
            <strong> avaliação postural</strong> através do uso de tecnologias de
            inteligência artificial, permitindo medições automáticas e análise de
            ângulos e distâncias corporais em imagens bidimensionais.
            </p>
        </div>

        <div className="sobre-section">
            <h2>🧠 Tecnologias Utilizadas</h2>
            <ul>
            <li>
                <strong>React</strong> — interface moderna, responsiva e modular.
            </li>
            <li>
                <strong>FastAPI (Python)</strong> — backend leve e eficiente para
                processamento de imagens.
            </li>
            <li>
                <strong>MediaPipe</strong> — biblioteca de visão computacional usada
                para detectar pontos anatômicos e calcular ângulos e distâncias.
            </li>
            <li>
                <strong>Fotogrametria</strong> — técnica utilizada para estimar
                proporções e medidas reais a partir de imagens.
            </li>
            </ul>
        </div>

        <div className="sobre-section">
            <h2>⚙️ Como Funciona</h2>
            <p>
            O fisioterapeuta captura uma fotografia do paciente em vista sagital
            (lateral) ou frontal e insere uma <strong>referência de escala</strong>{" "}
            (por exemplo, 1 metro). O sistema então:
            </p>
            <ol>
            <li>Detecta automaticamente os pontos anatômicos de referência.</li>
            <li>Calcula distâncias e ângulos entre os segmentos corporais.</li>
            <li>
                Exibe os resultados em centímetros e graus diretamente sobre a
                imagem.
            </li>
            <li>Gera relatórios quantitativos que auxiliam o diagnóstico postural.</li>
            </ol>
        </div>

        <div className="sobre-section">
            <h2>👩‍⚕️ Público-Alvo</h2>
            <p>
            Desenvolvido especialmente para <strong>fisioterapeutas</strong>,
            estudantes e pesquisadores da área da saúde interessados em aprimorar
            suas análises posturais com o auxílio de tecnologias de
            <strong> inteligência artificial</strong>.
            </p>
        </div>

        <div className="sobre-section">
            <h2>🚀 Benefícios</h2>
            <ul>
            <li>Maior precisão nas medições posturais.</li>
            <li>Redução de erros humanos.</li>
            <li>Padronização das análises fotogramétricas.</li>
            <li>Relatórios visuais intuitivos e comparativos.</li>
            </ul>
        </div>
            <div className="sobre-footer">
                <p>
                © {new Date().getFullYear()} — Sistema de Avaliação Postural por
                Fotogrametria e Visão Computacional.
                </p>
            </div>
        </div>
    </>
  );
}
