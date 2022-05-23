# Sujet

Gestion de votes pour langages préférés.

Fonctionnalités :
1. Pouvoir lister les langages
2. Pouvoir ajouter un langage
3. Pouvoir voter pour un langage = +1
4. Pouvoir lister les langages favoris par votes décroissant
5. Avoir un rafraichissement temps réel de ma page
6. Pouvoir lister par ordre alphabétique
7. Pouvoir cacher un langage sur la liste
8. Pouvoir regrouper 2 langages similaires
9. Pouvoir limiter les votes par utilisateur (1 seul par langage) 
10. Pouvoir retrouver et changer mes votes

Débat sur l'app front :
- Ok pour une app front existante qu'on peut montrer mais qui en marche pas (+ intelligence pour compléter l'IHM 
au fur et à mesure, exemple bouton "Ajouter" si requête list OK-200)
- Plusieurs versions sur des alias successifs

Etapes d'implémentation "petits pas" ou "MVP" :
1. Afficher une liste en dur (nom langage + vote)
2. Voter, (avec sauvegarde)
3. Ajouter un langage


## Besoins
- Avoir un truc fluide pour montrer le front

# TODO / A voir / A creuser

* Johan ? : corriger primary key
* (Johan ?) : Remplacer MySQL par No-SQL ? Plus simple ? 
* Faire du mapping entre résultat BDD et JSON renvoyé ?
* Xavier : Préparer app front 
* Johan : wallabyjs
* ? : diaporama --> trame dans ce doc


## Ce qu'on veut montrer
* TDD sur qq chose qui ressemble avec une vraie appli
** Le double boucle TDD
*** qui devient simplement "Quel est le test dont j'ai besoin pour faire évoluer mon code?"
** Mock/stub ou simulateurs?
** hexagone?
** 
* Isolation pour testabilité?


## Valeurs
* Faisons les tests qui nous aident
* les tests doivent _permettre_ le refactoring
* Il est efficace de tester des interfaces stables

## Comment montrer un interet à tester plus bas niveau?
Regles métier
- Pas de vote négatif
- Pas ajouter un langage qui existe
- Le meme ip peut pas voter deux fois
- 

