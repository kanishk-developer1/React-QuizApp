export const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export const random_item = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  }

export const getCorrectAnswer = (r_Operand1, r_Operand2, r_Operator) => {
    let answer = null;
    switch (r_Operator) {
      case '+':
        answer = r_Operand1 + r_Operand2;
        break;
      case '-':
        answer = r_Operand1 - r_Operand2;
        break;
      case '*':
        answer = r_Operand1 * r_Operand2;
        break;
      case '/':
        answer = (r_Operand1 / r_Operand2).toFixed(1);
        break;
        default:
          answer = 0;
    }
    return answer;
  }