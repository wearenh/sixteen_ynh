import { createFileRoute } from "@tanstack/react-router";
import { Sixteen } from "@/components/wall/Sixteen";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Sixteen />;
}
