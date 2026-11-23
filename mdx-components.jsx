import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import ThemedVideo from "@/components/themed-video";

export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(components),
    ThemedVideo,
    ...components,
  };
}
