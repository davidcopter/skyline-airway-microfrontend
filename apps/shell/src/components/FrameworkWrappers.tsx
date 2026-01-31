import React, { useEffect, useRef } from 'react';

interface WrapperProps {
  mount: (el: HTMLElement) => () => void;
}

export const VueWrapper: React.FC<WrapperProps> = ({ mount }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const unmount = mount(ref.current);
      return () => unmount();
    }
  }, [mount]);

  return <div ref={ref} />;
};

export const SvelteWrapper: React.FC<WrapperProps> = ({ mount }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const unmount = mount(ref.current);
      return () => unmount();
    }
  }, [mount]);

  return <div ref={ref} />;
};
