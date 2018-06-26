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





// Get posts from API, see if any of the posts talk about Linus

console.log('getting data from API');

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    response = response.data;
    //Changed check for equality of 0 to inequality
    if (response.length !== 0) {
        for (let i = 0; i < response.length; i++) {
            //Destructured the title since we need to check the post name for linus
            const { title } = response[i]
            if (title.length < 50) {
                if (title.includes('Linus'))  {
                    console.log('Post name contains word Linus');
                }
            } else {
                console.log('Post name is too long');
            }
        }
    //Moved the if condition to within the response length check because empty response would have caused this to go boom    
    if (response[0].id == 1) {
            console.log('Post 1, lets get the comments');
            //Remove the nested ajax call since we can get the comments straight away
          axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((response2) => {
            printAllComments(response2.data);
            console.log('All ajax calls are finished');
        })

        };    
    } else {
        console.log('There are no posts');
    }

    // Lets load the first post and get its comments. Why? I dont know.
});

setTimeout(() => {
  console.log('===== ENDING APPLICATION =====')
}, 3000);

function printAllComments(comments) {
  console.log('----------');
  console.log('Comments:');

  comments.forEach((com) => {
    console.log('User ' + com.email + ' wrote:');
  console.log(com.body);
  //Removed empty console statement
});
}


