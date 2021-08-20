function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let signs = ['(', ')', '+', '-', '*', '/'];
    // split expr
    let strArr = expr.split('');

    //str without space
    let nakedStr = strArr.filter( i => i !==" ");
    let arrWithNum = [];

    let res = null;

    for (let i = 0; i < nakedStr.length; i++) {
    //   debugger;
      let cur = nakedStr[i];
      let next = nakedStr[i + 1];
      let prev = nakedStr[i - 1];

      if (signs.includes(cur) && cur === "+"){
        res = +prev + +next;
      }

      if (signs.includes(cur) && cur === "-"){
        res = +prev - +next;
      }
      if (signs.includes(cur) && cur === "*"){
        res = +prev * +next;
      }
      if (signs.includes(cur) && cur === "/"){
        res = +prev / +next;
          if(+next) {
            res = +prev / +next;
          } else {
            throw new Error("TypeError: Division by zero.");
            
          }
      }
    
    }  
    return res;
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