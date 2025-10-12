import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css"; // ✅ MUDOU AQUI
import Header from "./header.js";
import Footer from "./footer.js";
import { Helmet } from "react-helmet";

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

      console.log("Resposta do backend:", response.data);

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
        <link
          rel="stylesheet"
          href="/assets/css/main.css"
        />
        <link
          rel="stylesheet"
          href="/App.css"
        />
      </Helmet>

      {/* ✅ MUDANÇAS NAS CLASSES AQUI */}
      <div className="d-flex flex-column min-vh-100 avaliacao-frontal-root">
        <Header />

        <div className="avaliacao-frontal-container">
          <h2 className="titulo-frontal-principal">Avaliação Postural - Frontal</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control input-file-frontal"
          />

          {imageUrl && !processedImageUrl && (
            <div className="imagem-box-frontal">
              <h4 className="titulo-frontal-secundario">Imagem Original (clique duas vezes na régua: 1 metro)</h4>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Selecionada"
                onDoubleClick={handleDoubleClick}
                className="imagem-frontal-selecionada"
              />
              {clicks.length > 0 && (
                <span className="badge-cliques-frontal">Cliques: {clicks.length}/2</span>
              )}
              {referencia !== null && (
                <p className="texto-referencia-frontal">Referência (pixels): <strong>{referencia}</strong></p>
              )}
            </div>
          )}

          {loading && (
            <div className="spinner-frontal"></div>
          )}

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
              {processedImageUrl == null && !loading && <span>O botão será habilitado quando o processamento terminar.</span>}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;