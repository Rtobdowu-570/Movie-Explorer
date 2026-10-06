import { useId } from "react";

export default function MediaSection({
  eyebrow,
  title,
  description,
  action,
  className = "",
  id,
  children,
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`media-section ${className}`.trim()} id={id}>
      <div className="media-section__heading">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId}>{title}</h2>
          {description && <p className="media-section__description">{description}</p>}
        </div>
        {action && <div className="media-section__action">{action}</div>}
      </div>
      {children}
    </section>
  );
}
