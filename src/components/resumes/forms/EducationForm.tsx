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
import { ResumeEditorProps } from "@/lib/types";
import { educationFormSchema, EductionFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const EducationForm = ({ resumeData, setResumeData }: ResumeEditorProps) => {
  const form = useForm<EductionFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      education: resumeData.education || [],
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
        education: values.education?.filter((edu) => edu !== undefined) || [],
      });
    });

    return () => {
      subscription.unsubscribe();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <Card className="md:w-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Education</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action="">
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <EducationItem
                  form={form}
                  index={index}
                  key={field.id}
                  remove={remove}
                />
              ))}
              <Button
                size={"sm"}
                onClick={() =>
                  append({
                    degree: "",
                    grade: "",
                    startDate: "",
                    endDate: "",
                  })
                }
                type="button"
              >
                Add education
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;

interface EducationItemProps {
  form: UseFormReturn<EductionFormValues>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ form, index, remove }: EducationItemProps) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex items-center justify-between">
        <span className="text-primary font-semibold">
          Education {index + 1}
        </span>
        <GripHorizontal className="text-primary size-5 cursor-grab" />
      </div>
      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Bachelor of Technology in Computer Science"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.institute`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institute</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="National Institute of Technology, Trichy"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.grade`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade</FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.5 CGPA" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
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
          name={`education.${index}.endDate`}
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
