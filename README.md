# EcoTrace — Protótipo demonstrativo

Simulação acadêmica de uma plataforma de gestão de resíduos, construída com **React 19, TypeScript, Vite, Tailwind CSS e Recharts**.

O projeto é totalmente fictício: **não possui backend, login, integrações ambientais nem emite documentos com validade legal**. As informações são mantidas exclusivamente no `localStorage` do navegador.

## Requisitos

- Node.js 22 ou superior (Node 24 LTS recomendado)
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse o endereço local exibido pelo Vite (normalmente `http://localhost:5173`).

## Gerar build

```bash
npm run build
npm run preview
```

## Deploy no Netlify

1. Conecte este repositório a um novo site no Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Publique. O `netlify.toml` já inclui o fallback de rotas da SPA.

Não há variáveis de ambiente nem banco de dados a configurar.

## Funcionalidades

- **Landing page** com apresentação do projeto e acesso ao painel.
- **Dashboard** com volumes, status, gráficos e movimentações recentes.
- **Movimentações** com busca, filtro, detalhes, atualização de situação e exportação CSV.
- **Nova emissão** com formulário e geração de registro fictício.
- **Comprovante PDF** claramente marcado como demonstração e sem validade legal.
- **Indicadores** derivados das mesmas movimentações; atualizam ao registrar ou alterar o status.
- **Restaurar demonstração** no menu lateral para voltar aos dados de exemplo.

### Roteiro da apresentação

1. Abrir `/` e apresentar a proposta EcoTrace.
2. Clicar em **Acessar demonstração**.
3. Mostrar dashboard, cards e gráficos.
4. Acessar **Emitir documento**, preencher os campos e gerar um registro.
5. Acessar **Movimentações**, conferir o registro recém-criado e baixar o PDF.
6. Alterar o status do registro para **Destinado**.
7. Voltar ao dashboard e indicadores para demonstrar atualização automática.
8. Usar **Restaurar demonstração** para repetir o fluxo, se necessário.

## Observações

- Os registros não são compartilhados entre dispositivos ou navegadores.
- Limpar os dados do navegador remove as alterações do usuário e a base fictícia é recriada no próximo acesso.
- A pasta `dist/` é gerada pelo build e não precisa estar versionada.
- A interface representa um **protótipo acadêmico**, e não um emissor oficial de MTR/CDF.
