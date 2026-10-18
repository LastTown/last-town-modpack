# Guide d'installation — Last Town

Le launcher officiel installe et met à jour **tout automatiquement** : Java,
Minecraft, Forge et le modpack Last Town. Vous n'avez qu'à choisir un pseudo et
cliquer sur **Lancer le jeu**.

## Windows 10 / 11 (64 bits) — recommandé

1. Ouvrez la [page des releases](https://github.com/LastTown/last-town-modpack/releases)
   et téléchargez `LastTownLauncher-windows.zip` dans la release **Launcher**
   la plus récente (tag `launcher-v…`).
2. Décompressez l'archive dans un dossier à vous (ex. `Documents\LastTown`).
   ⚠️ Ne lancez pas le launcher depuis l'intérieur du ZIP et ne déplacez pas
   l'exécutable sans son dossier `_internal`.
3. Lancez **Last Town Launcher.exe**.
   - Si Windows SmartScreen affiche un avertissement :
     *Informations complémentaires* → *Exécuter quand même*.
4. Au premier lancement, entrez un **pseudo**, ou connectez votre **compte
   Microsoft** si vous possédez Minecraft (recommandé).
5. Cliquez sur **Lancer le jeu** : tout se télécharge (≈ 1 Go, quelques minutes
   selon la connexion), puis le jeu démarre.
6. Dans le jeu : **Multijoueur** → le serveur **Last Town** est déjà dans la
   liste → connexion.

### Mises à jour

- Le launcher se met à jour tout seul (version Windows) : une notification
  apparaît dans **Paramètres → Mise à jour**.
- Le modpack est resynchronisé automatiquement à chaque lancement.
- Vous n'avez donc jamais à re-télécharger quoi que ce soit à la main.

## Ubuntu / Linux

Il n'y a pas encore d'exécutable Linux : le launcher se lance depuis les
sources. Prévu pour les joueurs à l'aise avec un terminal.

Pré-requis : Python 3.11 ou plus, `git`, un environnement graphique.

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip git
# bibliothèques Qt (si nécessaire)
sudo apt install -y libxcb-cursor0 libxkbcommon-x11-0 libegl1 libgl1
```

Ensuite :

```bash
git clone https://github.com/LastTown/last-town-launcher.git
cd last-town-launcher
python3 -m venv .venv
.venv/bin/pip install -r requirements-linux.txt
.venv/bin/python launcher/main.py
```

> Le dépôt du launcher est privé : demandez l'accès sur le
> [Discord](https://discord.gg/6VV8ckFbjM).

Le dossier de jeu est configurable dans **Paramètres** (chemin Linux). La mise à
jour automatique du launcher est réservée à la version Windows ; sur Linux,
mettez à jour les sources avec `git pull` puis relancez.

## En cas de problème

1. Dans le launcher : **Paramètres → Réparer l'installation**.
2. Utilisez le bouton **Copier** du journal et joignez-le à votre message.
3. Rejoignez le [Discord](https://discord.gg/6VV8ckFbjM) ou ouvrez un
   [ticket](https://github.com/LastTown/last-town-modpack/issues).
