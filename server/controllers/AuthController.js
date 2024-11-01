import UserService from "../services/AuthService.js";
let maxAge = 30 * 24 * 60 * 60 * 1000;


const userService = new UserService();

export const signup = async (req, res) => {
    
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            color : req.body.color,
            defaultProfile : req.body.defaultProfile,
            image : req.body.image
        });
        res.cookie("jwtToken", response.jwt, {
            secure: true,
            sameSite: "None",
            maxAge: maxAge,
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response.user,
            err: {}
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}


export const login = async (req, res) => {
    try {
        const data = await userService.signin(req.body);
        res.cookie("jwtToken", data.jwt, {
            secure: true,
            sameSite: "None",
            maxAge: maxAge,
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully logged in',
            data: data.user,
            err: {}
        })
        
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}


export const userInfo = async (req, res) => {
    
    try {
        const response = await userService.userinfo(req.userId);
        return res.status(201).json({
            success: true,
            message: 'Successfully find a  user',
            data: response,
            err: {}
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const response = await userService.updateprofile(req.userId,{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            color : req.body.color,
            defaultProfile : true,
            image : req.body.image || null
        });
        
        return res.status(201).json({
            success: true,
            message: 'Successfully update the profile',
            data: response,
            err: {}
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}

export const logout = async (req, res) => {
    
    try {
      res.cookie("jwtToken", "", {
        maxAge: 0,
        secure: true,
        sameSite: "None",
        httpOnly: true,
      });
      return res.status(200).send("Your account deleted Successfully");
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  };


