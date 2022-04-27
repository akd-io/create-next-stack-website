import validateNpmPackageName from "validate-npm-package-name"

/**
 * Project names must be valid NPM package names. This function checks that validity.
 *
 * @param projectName A project name
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export const validateProjectName = (projectName: string): string | true => {
  const problems = getProblemsInNpmPackageName(projectName)
  return problems.length > 0 ? problems[0] : true
}

/**
 *
 * @param name A candidate for an NPM package name.
 * @returns A list of problems found in the name.
 */
const getProblemsInNpmPackageName = (name: string): string[] => {
  const { errors, warnings } = validateNpmPackageName(name)
  return [...(errors ?? []), ...(warnings ?? [])]
}
