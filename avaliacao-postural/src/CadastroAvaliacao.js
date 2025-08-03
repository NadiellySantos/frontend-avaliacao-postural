import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroAvaliacao = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id_foto: "",
        cpf: "",
        altura: "",
        resultado_avaliacao: "",
        data_avaliacao: ""
    });

    const [mensagem, setMensagem] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/avaliacao-medica",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setMensagem("Avaliação cadastrada com sucesso!");
            console.log(response.data);
            navigate("/index");
        } catch (error) {
            console.error("Erro ao cadastrar avaliação:", error.response?.data || error.message);
            setMensagem("Erro ao cadastrar avaliação. Verifique os dados.");
        }
    };

    const handleVoltar = () => {
        navigate("/");
    };

    return (
        <div className="avaliacao-container">
            <h2>Cadastro de Avaliação Médica</h2>

            <button onClick={handleVoltar} type="button">
                Voltar
            </button>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id_foto">ID da Foto:</label>
                    <input
                        type="number"
                        id="id_foto"
                        name="id_foto"
                        value={formData.id_foto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="altura">Altura (cm):</label>
                    <input
                        type="number"
                        step="0.01"
                        id="altura"
                        name="altura"
                        value={formData.altura}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="resultado_avaliacao">Resultado da Avaliação:</label>
                    <textarea
                        id="resultado_avaliacao"
                        name="resultado_avaliacao"
                        value={formData.resultado_avaliacao}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="data_avaliacao">Data da Avaliação:</label>
                    <input
                        type="date"
                        id="data_avaliacao"
                        name="data_avaliacao"
                        value={formData.data_avaliacao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>

            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CadastroAvaliacao;
