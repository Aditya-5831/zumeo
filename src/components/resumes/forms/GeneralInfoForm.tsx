"use client";

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
import { generalInfoFormSchema, GeneralInfoFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const GeneralInfoForm = ({ resumeData, setResumeData }: ResumeEditorProps) => {
  const form = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoFormSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
        ...values,
      });
    });

    return () => {
      subscription.unsubscribe();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium">General info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="My first project" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="resume for my next job"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GeneralInfoForm;
