# OpenClassrooms Projet 07 : Les petits plats

**Objectif :** Développer un algorithme de recherche en JavaScript.

## Contexte

Site de démonstration de l’entreprise imaginaire “Les petits plats”.

L’entreprise a décidé de se lancer dans un nouveau projet : réaliser son propre site de recettes de cuisine à l’instar de "Marmiton" ou "750g".

Dans cette perspective, ma mission était d’implémenter les fonctionnalités de tri et de recherche avec du JavaScript ainsi qu'une interface minimale en HTML et CSS (avec Bootstrap) à partir de [maquettes fournies](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?type=design&node-id=0-1&mode=design) et de données mockées (les recettes présentes dans le fichier recipes.js du dossier data de ce Repo).

Les données issues des recettes sont formatées pour être affichées sur la page à l'aide du classe dédiée "RecipeObject".

De plus, les résultats de la recherche ou du tri doivent s'afficher le plus rapidement possible. 2 algorithmes de recherche ont été testés.
L'un avec des méthodes de tableaux (filter, par exemple) et l'autre avec les boucles natives de JavaScript (for).
Chacun de ces algorithmes se trouve sur sa propre branche pour être testé.

Un benchmark a été effectué sur le site [https://jsben.ch/](https://jsben.ch/) pour déterminer lequel est le plus rapide.

Les résultats sont repris dans le fichier PDF présent dans le dossier "Docs" de ce Repo.

## Aperçu du site de démonstration

-   Cloner le projet

```bash
git clone https://github.com/Cycle9898/OC_Projet-7_Les-petits-plats.git

// Ensuite

//algorithme avec les méthodes de tableaux
git checkout array-methods-searchEngine

// Ou

//algorithme avec les boucles natives en JavaScript
git checkout native-loops-searchEngine
```

-   Ouvrir index.html avec un navigateur web ou ouvrir le projet dans VS Code et lancer l'extension "Live server"
