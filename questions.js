const questionsData = {
    part1: [
        {
            question: "Quel mot-clé permet de déclarer une variable accessible uniquement dans le bloc où elle est définie ?",
            choices: ["var", "let", "const", "function"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode permet de transformer un tableau en chaîne de caractères en insérant un séparateur ?",
            choices: ["split()", "join()", "concat()", "reduce()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Que retourne typeof null en JavaScript ?",
            choices: ["\"null\"", "\"undefined\"", "\"object\"", "\"string\""],
            correct: 2,
            type: "single"
        },
        {
            question: "Comment s'appelle la phase où JavaScript prépare les déclarations de variables et de fonctions en mémoire avant l'exécution ?",
            choices: ["Héritage", "Initialisation", "Hoisting", "Instanciation"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quelle méthode ajoute un ou plusieurs éléments à la fin d'un tableau ?",
            choices: ["push()", "pop()", "unshift()", "shift()"],
            correct: 0,
            type: "single"
        },
        {
            question: "Lequel de ces types n'existe pas en JavaScript ?",
            choices: ["number", "boolean", "symbol", "double"],
            correct: 3,
            type: "single"
        },
        {
            question: "Quelle méthode est utilisée pour convertir une chaîne en nombre entier ?",
            choices: ["parseInt()", "parseFloat()", "Number()", "Math.floor()"],
            correct: 0,
            type: "single"
        },
        {
            question: "Quel est le résultat de '5' + 3 ?",
            choices: ["8", "53", "NaN", "Lève une erreur"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle structure permet de gérer les erreurs avec un bloc d'exécution et un bloc de récupération ?",
            choices: ["if / else", "try / catch", "switch / case", "throw / return"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quel mot-clé est utilisé pour stopper entièrement une boucle for ?",
            choices: ["stop", "exit", "break", "return"],
            correct: 2,
            type: "single"
        },
        {
            question: "Que fait Array.prototype.map() ?",
            choices: ["Il modifie le tableau d'origine", "Il renvoie un nouveau tableau transformé", "Il efface le contenu du tableau", "Il trie le tableau"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle est la portée d'une variable déclarée avec var dans une fonction ?",
            choices: ["Portée bloc", "Portée globale", "Portée de fonction", "Portée script uniquement"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quelle est la sortie de console.log(2 == '2') ?",
            choices: ["true", "false", "undefined", "Erreur de type"],
            correct: 0,
            type: "single"
        },
        {
            question: "Que retourne typeof [] ?",
            choices: ["\"array\"", "\"object\"", "\"[]\"", "\"undefined\""],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode permet de vérifier si un tableau contient un élément ?",
            choices: ["Array.includes()", "Array.has()", "Array.find()", "Array.match()"],
            correct: 0,
            type: "single"
        },
        {
            question: "Que renvoie false == 0 ?",
            choices: ["true", "false", "undefined", "Lève une erreur"],
            correct: 0,
            type: "single"
        },
        {
            question: "Quelle méthode supprime le dernier élément d'un tableau et le renvoie ?",
            choices: ["push()", "pop()", "shift()", "splice()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle syntaxe permet de déstructurer un objet ?",
            choices: ["let { nom } = objet;", "let [ nom ] = objet;", "let ( nom ) = objet;", "let <nom> = objet;"],
            correct: 0,
            type: "single"
        },
        {
            question: "Comment déclarer une constante en JavaScript ?",
            choices: ["var CONSTANT", "let constant", "const constant", "CONST constant"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quel est le résultat de typeof NaN ?",
            choices: ["\"number\"", "\"NaN\"", "\"undefined\"", "\"object\""],
            correct: 0,
            type: "single"
        },
        {
            question: "Quelle méthode JSON convertit une chaîne JSON en objet JavaScript ?",
            choices: ["JSON.stringify()", "JSON.parse()", "JSON.format()", "JSON.decode()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Que renvoie typeof function(){} ?",
            choices: ["\"function\"", "\"object\"", "\"function object\"", "\"undefined\""],
            correct: 0,
            type: "single"
        },
        {
            question: "Lequel de ces opérateurs est utilisé pour la décomposition d'un tableau en arguments de fonction ?",
            choices: ["...", "::", ">>", "??"],
            correct: 0,
            type: "single"
        },
        {
            question: "Que fait l'opérateur ?? (nullish coalescing) ?",
            choices: ["Compare strictement deux valeurs", "Retourne la valeur de droite si la valeur de gauche est null ou undefined", "Effectue la fusion de deux objets", "Vérifie si la valeur est strictement null"],
            correct: 1,
            type: "single"
        },
        {
            question: "Que se passe-t-il si on appelle une fonction avant sa déclaration avec function maFonction(){} ?",
            choices: ["Erreur de référence", "La fonction est hoistée, donc accessible", "La fonction est ignorée", "Le code plante uniquement en mode strict"],
            correct: 1,
            type: "single"
        },
        {
            question: "Lequel de ces mots-clés est utilisé pour marquer une fonction asynchrone ?",
            choices: ["await", "async", "defer", "promise"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment s'appelle le 'style' d'écriture JavaScript sans framework, ni librairie spécifique ?",
            choices: ["Node.js core", "ES6 standard", "Vanilla JS", "Pure ECMAScript"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quelle clause permet de capturer une erreur dans un bloc try ?",
            choices: ["catch", "error", "finally", "rescue"],
            correct: 0,
            type: "single"
        },
        {
            question: "Dans un async function, que renvoie la ligne return 10; ?",
            choices: ["10 directement", "Une promesse résolue avec la valeur 10", "Une promesse rejetée", "Une valeur undefined"],
            correct: 1,
            type: "single"
        },
        {
            question: "La méthode Array.prototype.reduce() prend combien de paramètres pour la fonction de rappel ?",
            choices: ["1 (l'élément courant)", "2 (l'accumulateur et l'élément courant)", "4 (accumulateur, valeur courante, index, tableau)", "3 (accumulateur, valeur courante, tableau)"],
            correct: 2,
            type: "single"
        },
        {
            question: "Dans une fonction fléchée à un seul paramètre, que peut-on omettre ?",
            choices: ["Les parenthèses autour du paramètre", "Le mot-clé function", "Le return si on met des accolades", "Les accolades si on renvoie directement une valeur"],
            correct: 0,
            type: "single"
        },
        {
            question: "Sur quelle méthode d'Array se base-t-on pour vérifier si au moins un élément remplit une condition ?",
            choices: ["find()", "some()", "map()", "every()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans une fonction async, utiliser throw new Error('...') :",
            choices: ["Rejette la promesse retournée", "Résout la promesse avec un objet Error", "Interrompt l'exécution sans effet sur la promesse", "Génère un warning sans stopper l'exécution"],
            correct: 0,
            type: "single"
        },
        {
            question: "Array.prototype.every() retourne true si :",
            choices: ["Au moins un élément satisfait la condition", "Tous les éléments satisfont la condition", "Aucun élément ne satisfait la condition", "Le tableau est vide"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quel est le résultat de typeof NaN ?",
            choices: ["\"number\"", "\"NaN\"", "\"undefined\"", "\"object\""],
            correct: 0,
            type: "single"
        },
        {
            question: "Quelle méthode permet de chainer des promesses de façon séquentielle ?",
            choices: ["promise.stack()", "promise.next()", "promise.then()", "promise.link()"],
            correct: 2,
            type: "single"
        },
        {
            question: "Comment nomme-t-on une fonction passée en paramètre à une autre fonction ?",
            choices: ["Fonction dynamique", "Fonction callback", "Fonction fléchée", "Fonction asynchrone"],
            correct: 1,
            type: "single"
        }
    ],
    part2: [
        {
            question: "Quelles sont les méthodes qui modifient directement le tableau initial ?",
            choices: ["map()", "splice()", "push()", "pop()"],
            correct: [1, 2, 3],
            type: "multiple"
        },
        {
            question: "Quelles valeurs sont considérées comme falsy en JavaScript ?",
            choices: ["false", "0", "null", "undefined"],
            correct: [0, 1, 2, 3],
            type: "multiple"
        },
        {
            question: "Lesquels de ces opérateurs sont des opérateurs logiques ?",
            choices: ["&&", "||", "===", "!"],
            correct: [0, 1, 3],
            type: "multiple"
        },
        {
            question: "Lesquels de ces objets sont des objets globaux du navigateur ?",
            choices: ["window", "document", "console", "NodeList"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces syntaxes créent un tableau vide ?",
            choices: ["const arr = [];", "const arr = new Array();", "const arr = {};", "const arr = [null];"],
            correct: [0, 1],
            type: "multiple"
        },
        {
            question: "Quels mots-clés permettent de déclarer des variables en ES6 ?",
            choices: ["var", "let", "const", "function"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces types sont des types primitifs en JavaScript ?",
            choices: ["string", "number", "boolean", "object"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Quels sont les deux paramètres de base de la fonction exécuteur d'une promesse ?",
            choices: ["resolve", "reject", "success", "error"],
            correct: [0, 1],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces boucles existent en JavaScript ?",
            choices: ["for", "for...in", "for...of", "foreach"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Quels événements sont liés aux clics de souris ?",
            choices: ["click", "dblclick", "contextmenu", "mouseover"],
            correct: [0, 1, 2, 3],
            type: "multiple"
        },
        {
            question: "Quels opérateurs comparent strictement sans conversion de type ?",
            choices: ["==", "===", "!==", "!="],
            correct: [1, 2],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces méthodes sont disponibles sur un objet Promise ?",
            choices: [".then()", ".catch()", ".all()", ".finally()"],
            correct: [0, 1, 2, 3],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces valeurs sont évaluées à true en contexte booléen ?",
            choices: ["'0' (string)", "[] (tableau vide)", "null", "{} (objet vide)"],
            correct: [0, 1, 3],
            type: "multiple"
        },
        {
            question: "Lesquels de ces objets sont utilisables pour effectuer des requêtes HTTP en JavaScript ?",
            choices: ["XMLHttpRequest", "fetch", "axios", "Response"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces méthodes peuvent être utilisées pour itérer sur un tableau sans modifier l'original ?",
            choices: ["forEach()", "map()", "reduce()", "splice()"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces mots-clés sont des instructions de saut ?",
            choices: ["break", "continue", "exit", "return"],
            correct: [0, 1, 3],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces lignes sont correctes pour convertir une chaîne en nombre ?",
            choices: ["Number(\"42\")", "parseInt(\"42\")", "\"42\" * 1", "toInteger(\"42\")"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces syntaxes sont valides pour une fonction fléchée ?",
            choices: ["() => {}", "(x) => x * 2", "(x, y) => { return x + y }", "x => { x * 2 }"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces types de données sont immuables ?",
            choices: ["string", "boolean", "object", "number"],
            correct: [0, 1, 3],
            type: "multiple"
        },
        {
            question: "Dans un try...catch, que se passe-t-il si le try ne lève aucune exception ?",
            choices: ["Le catch est ignoré", "Le catch est exécuté quand même", "Le code se poursuit normalement", "Une erreur est levée si aucun finally"],
            correct: [0, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces événements JavaScript sont liés au clavier ?",
            choices: ["keydown", "keypress", "keyup", "onload"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces statements contrôlent le flux conditionnel ?",
            choices: ["if / else", "switch / case", "for / while", "throw / catch"],
            correct: [0, 1],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces méthodes peuvent ajouter des éléments à un tableau ?",
            choices: ["push()", "unshift()", "concat()", "slice()"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquels de ces objets sont des constructeurs natifs en JavaScript ?",
            choices: ["Array", "Object", "Function", "React"],
            correct: [0, 1, 2],
            type: "multiple"
        },
        {
            question: "Lesquelles de ces méthodes peuvent transformer un tableau en chaîne de caractères ?",
            choices: ["join()", "toString()", "pop()", "toLocaleString()"],
            correct: [0, 1, 3],
            type: "multiple"
        }
    ],
    part3: [
        {
            question: "Quelle syntaxe permet de définir une fonction auto-invoquée (IIFE) ?",
            choices: ["function() { ... }();", "(function() { ... })();", "(() => { ... })();", "auto function() { ... }"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle propriété d'un objet Promise indique son état courant ?",
            choices: ["status", "state", "Il n'existe pas de propriété publique pour ça", "result"],
            correct: 2,
            type: "single"
        },
        {
            question: "Comment appelle-t-on la fonctionnalité qui propage les arguments d'un tableau dans une fonction ?",
            choices: ["L'opérateur spread ...", "La méthode apply()", "L'opérateur rest ...", "La déstructuration de tableau"],
            correct: 0,
            type: "single"
        },
        {
            question: "Dans quel cas peut-on utiliser le mot-clé await ?",
            choices: ["Dans n'importe quelle fonction", "Uniquement dans une fonction marquée async", "Dans un bloc if", "Dans une fonction fléchée classique"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle est la sortie de la fonction fléchée (() => 42)() ?",
            choices: ["undefined", "42", "Erreur de syntaxe", "Objet Promise"],
            correct: 1,
            type: "single"
        },
        {
            question: "Pour gérer des actions asynchrones successives, laquelle de ces syntaxes est la plus moderne ?",
            choices: ["Les callbacks imbriqués", "Les promesses chaînées", "L'utilisation de async/await", "L'utilisation de setTimeout"],
            correct: 2,
            type: "single"
        },
        {
            question: "Dans une IIFE, les variables déclarées avec var sont :",
            choices: ["Globales", "Accessibles uniquement dans la fonction IIFE", "Inexistantes, c'est interdit", "Converties en let"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode peut transformer un tableau en un seul résultat (accumulateur) ?",
            choices: ["some()", "reduce()", "every()", "map()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Une fonction auto-invoquée (IIFE) a pour but principal de :",
            choices: ["Déclarer un module ESM", "Éviter la pollution de l'espace global", "Empêcher toute réutilisation de la fonction", "Remplacer une fonction fléchée"],
            correct: 1,
            type: "single"
        },
        {
            question: "Lequel n'est pas un mot-clé permettant la déstructuration ?",
            choices: ["let { x } = obj;", "let [ y ] = arr;", "const { z } = obj;", "unpack { a } = obj;"],
            correct: 3,
            type: "single"
        },
        {
            question: "Dans un async function, que retourne par défaut un appel à cette fonction ?",
            choices: ["Une promesse", "Un générateur", "Le résultat brut de la fonction", "Un tableau"],
            correct: 0,
            type: "single"
        },
        {
            question: "Que fait la méthode Array.prototype.some() ?",
            choices: ["Teste si au moins un élément satisfait la condition", "Transforme chaque élément pour en faire un nouvel array", "Vérifie si tous les éléments satisfont une condition", "Filtre les éléments"],
            correct: 0,
            type: "single"
        },
        {
            question: "L'utilisation de return dans une méthode d'array comme forEach() est :",
            choices: ["Possible pour sauter au prochain élément", "Ignorée par la méthode forEach()", "Termine la boucle", "Change la valeur de this"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans une fonction fléchée, si on ne met pas d'accolades et on écrit () => 42, que se passe-t-il ?",
            choices: ["La fonction renvoie toujours undefined", "La fonction renvoie la valeur 42", "La fonction ne compile pas", "On obtient un objet Promise"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode de l'Array invoque une fonction pour chaque élément et accumule un seul résultat final ?",
            choices: ["reduce()", "map()", "every()", "some()"],
            correct: 0,
            type: "single"
        },
        {
            question: "Quelle est la principale différence entre map() et forEach() ?",
            choices: ["map() modifie le tableau original", "map() renvoie un nouveau tableau, forEach() ne retourne rien", "forEach() est plus rapide", "forEach() autorise le break"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans le DOM, element.firstChild renvoie :",
            choices: ["Le premier nœud enfant (texte ou élément)", "Le premier élément enfant", "Toujours null si ce n'est pas un <div>", "NodeList"],
            correct: 0,
            type: "single"
        },
        {
            question: "La fonction auto-invoquée (IIFE) suivante : (function(x){ console.log(x); })(5);",
            choices: ["Affiche 5", "Provoque une erreur", "Renvoie undefined en console", "Est équivalente à une fonction fléchée"],
            correct: 0,
            type: "single"
        },
        {
            question: "Dans le DOM, document.createElement('script') :",
            choices: ["Ajoute un <script> dans la page directement", "Crée un élément <script> qu'on doit encore attacher au DOM", "Ne fonctionne qu'avec type='module'", "Lance l'exécution du script immédiatement"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode est utilisée pour fusionner deux tableaux sans les modifier ?",
            choices: ["concat()", "push()", "splice()", "merge()"],
            correct: 0,
            type: "single"
        },
        {
            question: "Comment accéder à la valeur d'un attribut data-* en JavaScript ?",
            choices: ["element.dataset.nomAttribut", "element.data.nomAttribut", "element.getAttribute('data-nomAttribut')", "element.getDataAttribute('nomAttribut')"],
            correct: 0,
            type: "single"
        },
        {
            question: "Dans le DOM, quelle méthode renvoie le premier élément correspondant à un sélecteur CSS ?",
            choices: ["document.getElementById()", "document.querySelector()", "document.querySelectorAll()", "document.getElementsByClassName()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans un document HTML, la propriété document.body fait référence :",
            choices: ["À l'élément <head>", "À l'élément <html>", "À l'élément <body>", "À tous les éléments <div>"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quelle est la bonne syntaxe pour ajouter un écouteur d'événement 'click' sur un bouton en JavaScript Vanilla ?",
            choices: ["button.addListener('click', function() { ... });", "button.on('click', function() { ... });", "button.addEventListener('click', function() { ... });", "addEvent(button, 'click', fn);"],
            correct: 2,
            type: "single"
        },
        {
            question: "Dans une page HTML, le DOM est entièrement chargé. Quel événement du document peut-on écouter pour exécuter du code après le parsing initial du HTML ?",
            choices: ["load", "DOMContentLoaded", "onready", "beforeunload"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans un script JavaScript, l'accès à document.querySelectorAll('p') renvoie :",
            choices: ["Un tableau standard", "Un objet NodeList", "Une HTMLCollection", "Une exception si le sélecteur est multiple"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode du DOM insère un nouvel élément en tant qu'enfant à la fin d'un nœud parent ?",
            choices: ["parent.replaceChild(newNode, oldNode)", "parent.appendChild(newNode)", "parent.insertAdjacentHTML('beforeend', newNode)", "parent.addChild(newNode)"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans un gestionnaire d'événements DOM, le paramètre généralement nommé event fait référence à :",
            choices: ["Une chaîne contenant le type d'événement", "L'objet global window", "L'objet décrivant l'événement (position souris, touche pressée, etc.)", "N'existe pas en JavaScript Vanilla"],
            correct: 2,
            type: "single"
        },
        {
            question: "Dans le DOM, element.style.backgroundColor = 'red'; :",
            choices: ["Modifie la couleur de fond", "Lance une exception car background-color est invalide", "Modifie le fichier CSS externe", "Ne fait rien, car les propriétés CSS sont en lecture seule"],
            correct: 0,
            type: "single"
        },
        {
            question: "Pour empêcher la propagation d'un événement vers les éléments parents, on utilise :",
            choices: ["event.preventDefault()", "event.stopPropagation()", "event.cancel()", "event.defaultPrevented = true"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans le DOM, element.classList.add('active') :",
            choices: ["Ajoute la classe active à l'attribut class de l'élément", "Remplace toutes les classes existantes", "Ajoute un style en ligne 'class: active;'", "Efface d'abord toutes les classes, puis ajoute active"],
            correct: 0,
            type: "single"
        },
        {
            question: "En JavaScript moderne, quelle est la meilleure façon de copier un tableau ?",
            choices: ["[...array]", "array.slice()", "Array.from(array)", "new Array(array)"],
            correct: 0,
            type: "single"
        },
        {
            question: "Dans le DOM, element.children diffère de element.childNodes car :",
            choices: ["children ne contient que les nœuds éléments", "children est plus rapide", "children est une méthode", "children est déprécié"],
            correct: 0,
            type: "single"
        },
        {
            question: "Quelle méthode permet de vérifier si un élément DOM contient une classe CSS ?",
            choices: ["element.hasClass()", "element.classList.contains()", "element.className.includes()", "element.matchClass()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment créer une promesse qui se résout après un délai donné ?",
            choices: ["new Promise(setTimeout)", "Promise.timeout()", "new Promise(resolve => setTimeout(resolve, delay))", "await setTimeout()"],
            correct: 2,
            type: "single"
        },
        {
            question: "Quelle est la différence principale entre textContent et innerHTML ?",
            choices: ["textContent est plus rapide", "innerHTML peut interpréter le HTML", "textContent est déprécié", "innerHTML est synchrone"],
            correct: 1,
            type: "single"
        },
        {
            question: "Dans une fonction fléchée, comment accéder aux arguments variables ?",
            choices: ["arguments", "...args dans les paramètres", "this.arguments", "Function.arguments"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode permet de créer un nouveau tableau avec les éléments qui passent un test ?",
            choices: ["find()", "filter()", "map()", "reduce()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment détecter si un objet est un tableau en JavaScript ?",
            choices: ["typeof obj === 'array'", "Array.isArray(obj)", "obj instanceof Array", "obj.constructor === Array"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle est la meilleure façon de vider un tableau en JavaScript ?",
            choices: ["array = []", "array.length = 0", "array.splice(0)", "delete array"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment obtenir la valeur d'un input en JavaScript ?",
            choices: ["input.text", "input.value", "input.getValue()", "input.content"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode est utilisée pour convertir un objet en JSON ?",
            choices: ["JSON.toString()", "JSON.stringify()", "JSON.parse()", "JSON.encode()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment ajouter un élément au début d'un tableau ?",
            choices: ["array.push()", "array.unshift()", "array.addFirst()", "array.prepend()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode permet de trouver l'index d'un élément dans un tableau ?",
            choices: ["findIndex()", "indexOf()", "search()", "locate()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Comment créer une copie profonde d'un objet en JavaScript ?",
            choices: ["Object.assign()", "JSON.parse(JSON.stringify())", "{...obj}", "obj.clone()"],
            correct: 1,
            type: "single"
        },
        {
            question: "Quelle méthode permet d'attendre que plusieurs promesses soient résolues ?",
            choices: ["Promise.all()", "Promise.race()", "Promise.any()", "Promise.wait()"],
            correct: 0,
            type: "single"
        }
    ]
}; 