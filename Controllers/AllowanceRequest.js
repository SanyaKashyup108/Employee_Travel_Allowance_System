import AllowanceRequest from "../Models/AllowanceRequesModels.js";
import User from '../Models/UserModels.js'
import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, 
    },
})




//createRequest
export const createAllowanceRequest = async (req, res) => {
    try {
        const { user, amount, description, date, status } = req.body;

        const users = await User.findById(user);
        if (!user)
            return res.status(404).json({
                message: "User not found"
            });

        const request = new AllowanceRequest({ user: user, amount, description, date, status });
        await request.save();

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "ashishjha97099@gmail.com",
            subject: `New Allowance Request from ${users.name}`,
            text: `Details:\nAmount: ${amount}\nDescription: ${description}\nDate: ${request.date}`,
        });

        res.status(201).json({
            message: "Allowance request created and email sent",
            request,
        });

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Invalid data" })
    }
}


//get
export const getAllowanceRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find()
      .populate("user"); 

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};
 
//Update

export const updateAllowanceRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await AllowanceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!request)
         return res.status(404).json({ message: "Request not found" });

    res.status(200).json({
      message: "Request status updated successfully",
      request,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating request" });
  }
};


//delete

export const deleteAllowanceRequest = async (req, res) => {
  try {
    const request = await AllowanceRequest.findByIdAndDelete(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting request" });
  }
};

