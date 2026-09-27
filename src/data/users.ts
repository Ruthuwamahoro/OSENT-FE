import type { Person } from "@/utils/types/task";

// The person currently "logged in" for this mock UI. Swap this out once
// real auth exists — everything that says "me" / "my tasks" reads from here.
export const CURRENT_USER_ID = "u-jean";

export const people: Record<string, Person> = {
  "u-jean": { id: "u-jean", name: "Jean Nkurunziza", role: "Sales Associate" },
  "u-marie": { id: "u-marie", name: "Marie Uwase", role: "Operations Manager" },
  "u-emmanuel": { id: "u-emmanuel", name: "Emmanuel Habimana", role: "Procurement Officer" },
  "u-diane": { id: "u-diane", name: "Diane Mukamana", role: "Finance Officer" },
  "u-patrick": { id: "u-patrick", name: "Patrick Niyonzima", role: "Warehouse Supervisor" },
  "u-alice": { id: "u-alice", name: "Alice Ingabire", role: "Customer Service Lead" },
};

export const peopleList = Object.values(people);

export function personName(id: string): string {
  return people[id]?.name ?? "Unknown";
}
