import { useContext, useEffect, useRef } from "react";
import { FaFire } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { DialogDescription } from "@radix-ui/react-dialog";

import { Button } from "./components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import HabitCard from "./components/other/HabitCard";
import { HabitContext } from "./Contexts/HabitContext";
import HabitFrom from "./HabitFrom";
import { AlertDialog, AlertDialogTrigger } from "./components/ui/alert-dialog";

function App() {
  const { habits, setHabits } = useContext(HabitContext);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    const storedHabits = localStorage.getItem("habits");
    const persistedHabits = storedHabits ? JSON.parse(storedHabits) : [];
    setHabits(persistedHabits);
    return () => {
      effectRan.current = true;
    };
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <>
      <nav className=" max-w-screen-md mx-auto p-5">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FaFire className="text-amber-400" /> <span>Habit-Heatmap</span>
        </h1>
      </nav>
      <main className=" relative space-y-4 max-w-screen-md mx-auto py-10 px-4">
        {habits?.map((item, index) => (
          <HabitCard key={index} data={{ ...item }} />
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"} className="w-full">
              <FiPlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Habit</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <HabitFrom />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
export default App;
