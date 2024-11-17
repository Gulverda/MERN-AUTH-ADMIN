import user from '../models/user.js';
import bcrypt from 'bcrypt';

async function createAdminAccount(){
    try{
        const admin = await user.findOne({role: "admin"});
        if(admin){
            console.log("Admin account already exists");
            return;
        }
        const hashedPassword = await bcrypt.hash("admin", 10);
        const newAdmin = new user({
            name: "admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });
        await newAdmin.save();
        console.log("Admin account created");
    }catch(err){
        console.log(err);
    }  
}

export default createAdminAccount;