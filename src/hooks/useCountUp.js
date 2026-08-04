import { useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

function formatValue(value, decimals) {
  if (decimals > 0) return Number(value).toFixed(decimals);
  return String(Math.round(value));
}

export function useCountUp(target, { inView = true, duration = 1400, decimals } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const resolvedDecimals =
    typeof decimals === 'number'
      ? decimals
      : Number.isInteger(target)
        ? 0
        : 1;
  const [display, setDisplay] = useState(() =>
    inView && reducedMotion ? formatValue(target, resolvedDecimals) : formatValue(0, resolvedDecimals),
  );

  useEffect(() => {
    if (!inView) return undefined;

    if (reducedMotion) {
      setDisplay(formatValue(target, resolvedDecimals));
      return undefined;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatValue(target * eased, resolvedDecimals));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, inView, duration, reducedMotion, resolvedDecimals]);

  return display;
}

export default useCountUp;
