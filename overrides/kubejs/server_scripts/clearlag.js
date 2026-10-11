const CLEARLAG_INTERVAL = 12000

const CLEARLAG_HOSTILES = [
    'minecraft:blaze',
    'minecraft:cave_spider',
    'minecraft:creeper',
    'minecraft:drowned',
    'minecraft:endermite',
    'minecraft:evoker',
    'minecraft:ghast',
    'minecraft:guardian',
    'minecraft:hoglin',
    'minecraft:husk',
    'minecraft:magma_cube',
    'minecraft:phantom',
    'minecraft:piglin_brute',
    'minecraft:pillager',
    'minecraft:ravager',
    'minecraft:shulker',
    'minecraft:silverfish',
    'minecraft:skeleton',
    'minecraft:slime',
    'minecraft:spider',
    'minecraft:stray',
    'minecraft:vex',
    'minecraft:vindicator',
    'minecraft:witch',
    'minecraft:wither_skeleton',
    'minecraft:zoglin',
    'minecraft:zombie',
    'minecraft:zombie_villager',
    'mutantszombies:zombie_brute',
    'mutantszombies:crawler',
    'mutantszombies:spitter',
    'mutantszombies:blister_zombie'
]

const CLEARLAG_PASSIVES = [
    'minecraft:allay',
    'minecraft:axolotl',
    'minecraft:bat',
    'minecraft:camel',
    'minecraft:cat',
    'minecraft:chicken',
    'minecraft:cod',
    'minecraft:cow',
    'minecraft:donkey',
    'minecraft:fox',
    'minecraft:frog',
    'minecraft:glow_squid',
    'minecraft:goat',
    'minecraft:horse',
    'minecraft:llama',
    'minecraft:mooshroom',
    'minecraft:mule',
    'minecraft:ocelot',
    'minecraft:panda',
    'minecraft:parrot',
    'minecraft:pig',
    'minecraft:polar_bear',
    'minecraft:pufferfish',
    'minecraft:rabbit',
    'minecraft:salmon',
    'minecraft:sheep',
    'minecraft:sniffer',
    'minecraft:squid',
    'minecraft:strider',
    'minecraft:tadpole',
    'minecraft:trader_llama',
    'minecraft:tropical_fish',
    'minecraft:turtle',
    'minecraft:wolf'
]

const CLEARLAG_OWNER_PETS = [
    'minecraft:wolf',
    'minecraft:cat',
    'minecraft:parrot'
]

const CLEARLAG_TAMED_MOUNTS = [
    'minecraft:horse',
    'minecraft:donkey',
    'minecraft:mule',
    'minecraft:llama',
    'minecraft:trader_llama',
    'minecraft:camel'
]

ServerEvents.tick(event => {
    const server = event.server
    const remaining = CLEARLAG_INTERVAL - (server.tickCount % CLEARLAG_INTERVAL)

    if (remaining === 6000) {
        clearLagBroadcast(
            server,
            '§e[ClearLag] §fNettoyage dans §65 minutes§f. Récupérez vos objets au sol !'
        )
    } else if (remaining === 1200) {
        clearLagBroadcast(
            server,
            '§e[ClearLag] §fNettoyage dans §61 minute§f !'
        )
    } else if (remaining === 60) {
        clearLagBroadcast(
            server,
            '§c[ClearLag] §fNettoyage dans §c3 secondes§f...'
        )
    } else if (remaining === CLEARLAG_INTERVAL) {
        clearLagRun(server)
    }
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event

    event.register(
        Commands.literal('clearlag')
            .requires(source => source.hasPermission(2))
            .then(
                Commands.literal('now').executes(ctx => {
                    clearLagRun(ctx.source.server)
                    return 1
                })
            )
    )
})

function clearLagBroadcast(server, message) {
    server.tell(message)
    server.runCommandSilent(
        'playsound minecraft:block.note_block.bell master @a'
    )
}

function clearLagRun(server) {
    CLEARLAG_OWNER_PETS.forEach(type => {
        server.runCommandSilent(
            `execute as @e[type=${type}] if data entity @s Owner run tag @s add clearlag_protected_pet`
        )
    })

    CLEARLAG_TAMED_MOUNTS.forEach(type => {
        server.runCommandSilent(
            `execute as @e[type=${type}] if data entity @s {Tame:1b} run tag @s add clearlag_protected_pet`
        )
    })

    const typesToClear = CLEARLAG_HOSTILES.concat(CLEARLAG_PASSIVES)

    typesToClear.forEach(type => {
        server.runCommand(
            `kill @e[type=${type},nbt=!{ForgeData:{ClanHordeMob:1b}},tag=!clearlag_protected_pet]`
        )
    })

    server.runCommandSilent('kill @e[type=minecraft:item]')

    server.runCommandSilent(
        'tag @e[tag=clearlag_protected_pet] remove clearlag_protected_pet'
    )

    server.tell('§a[ClearLag] §fNettoyage terminé.')
}