import { useMemo } from "react";
import { tv } from "tailwind-variants";

export default function useStyledText() {
  const styledText = useMemo(
    () =>
      tv({
        base: [],
        variants: {
          textVariant: {
            h1: [
              "text-(length:--h1-font-size)",
              "leading-(--h1-line-height)",
              "font-(--h1-font-weight)",
            ],
            h2: [
              "text-(length:--h2-font-size)",
              "leading-(--h2-line-height)",
              "font-(--h2-font-weight)",
            ],
            h3: [
              "text-(length:--h3-font-size)",
              "leading-(--h3-line-height)",
              "font-(--h3-font-weight)",
            ],
            h4: [
              "text-(length:--h4-font-size)",
              "leading-(--h4-line-height)",
              "font-(--h4-font-weight)",
            ],
            h5: [
              "text-(length:--h5-font-size)",
              "leading-(--h5-line-height)",
              "font-(--h5-font-weight)",
            ],
            h6: [
              "text-(length:--h6-font-size)",
              "leading-(--h6-line-height)",
              "font-(--h6-font-weight)",
            ],
            p: [
              "text-(length:--p-font-size)",
              "leading-(--p-line-height)",
              "font-(--p-font-weight)",
            ],
            span: [
              "text-(length:--span-font-size)",
              "leading-(--span-line-height)",
              "font-(--span-font-weight)",
            ],
            body1: [
              "text-(length:--body1-font-size)",
              "leading-(--body1-line-height)",
              "font-(--body1-font-weight)",
            ],
            body2: [
              "text-(length:--body2-font-size)",
              "leading-(--body2-line-height)",
              "font-(--body2-font-weight)",
            ],
            caption: [
              "text-(length:--caption-font-size)",
              "leading-(--caption-line-height)",
              "font-(--caption-font-weight)",
            ],
            overline: [
              "text-(length:--overline-font-size)",
              "leading-(--overline-line-height)",
              "font-(--overline-font-weight)",
            ],
            label: [
              "text-(length:--label-font-size)",
              "leading-(--label-line-height)",
              "font-(--label-font-weight)",
            ],
            heading: [
              "text-(length:--heading-font-size)",
              "leading-(--heading-line-height)",
              "font-(--heading-font-weight)",
            ],
            subheading: [
              "text-(length:--subheading-font-size)",
              "leading-(--subheading-line-height)",
              "font-(--subheading-font-weight)",
            ],
            title: [
              "text-(length:--title-font-size)",
              "leading-(--title-line-height)",
              "font-(--title-font-weight)",
            ],
            subtitle1: [
              "text-(length:--subtitle1-font-size)",
              "leading-(--subtitle1-line-height)",
              "font-(--subtitle1-font-weight)",
            ],
            subtitle2: [
              "text-(length:--subtitle2-font-size)",
              "leading-(--subtitle2-line-height)",
              "font-(--subtitle2-font-weight)",
            ],
            hero: [
              "text-(length:--hero-font-size)",
              "leading-(--hero-line-height)",
              "font-(--hero-font-weight)",
            ],
          },
          severity: {
            base: "text-black-base",
            primary: "text-primary",
            "on-primary": "text-on-primary",
            "primary-container": "text-primary-container",
            "on-primary-container": "text-on-primary-container",
            error: "text-error",
            "on-error": "text-on-error",
            "error-container": "text-error-container",
            "on-error-container": "text-on-error-container",
            info: "text-info",
            "on-info": "text-on-info",
            "info-container": "text-info-container",
            "on-info-container": "text-on-info-container",
            warning: "text-warning",
            "on-warning": "text-on-warning",
            "warning-container": "text-warning-container",
            "on-warning-container": "text-on-warning-container",
            success: "text-success",
            "on-success": "text-on-success",
            "success-container": "text-success-container",
            "on-success-container": "text-on-success-container",
          },
          size: {
            sm: "",
            md: "",
            lg: "",
          },
          textAlign: {
            start: "text-start",
            center: "text-center",
            end: "text-end",
            justify: "text-justify",
          },
        },
        compoundVariants: [],
        defaultVariants: {
          size: "md",
          textAlign: "start",
        },
      }),
    []
  );

  return styledText;
}
