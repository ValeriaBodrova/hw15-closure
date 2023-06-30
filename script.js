

function memoize(fn) {
    const cache = new Map(); // Кеш для збереження результатів дзвінків
    const callHistory = []; // Історія дзвінків
  
    return function(...args) {
      const key = args.join('_'); // Створюємо ключ на основі аргументів
  
      // Перевіряємо, чи є результат дзвінка в кеші
      if (cache.has(key)) {
        console.log('Використано кеш');
        return cache.get(key);
      }
  
      // Викликаємо функцію і зберігаємо результат
      const result = fn(...args);
      cache.set(key, result);
  
      // Додаємо дзвінок до історії
      callHistory.push({ args, result });
  
      // Якщо історія перевищує 10 дзвінків, видаляємо найстаріший дзвінок
      if (callHistory.length > 10) {
        const oldestCall = callHistory.shift();
        cache.delete(oldestCall.args.join('_'));
      }
  
      return result;
    };
  }
  
  // Приклад використання
  
  function add(a, b) {
    console.log('Виклик функції add');
    return a + b;
  }
  
  const memoizedAdd = memoize(add);
  
  console.log(memoizedAdd(2, 3)); // Виклик функції add, результат: 5
  console.log(memoizedAdd(2, 3)); // Використано кеш, результат: 5
  
  console.log(memoizedAdd(4, 5)); // Виклик функції add, результат: 9
  console.log(memoizedAdd(4, 5)); // Використано кеш, результат: 9
  