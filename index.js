var axios = require('axios');
var express = require('express');
const cors = require('cors');//Moved here from inside linus post name check

pi = 3.14;
const currentBoss = 'Luke'
//switched to camel case for yourName
const yourName = 'John';
const employees = [ 'James', 'Bobby', 'John' ];
//Made isMe as arrow function and removed need for if else since triple equals returns a boolean
// Made isMe as pure by removing dependancy on global
const checkEmployee =(currentUser) => (employeeName)=> (currentUser === employeeName)
const isMe = checkEmployee(yourName)
const checkStringLength = (size) =>  (title) => title && title.length < size
const validateTitleLength = checkStringLength(50)
//Restructured the name validation to make it more composable
const doSomethingIfNameFound = (nameToFind) => (doSomething) => (title) => {
    (title.indexOf(nameToFind)!==-1) ? doSomething(title)
        : console.log(`Title doesnt contain the name ${nameToFind}` )
}
const doSomethingIfLinus = doSomethingIfNameFound('Linus')
const printTitleIfLinus = doSomethingIfLinus((title) => console.log('Valid post'))
const findPostById = (idToFind) => (post) => post.id === idToFind
const findFirstPost = findPostById(1)
const printAllComments = (comments) => {
    console.log(`----------\nComments:`);
    comments.forEach(({ email, body}) => console.log(`User ${email} wrote:\n${body}\n`));
  }
console.log('===== STARTING APPLICATION =====')

// Display the Bosses name
//Remove need for using this variable
const printBoss = (bossName) =>  console.log('Dont forget. ' + bossName + ' is the BOSS')
const p = new Promise((resolve,reject)=> {
    setTimeout(() => {
        printBoss(currentBoss)
        resolve()
    }, 500);
})
p.then(() => {
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
    console.log(data, 'What was obtained')
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
.catch(() => {
    console.log('Some error occured')
})
.then(() => {
    setTimeout(() => {
        console.log('===== ENDING APPLICATION =====')
      }, 3000);
})






