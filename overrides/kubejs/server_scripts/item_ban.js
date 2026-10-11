ServerEvents.recipes(event => {
  const itemsABloquer = [
    'psychadelic:magic_mushroomspores',
    'electrodynamics:combatarmorboots',
    'electrodynamics:combatarmorchestplate',
    'electrodynamics:combatarmorleggings',
    'electrodynamics:combatarmorhelmet'
  ]

  itemsABloquer.forEach(item => {
    event.remove({ output: item })
  })
})