import React from "react";
import "./Protocolo.css";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Protocolo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pacienteId = id;

  const handleClose = () => {
    navigate(-1); // fecha o "modal" voltando pra tela anterior
  };

  const handleAvaliar = () => {
    navigate(`/avaliar/${pacienteId}`);
  };

  return (
    <>
      <Helmet>
        <title>Protocolo de Coleta - AlignMe</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Helmet>

      {/* Container estilo modal LGPD */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">

            {/* Cabeçalho do modal */}
            <div className="modal-header">
              <h5 className="modal-title fw-bold text-primary">
                Procedimentos de Coleta – Protocolo AlignMe
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            {/* Corpo do modal (rolável) */}
            <div className="modal-body protocolo-modal-body">
              <div className="mb-3">
                <p>
                  Os instrumentos de coleta foram elaborados com base no{" "}
                  <strong>Protocolo SAPO de Avaliação Postural</strong>,
                  utilizado pelo Laboratório de Biofísica (LoB), vinculado ao
                  Departamento de Fisiologia do Instituto de Ciências
                  Biomédicas (ICB) da{" "}
                  <strong>Universidade de São Paulo (USP)</strong>. Para o{" "}
                  <strong>AlignMe</strong>, houve uma adaptação do protocolo com
                  foco nas vistas frontal (anterior) e sagital (lateral).
                </p>
                <p>
                  Para o devido funcionamento do sistema, é de suma
                  importância que se siga os procedimentos aqui estabelecidos no
                  momento da obtenção das imagens do paciente. Nas páginas de
                  carregamento das mesmas, existem exemplos de fotografias de
                  pacientes devidamente ajustados ao protocolo.
                </p>
              </div>

              <div className="mb-4">
                <h6>
                    <i className="bi bi-bullseye me-2"></i>
                    Procedimentos necessários para ambas as visões
                </h6>
                <ul>
                  <li>
                    A captura das imagens deve ocorrer em um ambiente com{" "}
                    <strong>iluminação uniforme e fundo preto</strong>.
                  </li>
                  <li>
                    A câmera deve estar posicionada a aproximadamente{" "}
                    <strong>1,7 metros</strong> do paciente, com altura
                    compatível ao centro de massa, alinhada às vistas frontal e
                    lateral.
                  </li>
                  <li>
                    Ao lado do participante deve haver uma{" "}
                    <strong>régua de 1 metro</strong> de altura, para que o
                    algoritmo realize a conversão de pixels para centímetros.
                  </li>
                  <li>
                    O paciente deve estar em pé, descalço, com vestimenta justa,
                    braços relaxados ao longo do tronco e olhar direcionado para
                    frente.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h6>
                    <i className="bi bi-cpu-fill me-2"></i>
                    Particularidades da Visão Frontal
                </h6>
                <p>
                  As bolinhas de isopor, com diâmetro aproximado de 1,5 cm,
                  devem ser fixadas sobre os pontos articulares por meio de uma
                  base (cola quente) e fita dupla face.
                </p>
                <p>
                  <strong>Projeções ósseas que deverão ser marcadas:</strong>{" "}
                  Acrômio direito, Espinha ilíaca ântero superior esquerda,
                  Acrômio esquerdo, Trocânter maior do fêmur direito, Cabeça da
                  fíbula direita, Trocânter maior do fêmur esquerdo, Cabeça da
                  fíbula esquerda, Epicôndilo lateral do fêmur direito, Processo
                  estilóide do rádio direito, Epicôndilo lateral do fêmur
                  esquerdo, Processo estilóide do rádio esquerdo, Maléolo
                  lateral direito, Espinha ilíaca ântero superior direita e
                  Maléolo lateral esquerdo.
                </p>
              </div>

              <div className="mb-4">
                <h6>
                    <i className="bi bi-cpu-fill me-2"></i>
                    Particularidades da Visão Sagital
                </h6>
                <p>
                  As bolinhas de isopor, com diâmetro aproximado de 1,5 cm,
                  também devem ser fixadas sobre os pontos articulares com base
                  em cola quente e fita dupla face.
                </p>
                <p>
                  <strong>Projeções ósseas que deverão ser marcadas:</strong>{" "}
                  Acrômio direito, Cóccix, Epicôndilo lateral da ulna direita,
                  Espinha ilíaca ântero superior direita, Cabeça da ulna
                  direita, Trocânter maior do fêmur direito, Processo estilóide
                  do rádio direito, Epicôndilo lateral do fêmur direito,
                  Processo espinhoso C7, Maléolo lateral direito, Processo
                  espinhoso T7, Cabeça da fíbula direita e Processo espinhoso
                  L4.
                </p>
              </div>

              <p className="text-muted small"><center>© {new Date().getFullYear()} — Sistema computacional para avaliação postural mediante
                fotogrametria.</center>
              </p>
            </div>

            {/* Rodapé do modal */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Voltar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAvaliar}
              >
                Avaliar Postura
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
