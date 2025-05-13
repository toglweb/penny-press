// context/UnlockContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UnlockContextType {
  unlocked: boolean;
  setUnlocked: (value: boolean) => void;
}

const UnlockContext = createContext<UnlockContextType | undefined>(undefined);

export const UnlockProvider = ({ children }: { children: ReactNode }) => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <UnlockContext.Provider value={{ unlocked, setUnlocked }}>
      {children}
    </UnlockContext.Provider>
  );
};

export const useUnlock = (): UnlockContextType => {
  const context = useContext(UnlockContext);
  if (!context) {
    throw new Error("useUnlock must be used within an UnlockProvider");
  }
  return context;
};
