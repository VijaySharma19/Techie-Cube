
const firstName = [
    'Kaira', 
    'Fern' ,
    'Rita' ,
    'Roxanne' ,
    'Witcher' ,
    'Alannah',
    'Lee' ,
    'Tanya' ,
    'Melanie' ,
    'Mollie' ,
]
const lastName=[
    'Mollie',
    'Sutton',
    'Barlow',
    'Barlow',
    'Craig',
    'Henderson',
    'Ape',
    'Coleman',
    'Griffin',
    'Boop',
]
function getRandomUsers(){
    const username = firstName[Math.floor(Math.random()*9)] +'-' +lastName[Math.floor(Math.random()*9)];
    return username;
}

exports = module.exports ={
    getRandomUsers
}