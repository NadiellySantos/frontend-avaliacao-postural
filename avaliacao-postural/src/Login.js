import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        senha: ""
    });

    const [mensagem, setMensagem] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/login",
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setMensagem("Login realizado com sucesso!");
            console.log(response.data);
            // Redirecionar para a página principal ou dashboard
            navigate("/index");
        } catch (error) {
            console.error("Erro ao realizar login:", error.response?.data || error.message);
            setMensagem("Erro ao realizar login. Verifique suas credenciais.");
        }
    };

    const handleVoltar = () => {
    navigate("/");
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <button onClick={handleVoltar} type="button">
                Voltar
            </button>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={credentials.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    ); 
};

export default Login;