# 🧍‍♀️🧍‍♂️ Frontend — Sistema computacional para avaliação postural mediante fotogrametria

Este repositório contém o **frontend web** do sistema de avaliação postural **AlignMe**.  
A aplicação foi desenvolvida em **React** e consome os serviços do backend em Python (FastAPI) para:

- Upload e processamento de imagens (vista frontal e sagital)
- Cálculo de distâncias e ângulos posturais
- Cadastro e listagem de médicos
- Cadastro e listagem de pacientes
- Login de médicos
- Registro de avaliações
- Consulta de histórico de avaliações por paciente
- Exibição de informações sobre o protocolo de avaliação e sobre o sistema

---

## 📁 Estrutura do Projeto
 ```bash
frontend-avaliacao-postural/
└── avaliacao-postural/
    ├── package.json
    ├── package-lock.json
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    │   └── manifest.json
    │
    └── src/
        ├── index.js                       # Ponto de entrada do React
        ├── App.js                         # Avaliação frontal
        ├── Sagital.js                     # Avaliação sagital
        │
        ├── CadastroPaciente.js            # Formulário de cadastro de paciente
        ├── CadastroMedico.js              # Formulário de cadastro de médico
        ├── CadastroAvaliacao.js           # Registro de avaliações
        │
        ├── Login.js                       # Tela de login
        ├── PesquisaHistoricoPaciente.js   # Busca por CPF
        ├── historico.js                   # Exibição do histórico completo
        ├── pacientes.js                   # Listagem de pacientes
        ├── medicos.js                     # Listagem de médicos
        │
        ├── Sobre.js                       # Página informativa
        ├── Protocolo.js                   # Protocolo de avaliação postural
        ├── LgpdModal.js                   # Modal de consentimento LGPD
        │
        ├── header.js                      # Navbar padrão
        ├── headerFisioterapeutas.js       # Navbar para fisioterapeutas/médicos
        ├── headerPacientes.js             # Navbar para pacientes
        ├── footer.js                      # Rodapé
        │
        ├── App.css
        ├── index.css
        ├── login.css
        ├── pacientes.css
        ├── Sagital.css
        ├── Protocolo.css
        ├── Sobre.css
        │
        ├── img/                           # Imagens usadas na interface
        │   ├── frontal.png (ou jpg)
        │   ├── sagital.png
        │   ├── logos, ícones, etc.
        └──
 ```

---

## 🛠️ Tecnologias Utilizadas

- **React** (Create React App)
- **React Router DOM** — gerenciamento de rotas
- **Axios** — consumo de APIs do backend
- **React Helmet** — controle de `<title>` e metadados
- **Bootstrap 5** — layout e componentes
- **CSS modularizado** — estilos por tela

### Integração com o Backend

Todas as chamadas de API são feitas diretamente para:

```text
https://backend-alignme.azurewebsites.net
```

**Endpoints utilizados incluem:**
- POST /login
- POST /cadastrar-medico
- POST /cadastrar-paciente
- GET /listar-medicos
- POST /process-image (avaliação frontal)
- POST /process-image-sagital (avaliação sagital)
- POST /cadastrar-avaliacao
- POST /listar-avaliacao (buscar avaliações por CPF)
- GET /historico/{id_paciente} (histórico completo do paciente)

---

## ⚙️ Como Executar o Frontend

1. Navegar até a pasta do projeto React
```bash
cd frontend-avaliacao-postural/avaliacao-postural
```

2. Instalar dependências
```bash
npm install
```
Certifique-se de ter Node.js (versão LTS) instalado.

3. Rodar em modo de desenvolvimento
```bash
npm start
```

A aplicação ficará disponível em:

```bash
[cd frontend-avaliacao-postural/avaliacao-postural](http://localhost:3000)
```

4. Gerar build de produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta build/.

---

## 🌐 Rotas Principais da Aplicação

O roteamento é definido em **src/index.js** usando BrowserRouter, Routes e Route.

🔑 Autenticação e Usuários
- /login
  Tela de login do médico.
    - Envia email e senha para POST /login no backend.
    - Em caso de sucesso, redireciona para /pacientes.

