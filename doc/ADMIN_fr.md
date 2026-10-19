# Sixteen sur YunoHost

Installez depuis le dépôt git :

```bash
sudo yunohost app install https://github.com/wearenh/sixteen --debug
```

Laissez le chemin sur `/` pour que les murs soient servis sur `https://domaine.tld/tv/<hash>`.

Le style du site (titre, image de partage, favicon, HTML, CSS) se règle dans Sixteen → Style du site, sur le même modèle que la page Fonctionnalités d'un domaine. Le titre et l'image apparaissent dans les aperçus X, Telegram, Signal et Nextcloud Collectives.

Chaque mur enregistré a une adresse publique. Seule la personne qui possède la clé d'édition peut le modifier.
