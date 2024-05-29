import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type heatmap = { date: string; count: number };

export type habit = {
  id: number;
  title: string;
  description: string;
  created_date: string;
  heatmaps: heatmap[];
};
export interface HabitContextType {
  habits: habit[];
  setHabits: Dispatch<SetStateAction<habit[]>>;
  deleteHabit: (id: number) => void;
}

const defaultState = {
  habits: [],
  setHabits: () => {},
  deleteHabit: () => {},
} as HabitContextType;

export const HabitContext = createContext(defaultState);

type HabitProviderProps = {
  children: ReactNode;
};
export default function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<habit[]>([]);
  const deleteHabit = (id: number) => {
    const newHabits = habits.filter((item) => item.id !== id);
    setHabits(newHabits);
    //  * update local storage here
    localStorage.setItem("habits", JSON.stringify([...newHabits]));
  };
  return (
    <HabitContext.Provider value={{ habits, setHabits, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
}
