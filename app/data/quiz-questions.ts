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
  },
];
