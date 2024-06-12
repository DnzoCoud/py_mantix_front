export const getFirstTwoLetters = (word: string | undefined) : string | undefined =>{
    return word?.substring(0, 2).toUpperCase()
}

export const getBase64 = (file: File): Promise<string>  => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            const base64String = (reader.result as string).split(',')[1]; // Remove "data:*/*;base64," prefix
            resolve(base64String);
        }
        reader.onerror = error => reject(error);
    });
};