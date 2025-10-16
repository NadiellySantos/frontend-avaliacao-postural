import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./header.js";
import Footer from "./footer.js";
import { Helmet } from "react-helmet";
import frontalImg from "./img/frontal.jpg";

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

  const handleDoubleClick = (event) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
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
      const response = await axios.post("http://localhost:5000/process-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      const resp = response.data || {};
      const returnedImage = resp.image || resp.imagem || resp.img || null;
      const returnedDistancias = resp.distancias || resp.distances || resp.medicoes || [];
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
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/App.css" />
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

              {/* ✅ Contêiner com zoom e pan */}
              <div className="zoom-container">
                <div className="zoom-buttons">
                  <button onClick={zoomIn}>+</button>
                  <button onClick={zoomOut}>−</button>
                  <button onClick={resetZoom}>⟳</button>
                </div>

                <div
                  className="zoom-image-wrapper"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  // 👇 Cursor fica seta normal e só vira "grabbing" enquanto arrasta
                  style={{
                    cursor: isDragging ? "grabbing" : "auto",
                  }}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Selecionada"
                    onDoubleClick={handleDoubleClick}
                    className="imagem-frontal-selecionada"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      transition: isDragging ? "none" : "transform 0.3s ease",
                      transformOrigin: "center center",
                      userSelect: "none",
                      pointerEvents: "auto",
                    }}
                    draggable="false"
                  />
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
                <img src={processedImageUrl} alt="Processada" className="imagem-frontal-processada" />
              </div>

              <div className="medicoes-box-frontal">
                <h4 className="titulo-frontal-secundario">Distâncias calculadas (cm)</h4>
                <ul className="lista-medicoes-frontal">
                  {distancias && distancias.length > 0 ? (
                    distancias.map((d, i) => (
                      <li key={i} className="item-medicao-frontal">
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
