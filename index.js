const axios = require('axios');
const express = require('express');
const cors = require('cors');//Moved here from inside linus post name check
const { checkEmployee, validateTitleLength,printTitleIfLinus,printAllComments,findFirstPost, delay } = require('./utils')

const pi = 3.14; //we can use math.pi
const currentBoss = 'Luke'
//switched to camel case for yourName
const yourName = 'John';
const employees = [ 'James', 'Bobby', 'John' ];
const isMe = checkEmployee(yourName)
console.log('===== STARTING APPLICATION =====')

// Display the Bosses name
//Remove need for using this variable
const printBoss = (bossName) =>  console.log('Dont forget. ' + bossName + ' is the BOSS')
delay(500)
.then(() => {
    printBoss(currentBoss)
})
.then(() => {
    // Display a list of employees
    console.log('Current Employees:');
    //Switched to foreach and used template literal 
    //Switched to ternary instead of an if else
    employees.forEach((employee) => {
        isMe(employee) ? console.log(`${employee} - Hey.. Its you!`): console.log(employee); 
    })
})
.then(() => {
    // Get posts from API, see if any of the posts talk about Linus
    //Moved axios call to then since it return a promise
    console.log('getting data from API');
    return axios.get('https://jsonplaceholder.typicode.com/posts')
})
.then((response) => {
    //Avoid reassigning parameters -- bad practice
    const { data } = response;
    //Changed check for equality of 0 to inequality
    if (data.length !== 0) {
        // Change tradition for loop to forEach
        data.forEach(({ title }) => {
            validateTitleLength(title) ? printTitleIfLinus(title): console.log('Post name is too long');
        })
    return data 
    } else {
        console.log('There are no posts');
        throw 'There are no posts'
    }
})
//Refactord the comment call into another then
.then((data) => {
    // Lets load the first post and get its comments. Why? I dont know.
    //Moved the if condition to within the response length check because empty response would have caused this to go boom  
    // Also changed the equality check to strict  
    const foundPost = data.find(findFirstPost)
    if(!foundPost){
        throw 'Couldnt find post id 1'
    }
    return foundPost
})
.then(() => {
    console.log('Post 1, lets get the comments');
    return axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
})
.then((response) => {
    printAllComments(response.data);
})
.then(() => {
    console.log('All ajax calls are finished');
})
.catch((e) => {
    console.log('Some error occured',e)
})
.then(() => delay(3000))
.then(() => {
 console.log('===== ENDING APPLICATION =====')
})






