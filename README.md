# Last Town Modpack

Modpack client officiel du serveur Minecraft **Last Town**.

## Informations

- **Minecraft** : 1.20.1
- **Mod loader** : Forge `47.4.20`
- **Version du modpack** : V1
- **Format** : export CurseForge (`manifest.json` + `overrides/`)

## Contenu

- `manifest.json` : liste des mods publics (référencés sur CurseForge) et version du loader.
- `modlist.html` : liste lisible des mods du manifest.
- `overrides/mods/` : l'ensemble des mods du client (mods publics + mods custom du serveur).
- `overrides/config/` : configurations de gameplay livrées aux joueurs.
- `overrides/defaultconfigs/` : configurations par défaut.
- `overrides/datapacks/` : datapacks du serveur.
- `overrides/kubejs/` : scripts KubeJS.
- `overrides/tacz/` : packs d'armes TACZ.
- `overrides/resourcepacks/` et `overrides/shaderpacks/` : ressources et shaders.
- `overrides/patchouli_books/` et `overrides/data/` : contenus additionnels.

## Utilisation par le launcher

Le launcher **Last Town Launcher** lit les releases GitHub de ce dépôt pour installer
et mettre à jour le modpack automatiquement.

Chaque version publiée doit être taguée (ex: `v1`) et fournir une release dont l'asset
est l'archive du modpack, nommée `last-town-modpack-<version>.zip`.

## Créer une release

1. Mettre à jour le contenu du modpack dans ce dépôt.
2. Créer l'archive :

   ```bash
   zip -r last-town-modpack-v1.zip manifest.json modlist.html overrides
   ```

3. Publier une release GitHub taguée `v1` avec cette archive en asset.

## Avertissement

Ce dépôt contient uniquement ce qui est nécessaire aux joueurs. Les données internes du
serveur (adresses IP, données de joueurs, sessions d'administration, caches) ont été
retirées volontairement.
