const express = require("express");
const router = express.Router();
const User = require("../models/schema");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authenticate");
const { encrypt, decrypt } = require("../models/EncDecManager");

router.post("/register", async (req, res) =>
{
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword)
    {
        return res.status(400).json({ error: "Invalid Credentials" })
    }
    else
    {
        if (password === cpassword)
        {

            try
            {
                const result = await User.findOne({ email: email });

                if (result)
                {
                    return res.status(400).json({ error: "Email already exists." })
                }

                const newUser = new User({ name, email, password, cpassword });

                // hashing the password
                await newUser.save();

                return res.status(201).json({ message: "User created succressfully." })
            }
            catch (error)
            {
                console.log(error)
            }
        }
        else
        {
            return res.status(400).json({ error: "Invalid Credentials." })
        }
    }


    res.json({ error: "There was an internal error. Sorry for the inconvience." })
})

router.post("/login", async (req, res) =>
{
    const { email, password } = req.body;

    if (!email || !password)
    {
        return res.status(400).json({ error: "Please fill the data." })
    }


    try
    {
        const emailExist = await User.findOne({ email: email });

        if (!emailExist)
        {
            return res.status(400).json({ error: "Invalid Credentials." })
        }

        const isMatch = await bcrypt.compare(password, emailExist.password);

        const token = await emailExist.generateAuthToken();

        if (isMatch)
        {
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });

            return res.status(200).json({ message: "User login successfully." })
        }

        else
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

    }
    catch (error)
    {
        console.log(error)
    }

})

router.get("/authenticate", authenticate, async (req, res) =>
{
    res.send(req.rootUser);
})

router.post("/addnewpassword", authenticate, async (req, res) =>
{
    const { platform, userPass, userEmail, platEmail } = req.body;

    if (!platform || !userPass || !userEmail || !platEmail)
    {
        return res.status(400).json({ error: "Please fill the form properly" });
    }

    try
    {
        const rootUser = req.rootUser;


        const { iv, encryptedPassword } = encrypt(userPass);

        const isSaved = await rootUser.addNewPassword(encryptedPassword, iv, platform, platEmail);

        if (isSaved)
        {
            return res.status(200).json({ message: "Successfully added your password." })
        }
        else
        {
            return res.status(400).json({ error: "Could not save the password." })
        }
    }
    catch (error)
    {
        console.log(error)
    }

    return res.status(400).json({ error: "An unknown error occured." })
})

router.post("/deletepassword", authenticate, async (req, res) =>
{
    const { id } = req.body;

    if (!id)
    {
        return res.status(400).json({ error: "Could not find data" })
    }

    try
    {
        const rootUser = req.rootUser;

        const isDeleted = await User.updateOne({ email: rootUser.email }, { $pull: { passwords: { _id: id } } });

        if (!isDeleted)
        {
            return res.status(400).json({ error: "Could not delete the password." })
        }

        return res.status(200).json({ "message": "Successfully deleted your password." })
    }
    catch (err)
    {
        console.log(err);
    }
})

router.get("/logout", (req, res) =>
{
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("Logout");
})

router.post("/decrypt", (req, res) =>
{
    const { iv, encryptedPassword } = req.body;

    return res.status(200).send(decrypt(encryptedPassword, iv));
})


module.exports = router;