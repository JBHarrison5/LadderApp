export const capitaliseSentence = (sentence) => {
    let words = sentence.split("_").map(word => {
        let firstLetter = word.slice(0,1);
        let restWord = word.slice(1);
           firstLetter = firstLetter.toUpperCase();

        return `${firstLetter}${restWord}`
    })
    return words.join(" ");
}