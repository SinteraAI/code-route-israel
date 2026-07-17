// Injecte SIGNS / LESSONS / THEORY_QUESTIONS dans index.html.
// Source des faits : recherche vérifiée contre le לוח התמרורים officiel (éd. 09/2022)
// et les verdicts des vérificateurs (workflow wf_c8ddcfe2-890).
'use strict';
const fs = require('fs');
const SVGS = JSON.parse(fs.readFileSync(__dirname + '/signs-svg.json', 'utf8'));

const META = [
// ---------- DANGER ----------
{id:'chaussee-deformee', cat:'danger', num:'101', name:'Chaussée déformée', short:'Route en mauvais état',
 sens:"Route cahoteuse ou dégradée devant toi : réduis la vitesse. Deux bosses = route abîmée naturellement.",
 tip:"Ne pas confondre avec le 144 (dos d'âne construit) : 101 = DEUX bosses (route dégradée), 144 = UNE bosse (ralentisseur volontaire)."},
{id:'virage-droite', cat:'danger', num:'102', name:'Virage serré à droite', short:'Virage serré à droite',
 sens:"Virage serré vers la droite devant toi : ralentis avant le virage, pas dedans.",
 tip:"La flèche israélienne se termine en « queue d'aronde » (fourche) — signature graphique des virages 102 à 105 (le 106, route sinueuse, n'en a pas)."},
{id:'virage-gauche', cat:'danger', num:'103', name:'Virage serré à gauche', short:'Virage serré à gauche',
 sens:"Virage serré vers la gauche devant toi : ralentis avant d'y entrer.",
 tip:"102 = droite, 103 = gauche. Regarde bien la direction de la pointe de la flèche."},
{id:'virages', cat:'danger', num:'106', name:'Route sinueuse', short:'Succession de virages',
 sens:"Succession de virages devant toi : adapte ta vitesse sur toute la section.",
 tip:"104/105 = exactement DEUX virages (le premier coude de la flèche donne le sens du premier virage — piège classique). 106 = plus de deux."},
{id:'retrecissement', cat:'danger', num:'109', name:'Chaussée rétrécie', short:'La chaussée se rétrécit',
 sens:"La chaussée devient plus étroite (des deux côtés). Les variantes 110/111 signalent un rétrécissement par la droite ou par la gauche.",
 tip:"Ce panneau seul ne donne AUCUNE priorité : dans un passage étroit, la priorité est réglée par les panneaux 307/308."},
{id:'dos-dane', cat:'danger', num:'144', name:"Ralentisseur (dos d'âne)", short:'Ralentisseur construit',
 sens:"Bandes surélevées construites sur la chaussée : ralentis fortement.",
 tip:"UNE bosse = ralentisseur construit (144) ; DEUX bosses = chaussée déformée (101)."},
{id:'glissante', cat:'danger', num:'141', name:'Chaussée glissante', short:'Risque de dérapage',
 sens:"Risque de dérapage (pluie, huile, gravillons) : ralentis et évite les mouvements brusques du volant et des freins.",
 tip:"L'examen israélien adore l'associer aux « premières pluies » (גשם ראשון) : après des mois secs, la route devient très glissante dès les premières gouttes."},
{id:'pietons-avert', cat:'danger', num:'135', name:'Passage piétons à proximité', short:'Passage piétons plus loin',
 sens:"Un passage pour piétons se trouve plus loin : ralentis et prépare-toi à t'arrêter.",
 tip:"Piège majeur : 135 (triangle, AVANT le passage, avertit) ≠ 306 (carré bleu, AU passage même, oblige à céder aux piétons engagés)."},
{id:'ecole', cat:'danger', num:'136', name:'Piétons à proximité (école)', short:'Piétons / abords d\'école',
 sens:"Des piétons peuvent se trouver sur ou près de la chaussée : abords d'écoles, de jardins publics, de zones résidentielles.",
 tip:"Israël n'a PAS de panneau « enfants » séparé : c'est ce pictogramme adulte + enfant (136) qui est posé près des écoles."},
{id:'cyclistes', cat:'danger', num:'137', name:'Cyclistes', short:'Circulation de cyclistes',
 sens:"Circulation de cyclistes à proximité ou traversée de piste cyclable.",
 tip:"En Israël, « אופניים » inclut légalement les vélos électriques ET les trottinettes électriques — question moderne de la banque officielle."},
{id:'feux', cat:'danger', num:'122', name:'Feux de circulation', short:'Feu tricolore plus loin',
 sens:"Feu tricolore devant toi, à un endroit où il peut surprendre (sortie de virage, feu récent).",
 tip:"Seul panneau d'avertissement israélien dont le pictogramme est en COULEUR (rouge-jaune-vert), pas en noir."},
{id:'giratoire-avert', cat:'danger', num:'121', name:'Rond-point à l\'approche', short:'Rond-point plus loin',
 sens:"Un rond-point se trouve au prochain carrefour : ralentis à l'approche.",
 tip:"Piège n°1 : 121 (triangle) AVERTIT à distance ; 303 (rond bleu) est planté AU giratoire et OBLIGE à céder à ceux qui y circulent."},
{id:'double-sens', cat:'danger', num:'145', name:'Circulation à double sens', short:'Route à double sens',
 sens:"La route devient bidirectionnelle (souvent après un sens unique ou des chaussées séparées) : serre à droite.",
 tip:"Réflexe attendu au QCM : serrer à droite et ne pas dépasser sans visibilité — du trafic arrive désormais en face."},
{id:'descente', cat:'danger', num:'140', name:'Descente dangereuse', short:'Descente raide',
 sens:"Descente raide devant toi : rétrograde AVANT la descente et utilise le frein moteur.",
 tip:"Spécificité israélienne : pas de pourcentage affiché. Réponse attendue : passer une vitesse inférieure avant de descendre."},
{id:'carrefour', cat:'danger', num:'114', name:'Carrefour (intersection)', short:'Carrefour non prioritaire',
 sens:"Croisement de routes devant toi : les règles générales de priorité s'appliquent (priorité à droite si rien d'autre n'est signalé).",
 tip:"La croix israélienne est en X (diagonale), pas en + comme en Europe — reconnais-la à l'examen."},
{id:'inter-t', cat:'danger', num:'115', name:'Route latérale à droite', short:'Débouché latéral à droite',
 sens:"Une route latérale débouche à droite (115) ou à gauche (116). Le trait épais représente TA route.",
 tip:"À distinguer des panneaux de FUSION (123-126) où aucun virage vers la branche n'est possible : ici c'est un vrai carrefour."},
{id:'passage-niveau', cat:'danger', num:'129', name:'Passage à niveau', short:'Voie ferrée plus loin',
 sens:"Passage à niveau ferroviaire devant toi : ralentis, écoute, et prépare-toi à t'arrêter.",
 tip:"Israël ne distingue PAS « avec/sans barrière » : une seule locomotive (129) pour tous les passages à niveau. Interdiction de dépasser entre ce panneau et le passage !"},
{id:'tram', cat:'danger', num:'128', name:'Train léger (tramway)', short:'Le tram croise la route',
 sens:"Une rame de train léger (Jérusalem, Tel-Aviv) croise la route devant toi.",
 tip:"128 = tram moderne avec pantographe ; 129 = train « lourd » (locomotive à vapeur). Deux panneaux différents."},
{id:'balise-pn', cat:'danger', num:'130-132', name:'Balises avant passage à niveau', short:'Décompte avant la voie ferrée',
 sens:"Balises de distance avant un passage à niveau : 3 bandes ≈ 300 m, 2 bandes ≈ 200 m, 1 bande ≈ 100 m.",
 tip:"Question type : « combien de mètres restent-ils ? » — le nombre de bandes rouges × 100 m."},
{id:'croix-pn', cat:'danger', num:'133', name:'Croix de Saint-André', short:'Emplacement du passage à niveau',
 sens:"Tu es À l'emplacement même du passage à niveau (une seule voie ferrée). La croix double (134) = plusieurs voies.",
 tip:"129 avertit À L'AVANCE, 133/134 marquent L'ENDROIT. Croix double : attention, un second train peut suivre le premier !"},
{id:'stop-ahead', cat:'danger', num:'139', name:'Stop plus loin', short:'Un STOP arrive',
 sens:"Un panneau STOP (302) se trouve plus loin : prépare-toi à l'arrêt complet.",
 tip:"Design purement israélien : l'octogone noir dans le triangle annonce le STOP à main qui arrive."},
{id:'chameau', cat:'danger', num:'146', name:'Animaux (chameau)', short:'Animaux sur la route',
 sens:"Des animaux peuvent traverser : gazelles, ou chameaux sur les routes du Néguev et de l'Arava.",
 tip:"La variante chameau est une célébrité de l'examen israélien — les deux pictogrammes (cervidé et chameau) partagent le numéro 146."},
{id:'chutes-pierres', cat:'danger', num:'142', name:'Chutes de pierres', short:'Éboulements possibles',
 sens:"Risque de pierres éboulées sur la chaussée, tombant du côté indiqué (142 = droite, 143 = gauche).",
 tip:"Le QCM peut demander de quel CÔTÉ vient le danger : deux numéros distincts selon le côté."},
{id:'travaux', cat:'danger', num:'901', name:'Travaux (chantier)', short:'Zone de chantier',
 sens:"Début d'une zone de travaux sur la route, valable jusqu'au panneau de fin de chantier (902).",
 tip:"Règle d'or : dans une zone de chantier, le marquage ORANGE au sol PRIME sur le marquage blanc permanent."},
{id:'danger', cat:'danger', num:'150', name:'Danger non spécifié', short:'Danger (nature non précisée)',
 sens:"Endroit dangereux pour lequel aucun panneau spécifique n'existe : redouble de prudence.",
 tip:"Réponse type au QCM : « danger dont la nature n'est pas précisée ». Ses voisins : 151 (accident), 152 (vent latéral)."},
{id:'chevrons', cat:'danger', num:'108', name:'Chevrons de virage', short:'La route tourne — suis les chevrons',
 sens:"Guidage dans un virage serré : la route continue dans la direction des flèches. Passe DEVANT le panneau.",
 tip:"En Israël les chevrons sont NOIR et BLANC (pas rouge/blanc comme en France), et ils appartiennent au groupe avertissement malgré leur forme rectangulaire."},

// ---------- PRIORITÉ ----------
{id:'cedez', cat:'priorite', num:'301', name:'Cédez le passage', short:'Céder le passage',
 sens:"Cède la priorité à la circulation de la route transversale (y compris une voie ferrée). Tu peux passer SANS t'arrêter si la voie est libre.",
 tip:"Différence clé avec le STOP : ici, l'arrêt n'est obligatoire que si nécessaire. Seul panneau en triangle pointe en bas — reconnaissable même couvert de neige ou de poussière."},
{id:'stop', cat:'priorite', num:'302', name:'STOP (עצור)', short:'Arrêt complet obligatoire',
 sens:"Arrêt COMPLET obligatoire, même si tout est libre, puis cède la priorité à la circulation transversale.",
 tip:"Le STOP israélien = octogone rouge avec une MAIN blanche, sans aucun texte. Implanté à gauche de la chaussée, il ne vaut que pour le tourne-à-gauche ; au-dessus d'une voie, que pour cette voie."},
{id:'giratoire', cat:'priorite', num:'303', name:'Carrefour giratoire', short:'Rond-point : céder à l\'anneau',
 sens:"Cède la priorité à la circulation déjà engagée dans l'anneau et contourne l'îlot par la droite.",
 tip:"Ce panneau unique cumule TROIS fonctions : annonce + céder le passage + contourner par la droite. La priorité est à ceux qui viennent de ta gauche, déjà dans l'anneau."},
{id:'passage-pietons-ind', cat:'priorite', num:'306', name:'Passage piétons', short:'Céder aux piétons qui traversent',
 sens:"Cède la priorité aux piétons qui traversent. Implanté à l'endroit même du passage marqué au sol.",
 tip:"Officiellement classé PRIORITÉ (pas simple indication). 135 (triangle) avertit avant ; 306 (carré bleu) oblige au passage même."},
{id:'ceder-face', cat:'priorite', num:'307', name:'Passage étroit : cède au sens inverse', short:'Céder au trafic d\'en face',
 sens:"Dans le passage étroit, cède la priorité à la circulation venant en face.",
 tip:"La flèche ROUGE représente TON sens = celui qui attend. Rond à bordure rouge = contrainte. Son jumeau favorable est le 308 (carré bleu)."},
{id:'priorite-face', cat:'priorite', num:'308', name:'Passage étroit : tu as la priorité', short:'Priorité sur le trafic d\'en face',
 sens:"Dans le passage étroit, TU as la priorité sur la circulation venant en face.",
 tip:"Retiens « carré bleu = droit acquis » : 307 (rond rouge) = tu cèdes ; 308 (carré bleu) = tu passes. Paire piège favorite de l'examen."},
{id:'route-prioritaire', cat:'priorite', num:'309', name:'Route prioritaire', short:'Tu es sur la route prioritaire',
 sens:"Tu as la priorité sur cette route, jusqu'au prochain carrefour ou échangeur (ou jusqu'au panneau 310).",
 tip:"Nuance israélienne : la validité s'arrête au PROCHAIN carrefour si le panneau n'est pas répété — contrairement à la France."},
{id:'fin-priorite', cat:'priorite', num:'310', name:'Fin de route prioritaire', short:'Fin de la priorité',
 sens:"Fin de la section où tu avais la priorité : retour aux règles générales (priorité à droite en carrefour non signalé).",
 tip:"Après ce panneau, à un carrefour sans signalisation, c'est la priorité à droite (règle 64) qui s'applique."},

// ---------- INTERDICTION ----------
{id:'route-fermee', cat:'interdiction', num:'401', name:'Route fermée (2 sens)', short:'Fermée dans les deux sens',
 sens:"Chaussée fermée dans les DEUX sens à tout véhicule. Placé au-dessus d'un feu : aller tout droit interdit.",
 tip:"401 (cercle vide) ferme la route dans les deux sens ; 402 (barre blanche) interdit seulement l'ENTRÉE — du trafic peut arriver en face. Piège classique."},
{id:'sens-interdit', cat:'interdiction', num:'402', name:'Sens interdit', short:'Entrée interdite',
 sens:"Entrée interdite à tout véhicule : typiquement l'entrée d'une rue à sens unique prise à contre-sens.",
 tip:"« Tout véhicule » inclut les VÉLOS. Ne vaut que pour la chaussée où il est implanté."},
{id:'interdit-moteur', cat:'interdiction', num:'405', name:'Interdit aux véhicules à moteur', short:'Véhicules à moteur interdits',
 sens:"Entrée interdite à tout véhicule à MOTEUR ; les vélos et les piétons peuvent passer.",
 tip:"Trio fréquent au QCM : 402 (tout véhicule, même vélo) / 405 (à moteur seulement) / 408 (à moteur sauf deux-roues)."},
{id:'interdit-droite', cat:'interdiction', num:'428', name:'Interdiction de tourner à droite', short:'Défense de tourner à droite',
 sens:"Défense de tourner à droite au prochain embranchement (valable jusqu'au prochain carrefour inclus).",
 tip:"Monté AU-DESSUS d'un feu, il interdit aussi le demi-tour. Sinon, seul le virage indiqué est interdit."},
{id:'interdit-gauche', cat:'interdiction', num:'429', name:'Interdiction de tourner à gauche', short:'Défense de tourner à gauche',
 sens:"Défense de tourner à gauche au prochain embranchement (valable jusqu'au prochain carrefour inclus).",
 tip:"GROS piège officiel : le 429 seul n'interdit PAS le demi-tour à gauche ! Le demi-tour n'est interdit que par 430/431, par le marquage, ou si le panneau est monté au-dessus d'un feu."},
{id:'demi-tour-interdit', cat:'interdiction', num:'431', name:'Demi-tour à gauche interdit', short:'Défense de faire demi-tour',
 sens:"Défense de faire demi-tour vers la gauche au prochain embranchement.",
 tip:"Il existe aussi un 430 (demi-tour à DROITE interdit) — le demi-tour à droite existe en Israël entre rues à sens unique parallèles."},
{id:'depassement-interdit', cat:'interdiction', num:'420', name:'Dépassement interdit', short:'Défense de dépasser',
 sens:"Interdit de dépasser un véhicule à moteur de PLUS de deux roues. Valable jusqu'au prochain carrefour ou au panneau 421.",
 tip:"Nuance très testée : sous ce panneau, dépasser une MOTO ou un VÉLO reste permis (l'interdiction vise les véhicules « à plus de deux roues »)."},
{id:'vitesse-50', cat:'interdiction', num:'426', name:'Limitation de vitesse', short:'Vitesse maximale indiquée',
 sens:"Interdiction de rouler au-dessus du nombre de km/h inscrit.",
 tip:"Validité : jusqu'au prochain carrefour, ou jusqu'aux panneaux 216/217 (autoroute), 424/425 (agglomération) ou 427. La version 426פ est un panneau LUMINEUX (LED), utilisé sur les axes à affichage dynamique."},
{id:'fin-vitesse', cat:'interdiction', num:'427', name:'Fin de limitation de vitesse', short:'Fin de la vitesse spéciale',
 sens:"Fin de la vitesse spéciale : on revient à la vitesse par défaut du type de route.",
 tip:"« Fin de limitation » ≠ vitesse libre ! C'est la vitesse légale du type de route qui redevient applicable (50 ville / 80 interurbain / 90 séparateur / 110 autoroute)."},
{id:'stationnement-interdit', cat:'interdiction', num:'432', name:'Stationnement interdit', short:'Défense de stationner',
 sens:"Stationnement interdit du côté du panneau. L'arrêt bref (montée/descente de passagers) reste permis.",
 tip:"UNE barre = stationnement interdit (arrêt toléré) ; une DOUBLE barre = même l'arrêt est interdit (433). Équivalent au sol : bordure rouge-blanc."},
{id:'arret-interdit', cat:'interdiction', num:'433', name:'Arrêt et stationnement interdits', short:'Défense de s\'arrêter',
 sens:"Tout arrêt et tout stationnement interdits du côté du panneau, sauf obligation légale.",
 tip:"La différence 432/433 est archi-classique : une barre = pas de stationnement ; DOUBLE barre (rouge-blanc-rouge) = pas même un arrêt d'une seconde. En Israël, le 433 n'est PAS un X."},

// ---------- OBLIGATION ----------
{id:'tout-droit', cat:'obligation', num:'203', name:'Obligation : tout droit', short:'Continuer tout droit',
 sens:"Va tout droit. Sous ce panneau, le demi-tour est INTERDIT.",
 tip:"Les obligations bleues israéliennes sont la série 200 (pas 400). Une flèche JAUNE sur ces panneaux = direction réservée aux transports publics."},
{id:'oblig-droite', cat:'obligation', num:'204', name:'À droite AVANT le panneau', short:'Tourner à droite avant le panneau',
 sens:"Tourne à droite — vire AVANT le panneau (il est en face de toi).",
 tip:"Paire piège 204/206 : flèche HORIZONTALE = tourner avant le panneau ; flèche COUDÉE = tourner après. Idem 205/207 à gauche."},
{id:'oblig-droite-apres', cat:'obligation', num:'206', name:'À droite APRÈS le panneau', short:'Tourner à droite après le panneau',
 sens:"Tourne à droite — vire APRÈS le panneau.",
 tip:"Question récurrente : « où tournez-vous ? » — la forme de la flèche (droite vs coudée) donne la réponse."},
{id:'oblig-gauche', cat:'obligation', num:'205', name:'À gauche AVANT le panneau', short:'Tourner à gauche avant le panneau',
 sens:"Tourne à gauche — vire avant le panneau.",
 tip:"Le 207 (flèche coudée) impose de tourner APRÈS le panneau."},
{id:'contournement', cat:'obligation', num:'214', name:'Contournement par la droite', short:'Passer à droite de l\'obstacle',
 sens:"Franchis l'endroit signalé (îlot, obstacle, chantier) par son côté DROIT.",
 tip:"215 = miroir (par la gauche) ; 213 (deux flèches) = passage permis des DEUX côtés — à ne pas confondre."},
{id:'piste-cyclable', cat:'obligation', num:'', name:'Piste cyclable', short:'Voie réservée aux vélos',
 sens:"Chemin réservé aux cyclistes : interdit aux autres véhicules et aux piétons s'il existe un trottoir.",
 tip:"Rond bleu = obligation/réservation. En Israël, les trottinettes électriques doivent aussi utiliser la piste cyclable quand elle existe."},
{id:'chemin-pietons', cat:'obligation', num:'', name:'Chemin piétons', short:'Réservé aux piétons',
 sens:"Chemin réservé aux piétons : interdit aux véhicules, y compris vélos.",
 tip:"À distinguer du 306 (carré bleu, priorité aux piétons au passage) : ici c'est un CHEMIN entier réservé."},

// ---------- INDICATION ----------
{id:'sens-unique', cat:'indication', num:'618', name:'Sens unique', short:'Rue à sens unique',
 sens:"Toute la chaussée est à sens unique dans la direction de la flèche, jusqu'au prochain carrefour ou au panneau 145.",
 tip:"Ne pas confondre avec l'obligation « tout droit » (203, rond bleu) : le 618 (carré) INFORME que toute la rue est à sens unique."},
{id:'impasse', cat:'indication', num:'623', name:'Impasse', short:'Rue sans issue',
 sens:"La route devant toi est sans issue. Les variantes 624/625 signalent une impasse dans la rue latérale droite/gauche.",
 tip:"Si le T est déporté sur le côté du panneau, l'impasse concerne la rue LATÉRALE, pas la tienne."},
{id:'parking', cat:'indication', num:'626', name:'Stationnement autorisé (חניה)', short:'Stationnement autorisé',
 sens:"Stationnement autorisé — sauf aux arrêts de bus, et là où bordures rouge-blanc ou panneaux d'interdiction s'appliquent.",
 tip:"Le panneau porte le monogramme ח + P (ח = initiale de חניה, le stationnement). Une bordure rouge-blanc ANNULE l'autorisation du 626."},
{id:'autoroute', cat:'indication', num:'216', name:'Début d\'autoroute', short:'Entrée d\'autoroute',
 sens:"Début d'autoroute : interdite aux piétons, vélos, animaux et à tout véhicule ne pouvant rouler à au moins 60 km/h.",
 tip:"Le seuil de 60 km/h minimum est une question d'examen classique. Vitesse par défaut sur autoroute : 110 km/h (jusqu'à 120 si signalé)."},
{id:'fin-autoroute', cat:'indication', num:'217', name:'Fin d\'autoroute', short:'Sortie d\'autoroute',
 sens:"Fin de l'autoroute et de ses règles.",
 tip:"Après ce panneau, la vitesse par défaut redevient celle du type de route (80/90 interurbain, 50 si tu entres en ville)."},
{id:'zone-residentielle', cat:'indication', num:'220', name:'Rue résidentielle partagée', short:'Rue partagée piétons-voitures',
 sens:"Rue où piétons et véhicules cohabitent sur la chaussée : conduite très lente, prudence maximale (enfants qui jouent), stationnement uniquement aux emplacements aménagés.",
 tip:"Dans un רחוב משולב, le piéton peut utiliser TOUTE la largeur de la rue — tu dois pouvoir t'arrêter immédiatement. Fin de zone : panneau 221 (barré)."},
{id:'maison-rouge', cat:'indication', num:'424', name:'Entrée d\'agglomération', short:'Zone urbaine : 50 km/h',
 sens:"Début d'une zone de routes urbaines (אזור דרכים עירוניות) : piétons, stationnement, écoles… Vitesse par défaut : 50 km/h.",
 tip:"Association clé : la maison = la ville = 50 km/h. Panneau rond à bordure rouge avec une maison noire ; le 425 (maison grise barrée de noir) marque la sortie → retour aux vitesses interurbaines."},
{id:'sortie-agglo', cat:'indication', num:'425', name:'Sortie d\'agglomération', short:'Fin de zone urbaine',
 sens:"Fin de la zone de routes urbaines.",
 tip:"Après le 425 : 80 km/h par défaut sur route interurbaine (90 avec séparateur central), sauf signalisation."},
{id:'voie-bus', cat:'indication', num:'501', name:'Voie réservée aux transports publics', short:'Voie bus (נת\"צ)',
 sens:"Voie réservée : les pictogrammes indiquent qui peut y rouler. Arrêt et stationnement interdits dans la voie.",
 tip:"Nuance très testée : bus JAUNE = seulement les bus de LIGNE ; bus BLANC = tous les autobus. Sans panonceau d'horaires, la réservation vaut 24h/24. Au sol : lignes jaunes + losanges."},

// ---------- MARQUAGE & BORDURES ----------
{id:'ligne-discontinue', cat:'marquage', num:'801', name:'Ligne discontinue', short:'Franchissable pour dépasser',
 sens:"Ligne de voie : roule dans la voie la plus à droite ; ne franchis la ligne que pour dépasser ou éviter, avec prudence.",
 tip:"Franchissable, mais uniquement pour une manœuvre justifiée — pas pour rouler à cheval sur deux voies."},
{id:'ligne-continue', cat:'marquage', num:'803', name:'Ligne continue (double)', short:'Interdiction de franchir',
 sens:"Ligne de séparation continue : roule à sa droite, interdiction ABSOLUE de la franchir ou de la chevaucher, même partiellement.",
 tip:"Depuis la version 2022 du catalogue, elle est définie comme DOUBLE ligne blanche. Même une roue ou un rétroviseur qui dépasse = infraction."},
{id:'ligne-mixte', cat:'marquage', num:'806', name:'Ligne mixte (continue + discontinue)', short:'Franchissable selon ton côté',
 sens:"Le franchissement n'est autorisé que si la ligne DISCONTINUE est de TON côté et si la voie est libre.",
 tip:"Règle simple : c'est la ligne la plus proche de toi qui compte. Discontinue de ton côté = dépassement possible ; continue = interdit."},
{id:'ligne-jaune', cat:'marquage', num:'807', name:'Ligne jaune continue (rive)', short:'Bord de chaussée (accotement)',
 sens:"Marque le bord de la chaussée sur route interurbaine : roule à sa gauche ; ne passe à sa droite que pour éviter un accident ou rouler lentement sans gêner.",
 tip:"Piège d'examen : la ligne jaune israélienne n'est PAS une séparation de sens — elle délimite l'ACCOTEMENT (שול)."},
{id:'ligne-orange', cat:'marquage', num:'918+', name:'Marquage orange (chantier)', short:'Marquage temporaire de travaux',
 sens:"Marquage temporaire de zone de travaux : mêmes formes que le marquage blanc, mais en orange.",
 tip:"Règle d'or : en zone de chantier, le marquage ORANGE PRIME sur le marquage blanc permanent."},
{id:'ligne-arret', cat:'marquage', num:'810', name:'Ligne d\'arrêt', short:'S\'arrêter avant la ligne',
 sens:"Ligne blanche en travers de la voie : c'est LÀ qu'on s'arrête (stop, feu rouge, passage à niveau) — avant la ligne et près d'elle.",
 tip:"Au stop ou au feu rouge : arrêt AVANT la ligne, jamais dessus. Sans ligne : avant le passage piétons."},
{id:'bordure-rouge-blanc', cat:'marquage', num:'818', name:'Bordure rouge-blanc', short:'Ni arrêt ni stationnement',
 sens:"Arrêt ET stationnement interdits le long de ces bordures.",
 tip:"LE point d'examen : rouge-blanc = ni arrêt ni stationnement (pas seulement le stationnement). Le remorquage y est fréquent."},
{id:'bordure-bleu-blanc', cat:'marquage', num:'817', name:'Bordure bleu-blanc', short:'Stationnement payant réglementé',
 sens:"Stationnement autorisé mais PAYANT/réglementé, selon les conditions du panneau municipal à proximité (heures, jours, résidents).",
 tip:"Hors des heures affichées, souvent gratuit — mais vérifie toujours si la zone est réservée aux résidents."},
{id:'bordure-rouge-jaune', cat:'marquage', num:'511', name:'Bordure rouge-jaune', short:'Arrêt de bus / taxis',
 sens:"Emplacement réservé à un type de véhicule (bus de ligne, taxis) pour la montée/descente de passagers : arrêt interdit à tous les autres.",
 tip:"Rouge-jaune = arrêt de bus ou station de taxis : ni arrêt ni stationnement, même « juste une minute »."},
{id:'bordure-noir-blanc', cat:'marquage', num:'816', name:'Bordure noir-blanc', short:'Mise en évidence d\'un obstacle',
 sens:"Marquage de visibilité des îlots, refuges et terre-pleins — ce n'est pas une règle de stationnement en soi.",
 tip:"Réponse attendue : noir-blanc = signalisation d'un OBSTACLE (îlot, terre-plein), pas une couleur de stationnement."},
{id:'bordure-grise', cat:'marquage', num:'', name:'Bordure non peinte', short:'Stationnement libre par défaut',
 sens:"Bordure sans peinture : stationnement en principe autorisé et gratuit, sauf panneau contraire ou règle générale.",
 tip:"« Libre » ne veut pas dire partout : les interdictions générales restent (12 m d'un carrefour, passage piétons, arrêt de bus…)."},
];

