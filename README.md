🌦 Weather Forecast Application
Une application moderne et réactive permettant de consulter les prévisions météorologiques sur 5 jours pour différentes villes à travers le monde. Cette application a été conçue pour aider une association qui organise des événements en plein air à mieux gérer les conditions climatiques.

🎯 Fonctionnalités
Recherche de villes avec autocomplétion : L'utilisateur peut rechercher une ville dans une barre de recherche. À partir de 3 lettres, des suggestions sont affichées.
Prévisions sur 5 jours : Après avoir sélectionné une ville, l'utilisateur peut voir les prévisions météo sur 5 jours.
Prévisions horaires : Chaque jour présente également un lien vers les prévisions horaires détaillées.
Informations météorologiques : Température actuelle, humidité, vitesse du vent, pression atmosphérique, lever et coucher du soleil, etc.
Images de conditions météo : Des icônes et des images spécifiques sont affichées pour illustrer les conditions météorologiques (soleil, pluie, nuages...).
Villes récentes : L'application sauvegarde les 5 dernières villes recherchées dans le localStorage.
Mise à jour automatique : La météo est actualisée automatiquement toutes les 5 minutes.
🚀 Technologies Utilisées
React.js : Framework JavaScript pour créer l'interface utilisateur.
React Router : Gestion du routage pour naviguer entre les différentes pages de l'application.
Material-UI (MUI) : Bibliothèque de composants pour un design moderne et réactif.
Framer Motion : Ajout d'animations et d'effets sur les cartes et les composants.
API OpenWeatherMap : Source des données météorologiques.
LocalStorage : Pour stocker les villes récemment recherchées.


Voici un modèle de README complet et bien structuré pour votre application météo. Ce document inclut des sections détaillées sur l’installation, les fonctionnalités, les technologies utilisées, et plus encore.

🌦 Weather Forecast Application
Une application moderne et réactive permettant de consulter les prévisions météorologiques sur 5 jours pour différentes villes à travers le monde. Cette application a été conçue pour aider une association qui organise des événements en plein air à mieux gérer les conditions climatiques.

🎯 Fonctionnalités
Recherche de villes avec autocomplétion : L'utilisateur peut rechercher une ville dans une barre de recherche. À partir de 3 lettres, des suggestions sont affichées.
Prévisions sur 5 jours : Après avoir sélectionné une ville, l'utilisateur peut voir les prévisions météo sur 5 jours.
Prévisions horaires : Chaque jour présente également un lien vers les prévisions horaires détaillées.
Informations météorologiques : Température actuelle, humidité, vitesse du vent, pression atmosphérique, lever et coucher du soleil, etc.
Images de conditions météo : Des icônes et des images spécifiques sont affichées pour illustrer les conditions météorologiques (soleil, pluie, nuages...).
Villes récentes : L'application sauvegarde les 5 dernières villes recherchées dans le localStorage.
Mise à jour automatique : La météo est actualisée automatiquement toutes les 5 minutes.
🚀 Technologies Utilisées
React.js : Framework JavaScript pour créer l'interface utilisateur.
React Router : Gestion du routage pour naviguer entre les différentes pages de l'application.
Material-UI (MUI) : Bibliothèque de composants pour un design moderne et réactif.
Framer Motion : Ajout d'animations et d'effets sur les cartes et les composants.
API OpenWeatherMap : Source des données météorologiques.
LocalStorage : Pour stocker les villes récemment recherchées.
📸 Captures d'écran
Home Page	Page City	Page Forecast
🛠️ Installation et Lancement du Projet
Prérequis
Node.js (version 14 ou supérieure)
npm (version 6 ou supérieure) ou yarn
Étapes d'installation
Cloner le dépôt :

bash
Copier le code
git clone https://github.com/votre-nom-utilisateur/weather-app.git
Naviguer dans le dossier du projet :

bash
Copier le code
cd weather-app
Installer les dépendances :

Avec npm :

bash
Copier le code
npm install
Avec yarn :

bash
Copier le code
yarn install
Ajouter votre clé API OpenWeatherMap :

Créez un fichier .env à la racine du dossier src/.
Ajoutez votre clé API comme ceci :
makefile
Copier le code
REACT_APP_WEATHER_API_KEY=VOTRE_CLE_API
Vous pouvez obtenir une clé API gratuite en vous inscrivant sur OpenWeatherMap.

Lancer l'application :

Avec npm :

bash
Copier le code
npm start
Avec yarn :

bash
Copier le code
yarn start
Accéder à l'application : Ouvrez votre navigateur et accédez à l'URL suivante :

arduino
Copier le code
http://localhost:3000
📚 Utilisation
Sur la page d'accueil, utilisez la barre de recherche pour rechercher une ville.
Sélectionnez la ville souhaitée parmi les suggestions proposées.
Visualisez les prévisions météo sur 5 jours avec des détails sur la température, l'humidité, la pression, etc.
Cliquez sur un jour pour voir les prévisions horaires détaillées.
Les 5 dernières villes consultées apparaissent sous la barre de recherche pour un accès rapide.