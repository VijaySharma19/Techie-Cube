const Sequelize = require('sequelize')

let db;
if(process.env.DATABASE_URL){
    db=new Sequelize("postgres://kbhisvzfubuycn:ddea6ae023c0a38a7615484d71fb2b3ac38b94d3908e8f43a970f2bf49b60385@ec2-54-91-178-234.compute-1.amazonaws.com:5432/d52nmqcd42daq5")
}
else{
    db = new Sequelize({
        dialect : 'mysql',
        username : 'cbsocialuser',
        password : 'cbsocialpass',
        database : 'cbsocialmediadb'
    })
}

const COL_ID_DEF = {
    type : Sequelize.DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
}



const Users = db.define('user',{
    id :COL_ID_DEF,
    username : {
        type : Sequelize.DataTypes.STRING(30),
        unique : true,
        allowNull: false
    },
    email : {
        type : Sequelize.DataTypes.STRING(40),
    },
    contact : {
        type : Sequelize.DataTypes.STRING(10)
    },
    password : {
        type : Sequelize.DataTypes.STRING
    }
})

const Posts = db.define('post',{
    id : COL_ID_DEF,
    title : {
        type : Sequelize.DataTypes.STRING(120),
        allowNull: false
    },
    body :{
        type :Sequelize.DataTypes.TEXT,
        allowNull: false
    }
})

const Comments = db.define('comment',{
    id : COL_ID_DEF,
    title : {
        type : Sequelize.DataTypes.STRING(120),
        allowNull: false
    },
    body :{
        type :Sequelize.DataTypes.TEXT('tiny'),
        allowNull: false
    }

})

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)



exports = module.exports={
    db,
    Users,
    Posts,
    Comments
}

