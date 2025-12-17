export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  courseId: string;
  courseName: string;
  correctAnswers?: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question:
      "Which of the following areas can be included in health research? i. Improving the health of the population. ii. Predicting progression of a disease in a patient iii. Prevention of various diseases iv. To explore various societal, community based and programmatic interventions for disease prevention and control",
    options: [
      {
        id: "a",
        text: "i and ii",
      },
      {
        id: "b",
        text: "i, ii and iv",
      },
      {
        id: "c",
        text: "All of the above",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q2",
    question: "What is appropriate for sample and sample size?",
    options: [
      {
        id: "a",
        text: "Should be representative of the population [External validity or generalizability]",
      },
      {
        id: "b",
        text: "Should be adequate [power to draw meaningful inferences]",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "Neither 'a' nor 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q3",
    question:
      "Which of the following statements are correct regarding defining inclusion and exclusion criteria in a study protocol?",
    options: [
      {
        id: "a",
        text: "They should be vague because this will allow greater and easy enrollment",
      },
      {
        id: "b",
        text: "They should be very specific",
      },
      {
        id: "c",
        text: "They should be very large in number",
      },
      {
        id: "d",
        text: "It is not important to define exclusion criteria in a clinical trial",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q4",
    question:
      "Which of the following are examined as part of regulatory review?",
    options: [
      {
        id: "a",
        text: "Information regarding transfer of funds and utilization of funds",
      },
      {
        id: "b",
        text: "Shipment of samples and transfer of data outside the country",
      },
      {
        id: "c",
        text: "Sharing and protection of intellectual property",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q5",
    question:
      "Which of the following statements is not true in case of pilot study?",
    options: [
      {
        id: "a",
        text: "They are conducted for developing and testing adequacy of research instruments",
      },
      {
        id: "b",
        text: "They establish whether the sampling frame and technique are effective",
      },
      {
        id: "c",
        text: "Ethics committee approves the main study only after successful completion of the pilot study",
      },
      {
        id: "d",
        text: "They are small scale studies",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q6",
    question:
      "Before initiating a study involving primary data collection, the Principal Investigator must ensure that various approvals are obtained. Which of the following approvals is absolutely mandatory?",
    options: [
      {
        id: "a",
        text: "Scientific committee approval",
      },
      {
        id: "b",
        text: "Ethics committee approval",
      },
      {
        id: "c",
        text: "Technical committee approval",
      },
      {
        id: "d",
        text: "Regulatory authority approval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q7",
    question:
      "Which is the best source of information on 'effect modifiers' while exploring cause and effect relationship in a research study?",
    options: [
      {
        id: "a",
        text: "Deductive thinking",
      },
      {
        id: "b",
        text: "Thorough review of literature",
      },
      {
        id: "c",
        text: "Intelligent guessing",
      },
      {
        id: "d",
        text: "Discussing with experienced researchers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q8",
    question:
      "The policy makers want to know whether introduction of pentavalent vaccine in the national program is resulting in reduction in the number of Hemophilus influenza cases. Which of the following studies will they have to conduct to find an answer?",
    options: [
      {
        id: "a",
        text: "Case-control study",
      },
      {
        id: "b",
        text: "Field trial",
      },
      {
        id: "c",
        text: "Ecological study",
      },
      {
        id: "d",
        text: "Case series",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q9",
    question: "What is true about Confounders?",
    options: [
      {
        id: "a",
        text: "They affect both study variable as well as outcome",
      },
      {
        id: "b",
        text: "Their effect can be minimized by proper study design and through stratified analysis",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q10",
    question: "Which of the following is not a type of study design?",
    options: [
      {
        id: "a",
        text: "Qualitative study",
      },
      {
        id: "b",
        text: "Observational study",
      },
      {
        id: "c",
        text: "Retrospective study",
      },
      {
        id: "d",
        text: "Pilot study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q11",
    question:
      "Any systematic error in the design, conduct or analysis of a study that results in an erroneous estimate of an exposure's effect on the risk of disease is called:",
    options: [
      {
        id: "a",
        text: "Confounding",
      },
      {
        id: "b",
        text: "Bias",
      },
      {
        id: "c",
        text: "Interaction",
      },
      {
        id: "d",
        text: "Stratification",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q12",
    question:
      "Which of the following is not part of ethics review of a project?",
    options: [
      {
        id: "a",
        text: "Informed consent document and procedure",
      },
      {
        id: "b",
        text: "Competence of researcher and institute conducting research",
      },
      {
        id: "c",
        text: "Sharing and protection of intellectual property",
      },
      {
        id: "d",
        text: "Care and support during and after completion of research",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q13",
    question:
      "A study was conducted to assess the extrapyramidal side effects of a new antipsychotic drug in patients with schizophrenia. Many of these patients were smokers and some of them were on anticholinergic drugs. What was the role of the anticholinergic drugs in this study?",
    options: [
      {
        id: "a",
        text: "Confounder",
      },
      {
        id: "b",
        text: "Random Variable",
      },
      {
        id: "c",
        text: "Effect Modifier",
      },
      {
        id: "d",
        text: "Independent Variable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q14",
    question:
      "Before initiating a study involving primary data collection, the Principal Investigator must ensure that various approvals are obtained. Which of the following approvals is absolutely mandatory?",
    options: [
      {
        id: "a",
        text: "Scientific committee approval",
      },
      {
        id: "b",
        text: "Ethics committee approval",
      },
      {
        id: "c",
        text: "Technical committee approval",
      },
      {
        id: "d",
        text: "Regulatory authority approval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q15",
    question:
      "The policy makers want to know whether introduction of a new rotavirus vaccine in the national immunization programme is resulting in reduction of morbidity and mortality from rotavirus disease. Which of the following studies will they have to conduct to find an answer?",
    options: [
      {
        id: "a",
        text: "Case-control study",
      },
      {
        id: "b",
        text: "Ecological study",
      },
      {
        id: "c",
        text: "Field randomized trial",
      },
      {
        id: "d",
        text: "Case-series",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q16",
    question:
      "What effect does increasing the sample size have upon the random error?",
    options: [
      {
        id: "a",
        text: "It increases the random error",
      },
      {
        id: "b",
        text: "It has no effect on the random error",
      },
      {
        id: "c",
        text: "It reduces the random error",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q17",
    question:
      "Which of the following will best describe the scientific inquiry that seeks to understand the acceptability and functionality of a health program?",
    options: [
      {
        id: "a",
        text: "Basic science research",
      },
      {
        id: "b",
        text: "Translational research",
      },
      {
        id: "c",
        text: "Clinical research",
      },
      {
        id: "d",
        text: "Implementation research",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q18",
    question:
      "The following statements describe confounding and effect modification. Which of the statement is/are correct?",
    options: [
      {
        id: "a",
        text: "In a study of relationship between coffee drinking and oro-pharyngeal cancer; smoking is a confounder",
      },
      {
        id: "b",
        text: "In a study to explore relationship between hepatitis B infection and post-infection hepatic sequelae, habit of alcohol drinking acts as an effect modifier and patients with this habit may be excluded from the study",
      },
      {
        id: "c",
        text: "‘a’ and ‘b’ Correct",
      },
      {
        id: "d",
        text: "‘a’ and ‘b’ Wrong",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q19",
    question:
      "Issues regarding shipment of samples and transfer of data outside the country are examined by:",
    options: [
      {
        id: "a",
        text: "Regulatory review",
      },
      {
        id: "b",
        text: "Ethics review",
      },
      {
        id: "c",
        text: "Scientific review",
      },
      {
        id: "d",
        text: "None",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q20",
    question:
      "Which of the following disciplines contribute to health research?",
    options: [
      {
        id: "a",
        text: "Bio-medical research",
      },
      {
        id: "b",
        text: "Biostatistics",
      },
      {
        id: "c",
        text: "Social science research",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q21",
    question:
      "Which of the following best describes a study done in a laboratory setting using animals?",
    options: [
      {
        id: "a",
        text: "Translational research",
      },
      {
        id: "b",
        text: "Bench-based research",
      },
      {
        id: "c",
        text: "Theoretical research",
      },
      {
        id: "d",
        text: "Preventive research",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q22",
    question:
      "Which of the following review is NOT essential before initiating a clinical trial?",
    options: [
      {
        id: "a",
        text: "Scientific review",
      },
      {
        id: "b",
        text: "Peer review",
      },
      {
        id: "c",
        text: "Regulatory review",
      },
      {
        id: "d",
        text: "Ethics review",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q23",
    question: "Which of the following is NOT a type of study design?",
    options: [
      {
        id: "a",
        text: "Qualitative study",
      },
      {
        id: "b",
        text: "Observational study",
      },
      {
        id: "c",
        text: "Retrospective study",
      },
      {
        id: "d",
        text: "Translational study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q24",
    question:
      "Which of the following statements is NOT correct regarding errors in a health research?",
    options: [
      {
        id: "a",
        text: "Random error is due to chance",
      },
      {
        id: "b",
        text: "Systematic error is due to bias",
      },
      {
        id: "c",
        text: "Random errors can be eliminated by improving study design",
      },
      {
        id: "d",
        text: "Bias distorts the study results in one direction",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q25",
    question:
      "State whether true or false. Assigning roles and responsibilities to the team members is one of the fundamental principles of a research",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q26",
    question:
      "Health research is usually focused on which of the following areas?",
    options: [
      {
        id: "a",
        text: "Estimation of disease burden in a population",
      },
      {
        id: "b",
        text: "Prevention of common diseases in the community",
      },
      {
        id: "c",
        text: "Evaluation of public health programs",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q27",
    question: "Which of the following is NOT a component of a research study?",
    options: [
      {
        id: "a",
        text: "Setting up the institute scientific committee",
      },
      {
        id: "b",
        text: "Calculating sample size",
      },
      {
        id: "c",
        text: "Development of a study tool",
      },
      {
        id: "d",
        text: "Framing the research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q28",
    question:
      "A researcher wants to study the relationship between COVID-19 infection in pregnancy and birth weight. Currently, there is no evidence on this topic. Which of the following options is the scope of this health research?",
    options: [
      {
        id: "a",
        text: "Verifying and confirming known information",
      },
      {
        id: "b",
        text: "Getting additional or new information",
      },
      {
        id: "c",
        text: "Evaluating ongoing programs",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q29",
    question:
      "Which of the following is NOT a critical consideration in planning a health research?",
    options: [
      {
        id: "a",
        text: "Adequate justification",
      },
      {
        id: "b",
        text: "Clear and focused research question",
      },
      {
        id: "c",
        text: "Standard case definitions",
      },
      {
        id: "d",
        text: "Financial gain",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q30",
    question:
      "Identify the CORRECT statement about implementation of a research",
    options: [
      {
        id: "a",
        text: "Research findings must be approved by the funder",
      },
      {
        id: "b",
        text: "Research finding must be error free",
      },
      {
        id: "c",
        text: "Adequate sample size is a prerequisite",
      },
      {
        id: "d",
        text: "Pilot study can be done during data analysis stage",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q31",
    question: "Which of the following is an element of life cycle of research?",
    options: [
      {
        id: "a",
        text: "Identify data needs and spell out the research question",
      },
      {
        id: "b",
        text: "Formulate the objective and design the study",
      },
      {
        id: "c",
        text: "Draw conclusion and give recommendation to stakeholders",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q32",
    question:
      "Which of the following verbs is preferably used in the statement of objectives of an analytical research study?",
    options: [
      {
        id: "a",
        text: "Estimate",
      },
      {
        id: "b",
        text: "Determine",
      },
      {
        id: "c",
        text: "Study",
      },
      {
        id: "d",
        text: "Describe",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q33",
    question: "Source(s) of research question is/are",
    options: [
      {
        id: "a",
        text: "Published literature",
      },
      {
        id: "b",
        text: "Being alert to new ideas",
      },
      {
        id: "c",
        text: "Careful observation and teaching",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q34",
    question:
      "Which of the following is stated mainly for statistical purpose?",
    options: [
      {
        id: "a",
        text: "Research question",
      },
      {
        id: "b",
        text: "Objectives",
      },
      {
        id: "c",
        text: "Research hypothesis",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q35",
    question:
      "If your objective is to estimate the prevalence of a health problem in a community in 2019, Identify the type of research question this study is addressing",
    options: [
      {
        id: "a",
        text: "Analytical research question",
      },
      {
        id: "b",
        text: "Descriptive research question",
      },
      {
        id: "c",
        text: "Hypothetical research question",
      },
      {
        id: "d",
        text: "Experimental research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q36",
    question: "What is the first step in the life cycle of research?",
    options: [
      {
        id: "a",
        text: "Spell out the research question",
      },
      {
        id: "b",
        text: "Formulate the objective of the study",
      },
      {
        id: "c",
        text: "Identify the data needs",
      },
      {
        id: "d",
        text: "Choose the study design",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q37",
    question: "A clear research question facilitates to do the following",
    options: [
      {
        id: "a",
        text: "Choose the most optimal design",
      },
      {
        id: "b",
        text: "Identify who should be included as study population",
      },
      {
        id: "c",
        text: "Specify the outcomes that should be measured",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q38",
    question: "Which of the following statements is incorrect?",
    options: [
      {
        id: "a",
        text: "A good research question should be Feasible, Interesting, Novel, Ethical and Relevant",
      },
      {
        id: "b",
        text: "A good research question should be in epidemiological terms",
      },
      {
        id: "c",
        text: "A good research question facilitates to choose optimal design",
      },
      {
        id: "d",
        text: "A good research question will focus on one issue",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q39",
    question:
      'The verb "estimate" is used in the objective of analytical research studies',
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q40",
    question:
      'The process of refining the "ideas" into research questions begins with general uncertainty about a health issue and narrow down to a specific, concrete researchable issue',
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q41",
    question:
      "Which of the following statement is incorrect about a good research question?",
    options: [
      {
        id: "a",
        text: "Research question should advance scientific knowledge, improve practice, influence policy",
      },
      {
        id: "b",
        text: "Research question should be approved by the ethics committee",
      },
      {
        id: "c",
        text: "Research question should confirms, refutes or extends previous find",
      },
      {
        id: "d",
        text: "Feasibility should not be a criterion while developing research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q42",
    question:
      "All the following are characteristic of good research hypothesis EXCEPT",
    options: [
      {
        id: "a",
        text: "Research hypothesis should be simple",
      },
      {
        id: "b",
        text: "Research hypothesis should be devoid of any ambiguity about study participants and variables",
      },
      {
        id: "c",
        text: "Research hypothesis should be focused on primary objective",
      },
      {
        id: "d",
        text: "Research hypothesis should be written once the study is completed",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q43",
    question:
      "Which of the following verb is used in the statement of objective of a descriptive research study?",
    options: [
      {
        id: "a",
        text: "Estimate",
      },
      {
        id: "b",
        text: "Determine",
      },
      {
        id: "c",
        text: "Examine",
      },
      {
        id: "d",
        text: "Compare",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q44",
    question:
      "A research question states about what the results of the study might ultimately contribute to that particular field of science",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q45",
    question:
      "Purely descriptive research questions do not require a hypothesis",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q46",
    question:
      'Identify the type of research question if the objective of a study is "To determine the effect of tobacco cessation services on tuberculosis treatment outcomes among patients with tuberculosis under National Tuberculosis Elimination Program"?',
    options: [
      {
        id: "a",
        text: "Descriptive research question",
      },
      {
        id: "b",
        text: "Hypothetical research question",
      },
      {
        id: "c",
        text: "Analytical research question",
      },
      {
        id: "d",
        text: "Experimental research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q47",
    question:
      "As per the following objectives a hypothesis should be stated for which study?",
    options: [
      {
        id: "a",
        text: "To determine the association of maternal smoking during pregnancy with respiratory infectious disease morbidity and mortality in infants",
      },
      {
        id: "b",
        text: "To estimate the lifetime prevalence of mental health morbidities among elderly people in India",
      },
      {
        id: "c",
        text: "To describe the pattern of physical activity among school going children aged 6-18 years",
      },
      {
        id: "d",
        text: "To describe the temporal and spatial trends of mortality due to cardiovascular diseases, by age and sex in India during 2009-2019",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q48",
    question:
      "All the following are components of 'FINER ' criteria for a research question EXCEPT",
    options: [
      {
        id: "a",
        text: "Feasible",
      },
      {
        id: "b",
        text: "Reliable",
      },
      {
        id: "c",
        text: "Novel",
      },
      {
        id: "d",
        text: "Ethical",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q49",
    question: "Which is the last step in the life cycle of research?",
    options: [
      {
        id: "a",
        text: "Spell out the research question",
      },
      {
        id: "b",
        text: "Formulate the objective of the study",
      },
      {
        id: "c",
        text: "Formulate recommendations",
      },
      {
        id: "d",
        text: "Choose the study design",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q50",
    question:
      "The following are the steps in framing a research question. I. Review of state-of-art information II. Define measurable exposures & outcomes III. Raise a question IV. Decide worth investigating by peerreview Choose the correct sequence of framing a research question from below.",
    options: [
      {
        id: "a",
        text: "I, II, III, IV",
      },
      {
        id: "b",
        text: "II, IV, III, I",
      },
      {
        id: "c",
        text: "I, III, IV, II",
      },
      {
        id: "d",
        text: "III, I, II, IV",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q51",
    question:
      "A clear research question is required in order to facilitate the following:",
    options: [
      {
        id: "a",
        text: "To choose an optimal study design",
      },
      {
        id: "b",
        text: "To identify the outcomes that need to be measured",
      },
      {
        id: "c",
        text: "To decide when the outcomes need to be measured",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q52",
    question: "Characteristics of a good hypothesis are all, EXCEPT:",
    options: [
      {
        id: "a",
        text: "There should be no ambiguity about the study variables",
      },
      {
        id: "b",
        text: "It should be stated ‘a priori’",
      },
      {
        id: "c",
        text: "It can be revised based on the study findings",
      },
      {
        id: "d",
        text: "It should specify one exposure and one outcome",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q53",
    question:
      "Which of the following is NOT an ideal source of a research question?",
    options: [
      {
        id: "a",
        text: "Reviewing the published literature",
      },
      {
        id: "b",
        text: "Attending conferences where latest findings are shared",
      },
      {
        id: "c",
        text: "Observing keenly in the out-patient clinic",
      },
      {
        id: "d",
        text: "Mining existing datasets for research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q54",
    question:
      "Which of the following is TRUE for a ‘Descriptive Research Question’?",
    options: [
      {
        id: "a",
        text: "Involves observations to measure a quantity",
      },
      {
        id: "b",
        text: "Involves comparison groups",
      },
      {
        id: "c",
        text: "Tests the efficacy of interventions",
      },
      {
        id: "d",
        text: "Requires hypothesis testing",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q55",
    question:
      "Which of the following characteristics best describe a good research question?",
    options: [
      {
        id: "a",
        text: "Feasible, Novel, Ethical",
      },
      {
        id: "b",
        text: "Feasible, Noble, Ethical",
      },
      {
        id: "c",
        text: "Ethical, Novel, Intuitive",
      },
      {
        id: "d",
        text: "Fantastic, Novel, Relevant",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q56",
    question: "This is an example of analytical research question.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q57",
    question:
      "Which of the following statement about study objective/s is FALSE?",
    options: [
      {
        id: "a",
        text: "Objectives are stated in scientific terms",
      },
      {
        id: "b",
        text: "Objectives can be primary and secondary",
      },
      {
        id: "c",
        text: "Each objective is written using multiple verbs",
      },
      {
        id: "d",
        text: "Objectives should be specific",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q58",
    question:
      "In the life cycle of research, ‘spelling out the research question’ is followed by",
    options: [
      {
        id: "a",
        text: "Preparing data collection instrument",
      },
      {
        id: "b",
        text: "Formulating study objectives",
      },
      {
        id: "c",
        text: "Collecting data",
      },
      {
        id: "d",
        text: "Formulating recommendation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q59",
    question:
      "How can the given study objective be improved? “To understand the anaemia in pregnancy”",
    options: [
      {
        id: "a",
        text: "Using appropriate action verb",
      },
      {
        id: "b",
        text: "Specifying the outcome measure",
      },
      {
        id: "c",
        text: "Specifying the study setting and time period",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q60",
    question:
      "Which of the following is NOT a step in framing an ideal research question?",
    options: [
      {
        id: "a",
        text: "Literature review",
      },
      {
        id: "b",
        text: "Peer review",
      },
      {
        id: "c",
        text: "Broadening the initial question",
      },
      {
        id: "d",
        text: "Defining measurable outcomes",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q61",
    question:
      "The ability to apply the principles of analysis to identify those studies which are unbiased and valid is called as",
    options: [
      {
        id: "a",
        text: "Critical appraisal",
      },
      {
        id: "b",
        text: "Information seeking",
      },
      {
        id: "c",
        text: "Information management",
      },
      {
        id: "d",
        text: "Systematic Review",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q62",
    question:
      "A __________ is a collection of articles, abstracts, scientific proceedings, books, citations etc. that is organized so that it can easily be accessed while doing literature review",
    options: [
      {
        id: "a",
        text: "Database",
      },
      {
        id: "b",
        text: "Critical appraisal",
      },
      {
        id: "c",
        text: "Hard disk",
      },
      {
        id: "d",
        text: "Index",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q63",
    question: "Why should we need to do a literature review?",
    options: [
      {
        id: "a",
        text: "Save yourself from work",
      },
      {
        id: "b",
        text: "Know the subject matter better",
      },
      {
        id: "c",
        text: "Suggest new research topics, questions and methods",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q64",
    question:
      "The process of scanning the literature efficiently using manual or computerized methods to identify a set of potentially useful articles and books is called as",
    options: [
      {
        id: "a",
        text: "Information seeking",
      },
      {
        id: "b",
        text: "Critical appraisal",
      },
      {
        id: "c",
        text: "Database management",
      },
      {
        id: "d",
        text: "Information retrieval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q65",
    question:
      "In the Boolean search strategy AND tells that database that you want records that contain all the words you specify",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q66",
    question:
      "Which of the following is unethical while writing a Literature Review?",
    options: [
      {
        id: "a",
        text: "The contents from the studies should be presented honestly",
      },
      {
        id: "b",
        text: "The contents from the studies should not be distorted",
      },
      {
        id: "c",
        text: "It is not necessary to address the weakness of the study in a scholarly manner",
      },
      {
        id: "d",
        text: "Sources should be accurately documented",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q67",
    question:
      "Critical appraisal is done in an organized and systematic manner",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q68",
    question:
      "The process of identifying, within a large document collection, a subset of documents whose content is most relevant to user's need is called as",
    options: [
      {
        id: "a",
        text: "Information retrieval",
      },
      {
        id: "b",
        text: "Information management",
      },
      {
        id: "c",
        text: "Systematic Review",
      },
      {
        id: "d",
        text: "Narrative Review",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q69",
    question:
      "The query system in the information retrieval process of literature review is",
    options: [
      {
        id: "a",
        text: "User defined",
      },
      {
        id: "b",
        text: "Provider defined",
      },
      {
        id: "c",
        text: "Conditional",
      },
      {
        id: "d",
        text: "Not structured",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q70",
    question: "In the National Library of Medicine (NLM), MeSH means",
    options: [
      {
        id: "a",
        text: "Medical Services Heading",
      },
      {
        id: "b",
        text: "Medical Subject Heading",
      },
      {
        id: "c",
        text: "Medical Subject Helpline",
      },
      {
        id: "d",
        text: "Medicine Services Helpline",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q71",
    question:
      "In literature review method of identifying studies which are unbiased and valid is known as critical appraisal.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q72",
    question:
      "Choose the correct sequence of the steps of systematically doing literature search from below",
    options: [
      {
        id: "a",
        text: "Organize the information, identify the lacunae, develop the research question, synthesize the results",
      },
      {
        id: "b",
        text: "Identify the lacunae, develop the research question, synthesize the results, organize the information",
      },
      {
        id: "c",
        text: "Develop the research question, synthesize the results, organize the information, identify the lacunae",
      },
      {
        id: "d",
        text: "Organize information, synthesize the results, identify the lacunae, develop the research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q73",
    question: "All the following about literature review is correct EXCEPT",
    options: [
      {
        id: "a",
        text: "It identifies lacunae in the existing knowledge about a topic",
      },
      {
        id: "b",
        text: "It saves valuable time for a researcher",
      },
      {
        id: "c",
        text: "It helps the researcher in arriving the conclusion of a study",
      },
      {
        id: "d",
        text: "It suggests the researcher about new research topics",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q74",
    question:
      "While drafting a scientific manuscript, literature review is useful on the following section EXCEPT",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Methods",
      },
      {
        id: "c",
        text: "Results",
      },
      {
        id: "d",
        text: "Discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q75",
    question: "Which of the following about PubMed is incorrect?",
    options: [
      {
        id: "a",
        text: "PubMed comprises more than 25 million citations for biomedical literature",
      },
      {
        id: "b",
        text: "Citations may include links to full-text article from PubMed Central",
      },
      {
        id: "c",
        text: "PubMed is developed and maintained by the National Centre for Biotechnology Information (NCBI), at the U.S. National Library of Medicine (NLM)",
      },
      {
        id: "d",
        text: "PubMed is a paid service provider for searching of literature",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q76",
    question: "All the following are examples of databases",
    options: [
      {
        id: "a",
        text: "MEDLINE",
      },
      {
        id: "b",
        text: "EMBASE",
      },
      {
        id: "c",
        text: "CINAHL",
      },
      {
        id: "d",
        text: "Google scholar",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a", "b", "c", "d"],
  },
  {
    id: "q77",
    question:
      "Literature searches are important to do at the start of a project; and do not need to continue throughout the project.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q78",
    question:
      "Which of the following search query should be used to find the articles on chest pain other than angina?",
    options: [
      {
        id: "a",
        text: "Chest pain AND angina",
      },
      {
        id: "b",
        text: "Chest pain OR angina",
      },
      {
        id: "c",
        text: "Chest pain NOT angina",
      },
      {
        id: "d",
        text: "Chest pain EXCEPT angina",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q79",
    question:
      "A researcher wants to assess effects of polyunsaturated fatty acids (PUFA) on diabetes prognosis. For this, the researcher searches related articles in PubMed and Google scholar. This process is known as",
    options: [
      {
        id: "a",
        text: "Information retrieval",
      },
      {
        id: "b",
        text: "Indexing",
      },
      {
        id: "c",
        text: "Critical appraisal",
      },
      {
        id: "d",
        text: "Data management",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q80",
    question: "Which of the following about MeSH is incorrect?",
    options: [
      {
        id: "a",
        text: "MeSH thesaurus is controlled vocabulary produced by the National Library of Medicine",
      },
      {
        id: "b",
        text: "It consists of sets of terms naming descriptors in a hierarchical structure that permits searching at various levels of specificity",
      },
      {
        id: "c",
        text: "It is used for indexing and searching of biomedical and health-related information",
      },
      {
        id: "d",
        text: "MeSH is used for EMBASE database",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q81",
    question:
      "Which of the following is INCORRECT about literature review for a proposed study?",
    options: [
      {
        id: "a",
        text: "Begins with a systematic literature search",
      },
      {
        id: "b",
        text: "Involves critical appraisal of retrieved studies",
      },
      {
        id: "c",
        text: "Presents existing knowledge concisely",
      },
      {
        id: "d",
        text: "Guides the findings of the proposed study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q82",
    question:
      "A researcher conducts a review of literature to identify a set of potentially useful articles and books related to their research topic. This process is known as",
    options: [
      {
        id: "a",
        text: "Indexing",
      },
      {
        id: "b",
        text: "Critical appraisal",
      },
      {
        id: "c",
        text: "Data management",
      },
      {
        id: "d",
        text: "Information seeking",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q83",
    question:
      "Literature review is a well thought out and organized search for all literature published on a particular topic in a library or online database.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q84",
    question:
      "Which of the following search query in PubMed will give relevant articles for the following question? “What is the burden of gastroenteritis among children?”",
    options: [
      {
        id: "a",
        text: "Gastroenteritis OR children",
      },
      {
        id: "b",
        text: "Gastroenteritis AND children",
      },
      {
        id: "c",
        text: "Gastroenteritis BUT children",
      },
      {
        id: "d",
        text: "Gastroenteritis NOT children",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q85",
    question:
      "Which of the following Boolean operator will give the highest number of results when used between two given search terms?",
    options: [
      {
        id: "a",
        text: "AND",
      },
      {
        id: "b",
        text: "NOT",
      },
      {
        id: "c",
        text: "OR",
      },
      {
        id: "d",
        text: "ALL",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q86",
    question:
      "A researcher wants to study the effect of physical activity on reduction of systolic blood pressure among patients with hypertension. The researcher has identified a subset of document which are most relevant to the research question within a large document collection. This process is known as",
    options: [
      {
        id: "a",
        text: "Information management",
      },
      {
        id: "b",
        text: "Critical appraisal",
      },
      {
        id: "c",
        text: "Information retrieval",
      },
      {
        id: "d",
        text: "Literature organization",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q87",
    question:
      "The organized collection of articles, abstracts, scientific proceedings, books, and citations used for the purpose of literature review, is known as",
    options: [
      {
        id: "a",
        text: "Database",
      },
      {
        id: "b",
        text: "Data management",
      },
      {
        id: "c",
        text: "Critical appraisal",
      },
      {
        id: "d",
        text: "Index",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q88",
    question:
      "Which of the following does not satisfy the ethical principles in conducting a literature review?",
    options: [
      {
        id: "a",
        text: "Results of previous studies are presented without distortion",
      },
      {
        id: "b",
        text: "Weaknesses of previous studies are highlighted",
      },
      {
        id: "c",
        text: "Previous studies are accurately cited",
      },
      {
        id: "d",
        text: "Reputation of study authors are questioned",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q89",
    question:
      "For which of the following purpose is the Boolean operator ‘OR’ commonly used in literature search?",
    options: [
      {
        id: "a",
        text: "Connecting synonyms of one key concept",
      },
      {
        id: "b",
        text: "Connecting different key concepts",
      },
      {
        id: "c",
        text: "Connecting keywords which need to be excluded",
      },
      {
        id: "d",
        text: "Connecting keywords to narrow down the results",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q90",
    question:
      "Medical Subject Headings is a controlled vocabulary thesaurus used for indexing articles in",
    options: [
      {
        id: "a",
        text: "PubMed",
      },
      {
        id: "b",
        text: "Google scholar",
      },
      {
        id: "c",
        text: "Scopus",
      },
      {
        id: "d",
        text: "Health on Net",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q91",
    question:
      "Which of the following must be considered while measuring occurrence of a disease?",
    options: [
      {
        id: "a",
        text: "The number of people affected by the disease",
      },
      {
        id: "b",
        text: "The population size from which the cases of disease arise",
      },
      {
        id: "c",
        text: "The length of the time the population is followed",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q92",
    question:
      "__________ is most useful for evaluating the impact of prevention programme",
    options: [
      {
        id: "a",
        text: "Point prevalence",
      },
      {
        id: "b",
        text: "Period prevalence",
      },
      {
        id: "c",
        text: "Case fatality",
      },
      {
        id: "d",
        text: "Incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q93",
    question: "Which one of the following statements is true?",
    options: [
      {
        id: "a",
        text: "High cure rate can increase the prevalence of a disease",
      },
      {
        id: "b",
        text: "Low case fatality can reduce the prevalence of a disease",
      },
      {
        id: "c",
        text: "Both 'a' and 'b' are true",
      },
      {
        id: "d",
        text: "High cure rate and high case fatality can reduce the prevalence of a disease",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q94",
    question: "Measures of disease frequency",
    options: [
      {
        id: "a",
        text: "Incidence",
      },
      {
        id: "b",
        text: "Prevalence",
      },
      {
        id: "c",
        text: "Birth rate",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q95",
    question: "A measure that reflects severity of an acute infectious disease",
    options: [
      {
        id: "a",
        text: "Case fatality ratio",
      },
      {
        id: "b",
        text: "Incidence rate",
      },
      {
        id: "c",
        text: "Prevalence",
      },
      {
        id: "d",
        text: "Mortality rate",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q96",
    question:
      "Incidence data can be used to measure the occurrence of disease with gradual onset",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q97",
    question:
      "This measure reflects the impact of a disease on population in terms of death",
    options: [
      {
        id: "a",
        text: "Incidence density",
      },
      {
        id: "b",
        text: "Case fatality",
      },
      {
        id: "c",
        text: "Disease specific mortality",
      },
      {
        id: "d",
        text: "Attack rate",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q98",
    question:
      "While measuring the frequency of a chronic disease in a community in terms of Incidence per 1000 persons per year, and point prevalence per 1000 persons, what is the expected pattern of incidence and prevalence?",
    options: [
      {
        id: "a",
        text: "Low prevalence, high incidence",
      },
      {
        id: "b",
        text: "High prevalence, low incidence",
      },
      {
        id: "c",
        text: "Both prevalence and incidence will be similar",
      },
      {
        id: "d",
        text: "None of the above statements are true",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q99",
    question:
      "In a study among 3400 children aged 5-10 years, 16 children were diagnosed with autistic disorder. Calculate the prevalence of autism per 1000 children",
    options: [
      {
        id: "a",
        text: "4.01",
      },
      {
        id: "b",
        text: "5.53",
      },
      {
        id: "c",
        text: "3.35",
      },
      {
        id: "d",
        text: "4.71",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q100",
    question: "Statistic used to estimate the risk of acquiring a disease",
    options: [
      {
        id: "a",
        text: "Prevalence",
      },
      {
        id: "b",
        text: "Incidence",
      },
      {
        id: "c",
        text: "Mortality rate",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q101",
    question:
      "What is the appropriate measure when a researcher wishes to know the burden of a particular disease in terms of the number of deaths it causes in a specified geographical region and population?",
    options: [
      {
        id: "a",
        text: "Incidence density",
      },
      {
        id: "b",
        text: "Case fatality",
      },
      {
        id: "c",
        text: "Attack rate",
      },
      {
        id: "d",
        text: "Disease specific mortality",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q102",
    question:
      "If health policy makers want to evaluate the impact of a prevention program, which is the appropriate measure to be considered?",
    options: [
      {
        id: "a",
        text: "Period prevalence",
      },
      {
        id: "b",
        text: "Incidence",
      },
      {
        id: "c",
        text: "Point prevalence",
      },
      {
        id: "d",
        text: "Case fatality",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q103",
    question: "Select the correct statement among the following",
    options: [
      {
        id: "a",
        text: "Prevalence of a disease will increase when it has a high cure rate",
      },
      {
        id: "b",
        text: "Prevalence of a disease will decrease when it has a low case fatality ratio",
      },
      {
        id: "c",
        text: "Prevalence of a disease will increase when it has a low cure rate",
      },
      {
        id: "d",
        text: "Prevalence of a disease will increase when it is acute in nature",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q104",
    question:
      "What is the appropriate epidemiologic measure to determine the severity of an acute disease?",
    options: [
      {
        id: "a",
        text: "Incidence rate",
      },
      {
        id: "b",
        text: "Prevalence",
      },
      {
        id: "c",
        text: "Mortality rate",
      },
      {
        id: "d",
        text: "Case fatality ratio",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q105",
    question: "Cumulative incidence is otherwise known as",
    options: [
      {
        id: "a",
        text: "Attack rate",
      },
      {
        id: "b",
        text: "Case fatality rate",
      },
      {
        id: "c",
        text: "Mortality rate",
      },
      {
        id: "d",
        text: "Morbidity rate",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q106",
    question:
      "The healthcare professionals working in an intensive care unit were asked whether there has been an increase in the number of new pneumonia cases. Which of the following factor(s) is inappropriate in the calculation of cumulative incidence?",
    options: [
      {
        id: "a",
        text: "Number of new cases of pneumonia during a specific period of time",
      },
      {
        id: "b",
        text: "Total number of people at risk of developing the disease in that population during the same period of time",
      },
      {
        id: "c",
        text: "Pre-existing cases of pneumonia",
      },
      {
        id: "d",
        text: "Both ‘a’ and ‘b’",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q107",
    question:
      "When measuring the frequency for an acute infectious disease in a community in terms of incidence per 1000 persons per year and point prevalence per 1000 persons, how will the pattern of incidence and prevalence be?",
    options: [
      {
        id: "a",
        text: "High prevalence",
      },
      {
        id: "b",
        text: "Low incidence",
      },
      {
        id: "c",
        text: "Both prevalence and incidence will be similar",
      },
      {
        id: "d",
        text: "Low prevalence and high incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q108",
    question:
      "Among 25000 population in a city, 105 residents were identified with Hepatitis B infection. Calculate the prevalence of Hepatitis B per 1000 population.",
    options: [
      {
        id: "a",
        text: "5.2",
      },
      {
        id: "b",
        text: "4.2",
      },
      {
        id: "c",
        text: "3.2",
      },
      {
        id: "d",
        text: "2.2",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q109",
    question:
      "Which of the following condition tends to increase the prevalence of a particular disease?",
    options: [
      {
        id: "a",
        text: "High cure rate",
      },
      {
        id: "b",
        text: "Low case fatality ratio",
      },
      {
        id: "c",
        text: "Short duration",
      },
      {
        id: "d",
        text: "Emigration of patients",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q110",
    question: "Which of the following is true about incidence density?",
    options: [
      {
        id: "a",
        text: "Numerator has number of new cases",
      },
      {
        id: "b",
        text: "Also called cumulative incidence",
      },
      {
        id: "c",
        text: "Denominator is number of persons at risk",
      },
      {
        id: "d",
        text: "Numerator has person-years at risk",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q111",
    question:
      "In a rural block with 1,00,000 population, 250 residents were identified with cardiovascular disease. Calculate the prevalence of cardiovascular disease per 1000 population.",
    options: [
      {
        id: "a",
        text: "0.2",
      },
      {
        id: "b",
        text: "0.5",
      },
      {
        id: "c",
        text: "2.5",
      },
      {
        id: "d",
        text: "25",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q112",
    question:
      "What is the appropriate epidemiologic measure to determine the burden of a disease in terms of number of cases present in a specified geographical area at a specific point in time?",
    options: [
      {
        id: "a",
        text: "Cumulative Incidence",
      },
      {
        id: "b",
        text: "Point Prevalence",
      },
      {
        id: "c",
        text: "Incidence rate",
      },
      {
        id: "d",
        text: "Case fatality ratio",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q113",
    question:
      "In a study, 300 children were followed up for a period of one year to determine the burden of acute respiratory infections (ARI). Calculate the incidence density if the total number of ARI episodes recorded was 1500.",
    options: [
      {
        id: "a",
        text: "5 episodes per child year",
      },
      {
        id: "b",
        text: "0.2 episodes per child year",
      },
      {
        id: "c",
        text: "3 episodes per child year",
      },
      {
        id: "d",
        text: "0.5 episodes per child year",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q114",
    question:
      "A total of 100 people with hypertension were followed up for 3 years to observe for the development of myocardial infarction in a cohort study. At the end of first year, 10 people developed myocardial infarction, at the end of second year, 10 people left the study and at the end of third year, another 10 people developed myocardial infarction. Calculate the total person-years of observation in this study?",
    options: [
      {
        id: "a",
        text: "250",
      },
      {
        id: "b",
        text: "260",
      },
      {
        id: "c",
        text: "270",
      },
      {
        id: "d",
        text: "280",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q115",
    question:
      "During a one-year follow-up, a psychiatrist determined the burden of suicidal ideation among 100 patients with drug addiction. Seven patients had previous history of suicidal ideation and 20 patients developed it for the first time. What is the incidence of suicidal ideation in the study population?",
    options: [
      {
        id: "a",
        text: "7% per year",
      },
      {
        id: "b",
        text: "20% per year",
      },
      {
        id: "c",
        text: "21.5% per year",
      },
      {
        id: "d",
        text: "27 per year",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q116",
    question:
      "In a food poisoning outbreak, 75 people were affected. Among them, 50 were hospitalized, and two died. Calculate the case-fatality ratio.",
    options: [
      {
        id: "a",
        text: "1.2%",
      },
      {
        id: "b",
        text: "2.7%",
      },
      {
        id: "c",
        text: "4%",
      },
      {
        id: "d",
        text: "8%",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q117",
    question:
      "Which of the following is NOT required for calculating prevalence of a disease?",
    options: [
      {
        id: "a",
        text: "Pre-existing cases of the disease",
      },
      {
        id: "b",
        text: "New cases of the disease",
      },
      {
        id: "c",
        text: "Total number of people at risk",
      },
      {
        id: "d",
        text: "Total person-time of observation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q118",
    question:
      "Which of the following condition tends to reduce the prevalence of a particular disease?",
    options: [
      {
        id: "a",
        text: "High cure rate",
      },
      {
        id: "b",
        text: "Low case fatality ratio",
      },
      {
        id: "c",
        text: "Improved case detection rate",
      },
      {
        id: "d",
        text: "Immigration of diseased people",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q119",
    question:
      "In which of the following conditions, prevalence is an appropriate measure of disease frequency?",
    options: [
      {
        id: "a",
        text: "Common cold episodes in elderly",
      },
      {
        id: "b",
        text: "Number of exacerbations in asthma patients",
      },
      {
        id: "c",
        text: "Proportion of foot ulcers in Diabetes Mellitus",
      },
      {
        id: "d",
        text: "Number of diarrhoea episodes in children",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q120",
    question: "Which of the following is INCORRECT about case fatality?",
    options: [
      {
        id: "a",
        text: "It reflects the severity of a disease",
      },
      {
        id: "b",
        text: "High case fatality indicates poor prognosis",
      },
      {
        id: "c",
        text: "It relates the number of deaths to the number of cases of a disease",
      },
      {
        id: "d",
        text: "It is a true rate",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q121",
    question:
      "Study design(s) useful for describing uncommon clinical manifestations",
    options: [
      {
        id: "a",
        text: "Case reports",
      },
      {
        id: "b",
        text: "Case series",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "Ecological study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q122",
    question: "Cross-sectional studies are used to",
    options: [
      {
        id: "a",
        text: "Estimate prevalence",
      },
      {
        id: "b",
        text: "Generate hypotheses",
      },
      {
        id: "c",
        text: "Describe trends",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q123",
    question: "In a cross-sectional study, we can observe one or more outcomes",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q124",
    question:
      "Which one of the following is useful to measure the burden or magnitude of a disease or risk factor?",
    options: [
      {
        id: "a",
        text: "Case-control study",
      },
      {
        id: "b",
        text: "Cross-sectional study",
      },
      {
        id: "c",
        text: "Case report",
      },
      {
        id: "d",
        text: "Case series",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q125",
    question:
      "Which of the following is wrong about descriptive study designs?",
    options: [
      {
        id: "a",
        text: "Describe the study outcome for 1 group",
      },
      {
        id: "b",
        text: "Compare the study outcomes for 2 group",
      },
      {
        id: "c",
        text: "Calculate the incidence for surveillance data",
      },
      {
        id: "d",
        text: "Calculate prevalence for crosssectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q126",
    question:
      "Descriptive epidemiology study designs can answer all of the following questions EXCEPT:",
    options: [
      {
        id: "a",
        text: "Who?",
      },
      {
        id: "b",
        text: "When?",
      },
      {
        id: "c",
        text: "Where?",
      },
      {
        id: "d",
        text: "Why?",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q127",
    question:
      "Which one of the following study designs does not employ comparison groups to answer the primary study objectives?",
    options: [
      {
        id: "a",
        text: "Cross-sectional study",
      },
      {
        id: "b",
        text: "Cohort study",
      },
      {
        id: "c",
        text: "Ecological study",
      },
      {
        id: "d",
        text: "Clinical trials",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q128",
    question: "Unit of observation in the cross-sectional study is",
    options: [
      {
        id: "a",
        text: "Individual",
      },
      {
        id: "b",
        text: "Group",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q129",
    question: "Case reports can include presentation of",
    options: [
      {
        id: "a",
        text: "Unique features/symptoms of a disease",
      },
      {
        id: "b",
        text: "Rare manifestation of common disease",
      },
      {
        id: "c",
        text: "New or unfamiliar diseases",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q130",
    question: "Advantage of the ecological study is",
    options: [
      {
        id: "a",
        text: "Relate rate of disease and exposure",
      },
      {
        id: "b",
        text: "Useful to test hypothesis",
      },
      {
        id: "c",
        text: "Useful to study rare diseases",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q131",
    question:
      "A researcher can assess the following by conducting a descriptive study EXCEPT",
    options: [
      {
        id: "a",
        text: "Population in which the disease was prevalent",
      },
      {
        id: "b",
        text: "Period in which the disease occurred",
      },
      {
        id: "c",
        text: "Risk factors of the disease",
      },
      {
        id: "d",
        text: "Place distribution of the disease",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q132",
    question:
      "The following study design provides group exposure and group response/outcome without knowing the individual exposure and response for a specific health problem",
    options: [
      {
        id: "a",
        text: "Ecological study",
      },
      {
        id: "b",
        text: "Cross sectional survey",
      },
      {
        id: "c",
        text: "Case report",
      },
      {
        id: "d",
        text: "Case series",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q133",
    question:
      "Which of the following study design will be helpful if the department of health wants to know the burden of a particular disease?",
    options: [
      {
        id: "a",
        text: "Ecological study",
      },
      {
        id: "b",
        text: "Cross sectional survey",
      },
      {
        id: "c",
        text: "Case series",
      },
      {
        id: "d",
        text: "Case report",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q134",
    question:
      "A clinician comes across an unusual presentation of a particular neurological disorder. If the clinician describes this single case in detail and publishes the same in a journal, then it will be called",
    options: [
      {
        id: "a",
        text: "Analytical study",
      },
      {
        id: "b",
        text: "Case report",
      },
      {
        id: "c",
        text: "Cross sectional survey",
      },
      {
        id: "d",
        text: "Ecological study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q135",
    question: "The advantage of an ecological study is that",
    options: [
      {
        id: "a",
        text: "It is analytical in nature",
      },
      {
        id: "b",
        text: "It will cover individual level information on risk factors and disease",
      },
      {
        id: "c",
        text: "It will be useful to test hypotheses",
      },
      {
        id: "d",
        text: "It will be useful to generate hypotheses",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q136",
    question:
      "In a tertiary care hospital, a surgeon collected information on quality of life and outcome among a small group of (about 15) post-operative patients after using a novel surgical device. But this is not sufficient to establish the efficacy of the surgical device because",
    options: [
      {
        id: "a",
        text: "There is no comparison group",
      },
      {
        id: "b",
        text: "There is no information of risk factors",
      },
      {
        id: "c",
        text: "We do not have details of the outcome",
      },
      {
        id: "d",
        text: "We do not have individual level data",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q137",
    question: "Population census is a",
    options: [
      {
        id: "a",
        text: "Cross sectional survey",
      },
      {
        id: "b",
        text: "Ecological study",
      },
      {
        id: "c",
        text: "Analytical study",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q138",
    question: "One of the major limitations of a crosssectional study is that",
    options: [
      {
        id: "a",
        text: "It is time consuming",
      },
      {
        id: "b",
        text: "It has lower validity",
      },
      {
        id: "c",
        text: "It does not establish disease etiology",
      },
      {
        id: "d",
        text: "It requires a large sample size",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q139",
    question: "Characteristic of a cross sectional study is that",
    options: [
      {
        id: "a",
        text: "We can calculate the incidence of a disease",
      },
      {
        id: "b",
        text: "We can test a hypotheses",
      },
      {
        id: "c",
        text: "It is difficult to conduct",
      },
      {
        id: "d",
        text: "Exposure and outcome are assessed at the same time",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q140",
    question:
      "If a researcher wishes to estimate the incidence of Myocardial infarction cases among a group of women using oral contraceptive pills followed up for 10year, the researcher has to carry out",
    options: [
      {
        id: "a",
        text: "Case series",
      },
      {
        id: "b",
        text: "Cohort study",
      },
      {
        id: "c",
        text: "Cross sectional study",
      },
      {
        id: "d",
        text: "Ecological study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q141",
    question: "Case series are useful",
    options: [
      {
        id: "a",
        text: "To estimate burden of a disease",
      },
      {
        id: "b",
        text: "To determine risk factors of a disease",
      },
      {
        id: "c",
        text: "To determine efficacy of a new drug",
      },
      {
        id: "d",
        text: "To describe uncommon clinical manifestation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q142",
    question: "All the following are true about crosssectional survey, EXCEPT",
    options: [
      {
        id: "a",
        text: "Individual is the unit of observation",
      },
      {
        id: "b",
        text: "Involves only incident cases",
      },
      {
        id: "c",
        text: "Estimate the burden of a disease",
      },
      {
        id: "d",
        text: "It can be used to generate hypothesis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q143",
    question:
      "A detailed presentation of a single case which is rare and unfamiliar, is called",
    options: [
      {
        id: "a",
        text: "Case report",
      },
      {
        id: "b",
        text: "Case series",
      },
      {
        id: "c",
        text: "Ecological study",
      },
      {
        id: "d",
        text: "Cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q144",
    question: "Which of the following is INCORRECT about ecological study?",
    options: [
      {
        id: "a",
        text: "It relates the rate of disease and frequency of exposure",
      },
      {
        id: "b",
        text: "It is an example of observational study",
      },
      {
        id: "c",
        text: "It uses individual level data",
      },
      {
        id: "d",
        text: "It helps in generating hypothesis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q145",
    question: "Which of the following is NOT applicable in a case study?",
    options: [
      {
        id: "a",
        text: "Clinical features",
      },
      {
        id: "b",
        text: "Laboratory parameters",
      },
      {
        id: "c",
        text: "Socio-demographic background",
      },
      {
        id: "d",
        text: "Incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q146",
    question:
      "To determine the association between air pollution and male infertility, data on air quality index and prevalence of male infertility was collected for 183 countries for the year 2019. What best describes the study?",
    options: [
      {
        id: "a",
        text: "Case report",
      },
      {
        id: "b",
        text: "Case series",
      },
      {
        id: "c",
        text: "Ecological study",
      },
      {
        id: "d",
        text: "Cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q147",
    question:
      "In a medical journal, 18 cases of Creutzfeldt Jakob disease were reported from a tertiary care hospital in Sikkim. The authors of the paper gave a description of the socio-demographic, clinical, and laboratory features of the 18 patients. What best describes this study design?",
    options: [
      {
        id: "a",
        text: "Case study",
      },
      {
        id: "b",
        text: "Case series",
      },
      {
        id: "c",
        text: "Case control study",
      },
      {
        id: "d",
        text: "Ecological study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q148",
    question: "Which of the following is FALSE about cross-sectional studies?",
    options: [
      {
        id: "a",
        text: "Can be used to generate hypothesis",
      },
      {
        id: "b",
        text: "Can be used to establish temporality of association",
      },
      {
        id: "c",
        text: "Can be used to estimate disease burden",
      },
      {
        id: "d",
        text: "Can be used to identify factors associated with outcome",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q149",
    question:
      "State whether true or false. Descriptive cross-sectional study does not have a comparison group.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q150",
    question:
      "Which of the following studies can be used to identify the factors associated with an outcome?",
    options: [
      {
        id: "a",
        text: "Descriptive cross-sectional study",
      },
      {
        id: "b",
        text: "Analytical cross-sectional study",
      },
      {
        id: "c",
        text: "Case study",
      },
      {
        id: "d",
        text: "Case series",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q151",
    question:
      "Exposure is not assigned by the investigator in the following study design",
    options: [
      {
        id: "a",
        text: "Cohort",
      },
      {
        id: "b",
        text: "Case-control",
      },
      {
        id: "c",
        text: "Cross-sectional",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q152",
    question:
      "Which of the following statement(s) is true about the cohort study?",
    options: [
      {
        id: "a",
        text: "It is not suitable for disease with a long latency period",
      },
      {
        id: "b",
        text: "Loss to follow up can introduce bias",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q153",
    question:
      "Which of the following study design is better suited to demonstrate a temporal association between exposure and disease?",
    options: [
      {
        id: "a",
        text: "Cross-sectional study",
      },
      {
        id: "b",
        text: "Case-control study",
      },
      {
        id: "c",
        text: "Cohort study",
      },
      {
        id: "d",
        text: "Ecological study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q154",
    question: "Relative risk of more than 1 indicates",
    options: [
      {
        id: "a",
        text: "Incidence in unexposed is higher than exposed",
      },
      {
        id: "b",
        text: "Incidence in exposed and unexposed are same",
      },
      {
        id: "c",
        text: "Incidence in exposed is higher than unexposed",
      },
      {
        id: "d",
        text: "Relative risk is significant",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q155",
    question:
      "If the odds of exposure among cases is lower than the odds of exposure among the controls, the odds ratio will be",
    options: [
      {
        id: "a",
        text: "More than 1",
      },
      {
        id: "b",
        text: "Less than 1",
      },
      {
        id: "c",
        text: "It depends on other factors",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q156",
    question: "All babies born in a particular year will form a birth cohort",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q157",
    question: "Cohort study is suitable for rare diseases",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q158",
    question:
      "Which of the following is NOT true regarding case-control study? i. Appropriate for study of rare outcome ii. More time consuming than cohort study iii. Multiple exposures can be examined iv. Relatively expensive compared to cohort study",
    options: [
      {
        id: "a",
        text: "Both (i) and (ii)",
      },
      {
        id: "b",
        text: "Both (ii) and (iii)",
      },
      {
        id: "c",
        text: "Both (ii) and (iv)",
      },
      {
        id: "d",
        text: "Both (iii) and (iv)",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q159",
    question:
      "What is an appropriate measure of statistical association in a cohort study?",
    options: [
      {
        id: "a",
        text: "Prevalence ratio",
      },
      {
        id: "b",
        text: "Risk ratio",
      },
      {
        id: "c",
        text: "Odds ratio",
      },
      {
        id: "d",
        text: "Pearson's correlation coefficient",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q160",
    question:
      "The entire population of a given community is screened and all those judged as being free of Colon cancer are questioned extensively about their diet. These people are then followed-up for several years to see whether their eating habits will predict their risk of developing Colon cancer - This is an example of",
    options: [
      {
        id: "a",
        text: "Case-control study",
      },
      {
        id: "b",
        text: "Clinical trial",
      },
      {
        id: "c",
        text: "Cross-sectional study",
      },
      {
        id: "d",
        text: "Cohort study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q161",
    question:
      "Exposure is assigned by the investigator in which of the following epidemiological study?",
    options: [
      {
        id: "a",
        text: "Case-control",
      },
      {
        id: "b",
        text: "Cross-sectional",
      },
      {
        id: "c",
        text: "Experimental",
      },
      {
        id: "d",
        text: "Cohort",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q162",
    question:
      "When a group of people with defined characteristics are followed up to determine incidence is known as",
    options: [
      {
        id: "a",
        text: "Case series",
      },
      {
        id: "b",
        text: "Cohort",
      },
      {
        id: "c",
        text: "Case control",
      },
      {
        id: "d",
        text: "Experimental",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q163",
    question: "Relative risk is a",
    options: [
      {
        id: "a",
        text: "Rate",
      },
      {
        id: "b",
        text: "Ratio",
      },
      {
        id: "c",
        text: "Proportion",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q164",
    question: "Relative risk of one in a cohort study indicates",
    options: [
      {
        id: "a",
        text: "Incidence in unexposed is higher than exposed",
      },
      {
        id: "b",
        text: "Incidence in exposed is higher than unexposed",
      },
      {
        id: "c",
        text: "Relative risk is significant",
      },
      {
        id: "d",
        text: "Incidence in the exposed and unexposed groups are same",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q165",
    question:
      "Women aged above 35 years were screened for the HPV (Human papilloma virus) infection and those who had HPV infection were then followed for several years to predict the risk of developing cervical cancer. This study is known as",
    options: [
      {
        id: "a",
        text: "Prospective cohort",
      },
      {
        id: "b",
        text: "Retrospective cohort",
      },
      {
        id: "c",
        text: "Case control",
      },
      {
        id: "d",
        text: "Cross sectional",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q166",
    question:
      "Which of the following is appropriate regarding a cohort study? i. Multiple exposures can be examined ii. Appropriate for studying rare exposures iii. Expensive and time consuming iv. Appropriate for studying rare diseases",
    options: [
      {
        id: "a",
        text: "Both (i) and (ii)",
      },
      {
        id: "b",
        text: "Both (iii) and (iv)",
      },
      {
        id: "c",
        text: "Both (ii) and (iv)",
      },
      {
        id: "d",
        text: "Both (ii) and (iii)",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q167",
    question:
      "Which of the following statement regarding the cohort study is FALSE?",
    options: [
      {
        id: "a",
        text: "Suitable to study a disease with long latency period",
      },
      {
        id: "b",
        text: "Loss to follow up can introduce bias",
      },
      {
        id: "c",
        text: "Relative risk can be calculated",
      },
      {
        id: "d",
        text: "Temporal association with the risk factor can be established",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q168",
    question: "Odds ratio of more than one indicates",
    options: [
      {
        id: "a",
        text: "Odds of exposure among cases is lower than the odds of exposure among the controls",
      },
      {
        id: "b",
        text: "Odds of exposure among cases is equal to the odds of exposure among the controls",
      },
      {
        id: "c",
        text: "Odds of exposure among cases is higher than the odds of exposure among the controls",
      },
      {
        id: "d",
        text: "Exposure is negatively associated with the disease",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q169",
    question:
      "If there is a comparison group in an epidemiological study design, it is called",
    options: [
      {
        id: "a",
        text: "Descriptive",
      },
      {
        id: "b",
        text: "Analytical",
      },
      {
        id: "c",
        text: "Ecological",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q170",
    question:
      "Which of the following statements about case control/cohort studies is correct?",
    options: [
      {
        id: "a",
        text: "Case control study always establishes temporal association",
      },
      {
        id: "b",
        text: "Cohort study establishes temporal association",
      },
      {
        id: "c",
        text: "Cohort has lower level of evidence than case-control",
      },
      {
        id: "d",
        text: "Do case control for rare exposures and cohort for rare diseases",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q171",
    question:
      "To determine the associated factors of anti-hypertensive drug compliance, an investigator selected 384 participants with hypertension who were undergoing treatment in a tertiary care hospital. The investigator collected the details on the socio-economic background of the participants and took history regarding the consumption of medicines in the past two weeks. Then the drug compliant group and the non-compliant group were compared to identify factors associated with drug compliance. What is the type of the study design?",
    options: [
      {
        id: "a",
        text: "Case control study",
      },
      {
        id: "b",
        text: "Prospective cohort study",
      },
      {
        id: "c",
        text: "Case study",
      },
      {
        id: "d",
        text: "Analytical cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q172",
    question:
      "A gynaecology resident intends to determine the association between intrauterine device (IUD) use and risk of extrauterine pregnancy. The investigator recruited 100 cases of extrauterine pregnancy and 200 participants who had intrauterine pregnancy as controls from the obstetrics ward of a tertiary care hospital over a period of 2 years. Both cases and controls were interviewed about the history of IUD use. Among the cases, 6 participants had history of IUD use and among controls, 4 had history of IUD use. Calculate the odds ratio of extrauterine pregnancies among women with history of IUD use?",
    options: [
      {
        id: "a",
        text: "0.32",
      },
      {
        id: "b",
        text: "1.39",
      },
      {
        id: "c",
        text: "3.12",
      },
      {
        id: "d",
        text: "0.72",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q173",
    question:
      "An investigator conducted a case control study with psoriasis patients as cases and other skin disease patients as controls. Those having hypertension were considered as exposed and nonhypertensives as non-exposed. The study found an odds ratio of 1.45. Which of the following is correct?",
    options: [
      {
        id: "a",
        text: "Psoriasis is positively associated with hypertension",
      },
      {
        id: "b",
        text: "Odds of hypertension among psoriasis patients is lower than the odds of hypertension among patients without psoriasis",
      },
      {
        id: "c",
        text: "Odds of psoriasis among hypertensive patients is lower than the odds of psoriasis among non-hypertensives",
      },
      {
        id: "d",
        text: "Hypertension is a causative factor of psoriasis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q174",
    question:
      "A prospective cohort study was conducted to determine the association between coffee consumption and risk of pancreatitis among 10000 healthy participants. Among the participants 3500 participants consumed coffee, whereas 6500 participants did not. After a follow up of 10 years 85 participants in the coffee consumption group developed pancreatitis, whereas among the noncoffee consumption group 130 in developed pancreatitis. Calculate the relative risk of pancreatitis due to coffee consumption.",
    options: [
      {
        id: "a",
        text: "0.04",
      },
      {
        id: "b",
        text: "0.85",
      },
      {
        id: "c",
        text: "1.21",
      },
      {
        id: "d",
        text: "1.50",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q175",
    question: "All the following are elements of a cohort study, EXCEPT",
    options: [
      {
        id: "a",
        text: "It involves calculation of incidence rate",
      },
      {
        id: "b",
        text: "It proceeds from exposure to outcome",
      },
      {
        id: "c",
        text: "It involves randomization of participants",
      },
      {
        id: "d",
        text: "It involves follow-up of the participants",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q176",
    question:
      "All the following are limitations of a case control study, EXCEPT",
    options: [
      {
        id: "a",
        text: "It can introduce recall bias",
      },
      {
        id: "b",
        text: "Incidence of disease cannot be determined",
      },
      {
        id: "c",
        text: "Selection of appropriate control group may be difficult",
      },
      {
        id: "d",
        text: "It can introduce attrition bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q177",
    question:
      "Using medical records from a tertiary care cancer hospital, a researcher collected data on occupational exposure and lung carcinoma on patients admitted between 2000 and 2010. He classified the patients who had history of working in coal mines as exposed and others as unexposed. He then compared the frequency of lung carcinoma among the exposed and the unexposed. What best describes the study design?",
    options: [
      {
        id: "a",
        text: "Case control study",
      },
      {
        id: "b",
        text: "Retrospective cohort study",
      },
      {
        id: "c",
        text: "Cross-sectional study",
      },
      {
        id: "d",
        text: "Analytical cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q178",
    question:
      "A paediatrician recruited 120 children with Crohn’s disease and their matched sibling controls. The researcher collected history of exclusive breastfeeding (EBF) from the mothers. Presence/ absence of EBF was compared between the diseased and the non-diseased children. Identify the study design in this research?",
    options: [
      {
        id: "a",
        text: "Case series",
      },
      {
        id: "b",
        text: "Cross-sectional study",
      },
      {
        id: "c",
        text: "Case control study",
      },
      {
        id: "d",
        text: "Cohort study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q179",
    question:
      "Which of the following is INCORRECT about selection of cases in case control study?",
    options: [
      {
        id: "a",
        text: "Cases are study participants who had the disease in the source population",
      },
      {
        id: "b",
        text: "Selection of cases should be based on the exposure status",
      },
      {
        id: "c",
        text: "Inclusion of prevalent cases can save time and money",
      },
      {
        id: "d",
        text: "Inclusion of prevalent cases may introduce survivor bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q180",
    question:
      "A multicentric study was conducted to determine the association between diabetes and cataract. The investigators recruited 1000 diabetics and 2500 nondiabetics. The participants were examined to exclude presence of cataract at the time of recruitment. They were followed once yearly for 10 years to document the development of cataract. The study found that the incidence of cataract among diabetics was more when compared with the non-diabetics. Identify the study design in this study?",
    options: [
      {
        id: "a",
        text: "Cross-sectional study",
      },
      {
        id: "b",
        text: "Case control study",
      },
      {
        id: "c",
        text: "Prospective cohort study",
      },
      {
        id: "d",
        text: "Experimental study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q181",
    question: "One of the cornerstones of the randomized controlled trials is",
    options: [
      {
        id: "a",
        text: "Recruitment",
      },
      {
        id: "b",
        text: "Randomization",
      },
      {
        id: "c",
        text: "Blinding",
      },
      {
        id: "d",
        text: "Placebo",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q182",
    question: "Randomized clinical trials can be best described as",
    options: [
      {
        id: "a",
        text: "Experimental studies",
      },
      {
        id: "b",
        text: "Analytic studies",
      },
      {
        id: "c",
        text: "Descriptive studies",
      },
      {
        id: "d",
        text: "Observational studies",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q183",
    question: "Which of the following is/are true in a clinical trial?",
    options: [
      {
        id: "a",
        text: "Sample size determination",
      },
      {
        id: "b",
        text: "Approval from regulatory authority",
      },
      {
        id: "c",
        text: "Agreement between the investigators and sponsors",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q184",
    question:
      "A pharmacologically inactive agent that investigators administer to participants in the control group of a trial",
    options: [
      {
        id: "a",
        text: "Comparator drug",
      },
      {
        id: "b",
        text: "Placebo",
      },
      {
        id: "c",
        text: "Conjugate",
      },
      {
        id: "d",
        text: "Drug under investigation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q185",
    question:
      "Key methodological components of a Randomized Controlled Trials are",
    options: [
      {
        id: "a",
        text: "Use of a control to which the experimental intervention is compared",
      },
      {
        id: "b",
        text: "Random assignment of participants to intervention",
      },
      {
        id: "c",
        text: "Taking informed consent from all study participants",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q186",
    question: "Double-blinding in a clinical trial involves",
    options: [
      {
        id: "a",
        text: "Participants before and after study",
      },
      {
        id: "b",
        text: "Participants and investigators",
      },
      {
        id: "c",
        text: "Investigators and analysts",
      },
      {
        id: "d",
        text: "Participants and analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q187",
    question: "The purpose of a double-blinding in a clinical trial is to",
    options: [
      {
        id: "a",
        text: "Achieve comparability of all arms of a clinical trial",
      },
      {
        id: "b",
        text: "Avoid observer and participant bias",
      },
      {
        id: "c",
        text: "Avoid observer bias and sampling variation",
      },
      {
        id: "d",
        text: "Avoid subject bias and sampling variation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q188",
    question: "What is the purpose of randomization in a clinical trial?",
    options: [
      {
        id: "a",
        text: "Get better power for data analysis",
      },
      {
        id: "b",
        text: "Generalizing the study findings to the population which is not studied",
      },
      {
        id: "c",
        text: "Achieve balance in baseline characteristics",
      },
      {
        id: "d",
        text: "Guarantee that the statistical tests have valid significance levels",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q189",
    question:
      "Which phase of a clinical trial is referred to as post-marketing surveillance?",
    options: [
      {
        id: "a",
        text: "Phase 1",
      },
      {
        id: "b",
        text: "Phase 2",
      },
      {
        id: "c",
        text: "Phase 3",
      },
      {
        id: "d",
        text: "Phase 4",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q190",
    question:
      "Long-term adverse effects and efficacy of a new drug can be tested in which of the following phases of a clinical trial?",
    options: [
      {
        id: "a",
        text: "Phase 1",
      },
      {
        id: "b",
        text: "Phase 2",
      },
      {
        id: "c",
        text: "Phase 3",
      },
      {
        id: "d",
        text: "Phase 4",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q191",
    question:
      "Which of the following is incorrect in case of a clinical trial?",
    options: [
      {
        id: "a",
        text: "All clinical trials must be blinded",
      },
      {
        id: "b",
        text: "Randomization is a critically important step in a clinical trial",
      },
      {
        id: "c",
        text: "All clinical trials must be approved by Institutional Ethics Committee before initiation",
      },
      {
        id: "d",
        text: "It is mandatory to register clinical trials with Clinical Trials Registry of Indian",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q192",
    question:
      "Which of the following procedures ensure safety of the clinical trial participants? a. Adverse events reporting b. Serious adverse events reporting c. Periodic follow-up d. Review by Data Safety Monitoring Board",
    options: [
      {
        id: "a",
        text: "'a', 'b', 'c', and 'd'",
      },
      {
        id: "b",
        text: "'a', 'b' and 'c'",
      },
      {
        id: "c",
        text: "'a' and 'b'",
      },
      {
        id: "d",
        text: "Only 'a'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q193",
    question: "All the following correctly describe a clinical trial, except",
    options: [
      {
        id: "a",
        text: "It has all advantages of a cohort study",
      },
      {
        id: "b",
        text: "It is possible to analyze the confounders",
      },
      {
        id: "c",
        text: "Loss to follow up of study participants does not affect the study outcome",
      },
      {
        id: "d",
        text: "Appropriate implemented informed consent procedure as well as long-term care and support to trial participants help to overcome several ethical concerns",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q194",
    question:
      "Which of the following can be considered as an advantage of a double blinding in a randomized controlled trial?",
    options: [
      {
        id: "a",
        text: "Equally distributes known and unknown confounders in experiment and control arm",
      },
      {
        id: "b",
        text: "Ensures that participants adhere to the protocol",
      },
      {
        id: "c",
        text: "Gives benefits of an intervention to some of the study participants",
      },
      {
        id: "d",
        text: "Prevent bias that arises from researchers being able to influence the data due to knowledge of allocated groups",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q195",
    question: "Biased outcome ascertainment results from:",
    options: [
      {
        id: "a",
        text: "Participants reporting symptoms or outcomes differently",
      },
      {
        id: "b",
        text: "Investigators eliciting symptoms or outcomes following a standardized technique",
      },
      {
        id: "c",
        text: "None of the above",
      },
      {
        id: "d",
        text: 'Both "a" and "b"',
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q196",
    question: "In a clinical trial, what is the main purpose of randomization?",
    options: [
      {
        id: "a",
        text: "To get more power for data analysis",
      },
      {
        id: "b",
        text: "To reduce investigator bias",
      },
      {
        id: "c",
        text: "To get groups with comparable baseline characteristics",
      },
      {
        id: "d",
        text: "To ensure optimum number of participants in each trial arm",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q197",
    question:
      "Which of the following can eliminate the problem of Co-intervention?",
    options: [
      {
        id: "a",
        text: "Random sampling",
      },
      {
        id: "b",
        text: "Allocation concealment",
      },
      {
        id: "c",
        text: "Informed consent",
      },
      {
        id: "d",
        text: "Blinding",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q198",
    question: "Which of the following is not true in case of a clinical trial?",
    options: [
      {
        id: "a",
        text: "Clinical trials are planned experiments designed to assess the efficacy of an intervention",
      },
      {
        id: "b",
        text: "Clinical trials usually involve comparing the outcomes in two or more groups of individuals",
      },
      {
        id: "c",
        text: "Clinical trials are usually free from selection bias",
      },
      {
        id: "d",
        text: "Clinical trials are usually prospective in nature",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q199",
    question:
      "Which of the following trials assesses effectiveness of a new vaccine?",
    options: [
      {
        id: "a",
        text: "Phase 1 trial done in healthy volunteers",
      },
      {
        id: "b",
        text: "Phase 2 trial done in a susceptible population",
      },
      {
        id: "c",
        text: "Phase 3 trial done in healthy volunteers",
      },
      {
        id: "d",
        text: "Phase 3 trial done in a susceptible population",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q200",
    question:
      "Which of the following is not true about a randomized control trial?",
    options: [
      {
        id: "a",
        text: "Baseline characteristics of intervention and control groups must be similar",
      },
      {
        id: "b",
        text: "Investigator bias can be minimized by double blinding",
      },
      {
        id: "c",
        text: "The sample size depends on the hypothesis being tested",
      },
      {
        id: "d",
        text: "Drop outs should be excluded from the analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q201",
    question:
      "State whether true or false. In a randomized controlled trial, the investigator is unaware of the sequence of allocation of the participants to one of the study arms before and until the assignment is complete. This process is known as allocation concealment.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q202",
    question:
      "Which of the following is NOT a feature of randomized controlled trials?",
    options: [
      {
        id: "a",
        text: "Simple random sampling",
      },
      {
        id: "b",
        text: "Randomization",
      },
      {
        id: "c",
        text: "Allocation concealment",
      },
      {
        id: "d",
        text: "Blinding",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q203",
    question:
      "A research group from a medical college in Lucknow conducted a study to assess the efficacy of a new herbal medicine for the prevention of pneumonia in elderly. What type of randomized controlled trial is this study?",
    options: [
      {
        id: "a",
        text: "Screening RCT",
      },
      {
        id: "b",
        text: "Diagnostic RCT",
      },
      {
        id: "c",
        text: "Therapeutic RCT",
      },
      {
        id: "d",
        text: "Prophylactic RCT",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q204",
    question:
      "In which type of population is a phase-I vaccine trial conducted?",
    options: [
      {
        id: "a",
        text: "Healthy volunteers",
      },
      {
        id: "b",
        text: "High risk group",
      },
      {
        id: "c",
        text: "Diseased population",
      },
      {
        id: "d",
        text: "Laboratory animals",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q205",
    question:
      "State whether true or false. Randomization is a process, where the participants have an equal chance of being assigned to any one of the study groups.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q206",
    question:
      "Which of the following is NOT an advantage of randomized controlled trials?",
    options: [
      {
        id: "a",
        text: "Provides high quality evidence",
      },
      {
        id: "b",
        text: "Controls for selection and confounding bias",
      },
      {
        id: "c",
        text: "Establishes temporality of association",
      },
      {
        id: "d",
        text: "Entails minimal ethical issues",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q207",
    question:
      "Post-marketing surveillance is done in which of the clinical trial phases?",
    options: [
      {
        id: "a",
        text: "Phase 1",
      },
      {
        id: "b",
        text: "Phase 2",
      },
      {
        id: "c",
        text: "Phase 3",
      },
      {
        id: "d",
        text: "Phase 4",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q208",
    question:
      "State whether true or false. Randomized controlled trials are retrospective in nature.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q209",
    question:
      "In a clinical trial conducted by the Orthopaedic department of a medical college in Bhubaneshwar, the investigators compared the wound healing time between conventional suturing technique and stapling technique for open fractures. The investigators, patients and data analysts were aware about the treatment assignment. What best describes this study design?",
    options: [
      {
        id: "a",
        text: "Open-label RCT",
      },
      {
        id: "b",
        text: "Single blind RCT",
      },
      {
        id: "c",
        text: "Double blind RCT",
      },
      {
        id: "d",
        text: "Triple blind RCT",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q210",
    question:
      "Blinding in a randomized controlled trial addresses which of the following biases?",
    options: [
      {
        id: "a",
        text: "Ascertainment bias",
      },
      {
        id: "b",
        text: "Recall bias",
      },
      {
        id: "c",
        text: "Volunteer bias",
      },
      {
        id: "d",
        text: "Attrition bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q211",
    question:
      "Obtaining an estimate that is generalizable to relevant study population in a research study is",
    options: [
      {
        id: "a",
        text: "External validity",
      },
      {
        id: "b",
        text: "Internal validity",
      },
      {
        id: "c",
        text: "Bias",
      },
      {
        id: "d",
        text: "Confounding",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q212",
    question:
      "Any process that tends to produce results that depart systematically from true values in a research study",
    options: [
      {
        id: "a",
        text: "Chance",
      },
      {
        id: "b",
        text: "Bias",
      },
      {
        id: "c",
        text: "Random error",
      },
      {
        id: "d",
        text: "Effect Modification",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q213",
    question:
      "Systematic selection of more number of expose participants with the higher risk of outcome in a cohort study will result in",
    options: [
      {
        id: "a",
        text: "Selection bias",
      },
      {
        id: "b",
        text: "Information bias",
      },
      {
        id: "c",
        text: "Confounding",
      },
      {
        id: "d",
        text: "Random error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q214",
    question:
      "The effect of the exposure of interest on the outcome is distorted because of the effect of extraneous factors that are related to both the exposure and outcome. This phenomenon is called",
    options: [
      {
        id: "a",
        text: "Correlation effect",
      },
      {
        id: "b",
        text: "Confounding",
      },
      {
        id: "c",
        text: "Recall bias",
      },
      {
        id: "d",
        text: "Measurement error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q215",
    question: "Biases can occur during which stage of research study?",
    options: [
      {
        id: "a",
        text: "Study design",
      },
      {
        id: "b",
        text: "Study implementation",
      },
      {
        id: "c",
        text: "Data analysis",
      },
      {
        id: "d",
        text: "At any of the above stages",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q216",
    question:
      "All are true regarding measures to reduce information bias, EXCEPT",
    options: [
      {
        id: "a",
        text: "Precise operational definitions of all variables",
      },
      {
        id: "b",
        text: "Detailed measurement protocols",
      },
      {
        id: "c",
        text: "Adequate sample size",
      },
      {
        id: "d",
        text: "Training, Certification and re-certification of data collectors",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q217",
    question: "Variability in estimation due to unknown/uncontrollable factors",
    options: [
      {
        id: "a",
        text: "Chance",
      },
      {
        id: "b",
        text: "Bias",
      },
      {
        id: "c",
        text: "Confounding",
      },
      {
        id: "d",
        text: "Effect modification",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q218",
    question:
      "All are true regarding confounding in an epidemiological study, EXCEPT",
    options: [
      {
        id: "a",
        text: "May simulate an association that does not exist",
      },
      {
        id: "b",
        text: "May increase or decrease the strength of association",
      },
      {
        id: "c",
        text: "May not reveal an association that does exist",
      },
      {
        id: "d",
        text: "Always change the direction of effect",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q219",
    question:
      "The method which can used to alleviate confounding during data analysis in an epidemiological study",
    options: [
      {
        id: "a",
        text: "Multivariate analysis",
      },
      {
        id: "b",
        text: "Restriction",
      },
      {
        id: "c",
        text: "Matching",
      },
      {
        id: "d",
        text: "Randomization",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q220",
    question:
      "To reduce selection bias in case-control studies, all of the following are true EXCEPT",
    options: [
      {
        id: "a",
        text: "Use population based design",
      },
      {
        id: "b",
        text: "Apply different eligibility criteria for selecting cases and controls",
      },
      {
        id: "c",
        text: "Both cases and controls undergo the same diagnostic procedures",
      },
      {
        id: "d",
        text: "Avoid hospital based design",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q221",
    question:
      "Obtaining an accurate estimate of disease frequency and effect of exposure on health outcomes in study population pertains to",
    options: [
      {
        id: "a",
        text: "External Validity",
      },
      {
        id: "b",
        text: "Internal Validity",
      },
      {
        id: "c",
        text: "Bias",
      },
      {
        id: "d",
        text: "Confounding",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q222",
    question: "Blinding in an epidemiological study is a way to deal with",
    options: [
      {
        id: "a",
        text: "Chance",
      },
      {
        id: "b",
        text: "Selection Bias",
      },
      {
        id: "c",
        text: "Information Bias",
      },
      {
        id: "d",
        text: "Sampling Error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b", "c"],
  },
  {
    id: "q223",
    question:
      "Better recall of exposure only among the cases in a case control study can result in",
    options: [
      {
        id: "a",
        text: "Information bias",
      },
      {
        id: "b",
        text: "Confounding",
      },
      {
        id: "c",
        text: "Investigator bias",
      },
      {
        id: "d",
        text: "Selection bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q224",
    question:
      "The ability of a tool to correctly measure what it is supposed to measure is called as",
    options: [
      {
        id: "a",
        text: "Precision",
      },
      {
        id: "b",
        text: "Validity",
      },
      {
        id: "c",
        text: "Reliability",
      },
      {
        id: "d",
        text: "Consistency",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q225",
    question:
      "Bias may distort the association between exposure and outcome among the study participants",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q226",
    question:
      "A case control study was conducted to know the effect of smoking on lung cancer among hospitalized patients. The controls were recruited from patients admitted to the respiratory ward for other conditions. What type of bias will be introduced by virtue of recruiting controls from the hospital who are potentially different from the general population?",
    options: [
      {
        id: "a",
        text: "Selection bias",
      },
      {
        id: "b",
        text: "Information bias",
      },
      {
        id: "c",
        text: "Confounding",
      },
      {
        id: "d",
        text: "Random error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q227",
    question:
      "A researcher studied the effect of coffee drinking on Myocardial Infarction. The effect of coffee drinking on Myocardial Infarction was distorted because of the presence of a third factor, ie. smoking. This phenomenon is called as",
    options: [
      {
        id: "a",
        text: "Correlation effect",
      },
      {
        id: "b",
        text: "Confounding",
      },
      {
        id: "c",
        text: "Recall bias",
      },
      {
        id: "d",
        text: "Measurement error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q228",
    question:
      "Which of the following method is used to address for known confounders at the designing stage of a study",
    options: [
      {
        id: "a",
        text: "Matching",
      },
      {
        id: "b",
        text: "Regression",
      },
      {
        id: "c",
        text: "Stratification",
      },
      {
        id: "d",
        text: "Adjusted analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q229",
    question:
      "Systematic distortion of the truth by study subjects is called as",
    options: [
      {
        id: "a",
        text: "Plagiarism",
      },
      {
        id: "b",
        text: "Chance",
      },
      {
        id: "c",
        text: "Confounding",
      },
      {
        id: "d",
        text: "Prevarication",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q230",
    question:
      "Crude association in the presence of a confounder is the actual causal association",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q231",
    question:
      "Which of the following is the best method of ensuring that the experimental and control arms in an experimental study are similar with regard to known and unknown confounders at the planning stage?",
    options: [
      {
        id: "a",
        text: "Matching",
      },
      {
        id: "b",
        text: "Randomization",
      },
      {
        id: "c",
        text: "Stratification",
      },
      {
        id: "d",
        text: "Multivariate analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q232",
    question:
      "When the study finding is generalizable to the target population, then it is",
    options: [
      {
        id: "a",
        text: "Internally valid",
      },
      {
        id: "b",
        text: "Reliable",
      },
      {
        id: "c",
        text: "Accurate",
      },
      {
        id: "d",
        text: "Externally valid",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q233",
    question:
      "Which of the following can introduce selection bias in a case control study?",
    options: [
      {
        id: "a",
        text: "Differential recall about exposure by the cases",
      },
      {
        id: "b",
        text: "Collecting data differently from the exposed and unexposed",
      },
      {
        id: "c",
        text: "Inclusion of controls not representative of the target population",
      },
      {
        id: "d",
        text: "Systematic distortion of the truth by the study participants",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q234",
    question:
      "Which of the following is TRUE about information bias in a cohort study?",
    options: [
      {
        id: "a",
        text: "It is caused by higher attrition rate among the exposed group",
      },
      {
        id: "b",
        text: "It can be caused by selecting controls from the community",
      },
      {
        id: "c",
        text: "It can be avoided by uniform outcome ascertainment",
      },
      {
        id: "d",
        text: "It can be minimised by reducing loss to follow-up",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q235",
    question:
      "Which of the following is NOT a systematic error in an epidemiological study?",
    options: [
      {
        id: "a",
        text: "Random error",
      },
      {
        id: "b",
        text: "Confounding",
      },
      {
        id: "c",
        text: "Selection bias",
      },
      {
        id: "d",
        text: "Information bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q236",
    question:
      "Which of the following measure is related to ensuring the internal validity of a study?",
    options: [
      {
        id: "a",
        text: "Using a validated study questionnaire to assess outcomes",
      },
      {
        id: "b",
        text: "Including an adequate number of study participants",
      },
      {
        id: "c",
        text: "Complying strictly with the study protocol",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q237",
    question:
      "Which of the following is FALSE about confounding in epidemiological studies?",
    options: [
      {
        id: "a",
        text: "Confounding may simulate an association when it does not exist",
      },
      {
        id: "b",
        text: "Confounding does not increase or decrease the strength of the association",
      },
      {
        id: "c",
        text: "Confounding may hide an association that exists",
      },
      {
        id: "d",
        text: "Confounding may change the direction of an exposure-outcome association",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q238",
    question:
      "Systematic collection of data by an investigator supporting an expected conclusion in an epidemiological study may result in",
    options: [
      {
        id: "a",
        text: "Confounding",
      },
      {
        id: "b",
        text: "Information bias",
      },
      {
        id: "c",
        text: "Selection bias",
      },
      {
        id: "d",
        text: "Random error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q239",
    question:
      "Which of the following is NOT a method of dealing with confounding during the design stage?",
    options: [
      {
        id: "a",
        text: "Restriction",
      },
      {
        id: "b",
        text: "Stratification",
      },
      {
        id: "c",
        text: "Matching",
      },
      {
        id: "d",
        text: "Randomization",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q240",
    question:
      "A cohort study was conducted to examine the association between obesity and cardiovascular disease. During analysis, gender was suspected to be a confounder. Which of the following methods will help in examining the confounding effect due to gender?",
    options: [
      {
        id: "a",
        text: "Matching",
      },
      {
        id: "b",
        text: "Restriction",
      },
      {
        id: "c",
        text: "Randomization",
      },
      {
        id: "d",
        text: "Multivariate regression",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q241",
    question:
      "Which methods in qualitative research use flexible interview guide?",
    options: [
      {
        id: "a",
        text: "In depth Interviews and participant observation",
      },
      {
        id: "b",
        text: "Focus Group Discussions and In-depth interviews",
      },
      {
        id: "c",
        text: "Participant Observation and focus group discussions",
      },
      {
        id: "d",
        text: "Structure interviews and surveys",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q242",
    question:
      "Which of the following study designs can be used as a tool a generate ideas/hypotheses?",
    options: [
      {
        id: "a",
        text: "Qualitative study",
      },
      {
        id: "b",
        text: "Case-control study",
      },
      {
        id: "c",
        text: "Experimental study",
      },
      {
        id: "d",
        text: "Cohort study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q243",
    question:
      "The qualitative data analysis method in which investigators code text into categories and build theoretical models",
    options: [
      {
        id: "a",
        text: "Content analysis",
      },
      {
        id: "b",
        text: "Grounded theory",
      },
      {
        id: "c",
        text: "Schema analysis",
      },
      {
        id: "d",
        text: "Hermeneutics",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q244",
    question:
      "Open-ended, one-to-one interviews to discover interviewee's own framework of meanings",
    options: [
      {
        id: "a",
        text: "In-depth Interviews",
      },
      {
        id: "b",
        text: "Focus Group Discussions",
      },
      {
        id: "c",
        text: "Participant observation",
      },
      {
        id: "d",
        text: "Structured interviews",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q245",
    question: "Audio recordings during Focus Group Discussions",
    options: [
      {
        id: "a",
        text: "Can be done without any prior informed written consent",
      },
      {
        id: "b",
        text: "Cannot be done",
      },
      {
        id: "c",
        text: "Should always be done",
      },
      {
        id: "d",
        text: "Can be done with prior informed consent",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q246",
    question:
      "All of the following are situations in which qualitative research methods can be used, EXCEPT",
    options: [
      {
        id: "a",
        text: "Familiar and sufficiently researched matter",
      },
      {
        id: "b",
        text: "To seek the depth of understanding",
      },
      {
        id: "c",
        text: "Exploration of behaviors",
      },
      {
        id: "d",
        text: "View the social phenomenon holistically",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q247",
    question:
      "The main methods used in qualitative research method include all EXCEPT",
    options: [
      {
        id: "a",
        text: "In-depth Interviews",
      },
      {
        id: "b",
        text: "Focus Group Discussions",
      },
      {
        id: "c",
        text: "Participant observation",
      },
      {
        id: "d",
        text: "Structured questionnaire based interviews",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q248",
    question:
      "The observer becomes a part of the group or event in this method of qualitative study",
    options: [
      {
        id: "a",
        text: "In-depth Interviews",
      },
      {
        id: "b",
        text: "Focus Group Discussions",
      },
      {
        id: "c",
        text: "Participant observation",
      },
      {
        id: "d",
        text: "Structured interviews",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q249",
    question:
      "All the statements regarding Participant Observation is true EXCEPT",
    options: [
      {
        id: "a",
        text: "Observer becomes a part of the event/group",
      },
      {
        id: "b",
        text: "Systematic collection of data is easy",
      },
      {
        id: "c",
        text: "Analytic methods for observation are not well described",
      },
      {
        id: "d",
        text: "Data is very detailed",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q250",
    question:
      "The qualitative data analysis method which uses theoretical framework as the basis for analysis",
    options: [
      {
        id: "a",
        text: "Content analysis",
      },
      {
        id: "b",
        text: "Grounded theory",
      },
      {
        id: "c",
        text: "Schema Analysis",
      },
      {
        id: "d",
        text: "Hermeneutics",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q251",
    question:
      "Which of the following are characteristics of qualitative research methods?",
    options: [
      {
        id: "a",
        text: "Objective, measurable, reliable and repeatable",
      },
      {
        id: "b",
        text: "Subjective, measurable, credible and repeatable",
      },
      {
        id: "c",
        text: "Subjective, credible, inductive and interpretation of responses",
      },
      {
        id: "d",
        text: "Objective, credible, inductive and interpretation of responses",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q252",
    question:
      "The research method which is best suited for collection of information regarding highly sensitive matters such as alcohol use",
    options: [
      {
        id: "a",
        text: "Focus Group Discussions",
      },
      {
        id: "b",
        text: "Participant Observation",
      },
      {
        id: "c",
        text: "In-Depth Interview",
      },
      {
        id: "d",
        text: "Group discussions",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q253",
    question:
      "Which of the following is not the utility of qualitative research",
    options: [
      {
        id: "a",
        text: "To provide insight to why people behave in a certain way",
      },
      {
        id: "b",
        text: "To estimate the prevalence of disease",
      },
      {
        id: "c",
        text: "To help understand the results of a quantitative study",
      },
      {
        id: "d",
        text: "For developing a questionnaire",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q254",
    question:
      "Which of the following statement is true regarding Participant Observation",
    options: [
      {
        id: "a",
        text: "Observer becomes a part of the event/group",
      },
      {
        id: "b",
        text: "Systematic collection of data is easy",
      },
      {
        id: "c",
        text: "Analytic methods for observation are well described",
      },
      {
        id: "d",
        text: "Data is brief as compared to in-depth interviews",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q255",
    question:
      "Open ended group interviews that promotes discussion among participants is called as",
    options: [
      {
        id: "a",
        text: "In depth Interviews",
      },
      {
        id: "b",
        text: "Focus Group Discussions",
      },
      {
        id: "c",
        text: "Participant Observation",
      },
      {
        id: "d",
        text: "Structured interviews",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q256",
    question:
      "A researcher decided to conduct a study to explore the child feeding practices among mothers of under five children in a community. Which of the following qualitative techniques can the researcher employ to gather wide range of information on the topic in a short span of time?",
    options: [
      {
        id: "a",
        text: "Structured interview",
      },
      {
        id: "b",
        text: "In depth Interview",
      },
      {
        id: "c",
        text: "Participant Observation",
      },
      {
        id: "d",
        text: "Focus Group Discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q257",
    question:
      "In qualitative research, researchers interpret the social reality from the participants’ point of view.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q258",
    question:
      "Which of the following statements is “Incorrect” about in-depth interviews?",
    options: [
      {
        id: "a",
        text: "Findings are always generalizable",
      },
      {
        id: "b",
        text: "The transcripts are time consuming to analyze",
      },
      {
        id: "c",
        text: "Helps understand sensitive issues",
      },
      {
        id: "d",
        text: "Useful when participants are knowledgeable on a particular topic",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q259",
    question:
      "Which of the following statement is “False” about focus group discussion.",
    options: [
      {
        id: "a",
        text: "Focus group discussions help understand local terminologies",
      },
      {
        id: "b",
        text: "Group interaction is integral for an effective discussion",
      },
      {
        id: "c",
        text: "Heterogeneity of the group is a prerequisite",
      },
      {
        id: "d",
        text: "Audio and video recordings are done with prior consent",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q260",
    question:
      "Triangulation is the use of multiple methods, multiple theories and or multiple sources for a comprehensive understanding of the topic in question",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q261",
    question:
      "Which of the following characteristics is NOT related to qualitative research data?",
    options: [
      {
        id: "a",
        text: "Subjective validity",
      },
      {
        id: "b",
        text: "Data is in text form",
      },
      {
        id: "c",
        text: "Hypothesis testing is a goal",
      },
      {
        id: "d",
        text: "It involves interpretation of responses",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q262",
    question:
      "Which of the following CANNOT be done using qualitative research?",
    options: [
      {
        id: "a",
        text: "Viewing a social phenomenon holistically",
      },
      {
        id: "b",
        text: "Estimating the burden of a disease",
      },
      {
        id: "c",
        text: "Seeking in-depth understanding of a phenomenon",
      },
      {
        id: "d",
        text: "Unfamiliar subject matter",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q263",
    question:
      "A researcher wants to estimate the prevalence of exclusive breast feeding in a remote tribal population. She also wants to understand the myths and taboos associated with breast feeding. Which of the following approaches can be employed in this scenario?",
    options: [
      {
        id: "a",
        text: "Qualitative study",
      },
      {
        id: "b",
        text: "Clinical trial",
      },
      {
        id: "c",
        text: "Mixed-methods study",
      },
      {
        id: "d",
        text: "Cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q264",
    question:
      "Which of the following is NOT a data collection method used in qualitative research?",
    options: [
      {
        id: "a",
        text: "Interviews",
      },
      {
        id: "b",
        text: "Sociogram",
      },
      {
        id: "c",
        text: "Participant observation",
      },
      {
        id: "d",
        text: "Focus group discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q265",
    question:
      "Which of the following is NOT a feature of ‘In-depth interviews’?",
    options: [
      {
        id: "a",
        text: "It involves two or more participants at a time",
      },
      {
        id: "b",
        text: "It follows an interview guide",
      },
      {
        id: "c",
        text: "It is suitable for a highly sensitive topic",
      },
      {
        id: "d",
        text: "It obtains rich contextualized information",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q266",
    question:
      "Which of the following is an advantage of conducting ‘in-depth interviews’?",
    options: [
      {
        id: "a",
        text: "It expresses the ‘Emic’ perspective",
      },
      {
        id: "b",
        text: "It is generalizable",
      },
      {
        id: "c",
        text: "It is a quick process",
      },
      {
        id: "d",
        text: "It uses a systematic sampling approach",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q267",
    question:
      "State whether true or false. In a focus group discussion, it is easy to obtain personal behaviors on a sensitive issue",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q268",
    question:
      "Which of the following is TRUE regarding ‘participant observation’ method?",
    options: [
      {
        id: "a",
        text: "It is easy to analyze the data",
      },
      {
        id: "b",
        text: "The researcher himself becomes a part of the study group",
      },
      {
        id: "c",
        text: "Data obtained is very concise",
      },
      {
        id: "d",
        text: "The researcher interviews each participant in detail",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q269",
    question:
      "State whether true or false. Data obtained from Focus Group Discussion may be sensitive to biased analysis.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q270",
    question:
      "The analytical approach where the researcher proceeds to develop a theory based on learnings obtained from the data is called",
    options: [
      {
        id: "a",
        text: "Grounded theory analysis",
      },
      {
        id: "b",
        text: "Content analysis",
      },
      {
        id: "c",
        text: "Schema analysis",
      },
      {
        id: "d",
        text: "Factor analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q271",
    question:
      "In a study on hypertension, patients are categorized based on their systolic blood pressure as normal, pre-hypertension, stage 1 hypertension and stage 2 hypertension. What type of variable is this?",
    options: [
      {
        id: "a",
        text: "Qualitative",
      },
      {
        id: "b",
        text: "Descriptive",
      },
      {
        id: "c",
        text: "Nominal",
      },
      {
        id: "d",
        text: "Ordinal",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q272",
    question: "Most commonly used measure of central tendency is",
    options: [
      {
        id: "a",
        text: "Mode",
      },
      {
        id: "b",
        text: "Median",
      },
      {
        id: "c",
        text: "Mean",
      },
      {
        id: "d",
        text: "Range",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q273",
    question: "First quartile (Q1) is equivalent to __________ percentile",
    options: [
      {
        id: "a",
        text: "25th",
      },
      {
        id: "b",
        text: "50th",
      },
      {
        id: "c",
        text: "75th",
      },
      {
        id: "d",
        text: "1st",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q274",
    question:
      "Find the median in the following sample of observations: 12, 26, 10, 29, 48",
    options: [
      {
        id: "a",
        text: "29",
      },
      {
        id: "b",
        text: "48",
      },
      {
        id: "c",
        text: "26",
      },
      {
        id: "d",
        text: "25",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q275",
    question:
      "The following measure is not influenced by extreme values in a data set",
    options: [
      {
        id: "a",
        text: "Arithmetic Mean",
      },
      {
        id: "b",
        text: "Inter-quartile range",
      },
      {
        id: "c",
        text: "Range",
      },
      {
        id: "d",
        text: "'b' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q276",
    question:
      "Which of the following statistic does not belong with the others?",
    options: [
      {
        id: "a",
        text: "Range",
      },
      {
        id: "b",
        text: "Variance",
      },
      {
        id: "c",
        text: "Mode",
      },
      {
        id: "d",
        text: "Standard deviation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q277",
    question:
      "'Number of children per household' is an example of a continuous variable",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q278",
    question:
      "In a study, researchers are interested in measuring the cholesterol levels of participants. Cholesterol level is a ________ variable",
    options: [
      {
        id: "a",
        text: "Ordinal",
      },
      {
        id: "b",
        text: "Nominal",
      },
      {
        id: "c",
        text: "Continuous",
      },
      {
        id: "d",
        text: "Discrete",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q279",
    question: "In the following set of data, what is the mean? 4,1,9,7,3,8,2,6",
    options: [
      {
        id: "a",
        text: "5",
      },
      {
        id: "b",
        text: "4.5",
      },
      {
        id: "c",
        text: "9",
      },
      {
        id: "d",
        text: "8",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q280",
    question:
      "Difference between the minimum value and the maximum value of the observations",
    options: [
      {
        id: "a",
        text: "Variance",
      },
      {
        id: "b",
        text: "Inter-quartile range",
      },
      {
        id: "c",
        text: "Range",
      },
      {
        id: "d",
        text: "Standard Deviation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q281",
    question: "All the following are measures of dispersion except",
    options: [
      {
        id: "a",
        text: "Mean",
      },
      {
        id: "b",
        text: "Variance",
      },
      {
        id: "c",
        text: "Standard deviation",
      },
      {
        id: "d",
        text: "Range",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q282",
    question: "Which percentile is equivalent to the median?",
    options: [
      {
        id: "a",
        text: "25",
      },
      {
        id: "b",
        text: "50",
      },
      {
        id: "c",
        text: "75",
      },
      {
        id: "d",
        text: "100",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q283",
    question: "All the following are true for standard deviation (SD) EXCEPT",
    options: [
      {
        id: "a",
        text: "It is the square root of the average of the squared deviations of the observations from the arithmetic mean",
      },
      {
        id: "b",
        text: "It is the most important measure of dispersion",
      },
      {
        id: "c",
        text: "It is expressed in the same units of measurement as the observation",
      },
      {
        id: "d",
        text: "The square of the standard deviation is called mean deviation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q284",
    question:
      "A researcher measures fasting blood level of glucose of 100 participants. The mean blood sugar level was measured as 110 mg/dl. The standard deviation was 11 mg/dl. Calculate the coefficient of variance.",
    options: [
      {
        id: "a",
        text: "20%",
      },
      {
        id: "b",
        text: "14%",
      },
      {
        id: "c",
        text: "10%",
      },
      {
        id: "d",
        text: "25%",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q285",
    question:
      "A researcher measures the height of 100 school going children for his study. What type of variable is ‘height’?",
    options: [
      {
        id: "a",
        text: "Nominal",
      },
      {
        id: "b",
        text: "Ordinal",
      },
      {
        id: "c",
        text: "Continuous",
      },
      {
        id: "d",
        text: "Discrete",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q286",
    question:
      "0 litres respectively. Based on this data how many patients in the sample are expected to have a FEV between 1.5 and 3.0 litres?",
    options: [
      {
        id: "a",
        text: "100",
      },
      {
        id: "b",
        text: "50",
      },
      {
        id: "c",
        text: "25",
      },
      {
        id: "d",
        text: "75",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q287",
    question:
      "The average of the absolute deviations of the observations from the arithmetic mean is known as",
    options: [
      {
        id: "a",
        text: "Variance",
      },
      {
        id: "b",
        text: "Inter-quartile range",
      },
      {
        id: "c",
        text: "Mean deviation",
      },
      {
        id: "d",
        text: "Standard deviation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q288",
    question:
      "In a study, a researcher was interested in measuring the hemoglobin levels of 10 participants. The values are 10.0, 8.5, 12.0, 14.0, 11.5, 13.5, 9.0, 12.0, 11.3, 7.5. What is the mode of this distribution?",
    options: [
      {
        id: "a",
        text: "7.5",
      },
      {
        id: "b",
        text: "12.0",
      },
      {
        id: "c",
        text: "10.9",
      },
      {
        id: "d",
        text: "14.0",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q289",
    question: "All the following are examples of a nominal variable EXCEPT",
    options: [
      {
        id: "a",
        text: "Gender",
      },
      {
        id: "b",
        text: "Age",
      },
      {
        id: "c",
        text: "Place of residence",
      },
      {
        id: "d",
        text: "Colour of eyes",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q290",
    question: "Which of the following is true about interquartile range?",
    options: [
      {
        id: "a",
        text: "It describes the middle value of the distribution",
      },
      {
        id: "b",
        text: "It divides the distribution into two halves",
      },
      {
        id: "c",
        text: "It covers the middle 50% of observations",
      },
      {
        id: "d",
        text: "It is affected by the extreme values in the distribution",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q291",
    question:
      "When the data set contains too many extreme values, the most representative average value is",
    options: [
      {
        id: "a",
        text: "Mean",
      },
      {
        id: "b",
        text: "Mode",
      },
      {
        id: "c",
        text: "Median",
      },
      {
        id: "d",
        text: "Variance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q292",
    question:
      "The age of ten pregnant women who visited an ANC clinic is given. What is the mean age of this group? (26, 31, 25, 26, 30, 27, 25, 32, 25 and 33 years).",
    options: [
      {
        id: "a",
        text: "45",
      },
      {
        id: "b",
        text: "28",
      },
      {
        id: "c",
        text: "25",
      },
      {
        id: "d",
        text: "32",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q293",
    question:
      "Which of the following is a relative measure of dispersion when comparing variables which are measured in different units?",
    options: [
      {
        id: "a",
        text: "Inter-quartile range",
      },
      {
        id: "b",
        text: "Coefficient of variation",
      },
      {
        id: "c",
        text: "Range",
      },
      {
        id: "d",
        text: "Standard deviation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q294",
    question:
      "The following scores were obtained by ten medical students in a quiz: (5, 3, 6, 8, 7, 8, 3, 11, 6, 3) What is the median score of this group?",
    options: [
      {
        id: "a",
        text: "3",
      },
      {
        id: "b",
        text: "6",
      },
      {
        id: "c",
        text: "8",
      },
      {
        id: "d",
        text: "11",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q295",
    question:
      "‘Height of the students in a particular class measured in centimeter’ is an example of a continuous variable",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q296",
    question:
      "What is the appropriate measure of dispersion to report when median is reported as the measure of central tendency for a given set of data?",
    options: [
      {
        id: "a",
        text: "Standard deviation",
      },
      {
        id: "b",
        text: "Inter-quartile range",
      },
      {
        id: "c",
        text: "Variance",
      },
      {
        id: "d",
        text: "Coefficient of variance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q297",
    question:
      "In the NCD clinic of a primary health Centre, fasting blood sugar (in g/dL) of 11 patients was measured. The following values were obtained - (85, 93, 104, 108, 105, 120, 129, 202, 160, 400, 410). What is the most appropriate measure of central tendency for this data?",
    options: [
      {
        id: "a",
        text: "Mean = 120",
      },
      {
        id: "b",
        text: "Median = 120",
      },
      {
        id: "c",
        text: "Mean = 174.1",
      },
      {
        id: "d",
        text: "Median = 174.1",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q298",
    question: "Which of the following about ‘Range’ is TRUE?",
    options: [
      {
        id: "a",
        text: "It indicates the way in which values cluster about a particular point",
      },
      {
        id: "b",
        text: "It gives the number of observations bearing the same value",
      },
      {
        id: "c",
        text: "It is the difference between the minimum and maximum value",
      },
      {
        id: "d",
        text: "It shows the degree to which the mean value differs from its expected value.",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q299",
    question:
      "In a survey, socio-economic status (SES) was collected in the following manner – ‘Lower, Lower Middle, Upper Middle and Upper’. What type of variable is SES?",
    options: [
      {
        id: "a",
        text: "Ordinal",
      },
      {
        id: "b",
        text: "Nominal",
      },
      {
        id: "c",
        text: "Continuous",
      },
      {
        id: "d",
        text: "Discrete",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q300",
    question:
      "Body weights of 11 children who attended a pediatric OPD was measured. For this group, the first quartile, median, mean and third quartile were 8.5, 12, 11.9 and 16, respectively. Calculate the Interquartile Range.",
    options: [
      {
        id: "a",
        text: "3.5",
      },
      {
        id: "b",
        text: "7.5",
      },
      {
        id: "c",
        text: "0.1",
      },
      {
        id: "d",
        text: "24.5",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q301",
    question:
      "The process by which some members of a population are selected as representative of the entire population is known as",
    options: [
      {
        id: "a",
        text: "Census",
      },
      {
        id: "b",
        text: "Sampling",
      },
      {
        id: "c",
        text: "Survey",
      },
      {
        id: "d",
        text: "Randomization",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q302",
    question: "Sampling based upon equal chance of selection is called",
    options: [
      {
        id: "a",
        text: "Stratified random sampling",
      },
      {
        id: "b",
        text: "Simple random sampling",
      },
      {
        id: "c",
        text: "Systematic sampling",
      },
      {
        id: "d",
        text: "Subjective sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q303",
    question:
      "A researcher wishing to draw a sample from sequentially numbered houses uses a random starting point and then selects every 6 th houses, s/he has thus drawn a ________ sample",
    options: [
      {
        id: "a",
        text: "Sequential",
      },
      {
        id: "b",
        text: "Systematic",
      },
      {
        id: "c",
        text: "Simple random",
      },
      {
        id: "d",
        text: "Stratified",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q304",
    question: "The following statement is correct regarding sampling error",
    options: [
      {
        id: "a",
        text: "Sampling error is difficult to measure in simple random sampling",
      },
      {
        id: "b",
        text: "Sampling error is easy to measure in stratified sampling",
      },
      {
        id: "c",
        text: "The magnitude of error can be measured in non-probability samples",
      },
      {
        id: "d",
        text: "The magnitude of error can be measured in probability samples",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q305",
    question:
      "The only sampling method allows to draw valid conclusions about the population is",
    options: [
      {
        id: "a",
        text: "Non-probability sampling",
      },
      {
        id: "b",
        text: "Convenience sampling",
      },
      {
        id: "c",
        text: "Probability sampling",
      },
      {
        id: "d",
        text: "Subjective sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q306",
    question: "All the following are true regarding cluster sampling EXCEPT",
    options: [
      {
        id: "a",
        text: "It needs a complete list of units",
      },
      {
        id: "b",
        text: "The sampling unit is group of subjects",
      },
      {
        id: "c",
        text: "Sampling error is difficult to measure",
      },
      {
        id: "d",
        text: "Resources required are less",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q307",
    question: "Methods used in probability samples are",
    options: [
      {
        id: "a",
        text: "Stratified sampling",
      },
      {
        id: "b",
        text: "Multi-stage sampling",
      },
      {
        id: "c",
        text: "Cluster sampling",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q308",
    question:
      "All the following statements are true regarding simple random sampling EXCEPT",
    options: [
      {
        id: "a",
        text: "Sampling error is easily measurable",
      },
      {
        id: "b",
        text: "It needs a complete list of all units",
      },
      {
        id: "c",
        text: "It ensures equal chance of selection for each unit",
      },
      {
        id: "d",
        text: "It always achieves best representativeness",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q309",
    question:
      "People who volunteer or who can be easily recruited are used in a sampling method called",
    options: [
      {
        id: "a",
        text: "Cluster sampling",
      },
      {
        id: "b",
        text: "Multi-stage sampling",
      },
      {
        id: "c",
        text: "Convenience sampling",
      },
      {
        id: "d",
        text: "Systematic sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q310",
    question:
      "Based on the number of cigarettes per day, a researcher divides the population into three risk groups for lung cancer (low, moderate, high risk). If the researcher then draws a random sample from each of these risk groups independently, s/he has created a _________ sample",
    options: [
      {
        id: "a",
        text: "Systematic",
      },
      {
        id: "b",
        text: "Simple random",
      },
      {
        id: "c",
        text: "Stratified",
      },
      {
        id: "d",
        text: "Group data",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q311",
    question: "All the following are non-probability sampling methods EXCEPT",
    options: [
      {
        id: "a",
        text: "Convenience sampling",
      },
      {
        id: "b",
        text: "Snowball sampling",
      },
      {
        id: "c",
        text: "Quota sampling",
      },
      {
        id: "d",
        text: "Systematic sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q312",
    question:
      "In a study to measure the prevalence of fluorosis in a district, towns are sampled first. This is followed by a sample of wards within the selected towns, and finally a sample of households within the selected wards. What is the type of the sampling used here?",
    options: [
      {
        id: "a",
        text: "Multistage sampling",
      },
      {
        id: "b",
        text: "Systematic random sampling",
      },
      {
        id: "c",
        text: "Simple random sampling",
      },
      {
        id: "d",
        text: "Convenience sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q313",
    question:
      "The magnitude of sampling error can be measured in probability sampling.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q314",
    question:
      "All the following statements are true regarding stratified sampling EXCEPT",
    options: [
      {
        id: "a",
        text: "It classifies population into homogeneous subgroups",
      },
      {
        id: "b",
        text: "The probability of a participant being selected is unknown",
      },
      {
        id: "c",
        text: "The sampling error is difficult to measure",
      },
      {
        id: "d",
        text: "It allows inclusion of representative participants from all subgroups",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q315",
    question: "Which of the following is true about nonprobability sampling?",
    options: [
      {
        id: "a",
        text: "It removes the possibility of bias in selection of participants",
      },
      {
        id: "b",
        text: "Sampling error can be measured",
      },
      {
        id: "c",
        text: "Quota sampling is a type of nonprobability sampling",
      },
      {
        id: "d",
        text: "Inferences drawn from non-probability sampling can be generalized",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q316",
    question:
      "Random sampling in probability samples reduces the possibility of selection bias",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q317",
    question:
      "Which of the following statement is true regarding systematic random sampling?",
    options: [
      {
        id: "a",
        text: "Sampling error cannot be measured",
      },
      {
        id: "b",
        text: "The chance of selection for each sampling unit is unknown",
      },
      {
        id: "c",
        text: "The selected sampling units are likely to be more representative than simple random sampling",
      },
      {
        id: "d",
        text: "It is a type of non-probability sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q318",
    question:
      "A researcher planned a cross-sectional study to assess the level of satisfaction of patients attending a clinic. For this, the researcher selected the first 100 patients who visited the clinic starting from a fixed date. What is the type of the sampling mentioned in this case?",
    options: [
      {
        id: "a",
        text: "Snowball sampling",
      },
      {
        id: "b",
        text: "Purposive sampling",
      },
      {
        id: "c",
        text: "Simple random sampling",
      },
      {
        id: "d",
        text: "Stratified random sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q319",
    question:
      "The list of all individuals in the study population from whom study participants in a research are to be selected is known as",
    options: [
      {
        id: "a",
        text: "Sampling frame",
      },
      {
        id: "b",
        text: "Study population",
      },
      {
        id: "c",
        text: "Sampling unit",
      },
      {
        id: "d",
        text: "Study sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q320",
    question: "Which of the following is an advantage of multistage sampling?",
    options: [
      {
        id: "a",
        text: "Sampling error is easy to measure",
      },
      {
        id: "b",
        text: "It does not require a complete list of the total population",
      },
      {
        id: "c",
        text: "It requires only one sampling list",
      },
      {
        id: "d",
        text: "It always achieve the best representative sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q321",
    question:
      "Which of the following sampling method ensures that valid conclusions can be drawn about different subgroups in a population?",
    options: [
      {
        id: "a",
        text: "Simple random sample",
      },
      {
        id: "b",
        text: "Systematic random sample",
      },
      {
        id: "c",
        text: "Stratified random sample",
      },
      {
        id: "d",
        text: "Cluster random sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q322",
    question:
      "Which of the following about simple random sampling method is FALSE?",
    options: [
      {
        id: "a",
        text: "It needs a complete list of the units in the target population",
      },
      {
        id: "b",
        text: "Purposive sampling is a type of simple random sample",
      },
      {
        id: "c",
        text: "It draws units from the target population randomly",
      },
      {
        id: "d",
        text: "It gives equal chance of selection to every unit in the target population",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q323",
    question: "Sampling achieves",
    options: [
      {
        id: "a",
        text: "Efficient utilization of resources",
      },
      {
        id: "b",
        text: "Elimination of random error",
      },
      {
        id: "c",
        text: "Low non-response rate",
      },
      {
        id: "d",
        text: "Complete enumeration of population",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q324",
    question:
      "In simple random sampling, the probability of selection of each individual is",
    options: [
      {
        id: "a",
        text: "Unequal",
      },
      {
        id: "b",
        text: "Equal",
      },
      {
        id: "c",
        text: "Unknown",
      },
      {
        id: "d",
        text: "One",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q325",
    question:
      "Which one of the following biases is prevented by an appropriate sampling technique?",
    options: [
      {
        id: "a",
        text: "Volunteer bias",
      },
      {
        id: "b",
        text: "Interviewer’s bias",
      },
      {
        id: "c",
        text: "Social desirability bias",
      },
      {
        id: "d",
        text: "Recall bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q326",
    question:
      "In a neighborhood with 5000 houses, a researcher wants to obtain a systematic random sample of 50 houses. What will be the sampling interval in this case?",
    options: [
      {
        id: "a",
        text: "1000",
      },
      {
        id: "b",
        text: "100",
      },
      {
        id: "c",
        text: "0.1",
      },
      {
        id: "d",
        text: "0.01",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q327",
    question:
      "Which one of the following statement about cluster sampling is FALSE?",
    options: [
      {
        id: "a",
        text: "Units within a cluster are heterogeneous",
      },
      {
        id: "b",
        text: "Sampling frame of the entire study area is not required",
      },
      {
        id: "c",
        text: "Variability between clusters is assumed to be high",
      },
      {
        id: "d",
        text: "Sampling error is difficult to measure",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q328",
    question:
      "Which one of the following statements about multistage sampling is TRUE?",
    options: [
      {
        id: "a",
        text: "It saves resources as compared to simple random sampling",
      },
      {
        id: "b",
        text: "It requires a complete listing of the entire population",
      },
      {
        id: "c",
        text: "It’s sampling error can be easily measured",
      },
      {
        id: "d",
        text: "It is not suitable for sampling from a large population",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q329",
    question:
      "Which one of the following about stratified random sampling is FALSE?",
    options: [
      {
        id: "a",
        text: "Units within a strata are homogenous",
      },
      {
        id: "b",
        text: "Sample is taken from every strata",
      },
      {
        id: "c",
        text: "Precision improves with low numbers sampled in each stratum",
      },
      {
        id: "d",
        text: "Stratum specific estimates are weighted to obtain the overall estimate",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q330",
    question:
      "State whether True or False: Commonly used statistical inferences have the assumption of a probability sample.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q331",
    question: "Statistical power is defined as the probability of",
    options: [
      {
        id: "a",
        text: "Accepting a null hypothesis when it is false",
      },
      {
        id: "b",
        text: "Rejecting a null hypothesis when it is true",
      },
      {
        id: "c",
        text: "Rejecting a null hypothesis when it is false",
      },
      {
        id: "d",
        text: "Failing to reject a null hypothesis when it is false",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q332",
    question:
      "Steps in the estimation of sample size included all of the following EXCEPT",
    options: [
      {
        id: "a",
        text: "Identify major study variable",
      },
      {
        id: "b",
        text: "Decide on the desired precision of the estimate",
      },
      {
        id: "c",
        text: "Adjust for population size",
      },
      {
        id: "d",
        text: "Adjust for selection bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q333",
    question: "A type-II error occurs when",
    options: [
      {
        id: "a",
        text: "The null hypothesis is rejected when it is false",
      },
      {
        id: "b",
        text: "The null hypothesis is not rejected when it is false",
      },
      {
        id: "c",
        text: "The null hypothesis is not rejected when it is true",
      },
      {
        id: "d",
        text: "The null hypothesis is rejected when it is true",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q334",
    question:
      "Exact calculation of design effect for a study parameter can take place you after study completion",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q335",
    question: "Population variance can be estimated from",
    options: [
      {
        id: "a",
        text: "A pilot study",
      },
      {
        id: "b",
        text: "Reports of previous studies",
      },
      {
        id: "c",
        text: "Guessing",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q336",
    question: "The recommended minimum level of power for an analytical study",
    options: [
      {
        id: "a",
        text: "5%",
      },
      {
        id: "b",
        text: "95%",
      },
      {
        id: "c",
        text: "80%",
      },
      {
        id: "d",
        text: "0.05%",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q337",
    question:
      "In general, sample size formula takes into account the crude association between exposure and outcome as well as the confounders",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q338",
    question:
      "Design effect of 'more than 1' needs to be considered in studies involving",
    options: [
      {
        id: "a",
        text: "Cluster sampling",
      },
      {
        id: "b",
        text: "Simple random sampling",
      },
      {
        id: "c",
        text: "Stratified random sampling",
      },
      {
        id: "d",
        text: "Non-probability sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q339",
    question:
      "Which of the following is necessary in sample size determination?",
    options: [
      {
        id: "a",
        text: "Desired confidence level",
      },
      {
        id: "b",
        text: "Desired precision",
      },
      {
        id: "c",
        text: "Magnitude of the population variance",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q340",
    question: "Which one of the following statements is false?",
    options: [
      {
        id: "a",
        text: "Design effect is a relative change in the variance due to use of clusters",
      },
      {
        id: "b",
        text: "As the magnitude of the expected effect increases, the required sample size increases",
      },
      {
        id: "c",
        text: "The population variance is unknown in general and has to be estimated",
      },
      {
        id: "d",
        text: "Larger the sample size, smaller the sampling error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q341",
    question: "A type-I error occurs when",
    options: [
      {
        id: "a",
        text: "The null hypothesis is rejected when it is false",
      },
      {
        id: "b",
        text: "The null hypothesis is not rejected when it is false",
      },
      {
        id: "c",
        text: "The null hypothesis is not rejected when it is true",
      },
      {
        id: "d",
        text: "The null hypothesis is rejected when it is true",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q342",
    question: "Which of the following is true about β error?",
    options: [
      {
        id: "a",
        text: "It is the probability of correctly rejecting the null hypothesis when",
      },
      {
        id: "b",
        text: "It is the probability of accepting the null hypothesis when it is false",
      },
      {
        id: "c",
        text: "It is the probability of rejecting the null hypothesis when it is true",
      },
      {
        id: "d",
        text: "It is the probability of making a Type I error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q343",
    question:
      "All the following are essential statistical considerations for sample size calculation EXCEPT",
    options: [
      {
        id: "a",
        text: "Desired precision",
      },
      {
        id: "b",
        text: "Anticipated proportion of factor of interest",
      },
      {
        id: "c",
        text: "Sampling method",
      },
      {
        id: "d",
        text: "Allocated budget",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q344",
    question:
      "For each confounder/variable added in the study empirically 10% increase in the sample size should be made.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q345",
    question:
      "The design effect should be calculated after completion of the study and it, need not be counted at the design stage.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q346",
    question:
      "When estimating sample size for a crosssectional study, we need to account for",
    options: [
      {
        id: "a",
        text: "Expected proportion of characteristic of interest",
      },
      {
        id: "b",
        text: "Estimated design effect, in case of cluster sampling",
      },
      {
        id: "c",
        text: "Population size",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q347",
    question: "The power of a study",
    options: [
      {
        id: "a",
        text: "Does not influence the sample size",
      },
      {
        id: "b",
        text: "Represented as ‘α’",
      },
      {
        id: "c",
        text: "Can be defined as the probability of correctly rejecting null hypothesis when it is false",
      },
      {
        id: "d",
        text: "Represented as the probability of making a Type I error",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q348",
    question:
      "The following are needed to calculate sample size for analytical studies using simple random sampling method EXCEPT",
    options: [
      {
        id: "a",
        text: "Desired value for the probability of α",
      },
      {
        id: "b",
        text: "Magnitude of the expected effect based on previous studies",
      },
      {
        id: "c",
        text: "Desired value for the probability of β",
      },
      {
        id: "d",
        text: "Estimated design effect",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q349",
    question:
      "A researcher wants to estimate the prevalence of surgical site infection following cesarean section at a tertiary care hospital. What would be the minimum number of sample size to estimate the magnitude of surgical site infection following cesarean section if it is estimated that the proportion of surgical site infection will be 10% in the hospital considering 5% absolute precision and 95% confidence level (Z α/2 = 1.96).",
    options: [
      {
        id: "a",
        text: "100",
      },
      {
        id: "b",
        text: "138",
      },
      {
        id: "c",
        text: "148",
      },
      {
        id: "d",
        text: "158",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q350",
    question:
      "Precision is described as a measure of how close an estimate is to the true value of a population parameter.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q351",
    question:
      "In a cross-sectional study, a group of researchers wanted to estimate the prevalence of cephalosporin-resistant E.coli among adult males with urinary tract infections. From previous literature, the prevalence was found to be 6.5%. If the researchers want to estimate the prevalence with a 20% relative precision and 95% significance level, what is the minimum sample size required?",
    options: [
      {
        id: "a",
        text: "1042",
      },
      {
        id: "b",
        text: "1381",
      },
      {
        id: "c",
        text: "6",
      },
      {
        id: "d",
        text: "60",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q352",
    question:
      "Which of the following factors is NOT essential for calculating sample size for a single mean estimation?",
    options: [
      {
        id: "a",
        text: "Need for statistical significance",
      },
      {
        id: "b",
        text: "Assumptions about population standard deviation",
      },
      {
        id: "c",
        text: "Precision",
      },
      {
        id: "d",
        text: "Significance level",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q353",
    question:
      "Adjustments to a calculated sample size need NOT be done for which of the following reasons?",
    options: [
      {
        id: "a",
        text: "Non-response rate",
      },
      {
        id: "b",
        text: "Finite population size",
      },
      {
        id: "c",
        text: "Cluster design",
      },
      {
        id: "d",
        text: "Hospital-based study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q354",
    question:
      "State whether true or false. A pilot study can be conducted to get an estimate of the expected prevalence of the disease being studied to calculate the minimum required sample size.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q355",
    question:
      "A cross-sectional study aims to estimate the prevalence of Hydatid liver disease among patients undergoing Ultrasonography in a tertiary care hospital. Which of the following is NOT required for calculating the minimum required sample size for this objective?",
    options: [
      {
        id: "a",
        text: "Significance level",
      },
      {
        id: "b",
        text: "Assumed prevalence",
      },
      {
        id: "c",
        text: "Precision",
      },
      {
        id: "d",
        text: "Population variance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q356",
    question: "What is Type I error?",
    options: [
      {
        id: "a",
        text: "The probability of accepting the null hypothesis when it is false",
      },
      {
        id: "b",
        text: "The probability of rejecting the null hypothesis when it is true",
      },
      {
        id: "c",
        text: "The probability of rejecting the null hypothesis when it is false",
      },
      {
        id: "d",
        text: "The probability of accepting the null hypothesis when it is true",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q357",
    question:
      "Ability of a study to detect correctly the presence of an association is known as",
    options: [
      {
        id: "a",
        text: "Precision",
      },
      {
        id: "b",
        text: "Power",
      },
      {
        id: "c",
        text: "Confidence",
      },
      {
        id: "d",
        text: "Significance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q358",
    question:
      "Standard deviation of a sampling distribution is called systematic error",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q359",
    question:
      "Design effect is considered for which of the following sampling strategy?",
    options: [
      {
        id: "a",
        text: "Cluster sampling",
      },
      {
        id: "b",
        text: "Simple random sampling",
      },
      {
        id: "c",
        text: "Stratified random sampling",
      },
      {
        id: "d",
        text: "Non-probability sampling",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q360",
    question:
      "In a hospital based cross-sectional study, it is planned to estimate the mean D-dimer level among COVID-19 patients. From previous literature, the standard deviation was found to be 200 ng/mL. If the researchers want to estimate the mean with a 50 ng/mL precision and 95% significance level, what is the minimum sample size required?",
    options: [
      {
        id: "a",
        text: "62",
      },
      {
        id: "b",
        text: "16",
      },
      {
        id: "c",
        text: "31",
      },
      {
        id: "d",
        text: "248",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q361",
    question: "Selection of study participants depends on",
    options: [
      {
        id: "a",
        text: "Representativeness",
      },
      {
        id: "b",
        text: "Acceptable cost",
      },
      {
        id: "c",
        text: "Adequate size",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q362",
    question: "Target population is determined by",
    options: [
      {
        id: "a",
        text: "Demographic characteristics",
      },
      {
        id: "b",
        text: "Temporal characteristics",
      },
      {
        id: "c",
        text: "Clinical characteristics",
      },
      {
        id: "d",
        text: "'a' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q363",
    question: "Study sample is a subset of accessible population",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q364",
    question: "Representativeness of a study sample refers to",
    options: [
      {
        id: "a",
        text: "The extent to which the characteristics of the sample accurately reflect the characteristics of the population",
      },
      {
        id: "b",
        text: "The size of the sample which is large enough",
      },
      {
        id: "c",
        text: "Volunteering nature of the subjects from the population",
      },
      {
        id: "d",
        text: "The extent to which the characteristics of exposed population accurately reflect the characteristics of unexposed sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q365",
    question: "Non-response in a study can be minimized by",
    options: [
      {
        id: "a",
        text: "Repeat contact of the study participants",
      },
      {
        id: "b",
        text: "Providing compensation for participants time",
      },
      {
        id: "c",
        text: "Less invasive and less sensitive questionnaires",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q366",
    question: "External validity means",
    options: [
      {
        id: "a",
        text: "The degree to which the inferences drawn from a study can be generalized to a broader population beyond the study population",
      },
      {
        id: "b",
        text: "The degree to which the observed findings lead to correct inferences about phenomena taking place in the study sample",
      },
      {
        id: "c",
        text: "The degree to which a test actually measures what it is designed to measure",
      },
      {
        id: "d",
        text: "The degree to which the findings are reliable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q367",
    question: "Participants may be excluded from the study because of",
    options: [
      {
        id: "a",
        text: "Interference with the success of study follow-up",
      },
      {
        id: "b",
        text: "Ethical concerns",
      },
      {
        id: "c",
        text: "Interference with the quality of data collection or non-acceptance to participate in the study",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q368",
    question:
      "While choosing the accessible population and the sampling approach for selection of study population, an important factor that we need to consider is",
    options: [
      {
        id: "a",
        text: "Simplicity",
      },
      {
        id: "b",
        text: "Technology",
      },
      {
        id: "c",
        text: "Feasibility",
      },
      {
        id: "d",
        text: "Reliability",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q369",
    question:
      "If your research question is related to diagnosis, treatment or prognosis of a severe medical condition, then it is an easy and costeffective way to recruit the study population from the community",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q370",
    question:
      "Reasons for interference with the success of follow-up in a study may include",
    options: [
      {
        id: "a",
        text: "Migration of some study participants from the study area",
      },
      {
        id: "b",
        text: "Marriage of some of the female study participants because of which they might move out of the study area",
      },
      {
        id: "c",
        text: "Refusals for follow-up",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q371",
    question:
      "The population defined by clinical and demographic characteristics is called",
    options: [
      {
        id: "a",
        text: "Target population",
      },
      {
        id: "b",
        text: "Accessible populat",
      },
      {
        id: "c",
        text: "Subset",
      },
      {
        id: "d",
        text: "Study sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q372",
    question:
      "The population defined by geographical and temporal characteristics is called as",
    options: [
      {
        id: "a",
        text: "Target population",
      },
      {
        id: "b",
        text: "Accessible population",
      },
      {
        id: "c",
        text: "Subset",
      },
      {
        id: "d",
        text: "Sample size",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q373",
    question: "Random errors can be effectively handled by",
    options: [
      {
        id: "a",
        text: "Randomisation",
      },
      {
        id: "b",
        text: "Representativeness",
      },
      {
        id: "c",
        text: "Adequate sample size",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q374",
    question:
      "A researcher found an inference about a particular disease of interest. If he/she wants to generalize the results, it is important to have",
    options: [
      {
        id: "a",
        text: "Internal validity",
      },
      {
        id: "b",
        text: "External validity",
      },
      {
        id: "c",
        text: "Feasibility",
      },
      {
        id: "d",
        text: "Accuracy",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q375",
    question:
      "Reasons for interference with the success of follow-up in a study may include",
    options: [
      {
        id: "a",
        text: "Out-migration of some study participants from the study area",
      },
      {
        id: "b",
        text: "Marriage of some of the female study participants because of which they might move out of the study area",
      },
      {
        id: "c",
        text: "Refusals for follow-up",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q376",
    question: "Less invasive and less sensitive questionnaires will",
    options: [
      {
        id: "a",
        text: "Increase the power",
      },
      {
        id: "b",
        text: "Decrease the power",
      },
      {
        id: "c",
        text: "Improve the significance",
      },
      {
        id: "d",
        text: "Reduce the non-response",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q377",
    question: "The external validity in a research study means",
    options: [
      {
        id: "a",
        text: "The degree to which the observed findings lead to correct inferences about phenomena taking place in the study sample",
      },
      {
        id: "b",
        text: "The degree to which a test actually measures what it is designed to measure",
      },
      {
        id: "c",
        text: "The degree to which the inferences drawn from a study can be generalized to a broader population beyond the study population",
      },
      {
        id: "d",
        text: "The degree to which the findings are reliable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q378",
    question:
      "The degree to which the observed findings lead to correct inferences about phenomena of interest in the study sample is",
    options: [
      {
        id: "a",
        text: "Reliability",
      },
      {
        id: "b",
        text: "Feasibility",
      },
      {
        id: "c",
        text: "Internal validity",
      },
      {
        id: "d",
        text: "External validity",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q379",
    question:
      "Which factor is important to consider while choosing the accessible population and the sampling approach?",
    options: [
      {
        id: "a",
        text: "Feasibility",
      },
      {
        id: "b",
        text: "Sensitivity",
      },
      {
        id: "c",
        text: "Specificity",
      },
      {
        id: "d",
        text: "Reliability",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q380",
    question: "The participants may be excluded from the study because of",
    options: [
      {
        id: "a",
        text: "Interference with the success of study follow-up",
      },
      {
        id: "b",
        text: "Ethical concerns",
      },
      {
        id: "c",
        text: "Interference with the quality of data collection",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q381",
    question:
      "Which of the following helps to minimize the random error in a research study?",
    options: [
      {
        id: "a",
        text: "Limited study duration",
      },
      {
        id: "b",
        text: "Adequate sample size",
      },
      {
        id: "c",
        text: "Adequate budget",
      },
      {
        id: "d",
        text: "More than six investigators",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q382",
    question:
      "Representativeness of the study participants similar to the population of interest can help in which of the following aspects of a research study?",
    options: [
      {
        id: "a",
        text: "Generalizability of the findings",
      },
      {
        id: "b",
        text: "Internal validity",
      },
      {
        id: "c",
        text: "Reduce information bias",
      },
      {
        id: "d",
        text: "Minimize recall bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q383",
    question:
      "An investigator intends to estimate the prevalence of Urinary Tract Infection (UTI) among circumcised children (<5 years old) in Jaipur city. However, the researcher selects the study participants from one government hospital. Which of the following is the target population in this study?",
    options: [
      {
        id: "a",
        text: "All children aged <5 years in the city",
      },
      {
        id: "b",
        text: "All circumcised children aged <5 years in the city",
      },
      {
        id: "c",
        text: "All circumcised children aged <5 years attending the government hospital",
      },
      {
        id: "d",
        text: "All children having UTI in the city",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q384",
    question:
      "Which of the following is the accessible population in the above study?",
    options: [
      {
        id: "a",
        text: "All children aged <5 years in the city",
      },
      {
        id: "b",
        text: "All circumcised children aged <5 years in the city",
      },
      {
        id: "c",
        text: "All circumcised children aged <5 years attending the government hospital",
      },
      {
        id: "d",
        text: "All children having UTI in the city",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q385",
    question:
      "State whether true or false. High non-response rate in a study may affect the internal validity.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q386",
    question: "Which of the following is TRUE about study validity?",
    options: [
      {
        id: "a",
        text: "An internally valid study result is always generalizable to the target population",
      },
      {
        id: "b",
        text: "An internally valid study result may or may not be generalizable to the target population",
      },
      {
        id: "c",
        text: "An externally valid study result is not generalizable to the target population",
      },
      {
        id: "d",
        text: "A study without internal validity can be generalized to the target population",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q387",
    question: "Which of the following statements on study populations is TRUE?",
    options: [
      {
        id: "a",
        text: "Study sample is a subset of the accessible population",
      },
      {
        id: "b",
        text: "Target population is a subset of the accessible population",
      },
      {
        id: "c",
        text: "Accessible population is a subset of the study sample",
      },
      {
        id: "d",
        text: "Target population is a subset of the study sample",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q388",
    question:
      "State whether true or false. Biases can affect both internal and external validity.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q389",
    question:
      "In a community based vaccine trial, which aims to compare the 1 year incidence of intussusception in children receiving/not receiving rotavirus vaccine, which of the following can be a likely exclusion criterion?",
    options: [
      {
        id: "a",
        text: "Children who may leave the study area within a month",
      },
      {
        id: "b",
        text: "Children aged 0 months to 24 months",
      },
      {
        id: "c",
        text: "Children without pre-existing intestinal anomalies",
      },
      {
        id: "d",
        text: "Children who have not received rotavirus vaccine previously",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q390",
    question:
      "In a cohort study planned to estimate the incidence of birth defects among Zika virus infected pregnant women in Chennai city, which of the following CANNOT be an inclusion criterion?",
    options: [
      {
        id: "a",
        text: "First trimester pregnant women with labconfirmed Zika virus infection",
      },
      {
        id: "b",
        text: "Pregnant women who are permanent residents of Chennai city",
      },
      {
        id: "c",
        text: "Pregnant women aged above 18 years",
      },
      {
        id: "d",
        text: "Pregnant women taking drugs known to cause",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q391",
    question:
      "Which of the following statements regarding study objectives is correct?",
    options: [
      {
        id: "a",
        text: "Objectives should be defined at the planning stage of study",
      },
      {
        id: "b",
        text: "Objectives can be defined at any time of the study",
      },
      {
        id: "c",
        text: "Objectives can be changed even at the end of the study",
      },
      {
        id: "d",
        text: "Objectives should be defined before identifying the research question",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q392",
    question:
      "Which of the following is (are) required to determine the key indicators for planned research study?",
    options: [
      {
        id: "a",
        text: "Frame study objectives",
      },
      {
        id: "b",
        text: "Identify parameters needed for the key indicators",
      },
      {
        id: "c",
        text: "Choose the right study design",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q393",
    question:
      "Which of the following can improve efficiency of a research study?",
    options: [
      {
        id: "a",
        text: "Time management",
      },
      {
        id: "b",
        text: "Planning and scheduling activities",
      },
      {
        id: "c",
        text: "Budgeting",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q394",
    question:
      "Which of the following represents the correct sequence in a life cycle of a study?",
    options: [
      {
        id: "a",
        text: "Identifying data needs, formulating study objectives, planning analysis, spelling out research question",
      },
      {
        id: "b",
        text: "Formulating study objectives, planning analysis, spelling out research question, identifying data needs",
      },
      {
        id: "c",
        text: "Identifying data needs, spelling out research question, formulating study objectives, planning analysis",
      },
      {
        id: "d",
        text: "Formulating study objects, spelling out research question, identifying data needs, planning analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q395",
    question:
      "It should be ensured that products/deliverables of health research projects are delivered within the",
    options: [
      {
        id: "a",
        text: "Defined timeframe",
      },
      {
        id: "b",
        text: "Defined budget",
      },
      {
        id: "c",
        text: "Expected quality standards",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q396",
    question:
      "Which of the following statements best describes the study objectives?",
    options: [
      {
        id: "a",
        text: "They should be minimum, achievable and clear",
      },
      {
        id: "b",
        text: "They can be primary and / or secondary",
      },
      {
        id: "c",
        text: "Adding objectives during study implementation is a good practice",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q397",
    question:
      "Principles to be followed while collecting the information elements are",
    options: [
      {
        id: "a",
        text: "Use the variables that will best reflect the information element",
      },
      {
        id: "b",
        text: "Adopt standardize case definitions and laboratory criteria/normal ranges",
      },
      {
        id: "c",
        text: "Choose the most accurate ways of collecting information on various elements",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q398",
    question:
      "Study conducted following an ad hoc approach may lead to the following consequences",
    options: [
      {
        id: "a",
        text: "Generation of useful data in programs or for policy making",
      },
      {
        id: "b",
        text: "Efficient utilization of resources",
      },
      {
        id: "c",
        text: "Serious difficulties in analysis and interpretation",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q399",
    question: "Common reasons for research study failures",
    options: [
      {
        id: "a",
        text: "Poorly defined research question",
      },
      {
        id: "b",
        text: "Vague timelines",
      },
      {
        id: "c",
        text: "Lack of supervision",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q400",
    question:
      "Sample size for a cross-sectional study is decided based on the following",
    options: [
      {
        id: "a",
        text: "Assumed/reported prevalence",
      },
      {
        id: "b",
        text: "Confidence interval",
      },
      {
        id: "c",
        text: "Acceptable Precision",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q401",
    question:
      "Which of the following is a criterion for a good research question?",
    options: [
      {
        id: "a",
        text: "Long and self-explanatory question using complex terms",
      },
      {
        id: "b",
        text: "A question based on ill-defined hypothesis",
      },
      {
        id: "c",
        text: "A question based on strong hunch on part of the investigator",
      },
      {
        id: "d",
        text: "A question based on established theory and some research evidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q402",
    question:
      "Which of the following can be considered true in case of ad hoc approach to conduct a research study?",
    options: [
      {
        id: "a",
        text: "Its advantages are the low development effort and possibility of getting results in a short time span",
      },
      {
        id: "b",
        text: "Its advantage is that the accuracy of the results is usually high",
      },
      {
        id: "c",
        text: "Only 'a'",
      },
      {
        id: "d",
        text: "Both 'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a", "c"],
  },
  {
    id: "q403",
    question:
      "A cross sectional study is carried out to examine whether naval medical personnel of a higher rank have more positive copying skills than those of a lower rank. Which of the following statement is true of this study?",
    options: [
      {
        id: "a",
        text: "Neither variable is dependent as the researcher cannot manipulate them",
      },
      {
        id: "b",
        text: "The independent variable is rank and the dependent variable is copying skills",
      },
      {
        id: "c",
        text: "The independent variable is copying skills and the dependent variable is rank",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q404",
    question:
      "Indicators are considered positive when they have a direct relationship (association, correlation) with the state of health. Which of the following are the examples of positive indicators?",
    options: [
      {
        id: "a",
        text: "The proportion of cured tuberculosis cases",
      },
      {
        id: "b",
        text: "Incidence of AIDS",
      },
      {
        id: "c",
        text: "Life expectancy at birth",
      },
      {
        id: "d",
        text: "'a' and 'c' e) 'b' and 'd' f) 'a', 'b', 'c' and 'd'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q405",
    question:
      "Which of the following techniques is preferentially used when the population is finite?",
    options: [
      {
        id: "a",
        text: "Purposive sampling technique",
      },
      {
        id: "b",
        text: "Area sampling technique",
      },
      {
        id: "c",
        text: "Systematic sampling technique",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q406",
    question:
      "A study began in 1980 with enrollment of a group of 7000 adults in Pondicherry who were asked about their alcohol consumption, smoking, diet, environmental risk factors etc. All the participants were periodically examined and evaluated for evidence of various types of cancers between 1990-1995. Which of the following study designs was used by the investigators?",
    options: [
      {
        id: "a",
        text: "Case-control study",
      },
      {
        id: "b",
        text: "Prospective cohort study",
      },
      {
        id: "c",
        text: "Ecological study",
      },
      {
        id: "d",
        text: "Retrospective cohort study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q407",
    question:
      "An increased number of postoperative wound infections were recorded in patients who underwent incision appendectomy compared with those who had a laparoscopic procedure. Which of the following statement/s is/are true in such a scenario?",
    options: [
      {
        id: "a",
        text: "This association may simply be owing to the presence of a confounding factor",
      },
      {
        id: "b",
        text: "Association between the two can be better studied in randomized controlled clinical trials",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q408",
    question:
      "In a study to evaluate the effectiveness of a new medication, which of the following will generate a stronger evidence",
    options: [
      {
        id: "a",
        text: "Comparing outcomes among those receiving medication with those not receiving the same.",
      },
      {
        id: "b",
        text: "Comparing outcomes among those receiving higher doses of medication with those receiving lower doses",
      },
      {
        id: "c",
        text: "Comparing adverse events and drug reactions among those receiving medication and those not receiving medication",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q409",
    question:
      "Smart objectives are goals that are designed to be be specific, measurable, achievable, relevant and time-bound. Which of the following is an illustration of nonmeasurable objective?",
    options: [
      {
        id: "a",
        text: "Incidence of colorectal cancers in Indian adult men",
      },
      {
        id: "b",
        text: "Experiences shared by victims of domestic violence",
      },
      {
        id: "c",
        text: "To determine if regular skin emollients applied from 2 weeks of age reduced development of atopic dermatitis by age 12 months in the general infant population",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q410",
    question: "Validity of a research can be improved by:",
    options: [
      {
        id: "a",
        text: "Taking the true representative sample of the population",
      },
      {
        id: "b",
        text: "Eliminating extraneous factors and collecting detailed information on confounding factors",
      },
      {
        id: "c",
        text: "'a' and 'b'",
      },
      {
        id: "d",
        text: "None of these",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q411",
    question:
      "Which of the following is ideally the first step in developing a study?",
    options: [
      {
        id: "a",
        text: "Fixing the title",
      },
      {
        id: "b",
        text: "Formulating the research question",
      },
      {
        id: "c",
        text: "Writing the background",
      },
      {
        id: "d",
        text: "Planning for analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q412",
    question: "Which of the following is a reason for the failure of a study?",
    options: [
      {
        id: "a",
        text: "Poorly stated research question",
      },
      {
        id: "b",
        text: "Unrealistic timeline",
      },
      {
        id: "c",
        text: "Inadequate supervision",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q413",
    question:
      "Which of the following represents the correct sequence in the life cycle of a study? i. Developing research question ii. Planning the data analysis iii. Data collection iv. Data analysis",
    options: [
      {
        id: "a",
        text: "i, iii, iv, ii",
      },
      {
        id: "b",
        text: "i, ii, iii, iv",
      },
      {
        id: "c",
        text: "i, iii, ii, iv",
      },
      {
        id: "d",
        text: "ii, iii, iv, i",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q414",
    question:
      "Which of the following factor is NOT essential for effective planning and management of a study?",
    options: [
      {
        id: "a",
        text: "Time management",
      },
      {
        id: "b",
        text: "Financial management",
      },
      {
        id: "c",
        text: "Reduction of sample size",
      },
      {
        id: "d",
        text: "Team work",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q415",
    question:
      "Which of the following is to be followed while collecting the information elements?",
    options: [
      {
        id: "a",
        text: "Use of variables that best reflect the information element",
      },
      {
        id: "b",
        text: "Standardized case definitions",
      },
      {
        id: "c",
        text: "Use of validated and standardized methods",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q416",
    question:
      "State whether true or false. Framing several study objectives improves the study planning and management",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q417",
    question:
      "State whether true or false. Selection of study design should be related to the objectives.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q418",
    question:
      "A postgraduate wants to do a community based thesis. Which of the following is a part of the planning and program management of the study?",
    options: [
      {
        id: "a",
        text: "Calculating sample size",
      },
      {
        id: "b",
        text: "Arranging transport to community",
      },
      {
        id: "c",
        text: "Writing thesis",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q419",
    question:
      "Which of the following can be used to represent the duration, timeline and sequence of activities and milestones of a research project?",
    options: [
      {
        id: "a",
        text: "Bar chart",
      },
      {
        id: "b",
        text: "Histogram",
      },
      {
        id: "c",
        text: "Gantt chart",
      },
      {
        id: "d",
        text: "Pie chart",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q420",
    question:
      "Who is primarily responsible for resource allocation and time management in a study?",
    options: [
      {
        id: "a",
        text: "Institute where the research is conducted",
      },
      {
        id: "b",
        text: "Principal investigator",
      },
      {
        id: "c",
        text: "Funding agency",
      },
      {
        id: "d",
        text: "Scientific committee",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q421",
    question:
      "Which component of the data collection instrument is constituted by open, closed and semi-open items?",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Identifier",
      },
      {
        id: "c",
        text: "Questions",
      },
      {
        id: "d",
        text: "Concluding statement",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q422",
    question: "Self-administered questionnaire can be",
    options: [
      {
        id: "a",
        text: "Paper-based or computer-assisted",
      },
      {
        id: "b",
        text: "Used in face-to-face interviews",
      },
      {
        id: "c",
        text: "Used in telephonic interviews",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q423",
    question:
      "While formulating the questions, all the following need to be followed, EXCEPT",
    options: [
      {
        id: "a",
        text: "Short and clear questions",
      },
      {
        id: "b",
        text: "Avoid ambiguities",
      },
      {
        id: "c",
        text: "Avoid words of every-day language",
      },
      {
        id: "d",
        text: "Avoid negatives and double negatives",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q424",
    question: "Structured observation guide",
    options: [
      {
        id: "a",
        text: "Is useful to document certain processes",
      },
      {
        id: "b",
        text: "Use checklist of items",
      },
      {
        id: "c",
        text: "Can be used for in-depth interviews",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q425",
    question: "The interviewer does not provide options for responses in",
    options: [
      {
        id: "a",
        text: "Open-ended questions",
      },
      {
        id: "b",
        text: "Close-ended questions",
      },
      {
        id: "c",
        text: "Semi-open questions",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q426",
    question:
      "What is the disadvantage of closed questions with dichotomous options in a study questionnaire?",
    options: [
      {
        id: "a",
        text: "Detailed information available",
      },
      {
        id: "b",
        text: "Oversimplifies the issues",
      },
      {
        id: "c",
        text: "Forces an unclear position",
      },
      {
        id: "d",
        text: "May not be useful for key well framed issues",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q427",
    question:
      "The information about participant's attitudes for behaviors such as wearing helmets, washing hands before eating, constitute",
    options: [
      {
        id: "a",
        text: "Facts",
      },
      {
        id: "b",
        text: "Knowledge",
      },
      {
        id: "c",
        text: "Judgments",
      },
      {
        id: "d",
        text: "Texts",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q428",
    question:
      "The type of questions in which there is a possibility to add other answer in addition to the options suggested",
    options: [
      {
        id: "a",
        text: "Open questions",
      },
      {
        id: "b",
        text: "Semi-open questions",
      },
      {
        id: "c",
        text: "Closed questions",
      },
      {
        id: "d",
        text: "Close questions with multiple options",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q429",
    question:
      "The type of questions in a questionnaire which allow creation of continuous variables as responses",
    options: [
      {
        id: "a",
        text: "Closed questions with quantitative answers",
      },
      {
        id: "b",
        text: "Open questions with quantitative answers",
      },
      {
        id: "c",
        text: "Both of the above",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q430",
    question:
      "All are true regarding the order of questions in a data collection tool EXCEPT",
    options: [
      {
        id: "a",
        text: "From intimate to casual",
      },
      {
        id: "b",
        text: "From general to specific",
      },
      {
        id: "c",
        text: "From simple to complicate",
      },
      {
        id: "d",
        text: "In chronological order, if questions related to sequence of events",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q431",
    question:
      "A question was framed by an ophthalmologist as a part of data collection tool for her research- “Which of the following symptoms you had in the last one week?” The options were 1. Eye pain 2. Redness of eye 3. Watering of eye 4. Low vision Given that a study participant may have multiple complaints, which of the following best describes the type of question?",
    options: [
      {
        id: "a",
        text: "Open question",
      },
      {
        id: "b",
        text: "Closed questions with dichotomous options",
      },
      {
        id: "c",
        text: "Closed question with multiple options",
      },
      {
        id: "d",
        text: "Closed question with quantitative answers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q432",
    question:
      'A researcher has framed a question in the research tool as- "What is the monthly income of the family?" This information constitutes',
    options: [
      {
        id: "a",
        text: "Facts",
      },
      {
        id: "b",
        text: "Knowledge",
      },
      {
        id: "c",
        text: "Judgments",
      },
      {
        id: "d",
        text: "Healthy Life styles",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },

  {
    id: "q433",
    question:
      "Which of the following is correct in relation to an open question?",
    options: [
      {
        id: "a",
        text: "Answers are suggested",
      },
      {
        id: "b",
        text: "Stimulate memory",
      },
      {
        id: "c",
        text: "Easy to code and analysis",
      },
      {
        id: "d",
        text: "Freedom to respond is compromised",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q434",
    question:
      "Glasgow coma Scale (GCS) is a scoring system to understand the consciousness level of a person. The score varies between 3 and 15. A researcher has included a question in research tool- “What is the GCS score during admission?” This question is an example of:",
    options: [
      {
        id: "a",
        text: "Open question",
      },
      {
        id: "b",
        text: "Closed question with dichotomous option",
      },
      {
        id: "c",
        text: "Closed question with multiple option",
      },
      {
        id: "d",
        text: "Closed question with quantitative answers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q435",
    question:
      "An investigator wanted to study the clinical profile of patients presented with foreign body in nose, attended in the emergency department in the last 2 years in a hospital. Which of the following is the most suitable way to collect data?",
    options: [
      {
        id: "a",
        text: "Review of records",
      },
      {
        id: "b",
        text: "Cohort study",
      },
      {
        id: "c",
        text: "Randomized trial",
      },
      {
        id: "d",
        text: "Focus group discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q436",
    question: "Order of a question should be all, except",
    options: [
      {
        id: "a",
        text: "From simple to complicated",
      },
      {
        id: "b",
        text: "From general to specific",
      },
      {
        id: "c",
        text: "From intimate to casual",
      },
      {
        id: "d",
        text: "In chronological order",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q437",
    question: "Structured observation guide",
    options: [
      {
        id: "a",
        text: "Is useful to document certain process",
      },
      {
        id: "b",
        text: "Uses checklist of items",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q438",
    question:
      "Which of the following factors related to data collection may lead to study failures?",
    options: [
      {
        id: "a",
        text: "Poorly defined research question",
      },
      {
        id: "b",
        text: "Vague timelines",
      },
      {
        id: "c",
        text: "Lack of supervision",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q439",
    question:
      "In which of the following type of question the interviewer does not provide options for responses?",
    options: [
      {
        id: "a",
        text: "Open-ended questions",
      },
      {
        id: "b",
        text: "Close-ended questions",
      },
      {
        id: "c",
        text: "Semi-open questions",
      },
      {
        id: "d",
        text: "Closed question with multiple options",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q440",
    question:
      "'Age in years' is commonly a continuous variable. However, a resident doctor decided to ask age as a closed question with dichotomous options (If age>65 years or <65 years). What is the disadvantage of such type of ques in a study questionnaire?",
    options: [
      {
        id: "a",
        text: "Detailed information available",
      },
      {
        id: "b",
        text: "Oversimplifies the issues",
      },
      {
        id: "c",
        text: "Forces an unclear position",
      },
      {
        id: "d",
        text: "It is easy to convert a dichotomous variable to a continuous variable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q441",
    question:
      "Which one of the following is NOT a component of a data collection tool?",
    options: [
      {
        id: "a",
        text: "Informed consent",
      },
      {
        id: "b",
        text: "Concluding statements",
      },
      {
        id: "c",
        text: "Identifiers",
      },
      {
        id: "d",
        text: "Tabulated results",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q442",
    question: "Which of the following is TRUE about a data abstraction form?",
    options: [
      {
        id: "a",
        text: "It is used to collect data by going through records",
      },
      {
        id: "b",
        text: "It is more valid than a questionnaire",
      },
      {
        id: "c",
        text: "It can be self-administered by the participants",
      },
      {
        id: "d",
        text: "It is also called an observational checklist",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q443",
    question: "Which of the following is FALSE about a questionnaire?",
    options: [
      {
        id: "a",
        text: "It can contain instructions or prompts for data collectors",
      },
      {
        id: "b",
        text: "It should contain unique participant identifiers",
      },
      {
        id: "c",
        text: "It should avoid skip patterns",
      },
      {
        id: "d",
        text: "It can contain a mix of open and closed questions",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q444",
    question:
      "Identify the type of the question given below. “How do you spend your leisure time?_____________",
    options: [
      {
        id: "a",
        text: "Open ended",
      },
      {
        id: "b",
        text: "Closed",
      },
      {
        id: "c",
        text: "Semi-open",
      },
      {
        id: "d",
        text: "Open question with closed answers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q445",
    question:
      "Which of the following is TRUE about ‘Open question with closed answers’?",
    options: [
      {
        id: "a",
        text: "Its answers are not suggested to the participants",
      },
      {
        id: "b",
        text: "It can be used in a self-administered questionnaire",
      },
      {
        id: "c",
        text: "It is analyzed like an open ended question",
      },
      {
        id: "d",
        text: "It is expressed as a closed question to the participants",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q446",
    question:
      "What is the type of the question given below? From where do you usually get healthrelated information? i. Television ii. Radio iii. Newspaper iv. Magazine v. Others (specify)________________",
    options: [
      {
        id: "a",
        text: "Open ended",
      },
      {
        id: "b",
        text: "Closed",
      },
      {
        id: "c",
        text: "Semi-open",
      },
      {
        id: "d",
        text: "Open question with closed answers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q447",
    question:
      "Which of the following is FALSE about formulating questions in a study tool?",
    options: [
      {
        id: "a",
        text: "They must be concise and precise",
      },
      {
        id: "b",
        text: "They must use scientific terms",
      },
      {
        id: "c",
        text: "They must use a neutral tone",
      },
      {
        id: "d",
        text: "They must avoid double negatives",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q448",
    question:
      'Which rule is NOT followed in the framing of the question given below? "When and where did you get tested for COVID-19 infection?"',
    options: [
      {
        id: "a",
        text: "Using a neutral tone",
      },
      {
        id: "b",
        text: "Avoiding use of double negatives",
      },
      {
        id: "c",
        text: "Asking a single question at a time",
      },
      {
        id: "d",
        text: "Using simple words of everyday language",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q449",
    question:
      "State whether true or false. Before using a data collection tool in the study, it will be useful to get it reviewed by a statistician.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q450",
    question: "What is FALSE about pilot testing of a study questionnaire?",
    options: [
      {
        id: "a",
        text: "It checks the tool for clarity and acceptability",
      },
      {
        id: "b",
        text: "It is conducted among persons who will be included in the study",
      },
      {
        id: "c",
        text: "It provides an estimate of the duration of interview",
      },
      {
        id: "d",
        text: "Changes are made to the questionnaire based on its findings",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q451",
    question: "Reliability denotes",
    options: [
      {
        id: "a",
        text: "Precision",
      },
      {
        id: "b",
        text: "Repeatability",
      },
      {
        id: "c",
        text: "Reproducibility",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q452",
    question: "This should not be done in data collection",
    options: [
      {
        id: "a",
        text: "Training of staff members",
      },
      {
        id: "b",
        text: "Review of collected data for quality and completeness",
      },
      {
        id: "c",
        text: "Manipulation of data",
      },
      {
        id: "d",
        text: "Validation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q453",
    question:
      "Supportive supervision is essential for a good data collection process",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q454",
    question: "The collected data should be",
    options: [
      {
        id: "a",
        text: "Complete",
      },
      {
        id: "b",
        text: "Readable",
      },
      {
        id: "c",
        text: "Consistent",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q455",
    question:
      "Which of the following is (are) true about the training of data collection staff?",
    options: [
      {
        id: "a",
        text: "Conduct on-site training",
      },
      {
        id: "b",
        text: "Conduct mock training sessions",
      },
      {
        id: "c",
        text: "Training is always optional",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q456",
    question:
      "Which one of the following is the proper way of validating the data?",
    options: [
      {
        id: "a",
        text: "Repetition of full data collection in the same population",
      },
      {
        id: "b",
        text: "Data collection in new population",
      },
      {
        id: "c",
        text: "Repetition of data collection in a randomly selected subset in the same population",
      },
      {
        id: "d",
        text: "Repeat data collection is not required",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q457",
    question:
      "Appropriate means to troubleshoot the difficulties in data collection process",
    options: [
      {
        id: "a",
        text: "Regular review meetings",
      },
      {
        id: "b",
        text: "Facilitate the discussion to identify issues during the review",
      },
      {
        id: "c",
        text: "Clarify the issues experienced by staff during data collection",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q458",
    question:
      "There is no need to present the study and its objectives to the field investigators",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q459",
    question:
      "Which of the following statement is (are) true regarding data collection for an epidemiological study?",
    options: [
      {
        id: "a",
        text: "Reliability refers to consistency of information",
      },
      {
        id: "b",
        text: "Accuracy is the ability of a measurement to be correct on an average",
      },
      {
        id: "c",
        text: "Feasibility is the ability of investigator to understand the data",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q460",
    question:
      "Time pressure during data collection may result in dilution of data quality",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q461",
    question: "A data collection tool should be _____________",
    options: [
      {
        id: "a",
        text: "Valid",
      },
      {
        id: "b",
        text: "Reliable",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "None",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q462",
    question:
      "A neurosurgeon is planning for a hospitalbased study on the patients coming to the emergency department with head injury. The collected data should be",
    options: [
      {
        id: "a",
        text: "Complete",
      },
      {
        id: "b",
        text: "Readable",
      },
      {
        id: "c",
        text: "Consistent",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q463",
    question:
      "Which of the following should not be done in relation to data collection?",
    options: [
      {
        id: "a",
        text: "Training of staff members",
      },
      {
        id: "b",
        text: "Review of collected data for quality and completeness",
      },
      {
        id: "c",
        text: "Validation",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q464",
    question:
      "State whether true or false: Piloting a data collection tool should be done under supervision",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q465",
    question:
      "All of the following are true about a ‘question by question guide’, except",
    options: [
      {
        id: "a",
        text: "It is a document for the data collectors",
      },
      {
        id: "b",
        text: "It helps in maintaining uniformity of the data collection",
      },
      {
        id: "c",
        text: "It helps participants on how to respond",
      },
      {
        id: "d",
        text: "It clarifies doubts on data collection",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q466",
    question:
      "Time pressure during data collection may result in dilution of the data quality",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q467",
    question:
      "Which one of the following is the proper way of validating the data?",
    options: [
      {
        id: "a",
        text: "Repetition of full data collection in the same population",
      },
      {
        id: "b",
        text: "Data collection in a new population",
      },
      {
        id: "c",
        text: "Repetition of data collection in a randomly selected subset in the same population",
      },
      {
        id: "d",
        text: "Repeat data collection not required",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q468",
    question:
      "Which of the following statement is true regarding data collection for an epidemiological study?",
    options: [
      {
        id: "a",
        text: "Reliability refers to consistency of information",
      },
      {
        id: "b",
        text: "Accuracy is the ability of a measurement to be correct on an average",
      },
      {
        id: "c",
        text: "Both ‘a’ and ‘b’",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q469",
    question:
      "Who is mainly responsible to check the accuracy of data collection instruments before leaving the location?",
    options: [
      {
        id: "a",
        text: "Field investigator",
      },
      {
        id: "b",
        text: "Field supervisor",
      },
      {
        id: "c",
        text: "Principle investigator",
      },
      {
        id: "d",
        text: "Study participant",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q470",
    question:
      "All the following statements are true about training of the data collectors, except",
    options: [
      {
        id: "a",
        text: "Essential to ensure good quality data",
      },
      {
        id: "b",
        text: "The investigators should choose the right people",
      },
      {
        id: "c",
        text: "Communication skill is important for the data collectors",
      },
      {
        id: "d",
        text: "Onsite training is not essential for data collectors",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q471",
    question:
      "The ability of an instrument to produce similar results on repeated measurement is called",
    options: [
      {
        id: "a",
        text: "Validity",
      },
      {
        id: "b",
        text: "Reliability",
      },
      {
        id: "c",
        text: "Accuracy",
      },
      {
        id: "d",
        text: "Sensitivity",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q472",
    question:
      "The mean value of fasting blood sugar among 50 healthy volunteers in a community was found to be 90 g/dL with a standard deviation of 5 mg/dL using a new diagnostic test. In the same volunteers, the gold standard test found a mean of 88 g/dL with standard deviation of 4.7 g/dL. What can be said about the new diagnostic test?",
    options: [
      {
        id: "a",
        text: "The new diagnostic test is valid",
      },
      {
        id: "b",
        text: "The new diagnostic test is reliable",
      },
      {
        id: "c",
        text: "The new diagnostic test is valid and reliable",
      },
      {
        id: "d",
        text: "The new diagnostic test is invalid and unreliable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q473",
    question:
      "Which of the following is NOT used as a criterion to judge the quality of data collected in a study?",
    options: [
      {
        id: "a",
        text: "Accuracy",
      },
      {
        id: "b",
        text: "Repeatability",
      },
      {
        id: "c",
        text: "Precision",
      },
      {
        id: "d",
        text: "External validity",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q474",
    question:
      "Which of the following should NOT be done during data collection in a study?",
    options: [
      {
        id: "a",
        text: "Referring to the data collection guide",
      },
      {
        id: "b",
        text: "Checking the quality of data",
      },
      {
        id: "c",
        text: "Modifying the study objectives",
      },
      {
        id: "d",
        text: "Validating the data collection process",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q475",
    question:
      "State whether true or false. Accuracy of an instrument is the ability to measure what it intends to measure.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q476",
    question:
      "Which of the following is the correct sequence of steps of data collection? i. Preparation of data collection guide ii. Checking the collected data for completeness iii. Training of the data collector iv. Validating the collected data",
    options: [
      {
        id: "a",
        text: "i, iv, iii, ii",
      },
      {
        id: "b",
        text: "ii, iii, iv, i",
      },
      {
        id: "c",
        text: "i, iii, ii, iv",
      },
      {
        id: "d",
        text: "iii, i, iv, iii",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q477",
    question:
      "State whether true and false. A data collection guidebook can be revised time to time as issues in the data collection process are identified.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q478",
    question:
      "Which of the following should NOT be done during training of data collectors?",
    options: [
      {
        id: "a",
        text: "Simulating the data collection procedure",
      },
      {
        id: "b",
        text: "Discussing the study objectives with them",
      },
      {
        id: "c",
        text: "Using an early version of the questionnaire for training",
      },
      {
        id: "d",
        text: "Revising the question guide according to queries",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q479",
    question:
      "Which of the following does NOT apply in checking the quality of filled forms during data collection?",
    options: [
      {
        id: "a",
        text: "Completeness",
      },
      {
        id: "b",
        text: "Consistency",
      },
      {
        id: "c",
        text: "Readability",
      },
      {
        id: "d",
        text: "Statistical significance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q480",
    question:
      "During data collection in a study, a data collector is faced with a situation where the participant refuses to answer a particular question in the middle of the interview. What is the appropriate action in this situation?",
    options: [
      {
        id: "a",
        text: "End the interview and report to the investigator",
      },
      {
        id: "b",
        text: "Continue the interview with the remaining questions",
      },
      {
        id: "c",
        text: "Seek the answer to that question from family members",
      },
      {
        id: "d",
        text: "Try to persuade the participant to answer the question somehow",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q481",
    question: "Steps in data management include",
    options: [
      {
        id: "a",
        text: "Defining a variable, creating a study database and dictionary",
      },
      {
        id: "b",
        text: "Enter data, correct errors and create data set for analysis",
      },
      {
        id: "c",
        text: "Backup and archive data set",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q482",
    question: "When we are creating variable name, it should be",
    options: [
      {
        id: "a",
        text: "Clearly understandable and should refer to the questionnaire",
      },
      {
        id: "b",
        text: "Long and can have spaces",
      },
      {
        id: "c",
        text: "Consistent and without duplicates",
      },
      {
        id: "d",
        text: "'a' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q483",
    question: "In a data management system, each row represents a",
    options: [
      {
        id: "a",
        text: "Variable",
      },
      {
        id: "b",
        text: "Record",
      },
      {
        id: "c",
        text: "Heading",
      },
      {
        id: "d",
        text: "Appendix",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q484",
    question:
      "What is (are) the specifications that we need to check before doing data entry?",
    options: [
      {
        id: "a",
        text: "Minimum and maximum values, legal codes, skip patterns",
      },
      {
        id: "b",
        text: "Record name and description of record",
      },
      {
        id: "c",
        text: "Automatic coding, coping data from preceding record and calculations",
      },
      {
        id: "d",
        text: "'a' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q485",
    question: "Identifier in the database is (are)",
    options: [
      {
        id: "a",
        text: "Unique",
      },
      {
        id: "b",
        text: "Maintained by a computerized index",
      },
      {
        id: "c",
        text: "Secured by quality assurance procedures",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q486",
    question: "Key elements of data management",
    options: [
      {
        id: "a",
        text: "Data structure and data entry",
      },
      {
        id: "b",
        text: "Individual and aggregated databases",
      },
      {
        id: "c",
        text: "Mother and daughter databases",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q487",
    question: "The design of data collection instrument",
    options: [
      {
        id: "a",
        text: "Data entry friendly",
      },
      {
        id: "b",
        text: "Outline of major data collection topics/items",
      },
      {
        id: "c",
        text: "Auto coding function",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q488",
    question: "When we are coding for data entry, we should",
    options: [
      {
        id: "a",
        text: "Prefer numerical coding",
      },
      {
        id: "b",
        text: "Use highly complex codes",
      },
      {
        id: "c",
        text: "Decide on the codes for 'missing values' and 'not applicable' items",
      },
      {
        id: "d",
        text: "'a' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q489",
    question:
      "When information is available at various levels (e.g. at Village, Household, Individual and Illness episode), we can store information at each level in separate databases and link when necessary",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q490",
    question:
      "Which of the following is (are) not true about normalized database?",
    options: [
      {
        id: "a",
        text: "Normalized database facilitates further aggregation",
      },
      {
        id: "b",
        text: "It has only one count by record",
      },
      {
        id: "c",
        text: "Normalized database does not facilitate further data aggregation",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q491",
    question:
      "A post-graduate researcher has completed the data collection for her thesis. During data management, she should do all the following, except",
    options: [
      {
        id: "a",
        text: "Applying for the ethics committee clearance",
      },
      {
        id: "b",
        text: "Create study database",
      },
      {
        id: "c",
        text: "Create dataset for analysis",
      },
      {
        id: "d",
        text: "Back-up dataset",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q492",
    question:
      "Data documentation includes information about the following items",
    options: [
      {
        id: "a",
        text: "Structure (Name, number of records etc) alone",
      },
      {
        id: "b",
        text: "Storage information (Media, location, backup information)",
      },
      {
        id: "c",
        text: "Structure (Name, number of records etc), Variables (Name, values, coding), History (Creation, modification), and Storage information (Media, location, backup information)",
      },
      {
        id: "d",
        text: "Structure (Name, number of records etc), Storage information (Media, location, backup information), and Variables (Name, values, coding)",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q493",
    question: "A variable name should be",
    options: [
      {
        id: "a",
        text: "Clearly understandable and should refer to the questionnaire",
      },
      {
        id: "b",
        text: "Short, no space",
      },
      {
        id: "c",
        text: "Consistent and without duplicates",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q494",
    question: "Design of data entry can be broadly outlined as",
    options: [
      {
        id: "a",
        text: "Identifier, Demographics, Outcome, and Exposure",
      },
      {
        id: "b",
        text: "Informed consent, Identifier, and Demographics",
      },
      {
        id: "c",
        text: "Identifier, Demographics, Outcome and data analysis plan",
      },
      {
        id: "d",
        text: "Informed consent, Identifier, Demographics, Outcome and data analysis plan",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q495",
    question:
      "All of the following are true about ‘Coding’ a new variable, except",
    options: [
      {
        id: "a",
        text: "Prefer numerical coding",
      },
      {
        id: "b",
        text: "Decide on missing values while coding",
      },
      {
        id: "c",
        text: "Avoid cumbersome codes",
      },
      {
        id: "d",
        text: "Coding with ‘0’ and ‘1’ should be avoided for dichotomous variables",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q496",
    question:
      "Data entry can be considered as an opportunity to partially clean the data",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q497",
    question:
      "A researcher in diabetes expected that that the fasting blood sugar levels may take any value between 50 and 150 gm/dL. In this research any coding of missing value as 99 may lead to an erroneous result.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q498",
    question:
      "While documenting the storage information of the database, we need to document",
    options: [
      {
        id: "a",
        text: "Investigators information",
      },
      {
        id: "b",
        text: "Time, place, person information",
      },
      {
        id: "c",
        text: "Media, location and backup information",
      },
      {
        id: "d",
        text: "Hardware configuration",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q499",
    question:
      "Which of the following is incorrect in relation to the data catalogue?",
    options: [
      {
        id: "a",
        text: "It describes all the variable for any future reference",
      },
      {
        id: "b",
        text: "It is useful if we share the data with others",
      },
      {
        id: "c",
        text: "It is useful to know how a variable has been coded",
      },
      {
        id: "d",
        text: "It is advisable to exclude the missing values from data catalogue",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q500",
    question: "Which of the following is incorrect about normalized database?",
    options: [
      {
        id: "a",
        text: "Normalized database facilitates further aggregation",
      },
      {
        id: "b",
        text: "It has only one count by record",
      },
      {
        id: "c",
        text: "Normalized database does not facilitate further data aggregation",
      },
      {
        id: "d",
        text: "Both ‘b’ and ‘c’",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q501",
    question: "Which of the following is FALSE about Unique Identifier (ID)?",
    options: [
      {
        id: "a",
        text: "It can be same for more than one participant in a study",
      },
      {
        id: "b",
        text: "It can be alphanumeric",
      },
      {
        id: "c",
        text: "It can be a composite number",
      },
      {
        id: "d",
        text: "It can be used to maintain the anonymity of participants",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q502",
    question:
      "Which of the following is NOT a quality assurance measure in designing a data entry form?",
    options: [
      {
        id: "a",
        text: "Using legal values",
      },
      {
        id: "b",
        text: "Using minimum and maximum values",
      },
      {
        id: "c",
        text: "Avoiding skip patterns",
      },
      {
        id: "d",
        text: "Use of automatic coding",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q503",
    question: "In a data management system each column represents a(n)-",
    options: [
      {
        id: "a",
        text: "Variable",
      },
      {
        id: "b",
        text: "Record",
      },
      {
        id: "c",
        text: "Heading",
      },
      {
        id: "d",
        text: "Appendix",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q504",
    question:
      "Which of the following is FALSE about Mother-Daughter databases?",
    options: [
      {
        id: "a",
        text: "Information is collected at various levels",
      },
      {
        id: "b",
        text: "Information of each level is stored in a different database",
      },
      {
        id: "c",
        text: "They can be linked by a common index identifier",
      },
      {
        id: "d",
        text: "Each database cannot have its own unique identifier system",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q505",
    question:
      "State whether true or false. Coding with ‘0’ and ‘1’ should be avoided for dichotomous variables.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q506",
    question: "Which of the following is FALSE about data dictionary?",
    options: [
      {
        id: "a",
        text: "It is created after the data entry is started",
      },
      {
        id: "b",
        text: "It contains the values assigned to the variables",
      },
      {
        id: "c",
        text: "It gives a brief description of the variables",
      },
      {
        id: "d",
        text: "It links the variables in the database to the questionnaire",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q507",
    question:
      "Identify the type of variable in this question. “Have you ever smoked cigarettes? i. Yes ii. No",
    options: [
      {
        id: "a",
        text: "Categorical",
      },
      {
        id: "b",
        text: "Ordinal",
      },
      {
        id: "c",
        text: "Continuous",
      },
      {
        id: "d",
        text: "Discrete",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q508",
    question:
      "In a study on cancer, the ‘stage of cancer’ was recorded as Stage I, Stage II, Stage III and Stage IV. Which of the following variable types best describes the ‘stage of cancer’?",
    options: [
      {
        id: "a",
        text: "Nominal",
      },
      {
        id: "b",
        text: "Ordinal",
      },
      {
        id: "c",
        text: "Categorical",
      },
      {
        id: "d",
        text: "Continuous",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q509",
    question:
      "In a study with 100 participants, age was recorded as a continuous variable. During data entry, it was seen that age was missing in the forms for 13 people. Which of the following is TRUE in this situation?",
    options: [
      {
        id: "a",
        text: "Missing values can be coded as ‘999’",
      },
      {
        id: "b",
        text: "Age variable should be removed from the study",
      },
      {
        id: "c",
        text: "An arbitrary value can be assigned by the data entry operator",
      },
      {
        id: "d",
        text: "Participants with missing age should be removed from the study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q510",
    question:
      "State whether true or false. While entering the systolic blood pressure (expected value 60 to 200) value in a database, coding the missing value as 99 may lead to an erroneous result.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q511",
    question: "The three stages of data analysis are in the following order",
    options: [
      {
        id: "a",
        text: "Descriptive stage, analytical stage and recoding stage",
      },
      {
        id: "b",
        text: "Recoding stage, descriptive stage and analytical stage",
      },
      {
        id: "c",
        text: "Analytical stage, descriptive stage and recoding stage",
      },
      {
        id: "d",
        text: "Descriptive stage, coding stage, recoding stage",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q512",
    question: "We need to avoid the following while performing data analysis",
    options: [
      {
        id: "a",
        text: "Post hoc analysis",
      },
      {
        id: "b",
        text: "Data drenching",
      },
      {
        id: "c",
        text: "Stratified data analysis",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q513",
    question:
      "In the descriptive stage of analysis, we use logistic regression models",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q514",
    question: '"Epi-Info" is a software used for data entry and data analysis',
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q515",
    question:
      "In analytical stage of data analysis, we perform the following in order",
    options: [
      {
        id: "a",
        text: "Stratified analysis, univariate analysis and multivariate analysis",
      },
      {
        id: "b",
        text: "Univariate analysis, stratified analysis and multivariate analysis",
      },
      {
        id: "c",
        text: "Multivariate analysis, univariate analysis and stratified analysis",
      },
      {
        id: "d",
        text: "Frequency analysis and univariate analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q516",
    question:
      "Among the seven steps of data analysis strategy, the sequence of data analysis is as follows A. Conduct advanced analysis B. Identify main variables C. Become familiar with the data D. Identify study type E. Examine outcome/exposure association F. Characterize study population G. Create additional two-way tables",
    options: [
      {
        id: "a",
        text: "A, B, C, D, E, F, G",
      },
      {
        id: "b",
        text: "G, E, F, D, A, B, C",
      },
      {
        id: "c",
        text: "D, B, C, F, E, G, A",
      },
      {
        id: "d",
        text: "E, F, G, C, A, B, D",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q517",
    question:
      "In case of descriptive studies, which of the following is wrong?",
    options: [
      {
        id: "a",
        text: "We describe the study outcome for 1 group",
      },
      {
        id: "b",
        text: "We compare the study outcome for 2 groups",
      },
      {
        id: "c",
        text: "We calculate the incidence for cohort or surveillance data",
      },
      {
        id: "d",
        text: "We calculate prevalence for cross sectional survey",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q518",
    question:
      "If we are doing an analytical study and the study outcome is of acute nature and rare condition what is the appropriate (i) study design and (ii) measure of association?",
    options: [
      {
        id: "a",
        text: "Cohort study - Relative risk",
      },
      {
        id: "b",
        text: "Case-control study - Odds ratio",
      },
      {
        id: "c",
        text: "Cross-sectional study - Prevalence ratio",
      },
      {
        id: "d",
        text: "Surveillance - Incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q519",
    question: "Analysis plan depends on",
    options: [
      {
        id: "a",
        text: "Objectives of the study",
      },
      {
        id: "b",
        text: "Budget",
      },
      {
        id: "c",
        text: "Study type (Descriptive or analytical)",
      },
      {
        id: "d",
        text: "'a' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q520",
    question:
      "Use of spreadsheets, such as Excel, should be avoided for data management and analysis",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q521",
    question:
      "Multivariate regression models are used during the descriptive stage of analysis",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q522",
    question:
      "“Epi-Info” is a software that can be used to create data collection instrument format",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q523",
    question: "In a research study the analysis plan depends on",
    options: [
      {
        id: "a",
        text: "Objectives and study type",
      },
      {
        id: "b",
        text: "Allocated budget",
      },
      {
        id: "c",
        text: "Availability of the statistician",
      },
      {
        id: "d",
        text: "Existing time for analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q524",
    question:
      "At the time of data cleaning, which of the following is not done?",
    options: [
      {
        id: "a",
        text: "Checking and removing duplicates",
      },
      {
        id: "b",
        text: "Dealing with missing observations",
      },
      {
        id: "c",
        text: "Calculating strength of association",
      },
      {
        id: "d",
        text: "Checking range and legal values",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q525",
    question: "To describe the study population characteristics we need to",
    options: [
      {
        id: "a",
        text: "Calculate the frequency distribution",
      },
      {
        id: "b",
        text: "Calculate measures of association",
      },
      {
        id: "c",
        text: "Look for correlation between variables",
      },
      {
        id: "d",
        text: "perform multivariable regression",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q526",
    question:
      "While examining the association between exposure and outcome based on a priori hypotheses, we compare frequency of exposures between cases and controls using appropriate measure of association",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q527",
    question:
      "If we are doing an analytical study and the study outcome is of acute nature and a frequent condition what is the appropriate (i) study design and (ii) measure of association?",
    options: [
      {
        id: "a",
        text: "Cohort study - relative risk",
      },
      {
        id: "b",
        text: "Case-control study – odds ratio",
      },
      {
        id: "c",
        text: "Cross sectional study - Prevalence",
      },
      {
        id: "d",
        text: "Surveillance - Incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q528",
    question: "Which of the following statements are CORRECT",
    options: [
      {
        id: "a",
        text: "Plan for data analysis is made at the end of the study",
      },
      {
        id: "b",
        text: "Recoding can be done for key variables",
      },
      {
        id: "c",
        text: "Multivariate analysis is done before doing a univariate analysis",
      },
      {
        id: "d",
        text: "Data drenching is acceptable",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q529",
    question:
      "Which of the following is the correct sequence for data analysis i. Multivariate analysis ii. Recoding iii. Measures of association iv. Frequency distribution",
    options: [
      {
        id: "a",
        text: "ii, iii, iv, i",
      },
      {
        id: "b",
        text: "i, iii, iv ii",
      },
      {
        id: "c",
        text: "ii, iv, iii, i",
      },
      {
        id: "d",
        text: "iii, iv, i, ii",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q530",
    question: "Spreadsheets are ideal tools for data entry and analysis",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q531",
    question:
      "All the following are done to characterize the study population EXCEPT",
    options: [
      {
        id: "a",
        text: "Provide frequency distribution of age",
      },
      {
        id: "b",
        text: "Provide percentages of gender",
      },
      {
        id: "c",
        text: "Compare baseline characteristics of study groups",
      },
      {
        id: "d",
        text: "Conduct logistic regression analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q532",
    question:
      "Which of the following is the appropriate measure of association in a case-control study?",
    options: [
      {
        id: "a",
        text: "Odds ratio",
      },
      {
        id: "b",
        text: "Prevalence ratio",
      },
      {
        id: "c",
        text: "Relative risk",
      },
      {
        id: "d",
        text: "Incidence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q533",
    question:
      "State whether true or false. Prevalence ratio is one of the measures of association calculated in an analytical cross-sectional study.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q534",
    question:
      "State whether true or false. Hypothesis testing is conducted in an analytical epidemiological study.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q535",
    question:
      "Identify the correct sequence in the steps of data analysis. i. Identify exposure, outcome and other variables ii. Check data for consistency, duplicates and missing values iii. Examine association between outcome and exposure iv. Examine baseline characteristics of the study population",
    options: [
      {
        id: "a",
        text: "i, ii, iii, iv",
      },
      {
        id: "b",
        text: "i, ii, iv, iii",
      },
      {
        id: "c",
        text: "ii, iv, i, iii",
      },
      {
        id: "d",
        text: "iii, i, ii, iv",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q536",
    question:
      "Which of the following is NOT done during the analytic stage of data analysis?",
    options: [
      {
        id: "a",
        text: "Calculating frequency of the outcome in one group",
      },
      {
        id: "b",
        text: "Calculating frequency of the outcome by age and gender",
      },
      {
        id: "c",
        text: "Calculating odds ratio between exposure and outcome",
      },
      {
        id: "d",
        text: "Applying logistic regression",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q537",
    question:
      "Relative risk is calculated in which of the following study designs?",
    options: [
      {
        id: "a",
        text: "Cross-sectional study",
      },
      {
        id: "b",
        text: "Cohort study",
      },
      {
        id: "c",
        text: "Case study",
      },
      {
        id: "d",
        text: "Case control study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q538",
    question:
      "State whether true or false. Risk ratio can be calculated in a descriptive crosssectional study.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q539",
    question:
      "In a case-control study to examine the association between mobile phone use and acoustic neuroma, 24 cases of acoustic neuroma and 72 hospital controls were recruited from the ENT department of a medical college in Gilgit. History of mobile phone use (>6 hours/day) was ascertained using a standard questionnaire. Exposure was present among 16 cases and 18 controls. Calculate the measure of association.",
    options: [
      {
        id: "a",
        text: "Odds ratio 1.5",
      },
      {
        id: "b",
        text: "Relative risk 1.5",
      },
      {
        id: "c",
        text: "Odds ratio 6",
      },
      {
        id: "d",
        text: "Relative risk 6",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q540",
    question:
      "In a case control conducted taking 100 autism children and 200 normal children in Bhopal city, it was found that 90 autism children and 60 normal children had a history of instrumental delivery. Calculate the measure of association between instrumental delivery and autism.",
    options: [
      {
        id: "a",
        text: "12",
      },
      {
        id: "b",
        text: "21",
      },
      {
        id: "c",
        text: "6",
      },
      {
        id: "d",
        text: "9",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q541",
    question:
      "In which of the following guidelines, discussion on rationale and justification of risk benefit analysis of research and voluntary consent in research was initiated?",
    options: [
      {
        id: "a",
        text: "Belmont report",
      },
      {
        id: "b",
        text: "Helsinki declaration",
      },
      {
        id: "c",
        text: "Nuremberg code",
      },
      {
        id: "d",
        text: "CIOMS guidelines",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q542",
    question:
      "In which type of the following study/studies is (are) informed consent not necessary?",
    options: [
      {
        id: "a",
        text: "Investigation of an outbreak",
      },
      {
        id: "b",
        text: "Analysis of mortality data of 2001-2010",
      },
      {
        id: "c",
        text: "Using verbal autopsy to determine the cause of death",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q543",
    question:
      "In which of the following type of research, ethical review is (are) mandatory?",
    options: [
      {
        id: "a",
        text: "Prevalence of HIV infection using blood investigation",
      },
      {
        id: "b",
        text: "Awareness about diabetes using questionnaire only",
      },
      {
        id: "c",
        text: "Calculate out of pocket expenditure using secondary data",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q544",
    question:
      "Which of the following is not important in the context of an informed consent document?",
    options: [
      {
        id: "a",
        text: "Detailed description of study procedures",
      },
      {
        id: "b",
        text: "Budget of the study",
      },
      {
        id: "c",
        text: "Details regarding compensation and post-trial access to care",
      },
      {
        id: "d",
        text: "Contact details of the Principal Investigator",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q545",
    question:
      "In the middle of a clinical trial, one participant decides to withdraw from the trial. But, the investigator pressurizes the participant to continue in the study till it completes. Which of the following ethical principles does the investigator violate?",
    options: [
      {
        id: "a",
        text: "Justice",
      },
      {
        id: "b",
        text: "Autonomy",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "Non-Maleficence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q546",
    question:
      "Which of the following are not ethical practices in health research?",
    options: [
      {
        id: "a",
        text: "Taking informed consent from participants prior to study participation",
      },
      {
        id: "b",
        text: "Giving lot of money to increase study participation",
      },
      {
        id: "c",
        text: "Lack of adherence to study protocol",
      },
      {
        id: "d",
        text: "'b' and 'c'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q547",
    question:
      '"Do no harm" concept was emphasized in which of the following ethical principles?',
    options: [
      {
        id: "a",
        text: "Justice",
      },
      {
        id: "b",
        text: "Autonomy",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "Non-Maleficence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q548",
    question:
      "Genetic research that involves human participants and conducted by a private research institute should follow",
    options: [
      {
        id: "a",
        text: "ICMR Guidelines",
      },
      {
        id: "b",
        text: "Genome Policy and Genetic Research [2000]",
      },
      {
        id: "c",
        text: "Both 'a' and 'b'",
      },
      {
        id: "d",
        text: "Neither 'a' nor 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q549",
    question:
      "While conducting research among tribal populations, which of the following is recommended?",
    options: [
      {
        id: "a",
        text: "Consent from the tribal head (Group consent) is desirable",
      },
      {
        id: "b",
        text: "Group consent can replace individual consent",
      },
      {
        id: "c",
        text: "Women can be excluded from informed consent process",
      },
      {
        id: "d",
        text: "Confidentiality not required",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q550",
    question:
      "In a clinical research, the researcher knowingly excludes recruitment of female participants without any compelling indications. Which of the following ethical principle does the investigator violate?",
    options: [
      {
        id: "a",
        text: "Justice",
      },
      {
        id: "b",
        text: "Autonomy",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "Non-Maleficence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q551",
    question:
      "In which of the following situations is ethics review essential?",
    options: [
      {
        id: "a",
        text: "When already available or archived data are used for research",
      },
      {
        id: "b",
        text: "Involving some risk when some questions are asked, some samples are collected or some drugs are given",
      },
      {
        id: "c",
        text: "‘a’ and ‘b’",
      },
      {
        id: "d",
        text: "Only ‘b’",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q552",
    question:
      "A study participant can be forced by the investigator to continue in a trial against his will. This is in conflict with which of the following ethical principles?",
    options: [
      {
        id: "a",
        text: "Autonomy",
      },
      {
        id: "b",
        text: "Justice",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q553",
    question:
      "The physician should do what is medically indicated, do good than possible harm. This principle is encompassed in the ethical dimension of:",
    options: [
      {
        id: "a",
        text: "Beneficence",
      },
      {
        id: "b",
        text: "Justice",
      },
      {
        id: "c",
        text: "Nonmaleficence",
      },
      {
        id: "d",
        text: "Autonomy",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q554",
    question:
      "Study monitors, regulators and ethics committee members have an authority to verify the consent documentation of research participants.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q555",
    question: "Which of the following is not true about an Informed Consent?",
    options: [
      {
        id: "a",
        text: "IC helps participants take an informed decision about participation in the research study",
      },
      {
        id: "b",
        text: "IC has information on potential risks and benefits of the study",
      },
      {
        id: "c",
        text: "IC process intends to protect the study participants",
      },
      {
        id: "d",
        text: "IC taken by coercion is considered valid",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q556",
    question: "Which of the following have the guidance in the Belmont report?",
    options: [
      {
        id: "a",
        text: "The procedure of ‘informed consent’",
      },
      {
        id: "b",
        text: "The basic ethics principles of autonomy, justice and beneficence",
      },
      {
        id: "c",
        text: "Review by ethics committee",
      },
      {
        id: "d",
        text: "All of the above e) None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q557",
    question:
      "Which of the following is typically not within the domain of ethical review of the proposed research?",
    options: [
      {
        id: "a",
        text: "Novelty of research",
      },
      {
        id: "b",
        text: "Competence of researchers",
      },
      {
        id: "c",
        text: "Relevance of research",
      },
      {
        id: "d",
        text: "To advocate for the study in the community",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q558",
    question:
      "The process of Informed consent can be repeated several times during the research study if necessary.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q559",
    question:
      "As part of evaluation of a new vaccine which requires taking a daily oral dose of a refrigerated vaccine, the research team offers to provide a refrigerator to families of participants who don’t have one. Which of the following ethical issues the Institutional Ethics Committee will have to deal with while reviewing the research study?",
    options: [
      {
        id: "a",
        text: "Undue inducement",
      },
      {
        id: "b",
        text: "Coercion",
      },
      {
        id: "c",
        text: "Compromising principle of justice",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q560",
    question:
      "In an observational study on menstrual hygiene among school going girls aged 14 to 16 years, informed assent will be required to be taken from the adolescent girls. In addition, informed consent will be required from:",
    options: [
      {
        id: "a",
        text: "Parent of adolescent girls",
      },
      {
        id: "b",
        text: "Institutional Head",
      },
      {
        id: "c",
        text: "Both",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q561",
    question:
      "State whether true or false. Review of health records for research does NOT require approval of institute ethics committee",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q562",
    question:
      "A participant wants to withdraw from a study before its completion. Which of the following principles of ethics entitles him/her to do so?",
    options: [
      {
        id: "a",
        text: "Autonomy",
      },
      {
        id: "b",
        text: "Justice",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "Non-maleficence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q563",
    question:
      "Which of the following does NOT describe ethical principles in research?",
    options: [
      {
        id: "a",
        text: "Nuremberg code",
      },
      {
        id: "b",
        text: "Helsinki declaration",
      },
      {
        id: "c",
        text: "Council for International Organization and Medical Sciences",
      },
      {
        id: "d",
        text: "Bhore report",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q564",
    question:
      "When a research study is planned among adolescents (12-15 years), the following is NOT required?",
    options: [
      {
        id: "a",
        text: "Assent from participant",
      },
      {
        id: "b",
        text: "Consent from participant",
      },
      {
        id: "c",
        text: "Consent from parent",
      },
      {
        id: "d",
        text: "Consent from legally accepted representative",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q565",
    question: "Non-Maleficence means",
    options: [
      {
        id: "a",
        text: "Self-respect",
      },
      {
        id: "b",
        text: "Do no harm",
      },
      {
        id: "c",
        text: "Fair and correct",
      },
      {
        id: "d",
        text: "Doing good",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q566",
    question:
      "State whether true or false. Once a participant has provided informed consent, it cannot be withdrawn.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q567",
    question: "Which of these is NOT a part of informed consent process?",
    options: [
      {
        id: "a",
        text: "Confidentiality",
      },
      {
        id: "b",
        text: "Disclosure of risks and benefits",
      },
      {
        id: "c",
        text: "Compensation for lost wages",
      },
      {
        id: "d",
        text: "Encouraging the person to consent",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q568",
    question: "Which of the following statement is NOT correct?",
    options: [
      {
        id: "a",
        text: "Compensation for participants is offered for trial related injury",
      },
      {
        id: "b",
        text: "Research participants can be paid for travel expenses",
      },
      {
        id: "c",
        text: "Payment can be offered to encourage participation",
      },
      {
        id: "d",
        text: "Wage loss of the participants can be compensated",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q569",
    question:
      "Which of the following is NOT a responsibility of the Institutional Ethics Committee?",
    options: [
      {
        id: "a",
        text: "Evaluate the potential benefit from the study to the community",
      },
      {
        id: "b",
        text: "Protect the rights of the study participants",
      },
      {
        id: "c",
        text: "Sanction funding for the study",
      },
      {
        id: "d",
        text: "Re-evaluate the study if and when modified",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q570",
    question:
      "When a particular ethnic group is excluded from a research study without any valid, scientific reason(s), this is breach of -",
    options: [
      {
        id: "a",
        text: "Autonomy",
      },
      {
        id: "b",
        text: "Justice",
      },
      {
        id: "c",
        text: "Beneficence",
      },
      {
        id: "d",
        text: "Non maleficence --------------------------------",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q571",
    question:
      "A study design that randomly assigns participants into an experimental group or a control group is call as",
    options: [
      {
        id: "a",
        text: "Cohort study",
      },
      {
        id: "b",
        text: "Case-control study",
      },
      {
        id: "c",
        text: "Randomized controlled trials",
      },
      {
        id: "d",
        text: "Cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q572",
    question:
      "Which of the following statements is (are) true in case of adverse events in a clinical trial?",
    options: [
      {
        id: "a",
        text: "An unexpected clinical/familial/social problem that occurs during treatment with a drug or other therapy is termed as adverse event",
      },
      {
        id: "b",
        text: "Adverse events do not have to be caused by the drug or therapy under trial",
      },
      {
        id: "c",
        text: "Temporal relationship between study product administration and adverse events is critically important",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q573",
    question:
      "To ensure that safety and welfare of the research participants is adequately protected, it is important that the clinical trial protocol is critically reviewed for the following",
    options: [
      {
        id: "a",
        text: "Scientific content",
      },
      {
        id: "b",
        text: "Ethical issues",
      },
      {
        id: "c",
        text: "Regulatory norms",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q574",
    question: "Informed consent is provided after explanation of",
    options: [
      {
        id: "a",
        text: "All study procedures",
      },
      {
        id: "b",
        text: "Risks",
      },
      {
        id: "c",
        text: "Benefits",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q575",
    question:
      "Bodies like Drug Controller General of India (DCGI) and Health Ministry Screening Committee (HMSC) are concerned with the following",
    options: [
      {
        id: "a",
        text: "Regulatory review",
      },
      {
        id: "b",
        text: "Scientific review",
      },
      {
        id: "c",
        text: "Ethics review",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q576",
    question: "Which of the following is (are) monitored in a clinical trial?",
    options: [
      {
        id: "a",
        text: "Adherence to Good Clinical Practice (GCP)",
      },
      {
        id: "b",
        text: "Documentation of informed consent, randomization and study product administration",
      },
      {
        id: "c",
        text: "Adverse events reporting",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q577",
    question:
      "The primary responsibilities of the Data Safety Monitoring Body (DSMB) are to",
    options: [
      {
        id: "a",
        text: "Periodically review and evaluate the accumulated study data for participant safety, study conduct and progress of trial",
      },
      {
        id: "b",
        text: "Periodically review and evaluate the accumulated study data for participant safety, study conduct and progress and make recommendation concerning the continuation, modification, or termination of the trial",
      },
      {
        id: "c",
        text: "Periodically make recommendations concerning the continuation, modification, or termination of the trial",
      },
      {
        id: "d",
        text: "Decide the randomization sequence",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q578",
    question:
      "Which of the following best describes the advantages of conducting a Randomized controlled trial?",
    options: [
      {
        id: "a",
        text: "It is only effective design for overcoming selection bias of participants",
      },
      {
        id: "b",
        text: "The result can be readily generalized",
      },
      {
        id: "c",
        text: "It is a simple, uncomplicated and nonregulated study design",
      },
      {
        id: "d",
        text: "It requires small sample size",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q579",
    question:
      "Investigators are required to report adverse events occurring during a clinical trial to which of the following agencies?",
    options: [
      {
        id: "a",
        text: "Regulatory authority",
      },
      {
        id: "b",
        text: "Sponsor",
      },
      {
        id: "c",
        text: "Institutional Ethics Committee",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q580",
    question:
      "A method of allocating treatment such that each subject has an equal chance of receiving any of the possible treatments in a clinical trial is known as:",
    options: [
      {
        id: "a",
        text: "Blinding",
      },
      {
        id: "b",
        text: "Randomization",
      },
      {
        id: "c",
        text: "Allocation concealment",
      },
      {
        id: "d",
        text: "None of the above.",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q581",
    question:
      "Which of the following statements regarding document storage and archival after the conclusion of a trial; is correct?",
    options: [
      {
        id: "a",
        text: "If the data is computerized, there is no need to archive paper based records.",
      },
      {
        id: "b",
        text: "The investigator has a right to refuse to show the data even to regulatory authorities",
      },
      {
        id: "c",
        text: "Archival for a period of 5 - 15 years as per the requirement of the sponsor may be necessary",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q582",
    question: "Which of the following is not true?",
    options: [
      {
        id: "a",
        text: "Data Safety Monitoring Body (DSMB) is an independent entity.",
      },
      {
        id: "b",
        text: "DSMB is appointed by the Investigators",
      },
      {
        id: "c",
        text: "DSMB periodically reviews and evaluates the accumulated study data for participants’ safety",
      },
      {
        id: "d",
        text: "DSMB assures that the scientific integrity of the trial is maintained during the period of interim analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q583",
    question:
      "An unexpected clinical/ familial/ social problem that occurs while on treatment with a drug or other therapy during participation in a clinical trial without any judgment about causality or relationship to the drug is known as:",
    options: [
      {
        id: "a",
        text: "Serious adverse event",
      },
      {
        id: "b",
        text: "Adverse event",
      },
      {
        id: "c",
        text: "Reportable event",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q584",
    question:
      "Clinical trials require review at various levels as per the in-country guidelines. State whether true or false.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q585",
    question:
      "The most common method of preventing potential harm to study participants is by adhering to ‘trial stoppage rules’ based on evidence on unacceptable toxicity or adverse effects rates seen during monitoring. State whether true or false.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q586",
    question:
      "Which of the following is true about screening protocol of a clinical trial?",
    options: [
      {
        id: "a",
        text: "Those who are interested in participating in the trial participate in an interview may have to undergo medical examination",
      },
      {
        id: "b",
        text: "Eligibility of the potential participant is determined in screening",
      },
      {
        id: "c",
        text: "Information on study related procedures and inclusion and exclusion criteria are provided by the study investigators to the potential participants",
      },
      {
        id: "d",
        text: "All the above three statements are true e) None of the above is true f) Only ‘a’ is true",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q587",
    question:
      "Reimbursements for which of the following raise no ethical questions?",
    options: [
      {
        id: "a",
        text: "Compensating for the time spent in coming over and the loss of daily wages due to participation",
      },
      {
        id: "b",
        text: "For the travel cost involved",
      },
      {
        id: "c",
        text: "For food expenses",
      },
      {
        id: "d",
        text: "Only ‘a’ and ‘b’ e) ‘a’, ‘b’ and ‘c’",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q588",
    question: "Which of the following statements is wrong?",
    options: [
      {
        id: "a",
        text: "Drug Controller General of India is a Regulatory Authority in India",
      },
      {
        id: "b",
        text: "Institutional Governing Board is responsible for scientific review of projects",
      },
      {
        id: "c",
        text: "Institutional Ethics Committee is responsible for ethics review of a proposal",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q589",
    question:
      "Which of the following are NOT methods for identifying and preventing potential harm to study participants?",
    options: [
      {
        id: "a",
        text: "Adverse and serious adverse events reporting",
      },
      {
        id: "b",
        text: "Periodic review of the project by Data Safety Monitoring Board",
      },
      {
        id: "c",
        text: "Close watch on enrolment targets",
      },
      {
        id: "d",
        text: "Regular monitoring of the trial by a preidentified monitoring agency",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q590",
    question:
      "State whether true or false. The scientific advisory committee examines the safety and welfare of the research participants in a trial.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q591",
    question:
      "If the project is getting funded internationally, which of the following committees looks at the regulatory affairs?",
    options: [
      {
        id: "a",
        text: "Health ministry screening committee",
      },
      {
        id: "b",
        text: "Genetic engineering approval committee",
      },
      {
        id: "c",
        text: "Ethics committee",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q592",
    question:
      "State whether true or false. In order for a clinical trial to be ethically appropriate, participants must give their informed voluntary consent.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q593",
    question:
      "Which of the following is FALSE with regard to data analysis in clinical trials?",
    options: [
      {
        id: "a",
        text: "Baseline characteristics of participants should be compared across study arms",
      },
      {
        id: "b",
        text: "Interim analysis can be performed if prestated in the protocol",
      },
      {
        id: "c",
        text: "Analyses in clinical trials are only descriptive in nature",
      },
      {
        id: "d",
        text: "People who are lost to follow up can be included in the analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q594",
    question:
      "Which of the following is FALSE when dealing with serious adverse events in a clinical trial?",
    options: [
      {
        id: "a",
        text: "Making provision for free treatment",
      },
      {
        id: "b",
        text: "Informing the regulatory authorities",
      },
      {
        id: "c",
        text: "Taking action only if 1% are affected by the adverse events",
      },
      {
        id: "d",
        text: "Withdrawing the implicated intervention for the affected",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q595",
    question: "A trial can be pre-maturely stopped if",
    options: [
      {
        id: "a",
        text: "A significant unanticipated risk is demonstrated",
      },
      {
        id: "b",
        text: "The investigators lose interest",
      },
      {
        id: "c",
        text: "The principal investigator retires",
      },
      {
        id: "d",
        text: "Minor adverse events are reported",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q596",
    question:
      "Data Safety Monitoring Body (DSMB) is primarily responsible for which of the following?",
    options: [
      {
        id: "a",
        text: "Periodically review and evaluate the accumulated study data for participant safety",
      },
      {
        id: "b",
        text: "Periodically review and evaluate the study conduct and progress",
      },
      {
        id: "c",
        text: "Make recommendations concerning the continuation, modification, or termination of a clinical trial",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q597",
    question:
      "Which of the following is NOT an advantage of a Randomized Controlled Trial?",
    options: [
      {
        id: "a",
        text: "Controls for confounding bias effectively",
      },
      {
        id: "b",
        text: "Provides high level of evidence",
      },
      {
        id: "c",
        text: "Can be conducted in the community or hospital",
      },
      {
        id: "d",
        text: "Blinding in trial eliminates selection bias",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q598",
    question:
      "Which of the following statement is FALSE with regards to a Randomized Controlled Trial?",
    options: [
      {
        id: "a",
        text: "Adverse events should be reported to the Data Safety Monitoring Board",
      },
      {
        id: "b",
        text: "Trial related documents must be archived after the trial is over",
      },
      {
        id: "c",
        text: "Drug trials ideally should have a predefined stoppage rule",
      },
      {
        id: "d",
        text: "Ethics committee clearance cannot be withdrawn after initial approval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q599",
    question:
      "State whether true or false. It is unethical to use a placebo for the control arm instead of the current standard of care in a clinical trial.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q600",
    question:
      "If there are many study objectives, it may be necessary to differentiate the objectives into primary and secondary or general and specific objectives",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q601",
    question: "Which among the following is not a component of concept paper?",
    options: [
      {
        id: "a",
        text: "Background and Justification",
      },
      {
        id: "b",
        text: "Objectives and Methods",
      },
      {
        id: "c",
        text: "Expected benefits, Key references and Budget",
      },
      {
        id: "d",
        text: "Conclusion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q602",
    question:
      "Which of the following is NOT true about references in the concept paper?",
    options: [
      {
        id: "a",
        text: "We can cite references in Introduction and Methods section",
      },
      {
        id: "b",
        text: "It is important to write references following standard guidelines",
      },
      {
        id: "c",
        text: "Statements should be linked to references",
      },
      {
        id: "d",
        text: "We can have as many references as possible",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q603",
    question:
      'The "Background and Justification" section in the concept paper should be written in the following sequence',
    options: [
      {
        id: "a",
        text: "Known and unknown aspects of the problem, information that needs to be generated to address the problem in an effective manner and statement of objectives",
      },
      {
        id: "b",
        text: "Known and unknown aspects of the problem, Importance of the study problem and information that needs to be generated to address the problem in an effective manner",
      },
      {
        id: "c",
        text: "Importance of the study problem, known and unknown aspects of the problem and information that needs to be generated to address the problem in an effective manner",
      },
      {
        id: "d",
        text: "Information that needs to be generated to address the problem in an effective manner, known and unknown aspects of the problem and statement of objectives",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q604",
    question: "Advantages of writing a concept paper include",
    options: [
      {
        id: "a",
        text: "You may be able to organize your ideas",
      },
      {
        id: "b",
        text: "It gives an opportunity to stand out and receive a positive response from reviewers",
      },
      {
        id: "c",
        text: "You are sure to get funding",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q605",
    question:
      "The elements of the methods section in the concept proposal needs to be adopted according to the study design chosen",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q606",
    question:
      "The ethics section of the concept proposal should include information about",
    options: [
      {
        id: "a",
        text: "Key measures taken to protect the study participants",
      },
      {
        id: "b",
        text: "The ethics committee to which the study will be submitted for approval",
      },
      {
        id: "c",
        text: "Scientific committee that will review the study",
      },
      {
        id: "d",
        text: "'a' and 'b'",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q607",
    question:
      'Which of the following needs to be spelt out in "Expected benefits" section of the concept proposal?',
    options: [
      {
        id: "a",
        text: "Expected outputs that the study will generate with timeline",
      },
      {
        id: "b",
        text: "Proposed immediate action based on research findings",
      },
      {
        id: "c",
        text: "How this research may set agenda for further research",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q608",
    question:
      "Budget estimate is not mandatory in the concept proposals. However, it would be very useful to prepare the indicative budget for key items",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q609",
    question:
      "While writing the concept papers for intervention studies, the methods section must have the following details",
    options: [
      {
        id: "a",
        text: "Primary and secondary outcome definitions",
      },
      {
        id: "b",
        text: "Randomization, sequence allocation and allocation concealment",
      },
      {
        id: "c",
        text: "Dose, frequency, nature of Intervention",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q610",
    question:
      "Immediately after identification of research topic and statement of objectives, it may be preferable to",
    options: [
      {
        id: "a",
        text: "Write protocol",
      },
      {
        id: "b",
        text: "Outline one-page concept paper",
      },
      {
        id: "c",
        text: "Prepare dummy tables as per the analysis plan",
      },
      {
        id: "d",
        text: "Seek review by an institutional ethics committee",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q611",
    question:
      "References need to be written following standard guidelines such as International Committee of Medical Journal Editors (ICMJE)",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q612",
    question:
      "Which of the following is the guideline that can be used for drafting protocols for a clinical trial?",
    options: [
      {
        id: "a",
        text: "SPIRIT",
      },
      {
        id: "b",
        text: "PRISMA",
      },
      {
        id: "c",
        text: "CARE",
      },
      {
        id: "d",
        text: "STROBE",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q613",
    question: "Why is concept paper necessary for a research project?",
    options: [
      {
        id: "a",
        text: "It helps to finish the data collection rapidly",
      },
      {
        id: "b",
        text: "It helps to organize the ideas",
      },
      {
        id: "c",
        text: "It helps to get instant approval of ethics committee",
      },
      {
        id: "d",
        text: "It helps to publish the research quickly",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q614",
    question:
      "Which of the following components are included in the background and justification section of the concept paper",
    options: [
      {
        id: "a",
        text: "Context of the study problem",
      },
      {
        id: "b",
        text: "Operational definitions",
      },
      {
        id: "c",
        text: "Sampling technique",
      },
      {
        id: "d",
        text: "Study procedure",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q615",
    question:
      "Which of the following information is not addressed in the ethics section of the concept paper?",
    options: [
      {
        id: "a",
        text: "Information about sample and data storage",
      },
      {
        id: "b",
        text: "Key measures taken to protect the study participants",
      },
      {
        id: "c",
        text: "The ethics committee to which the study will be submitted for approval",
      },
      {
        id: "d",
        text: "Budget for salary of the projects staff",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q616",
    question: "Which of the following is a component of concept paper?",
    options: [
      {
        id: "a",
        text: "Abstract",
      },
      {
        id: "b",
        text: "Objectives and Methods",
      },
      {
        id: "c",
        text: "Conclusion",
      },
      {
        id: "d",
        text: "Discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q617",
    question: "What is the basis for writing a one page concept paper?",
    options: [
      {
        id: "a",
        text: "Lack of time to draft a complete protocol",
      },
      {
        id: "b",
        text: "Overcomes inhibitions in drafting a complete protocol",
      },
      {
        id: "c",
        text: "It is mandatory for scientific committee protocol",
      },
      {
        id: "d",
        text: "For ethics committee approval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q618",
    question:
      "The indicative budget in a concept paper includes salaries, per diem, travel, equipment and supplies",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q619",
    question: "The concept paper helps agencies for",
    options: [
      {
        id: "a",
        text: "Screening the proposal for funding",
      },
      {
        id: "b",
        text: "Scientific committee approval",
      },
      {
        id: "c",
        text: "Ethics committee approval",
      },
      {
        id: "d",
        text: "Publishing the manuscript",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q620",
    question:
      "Which of the following is NOT included in the background section of a concept paper?",
    options: [
      {
        id: "a",
        text: "Importance of a health problem",
      },
      {
        id: "b",
        text: "Known fact about the health problem",
      },
      {
        id: "c",
        text: "Prior contribution of the researcher in the topic",
      },
      {
        id: "d",
        text: "Knowledge gap in that topic",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q621",
    question:
      "The methods section of the concept paper contains the following:",
    options: [
      {
        id: "a",
        text: "Key operational definitions",
      },
      {
        id: "b",
        text: "Conclusions",
      },
      {
        id: "c",
        text: "Context of study",
      },
      {
        id: "d",
        text: "Novelty of the study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q622",
    question:
      "Which of the following best describes the ‘Expected Benefits’ section of a concept paper?",
    options: [
      {
        id: "a",
        text: "Financial benefit to the funding agency",
      },
      {
        id: "b",
        text: "Policy changes based on the study findings",
      },
      {
        id: "c",
        text: "Financial benefit to the researcher",
      },
      {
        id: "d",
        text: "Academic improvement of the researchers",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q623",
    question: "Which of the following are components of a concept paper?",
    options: [
      {
        id: "a",
        text: "Study title and references",
      },
      {
        id: "b",
        text: "Study title, abstract and references",
      },
      {
        id: "c",
        text: "Abstract and references",
      },
      {
        id: "d",
        text: "Study title, results and references",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q624",
    question:
      "Sampling strategy is discussed in which of the following section of a concept paper?",
    options: [
      {
        id: "a",
        text: "Background",
      },
      {
        id: "b",
        text: "Objectives",
      },
      {
        id: "c",
        text: "Methodology",
      },
      {
        id: "d",
        text: "Results",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q625",
    question:
      "Which of the following statement is true about the ‘Reference’ section of a concept paper?",
    options: [
      {
        id: "a",
        text: "References must be written following standard guidelines",
      },
      {
        id: "b",
        text: "Unlimited references are preferred in a concept paper",
      },
      {
        id: "c",
        text: "Reference section is usually an optional component",
      },
      {
        id: "d",
        text: "References are usually required for the results section",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q626",
    question:
      "A post graduate has mentioned the estimated budget for her thesis to be 50,000 INR in the concept paper. Which of the following components of the budget may not be justified?",
    options: [
      {
        id: "a",
        text: "Salary for data collectors",
      },
      {
        id: "b",
        text: "Travel cost for data collection",
      },
      {
        id: "c",
        text: "Equipment cost",
      },
      {
        id: "d",
        text: "Remuneration for the thesis guide",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q627",
    question: "Identify the INCORRECT statement about protocol writing?",
    options: [
      {
        id: "a",
        text: "A protocol is a must for obtaining the ethics committee approval",
      },
      {
        id: "b",
        text: "A well-written protocol is often helpful to draft a one-page concept proposal",
      },
      {
        id: "c",
        text: "All known facts in a protocol must be supported by appropriate reference",
      },
      {
        id: "d",
        text: "Peer review helps in improving the quality of a protocol",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q628",
    question:
      "All the followings are recommended while writing a concept paper, EXCEPT",
    options: [
      {
        id: "a",
        text: "Preparing a concise document",
      },
      {
        id: "b",
        text: "Presenting mostly in bullet forms",
      },
      {
        id: "c",
        text: "Describing the methods section in detail",
      },
      {
        id: "d",
        text: "Restricting the number of objectives",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q629",
    question:
      "Which of the following is a consideration in framing the objectives of a concept paper?",
    options: [
      {
        id: "a",
        text: "Choosing appropriate action verbs",
      },
      {
        id: "b",
        text: "Calculating sample size based on the secondary objectives",
      },
      {
        id: "c",
        text: "Stating broad objectives",
      },
      {
        id: "d",
        text: "All the above ------------------",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q630",
    question:
      "Description of the intervention is essential in a research protocol for",
    options: [
      {
        id: "a",
        text: "Experimental study",
      },
      {
        id: "b",
        text: "Case-control study",
      },
      {
        id: "c",
        text: "Cohort study",
      },
      {
        id: "d",
        text: "Cross-sectional study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q631",
    question:
      "Inclusion and exclusion criteria should be included under the following section in the protocol",
    options: [
      {
        id: "a",
        text: "Sampling",
      },
      {
        id: "b",
        text: "Study population",
      },
      {
        id: "c",
        text: "Study design",
      },
      {
        id: "d",
        text: "Sample size",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q632",
    question:
      "The details regarding data quality assurance should be written in the following section in the protocol",
    options: [
      {
        id: "a",
        text: "Data collection",
      },
      {
        id: "b",
        text: "Data analysis",
      },
      {
        id: "c",
        text: "Project implementation",
      },
      {
        id: "d",
        text: "Data entry",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q633",
    question:
      "The following annexure in the study protocol deals with toxicity management",
    options: [
      {
        id: "a",
        text: "Study management forms",
      },
      {
        id: "b",
        text: "Standard operating procedures",
      },
      {
        id: "c",
        text: "Consent forms",
      },
      {
        id: "d",
        text: "Adverse event management form",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q634",
    question:
      "Study population, sample size and sampling are included in the following section of the protocol",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Methods",
      },
      {
        id: "c",
        text: "Objectives",
      },
      {
        id: "d",
        text: "Expected Benefits",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q635",
    question: "First step for writing a successful protocol",
    options: [
      {
        id: "a",
        text: "Write a one page concept paper",
      },
      {
        id: "b",
        text: "Identify topic, research question and objectives",
      },
      {
        id: "c",
        text: "Write a draft protocol",
      },
      {
        id: "d",
        text: "Seek ethics approval",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q636",
    question: "Key outcomes and exposures should be explained under",
    options: [
      {
        id: "a",
        text: "Data analysis",
      },
      {
        id: "b",
        text: "Data collection tools",
      },
      {
        id: "c",
        text: "Sampling",
      },
      {
        id: "d",
        text: "Operational definitions",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q637",
    question: "Human participant protection paragraph addresses all except",
    options: [
      {
        id: "a",
        text: "Confidentiality",
      },
      {
        id: "b",
        text: "Risks",
      },
      {
        id: "c",
        text: "Compensation",
      },
      {
        id: "d",
        text: "Sample size calculation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q638",
    question:
      "Willingness of 'study participants' to participate in the study is obtained by",
    options: [
      {
        id: "a",
        text: "Informed consent",
      },
      {
        id: "b",
        text: "Oral commitment",
      },
      {
        id: "c",
        text: "Willingness not necessary",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q639",
    question: "The section that guides how the objectives lead to indicators",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Study design",
      },
      {
        id: "c",
        text: "Budget",
      },
      {
        id: "d",
        text: "Objectives",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q640",
    question:
      "Which of the following statements is True regarding the first draft of the protocol",
    options: [
      {
        id: "a",
        text: "The draft is the final document and has to be adhered to as it is.",
      },
      {
        id: "b",
        text: "The concept paper can be used as an outline for drafting the first draft of the protocol.",
      },
      {
        id: "c",
        text: "Background with justification, method of conducting the study and expected benefits are stated briefly as in the concept paper.",
      },
      {
        id: "d",
        text: "Additional references must not be added.",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q641",
    question: "It is ideal that the first draft of the protocol",
    options: [
      {
        id: "a",
        text: "Exceeds >2000 words",
      },
      {
        id: "b",
        text: "Does not exceed >2000 words",
      },
      {
        id: "c",
        text: "Exceeds >3000 words",
      },
      {
        id: "d",
        text: "Does not exceed >3000 words",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q642",
    question:
      "Data collection paragraph in the protocol should specify all, EXCEPT",
    options: [
      {
        id: "a",
        text: "The kind of data that will be collected",
      },
      {
        id: "b",
        text: "Information about the data collector involved in data collection",
      },
      {
        id: "c",
        text: "The detailed manner in which the data collector is going to collect the data",
      },
      {
        id: "d",
        text: "The details of how the collected data will be used for policy recommendations",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q643",
    question:
      "Mode of data entry, software for data analysis and plan for data analysis are included in the following section of the protocol",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Methods",
      },
      {
        id: "c",
        text: "Objectives",
      },
      {
        id: "d",
        text: "Expected Benefits",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q644",
    question:
      "Which of the following is a step for drafting a successful protocol?",
    options: [
      {
        id: "a",
        text: "Writing an abstract",
      },
      {
        id: "b",
        text: "Submitting for peer review",
      },
      {
        id: "c",
        text: "Seeking consent from participants",
      },
      {
        id: "d",
        text: "Data analysis",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q645",
    question: "Which of the following statements is true?",
    options: [
      {
        id: "a",
        text: "It is sufficient to mention whether the study is quantitative or qualitative in study design section",
      },
      {
        id: "b",
        text: "The concept paper can contain more than 20 references relating to the study",
      },
      {
        id: "c",
        text: "Sample size calculation is not necessary for conducting research",
      },
      {
        id: "d",
        text: "Human subject protection statement should be included in the methods section",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q646",
    question: "The introduction can be 40% of the content of the protocol",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q647",
    question:
      "Which of the following sections mentions about the detailed plan for conducting the study",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Results",
      },
      {
        id: "c",
        text: "Methods",
      },
      {
        id: "d",
        text: "Discussion",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q648",
    question:
      "Which of the following is a part of introduction section of the protocol?",
    options: [
      {
        id: "a",
        text: "Inclusion and Exclusion criteria",
      },
      {
        id: "b",
        text: "Detailed budget",
      },
      {
        id: "c",
        text: "Participant safety and protection",
      },
      {
        id: "d",
        text: "Background with justification",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q649",
    question:
      "Informed consent, procedures for minimizing participant risk and compensations are included in which of the following sections",
    options: [
      {
        id: "a",
        text: "Introduction",
      },
      {
        id: "b",
        text: "Abstract",
      },
      {
        id: "c",
        text: "Human subject protection",
      },
      {
        id: "d",
        text: "Study procedure",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q650",
    question:
      "Which of the following is NOT an appropriate step of protocol development?",
    options: [
      {
        id: "a",
        text: "Development of research question",
      },
      {
        id: "b",
        text: "Preparation of the analysis plan",
      },
      {
        id: "c",
        text: "Development of study tool",
      },
      {
        id: "d",
        text: "Initiation of data collection",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q651",
    question:
      "In which of the following section of a protocol, is the analysis plan written?",
    options: [
      {
        id: "a",
        text: "Objective",
      },
      {
        id: "b",
        text: "Results",
      },
      {
        id: "c",
        text: "Budget",
      },
      {
        id: "d",
        text: "Methods",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q652",
    question:
      "State whether true or false. Study population and the study sample are same.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q653",
    question:
      "Which of the following is CORRECT about operational definitions in a study protocol?",
    options: [
      {
        id: "a",
        text: "It is part of the background section",
      },
      {
        id: "b",
        text: "It spells out the key research gaps",
      },
      {
        id: "c",
        text: "It should be broad and non-specific",
      },
      {
        id: "d",
        text: "It may be supported by appropriate references",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q654",
    question:
      "Which of the following component is LEAST appropriate for a project implementation plan?",
    options: [
      {
        id: "a",
        text: "Calculating sample size",
      },
      {
        id: "b",
        text: "Coordinating project activities",
      },
      {
        id: "c",
        text: "Assigning job responsibilities",
      },
      {
        id: "d",
        text: "Preparing project timeline",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q655",
    question:
      "Human subjects are protected by all the following mechanisms, EXCEPT",
    options: [
      {
        id: "a",
        text: "Obtaining informed consent from the participants",
      },
      {
        id: "b",
        text: "Reviewing proposal by the ethics committee",
      },
      {
        id: "c",
        text: "Incentivizing target population for participation",
      },
      {
        id: "d",
        text: "Compensating participants for loss of wages",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q656",
    question:
      "Which section of a protocol describes the need to maintain anonymity of study participants while sharing data to others?",
    options: [
      {
        id: "a",
        text: "Human subject protection",
      },
      {
        id: "b",
        text: "Data collection methods",
      },
      {
        id: "c",
        text: "Data analysis plan",
      },
      {
        id: "d",
        text: "Expected benefits",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q657",
    question:
      "In the methods section of a protocol, a researcher can include all the following, EXCEPT",
    options: [
      {
        id: "a",
        text: "Analysis plan",
      },
      {
        id: "b",
        text: "Supportive reference",
      },
      {
        id: "c",
        text: "Expected benefits",
      },
      {
        id: "d",
        text: "Quality assurance",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q658",
    question:
      "The number of study participants required for a research study can be decided by",
    options: [
      {
        id: "a",
        text: "Pilot study",
      },
      {
        id: "b",
        text: "Sample size calculation",
      },
      {
        id: "c",
        text: "Sampling procedure",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q659",
    question:
      "State whether true or false. Researchers can amend a research protocol after reobtaining the ethics committee clearance for the amendments made.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False All of the following statements regarding research publications are correct, Except",
      },
      {
        id: "c",
        text: "Negative findings in a research should not be published",
      },
      {
        id: "d",
        text: "Publishing research findings improves the credibility of a researcher",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q660",
    question:
      "A senior resident of Psychiatry department of a medical college wrote a manuscript based on his thesis work. He has put his wife's name as a co-author who is working in the Physiology department of the same college. Which of the following statements supports the act of the senior resident in providing authorship to his wife?",
    options: [
      {
        id: "a",
        text: "He can give authorship to anyone since it is his research work",
      },
      {
        id: "b",
        text: "The guide should decide on who should be the authors",
      },
      {
        id: "c",
        text: "His wife has contributed in designing the residents’ thesis work",
      },
      {
        id: "d",
        text: "It is not a good practice to include researcher from different department as authors",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q661",
    question: "Which of the following is incorrect about authorship?",
    options: [
      {
        id: "a",
        text: "Authorship confers credit, implies responsibility and accountability of the published work",
      },
      {
        id: "b",
        text: "International Committee of Medical Journal Editors recommends criteria on authorship",
      },
      {
        id: "c",
        text: "It is mandatory to declare the contribution of each author",
      },
      {
        id: "d",
        text: "It is not mandatory that all authors should approve the final version of the manuscript",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q662",
    question: "Which of the following is false about plagiarism?",
    options: [
      {
        id: "a",
        text: "It can be copying and pasting of contents from a published manuscript",
      },
      {
        id: "b",
        text: "It can be copying someone's idea",
      },
      {
        id: "c",
        text: "It is not considered as a serious publication misconduct",
      },
      {
        id: "d",
        text: "'Urkund' is one of the software used to check plagiarism",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q663",
    question:
      "Which of the following is (are) the consequence(s) of plagiarism of manuscript?",
    options: [
      {
        id: "a",
        text: "The journal can retract the manuscript",
      },
      {
        id: "b",
        text: "Institute can take action on the author/researcher",
      },
      {
        id: "c",
        text: "The researcher loses professional reputation",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q664",
    question:
      "You have finished writing a manuscript and plan to publish it. Which of the following is the best practice?",
    options: [
      {
        id: "a",
        text: "Submit to multiple journals at the same time",
      },
      {
        id: "b",
        text: "Submit to a journal and wait for the journal's response",
      },
      {
        id: "c",
        text: "Submit to many journals; once it gets published in one journal, withdraw it from the other journals",
      },
      {
        id: "d",
        text: "Submit the same manuscript in different languages to different journals",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q665",
    question:
      "A researcher conducted a study to identify risk factors for exacerbation of bronchial asthma. The researcher was due for job promotion. However, the researcher was lacking enough publications to ensure promotion. Hence, in order to have maximum number of publications from the work, the researcher decided to produce three different manuscripts instead of one manuscript comprehensively covering all aspects of the study. What is this act called?",
    options: [
      {
        id: "a",
        text: "Plagiarism",
      },
      {
        id: "b",
        text: "Falsification",
      },
      {
        id: "c",
        text: "Salami slicing",
      },
      {
        id: "d",
        text: "Fabrication",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q666",
    question:
      "Which of the following organizations directly deals with publication ethics?",
    options: [
      {
        id: "a",
        text: "Indian Medical Association (IMA)",
      },
      {
        id: "b",
        text: "Committee on Publication Ethics (COPE)",
      },
      {
        id: "c",
        text: "World Health Organization (WHO)",
      },
      {
        id: "d",
        text: "Joint National Committee (JNC)",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q667",
    question:
      "A group of researchers submitted a manuscript for publication based on a drug trial. Because they did not register under the clinical trial registry of India (CTRI), one reputed journal rejected the paper. The researcher resubmitted the paper in a different journal and this journal published it without asking any queries. Which of the following is the correct statement?",
    options: [
      {
        id: "a",
        text: "It is necessary to register all drug trials under CTRI",
      },
      {
        id: "b",
        text: "The journal which published the paper is likely to be a predatory journal",
      },
      {
        id: "c",
        text: "Both 'a' and 'b' are correct",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q668",
    question:
      "Among the following which is the best practice for determining the authorship?",
    options: [
      {
        id: "a",
        text: "Authorship can be based on the criteria given by ICMJE",
      },
      {
        id: "b",
        text: "Authorship should be decided after submission to a journal",
      },
      {
        id: "c",
        text: "It is necessary to include head of the department/institution as a co-author",
      },
      {
        id: "d",
        text: "Authorship can be gifted to friends even if they have not contributed to that study",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q669",
    question:
      "Which of the following is incorrect about publishing a research work?",
    options: [
      {
        id: "a",
        text: "Publishing paper is important for getting promotion in academic institutions",
      },
      {
        id: "b",
        text: "Publishing research findings helps to identify the research gaps",
      },
      {
        id: "c",
        text: "Common people should not read such research findings",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q670",
    question:
      "All clinical trials in India should be registered with Clinical Trial Registry of India.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q671",
    question:
      "A neonatologist planned to conduct a clinical trial to explore the effect of intervention X on hypothermia of the newborn children (Age <7 days) over intervention A (The current practice). All the following are true about the trial, except",
    options: [
      {
        id: "a",
        text: "Ethics Committee approval is a must to conduct the trial",
      },
      {
        id: "b",
        text: "The trial should be registered under the Clinical Trial Registry of India",
      },
      {
        id: "c",
        text: "Informed consent should be taken from either of the parents",
      },
      {
        id: "d",
        text: "Age appropriate assent is a must in this trial",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q672",
    question: "Manipulating data is known as fabrication",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q673",
    question:
      "Which of the following is correct about determining the authorship?",
    options: [
      {
        id: "a",
        text: "The investigators can follow ICMJE guideline to determine authorship",
      },
      {
        id: "b",
        text: "The sequence should always be based on alphabetical orders",
      },
      {
        id: "c",
        text: "The investigators should include the head of the institution’s name irrespective of his/ her contribution",
      },
      {
        id: "d",
        text: "None of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q674",
    question:
      "A group of researchers submitted a manuscript in a reputed journal. Even after 5 months of submission, they did not receive the peer review comments from the journal. The authors decided to submit the manuscript to a different journal without informing the editor of the previous journal. Which of the following term describes the situation best?",
    options: [
      {
        id: "a",
        text: "Duplicate publication",
      },
      {
        id: "b",
        text: "Simultaneous submission",
      },
      {
        id: "c",
        text: "Self-citation",
      },
      {
        id: "d",
        text: "Breach of confidentiality",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q675",
    question:
      "Dr. D has copied the idea of Dr. A for his thesis. Copying an idea shouldn’t be considered as plagiarism.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q676",
    question:
      "Dr. A is in the process of writing review of literature for her thesis. Her guide has instructed her to avoid plagiarism. Dr. A should take all the following measures to avoid plagiarism, except",
    options: [
      {
        id: "a",
        text: "Avoid copying and pasting",
      },
      {
        id: "b",
        text: "Acknowledge original sources",
      },
      {
        id: "c",
        text: "Take help of anti-plagiarism software",
      },
      {
        id: "d",
        text: "Copy from her own previous work",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q677",
    question:
      "Which of the following is correct in relation to the conflict of interest?",
    options: [
      {
        id: "a",
        text: "Conflict of interest is always financial",
      },
      {
        id: "b",
        text: "Conflict of interest necessarily changes the outcome of interest",
      },
      {
        id: "c",
        text: "It is recommended to hide the COI during submission of a manuscript",
      },
      {
        id: "d",
        text: "Readers can determine the influence of COI on conclusion of the paper",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q678",
    question:
      "An editor of a reputed journal found that most of the finding of a manuscript matches with a previously published paper by different authors. The editor considered it as a case of plagiarism. Which of the following about plagiarism is true?",
    options: [
      {
        id: "a",
        text: "The journal can retract the article, if already published",
      },
      {
        id: "b",
        text: "The editor can inform the authors’ institute about it",
      },
      {
        id: "c",
        text: "The researchers may lose their reputation",
      },
      {
        id: "d",
        text: "All of the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q679",
    question: "Which of the following is TRUE regarding a clinical trial?",
    options: [
      {
        id: "a",
        text: "It is mandatory to register the trial under ‘Clinical Trials Registry of India’ after completing it.",
      },
      {
        id: "b",
        text: "Ethical issues are considerably low in clinical trials when compared with descriptive studies.",
      },
      {
        id: "c",
        text: "Informed consent is a must for recruiting a study participant in a clinical trial",
      },
      {
        id: "d",
        text: "Both ‘a’ and ‘c’",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q680",
    question:
      "Altering the original data to obtain a statistically significant result by the researcher is known as",
    options: [
      {
        id: "a",
        text: "Fabrication",
      },
      {
        id: "b",
        text: "Falsification",
      },
      {
        id: "c",
        text: "Fascination",
      },
      {
        id: "d",
        text: "Fasciation",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q681",
    question:
      "All the following help in reducing ethical issues associated with research publication, EXCEPT",
    options: [
      {
        id: "a",
        text: "Obtaining the institutional ethics committee permission",
      },
      {
        id: "b",
        text: "Including a guest author to improve the acceptance of the manuscript",
      },
      {
        id: "c",
        text: "Obtaining permission from the copyright holder to reproduce a figure",
      },
      {
        id: "d",
        text: "Declaring familial relationship between an author and the CEO of the funding agency",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q682",
    question:
      "Which of the following is INCORRECT about publishing research finding?",
    options: [
      {
        id: "a",
        text: "Publication often helps in career progression and academic promotion",
      },
      {
        id: "b",
        text: "It is a way to communicate research findings with the peer groups",
      },
      {
        id: "c",
        text: "Conflicts of interest can be suppressed as it has implication in study findings",
      },
      {
        id: "d",
        text: "It identifies research gaps",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q683",
    question:
      "State whether true or false. The first author is mostly responsible for addressing the comments received from the reviewers of the journal.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q684",
    question:
      "Submitting a manuscript to more than one journal at the same time is known as",
    options: [
      {
        id: "a",
        text: "Duplicate publication",
      },
      {
        id: "b",
        text: "Self-citation",
      },
      {
        id: "c",
        text: "Simultaneous publication",
      },
      {
        id: "d",
        text: "Peer review",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
  {
    id: "q685",
    question:
      "Which of the following is NOT an essential criterion for authorship?",
    options: [
      {
        id: "a",
        text: "Conceptualizing the study",
      },
      {
        id: "b",
        text: "Drafting the manuscript",
      },
      {
        id: "c",
        text: "Approval of the final manuscript",
      },
      {
        id: "d",
        text: "Being departmental head",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["c"],
  },
  {
    id: "q686",
    question:
      "A Post Graduate in a medical college submitted a proposal to the ethics committee of the institute. The committee found that the proposal is a near copy of an earlier proposal from the same department. This act of the PG can be best termed as",
    options: [
      {
        id: "a",
        text: "Fabrication",
      },
      {
        id: "b",
        text: "Falsification",
      },
      {
        id: "c",
        text: "Plagiarism",
      },
      {
        id: "d",
        text: "Breach of confidentiality",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["d"],
  },
  {
    id: "q687",
    question:
      "State whether true or false. Unpublished work must be acknowledged in a manuscript.",
    options: [
      {
        id: "a",
        text: "True",
      },
      {
        id: "b",
        text: "False",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["a"],
  },
  {
    id: "q688",
    question:
      "Direct or indirect influence of which of the following aspect is considered ‘conflict of interest’?",
    options: [
      {
        id: "a",
        text: "Financial",
      },
      {
        id: "b",
        text: "Personal",
      },
      {
        id: "c",
        text: "Social",
      },
      {
        id: "d",
        text: "All the above",
      },
    ],
    courseId: "basic-biomedical-research",
    courseName: "Basic Course in Biomedical Research",
    correctAnswers: ["b"],
  },
];
