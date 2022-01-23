import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/firebase/client';
import { Answer, answersCollection } from '@/models/Answer';
import {
  BottleType,
  GeneratedBottle,
  generatedBottleCollection,
} from '@/models/Bottle';
import { Player, playerCollection } from '@/models/Player';
import { CollectionWithId } from '@/utils/genericFirebaseType';

import { Tabs } from './Tabs';

export const Results = () => {
  const router = useRouter();
  const [generatedBottles, setGeneratedBottles] =
    useState<CollectionWithId<GeneratedBottle>[]>();
  const [answers, setAnswers] = useState<CollectionWithId<Answer>[]>();
  const [players, setPlayers] = useState<CollectionWithId<Player>[]>();
  const [loggedUser, setLoggedUser] = useState<string | null>(null);

  const id = router.query.id as string;

  // Get current logged user
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedUser(uid);
      }
    });
  }, []);

  // Get generated bottles
  useEffect(() => {
    if (!id) return;

    const q = query(generatedBottleCollection(id), orderBy('order'));

    return onSnapshot(q, (snapshot) => {
      const bottles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGeneratedBottles(bottles);
    });
  }, [id]);

  // Get player answers
  useEffect(() => {
    if (!id) return;

    return onSnapshot(answersCollection(id), (snapshot) => {
      const answers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAnswers(answers);
    });
  }, [id]);

  // Get players
  useEffect(() => {
    if (!id) return;

    return onSnapshot(playerCollection(id), (snapshot) => {
      const players = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayers(players);
    });
  }, [id]);

  const getCurrentPlayer = useCallback(
    (id?: string) => {
      if (!players) return null;

      if (generatedBottles?.length === 0 || answers?.length === 0) {
        return null;
      }

      const playerUids = players?.map((player) => player.uid);
      if (!playerUids || playerUids.length === 0 || !loggedUser) {
        return null;
      }

      const criteria = id ? id : loggedUser;

      const currentPlayerIndex = playerUids.indexOf(criteria);
      const player = players?.[currentPlayerIndex];

      return player;
    },
    [answers, generatedBottles, loggedUser, players]
  );

  const calulPlayerScore = useCallback(
    (id?: string) => {
      const player = getCurrentPlayer(id);

      if (!player) {
        return 0;
      }

      if (!generatedBottles || !answers) return 0;

      const bottlesMap = generatedBottles.reduce<Record<string, BottleType>>(
        (acc, bottle) => {
          return { ...acc, [bottle.id]: bottle.type };
        },
        {}
      );

      const playerAnswers = answers.filter(
        (answer) => answer.userId === player?.uid
      );

      const score = playerAnswers.reduce((acc, answer) => {
        if (bottlesMap[answer.bottle] === answer.answer) {
          return acc + 1;
        }

        return acc;
      }, 0);

      return score;
    },
    [answers, generatedBottles, getCurrentPlayer]
  );

  const calulPlayerScoreDetail = useCallback(
    (id?: string) => {
      const player = getCurrentPlayer(id);

      if (!player) {
        return [];
      }

      if (!generatedBottles || !answers) return [];

      const bottlesMap = generatedBottles.reduce<Record<string, BottleType>>(
        (acc, bottle) => {
          return { ...acc, [bottle.id]: bottle.type };
        },
        {}
      );

      const playerAnswers = answers.filter(
        (answer) => answer.userId === player?.uid
      );

      const score = playerAnswers.reduce<Record<string, number>>(
        (acc, answer) => {
          if (bottlesMap[answer.bottle] === answer.answer) {
            return { ...acc, [answer.id]: 1 };
          }

          return { ...acc, [answer.id]: 0 };
        },
        {}
      );

      return Object.keys(score).map((k) => score[k]);
    },
    [answers, generatedBottles, getCurrentPlayer]
  );

  const getScores = useCallback(() => {
    if (!generatedBottles || !players || !answers) return [];

    const scores = players.map((player) => {
      const playerScore = calulPlayerScore(player.uid);

      return {
        name: player.name,
        score: playerScore,
        total: generatedBottles.length,
      };
    });

    return scores;
  }, [answers, calulPlayerScore, generatedBottles, players]);

  return (
    <div className='w-full'>
      <h1 className='text-4xl text-center text-black'>
        Score{' '}
        <span className='font-bold'>
          {calulPlayerScore()}/{generatedBottles?.length}
        </span>
      </h1>
      <div className='flex justify-between items-center px-8 mt-2 w-full'>
        {calulPlayerScoreDetail().map((detail, index) => (
          <span key={`detail-${index}`}>{detail === 1 ? `✅` : `❌`}</span>
        ))}
      </div>
      <div>
        <Tabs bottles={generatedBottles || []} scores={getScores()} />
      </div>
    </div>
  );
};
