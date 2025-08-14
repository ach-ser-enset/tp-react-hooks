# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

**Solution implémentée :**

Pour la recherche en temps réel, j'ai utilisé le hook useState pour stocker la valeur du champ de recherche dans le composant App et la passer en props aux composants enfants.

**Fonctionnalités ajoutées :**
- État de recherche géré au niveau App avec useState  
- Props drilling pour passer searchTerm et setSearchTerm
- Filtrage en temps réel des produits dans ProductList
- Amélioration de la gestion des états dans useProductSearch

**Code clé :**
```javascript
// Dans App.js
const [searchTerm, setSearchTerm] = useState('');

// Dans ProductList.js  
const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**Difficultés rencontrées :**
- La gestion de l'état de chargement et des erreurs nécessite une attention particulière
- Le filtrage côté client fonctionne bien pour une démonstration, mais dans un vrai projet, il faudrait faire le filtrage côté serveur
- Props drilling peut devenir problématique avec une application plus complexe

**Résultat :** L'application affiche la recherche en temps réel qui filtre les produits instantanément quand on tape dans le champ de recherche.

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

**Solution implémentée :**

J'ai créé un LanguageContext complet qui gère l'internationalisation de l'application avec 3 langues : Français, Anglais et Arabe.

**Fonctionnalités ajoutées :**
- LanguageContext avec traductions pour 3 langues (fr, en, ar)
- Composant LanguageSelector avec dropdown Bootstrap
- Hook useLanguage pour faciliter l'utilisation du contexte
- Traduction de tous les textes de l'interface

**Fichiers créés :**
- `src/contexts/LanguageContext.js` - Context et Provider
- `src/components/LanguageSelector.js` - Sélecteur de langue

**Code clé :**
```javascript
// LanguageContext.js
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  
  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };
  // ...
};

// Utilisation dans les composants
const { t } = useLanguage();
<h1>{t('productCatalog')}</h1>
```

**Difficultés rencontrées :**
- Organisation des traductions de manière maintenable
- Gestion du fallback si une traduction manque
- Intégration fluide avec les autres composants sans casser l'architecture existante
- Nécessité de restructurer App.js avec un composant AppContent

**Résultat :** L'application affiche un sélecteur de langue qui permet de basculer entre Français, English et العربية avec traduction de toute l'interface.

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

**Solution implémentée :**

J'ai créé deux hooks personnalisés réutilisables et les ai intégrés dans l'application.

**1. Hook useDebounce :**
- Retarde l'exécution d'une valeur pour optimiser les performances
- Utilisé dans ProductSearch pour éviter les recherches trop fréquentes
- Délai configurable (300ms par défaut)

**2. Hook useLocalStorage :**
- Synchronise automatiquement l'état React avec localStorage
- Gère les erreurs de parsing JSON
- Écoute les changements depuis d'autres onglets
- Utilisé pour persister le thème, la langue et le terme de recherche

**Fichiers créés :**
- `src/hooks/useDebounce.js` - Hook de debouncing
- `src/hooks/useLocalStorage.js` - Hook de synchronisation localStorage

**Code clé :**
```javascript
// useDebounce.js
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// useLocalStorage.js
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  // ...
};
```

**Intégration :**
- LanguageContext utilise useLocalStorage pour persister la langue
- App utilise useLocalStorage pour persister le thème et la recherche
- ProductSearch utilise useDebounce pour optimiser la recherche

**Difficultés rencontrées :**
- Gestion des erreurs JSON dans useLocalStorage
- Synchronisation entre plusieurs onglets avec l'événement 'storage'
- Optimisation du debounce pour éviter les re-renders inutiles

**Résultat :** Les préférences (langue, thème, recherche) sont automatiquement sauvegardées et restaurées au rechargement de la page. La recherche est optimisée avec un debounce.

### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

- [ ] 4.1 Ajouter le bouton de rechargement
- [ ] 4.2 Implémenter la pagination
- [ ] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
Expliquez votre solution ici
[Ajoutez vos captures d'écran]
```

## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.