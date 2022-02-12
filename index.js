import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const input_num = await rl.question('Input numbers(ie. 1,2,3,4): ');

const input_c = await rl.question('Replace cross (Y/N): ');
if(input_c.toUpperCase() === "Y")
    var input_c_string = await rl.question('Input string for replace: ');
const input_v = await rl.question('Replace vertical middle (Y/N): ');
if(input_v.toUpperCase() === "Y")
    var input_v_string = await rl.question('Input string for replace: ');
const input_h = await rl.question('Replace horizontal middle (Y/N): ');
if(input_h.toUpperCase() === "Y")
    var input_h_string = await rl.question('Input string for replace: ');
var input_f = await rl.question('Flip Even Indexes (Y/N): ');

rl.close();

// var input_num = "1,2,3,4,5,6";

var numbers = [[]];

Array.prototype.toString = function() {
    for (let index = 0; index < this.length; index++) {
        for (let index1 = 0; index1 < this[index].length; index1++) {
            if (index1 === this[index].length - 1) {
                output.write(this[index][index1] + '\n');
            }
            else {
                output.write(this[index][index1] + " ");
            }
        }
        
    }
}

Array.prototype.replaceCenter = function(char) {
     if(this[0].length % 2 === 0 && this[0].length > 2)  {
        this[Math.ceil(this[0].length / 2) - 1][Math.ceil(this[0].length / 2) - 1] = char;
        this[Math.ceil(this[0].length / 2)][Math.ceil(this[0].length / 2)] = char;
        this[Math.ceil(this[0].length / 2)][Math.ceil(this[0].length / 2) - 1] = char;
        this[Math.ceil(this[0].length / 2) - 1][Math.ceil(this[0].length / 2)] = char;
    }else if(this[0].length > 2)  {
        this[Math.ceil(this[0].length / 2) - 1][Math.ceil(this[0].length / 2) - 1] = char;
    }
    return this;
}

Array.prototype.getCenterIndex = function() {
    let center = [];
    if(this[0].length % 2 === 0 && this[0].length > 2)  {
        center.push([Math.ceil(this[0].length / 2) - 1, Math.ceil(this[0].length / 2) - 1]);
        center.push([Math.ceil(this[0].length / 2), Math.ceil(this[0].length / 2)]);
        center.push([Math.ceil(this[0].length / 2), Math.ceil(this[0].length / 2) - 1]);
        center.push([Math.ceil(this[0].length / 2) - 1, Math.ceil(this[0].length / 2)]);
    }else if(this[0].length > 2)  {
        center.push([Math.ceil(this[0].length / 2) - 1, Math.ceil(this[0].length / 2) - 1]);
    }
    return center;
}

Array.prototype.replaceCross = function(char, tl, tr) {
    for (let index = 0; index < this.length; index++) {
        if(this[0].length > 2)
        {
            if(tl)
                this[index][index] = char;
            if(tr)
                this[index][(this.length - 1) - index] = char;
            if(!tl && !tr){
                this[index][index] = char;
                this[index][(this.length - 1) - index] = char;
            }
        }
    }
    return this;
}

Array.prototype.getCrossIndex = function() {
    let cross = [];
    for (let index = 0; index < this.length; index++) {
        if(this[0].length > 2)
        {
            cross.push([index, index]);
            cross.push([(this.length - 1) - index, (this.length - 1) - index]);
        }
    }
}

Array.prototype.replaceVerticalMiddle = function(char) {
    for (let index = 0; index < this.length; index++) {
        if(this[0].length % 2 === 0 && this[0].length > 2) {
            this[index][(Math.ceil(this[0].length / 2))] = char;
            this[index][(Math.ceil(this[0].length / 2) - 1)] = char;
        }else if(this[0].length > 2) {
            this[index][(Math.ceil(this[0].length / 2) - 1)] = char;
        }
    }
    return this;
}

Array.prototype.getVerticalMiddleIndex = function() {
    let verticalMiddle = [];
    for (let index = 0; index < this.length; index++) {
        if(this[0].length % 2 === 0 && this[0].length > 2) {
            verticalMiddle.push([index, (Math.ceil(this[0].length / 2))]);
            verticalMiddle.push([index, (Math.ceil(this[0].length / 2) - 1)]);
        }
    }
    return verticalMiddle;
}

Array.prototype.replaceHorizontalMiddle = function(char) {
    for (let index = 0; index < this.length; index++) {
        if(this[0].length % 2 === 0 && this[0].length > 2) {
            this[(Math.ceil(this[0].length / 2))][index] = char;
            this[(Math.ceil(this[0].length / 2) - 1)][index] = char;
        }else if(this.length > 2) {
            this[(Math.ceil(this[0].length / 2) - 1)][index] = char;
        }
    }
    return this;
}

Array.prototype.flipEvenIndex = function() {
    for (let index = 0; index < this.length; index++) {
        for (let index1 = 0; index1 < this[index].length; index1++) {
            if(index % 2 === 0) {
                for (let index2 = 0; index2 < this[index].length; index2++) {
                    if(this[index][index1] > this[index][index2]) {
                        let temp = this[index][index2];
                        this[index][index2] = this[index][index1];
                        this[index][index1] = temp;
                    }
                }
            }
            
        }
    }
}


var temp = "";

for (let index = 0; index < input_num.length; index++) {
    if(input_num[index] !== ","){
        temp += input_num[index];
    }else {
        numbers[0].push(parseInt(temp));
        temp = "";
    }

    if(index === input_num.length - 1) {
        numbers[0].push(parseInt(temp));
        temp = "";
    }
}
for (let index = 1; index < numbers[0].length; index++) {
    numbers[index] = [];
    for (let index1 = 0; index1 < numbers[0].length; index1++) {
        numbers[index].push(numbers[0][index1]);       
    }
}

console.log(numbers);

for (let index = 0; index < numbers.length; index++) {
    for (let index2 = 0; index2 < numbers.length; index2++) {
        if(numbers[0][index] < numbers[0][index2]) {
            let temp = numbers[0][index];
            numbers[0][index] = numbers[0][index2];
            numbers[0][index2] = temp;
        }
    }
}

if(input_c.toUpperCase() === "Y")
    numbers.replaceCross(`\x1b[7m${input_c_string}\x1b[0m`, true, true);
if(input_v.toUpperCase() === "Y")
    numbers.replaceVerticalMiddle(`\x1b[7m${input_v_string}\x1b[0m`);
if(input_h.toUpperCase() === "Y")
    numbers.replaceHorizontalMiddle(`\x1b[7m${input_h_string}\x1b[0m`);
if(input_f.toUpperCase() === "Y")
    numbers.flipEvenIndex();
numbers.toString();