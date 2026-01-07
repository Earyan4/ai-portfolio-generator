import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle}. Based on this job title, give me a list of summaries for three experience levels: Mid Level and Fresher level, each in 3-4 lines. Return the result as a JSON array with 'summary' and 'experience_level' fields.";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Started Saving Summary");

    const data = { data: { summary } };

    try {
      if (resume_id) {
        await updateThisResume(resume_id, data);
        toast.success("Resume Updated");
      }
    } catch (error) {
      toast.error(`Error updating resume: ${error.message}`);
    } finally {
      enanbledNext(true);
      enanbledPrev(true);
      setLoading(false);
    }
  };

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
  };

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title first.");
      return;
    }

    setLoading(true);
    console.log("Generating summary from AI for:", resumeInfo?.jobTitle);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = result.response.text();

      // Ensure response is valid JSON
      const parsedData = JSON.parse(textResponse);
      console.log("AI Response:", parsedData);

      setAiGenerateSummeryList(parsedData);
      toast.success("Summary Generated Successfully");
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error(`AI Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>

          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary}
            onChange={handleInputChange}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">AI Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                enanbledNext(false);
                enanbledPrev(false);
                setSummery(item.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
