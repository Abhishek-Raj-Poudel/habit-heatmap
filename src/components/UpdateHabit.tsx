import { HabitContext, habit } from "@/Contexts/HabitContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface UpdateHabitProps {
  data: habit;
}

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Habit must be atleast 2 characters.",
  }),
  description: z.string(),
});
export default function UpdateHabit({ data }: UpdateHabitProps) {
  const { habits, setHabits } = useContext(HabitContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const updatedHabitsList = habits.map((habit) => {
      if (habit.id !== data.id) return habit;
      const newObj = {
        ...habit,
        title: formData.title,
        description: formData.description,
      };
      return newObj;
    });
    setHabits([...updatedHabitsList]);
    localStorage.setItem("habits", JSON.stringify(updatedHabitsList));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="example habit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Textarea placeholder="example habit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
