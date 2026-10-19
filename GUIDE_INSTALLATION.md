# Guide d'installation — Last Town

Le launcher officiel installe et met à jour **tout automatiquement** : Java,
Minecraft, Forge et le modpack Last Town. Vous n'avez qu'à choisir un pseudo et
cliquer sur **Lancer le jeu**.

## Windows 10 / 11 (64 bits) — recommandé

1. Ouvrez la [page des releases](https://github.com/LastTown/last-town-modpack/releases)
   et téléchargez l'installeur **`LastTownLauncher-Setup-….exe`** dans la
   release **Launcher** la plus récente (tag `launcher-v…`).
2. Lancez l'installeur et suivez l'assistant (aucun droit administrateur
   nécessaire : il installe dans votre dossier utilisateur et crée les
   raccourcis Bureau + Menu Démarrer).
   - Si Windows SmartScreen affiche un avertissement :
     *Informations complémentaires* → *Exécuter quand même*.
3. Au premier lancement, entrez un **pseudo**, ou connectez votre **compte
   Microsoft** si vous possédez Minecraft (recommandé).
4. Cliquez sur **Lancer le jeu** : tout se télécharge (≈ 1 Go, quelques minutes
   selon la connexion), puis le jeu démarre.
5. Dans le jeu : **Multijoueur** → le serveur **Last Town** est déjà dans la
   liste → connexion.

> **Version portable** (sans installation) : prenez `LastTownLauncher-windows.zip`,
> décompressez dans un dossier à vous et lancez **Last Town Launcher.exe**
> (gardez le dossier `_internal` à côté de l'exécutable).

### Mises à jour

- Le launcher se met à jour tout seul (version Windows) : une notification
  apparaît dans **Paramètres → Mise à jour**.
- Le modpack est resynchronisé automatiquement à chaque lancement.
- Vous n'avez donc jamais à re-télécharger quoi que ce soit à la main.

### Désinstallation

Paramètres Windows → Applications → **Last Town Launcher** → Désinstaller.

## Ubuntu / Linux (64 bits)

1. Ouvrez la [page des releases](https://github.com/LastTown/last-town-modpack/releases)
   et téléchargez le paquet **`last-town-launcher_….deb`** dans la release
   **Launcher** la plus récente.
2. Installez-le :

   ```bash
   sudo apt install ./last-town-launcher_0.2.1_amd64.deb
   ```

   (`apt` installe tout seul les bibliothèques nécessaires.)
3. Lancez **Last Town Launcher** depuis le menu Applications (ou la commande
   `last-town-launcher`), puis suivez les étapes 3 à 5 de la section Windows.

Les données du launcher sont stockées dans `~/.local/share/last-town-launcher`.
Pour mettre à jour : téléchargez le nouveau `.deb` et relancez la commande
`apt install`. Pour désinstaller : `sudo apt remove last-town-launcher`.

> **Depuis les sources** (pour les curieux / autres distributions) :
>
> ```bash
> git clone https://github.com/LastTown/last-town-launcher.git
> cd last-town-launcher
> python3 -m venv .venv
> .venv/bin/pip install -r requirements-linux.txt
> .venv/bin/python launcher/main.py
> ```
>
> Le dépôt du launcher est privé : demandez l'accès sur le
> [Discord](https://discord.gg/6VV8ckFbjM).

## En cas de problème

1. Dans le launcher : **Paramètres → Réparer l'installation**.
2. Utilisez le bouton **Copier** du journal et joignez-le à votre message.
3. Rejoignez le [Discord](https://discord.gg/6VV8ckFbjM) ou ouvrez un
   [ticket](https://github.com/LastTown/last-town-modpack/issues).
