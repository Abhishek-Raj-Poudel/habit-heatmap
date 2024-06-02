import { useContext, useEffect, useState } from "react";
import { FiCalendar, FiEdit, FiTrash } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// import { Checkbox } from "../ui/checkbox";

import HeatMap from "@uiw/react-heat-map";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { HabitContext, habit, heatmap } from "@/Contexts/HabitContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import UpdateHabit from "../UpdateHabit";

interface HabitCardProps {
  data: habit;
}

function HabitCard({ data }: HabitCardProps) {
  const [days, setDays] = useState<Date[] | undefined>(
    data?.heatmaps?.map((heatmap) => new Date(heatmap.date))
  );
  const { habits, setHabits, deleteHabit } = useContext(HabitContext);
  const [previousYear, setPreviousYear] = useState<Date>();
  // Because heatmap[] and the date type in our heatmap library doesn't match so we are doing this to cope with that
  // Note - I think we should memoise this

  const getFormattedDate = (newDate: Date) => {
    // const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const month = String(newDate.getMonth() + 1);
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${newDate.getFullYear()}/${month}/${day}`;
  };
  const setHabitHeatmap = (heatmap: heatmap[]) => {
    return habits.map((item) => {
      if (item.id !== data.id) return item;

      return { ...item, heatmaps: heatmap || [] };
    });
  };

  useEffect(() => {
    // impliment ref so that it only render initially once
    const heatmaps: heatmap[] = (days ?? []).map((item) => {
      const newdate = new Date(item);
      const formattedDate = getFormattedDate(newdate);
      return { date: formattedDate, count: 1 };
    });

    const habitsToSave = setHabitHeatmap(heatmaps);
    setHabits(habitsToSave);
    localStorage.setItem("habits", JSON.stringify(habitsToSave));
  }, [days]);

  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );

  // const handleCheck = () => {
  //   console.log("here");
  //   // ! Dear future developer
  //   // * most likely missing, if you have already checked then you should be able to uncheck and remove . Probably wont happen right now
  //   const today = new Date();
  //   const formattedDate = getFormattedDate(today);
  //   console.log(data.heatmaps[0]?.date, " fromatted Date", formattedDate);
  //   if (data.heatmaps.find((item) => item.date === formattedDate)) return;

  //   const habitsToSave = habits.map((item) => {
  //     if (item.id !== data.id) return item;
  //     return {
  //       ...item,
  //       heatmaps: [...item.heatmaps, { date: formattedDate, count: 1 }] || [],
  //     };
  //   });
  //   setHabits(habitsToSave);
  // };

  // useEffect(() => {
  //   console.log("data is changed", data);
  // }, [habits]);

  useEffect(() => {
    let createdDate = new Date(data?.created_date);
    let month = createdDate.getMonth() + 2;
    let day = createdDate.getDate();
    let year = createdDate.getFullYear() - 1;

    // console.log(`${year}/${month}/${day}`);
    setPreviousYear(new Date(`${year}/${month}/${day}`));
  }, []);

  // getPreviousYear();

  return (
    <Card className="p-4">
      <CardHeader className="flex-row justify-between gap-4">
        <div className="">
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>{data?.description}</CardDescription>
        </div>
        {/* <Checkbox className="h-8 w-8" onClick={handleCheck} /> */}
      </CardHeader>
      <CardContent className="p-0">
        <HeatMap
          className="w-full"
          value={data?.heatmaps}
          weekLabels={["", "mon", "", "wed", "", "fri", ""]}
          panelColors={{
            0: "#f4decd",
            1: "#d48462",
          }}
          rectProps={{
            rx: 2.5,
          }}
          // startDate={new Date(data?.created_date)}
          startDate={previousYear}
          endDate={new Date()}
        />
      </CardContent>
      <CardFooter className="flex-row gap-3">
        {/* Calender Dialog Start */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <FiCalendar />
            </Button>
          </DialogTrigger>
          <DialogContent className="justify-center items-center w-fit">
            <Calendar
              mode="multiple"
              min={1}
              selected={days}
              onSelect={setDays}
              // onSelect={handleheatmapUpdate}
              footer={footer}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <FiEdit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Habit</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <UpdateHabit data={data} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <FiTrash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Habit</AlertDialogTitle>
              <AlertDialogDescription>
                If you do so it will be lost in time for ever, Never to be seen
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white"
                onClick={() => deleteHabit(data.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default HabitCard;
