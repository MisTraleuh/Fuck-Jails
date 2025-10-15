import { ReactNode } from "react";

interface DocumentNoticeProps {
  title?: string;
  children: ReactNode;
}

export function DocumentNotice({
  title,
  children 
}: DocumentNoticeProps) {
  const displayTitle = title;

  return (
    <div className="border-l-2 border-purple-300 pl-4 my-4 text-sm text-gray-300">
      <strong className="text-white">{displayTitle}:</strong> {children}
    </div>
  );
}
