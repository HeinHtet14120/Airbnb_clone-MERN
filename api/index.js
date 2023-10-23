const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require ('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place');
const Booking = require('./models/Booking');

require('dotenv').config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ieihfiheifeijijejjojdkjdskjlsjfljj';

//jZxJhEg4hKk032CN

app.use(express.json());
app.use(cookieParser());
app.use('/upload',express.static(__dirname+ '/upload'))

app.use(cors({
    credentials: true,
    origin : 'http://localhost:5173' //from React 
}))

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq (req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token,jwtSecret,{}, async (err,userData) => {
            if(err) throw err;

            resolve(userData)
        })
    })
}

app.get('/test', (req,res) => {
    res.json('Test ok')
})

app.post('/register' , async (req,res) => {
    const {name,email,password} = req.body;

    try{
        const user = new User({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
    
        await user.save();
    
        res.json(user)

    }catch(e){
        res.status(422).json(e);
    }
    
});

app.post('/login', async (req,res) => {
    const { email, password} = req.body;

    const user = await User.findOne({email})
    if(user){
        const passOK = bcrypt.compareSync(password, user.password);
        if(passOK){
            jwt.sign({email:user.email, id:user._id}, jwtSecret,{},(err,token) => {
                if(err) throw err;
                res.cookie('token',token).json(user);
            })
            
        }else{
            res.status(422).json('pass not ok')
        }
    }else{
        res.json('User Not Found')
    }
})

app.get('/profile' , (req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{}, async (err,userData) => {
            if(err) throw err;

            const {name,email,_id} = await User.findById(userData.id);

            res.json({name,email,_id})
        })
    }else{
        res.json(null)
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true)
});

app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;

    const newName = Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '/upload/' + newName
    })

    res.json(newName)
})

const photoMiddleware = multer({dest: 'upload/'})
app.post('/upload', photoMiddleware.array('photos',100) ,(req,res) => {
    const uploadFiles = []
    for(let i = 0; i < req.files.length; i ++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' +ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('upload/',''))
    }
    res.json(uploadFiles)
})

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
            title,address,addPhotos,
            description,perks,extraInfos,
            checkIn,checkOut,maxGuests,price
    } = req.body;
    jwt.verify(token,jwtSecret,{}, async (err,userData) => {
        if(err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title,address,photos:addPhotos,
            description,perks,extraInfos,
            checkIn,checkOut,maxGuests,price
        })
        res.json(placeDoc)
    })
})

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userData) => {
        const{id} =userData;
        res.json(await Place.find({owner:id}));
    })
})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    res.json( await Place.findById(id))
})

app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {
        id,title,address,addPhotos,
        description,perks,extraInfos,
        checkIn,checkOut,maxGuests,price
    } = req.body;

    console.log(addPhotos);

    jwt.verify(token,jwtSecret,{}, async (err,userData) => {
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString() ){
            placeDoc.title = title;
            placeDoc.address = address;
            placeDoc.description = description;
            placeDoc.perks = perks;
            placeDoc.extraInfos = extraInfos;
            placeDoc.checkIn = checkIn;
            placeDoc.checkOut = checkOut;
            placeDoc.maxGuests = maxGuests;
            placeDoc.photos = addPhotos;
            placeDoc.price = price;
            await placeDoc.save();
            res.json('ok')
        }
    })

})

app.get('/places', async (req,res) => {
    res.json( await Place.find());
})

app.post('/bookings', async (req, res) => {

    const userData = await getUserDataFromReq(req);

    const { id,name,phone,checkIn,checkOut,guestNumber,price} = req.body;

    console.log({ id,name,phone,checkIn,checkOut,guestNumber,price})

    const newplace = await Place.findById(id)
    
    try{
        const booking = new Booking({
            place : newplace._id,
            name,phone,checkIn,checkOut,guestNumber,price,user :userData.id

        });

        
        await booking.save();
        res.json(booking)
        console.log(booking)

    }catch(err){
        console.log(err);
    }
})

app.get('/bookings', async (req,res) => {

    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userData) => {
        const{id} =userData;
        res.json( await Booking.find({user: id}).populate('place'));
        
    })


})

app.get('/bookings/:id', async (req,res) => {
    const {id} = req.params;
    res.json( await Booking.findById(id))
})
app.listen(4000)