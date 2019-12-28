function swap(array, firstIndex, secondIndex) {
  let placeHolder = array[firstIndex]
  array[firstIndex] = array[secondIndex]
  array[secondIndex] = placeHolder
}

function minIndex(inputArray) {
  let minIdx = 0
  for (let i = 0; i < inputArray.length - 1; i++) {
    if (inputArray[i + 1] < inputArray[minIdx]) {
      minIdx = i + 1
    }
  }
  return minIdx
}

function minAndMax(inputArray) {
  let minValue = inputArray[0]
  let maxValue = inputArray[0]
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] < minValue) {
      minValue = inputArray[i]
    } else if (inputArray[i] > maxValue) {
      maxValue = inputArray[i]
    }
  }

  return { max: maxValue, min: minValue }
}

function randomArray(maxLength, upperRange, negativePercent = 0) {
  if (maxLength < 0) {
    return undefined
  }
  let randomArray = []

  for (let i = 0; i < maxLength; i++) {
    let rawNumber = Math.random()
    if (rawNumber <= negativePercent / 10) {
      rawNumber *= -1
    }
    randomArray[i] = Math.round(rawNumber * upperRange)
  }

  return randomArray
}

export function bubbleSort(inputArray) {
  let len = inputArray.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (inputArray[j] > inputArray[j + 1]) {
        swap(inputArray, j, j + 1)
      }
    }
  }
  return inputArray
}

export function insertionSort(inputArray) {
  let len = inputArray.length,
    key,
    j,
    i

  for (i = 1; i < len; i++) {
    key = inputArray[i]
    j = i - 1

    while (j >= 0 && key < inputArray[j]) {
      inputArray[j + 1] = inputArray[j]
      j--
    }
    inputArray[j + 1] = key
  }
  return inputArray
}

// Can call this min index sort really
export function selectionSort(inputArray) {
  let len = inputArray.length,
    i,
    j,
    min_idx

  for (i = 0; i < len; i++) {
    min_idx = i

    for (j = i + 1; j < len; j++) {
      if (inputArray[min_idx] > inputArray[j]) {
        min_idx = j
      }
    }
    swap(inputArray, i, min_idx)
  }
  return inputArray
}

// Default, or hybrid of, for a lot of languages
export function mergeSort(inputArray) {
  const arrLength = inputArray.length
  if (arrLength === 1) {
    return inputArray
  }

  const middleIndex = Math.ceil(arrLength / 2)

  let leftArray = inputArray.slice(0, middleIndex)
  let rightArray = inputArray.slice(middleIndex, arrLength)

  leftArray = mergeSort(leftArray)
  rightArray = mergeSort(rightArray)

  return merge(leftArray, rightArray)
}

export function merge(leftArray, rightArray) {
  const sortedArray = []

  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0] > rightArray[0]) {
      sortedArray.push(rightArray[0])
      rightArray.shift()
    } else {
      sortedArray.push(leftArray[0])
      leftArray.shift()
    }
  }

  while (leftArray.length !== 0) {
    sortedArray.push(leftArray[0])
    leftArray.shift()
  }
  while (rightArray.length !== 0) {
    sortedArray.push(rightArray[0])
    rightArray.shift()
  }

  return sortedArray
}

export function quickSort(
  inputArray,
  lowIndex = 0,
  highIndex = inputArray.length - 1
) {
  if (lowIndex < highIndex) {
    let partIndex = partition(inputArray, lowIndex, highIndex)

    quickSort(inputArray, lowIndex, partIndex - 1)
    quickSort(inputArray, partIndex + 1, highIndex)
  }

  return inputArray
}

export function partition(inputArray, lowIndex, highIndex) {
  // Pivot can be defined in different locations
  //let pivot = inputArray[Math.floor(Math.random() * inputArray.length)]
  let pivot = inputArray[highIndex]

  let i = lowIndex - 1

  for (let j = lowIndex; j < highIndex - 1; j++) {
    if (inputArray[j] < pivot) {
      i++
      swap(inputArray, i, j)
    }
  }
  swap(inputArray, i + 1, highIndex)
  return i + 1
}

// Call any desired sort method
export function bucketSort(inputArray, bucketSize = 5) {
  if (inputArray.length === 0) {
    return inputArray
  }

  // What are the min and max values in our input array?
  let i
  let minValue = inputArray[0]
  let maxValue = inputArray[0]
  for (i = 0; i < inputArray.length; i++) {
    if (inputArray[i] < minValue) {
      minValue = inputArray[i]
    } else if (inputArray[i] > maxValue) {
      maxValue = inputArray[i]
    }
  }

  // Setup the buckets we will distribute values into
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  let buckets = new Array(bucketCount)
  for (i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }

  // Distribute input array into newly created
  // What's the best distribution method here?
  for (i = 0; i < inputArray.length; i++) {
    buckets[Math.floor((inputArray[i] - minValue) / bucketSize)].push(
      inputArray[i]
    )
  }

  // Sort bucket then,
  // Rewrite bucket's elements individually into original array
  inputArray.length = 0
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i])
    for (let j = 0; j < buckets[i].length; j++) {
      inputArray.push(buckets[i][j])
    }
  }

  return inputArray
}

/*
Pre-conditions: Integer input array
Create an array that counts the occurrence of each element
Write out from min to max value for a sorted array
 */
export function countingSort(inputArray) {
  let i
  let j = 0
  const count = []

  let inputValues = minAndMax(inputArray)

  // Setup empty slots for possible index counting per element
  for (i = inputValues.min; i <= inputValues.max; i++) {
    count[i] = 0
  }

  // Now, count the occurrence of each element
  for (i = 0; i < inputArray.length; i++) {
    count[inputArray[i]]++
  }

  // Rewrite occurrence of elements in order back into array
  for (i = inputValues.min; i <= inputValues.max; i++) {
    while (count[i]-- > 0) {
      inputArray[j++] = i
    }
  }

  return inputArray
}

// Only Objects and ARRAYS are passed by reference in JS
export function countingSortByDigit(inputArray, exponent) {
  let i, index
  const count = []
  const output = new Array(inputArray.length)

  let inputValues = minAndMax(inputArray)

  for (i = 0; i < 10; i++) {
    count[i] = 0
  }

  // Count occurrence by exponent position
  for (i = 0; i < inputArray.length; i++) {
    index = Math.floor(((inputArray[i] - inputValues.min) / exponent) % 10)
    count[index]++
  }

  // Update count to hold all values less than or equal to
  // current index
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1]
  }

  // Can now build the output array from count,
  // Read the index, with that many values equal or less than,
  // you can place it in the output at this location.
  // Then you decrement in case of reoccurring value in input
  i = inputArray.length - 1
  while (i >= 0) {
    index = Math.floor(((inputArray[i] - inputValues.min) / exponent) % 10)
    output[--count[index]] = inputArray[i]
    i--
  }

  // Copy sorted values back into our input array
  for (i = 0; i < inputArray.length; i++) {
    inputArray[i] = output[i]
  }

  return inputArray
}

/*
When inputs get exponential, countingSort gets worse compared to
comparison algorithms.
Radix helps by sorting by number base for better counting allocation
Distribution sorting, non comparative
 */
export function radixSort(inputArray) {
  if (inputArray.length === 0) {
    return inputArray
  }

  // Max value tells us number of digits
  let inputValues = minAndMax(inputArray)
  let exponent = 1

  while (inputValues.max / exponent >= 1) {
    inputArray = countingSortByDigit(inputArray, exponent)
    exponent *= 10
  }

  return inputArray
}
