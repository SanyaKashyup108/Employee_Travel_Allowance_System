import user from "../Models/UserModels.js";

export const createUser = async (req, res) => {
try{
const{name,email,department} = req.body
 
if(!name || !email || !department) {
 return    res.status(404).json("fields are required")
}

const existingUser = await user.findOne({email});
if(existingUser){
    res.status(409).json("user already exist")
}

const newUser = await user.create({name, email,department});
res.status(202).json(newUser)


}
catch(err){
   res.status(500).json("error",err)
}
}