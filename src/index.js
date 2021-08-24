function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let strArr = expr.trim().split('');
  //str without space
  let nakedStr = strArr.filter( i => i !=="" && i !==" " );
  let symbolStr = '/*+-';
  let calculation = [];
  let current = '';
  for (let i = 0; i < nakedStr.length; i++) {  
    let symbol = nakedStr[i];
    if(symbolStr.indexOf(symbol) !== -1) {
      calculation.push(+current);
      calculation.push(symbol);
      current = ''
    } else {
      current +=symbol;
    }
  }
  if(current !== '') {
    calculation.push(+current);
  }

  debugger;
  //make calculation starting from more priority operand
  let operators = [
    {"*": (a, b) => a * b,
     "/": (a, b) => a / b,
    },
    {"+": (a, b) => a + b,
     "-": (a, b) => a - b,
    }];
  
  let newCalculation = [];            //[16, "+", 25, "-", 92, "+", 54, "/", 66];
  let curOperator;  

  for (let operator of operators) {
    for (let i = 0; i < calculation.length; i++) {
      // if curent el of calculation is operator then remember it for further operation else it is number - push in to newCalculation array
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
  
  let res = calculation[0];

  return Math.round(res*10000) / 10000;
}

module.exports = {
    expressionCalculator
}



// Кароч, кто будет делать, запомните. Надо будет сделать валидацию на ошибки по количеству скобок(аналогично bracket), и при делении на ноль, тоже ошибку сбрасывать.
// Плюс я делал так:
// Через regex правильно доставал данные.
// Циклил, пока не будет в выражении никаких скобок. 
// Искал самую глубокую пару скобок.
// Решал то, что внутри. Сплайсом возвращал ответ в массив вместо выражения в скобках.
// Повторял поиск самой глубокой скобки...
// Ну и в конце решал все, что осталось без скобок в выражении.
// Не думаю, что мой способ самый лучший, но все таки работает. Тут вообще тысяча разных способов как, и среди них нету ни одного легкого способа(если конечно не использовать все таки new Function, что по идее нельзя), так что если кто будет делать, держитесь там, это просто .... для новичка