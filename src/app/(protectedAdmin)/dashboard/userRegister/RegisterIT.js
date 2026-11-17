"use client";
import React from "react";
import { ITPersonnelForm, AdminForm } from "./RegistrationForm";

const RegisterIT = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-amber-200 border-1 border-black">
      <div className="w-[50%] border-1 border-b-blue-800 flex flex-start justify-content-center">
        <ITPersonnelForm />
      </div>
      <div className="w-[50%] border-1 border-danger flex flex-start justify-content-center">
        <AdminForm />
      </div>
    </div>
  );
};

export default RegisterIT;
