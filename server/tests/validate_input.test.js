const {validateRegisterInput, validateLoginInput, validateResetPasswordInput} = require('../controllers/validate_input')
const {validateOnlyNumbers, validatePhoneNumber, validateEmail, validateNotEmpty, validateLength, validateDate, validateTime} = require('../controllers/validate_input')

test('not empty returns true if not empty', () => {
    const result = validateNotEmpty('Testisyöte')
    expect(result).toBe(true)
})

test('not empty returns false if input is empty', () => {
    const result = validateNotEmpty('')
    expect(result).toBe(false)
})

test('validate length returns true if input is correct', () => {
    const result = validateLength('testisana', 5, 15)
    expect(result).toBe(true)
})

test('validate length returns false if input is too short', () => {
    const result = validateLength('xx', 5, 15)
    expect(result).toBe(false)
})

test('validate length returns false if input is too long', () => {
    const result = validateLength('testisana123456789', 5, 15)
    expect(result).toBe(false)
})

test('validate only numbers returns true if input contains only numbers', () => {
    const result = validateOnlyNumbers('12345')
    expect (result).toBe(true)
})

test('validate only numbers returns false if input does not contain only numbers', () => {
    const result = validateOnlyNumbers('12a45')
    expect (result).toBe(false)
})

test('validate phonenumber returns true if input has only numbers', () => {
    const result = validatePhoneNumber('1234567')
    expect (result).toBe(true)
})

test('validate phonenumber returns true if input begins with + and has only numbers', () => {
    const result = validatePhoneNumber('+1234567')
    expect (result).toBe(true)
})

test('validate phonenumber returns true if input has numbers, spaces and -', () => {
    const result = validatePhoneNumber('+12-34 567')
    expect (result).toBe(true)
})

test('validate phonenumber returns false if input has additional characters', () => {
    const result = validatePhoneNumber('123a4567')
    expect (result).toBe(false)
})

test('validate date returns true if date is correct', () => {
    const result = validateDate('2023-06-15')
    expect (result).toBe(true)
})

test('validate date returns false if date is incorrect', () => {
    const result = validateDate('15.6.2023')
    expect (result).toBe(false)
})

test('validate time returns true if time is correct', () => {
    const result = validateTime('15:30')
    expect (result).toBe(true)
})

test('validate time returns false if time is incorrect', () => {
    const result = validateTime('1530')
    expect (result).toBe(false)
})

test('validate email returns true if email is correct', () => {
    const result = validateEmail('etunimi.sukunimi@gmail.com')
    expect (result).toBe(true)
    const result2 = validateEmail('pekka123@ad.helsinki.fi')
    expect (result2).toBe(true)
    const result3 = validateEmail('joku_nimi@palvelin.fi')
    expect (result3).toBe(true)
})

test('validate email returns false if email is incorrect', () => {
    const result = validateEmail('etunimi.sukunimi.gmail.com')
    expect (result).toBe(false)
    const result2 = validateEmail('pekka123&%¤%&/@ad.helsinki.fi')
    expect (result2).toBe(false)
    const result3 = validateEmail('joku_nimi@palvelin_fi')
    expect (result3).toBe(false)
})

test('validate register input returns an empty array if everything is ok', () => {
    const result = validateRegisterInput('Nimi', 'Sukunimi', 'testaaja', 'salasana123', 'Jokukatu 23',
        'Espoo', '02200', '050 123 4567', 'nimi@gmail.com')
    expect (result).toHaveLength(0)
})

test('validate register input returns errors if something is wrong', () => {
    const result = validateRegisterInput('Nimi', 'Sukunimi', 'testaaja', 'salasana123', 'Jokukatu 23',
        'Espoo', '0220', '050 123 4567', 'nimigmail.com')
    expect (result).toHaveLength(2)
})

test('validate login input returns an empty array if everything is ok', () => {
    const result = validateLoginInput('testaaja', 'salasana123')
    expect (result).toHaveLength(0)
})

test('validate login input returns errors if something is wrong', () => {
    const result = validateLoginInput('test', 'salasana123')
    expect (result).toHaveLength(1)
})

test('validate reset password input returns an empty array if both passwords are ok', () => {
    const result = validateResetPasswordInput('salasana123', 'salasana123')
    expect (result).toHaveLength(0)
})

test('validate reset password input returns errors if one of the inputs is too short', () => {
    const result = validateResetPasswordInput('sala', 'salasana123')
    expect (result).toHaveLength(1)
})

test('validate reset password input returns errors if one of the inputs is too long', () => {
    const result = validateResetPasswordInput('salaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'salasana123')
    expect (result).toHaveLength(1)
})