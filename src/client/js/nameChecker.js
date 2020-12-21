function checkForName(inputText) {
    console.log("::: Running checkForURL :::", inputText);
    // let names = [
    //     "Picard",
    //     "Janeway",
    //     "Kirk",
    //     "Archer",
    //     "Georgiou"
    // ]
const format=/^(http|https):\/\/[^ "]+$/;
    if(format.test(inputText)) {
        console.log("Welcome, URL valid!");
        return true;
    }else{
        console.log("Welcome, URL NOT valid!");
        return false;
        }
}

export { checkForName }
