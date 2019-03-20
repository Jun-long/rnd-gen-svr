let self;
class Permutations {
  constructor() {
    self = this;
  }

  /** 
   * @description 阶乘计算 n!/m!
   * 
   * @returns 返回计算结果
   */
  calcFactorial(n, m) {
    let num = 1;
    let count = 0;
    for (let i = n; i > 0; i--) {
      if (count === m) { //当循环次数等于指定的相乘个数时，即跳出for循环
        break;
      }
      num = num * i;
      count++;
    }
    return num;
  }

  /** 
   * @description 排列计算 【A(m,n) n>=m】
   * 
   * @returns 返回计算结果
   */
  calcArrange(n, m) {
    return self.calcFactorial(n, m);

  }

  /**
   * @description 组合计算 【C(m,n) n>=m】
   * 
   * @returns 返回计算结果
   */
  calcCombine(n, m) {
    return self.calcFactorial(n, m) / self.calcFactorial(m, m);
  }

  /**
   * @description 计算混合结果集的总数量
   * 
   * @returns 返回计算结果
   */
  calcPermute(data) {
    if (!data instanceof Array) {
      return console.error("The input data is not array!");
    }
    let p = 1;
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      if (!temp.arr || !temp.arr instanceof Array) {
        return console.error("The input data[ " + i + "] is not array!");
      }

      let len = 0;
      switch (temp.type) {
        case 0:
          len = Math.pow(temp.arr.length, temp.size);
          break;
        case 1:
          len = self.calcArrange(temp.arr.length, temp.size);
          break;
        case 2:
          len = self.calcCombine(temp.arr.length, temp.size);
          break;
        default:
          len = 1;
          break;
      }
      temp.len = len;
      p *= len;
    }
    return p;
  }

  /**
   * @description 获取可重复结果集(取出后放回)【R(n,m) n>=m】
   * 
   * @param arr 原数组
   * @param size 取出数量
   * 
   * @returns 返回结果集
   */
  getRepeatList(arr, size) {
    var allResult = [];

    (function fn(arr, size, result) {
      if (result.length === size) {
        allResult.push(result);
        // console.log("getRepeatList", result, allResult.length - 1)
      } else {
        for (let i = 0, len = arr.length; i < len; i++) {
          let newArr = [].concat(arr);
          let curItem = newArr.splice(i, 1);
          fn(arr, size, [].concat(result, curItem));
        }
      }
    })(arr, size, []);
    return allResult;
  }

  /**
   * @description 获取排列结果集【A(n,m) n>=m】
   * 
   * @param arr 原数组
   * @param size 取出数量
   * 
   * @returns 返回结果集
   */
  getArrangeList(arr, size) {
    let allResult = [];
    if (size > arr.length) {
      return allResult;
    }

    (function fn(arr, size, result) {
      if (result.length === size) {
        allResult.push(result);
        // console.log("getArrangeList", result, allResult.length - 1)
      } else {
        for (let i = 0, len = arr.length; i < len; i++) {
          let newArr = [].concat(arr);
          let curItem = newArr.splice(i, 1);
          fn(newArr, size, [].concat(result, curItem));
        }
      }
    })(arr, size, []);
    return allResult;
  }

  /**
   * @description 获取组合结果集【C(n,m) n>=m】
   * 
   * @param arr 原数组
   * @param size 取出数量
   * 
   * @returns 返回结果集
   */
  getCombineList(arr, size) {
    var allResult = [];
    if (size > arr.length) {
      return allResult;
    }

    (function fn(arr, size, result) {
      if (size === arr.length) {
        allResult.push([].concat(result, arr));
        // console.log("getCombineList", [].concat(result, arr), allResult.length - 1)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let newResult = [].concat(result);
          newResult.push(arr[i]);

          if (size === 1) {
            allResult.push(newResult);
            // console.log("getCombineList", newResult, allResult.length - 1)
          } else {
            let newArr = [].concat(arr);
            newArr.splice(0, i + 1);
            fn(newArr, size - 1, newResult);
          }
        }
      }
    })(arr, size, []);
    return allResult;
  }

  /** 
   * @description 将一个二维数组,按纵向每个子数组取一个元素做混合
   * 
   * @param arrs 需要进行混合的二维数组
   * 
   * @returns 返回混合后结果集
   */
  doMixing(arrs) {
    let results = [];
    let result = [];
    (function fn(arrs, index) {
      for (var i = 0; i < arrs[index].length; i++) {
        result[index] = arrs[index][i];
        if (index !== arrs.length - 1) {
          fn(arrs, index + 1)
        } else {
          // results.push(result.join(","));
          results.push(result);
          // console.log(result, results.length - 1);
        }
      }
    })(arrs, 0);
    return results
  }

  /**
   * @description 获取可重复(取出后放回)结果集中对应下标为index的元素 【R(n,m)  n>=m】
   * 
   * @param arr 需要进行重复取值的原数组
   * @param size 重复取值返回结果的数量 【R(n,m) 中m】
   * @param index 总结果集中要取的下标，从0开始
   * 
   * @returns 返回混合后结果集中下标为index的元素，是一个数组
   */
  getRepeatByIndex(arr, size, index) {
    let res = [];
    let len = arr.length;
    let max = Math.pow(len, size);
    if (index > max) {
      return console.error("The index out of range!");
    }

    (function fn(i, index) {
      if (i >= size) {
        return;
      }
      let p = Math.pow(len, size - i - 1);
      let f = Math.floor(index / p);
      res[i] = arr[f];
      fn(i + 1, index % p, size);
    })(0, index)

    return res;
  }

  /**
   * @description 获取排列结果集中对应下标为index的元素【排列公式 A(n,m)  n>=m】
   * 
   * @param arr 需要进行排列的原数组
   * @param size 排列返回结果的数量 【A(n,m) 中m】
   * @param index 总结果集中要取的下标，从0开始
   * 
   * @returns 返回混合后结果集中下标为index的元素，是一个数组
   */
  getArrangeByIndex(arr, size, index) {
    let res = [];
    let max = self.calcArrange(arr.length, size);
    if (index > max) {
      return console.error("The index out of range!");
    }

    (function fn(i, index, arr) {
      let len = arr.length;
      if (i >= size) {
        return
      }
      let p = self.calcArrange(len - 1, size - i - 1);
      let f = Math.floor(index / p);
      res[i] = arr[f];
      let newArr = [].concat(arr);
      newArr.splice(f, 1);
      fn(i + 1, index % p, newArr);
    })(0, index, arr);

    return res;
  }

  /**
   * @description 获取组合结果集中对应下标为index的元素【组合公式 C(n,m)  n>=m】
   * 
   * @param arr 需要进行组合的原数组
   * @param size 组合返回结果的数量 【C(n,m) 中m】
   * @param index 总结果集中要取的下标，从0开始
   * 
   * @returns 返回混合后结果集中下标为index的元素，是一个数组
   */
  getCombineByIndex(arr, size, index) {
    let res = [];
    let max = self.calcCombine(arr.length, size);
    if (index > max) {
      return console.error("The index out of range!");
    }

    (function fn(i, index, arr) {
      let len = arr.length;
      if (i >= size) {
        return;
      }
      let p = self.calcCombine(len - 1, size - i - 1);
      if (index < p) {
        res[i] = arr[0];
        let newArr = [].concat(arr);
        newArr.splice(0, 1);
        fn(i + 1, index, newArr);
      } else {
        let newArr = [].concat(arr);
        newArr.splice(0, 1);
        fn(i, (index + 1) % (p + 1), newArr);
      }
    })(0, index, arr);

    return res;
  }

  /**
   * @description 已经排列组合后的数据集做混合，取数对应下标的元素
   * 
   * @param arrs 需要混合的二维数组，二维数组每个元素都是排列组合的一个结果集
   * @param index 总结果集中要取的下标，从0开始
   * 
   * @returns 返回混合后结果集中下标为index的元素，是一个数组
   */
  getMixedByIndex(arrs, index) {
    let res = [];

    let p = 1;
    for (let j = 0; j < arrs.length; j++) {
      let arrTemp = arrs[j];
      p *= arrTemp.length;
    }
    if (index > p) {
      return console.error("The index out of range!");
    }

    (function fn(i, index) {
      if (i >= arrs.length) {
        return;
      }
      let arr = arrs[i];
      let q = 1;
      for (let j = i + 1; j < arrs.length; j++) {
        let arrTemp = arrs[j];
        q *= arrTemp.length;
      }

      let f = Math.floor(index / q);
      res[i] = arr[f];
      fn(i + 1, index % q);

    })(0, index);

    return res;
  }

  /**
   * @description 需要进行排列组合的多个数组，通过下标去总结果集中对应的元素
   * 
   * @param data 输入的二维数组，数组元素为一个对象，其中包含 
   * @memberof arr:需要排列组合的数组，
   * @memberof size:排列组合的输出数量，
   * @memberof type:排列组合的类型【0：可重复，1：排列，2：组合】
   * @param index 总结果集中要取的下标，从0开始
   * 
   * @returns 返回总结果集中下标为index的元素，是一个数组
   */
  getMiningIndex(data, index) {
    let res = [];
    if (!data instanceof Array) {
      return console.error("The input data is not array!");
    }

    let p = self.calcPermute(data);
    if (index > p) {
      return console.error("The index out of range!");
    }

    (function fn(i, index) {
      if (i >= data.length) {
        return;
      }

      let q = 1;
      for (let j = i + 1; j < data.length; j++) {
        let temp = data[j];
        q *= temp.len;
      }
      let temp = data[i];
      let f = Math.floor(index / q);
      switch (temp.type) {
        case 0:
          res[i] = self.getRepeatByIndex([].concat(temp.arr), temp.size, f);
          break;
        case 1:
          res[i] = self.getArrangeByIndex([].concat(temp.arr), temp.size, f);
          break;
        case 2:
          res[i] = self.getCombineByIndex([].concat(temp.arr), temp.size, f);
          break;
        default:
          res[i] = [];
          break;
      }

      fn(i + 1, index % q);
    })(0, index);

    return res;
  }

}

module.exports = Permutations;