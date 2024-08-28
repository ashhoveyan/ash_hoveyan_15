import db from '../models/userModel.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

export default {
    registration: async  (req, res, next)=> {
        try {
            if (req.body.isAdmin === 'true' || req.body.isAdmin === true) {
                req.body.isAdmin = true;
            } else {
                req.body.isAdmin = false;
            }

            const {name, email, password,isAdmin} = req.body;
            const existingUser = await db.findUserByEmail(email);
            if (existingUser) {
                res.status(409).json({message: 'Email already exists'})
                return
            }
            const userType = isAdmin ? 'admin' : 'user';
            const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);
            const userData = {
                name,
                email,
                password: hashedPassword,
                userType
            }

            await db.createUser(userData)
            delete userData.password
            return res.status(201).json({ message: 'User created successfully' });

        } catch (err) {
            console.error('Registration error:', err);
            return res.status(500).json({ message: err.message });
        }
    },
    login:async (req, res)=>{
        try {
            const { email, password } = req.body

            const user = await db.findUserByEmail(email)

            const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);


            if (!user || hashedPassword !== user.password) {
                return res.status(401).json({ message: 'Invalid email or password' })
            }

            const payload = {
                id: user.id,
                email: user.email,
            }
            const token = jwt.sign(payload,
                process.env.SECRET_FOR_JWT,
                {expiresIn:'1h'})

            return res.status(200).json({ message: 'Login successful', token })

        } catch (error) {
            console.error('Error executing query:', error)
            return res.status(500).json({ message: 'Internal server error', error: error.message })
        }
    },
    getUsersList:async (req, res) =>{
        try {
            const users = await db.getUsersList();

            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }

            return res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: error.message });
        }
    },
    logout:async (req, res) =>{
        res.jwtid.destroy(token)
        res.redirect('/');
    },
    getUserProfile:async (req, res) =>{
        try {
            const { email } = req.user;

            if (!email) {
                return res.status(400).json({ message: 'Email not found in token' });
            }

            const user = await db.login(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateUserProfile:async (req, res) =>{
        try {
            const { id } = req.user;
            const {name, email, password } = req.body;

            if (email !== req.user.email) {
                return res.status(400).json({ message: 'Email cannot be updated' });
            }
            const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);


            const userData = {
                id,
                name,
                email,
                password:hashedPassword,
            };

            const result = await db.updateUser(userData);
            if (result.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'Profile updated successfully', data: updatedData });
        } catch (error) {
            console.error('Error updating user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteUser:async (req, res) =>{
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const result = await db.deleteUser(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}