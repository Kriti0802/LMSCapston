import React, { useState } from 'react';  
import { useNavigate } from 'react-router';
import './AssessmentPage.css';
 
const AssessmentPage = () => {  
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);  
  const [score, setScore] = useState(0);
 
  const questions = [
    {
      id: 1,
      question: "1. What is cloud computing?",
      options: [
        "A. Storing and accessing data and programs over the internet",
        "B. Running applications on local servers",
        "C. Using physical storage devices for data storage",
        "D. None of the above"
      ],
      answer: "A"
    },
    {
      id: 2,
      question: "2. What are the benefits of cloud computing?",
      options: [
        "A. Scalability and flexibility",
        "B. Cost savings",
        "C. Increased collaboration",
        "D. All of the above"
      ],
      answer: "D"
    },
    {
      id: 3,
      question: "3. What are the different types of cloud computing services?",
      options: [
        "A. Infrastructure as a Service (IaaS)",
        "B. Platform as a Service (PaaS)",
        "C. Software as a Service (SaaS)",
        "D. All of the above"
      ],
      answer: "D"
    },
    {
      id: 4,
      question: "4. What are some popular cloud computing providers?",
      options: [
        "A. Amazon Web Services (AWS)",
        "B. Microsoft Azure",
        "C. Google Cloud Platform",
        "D. All of the above"
      ],
      answer: "D"
    },
    {
      id: 5,
      question: "5. What are the security concerns in cloud computing?",
      options: [
        "A. Data breaches",
        "B. Data loss",
        "C. Lack of control over data",
        "D. All of the above"
      ],
      answer: "D"
    },
    {
      id: 6,
      question: "6. What is the difference between public and private clouds?",
      options: [
        "A. Public clouds are shared by multiple organizations, while private clouds are dedicated to a single organization",
        "B. Public clouds are more secure than private clouds",
        "C. Public clouds are more expensive than private clouds",
        "D. None of the above"
      ],
      answer: "A"
    },
    {
      id: 7,
      question: "7. What is the role of virtualization in cloud computing?",
      options: [
        "A. Virtualization allows for the creation of virtual machines that can run multiple operating systems",
        "B. Virtualization is not used in cloud computing",
        "C. Virtualization is only used in private clouds",
        "D. None of the above"
      ],
      answer: "A"
    },
    {
      id: 8,
      question: "8. What is the difference between cloud computing and traditional IT infrastructure?",
      options: [
        "A. Cloud computing is more cost-effective than traditional IT infrastructure",
        "B. Cloud computing allows for greater scalability and flexibility",
        "C. Cloud computing requires less maintenance and management",
        "D. All of the above"
      ],
      answer: "D"
    },
    {
      id: 9,
      question: "9. What is the role of APIs in cloud computing?",
      options: [
        "A. APIs allow different cloud services to communicate with each other",
        "B. APIs are not used in cloud computing",
        "C. APIs are only used in private clouds",
        "D. None of the above"
      ],
      answer: "A"
    },
    {
      id: 10,
      question: "10. What are some examples of cloud computing applications?",
      options: [
        "A. Dropbox",
        "B. Salesforce",
        "C. Netflix",
        "D. All of the above"
      ],
      answer: "D"
    }
  ];  
 
  const handleAnswerChange = (questionId, selectedOption) => {  
    const updatedAnswers = [...answers];  
    const questionIndex = updatedAnswers.findIndex(  
      (answer) => answer.questionId === questionId  
    );  
 
    if (questionIndex !== -1) {  
      updatedAnswers[questionIndex].selectedOption = selectedOption;  
    } else {  
      updatedAnswers.push({ questionId, selectedOption });  
    }  
 
    setAnswers(updatedAnswers);  
  };  
 
  const handleSubmit = (e) => {    
    e.preventDefault();    
    let calculatedScore = 0;  
   
    answers.forEach((answer) => {  
      const question = questions.find((q) => q.id === answer.questionId);  
      if (question.answer === answer.selectedOption) {  
        calculatedScore++;  
      }  
    });  
   
    alert(`Score: ${calculatedScore}/10`);
    setScore(calculatedScore);
    navigate("/course", { state: { score: calculatedScore } });
   
  };    
 
  return (  
    <div>  
      <h1>CLOUD ASSESSMENT</h1>  
      <form onSubmit={handleSubmit}>  
        {questions.map((question) => (  
          <div key={question.id} className="question-container">  
            <div className="question">
              <h3>{question.question}</h3>  
              <ul>  
                {question.options.map((option) => (  
                  <li key={option}>  
                    <label>  
                      <input  
                        type="radio"  
                        name={`question-${question.id}`}  
                        value={option.charAt(0)}  
                        onChange={() =>  
                          handleAnswerChange(question.id, option.charAt(0))  
                        }  
                      />  
                      {option}  
                    </label>  
                  </li>  
                ))}  
              </ul>
            </div>
          </div>  
        ))}  
        <button type="submit">Submit</button>  
      </form>  
    </div>  
  );
   
 
};  
 
export default AssessmentPage;  