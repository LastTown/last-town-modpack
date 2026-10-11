SuperbWarfareEvents.loadingDataGun(event => {
    let data = event.data
    let type = String(data.getGunType())

    switch (type) {
        case 'RIFLE':
            data.setMaxDurability(300)
            data.setDurabilityPerShoot(1)
            break
        case 'HANDGUN':
            data.setMaxDurability(150)
            data.setDurabilityPerShoot(1)
            break
        case 'SMG':
            data.setMaxDurability(350)
            data.setDurabilityPerShoot(1)
            break
        case 'MACHINE_GUN':
            data.setMaxDurability(1000)
            data.setDurabilityPerShoot(1)
            break
        case 'SHOTGUN':
            data.setMaxDurability(120)
            data.setDurabilityPerShoot(2)
            break
        case 'SNIPER':
            data.setMaxDurability(80)
            data.setDurabilityPerShoot(2)
            break
        case 'SPECIAL':
            data.setMaxDurability(100)
            data.setDurabilityPerShoot(2)
            break
        case 'DIRECT_LAUNCHER':
            data.setMaxDurability(20)
            data.setDurabilityPerShoot(5)
            break
        case 'CURVED_LAUNCHER':
            data.setMaxDurability(20)
            data.setDurabilityPerShoot(5)
            break
        default:
            console.log('Type non reconnu: ' + type)
            data.setMaxDurability(250)
            data.setDurabilityPerShoot(1)
    }
})