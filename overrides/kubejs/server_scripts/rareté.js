ServerEvents.tags('item', event => {
  ;(function () {
    var TAGS = [
      'kubejs:rarity_commun',
      'kubejs:rarity_peu_commun',
      'kubejs:rarity_rare',
      'kubejs:rarity_epique',
      'kubejs:rarity_legendaire'
    ]

    function contient(texte, fragments) {
      for (var i = 0; i < fragments.length; i++) {
        if (texte.indexOf(fragments[i]) !== -1) return true
      }
      return false
    }

    var EXACT = {
      // Batteries Electrodynamics.
      'electrodynamics:battery': 3,
      'electrodynamics:batterybox': 3,
      'electrodynamics:lithiumbattery': 4,
      'electrodynamics:lithiumbatterybox': 4,
      'electrodynamics:carbynebattery': 5,
      'electrodynamics:carbynebatterybox': 5,
      'electrodynamics:railgunkinetic': 4,
      'electrodynamics:railgunplasma': 5,

      // Batteries Superb Warfare.
      'superbwarfare:battery': 1,
      'superbwarfare:small_battery_pack': 1,
      'superbwarfare:medium_battery_pack': 2,
      'superbwarfare:large_battery_pack': 4,

      // Soins Survival Instinct : nouvelles priorités.
      'survival_instinct:homemade_bandage': 1,
      'survival_instinct:bandage': 3,
      'survival_instinct:medkit_bag': 3,
      'survival_instinct:survival_medkit': 4,

      'survival_instinct:adrenaline_syringe': 4,
      'survival_instinct:morphine_syringe': 4,
      'survival_instinct:blood_syringe': 4,

      'survival_instinct:adrenaline_injector': 3,
      'survival_instinct:morphine_injector': 3,

      // Équipements Survival Instinct épiques.
      'survival_instinct:electric_fist': 4,
      'survival_instinct:glaive_chainsaw': 4,
      'survival_instinct:circular_saw': 4,
      'survival_instinct:glaive_circular_saw': 4,

      // Casque demandé : légendaire.
      'survival_instinct:chicken_head_helmet': 5,

      // Soins Superb Warfare.
      'superbwarfare:medical_kit': 3,
      'superbwarfare:heal_clip': 3,

      // RPG, minigun et Javelin.
      'superbwarfare:rpg': 5,
      'superbwarfare:rpg_blueprint': 5,
      'superbwarfare:rpg_rocket_standard': 5,
      'superbwarfare:rpg_rocket_tbg': 5,
      'superbwarfare:minigun': 5,
      'superbwarfare:minigun_blueprint': 5,
      'superbwarfare:javelin': 5,
      'superbwarfare:javelin_blueprint': 5,
      'superbwarfare:javelin_missile': 5,
      'superbwarfare:large_anti_ground_missile': 5,

      // Snipers épiques.
      'superbwarfare:awm': 4,
      'superbwarfare:ntw_20': 4,
      'superbwarfare:m_98b': 4,
      'superbwarfare:svd': 4,
      'superbwarfare:mosin_nagant': 4,
      'superbwarfare:sentinel': 4,
      'superbwarfare:sniper_ammo': 4,
      'superbwarfare:sniper_ammo_box': 4,

      // Armes lourdes épiques.
      'superbwarfare:m_2_hb': 4,
      'superbwarfare:m_60': 4,
      'superbwarfare:rpk': 4,
      'superbwarfare:igla_9k38': 4,
      'superbwarfare:vehicle_gun': 4,
      'superbwarfare:medium_anti_air_missile': 4,
      'superbwarfare:medium_anti_ground_missile': 4,

      // Récompenses.
      'minecraft:elytra': 5,
      'minecraft:nether_star': 5,
      'minecraft:totem_of_undying': 5,
      'minecraft:dragon_egg': 5,
      'minecraft:enchanted_golden_apple': 5,
      'minecraft:beacon': 5
    }

    var EXPLOSIFS = {
      anvil: 3,
      attractive: 3,
      chemical: 3,
      condensive: 3,
      incendiary: 3,
      obsidian: 3,
      repulsive: 3,
      shrapnel: 3,

      breaching: 4,
      contagious: 4,
      debilitation: 4,
      fragmentation: 4,
      infestive: 4,
      rejuvination: 4,
      sonic: 4,
      thermobaric: 4,

      antigravity: 5,
      emp: 5,
      ender: 5,
      endothermic: 5,
      exothermic: 5,
      hypersonic: 5,
      nuclear: 5,
      antimatter: 5,
      largeantimatter: 5,
      darkmatter: 5
    }

    function niveauBallistix(nom) {
      if (nom.indexOf('tier3') !== -1) return 5
      if (nom.indexOf('tier2') !== -1) return 4
      if (nom.indexOf('tier1') !== -1) return 3

      if (nom === 'firecontrolradar') return 4
      if (nom === 'radar' || nom === 'radargun') return 3
      if (nom.indexOf('turret') !== -1 || nom === 'vls') return 4

      var base = nom

      if (base.indexOf('grenade') === 0) {
        base = base.substring(7)
      } else if (base.indexOf('minecart') === 0) {
        base = base.substring(8)
      }

      if (EXPLOSIFS[base] !== undefined) return EXPLOSIFS[base]
      if (nom === 'aamissilemk2' || nom === 'missilecluster') return 4
      if (nom === 'rocketlauncher' || nom === 'landmine') return 4

      if (contient(nom, [
        'scanner', 'tracker', 'laserdesignator',
        'defuser', 'proximitydetector', 'airraidsiren'
      ])) return 2

      return 3
    }

    function niveauElectrodynamics(nom) {
      // Machine simple -> verte ; double -> bleue ;
      // triple -> légendaire.
      var machines = [
        'electricfurnace',
        'electricarcfurnace',
        'mineralcrusher',
        'mineralgrinder',
        'wiremill'
      ]

      for (var i = 0; i < machines.length; i++) {
        var base = machines[i]

        if (nom === base + 'triple') return 5
        if (nom === base + 'double') return 3
        if (nom === base) return 2
      }

      if (contient(nom, [
        'circuitultimate', 'superconductive',
        'titaniumcarbide', 'hslasteel', 'quarry'
      ])) return 5

      if (contient(nom, [
        'circuitelite', 'circuitadvanced', 'advanced',
        'titanium', 'vanadiumsteel', 'stainlesssteel',
        'combatarmor', 'compositearmor',
        'electricdrill', 'electricchainsaw'
      ])) return 4

      if (contient(nom, [
        'steel', 'motor', 'generator', 'compressor',
        'decompressor', 'solarpanel', 'transformer',
        'oreuranium', 'orethorium'
      ])) return 3

      return 2
    }

    function niveauNuclearScience(nom) {
      if (nom === 'antidote' ||
          nom === 'iodinetablet' ||
          nom === 'geigercounter') return 3

      if (contient(nom, [
        'fusion', 'antimatter', 'darkmatter',
        'quantum', 'particleinjector',
        'teleporter', 'electromagneticgateway',
        'reinforcedhazmat', 'plutonium'
      ])) return 5

      return 4
    }

    function niveauSurvivalInstinct(nom) {
      // Autres soins : rares au minimum.
      if (contient(nom, [
        'medical', 'medkit', 'bandage',
        'morphine', 'adrenaline',
        'syringe', 'injector'
      ])) return 3

      if (contient(nom, [
        'exo_heavy', 'juggernaut', 'tier_iv_kevlar'
      ])) return 5

      if (contient(nom, [
        'exo_', 'military_', 'hazmat_',
        'tier_iii_kevlar', 'swat_shield'
      ])) return 4

      if (contient(nom, [
        'police_', 'fire_fighter_', 'guillie',
        'tier_ii_kevlar', 'body_armor_plate_ii',
        'night_vision_goggles'
      ])) return 3

      if (contient(nom, [
        'armor_', 'helmet', 'chestplate',
        'leggings', 'boots', 'shield',
        'kevlar', 'body_armor_plate_i'
      ])) return 2

      if (contient(nom, [
        'steellium_sword', 'steellium_pipe_mace',
        'electric_baton_sword', 'sledge_great_hammer'
      ])) return 4

      if (contient(nom, [
        'knife', 'katana', 'sword',
        'mace', 'hammer', 'lance', 'nailgun'
      ])) return 3

      return 1
    }

    function niveauSuperbWarfare(nom) {
      var arme = nom.replace(/_blueprint$/, '')

      if (contient(nom, [
        'rpg', 'minigun', 'javelin',
        'legendary_blueprint_data_chip',
        'legendary_material_pack'
      ])) return 5

      if (contient(arme, [
        'awm', 'ntw_20', 'm_98b', 'svd',
        'mosin_nagant', 'sentinel',
        'm_2_hb', 'm_60', 'rpk',
        'igla_9k38', 'vehicle_gun'
      ])) return 4

      if (contient(nom, [
        'turret', 'medium_anti_', 'medium_rocket',
        'mortar_', 'heavy_', 'cannon_',
        'epic_', 'superb_', 'cemented_carbide_',
        'crystal_', 'netherite_', 'large_shell_',
        'large_anti_', 'thermal_imaging'
      ])) return 4

      if (nom === 'hammer' || nom === 'iron_action' ||
          nom === 'iron_barrel' || nom === 'iron_spring' ||
          nom === 'iron_trigger') return 2

      if (nom === 'steel_hammer' ||
          nom === 'golden_hammer' ||
          nom === 'diamond_hammer' ||
          nom.indexOf('steel_') === 0) return 3

      if (contient(nom, [
        'rifle', 'shotgun', 'pistol', 'handgun',
        'smg', 'grenade', 'micro_missile',
        'small_rocket', 'ammo', 'bullet',
        'armor_plate', 'laser_unit',
        'rare_', 'small_shell_'
      ])) return 3

      if (contient(arme, [
        'glock_', 'ak_', 'hk_', 'm_1911',
        'mp_', 'm_4', 'qbz_', 'vector',
        'k_98', 'sks', 'mk_14', 'marlin',
        'aa_12', 'm_870', 'm_79'
      ])) return 3

      // Autres items Superb Warfare : peu commun.
      return 2
    }

    function niveau(id) {
      if (EXACT[id] !== undefined) return EXACT[id]

      var separateur = id.indexOf(':')
      var mod = id.substring(0, separateur)
      var nom = id.substring(separateur + 1)

      if (mod === 'ballistix') return niveauBallistix(nom)
      if (mod === 'electrodynamics') return niveauElectrodynamics(nom)
      if (mod === 'nuclearscience') return niveauNuclearScience(nom)
      if (mod === 'survival_instinct') return niveauSurvivalInstinct(nom)
      if (mod === 'superbwarfare') return niveauSuperbWarfare(nom)

      if (mod === 'lrtactical') {
        // L'ID melee est partagé par les couteaux et autres armes
        // de mêlée LesRaisins : toutes seront légendaires.
        if (nom === 'melee') return 5
        if (nom === 'throwable' || nom === 'detonator') return 4
        return 3
      }

      // Soins identifiés dans les autres mods : rare minimum.
      if (contient(nom, [
        'medical', 'medkit', 'bandage', 'morphine',
        'adrenaline', 'syringe', 'injector',
        'firstaid', 'first_aid', 'painkiller',
        'heal_clip', 'antidote'
      ])) return 3

      return 1
    }

    var comptes = [0, 0, 0, 0, 0]
    var compteElectro = 0
    var compteNuclear = 0
    var compteSuperb = 0

    Item.getList().forEach(function (item) {
      var id = String(item.id)
      var n = niveau(id)

      event.add(TAGS[n - 1], id)
      comptes[n - 1]++

      if (id.indexOf('electrodynamics:') === 0) compteElectro++
      if (id.indexOf('nuclearscience:') === 0) compteNuclear++
      if (id.indexOf('superbwarfare:') === 0) compteSuperb++
    })

    console.info(
      '[R&D raretés] commun=' + comptes[0] +
      ' peu_commun=' + comptes[1] +
      ' rare=' + comptes[2] +
      ' epique=' + comptes[3] +
      ' legendaire=' + comptes[4] +
      ' | Electrodynamics=' + compteElectro +
      ' NuclearScience=' + compteNuclear +
      ' SuperbWarfare=' + compteSuperb
    )
  })()
})