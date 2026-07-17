# Code de la route Israël — en français 🇮🇱

Application web de révision pour l'**examen théorique israélien** (מבחן תיאוריה), entièrement en français, pensée pour une préparation express (5 jours), avec un focus sur les **panneaux de signalisation**.

**➡️ En ligne : https://sinteraai.github.io/code-route-israel/**

## Contenu

- **7 leçons** de théorie générale israélienne (feux avec vert clignotant, priorités, vitesses, stationnement et bordures peintes, sécurité, familles de panneaux, mode d'emploi de l'examen).
- **72 fiches panneaux** dessinées en SVG d'après le catalogue officiel (לוח התמרורים, éd. consolidée 09/2022) : numéros officiels, signification, astuce d'examen.
- **Flashcards** avec répétition intelligente (les panneaux ratés reviennent plus souvent), progression sauvegardée dans le navigateur.
- **Quiz d'entraînement** (feedback immédiat) et **examen blanc** au format réel : 30 questions, 40 minutes, 26 bonnes réponses pour réussir.

## Fiabilité des faits

Le contenu a été construit à partir d'une recherche vérifiée contre des sources officielles israéliennes (gov.il, לוח התמרורים, Kol Zchut, theorytest.org.il, תקנות התעבורה), puis contre-vérifiée par une passe de vérification indépendante. Cette app est une **aide à la révision**, pas un document officiel : la banque de questions officielle reste la référence (gov.il ; en français : meteoria.co.il).

## Technique

Un seul fichier statique : `index.html` (HTML + CSS + JS vanilla, aucune dépendance, aucun backend). Ouvrable en local ou hébergeable n'importe où. Le dossier `tools/` contient les scripts ayant servi à générer les pictogrammes SVG et à injecter le contenu, ainsi que le test de fumée jsdom.

```bash
node tools/smoke-test.js   # nécessite: npm install jsdom
```
