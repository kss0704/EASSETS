
import Asset from "../schema/asset-schema.js";
import User from "../schema/user-schema.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from "../schema/token.js";
import dotenv from 'dotenv'

dotenv.config();


export const addAsset = async (req,res)=>{
    const asset = req.body;

    const newAsset = new Asset(asset);

    try{
        await newAsset.save();
        res.status(201).json(newAsset);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

export const getAssets = async (req,res) =>{
    try{
        const assets = await Asset.find({});
        res.status(200).json(assets);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getAsset = async (req,res)=>{
    try{
        const assets = await Asset.findById(req.params.id);
        res.status(200).json(assets);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }

}

export const editAsset = async(req,res) => {
    let assets = req.body;
    const editAsset = new Asset(assets);

    try{
        await Asset.updateOne({_id:req.params.id},editAsset);
        res.status(201).json(editAsset)
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

export const deleteAsset = async(req,res)=>{
    try{
        await Asset.deleteOne({_id:req.params.id});
        res.status(201).json({message: "Asset deleted"});
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const signupUser =  async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {email:req.body.email, name:req.body.name, password:hashedPassword};
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: 'signup successfull'});
    }
    catch(error)
    {
        return res.status(500).json({msg: 'failure while calling signup api'});
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, email: user.email });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}