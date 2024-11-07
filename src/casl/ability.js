import { AbilityBuilder, createMongoAbility as createAbility } from '@casl/ability'

export function defineAbilitiesFor(permissions) {
  const { can, cannot, build } = new AbilityBuilder(createAbility)

  Object.entries(permissions).forEach(([subject, actions]) => {
    Object.entries(actions).forEach(([action, isAllowed]) => {
      if (isAllowed) {
        can(action, subject)
      } else {
        cannot(action, subject)
      }
    })
  })

  return build()
}