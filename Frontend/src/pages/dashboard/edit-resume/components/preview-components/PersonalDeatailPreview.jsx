import React from "react";

function PersonalDeatailPreview({ resumeInfo }) {
  const getInitials = (firstName = "", lastName = "") => {
    return (firstName[0] || "") + (lastName[0] || "") || "👤";
  };

  return (
    <div>
      {resumeInfo?.photo ? (
        <div className="flex justify-center mb-4">
          <img 
            src={resumeInfo.photo} 
            alt={`${resumeInfo.firstName} ${resumeInfo.lastName}`}
            className="w-24 h-24 rounded-full object-cover border-4"
            style={{ borderColor: resumeInfo?.themeColor }}
          />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: resumeInfo?.themeColor }}
          >
            {getInitials(resumeInfo?.firstName, resumeInfo?.lastName)}
          </div>
        </div>
      )}
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default PersonalDeatailPreview;
