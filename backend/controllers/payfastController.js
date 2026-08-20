import crypto from "crypto";


export const createPayment = async(req,res)=>{


    try{


        const {
            amount,
            item_name
        } = req.body;



        const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    amount,
    item_name,

    return_url:
        `${process.env.FRONTEND_URL}/payment-success`,

    cancel_url:
        `${process.env.FRONTEND_URL}/payment-cancel`,

    notify_url:
        `${process.env.BACKEND_URL}/api/payfast/notify`
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