import React from "react";
import ReactDOM from "react-dom";

function interopDefault(mod) {
  return (mod && mod.default) || mod;
}

export function ServerHydrator({ load, ...props }) {
  const Child = interopDefault(load());

  return (
    <section>
      <Child {...props} />
    </section>
  );
}

export function Hydrator(props) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    new IntersectionObserver(async ([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(ref.current);
      const Child = interopDefault(await props.load());
      setTimeout(
        () => ReactDOM.hydrate(<Child {...props} />, ref.current),
        1000
      );
    }).observe(ref.current);
  }, [props]);

  return (
    <section
      ref={ref}
      dangerouslySetInnerHTML={{ __html: "" }}
      suppressHydrationWarning
    />
  );
}
