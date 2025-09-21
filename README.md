# 🖥️ FastFlow - Frontend

Este é o **frontend** do protótipo **FastFlow**, desenvolvido em **React** para o Hackathon SESI Bahia.  
O sistema tem como objetivo otimizar a **gestão de filas de atendimento do SESI**, e melhorar a experiencia do paciente permitindo que **usuários, atendentes e médicos** acompanhem e interajam com o fluxo de uma maneira mais eficiente e dinâmica.

---

## 🚀 Funcionalidades

- **👤 Usuário (Paciente)**
  - Consultar sua posição na fila por **CPF** ou **Número Único**.
  - Visualizar tempo médio de espera de cada exame.
  - Receber notificação na tela quando for chamado (exame em destaque verde, mostrando sala e profissional responsável).

- **🧑‍💼 Atendente**
  - Gerenciar fila de pacientes.
  - Inserir novos pacientes e vincular aos exames.
  - Consultar e atualizar status da fila.

- **👨‍⚕️ Médico**
  - Chamar paciente para atendimento.
  - Alterar status do exame em andamento.
  - Finalizar atendimento, liberando o próximo da fila.

---

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) (v18+)
- [React Router](https://reactrouter.com/) para navegação entre páginas.
- [Axios](https://axios-http.com/) para integração com o backend.
- [Phosphor Icons](https://phosphoricons.com/) para ícones.
- Estilização com **CSS-in-JS** (inline) e possibilidade de migração para Tailwind/Styled-Components.

---

## 📂 Estrutura de Pastas

```bash
src/
 ├── components/   # Componentes reutilizáveis (Header, QueueList etc.)
 ├── pages/        # Páginas principais (Login, Fila, Atendente, Médico)
 ├── services/     # Serviços de API (axios configs)
 ├── context/      # Context API para estados globais
 ├── App.tsx       # Configuração principal do React Router
 └── index.tsx     # Ponto de entrada da aplicação
```

## ⚙️ Como rodar o projeto

```bash
Clone este repositório:
git clone hhttps://github.com/CoutinhoThiago/fastflow_web

Entre na pasta do projeto:
cd fastflow-frontend

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
npm start

Acesse no navegador:
http://localhost:3000
```

## 🌐 Integração com Backend
O frontend consome as APIs REST expostas pelo backend em Spring Boot.

Arquivo de configuração: src/services/api.ts

Base URL padrão: http://localhost:8080/api

## 👥 Equipe

Thiago Coutinho Sousa Silva - Dev/QA (Frontend)<br>
Kevenn Viana Santos - PO <br>
Tássio Nascimento Santos - Dev (Backend)<br>
Lincon de Jesus Brito - UX|UI|Design <br>
Raphael dos Santos Cerqueira - Especialista em saúde<br>

## 🚀 Futuras Melhorias

Implementar autenticação JWT. <br>
Melhorar responsividade (mobile-first). <br>
Dashboard de métricas para gestores. <br>
Banco PostgreSQL para produção. <br>
Monitoramento em tempo real com WebSockets. <br>
Integração com sistemas hospitalares externos (SOC/HL7/FHIR). <br>
Deploy em Docker com containers separados (frontend + backend). <br>