/* ============ LEÇONS ============ */
const LESSONS = [
{icon:'🪧', title:'Reconnaître les familles de panneaux', sub:'La logique des formes et des couleurs — commence ici',
 body:`
<p>Avant d'apprendre chaque panneau, apprends la <b>logique</b> : la forme et la couleur te disent déjà 80 % du message.</p>
<table>
<tr><th>Forme / couleur</th><th>Famille</th><th>Exemple</th></tr>
<tr><td>🔺 Triangle, bordure rouge, fond blanc</td><td><b>Danger</b> (série 100)</td><td>Virage, passage piétons, chameau…</td></tr>
<tr><td>🔻 Triangle pointe en bas</td><td><b>Cédez le passage</b> (301)</td><td>Le seul de sa forme — reconnaissable même sale</td></tr>
<tr><td>🛑 Octogone rouge + main blanche</td><td><b>STOP</b> (302)</td><td>Spécificité israélienne : une main, pas de texte</td></tr>
<tr><td>🔴 Rond, bordure rouge</td><td><b>Interdiction</b> (série 400)</td><td>Vitesse, sens interdit, dépassement…</td></tr>
<tr><td>🔵 Rond bleu</td><td><b>Obligation</b> (série 200)</td><td>Tout droit, contournement, rond-point…</td></tr>
<tr><td>🟦 Carré / rectangle bleu</td><td><b>Indication</b></td><td>Sens unique, parking ח, impasse…</td></tr>
<tr><td>🟡 Losange jaune</td><td><b>Route prioritaire</b> (309)</td><td>Tu as la priorité jusqu'au prochain carrefour</td></tr>
</table>
<div class="keyfact">🇮🇱 <b>Spécificités israéliennes à retenir :</b> le STOP à main ✋, le carrefour en <b>X</b> (114), la maison d'entrée de ville (424), le parking marqué <b>ח+P</b>, les chevrons de virage <b>noirs et blancs</b>, et le panneau chameau 🐪 (146).</div>
<div class="keyfact">🟠 En zone de chantier, panneaux d'accompagnement et marquage au sol sont <b>ORANGE</b> — et le marquage orange prime toujours sur le blanc. (Le suffixe <b>פ</b> d'un numéro de panneau désigne sa version <b>lumineuse à LED</b>.)</div>`},

{icon:'🚦', title:'Les feux de circulation', sub:'Séquence israélienne, vert clignotant, jaune clignotant',
 body:`
<p>La séquence israélienne comporte une étape de plus qu'en France :</p>
<ul>
<li>🔴 <b>Rouge</b> : arrêt complet avant la ligne d'arrêt.</li>
<li>🔴🟡 <b>Rouge + jaune ensemble</b> : « prépare-toi à démarrer » — mais il est <b>interdit de passer</b> tant que le vert n'est pas allumé.</li>
<li>🟢 <b>Vert</b> : passe — si le carrefour peut être dégagé.</li>
<li>🟢✨ <b>Vert clignotant</b> : le vert clignote <b>3 fois pendant les 3 dernières secondes</b> avant le jaune. Il n'existe que sur les routes où la vitesse autorisée dépasse <b>60 km/h</b>. Juridiquement c'est encore un feu vert.</li>
<li>🟡 <b>Jaune</b> : arrête-toi, sauf si tu es trop engagé pour t'arrêter en sécurité.</li>
</ul>
<div class="keyfact">🟡 <b>Jaune clignotant</b> = le feu est <b>hors service</b> : avance avec prudence en suivant les panneaux et les règles de priorité.</div>
<div class="keyfact">📏 Les instructions d'un <b>feu</b> priment sur les <b>panneaux</b> — SAUF quand le feu est en jaune clignotant.</div>
<div class="warnfact">🚫 Interdit d'entrer dans un carrefour (même au vert !) si tu ne peux pas le <b>traverser et le dégager entièrement</b>.</div>`},

{icon:'⚖️', title:'Les priorités', sub:'Priorité à droite, ronds-points, urgences, piétons',
 body:`
<h4>Règles de base</h4>
<ul>
<li>Carrefour sans signalisation : priorité au véhicule venant de <b>droite</b>.</li>
<li>Celui qui <b>tourne à gauche</b> cède aux véhicules venant en face.</li>
<li>Celui qui sort d'un <b>chemin de terre</b> cède à la route revêtue.</li>
<li><b>Rond-point</b> : celui qui entre cède à ceux <b>déjà dans l'anneau</b> (le trafic venant de ta gauche).</li>
</ul>
<h4>Véhicules d'urgence (רכב ביטחון)</h4>
<p>Police, ambulance, pompiers ou Tsahal avec sirène et gyrophare : <b>range-toi le plus à droite possible, hors du carrefour, et ARRÊTE-toi</b> jusqu'à leur passage. Interdiction de suivre un véhicule d'urgence à moins de 100 m.</p>
<h4>Piétons</h4>
<ul>
<li>Passage piétons : laisse les piétons engagés <b>terminer leur traversée</b>, arrête-toi si nécessaire.</li>
<li>Tu dois <b>ralentir dès qu'un piéton attend au bord</b> avec l'intention manifeste de traverser, et lui céder le passage.</li>
<li>Bus arrêté qui fait monter/descendre des passagers : <b>ralentis, arrête-toi si nécessaire</b>.</li>
</ul>
<div class="warnfact">🚌 Un bus qui signale sa sortie d'un arrêt : facilite-lui l'insertion — mais c'est une <b>courtoisie recommandée</b>, pas une priorité légale.</div>`},

{icon:'🚗', title:'Vitesses et distances', sub:'Les chiffres à connaître par cœur',
 body:`
<table>
<tr><th>Type de route</th><th>Par défaut</th><th>Max si signalé</th></tr>
<tr><td>Agglomération (après le panneau « maison » 424)</td><td><b>50</b> km/h</td><td>80</td></tr>
<tr><td>Route interurbaine sans séparation</td><td><b>80</b> km/h</td><td>100</td></tr>
<tr><td>Route interurbaine avec séparation construite</td><td><b>90</b> km/h</td><td>110</td></tr>
<tr><td>Autoroute (דרך מהירה)</td><td><b>110</b> km/h</td><td>120</td></tr>
</table>
<p class="muted">Route 6 (péage) : 110 sur la majorité du tracé, 120 sur la section centrale — suis la signalisation.</p>
<h4>Distance de sécurité</h4>
<ul>
<li>Minimum <b>légal</b> : <b>1 seconde</b> d'écart avec le véhicule qui précède.</li>
<li>Standard enseigné (et attendu à l'examen pratique) : <b>2 secondes</b> — <b>3 secondes</b> par mauvais temps.</li>
<li>Compte « vingt-et-un, vingt-deux » quand le véhicule devant passe un repère fixe.</li>
</ul>
<div class="keyfact">⚠️ Quelle que soit la limite affichée, tu dois <b>adapter la vitesse aux conditions</b> : ralentir près des écoles, passages piétons, virages, sommets de côte, par pluie…</div>
<h4>Dépassement</h4>
<ul>
<li>On dépasse <b>uniquement par la gauche</b>, si la route est dégagée et la visibilité suffisante.</li>
<li>Interdit : sur ligne continue, à l'approche d'un <b>passage piétons</b>, entre le panneau de <b>passage à niveau</b> et le passage, dans un carrefour, ou sans visibilité.</li>
</ul>`},

{icon:'🅿️', title:'Arrêt, stationnement et bordures', sub:'Les couleurs de trottoirs + les distances interdites',
 body:`
<h4>Les bordures peintes — à connaître PAR CŒUR</h4>
<table>
<tr><th>Bordure</th><th>Signification</th></tr>
<tr><td><span class="curb" style="background:repeating-linear-gradient(90deg,#c8102e 0 11px,#fff 11px 22px)"></span>Rouge-blanc</td><td><b>Arrêt ET stationnement interdits</b></td></tr>
<tr><td><span class="curb" style="background:repeating-linear-gradient(90deg,#0e63ae 0 11px,#fff 11px 22px)"></span>Bleu-blanc</td><td>Stationnement <b>payant/réglementé</b> (panneau municipal)</td></tr>
<tr><td><span class="curb" style="background:repeating-linear-gradient(90deg,#c8102e 0 11px,#ffd400 11px 22px)"></span>Rouge-jaune</td><td>Arrêt de <b>bus / taxis</b> uniquement</td></tr>
<tr><td><span class="curb" style="background:repeating-linear-gradient(90deg,#22262b 0 11px,#fff 11px 22px)"></span>Noir-blanc</td><td>Mise en évidence d'un <b>obstacle</b> (îlot, terre-plein)</td></tr>
<tr><td><span class="curb" style="background:#8d939c"></span>Non peinte</td><td>Libre par défaut (sauf panneaux et règles générales)</td></tr>
</table>
<h4>Distances d'interdiction (règle 72)</h4>
<ul>
<li>Dans un carrefour et à moins de <b>12 m</b> de celui-ci.</li>
<li>Sur un passage piétons et dans les <b>12 m AVANT</b> lui.</li>
<li>À moins de <b>20 m</b> d'un passage à niveau.</li>
<li>Dans la zone d'un <b>arrêt de bus</b> (~20 m de part et d'autre).</li>
</ul>
<div class="keyfact">🪧 Panneau 432 (une barre) = stationnement interdit, arrêt bref toléré. Panneau 433 (double barre rouge-blanc-rouge) = même s'arrêter est interdit.</div>`},

{icon:'🛡️', title:'Conduite et sécurité', sub:'Alcool, ceintures, enfants, téléphone, phares, gilet',
 body:`
<h4>Alcool</h4>
<ul>
<li>Limite générale : <b>240 µg</b> d'alcool par litre d'air expiré (≈ 0,05 %).</li>
<li>Conducteurs de <b>moins de 24 ans</b>, <b>nouveaux conducteurs</b> et <b>professionnels</b> : <b>50 µg</b> — quasi tolérance zéro. Un seul verre suffit à dépasser.</li>
</ul>
<h4>Ceintures et enfants</h4>
<ul>
<li>Ceinture obligatoire pour <b>tous</b>, à l'avant comme à l'arrière.</li>
<li>Bébé de <b>moins d'1 an</b> : siège bébé <b>dos à la route</b> (jamais devant un airbag actif).</li>
<li>Jusqu'à <b>3 ans</b> : siège enfant homologué.</li>
<li>De <b>3 à 8 ans</b> : siège ou <b>rehausseur</b>.</li>
<li>À partir de <b>8 ans</b> : ceinture du véhicule.</li>
</ul>
<h4>Téléphone</h4>
<p>Interdit de tenir ou toucher le téléphone en conduisant : uniquement <b>kit mains libres</b>, téléphone <b>fixé</b>. Amende type : 1 000 ₪ et 8 points.</p>
<h4>Phares et gilet</h4>
<ul>
<li>Du <b>1er novembre au 31 mars</b> : feux de croisement allumés <b>de jour</b> sur route <b>interurbaine</b> (motos : toute l'année).</li>
<li><b>Gilet réfléchissant</b> : obligatoire dans l'habitacle, et à porter dès qu'on sort du véhicule sur route <b>non urbaine</b>.</li>
</ul>`},

{icon:'🎓', title:"L'examen théorie en pratique", sub:'Format, langues, inscription — et comment réviser en 5 jours',
 body:`
<h4>Le format</h4>
<ul>
<li>QCM sur ordinateur : <b>30 questions</b>, 4 réponses possibles, une seule correcte.</li>
<li>Réussite : <b>26 bonnes réponses</b> minimum (4 erreurs max).</li>
<li>Durée : <b>40 minutes</b>. Résultat affiché immédiatement.</li>
<li>L'examen existe en <b>7 langues, dont le FRANÇAIS</b> 🇫🇷 (hébreu, arabe, russe, amharique, anglais, français, espagnol).</li>
</ul>
<h4>Inscription et jour J</h4>
<ul>
<li>Prérequis : dossier ouvert (« formulaire vert », avec test de vue chez un optométriste agréé).</li>
<li>Inscription en ligne sur <b>theorytest.org.il</b> — 22 centres dans le pays. Taxe : <b>76 ₪</b> (à repayer à chaque tentative).</li>
<li>Arrive <b>15 minutes en avance</b>. Sacs et téléphones interdits en salle (casiers fournis).</li>
<li>⚠️ Depuis le 1er février 2026 : <b>pièce d'identité BIOMÉTRIQUE</b> obligatoire (teoudat zehout à puce, passeport israélien valide ou permis).</li>
<li>Le résultat reste valable <b>5 ans</b>. En cas de désaccord, contestation en ligne sous 7 jours ouvrés.</li>
</ul>
<h4>Réviser en 5 jours — la méthode</h4>
<div class="keyfact">💡 Toutes les questions de l'examen sont tirées de la <b>banque officielle publiée</b> par le ministère — il n'y a pas de questions surprises. Après avoir compris la théorie ici, enchaîne les simulations dans la langue de ton examen jusqu'à obtenir 28+/30 de façon stable.</div>
<ul>
<li>Banque officielle : gov.il (מאגר השאלות) — interface hébreu/anglais.</li>
<li><b>En français : meteoria.co.il</b> propose les questions officielles traduites (aussi : test4u.co.il, easyteo.co.il, testil.com en hébreu).</li>
</ul>
<p class="muted">Titulaires d'un permis étranger : la conversion se fait normalement SANS examen théorique (permis ≥ 5 ans : sur documents ; &lt; 5 ans : test pratique de contrôle). La théorie n'est exigée qu'après deux échecs au pratique — ou pour un premier permis.</p>`},
];

