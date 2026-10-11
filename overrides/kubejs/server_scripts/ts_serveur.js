// server_scripts/ts.js

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
        Commands.literal('ts')
            .requires(source => source.hasPermission(2))
            .then(
                Commands.argument('target', Arguments.PLAYER.create(event))
                    .executes(ctx => {
                        const target = Arguments.PLAYER.getResult(ctx, 'target')
                        try { freezePlayer(target) } catch (e) { target.tell('[DEBUG] ' + e) }
                        return 1
                    })
                    .then(
                        Commands.literal('off').executes(ctx => {
                            const target = Arguments.PLAYER.getResult(ctx, 'target')
                            try { unfreezePlayer(target) } catch (e) { target.tell('[DEBUG] ' + e) }
                            return 1
                        })
                    )
            )
    )
})

function getCardinalOffset(yawDeg) {
    let y = ((yawDeg % 360) + 360) % 360
    if (y >= 315 || y < 45) return { dx: 0, dz: 1, rotation: 8 }
    if (y >= 45 && y < 135) return { dx: -1, dz: 0, rotation: 12 }
    if (y >= 135 && y < 225) return { dx: 0, dz: -1, rotation: 0 }
    return { dx: 1, dz: 0, rotation: 4 }
}

function freezePlayer(player) {
    const pd = player.persistentData
    const server = player.server

    const px = player.x
    const py = player.y
    const pz = player.z
    const yawDeg = player.getYaw()

    const offset = getCardinalOffset(yawDeg)
    const signX = Math.floor(px) + offset.dx
    const signY = Math.floor(py)
    const signZ = Math.floor(pz) + offset.dz

    pd.putDouble('ts_x', px)
    pd.putDouble('ts_y', py)
    pd.putDouble('ts_z', pz)
    pd.putDouble('ts_sign_x', signX)
    pd.putDouble('ts_sign_y', signY)
    pd.putDouble('ts_sign_z', signZ)
    pd.putBoolean('ts_frozen', true)

    // Ne pose la barriere que si l'emplacement est vide (ne detruit jamais un sol existant)
    server.runCommandSilent(
        `execute if block ${signX} ${signY - 1} ${signZ} minecraft:air run setblock ${signX} ${signY - 1} ${signZ} minecraft:barrier`
    )
    server.runCommandSilent(`setblock ${signX} ${signY} ${signZ} minecraft:oak_sign[rotation=${offset.rotation}]`)
    server.runCommandSilent(`data merge block ${signX} ${signY} ${signZ} {front_text:{messages:['"Passe TS"','""','""','""']}}`)

    const speedAttr = player.getAttribute('minecraft:generic.movement_speed')
    if (speedAttr) speedAttr.baseValue = 0

    player.sendData('ts_freeze_on', {
        signX: signX + 0.5, signY: signY + 0.5, signZ: signZ + 0.5
    })
}

function unfreezePlayer(player) {
    const pd = player.persistentData
    const server = player.server

    if (pd.contains('ts_sign_x')) {
        const signX = pd.getDouble('ts_sign_x')
        const signY = pd.getDouble('ts_sign_y')
        const signZ = pd.getDouble('ts_sign_z')
        server.runCommandSilent(`setblock ${signX} ${signY} ${signZ} minecraft:air`)
        // Ne retire la barriere que si c'est bien elle qui est presente (jamais le terrain d'origine)
        server.runCommandSilent(
            `execute if block ${signX} ${signY - 1} ${signZ} minecraft:barrier run setblock ${signX} ${signY - 1} ${signZ} minecraft:air`
        )
    }

    const speedAttr = player.getAttribute('minecraft:generic.movement_speed')
    if (speedAttr) speedAttr.baseValue = 0.1

    pd.putBoolean('ts_frozen', false)
    player.sendData('ts_freeze_off', {})
}

ServerEvents.tick(event => {
    event.server.players.forEach(player => {
        const pd = player.persistentData
        if (!pd.getBoolean('ts_frozen')) return
        if (!pd.contains('ts_x')) return

        const tsX = pd.getDouble('ts_x')
        const tsY = pd.getDouble('ts_y')
        const tsZ = pd.getDouble('ts_z')

        // Annule la vitesse via commande NBT (evite le probleme de signature Java)
        player.server.runCommandSilent(`data merge entity ${player.username} {Motion:[0.0d,0.0d,0.0d]}`)
        player.fallDistance = 0

        player.teleportTo(tsX, tsY, tsZ)
    })
})

EntityEvents.hurt(event => {
    const entity = event.entity
    if (!entity.player) return
    const pd = entity.persistentData
    if (pd.getBoolean('ts_frozen')) event.cancel()
})

PlayerEvents.loggedIn(event => {
    const player = event.player
    const pd = player.persistentData
    if (pd.getBoolean('ts_frozen') && pd.contains('ts_x')) {
        player.teleportTo(pd.getDouble('ts_x'), pd.getDouble('ts_y'), pd.getDouble('ts_z'))
        const speedAttr = player.getAttribute('minecraft:generic.movement_speed')
        if (speedAttr) speedAttr.baseValue = 0
        if (pd.contains('ts_sign_x')) {
            player.sendData('ts_freeze_on', {
                signX: pd.getDouble('ts_sign_x') + 0.5,
                signY: pd.getDouble('ts_sign_y') + 0.5,
                signZ: pd.getDouble('ts_sign_z') + 0.5
            })
        }
    }
})

ServerEvents.command(event => {
    const { input, parseResults } = event
    const player = parseResults.context.source.player
    if (!player) return
    const pd = player.persistentData
    if (!pd.getBoolean('ts_frozen')) return
    const isOpPlayer = parseResults.context.source.hasPermission(2)
    const trimmed = input.trim().toLowerCase()
    const isTsOffOnSelf = new RegExp(`^ts\\s+${player.username.toLowerCase()}\\s+off$`).test(trimmed)
    if (isTsOffOnSelf && isOpPlayer) return
    event.cancel()
    player.tell(Text.red('Vous etes gele : impossible d\'executer une commande.'))
})