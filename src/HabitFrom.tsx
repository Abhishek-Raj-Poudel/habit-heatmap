import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HabitContext, habit } from "./Contexts/HabitContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { DialogClose } from "./components/ui/dialog";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Habit must be atleast 2 characters.",
  }),
  description: z.string(),
});

export default function HabitFrom() {
  const { habits, setHabits } = useContext(HabitContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    const today = new Date();
    const habit: habit = {
      id: habits.length,
      title: data.title,
      description: data.description,
      created_date: today.toISOString(),
      heatmaps: [],
    };
    setHabits((prev) => [...prev, habit]);
    localStorage.setItem("habits", JSON.stringify([...habits, habit]));
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
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
}
