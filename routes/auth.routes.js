const {Router} = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router();

//register user
// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некорректный емэйл').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6}),    ],
    async (req, res)=>{
    try {
        console.log('Body:' , req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для регистрации'
            })
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({email})
        if (candidate){
            return res.status(400).json({message: "Такой пользователь уже существует"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: "пользователь создан"})
        
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так на сервере"})
    }
})

//login
// /api/auth/login
router.post(
    '/login', 
    [ 
        check('email', 'Введите корректный емэйл').normalizeEmail().isEmail(), 
        check('password', 'Введите корректный пароль').exists()
    ],
    async (req, res)=>{
        try {
            
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные для входа'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Неверный пароль"})
            }

            const token = jwt.sign(
                {userId: user.id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )
            res.json({token: token, userId: user.id})
           
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так на сервере"})
        }
})

module.exports = router