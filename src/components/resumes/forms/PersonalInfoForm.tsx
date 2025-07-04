"use client";

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
import {
  personalInfoFormSchema,
  PersonalInfoFormValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const PersonalInfoForm = ({ resumeData, setResumeData }: ResumeEditorProps) => {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      jobTitle: resumeData.jobTitle || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
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

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Personal info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="photo"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Your photo</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            {...fieldValues}
                            placeholder="Jason"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              fieldValues.onChange(file);
                            }}
                            ref={photoInputRef}
                          />
                        </FormControl>
                        <Button
                          variant={"secondary"}
                          type="button"
                          onClick={() => {
                            fieldValues.onChange(null);
                            if (photoInputRef.current) {
                              photoInputRef.current.value = "";
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Jason" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Watson" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Job title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full-stack developer" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Frankfurt" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Germany" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          placeholder="+45 805984790"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Jasondev@gmail.com"
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

export default PersonalInfoForm;
