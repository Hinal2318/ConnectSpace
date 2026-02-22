import express from "express"
import authmiddleware from "../middleware/auth.js";
import Details from "../models/Details.js";

const router=express.Router()

//to post
router.post("/add",authmiddleware,async(req,res)=>{
    const { name, email, description } = req.body;
    try {
    const newDetail = new Details({
      name,
      email,
      description,
      user: req.user.id 
    });
    await newDetail.save();
    res.status(201).json(newDetail);
  } catch (error) {
    res.status(500).json({ message: "Error adding detail" });
  }
})
//to get all post
router.get("/all", async (req, res) => {
  try {
    const allDetails = await Details.find()
    .populate("user", "name")
    .populate("comments.user", "name")
    .sort({ createdAt: -1 });
    res.json(allDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
//to comment
router.post("/comment/:id",authmiddleware,async(req,res)=>{
const {text}=req.body;
try{
const detail=await Details.findById(req.params.id);

detail.comments.push({
    user:req.user.id || req.user._id,
    text,
});
await detail.save();
res.json({message:"Comment added"});
}
catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
})
//to delete
router.delete("/delete/:id", authmiddleware, async (req, res) => {
  try {
    const detail = await Details.findById(req.params.id);
    
    if (!detail) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (detail.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this post" });
    }

    await Details.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during deletion" });
  }
});

export default router;