import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface QuizAnswer {
  questionId: string;
  answer: string[]; // Array of option IDs for multiple correct answers
  answeredBy: string;
  answeredAt: Timestamp;
}

export const quizService = {
  /**
   * Save an answer for a quiz question (supports multiple correct options)
   */
  async saveAnswer(
    questionId: string,
    answers: string[], // Array of option IDs
    userId: string
  ): Promise<void> {
    try {
      const answerData = {
        questionId,
        answer: answers,
        answeredBy: userId,
        answeredAt: serverTimestamp(),
      };

      // Filter out undefined values to comply with Firebase requirements
      const cleanData = Object.fromEntries(
        Object.entries(answerData).filter(([, value]) => value !== undefined)
      );

      await setDoc(doc(db, "quizAnswers", questionId), cleanData);
    } catch (error) {
      console.error("Error saving quiz answer:", error);
      throw error;
    }
  },

  /**
   * Get an answer for a specific question
   */
  async getAnswer(questionId: string): Promise<QuizAnswer | null> {
    try {
      const docRef = doc(db, "quizAnswers", questionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as QuizAnswer;
      }
      return null;
    } catch (error) {
      console.error("Error getting quiz answer:", error);
      throw error;
    }
  },

  /**
   * Get all quiz answers
   */
  async getAllAnswers(): Promise<QuizAnswer[]> {
    try {
      const answersQuery = query(
        collection(db, "quizAnswers"),
        orderBy("answeredAt", "desc")
      );
      const querySnapshot = await getDocs(answersQuery);

      return querySnapshot.docs.map((doc) => doc.data() as QuizAnswer);
    } catch (error) {
      console.error("Error getting all quiz answers:", error);
      throw error;
    }
  },

  /**
   * Check if a question has been answered
   */
  async isQuestionAnswered(questionId: string): Promise<boolean> {
    try {
      const answer = await this.getAnswer(questionId);
      return answer !== null;
    } catch (error) {
      console.error("Error checking if question is answered:", error);
      return false;
    }
  },
};

