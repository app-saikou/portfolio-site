import Image from "next/image";

interface NoteIconProps {
  size?: number;
  className?: string;
}

export function NoteIcon({ size = 20, className = "" }: NoteIconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/note-logo.png"
        alt="note"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
