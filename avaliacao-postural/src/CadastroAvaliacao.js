import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./cadastroAvaliacao.css";
import Header from "./header.js";
import Footer from "./footer.js";
import { Helmet } from "react-helmet";

const CadastroAvaliacao = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pacienteId = location.state?.paciente_id;
  const frontal = location.state?.frontal;
  const sagital = location.state?.sagital;

  const [formData, setFormData] = useState({
    id_paciente: "",
    foto_frontal: "",
    foto_sagital: "",
    medidas_frontal: "",
    medidas_sagital: "",
    //cpf: "",
    altura: "",
    resultado_avaliacao: "",
    data_avaliacao: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pacienteId) {
      setFormData((prev) => ({
        ...prev,
        id_paciente: pacienteId,
      }));
    }

    if (frontal && sagital) {
      setFormData((prev) => ({
        ...prev,
        foto_frontal: frontal.processedImageUrl || frontal.imagem || "",
        foto_sagital: sagital.imagem || sagital.processedImageUrl || "",
        medidas_frontal: JSON.stringify(frontal.distancias || []),
        medidas_sagital: JSON.stringify(sagital.distancias || []),
      }));
    }
  }, [pacienteId, frontal, sagital]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dadosEnvio = {
        id_paciente: formData.id_paciente,
        foto_frontal: formData.foto_frontal,
        foto_sagital: formData.foto_sagital,
        medidas_frontal: formData.medidas_frontal,
        medidas_sagital: formData.medidas_sagital,
        //cpf: formData.cpf,
        altura: formData.altura ? parseInt(formData.altura) : null,
        resultado_avaliacao: formData.resultado_avaliacao,
        data_avaliacao: formData.data_avaliacao,
      };

      console.log("Enviando dados:", dadosEnvio);

      const response = await axios.post(
        "http://localhost:8000/avaliacao-medica", 
        dadosEnvio, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      alert("Avaliação cadastrada com sucesso!");
      navigate("/index");
    } catch (error) {
      console.error("Erro ao cadastrar avaliação:", error);
      alert("Erro ao cadastrar avaliação. Verifique os dados e o console para mais informações.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Avaliação - AlignMe</title>
      </Helmet>

      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <div className="cadastro-avaliacao-container">
            <div className="card-avaliacao">
              <div className="card-header-avaliacao">
                <h2>Cadastro de Avaliação Médica</h2>
              </div>

              <div className="card-body-avaliacao">
                {/* ✅ NOVO LAYOUT: IMAGENS LADO A LADO COM MEDIDAS ABAIXO */}
                <div className="container-imagens-medidas">
                  {/* Coluna Frontal */}
                  <div className="coluna-imagem-medidas">
                    <div className="container-imagem">
                      <h5>Imagem Frontal Processada</h5>
                      {formData.foto_frontal ? (
                        <img 
                          src={formData.foto_frontal} 
                          alt="Frontal processada" 
                          className="imagem-avaliacao"
                        />
                      ) : (
                        <p className="texto-ajuda-avaliacao">Nenhuma imagem disponível</p>
                      )}
                    </div>
                    
                    <div className="container-medidas">
                      <h5>Medidas Frontal</h5>
                      {frontal?.distancias ? (
                        <ul className="lista-medidas">
                          {frontal.distancias.map((medida, index) => (
                            <li key={index} className="item-medida">
                              <small>
                                {medida.ponto1} ↔ {medida.ponto2}: 
                                <strong> {medida.distancia_cm} cm</strong>
                              </small>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="texto-ajuda-avaliacao">Nenhuma medida disponível</p>
                      )}
                    </div>
                  </div>

                  {/* Coluna Sagital */}
                  <div className="coluna-imagem-medidas">
                    <div className="container-imagem">
                      <h5>Imagem Sagital Processada</h5>
                      {formData.foto_sagital ? (
                        <img 
                          src={formData.foto_sagital} 
                          alt="Sagital processada" 
                          className="imagem-avaliacao"
                        />
                      ) : (
                        <p className="texto-ajuda-avaliacao">Nenhuma imagem disponível</p>
                      )}
                    </div>
                    
                    <div className="container-medidas">
                      <h5>Medidas Sagital</h5>
                      {sagital?.distancias ? (
                        <ul className="lista-medidas">
                          {sagital.distancias.map((medida, index) => (
                            <li key={index} className="item-medida">
                              <small>
                                {medida.ponto1} ↔ {medida.ponto2}: 
                                <strong> {medida.distancia_cm} cm</strong>
                              </small>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="texto-ajuda-avaliacao">Nenhuma medida disponível</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ✅ FORMULÁRIO COM CAMPOS DISTRIBUÍDOS PROPORCIONALMENTE */}
                <form onSubmit={handleSubmit} className="form-avaliacao">
                  {/* Primeira linha - ID Paciente e Data */}
                  <div className="linha-formulario">
                    <div className="campo-formulario">
                      <label>ID do Paciente:</label>
                      <input 
                        type="text" 
                        value={formData.id_paciente} 
                        readOnly 
                      />
                    </div>

                    <div className="campo-formulario">
                      <label>Data da Avaliação:</label>
                      <input 
                        type="date" 
                        name="data_avaliacao"
                        value={formData.data_avaliacao} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  {/* Segunda linha - CPF e Altura */}
                  <div className="linha-formulario">

                    <div className="campo-formulario">
                      <label>Altura (cm):</label>
                      <input 
                        type="number" 
                        name="altura"
                        value={formData.altura} 
                        onChange={handleChange} 
                        placeholder="175"
                        min="100"
                        max="250"
                      />
                    </div>
                  </div>

                  {/* Terceira linha - Resultado (ocupa linha inteira) */}
                  <div className="linha-formulario">
                    <div className="campo-formulario campo-texto-grande">
                      <label>Resultado da Avaliação:</label>
                      <textarea 
                        name="resultado_avaliacao"
                        value={formData.resultado_avaliacao} 
                        onChange={handleChange} 
                        placeholder="Descreva os resultados da avaliação postural..."
                      />
                    </div>
                  </div>

                  {/* Campos ocultos */}
                  <input type="hidden" name="foto_frontal" value={formData.foto_frontal} />
                  <input type="hidden" name="foto_sagital" value={formData.foto_sagital} />
                  <input type="hidden" name="medidas_frontal" value={formData.medidas_frontal} />
                  <input type="hidden" name="medidas_sagital" value={formData.medidas_sagital} />

                  {/* Botões */}
                  <div className="botoes-avaliacao">
                    <button 
                      type="button" 
                      className="btn-voltar-avaliacao"
                      onClick={handleBack}
                    >
                      Voltar
                    </button>
                    <button 
                      type="submit" 
                      className="btn-submit-avaliacao"
                      disabled={loading}
                    >
                      {loading ? "Cadastrando..." : "Cadastrar Avaliação"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CadastroAvaliacao;