import fs from "fs";

export type Gradebook = {
  [student: string]: {
    [subject: string]: number;
  };
};

export function calculateSubjectAverage(subject: string): number {
  const data = fs.readFileSync("data/gradebook.json", "utf-8");
  const gradebook: Gradebook = JSON.parse(data);

  const grades: number[] = [];
  for (const student in gradebook) {
    if (subject in gradebook[student]) {
      grades.push(gradebook[student][subject]);
    }
  }

  if (grades.length === 0) {
    return 0;
  }
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}
