import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import StarBackground from "./StarBackground";
import Image from "next/image";

import { 
  FaDigitalOcean,
  FaFigma,
  FaNpm,
  FaGithub,
  FaCloudflare,
  FaFly
 } from "react-icons/fa6"

import StylizedLogoMark from "./StylizedLogoMark";
import background from './background.jpg'
import React from "react";
import clsx from "clsx";

/**
 * Props for `Integration`.
 */
export type IntegrationProps = SliceComponentProps<Content.IntegrationSlice>;

/**
 * Component for "Integration" Slices.
 */
const Integration = ({ slice }: IntegrationProps): JSX.Element => {

  const icons = {
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    digitalocean: <FaDigitalOcean />,
    fly: <FaFly />
  }


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    > 
      <Image 
      src={background} 
      alt="background-image" 
      fill 
      className="object-cover" 
      quality={90} 
      />
      <StarBackground />

      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-20 flex flex-col items-center md:flex-row">
          {slice.primary.icon.map(( item, index ) => (
            <React.Fragment key={index}>
              {index == Math.floor(slice.primary.icon.length /2) && (
                <>
                  <StylizedLogoMark />
                  <div className="signal-line rotate-180 bg-gradient-to-t" />
                </>
              )}
              <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
                {item.icon && icons[item.icon]}
              </div>
              {index !== slice.primary.icon.length - 1 && (
                <div
                  className={clsx(
                    "signal-line",
                    index >= Math.floor(slice.items.length / 2)
                      ? "rotate-180"
                      : "rotate-0",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Integration;
