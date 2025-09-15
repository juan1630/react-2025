
interface Props {
    title: string
    subtitle?: string
}

export const CustomJumbotron = ({ subtitle, title }:Props) => {
  
  const defaultSubtitle = 'Ropa minimalista y elegante inspirada en tesla'

  return (
    <section className="py-10 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto text-center">
        <h1 className="font-montserrat text-2xl lg:text-5xl tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {subtitle || defaultSubtitle }
        </p>
      </div>
    </section>
  );
};
