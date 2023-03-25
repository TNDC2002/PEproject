// write some function to solve logic problem here and export it main function

//example:
var DoSth_1 = (a,b) => {
    a +=b
    return a
}
var DoAnotherThing = (a,b) => {
    a -= b
    return a
}
var main = (req) => {
    if (!req){
        let a = 1
        let b = 2
        let c = DoSth_1(a,b)
        c = DoAnotherThing(c,b)
        return c
    }
    else{
        console.log("\x1b[37m\x1b[36mMODELS CALLED!!!\x1b[0m")
    }
}


export default {main}