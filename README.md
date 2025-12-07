# TideTracker 🌊

## App React Native focado em visualização rápida e confiável de marés.

### Stack ⚙️

- React Native
- Expo
- TypeScript
- NativeWind
- Zustand
- React Query (cache + sincronização)
- Reanimated / Gesture Handler (futuro para interações no mapa)

### Funcionalidades (macro) 🚀

- Mapa com pontos monitorados
  Interface simples para navegar por regiões costeiras e abrir dados específicos de cada local.

- Visualização de marés 📈
  Tela com gráficos básicos e informações essenciais: maré atual, anteriores e próximas.

- Alertas básicos 🔔
  Usuário define notificações para horários ou níveis de maré.

- Cache inteligente ⚡
  React Query mantém os dados acessíveis offline, evita chamadas repetidas e atualiza silenciosamente quando possível.

### Estrutura do Projeto 🗂️

```
src/api/ # chamadas à API de marés
components/ # UI compartilhada
screens/ # telas do app
hooks/ # hooks customizados
utils/ # helpers, formatos, cálculos </code>
```

### Como rodar ▶️

```
npm install
npm start
```

### Objetivo do MVP 🎯

Entregar visualização rápida e útil das condições de maré de regiões do Brasil.
A ideia é crescer para modelos mais complexos (maré + chuva + vento), mas isso ficará para fases futuras.
