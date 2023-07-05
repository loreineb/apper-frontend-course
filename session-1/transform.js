//Write a function named transform that accepts an array of integers, and returns an array in which all the elements are squared and sorted in ascending order. Name this file transform.js.

function transform(nums) {
    const container = []
    for(let i = 0; i < nums.length; i++) { //#1
        container.push(Math.pow(nums[i],2)) //#2
    }
    container.sort((a,b) => a-b) //#3
    return container // #4, #5
}

const nums = [4,9,5,3,8]
const sortedSquaredNums = transform(nums)
console.log(sortedSquaredNums) // [9,16,25,64,81]

/* 
Notes to self
#1 for loop needs three things: 
    -> initial expression (let i=0)
    -> condition (i < nums.length)
        -> loop continues as long as the condition is met
        -> don't forget na it's i < nums.length here kasi index starts at 0
    -> increment expression (i++)
        -> para tumigil yung for loop
#2 Even if I was doing Math.pow, the value of nums didn't change
    -> Reason: it's just doing the math, pero it's not updating the value, which is why pinush siya sa container
    -> Math.pow(number, power to be raised to)
        -> Math.pow(2,3) is 2^3
#3 nums is getting sorted using the compare function
    -> from w3schools, if a-b is:
        -> (-), a is sorted before b.
        -> (+), b is sorted before a.
        -> 0, no changes are done.
    -> re: sort inside for loop or outside
        -> If you put it inside, it will sort incrementally vs
        -> If outside, it will sort lahatan na
    -> re: arrow operator, if I understood correctly, it shows that (a,b) is the one being used in a-b; no need for a return function
#4 I was getting undefined as an output
    -> Reason: I didn't have an explicit return statement for my function
#5 I was only getting one output
    -> Reason: I placed it in inside the for loop so first ikot palang nagrereturn na and tumitigil si loop
*/
