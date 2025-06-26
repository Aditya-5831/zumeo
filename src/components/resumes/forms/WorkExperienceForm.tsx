import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeEditorProps } from "@/lib/types";
import {
  workExperienceFormSchema,
  WorkExperienceFormValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const WorkExperienceForm = ({
  resumeData,
  setResumeData,
}: ResumeEditorProps) => {
  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const debounceValidate = debounce(async () => {
      const isValid = await form.trigger();
      if (!isValid) return;
    }, 500);

    const subscription = form.watch((values) => {
      debounceValidate();

      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });

    return () => {
      subscription.unsubscribe();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <Card className="md:w-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Work experience</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action="">
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <WorkExperienceItem
                  form={form}
                  index={index}
                  remove={remove}
                  key={field.id}
                />
              ))}
              <Button
                type="button"
                size={"sm"}
                onClick={() =>
                  append({
                    company: "",
                    position: "",
                    endDate: "",
                    startDate: "",
                  })
                }
              >
                Add experience
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceFormValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  form,
  index,
  remove,
}: WorkExperienceItemProps) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex items-center justify-between">
        <span className="text-primary font-semibold">
          Experience {index + 1}
        </span>
        <GripHorizontal className="text-primary size-5 cursor-grab" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Full-stack developer" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Tech nova" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  value={field.value?.slice(0, 10) || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  type="date"
                  placeholder="Tech nova"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  value={field.value?.slice(0, 10) || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  type="date"
                  placeholder="Tech nova"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Add some description about your role in company."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        onClick={() => remove(index)}
        type="button"
        size={"sm"}
        variant={"destructive"}
      >
        Remove
      </Button>
    </div>
  );
};
