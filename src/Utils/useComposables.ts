export const getFirstTwoLetters = (word: string | undefined) : string | undefined =>{
    return word?.substring(0, 2).toUpperCase()
}