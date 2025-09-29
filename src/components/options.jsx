import { useState, useEffect } from 'react';
import '../styles/options.css'
import { FaTools } from 'react-icons/fa';

export default function Options(){
  const [isOpen, setOpen] = useState(false);
  const [textColor, setTextColor] = useState('#ffffff');
  const [expandImage, setExpandImage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [backgroundImageName, setBackgroundImageName] = useState('');

  // Cargar configuraciones guardadas al montar el componente
  useEffect(() => {
    // Cargar color del texto del timer
    const savedTextColor = localStorage.getItem('centralTextTimerColor');
    if (savedTextColor) {
      document.documentElement.style.setProperty('--centralTextTimerColor', savedTextColor);
      setTextColor(savedTextColor);
    }

    // Cargar expansión de imagen
    const savedExpandImage = localStorage.getItem('expandImage');
    if (savedExpandImage) {
      setExpandImage(savedExpandImage === 'true');
    }

    // Cargar color de fondo
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
      setBackgroundColor(savedBackgroundColor);
      document.body.style.backgroundColor = savedBackgroundColor;
    }

    // Cargar imagen de fondo
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      const expand = savedExpandImage === 'true';
      const mode = expand ? 'cover' : 'contain';
      document.body.style.backgroundImage = `url(${savedBackgroundImage})`;
      document.body.style.backgroundSize = mode;
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed';
      const savedBackgroundImageName = localStorage.getItem('backgroundImageName');
      setBackgroundImageName(savedBackgroundImageName || 'Imagen guardada');
    }
  }, []);

  function handleOpenOptionsModal() {
    setOpen(open => !open);
    console.log(isOpen);
  }

  function handleTimerTextColor(e) {
    const color = e.target.value;
    setTextColor(color);
    localStorage.setItem('centralTextTimerColor', color);
    document.documentElement.style.setProperty('--centralTextTimerColor', color);
  }

  function handleBackgroundImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setBackgroundImageName(file.name);
    localStorage.setItem('backgroundImageName', file.name);
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      localStorage.setItem('backgroundImage', imageUrl);
      const mode = expandImage ? 'cover' : 'contain';
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = mode;
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed';
    };
    reader.readAsDataURL(file);
  }

  function handleExpandImage(e) {
    const expand = e.target.checked;
    setExpandImage(expand);
    localStorage.setItem('expandImage', expand.toString());
    
    // Aplicar el nuevo modo si hay una imagen de fondo
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      const mode = expand ? 'cover' : 'contain';
      document.body.style.backgroundSize = mode;
    }
  }

  function handleBackgroundColor(e) {
    const color = e.target.value;
    setBackgroundColor(color);
    localStorage.setItem('backgroundColor', color);
    document.body.style.backgroundColor = color;
  }

  return (
  <div className="options-container">
    <div className="optionBtn-container">
      <button className="optionBtn" onClick={handleOpenOptionsModal}>{ typeof FaTools === "function" ? <FaTools /> : "Options" }</button>
    </div>
    <div className={`options-modal-container${isOpen ? ' open': ''}`} id='OptionsModal' onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="options-modal">
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
        <h2>Opciones de la aplicación</h2>
        
        <div className="option-group">
          <label htmlFor="TextTimer">Texto Central + timer</label>
          <input 
            type="color" 
            name="centralTextTimer" 
            id="TextTimer" 
            className="color-input"
            value={textColor} 
            onChange={handleTimerTextColor} 
          />
        </div>
        
        <div className="option-group">
          <label htmlFor="BackgroundImage">Imagen de fondo</label>
          <input 
            type="file" 
            name="backgroundImage" 
            id="BackgroundImage" 
            className="hidden-file-input"
            accept="image/*" 
            onChange={handleBackgroundImage} 
          />
          <div className="file-row">
            <label htmlFor="BackgroundImage" className="file-btn">Seleccionar imagen</label>
            <span className="file-name">{backgroundImageName || 'Ningún archivo seleccionado'}</span>
          </div>
          
          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="expandImage" 
              checked={expandImage} 
              onChange={handleExpandImage} 
            />
            <label htmlFor="expandImage">
              Expandir imagen (puede distorsionar)
            </label>
          </div>
        </div>
        
        <div className="option-group">
          <label htmlFor="backgroundColor">Color de fondo</label>
          <input 
            type="color" 
            id="backgroundColor" 
            className="color-input"
            value={backgroundColor} 
            onChange={handleBackgroundColor} 
          />
        </div>
      </div>
    </div>
  </div>
  )
}