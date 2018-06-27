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
async function main () {
    try{
        const delayed = await delay(500)
        printBoss(currentBoss)
        console.log('Current Employees:');
        employees.forEach((employee) => {
            isMe(employee) ? console.log(`${employee} - Hey.. Its you!`): console.log(employee); 
        })
        console.log('getting data from API');
        const allPosts = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const { data } = allPosts;
        if (data.length !== 0) {
        // Change tradition for loop to forEach
        data.forEach(({ title }) => {
            validateTitleLength(title) ? printTitleIfLinus(title): console.log('Post name is too long');
        })
        const foundPost = data.find(findFirstPost)
        if(foundPost){
            const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
            printAllComments(commentsResponse.data);
        }else{
            throw 'Could not find first post'
        }
        } else {
            console.log('There are no posts');
            throw 'There are no posts'
        }
        console.log('All ajax calls are finished');
        const finalDelay = await  delay(3000)
        console.log('===== ENDING APPLICATION =====')
    }catch(e){
        console.log('Some error occured',e)
    }    
}
main()