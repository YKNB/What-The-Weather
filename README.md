# What-The-Weather
Application mobile de meteo realisee en React Native. Le depot contient
2 implementations: une version avec Expo et une version sans Expo.

## Objectif du projet (TIC-MOB3)
Construire une application mobile qui affiche la meteo detaillee en fonction
la localisation et des villes recherchees. Le cahier des charges demande:
- recherche de ville (option auto-completion)
- page de details meteo (temperature par heure, previsions, vent, pression,
  humidite, min/max, Celsius/Fahrenheit)
- liste des villes sauvegardees avec ajout/suppression
- experience utilisateur claire (indicateurs de chargement)

Note: le sujet mentionne l'API Dark Sky, mais l'implementation utilise
OpenWeatherMap.

## Contenu du depot

### reactnative_with_expo/Weather
Version React Native + Expo avec navigation (Home, Search, Weather).
- Recherche de ville via l'API OpenWeatherMap (geocoding)
- Liste des villes sauvegardees via AsyncStorage
- Affichage de la meteo par ville sur la page d'accueil

### reactnative_without_expo/Weather
Autre variante React Native. Le point d'entree `App.js` charge un composant
`src` (structure plus simple).

## Execution

### Version Expo
Prerequis: Node.js + Expo CLI
```bash
cd reactnative_with_expo/Weather
npm install
expo start
```

### Version sans Expo
Prerequis: Node.js + environnement React Native natif (Android Studio ou Xcode)
```bash
cd reactnative_without_expo/Weather
npm install
npm run android
# ou npm run ios
```

## Documentation
Sujet du projet: `TIC-MOB3 _ What's The Weather.pdf`
