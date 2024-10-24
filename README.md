Application Météo
Bienvenue sur l'Application Météo ! Ce projet vous permet de consulter les prévisions météorologiques en temps réel pour n'importe quelle ville, avec des détails précis sur les 5 prochains jours, des prévisions horaires, ainsi que des graphiques interactifs sur les différents paramètres météorologiques.

Ce guide vous aidera à comprendre les fonctionnalités de l'application, comment l'installer et l'utiliser.

Table des matières
Fonctionnalités
Installation
Utilisation
Technologies utilisées
Structure du projet
Licence
Fonctionnalités
Données météorologiques en temps réel : Consultez les informations météorologiques actuelles pour n'importe quelle ville, incluant la température, l'humidité, la vitesse du vent, et bien plus.
Prévisions sur 5 jours : Visualisez des prévisions détaillées pour les 5 prochains jours, avec des informations sur les conditions météo journalières et les températures.
Prévisions horaires : Découvrez les prévisions horaires précises pour les 8 heures à venir.
Graphiques interactifs : Visualisez les tendances de température, d'humidité et de vitesse du vent grâce à des graphiques dynamiques.
Recherche de ville avec autocomplétion : Recherchez des villes grâce à une barre de recherche avec des suggestions dès que vous saisissez 3 lettres.
Recherches récentes : Retrouvez les 5 dernières villes recherchées, enregistrées dans le localStorage de votre navigateur.
Design réactif : L'application est entièrement responsive et fonctionne sur tous types d'appareils, du mobile au bureau.
Icônes météo : Chaque prévision est accompagnée d'icônes explicites pour une interprétation facile des conditions météo.
Installation
Pour installer le projet localement, suivez ces étapes :

Cloner le dépôt Git :
bash
Copier le code
git clone https://github.com/votreusername/weather-app.git
cd weather-app
Installer les dépendances :
bash
Copier le code
npm install
Configurer la clé API :
Créez un fichier .env à la racine du projet.
Ajoutez votre clé API de OpenWeatherMap comme ceci :
bash
Copier le code
REACT_APP_WEATHER_API_KEY=votre_clé_api
Lancer le serveur de développement :
bash
Copier le code
npm start
L'application sera maintenant accessible à l'adresse http://localhost:3000/.

Utilisation
Accueil
Lorsque vous arrivez sur la page d'accueil de l'application, vous verrez un champ de recherche où vous pouvez entrer le nom d'une ville. Dès que vous tapez au moins 3 lettres, l'application vous suggérera des villes correspondant à votre saisie. Vous pouvez sélectionner une ville pour afficher ses prévisions météorologiques détaillées.

Détails des villes
Sur la page de chaque ville, vous verrez :

La météo actuelle (température, humidité, pression, vitesse du vent, lever et coucher du soleil).
Un graphique interactif montrant les températures maximales et minimales sur 5 jours.
Les prévisions pour les 5 prochains jours avec des cartes météo illustrées.
Les prévisions horaires pour les 8 heures à venir.
Technologies utilisées
React : Framework JavaScript utilisé pour construire l'interface utilisateur.
React Router : Utilisé pour gérer la navigation entre les différentes pages (home, city, forecast).
OpenWeatherMap API : Fournit les données météorologiques en temps réel et les prévisions.
Material-UI (MUI) : Utilisé pour le style des composants et l'interface utilisateur réactive.
VisX : Utilisé pour créer des graphiques interactifs représentant les données météo (température, humidité, vent).
Structure du projet
Voici un aperçu de la structure des fichiers du projet :



/src
  /components
    City.js              // Composant pour afficher les prévisions météo d'une ville
    TemperatureChart.js   // Composant pour afficher le graphique des températures
    HumidityChart.js      // Composant pour afficher le graphique d'humidité
    WindSpeedChart.js     // Composant pour afficher le graphique de la vitesse du vent
    /styles
      App.css             // Styles globaux de l'application
      City.css            // Styles spécifiques au composant City
      TemperatureChart.css // Styles pour le graphique des températures
      HumidityChart.css   // Styles pour le graphique d'humidité
      WindSpeedChart.css  // Styles pour le graphique de vitesse du vent
  App.js                 // Point d'entrée de l'application
  index.js               // Fichier principal pour le rendu React