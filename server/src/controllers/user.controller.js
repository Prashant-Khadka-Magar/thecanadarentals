import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Host } from "../models/host.model.js";
import { Seeker } from "../models/seeker.model.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;


  //check if the values are undefiend or empty
  if (
    !username?.trim() ||
    !password?.trim() ||
    !email?.trim() ||
    !fullname?.trim()
  ) {
    throw new ApiError(400, "Please enter all the fields");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email ot username already exist ");
  }

  let avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    avatarLocalPath=`https://ui-avatars.com/api/?name=${fullname}`
  }

  const { role } = req.body;

  if (!role?.trim()) {
    throw new ApiError(400, "Enter a Role");
  }

  if (role !== "host" && role !== "seeker" && role !== "admin") {
    throw new ApiError(400, "Enter a valid role");
  }

  //upload avatar on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Error while uploading avatar");
  }

  let newUser;
  //Upload data according to the role
  if (role === "host") {
    const { contactNumber } = req.body;

    if (!contactNumber?.trim()) {
      throw new ApiError(400, "Please enter your contact");
    }
  
    newUser = await Host.create({
      fullname,
      username: username.toLowerCase(),
      email,
      role,
      password,
      avatar: avatar.url,
      contactNumber,
      rooms: [],
    });
  } else if (role === "seeker") {
    const {
      contactNumber,
      gender,
      movingIn,
      location,
      budget,
      seekerType,
      age,
      occupation,
      hasRoomies,
      otherRoomies,
      description,
    } = req.body;

    // Validate Seeker-specific fields
    if (
      !contactNumber?.trim() ||
      !gender?.trim() ||
      !movingIn ||
      !location?.trim() ||
      !budget ||
      !seekerType?.trim() ||
      !age ||
      !occupation?.trim() ||
      !description?.trim()
    ) {
      throw new ApiError(400, "Please enter all required seeker fields");
    }

    let otherRoomiesData = [];
    if (hasRoomies) {
      if (!Array.isArray(otherRoomies) || otherRoomies.length === 0) {
        throw new ApiError(400, "Please provide details for other roomies");
      }

      otherRoomiesData = otherRoomies.map((roomie) => {
        const { name, age, gender } = roomie;

        if (!name?.trim() || !age || !gender?.trim()) {
          throw new ApiError(
            400,
            "Each roomie must have a name, age, and gender",
          );
        }

        return {
          name: name.trim(),
          age,
          gender,
        };
      });
    }

    newUser = Seeker.create({
      fullname,
      email,
      username,
      password,
      role,
      avatar: avatar.url,
      contactNumber,
      gender,
      movingIn,
      location,
      budget,
      seekerType,
      age,
      occupation,
      hasRoomies,
      otherRoomies: otherRoomiesData,
      description,
    });
  }
  
   else if (role === "admin") {
    newUser = Admin.create({
      fullname,
      email,
      username,
      password,
      role,
      avatar: avatar.url,
    });
  }

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Error while creating User ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});


const loginUser=asyncHandler(async (req,res)=>{

  const {email,password}= req.body;

  if(!email || !password){
    throw new ApiError(400, "Please enter all the fields");
  }


  res.send("Hello world!");

  
})

export { registerUser, loginUser };
