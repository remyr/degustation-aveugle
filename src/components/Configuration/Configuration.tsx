import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  Bottle,
  bottleCollection,
  GeneratedBottle,
  generatedBottleCollection,
} from '@/models/Bottle';
import { Degustation, degustationDocument } from '@/models/Degustation';
import { CollectionWithId } from '@/utils/genericFirebaseType';

import { GenerateSessionModal } from './GenerateSessionModal';
import { SettingsButtons } from './SettingsButtons';
import { Tabs } from './Tabs';

export const Configuration = () => {
  const router = useRouter();
  const [degustation, setDegustation] =
    useState<CollectionWithId<Degustation>>();
  const [bottles, setBottles] = useState<CollectionWithId<Bottle>[]>([]);
  const [generatedBottles, setGeneratedBottles] = useState<
    CollectionWithId<GeneratedBottle>[]
  >([]);
  const [isGenerateModalOpen, setGenerateModalOpen] = useState(false);
  const [_loading, setLoading] = useState(true);

  const id = router.query.id as string;

  // Retrieve bottles from DB
  useEffect(() => {
    if (!id) return;

    const q = query(bottleCollection(id), orderBy('label'));

    return onSnapshot(q, (snapshot) => {
      const bottlesDocuments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBottles(bottlesDocuments);
      setLoading(false);
    });
  }, [id]);

  // Retrieve degustation from DB
  useEffect(() => {
    if (!id) return;

    return onSnapshot(degustationDocument(id), (snapshot) => {
      if (snapshot && snapshot.data()) {
        setDegustation({
          id: snapshot.id,
          ...snapshot.data(),
        } as CollectionWithId<Degustation>);
      }
    });
  }, [id]);

  // Retrieve generated bottles session
  useEffect(() => {
    if (!id) return;

    const q = query(generatedBottleCollection(id), orderBy('order'));

    return onSnapshot(q, (snapshot) => {
      const bottlesDocuments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGeneratedBottles(bottlesDocuments);
    });
  }, [id]);

  const generateSession = (rounds: number) => {
    const bottlesSample = [...bottles];
    const data: CollectionWithId<GeneratedBottle>[] = [];

    for (let i = bottlesSample.length - 1; i >= 0; i--) {
      const idx = Math.floor(Math.random() * bottlesSample.length);
      const bottle = bottlesSample[idx];
      data.push({ ...bottle, order: data.length + 1 });
      bottlesSample.splice(idx, 1);
    }

    if (rounds > bottles.length) {
      const bottlesSample = [...bottles];
      for (let i = rounds - bottlesSample.length - 1; i >= 0; i--) {
        const idx = Math.floor(Math.random() * bottlesSample.length);
        const bottle = bottlesSample[idx];
        data.push({
          ...bottle,
          order: data.length + 1,
        });
        bottlesSample.splice(idx, 1);
      }
    }
    setGeneratedBottles(data);
  };

  const startSession = async () => {
    await updateDoc(degustationDocument(id), { started: true, ended: true });
    const generatedBottlesToCreate = generatedBottles.map((bottle) =>
      addDoc(generatedBottleCollection(id), bottle)
    );

    await Promise.all(generatedBottlesToCreate);

    router.push({
      pathname: '/degustation/[id]/',
      query: { id },
    });
  };

  return (
    <>
      <SettingsButtons
        addButtonDisabled={degustation && degustation.started}
        startButtonDisabled={
          generatedBottles.length === 0 || (degustation && degustation.started)
        }
        generateButtonDisabled={
          bottles.length === 0 || (degustation && degustation.started)
        }
        generateSession={() => setGenerateModalOpen(true)}
        startSession={startSession}
      />
      <Tabs generatedSession={generatedBottles} bottles={bottles} />
      <GenerateSessionModal
        close={() => setGenerateModalOpen(false)}
        defaultRounds={bottles.length}
        isOpen={isGenerateModalOpen}
        generate={generateSession}
      />
    </>
  );
};
