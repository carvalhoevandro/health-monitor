# Health Monitor 🩺

Um dashboard moderno e responsivo para monitoramento em tempo real do status de saúde das aplicações da StartSe.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=flat-square)

## 📋 Sobre o Projeto

O Health Monitor é uma aplicação web desenvolvida para monitorar o status de saúde de múltiplos serviços e APIs da StartSe. O dashboard oferece uma visão centralizada e em tempo real do estado de todos os serviços, separados por ambiente (Produção e Stage).

### ✨ Funcionalidades

- 🔄 **Monitoramento em tempo real** - Verificação automática do status dos serviços
- 🏷️ **Separação por ambiente** - Abas distintas para Produção e Stage
- ⚡ **Tempo de resposta** - Medição e exibição do tempo de resposta de cada serviço
- 🎨 **Interface moderna** - Design responsivo com suporte a tema claro/escuro
- 📊 **Estatísticas visuais** - Badges e indicadores de status intuitivos
- 🔄 **Atualização manual** - Botão para forçar nova verificação de todos os serviços
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile

## 🚀 Demo

![Health Monitor Screenshot](public/placeholder.jpg)

## 🛠️ Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React para produção
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes UI
- **[Lucide React](https://lucide.dev/)** - Ícones SVG otimizados
- **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes rápido e eficiente

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm/yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/startse/health-monitor.git
   cd health-monitor
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia o servidor de desenvolvimento
pnpm build        # Gera build de produção
pnpm start        # Inicia o servidor de produção
pnpm lint         # Executa o linter
```

## 📁 Estrutura do Projeto

```
health-monitor/
├── app/
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal do monitor
├── components/
│   ├── theme-provider.tsx # Provedor de tema
│   ├── theme-toggle.tsx   # Botão de alternância de tema
│   └── ui/               # Componentes UI do shadcn
├── hooks/                # Hooks personalizados
├── lib/
│   └── utils.ts          # Utilitários e helpers
├── public/               # Arquivos estáticos
└── styles/
    └── globals.css       # Estilos globais adicionais
```

## 🔧 Configuração

### Adicionando Novos Serviços

Para adicionar um novo serviço ao monitoramento, edite o array `HEALTH_URLS` em `app/page.tsx`:

```typescript
const HEALTH_URLS = [
  // ... serviços existentes
  {
    url: "https://seu-novo-servico.com/health",
    name: "Seu Novo Serviço",
    environment: "Prod" // ou "Stage"
  },
];
```

### Customizando Intervalos de Verificação

Atualmente, a verificação é feita manualmente. Para implementar verificação automática, você pode adicionar um `setInterval` no `useEffect`:

```typescript
useEffect(() => {
  checkAllHealth();
  
  // Verificação automática a cada 30 segundos
  const interval = setInterval(checkAllHealth, 30000);
  
  return () => clearInterval(interval);
}, []);
```

## 🎨 Temas

A aplicação suporta temas claro e escuro, utilizando o `next-themes`. O usuário pode alternar entre os temas usando o botão no canto superior direito.

## 📊 Serviços Monitorados

### Ambiente de Produção
- Checkout API
- BFF API  
- Auth API
- Content API
- Dify Redirect
- General LMS API
- Identity API
- Showcase API
- Squads API
- StartSe AI API
- Strapi CMS

### Ambiente de Stage
- Checkout API (Stage)
- BFF API (Stage)
- Auth API (Stage)
- Content API (Stage)
- General LMS API (Stage)
- Identity API (Stage)
- Showcase API (Stage)
- Squads API (Stage)
- StartSe AI API (Stage)
- Strapi CMS (Stage)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ pela equipe de desenvolvimento da StartSe.

---

**StartSe** - [Website](https://startse.com) · [LinkedIn](https://linkedin.com/company/startse)