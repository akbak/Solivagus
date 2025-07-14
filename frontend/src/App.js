import React, { useState, useCallback } from 'react';
import './App.css';

// Dil ve tema verilerini doğrudan kodun içinde tanımlıyoruz.
const themes = {
  tr: {
    Yalnızlık: {
      symbols: "Boş bir sandalye, dinmeyen bir yağmur sesi, uzakta bir siluet, gri duvarlar.",
      archetype: "İçe kapanık bir gözlemci."
    },
    Umut: {
      symbols: "Ufukta beliren ilk ışık, çatlak bir duvardan sızan bir filiz, eski bir anahtar.",
      archetype: "Sabırlı bir bekleyen."
    },
    Merak: {
      symbols: "Aralık bir kapı, kilitli bir sandık, ne anlattığı anlaşılmayan eski bir harita.",
      archetype: "Korkusuz bir kaşif."
    }
  },
  en: {
    Loneliness: {
      symbols: "An empty chair, the sound of endless rain, a distant silhouette, grey walls.",
      archetype: "A withdrawn observer."
    },
    Hope: {
      symbols: "The first light on the horizon, a sprout from a cracked wall, an old key.",
      archetype: "A patient waiter."
    },
    Curiosity: {
      symbols: "A slightly open door, a locked chest, an old map with an unknown story.",
      archetype: "A fearless explorer."
    }
  }
};

// Seçilen dil ve temaya göre dinamik olarak prompt üreten fonksiyon
const generatePrompt = (language, themeName) => {
  const themeData = themes[language][themeName];
  const isTurkish = language === 'tr';

  const intro = isTurkish
    ? "SEN, YALNIZCA JSON ÜRETEN BİR ARAÇSIN. Yanıtın SADECE geçerli bir JSON olmalı. Öncesinde veya sonrasında KESİNLİKLE hiçbir açıklama veya markdown (` ```json ` gibi) olmamalıdır."
    : "YOU ARE A TOOL THAT ONLY GENERATES JSON. Your response MUST be only a valid JSON. There should be ABSOLUTELY no explanation or markdown (like ` ```json `) before or after it.";

  const exampleScene = isTurkish
    ? { scene: "Pencerenin önündeki tek sandalyede oturuyorsun. Yağmur, camda yorgun izler bırakarak aşağı süzülüyor.", question: "Bu sessizlik içinde neyi duyuyorsun?", options: ["Yağmurun ritmini.", "Kendi nefesimi."] }
    : { scene: "You are sitting on the single chair by the window. Rain is trickling down the glass, leaving tired tracks.", question: "What do you hear in this silence?", options: ["The rhythm of the rain.", "My own breath."] };

  return `
${intro}
---
TEMA: ${themeName.toUpperCase()}
Simgeler: ${themeData.symbols}
Arketip: ${themeData.archetype}
---
JSON YAPISI KURALLARI:
1. scene (string): En fazla 2 cümlelik, şiirsel ve minimalist bir sahne açıklaması.
2. question (string): Oyuncuyu düşünmeye iten, basit bir soru.
3. options (array of strings): Psikolojik olarak farklı anlamlar taşıyan tam olarak iki adet kısa seçenek.
---
ÖRNEK ÇIKTI:
${JSON.stringify(exampleScene, null, 2)}
---
Şimdi, bu kurallara ve örneğe göre yeni ve özgün bir sahne için bir JSON nesnesi oluştur. Unutma, yanıtın sadece JSON içermeli.
`;
};


function App() {
  const [language, setLanguage] = useState(null); // 'tr', 'en', or null
  const [currentTheme, setCurrentTheme] = useState('');
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFading, setIsFading] = useState(false);

  const fetchNewScene = useCallback(async (lang, theme) => {
    setLoading(true);
    setError(null);
    const prompt = generatePrompt(lang, theme);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'mistral', prompt, stream: false }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama Sunucu Hatası: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const modelOutputStr = data.response || '{}';
      const cleanJsonStr = modelOutputStr.includes('```json')
        ? modelOutputStr.split('```json')[1].split('```')[0].trim()
        : modelOutputStr.trim();
      
      const sceneData = JSON.parse(cleanJsonStr);
      setGameState(sceneData);

    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Sahne yüklenemedi. Ollama'nın çalıştığından emin olun. Detay: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    const availableThemes = Object.keys(themes[lang]);
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    setCurrentTheme(randomTheme);
    fetchNewScene(lang, randomTheme);
  };

  const handleOptionClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setGameState(null);
      // Rastgele yeni bir tema seçerek devam et
      const availableThemes = Object.keys(themes[language]);
      const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
      setCurrentTheme(randomTheme);
      fetchNewScene(language, randomTheme);
      setIsFading(false);
    }, 1500);
  };

  const renderContent = () => {
    if (!language) {
      return (
        <div className="language-selection">
          <h1>Choose a language</h1>
          <div className="options">
            <button className="option-button" onClick={() => handleLanguageSelect('tr')}>Türkçe</button>
            <button className="option-button" onClick={() => handleLanguageSelect('en')}>English</button>
          </div>
        </div>
      );
    }

    if (loading) {
      return <div className="loading">kaderiniz yükleniyor...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (gameState && gameState.scene && gameState.question && Array.isArray(gameState.options)) {
      return (
        <>
          <p className="theme-name">{currentTheme}</p>
          <p className="scene">{gameState.scene}</p>
          <p className="question">{gameState.question}</p>
          <div className="options">
            {gameState.options.map((option, index) => (
              <button key={index} className="option-button" onClick={handleOptionClick}>
                {option}
              </button>
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className={`App ${isFading ? 'fade-out' : 'fade-in'}`}>
      {renderContent()}
    </div>
  );
}

export default App;