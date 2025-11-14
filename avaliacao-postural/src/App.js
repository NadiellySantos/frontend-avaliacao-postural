import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./header.js";
import Footer from "./footer.js";
import { Helmet } from "react-helmet";
import frontalImg from "./img/frontal.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [referencia, setReferencia] = useState(null);
  const [distancias, setDistancias] = useState([]);
  const [idFoto, setIdFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const previousObjectUrl = useRef(null);

  // 🔹 Zoom e Pan
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 1));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  useEffect(() => {
    return () => {
      if (previousObjectUrl.current) {
        URL.revokeObjectURL(previousObjectUrl.current);
      }
    };
  }, []);

  // 🔹 Inicializa e limpa tooltips ao atualizar distâncias
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltips = [...tooltipTriggerList].map(
      (el) =>
        new bootstrap.Tooltip(el, {
          trigger: "hover",
        })
    );

    return () => {
      tooltips.forEach((t) => t.dispose());
    };
  }, [distancias]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (previousObjectUrl.current) {
      URL.revokeObjectURL(previousObjectUrl.current);
    }

    const objUrl = URL.createObjectURL(file);
    previousObjectUrl.current = objUrl;

    setImageFile(file);
    setImageUrl(objUrl);
    setProcessedImageUrl(null);
    setClicks([]);
    setReferencia(null);
    setDistancias([]);
    setIdFoto(null);
  };

  // ✅ Double click: define distância de referência (1 metro)
  const handleDoubleClick = (event) => {
  if (!imageRef.current) return;

  const rect = imageRef.current.getBoundingClientRect();
  const img = imageRef.current;

  // Corrige influência do zoom
  const scaleX = img.naturalWidth / rect.width;
  const scaleY = img.naturalHeight / rect.height;

  // Coordenadas reais (independentes do zoom)
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const novoClick = [...clicks, { x, y }];

  if (novoClick.length === 2) {
    const dx = novoClick[1].x - novoClick[0].x;
    const dy = novoClick[1].y - novoClick[0].y;
    const distanciaPixels = Math.sqrt(dx * dx + dy * dy);
    setReferencia(Number(distanciaPixels.toFixed(2)));
    setClicks([]);

    if (imageFile) {
      sendImageToBackend(imageFile, distanciaPixels);
    }
  } else {
    setClicks(novoClick);
  }
};


  const sendImageToBackend = async (file, referenciaPixels) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("referencia_pixels", referenciaPixels);

    try {
      // NOVA LINHA (backend no Azure):
      const response = await axios.post("https://backend-avaliacao-postural-aff8edhhaqdegmb3.australiaeast-01.azurewebsites.net/process-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      const resp = response.data || {};
      const returnedImage = resp.image || resp.imagem || resp.img || null;
      const returnedDistancias = resp.distancias || [];
      const returnedIdFoto = resp.id_foto ?? resp.idFoto ?? resp.id ?? null;

      if (returnedImage) {
        setProcessedImageUrl(`data:image/jpeg;base64,${returnedImage}`);
      }
      setDistancias(returnedDistancias);
      setIdFoto(returnedIdFoto);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      alert("Erro ao processar imagem. Verifique o backend e o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pacientes - AlignMe</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Helmet>

      <div className="d-flex flex-column min-vh-100 avaliacao-frontal-root">
        <Header />

        <div className="avaliacao-frontal-container">
          <h2 className="titulo-frontal-principal">Avaliação Postural - Frontal</h2>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
            <p style={{ marginLeft: "20px" }}>Imagem exemplo.</p>
            <img src={frontalImg} alt="Exemplo Frontal" className="imagem-exemplo-frontal" />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control input-file-frontal"
          />

          {imageUrl && !processedImageUrl && (
            <div className="imagem-box-frontal">
              <h4 className="titulo-frontal-secundario">
                Imagem Original (clique duas vezes na régua: 1 metro)
              </h4>

              <div className="zoom-container">
                <div className="zoom-buttons">
                  <button onClick={zoomIn}>+</button>
                  <button onClick={zoomOut}>−</button>
                  <button onClick={resetZoom}>⟳</button>
                </div>

                <div
                  className="zoom-image-wrapper"
                  ref={wrapperRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    cursor: isDragging ? "grabbing" : "auto",
                    overflow: "auto",
                    position: "relative",
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    border: "1px solid #ccc",
                  }}
                >
                  <div
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      transformOrigin: "top left",
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={imageUrl}
                      alt="Selecionada"
                      onDoubleClick={handleDoubleClick}
                      style={{
                        display: "block",
                        width: "auto",
                        height: "auto",
                        userSelect: "none",
                        pointerEvents: "auto",
                      }}
                      draggable="false"
                    />

                    {clicks.map((ponto, i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          left: `${ponto.x}px`,
                          top: `${ponto.y}px`,
                          width: "10px",
                          height: "10px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          transform: "translate(-50%, -50%)",
                          pointerEvents: "auto",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {clicks.length > 0 && (
                <span className="badge-cliques-frontal">Cliques: {clicks.length}/2</span>
              )}
              {referencia !== null && (
                <p className="texto-referencia-frontal">
                  Referência (pixels): <strong>{referencia}</strong>
                </p>
              )}
            </div>
          )}

          {loading && <div className="spinner-frontal"></div>}

          {processedImageUrl && (
            <div className="container-avaliacao-frontal">
              <div className="imagem-box-frontal">
                <h4 className="titulo-frontal-secundario">Imagem Processada (Frontal)</h4>
                <img
                  src={processedImageUrl}
                  alt="Processada"
                  className="imagem-frontal-processada"
                />
              </div>

              <div className="medicoes-box-frontal">
                <h4 className="titulo-frontal-secundario">Distâncias calculadas (cm)</h4>
                <ul className="lista-medicoes-frontal">
                  {distancias && distancias.length > 0 ? (
                    distancias.map((d, i) => (
                      <li
                        key={i}
                        className="item-medicao-frontal"
                        data-bs-toggle={d.descricao ? "tooltip" : undefined}
                        data-bs-placement="top"
                        title={d.descricao || ""}
                      >
                        {d.ponto1} ↔ {d.ponto2}: <strong>{d.distancia_cm} cm</strong>
                      </li>
                    ))
                  ) : (
                    <li className="item-medicao-frontal">Nenhuma distância calculada.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="avaliacao-frontal-continue-btn"
              disabled={loading || processedImageUrl == null}
              onClick={() =>
                navigate(`/sagital/${id}`, {
                  state: {
                    paciente_id: id,
                    frontal: {
                      processedImageUrl,
                      distancias,
                    },
                  },
                })
              }
            >
              {loading ? "Processando..." : "Continuar para Sagital"}
            </button>

            <div className="texto-ajuda-frontal">
              {processedImageUrl == null && !loading && (
                <span>O botão será habilitado quando o processamento terminar.</span>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
