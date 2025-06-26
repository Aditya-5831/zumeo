import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeEditorProps } from "@/lib/types";
import { skillsFormSchema, SkillsFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SkillsForm = ({ resumeData, setResumeData }: ResumeEditorProps) => {
  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: resumeData.skills || [],
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
        skills: values.skills
          ?.filter((skill) => skill !== undefined)
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      });
    });

    return () => {
      subscription.unsubscribe();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  return (
    <Card className="md:w-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="React.js, next.js, node.js..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.split(","));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate each skill with a comma.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
