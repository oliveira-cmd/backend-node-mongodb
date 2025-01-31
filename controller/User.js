const User = require('../model/user/user');

async function saveUser(data){
    try {
        const user = new User(data);
        const verifyUserExist = await User.findOne({email: data.email});
        if(!verifyUserExist){
            user.save();
            return user;
        } else {
            let message = {
                'registered': "false",
                'message': "There is already a usere with this email registered"
            };

            return message;
        }
        
    } catch (error) {
        console.error(error);
    }
}

function findUserById(id){
    try{
        if(id.length == 24){
            const user = User.findById(id);
            if(!user){
                return '{message: "User not found"}';
            } else {
                return user;
            }
        } else {
            return '{message:"Invalid Id"}';
        }
    } catch(error){
        console.error(error);
    }
}

function findAllUsers(){
    try{
        const users = User.find();
        return users;
    } catch(error){
        console.error(error)
    }

}

function updateUserById(id, data){
    try{
        const verifyUserExist = User.findOne({email: data.email});
        if(!verifyUserExist){
            return '{message: "user not found"}'
        } else {
            const newUser = User.findByIdAndUpdate(id, data);
            return newUser;
        }
    } catch(error){
        console.error(error)
    }
}

function deleteUserById(id){
    try{
        const verifyUserExist = User.findOne({id: id});
        if(!verifyUserExist){
            return '{message: "user not found"}'
        } else {
            const newUser = User.findByIdAndDelete(id);
            return newUser;
        }
    } catch(error){
        console.error(error)
    }

}

module.exports = {saveUser, findUserById, findAllUsers, updateUserById, deleteUserById};