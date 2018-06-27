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


// Display the Bosses name
//Remove need for using this variable
const printBoss = (bossName) =>  console.log('Dont forget. ' + bossName + ' is the BOSS')
async function main () {
    try{
        console.log('===== STARTING APPLICATION =====')
        const delayed = await delay(500)
        printBoss(currentBoss)
        console.log('Current Employees:');
        employees.forEach((employee) => {
            isMe(employee) ? console.log(`${employee} - Hey.. Its you!`): console.log(employee); 
        })
        console.log('getting data from API');
        const {data: allPosts} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        if(!allPosts || allPosts.length === 0) {
            console.log('There are no posts');
            throw 'There are no posts'
        } 
        allPosts.forEach(({ title }) => {
            validateTitleLength(title) ? printTitleIfLinus(title): console.log('Post name is too long');
        })
        const foundPost = allPosts.find(findFirstPost)
        if(!foundPost){
            throw 'Could not find first post'
        }
        const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
        printAllComments(commentsResponse.data);
        console.log('All ajax calls are finished');
        const finalDelay = await  delay(3000)
        console.log('===== ENDING APPLICATION =====')
    }catch(e){
        console.log('Some error occured',e)
    }    
}
main()