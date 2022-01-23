import cx from 'classnames';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Answer, answersCollection } from '@/models/Answer';
import { Bottle, bottleCollection } from '@/models/Bottle';
import { playerCollection } from '@/models/Player';

import { AnswersTable } from './AnswersTable';
import { ScoreTable } from './ScoreTable';

export const Results = () => {
  const router = useRouter();
  const [playerScore, setPlayerScore] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [bottleAnswers, setBottleAnswers] =
    useState<Array<Bottle & { id: string }>>();
  const [playerAnswers, setPlayerAnswers] = useState<Answer[]>();
  const [tab, setTab] = useState('score');
  const [scores, setScores] = useState<
    { name: string; score: number; total: number }[]
  >([]);

  const playerId = Cookies.get('player');
  const id = router.query.id as string;

  const [bottleSnapshot, isBottleLoading] = useCollection(
    bottleCollection(id),
    {}
  );
  const [answersSnapshot, isAnswersLoading] = useCollection(
    answersCollection(id)
  );
  const [playerSnapshot, isPlayerLoading] = useCollection(playerCollection(id));

  useEffect(() => {
    const bottles = bottleSnapshot?.docs.map((bottle) => ({
      id: bottle.id,
      ...bottle.data(),
    }));
    setBottleAnswers(bottles);
  }, [bottleSnapshot]);

  useEffect(() => {
    if (!playerSnapshot || !answersSnapshot || !bottleSnapshot) {
      return;
    }
    const answers = answersSnapshot?.docs.map((answer) => ({
      id: answer.id,
      ...answer.data(),
    }));
    const bottles = bottleSnapshot.docs.reduce<Record<string, Bottle>>(
      (acc, bottle) => {
        return {
          ...acc,
          [bottle.id]: {
            id: bottle.id,
            ...bottle.data(),
          },
        };
      },
      {}
    );

    const playersScore = playerSnapshot.docs.map((player) => {
      const currentPlayerAnswers = answers.filter(
        (answer) => answer.player === player.id
      );
      const currentPlayerScore = currentPlayerAnswers.reduce((acc, answer) => {
        if (bottles && bottles[answer.bottle]) {
          if (bottles[answer.bottle].type === answer.answer) {
            return acc + 1;
          }
          return acc;
        }
        return acc;
      }, 0);

      return {
        name: player.data().name,
        score: currentPlayerScore,
        total: bottleSnapshot.docs.length,
      };
    });

    setScores(playersScore);
  }, [playerSnapshot, answersSnapshot, bottleSnapshot]);

  useEffect(() => {
    const bottles = bottleSnapshot?.docs.reduce<Record<string, Bottle>>(
      (acc, bottle) => {
        return {
          ...acc,
          [bottle.id]: {
            id: bottle.id,
            ...bottle.data(),
          },
        };
      },
      {}
    );
    const answers = answersSnapshot?.docs.map((answer) => ({
      id: answer.id,
      ...answer.data(),
    }));
    const pAnswers = answers?.filter((answer) => answer.player === playerId);

    setPlayerAnswers(pAnswers || []);

    const pscore = pAnswers?.reduce((acc, answer) => {
      if (bottles && bottles[answer.bottle]) {
        if (bottles[answer.bottle].type === answer.answer) {
          return acc + 1;
        }
        return acc;
      }
      return acc;
    }, 0);

    setPlayerScore(pscore || 0);
    setTotalAnswer(pAnswers?.length || 0);
  }, [answersSnapshot, bottleSnapshot, playerId]);

  return (
    <div className='px-4 w-full'>
      {isAnswersLoading || isBottleLoading || isPlayerLoading ? (
        <p className='text-xl text-center text-black'>Calcul des scores...</p>
      ) : (
        <>
          <h1 className='text-4xl text-center text-black'>
            Score{' '}
            <span className='font-bold'>
              {playerScore}/{totalAnswer}
            </span>
          </h1>
          <div className='mt-8'>
            <ul className='drop-shadow-light flex justify-between p-2 bg-white rounded-xl'>
              <li
                className={cx(
                  'rounded-[0.5rem] flex justify-center items-center px-8 py-2 text-center',
                  tab === 'score'
                    ? 'shadow text-white bg-darkBlue'
                    : 'text-black bg-white'
                )}
                onClick={() => setTab('score')}
              >
                Tableau des scores
              </li>
              <li
                // className={cx(' px-8 py-2 rounded-[0.5rem] ', { 'shadow text-white bg-darkBlue': tab === 'score'})}
                className={cx(
                  'rounded-[0.5rem] flex justify-center items-center px-8 py-2 text-center',
                  tab === 'answers'
                    ? 'shadow text-white bg-darkBlue'
                    : 'text-black bg-white'
                )}
                onClick={() => setTab('answers')}
              >
                Réponses
              </li>
            </ul>
          </div>
          <div className='mt-8'>
            {tab === 'answers' && (
              <AnswersTable
                playerAnswers={playerAnswers || []}
                bottles={bottleAnswers || []}
              />
            )}
            {tab === 'score' && <ScoreTable scores={scores} />}
          </div>
        </>
      )}
    </div>
  );
};
