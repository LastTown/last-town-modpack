const TROLL_MESSAGES = {
    fly: 'Flying is not enabled on this server',
    idle: 'You have been idle for too long!',
    timeout: 'Took too long to log in',
    full: 'The server is full!',
    duplicate: 'You logged in from another location',
    chat: 'Illegal characters in chat',
    movement: 'Invalid move player packet received',
    attack: 'Attempting to attack an invalid entity',
    whitelist: 'You are not white-listed on this server!',
    entities: 'Too many entities in this area'
}

const TROLL_NAMES = Object.keys(TROLL_MESSAGES)

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(
        Commands.literal('troll')
            .requires(source => source.hasPermission(2))
            .then(
                Commands.argument('target', Arguments.PLAYER.create(event))
                    .then(
                        Commands.argument('trollName', Arguments.STRING.create(event))
                            // Propose la liste des noms de troll pendant la saisie (Tab / suggestions auto)
                            .suggests((ctx, builder) => {
                                TROLL_NAMES.forEach(name => builder.suggest(name))
                                return builder.buildFuture()
                            })
                            .executes(ctx => {
                                const target = Arguments.PLAYER.getResult(ctx, 'target')
                                const name = Arguments.STRING.getResult(ctx, 'trollName').toLowerCase()
                                const message = TROLL_MESSAGES[name]

                                if (!message) {
                                    ctx.source.sendFailure(
                                        Text.of('Nom de troll inconnu. Choix possibles : ' + TROLL_NAMES.join(', '))
                                    )
                                    return 0
                                }

                                target.kick(Text.of(message))
                                return 1
                            })
                    )
            )
    )
})