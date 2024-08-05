const rules = {
    required: value => !!value,
    date: (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }
}

const messages = {
  required: 'Поле обязательно для заполнения',
  date: 'Неверный формат даты'
}

function validateInput(value, validateRules) {
    const fileds = Object.keys(validateRules)
    const separatedRules = {}
    fileds.map(field => separatedRules[field] = validateRules[field].split('|'))
    for (const field of fileds) {
      for (const rule of separatedRules[field]) {
        if (!rules[rule](value[field])) {
          return {
            isValid: false,
            message: {
              [field]: messages[rule]
            }
          }
        }
      }
    }
  
    return {
      isValid: true,
      message: {}
    }
}

export default validateInput
  
