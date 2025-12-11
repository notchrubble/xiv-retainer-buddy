import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Retainer } from "./retainer_container";
import { Edit } from "lucide-react";

export default function RetainerCard({ retainer }: { retainer?: Retainer }) {
  return (
    <>
      {retainer && (
        <Card>
          <CardHeader>
            <CardTitle>{retainer.name}</CardTitle>
            <CardDescription>{retainer.job}</CardDescription>
            <CardAction>
              <Edit />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>level: {retainer.level}</p>
            <p>item level: {retainer.itemLevel}</p>
            <p>gathering: {retainer.gathering}</p>
            <p>perception: {retainer.perception}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
