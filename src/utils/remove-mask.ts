export class RemoveMask {
  static pis(value: string): string {
    return this.removeMask(value)
  }

  static cpf(value: string): string {
    return this.removeMask(value)
  }

  static phone(value: string): string {
    return this.removeMask(value)
  }

  static zipCode(value: string): string {
    return this.removeMask(value)
  }

  static cnpj(value: string): string {
    return this.removeMask(value)
  }

  private static removeMask(value: string): string {
    return value.replace(/\D/g, '')
  }
}
