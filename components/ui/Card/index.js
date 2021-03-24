export default function Card({
  title,
  description,
  footer,
  children,
  className
}) {
  return (
    <div
      className={`border border-accents-1	max-w-3xl w-full p rounded-md m-auto my-8 ${className}`}
    >
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-accents-5">
          {<span dangerouslySetInnerHTML={{ __html: description }}></span>}
        </p>
        {children}
      </div>
      <div className="border-t border-accents-1 bg-primary-2 p-4 text-accents-3 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}
