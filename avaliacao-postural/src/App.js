import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="container" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Avaliação Postural</h2>

    {/* BOTÃO VOLTAR */}
    <button
      onClick={() => navigate("/")}
      style={{
        marginBottom: "10px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      Voltar para Pacientes
    </button>


      {/* BOTÃO PARA CADASTRO */}
      <button
        onClick={() => navigate("/cadastro")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Cadastrar Paciente
      </button>

       {/* BOTÃO PARA CADASTRO DE MEDICO*/}
      <button
        onClick={() => navigate("/cadastroMedico")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Cadastrar Médico
      </button>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imageUrl && !processedImageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Imagem Original (clique duas vezes para marcar 1 metro):</h4>
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Selecionada"
            onDoubleClick={handleDoubleClick}
            style={{ maxWidth: "100%", cursor: "crosshair", transition: "opacity 0.3s ease" }}
          />
        </div>
      )}

      {processedImageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Imagem Processada:</h4>
          <img
            src={processedImageUrl}
            alt="Processada"
            style={{ maxWidth: "100%", border: "1px solid #ccc" }}
          />
        </div>
      )}

      {referencia && (
        <p style={{ marginTop: "10px" }}>
          Distância de referência: <strong>{referencia} pixels</strong> (1 metro)
        </p>
      )}

      {distancias.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Distâncias calculadas (cm):</h4>
          <ul>
            {distancias.map((d, i) => (
              <li key={i}>
                {d.ponto1} ↔ {d.ponto2}: <strong>{d.distancia_cm} cm</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
