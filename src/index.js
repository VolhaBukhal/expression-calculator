  
function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  //transrorm expresstion to array
  let strArr = expr.trim().split('');
  //str without space
  let nakedStr = strArr.filter( i => i !=="" && i !==" " );
  let symbolStr = '/*+-()';
  let calculation = [];
  let current = '';
  for (let i = 0; i < nakedStr.length; i++) {  
    let symbol = nakedStr[i];
    if(symbolStr.indexOf(symbol) !== -1) {
      if(current.length > 0) {
        calculation.push(+current);
        calculation.push(symbol);
      } else {
        calculation.push(symbol);
      }
      current = ''
    } else {
      current +=symbol;
    }
  }
  if(current !== '') {
    calculation.push(+current);
  }

  //check brackets in array
  function checkBrackets(calculation) {
    let stack = [];
    debugger;
    for(let el of calculation) {
      if ( el == '(') {
        stack.push(el);
      } else if(el == ')') {
        let topOfStack = stack[stack.length - 1];
        if(stack.length > 0 && topOfStack !== el){
          stack.pop();
        }
        else {
          throw new Error("ExpressionError: Brackets must be paired");
      
        }
      }
    }
    if (!stack.length)  {
      return true;
    } else {
      throw new Error("ExpressionError: Brackets must be paired");
    }
  }

  // if brackets is paired continue  
  if (checkBrackets(calculation)) {
    //make finding the brackets and calculate the inside brackets expresstion while calculation langth will not be equal to 1
    while (calculation.length !== 1) {
      let indexOfCloseBr = calculation.indexOf(')') // find first close bracket
      let tempArr = calculation.slice(0, indexOfCloseBr);    
      let indexOfOpenBr = tempArr.lastIndexOf('(');    // find last open bracket but in the array not longer then close bracket(in tempArr);
      if (indexOfCloseBr !== -1) {
        let innerCalcExp = calculation.slice((indexOfOpenBr + 1), indexOfCloseBr);
        let innerRes;
        innerRes = doCalc(innerCalcExp);
        calculation.splice(indexOfOpenBr, (indexOfCloseBr - indexOfOpenBr + 1), innerRes[0]);
        indexOfOpenBr = null;
        indexOfCloseBr = null;

      } else {
        let res = doCalc(calculation);
        return Math.round(res*10000) / 10000; 
      }
    }

  //make calculation starting from more priority operand
  function doCalc(calculation) {
    let operators = [
      {"*": (a, b) => a * b,
       "/": (a, b) => a / b,
      },
      {"+": (a, b) => a + b,
       "-": (a, b) => a - b,
      }];
    
    let newCalculation = [];           
    let curOperator;  
    
    for (let operator of operators) {
      for (let i = 0; i < calculation.length; i++) {
        // if current el of calculation is operator then remember it for further operation else it is number - push it to newCalculation array
        let currentEl = calculation[i];
        if (operator[currentEl]) {
          curOperator = operator[currentEl];
        } else if(curOperator) {
          if(curOperator == operator['/'] && currentEl === 0) {
            throw new Error("TypeError: Division by zero.");
          } else {
            let lastNumber = newCalculation[newCalculation.length - 1];
            newCalculation[newCalculation.length - 1] = curOperator(lastNumber, currentEl);
            curOperator = null;
          }
        } else {
          newCalculation.push(currentEl);
        }
      }
      calculation = newCalculation;
      newCalculation = [];  
    }
    return calculation;
  }

  }

}

module.exports = {
  expressionCalculator
}

