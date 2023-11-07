import {
  required,
  maxLength,
  email,
  minLength,
} from 'vuelidate/lib/validators'

const rules = {
  require: { required },
  email: { max: maxLength(50), email },
  url: {
    max: maxLength(250),
    url(value) {
      const url = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=/%+.*!'(),$_{}^~[\]`#|]+)/g.test(
        value
      )
      return url
    },
  },
  password: {
    min: minLength(6),
    password(value) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      return containsUppercase && containsLowercase && containsNumber
    },
  },
}

const messages = {
  require: { required: { key: 'rule.validation.require', additional: {} } },
  email: {
    max: { key: 'rule.validation.length.max', additional: { data: 50 } },
    email: { key: 'rule.validation.email', additional: {} },
  },
  url: {
    max: { key: 'rule.validation.length.max', additional: { data: 250 } },
    url: { key: 'rule.validation.url', additional: {} },
  },
  password: {
    min: { key: 'rule.validation.value.min', additional: { data: 6 } },
    password: { key: 'rule.validation.password.valid', additional: {} },
  },
}

export const generateValidation = (_rules) => {
  const validation = {}
  _rules.forEach((element) => {
    validation[element.name] = rules[element.name]
  })

  const validations = {}
  const messagesResponse = {}

  Object.keys(validation).forEach((key, index) => {
    const values = rules[key]
    const message = messages[key]

    const valueKeys = Object.keys(values)
    const messageKeys = Object.keys(message)

    valueKeys.forEach((valKey) => {
      validations[valKey] = values[valKey]
    })

    if (_rules[index].message && _rules[index].message.length > 0) {
      _rules[index].message.forEach((valKey) => {
        messagesResponse[valKey] = {
          key: valKey.key,
          additional: valKey.additional,
        }
      })
    } else {
      messageKeys.forEach((valKey) => {
        messagesResponse[valKey] = message[valKey]
      })
    }
  })

  return { validations, message: messagesResponse }
}
