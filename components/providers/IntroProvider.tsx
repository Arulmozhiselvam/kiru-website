"use client";

import { createContext, useContext, useState } from "react";

type Ctx = { introDone: boolean; finishIntro: () => void };
const IntroContext = createContext<Ctx>({ introDone: true, finishIntro: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  return (
    <IntroContext.Provider value={{ introDone, finishIntro: () => setIntroDone(true) }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
