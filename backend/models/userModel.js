const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name!"],
    },
    gender: {
      type: String,
      default: "Others",
      enum: ["Male", "Female", "Others"],
    },
    occupation: String,
    homeAddress: String,
    religion: {
      type: String,
      enum: ["Islam", "Christian", "Traditional beliefs"],
    },
    ethnic: {
      type: String,
      enum: ["Yoruba", "Igbo", "Hausa"],
    },
    maritalStatus: {
      type: String,
      enum: ["Married", "Single", "Divorced"],
    },
    medicalBackground: {
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        // required: [true, "You need to provide a blood group"],
      },
      genotype: {
        type: String,
        enum: ["AA", "AS", "AC", "AD", "AE", "AO", "SS", "SC", "SD"],
      },
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phoneNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number!",
      ],
    },
    photo: {
      type: String,
    },
    fileId: {
      type: String,
      unique: true,
      default: function () {
        const id = Math.round(Date.now() / 1000);
        return id;
      },
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (passwordConfirm) {
          return passwordConfirm == this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["patient", "admin", "doctor"],
      default: "patient",
    },
    passwordResetToken: String,
    passwordExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return 0;

  const birthdate = this.dateOfBirth;
  const age = Math.floor(
    (Date.now() - birthdate.getTime()) / (1000 * 3600 * 24 * 365)
  );
  return age;
});

userSchema.virtual("patientRecord", {
  ref: "MedicalRecord",
  foreignField: "patient",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
