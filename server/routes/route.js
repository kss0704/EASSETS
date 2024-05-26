import express from "express";


import { addAsset, getAssets, getAsset, editAsset,deleteAsset,signupUser, loginUser } from "../controller/user-controller.js";

const router = express.Router();

router.post('/add',addAsset);
router.get('/', getAssets);
router.get('/:id', getAsset);
router.put('/:id',editAsset);
router.delete("/:id",deleteAsset);


router.post('/signup',signupUser);
router.post('/login',loginUser);

export default router;