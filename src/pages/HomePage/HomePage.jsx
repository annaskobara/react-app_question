import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_RER_RAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_RER_RAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount).fill(0).map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);

    const sortQuery = e.target.value ? `&${e.target.value}` : "";

    setSearchParams(`?_page=1&_per_page=${DEFAULT_RER_RAGE}${sortQuery}`);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          className={cls.select}
        >
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=level&_order=desc">level DESC</option>
          <option value="_sort=completed&_order=desc">completed ASC</option>
          <option value="_sort=completed">completed DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {/* {error && <p>Page is not difind..</p>} */}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards ... </p>}
      <QuestionCardList cards={cards} />
<div className={cls.paginationContainer}>
  
      {
        pagination.map((value) => {
          return <Button key={value}>{value}</Button>
        })
      }
</div>
    </>
  );
};
