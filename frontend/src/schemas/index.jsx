import * as Yup from "yup";
import dayjs from "dayjs";

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

export const matrimonialSchema = Yup.object().shape({
  profileDetail: Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    motherName: Yup.string().required("Mother name is required"),
    education: Yup.string().required("Education is required"),
    profession: Yup.string().required("Profession is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Select a valid gender")
      .required("Gender is required"),
    achievement: Yup.string(),
    facebookUserName: Yup.string().required("Username is required"),
    instagramUserName: Yup.string().required("Username is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Number must be exactly 10 digits")
      .required("Contact number is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    address: Yup.string().required("Village name is required"),
    interest: Yup.array()
      .of(Yup.string().min(1, "Interest cannot be empty"))
      .min(1, "At least one interest is required"),
    hobby: Yup.array()
      .of(Yup.string().min(1, "Hobby cannot be empty"))
      .min(1, "At least one Hobby is required"),
    dob: Yup.date().required("Date of birth is required"),
    yourSelf: Yup.string()
      .required("This field is required")
      .min(50, "Description must be at least 50 characters"),
    maternalUncle: Yup.string().required("Maternal uncle name is required"),
    mamaVillageName: Yup.string().required("Mama village name is required"),
  }),
  sonDetails: Yup.array().of(
    Yup.object().shape({
      surname: Yup.string(),
      firstname: Yup.string(),
      secondname: Yup.string(),
      profession: Yup.string(),
      education: Yup.string(),
    })
  ),
});

// Job Poster Validation
export const jobPosterValidationSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .required("Job Title is required")
    .max(100, "Job Title cannot exceed 100 characters"),
  jobLocation: Yup.string()
    .required("Job Location is required")
    .max(150, "Job Location cannot exceed 150 characters"),
  jobDescription: Yup.string()
    .required("Job Description is required")
    .min(10, "Job Description must be at least 10 characters long"),
  minExperience: Yup.string()
    .required("Minimum Experience is required")
    .oneOf(
      [
        "Fresher",
        "1 Year",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years",
        "6 Years",
        "7 Years",
        "8 Years",
        "9 Years",
        "10 Years",
      ],
      "Invalid experience format"
    ),
  maxExperience: Yup.string()
    .required("Maximum Experience is required")
    .oneOf(
      [
        "Fresher",
        "1 Year",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years",
        "6 Years",
        "7 Years",
        "8 Years",
        "9 Years",
        "10 Years",
        "12 Years",
        "15 Years",
      ],
      "Invalid experience format"
    )
    .test(
      "is-greater",
      "Maximum Experience must be greater than Minimum Experience",
      function (value) {
        const { minExperience } = this.parent;
        if (minExperience === "Fresher" || value === "Fresher") return true; // Allow Fresher as valid
        const minValue = parseInt(minExperience);
        const maxValue = parseInt(value);
        return Number(maxValue) > Number(minValue);
      }
    ),
  salary: Yup.string()
    .required("Salary is required")
    .matches(/^\d+$/, "Salary must be a number"),
  opening: Yup.number()
    .required("Number of Openings is required")
    .integer("Number of Openings must be an integer")
    .positive("Number of Openings must be greater than zero"),
  companyName: Yup.string()
    .required("Company Name is required")
    .max(100, "Company Name cannot exceed 100 characters"),
  companyContact: Yup.string()
    .required("Company Contact is required")
    .matches(/^\d{10}$/, "Company Contact must be a 10-digit number"),
  companyEmail: Yup.string()
    .required("Company Email is required")
    .email("Enter a valid email address"),
  companyIndustry: Yup.string()
    .required("Company Industry is required")
    .max(100, "Company Industry cannot exceed 100 characters"),
  companyAddress: Yup.string()
    .required("Company Address is required")
    .max(250, "Company Address cannot exceed 250 characters"),
});

// Contact Us Form validation
export const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fullname is required")
    .min(10, "Please enter full name"),
  mobile: Yup.string()
    .required("Number is required")
    .matches(/^\d{10}$/, "Mobile must be a 10-digit number"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  message: Yup.string().required("Message is required"),
});

// ^ADMIN FORM VALIDATION
export const committeeValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  village: Yup.string().required("Village is required"),
  mobile: Yup.string()
    .required("Number is required")
    .matches(/^\d{10}$/, "Mobile must be a 10-digit number"),
  committee: Yup.string().required("Committee is required"),
});

export const donationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product/Service is required")
    .max(100, "Product/Service cannot exceed 100 characters"),
  totalQty: Yup.number()
    .required("Qty is required")
    .integer("Qty must be an integer")
    .positive("Qty must be greater than zero"),
  contact: Yup.string()
    .required("Mobile No. is required")
    .matches(/^\d{10}$/, "Mobile No. must be a 10-digit number"),
  price: Yup.number()
    .required("Price is required")
    .integer("Price must be an integer")
    .positive("Price must be greater than zero"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters long"),
});

export const festivalValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  fromDate: Yup.date()
    .required("Start date is required")
    .nullable()
    .test("is-future-date", "Start date must be in the future", (value) => {
      return dayjs(value).isAfter(dayjs());
    }),
  toDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("fromDate"), "End date must be after start date"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters long"),
});
