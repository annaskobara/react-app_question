import { Button } from "../Button";
import cls from "./QuestionCard.module.css";

export const QuestionCard = ({card}) => {
  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: {card.level} </div>
        <div>Not {card.completed ? "Completed" : "Not Completed"}</div>
      </div>

      <h5 className={cls.cardTitle}> {card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>
          {card.answer}
        </p>
      </div>

      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
