// Permet aux admins (permission niveau 2+) de VOIR les joueurs en vanish et
// de se téléporter directement à eux.
//
// MÉCANISME : Minecraft vanilla permet à deux joueurs de la MÊME équipe
// scoreboard de se voir mutuellement même sous effet d'Invisibilité, à
// condition que l'équipe ait l'option "seeFriendlyInvisibles" activée. La
// plupart des mods de vanish (Vanishmod, Vanish...) appliquent l'effet
// minecraft:invisibility classique pour cacher le joueur - ce script en
// profite sans dépendre du mod exact utilisé.
//
// Tous les opérateurs sont automatiquement ajoutés à l'équipe "staff_sight"
// à leur connexion. Si un joueur non-op vanish et que tu veux quand même le
// voir, utilise /vanishsee <joueur> pour l'ajouter manuellement à cette
// équipe (utile si le vanish n'est pas déclenché par un OP).

const TEAM_NAME = 'staff_sight'

ServerEvents.loaded(event => {
    const server = event.server
    // Crée l'équipe si elle n'existe pas encore, et active l'option clé.
    server.runCommandSilent(`team add ${TEAM_NAME}`)
    server.runCommandSilent(`team modify ${TEAM_NAME} option seeFriendlyInvisibles true`)
    // Optionnel : évite le friendly fire entre membres de cette équipe (staff entre eux).
    server.runCommandSilent(`team modify ${TEAM_NAME} option friendlyFire false`)
    // Cache les tags d'équipe au-dessus des têtes pour ne pas révéler qui est dans l'équipe.
    server.runCommandSilent(`team modify ${TEAM_NAME} option nametagVisibility never`)
})

PlayerEvents.loggedIn(event => {
    const player = event.player
    if (player.hasPermissions(2)) {
        event.server.runCommandSilent(`team join ${TEAM_NAME} ${player.username}`)
    }
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    // /vanishsee <joueur> [on|off] : ajoute/retire un joueur (vanish ou pas)
    // de l'équipe staff_sight. Par défaut "on" si aucun argument.
    event.register(
        Commands.literal('vanishsee')
            .requires(src => src.hasPermission(2))
            .then(
                Commands.argument('joueur', Arguments.PLAYER.create(event))
                    .executes(ctx => {
                        const target = Arguments.PLAYER.getResult(ctx, 'joueur')
                        ctx.source.server.runCommandSilent(`team join ${TEAM_NAME} ${target.username}`)
                        ctx.source.sendSuccess(Text.gray(`${target.username} ajouté à l'équipe de visibilité staff.`), false)
                        return 1
                    })
                    .then(
                        Commands.literal('off').executes(ctx => {
                            const target = Arguments.PLAYER.getResult(ctx, 'joueur')
                            ctx.source.server.runCommandSilent(`team leave ${TEAM_NAME} ${target.username}`)
                            ctx.source.sendSuccess(Text.gray(`${target.username} retiré de l'équipe de visibilité staff.`), false)
                            return 1
                        })
                    )
            )
    )

    // /admintp <joueur> : téléportation directe vers n'importe quel joueur en
    // ligne, y compris vanish - la résolution se fait sur le vrai ServerPlayer
    // (pas sur la liste tab, qui peut être filtrée par le mod de vanish).
    event.register(
        Commands.literal('admintp')
            .requires(src => src.hasPermission(2))
            .then(
                Commands.argument('joueur', Arguments.PLAYER.create(event))
                    .executes(ctx => {
                        const source = ctx.source
                        const player = source.player
                        if (!player) {
                            source.sendFailure(Text.red('Cette commande doit être exécutée par un joueur.'))
                            return 0
                        }
                        const target = Arguments.PLAYER.getResult(ctx, 'joueur')
                        player.teleportTo(target.x, target.y, target.z)
                        source.sendSuccess(Text.green(`Téléporté à ${target.username}.`), false)
                        return 1
                    })
            )
    )
})