/* ============ QUESTIONS THÉORIE ============ */
const QUESTIONS = [
{q:"En agglomération, sans panneau de limitation, la vitesse maximale est de :",
 choices:["50 km/h","60 km/h","70 km/h","40 km/h"], answer:0,
 explain:"En zone urbaine (après le panneau « maison rouge » 424), la limite par défaut est de 50 km/h."},
{q:"Sur autoroute, sans signalisation particulière, la vitesse maximale est de :",
 choices:["110 km/h","120 km/h","100 km/h","90 km/h"], answer:0,
 explain:"110 km/h par défaut sur autoroute ; la signalisation peut la porter à 120 km/h maximum (ex. section centrale de la Route 6)."},
{q:"Sur une route interurbaine SANS séparation centrale, la vitesse par défaut est de :",
 choices:["80 km/h","90 km/h","100 km/h","70 km/h"], answer:0,
 explain:"80 km/h sans séparation ; 90 km/h avec séparation construite ; 110 sur autoroute."},
{q:"Le feu vert se met à clignoter. Cela signifie :",
 choices:["Le vert se termine : le jaune arrive dans 3 secondes","Le feu est en panne","Passage réservé aux transports publics","Il faut accélérer pour passer"], answer:0,
 explain:"Le vert clignote 3 fois pendant les 3 dernières secondes avant le jaune — uniquement sur les routes où la vitesse dépasse 60 km/h. C'est légalement encore un feu vert."},
{q:"Rouge et jaune allumés ensemble signifient :",
 choices:["Prépare-toi à démarrer, mais ne passe pas encore","Tu peux passer prudemment","Le feu est hors service","Arrêt réservé aux bus"], answer:0,
 explain:"La séquence israélienne comprend rouge+jaune avant le vert : préparation au démarrage, franchissement toujours interdit."},
{q:"Un feu JAUNE CLIGNOTANT signifie :",
 choices:["Feu hors service : avance selon les panneaux et les priorités","Prépare-toi à t'arrêter","Priorité aux piétons uniquement","Danger : route fermée"], answer:0,
 explain:"Jaune clignotant = feu pas en service. On obéit alors aux panneaux et aux règles de priorité."},
{q:"À un carrefour sans aucune signalisation, qui a la priorité ?",
 choices:["Le véhicule venant de droite","Le véhicule venant de gauche","Le plus rapide","Celui qui va tout droit, toujours"], answer:0,
 explain:"Règle 64 : à intersection non signalée, on cède au véhicule venant de la droite."},
{q:"À l'entrée d'un rond-point, tu dois :",
 choices:["Céder la priorité aux véhicules déjà dans l'anneau","Passer en premier si tu viens de droite","T'arrêter complètement dans tous les cas","Klaxonner avant d'entrer"], answer:0,
 explain:"Celui qui entre cède à ceux qui circulent déjà dans l'anneau, puis contourne l'îlot par la droite (panneau 303)."},
{q:"Une ambulance arrive derrière toi, sirène et gyrophare allumés. Tu dois :",
 choices:["Te ranger le plus à droite possible, hors du carrefour, et t'arrêter","Accélérer pour libérer la route","Continuer normalement","Freiner sur place immédiatement"], answer:0,
 explain:"Règle 93 : se ranger à droite hors intersection et s'ARRÊTER jusqu'au passage du véhicule d'urgence. Interdit de le suivre à moins de 100 m."},
{q:"L'écart MINIMUM légal avec le véhicule qui précède est de :",
 choices:["1 seconde","2 secondes","3 secondes","10 mètres dans tous les cas"], answer:0,
 explain:"Le minimum légal (règle 49) est de 1 seconde ; le standard enseigné est 2 secondes, et 3 par mauvais temps."},
{q:"Limite d'alcoolémie pour un NOUVEAU conducteur ou un conducteur de moins de 24 ans :",
 choices:["50 µg par litre d'air expiré (quasi zéro)","240 µg par litre d'air expiré","Un verre de vin autorisé","Aucune limite spécifique"], answer:0,
 explain:"Jeunes (<24 ans), nouveaux conducteurs et professionnels : 50 µg/L — la limite générale est de 240 µg/L (≈0,05 %)."},
{q:"Un enfant de 5 ans doit voyager :",
 choices:["Dans un siège ou rehausseur adapté","Avec la ceinture seule à l'arrière","Sur les genoux d'un adulte ceinturé","À l'avant obligatoirement"], answer:0,
 explain:"De 3 à 8 ans : siège enfant ou rehausseur. Ceinture seule à partir de 8 ans."},
{q:"Un bébé de 8 mois doit être installé :",
 choices:["Dos à la route, jamais devant un airbag actif","Face à la route à l'arrière","Face à la route à l'avant","Dans un rehausseur"], answer:0,
 explain:"Moins d'1 an : siège bébé dos à la route ; interdit à l'avant si l'airbag frontal est actif."},
{q:"Utiliser son téléphone en conduisant est permis :",
 choices:["Uniquement via un kit mains libres, téléphone fixé","En le tenant à la main aux feux rouges","Pour les SMS courts","Jamais, même en mains libres"], answer:0,
 explain:"Seul le mains libres (דיבורית) avec téléphone fixé est autorisé. Tenir ou manipuler le téléphone : 1 000 ₪ et 8 points."},
{q:"En hiver, les feux de croisement de jour sont obligatoires :",
 choices:["Du 1er novembre au 31 mars, sur route interurbaine","Toute l'année, partout","Seulement quand il pleut","Du 1er décembre au 28 février"], answer:0,
 explain:"Règle 97 : du 1.11 au 31.3, feux allumés de jour hors agglomération (motos : toute l'année)."},
{q:"Une bordure de trottoir peinte ROUGE et BLANC signifie :",
 choices:["Arrêt ET stationnement interdits","Stationnement payant","Arrêt permis 5 minutes","Réservé aux résidents"], answer:0,
 explain:"Rouge-blanc = ni arrêt ni stationnement. C'est LE grand classique de l'examen."},
{q:"Une bordure peinte BLEU et BLANC signifie :",
 choices:["Stationnement payant/réglementé selon le panneau municipal","Stationnement gratuit illimité","Arrêt interdit","Réservé aux bus"], answer:0,
 explain:"Bleu-blanc = stationnement réglementé (heures, tarif, parfois résidents) — voir le panneau à proximité."},
{q:"Une bordure peinte ROUGE et JAUNE signifie :",
 choices:["Arrêt réservé aux bus/taxis — interdit aux autres","Stationnement payant","Zone de chantier","Stationnement de nuit uniquement"], answer:0,
 explain:"Rouge-jaune = arrêt de bus ou station de taxis : ni arrêt ni stationnement pour les autres véhicules."},
{q:"Le stationnement est interdit à moins de … d'un carrefour :",
 choices:["12 mètres","5 mètres","20 mètres","30 mètres"], answer:0,
 explain:"Règle 72 : interdiction dans le carrefour et à moins de 12 m ; idem 12 m avant un passage piétons ; 20 m d'un passage à niveau."},
{q:"On dépasse un autre véhicule :",
 choices:["Par la gauche uniquement, avec visibilité suffisante","Par la droite si la voie est libre","Des deux côtés sur autoroute","Par la droite en agglomération"], answer:0,
 explain:"Règle 47 : dépassement par la gauche uniquement, route dégagée et visibilité adéquate."},
{q:"Sous un panneau « dépassement interdit » (420), il reste permis de dépasser :",
 choices:["Une moto ou un vélo","Un camion lent","Un bus","Rien du tout"], answer:0,
 explain:"L'interdiction vise les véhicules « à plus de deux roues » : dépasser un deux-roues reste permis."},
{q:"La ligne JAUNE continue au bord droit de la chaussée :",
 choices:["Délimite l'accotement — roule à sa gauche","Sépare les deux sens de circulation","Interdit le stationnement","Réservée aux bus"], answer:0,
 explain:"En Israël, la ligne jaune de rive délimite l'accotement (שול). Ce n'est PAS une séparation de sens."},
{q:"En zone de travaux, un marquage ORANGE contredit le marquage blanc. Tu suis :",
 choices:["Le marquage orange","Le marquage blanc","Le plus restrictif des deux","Aucun : tu t'arrêtes"], answer:0,
 explain:"Le marquage temporaire orange PRIME sur le marquage permanent blanc en zone de chantier."},
{q:"Au panneau STOP israélien (main levée), tu dois :",
 choices:["T'arrêter complètement, même si la voie est totalement libre","Ralentir et passer si c'est libre","T'arrêter seulement si un véhicule arrive","Céder uniquement aux piétons"], answer:0,
 explain:"Le STOP exige un arrêt complet dans tous les cas, puis on cède la priorité. Le « cédez » (301) permet lui de passer sans arrêt si c'est libre."},
{q:"Un panneau interdit de tourner à gauche (429). Le demi-tour à gauche est :",
 choices:["Permis, sauf panneau 431, marquage contraire ou panneau monté sur un feu","Interdit aussi, toujours","Permis uniquement de nuit","Interdit sauf pour les taxis"], answer:0,
 explain:"Gros piège officiel : 429 seul n'interdit PAS le demi-tour. Il faut un 430/431 (ou un 429 au-dessus d'un feu) pour l'interdire."},
{q:"Quels véhicules peuvent entrer sur une autoroute (panneau 216) ?",
 choices:["Ceux capables de rouler à au moins 60 km/h","Tous les véhicules à moteur","Ceux qui roulent à plus de 80 km/h","Uniquement les voitures particulières"], answer:0,
 explain:"L'autoroute est interdite aux piétons, vélos, animaux et à tout véhicule ne pouvant rouler à 60 km/h minimum."},
{q:"Dans une rue résidentielle partagée (panneau 220), les piétons :",
 choices:["Peuvent utiliser toute la largeur de la rue","Doivent rester sur le trottoir","Sont interdits sur la chaussée","N'ont priorité qu'aux passages"], answer:0,
 explain:"Dans un רחוב משולב, les piétons (et les enfants qui jouent) peuvent utiliser toute la rue : conduis au pas, prêt à t'arrêter."},
{q:"Le panneau rond à bordure rouge portant une maison (424), à l'entrée d'une ville, signifie :",
 choices:["Zone urbaine : 50 km/h par défaut","Zone résidentielle : 30 km/h","Hôtel à proximité","Stationnement résidentiel"], answer:0,
 explain:"Le panneau « maison » (424) marque l'entrée d'une zone de routes urbaines : 50 km/h sauf indication contraire."},
{q:"Tu tombes en panne sur une route interurbaine et tu sors du véhicule. Tu dois :",
 choices:["Porter le gilet réfléchissant","Allumer le plafonnier","Rester dans la voiture obligatoirement","Placer le triangle à 5 mètres"], answer:0,
 explain:"Le gilet réfléchissant doit être à portée du conducteur et porté dès qu'on sort du véhicule hors agglomération."},
{q:"Le feu est vert mais le carrefour est bouché. Tu :",
 choices:["N'entres pas tant que tu ne peux pas le dégager entièrement","Entres puisque c'est vert","Klaxonnes et avances","Passes lentement au milieu"], answer:0,
 explain:"Règle 65 : interdiction d'entrer dans une intersection, même au vert, si on ne peut pas la traverser et la dégager."},
{q:"Un signaleur de chantier te présente un panneau STOP mobile (304). Tu repars :",
 choices:["Seulement quand il t'y autorise (ou montre le panneau 305)","Dès que la voie te semble libre","Après 3 secondes d'arrêt","Quand le véhicule devant avance"], answer:0,
 explain:"Après un 304, on ne repart que sur autorisation du signaleur ou à la présentation du 305 « avance avec prudence »."},
{q:"Celui qui tourne à GAUCHE dans un carrefour :",
 choices:["Cède le passage aux véhicules venant en face","A la priorité sur tout le monde","Passe avant ceux qui viennent de droite","Doit klaxonner"], answer:0,
 explain:"Le tourne-à-gauche cède aux véhicules venant en face (et aux piétons qui traversent la rue où il s'engage)."},
{q:"Combien de temps le résultat de l'examen théorique reste-t-il valable ?",
 choices:["5 ans","6 mois","1 an","2 ans"], answer:0,
 explain:"Le résultat de la théorie est valable 5 ans (règle mise à jour — d'anciennes sources citent encore 2-3 ans)."},
];

/* ============ INJECTION ============ */
const file = '/Users/garyb/side_projects/code-route-israel/index.html';
let html = fs.readFileSync(file, 'utf8');

const signs = META.map(m => {
  const svg = SVGS[m.id];
  if (!svg) throw new Error('SVG manquant: ' + m.id);
  return { id: m.id, cat: m.cat, num: m.num, name: m.name, short: m.short, sens: m.sens, tip: m.tip, svg };
});

function inject(name, code) {
  const re = new RegExp('^const ' + name + ' = .*$', 'm');
  if (!re.test(html)) throw new Error('Ligne introuvable: const ' + name);
  html = html.replace(re, code);
}

inject('SIGNS', 'const SIGNS = ' + JSON.stringify(signs) + ';');
inject('LESSONS', 'const LESSONS = ' + JSON.stringify(LESSONS) + ';');
inject('THEORY_QUESTIONS', 'const THEORY_QUESTIONS = ' + JSON.stringify(QUESTIONS) + ';');

fs.writeFileSync(file, html);
console.log('Injection OK —', signs.length, 'panneaux,', LESSONS.length, 'leçons,', QUESTIONS.length, 'questions');
console.log('Taille finale :', Math.round(html.length / 1024), 'Ko');
