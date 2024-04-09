export const Validations = {
  validateCPFNumber: (cpf: string) => {
    cpf = cpf.replace(/\D/g, '')

    if (cpf === '') {
      return false
    }
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }
    // Valida 1o digito
    let add = 0

    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i)
    }

    let rev = 11 - (add % 11)

    if (rev === 10 || rev === 11) {
      rev = 0
    }

    if (rev !== parseInt(cpf.charAt(9))) {
      return false
    }
    // Valida 2o digito
    add = 0

    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i)
    }

    rev = 11 - (add % 11)

    if (rev === 10 || rev === 11) {
      rev = 0
    }

    if (rev !== parseInt(cpf.charAt(10))) {
      return false
    }
    return true
  },

  validateEmail: (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const x = re.test(String(email).toLowerCase())
    return x
  },

  scorePassword2(pass: string, minimunLength: number) {
    if (!pass) {
      return false
    }

    if (pass.length < minimunLength) {
      return false
    }

    let hasCapital = false
    let hasNonCapital = false
    let hasNumber = false
    let hasSpecial = false

    for (let i = 0; i < pass.length; i++) {
      const ascii = pass.charCodeAt(i)

      if (ascii >= 65 && ascii <= 90) hasCapital = true
      if (ascii >= 97 && ascii <= 122) hasNonCapital = true
      if (ascii >= 48 && ascii <= 57) hasNumber = true
      if (
        ascii === 33 ||
        ascii === 35 ||
        ascii === 36 ||
        ascii === 40 ||
        ascii === 41 ||
        ascii === 43 ||
        ascii === 45 ||
        ascii === 46 ||
        ascii === 64 ||
        ascii === 95
      ) {
        hasSpecial = true // !#$()+-._@
      }
    }

    return hasCapital && hasNonCapital && hasNumber && hasSpecial
  },
}
