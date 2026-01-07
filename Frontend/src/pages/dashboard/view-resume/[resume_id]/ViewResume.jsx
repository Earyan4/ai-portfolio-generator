import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    fetchResumeInfo();
  }, []);
  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    // console.log(response.data);
    setResumeInfo(response.data);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = () => {
    window.print();
  };

  const generatePortfolio = () => {
    const portfolioHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.firstName} ${resumeData.lastName} - Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #f8f9fa;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
        }
        
        .hero-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 60px;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .photo-container {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 5px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
            flex-shrink: 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        
        .hero-text {
            text-align: left;
        }
        
        .hero-name {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: white;
        }
        
        .job-title {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
            font-weight: 400;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
        }
        
        /* Main Content */
        .content-section {
            background: white;
            margin: 40px auto;
            padding: 50px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
            font-size: 2rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 3px solid #667eea;
        }
        
        .section-content {
            color: #4a5568;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .experience-item, .education-item, .project-item {
            padding: 30px;
            border-left: 4px solid #667eea;
            background: #f8f9fa;
            margin-bottom: 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .experience-item:hover, .education-item:hover, .project-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
        
        .item-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 8px;
        }
        
        .item-subtitle {
            color: #667eea;
            font-size: 1.2rem;
            margin-bottom: 8px;
        }
        
        .item-date {
            color: #718096;
            font-size: 1rem;
            margin-bottom: 12px;
        }
        
        .tech-stack {
            display: inline-block;
            padding: 6px 14px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-top: 10px;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .skill-item {
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #e2e8f0;
            transition: all 0.3s ease;
        }
        
        .skill-item:hover {
            border-color: #667eea;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
        
        .skill-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 8px;
        }
        
        .skill-rating {
            color: #667eea;
            font-size: 1.2rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero-content {
                flex-direction: column;
                gap: 30px;
            }
            
            .hero-name {
                font-size: 2.5rem;
            }
            
            .content-section {
                padding: 30px 20px;
            }
            
            .photo-container {
                width: 150px;
                height: 150px;
                font-size: 3rem;
            }
        }
    </style>
</head>
<body>
    <div class="hero-section">
        <div class="hero-content">
            ${resumeData.photo ? `
                <div class="photo-container" style="background-image: url('${resumeData.photo}'); background-size: cover; background-position: center;"></div>
            ` : `
                <div class="photo-container">${(resumeData.firstName[0] || '') + (resumeData.lastName[0] || '') || '👤'}</div>
            `}
            <div class="hero-text">
                <h1 class="hero-name">${resumeData.firstName} ${resumeData.lastName}</h1>
                <p class="job-title">${resumeData.jobTitle || 'Professional'}</p>
                <div class="contact-info">
                    ${resumeData.email ? `<div class="contact-item">📧 ${resumeData.email}</div>` : ''}
                    ${resumeData.phone ? `<div class="contact-item">📱 ${resumeData.phone}</div>` : ''}
                    ${resumeData.address ? `<div class="contact-item">📍 ${resumeData.address}</div>` : ''}
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        ${resumeData.summary ? `
        <div class="content-section">
            <h2 class="section-title">About Me</h2>
            <p class="section-content">${resumeData.summary}</p>
        </div>
        ` : ''}
        
        ${resumeData.experience && resumeData.experience.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">Professional Experience</h2>
            ${resumeData.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-title">${exp.title || 'Position'}</div>
                    <div class="item-subtitle">${exp.companyName || 'Company'}</div>
                    <div class="item-date">${exp.city && exp.state ? `${exp.city}, ${exp.state}` : ''} • ${exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate || ''}</div>
                    <p style="color: #4a5568; margin-top: 15px; line-height: 1.6;">${exp.workSummary || ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${resumeData.projects && resumeData.projects.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">Projects</h2>
            ${resumeData.projects.map(project => `
                <div class="project-item">
                    <div class="item-title">${project.projectName || 'Project Name'}</div>
                    ${project.techStack ? `<div class="tech-stack">${project.techStack}</div>` : ''}
                    <p style="color: #4a5568; margin-top: 15px; line-height: 1.6;">${project.projectSummary || ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${resumeData.education && resumeData.education.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">Education</h2>
            ${resumeData.education.map(edu => `
                <div class="education-item">
                    <div class="item-title">${edu.degree || 'Degree'} ${edu.major ? `- ${edu.major}` : ''}</div>
                    <div class="item-subtitle">${edu.universityName || 'University'}</div>
                    <div class="item-date">${edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate || ''}${edu.grade ? ` • GPA: ${edu.grade}` : ''}</div>
                    ${edu.description ? `<p style="color: #4a5568; margin-top: 15px; line-height: 1.6;">${edu.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${resumeData.skills && resumeData.skills.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${resumeData.skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">${skill.name || 'Skill'}</div>
                        ${skill.rating ? `<div class="skill-rating">${'⭐'.repeat(skill.rating)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;

    // Create a blob and download the file
    const blob = new Blob([portfolioHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.firstName}_${resumeData.lastName}_Portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Portfolio generated successfully!");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generates Resume is ready !{" "}
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share unique
              resume url with your friends and family{" "}
            </p>
            <div className="flex flex-wrap justify-center gap-4 my-10 px-4">
              <Button onClick={HandleDownload}>Download</Button>
              <Button onClick={generatePortfolio} variant="outline">Generate Portfolio</Button>
              <RWebShare
                data={{
                  text: "Hello This is My resume",
                  url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                  title: "Flamingos",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div
          className=" bg-white rounded-lg p-8 print-area"
          style={{ width: "210mm", height: "297mm" }}
        >
          <div className="print">
            <ResumePreview />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
