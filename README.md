# Portfolio André Omeonga — Nova Digital Congo

Portfolio personnel et site d’entreprise séparé pour Nova Digital Congo, sans framework ni base de données. Le projet utilise HTML, CSS et JavaScript natifs ; ouvrez `index.html` pour le portfolio d’André Omeonga ou `nova.html` pour le site Nova Digital. Le lien entre les deux pages reste interne au dossier.

Les deux pages partagent une nouvelle identité Nova Digital en SVG — logo principal, version inversée et icône/favicon — et une direction visuelle bleu nuit et bleu électrique, adaptée aux écrans mobiles.

Les galeries réaffichent les captures d’écran présentes dans l’archive originale : 8 images pour la géolocalisation, 5 pour le calcul mathématique et 11 pour l’application éducative. Utilisez les points ou les flèches pour parcourir les images ; un clic ouvre la vue agrandie, navigable au clavier avec ← et →. Les trois outils web ajoutés sont accompagnés d’illustrations d’interface de présentation, car aucune capture de ces outils n’était fournie dans les archives.

## Démarrer

1. Décompressez le ZIP.
2. Ouvrez `index.html` dans un navigateur, ou placez le dossier sur votre hébergement.
3. L’espace admin se trouve tout en bas de page, bouton **⌘ Admin**.
4. Mot de passe initial : `nova2026`.
5. Dans **app.js**, remplacez `ADMIN_PASSWORD` avant de publier le site.

## Gérer les compétences

Depuis l’espace admin, vous pouvez ajouter, modifier ou supprimer une compétence. La page publique se met à jour immédiatement. Les changements sont enregistrés dans `localStorage`, donc dans le navigateur et l’appareil utilisés pour l’administration. Exportez régulièrement une sauvegarde JSON ; vous pouvez la réimporter plus tard depuis l’espace admin.

## Important : mode sans base de données

Cette version statique n’a pas de serveur ni de base de données. Les changements effectués dans l’espace admin ne sont donc pas publiés automatiquement sur les appareils de vos visiteurs : ils persistent uniquement dans le navigateur local. Pour publier les compétences changées à tous les visiteurs, exportez votre sauvegarde JSON puis mettez à jour les données dans `app.js` et republiez le site.

Le mot de passe protège l’accès à l’interface dans une utilisation normale, mais ce n’est pas une authentification sécurisée : un site statique ne peut pas cacher un mot de passe présent dans son code source. Pour une administration réellement privée et des modifications partagées automatiquement, il faudra à terme un petit backend ou un service de stockage distant.

## Contenu inclus

- Compétences existantes : Flutter/Dart, Java Desktop, bases de données, bureautique, LaTeX, entrepreneuriat et gestion de projet.
- Nouvelles compétences demandées : configuration VPS/Hostinger, application de gestion des panneaux, gestion de numérotation V1 et validation numérique d’autocollants.
- Projets mobiles avec galeries : géolocalisation d’urgence, calcul mathématique et application éducative.
- Projets web liés : gestion des panneaux, numérotation et validation d’autocollants, chacun avec son illustration locale.
- Espace Nova Digital : solutions locales, talents locaux et impact durable.
- Filtres par catégorie, interface mobile responsive, export et import de sauvegarde.
- Métadonnées de partage, données structurées Person, titre et description SEO, navigation clavier et respect de la préférence « réduire les animations ».

Les projets sans adresse fournie sont présentés sans bouton externe. Les seuls liens externes de démonstration sont les trois URL remises pour les applications web. Après publication, remplacez les images Open Graph relatives dans les deux pages par des adresses HTTPS absolues pour améliorer les aperçus de partage.

Le formulaire de partenariat sur le site Nova Digital utilise l’adresse Formspree déjà présente dans le site source ; le fonctionnement de ce service dépend de la configuration du compte qui le reçoit.

Les photos et captures fournies sont conservées dans `images/` à leur résolution d’origine ; les captures d’écran de téléphone s’agrandissent dans la visionneuse pour rester lisibles.

Le fichier `application.apk` de l’archive source ne contient que 2 octets et n’est pas une application installable ; il n’est donc pas distribué dans ce ZIP afin d’éviter un téléchargement cassé.

Un design soigné et des métadonnées améliorent la présentation et le partage du site, mais ne garantissent pas à eux seuls un volume de visites : le référencement dépend aussi du domaine, du contenu, de la diffusion et de l’activité du site.
