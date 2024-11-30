const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Brand=require('./models/Brand');

const app=express();
const port =3000;

mongoose.connect('mongodb://localhost:27017/branddb')
.then(()=>
    console.log('Connected to mongodb'))
.catch(err=>console.error('error connecting to mongodb',err))

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/',async(req,res)=>{
    try{
        const brands=await Brand.find();
        res.render('index',{brands});

    }catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
})

app.post('/add',async (req,res)=>{
    try{
        const newBrand=new brand({
            name:res.body.name,
            description:res.body.description
        })

    }catch(err){
        console.log(err);
        res.status(500).send('Error adding brand');
    }
})

app.get('/edit/:id',async(req,res)=>{
    try{
        const brand=await Brand.findById(req.params.id);
        if(!brand)return res.status(404).send('Brand not found');
        res.render('edit',{brand});

    }catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
})

app.post('/delete/:id',async(req,res)=>{
    try{
        await Brand.findByIdAndDelete(req.params.id);
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.status(500).send('error deleting brands');
    }
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})
