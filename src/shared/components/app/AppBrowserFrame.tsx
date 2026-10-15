import Image from "next/image";

interface AppBrowserFrameProps {
  src: string;
  alt: string;
  /** Data URL desenfocada mientras carga la imagen; sin ella queda el fondo del marco. */
  placeholder?: string;
}

export function AppBrowserFrame({
  src,
  alt,
  placeholder,
}: AppBrowserFrameProps) {
  return (
    <figure className="border-line bg-surface-raised m-[1.2rem_1.2rem_0] flex aspect-[16/10.5] shrink-0 flex-col overflow-hidden rounded-[.7rem] border">
      <i className="border-line h-6 shrink-0 border-b bg-[radial-gradient(circle,var(--tertiary-500)_0_.22rem,transparent_.25rem)] bg-[length:.5rem_.5rem] bg-[position:.75rem_50%] bg-no-repeat before:block before:size-full before:bg-[radial-gradient(circle,var(--fg-muted)_0_.22rem,transparent_.25rem)] before:bg-[length:.5rem_.5rem] before:bg-[position:1.45rem_50%] before:bg-no-repeat after:-mt-6 after:block after:size-full after:bg-[radial-gradient(circle,var(--fg-muted)_0_.22rem,transparent_.25rem)] after:bg-[length:.5rem_.5rem] after:bg-[position:2.15rem_50%] after:bg-no-repeat" />
      <Image
        className="bg-surface-sunken min-h-0 w-full flex-1 rounded-none object-cover object-top"
        src={src}
        alt={alt}
        width={960}
        height={630}
        {...(placeholder
          ? { placeholder: "blur" as const, blurDataURL: placeholder }
          : {})}
      />
    </figure>
  );
}
