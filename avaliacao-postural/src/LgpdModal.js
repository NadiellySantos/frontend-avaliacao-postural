// components/LgpdModal.js
import React, { useState } from "react";

const LgpdModal = ({ show, onClose, onConfirm, patientName }) => {
  const [accepted, setAccepted] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setScrolledToBottom(isBottom);
  };

  const handleConfirm = () => {
    if (accepted) {
      onConfirm();
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary">
              Termo de Uso e Política de Privacidade
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {patientName && (
              <div className="alert alert-info mb-3">
                <strong>Paciente:</strong> {patientName}
              </div>
            )}

            <div 
              onScroll={handleScroll}
              style={{
                height: '400px',
                overflow: 'auto',
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                marginBottom: '1rem'
              }}
            >
              {/* Seu texto LGPD completo aqui - mantive igual ao que você forneceu */}
              <p className="mb-3">
                <strong>TERMO DE USO E POLÍTICA DE PRIVACIDADE – SISTEMA ALIGNME</strong>
              </p>

              <p className="mb-3">
                Sistema Computacional de Análise Postural por Fotogrametria
              </p>

              <p className="mb-3">
                O presente Termo de Uso e Política de Privacidade disciplina a utilização do AlignMe, sistema computacional destinado à análise postural mediante fotogrametria, observadas a legislação brasileira aplicável, especialmente a Lei nº 13.709/2018 (LGPD), o Código de Defesa do Consumidor (CDC) e as normas do Sistema COFFITO/CREFITOs.
              </p>

              <p className="mb-3">
                Ao utilizar o AlignMe, o(a) fisioterapeuta declara ter lido e compreendido as condições deste Termo e concorda com sua aplicação.
              </p>

              <div>
                <strong>1. Responsabilidade do Fisioterapeuta pela Obtenção do Consentimento</strong>
                <br /><br />
                1.1. Nos termos da LGPD e das normas éticas da fisioterapia, especialmente a Resolução COFFITO nº 424/2013, o(a) fisioterapeuta é responsável por informar o paciente de forma clara, completa e adequada sobre:
                <br />
                I – o procedimento de avaliação postural por fotogrametria;
                <br />
                II – a captura, o tratamento e o armazenamento de imagens e dados sensíveis;
                <br />
                III – as finalidades clínicas para as quais os dados serão utilizados.
                <br /><br />
                1.2. O fisioterapeuta é o responsável por obter o consentimento prévio, livre, informado e inequívoco do paciente para o tratamento de dados pessoais e sensíveis, por meios oral ou escrito, conforme permitido pelo CREFITO da respectiva jurisdição.
                <br /><br />

                {/* Restante do texto LGPD... */}
                <strong>2. Finalidade do Tratamento de Dados no AlignMe</strong>
                <br /><br />
                2.1. Os dados inseridos no AlignMe serão tratados exclusivamente para:
                <br />
                I – realizar análise postural por fotogrametria;
                <br />
                II – gerar relatórios, laudos e documentos clínicos;
                <br />
                III – organizar informações necessárias ao acompanhamento fisioterapêutico.
                <br /><br />

                <strong>3. Dados Pessoais e Sensíveis Tratados</strong>
                <br /><br />
                3.1. O fisioterapeuta, na qualidade de Controlador dos dados (art. 5º, VI, LGPD), poderá registrar no sistema:
                <br /><br />
                A. Dados pessoais: nome completo, idade, sexo, data de nascimento e informações de contato; dados administrativos necessários à identificação.
                <br /><br />
                B. Dados pessoais sensíveis: imagens corporais, fotografias e vídeos coletados para fotogrametria; medidas anatômicas e biomecânicas; informações de saúde e observações clínicas.
                <br /><br />

                <strong>4. Armazenamento e Segurança dos Dados</strong>
                <br /><br />
                4.1. O AlignMe utiliza medidas técnicas e administrativas aptas a garantir a segurança da informação, incluindo criptografia, controle de acesso, registros de auditoria e protocolos de proteção contra acessos indevidos, em conformidade com o art. 46 da LGPD.
                <br /><br />

                <strong>5. Compartilhamento de Dados</strong>
                <br /><br />
                5.1. O AlignMe não compartilha dados de pacientes com terceiros, salvo mediante autorização expressa do fisioterapeuta Controlador, cumprimento de obrigação legal, regulatória ou ordem judicial.
                <br /><br />

                <strong>6. Direitos do Paciente</strong>
                <br /><br />
                Nos termos do art. 18 da LGPD, o paciente titular dos dados poderá solicitar: confirmação da existência de tratamento; acesso aos seus dados; correção, anonimização, bloqueio ou eliminação; portabilidade; informação sobre compartilhamento; revogação do consentimento.
                <br /><br />

                <strong>7. Retenção e Eliminação de Dados</strong>
                <br /><br />
                7.1. Os dados serão armazenados pelo período definido pelo fisioterapeuta, respeitadas as obrigações técnicas, legais e éticas da fisioterapia.
                <br /><br />

                <strong>8. Distribuição de Responsabilidades</strong>
                <br /><br />
                O fisioterapeuta concorda que é responsável pelo relacionamento clínico com o paciente e pela obtenção do consentimento, deve garantir que as informações inseridas no sistema estejam em conformidade com a ética profissional e a legislação, e deve utilizar o AlignMe conforme as finalidades previstas neste Termo.
                <br /><br />

                <strong>9. Alterações do Termo</strong>
                <br /><br />
                Este Termo poderá ser atualizado para atender a requisitos legais, recomendações da ANPD ou melhorias de segurança. Alterações que impliquem mudança significativa nos direitos ou deveres do fisioterapeuta serão comunicadas previamente.
              </div>
            </div>

            {!scrolledToBottom && (
              <div className="alert alert-warning mb-3">
                Por favor, leia todo o termo até o final para habilitar a aceitação.
              </div>
            )}

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                disabled={!scrolledToBottom}
                id="lgpdAcceptance"
              />
              <label className="form-check-label" htmlFor="lgpdAcceptance">
                Declaro que li e compreendi integralmente os termos acima, que obtive o consentimento livre e informado do paciente, e concordo com a Política de Privacidade e Termos de Uso do Sistema ALIGNME.
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleConfirm}
              disabled={!accepted}
            >
              Confirmar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LgpdModal;