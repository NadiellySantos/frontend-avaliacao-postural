import React, { useState, useRef } from 'react';
import axios from 'axios';

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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>PostureAI</h1>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2>Envie uma imagem para avaliação postural</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
        </section>

        {previewUrl && (
          <section style={styles.section}>
            <h3>Imagem Original:</h3>
            <img src={previewUrl} alt="Preview" style={styles.image} />
          </section>
        )}

        {processedImageUrl && (
          <section style={styles.section}>
            <h3>Imagem Processada (duplo clique para medir distância):</h3>
            <img
              src={processedImageUrl}
              alt="Processada"
              ref={imageRef}
              onDoubleClick={handleDoubleClick}
              style={{ ...styles.image, cursor: 'crosshair' }}
            />
            {distancia && (
              <p style={styles.resultado}>Distância medida: {distancia} pixels</p>
            )}
          </section>
        )}
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} PostureAI. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  logo: {
    margin: 0,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '90%',
    maxWidth: 700,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  fileInput: {
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: 15,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  resultado: {
    marginTop: 12,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 8,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  footer: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#2c3e50',
    color: '#fff',
    marginTop: 'auto',
  }
};

export default App;
