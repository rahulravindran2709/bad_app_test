//RAHUL Changed variable types for requires to const *Point-1*
var axios = require('axios');
var express = require('express');

pi = 3.14;
//RAHUL Removed this reference and made it a normal local variable *Point-2*
this.boss = 'Luke';
//RAHUL Changed variable types to const *Point-3*
//RAHUL Changed variable name to camel case *Point-3.1*
var YourName = 'John';
var employees = [ 'James', 'Bobby', 'John' ];
//Moved all code below to an async main function till the 'ENDING APPLICATION' to denote entry point *Point-4*
console.log('===== STARTING APPLICATION =====')

// Display the Bosses name
//RAHUL made this into a reusable function in utils called 'delay' so that it returns a promise wrapping a setTimeout for specified delay *Point-5*
//RAHUL refactored the callback into a higher order so that it can take in what needs to be printed instead of relying on this references *Point-6*
setTimeout(() => {
    console.log('Dont forget. ' + this.boss + ' is the BOSS');
}, 500);

// Display a list of employees

console.log('Current Employees:');
//RAHUL Switched to forEach instead of og for loop to avoid using the index variable *Point-7*
for (var i = 0; i < employees.length; i += 1) {
    if(isMe(employees[i])) {
        //RAHUL Switched to template literals to print name; trivial enhancement but keeping up with the times *Point-7.1*
        //RAHUL switched to a ternary operator to shorten code *Point-7.2*
      console.log(employees[i] + ' - Hey.. Its you!');
    }
    else {
      console.log(employees[i]);
    }
}

// Get posts from API, see if any of the posts talk about Linus

console.log('getting data from API');
//RAHUL Rewrote this promise using async await so that it is easier to read and reduces the need to write callbacks *Point-8*
axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    //RAHUL removed this reassignment , we shouldnt be reassigning parameter values Point 9
    //RAHUL, all used aliased destructure to give a suitable variable name called allPosts instead of a generic 'data' *Point-9.1*
    response = response.data;
    //RAHUL , inverted the if else condition so that it stops execution if there are no posts to iterate over, no posts mean there wont be any comments either *Point-10*
    if (response.length == 0) {
        for (let i = 0; i < response.length; i++) {
            //RAHUL separated the length check for posts and the 'Linus' check into its own testable functions and moved them to utils *Point-11*
            //RAHUL bug: checking the title property of the post object for length and linus instead of the post object *Point-12*
            //RAHUL bug: inverted the condition, wasnt going to print correctly if the post title did contain linus *Point-12.1*
            if (response[i].length < 50) {
                if (response[i].includes('Linus')) {
                    //RAHUL bug: fixed typo of require *Point-13*
                    //RAHUL moved this require to top as per usual standards *Point-13.1*
                    const cors = required('cors');
                    console.log('Post is valid');
                } else {
                    console.log('Post name contains word Linus');
                }
            } else {
                console.log('Post name is too long');
            }
        }
    } else {
        console.log('There are no posts');
    }

    // Lets load the first post and get its comments. Why? I dont know.
    //RAHUL bug: we should be checking all posts for id to be equal to 1, not just the first one , the response may always not be sorted in order *Point-14
    //RAHUL generalising the act of checking the id to a util function 'findFirstPost' , somewhat overkill ;) Point-14.1
    //RAHUL minor enhancement, throw error if such a post is not found ; not entirely valid if there is something which needs to happen even if there were no posts with id '1' *Point-14.2*
    if (response[0].id == 1) {
        console.log('Post 1, lets get the comments');
        /*RAHUL Removed duplicate network calls, we can directly fetch the comments for the first post,
         even if such a post id didnt exists in server, response would be an empty array or an error 
         we should not be doing 2 netwrok calls just to validate if post id 1 exists
         *Point-15* */
        //RAHUL made the call into await expression for easier readability *Point-15.1* 
      axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response2) => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((response3) => {
        printAllComments(response3.data);
    });
    });
    //RAHUL bug: this is supposed to print only when the call for comments is completed *Point-16*
      console.log('All ajax calls are finished');
    };

});
//RAHUL made this into a reusable function in utils called 'delay' so that it returns a promise wrapping a setTimeout for specified delay *Point-5*
/*RAHUL made this part of an async function so that this delay is given only after the ajax calls have successfully completed, 
    if intent was to just print this once all calls were finished and the delay was arbitary,
    we wouldn't be needing that setTimeout and we can directly just write the console.log, since everything within my 'main' is awaited upon *Point-17* */ 
setTimeout(() => {
  console.log('===== ENDING APPLICATION =====')
}, 3000);

function printAllComments(comments) {
    //RAHUL moved into a utils function minor enhancement *Point-18*
    //RAHUL combined below 2 lines into a single console.log call through template literals *Point-18.1*
  console.log('----------');
  console.log('Comments:');

  comments.forEach((com) => {
      //RAHUL combined below 2 lines into a single console.log through templte literals *Point-18.2*
    console.log('User ' + com.email + ' wrote:');
    console.log(com.body);
  /*RAHUL removed empty console.log call, i presume it was intended to make a space/ new line between comments, 
      I have added a newline to the console.log through template literals *Point-18.3* */
  console.log();
});
}
//RAHUL refactored isMe into a higher order pure function so that it doesnt depend on global variable YourName *Point-19*
//RAHUL moved this to utils *Point-19.1*
//RAHUL Changed snake casing to camel casing for parameter name *Point-19.2*
//RAHUL directly return yourName=== employeeName because strict equal check returns boolean *Point-19.3*
function isMe(employee_name) {
    if (YourName === employee_name) {
        return true;
    } else {
        return false;
    }
}
