import { getTranslations } from "next-intl/server";
import { NotFoundRoute } from "./NotFoundRoute";
import {
  notFoundLostSatellite,
  notFoundOrbitGeometry,
  notFoundRings,
  notFoundSatellites,
} from "../content/not-found.content";
import { getOrbitPosition } from "../utils/orbit-position";

export async function NotFoundOrbit() {
  const translate = await getTranslations("notFound");
  const { width, height, tiltDegrees } = notFoundOrbitGeometry;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <div
      className="[container-type:inline-size] relative mx-auto w-full max-w-[64rem] max-md:max-w-[40rem] md:-mr-[8%] md:w-[calc(100%+8%)] md:max-w-none"
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
      data-motion-item="not-found-orbit"
    >
      <svg
        className="text-primary-300 absolute inset-0 size-full overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <g transform={`rotate(${tiltDegrees} ${centerX} ${centerY})`}>
          {notFoundRings.map((ring) => (
            <ellipse
              key={ring.id}
              cx={centerX}
              cy={centerY}
              rx={ring.radiusX}
              ry={ring.radiusY}
              strokeOpacity={ring.opacity}
              strokeDasharray={ring.isDashed ? "3 7" : undefined}
            />
          ))}
        </g>
      </svg>
      <div className="font-secondary text-fg absolute inset-0 flex items-center justify-center gap-[1.5cqw] text-[16cqw] leading-none font-extrabold tracking-[-0.045em] select-none">
        <span>4</span>
        <span
          className="grid size-[0.82em] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_24%,var(--color-white)_0,var(--primary-300)_16%,var(--primary-500)_46%,var(--tertiary-500)_100%)] text-[.2em] tracking-normal text-white shadow-[0_2.2rem_5rem_-.8rem_color-mix(in_srgb,var(--primary-500)_55%,transparent),inset_-1rem_-1.3rem_2.8rem_color-mix(in_srgb,var(--tertiary-700)_50%,transparent)] max-md:shadow-[0_0_0_1.4rem_color-mix(in_srgb,var(--primary-500)_8%,transparent),0_0_0_2.9rem_color-mix(in_srgb,var(--primary-500)_5%,transparent),0_2rem_4rem_-1rem_color-mix(in_srgb,var(--primary-500)_55%,transparent)]"
          data-motion-item="not-found-planet"
        >
          {translate("planet")}
        </span>
        <span>4</span>
      </div>
      {notFoundSatellites.map((satellite) => {
        const ring = notFoundRings.find((item) => item.id === satellite.ring);
        if (!ring) {
          return null;
        }
        const { leftPercent, topPercent } = getOrbitPosition({
          ring,
          angle: satellite.startAngle,
          geometry: notFoundOrbitGeometry,
        });

        return (
          <a
            key={satellite.id}
            href={satellite.href}
            tabIndex={-1}
            aria-hidden="true"
            className={`border-line bg-surface-raised font-primary text-fg text-body-sm absolute inline-flex -translate-1/2 items-center gap-[.7rem] rounded-full border px-[1.2rem] py-[.7rem] leading-none font-medium whitespace-nowrap no-underline ${satellite.isHiddenOnMobile ? "max-md:hidden" : ""}`}
            style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            data-motion-item="not-found-satellite"
            data-satellite-id={satellite.id}
          >
            <span
              className="size-[.8rem] rounded-full"
              style={{ backgroundColor: satellite.dotColorToken }}
            />
            {translate(`satellites.${satellite.labelKey}`)}
          </a>
        );
      })}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${notFoundLostSatellite.leftPercent}%`,
          top: `${notFoundLostSatellite.topPercent}%`,
        }}
      >
        <span
          className="border-tertiary-400 bg-surface-raised font-mono text-tertiary-300 text-body-sm inline-flex max-w-[22rem] items-center gap-[.7rem] rounded-full border px-[1.2rem] py-[.7rem] leading-none whitespace-nowrap"
          style={{ rotate: `${notFoundLostSatellite.rotationDegrees}deg` }}
          data-motion-item="not-found-lost"
        >
          <span className="bg-tertiary-400 size-[.8rem] shrink-0 rounded-full" />
          <span className="truncate">
            <NotFoundRoute
              variant="label"
              searchedLabel={translate("searched")}
              lostLabel={translate("lostRoute")}
            />
          </span>
        </span>
      </div>
    </div>
  );
}
