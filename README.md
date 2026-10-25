# Last Town Modpack

Modpack client officiel du serveur Minecraft **Last Town**.

> 🎮 **Vous voulez jouer ?** Suivez le [guide d'installation](GUIDE_INSTALLATION.md)
> (Windows et Ubuntu) — le launcher s'occupe de tout.

## Informations

- **Minecraft** : 1.20.1
- **Mod loader** : Forge `47.4.20`
- **Version du modpack** : V1.0.9
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

### Mods custom du serveur

- `overrides/mods/ltlootbox-1.0.0.jar` — **Last Town LootBox** : 4 caisses de butin
  ouvrables à la clé (militaire, médicale, armurier, divine), roulette d'ouverture
  façon CS:GO, **un seul item par clé** donné directement dans l'inventaire, annonce
  globale des loots rares. Les clés ne se craftuent pas (admin / boutique).
  Le contenu des caisses est modifiable par datapack
  (`data/ltlootbox/crates/<type>.json` dans le jar ou dans un datapack de monde).

## Utilisation par le launcher

Le launcher **Last Town Launcher** lit les releases GitHub de ce dépôt pour
installer et mettre à jour le modpack automatiquement, ainsi que pour se mettre
à jour lui-même.

Deux types de releases cohabitent dans ce dépôt :

- **Modpack** : tag `vX.Y.Z` (ex. `v1.0.2`), asset `last-town-modpack-vX.Y.Z.zip`
  — c'est la release marquée « latest ».
- **Launcher** : tag `launcher-vX.Y.Z` (ex. `launcher-v0.2.0`), asset
  `LastTownLauncher-windows.zip` — publiée avec `--latest=false`.

## Créer une release de modpack

1. Mettre à jour le contenu du modpack dans ce dépôt.
2. Créer l'archive :

   ```bash
   zip -r last-town-modpack-vX.Y.Z.zip manifest.json modlist.html overrides
   ```

3. Publier une release GitHub taguée `vX.Y.Z` avec cette archive en asset.

## Avertissement

Ce dépôt contient uniquement ce qui est nécessaire aux joueurs. Les données internes du
serveur (adresses IP, données de joueurs, sessions d'administration, caches) ont été
retirées volontairement.
