import Quiz from "@/components/Quiz";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();

  return <Quiz onClose={() => navigate("/")} />;
};

export default QuizPage;
