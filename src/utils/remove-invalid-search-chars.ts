export default function removeInvalidSearchChars(search: string) {
  return search && search !== 'undefined' && search !== 'null'
    ? search.trim().replace(/['"%*_?']/g, '')
    : ''
}
