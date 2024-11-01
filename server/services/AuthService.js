import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/AuthRepository.js';
let maxAge = 30 * 24 * 60 * 60 * 1000;
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(data){
        console.log(data)
        
        try {
            const user = await this.userRepository.create(data);
            const response = await this.getUserByEmail(data.email);
            const jwt =  this.createToken({email:response.email,id:response.id});
            return {user,jwt};
        } catch (error) {
            throw error;
        }
    }

    async signin(data){
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw {
                    message: 'no user found'
                };
            }
            const passwordMatch = await this.checkPassword(data.password,user.password);
            if(!passwordMatch){
                console.log('Password does not match');
                throw {error:'Incorrect password'};
            }
            const jwt =  this.createToken({email:data.email,id:user.id})
            return {jwt,user};
        } catch(error) {
            throw error;
        }
    }

    async updateprofile(id,data){
        try {
            const user = await this.userRepository.update(id,data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email){
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    createToken (user){
        try {
            var token = jwt.sign(user,process.env.JWT_TOKEN, { expiresIn: maxAge });
            return token
        } catch (error) {
            console.log("Something went wrong in the token creation");
            throw error;
        }
    }

    
    checkPassword(userInputPlainPassword ,encryptedPassword){
        try {
            return bcrypt.compare(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the password comparison");
            throw error;
        }
    }

    async userinfo(id){
        try {
            const user = await this.userRepository.getById(id);
            return user;
        } catch (error) {
            console.log("Something went wrong in the Service layer");
            throw error;
        }
    }

}

export default UserService;