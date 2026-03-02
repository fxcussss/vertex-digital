import fs from "fs";
import path from "path";

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function getSubmissions(): Submission[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Submission[];
  } catch {
    return [];
  }
}

export function addSubmission(data: Omit<Submission, "id" | "status" | "createdAt">): Submission {
  ensureFile();
  const submissions = getSubmissions();
  const submission: Submission = {
    ...data,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  submissions.unshift(submission);
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return submission;
}

export function updateSubmissionStatus(id: string, status: Submission["status"]): boolean {
  ensureFile();
  const submissions = getSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  submissions[idx].status = status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return true;
}
