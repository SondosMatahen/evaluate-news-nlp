import { checkForName } from "../src/client/js/nameChecker"
test('as expected',()=>{
    expect(checkForName("https://www.facebook.com")).toBeTruthy()
    expect(checkForName("www.google.com")).toBeFalsy()
})
test('as expected',()=>{
    expect(checkForName("https://www.google.com")).toBeTruthy()
    expect(checkForName("https ://www.google.com")).toBeFalsy()
    expect(checkForName("lll ://www.google.com")).toBeFalsy()

})
test('as expected',()=>{
    expect(checkForName("https://www.bing.com")).toBeTruthy()
    expect(checkForName("https:\\www.bing.com")).toBeFalsy()
})
