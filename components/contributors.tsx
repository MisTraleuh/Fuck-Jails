import fs from "fs";
import path from "path";

import { ContributorsClient } from "@/components/contributors.client";

export interface Contributor {
  name: string;
  url: string;
  avatar: string;
  role: string;
  languages: string[];
}

export async function Contributors() {
  const filePath = path.join(process.cwd(), "contributors.json");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContent) as { contributors: Contributor[] };

  return <ContributorsClient contributors={data.contributors} />;
}
