export function removeInvalidSearchCharacters(cnpj: string): string {
  return cnpj.replace(/\D/g, '')
}
