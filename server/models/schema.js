const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require('./EncDecManager');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    passwords: [
        {
            password: {
                type: String,
                required: true
            },
            platform: {
                type: String,
                required: true
            },
            platEmail: {
                type: String,
                required: true
            },
            iv: {
                type: String,
            }
        }
    ]
});


// HASHING THE PASSWORD 
schema.pre('save', async function(next)
{
    if (this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    
    next();
})


// GENERATING AUTH TOKEN 
schema.methods.generateAuthToken = async function ()
{
    try
    {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (error)
    {
        console.log(error)
    }
}

// SVING NEW PASSWORD
schema.methods.addNewPassword = async function (userPass, iv, platform, platEmail)
{
    try
    {
        this.passwords = this.passwords.concat({ password: userPass, platform: platform, platEmail: platEmail, iv: iv });
        await this.save();
        return true;
    }
    catch (err)
    {
        console.log(err);
        return false;
    }
}

const User = mongoose.model("user-data", schema);
module.exports = User;