// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import moment from "moment";
// import { AnimatePresence, motion, number } from "framer-motion";
// import { toast } from "react-hot-toast";
// //
// import SpinnerLoader from "../../components/Loader/SpinnerLoader";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import RoleInfoHeader from "./components/RoleInfoHeader";
// import QuestionCard from "../../components/Cards/QuestionCard";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { LuCircleAlert } from "react-icons/lu";
// import AIResponsePreview from "./components/AIResponsePreview";
// import Drawer from "../../components/Loader/Drawer";
// import SkeletonLoader from "../../components/Loader/SkeletonLoader";

// const QUESTIONS_PER_PAGE = 10;

// const InterviewPrep = () => {
//   const { sessionId } = useParams();

//   const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
//   const [explanation, setExplanation] = useState(null);
//   const [sessionData, setSessionsData] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdateLoader, setIsUpdateLoader] = useState(false);
//   const [visibleQuestionsCount, setVisibleQuestionsCount] =
//     useState(QUESTIONS_PER_PAGE);

//   // Fetch session data by session ID
//   const fetchSessionDetailsById = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(
//         API_PATHS.SESSION.GET_ONE(sessionId)
//       );
//       if (response.data?.session) {
//         setSessionsData(response.data.session);
//         setVisibleQuestionsCount(QUESTIONS_PER_PAGE); // Reset pagination
//         setErrorMsg(null);
//       } else {
//         setErrorMsg("Session not found");
//       }
//     } catch (error) {
//       console.error("Error fetching session:", error);
//       setErrorMsg("Something went wrong while fetching session data.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Generate explanation for a question
//   const generateConceptExplanation = async (question) => {
//     try {
//       setErrorMsg("");
//       setExplanation(null);
//       setIsLoading(true);
//       setOpenLeanMoreDrawer(true);

//       const response = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_EXPLANATION,
//         { question }
//       );

//       if (response.data?.success && response.data.data) {
//         setExplanation(response.data.data);
//       } else {
//         setErrorMsg(
//           response.data?.message ||
//             "Failed to load explanation. Please try again."
//         );
//         setExplanation(null);
//       }
//     } catch (error) {
//       console.error("Error generating explanation:", error);
//       setErrorMsg("Failed to generate explanation, please try again later.");
//       setExplanation(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Toggle pin status for a question
//   const toggleQuestionPinStatus = async (questionId) => {
//     try {
//       const response = await axiosInstance.post(
//         API_PATHS.QUESTION.PIN(questionId)
//       );
//       if (response.data?.question) {
//         toast.success("Pin status updated!");

//         setSessionsData((prev) => {
//           const updatedQuestions = prev.questions.map((q) =>
//             q._id === questionId
//               ? { ...q, isPinned: response.data.question.isPinned }
//               : q
//           );
//           return { ...prev, questions: updatedQuestions };
//         });
//       }
//     } catch (error) {
//       console.error("Pin toggle error:", error);
//       toast.error("Failed to update pin status.");
//     }
//   };
  
//   // Add more questions to a session
//   const uploadMoreQuestions = async () => {
//     try {
//       setIsUpdateLoader(true);

//       // call AI to generate questions
//       const aiResponse = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_QUESTIONS,
//         {
//           role: sessionData?.role,
//           experience: sessionData?.experience,
//           topicsToFocus: sessionData?.topicsToFocus,
//           numberOfQuestions: 10,
//         }   
//       );

//       // Should be array like [{question, answer}]
//       const generatedQuestions = aiResponse.data;

//       const response = await axiosInstance.post(
//         API_PATHS.QUESTION.ADD_TO_SESSION,
//         {
//           sessionId,
//           questions: generatedQuestions,
//         }
//       );
      

//       if (response.data) {
//         toast.success("Added More Q&A!!");
//         fetchSessionDetailsById();
//       }
//     } catch (error) {
      
//     }
//   }

//   useEffect(() => {
//     if (sessionId) {
//       fetchSessionDetailsById();
//     }
//   }, [sessionId]);

//   return (
//     <DashboardLayout>
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <SpinnerLoader />
//         </div>
//       ) : errorMsg ? (
//         <div className="text-red-500 text-center mt-10">{errorMsg}</div>
//       ) : sessionData ? (
//         <>
//           <RoleInfoHeader
//             role={sessionData.role || ""}
//             topicsToFocus={sessionData.topicToFocus || "-"}
//             experience={sessionData.experience || 0}
//             questions={sessionData.questions?.length || 0}
//             description={sessionData.description || ""}
//             lastUpdated={
//               sessionData.updatedAt
//                 ? moment(sessionData.updatedAt).format("Do MMM YYYY")
//                 : "-"
//             }
//           />

//           <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
//             <h2 className="text-lg font-semibold color-black">
//               Interview Q & A
//             </h2>

//             <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
//               <div
//                 className={`col-span-12 ${
//                   openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
//                 }`}
//               >
//                 {sessionData?.questions?.length > 0 ? (
//                   <>
//                     <AnimatePresence>
//                       {sessionData.questions
//                         .slice(0, visibleQuestionsCount)
//                         .map((data, index) => (
//                           <motion.div
//                             key={data._id || index}
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             transition={{
//                               duration: 0.4,
//                               type: "spring",
//                               stiffness: 100,
//                               delay: index * 0.05,
//                               damping: 15,
//                             }}
//                             layout
//                             layoutId={`question-${data._id || index}`}
//                           >
//                             <QuestionCard
//                               question={data?.question}
//                               answer={data?.answer}
//                               onLearnMore={() =>
//                                 generateConceptExplanation(data.question)
//                               }
//                               isPinned={data?.isPinned}
//                               onTogglePin={() =>
//                                 toggleQuestionPinStatus(data._id)
//                               }
//                             />
//                           </motion.div>
//                         ))}
//                     </AnimatePresence>

//                     {sessionData.questions.length > visibleQuestionsCount && (
//                       <div className="flex items-center justify-center mt-5">
//                         <button
//                           className="flex items-center gap-3 text-sm text-white bg-blue-600 px-4 py-2 rounded-md disabled:opacity-50"
//                           disabled={isLoading || isUpdateLoader}
//                           onClick={() => {
//                             setIsUpdateLoader(true);
//                             setTimeout(() => {
//                               setVisibleQuestionsCount((prev) =>
//                                 Math.min(
//                                   prev + QUESTIONS_PER_PAGE,
//                                   sessionData.questions.length
//                                 )
//                               );
//                               setIsUpdateLoader(false);
//                             }, 400);
//                           }}
//                         >
//                           {isUpdateLoader ? (
//                             <SpinnerLoader size="small" />
//                           ) : (
//                             <>
//                               <span className="text-lg">+</span>
//                               Load More
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="text-gray-500 text-center mt-4">
//                     No interview questions found for this session.
//                   </div>
//                 )}
//               </div>
//             </div>

//             <Drawer
//               isOpen={openLeanMoreDrawer}
//               onClose={() => setOpenLeanMoreDrawer(false)}
//               title={!isLoading && explanation?.title}
//             >
//               {errorMsg && (
//                 <p className="flex gap-2 text-sm text-amber-600 font-medium">
//                   <LuCircleAlert className="mt-1" />
//                   {errorMsg}
//                 </p>
//               )}
//               {isLoading && <SkeletonLoader />}
//               {!isLoading && explanation && (
//                 <AIResponsePreview content={explanation?.explanation} />
//               )}
//             </Drawer>
//           </div>
//         </>
//       ) : null}
//     </DashboardLayout>
//   );
// };

// export default InterviewPrep;

rafce
