import crypto from "crypto";


export const createPayment = async(req,res)=>{


    try{


        const {
            amount,
            item_name
        } = req.body;



        const paymentData = {

            merchant_id:
            "10050479",

            merchant_key:
            "ki9lgbf2all4n",

            amount,

            item_name,


            return_url:
            "http://localhost:5173/payment-success",


            cancel_url:
            "http://localhost:5173/payment-cancel",


            notify_url:
            "http://localhost:4000/api/payfast/notify"

        };



        res.json({

            success:true,

            paymentData

        });



    }catch(error){


        res.json({

            success:false,

            message:error.message

        });


    }

}