export default function Icon({ name, className, alt }: { name: string; className?: string; alt?: string }) 
{
  return (
    <img src={`/${name}.svg`} alt={alt||name} className={className||'w-4 h-4'} />
  );
}
