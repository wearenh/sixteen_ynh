# Sixteen sur YunoHost

Installez depuis le dépôt git :

```bash
sudo yunohost app install https://github.com/wearenh/sixteen_ynh --debug
```

Laissez le chemin sur `/` pour que les murs soient servis sur `https://domaine.tld/tv/<hash>`.

Le style du site n'est pas une page de Sixteen. Ouvrez l'administration YunoHost, puis Applications → Sixteen → Style du site. Les champs suivent la page Fonctionnalités d'un domaine : titre, description, image de partage, favicon, HTML et CSS. Le titre et l'image apparaissent dans les aperçus X, Telegram, Signal et Nextcloud Collectives.

Chaque mur enregistré a une adresse publique. Seule la personne qui possède la clé d'édition peut le modifier.
