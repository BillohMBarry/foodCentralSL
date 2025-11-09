import { clsx, } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names with Tailwind's conflict resolution.
 * @param {...import("clsx").ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any