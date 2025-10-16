import React, { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./Sagital.css";
import Header from "./header.js";
import Footer from "./footer.js";
import { Helmet } from "react-helmet";
import sagitalImg from "./img/sagital.jpg";

const Sagital = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dadosFrontal = location.state?.frontal;
  const pacienteId = location.state?.paciente_id;

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [distancias, setDistancias] = useState([]);
  const [angulos, setAngulos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Controle de zoom e pan
  const imageRef = useRef(null);
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
    if (!isDragging) return;
    setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setProcessedImageUrl(null);
    setClicks([]);
    setDistancias([]);
    setAngulos([]);
  };

  const handleDoubleClick = (event) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const novoClick = [...clicks, { x, y }];

    if (novoClick.length === 2) {
      if (imageFile) sendImageToBackend(imageFile, novoClick);
      setClicks([]);
    } else {
      setClicks(novoClick);
    }
  };

  const sendImageToBackend = async (file, clicks) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ref_x1", clicks[0].x);
    formData.append("ref_y1", clicks[0].y);
    formData.append("ref_x2", clicks[1].x);
    formData.append("ref_y2", clicks[1].y);
    formData.append("referencia_metros", 1.0);

        try {
            const response = await axios.post(
                "http://localhost:5000/process-image-sagital",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    timeout: 60000,
                }
            );
            const { image, distancias, angulos } = response.data;

            const processedImageBase64 = `data:image/jpeg;base64,${image}`;
            setProcessedImageUrl(processedImageBase64);
            setDistancias(distancias);
            setAngulos(angulos);
        } catch (err) {
            console.error("Erro ao enviar imagem:", err);
            alert("Erro ao processar imagem sagital");
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        navigate("/cadastrar-avaliacao", {
            state: {
                paciente_id: pacienteId,
                frontal: dadosFrontal,
                sagital: {
                    imagem: processedImageUrl,
                    distancias: distancias,
                    angulos: angulos
                },
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>Avaliação Sagital - AlignMe</title>
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
                href="/Sagital.css"
                />
            </Helmet>

            <div className="d-flex flex-column min-vh-100 avaliacao-frontal-root">
                <Header />

        <div className="avaliacao-sagital-container">
          <div className="page-title-frontal text-center">
            <h2 className="titulo-sagital-principal">Avaliação Postural - Sagital</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
            <p style={{ marginLeft: "20px" }}>Imagem exemplo.</p>
            <img src={sagitalImg} alt="Exemplo Sagital" className="imagem-exemplo-sagital" />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control input-file-sagital"
          />

          {imageUrl && !processedImageUrl && (
            <div className="imagem-box-sagital">
              <h4 className="titulo-sagital-secundario">
                Imagem Original{" "}
                {clicks.length > 0 && (
                  <span className="badge-cliques-sagital">Cliques: {clicks.length}/2</span>
                )}
              </h4>
              <p className="texto-ajuda-sagital">
                Clique duas vezes na régua: início e fim de 1 metro
              </p>

              <div className="zoom-container">
                <div className="zoom-buttons">
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>−</button>
                    <button onClick={resetZoom}>⟳</button>
                </div>

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
            // 👇 Aqui o cursor só muda enquanto arrasta
            style={{
            cursor: isDragging ? "grabbing" : "auto",
            }}
        >
            <img
            ref={imageRef}
            src={imageUrl}
            alt="Imagem sagital selecionada"
            onDoubleClick={handleDoubleClick}
            className="imagem-sagital-selecionada"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.3s ease",
                transformOrigin: "center center",
                userSelect: "none",
                pointerEvents: "auto", // evita interferência da imagem
            }}
            draggable="false"
            />
        </div>
        </div>
            </div>
            </div>
          )}

          {loading && <div className="spinner-sagital"></div>}

          {processedImageUrl && (
            <div className="container-avaliacao-sagital">
              <div className="imagem-box-sagital">
                <h4 className="titulo-sagital-secundario">Imagem Processada (Sagital)</h4>
                <img
                  src={processedImageUrl}
                  alt="Imagem sagital processada"
                  className="imagem-sagital-processada"
                />
              </div>

              <div className="medicoes-box-sagital">
                <h4 className="titulo-sagital-secundario">Distâncias calculadas (cm)</h4>
                <ul className="lista-medicoes-sagital">
                  {distancias && distancias.length > 0 ? (
                    distancias.map((d, i) => (
                      <li key={i} className="item-medicao-sagital">
                        {d.ponto1} ↔ {d.ponto2}: <strong>{d.distancia_cm} cm</strong>
                      </li>
                    ))
                  ) : (
                    <li className="item-medicao-sagital">Nenhuma distância calculada.</li>
                  )}
                </ul>
              </div>

              <div className="medicoes-box-sagital">
                <h4 className="titulo-sagital-secundario">Ângulos calculados (°)</h4>
                <ul className="lista-medicoes-sagital">
                  {angulos && angulos.length > 0 ? (
                    angulos.map((a, i) => (
                      <li key={i} className="item-medicao-sagital">
                        {a.nome}: <strong>{a.angulo_graus}°</strong>
                      </li>
                    ))
                  ) : (
                    <li className="item-medicao-sagital">Nenhum ângulo calculado.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <button
            className="avaliacao-sagital-continue-btn"
            disabled={loading || !processedImageUrl}
            onClick={handleContinue}
          >
            {loading ? "Processando..." : "Continuar para Cadastro de Avaliação"}
          </button>

          <div className="texto-ajuda-sagital">
            {!processedImageUrl && !loading && (
              <span>O botão será habilitado quando o processamento terminar.</span>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Sagital;
