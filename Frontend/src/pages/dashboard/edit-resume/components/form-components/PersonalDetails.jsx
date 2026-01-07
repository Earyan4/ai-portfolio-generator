import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState(resumeInfo?.photo || "");
  const [formData, setFormData] = React.useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
    photo: resumeInfo?.photo || "",
  });

  const compressImage = (file, maxSizeMB = 0.5) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize if too large (max 800x800 for profile pics)
          const maxDimension = 800;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height * maxDimension) / width;
              width = maxDimension;
            } else {
              width = (width * maxDimension) / height;
              height = maxDimension;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to jpeg with quality
          let quality = 0.8;
          let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Check size and reduce quality if needed
          while (compressedDataUrl.length > maxSizeMB * 1024 * 1024 && quality > 0.1) {
            quality -= 0.1;
            compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          }
          
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleFileChange = async (file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        toast.info("Compressing image...");
        const compressedImage = await compressImage(file, 0.3); // Max 300KB
        setPhotoPreview(compressedImage);
        setFormData({ ...formData, photo: compressedImage });
        dispatch(addResumeData({ ...resumeInfo, photo: compressedImage }));
        enanbledNext(false);
        toast.success("Photo updated!");
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("Error processing image. Please try again.");
      }
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  React.useEffect(() => {
    setPhotoPreview(resumeInfo?.photo || "");
    setFormData({
      firstName: resumeInfo?.firstName || "",
      lastName: resumeInfo?.lastName || "",
      jobTitle: resumeInfo?.jobTitle || "",
      address: resumeInfo?.address || "",
      phone: resumeInfo?.phone || "",
      email: resumeInfo?.email || "",
      photo: resumeInfo?.photo || "",
    });
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Personal Details Save Started");
    
    const dataToSend = {
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        jobTitle: e.target.jobTitle.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        photo: photoPreview || "",
      },
    };
    
    if (resume_id) {
      try {
        console.log("Sending data to backend...");
        const response = await updateThisResume(resume_id, dataToSend);
        console.log("Response received:", response);
        toast.success("Resume Updated Successfully");
      } catch (error) {
        console.error("Error updating resume:", error);
        const errorMessage = error?.response?.data?.message || error?.message || "Network Error: Please check backend server";
        toast.error(errorMessage);
      } finally {
        enanbledNext(true);
        setLoading(false);
      }
    } else {
      console.error("No resume_id found");
      toast.error("Resume ID not found");
      enanbledNext(true);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm mb-2 block">Profile Photo</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                {photoPreview ? (
                  <div className="flex flex-col items-center">
                    <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 mb-3" />
                    <p className="text-sm text-gray-600">Click to change photo</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-600">Drag & drop your photo here</p>
                    <p className="text-sm text-gray-500 mt-2">or click to browse from gallery</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
