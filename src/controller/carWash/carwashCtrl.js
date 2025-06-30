const carWash = require("../../models/carWash/carwashModel")

// generatecarwashbillCtrl
const generatecarwashbillCtrl = async (req, res) => {
    try {
        const { carName, bill, commission, carWasher,  phoneNumber } = req.body;

        const newBill = new carWash({  
            carName,
            bill,
            commission,
            carWasher, 
            phoneNumber
        });

        await newBill.save();

        res.status(200).json({ message: "Car wash bill generated successfully", bill: newBill });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



// get all product 
const getallbills = async (req , res) => {
    try {
        const getallcarWashbill = await carWash.find()
        res.status(200).json(getallcarWashbill);
    } catch (error) {
        res.status(500).json({ message: "Failed to get products", error: error.message });
    }
}



// updateProduct
const updateCarWashbill = async (req, res) => {
   
    try {
        const updatedbill = await carWash.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedbill) {
            return res.status(404).json({ message: "bill are not found" });
        }
        res.status(200).json({ message: "Car wash bill updated successfully", updatedbill });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};


// deleteProduct
const deleteCarWashbill = async (req, res) => {
    try {
        const deletedbill = await carWash.findByIdAndDelete(req.params.id);
        if (!deletedbill) {
            return res.status(404).json({ message: "Car wash bill not found" });
        }
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};


module.exports = {
    generatecarwashbillCtrl,
    getallbills,
    updateCarWashbill,
    deleteCarWashbill

};
