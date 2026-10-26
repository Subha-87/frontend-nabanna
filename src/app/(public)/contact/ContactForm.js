"use client";

import { useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  customSubject: "",
  office: "se",
  message: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .max(100, "Name cannot exceed 100 characters")
    .required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long")
    .required("Email address is required"),

  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(/^\+?[0-9()\s-]{7,20}$/, "Enter a valid phone number"),

  subject: Yup.string()
    .oneOf(
      [
        "general",
        "technical",
        "network",
        "website",
        "software",
        "hardware",
        "meeting",
        "other",
      ],
      "Please select a valid subject",
    )
    .required("Please select a subject"),
  customSubject: Yup.string().when("subject", {
    is: "other",
    then: (schema) =>
      schema
        .trim()
        .required("Please mention your subject")
        .max(100, "Subject must be at most 100 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

  office: Yup.string()
    .oneOf(["se", "ee", "ae"], "Please select a valid office")
    .required("Please select an office"),

  message: Yup.string()
    .trim()
    .max(1000, "Message cannot exceed 1000 characters")
    .required("Message is required"),
});

const inputClass =
  "w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors placeholder:text-slate-400 bg-white";

const selectClass =
  "w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors text-slate-700 bg-white";

const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5";

function ValidationError({ name }) {
  const { errors, touched } = useFormikContext();

  if (!touched[name] || !errors[name]) {
    return null;
  }

  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {errors[name]}
    </p>
  );
}

export default function ContactForm() {
  const [submitMessage, setSubmitMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    setSubmitMessage({ type: "", text: "" });
    setStatus(undefined);

    // Send only the required fields as a JSON payload.
    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject:
        values.subject === "other"
          ? values.customSubject.trim()
          : values.subject,
      office: values.office,
      message: values.message.trim(),
    };
    console.log(payload);

     try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/contact`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const message =
        response.data?.message ||
        "Your enquiry has been submitted successfully.";

      setSubmitMessage({
        type: "success",
        text: message,
      });

      resetForm();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to submit your enquiry. Please try again.";

      setSubmitMessage({
        type: "error",
        text: message,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a5c] to-[#1e4d7b] px-6 py-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Write to Us
        </h3>

        <p className="text-blue-200 text-xs mt-1">
          Fields marked with * are mandatory
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form className="p-6 space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>

              <Field
                type="text"
                id="fullName"
                name="fullName"
                maxLength={100}
                autoComplete="name"
                placeholder="Enter your full name"
                className={inputClass}
              />

              <ValidationError
                name="fullName"
                errors={errors}
                touched={touched}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>

              <Field
                type="email"
                id="email"
                name="email"
                maxLength={254}
                autoComplete="email"
                placeholder="your.email@example.com"
                className={inputClass}
              />

              <ValidationError name="email" errors={errors} touched={touched} />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number <span className="text-red-500">*</span>
              </label>

              <Field
                type="tel"
                id="phone"
                name="phone"
                maxLength={20}
                autoComplete="tel"
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
              />

              <ValidationError name="phone" errors={errors} touched={touched} />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject <span className="text-red-500">*</span>
              </label>

              <Field
                as="select"
                id="subject"
                name="subject"
                className={`${selectClass} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]`}
              >
                <option value="">Select a subject</option>
                <option value="general">General Enquiry</option>
                <option value="technical">Technical Support</option>
                <option value="network">Network Issues</option>
                <option value="website">Website Related</option>
                <option value="software">Software / License</option>
                <option value="hardware">Hardware / Procurement</option>
                <option value="meeting">VIP meeting</option>
                <option value="other">Other</option>
              </Field>

              <ValidationError name="subject" />
              {/** Show the extra field only when Other is selected */}
              <Field name="subject">
                {({ field, form }) =>
                  field.value === "other" ? (
                    <div className="mt-4">
                      <label
                        htmlFor="customSubject"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Please mention your subject{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <Field
                        type="text"
                        id="customSubject"
                        name="customSubject"
                        placeholder="Please mention your subject"
                        maxLength={100}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3
                                  focus:border-blue-500 focus:outline-none focus:ring-2
                                    focus:ring-blue-200"
                      />

                      <ValidationError name="customSubject" />
                    </div>
                  ) : null
                }
              </Field>
            </div>

            {/* Office */}
            <div>
              <label htmlFor="office" className={labelClass}>
                Address to Office
              </label>

              <Field
                as="select"
                id="office"
                name="office"
                className={`${selectClass} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]`}
              >
                <option value="se">S.E. — IT Circle, K.I.T. Building</option>
                <option value="ee">
                  E.E. — Kolkata IT Division, Writers&apos; Building
                </option>
                <option value="ae">A.E. — Nabanna IT-Sub Division</option>
              </Field>

              <ValidationError
                name="office"
                errors={errors}
                touched={touched}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-red-500">*</span>
              </label>

              <Field
                as="textarea"
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                placeholder="Describe your query or concern in detail..."
                className={`${inputClass} resize-none`}
              />

              <div className="flex justify-between items-start gap-3 mt-1">
                <ValidationError
                  name="message"
                  errors={errors}
                  touched={touched}
                />

                <p className="text-right text-[10px] text-slate-400 ml-auto shrink-0">
                  {values.message.length}/1000 characters
                </p>
              </div>
            </div>

            {/* CAPTCHA placeholder */}
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500">
                <svg
                  className="w-4 h-4 inline-block mr-1 text-slate-400 -mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 013 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                CAPTCHA verification will appear here
              </p>
            </div>

            {/* Success / Error message */}
            {submitMessage.text && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-lg border p-3 text-sm ${
                  submitMessage.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#1a3a5c] to-[#1e4d7b] text-white font-semibold text-sm py-3 rounded-lg hover:from-[#142d49] hover:to-[#173d62] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>

              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              By submitting this form, you agree that the information provided
              is accurate.
              <br />
              This is a Government of West Bengal portal.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
