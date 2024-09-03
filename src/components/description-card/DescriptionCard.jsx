import React from "react";

function DescriptionCard() {
  return (
    <div className="sm:w-1/3">
      <h1 className="text-xl font-semibold">Employer verification</h1>
      <p className=" text-xs sm:text-sm ">
        Employer verification done by providing employer proof.
      </p>
      <p className=" text-xs sm:text-base font-medium mt-3">
        please provide any below listed documents or proof.
        <br /> kindly provide an image for easy verification
      </p>
      <ul className="text-sm list-decimal p-3">
        <li>Employment Contract or Offer Letter</li>
        <li>Company ID Card</li>
        <li>Pay Stubs or Salary Slips</li>
        <li>Employment Verification Letter</li>
        <li>Business Cards</li>
        <li>Work Permits or Visas</li>
        <li>Professional Licenses or Certifications</li>
        <li>Other valid documents</li>
      </ul>
    </div>
  );
}

export default DescriptionCard;
