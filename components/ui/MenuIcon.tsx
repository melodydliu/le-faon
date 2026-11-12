/** Two thin lines: the menu mark, drawn to match the 1px close (×) icon. */
export function MenuIcon() {
  return (
    <span aria-hidden="true" className="flex w-[22px] flex-col gap-[7px]">
      <span className="block h-px w-full bg-current" />
      <span className="block h-px w-full bg-current" />
    </span>
  );
}
