import express from "express";
import {createAllowanceRequest, getAllowanceRequests,updateAllowanceRequestStatus,deleteAllowanceRequest,} from "../Controllers/AllowanceRequest.js";

const router = express.Router();

router.post("/", createAllowanceRequest);        
router.get("/", getAllowanceRequests);           
router.put("/:id", updateAllowanceRequestStatus);
router.delete("/:id", deleteAllowanceRequest);   

export default router;
