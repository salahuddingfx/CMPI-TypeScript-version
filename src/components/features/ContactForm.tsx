import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <form className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Name
          </label>
          <Input id="name" name="name" autoComplete="name" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            Email
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold">
          Subject
        </label>
        <Input id="subject" name="subject" placeholder="Admission inquiry" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">
          Message
        </label>
        <Textarea id="message" name="message" placeholder="Write your message" />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