- /cadastroMedico
  Cadastro de médico, com validação de CPF, senha forte e demais dados profissionais.
    - Usa POST /cadastrar-medico.

### 👥 Pacientes
- /cadastro
  Tela de cadastro de paciente.
    - Envia os dados para POST /cadastrar-paciente.

- /pacientes
  Tela de listagem de pacientes cadastrados.
    - Consome endpoint de listagem de pacientes (via backend).

### 📷 Avaliação Postural
- /avaliar/:id
  Tela de avaliação frontal (App.js):
    - Upload de imagem frontal do paciente
    - Seleção de referência em pixels para 100 cm
    - Envio da imagem para o backend:

  ```bash
  axios.post("https://backend-alignme.azurewebsites.net/process-image", formData, { ... })
  ```
    - Exibe a imagem processada com malha e linhas, além da lista de distâncias calculadas.

- /sagital/:id
  Tela de avaliação sagital (Sagital.js):
    - Upload de imagem lateral
    - Seleção de dois pontos de referência (régua na foto)
    - Envio para:
      
  ```bash
  axios.post("https://backend-alignme.azurewebsites.net/process-image-sagital", formData, { ... })
  ```
  - Exibe imagem processada, distâncias e ângulos calculados.

- /cadastrar-avaliacao
  Tela de cadastro de avaliação (CadastroAvaliacao.js):
    - Recebe via location.state:
        - id_paciente
        - imagens frontal/sagital em base64
        - medidas e ângulos retornados pelo backend

    - Permite:
      - inserir altura, texto de avaliação, data

    - Envia tudo para:

  ```bash
  axios.post("https://backend-alignme.azurewebsites.net/cadastrar-avaliacao", dadosEnvio)
  ```

### 📜 Histórico e Consulta

- /listar-avaliacao
  Tela de pesquisa de histórico por CPF (PesquisaHistoricoPaciente.js):
    - Envia CPF limpado (apenas dígitos) para:

  ```bash
  axios.post("https://backend-alignme.azurewebsites.net/listar-avaliacao", { cpf: ... })
  ```
    - Redireciona para /historico com os resultados.

- /historico
  Tela de exibição do histórico (historico.js):
    - Pode usar dados vindos da navegação (location.state) ou carregar via:

  ```bash
  axios.get(`https://backend-alignme.azurewebsites.net/historico/${pacienteId}`)
  ```

### 📄 Páginas Informativas

- /sobre
  Página com informações sobre o sistema AlignMe, objetivos, equipe, etc. (Sobre.js).

- /protocolo/:id
  Página explicando o protocolo de avaliação postural adotado (Protocolo.js).

---

## 🔐 LGPD e Privacidade

O frontend conta com:

  - LgpdModal.js — um modal para exibição de informações de consentimento, termos e LGPD.
  - Integração com as páginas principais para garantir que o usuário tenha ciência do uso das imagens e dados.

---

## 🎨 Layout e Componentização

**Componentes de Layout**

  - header.js / headerFisioterapeutas.js / headerPacientes.js
    - Cabeçalhos reutilizáveis com navegação entre páginas.
  - footer.js
    - Rodapé comum a todas as telas.

**Estilos**

  - App.css, index.css, login.css, pacientes.css, Sagital.css, Protocolo.css, Sobre.css
  - Integração com **Bootstrap 5** via CDN (em várias telas usando <Helmet>).

---

## 🔗 Integração com o Backend

Atualmente, o backend está publicado em:

```bash
  [axios.get(`https://backend-alignme.azurewebsites.net/historico/${pacienteId}`)](https://backend-alignme.azurewebsites.net)
```

---

## 👥 Autores

  - **Claudia Galindo Santos**
  - **Mayara Silva Azevedo**
  - **Nadiélly Oliveira Santos**
  
---

## Projeto desenvolvido para o Trabalho de Conclusão de Curso em Engenharia da Computação, na Faculdade Engenheiro Salvador Arena - 2025.
