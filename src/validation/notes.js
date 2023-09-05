import * as yup from "yup"

//create a validation schema for notes
export const noteSchema = yup.object().shape({
    title: yup.string().required("Title Required"),
    category: yup.string().required("Category Required"),
    note: yup.string().required("Note Required")
})