const mongoose = require("mongoose")

const isValid = (value) => {
    if(typeof value === "undefined" || typeof value === "null") return false;
    if(typeof value === "string" && value.trim().length == 0) return false;
    return true; 
  }
  
  const isValidPincode = (num) => {
    return /^[0-9]{6}$/.test(num);
  }

  const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
  }
  
  const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length == 0;
  }

  const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
  };
  
  const isValidEmail = (Email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
  };
  
  const isValidPwd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
  };
  
  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  }

  const isValidPrice = (price) => {
    return /^[1-9]\d{0,7}(?:\.\d{1,2})?$/.test(price)
  }
  
  const isValidSize = (sizes) => {
    return ["S", "XS","M","X", "L","XXL", "XL"].includes(sizes);
  }

  const isValidString = (String) => {
    return /\d/.test(String)
  }
  
  const isValidNum = (num) => {
    return /^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/.test(num);
  }

  module.exports = {isValid,isValidPincode,isValidBody,isValidPhone,isValidEmail,
    isValidPwd,isValidObjectId,isValidPrice,isValidSize,isValidString,isValidNum,isValidName}


