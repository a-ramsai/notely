import { ReactNode } from "react";
import { use } from "react";
import Room_Provider from "@/components/Room_Provider";

// Update to handle params as a Promise
export default function DocLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);

  return (
    <Room_Provider roomId={resolvedParams.id}>
      {children}
    </Room_Provider>
  );
}