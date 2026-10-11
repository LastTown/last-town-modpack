// server_scripts/vehiculeeau.js
const ALLOWED_NAMESPACES = ['superbwarfare', 'vvp', 'fcp']

const EXCLUDED_KEYWORDS = [
    'boat', 'ship', 'naval', 'hovercraft', 'amphibious',
    'heli', 'helicopter', 'plane', 'jet', 'aircraft', 'drone'
]

const STOP_DELAY_TICKS = 5 * 20
const EXPLODE_DELAY_TICKS = 5 * 20
const REFRESH_INTERVAL_TICKS = 5 * 20
const SCAN_RADIUS = 1
const DEBUG = false // passe a false une fois que ca fonctionne

function isTargetVehicle(typeId) {
    const namespace = typeId.split(':')[0]
    if (!ALLOWED_NAMESPACES.includes(namespace)) return false
    return !EXCLUDED_KEYWORDS.some(k => typeId.includes(k))
}

function destroyVehicle(entity) {
    let done = false
    try {
        entity.hurt(entity.damageSources().generic(), 100000)
        done = true
    } catch (e) { /* pas de hurt() sur cette entite */ }

    try {
        if (!done || entity.isAlive()) {
            entity.kill()
            done = true
        }
    } catch (e2) { /* kill() a echoue */ }

    if (!done) {
        try { entity.discard() } catch (e3) { /* dernier recours */ }
    }
}

function getLoadedVehicles(server) {
    const found = {}
    const allSeenTypes = new Set()

    server.players.forEach(player => {
        const x = player.getX()
        const y = player.getY()
        const z = player.getZ()
        const selector = `@e[x=${x},y=${y},z=${z},distance=..${SCAN_RADIUS}]`
        server.entities.filterSelector(selector).forEach(e => {
            const typeId = e.getType()
            allSeenTypes.add(typeId)
            if (isTargetVehicle(typeId)) {
                found[e.getUuid()] = e
            }
        })
    })

    if (DEBUG) {
        console.log(`[vehiculeeau] Entites vues pres des joueurs: ${Array.from(allSeenTypes).join(', ')}`)
        console.log(`[vehiculeeau] Vehicules trackes: ${Object.values(found).map(e => e.getType()).join(', ') || 'AUCUN'}`)
    }

    return Object.values(found)
}

let trackedVehicles = []
let lastRefresh = -REFRESH_INTERVAL_TICKS

ServerEvents.tick(event => {
    const { server } = event
    const now = server.tickCount

    if (server.players.length === 0) return

    if (now - lastRefresh >= REFRESH_INTERVAL_TICKS) {
        lastRefresh = now
        trackedVehicles = getLoadedVehicles(server)
    }

    if (trackedVehicles.length === 0) return

    trackedVehicles = trackedVehicles.filter(entity => {
        if (!entity.isAlive()) return false

        const data = entity.persistentData
        const inWater = entity.isInWater()

        if (DEBUG && inWater) {
            console.log(`[vehiculeeau] ${entity.getType()} est dans l'eau (isInWater=true)`)
        }

        if (!inWater) {
            if (data.getBoolean('sbw_water_active')) {
                data.putBoolean('sbw_water_active', false)
                data.remove('sbw_water_start')
                data.putBoolean('sbw_water_stopped', false)
            }
            return true
        }

        if (!data.getBoolean('sbw_water_active')) {
            data.putBoolean('sbw_water_active', true)
            data.putBoolean('sbw_water_stopped', false)
            data.putInt('sbw_water_start', now)
            return true
        }

        const elapsed = now - data.getInt('sbw_water_start')

        if (elapsed >= STOP_DELAY_TICKS && elapsed < STOP_DELAY_TICKS + EXPLODE_DELAY_TICKS) {
            if (!data.getBoolean('sbw_water_stopped')) {
                data.putBoolean('sbw_water_stopped', true)
                entity.getPassengers().forEach(p => {
                    if (p.isPlayer()) p.tell(Text.red('Le moteur cale, le vehicule est immobilise !'))
                })
            }
            const stopMotion = entity.getDeltaMovement()
            entity.setDeltaMovement(0, stopMotion.y < 0 ? stopMotion.y : 0, 0)
            return true
        }

        if (elapsed >= STOP_DELAY_TICKS + EXPLODE_DELAY_TICKS) {
            entity.getPassengers().forEach(p => {
                if (p.isPlayer()) p.tell(Text.red('Le vehicule est detruit par l\'eau !'))
            })
            destroyVehicle(entity)
            return false
        }

        return true
    })
})
