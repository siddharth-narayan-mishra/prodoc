import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex gap-4">
      <b>Landing Page</b>
      <Button>Primary</Button>
      <Button variant={"destructive"}>destructive</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"muted"}>muted</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"tertiary"}>Tertiary</Button>
      <Input></Input>
    </div>
  );
}
