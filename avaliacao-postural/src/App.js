import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [distancia, setDistancia] = useState(null);

  const imageRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      await sendImageToBackend(file);
    }
  };

  const sendImageToBackend = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/process-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(imageUrl);
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
    }
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
      setDistancia(distanciaPixels.toFixed(2));
      setClicks([]);
    } else {
      setClicks(novoClick);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Avaliação Postural</h1>
      </header>

      <main className="main">
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {previewUrl && (
          <div className="preview-section">
            <h3>Imagem Original</h3>
            <img src={previewUrl} alt="Preview" className="preview" />
          </div>
        )}

        {processedImageUrl && (
          <div className="processed-section">
            <h3>Imagem Processada</h3>
            <div className="image-container">
              <img
                src={processedImageUrl}
                alt="Processada"
                ref={imageRef}
                onDoubleClick={handleDoubleClick}
                className="processed"
              />
            </div>
            {distancia && (
              <p className="distancia">Distância medida: {distancia} pixels</p>
            )}
          </div>
        )}
      </main>

      <footer className="footer">© 2025 Avaliação Postural</footer>
    </div>
  );
}

export default App;
