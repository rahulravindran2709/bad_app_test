# Read me!
* index.original.js is the file given by you
* index.js is the file I have created after refactoring
* utils.js is another file I have created after refactoring which has some of the reusable functions
* I have marked index.original.js with comments starting with //RAHUL which suggest I did a change for below logic.
    * If its *//RAHUL bug*, then I have fixed one of those bugs you have mentioned
    * If its simply //RAHUL then its a code quality improvement
* In both cases , I have ended the comment with a *Point-X*
* This can be used to go back to index.js (my changed file) and check the corresponding bug fix or improvement.
* Since I have heavily moved around and changed things, I felt including the original file and mapping the fix/change from there would be easier to understand and document.
* I have refactored to async await which requires node-js 7 plus
* This async await is the definitive edition :P
* In case not using async await, I have also included a promise version which can be seen by
     ``` git checkout v1.0 ``` 

# Prerequisities
 - node js 7.5+ (For async await)
# Install
``` git clone https://github.com/rahulravindran2709/bad_app_test.git```
``` cd bad_app_test && npm install && npm start```     