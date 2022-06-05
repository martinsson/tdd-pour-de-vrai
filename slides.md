# trame

## Pourquoi la session

TDD la plupart disent que c'est bien. Qui le fait?

Finalement si veut des tests sur le projet, c'est quand le moment idéal pour les faire?

## Faire du TDD uniquement sur du code algorithmique, est-ce pratique?

A quel moment bascule-t-on en TDD? Est-ce qu'il y a un moment ou on se dit "là je vais commencer l'algo"?
Certes cela arrive quand le domaine est riche, mais souvent on découvre et on se fait surprendre.
Peut-être qu'on est capable d'extraire la partie algorithmique après-coup. Mais du coup c'est
au mieux du test after

## Notre but

Montrer comment on peut s'en servir sur toute la chaîne

## C'est quoi le TDD?

Montrer e cycle, expliquer les étapes

## Finalement "Ecrire une specification exécutable", n'est pas spécifique au "bas niveau"

Donc cela se fait aussi bien à tout niveau.
Seule contrainte il faut que ce soit automatisable - ce qui est le boulot du développeur : automatiser

## ...

## Demo

## ...

## Testons les interfaces stables

Si on modifie une interface sous test. Non seulement les tests ne protègent pas ce refacto, mais on doit changer
les tests en plus du code.

## Comment on reconnait une interface stable?

1. Elle est très proche du besoin utilisateur/client
2. Elle est là depuis longtemps
3. Le ratio surface / volume d'une fonction est faible. eg Small interface, deep module

#

## Double boucle

## Parfois un comportement n'est pas "saisissable" bas niveau

Utilisons des tests plus haut niveau, puis refactorons potentiellement pour que cela soit possible plus bas niveau



# Demo points saillants

1. on commencer par lister les fonctionnalités
2. on détaille les cas de chaqu'un
3. on commence dans le test, à l'intérieur du test. L'application nait de là
4. Chaque modif se fait tester en qq dixièmes de secondes.  
5. on extrait une repo
6. 
