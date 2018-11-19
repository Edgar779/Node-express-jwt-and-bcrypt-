const utils = require('./utils');
it('should add two numbers', ()=>{
    var res = utils.add(23,11);
    if(res > 40){
throw new Error('value is not correct');
    }
    
})

// "echo \"Error: no test specified\" && exit 1"    