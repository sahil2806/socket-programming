import jwt from 'jsonwebtoken';
import UserRepository from '../repository/AuthRepository.js';
let userRepository = new UserRepository();

export const isAuthenticated = async (req, res, next) => {
     
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        // Verify the token
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        req.userId = user.id;
        next();

    } catch (error) {
        console.error("Something went wrong in the authentication process", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
