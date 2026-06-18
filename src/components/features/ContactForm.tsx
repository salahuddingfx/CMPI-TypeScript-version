import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/30">
        <p className="text-lg font-bold text-green-700 dark:text-green-400">Message sent successfully!</p>
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">We will get back to you within 24-48 hours.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">Name</label>
          <Input id="name" name="name" autoComplete="name" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold">Subject</label>
        <Input id="subject" name="subject" placeholder="Admission inquiry" required />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">Message</label>
        <Textarea id="message" name="message" placeholder="Write your message" required />
      </div>
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  );
}
