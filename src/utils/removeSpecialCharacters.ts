interface IRemoveSpecialCharacters {
  data: { [key: string]: any }
  fields: string[]
  option?: string
}

export function removeSpecialCharacters({
  data,
  fields,
  option,
}: IRemoveSpecialCharacters) {
  const fieldsValue = data

  fields.forEach((field: any) => {
    if (option === 'money') {
      if (data[field]) {
        const rawValue = data[field].replace(
          /[\sR~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          '',
        )

        fieldsValue[field] = rawValue
      }
    } else if (data[field]) {
      const rawValue = data[field].replace(
        /[\sR~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        '',
      )

      fieldsValue[field] = rawValue
    }
  })

  return fieldsValue
}
