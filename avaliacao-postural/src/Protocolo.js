import React from "react";
import "./Protocolo.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Protocolo() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pacienteId = id;
  return (
    <>
           <Helmet>
                  <title>Cadastro de Avaliação - AlignMe</title>
                  <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                  />
                  <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
                  />
                  <link
                  rel="stylesheet"
                  href="/assets/css/main.css"
                  />
                   <link
                    rel="stylesheet"
                    href="/CadastroAvaliacao.css"
                    />
                  <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                  />
                  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          
                </Helmet>
        <div className="protocolo-container">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Voltar
            </button>
        <div className="protocolo-header">
            <h1>Procedimentos de Coleta</h1>
            <p>
            Os instrumentos de coleta foram elaborados com base no <strong>Protocolo SAPO de Avaliação Postural</strong>,
            utilizado pelo Laboratório de Biofísica (LoB), vinculado ao Departamento de Fisiologia do Instituto de
            Ciências Biomédicas (ICB) da <strong>Universidade de São Paulo (USP)</strong>. 
            Para o <strong>AlignMe</strong>, houve uma adaptação do protocolo com foco 
            nas vistas frontal (anterior) e sagital (lateral). 
            </p>
            <p>
                Para o devido funcionamento do sistema, é de suma importância que se siga os procedimentos aqui estabelecidos, 
                no momento da obtenção das imagens do paciente.
                Nas páginas de carregamento das mesmas, existem exemplos de fotografias de pacientes devidamente ajustados ao protocolo.
            </p>
        </div>

        <div className="protocolo-section">
            <h2>🎯 Procedimento necessário para ambas as visões</h2>
            <ul>
                <li>
                    A captura das imagens deve ocorrer em um ambiente com <strong>iluminação uniforme e fundo preto</strong>. 
                </li>
                <li>
                    A câmera de 200 megapixels, precisa estar posicionada a uma distância de aproximadamente <strong>1,7 metros </strong> 
                    do paciente, e a altura do dispositivo deve estar compatível ao centro de massa do participante, 
                    alinhada às vistas frontal e lateral. 
                </li>
                <li>
                    Ao lado do participante também é necessário conter uma <strong>régua de 1 metro</strong> de altura, para que 
                    o algoritmo realize uma comparação de pixel para centímetro.
                </li>
                <li>
                    O paciente deve ser posicionado em pé, descalços, em vestimenta justa, com braços relaxados ao longo do tronco 
                    e olhar direcionado para frente. 
                </li>
            </ul>
        </div>

        <div className="protocolo-section">
            <h2>🧠 Particularidades da Visão Frontal</h2>
            <p>
            As bolinhas de isopor de com diâmetro aproximado de 1,5 cm, devem ser fixadas sobre os pontos articulares por meio de uma base,
            sugere-se a utilização de cola quente para fazer a base do marcador e fita dupla face para prender ao corpo.
            </p>
            <ul>
            <li>
                <strong>Projeções ósseas que deverão ser marcadas</strong> — Acrômio direito, Espinha ilíaca ântero superior esquerda,
                 Acrômio esquerdo, Trocânter maior do fêmur direito, Cabeça da fíbula direita, Trocânter maior do fêmur esquerdo,
                 Cabeça da fíbula esquerda, Epicôndilo lateral do fêmur direito, Processo estilóide do rádio direito, 
                 Epicôndilo lateral do fêmur esquerdo, Processo estilóide do rádio esquerdo, Maléolo lateral direito,
                 Espinha ilíaca ântero superior direita e Maléolo lateral esquerdo.

            </li>
            </ul>
        </div>
        <div className="protocolo-section">
            <h2>⚙️ Particularidades da Visão Sagital</h2>
            <p>
            As bolinhas de isopor de com diâmetro aproximado de 1,5 cm, devem ser fixadas sobre os pontos articulares por meio de uma base,
            sugere-se a utilização de cola quente para fazer a base do marcador e fita dupla face para prender ao corpo.
            </p>
            <ul>
            <li>
                <strong>Projeções ósseas que deverão ser marcadas</strong> — Acrômio direito, Cóccix, Epicôndilo lateral da ulna direita,
                 Espinha ilíaca ântero superior direita, Cabeça da ulna direita, Trocânter maior do fêmur direito, 
                 Processo estilóide do rádio direito, Epicôndilo lateral do fêmur direito, Processo espinhoso C7, Maléolo lateral direito,
                 Processo espinhoso T7, Cabeça da fíbula direita e Processo espinhoso L4.
            </li>
            </ul>
        </div>

        <div className="protocolo-section">
         <button
              className="btn btn-primary"
              onClick={() => navigate(`/avaliar/${pacienteId}`)}
              style={{ marginBottom: "20px" }}
          >   
              Avaliar Postura
          </button>
          </div>
            <div className="protocolo-footer">
                <p>
                © {new Date().getFullYear()} — Sistema de Avaliação Postural por
                Fotogrametria e Visão Computacional.
                </p>
            </div>
        </div>
    </>
  );
}
