import { AbilityBuilder, createMongoAbility as createAbility } from '@casl/ability'

export function defineAbilitiesFor(permissions) {
  const { can, build } = new AbilityBuilder(createAbility)

  permissions.forEach(({ action, subject }) => {
    can(action, subject)
  })

  // Object.entries(permissions).forEach(([subject, actions]) => {
  //   Object.entries(actions).forEach(([action, isAllowed]) => {
  //     if (isAllowed) {
  //       can(action, subject)
  //     } else {
  //       cannot(action, subject)
  //     }
  //   })
  // })

  return build()
}