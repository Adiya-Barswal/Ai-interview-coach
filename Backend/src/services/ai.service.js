const { GoogleGenAI } = require("@google/genai");

const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert HR Manager and Senior Technical Interviewer.

Analyze the following candidate.

Resume:
${resume}

Self Description:
${selfDescription}


Job Description:
${jobDescription}

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use \`\`\`.
Do NOT explain anything.

Return EXACTLY this structure:

{
  "title":"string",
  "matchScore":90,
  "technicalQuestions":[
    {
      "question":"string",
      "intention":"string",
      "answer":"string"
    }
  ],
  "behavioralQuestions":[
    {
      "question":"string",
      "intention":"string",
      "answer":"string"
    }
  ],
  "skillGaps":[
    {
      "skill":"string",
      "severity":"low"
    }
  ],
  "preparationPlan":[
    {
      "day":1,
      "focus":"string",
      "tasks":[
        "string",
        "string"
      ]
    }
  ]
}

Rules:

- title must be a string.
- matchScore must be number.
- technicalQuestions must be array of OBJECTS.
- behavioralQuestions must be array of OBJECTS.
- skillGaps must be array of OBJECTS.
- preparationPlan must be array of OBJECTS.
- NEVER return arrays of strings.
- Every object must contain every property.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  console.log("RAW AI RESPONSE");
  console.log(response.text);

  return JSON.parse(response.text);
}

// HTML -> PDF  from (puppeteer)

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

// Resume PDF generate function
// ================= Resume PDF =================

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are an expert ATS Resume Writer.

Create a professional, modern, ATS-friendly resume in HTML based on the candidate's resume, self description, and job description.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Rules:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use triple backticks.
- Do NOT explain anything.
- Do NOT return any text outside the JSON.
- The HTML must start with <!DOCTYPE html>.
- The HTML must end with </html>.
- Use clean semantic HTML with inline CSS only.
- Keep the design simple, professional and ATS-friendly.
- Tailor the resume according to the job description.
- Highlight relevant skills, projects and experience.
- Keep the resume within 1-2 pages.
- Ensure proper spacing, margins, headings, bullet points and alignment.
- Avoid unnecessary blank spaces and page breaks.

Return EXACTLY in this format:

{
  "html":"<!DOCTYPE html><html>...</html>"
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const result = JSON.parse(response.text);

  const htmlContent = result.html;

  const pdfBuffer = await generatePdfFromHtml(htmlContent);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
