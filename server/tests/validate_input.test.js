const {validateNotEmpty, validateLength} = require('../controllers/validate_input')
const {validateOnlyNumbers} = require('../controllers/validate_input')

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

