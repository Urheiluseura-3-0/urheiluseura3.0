const {validateNotEmpty, validateLength} = require('../controllers/validate_input')

test('not empty returns true if not empty', () => {
    const input = ['Testinimi', 'Testisalasana']
    const result = validateNotEmpty(input)
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
