import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
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
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setProcessedImageUrl(null);
    setClicks([]);
    setReferencia(null);
    setDistancias([]);
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
      setReferencia(distanciaPixels.toFixed(2));
      setClicks([]);

      if (imageFile) {
        sendImageToBackend(imageFile, distanciaPixels);
      }
    } else {
      setClicks(novoClick);
    }
  };

  const sendImageToBackend = async (file, referenciaPixels) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("referencia_pixels", referenciaPixels);

    try {
      const response = await axios.post("http://localhost:5000/process-image", formData);
      const { image, distancias } = response.data;
      setProcessedImageUrl(`data:image/jpeg;base64,${image}`);
      setDistancias(distancias);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
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
          href="/pacientes.css"
        />
      </Helmet>
      <div className="d-flex flex-column py-4 min-vh-100">
        <Header />
        <div
          className="page-title text-center text-dark"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/img/medititle.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px 0",
          }}
        >
          <h2 className="fw-bold">Avaliação Postural</h2>
        </div>

        {/* <div className="mb-3">
          <button onClick={() => navigate("/")} className="btn btn-primary me-2">
            Voltar para Pacientes
          </button>
          <button onClick={() => navigate("/cadastro")} className="btn btn-success me-2">
            Cadastrar Paciente
          </button>
          <button onClick={() => navigate("/cadastroMedico")} className="btn btn-success">
            Cadastrar Médico
          </button>
        </div> */}
        <div className="container my-5">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-4" />

          {imageUrl && !processedImageUrl && (
            <div className="container-avaliacao">
              <div className="imagem-box">
                <h4>Imagem Original (clique duas vezes para marcar 1 metro):</h4>
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Selecionada"
                  onDoubleClick={handleDoubleClick}
                  style={{ cursor: "crosshair" }}
                />
              </div>
            </div>
          )}

          {processedImageUrl && (
            <div className="container-avaliacao">
              <div className="imagem-box">
                <h4>Imagem Processada:</h4>
                <img src={processedImageUrl} alt="Processada" />
              </div>

              <div className="medicoes-box">
                <h4>Distâncias calculadas (cm):</h4>
                <ul className="list-group">
                  {distancias.map((d, i) => (
                    <li key={i} className="list-group-item">
                      {d.ponto1} ↔ {d.ponto2}: <strong>{d.distancia_cm} cm</strong>
                    </li>
                  ))}
                </ul>

                {referencia && (
                  <p className="mt-3">
                    Distância de referência: <strong>{referencia} pixels</strong> (1 metro)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
