// We know Fibonacci starts with 0 and 1.
const IN_FIBONACCI = [0, 1];

let last = 1;
let secondLast = 0;

const NUMBERS = [
    12, 5, 1974,
    11, 17, 2012,
    11, 19, 2010,
    8, 29, 1991, // Your bdate :)
    -5,
    610,
    13,
    0,
];


function expandCache(number) {
    while (last < number) {
        // {last, secondLast} = {last: last + secondLast, secondLast: last}
        const newLast = last + secondLast;
        secondLast = last;
        last = newLast;
        IN_FIBONACCI.push(last);
    }
}


function isInFibonacci(number) {
    // We know Fibonacci sequence only include positive numbers.
    if (number < 0) {
        return false;
    }

    if (last < number) {
        // generate to the one equal or just above the number.
        expandCache(number);
    }

    // Now, is it in there? We could have done this check before getting the
    // last, and only do that if it's required. May be more optimized in the
    // case that the requested number is known to already be in the cache.
    // Otherwise, it adds a check that will probably be false most of the time,
    // this is why I rather just put it at the end.
    return IN_FIBONACCI.indexOf(number) !== -1;
}


function findClosest(number) {
    let index;

    for (index = 1; ; index++) {
        if (IN_FIBONACCI[index + 1] > number) {
            return IN_FIBONACCI[index];
        }
    }
}


function sumOfFibonacci(number) {
    // We know Fibonacci sequence only include positive numbers.
    if (number < 0) {
        return ["IMPOSSIBLE"];
    }

    // If it's already cached, then that's it.
    if (isInFibonacci(number)) {
        return [number];
    }

    const closest = findClosest(number);

    return [closest].concat(sumOfFibonacci(number - closest));
}


NUMBERS.forEach((number) => {
    console.log("IN?:", number, isInFibonacci(number));
});

NUMBERS.forEach((number) => {
    console.log("SUM:", number, "=>", sumOfFibonacci(number).join(' + '));
});

console.log("IN_FIBONACCI=", IN_FIBONACCI);
