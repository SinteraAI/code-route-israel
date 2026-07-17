// Test de fumée : exécute l'app dans jsdom et vérifie chaque vue + moteurs.
'use strict';
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('/Users/garyb/side_projects/code-route-israel/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.com/' });
const { window } = dom;
const doc = window.document;

let failed = 0;
const check = (name, cond) => {
  console.log((cond ? 'PASS' : 'FAIL') + ' — ' + name);
  if (!cond) failed++;
};

const errors = [];
window.addEventListener('error', e => errors.push(e.message));

// Accueil rendu au démarrage
check('accueil actif au démarrage', doc.querySelector('#view-accueil').classList.contains('active'));
check('accueil non vide', doc.querySelector('#view-accueil').innerHTML.length > 200);
check('compte à rebours affiché', doc.querySelector('#countdown').textContent.includes('J-'));
check('plan 5 jours présent', doc.querySelectorAll('#view-accueil .plan-day').length === 5);

// Leçons
window.showView('lecons');
check('7 leçons rendues', doc.querySelectorAll('#lessons-list .lesson').length === 7);
doc.querySelector('#lessons-list .lesson .lhead').click();
check('leçon dépliable', doc.querySelector('#lessons-list .lesson').classList.contains('open'));

// Panneaux
window.showView('panneaux');
check('73 panneaux dans la grille', doc.querySelectorAll('#sign-grid .sign-cell').length === 73);
check('7 filtres (Tous + 6 cat.)', doc.querySelectorAll('#sign-chips .chip').length === 7);
window.setSignFilter('danger');
check('filtre danger = 27 panneaux', doc.querySelectorAll('#sign-grid .sign-cell').length === 27);
window.setSignFilter('marquage');
check('filtre marquage = 11', doc.querySelectorAll('#sign-grid .sign-cell').length === 11);
window.setSignFilter('tous');
window.openSign('stop');
check('fiche panneau ouverte (STOP)', doc.querySelector('#sheet').textContent.includes('STOP'));
check('fiche contient numéro 302', doc.querySelector('#sheet').textContent.includes('302'));
window.closeSheet();
check('fiche fermée', !doc.querySelector('#sheet-backdrop').classList.contains('open'));

// Flashcards
window.showView('cartes');
check('accueil flashcards', doc.querySelector('#view-cartes').textContent.includes('Flashcards'));
window.startFlash('smart');
check('séance de 20 cartes démarrée', doc.querySelector('#view-cartes').textContent.includes('Carte 1 / 20'));
window.revealFlash();
check('réponse révélée', doc.querySelectorAll('#view-cartes .flash-btns button').length === 2);
window.gradeFlash(true);
check('carte suivante', doc.querySelector('#view-cartes').textContent.includes('Carte 2 / 20'));
for (let i = 1; i < 20; i++) { window.revealFlash(); window.eval('lastTap=0'); window.gradeFlash(i % 3 !== 0); }
check('fin de séance affichée', doc.querySelector('#view-cartes').textContent.includes('Séance terminée'));

// Quiz entraînement panneaux
window.showView('quiz');
check('accueil quiz', doc.querySelector('#view-quiz').textContent.includes('Examen blanc'));
window.startQuiz('panneaux', 'practice');
check('quiz panneaux 15 questions', doc.querySelector('#view-quiz').textContent.includes('Question 1 / 15'));
const opts = doc.querySelectorAll('#view-quiz .qopt');
check('4 options proposées', opts.length === 4);
opts[0].click();
check('feedback affiché', !!doc.querySelector('#view-quiz .explain'));
check('bonne réponse marquée', !!doc.querySelector('#view-quiz .qopt.correct'));

// Quiz théorie : répondre juste à tout
window.startQuiz('theorie', 'practice');
for (let i = 0; i < 15; i++) {
  const q = window.eval("quizSession.questions[quizSession.idx]");
  window.eval('lastTap=0'); window.answerQuiz(q.answerId);
  window.eval('lastTap=0'); window.nextQuestion();
}
check('score 15/15 en répondant juste', doc.querySelector('#view-quiz').textContent.includes('15 / 15'));

// Examen blanc : 30 questions, réponses différées
window.startQuiz('examen', 'exam');
check('examen 30 questions', window.eval("quizSession.questions.length") === 30);
check('chrono affiché', !!doc.querySelector('#exam-clock'));
for (let i = 0; i < 30; i++) {
  const q = window.eval("quizSession.questions[quizSession.idx]");
  window.eval('lastTap=0'); window.answerQuiz(i % 5 === 0 ? 'mauvaise-reponse' : q.answerId);
  if (i === 0) check('examen : validation par bouton, pas de feedback', !doc.querySelector('#view-quiz .explain') && doc.querySelector('#view-quiz').textContent.includes('Question suivante'));
  window.eval('lastTap=0'); window.nextQuestion();
}
const resultTxt = doc.querySelector('#view-quiz').textContent;
check('résultat examen affiché (24/30 attendu)', resultTxt.includes('24 / 30'));
check('verdict échec sous 26', resultTxt.includes('26'));
check('revue des erreurs présente', doc.querySelectorAll('#view-quiz .review-item').length === 6);

// Examen réussi
window.startQuiz('examen', 'exam');
for (let i = 0; i < 30; i++) {
  const q = window.eval("quizSession.questions[quizSession.idx]");
  window.eval('lastTap=0'); window.answerQuiz(q.answerId);
  window.eval('lastTap=0'); window.nextQuestion();
}
check('examen réussi 30/30', doc.querySelector('#view-quiz').textContent.includes('Reçue'));

// Persistance localStorage
check('meilleur score sauvegardé', window.localStorage.getItem('crIL.bestExam') === '30');
check('boîtes flashcards sauvegardées', Object.keys(JSON.parse(window.localStorage.getItem('crIL.flash'))).length > 0);

// Intégrité des données
const badSigns = window.eval("SIGNS").filter(s => !s.svg || !s.name || !s.sens || !s.cat);
check('73 fiches complètes', window.eval("SIGNS").length === 73 && badSigns.length === 0);
const badQ = window.eval("THEORY_QUESTIONS").filter(q => q.choices.length !== 4 || q.answer !== 0 || !q.explain);
check('39 questions bien formées', window.eval("THEORY_QUESTIONS").length === 39 && badQ.length === 0);

check('aucune erreur JS pendant le test', errors.length === 0);
if (errors.length) console.log('Erreurs:', errors);

console.log(failed === 0 ? '\n✅ TOUS LES TESTS PASSENT' : `\n❌ ${failed} test(s) en échec`);
process.exit(failed ? 1 : 0);
