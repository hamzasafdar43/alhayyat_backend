const detailingBill = require("../../models/carDetailing/carDetailingModel")


// get all product 
const getallDetailingStudioBills = async (req , res) => {
    try {
        const detailingBills = await detailingBill.find()
        res.status(200).json(detailingBills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get products", error: error.message });
    }
}


module.exports ={
    getallDetailingStudioBills
}