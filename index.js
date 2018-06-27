//*Point-1*
const axios = require('axios');
const express = require('express');
//*Point-13*, *Point-13.1*
const cors = require('cors');
const { checkEmployee, validateTitleLength,printTitleIfLinus,printAllComments,findFirstPost, delay } = require('./utils')

const pi = 3.14; //we can use Math.PI ?
//*Point-2*
const currentBoss = 'Luke'
//*Point-3*,*Point-3.1*
const yourName = 'John';
const employees = [ 'James', 'Bobby', 'John' ];
// *Point-19*, *Point 19.1*,*Point 19.2*,*Point-19.3*
const isMe = checkEmployee(yourName)
//*Point-6*
const printBoss = (bossName) =>  console.log(`Dont forget. ${bossName}  is the BOSS`)
async function main () {
    try{
        console.log('===== STARTING APPLICATION =====')
        const delayed = await delay(500)
        printBoss(currentBoss)
        console.log('Current Employees:');
        //*Point-7*
        employees.forEach((employee) => {
            //*Point-7.1*, *Point-7.2*
            isMe(employee) ? console.log(`${employee} - Hey.. Its you!`): console.log(employee); 
        })
        console.log('getting data from API');
        //*Point-8*, *Point-9*, *Point-9.1*
        const {data: allPosts} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        if(!allPosts || allPosts.length === 0) {
            console.log('There are no posts');
            throw 'There are no posts'
        } 
        allPosts.forEach(({ title }) => {
            //*Point-11*,*Point-12*,*Point-12.1*
            validateTitleLength(title) ? printTitleIfLinus(title): console.log('Post name is too long');
        })
        //*Point 14*, *Point-14.1*
        const foundPost = allPosts.find(findFirstPost)
        //*Point-14.2*
        if(!foundPost){
            throw 'Could not find first post'
        }
        //*Point-15*, *Point-15.1*
        const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
        //*Point-18*,*Point-18.1*,*Point-18.2*,*Point-18.3*
        printAllComments(commentsResponse.data);
        //*Point-16*
        console.log('All ajax calls are finished');
        //*Point-17*
        const finalDelay = await  delay(3000)
        console.log('===== ENDING APPLICATION =====')
    }catch(e){
        console.log('Some error occured',e)
    }    
}
main()