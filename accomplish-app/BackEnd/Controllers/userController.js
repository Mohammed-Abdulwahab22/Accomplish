const User = require("../Models/Users");
const emailValidator = require("email-validator"); 



const isEmailRegistered = async (email) => {
    try {
        const user = await User.findOne({ email });
        return !!user; 
    } catch (error) {
        throw error;
    }
}


const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        if (!emailValidator.validate(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        
        const emailExists = await isEmailRegistered(email);
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

    
        const user = await User.create({ name, email, password });

        
        // await sendVerificationEmail(email);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const logingUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { createUser, logingUser , isEmailRegistered };
