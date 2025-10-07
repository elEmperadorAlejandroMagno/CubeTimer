# ⏱️ Timer con React

Aplicación desarrollada con **React + Vite** que simula un cronómetro para registrar tus tiempos mientras resolvés puzzles clásicos como el cubo Rubik 🧩.

Actualmente está alojada en:  
🔗 [Demo en Netlify](https://your-favorite-timer.netlify.app)

---

## ⚙️ Tecnologías utilizadas

- 🧠 React  
- ⚡ Vite  
- 🎨 CSS Modules  
- 💾 LocalStorage para persistencia  

---

## 🛠️ Instalación

```bash
git clone https://github.com/elEmperadorAlejandroMagno/CubeTimer.git
cd CubeTimer
npm install
npm run dev
```

### 🧪 Características
Iniciar / detener el cronómetro con la barra espaciadora ⌨️

Registro automático de tiempos 🕒

Borrado manual de los tiempos guardados 🔄

Persistencia local de los tiempos 💾

Personalización de estilos en los componentes 🎨

Cambio dinámico del fondo de pantalla de la aplicación 🌌

---

#### 📁 Estructura del proyecto
Código
```
src/
├── App.css
├── App.jsx
├── assets/
│   └── react.svg
├── components/
│   ├── cube_2d.jsx
│   ├── mixer.jsx
│   ├── options.jsx
│   ├── table_timer.jsx
│   └── timer.jsx
├── constants/
│   └── cubeData.js
├── context/
│   ├── CubeTypeContext.jsx
│   ├── MixContext.jsx
│   └── TimesContext.jsx
├── index.css
├── main.jsx
├── styles/
│   ├── cube_2d.css
│   ├── mixer.css
│   ├── options.css
│   ├── table_timer.css
│   └── timer.css
└── utils/
    └── cube_utils.js
```
---
    
##### 🧭 Roadmap
[ ] Estadísticas por sesión (promedio, mejor tiempo, desviación estándar) 📊

[ ] Modo online para competir con otros usuarios mediante código de sesión 🔗

🧙‍♂️ Autor
Alejandro — @elEmperadorAlejandroMagno

📄 Licencia
Este proyecto está bajo la licencia MIT.
