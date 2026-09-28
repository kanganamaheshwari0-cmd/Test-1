const transactionModel = require("../models/transactionModel")

const transactionCreateController = async (req, res) => {
    try{
        const {title,Amount,type,category,expense,date} = req.body
        if(!title || !Amount || !type || !category || !expense || !date){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }

        const newTransaction = new transactionModel({
            title,
            Amount,
            type,
            category,
            expense,
            date
        })
        await newTransaction.save()
        res.status(200).send({
            success:true,
            message:'new transaction created',
            newTransaction
        })

    } catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in create API",
            error
        })
    }
}

module.exports = {transactionCreateController}