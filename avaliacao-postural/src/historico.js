import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "./header";
import Footer from "./footer";

const Historico = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pacienteId = location.state?.paciente_id;

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pacienteId) {
      setLoading(false);
      return;
    }

    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get(`https://backend-alignme.azurewebsites.net/historico/${pacienteId}`);
        setAvaliacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        alert("Erro ao buscar histórico de avaliações.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, [pacienteId]);
  


  if (!pacienteId) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>Histórico de Avaliações</h2>
        <p>Nenhum paciente selecionado.</p>
        <button
          className="btn btn-primary"
          //onClick={() => navigate(`/avaliar/${pacienteId}`)}
          onClick={() => navigate(`/protocolo/${pacienteId}`)}
        >
          Avaliar Postura
        </button>
        
      </div>
    );
  }

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
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container mt-4" style={{ fontFamily: "Arial" }}>
          <h2 className="text-center mb-4">Histórico de Avaliações do Paciente</h2>
          <button
              className="btn btn-primary"
              //onClick={() => navigate(`/avaliar/${pacienteId}`)}
              onClick={() => navigate(`/protocolo/${pacienteId}`)}
              style={{ marginBottom: "20px" }}
          >   
              Avaliar Postura
          </button> 
          {loading ? (
            <p>Carregando avaliações...</p>
          ) : avaliacoes.length === 0 ? (
            <p>Este paciente ainda não possui avaliações cadastradas.</p>
          ) : (
            <div className="accordion" id="accordionHistorico">
              {avaliacoes.map((h, index) => (
                <div className="accordion-item mb-2" key={h.id_avaliacao}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      📅 {h.data_avaliacao} — Resultado:{" "}
                      <strong style={{ marginLeft: "5px" }}>
                        {h.resultado_avaliacao || "—"}
                      </strong>
                    </button>
                  </h2>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionHistorico"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>Altura:</strong> {h.altura || "—"} cm
                      </p>

                      <div
                        className="row"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "20px",
                          marginTop: "15px",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "colunm" }}>
                          {/* IMAGEM FRONTAL */}
                          <div className="col-md-6">
                            <h5>Vista Frontal</h5>
                            {h.foto_frontal ? (
                              <img
                                src={
                                  h.foto_frontal.startsWith("data:image")
                                    ? h.foto_frontal
                                    : `data:image/png;base64,${h.foto_frontal}`
                                }
                                alt="Frontal"
                                className="img-fluid rounded border"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "300px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <p>Nenhuma vista frontal disponível.</p>
                            )}

                            <h6 className="mt-3">📏 Medidas Frontais:</h6>
                            {Array.isArray(h.medidas_frontal) &&
                            h.medidas_frontal.length > 0 ? (
                              <ul style={{ fontSize: "0.9rem" }}>
                                {h.medidas_frontal.map((m, i) => (
                                  <li key={i}>
                                    {m.ponto1} ↔ {m.ponto2}:{" "}
                                    <strong>{m.distancia_cm} cm</strong>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>Nenhuma medida frontal registrada.</p>
                            )}
                          </div>

                          {/* IMAGEM SAGITAL */}
                          <div className="col-md-6">
                            <h5>Vista Sagital</h5>
                            {h.foto_sagital ? (
                              <img
                                src={
                                  h.foto_sagital.startsWith("data:image")
                                    ? h.foto_sagital
                                    : `data:image/png;base64,${h.foto_sagital}`
                                }
                                alt="Sagital"
                                className="img-fluid rounded border"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "300px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <p>Nenhuma vista sagital disponível.</p>
                            )}                            
                            {Array.isArray(h.angulos_sagital) && h.angulos_sagital.length > 0 ? (
                              <>
                                <h6 className="mt-3">🧭 Ângulos Sagitais:</h6>
                                <ul style={{ fontSize: "0.9rem" }}>
                                  {h.angulos_sagital.map((a, i) => (
                                    <li key={i}>
                                      {a.nome}: {" "}
                                      <strong>{a.angulo_graus !== undefined ? a.angulo_graus.toFixed(2) : "—"}°</strong>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <p>Nenhum ângulo sagital registrado.</p>
                            )}
                            <h6 className="mt-3">📐 Medidas Sagitais:</h6>
                            {Array.isArray(h.medidas_sagital) &&
                            h.medidas_sagital.length > 0 ? (
                              <ul style={{ fontSize: "0.9rem" }}>
                                {h.medidas_sagital.map((m, i) => (
                                  <li key={i}>
                                    {m.ponto1} ↔ {m.ponto2}:{" "}
                                    <strong>{m.distancia_cm} cm</strong>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>Nenhuma medida sagital registrada.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Historico;
