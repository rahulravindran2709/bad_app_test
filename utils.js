//Made isMe as arrow function and removed need for if else since triple equals returns a boolean
// Made isMe as pure by removing dependancy on global
const checkEmployee =(currentUser) => (employeeName)=> (currentUser === employeeName)

const checkStringLength = (size) =>  (title) => title && title.length < size
const validateTitleLength = checkStringLength(50)
//Restructured the name validation to make it more composable
const doSomethingIfNameFound = (nameToFind) => (doSomething) => (title) => {
    (~title.indexOf(nameToFind)) ? doSomething(title)
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
const delay = (delayAmount) => new Promise((resolve, reject) => setTimeout(() => resolve(),delayAmount))
module.exports = {
    validateTitleLength, checkEmployee, printTitleIfLinus,findFirstPost,printAllComments,delay
}  