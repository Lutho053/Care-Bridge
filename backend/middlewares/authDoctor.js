import jwt from "jsonwebtoken";


const authDoctor = async(req,res,next)=>{


try{


const token = req.headers.authorization.split(" ")[1];


const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);


req.doctorId = decoded.id;


next();



}catch(error){


return res.json({
success:false,
message:"Not Authorized"
});


}


};


export default authDoctor;