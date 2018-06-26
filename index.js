var axios = require('axios');
var express = require('express');
const cors = require('cors');//Moved here from inside linus post name check

pi = 3.14;
this.boss = 'Luke';

var YourName = 'John';
var employees = [ 'James', 'Bobby', 'John' ];

console.log('===== STARTING APPLICATION =====')

// Display the Bosses name

setTimeout(() => {
    console.log('Dont forget. ' + this.boss + ' is the BOSS');
}, 500);

// Display a list of employees

console.log('Current Employees:');
for (var i = 0; i < employees.length; i += 1) {
    if(isMe(employees[i])) {
      console.log(employees[i] + ' - Hey.. Its you!');
    }
    else {
      console.log(employees[i]);
    }
}

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

function isMe(employee_name) {
    if (YourName === employee_name) {
        return true;
    } else {
        return false;
    }
}
