import * as Yup from "yup";

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
    contact: Yup.string().required("Contact is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    address: Yup.string().required("Address is required"),
    interest: Yup.array().of(Yup.string()),
    hobby: Yup.array().of(Yup.string()),
    dob: Yup.date().required("Date of birth is required"),
    yourSelf: Yup.string().required("This field is required"),
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
