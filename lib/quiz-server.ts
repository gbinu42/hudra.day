import { quizQuestions } from "@/app/data/quiz-questions";

// Firebase project config
const FIREBASE_PROJECT_ID = "hudra-d80ee";

interface FirestoreDocument {
  fields?: {
    answer?: {
      arrayValue?: {
        values?: Array<{ stringValue: string }>;
      };
      stringValue?: string;
    };
  };
}

/**
 * Fetch all quiz answers from Firebase using REST API
 * This runs at build time for static generation
 */
export async function getQuizAnswersStatic(): Promise<Record<string, string[]>> {
  const answers: Record<string, string[]> = {};

  try {
    // Fetch all documents from quizAnswers collection
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/quizAnswers`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour in production
    });

    if (!response.ok) {
      console.error("Failed to fetch quiz answers:", response.statusText);
      return answers;
    }

    const data = await response.json();
    
    if (data.documents) {
      for (const doc of data.documents as Array<{ name: string } & FirestoreDocument>) {
        // Extract question ID from document path
        const pathParts = doc.name.split("/");
        const questionId = pathParts[pathParts.length - 1];
        
        // Extract answer array
        const answerField = doc.fields?.answer;
        if (answerField) {
          if (answerField.arrayValue?.values) {
            answers[questionId] = answerField.arrayValue.values
              .map((v) => v.stringValue)
              .filter((v): v is string => v !== undefined);
          } else if (answerField.stringValue) {
            // Handle old single-string format
            answers[questionId] = [answerField.stringValue];
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching quiz answers for static generation:", error);
  }

  return answers;
}

/**
 * Get quiz data for static rendering
 */
export async function getQuizStaticData() {
  const correctAnswers = await getQuizAnswersStatic();
  
  return {
    questions: quizQuestions,
    correctAnswers,
    totalQuestions: quizQuestions.length,
  };
}

