import errorMiddlewear from "../middleware/errorMiddleware.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"


export const registerController = async (request, response,next) => {
    
    console.log("above try");
    try {
        console.log("in try");

        console.log(request.body.name);
        console.log(request.body.email);
        console.log(request.body.password);
        
        const { name, email, password } = request.body
        console.log("in try 1");
        
        //validate
        if (!name) {
          next('name is required')
        }
        if (!email) {
            next('email is required')
        }
        if (!password) {
            next('password is required')
        }



        //check in the stored data
        const existingUser = await userModel.findOne({email})

        if (existingUser) {
            return response.status(200).send({ // 200: request is done properly
                success: true,  // true b/c API work fine
                message: "Existing email"
            })
        }


        
        //store the data
        const newUser = {
            name:name,
            email:email,
            password:bcrypt.hashSync(password)
        }



        const user = userModel.create(newUser)

        response.status(200).send({
            success: true,
            message: "Successfully registered",
            user
        })

    }
     
    catch (error) {
        next('error in register controller..')
    }
}


export const loginController = async (req, res,next) => {
    try { 
        const { email, password } = req.body

        if (!email || !password) {
        //   next("provide email and password..")
        }

        const user = await userModel.findOne({ email })
        console.log(user)

        if (!user) {
            next("invalid email and password ")
        }


        const isPassword=bcrypt.compareSync(password,user.password)

        if(!isPassword){
            console.log("in false pass check..")
           //next("incorrect password...")
            res.status(400).json({
                success:false,
                message:"incorrect password",
            })
        }

        res.status(200).json({
            success:true,
            message:'login successfull',
            user
        })

    }
    catch (err) {
        // res.status(400).send({
        //     message: "Error in loginController",
        //     success: false,
        //     error
        // })
        console.log("error in logincontroller")

    }   

}