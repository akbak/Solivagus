# Solivagus
> A Dynamic Decision Game Engine by Muhammet Ali AKBAK


Solivagus
Latince: “Yalnız gezen”
🧭 Anlamı: Kendi iç dünyasında kaybolan, yalnızlıkta yol alan
🎭 Mistik bir hava
📌 soli (tek) + vagus (dolaşan)


Bu proje, yapay zeka destekli bir metin tabanlı karar oyunu motorudur. Seçilen bir dile ve rastgele bir temaya göre şiirsel ve atmosferik sahneleri dinamik olarak üreterek her oyunda benzersiz bir deneyim sunar. Arayüz React ile geliştirilmiştir ve oyun içeriğini oluşturmak için doğrudan yerel bir Ollama sunucusu ile iletişim kurar.

---

This project is a text-based decision game engine powered by AI. It dynamically generates poetic and atmospheric scenes based on a selected language and a random theme, offering a unique experience with every playthrough. The frontend is built with React, and it communicates directly with a local Ollama instance to generate game content.

## Kurulum Talimatları (Setup Instructions)

### Türkçe

#### 1. Ön Gereksinimler: Ollama Kurulumu

Bu projenin çalışması için, oyunun anlatı içeriğini üretecek olan Ollama'nın yerel olarak çalıştırılması gerekmektedir.

1.  **Ollama'yı İndirin ve Kurun:** [Resmi Ollama web sitesini](https://ollama.com/) ziyaret edin ve işletim sisteminize uygun uygulamayı indirin.

2.  **Yapay Zeka Modelini İndirin:** Ollama kurulduktan sonra terminalinizi açın ve `mistral` modelini indirmek için aşağıdaki komutu çalıştırın. Bu işlem birkaç dakika sürebilir.
    ```bash
    ollama pull mistral
    ```

3.  **Ollama Sunucusunu Başlatın:** React uygulamasının Ollama ile iletişim kurmasına izin vermek için, sunucuyu `http://localhost:3000` için CORS'u etkinleştiren özel bir komutla başlatmanız gerekir. Bu komutu yeni bir terminal penceresinde çalıştırın ve arka planda çalışır durumda bırakın.
    ```bash
    OLLAMA_ORIGINS=http://localhost:3000 ollama serve
    ```

#### 2. Proje Kurulumu

1.  **Projeyi Klonlayın:** Proje dosyalarını makinenize alın.
    ```bash
    git clone https://github.com/akbak/Solivagus.git
    ```

2.  **Proje Dizinine Gidin:** Terminalinizi açın ve `frontend` klasörüne gidin.
    ```bash
    cd Solivagus/frontend
    ```

3.  **Bağımlılıkları Yükleyin:** Gerekli tüm Node.js paketlerini yüklemek için aşağıdaki komutu çalıştırın.
    ```bash
    npm install
    ```

4.  **Uygulamayı Başlatın:** Kurulum tamamlandıktan sonra React geliştirme sunucusunu başlatın.
    ```bash
    npm start
    ```

Tarayıcınız otomatik olarak `http://localhost:3000` adresini açacak ve oyun başlayacaktır.

---

### English

#### 1. Prerequisites: Ollama Setup

This project requires Ollama to be running locally to generate the game's narrative content.

1.  **Download and Install Ollama:** Visit the [official Ollama website](https://ollama.com/) and download the application for your operating system.

2.  **Download the AI Model:** Once Ollama is installed, open your terminal and run the following command to download the `mistral` model. This might take a few minutes.
    ```bash
    ollama pull mistral
    ```

3.  **Run the Ollama Server:** To allow the React application to communicate with Ollama, you must start the server with a specific command that enables CORS for `http://localhost:3000`. Run this command in a new terminal window and keep it running in the background.
    ```bash
    OLLAMA_ORIGINS=http://localhost:3000 ollama serve
    ```

#### 2. Project Installation

1.  **Clone the Repository:** Get the project files onto your machine.
    ```bash
    git clone https://github.com/akbak/Solivagus.git
    ```

2.  **Navigate to the Project Directory:** Open your terminal and go into the `frontend` folder.
    ```bash
    cd Solivagus/frontend
    ```

3.  **Install Dependencies:** Run the following command to install all the necessary Node.js packages.
    ```bash
    npm install
    ```

4.  **Start the Application:** Once the installation is complete, start the React development server.
    ```bash
    npm start
    ```

Your browser should automatically open to `http://localhost:3000`, and the game should start.

Solivagus
Latin: “One who wanders alone”
🧭 Meaning: Someone lost in their inner world, a soul who travels through solitude
🎭 A mystical tone
📌 soli (alone) + vagus (wandering)